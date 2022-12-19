import { setLoadingSlice } from "../features/global.slice";
import { Dispatch } from "../store";

export default class GlobalService {
  setLoading(payload: boolean) {
    Dispatch(setLoadingSlice(payload));
  }
}
