// src/components/Calculator.jsx
import { useState, useEffect } from "react";
import "./Calculator.css";

export default function Calculator() {
  const [screen, setScreen] = useState("0");
  const [operator, setOperator] = useState("?");
  const [state, setState] = useState("S0");
  const [previous, setPrevious] = useState(0);
  const [lastOperand, setLastOperand] = useState(0);

  // === Logic เดิม ===
  const updateScreen = (val) => setScreen(val);

  const numberClicked = (num) => {
    if (state === "S0") {
      updateScreen(num.toString());
      setState("S1");
    } else if (state === "S1") {
      if (screen.length < 9) updateScreen(screen + num.toString());
    } else if (state === "S2") {
      updateScreen(num.toString());
      setState("S1");
    }
  };

  const operatorClicked = (op) => {
    if (state === "S1") {
      setPrevious(parseFloat(screen));
      setOperator(op);
      setState("S2");
    } else if (state === "S0") {
      setOperator(op);
      setState("S2");
    }
  };

  const equalClicked = () => {
    if (operator !== "?") {
      let current = parseFloat(screen);
      let result = 0;
      if (state === "S1") setLastOperand(current);

      if (operator === "+") result = previous + lastOperand;
      else if (operator === "-") result = previous - lastOperand;

      result = parseFloat(result.toPrecision(9)).toString();
      updateScreen(result);
      setPrevious(parseFloat(result));
      setState("S0");
    }
  };

  const ceClicked = () => {
    updateScreen("0");
    setPrevious(0);
    setOperator("?");
    setState("S0");
    setLastOperand(0);
  };

  // === รองรับ Keyboard Input ===
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key >= "0" && e.key <= "9") numberClicked(Number(e.key));
      else if (e.key === "+") operatorClicked("+");
      else if (e.key === "-") operatorClicked("-");
      else if (e.key === "=" || e.key === "Enter") equalClicked();
      else if (e.key === "Escape") ceClicked();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  return (
    <div className="calculator-page">
      <div className="cal-container">
        <div className="cal-screen">{screen}</div>

        <div>
          <button className="cal-btn-blue cal-btn-hover-blue" disabled>MC</button>
          <button className="cal-btn-blue cal-btn-hover-blue" disabled>MR</button>
          <button className="cal-btn-blue cal-btn-hover-blue" disabled>M+</button>
          <button className="cal-btn-blue cal-btn-hover-blue" disabled>M−</button>
          <button className="cal-btn-red cal-btn-hover-red" onClick={ceClicked}>CE</button>
        </div>

        <div>
          <button className="cal-btn-pink cal-btn-hover-pink" onClick={() => numberClicked(7)}>7</button>
          <button className="cal-btn-pink cal-btn-hover-pink" onClick={() => numberClicked(8)}>8</button>
          <button className="cal-btn-pink cal-btn-hover-pink" onClick={() => numberClicked(9)}>9</button>
          <button className="cal-btn-blue cal-btn-hover-blue" disabled>÷</button>
          <button className="cal-btn-blue cal-btn-hover-blue" disabled>√</button>
        </div>

        <div>
          <button className="cal-btn-pink cal-btn-hover-pink" onClick={() => numberClicked(4)}>4</button>
          <button className="cal-btn-pink cal-btn-hover-pink" onClick={() => numberClicked(5)}>5</button>
          <button className="cal-btn-pink cal-btn-hover-pink" onClick={() => numberClicked(6)}>6</button>
          <button className="cal-btn-blue cal-btn-hover-blue" disabled>×</button>
          <button className="cal-btn-blue cal-btn-hover-blue" disabled>%</button>
        </div>

        <div>
          <button className="cal-btn-pink cal-btn-hover-pink" onClick={() => numberClicked(1)}>1</button>
          <button className="cal-btn-pink cal-btn-hover-pink" onClick={() => numberClicked(2)}>2</button>
          <button className="cal-btn-pink cal-btn-hover-pink" onClick={() => numberClicked(3)}>3</button>
          <button id="minus" className="cal-btn-blue cal-btn-hover-blue" onClick={() => operatorClicked("-")}>−</button>
          <button className="cal-btn-blue cal-btn-hover-blue" disabled>1/x</button>
        </div>

        <div>
          <button className="cal-btn-pink cal-btn-hover-pink" disabled>.</button>
          <button className="cal-btn-pink cal-btn-hover-pink" onClick={() => numberClicked(0)}>0</button>
          <button className="cal-btn-pink cal-btn-hover-pink" disabled>+/−</button>
          <button id="plus" className="cal-btn-blue cal-btn-hover-blue" onClick={() => operatorClicked("+")}>+</button>
          <button className="cal-btn-blue cal-btn-hover-blue" onClick={equalClicked}>=</button>
        </div>
      </div>

      <div className="student">67094657 วรินทร วรธรรม</div>
    </div>
  );
}