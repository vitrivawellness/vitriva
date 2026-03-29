const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { Readable } = require('stream');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer for memory storage (we will pipe directly to Cloudinary)
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

exports.uploadSingle = upload.single('image');

exports.uploadImage = async (req, res) => {
  try {
    console.log('--- Upload Start ---');
    if (!req.file) {
      console.error('No file provided in request');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log(`Processing file: ${req.file.originalname} (${req.file.size} bytes)`);

    // Check Cloudinary configuration
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error('CRITICAL: Cloudinary credentials missing in process.env');
      return res.status(500).json({ 
        error: 'Cloudinary not configured', 
        message: 'Backend environment variables for Cloudinary are missing.' 
      });
    }

    console.log('Converting buffer to base64...');
    // Convert buffer to base64 data URI
    const fileBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    
    console.log('Sending to Cloudinary...');
    const result = await cloudinary.uploader.upload(fileBase64, {
      folder: 'vitriva-products',
      resource_type: 'auto'
    });

    console.log('Cloudinary Upload Success:', result.secure_url);
    res.json({ url: result.secure_url });

  } catch (error) {
    console.error('Detailed Upload Error:', error);
    res.status(500).json({ 
      error: 'Upload failed', 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
