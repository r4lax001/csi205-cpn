import React, { useEffect, useRef, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Animation.css";

// global constants
const fieldWidth = 760;
const fieldHeight = 400;
const ballDiameter = 100;
const vx = 5;
const vy = 5;

export default function Animation() {
  const [running, setRunning] = useState(false);
  const [ballImage, setBallImage] = useState("");
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [direction, setDirection] = useState({ right: true, down: true });

  const fieldRef = useRef(null);
  const ballRef = useRef(null);

  const maxLeft = fieldWidth - ballDiameter - 6;
  const maxTop = fieldHeight - ballDiameter - 6;

  const toggleRun = () => {
    setRunning((prev) => !prev);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!running) return;

      setPosition((prevPos) => {
        let { left, top } = prevPos;
        let { right, down } = direction;

        if (right) {
          left += vx;
          if (left >= maxLeft) {
            right = false;
          }
        } else {
          left -= vx;
          if (left <= 0) {
            right = true;
          }
        }

        if (down) {
          top += vy;
          if (top >= maxTop) {
            down = false;
          }
        } else {
          top -= vy;
          if (top <= 0) {
            down = true;
          }
        }

        setDirection({ right, down });
        return { left, top };
      });
    }, 25);

    return () => clearInterval(interval);
  }, [running, direction]);

  return (
    <div id="container" style={{ textAlign: "center" }}>
      <div
        id="field"
        ref={fieldRef}
        style={{
          width: `${fieldWidth}px`,
          height: `${fieldHeight}px`,
          position: "relative",
          margin: "20px auto",
          border: "3px solid #333",
          borderRadius: "10px",
          overflow: "hidden",
          backgroundColor: "#f8f8f8",
        }}
      >
        <div
          id="ball"
          ref={ballRef}
          style={{
            width: `${ballDiameter}px`,
            height: `${ballDiameter}px`,
            position: "absolute",
            left: `${position.left}px`,
            top: `${position.top}px`,
            borderRadius: "50%",
            backgroundColor: ballImage ? "transparent" : "#a5c2ddff",
            backgroundImage: ballImage ? `url(${ballImage})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "left 0.02s linear, top 0.02s linear",
          }}
          className={running ? "spin" : ""}
        ></div>
      </div>

      <div id="control" style={{ marginTop: "10px" }}>
        {/* ปุ่ม RUN / PAUSE */}
        <button
          id="run"
          className={`btn ${running ? "btn-danger" : "btn-success"} mx-1`}
          onClick={toggleRun}
        >
          <span className={`bi ${running ? "bi-pause" : "bi-play"}`}></span>
          &nbsp;{running ? "PAUSE" : "RUN"}
        </button>

        {/* ปุ่มเปลี่ยนภาพบอล */}
        <button
          className="btn btn-primary mx-1"
          onClick={() => setBallImage("")}
        >
          NONE
        </button>
        <button
          className="btn btn-primary mx-1"
          onClick={() => setBallImage("./Basketball.png")}
        >
          BASKETBALL
        </button>
        <button
          className="btn btn-primary mx-1"
          onClick={() => setBallImage("./Football.png")}
        >
          FOOTBALL
        </button>
        <button
          className="btn btn-primary mx-1"
          onClick={() => setBallImage("./Volleyball.png")}
        >
          VOLLEYBALL
        </button>
        <button
          className="btn btn-primary mx-1"
          onClick={() => setBallImage("./Human.png")}
        >
          HUMAN
        </button>
        <button
          className="btn btn-primary mx-1"
          onClick={() => setBallImage("./Cartoon.png")}
        >
          CARTOON
        </button>
      </div>
    </div>
  );
}