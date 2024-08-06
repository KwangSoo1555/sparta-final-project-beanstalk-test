const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const path = require("path");
require("dotenv").config(); // if you want to use .env file for local credentials

// Configure AWS SDK v3
const s3 = new S3Client({ region: "ap-northeast-2" }); // Adjust region as necessary
const bucketName = "sparta-final-project-beanstalk-test-env";
const fileKey = ".env";
const filePath = path.join(__dirname, ".env");

const run = async () => {
  try {
    const data = await s3.send(
      new GetObjectCommand({
        Bucket: bucketName,
        Key: fileKey,
      }),
    );

    const bodyContents = await streamToString(data.Body);
    fs.writeFileSync(filePath, bodyContents);
    console.log("File downloaded successfully");
  } catch (err) {
    console.error("Error fetching the file:", err);
  }
};

// Helper function to convert a ReadableStream to a string
const streamToString = (stream) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    stream.on("error", reject);
  });

run();
