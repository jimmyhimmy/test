// Popup script for Website Blocker extension

let keywords = [];
let isEnabled = true;

// DOM elements
const keywordInput = document.getElementById('keywordInput');
const addButton = document.getElementById('addButton');
const keywordsList = document.getElementById('keywordsList');
const keywordCount = document.getElementById('keywordCount');
const enableToggle = document.getElementById('enableToggle');
const clearAllButton = document.getElementById('clearAllButton');
const statusText = document.getElementById('statusText');

// Initialize popup
document.addEventListener('DOMContentLoaded', async () => {
    await loadKeywords();
    setupEventListeners();
    updateUI();
});

// Load keywords from storage
async function loadKeywords() {
    try {
        const result = await chrome.storage.local.get(['blockedKeywords', 'isEnabled']);
        keywords = result.blockedKeywords || [];
        isEnabled = result.isEnabled !== false;
        enableToggle.checked = isEnabled;
        updateStatus('Loaded');
    } catch (error) {
        console.error('Error loading keywords:', error);
        updateStatus('Error loading data');
    }
}

// Save keywords to storage
async function saveKeywords() {
    try {
        await chrome.storage.local.set({ 
            blockedKeywords: keywords,
            isEnabled: isEnabled 
        });
        updateStatus('Saved');
        
        // Notify background script to reload keywords
        chrome.runtime.sendMessage({ type: 'RELOAD_KEYWORDS' });
    } catch (error) {
        console.error('Error saving keywords:', error);
        updateStatus('Error saving');
    }
}

// Setup event listeners
function setupEventListeners() {
    // Add keyword button
    addButton.addEventListener('click', addKeyword);
    
    // Enter key in input field
    keywordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addKeyword();
        }
    });
    
    // Input validation
    keywordInput.addEventListener('input', validateInput);
    
    // Enable/disable toggle
    enableToggle.addEventListener('change', toggleExtension);
    
    // Clear all button
    clearAllButton.addEventListener('click', clearAllKeywords);
}

// Validate input
function validateInput() {
    const value = keywordInput.value.trim();
    const isValid = value.length > 0 && value.length <= 100;
    addButton.disabled = !isValid;
    
    if (value.length > 100) {
        keywordInput.classList.add('error');
        updateStatus('Keyword too long (max 100 characters)');
    } else {
        keywordInput.classList.remove('error');
        if (value.length > 0) {
            updateStatus('Ready to add');
        } else {
            updateStatus('Ready');
        }
    }
}

// Add new keyword
async function addKeyword() {
    const keyword = keywordInput.value.trim();
    
    if (!keyword) {
        updateStatus('Please enter a keyword');
        return;
    }
    
    if (keyword.length > 100) {
        updateStatus('Keyword too long');
        return;
    }
    
    // Check for duplicates (case-insensitive)
    const exists = keywords.some(k => k.toLowerCase() === keyword.toLowerCase());
    if (exists) {
        updateStatus('Keyword already exists');
        keywordInput.select();
        return;
    }
    
    // Add keyword
    keywords.push(keyword);
    keywordInput.value = '';
    addButton.disabled = true;
    
    await saveKeywords();
    updateUI();
    updateStatus(`Added "${keyword}"`);
    
    // Focus back to input
    keywordInput.focus();
}

// Remove keyword
async function removeKeyword(keyword) {
    const index = keywords.indexOf(keyword);
    if (index > -1) {
        keywords.splice(index, 1);
        await saveKeywords();
        updateUI();
        updateStatus(`Removed "${keyword}"`);
    }
}

// Toggle extension on/off
async function toggleExtension() {
    isEnabled = enableToggle.checked;
    await saveKeywords();
    updateUI();
    updateStatus(isEnabled ? 'Extension enabled' : 'Extension disabled');
}

// Clear all keywords
async function clearAllKeywords() {
    if (keywords.length === 0) {
        updateStatus('No keywords to clear');
        return;
    }
    
    if (confirm(`Remove all ${keywords.length} keywords?`)) {
        keywords = [];
        await saveKeywords();
        updateUI();
        updateStatus('All keywords cleared');
    }
}

// Update UI
function updateUI() {
    updateKeywordsList();
    updateCount();
    updateClearButton();
    updateToggleLabel();
}

// Update keywords list display
function updateKeywordsList() {
    if (keywords.length === 0) {
        keywordsList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🚫</div>
                <div class="empty-text">No keywords added yet</div>
                <div class="empty-subtext">Add keywords above to start blocking websites</div>
            </div>
        `;
        return;
    }
    
    keywordsList.innerHTML = keywords.map(keyword => `
        <div class="keyword-item ${!isEnabled ? 'disabled' : ''}">
            <span class="keyword-text">${escapeHtml(keyword)}</span>
            <button class="remove-button" data-keyword="${escapeHtml(keyword)}" title="Remove keyword">
                ×
            </button>
        </div>
    `).join('');
    
    // Add event listeners to remove buttons
    keywordsList.querySelectorAll('.remove-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const keyword = e.target.getAttribute('data-keyword');
            removeKeyword(keyword);
        });
    });
}

// Update keyword count
function updateCount() {
    keywordCount.textContent = keywords.length;
}

// Update clear button state
function updateClearButton() {
    clearAllButton.disabled = keywords.length === 0;
}

// Update toggle label
function updateToggleLabel() {
    const label = document.querySelector('.toggle-label');
    label.textContent = isEnabled ? 'Enabled' : 'Disabled';
    label.className = `toggle-label ${isEnabled ? 'enabled' : 'disabled'}`;
}

// Update status text
function updateStatus(message) {
    statusText.textContent = message;
    
    // Clear status after 3 seconds
    setTimeout(() => {
        if (statusText.textContent === message) {
            statusText.textContent = 'Ready';
        }
    }, 3000);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}