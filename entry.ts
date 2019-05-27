import pdfjs, {PDFPageProxy} from 'pdfjs-dist';

function renderPage(page: PDFPageProxy) {
  const scale = 1.5;
  const viewport = page.getViewport(scale);

  const canvas = document.getElementById('pdf-canvas') as HTMLCanvasElement;
  const context = canvas.getContext('2d')!;
  canvas.height = viewport.height;
  canvas.width = viewport.width;

  const renderContext = {
    canvasContext: context,
    viewport: viewport
  };
  page.render(renderContext);
}

async function loadPdf() {
  const pdf = await pdfjs.getDocument('http://localhost:46345/dummy.pdf').promise
  const page = await pdf.getPage(1)
  renderPage(page);
}

loadPdf();
