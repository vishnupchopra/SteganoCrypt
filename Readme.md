# 🔐 SteganoCrypt - Advanced Image Steganography Tool

A modern, web-based steganography application that allows you to hide secret messages within images using advanced LSB (Least Significant Bit) techniques. Built with vanilla HTML, CSS, and JavaScript for maximum compatibility and performance.

![SteganoCrypt Demo](https://img.shields.io/badge/Status-Live-brightgreen) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

### 🔒 **Secure Message Hiding**
- Hide secret messages invisibly within image files
- Optional password protection with XOR encryption
- Support for messages up to 500 characters
- Maintains original image quality

### 👁️ **Message Revelation**
- Extract hidden messages from steganographic images
- Password-protected decryption when applicable
- Robust error handling for corrupted data
- Clear success/failure feedback

### 🎨 **Modern Interface**
- Beautiful gradient design with glassmorphism effects
- Fully responsive layout (desktop, tablet, mobile)
- Intuitive tab-based navigation
- Real-time image previews
- Drag-and-drop style file selection

### 🔧 **Technical Excellence**
- **LSB Steganography**: Uses RGB color channels for data hiding
- **Multiple Formats**: Supports PNG, JPG, and JPEG files
- **Client-Side Processing**: Complete privacy - no data sent to servers
- **Cross-Browser Compatible**: Works on all modern browsers
- **No Dependencies**: Pure vanilla JavaScript implementation

## 🚀 Demo

**[Try SteganoCrypt Live](https://vishnupchopra.github.io/SteganoCrypt/)**

## 📋 How It Works

### Hiding a Message (Encoding)
1. **Select Cover Image**: Choose a PNG/JPG image to hide your message in
2. **Enter Secret Message**: Type your confidential message (max 500 chars)
3. **Add Password** (Optional): Enhance security with password protection
4. **Generate**: Click "Hide Message in Image" to create the steganographic image
5. **Download**: Save the encoded image with your hidden message

### Revealing a Message (Decoding)
1. **Upload Encoded Image**: Select the image containing the hidden message
2. **Enter Password** (If Used): Provide the password used during encoding
3. **Extract**: Click "Reveal Hidden Message" to decode the secret
4. **View Result**: Your hidden message will be displayed

## 🛠️ Installation & Usage

### Option 1: Direct Use
1. Download the `index.html` file
2. Open it in any modern web browser
3. Start hiding and revealing messages immediately!

### Option 2: Local Development
```bash
# Clone the repository
git clone https://github.com/vishnupchopra/SteganoCrypt.git

# Navigate to project directory
cd steganocrypt

# Open in browser
open index.html
```

### Option 3: GitHub Pages
1. Fork this repository
2. Enable GitHub Pages in repository settings
3. Access your live version at `https://your-username.github.io/steganocrypt`

## 🔬 Technical Details

### Steganography Algorithm
- **Method**: LSB (Least Significant Bit) manipulation
- **Channels**: RGB color channels (excludes alpha)
- **Capacity**: ~3 bits per pixel (1 bit per color channel)
- **Delimiter**: Uses "###END###" marker for message boundaries

### Security Features
- **Encryption**: XOR cipher with user-provided password
- **Data Integrity**: Message delimiter ensures complete extraction
- **Privacy**: All processing happens client-side

### Browser Support
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 📁 File Structure

```
steganocrypt/
├── index.html          # Complete application (HTML + CSS + JS)
├── README.md          # This file
└── demo/              # Demo images and examples
    ├── sample-cover.jpg
    ├── sample-encoded.png
    └── examples.md
```

## 🎯 Use Cases

- **Secure Communication**: Send confidential messages hidden in innocent images
- **Digital Watermarking**: Embed copyright or ownership information
- **Educational Projects**: Learn about steganography and information security
- **Privacy Protection**: Communicate sensitive information covertly
- **Data Backup**: Hide important text data within image files

## ⚠️ Important Notes

### Limitations
- **Message Length**: Maximum 500 characters per image
- **Image Size**: Larger images can hold longer messages
- **Format Support**: PNG recommended for best results (lossless)
- **Compression**: JPEG compression may affect hidden data integrity

### Security Considerations
- **Password Strength**: Use strong passwords for sensitive messages
- **Image Sharing**: Be aware that anyone with the tool can attempt to decode
- **Steganographic Detection**: Advanced tools may detect presence of hidden data
- **Not Cryptographically Secure**: Suitable for privacy, not high-security applications

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow existing code style and structure
- Test on multiple browsers and devices
- Update documentation for new features
- Ensure backward compatibility

### Ideas for Contributions
- [ ] Support for additional image formats (GIF, WebP)
- [ ] Advanced encryption algorithms (AES, RSA)
- [ ] Batch processing for multiple images
- [ ] Steganographic analysis and detection tools
- [ ] Mobile app version
- [ ] Browser extension

## 🌟 Acknowledgments

- Inspired by classic steganography techniques and modern web development practices
- Built with love for the cybersecurity and privacy community

## 📞 Support

- **Email**: vishnuchopra58@gmail.com

---

**⭐ If you find SteganoCrypt useful, please consider starring the repository!**

Made with ❤️ by [Vishnu Chopra](https://github.com/vishnupchopra/SteganoCrypt)
