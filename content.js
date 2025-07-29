// Content script for Website Blocker extension

let keywords = [];
let isEnabled = true;
let hasCheckedContent = false;

// Get keywords from background script
async function getKeywords() {
  try {
    const response = await chrome.runtime.sendMessage({ type: 'CHECK_KEYWORDS' });
    keywords = response.keywords || [];
    isEnabled = response.isEnabled !== false;
  } catch (error) {
    console.error('Error getting keywords:', error);
  }
}

// Check if page content contains any blocked keywords
function checkPageContent() {
  if (!isEnabled || keywords.length === 0 || hasCheckedContent) return;
  
  // Get page text content
  const pageText = document.body ? document.body.innerText.toLowerCase() : '';
  const pageTitle = document.title.toLowerCase();
  const fullContent = pageText + ' ' + pageTitle;
  
  // Check for keyword matches
  for (const keyword of keywords) {
    if (fullContent.includes(keyword.toLowerCase())) {
      hasCheckedContent = true;
      // Notify background script to block the page
      chrome.runtime.sendMessage({
        type: 'CONTENT_BLOCKED',
        keyword: keyword,
        url: window.location.href
      });
      return;
    }
  }
  
  hasCheckedContent = true;
}

// Check content when DOM is ready
function checkWhenReady() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkPageContent);
  } else {
    checkPageContent();
  }
}

// Also check content after page modifications
function observePageChanges() {
  if (!document.body) return;
  
  const observer = new MutationObserver(() => {
    if (!hasCheckedContent) {
      checkPageContent();
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // Stop observing after 10 seconds to prevent performance issues
  setTimeout(() => observer.disconnect(), 10000);
}

// Initialize content checking
async function init() {
  await getKeywords();
  
  // Skip if this is the blocked page itself
  if (window.location.href.includes(chrome.runtime.getURL('blocked.html'))) {
    return;
  }
  
  checkWhenReady();
  observePageChanges();
}

// Start initialization
init();

// Listen for storage changes to update keywords
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local' && (changes.blockedKeywords || changes.isEnabled)) {
    hasCheckedContent = false;
    init();
  }
});