import pdfjs, {PDFPageProxy} from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker';
import {PDFDocumentProxy} from 'pdfjs-dist';
import './node_modules/pdfjs-dist/web/pdf_viewer.css';

const {PDFViewer, PDFPageView} = require('pdfjs-dist/web/pdf_viewer.js');

// Notice:
// set document to viewer directly may freeze browser if the pdf is big
function renderPdfInAll(pdfDocument: PDFDocumentProxy) {
  const pdfViewer = new PDFViewer({
    container: document.getElementById('viewerContainer'),
  });

  document.addEventListener('pagesinit', function () {
    // We can use pdfViewer now, e.g. let's change default scale.
    // pdfViewer.currentScaleValue = 'page-width';
  });

  pdfViewer.setDocument(pdfDocument);
}

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

// Notice
// render pages one by one and give some delay time between them
// will give some time to browser to handle events, is better
async function renderPages(pdfDocument: PDFDocumentProxy) {
  await renderPage(pdfDocument, 1);
}

async function renderPage(pdfDocument: PDFDocumentProxy, index: number) {
  if (index > pdfDocument.numPages) {
    return;
  }

  const pdfPage = await pdfDocument.getPage(index);
  const pdfPageViewer = new PDFPageView({
    container: document.getElementById('viewerContainer'),
    defaultViewport: pdfPage.getViewport(1),
  });

  pdfPageViewer.setPdfPage(pdfPage);
  await pdfPageViewer.draw()
  await delay(100);
  await renderPage(pdfDocument, index + 1);
}

async function loadPdf() {
  (pdfjs as any).GlobalWorkerOptions.workerSrc = 'no-worker-can-provided';
  const pdf = await pdfjs.getDocument('/big.pdf').promise
  await renderPages(pdf);
}

loadPdf();
