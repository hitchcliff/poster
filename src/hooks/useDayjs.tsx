import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";

dayjs.extend(relativeTime);

interface useDayjsProps {
  fromNow?: string;
}

const useDayjs = ({ fromNow }: useDayjsProps) => {
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const controller = new AbortController();

    if (fromNow) {
      const d = dayjs(fromNow);
      const result = d.fromNow();

      const substrings = ["a few", "a minute", "an hour"];

      if (substrings.some((v) => result.includes(v))) {
        setDate(result);
        return;
      }

      setDate(d.fromNow(true));
    }

    return () => {
      controller.abort();
    };
  }, [fromNow]);

  return date;
};

export default useDayjs;
