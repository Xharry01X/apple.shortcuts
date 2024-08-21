const { execSync } = require('child_process');

const shortcutName = 'My Shortcut';
const shortcutContent = `
tell application "Shortcuts"
    create new shortcut with properties {name:"${shortcutName}"}
    add action "Send Message" to shortcut "${shortcutName}" with properties {text:"Hello, world!"}
    save
end tell
`;

try {
    execSync(`osascript -e '${shortcutContent}'`);
    console.log(`Shortcut "${shortcutName}" created.`);
} catch (err) {
    console.error('Error creating shortcut:', err);
}