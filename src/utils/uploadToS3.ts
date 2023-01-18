import axios from "axios";
import { v4 } from "uuid";

interface uploadToS3Props {
  file: File;
  signedRequest: any;
}

const uploadToS3 = async ({ file, signedRequest }: uploadToS3Props) => {
  // sends the file to s3
  try {
    const options = {
      headers: {
        "Content-Type": file.type,
      },
    };
    const { data } = await axios.put(signedRequest, file, options);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export default uploadToS3;

export const RenameFile = ({ file }: any) => {
  const f = file as File;

  const name = f.lastModified + "-" + v4() + "_" + f.name;

  return name;
};
