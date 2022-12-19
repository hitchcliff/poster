import { say } from "../features/hello.slice";
import { Dispatch } from "../store";

export default class HelloService {
  say(payload: string) {
    Dispatch(say(payload));
  }
}
