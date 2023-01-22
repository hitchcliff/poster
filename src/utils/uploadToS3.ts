import axios from "axios";
import dayjs from "dayjs";
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

    await axios.put(signedRequest, { data: file });
  } catch (error) {
    console.error("Kevin Error: ", error);
  }
};

export default uploadToS3;
