import fs from 'fs';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

async function run() {
  try {
    const existingPdfBytes = fs.readFileSync('public/fiche_rc_decennale.pdf');
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    const formatCurrency = (val) => {
      if (!val) return '';
      const num = parseFloat(val);
      return isNaN(num) ? val : num.toFixed(2).replace('.', ',');
    };

    const pages = pdfDoc.getPages();
    const page3 = pages[2];

    const drawText = (page, text, x, y, size = 10, color = rgb(1, 1, 1), font = helveticaBoldFont) => {
      if (!text) return;
      page.drawText(text.toString(), {
        x,
        y,
        size,
        font: font,
        color: color,
      });
    };

    // Simulate drawing
    drawText(page3, formatCurrency('2000'), 260, 750, 11, rgb(0, 0, 0), helveticaBoldFont);
    drawText(page3, formatCurrency('2400.00'), 349, 750, 11, rgb(0, 0, 0), helveticaBoldFont);

    const pdfBytes = await pdfDoc.save();
    console.log('PDF saved successfully, size:', pdfBytes.length);
  } catch (err) {
    console.error('Error generating PDF:', err);
  }
}

run();
