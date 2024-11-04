import Head from "next/head";
import ThemeToggle from "./toggle";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

const name = "Jerry Xia";
const desc = "Developer";
export const siteTitle = "Jerry Xia";

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="The homepage of Jerry Xia, developer."
        />
        {/* <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        /> */}
        <meta name="og:title" content={siteTitle} />
        {/* <meta name="twitter:card" content="summary_large_image" /> */}
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <div className={styles.headerContent}>
              <h1 className={utilStyles.heading}>{name}</h1>
              <p className={utilStyles.paragraph}>{desc}</p>
            </div>
            <ThemeToggle />
          </>
        ) : (
          <></>
        )}
      </header>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
      <main>{children}</main>
    </div>
  );
}
