// LinkedIn Name Extractor - Content Script
// Automatically extracts first name when opening message boxes

(function() {
  'use strict';

  // Default message template
  const DEFAULT_TEMPLATE = 'Hi, {name} ';
  
  // Store the current message template
  let messageTemplate = DEFAULT_TEMPLATE;
  
  // Load message template from storage
  loadMessageTemplate();

  // Function to extract first name from LinkedIn profile
  function extractFirstName() {
    // Try multiple selectors as LinkedIn's DOM structure may vary
    const selectors = [
      // Profile name in messaging interface
      'h2.msg-entity-lockup__entity-title',
      // Profile name on profile pages
      'h1.text-heading-xlarge',
      // Profile name in conversation header
      '.msg-thread__link-to-profile',
      // Alternative profile name selector
      '[data-generated-suggestion-target] h1',
      // Profile overlay
      '.pv-text-details__left-panel h1'
    ];

    let fullName = null;

    // Try each selector until we find a name
    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (element && element.textContent.trim()) {
        fullName = element.textContent.trim();
        break;
      }
    }

    if (!fullName) {
      console.log('LinkedIn Name Extractor: Could not find profile name');
      return null;
    }

    // Extract first name (everything before the first space)
    const firstName = fullName.split(/\s+/)[0];
    console.log('LinkedIn Name Extractor: Extracted first name:', firstName);
    
    return firstName;
  }

  // Load message template from Chrome storage
  function loadMessageTemplate() {
    chrome.storage.sync.get(['messageTemplate'], (result) => {
      messageTemplate = result.messageTemplate || DEFAULT_TEMPLATE;
      console.log('LinkedIn Name Extractor: Loaded template:', messageTemplate);
    });
  }
  
  // Listen for template updates from popup
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'reloadSettings') {
      loadMessageTemplate();
      console.log('LinkedIn Name Extractor: Settings reloaded');
    }
  });

  // Function to insert first name into message box
  function insertFirstName(messageBox, firstName) {
    if (!messageBox || !firstName) return;

    // Check if we've already inserted the name (to avoid duplicates)
    if (messageBox.dataset.nameInserted === 'true') {
      return;
    }

    // Get current content
    const currentContent = messageBox.textContent || '';

    // Only insert if the message box is empty or contains placeholder text
    if (currentContent.trim() === '' || currentContent.includes('Write a message')) {
      // Generate message from template
      const customMessage = messageTemplate.replace(/{name}/g, firstName);
      
      // For contenteditable divs
      if (messageBox.isContentEditable) {
        messageBox.textContent = customMessage;
        
        // Move cursor to the end
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(messageBox);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
        
        // Focus the message box
        messageBox.focus();
      } 
      // For textarea elements
      else if (messageBox.tagName === 'TEXTAREA') {
        messageBox.value = customMessage;
        messageBox.focus();
        messageBox.setSelectionRange(messageBox.value.length, messageBox.value.length);
      }

      // Mark as inserted
      messageBox.dataset.nameInserted = 'true';
      console.log('LinkedIn Name Extractor: Inserted name into message box');
    }
  }

  // Function to find and populate message boxes
  function populateMessageBox() {
    const firstName = extractFirstName();
    if (!firstName) return;

    // Selectors for message input boxes
    const messageBoxSelectors = [
      // Main messaging compose box
      '.msg-form__contenteditable[contenteditable="true"]',
      // Alternative messaging box
      '.msg-form__msg-content-container--scrollable [contenteditable="true"]',
      // Message textarea
      'textarea.msg-form__textarea',
      // Quick reply box
      '.msg-form__msg-content-container textarea'
    ];

    for (const selector of messageBoxSelectors) {
      const messageBoxes = document.querySelectorAll(selector);
      messageBoxes.forEach(box => {
        insertFirstName(box, firstName);
      });
    }
  }

  // Observer to watch for new message boxes appearing
  function observeMessageBoxes() {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        // Check if message box elements were added
        if (mutation.addedNodes.length > 0) {
          // Give LinkedIn a moment to finish rendering
          setTimeout(populateMessageBox, 300);
        }
      }
    });

    // Observe the entire document for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    console.log('LinkedIn Name Extractor: Observer started');
  }

  // Listen for focus events on message boxes (when user clicks into them)
  document.addEventListener('focusin', (event) => {
    const target = event.target;
    
    // Check if the focused element is a message box
    if (target.matches('.msg-form__contenteditable, textarea.msg-form__textarea, .msg-form__msg-content-container textarea')) {
      setTimeout(() => {
        const firstName = extractFirstName();
        if (firstName) {
          insertFirstName(target, firstName);
        }
      }, 100);
    }
  }, true);

  // Function to create and add custom attachment button
  function addAttachmentButton() {
    // Find the message form container
    const formContainers = document.querySelectorAll('.msg-form__msg-content-container, .msg-form__footer');
    
    formContainers.forEach(container => {
      // Check if we've already added our button
      if (container.querySelector('.ln-custom-attachment-btn')) {
        return;
      }

      // Create custom attachment button
      const attachButton = document.createElement('button');
      attachButton.className = 'ln-custom-attachment-btn';
      attachButton.innerHTML = '📎 Attach File';
      attachButton.title = 'Attach a file to your message';
      attachButton.style.cssText = `
        background-color: #0073b1;
        color: white;
        border: none;
        padding: 6px 12px;
        border-radius: 16px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        margin: 4px;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        transition: background-color 0.2s;
      `;

      // Hover effect
      attachButton.addEventListener('mouseenter', () => {
        attachButton.style.backgroundColor = '#005885';
      });
      attachButton.addEventListener('mouseleave', () => {
        attachButton.style.backgroundColor = '#0073b1';
      });

      // Create hidden file input
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.style.display = 'none';
      fileInput.accept = '*/*'; // Accept all file types
      
      // Handle file selection
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          handleFileAttachment(file, container);
        }
      });

      // Click handler for button
      attachButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        fileInput.click();
      });

      // Add button and input to container
      container.appendChild(attachButton);
      container.appendChild(fileInput);
      
      console.log('LinkedIn Name Extractor: Added attachment button');
    });
  }

  // Function to handle file attachment
  function handleFileAttachment(file, container) {
    console.log('LinkedIn Name Extractor: File selected:', file.name);

    // Try to find LinkedIn's native attachment button and trigger it
    const nativeAttachButton = document.querySelector('.msg-form__footer button[aria-label*="attach"], .msg-form__footer button[type="button"][aria-label*="Attach"]');
    
    if (nativeAttachButton) {
      // Try to use LinkedIn's native attachment functionality
      nativeAttachButton.click();
      console.log('LinkedIn Name Extractor: Triggered native attachment button');
    } else {
      // If native button not found, display file info as a visual indicator
      displayFileInfo(file, container);
    }
  }

  // Function to display file information
  function displayFileInfo(file, container) {
    // Remove any existing file info
    const existingInfo = container.querySelector('.ln-file-info');
    if (existingInfo) {
      existingInfo.remove();
    }

    // Create file info display
    const fileInfo = document.createElement('div');
    fileInfo.className = 'ln-file-info';
    fileInfo.style.cssText = `
      background-color: #f3f6f8;
      border: 1px solid #d0d8de;
      border-radius: 8px;
      padding: 8px 12px;
      margin: 4px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
    `;

    // File icon and name
    const fileSize = (file.size / 1024).toFixed(1) + ' KB';
    fileInfo.innerHTML = `
      <span style="font-size: 16px;">📄</span>
      <span style="flex: 1;">
        <strong>${file.name}</strong><br>
        <span style="color: #666; font-size: 12px;">${fileSize}</span>
      </span>
      <button class="ln-remove-file" style="
        background: none;
        border: none;
        color: #666;
        cursor: pointer;
        font-size: 18px;
        padding: 0 4px;
      ">×</button>
    `;

    // Add remove handler
    const removeBtn = fileInfo.querySelector('.ln-remove-file');
    removeBtn.addEventListener('click', () => {
      fileInfo.remove();
      console.log('LinkedIn Name Extractor: File removed');
    });

    container.appendChild(fileInfo);
    
    // Show instruction message
    const instruction = document.createElement('div');
    instruction.style.cssText = `
      color: #0073b1;
      font-size: 12px;
      margin: 4px;
      padding: 4px 8px;
    `;
    instruction.textContent = 'Note: Use LinkedIn\'s native attach button to actually send the file. This is a preview.';
    container.appendChild(instruction);
    
    // Auto-remove instruction after 5 seconds
    setTimeout(() => {
      instruction.remove();
    }, 5000);

    console.log('LinkedIn Name Extractor: Displayed file info');
  }

  // Observer to add attachment button to new message forms
  function observeForAttachmentButton() {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
          setTimeout(addAttachmentButton, 300);
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // Initialize
  console.log('LinkedIn Name Extractor: Extension loaded');
  
  // Initial attempt to populate
  setTimeout(populateMessageBox, 1000);
  
  // Add attachment button
  setTimeout(addAttachmentButton, 1500);
  
  // Start observing for dynamic changes
  observeMessageBoxes();
  observeForAttachmentButton();
})();
