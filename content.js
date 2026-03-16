// LinkedIn Name Extractor - Content Script
// Automatically extracts first name when opening message boxes

(function() {
  'use strict';

  // Default message template
  const DEFAULT_TEMPLATE = `Hi, {name}.\n\nI'm sharing a brief deck you're welcome to socialize to folks in your network you think might be interested. It covers my value prop as a force multiplier (UX Strategist, Product Leader, & AI Vibe Coding Accelerant), use cases, and deployment approach.\n\nRegards,\nEzio Magarotto, CUA, CAWC, & Veteran\nhttps://www.magarottos.com/\nhttps://www.linkedin.com/in/eziomagarotto`;
  
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
      'h1.inline',
      // Profile name in conversation header
      '.msg-thread__link-to-profile',
      // Alternative profile name selector
      '[data-generated-suggestion-target] h1',
      // Profile overlay
      '.pv-text-details__left-panel h1',
      // Modern profile variations
      '.pv-top-card--list h1',
      '.artdeco-entity-lockup__title',
      // Message thread header
      '.msg-overlay-conversation-bubble__title',
      // Generic fallbacks
      '[data-control-name="overlay.close_conversation_window"] + div h2',
      'a[data-control-name="view_profile"] span[aria-hidden="true"]'
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
      console.warn('LinkedIn Name Extractor: Could not find profile name');
      console.log('LinkedIn Name Extractor: Tried selectors:', selectors);
      console.log('LinkedIn Name Extractor: Run DEBUGGING.md script to find current selectors');
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
      
      // For contenteditable divs: use execCommand so React's state is
      // updated and the text is actually included when send is clicked.
      if (messageBox.isContentEditable) {
        messageBox.focus();
        document.execCommand('selectAll', false, null);
        document.execCommand('insertText', false, customMessage);
      }
      // For textarea elements
      else if (messageBox.tagName === 'TEXTAREA') {
        const nativeSetter = Object.getOwnPropertyDescriptor(
          window.HTMLTextAreaElement.prototype, 'value'
        ).set;
        nativeSetter.call(messageBox, customMessage);
        messageBox.dispatchEvent(new Event('input', { bubbles: true }));
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
      '.msg-form__msg-content-container textarea',
      // Generic contenteditable with role textbox
      '[contenteditable="true"][role="textbox"]',
      // Modern message box
      '.msg-s-message-group__message-field',
      // Compose box variations
      'div.msg-form__msg-content-container [contenteditable="true"]'
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
    
    // Check if the focused element is a message box (more flexible matching)
    const isMessageBox = target.matches('.msg-form__contenteditable, textarea.msg-form__textarea, .msg-form__msg-content-container textarea, [contenteditable="true"][role="textbox"], .msg-s-message-group__message-field');
    
    if (isMessageBox || (target.isContentEditable && target.closest('.msg-form, .msg-s-message-list-container'))) {
      console.log('LinkedIn Name Extractor: Message box focused');
      setTimeout(() => {
        const firstName = extractFirstName();
        if (firstName) {
          insertFirstName(target, firstName);
        } else {
          console.log('LinkedIn Name Extractor: No name found to insert');
        }
      }, 100);
    }
  }, true);

  // Initialize
  console.log('LinkedIn Name Extractor: Extension loaded');
  
  // Initial attempt to populate
  setTimeout(populateMessageBox, 1000);
  
  // Start observing for dynamic changes
  observeMessageBoxes();
})();
