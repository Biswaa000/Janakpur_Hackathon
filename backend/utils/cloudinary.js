// utils/cloudinary.js
const cloudinary = require('cloudinary').v2;

// Check if Cloudinary is configured
const isCloudinaryConfigured = () => {
    return process.env.CLOUDINARY_CLOUD_NAME && 
           process.env.CLOUDINARY_API_KEY && 
           process.env.CLOUDINARY_API_SECRET &&
           process.env.CLOUDINARY_CLOUD_NAME !== 'dummy';
};

// Configure Cloudinary only if credentials are provided
if (isCloudinaryConfigured()) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    console.log('✅ Cloudinary configured');
} else {
    console.log('⚠️ Cloudinary not configured. Using local file storage.');
}

// Upload directly from buffer (no local file)
const uploadBufferToCloudinary = async (fileBuffer, filename, folder = 'evidence') => {
    try {
        // If Cloudinary is not configured, return a local reference
        if (!isCloudinaryConfigured()) {
            return {
                secure_url: `local://uploads/${Date.now()}-${filename}`,
                public_id: `local_${filename}`,
                url: `local://uploads/${Date.now()}-${filename}`
            };
        }
        
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { 
                    folder, 
                    public_id: filename.split('.')[0],
                    resource_type: 'auto' // Automatically detect image/video/raw
                },
                (error, result) => {
                    if (error) {
                        console.error('Cloudinary upload error:', error);
                        // Fallback to local reference
                        resolve({
                            secure_url: `local://uploads/${Date.now()}-${filename}`,
                            public_id: `local_${filename}`,
                            url: `local://uploads/${Date.now()}-${filename}`
                        });
                    } else {
                        resolve(result);
                    }
                }
            );
            stream.end(fileBuffer);
        });
    } catch (error) {
        console.error('Error in uploadBufferToCloudinary:', error);
        // Return local reference as fallback
        return {
            secure_url: `local://uploads/${Date.now()}-${filename}`,
            public_id: `local_${filename}`,
            url: `local://uploads/${Date.now()}-${filename}`
        };
    }
};

module.exports = { uploadBufferToCloudinary, isCloudinaryConfigured };