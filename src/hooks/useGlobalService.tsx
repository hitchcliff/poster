import { useMemo } from "react";
import GlobalService from "../redux/service/GlobalService";

const useGlobalService = () => {
  return useMemo(() => new GlobalService(), []);
};

export default useGlobalService;
