# Website Blocker Extension

A simple and effective browser extension that blocks websites based on keywords found in URLs or page content. Perfect for improving productivity, blocking distracting content, or implementing parental controls.

## 🚀 Features

- **Keyword-based blocking**: Block websites containing specific keywords in their URL or content
- **Real-time content scanning**: Checks page content as it loads
- **Easy management**: Simple popup interface to add/remove keywords
- **Toggle on/off**: Quickly enable or disable the extension
- **Custom blocked page**: Shows why a site was blocked with clear information
- **Cross-browser compatible**: Works with Chrome, Edge, and other Chromium-based browsers

## 📁 What's Included

This extension consists of 8 files:

1. **manifest.json** - Extension configuration and permissions
2. **background.js** - Handles website blocking logic
3. **content.js** - Scans page content for keywords
4. **popup.html** - User interface for managing keywords
5. **popup.js** - Popup functionality and storage
6. **style.css** - Styling for the popup interface
7. **blocked.html** - Page shown when a site is blocked
8. **blocked.js** - Functionality for the blocked page

## 🛠️ Installation Guide

### Step 1: Download the Extension Files

1. Make sure all 8 files are in the same folder on your computer
2. The folder should contain:
   - manifest.json
   - background.js
   - content.js
   - popup.html
   - popup.js
   - style.css
   - blocked.html
   - blocked.js

### Step 2: Install in Your Browser

#### For Google Chrome:
1. Open Chrome
2. Type `chrome://extensions/` in the address bar and press Enter
3. Turn on **"Developer mode"** (toggle switch in the top-right corner)
4. Click **"Load unpacked"** button
5. Navigate to and select the folder containing all the extension files
6. Click **"Select Folder"**
7. The extension should now appear in your extensions list

#### For Microsoft Edge:
1. Open Edge
2. Type `edge://extensions/` in the address bar and press Enter
3. Turn on **"Developer mode"** (toggle switch in the left sidebar)
4. Click **"Load unpacked"** button
5. Navigate to and select the folder containing all the extension files
6. Click **"Select Folder"**
7. The extension should now appear in your extensions list

#### For Firefox:
1. Open Firefox
2. Type `about:debugging` in the address bar and press Enter
3. Click **"This Firefox"** in the left sidebar
4. Click **"Load Temporary Add-on"**
5. Navigate to the extension folder and select the **manifest.json** file
6. Click **"Open"**

**Note**: In Firefox, the extension will be removed when you restart the browser (temporary installation). For permanent installation, the extension would need to be signed by Mozilla.

### Step 3: Pin the Extension (Recommended)

1. Look for the puzzle piece icon 🧩 in your browser toolbar
2. Click it to see all your extensions
3. Find "Website Blocker" and click the pin icon 📌 next to it
4. The extension icon should now appear directly in your toolbar

## 📖 How to Use

### Adding Keywords to Block

1. **Click the extension icon** in your browser toolbar
2. **Type a keyword** in the input field (e.g., "facebook", "gaming", "news")
3. **Click "Add"** or press Enter
4. The keyword will appear in the list below

### Removing Keywords

1. **Click the extension icon** to open the popup
2. **Find the keyword** you want to remove in the list
3. **Click the "×" button** next to it
4. The keyword will be removed immediately

### Turning the Extension On/Off

1. **Click the extension icon** to open the popup
2. **Use the toggle switch** at the top right
3. When **green/enabled**: Extension is actively blocking websites
4. When **gray/disabled**: Extension is turned off

### Clearing All Keywords

1. **Click the extension icon** to open the popup
2. **Click "Clear All"** at the bottom
3. **Confirm** when asked
4. All keywords will be removed

## 🧪 Testing the Extension

### Test 1: URL Blocking
1. Add "test" as a keyword
2. Try to visit any website with "test" in the URL (e.g., `test.com`)
3. You should see the blocked page instead

### Test 2: Content Blocking
1. Add "example" as a keyword
2. Visit any website that contains the word "example" in its content
3. The page should be blocked and replaced with the blocked page

