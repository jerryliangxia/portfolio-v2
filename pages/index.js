import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hi, I'm Jerry. I'm a software engineer with experience in Three.js and
          full-stack web dev.
        </p>
        <p>
          (This is my <Link href="/posts/first-post">first post</Link>.)
        </p>
      </section>
    </Layout>
  );
}
