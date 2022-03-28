const puppeteer = require("puppeteer");

const Fs = require("fs");
const Path = require("path");
const Util = require("util");
const { options } = require("../routes/pdf");
const ReadFile = Util.promisify(Fs.readFile);

async function html() {
  try {
    const htmlPath = Path.join(__dirname, "../invoice.html");
    const content = await ReadFile(htmlPath, "utf8");
    return content
  } catch (error) {
    console.log("Cannot read html file");
  }
}

async function generatePDF(req, res) {
  html().then(async (data) => {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })

    const convertpage = await browser.newPage();

    await convertpage.setContent(data);

    const pdfbuffer = await convertpage.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true
    })

    res.set('Content-Type', 'application/pdf');
    res.status(201).send(Buffer.from(pdfbuffer, 'binary'));
  })
}

module.exports.generatePDF = generatePDF;