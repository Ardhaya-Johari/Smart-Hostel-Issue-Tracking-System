const cloudinary = require('cloudinary').v2;

// Configure Cloudinary (ensure env vars are set in .env)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (fileBuffer, folder = 'hostel-uploads') => {
  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder, resource_type: 'auto' }, // Auto-detect image/video
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(fileBuffer);
    });
    return result.secure_url; // Return the secure URL
  } catch (error) {
    throw new Error('Cloudinary upload failed: ' + error.message);
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw new Error('Cloudinary delete failed: ' + error.message);
  }
};

module.exports = { uploadToCloudinary, deleteFromCloudinary };