/** @jsx jsx */
import { jsx } from "theme-ui";

const YoutubeEmbed = ({ videoId, title }) => {
  if (!videoId) return null;

  return (
    <div sx={styles.wrapper}>
      <div sx={styles.frame}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title || "YouTube video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
      {title && <p sx={styles.caption}>{title}</p>}
    </div>
  );
};

export default YoutubeEmbed;

const styles = {
  wrapper: {
    width: "100%",
  },
  frame: {
    position: "relative",
    width: "100%",
    paddingBottom: "56.25%",
    borderRadius: "16px",
    overflow: "hidden",
    bg: "background",
    boxShadow: "0 12px 40px rgba(14, 14, 14, 0.12)",
    iframe: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      border: 0,
    },
  },
  caption: {
    m: 0,
    mt: 3,
    fontSize: 2,
    color: "mutedColor",
    textAlign: "center",
    lineHeight: 1.5,
  },
};
