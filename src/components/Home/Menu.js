import React, { useState } from "react";
import ContentArray from "../../Functions/ContentArray";
// import ContentArray from "../Functions/ContentArray";
import MenuComponent from "./MenuComponent";

const Menu = () => {
  const [Content, ContentF] = useState(ContentArray);

  const Contents = Content.map((cont) => (
    <MenuComponent
      key={cont.id}
      title={cont.title}
      link={cont.link}
      caption={cont.caption}
      arrow={cont.arrow}
      svg={cont.svg}
      imgMain={cont.imgMain}
      img1={cont.img1}
      img2={cont.img2}
    />
  ));

  return <div className="">{Contents}</div>;
};

export default Menu;
