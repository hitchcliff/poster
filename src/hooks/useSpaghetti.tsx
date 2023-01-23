import { useEffect, useState } from "react";

const useSpaghetti = () => {
  const [toggle, setToggle] = useState<any>(false);

  useEffect(() => {
    if (toggle) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }, [toggle]);

  return [toggle, setToggle];
};

export default useSpaghetti;
