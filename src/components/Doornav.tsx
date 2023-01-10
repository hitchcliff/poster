import { useState } from "react";

interface DoornavProps {
  buttons: string[];
  children: any;
}

const Doornav = ({ buttons, ...props }: DoornavProps) => {
  const [id, set] = useState(0);

  return (
    <div className="doornav">
      <div className="doornav-btns">
        {buttons.map((item, idx) => (
          <button
            className={`doornav__btn ${id === idx ? "active" : ""}`}
            key={idx}
            onClick={() => set(idx)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="doornav-children">{props.children[id]}</div>
    </div>
  );
};

export default Doornav;
