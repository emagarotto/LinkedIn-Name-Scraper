// Popup script for LinkedIn Name Extractor settings

const DEFAULT_TEMPLATE = `Hi, {name}.\n\nI'm sharing a brief deck you're welcome to socialize to folks in your network you think might be interested. It covers my value prop as a force multiplier (UX Strategist, Product Leader, & AI Vibe Coding Accelerant), use cases, and deployment approach.\n\nRegards,\nEzio Magarotto, CUA, CAWC, & Veteran\nhttps://www.magarottos.com/\nhttps://www.linkedin.com/in/eziomagarotto`;

// DOM elements
const messageTemplateTextarea = document.getElementById('messageTemplate');
const saveButton = document.getElementById('saveButton');
const resetButton = document.getElementById('resetButton');
const statusDiv = document.getElementById('status');

// Load saved settings when popup opens
document.addEventListener('DOMContentLoaded', loadSettings);

// Save button click handler
saveButton.addEventListener('click', saveSettings);

// Reset button click handler
resetButton.addEventListener('click', resetToDefault);

// Load settings from Chrome storage
function loadSettings() {
    chrome.storage.sync.get(['messageTemplate'], (result) => {
        const template = result.messageTemplate || DEFAULT_TEMPLATE;
        messageTemplateTextarea.value = template;
    });
}

// Save settings to Chrome storage
function saveSettings() {
    const template = messageTemplateTextarea.value.trim();
    
    if (!template) {
        showStatus('Please enter a message template', 'error');
        return;
    }
    
    if (!template.includes('{name}')) {
        showStatus('Template must include {name} placeholder', 'error');
        return;
    }
    
    chrome.storage.sync.set({ messageTemplate: template }, () => {
        showStatus('✓ Settings saved successfully!', 'success');
        
        // Notify content script to reload settings
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, { 
                    action: 'reloadSettings' 
                }).catch(() => {
                    // Ignore errors if content script isn't loaded
                });
            }
        });
    });
}

// Reset to default template
function resetToDefault() {
    messageTemplateTextarea.value = DEFAULT_TEMPLATE;
    showStatus('Reset to default template', 'success');
}

// Show status message
function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
    
    // Clear status after 3 seconds
    setTimeout(() => {
        statusDiv.textContent = '';
        statusDiv.className = 'status';
    }, 3000);
}
