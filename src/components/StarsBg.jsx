import { useMemo } from "react";
import "./styles/stars-bg.css";

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

export default function StarsBg({ count = 80, meteors = 6 }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: rand(0, 100),          // vw
        y: rand(0, 100),          // vh
        s: rand(1, 2.6),          // size px-ish
        o: rand(0.25, 0.95),      // base opacity
        tw: rand(2.5, 7.5),       // twinkle duration
        d: rand(0, 6),            // delay
        glow: rand(0.2, 0.8),     // glow strength
      })),
    [count]
  );
  const flares = useMemo(
  () =>
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: rand(5, 95),
      y: rand(5, 65),
      s: rand(2.2, 4.2),   // bigger base size
      tw: rand(3.5, 8),
      d: rand(0, 5),
      o: rand(0.7, 1),
    })),
  []
);

  const meteorList = useMemo(
    () =>
      Array.from({ length: meteors }, (_, i) => ({
        id: i,
        delay: rand(0, 8),
        dur: rand(4.5, 8.5),
        top: rand(0, 70),
        left: rand(-40, 10),
        ang: rand(-10, 35), // different directions
      })),
    [meteors]
  );

  return (
    <div className="stars-bg" aria-hidden="true">

<div className="stars-layer">
  {flares.map((s) => (
    <span
      key={`f-${s.id}`}
      className="star star--flare"
      style={{
        "--x": `${s.x}vw`,
        "--y": `${s.y}vh`,
        "--size": `${s.s}px`,
        "--o": s.o,
        "--tw": `${s.tw}s`,
        "--d": `${s.d}s`,
        "--g": 0.9,
      }}
    >
      <span aria-hidden="true" />
    </span>
  ))}

  {stars.map((s) => (
    <span
      key={s.id}
      className="star"
      style={{
        "--x": `${s.x}vw`,
        "--y": `${s.y}vh`,
        "--size": `${s.s}px`,
        "--o": s.o,
        "--tw": `${s.tw}s`,
        "--d": `${s.d}s`,
        "--g": s.glow,
      }}
    />
  ))}
</div>


      <div className="stars-layer">
        {stars.map((s) => (
          <span
            key={s.id}
            className="star"
            style={{
              "--x": `${s.x}vw`,
              "--y": `${s.y}vh`,
              "--size": `${s.s}px`,
              "--o": s.o,
              "--tw": `${s.tw}s`,
              "--d": `${s.d}s`,
              "--g": s.glow,
            }}
          />
        ))}
      </div>

      <div className="meteors-layer">
        {meteorList.map((m) => (
          <span
            key={m.id}
            className="meteor"
            style={{
              "--delay": `${m.delay}s`,
              "--dur": `${m.dur}s`,
              "--top": `${m.top}vh`,
              "--left": `${m.left}vw`,
              "--ang": `${m.ang}deg`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
