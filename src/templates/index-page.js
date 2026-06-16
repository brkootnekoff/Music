/** @jsx jsx */
import { jsx } from "theme-ui";
import { graphql, Link, withPrefix } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import YoutubeEmbed from "../components/youtube-embed";
import Site from "../util/site.json";

export const pageQuery = graphql`
  query HomeQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        name
        tagline
        description
        profileImageUrl
        heroIntro
        heroIntro2
        serviceHeading
        serviceText
        reelUrl
        youtube {
          videoId
          title
        }
      }
    }
  }
`;

const HomePage = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  return (
    <Layout>
      <Seo title={Site.meta.title} description={frontmatter.description} />

      {/* Hero: photo left, intro text right */}
      <section sx={styles.hero}>
        <div sx={styles.heroInner}>
          <div sx={styles.photoCol}>
            {frontmatter.profileImageUrl && (
              <div sx={styles.photoRing}>
                <img
                  src={frontmatter.profileImageUrl?.startsWith("http") ? frontmatter.profileImageUrl : withPrefix(frontmatter.profileImageUrl)}
                  alt={frontmatter.name || "Profile"}
                  sx={styles.photo}
                />
              </div>
            )}
          </div>
          <div sx={styles.introCol}>
            {frontmatter.heroIntro && (
              <p sx={styles.introText}>{frontmatter.heroIntro}</p>
            )}
            {frontmatter.heroIntro2 && (
              <p sx={styles.introText2}>{frontmatter.heroIntro2}</p>
            )}
            <Link to="/contact" sx={styles.ctaButton}>
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      < sx={styles.serviceSection}>
      <section sx={styles.serviceSection}>
        {frontmatter.reelUrl && (
          <div sx={styles.reelWrap}>
            <iframe
              width="100%"
              height="400"
              scrolling="no"
              frameBorder="no"
              src={frontmatter.reelUrl}
              title="Music reel"
            />
          </div>
        )}
        <h2 sx={styles.serviceHeading}>
          {frontmatter.serviceHeading || "MEDIA COMPOSER AT YOUR SERVICE"}
        </h2>
        <p sx={styles.serviceText}>{frontmatter.serviceText}</p>
        )}
        {frontmatter.youtube?.videoId && (
          <div sx={styles.videoWrap}>
            <YoutubeEmbed
              videoId={frontmatter.youtube.videoId}
              title={frontmatter.youtube.title}
            />
          </div>
        )}
      </section>

      {html && (
        <section sx={styles.bioSection}>
          <div
            sx={styles.bio}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </section>
      )}
    </Layout>
  );
};

export default HomePage;

const styles = {
  hero: {
    bg: "background",
    py: [6, 7, 8],
    px: ["20px", "40px", "60px", "100px"],
  },
  heroInner: {
    maxWidth: "1100px",
    mx: "auto",
    display: "flex",
    flexDirection: ["column", "column", "row"],
    alignItems: "center",
    gap: [6, 7, 8],
  },
  photoCol: {
    flexShrink: 0,
    display: "flex",
    justifyContent: "center",
  },
  photoRing: {
    width: ["220px", "260px", "300px"],
    height: ["220px", "260px", "300px"],
    borderRadius: "50%",
    overflow: "hidden",
    border: "none",
    flexShrink: 0,
  },
  photo: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center top",
    display: "block",
  },
  introCol: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 4,
    textAlign: ["center", "center", "left"],
  },
  introText: {
    m: 0,
    fontSize: [2, 3, 3],
    color: "black",
    lineHeight: 1.8,
  },
  introText2: {
    m: 0,
    fontSize: [2, 3, 3],
    color: "black",
    lineHeight: 1.8,
  },
  ctaButton: {
    display: "inline-block",
    alignSelf: ["center", "center", "flex-start"],
    mt: 3,
    py: "14px",
    px: "40px",
    fontSize: [1, 2, 2],
    letterSpacing: "1px",
    color: "black",
    bg: "primaryBg",
    border: "1px solid",
    borderColor: "borderColor",
    textDecoration: "none",
    cursor: "pointer",
    transition: "background 0.2s, border-color 0.2s",
    "&:hover": {
      bg: "#222222",
      borderColor: "black",
    },
  },
  serviceSection: {
    bg: "background",
    py: [6, 7, 8],
    px: ["20px", "40px", "60px", "100px"],
    textAlign: "center",
    borderTop: "1px solid",
    borderColor: "borderColor",
  },
  serviceHeading: {
    m: 0,
    mb: 5,
    fontSize: ["28px", "36px", "48px"],
    fontWeight: "700",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    color: "black",
  },
  serviceText: {
    m: 0,
    mb: 7,
    maxWidth: "700px",
    mx: "auto",
    fontSize: [2, 3, 3],
    color: "black",
    lineHeight: 1.8,
    b: {
      fontWeight: "700",
      color: "black",
    },
    strong: {
      fontWeight: "700",
      color: "black",
    },
  },
  reelWrap: {
    maxWidth: "700px",
    mx: "auto",
    width: "100%",
    mt: 6,
    mb: 6,
    borderRadius: "16px",
    overflow: "hidden",
    iframe: {
      display: "block",
      width: "100%",
      border: 0,
    },
  },
  videoWrap: {
    maxWidth: "700px",
    mx: "auto",
    width: "100%",
  },
  bioSection: {
    bg: "background",
    py: [5, 6, 7],
    px: ["20px", "40px", "60px", "100px"],
    borderTop: "1px solid",
    borderColor: "borderColor",
  },
  bio: {
    variant: "variants.markdown",
    maxWidth: "760px",
    mx: "auto",
    py: 0,
    "p, li": {
      color: "black",
      fontSize: [2, 3, 3],
    },
    h2: {
      color: "black",
      textTransform: "uppercase",
      letterSpacing: "0.04em",
    },
  },
};
