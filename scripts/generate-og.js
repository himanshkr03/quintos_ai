const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Create a valid 1200x630 PNG with Quintos AI branding
function createOGImage() {
  const width = 1200;
  const height = 630;
  
  // Create raw RGB pixel buffer
  const rawData = Buffer.alloc((width * 3 + 1) * height);
  
  for (let y = 0; y < height; y++) {
    const rowOffset = y * (width * 3 + 1);
    rawData[rowOffset] = 0; // Filter byte: None
    
    // Gradient from Deep Slate (#0B0F19) to Deep Indigo/Blue (#1E1B4B)
    const t = y / height;
    const r = Math.round(11 + (30 - 11) * t);
    const g = Math.round(15 + (27 - 15) * t);
    const b = Math.round(25 + (75 - 25) * t);

    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 3;
      
      // Add subtle blue/cyan center glow
      const dx = (x - width / 2) / (width / 2);
      const dy = (y - height / 2) / (height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);
      const glow = Math.max(0, 1 - dist) * 0.35;
      
      rawData[pixelOffset] = Math.min(255, Math.round(r + glow * 37));
      rawData[pixelOffset + 1] = Math.min(255, Math.round(g + glow * 99));
      rawData[pixelOffset + 2] = Math.min(255, Math.round(b + glow * 235));
    }
  }

  const compressedData = zlib.deflateSync(rawData);

  function createChunk(type, data) {
    const len = data.length;
    const buf = Buffer.alloc(12 + len);
    buf.writeUInt32BE(len, 0);
    buf.write(type, 4);
    data.copy(buf, 8);
    
    // CRC32 calculation
    let crc = 0xFFFFFFFF;
    for (let i = 4; i < 8 + len; i++) {
      let byte = buf[i];
      for (let j = 0; j < 8; j++) {
        if ((crc ^ byte) & 1) {
          crc = (crc >>> 1) ^ 0xEDB88320;
        } else {
          crc = crc >>> 1;
        }
        byte >>>= 1;
      }
    }
    crc = crc ^ 0xFFFFFFFF;
    buf.writeInt32BE(crc, 8 + len);
    return buf;
  }

  // PNG Header
  const pngHeader = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  
  // IHDR Chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // Bit depth: 8
  ihdrData[9] = 2; // Color type: Truecolor (RGB)
  ihdrData[10] = 0; // Compression: Deflate
  ihdrData[11] = 0; // Filter: Standard
  ihdrData[12] = 0; // Interlace: None
  const ihdrChunk = createChunk('IHDR', ihdrData);

  // IDAT Chunk
  const idatChunk = createChunk('IDAT', compressedData);

  // IEND Chunk
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  const finalPng = Buffer.concat([pngHeader, ihdrChunk, idatChunk, iendChunk]);

  const pubDir = path.resolve(__dirname, '../public');
  const imgDir = path.resolve(pubDir, 'images');
  
  if (!fs.existsSync(imgDir)) {
    fs.mkdirSync(imgDir, { recursive: true });
  }

  fs.writeFileSync(path.resolve(pubDir, 'og-image.png'), finalPng);
  fs.writeFileSync(path.resolve(imgDir, 'og-image.png'), finalPng);
  console.log('OG image successfully created at public/og-image.png and public/images/og-image.png');
}

createOGImage();
