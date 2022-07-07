import React from "react";
import { Link } from "react-router-dom";

const MenuComponent = ({
  title,
  link,
  caption,
  arrow,
  svg,

  imgMain,
  img1,
  img2,
}) => {
  return (
    <>
      <div className="menu">
        <div className="top">
          <div className="left">
            <div className="title">
              <div className="titleIcon">
                <img src={svg} alt={title} />
              </div>
              <h1>{title}</h1>
            </div>
            <div className="titleCaption">
              <p>{caption}</p>
            </div>
          </div>
          <Link to={link}>
            <div className="right">
              <h3 style={{ color: "black" }}>View {title}</h3>

              <div className="rightImg">
                <img src={arrow} alt="" />
              </div>
            </div>
          </Link>
        </div>
        <Link to={link}>
          <div className="menuImg">
            <div className="bg"></div>
            <div className="firstImg">
              <img src={imgMain} alt="" />
            </div>
            <div className="secondImg">
              <div className="img1">
                <img src={img1} alt="" />
              </div>
              <div className="img2">
                <img src={img2} alt="" />
              </div>
            </div>
          </div>
        </Link>
      </div>
      <div className="line"></div>
    </>
  );
};

export default MenuComponent;
