import { say } from "../features/hello.slice";
import { Dispatch, store } from "../store";

export default class HelloService {
  say(payload: string) {
    Dispatch(say(payload));
  }
}
