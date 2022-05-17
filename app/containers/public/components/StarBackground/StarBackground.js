import React, { useLayoutEffect } from "react";
import anime from "animejs/lib/anime.es";
import { v4 as uuidv4 } from "uuid";
import "./StarBackground.scss";

const StarBackground = () => {
  const num = 120;
  const vw = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0,
  );
  const vh = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0,
  );
  const starryNight = () => {
    anime({
      targets: [".sky .star"],
      opacity: [
        {
          duration: 700,
          value: "0",
        },
        {
          duration: 700,
          value: "1",
        },
      ],
      easing: "linear",
      loop: true,
      delay: (el, i) => 50 * i,
    });
  };
  const shootingStars = () => {
    anime({
      targets: [".shootingstars .wish"],
      easing: "linear",
      loop: true,
      delay: (el, i) => 1000 * i,
      opacity: [
        {
          duration: 700,
          value: "1",
        },
      ],
      width: [
        {
          value: "150px",
        },
        {
          value: "0px",
        },
      ],
      translateX: 350,
    });
  };
  const randomRadius = () => Math.random() * 0.7 + 0.6;
  const getRandomX = () =>
    Math.floor(Math.random() * Math.floor(vw)).toString();
  const getRandomY = () =>
    Math.floor(Math.random() * Math.floor(vh)).toString();

  useLayoutEffect(() => {
    starryNight();
    shootingStars();
  }, []);

  return (
    <div className="star-background">
      <svg className="sky">
        {[...Array(num)].map(() => (
          <circle
            cx={getRandomX()}
            cy={getRandomY()}
            r={randomRadius()}
            stroke="none"
            strokeWidth="0"
            fill="white"
            key={uuidv4()}
            className="star"
          />
        ))}
      </svg>
      <div className="shootingstars">
        {[...Array(60)].map(() => (
          <div
            key={uuidv4()}
            className="wish"
            style={{
              left: `${getRandomY()}px`,
              top: `${getRandomX()}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

StarBackground.propTypes = {};

export default StarBackground;
