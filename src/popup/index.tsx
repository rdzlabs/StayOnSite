import React from "react";
import ReactDOM from "react-dom/client";
import { Divider, FluentProvider, Link, makeStyles } from "@fluentui/react-components";
import { darkTheme } from "../theme/customTheme";
import { HeaderSection } from "./components/HeaderSection";
import { TargetOptionsSection } from "./components/TargetOptionsSection";
import { BookmarksBox } from "./components/BookmarksBox";

const useStyles = makeStyles({
  popup: {
    width: "430px",
    padding: "16px",
    backgroundColor: "var(--colorNeutralBackground1)",
    display: "flex",
    flexDirection: "column",
  },
  divider: {
    minHeight: "30px",
  },
  linkRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "13px",
    marginTop: "20px",
  },
  link: {
    color: "var(--colorBrandForeground1)",
    textDecoration: "none",
  },
});

const App = () => {
  const styles = useStyles();

  return (
    <FluentProvider theme={darkTheme}>
      <div className={styles.popup}>
        <HeaderSection />
        <Divider className={styles.divider} />
        <TargetOptionsSection />
        <BookmarksBox />

        <div className={styles.linkRow}>
          <Link
            href="mailto:rdzlabs.co@gmail.com?subject=StayOnSite Feedback&body=Hi, I wanted to share some feedback about the extension."
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Send Feedback
          </Link>

          <Link
            href="https://www.flaticon.com/free-icon/target_610064?term=target&page=1&position=9&origin=tag&related_id=610064" 
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Icon Credit
          </Link>
        </div>

      </div>
    </FluentProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
