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
      <div
        style={{
          margin: "0 3rem",
          padding: "0.5rem 0",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <a
          href="https://github.com/jerryliangxia"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Jerry Xia on GitHub"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            role="img"
            focusable="false"
          >
            <path d="M12 .5C5.73.5.9 5.33.9 11.6c0 4.87 3.16 9 7.55 10.45.55.1.75-.25.75-.54 0-.27-.01-1.16-.02-2.1-3.07.67-3.72-1.3-3.72-1.3-.5-1.26-1.22-1.6-1.22-1.6-.99-.68.07-.67.07-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.67 2.57 1.19 3.2.9.1-.71.38-1.19.68-1.46-2.45-.28-5.02-1.22-5.02-5.45 0-1.2.43-2.17 1.13-2.93-.11-.28-.49-1.41.11-2.94 0 0 .93-.3 3.05 1.12.88-.24 1.83-.36 2.77-.36.94 0 1.89.12 2.77.36 2.12-1.42 3.05-1.12 3.05-1.12.6 1.53.22 2.66.11 2.94.7.76 1.13 1.73 1.13 2.93 0 4.24-2.58 5.17-5.04 5.44.39.34.73 1.01.73 2.05 0 1.48-.01 2.67-.01 3.04 0 .29.2.65.76.54 4.38-1.45 7.54-5.58 7.54-10.45C23.1 5.33 18.27.5 12 .5z" />
          </svg>
        </a>
      </div>
    </Layout>
  );
}
