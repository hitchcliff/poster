import { v4 } from "uuid";

export const RenameFile = (filename: string) => {
  const name = new Date().getTime() + "-" + v4() + "_" + filename;

  return name.toLowerCase().replace(/\s+/g, `-`);
};
