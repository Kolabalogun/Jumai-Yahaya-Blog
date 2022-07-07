import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Blog/Header";
import Contact from "../components/Contact";
import Line from "../components/Home/Line";
import Loader from "../components/Loader";
import AnimatedPage from "../Utils/AnimatedPage";

const Thoughts = () => {
  const [loader, setloader] = useState(true);

  function closeLoader(params) {
    setloader(false);
  }

  useEffect(() => {
    setTimeout(() => {
      closeLoader();
    }, 2000);
  });

  const url = window.location.href;

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <AnimatedPage>
          <Header />
          <div className="detail">
            <div className="detailHeader">
              <h1>My Scribble Thoughts</h1>
              <p>
                Jumia Yahaya
                {" - "}
                June 17, 2022
              </p>
            </div>

            <div className="detailImg">
              <img src="/about/st.jpg" alt="st" />
            </div>

            <div className="detailPiece">
              <p>
                How unpredictable life can be is scary. One minutes everything
                can be going perfectly and then the next? it just switches. ‘ I
                guess those who have had a piece of this unpredictability I
                speak of feel this way too.’ It feels like there’s a book
                explaining a method to balance my thoughts when I get
                overwhelmed in how complicated things can be. Unfortunately,I
                failed to read this book. Seeing a therapist would be nice but
                isn’t that what crazy people do? Now I’m consumed with fear that
                I might actually be going crazy to consider it. <br />
                Should I be bothered? <br />
                I’m always seated, consumed by my thoughts.’Talk to someone’ I
                have been told countless of times. I try. Whenever I make one of
                these trials to express how I feel, it never comes out right. I
                find myself stuttering or making a fool out of myself . I do
                rather keep mute. Don’t get it twisted, it’s not the fear of
                being judged that makes me keep mute but the fear of not being
                understood. I get a little bit overwhelmed by everything that
                happens around me. It’s not my fault I keep having these
                irrational thoughts. “can someone save me from myself?” <br />
                “Am I going crazy?” <br />
                These questions run around in this head of mine. It’s very funny
                how I feel the motion of those questions in search for an
                answer. That might just be the cause of the mild headache I
                always seem to have. I stay up all night, staring at the wall
                hoping for an answer will appear out of nowhere,it has now
                become an habit <br />
                This is worth being overwhelmed right? <br />
                I might find expressing myself hard on the contrary,hiding what
                I feel isn’t hard. I gave it away to isolation,scared that
                someone would see through the cracks. People misunderstand, yes?
                And it’s hard to understand something you don’t know. Self
                isolation began to give another aura,’intolerant’ I was
                constantly called.it’s being tasking to adjust.But I try my best
                because I refuse to accept people’s complain about my
                ‘intolerant” attitude towards them. In reality,I am losing my
                mind. Am I crazy attaching importance to little things? <br />
                I really want this feeling to end. <br />
                ‘Am I loud enough? why is nobody hearing my screams? oh wait,I
                am still silent’. I opt for scribbling my thoughts on my little
                school books because of the safety it gives.I scribble openly
                with no worries ,hoping someone will see and ask “what is
                wrong?” “Will my scribbled thoughts save me?”
              </p>
            </div>

            <Link to="/blog">
              <div className="detailGoback">
                <div
                  style={{
                    color: "white",
                    background: "red",
                    padding: "5px 10px",
                    fontWeight: "500",
                    margin: "10px 0px",
                  }}
                >
                  Go back
                </div>
              </div>
            </Link>
          </div>
          <Line />
          <Contact />
        </AnimatedPage>
      )}
    </>
  );
};

export default Thoughts;
