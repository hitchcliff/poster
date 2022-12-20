import { useSelector } from "react-redux";
import { RootState } from "../store";

// selector
export const useGlobalSelector = () => {
  return useSelector((state: RootState) => state.global);
};