### Test 3: Social Media Blocking
1. Add "facebook" as a keyword
2. Try to visit `facebook.com`
3. The site should be blocked

### Test 4: Multiple Keywords
1. Add several keywords: "social", "gaming", "entertainment"
2. Try visiting sites that contain these words
3. All matching sites should be blocked

## 🔧 Understanding the Blocked Page

When a website is blocked, you'll see a page with:

- **Large red "🚫 Website Blocked" message**
- **Details about why it was blocked**:
  - URL that was blocked
  - Keyword that triggered the block
  - Whether it was blocked due to URL or content
  - Time when it was blocked
- **Action buttons**:
  - "← Go Back" - Returns to the previous page
  - "⚙️ Settings" - Opens the extension popup
- **Help text** explaining how to unblock sites

### Keyboard Shortcuts on Blocked Page:
- **ESC key**: Go back to previous page
- **Ctrl+S** (or Cmd+S on Mac): Open extension settings

## 🎯 Example Usage Scenarios

### Productivity Focus
- Block social media: Add "facebook", "twitter", "instagram", "tiktok"
- Block entertainment: Add "youtube", "netflix", "gaming"
- Block news during work: Add "news", "breaking"

### Parental Controls
- Block inappropriate content: Add relevant keywords
- Block specific sites: Add "site-name"
- Block gaming during homework time: Add "game", "gaming"

### Study Focus
- Block distracting sites: Add "reddit", "9gag", "meme"
- Block shopping: Add "shop", "buy", "amazon"

## ❓ Troubleshooting

### Extension Not Working?

1. **Check if it's enabled**:
   - Open the popup and make sure the toggle is ON
   - Verify keywords are added to the list

2. **Refresh the page**:
   - After adding keywords, refresh any open tabs
   - The extension checks content when pages load

3. **Check browser permissions**:
   - Go to your browser's extension settings
   - Make sure "Website Blocker" has all permissions enabled

### Keywords Not Blocking?

1. **Check spelling**: Make sure keywords are spelled correctly
2. **Try partial words**: Instead of "facebook.com", just use "facebook"
3. **Case doesn't matter**: "Facebook" and "facebook" work the same
4. **Wait for page load**: Content blocking happens after the page loads

### Can't Access Extension Popup?

1. **Find the extension icon**: Look for it in your browser toolbar
2. **Check the extensions menu**: Click the puzzle piece 🧩 icon
3. **Re-pin the extension**: Pin it to your toolbar for easy access

### Extension Missing After Browser Restart?

- **Chrome/Edge**: This shouldn't happen with proper installation
- **Firefox**: Extensions installed via "Load Temporary Add-on" are removed on restart (this is normal)

## 🔒 Privacy & Security

- **No data collection**: The extension doesn't send any data to external servers
- **Local storage only**: Your keywords are stored locally in your browser
- **No tracking**: The extension doesn't track your browsing habits
- **Open source**: All code is visible and can be reviewed

## 🚫 Limitations

- **Developer mode required**: This extension runs in developer mode (for testing)
- **Firefox temporary**: In Firefox, the extension is removed on browser restart
- **Some sites may bypass**: Advanced websites might use techniques that bypass blocking
- **Content blocking timing**: Very fast-loading content might load before being checked

## 💡 Tips for Best Results

1. **Use simple keywords**: "face" instead of "facebook.com"
2. **Add variations**: Both "youtube" and "video" for comprehensive blocking
3. **Test regularly**: Verify your keywords are working as expected
4. **Keep it updated**: Refresh pages after changing keywords
5. **Use specific terms**: More specific keywords reduce false positives

## 🆘 Need Help?

If you encounter issues:

1. **Check this README** for common solutions
2. **Test with simple keywords** first (like "test")
3. **Verify installation** by checking if the extension appears in your browser's extension list
4. **Try different browsers** to isolate the issue

## 📝 Version Information

- **Version**: 1.0.0
- **Compatibility**: Chrome, Edge, Firefox (temporary)
- **Manifest Version**: 3 (latest standard)

---

**Enjoy a more focused and productive browsing experience with Website Blocker!** 🎯