import React from "react";

const Contact = () => {
  return (
    <>
      <div className="menu" id="#contact">
        <div className="topC">
          <div className="left">
            <div className="titleIcon">
              <img src="/svg/message-solid.svg" alt="contactImg" />
            </div>
            <h1>Contact</h1>
          </div>

          <div className="right">
            <div className="titleIcon">
              <img src="/svg/splotch-solid.svg" alt="footerImg" />
            </div>
            <a
              style={{ color: "black", paddingLeft: "5px" }}
              href="https://ibrahimkolabalogun.web.app/"
            >
              <h1>Ibrahim Dev</h1>
            </a>
          </div>
        </div>

        <div className="contacts">
          <ul>
            <li>
              <a href="mailto:maiejhummai@gmail.com">Email</a>
            </li>
            <li>
              <a href="https://twitter.com/jhummai?t=KyXoZ9Dc6vC6TYriaCamVQ&s=08">
                Twitter
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/invites/contact/?i=xm7yng0cdt68&utm_content=o36fkfr">
                Instagram
              </a>
            </li>
            <li>
              <a href="#">Resume</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Contact;
