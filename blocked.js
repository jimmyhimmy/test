// Blocked page script for Website Blocker extension

// Parse URL parameters to get blocking details
function getUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        blockedUrl: urlParams.get('blocked') || 'Unknown',
        keyword: urlParams.get('keyword') || 'Unknown',
        reason: urlParams.get('reason') || 'url'
    };
}

// Format URL for display (truncate if too long)
function formatUrl(url) {
    if (url.length > 50) {
        return url.substring(0, 47) + '...';
    }
    return url;
}

// Get reason text based on blocking reason
function getReasonText(reason) {
    switch (reason) {
        case 'content':
            return 'Page content contains keyword';
        case 'url':
        default:
            return 'URL contains keyword';
    }
}

// Format current time
function getCurrentTime() {
    return new Date().toLocaleString();
}

// Go back to previous page
function goBack() {
    // Try to go back in history
    if (window.history.length > 1) {
        window.history.back();
    } else {
        // If no history, go to a safe page
        window.location.href = 'about:blank';
    }
}

// Open extension settings (popup)
function openSettings() {
    // This will attempt to open the extension popup
    // Note: This may not work in all browsers due to security restrictions
    try {
        chrome.runtime.openOptionsPage();
    } catch (error) {
        // Fallback: show instructions
        alert('To manage your blocked keywords:\n\n1. Click the Website Blocker extension icon in your browser toolbar\n2. Add or remove keywords from the popup\n3. Toggle the extension on/off as needed');
    }
}

// Initialize the blocked page
function initializeBlockedPage() {
    const params = getUrlParams();
    
    // Update page elements with blocking details
    document.getElementById('blockedUrl').textContent = formatUrl(decodeURIComponent(params.blockedUrl));
    document.getElementById('matchedKeyword').textContent = decodeURIComponent(params.keyword);
    document.getElementById('blockReason').textContent = getReasonText(params.reason);
    document.getElementById('blockTime').textContent = getCurrentTime();
    
    // Update page title to include the keyword
    document.title = `Website Blocked - "${decodeURIComponent(params.keyword)}"`;
}

// Add keyboard shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (event) => {
        // ESC key to go back
        if (event.key === 'Escape') {
            goBack();
        }
        // Ctrl/Cmd + S to open settings
        else if ((event.ctrlKey || event.metaKey) && event.key === 's') {
            event.preventDefault();
            openSettings();
        }
    });
}

// Add click handler for URL to copy it
function setupUrlCopy() {
    const urlElement = document.getElementById('blockedUrl');
    urlElement.style.cursor = 'pointer';
    urlElement.title = 'Click to copy full URL';
    
    urlElement.addEventListener('click', () => {
        const params = getUrlParams();
        const fullUrl = decodeURIComponent(params.blockedUrl);
        
        // Try to copy to clipboard
        if (navigator.clipboard) {
            navigator.clipboard.writeText(fullUrl).then(() => {
                // Show feedback
                const originalText = urlElement.textContent;
                urlElement.textContent = 'Copied!';
                urlElement.style.color = '#28a745';
                
                setTimeout(() => {
                    urlElement.textContent = originalText;
                    urlElement.style.color = '';
                }, 1500);
            }).catch(() => {
                // Fallback: show full URL in alert
                alert('Full URL:\n' + fullUrl);
            });
        } else {
            // Fallback for older browsers
            alert('Full URL:\n' + fullUrl);
        }
    });
}

// Setup button event listeners
function setupButtonEvents() {
    // Go Back button
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', goBack);
    }
    
    // Settings button
    const settingsBtn = document.getElementById('settings-btn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', openSettings);
    }
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeBlockedPage();
    setupKeyboardShortcuts();
    setupUrlCopy();
    setupButtonEvents();
});

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
    // If user tries to navigate back to the blocked page, go back further
    goBack();
});