import { useCallback, useEffect } from "react";
import GlobalService from "../redux/service/GlobalService";

const useLoadingState = () => {
  const { setLoading } = new GlobalService();

  useEffect(() => {
    setLoading(false); // loaded
  }, []);
};

export default useLoadingState;
