/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import site from "../util/site.json";

const siteTitle = site.meta.title;
const siteSubtitle = site.meta.subtitle;

const Logo = () => (
  <div sx={styles.siteLogo}>
    <Link to="/" sx={styles.logoLink}>
      <span sx={styles.title}>{siteTitle}</span>
      {siteSubtitle && <span sx={styles.subtitle}>{siteSubtitle}</span>}
    </Link>
  </div>
);

export default Logo;

const styles = {
  siteLogo: {
    display: "flex",
    alignItems: "center",
  },
  logoLink: {
    display: "flex",
    flexDirection: "column",
    textDecoration: "none",
    color: "black",
    lineHeight: 1.2,
  },
  title: {
    fontFamily: "heading",
    fontWeight: "700",
    fontSize: ["18px", "20px", "22px"],
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    color: "black",
  },
  subtitle: {
    fontFamily: "body",
    fontWeight: "400",
    fontSize: ["12px", "13px", "14px"],
    letterSpacing: "0.02em",
    color: "black",
    mt: "2px",
  },
};
