# human-computer-distraction
Interface leveraging Pomodoro and nudging techniques

**DO NOT ADD FILES TO BaseChromeExtension FOLDER**

Its useful to read through this page if you've never developed on Chrome, but its simple:
- manifest.json specifies all your files and gives you permissions.
- every other file is functionality to your chrome extension.
- https://developer.chrome.com/docs/extensions/mv2/getstarted/

**To add the extension (for developer use):**
- Clone repository to your desktop/laptop
- go to chrome://extensions/ on your chrome browser
- enable developer mode (top right corner on windows chrome)
- click "Load unpacked"
- select the "BaseChromeExtension" folder

**To test out extension:**
- Go to https://developer.chrome.com/ (permissions to use app are currently only on developer sites).
- Go to top right corner, look at extensions, and pin our extension called "Nudged Pomodoros"
- Click on the extension now on the top right corner, a green box should appear.
- Click it, and the background will turn green.
- There is no undo button so you'll need to refresh the page to undo it right now.

- Right click on the extension now, and click "Options"
- Pick a color that isn't green.
- Go to a different tab and try to use the extension again.
- The button should be the color you clicked.
- The page should turn the color of the button you clicked.
