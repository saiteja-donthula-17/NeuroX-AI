import "./homepage.css";
import "../../index.css"
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";
import { BackgroundBeamsWithCollision } from "../../components/aceternity/BackgroundBeams/BackgroundBeamsWithCollision";
import { useState, useEffect } from "react";
import { Boxes } from "../../components/aceternity/BackgroundBoxes/BackgroundBoxes";
import Intro from "../../components/Intro/Intro";

const Homepage = () => {
  const [typingStatus, setTypingStatus] = useState("human1");
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // Add resize listener to handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    
    // Force document to be scrollable on mobile
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, []);

  return (
    <>
      <div className="homepage">
        <Intro />
        <Boxes />
        <div className="left">
          <h1>NeuroX AI</h1>
          <h2 className="lg:text-xl md:text-xl sm:text-lg text-gray-300">Experience the future of work today. NeuroX AI is here to help you work smarter, not harder.</h2>
          <h3 className="lg:text-xl md:text-xl sm:text-lg text-gray-300" >
            ✨ Refine ideas with creative AI.
          <br/>
            🧠 Bring your vision to life effortlessly.
          </h3>
          <Link to="/dashboard"><button className='glowing-btn'><span className='glowing-txt'>T<span className='faulty-letter'>R</span>Y NOW</span></button></Link>
        </div>

        <div className="right">
          {/* Using BackgroundBeamsWithCollision component directly */}
          <BackgroundBeamsWithCollision>
            <img src="/3.png" alt="Bot Image" className="botImage" />
            {windowSize.width > 768 && (
              <div className="chat">
                <img
                  src={
                    typingStatus === "human1"
                      ? "/human1.jpeg"
                      : typingStatus === "human2"
                      ? "/human2.jpeg"
                      : "/2.png"
                  }
                  alt="Chat User"
                />
                <TypeAnimation
                  sequence={[
                    "Human1: What powers you, NeuroX AI?",
                    2000,
                    () => {
                      setTypingStatus("bot");
                    },
                    "Bot:  I'm built on cutting-edge AI tech, fast and efficient.",
                    2000,
                    () => {
                      setTypingStatus("human2");
                    },
                    "Human2: Is AI the future?",
                    2000,
                    () => {
                      setTypingStatus("bot");
                    },
                    "Bot: Absolutely! It's shaping a smarter, connected world.",
                    2000,
                    () => {
                      setTypingStatus("human1");
                    },
                    "Human1: Will it replace us?",
                    2000,
                    () => {
                      setTypingStatus("bot");
                    },
                    "Bot: No, it collaborates with us to do amazing things!",
                    2000,
                    () => {
                      setTypingStatus("human2");
                    },
                  ]}
                  wrapper="span"
                  repeat={Infinity}
                  cursor={true}
                  omitDeletionAnimation={true}
                />
              </div>
            )}
          </BackgroundBeamsWithCollision>
        </div>

        <div className="terms">
          <img src="/logo.png" alt="Logo" />
          <div className="links">
            <Link to="/">Terms of Service</Link>
            <span>|</span>
            <Link to="/">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
