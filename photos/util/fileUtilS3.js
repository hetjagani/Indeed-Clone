const aws = require('aws-sdk');
const { ObjectId } = require('mongodb');
const fs = require('fs');

const s3 = new aws.S3({
  secretAccessKey: global.gConfig.s3_secret_key,
  accessKeyId: global.gConfig.s3_access_key,
  region: global.gConfig.s3_region,
});

const uploadFileToS3 = (fileName) => {
  try{
    const fileContent = fs.readFileSync(fileName.path);
  
    const params = {
      ACL: 'public-read',
      Bucket: global.gConfig.s3_bucket_name,
      Body: fileContent,
      Key: new ObjectId().toString(),
    };
  
    const data = s3.upload(params).promise();
    fs.unlinkSync(fileName.path);
    return data;
  }catch(err){
      throw err;
  }
};

const deleteFileFromS3 = (key) => {
  try{
    s3.deleteObject({
      Bucket: global.gConfig.s3_bucket_name,
      Key: key,
    });
  }catch(err){
    throw err;
  }
};

module.exports = { uploadFileToS3, deleteFileFromS3 };
