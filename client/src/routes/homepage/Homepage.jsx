import "./homepage.css";
import "../../index.css"
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";
import { BackgroundBeamsWithCollision } from "../../components/aceternity/BackgroundBeams/BackgroundBeamsWithCollision";
import { useState, useEffect } from "react";
import { Boxes } from "../../components/aceternity/BackgroundBoxes/BackgroundBoxes";
import Intro from "../../components/Intro/Intro";

const Homepage = () => {
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
          <BackgroundBeamsWithCollision>
            <img src="/3.png" alt="Bot Image" className="botImage" />
            <div className="chat">
              <img src="/2.png" alt="Bot Avatar" />
              <div className="typing-container">
                <div className="typing-text">
                  <TypeAnimation
                    sequence={[
                      "Hi there! I'm NeuroX AI, your intelligent assistant.",
                      1500,
                      "I can help with creative ideas, problem-solving, and more!",
                      1500,
                      "Ask me anything - I'm powered by cutting-edge AI technology.",
                      1500,
                      "Let's collaborate and bring your vision to life!",
                      1500,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                    cursor={true}
                    style={{ display: 'inline-block' }}
                  />
                </div>
              </div>
            </div>
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
