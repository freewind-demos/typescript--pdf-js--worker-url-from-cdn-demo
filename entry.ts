import pdfjs, {PDFDocumentProxy} from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker';
import './node_modules/pdfjs-dist/web/pdf_viewer.css';

const {PDFViewer} = require('pdfjs-dist/web/pdf_viewer.js');

const workerUrl = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.943/pdf.worker.min.js';

// Notice:
// set document to viewer directly may freeze browser if the pdf is big
function renderPdfInAll(pdfDocument: PDFDocumentProxy) {
  const pdfViewer = new PDFViewer({
    container: document.getElementById('viewerContainer'),
  });

  pdfViewer.setDocument(pdfDocument);
}

async function loadPdf() {
  (pdfjs as any).GlobalWorkerOptions.workerSrc = workerUrl;
  const pdf = await pdfjs.getDocument('/big.pdf').promise
  await renderPdfInAll(pdf);
}

loadPdf();
