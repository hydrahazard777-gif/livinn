import React, { useState, useEffect, useRef, useMemo } from "react";
import "./Letter.css";

const Letter = ({ onMoreSurprises, onBack }) => {

  /* ---------------- MOBILE DETECTION ---------------- */
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  /* ---------------- TYPEWRITER STATE ---------------- */
  const [isTyping, setIsTyping] = useState(false);
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  /* ✅ Memoized letter content (fixes ESLint warning) */
const letterContent = useMemo(() => [
  "My Valentine 💖",
  "",
  "Well, I wanted to give you this yesterday itself but yeah 😋",
  "I hope you like this 🙃🙃 This is also my Valentine’s Day, so honestly I didn’t know what to do either.",
  "I thought we wouldn’t be doing anything, but your gift was definitely a shocker 🤭 I love ittt 🤌🏽",
  "",
  "And for me too, this is not what I had in my mind but time was too short.",
  "BTW check my story after you read this, hope you like that too 😛",
  "So let’s get to the main part… you.",
  "",
  "I still remember I told you I was sure about this and wouldn’t back down.",
  "I have never been that sure about something or someone, but I was damn sure about you.",
  "I’ve never regretted a single second with you.",
  "",
  "And you are totally right, it really doesn’t feel like 4 and a half months.",
  "It feels like I’ve known you for years.",
  "Before meeting you, I thought relationships were just fights and no deep connections.",
  "",
  "But when you came, everything changed forever.",
  "For the first time, I became so comfy with someone 🙃",
  "Just being around you makes my stress and headaches vanish.",
  "",
  "I know you are going through stuff right now.",
  "I wish I could be with you right now.",
  "I hope by reading this you feel better.",
  "",
  "I hope I’m not too much of a burden to you.",
  "I know sometimes I’m hard to deal with, emotional type stuff.",
  "And you’re right, relationships are like reparenting each other so our inner child feels fulfilled.",
  "",
  "I didn’t think it was true until it came my turn ahhh 🤣",
  "Sometimes I feel like a baby girl around you, especially when you match my vibe 🤌🏽",
  "You’ve literally become a part of my daily life.",
  "",
  "I can’t go a day without talking to you.",
  "It’s exactly as they say — the world revolves around the person you love.",
  "After getting into this relationship, I started praying every day to God to keep you and us safe.",
  "",
  "I pray nothing ever happens to you even when I’m not there.",
  "And I hope even when times get really bad between us, nothing changes.",
  "I hope those times only grow our bond stronger.",
  "",
  "I don’t ever want to give up on you.",
  "I truly intend to keep our promise.",
  "I hope one day your parents acknowledge us — I’m really praying for that day ngl.",
  "",
  "And about the main thing, I really want to know you better.",
  "Every time I think I know you fully, there’s always something new to learn about you.",
  "The Insta questions were actually such a great idea 🤣🙏🏽 They brought us closer.",
  "",
  "Insta has my thanks on my behalf 🤣🙏🏽",
  "I’m really proud to have you on my side.",
  "I’ll try my best to be a better boyfriend for you, just like you are the perfect girlfriend for me 🛐",
  "",
  "I was never a fan of trying this hard, but I really can’t stop writing about us 🤣🙏🏽",
  "Seriously, I don’t know what got into me.",
  "Anyway, I hope you like this.",
  "",
  "And always remember, I’m all yours 😍 Never forget it 💯",
  "I really want to see that look on your face when I’m acting weird.",
  "I’m seriously falling for you more and more these days.",
  "",
  "I LOVE YOU!!!!!!!!! 💖"
], []);


  const typingTimeoutRef = useRef(null);

  /* ⏳ Delay before typing */
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  /* ✍️ Typing animation */
  useEffect(() => {
    if (!isTyping || currentLineIndex >= letterContent.length) return;

    const currentLine = letterContent[currentLineIndex];

    if (currentCharIndex <= currentLine.length) {
      typingTimeoutRef.current = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev];

          if (!newLines[currentLineIndex]) {
            newLines[currentLineIndex] = "";
          }

          newLines[currentLineIndex] =
            currentLine.substring(0, currentCharIndex);

          return newLines;
        });

        setCurrentCharIndex((prev) => prev + 1);
      }, 30);
    } else {
      typingTimeoutRef.current = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 150);
    }

    return () => clearTimeout(typingTimeoutRef.current);
  }, [isTyping, currentLineIndex, currentCharIndex, letterContent]);

  /* 📜 Auto-scroll */
  useEffect(() => {
    const container = document.querySelector(".letter-content-area");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [displayedLines]);

  return (
    <div className="letter-container">

      {/* ---------------- DESKTOP VERSION ---------------- */}
      {!isMobile && (
        <div className="mailbox-scene">
          <div className="mailbox">
            <div className="mailbox-lid"></div>
          </div>

          <div className="letter-rise">
            <LetterPaper
              displayedLines={displayedLines}
              isTyping={isTyping}
              currentLineIndex={currentLineIndex}
              letterContent={letterContent}
            />
          </div>
        </div>
      )}

      {/* ---------------- MOBILE VERSION ---------------- */}
      {isMobile && (
        <div className="mobile-letter-wrapper">
          <LetterPaper
            displayedLines={displayedLines}
            isTyping={isTyping}
            currentLineIndex={currentLineIndex}
            letterContent={letterContent}
          />
        </div>
      )}

      {currentLineIndex < letterContent.length && (
        <div className="typing-hint">
          Happy Valentine's Day! ❤️
        </div>
      )}
    </div>
  );
};

/* ---------------- LETTER PAPER COMPONENT ---------------- */

const LetterPaper = ({
  displayedLines,
  isTyping,
  currentLineIndex,
  letterContent,
}) => {
  return (
    <div className="vintage-letter-paper">
      <div className="paper-texture"></div>

      <div className="letter-content-area">
        <pre className="handwritten-text">
          {displayedLines.map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < displayedLines.length - 1 && "\n"}
            </React.Fragment>
          ))}
          {isTyping && currentLineIndex < letterContent.length && (
            <span className="type-cursor">|</span>
          )}
        </pre>
      </div>

      <div className="paper-corner corner-tl"></div>
      <div className="paper-corner corner-tr"></div>
      <div className="paper-corner corner-bl"></div>
      <div className="paper-corner corner-br"></div>

      {currentLineIndex >= letterContent.length && (
        <div className="wax-seal">💌</div>
      )}
    </div>
  );
};

export default Letter;
