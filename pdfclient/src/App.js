import './App.css';
import pdfService from './pdfservice';

function App() {
  return (
    <div className="App">
      <button onClick={downloadPDFFile}>Download</button>
    </div>
  );
}

const downloadPDFFile = async () => {
  try {
    return pdfService.downloadPDF().then((res) => {
      const filename = "demopdf.pdf";

      const blobobj = new Blob([res.data], { type: 'application/pdf' });
      const anchorLink = document.createElement('a');
      anchorLink.href = window.URL.createObjectURL(blobobj);
      anchorLink.setAttribute('download', filename);
      anchorLink.click();
    })
  } catch (error) {
    console.log(error);
  }
}

export default App;
