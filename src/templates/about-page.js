/** @jsx jsx */
import { jsx } from "theme-ui";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";

export const pageQuery = graphql`
  query AboutQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        description
      }
    }
  }
`;

const AboutPage = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  return (
    <Layout>
      <Seo title={frontmatter.title} description={frontmatter.description} />
      <div sx={styles.container}>
        <h1 sx={styles.title}>{frontmatter.title}</h1>
        {frontmatter.description && (
          <p sx={styles.description}>{frontmatter.description}</p>
        )}
        {html && (
          <div
            sx={styles.content}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </div>
    </Layout>
  );
};

export default AboutPage;

const styles = {
  container: {
    variant: "variants.container",
    px: ["20px", "60px", "160px", "260px", "360px"],
    py: [6, 7, 8],
  },
  title: {
    mt: 0,
    mb: 4,
    fontSize: ["28px", "36px", "48px"],
    fontWeight: "700",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    color: "black",
  },
  description: {
    maxWidth: "60ch",
    fontSize: [2, 3, 3],
    color: "mutedColor",
    lineHeight: 1.8,
    mb: 6,
  },
  content: {
    variant: "variants.markdown",
    maxWidth: "760px",
    "p, li": {
      color: "black",
      fontSize: [2, 3, 3],
      lineHeight: 1.8,
    },
    h2: {
      color: "black",
      textTransform: "uppercase",
      letterSpacing: "0.04em",
    },
  },
};
