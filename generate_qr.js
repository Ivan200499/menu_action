const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const baseURL = 'http://localhost:3000/menu.html?tavolo=';
const outputDir = 'qrcodes';

// Numero di tavoli nel ristorante
const numberOfTables = 40;

// Crea la directory di output se non esiste
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// Genera un QR code per ogni tavolo
for (let i = 1; i <= numberOfTables; i++) {
    const url = `${baseURL}${i}`;
    const outputFilePath = path.join(outputDir, `tavolo${i}.png`);

    QRCode.toFile(outputFilePath, url, { width: 300 }, (err) => {
        if (err) throw err;
        console.log(`QR Code generato per Tavolo ${i}: ${outputFilePath}`);
    });
}
