/** @jsx jsx */
import { jsx } from "theme-ui";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import AudioPlayer from "../components/audio-player";
import YoutubeEmbed from "../components/youtube-embed";
import Site from "../util/site.json";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

export const pageQuery = graphql`
  query HomeQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        name
        tagline
        description
        bannerImage {
          childImageSharp {
            gatsbyImageData(
              layout: FULL_WIDTH
              placeholder: BLURRED
              formats: [AUTO, WEBP]
            )
          }
        }
        profileImage {
          childImageSharp {
            gatsbyImageData(
              layout: FIXED
              width: 220
              height: 220
              placeholder: BLURRED
              formats: [AUTO, WEBP]
            )
          }
        }
        audio {
          title
          artist
          src
        }
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

  const bannerImage = getImage(frontmatter.bannerImage);
  const profileImage = getImage(frontmatter.profileImage);

  return (
    <Layout>
      <Seo title={Site.meta.title} description={frontmatter.description} />

      <section sx={styles.hero}>
        <div sx={styles.banner}>
          {bannerImage && (
            <GatsbyImage
              image={bannerImage}
              alt=""
              sx={styles.bannerImage}
            />
          )}
          <div sx={styles.bannerOverlay} />
        </div>

        <div sx={styles.profileBlock}>
          {profileImage && (
            <div sx={styles.profileRing}>
              <GatsbyImage
                image={profileImage}
                alt={frontmatter.name ? `Photo of ${frontmatter.name}` : ""}
                sx={styles.profileImage}
              />
            </div>
          )}
          {frontmatter.name && <h1 sx={styles.name}>{frontmatter.name}</h1>}
          {frontmatter.tagline && (
            <p sx={styles.tagline}>{frontmatter.tagline}</p>
          )}
        </div>
      </section>

      <section sx={styles.contentSection}>
        <div sx={styles.contentGrid}>
          {html && (
            <div
              sx={styles.bio}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )}

          {(frontmatter.audio?.src || frontmatter.youtube?.videoId) && (
            <aside sx={styles.mediaAside}>
              {frontmatter.audio?.src && (
                <div sx={styles.mediaBlock}>
                  <p sx={styles.mediaLabel}>Listen</p>
                  <AudioPlayer
                    title={frontmatter.audio.title}
                    artist={frontmatter.audio.artist}
                    src={frontmatter.audio.src}
                  />
                </div>
              )}
              {frontmatter.youtube?.videoId && (
                <div sx={styles.mediaBlock}>
                  <p sx={styles.mediaLabel}>Watch</p>
                  <YoutubeEmbed
                    videoId={frontmatter.youtube.videoId}
                    title={frontmatter.youtube.title}
                  />
                </div>
              )}
            </aside>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;

const styles = {
  hero: {
    position: "relative",
    mb: [6, 7, 8],
  },
  banner: {
    position: "relative",
    width: "100%",
    height: ["220px", "280px", "340px"],
    overflow: "hidden",
    borderRadius: ["0", "0", "20px"],
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
  bannerOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(14, 14, 14, 0.05) 0%, rgba(14, 14, 14, 0.45) 100%)",
    pointerEvents: "none",
  },
  profileBlock: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    mt: ["-72px", "-84px", "-96px"],
    px: [3, 4, 0],
  },
  profileRing: {
    width: ["140px", "168px", "196px"],
    height: ["140px", "168px", "196px"],
    borderRadius: "50%",
    overflow: "hidden",
    border: "4px solid",
    borderColor: "background",
    boxShadow: "0 8px 32px rgba(14, 14, 14, 0.18)",
    bg: "background",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  name: {
    mt: 4,
    mb: 2,
    fontSize: [5, 6, 7],
    fontWeight: "600",
    letterSpacing: "-0.02em",
    color: "black",
  },
  tagline: {
    m: 0,
    maxWidth: "540px",
    fontSize: [2, 3, 3],
    color: "mutedColor",
    fontStyle: "italic",
    lineHeight: 1.5,
  },
  contentSection: {
    variant: "variants.container",
    width: "100%",
    pb: [6, 7, 8],
  },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: ["1fr", "1fr", "minmax(0, 640px) minmax(280px, 360px)"],
    gap: [5, 6, 7],
    justifyContent: "center",
    alignItems: "start",
  },
  bio: {
    variant: "variants.markdown",
    maxWidth: "640px",
    mx: ["auto", "auto", 0],
    textAlign: ["center", "center", "left"],
    "p:first-of-type": {
      fontSize: [3, 4, 4],
      lineHeight: 1.7,
      color: "black",
    },
    p: {
      fontSize: [2, 3, 3],
      lineHeight: 1.8,
      color: "mutedColor",
      py: 2,
    },
    h2: {
      mt: 5,
      mb: 2,
      fontSize: [3, 4, 4],
      color: "primaryColor",
      letterSpacing: "0.04em",
      textTransform: "uppercase",
    },
  },
  mediaAside: {
    position: ["static", "static", "sticky"],
    top: 5,
    width: "100%",
    maxWidth: ["480px", "540px", "none"],
    mx: ["auto", "auto", 0],
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  mediaBlock: {
    width: "100%",
  },
  mediaLabel: {
    m: 0,
    mb: 3,
    fontSize: 1,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "primaryColor",
    fontWeight: "600",
    textAlign: ["center", "center", "left"],
  },
};
