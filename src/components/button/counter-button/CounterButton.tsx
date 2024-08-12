import "./CounterButton.css";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

type ButtonProps = {
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

export const CounterButton = ({ style, children }: ButtonProps) => {
  return (
    <div className="counter-button">
      <button>
        <AiOutlineMinus />
      </button>
      <p>2</p>
      <button>
        <AiOutlinePlus />
      </button>
    </div>
  );
};
