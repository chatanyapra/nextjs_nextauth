import { useEffect, useRef } from 'react';
import './BouncingBall.css';
import gsap from 'gsap';

const BouncingBall = () => {
  const ballsRef = useRef([]);
  const animationFrameIdRef = useRef(null); // To store requestAnimationFrame ID

  useEffect(() => {
    const ballProperties = [];

    function initializeBalls() {
      ballsRef.current.forEach((ball, index) => {
        const size =Math.floor(Math.random() * (200 - 100 + 1)) + 80; // Ball size
        const x = Math.random() * (window.innerWidth - size);
        const y = Math.random() * (window.innerHeight - size);
        const vx = (Math.random() - 0.7) * 1; // Random initial velocity on X axis
        const vy = (Math.random() - 0.7) * 1; // Random initial velocity on Y axis
        gsap.set(ball, { x, y, width: size, height: size });

        ballProperties[index] = { x, y, vx, vy, size };
      });
    }

    function updateBalls() {
      ballsRef.current.forEach((ball, index) => {
        const properties = ballProperties[index];
        properties.x += properties.vx;
        properties.y += properties.vy;

        if (properties.x <= 0 || properties.x >= (window.innerWidth - 20) - properties.size) {
          properties.vx *= -1; // Reverse X velocity
        }
        if (properties.y <= 0 || properties.y >= (window.innerHeight - 40) - properties.size) {
          properties.vy *= -1; // Reverse Y velocity
        }

        gsap.set(ball, { x: properties.x, y: properties.y });
      });

      // Save the requestAnimationFrame ID
      animationFrameIdRef.current = requestAnimationFrame(updateBalls); 
    }

    initializeBalls();
    updateBalls(); // Start the animation loop

    return () => {
      // Cancel the animation frame on cleanup
      cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, []);

  return (
    <div className='w-full -z-10 max-sm:mt-24 h-full'>
      <div className="bouncing-balls-container">
        <div className="ball-moving ball-1" ref={(el) => ballsRef.current[0] = el}></div>
        <div className="ball-moving ball-2" ref={(el) => ballsRef.current[1] = el}></div>
        <div className="ball-moving ball-3" ref={(el) => ballsRef.current[2] = el}></div>
        <div className="ball-moving ball-4" ref={(el) => ballsRef.current[3] = el}></div>
        <div className="ball-moving ball-5" ref={(el) => ballsRef.current[4] = el}></div>
      </div>
    </div>
  );
};

export default BouncingBall;
