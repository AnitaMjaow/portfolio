import { useEffect, useState } from "react";

export default function Typewriter({
  text = "",
  speed = 28,          // ms per character
  startDelay = 300,    // ms before typing starts
  pauseAfter = 1400,   // ms to wait when fully typed
  pauseBetween = 500,  // ms to wait after clearing before retyping
  loop = true,
  className = "",
  cursor = "▍",
}) {
  const [output, setOutput] = useState("");

  useEffect(() => {
    if (!text) {
      setOutput("");
      return;
    }

    let i = 0;
    let typingTimer;
    let timeout1;
    let timeout2;
    let timeout3;

    const type = () => {
      typingTimer = window.setInterval(() => {
        i += 1;

        // ✅ stop exactly at full length (never reads past end)
        if (i > text.length) {
          window.clearInterval(typingTimer);

          // not looping -> done
          if (!loop) return;

          // pause when done, then clear, pause, restart
          timeout1 = window.setTimeout(() => {
            setOutput("");
            i = 0;

            timeout2 = window.setTimeout(() => {
              type();
            }, pauseBetween);
          }, pauseAfter);

          return;
        }

        setOutput(text.slice(0, i));
      }, speed);
    };

    // initial start delay
    timeout3 = window.setTimeout(() => {
      setOutput("");
      i = 0;
      type();
    }, startDelay);

    return () => {
      window.clearInterval(typingTimer);
      window.clearTimeout(timeout1);
      window.clearTimeout(timeout2);
      window.clearTimeout(timeout3);
    };
  }, [text, speed, startDelay, pauseAfter, pauseBetween, loop]);

  return (
    <span className={className}>
      {output}
      <span className="opacity-70 animate-pulse">{cursor}</span>
    </span>
  );
}
