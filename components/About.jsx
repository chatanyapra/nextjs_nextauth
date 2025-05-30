import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./About.css";
import lineCurve from "../assets/images/linecurve1.png";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef(null);

  useEffect(() => {
    // Initialize GSAP ScrollTrigger animation
    const animation = gsap.fromTo(
      aboutRef.current,
      {
        opacity: 0,
        scale: 0.8,
        y: 40,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 85%",
          end: "top 60%",
          scrub: false,
          once: true,
        },
      }
    );

    // Cleanup function to kill the animation and ScrollTrigger instance
    return () => {
      if (animation.scrollTrigger) {
        animation.scrollTrigger.kill(); // Kill ScrollTrigger instance
      }
      animation.kill(); // Kill the animation
    };
  }, []);

  return (
    <div className="w-full h-auto relative top-0 z-10 about-main">
      <img
        src={lineCurve}
        className="w-full h-full absolute top-0 left-0"
        alt=""
        style={{ transform: "scaleX(-1)" }}
      />
      <div className="w-full flex max-md:flex-col-reverse relative px-4">
        <div ref={aboutRef} className="md:w-2/4 min-h-96 about2-img float-start">
          <div className="w-96 m-auto about-image" style={{ borderRadius: "100px" }}></div>
        </div>
        <div className="md:w-2/4 min-h-96 mt-14 pr-10 max-md:px-4 text-white dark:text-black">
          <div className="transparent-color light-dark-shadow px-4 py-1 text-4xl rounded-2xl w-fit mb-4 text-gradient flex justify-center items-center">
            <div className="rounded-full w-7 h-7 flex justify-center items-center mr-2 mt-1">
              <div className="bg-gradient-radial w-5 h-5 m-auto rounded-full transition-transform transform hover:scale-125 duration-300 ease-in-out"></div>
            </div>
            <i className="mb-2">About</i>
          </div>
          <p className="text-xl">
            I’m Chatanya, a Full Stack Developer passionate about crafting modern, scalable, and high-performing web applications. I chose this career because I love turning ideas into functional and visually appealing digital experiences. Creativity and problem-solving drive my approach to development.

            Currently, I work as a Freelance Developer and a Full Stack Developer Intern, where I build dynamic web solutions tailored to users' needs. I am always open to new opportunities and challenges that push me to grow.

            With a mindset of continuous learning, I stay updated with the latest technologies, ensuring that my work aligns with industry best practices. My goal is to create impactful solutions that enhance user experiences and solve real-world problems.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
