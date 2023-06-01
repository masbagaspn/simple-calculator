import { useState } from "react";
import { buttons as data } from "./button";
function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(0);
  const [display, setDisplay] = useState(0);

  const handleNumber = (value) => {
    const operator = ["*", "/", "+", "-"];
    const isLastOperator = operator.includes(display);

    if (!operator.includes(display) && result !== 0) {
      setDisplay(value);
      setInput(value);
      setResult(0);
    }

    if (operator.includes(display) && result !== 0) {
      setDisplay(value);
      setInput(`${input}${value}`);
    }

    if (operator.includes(display) && result === 0) {
      setDisplay(value);
      setInput(`${input}${value}`);
    }
    if (display && !isLastOperator && result === 0) {
      setDisplay(`${display}${value}`);
      setInput(`${input}${value}`);
    }
    if (!display && result === 0) {
      setInput(value);
      setDisplay(value);
    }
  };

  const handleOperator = (value) => {
    const operator = ["*", "/", "+", "-"];
    const isLastOperator = operator.includes(display);
    const isLastMinusOperator = display === "-";

    if (isLastMinusOperator && value === "-") {
      const check = [...input]
        .slice(-2)
        .every((char) => operator.includes(char));

      if (check) return;

      if (!check) {
        setInput(`${input}${value}`);
        setDisplay(value);
      }
    }

    if (isLastMinusOperator && value !== "-") {
      const check = [...input]
        .slice(-2)
        .every((char) => operator.includes(char));
      if (check) {
        setInput(`${input.toString().slice(0, -2)}${value}`);
      }
      if (!check) {
        setInput(`${input.toString().slice(0, -1)}${value}`);
      }
      setDisplay(value);
    }

    if (isLastOperator && !isLastMinusOperator && value !== "-") {
      setInput(`${input.toString().slice(0, -1)}${value}`);
      setDisplay(value);
    }

    if (!isLastOperator || value === "-") {
      setInput(`${input}${value}`);
      setDisplay(value);
    }
  };

  const handleEqual = () => {
    setInput(eval(input));
    setDisplay(eval(input));
    setResult(eval(input));
  };

  const handleReset = () => {
    setDisplay(0);
    setInput("");
    setResult(0);
  };

  const handleDecimal = () => {
    if (!display.toString().includes(".")) {
      setDisplay(`${display}.`);
      setInput(`${input}.`);
    }
  };

  const handleClick = (type, value) => {
    if (type === "number") {
      handleNumber(value);
    }
    if (type === "operator") {
      handleOperator(value);
    }
    if (type === "calculate") {
      handleEqual();
    }
    if (type === "reset") {
      handleReset();
    }
    if (type === "decimal") {
      handleDecimal();
    }
  };

  return (
    <main className="max-w-screen min-h-screen bg-[#f4f2f3] grid place-content-center">
      <div className="w-[50vmin] h-[80vmin] bg-[#22252d] rounded-[1.5rem] overflow-hidden">
        {/* screen text */}
        <div className="h-1/3 flex flex-1 flex-col justify-end items-end p-8">
          <span className="text-white/50">{input}</span>
          <span
            id="display"
            className="w-full flex flex-wrap text-white text-2xl text-right justify-end"
          >
            {display}
          </span>
        </div>
        {/* calculator */}
        <div className="h-2/3 bg-[#292d36] rounded-[1.5rem] grid grid-rows-5 gap-4 p-8">
          {data.map(
            (items, index) =>
              index < 3 && (
                <div key={index} className="grid grid-cols-4 gap-4">
                  {items.map((item) => (
                    <button
                      className={`button ${item.type}`}
                      key={item.id}
                      id={item.id}
                      onClick={() => handleClick(item.type, item.title)}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              )
          )}
          <div className="row-span-2 grid grid-cols-4 grid-rows-2 gap-4">
            {data[data.length - 1].map((items) => (
              <button
                key={items.id}
                id={items.id}
                className={`button ${items.type} ${
                  items.id === "zero" && "col-span-2"
                }`}
                onClick={() => handleClick(items.type, items.title)}
              >
                {items.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
