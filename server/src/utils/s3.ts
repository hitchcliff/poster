import {
  GetObjectCommand,
  PutObjectAclCommand,
  PutObjectAclCommandInput,
  PutObjectCommand,
  PutObjectCommandInput,
  PutObjectTaggingCommand,
  PutObjectTaggingCommandInput,
  PutObjectTaggingRequest,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { UploadImgInput } from "src/resolvers/photo";
import { RenameFile } from "./RenameFile";

interface s3Props extends UploadImgInput {
  foldername?: string;
  // file: FileUpload;
}

export const s3 = async ({ foldername, filename, type }: s3Props) => {
  const BUCKET_NAME = process.env.BUCKET_NAME;
  const REGION_CODE = process.env.REGION_CODE;
  const ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
  const SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

  const client = new S3Client({
    credentials: {
      accessKeyId: ACCESS_KEY_ID ? ACCESS_KEY_ID : "",
      secretAccessKey: SECRET_ACCESS_KEY ? SECRET_ACCESS_KEY : "",
    },
    region: process.env.REGION_CODE,
  });

  // File/s that will be uploaded
  // const { createReadStream, filename, mimetype } = file;

  const folder = foldername ? `${foldername}/` : "";
  const uniqueName = RenameFile(filename);

  // Bucket input
  const options = {
    Bucket: BUCKET_NAME,
    Key: folder + uniqueName,
    ContentType: type,
    Tagging: "public=yes",
  } as PutObjectCommandInput;

  // Put command
  const command = new PutObjectCommand(options);

  // Signed Request
  const signedRequest = await getSignedUrl(client, command);

  // Expected path
  const url: string = `https://${BUCKET_NAME}.s3.${REGION_CODE}.amazonaws.com/${folder}${uniqueName}`;

  return {
    url,
    signedRequest,
  };
};
