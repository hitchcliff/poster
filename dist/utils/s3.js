"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3 = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const RenameFile_1 = require("./RenameFile");
const s3 = async ({ foldername, filename, type }) => {
    const BUCKET_NAME = process.env.BUCKET_NAME;
    const REGION_CODE = process.env.REGION_CODE;
    const ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
    const SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
    const client = new client_s3_1.S3Client({
        credentials: {
            accessKeyId: ACCESS_KEY_ID ? ACCESS_KEY_ID : "",
            secretAccessKey: SECRET_ACCESS_KEY ? SECRET_ACCESS_KEY : "",
        },
        region: process.env.REGION_CODE,
    });
    const folder = foldername ? `${foldername}/` : "";
    const uniqueName = (0, RenameFile_1.RenameFile)(filename);
    const options = {
        Bucket: BUCKET_NAME,
        Key: folder + uniqueName,
        ContentType: type,
        Tagging: "public=yes",
    };
    const command = new client_s3_1.PutObjectCommand(options);
    const signedRequest = await (0, s3_request_presigner_1.getSignedUrl)(client, command);
    const url = `https://${BUCKET_NAME}.s3.${REGION_CODE}.amazonaws.com/${folder}${uniqueName}`;
    return {
        url,
        signedRequest,
    };
};
exports.s3 = s3;
//# sourceMappingURL=s3.js.map