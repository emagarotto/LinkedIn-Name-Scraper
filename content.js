// LinkedIn Message Helper - Content Script
// Injects a hamburger button into LinkedIn message boxes to paste
// a personalised message with the recipient's scraped first name.

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
      console.warn('LinkedIn Message Helper: Could not find profile name');
      console.log('LinkedIn Message Helper: Tried selectors:', selectors);
      console.log('LinkedIn Message Helper: Run DEBUGGING.md script to find current selectors');
      return null;
    }

    // Extract first name (everything before the first space)
    const firstName = fullName.split(/\s+/)[0];
    console.log('LinkedIn Message Helper: Extracted first name:', firstName);
    
    return firstName;
  }

  // Load message template from Chrome storage
  function loadMessageTemplate() {
    chrome.storage.sync.get(['messageTemplate'], (result) => {
      messageTemplate = result.messageTemplate || DEFAULT_TEMPLATE;
      console.log('LinkedIn Message Helper: Loaded template:', messageTemplate);
    });
  }
  
  // Listen for template updates from popup
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'reloadSettings') {
      loadMessageTemplate();
      console.log('LinkedIn Message Helper: Settings reloaded');
    }
  });

  // ── Message insertion ────────────────────────────────────────────────────

  // Paste the templated message into the given message box using execCommand
  // so React's state is updated (text will actually be sent).
  function pasteMessage(messageBox, firstName) {
    const customMessage = messageTemplate.replace(/{name}/g, firstName);

    if (messageBox.isContentEditable) {
      messageBox.focus();
      document.execCommand('selectAll', false, null);
      document.execCommand('insertText', false, customMessage);
    } else if (messageBox.tagName === 'TEXTAREA') {
      const nativeSetter = Object.getOwnPropertyDescriptor(
        window.HTMLTextAreaElement.prototype, 'value'
      ).set;
      nativeSetter.call(messageBox, customMessage);
      messageBox.dispatchEvent(new Event('input', { bubbles: true }));
      messageBox.focus();
      messageBox.setSelectionRange(messageBox.value.length, messageBox.value.length);
    }
    console.log('LinkedIn Message Helper: Message pasted for', firstName);
  }

  // ── Find the message input inside a given form/container ─────────────────

  function findMessageBox(container) {
    const selectors = [
      '[contenteditable="true"]',
      'textarea'
    ];
    for (const sel of selectors) {
      const el = container.querySelector(sel);
      if (el) return el;
    }
    return null;
  }

  // ── Hamburger button injection ────────────────────────────────────────────

  function createButton() {
    const btn = document.createElement('button');
    btn.className = 'lmh-paste-btn';
    btn.title = 'Paste message with name (LinkedIn Message Helper)';
    btn.type = 'button';
    btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="white">
        <rect x="2" y="3"  width="14" height="2" rx="1"/>
        <rect x="2" y="8"  width="14" height="2" rx="1"/>
        <rect x="2" y="13" width="14" height="2" rx="1"/>
      </svg>`;
    btn.style.cssText = [
      'background:#0073b1',
      'border:none',
      'border-radius:6px',
      'cursor:pointer',
      'padding:5px 8px',
      'margin-left:6px',
      'display:inline-flex',
      'align-items:center',
      'justify-content:center',
      'vertical-align:middle',
      'transition:background 0.15s',
      'flex-shrink:0'
    ].join(';');

    btn.addEventListener('mouseenter', () => btn.style.background = '#005885');
    btn.addEventListener('mouseleave', () => btn.style.background = '#0073b1');
    return btn;
  }

  // Inject the button into any LinkedIn message form that doesn't have one yet
  function injectButtons() {
    // Target the toolbar/footer row where LinkedIn's own send/attach buttons live
    const toolbarSelectors = [
      '.msg-form__footer',
      '.msg-form__left-actions',
      '.msg-form__right-actions'
    ];

    for (const sel of toolbarSelectors) {
      document.querySelectorAll(sel).forEach(toolbar => {
        if (toolbar.querySelector('.lmh-paste-btn')) return; // already injected

        const btn = createButton();

        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();

          const firstName = extractFirstName();
          if (!firstName) {
            btn.title = 'Could not find name — check console (F12)';
            btn.style.background = '#c0392b';
            setTimeout(() => {
              btn.style.background = '#0073b1';
              btn.title = 'Paste message with name (LinkedIn Message Helper)';
            }, 2000);
            console.warn('LinkedIn Message Helper: No name found on this page');
            return;
          }

          // Walk up to the form and find the message input inside it
          const form = toolbar.closest('.msg-form, form, [data-test-modal]') || document.body;
          const messageBox = findMessageBox(form) ||
            document.querySelector('[contenteditable="true"]') ||
            document.querySelector('textarea');

          if (!messageBox) {
            console.warn('LinkedIn Message Helper: Could not find message box');
            return;
          }

          pasteMessage(messageBox, firstName);

          // Brief green flash to confirm
          btn.style.background = '#27ae60';
          setTimeout(() => btn.style.background = '#0073b1', 1000);
        });

        toolbar.appendChild(btn);
        console.log('LinkedIn Message Helper: Button injected into', sel);
      });
    }
  }

  // ── MutationObserver to catch dynamically rendered forms ──────────────────

  const observer = new MutationObserver(() => injectButtons());
  observer.observe(document.body, { childList: true, subtree: true });

  // Initial pass after the page has settled
  setTimeout(injectButtons, 1000);

  console.log('LinkedIn Message Helper: Extension loaded');
})();
