import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./upgradePage.css";

const UpgradePage = () => {
  // Add useEffect to ensure scrolling works on mobile
  useEffect(() => {
    // Force document to be scrollable on mobile
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
    
    // Clean up when component unmounts
    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, []);

  return (
    <div className="upgradePage">
      <div className="upgrade-container">
        <img src="/logo.png" alt="NeuroX AI Logo" className="upgrade-logo" />
        <h1>NeuroX AI Pro</h1>
        <h2>Coming Soon</h2>
        <p>
          We're working on something amazing! NeuroX AI Pro will bring you
          advanced features and capabilities to enhance your AI experience.
        </p>
        <div className="features">
          <div className="feature">
            <div className="feature-icon">🚀</div>
            <h3>Advanced Processing</h3>
            <p>Faster response times and more complex reasoning capabilities</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🔍</div>
            <h3>Enhanced Analysis</h3>
            <p>Deeper insights and more detailed analysis of your data</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🔄</div>
            <h3>Unlimited Requests</h3>
            <p>No limits on the number of requests you can make</p>
          </div>
        </div>
        <Link to="/dashboard" className="back-button">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default UpgradePage;