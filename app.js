const fs = require('fs');
const plist = require('plist');

function createShortcut() {
  return {
    WFWorkflowActions: [
      {
        WFWorkflowActionIdentifier: 'is.workflow.actions.ask',
        WFWorkflowActionParameters: {
          WFAskActionPrompt: 'Enter the first number',
          WFInputType: 'Number'
        }
      },
      {
        WFWorkflowActionIdentifier: 'is.workflow.actions.ask',
        WFWorkflowActionParameters: {
          WFAskActionPrompt: 'Enter the second number',
          WFInputType: 'Number'
        }
      },
      {
        WFWorkflowActionIdentifier: 'is.workflow.actions.math',
        WFWorkflowActionParameters: {
          WFMathOperation: 'Add',
          WFMathOperand: {
            Value: {
              Type: 'Variable',
              VariableName: 'Ask for Input'
            }
          }
        }
      },
      {
        WFWorkflowActionIdentifier: 'is.workflow.actions.showresult',
        WFWorkflowActionParameters: {
          Text: {
            Value: {
              String: 'Hello World! The sum is {{Calculation Result}}'
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
  
  // Add XML declaration and DOCTYPE
  const xmlDeclaration = '<?xml version="1.0" encoding="UTF-8"?>';
  const doctype = '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">';
  const fullPlistData = `${xmlDeclaration}\n${doctype}\n${plistData}`;
  
  fs.writeFileSync('HelloWorldAddition.shortcut', fullPlistData, 'utf8');
  console.log('Shortcut file "HelloWorldAddition.shortcut" has been created.');
}

generateShortcut();