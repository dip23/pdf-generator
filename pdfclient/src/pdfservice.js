import http from "./httpservice";

const apiURL = "http://localhost:8080/api/pdf/getpdf";

const pdfService = {
  downloadPDF: function () {
    return http.get(apiURL, {
      responseType: 'blob',
      headers: {
        'Accept': 'application/pdf'
      }
    })
  }
}

export default pdfService;