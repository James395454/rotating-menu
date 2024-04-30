import { useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [angle, setAngle] = useState(0);
  const [listArray, setListArray] = useState(["item1", "item2"]);

  const inputValue = useRef("");
  const tilt = useRef(45);
  const tiltDirection = useRef(-1);
  const direction = useRef(-1);
  const refs = useRef([]);

  const timeout = 120;
  const tiltSpeed = 1;
  const increment = (Math.PI * 2) / listArray.length;
  const radius = 150;

  function handleRotation() {
    if (tilt.current >= 60) tiltDirection.current = 1;
    else if (tilt.current <= 20) tiltDirection.current = -1;
    tilt.current =
      tiltDirection.current === 1
        ? tilt.current - tiltSpeed
        : tilt.current + tiltSpeed;
    setAngle((prev) => prev + direction.current / 8);
    setTimeout(handleRotation, timeout);
  }

  useEffect(() => {
    handleRotation();
  }, []);

  const addItem = () => {
    setListArray((prev) => [...prev, inputValue.current]);
  };

  return (
    <div style={{ marginLeft: 400 }}>
      <input
        placeholder="Add an item"
        onChange={(e) => (inputValue.current = e.target.value)}
      />
      <button style={{ marginLeft: 20 }} onClick={addItem}>
        Add item
      </button>
      <div>
        <button
          onClick={() => {
            direction.current = direction.current * -1;
          }}
          style={{ marginTop: 50 }}
        >
          Toggle direction
        </button>
      </div>
      <div>
        <div class="menu-container">
          <div
            class="menu-circle"
            style={{ transform: `rotate3d(1,0,0,${tilt.current}deg)` }}
          >
            Rotating Menu
            {listArray.map((val, index) => {
              const newTop =
                Math.sin(-Math.PI / 2 + index * increment - angle) * radius +
                90;
              const newLeft =
                Math.cos(-Math.PI / 2 + index * increment - angle) * radius +
                90;
              return (
                <div
                  ref={(el) => (refs.current[index] = el)}
                  class="item"
                  style={{
                    top: newTop,
                    left: newLeft,
                    width: (20 * newTop) / 100 + 80,
                    height: (20 * newTop) / 100 + 80,
                  }}
                >
                  {val}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
