import React from "react";
const url = window.location.href;
const Socials = () => {
  return (
    <div className="detailSocials">
      <a href="www.instagram.com" className="socials">
        <img src="/socials/instagram-brands.svg" alt="instagram" />
      </a>
      <a href={`whatsapp://send?text=${url}`} className="socials">
        <img src="/socials/whatsapp-brands.svg" alt="whatsapp" />
      </a>
      <a href={`https://twitter.com/share?url=${url}`} className="socials">
        <img src="/socials/twitter-brands.svg" alt="twitter" />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        className="socials"
      >
        <img src="/socials/facebook-brands.svg" alt="facebook" />
      </a>
    </div>
  );
};

export default Socials;
