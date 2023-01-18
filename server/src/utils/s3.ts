import { Upload } from "../resolvers/photo";
import { S3 } from "@aws-sdk/client-s3";

interface s3Props extends Upload {
  foldername?: string;
}

export const s3 = async ({ filename, mimetype, foldername }: s3Props) => {
  const BUCKET_NAME = process.env.BUCKET_NAME;
  const REGION_CODE = process.env.REGION_CODE;
  const ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
  const SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

  const client = new S3({
    credentials: {
      accessKeyId: ACCESS_KEY_ID ? ACCESS_KEY_ID : "",
      secretAccessKey: SECRET_ACCESS_KEY ? SECRET_ACCESS_KEY : "",
    },
    region: process.env.REGION_CODE,
  });

  const folder = foldername ? `${foldername}/` : "";

  const signedRequest = await client.putObject({
    Bucket: BUCKET_NAME,
    Key: folder + filename,
    ContentType: mimetype,
  });

  const url = `https://${BUCKET_NAME}.s3.${REGION_CODE}.amazonaws.com/${folder}${filename}`;

  return {
    signedRequest,
    url,
  };
};
