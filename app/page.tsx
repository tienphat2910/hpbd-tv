'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAudio } from './contexts/AudioContext';
import './style.css';

// Snowflakes Component
function Snowflakes() {
  useEffect(() => {
    // Dynamically import Snowflakes library
    import('magic-snowflakes').then((module) => {
      const Snowflakes = module.default;
      const snowflakes = new Snowflakes({
        color: '#ffffff',
        count: 50,
        minSize: 8,
        maxSize: 18,
        speed: 1,
        wind: true,
        rotation: true,
        zIndex: 9999
      });

      return () => {
        snowflakes.destroy();
      };
    });
  }, []);

  return null;
}


export default function Home() {
  const [showMail, setShowMail] = useState(false);
  const [dateText, setDateText] = useState('');
  const [showStars, setShowStars] = useState(false);
  const [letterText, setLetterText] = useState('');
  const [showLetterTitle, setShowLetterTitle] = useState(false);
  const [showStartOverlay, setShowStartOverlay] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();
  const { play } = useAudio();

  const handleStartClick = () => {
    setShowStartOverlay(false);
    // Play audio when user interacts
    play();
  };

  useEffect(() => {
    const fullDate = "09/03/2008";
    let currentIndex = 0;
    let intervalId: NodeJS.Timeout;
    
    const timer = setTimeout(() => {
      intervalId = setInterval(() => {
        if (currentIndex < fullDate.length) {
          setDateText(fullDate.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          setShowStars(true);
          clearInterval(intervalId);
        }
      }, 100);
    }, 12000);
    
    return () => {
      clearTimeout(timer);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  const handleMailClick = () => {
    setShowMail(true);
    setLetterText('');
    setShowLetterTitle(false);
    
    // Animation cho title
    setTimeout(() => {
      setShowLetterTitle(true);
    }, 1000);
    
    // Animation cho nội dung
    setTimeout(() => {
      const fullText = "Chúc Thảo Vy tuổi mới trọn vẹn niềm vui, hạnh phúc và thật nhiều những điều tươi đẹp nhất. Mong rằng mỗi ngày của em đều được đánh dấu bằng nụ cười, những trải nghiệm đáng nhớ và bước tiến vững chắc trên con đường em chọn. Chúc em luôn mạnh mẽ, tự tin, kiên định với đam mê và không ngừng khám phá bản thân. Cuộc sống sẽ trao cho em những điều tốt đẹp xứng đáng với tấm lòng và nỗ lực của em.";
      let currentIndex = 0;
      
      const typingInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setLetterText(fullText.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 30);
    }, 2500);
  };

  const handleCloseClick = () => {
    setShowMail(false);
  };

  const goToBirthdayPage = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      router.push('/birthday');
    }, 500);
  };

  return (
    <>
      {/* Start Overlay for Mobile Audio - Render First */}
      {showStartOverlay && (
        <div 
          onClick={handleStartClick}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#f0cccf',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 99999,
            cursor: 'pointer'
          }}
        >
          <style>
            {`
              @keyframes fadeIn {
                from {
                  opacity: 0;
                }
                to {
                  opacity: 1;
                }
              }
              @keyframes slideUp {
                from {
                  opacity: 0;
                  transform: translateY(30px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              @keyframes pulse {
                0%, 100% {
                  transform: scale(1);
                }
                50% {
                  transform: scale(1.05);
                }
              }
            `}
          </style>
          <div style={{
            textAlign: 'center',
            animation: 'slideUp 0.8s ease-out'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              color: '#C4515C',
              marginBottom: '20px',
              fontFamily: 'Dancing Script, cursive',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            }}>🎉 Happy Birthday 🎉</h2>
            <button style={{
              fontSize: '1.5rem',
              padding: '15px 40px',
              backgroundColor: '#C4515C',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              fontFamily: 'Poppins, sans-serif',
              boxShadow: '0 4px 15px rgba(196, 81, 92, 0.4)',
              transition: 'all 0.3s ease',
              animation: 'pulse 2s ease-in-out infinite'
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            onTouchStart={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
            onTouchEnd={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              🎵 Bắt đầu
            </button>

          </div>
        </div>
      )}
      
      <Snowflakes />
      
      {/* Transition Overlay */}
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#f0cccf',
            zIndex: 99998,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360]
            }}
            transition={{
              duration: 1,
              repeat: Infinity
            }}
            style={{
              fontSize: '4rem'
            }}
          >
            🎂
          </motion.div>
        </motion.div>
      )}
      
      <motion.div 
        id="wrapper" 
        style={{ visibility: showStartOverlay ? 'hidden' : 'visible' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="flag__birthday">
          <img src="/1.png" alt="" width="350" className="flag__left" />
          <img src="/1.png" alt="" width="350" className="flag__right" />
        </div>
        <div className="content">
          <div className="left">
            <div className="title">
              <h1 className="happy">
                <span style={{ '--t': '4s' } as React.CSSProperties}>H</span>
                <span style={{ '--t': '4.2s' } as React.CSSProperties}>a</span>
                <span style={{ '--t': '4.4s' } as React.CSSProperties}>p</span>
                <span style={{ '--t': '4.6s' } as React.CSSProperties}>p</span>
                <span style={{ '--t': '4.8s' } as React.CSSProperties}>y</span>
              </h1>
              <h1 className="birthday">
                <span style={{ '--t': '5s' } as React.CSSProperties}>B</span>
                <span style={{ '--t': '5.2s' } as React.CSSProperties}>i</span>
                <span style={{ '--t': '5.4s' } as React.CSSProperties}>r</span>
                <span style={{ '--t': '5.6s' } as React.CSSProperties}>t</span>
                <span style={{ '--t': '5.8s' } as React.CSSProperties}>h</span>
                <span style={{ '--t': '6s' } as React.CSSProperties}>d</span>
                <span style={{ '--t': '6.2s' } as React.CSSProperties}>a</span>
                <span style={{ '--t': '6.4s' } as React.CSSProperties}>y</span>
              </h1>
              <div className="hat">
                <img src="/hat.png" alt="" width="130" />
              </div>
            </div>
            <div className="date__of__birth">
              {showStars && <i className="fa-solid fa-star"></i>}
              <span>{dateText || ''}</span>
              {showStars && <i className="fa-solid fa-star"></i>}
            </div>
            <div className="btn">
              <button id="btn__letter" onClick={handleMailClick}>
                <div className="mail">
                  Đọc thư
                  <i className="fa-regular fa-envelope"></i>
                </div>
              </button>
            </div>
            
            {/* Button to Birthday Page */}
            <div className="btn mt-4">
              <button 
                onClick={goToBirthdayPage}
                className="golden-button text-lg rounded-full cursor-pointer"
                style={{
                  marginTop: '20px',
                  border: '3px solid #333',
                  fontFamily: 'Sriracha, cursive',
                  padding: '12px 30px'
                }}
              >
                Ăn bánh kem
              </button>
            </div>
          </div>
          <div className="right">
            <div className="box__account">
              <div className="image">
                <img src="/unnamed.jpg" alt="" />
              </div>
              <div className="name">
                <i className="fa-solid fa-heart"></i>
                <span>Gửi Thanh Tuyền</span>
                <i className="fa-solid fa-heart"></i>
              </div>
              <div className="balloon_one">
                <img width="100px" src="/balloon1.png" alt="" />
              </div>
              <div className="balloon_two">
                <img width="100px" src="/balloon2.png" alt="" />
              </div>
            </div>
            <div className="cricle">
              <div className="text__cricle">
                {['h','a','p','p','y','-','b','i','r','t','h','d','a','y','-'].map((char, i) => (
                  <span key={i} style={{ '--i': i + 1 } as React.CSSProperties}>{char}</span>
                ))}
              </div>
              <i className="fa-solid fa-heart"></i>
            </div>
          </div>
        </div>
        <div className="decorate_star star1" style={{ '--t': '15s' } as React.CSSProperties}></div>
        <div className="decorate_star star2" style={{ '--t': '15.2s' } as React.CSSProperties}></div>
        <div className="decorate_star star3" style={{ '--t': '15.4s' } as React.CSSProperties}></div>
        <div className="decorate_star star4" style={{ '--t': '15.6s' } as React.CSSProperties}></div>
        <div className="decorate_star star5" style={{ '--t': '15.8s' } as React.CSSProperties}></div>
        <div className="decorate_flower--one" style={{ '--t': '15s' } as React.CSSProperties}>
          <img width="20" src="/decorate_flower.png" alt="" />
        </div>
        <div className="decorate_flower--two" style={{ '--t': '15.3s' } as React.CSSProperties}>
          <img width="20" src="/decorate_flower.png" alt="" />
        </div>
        <div className="decorate_flower--three" style={{ '--t': '15.6s' } as React.CSSProperties}>
          <img width="20" src="/decorate_flower.png" alt="" />
        </div>
        <div className="decorate_bottom">
          <img src="/decorate.png" alt="" width="100" />
        </div>
        <div className="smiley__icon">
          <img src="/smiley_icon.png" alt="" width="100" />
        </div>

        {showMail && (
          <div className="boxMail active">
            <i className="fa-solid fa-xmark" onClick={handleCloseClick}></i>
            <div className="boxMail-container">
              <div className="card1">
                <div className="userImg">
                  <img src="/unnamed.jpg" alt="" />
                </div>
                <h4 className="username">Đến: Vy 💖<span className="underline"></span></h4>
                <h3>Chúc mừng sinh nhật</h3>
              </div>
              <div className="card2">
                <div className="card2-content">
                  <h3 className={showLetterTitle ? 'show-title' : ''}>Gửi đến em!</h3>
                  <h2>{letterText}</h2>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mewmew GIF */}
        <div style={{ position: 'fixed', bottom: '16px', left: '16px', zIndex: 50 }}>
          <img src="/mewmew.gif" alt="Mewmew" style={{ width: '120px', height: '120px' }} />
        </div>
      </motion.div>
    </>
  );
}
