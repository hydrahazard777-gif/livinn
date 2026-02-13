import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Letter from './Letter';
import flower from "./b03cf87d48c46e60bd34b30a77be85c6.png";
import letter from "./letter.png"
import bow from "./bow.png"
import text from "./text.jpg"
import ily from "./ily.png"
import kity from "./kitty.png"
import bed from "./bed].png"
function App() {
  const [yesClicked, setYesClicked] = useState(false);
  const [noButtonStyle, setNoButtonStyle] = useState({});
  const [hearts, setHearts] = useState([]);
  const [stars, setStars] = useState([]);
  const noButtonRef = useRef(null);
  const containerRef = useRef(null);

  // Create floating hearts
  useEffect(() => {
    const newHearts = [];
    for (let i = 0; i < 15; i++) {
      newHearts.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        size: 20 + Math.random() * 15
      });
    }
    setHearts(newHearts);

    const newStars = [];
    for (let i = 0; i < 20; i++) {
      newStars.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
        size: 2 + Math.random() * 4
      });
    }
    setStars(newStars);
  }, []);

  const handleYesClick = () => {
    setYesClicked(true);
  };

  const handleNoHover = (e) => {
    if (!noButtonRef.current || yesClicked) return;
    
    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const buttonCenterX = button.left + button.width / 2;
    const buttonCenterY = button.top + button.height / 2;
    
    const distanceX = mouseX - buttonCenterX;
    const distanceY = mouseY - buttonCenterY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    if (distance < 100) {
      const moveX = (distanceX / distance) * 60;
      const moveY = (distanceY / distance) * 40;
      
      const maxLeft = container.width - button.width;
      const maxTop = container.height - button.height;
      
      const newLeft = Math.max(10, Math.min(maxLeft - 10, button.left + moveX));
      const newTop = Math.max(10, Math.min(maxTop - 10, button.top + moveY));
      
      setNoButtonStyle({
        position: 'fixed',
        left: `${newLeft}px`,
        top: `${newTop}px`,
        transition: 'all 0.3s ease'
      });
    }
  };

  // Handle going back from letter
  const handleBackFromLetter = () => {
    setYesClicked(false);
  };

  // Handle next surprise (collage)
  const handleNextSurprise = () => {
    console.log("Loading Collage component...");
    // Will load collage component here
  };

  return (
    <div className="scale-wrapper">
    <div 
      className="app" 
      ref={containerRef}
      onMouseMove={handleNoHover}
    >
      {/* Animated Background Elements */}
      <div className="background-animation">
        {hearts.map(heart => (
          <div
            key={`heart-${heart.id}`}
            className="floating-heart"
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.delay}s`,
              fontSize: `${heart.size}px`
            }}
          >
            ❤️
          </div>
        ))}
           
        {stars.map(star => (
          <div
            key={`star-${star.id}`}
            className="twinkling-star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.delay}s`,
              width: `${star.size}px`,
              height: `${star.size}px`
            }}
          />
        ))}
      </div>

      {/* Dreamy Overlay */}
      <div className="dreamy-overlay" />
      <img 
  src={flower} 
  alt="decor"
  className="floating-image"
/>
 <img  src={letter} 
  alt="decor"
  className="floating-letter"
/>
 <img  src={bow} 
  alt="decor"
  className="floating-bow"
/>

 <img  src={text} 
  alt="decor"
  className="floating-text"
/>
 <img  src={ily} 
  alt="decor"
  className="floating-ily"
/>
 <img  src={kity} 
  alt="decor"
  className="floating-kity"
/>
 <img  src={bed} 
  alt="decor"
  className="floating-bed"
/>

      {yesClicked ? (
        // Show Letter Component directly after YES
        <Letter 
          onMoreSurprises={handleNextSurprise}
          onBack={handleBackFromLetter}
        />
      ) : (
        // Initial Confession Screen
        <div className="main-container">
          <div className="glass-card">
            {/* Top Icon */}
            <div className="icon-container">
              <span className="main-icon">🧸🌹</span>
            </div>

            {/* Main Text */}
            <h1 className="main-heading">Will You Be My Valentine?</h1>
            
            {/* Subtitle */}
            <p className="subtitle">
              🥺🥺
            </p>

            {/* Buttons Container */}
            <div className="buttons-container">
              <button
                className="yes-button"
                onClick={handleYesClick}
              >
                YES! 💖
              </button>
              
              <button
                ref={noButtonRef}
                className="no-button"
                style={noButtonStyle}
              >
                No
              </button>
            </div>

            {/* Romantic Quote */}
            <div className="quote">
              "In all the world, there is no heart for me like yours.<br />
              In all the world, there is no love for you like mine."<br />
              <span className="quote-author">- Maya Angelou</span>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default App;
