import { useEffect, useRef } from "react";
import hoverSound from "../assets/sounds/robot-hover.mp3";

export default function HoverSounds({
  volume = 0.25,
  cooldownMs = 80,
}) {
  const audioRef = useRef(null);
  const lastPlayRef = useRef(0);

  useEffect(() => {
    const audio = new Audio(hoverSound);
    audio.preload = "auto";
    audio.volume = volume;
    audioRef.current = audio;

    // Unlock audio on first user interaction (required by browsers)
    const unlock = () => {
      audio
        .play()
        .then(() => {
          audio.pause();
          audio.currentTime = 0;
        })
        .catch(() => {});

      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("keydown", unlock);
    };

    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("touchstart", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [volume]);

  useEffect(() => {
    const onPointerEnter = (e) => {
      // Respect reduced motion preference
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const el = e.target.closest(
        'a[href], button, [role="button"], [data-hover-sound="true"]'
      );
      if (!el) return;
      if (el.hasAttribute("data-no-hover-sound")) return;

      const now = Date.now();
      if (now - lastPlayRef.current < cooldownMs) return;
      lastPlayRef.current = now;

      const audio = audioRef.current;
      if (!audio) return;

      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    document.addEventListener("pointerenter", onPointerEnter, true);
    return () =>
      document.removeEventListener("pointerenter", onPointerEnter, true);
  }, [cooldownMs]);

  return null;
}
