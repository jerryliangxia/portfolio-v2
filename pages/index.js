import Head from "next/head";
import Link from "next/link";
import Date from "../components/date";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";

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
      <section className={utilStyles.section}>
        <h1 className={utilStyles.heading}>Blog</h1>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Date className={utilStyles.blogDate} dateString={date} />
              <div className={utilStyles.blogTitle}>
                <Link className={utilStyles.link} href={`/posts/${id}`}>
                  {title}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
