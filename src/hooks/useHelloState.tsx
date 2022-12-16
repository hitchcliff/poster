import { useMemo } from "react";
import HelloService from "../redux/service/HelloService";

const useHelloState = () => {
  return useMemo(() => {
    return new HelloService();
  }, []);
};

export default useHelloState;
