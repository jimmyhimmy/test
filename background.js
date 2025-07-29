// Background script for Website Blocker extension

let blockedKeywords = [];
let isEnabled = true;

// Load keywords from storage on startup
chrome.runtime.onStartup.addListener(loadKeywords);
chrome.runtime.onInstalled.addListener(loadKeywords);

async function loadKeywords() {
  try {
    const result = await chrome.storage.local.get(['blockedKeywords', 'isEnabled']);
    blockedKeywords = result.blockedKeywords || [];
    isEnabled = result.isEnabled !== false; // Default to true
    console.log('Loaded keywords:', blockedKeywords);
  } catch (error) {
    console.error('Error loading keywords:', error);
  }
}

// Check if URL contains any blocked keywords
function containsBlockedKeyword(url) {
  if (!isEnabled || blockedKeywords.length === 0) return false;
  
  const urlLower = url.toLowerCase();
  return blockedKeywords.some(keyword => 
    urlLower.includes(keyword.toLowerCase())
  );
}

// Handle web navigation events
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  if (details.frameId === 0) { // Main frame only
    if (containsBlockedKeyword(details.url)) {
      // Redirect to blocked page
      const blockedUrl = chrome.runtime.getURL('blocked.html') + 
        '?blocked=' + encodeURIComponent(details.url) +
        '&keyword=' + encodeURIComponent(getMatchingKeyword(details.url));
      
      chrome.tabs.update(details.tabId, { url: blockedUrl });
    }
  }
});

// Get the first matching keyword for display
function getMatchingKeyword(url) {
  const urlLower = url.toLowerCase();
  return blockedKeywords.find(keyword => 
    urlLower.includes(keyword.toLowerCase())
  ) || '';
}

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'CHECK_KEYWORDS') {
    sendResponse({ 
      keywords: blockedKeywords, 
      isEnabled: isEnabled 
    });
  } else if (message.type === 'CONTENT_BLOCKED') {
    // Block the current page due to content keyword match
    const blockedUrl = chrome.runtime.getURL('blocked.html') + 
      '?blocked=' + encodeURIComponent(sender.tab.url) +
      '&keyword=' + encodeURIComponent(message.keyword) +
      '&reason=content';
    
    chrome.tabs.update(sender.tab.id, { url: blockedUrl });
  } else if (message.type === 'RELOAD_KEYWORDS') {
    loadKeywords();
    sendResponse({ success: true });
  }
});

// Handle storage changes
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local') {
    if (changes.blockedKeywords) {
      blockedKeywords = changes.blockedKeywords.newValue || [];
    }
    if (changes.isEnabled) {
      isEnabled = changes.isEnabled.newValue !== false;
    }
  }
});

// Initialize on script load
loadKeywords();