

// const { S3Client } = require('@aws-sdk/client-s3');
// const multer = require('multer');
// const multerS3 = require('multer-s3');
//
// let s3 = new S3Client({
//   region:'eu-north-1',
//   credentials: {
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   },
//   sslEnabled: false,
//   s3ForcePathStyle: true,
//   signatureVersion: 'v4',
// });
//
// let upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.AWS_BUCKET_NAME,
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     acl: 'public-read',
//     metadata: function (req, file, cb) {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString() + '-' + file.originalname);
//     },
//   }),
// });

const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

AWS.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region:'eu-north-1'
});

const s3 = new AWS.S3();
// console.log(s3)
// console.log("s3")

const upload = multer({

  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname);
    }
  })
});

module.exports = upload;

