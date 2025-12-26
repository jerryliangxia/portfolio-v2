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
  ["/images/sb-129.gif", "https://sb-129.vercel.app/"],
  ["/images/paddle/paddle-1.gif", "https://paddle-olive.vercel.app/"],
  ["/images/venom-game.gif", "https://portfolio-alpha-five-91.vercel.app/game"],
  // ["/images/paddle/paddle-future.gif", "https://paddle-olive.vercel.app/"],
  ["/images/pepes-room.gif", "https://github.com/jerryliangxia/pepes-room"],
  ["/images/ragdoll-example.gif", "https://ragdoll-example.vercel.app/"],
  ["/images/watdo.gif", "https://www.watdo.me/"],
];

// const paddleImageList = [
//   ["/images/paddle/paddle-1.gif", "https://paddle-olive.vercel.app/"],
//   ["/images/paddle/paddle-2.png", "https://paddle-olive.vercel.app/"],
//   ["/images/paddle/paddle-3.png", "https://paddle-olive.vercel.app/"],
// ];

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
      {/* <div className={utilStyles.images}>
        <Images images={paddleImageList} />
      </div>
      <section className={utilStyles.lowerSection}>
        <h1 className={utilStyles.heading}>Paddle</h1>
        <p className={utilStyles.paragraph}>
          Based off Paper Mill Lake in Nova Scotia.
        </p>
      </section>
      <div className={utilStyles.divider} /> */}
      <div className={utilStyles.images}>
        <Images images={imageList} />
      </div>
      {/* <section className={utilStyles.lowerSection}>
        <h1 className={utilStyles.heading}>Projects</h1>
        <p className={utilStyles.paragraph}>
          A collection from 2023 until now.
        </p>
      </section> */}
      <div className={utilStyles.divider} />
      <section className={utilStyles.section}>
        {/* <h1 className={utilStyles.heading}>Blog</h1> */}
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
