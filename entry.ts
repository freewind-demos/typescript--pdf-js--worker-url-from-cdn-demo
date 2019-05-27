import pdfjs from 'pdfjs-dist';
import {PDFDocumentProxy} from 'pdfjs-dist';
import './node_modules/pdfjs-dist/web/pdf_viewer.css';

const x = require('pdfjs-dist/web/pdf_viewer.js');
console.log('### x:', Object.keys(x));

const {PDFViewer} = x as any;

function renderInViewer(pdfDocument: PDFDocumentProxy) {
  const pdfViewer = new PDFViewer({
    container: document.getElementById('viewerContainer'),
  });

  document.addEventListener('pagesinit', function () {
    // We can use pdfViewer now, e.g. let's change default scale.
    pdfViewer.currentScaleValue = 'page-width';
  });

  pdfViewer.setDocument(pdfDocument);
}


async function loadPdf() {
  const pdf = await pdfjs.getDocument('http://localhost:46345/dummy.pdf').promise
  renderInViewer(pdf);
}

loadPdf();
