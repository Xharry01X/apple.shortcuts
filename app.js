const fs = require('fs');
const plist = require('plist');
const bplist = require('bplist-creator');

function createShortcut() {
    return {
        WFWorkflowActions: [
            {
                WFWorkflowActionIdentifier: 'is.workflow.actions.ask',
                WFWorkflowActionParameters: {
                    WFAskActionPrompt: 'Enter WiFi network name (SSID)',
                    WFInputType: 'Text'
                }
            },
            {
                WFWorkflowActionIdentifier: 'is.workflow.actions.ask',
                WFWorkflowActionParameters: {
                    WFAskActionPrompt: 'Enter WiFi password',
                    WFInputType: 'Text'
                }
            },
            {
                WFWorkflowActionIdentifier: 'is.workflow.actions.text',
                WFWorkflowActionParameters: {
                    Text: {
                        Value: {
                            String: 'WIFI:S:{{Ask for Input}};;T:WPA;P:{{Ask for Input 2}};;'
                        }
                    }
                }
            },
            {
                WFWorkflowActionIdentifier: 'is.workflow.actions.generateqrcode',
                WFWorkflowActionParameters: {
                    WFInputText: {
                        Value: {
                            Type: 'Variable',
                            VariableName: 'Text'
                        }
                    }
                }
            },
            {
                WFWorkflowActionIdentifier: 'is.workflow.actions.showresult',
                WFWorkflowActionParameters: {
                    Text: {
                        Value: {
                            Type: 'Variable',
                            VariableName: 'QR Code'
                        }
                    }
                }
            }
        ],
        WFWorkflowClientVersion: '754',
        WFWorkflowClientRelease: '2.1.2',
        WFWorkflowMinimumClientVersion: 411,
        WFWorkflowIcon: {
            WFWorkflowIconGlyphNumber: 59511,
            WFWorkflowIconImageData: '',
            WFWorkflowIconStartColor: 2071128575
        },
        WFWorkflowTypes: ['NCWidget', 'WatchKit'],
        WFWorkflowInputContentItemClasses: [
            'WFAppStoreAppContentItem',
            'WFArticleContentItem',
            'WFContactContentItem',
            'WFDateContentItem',
            'WFEmailAddressContentItem',
            'WFGenericFileContentItem',
            'WFImageContentItem',
            'WFiTunesProductContentItem',
            'WFLocationContentItem',
            'WFDCMapsLinkContentItem',
            'WFAVAssetContentItem',
            'WFPDFContentItem',
            'WFPhoneNumberContentItem',
            'WFRichTextContentItem',
            'WFSafariWebPageContentItem',
            'WFStringContentItem',
            'WFURLContentItem'
        ]
    };
}

function generateShortcut() {
    const shortcut = createShortcut();
    const plistData = plist.build(shortcut);
    fs.writeFileSync('WiFiQRShortcut.plist', plistData);
    console.log('Shortcut plist file "WiFiQRShortcut.plist" has been created.');

    const bplistData = bplist(shortcut);
    fs.writeFileSync('WiFiQRShortcut.shortcut', bplistData);
    console.log('Shortcut file "WiFiQRShortcut.shortcut" has been created.');
}

generateShortcut();