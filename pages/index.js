import Head from "next/head";
import Link from "next/link";
import Date from "../components/date";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Images from "../components/images";

const imageList = [
  ["/images/r3f-project.gif", "https://r3f-project.vercel.app/"],
  ["/images/trappist-1.gif", "https://fp-experience.vercel.app/"],
  ["/images/sb-129.gif", "https://www.sb-129.com/"],
  // ["/images/venom-game.gif", "https://www.jerryxia.com/game"],
  // ["/images/mask.gif", "https://three-js-portfolio-zeta.vercel.app/"],
];

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className={utilStyles.images}>
        <Images images={imageList} />
      </div>
      <section className={utilStyles.lowerSection}>
        <h1 className={utilStyles.heading}>Three.js</h1>
        <p className={utilStyles.paragraph}>Three recent projects using R3F.</p>
      </section>
      <section className={utilStyles.section}>
        <h1 className={utilStyles.heading}>Blog</h1>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Date dateString={date} />
              <div className={utilStyles.blogTitle}>
                <Link href={`/posts/${id}`}>{title}</Link>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
