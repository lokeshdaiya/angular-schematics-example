import { Tree, SchematicsException } from '@angular-devkit/schematics';
import { DefaultTreeDocument, DefaultTreeElement, parse as parseHtml } from 'parse5';
import { getChildElementIndentation } from '@angular/cdk/schematics/utils';

// Taken and adapted from: @angular/cdk/schematics/utils/html-manipulation

export function appendHtmlElementToTag(host: Tree, htmlFilePath: string, tagName: string, elementHtml: string) {
  const htmlFileBuffer = host.read(htmlFilePath);

  if (!htmlFileBuffer) {
    throw new SchematicsException(`Could not read file for path: ${htmlFilePath}`);
  }

  const htmlContent = htmlFileBuffer.toString();

  if (htmlContent.includes(elementHtml)) {
    return;
  }

  const startTag = getElementByTagName(tagName, htmlContent);

  if (!startTag) {
    throw Error(`Could not find '${tagName}' element in HTML file: ${htmlFileBuffer}`);
  }

  // We always have access to the source code location here because the `getHeadTagElement`
  // function explicitly has the `sourceCodeLocationInfo` option enabled.
  let endTagOffset = startTag.sourceCodeLocation!.endTag.startOffset;
  const indentationOffset = getChildElementIndentation(startTag);
  const insertion = `${' '.repeat(indentationOffset)}${elementHtml}`;

  if (endTagOffset > indentationOffset) {
    endTagOffset -= indentationOffset;
  }

  const recordedChange = host.beginUpdate(htmlFilePath).insertRight(endTagOffset, `\n${insertion}`);

  host.commitUpdate(recordedChange);
}

function getElementByTagName(tagName: string, htmlContent: string): DefaultTreeElement | null {
  const document = parseHtml(htmlContent, { sourceCodeLocationInfo: true }) as DefaultTreeDocument;
  const nodeQueue = [...document.childNodes];

  while (nodeQueue.length) {
    const node = nodeQueue.shift() as DefaultTreeElement;

    if (node.nodeName.toLowerCase() === tagName) {
      return node;
    } else if (node.childNodes) {
      nodeQueue.push(...node.childNodes);
    }
  }

  return null;
}
