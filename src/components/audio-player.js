/** @jsx jsx */
import { jsx } from "theme-ui";
import { useEffect, useRef, useState } from "react";
import { withPrefix } from "gatsby";

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
};

const AudioPlayer = ({ title, artist, src }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioSrc = src.startsWith("http") ? src : withPrefix(src);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoaded = () => setDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, [audioSrc]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (event) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * duration;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div sx={styles.player}>
      <audio ref={audioRef} src={audioSrc} preload="metadata">
        <track kind="captions" />
      </audio>
      <div sx={styles.meta}>
        {title && <p sx={styles.title}>{title}</p>}
        {artist && <p sx={styles.artist}>{artist}</p>}
      </div>
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause" : "Play"}
        sx={styles.playButton}
      >
        {isPlaying ? "❚❚" : "▶"}
      </button>
      <div sx={styles.timeline}>
        <button
          type="button"
          onClick={handleSeek}
          aria-label="Seek"
          sx={styles.progressTrack}
        >
          <span sx={styles.progressFill(progress)} />
        </button>
        <div sx={styles.times}>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;

const styles = {
  player: {
    bg: "primaryBg",
    border: "1px solid",
    borderColor: "borderColor",
    borderRadius: "16px",
    p: 4,
    display: "grid",
    gridTemplateColumns: ["1fr", "1fr", "auto 1fr"],
    gridTemplateRows: ["auto auto auto", "auto auto auto", "auto auto"],
    gap: 3,
    alignItems: "center",
    boxShadow: "0 12px 40px rgba(163, 25, 51, 0.08)",
  },
  meta: {
    gridColumn: ["1", "1", "1 / 2"],
    gridRow: ["1", "1", "1"],
    mb: [2, 2, 0],
  },
  title: {
    m: 0,
    fontFamily: "heading",
    fontSize: 3,
    fontWeight: "600",
    color: "black",
  },
  artist: {
    m: 0,
    mt: 1,
    fontSize: 2,
    color: "mutedColor",
  },
  playButton: {
    gridColumn: ["1", "1", "1"],
    gridRow: ["2", "2", "2"],
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    border: "none",
    bg: "primaryColor",
    color: "background",
    fontSize: 4,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "transform 0.15s ease",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  timeline: {
    gridColumn: ["1", "1", "2 / 4"],
    gridRow: ["3", "3", "2"],
    width: "100%",
  },
  progressTrack: {
    width: "100%",
    height: "6px",
    borderRadius: "999px",
    bg: "borderColor",
    border: "none",
    p: 0,
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    display: "block",
  },
  progressFill: (progress) => ({
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: `${progress}%`,
    bg: "primaryColor",
    borderRadius: "999px",
    pointerEvents: "none",
  }),
  times: {
    display: "flex",
    justifyContent: "space-between",
    mt: 2,
    fontSize: 1,
    color: "mutedColor",
    fontVariantNumeric: "tabular-nums",
  },
};
