const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");

// Configure AWS SDK
AWS.config.update({
  region: "ap-northeast-2", // Set your AWS region
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Ensure you have these in your environment variables
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();
const bucketName = "sparta-final-project-beanstalk-test-env";
const fileKey = ".env";
const filePath = path.join(__dirname, ".env");

s3.getObject({ Bucket: bucketName, Key: fileKey }, (err, data) => {
  if (err) {
    console.error("Error fetching the file:", err);
  } else {
    fs.writeFileSync(filePath, data.Body.toString("utf-8"));
    console.log("File downloaded successfully");
  }
});
