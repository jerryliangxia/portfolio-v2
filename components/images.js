import React from "react";
import Image from "next/image";
import styles from "./images.module.css";
import utilsStyles from "../styles/utils.module.css";

const Images = ({ images }) => {
  return (
    <div className={styles.gallery}>
      {images.map(([image, link], index) => (
        <div key={index} className={styles.imageContainer}>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.clickable}
          >
            <Image
              src={image}
              alt={`Gallery image ${index + 1}`}
              className={utilsStyles.image}
              width={600}
              height={338}
              unoptimized
            />
          </a>
        </div>
      ))}
    </div>
  );
};

export default Images;
