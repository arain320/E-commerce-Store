import React from "react";
import "./GoTop.scss";

const GoTop = () => {
  const goTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  return (
    <>
      <button className="top-btn" title="go to top" onClick={goTop}>
        <i className="fa-solid fa-chevron-up"></i>
      </button>
    </>
  );
};

export default GoTop;
