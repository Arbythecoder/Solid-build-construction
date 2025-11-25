const multer = require('multer');
const path = require('path');
const ErrorResponse = require('../utils/errorResponse');

// Premium storage configuration
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const uploadPath = req.user?.isPremium ? 'uploads/premium/' : 'uploads/standard/';
        cb(null, uploadPath);
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

// Enhanced file filter for premium uploads
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp|heic|raw/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        // Allow larger files for premium users
        if (req.user?.isPremium && file.size > 10 * 1024 * 1024) {
            cb(new ErrorResponse('Premium file size exceeded (10MB)', 400));
            return;
        }
        if (!req.user?.isPremium && file.size > 5 * 1024 * 1024) {
            cb(new ErrorResponse('Standard file size exceeded (5MB)', 400));
            return;
        }
        return cb(null, true);
    }
    cb(new ErrorResponse('Invalid file type. Supported: JPG, PNG, WEBP, HEIC, RAW', 400));
};

// Premium upload configuration
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10, // 10MB max for premium
        files: 10 // Maximum 10 files per upload
    },
    fileFilter: fileFilter
});

module.exports = {
    single: upload.single.bind(upload),
    array: upload.array.bind(upload),
    fields: upload.fields.bind(upload),
    premiumUpload: (fieldName, maxCount) => {
        return [
            (req, res, next) => {
                if (!req.user?.isPremium) {
                    return next(new ErrorResponse('Premium subscription required', 403));
                }
                next();
            },
            upload.array(fieldName, maxCount)
        ];
    }
};