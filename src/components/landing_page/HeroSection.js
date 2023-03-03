import React from "react";

import styles from "./HeroSection.module.css";

const HeroSection = () => {
  return (
    <header className={`container-fluid ${styles["header"]}`}>
      <div className={styles["content-container"]}>
        <h1 className="primary-heading text-uppercase">
          The real life lies on the woods in the lap of nature
        </h1>
        <p className="para-sm">
          ParadiseCamp helps fun loving people to find the spot where they can
          visit for picnic and camping. We also provide people to promote the
          spot which have not been discovered yet.
        </p>
        <button className="btn-custom btn--big btn--hero text-uppercase">
          Start having fun
        </button>
      </div>
    </header>
  );
};

export default HeroSection;
