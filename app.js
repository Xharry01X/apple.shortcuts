const fs = require('fs');
const plist = require('plist');
const bplist = require('bplist-creator');

function createShortcut() {
    return {
        WFWorkflowActions: [
            {
                WFWorkflowActionIdentifier: 'is.workflow.actions.ask',
                WFWorkflowActionParameters: {
                    WFAskActionPrompt: { Value: { String: 'Enter WiFi network name (SSID)' } },
                    WFInputType: { Value: 'Text' }
                }
            },
            {
                WFWorkflowActionIdentifier: 'is.workflow.actions.ask',
                WFWorkflowActionParameters: {
                    WFAskActionPrompt: { Value: { String: 'Enter WiFi password' } },
                    WFInputType: { Value: 'Text' }
                }
            },
            {
                WFWorkflowActionIdentifier: 'is.workflow.actions.text',
                WFWorkflowActionParameters: {
                    Text: { Value: { String: 'WIFI:S:{{Ask for Input}};;T:WPA;P:{{Ask for Input 2}};;' } }
                }
            },
            {
                WFWorkflowActionIdentifier: 'is.workflow.actions.generateqrcode',
                WFWorkflowActionParameters: {
                    WFInputText: { Value: { Type: 'Variable', VariableName: 'Text' } }
                }
            },
            {
                WFWorkflowActionIdentifier: 'is.workflow.actions.showresult',
                WFWorkflowActionParameters: {
                    Text: { Value: { Type: 'Variable', VariableName: 'QR Code' } }
                }
            }
        ],
        WFWorkflowClientVersion: '1050',
        WFWorkflowClientRelease: '2.1.2',
        WFWorkflowIcon: {
            WFWorkflowIconStartColor: 4282601983,
            WFWorkflowIconGlyphNumber: 59511
        },
        WFWorkflowImportQuestions: [],
        WFWorkflowTypes: ['ncwidget', 'watch', 'quicklook'],
        WFWorkflowActions: []
    };
}

function generateShortcut() {
    const shortcut = createShortcut();
    const plistData = plist.build(shortcut);
    const bplistData = bplist(plistData);
    fs.writeFileSync('WiFiQRShortcut.shortcut', bplistData);
    console.log('Shortcut file "WiFiQRShortcut.shortcut" has been created.');
}

generateShortcut();