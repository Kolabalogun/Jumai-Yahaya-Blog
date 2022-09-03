import React, { useEffect, useState } from "react";

import Loader from "../components/Loader";
import { useGlobalContext } from "../Functions/Context";
import AnimatedPage from "../Utils/AnimatedPage";

const Lipgloss = () => {
  const [loader, setloader] = useState(true);

  function closeLoader(params) {
    setloader(false);
  }

  useEffect(() => {
    setTimeout(() => {
      closeLoader();
    }, 2000);
  });

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <AnimatedPage>
          <div
            className="comingsoon"
            style={{
              height: "100vh",
              backgroundColor: "rgb(34, 40, 54)",
              backgroundPosition: "center",
              backgroundRepeat: " no-repeat",
              backgroundSize: "contain",
            }}
          >
            <a
              href="index.html"
              style={{
                padding: "10px 15px",
                backgroundColor: "chocolate",
                color: "white",
                listStyle: "none",
                textDecoration: "none",
                fontSize: "18px",
                position: "absolute",
                top: "10px",
                left: "10px",
                marginTop: "10px",
                borderRadius: "5px",
              }}
            >
              Go back
            </a>
          </div>
        </AnimatedPage>
      )}
    </>
  );
};

export default Lipgloss;
