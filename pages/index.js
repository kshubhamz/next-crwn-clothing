import { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchSectionsAsync } from "../redux/section/section.actions";
import {
  selectIsSectionsLoaded,
  selectSections,
} from "../redux/section/section.selector";
import styles from "../styles/Home.module.css";
import router from "next/router";
import { LinearProgress } from "@mui/material";

function Home({ sections, getSections, isLoading }) {
  useEffect(() => {
    if (!sections) getSections();
  }, []);

  return (
    <div className={styles.container}>
      <div className="row g-3">
        {!isLoading ? (
          sections.map((section) => (
            <div
              key={section.id}
              className={`col col-12 col-sm-12 ${
                section.size === "large" ? "col-md-6" : "col-md-4"
              }`}
            >
              <div
                className="card"
                style={{ border: "none" }}
                onClick={() =>
                  router.push(`/shop/${section.title.toLowerCase()}`)
                }
              >
                <div
                  className={`card-body ${styles.section}`}
                  style={{
                    backgroundImage: `url(${section.imageUrl})`,
                  }}
                >
                  <div className={`text-center ${styles.info}`}>
                    <h3 className={styles.title}>
                      {section.title.toUpperCase()}
                    </h3>
                    <span className={styles.subtitle}>SHOP NOW</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <LinearProgress color="info" />
        )}
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getSections: () => dispatch(fetchSectionsAsync()),
});

const mapStateToProps = createStructuredSelector({
  sections: selectSections,
  isLoading: (state) => !selectIsSectionsLoaded(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
