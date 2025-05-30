import image2 from "../assets/images/imageface2.png";
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from "../components/Footer";
import BootstrapIcon from "../assets/IconsImage/bootstrap.png";
import AjaxIcon from "../assets/IconsImage/ajax.png";
import ApiIcon from "../assets/IconsImage/api.png";

import CssIcon from "../assets/IconsImage/css.png";
import WordpressIcon from "../assets/IconsImage/wordpress.png";

import ExpressIcon from "../assets/IconsImage/expressjs.png";

import HtmlIcon from "../assets/IconsImage/html.png";
import JavaIcon from "../assets/IconsImage/java.png";
import JsIcon from "../assets/IconsImage/js.png";

import ReactIcon from "../assets/IconsImage/react.png";
import TailwindIcon from "../assets/IconsImage/tailwindcss.png";
import TypescriptIcon from "../assets/IconsImage/typescript.png";

import PhpIcon from "../assets/IconsImage/php.png";

import laravelIcon from "../assets/IconsImage/laravel.png";
import Skills from "../components/Skills";
import Working from "../components/Working";

// import Working from "../components/Working";

gsap.registerPlugin(ScrollTrigger);
const AboutPage = () => {
  const skillBarsRef2 = useRef([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    skillBarsRef2.current.forEach((bar) => {
      gsap.fromTo(
        bar,
        { width: '0%' },
        {
          width: bar.dataset.percent,
          duration: 2,
          scrollTrigger: {
            trigger: bar,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, []);
  // ----------working---------------
  const [activeIndex, setActiveIndex] = useState(null);
  const contentRefs = useRef([]);

  useEffect(() => {
    contentRefs.current.forEach((ref, index) => {
      if (ref && index === activeIndex) {
        gsap.to(ref, { height: 'auto', duration: 0.2 });
      } else if (ref) {
        gsap.to(ref, { height: 0, duration: 0.2 });
      }
    });
  }, [activeIndex]);

  const toggleContent = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const sections = [
    { 
      title: 'Work Strategy', 
      content: (
        <>
          <b> I follow a systematic approach to development: </b>  
          <ul>
            <li> &nbsp; Understanding requirements and project goals.</li>
            <li> &nbsp; Planning UI/UX and designing wireframes.</li>
            <li> &nbsp; Writing clean, maintainable code.</li>
            <li> &nbsp; Testing and debugging for seamless functionality.</li>
            <li> &nbsp; Deploying high-quality applications and providing ongoing support.</li>
          </ul>
        </>
      ) 
    },
    { 
      title: 'The Process of Our Work', 
      content: (
        <ol>
          <li><strong>Research & Planning:</strong> Defining goals and creating a roadmap.</li>
          <li><strong>Design & Development:</strong> Implementing frontend and backend solutions.</li>
          <li><strong>Testing & Optimization:</strong> Ensuring high performance and smooth functionality.</li>
          <li><strong>Deployment & Support:</strong> Delivering the final product and maintaining projects.</li>
        </ol>
      ) 
    },
    { 
      title: 'Core Value of Development', 
      content: (
        <ul>
          <li><strong>User-Centric Approach:</strong> Prioritizing intuitive and accessible design.</li>
          <li><strong>Scalability & Performance:</strong> Optimizing applications for speed and growth.</li>
          <li><strong>Security & Best Practices:</strong> Implementing robust security measures.</li>
          <li><strong>Continuous Learning:</strong> Staying updated with the latest technologies.</li>
        </ul>
      ) 
    },
    { 
      title: 'Desire to Work Hard', 
      content: (
        <>
          I am driven by passion and continuously push my boundaries to improve my skills, adopt new technologies,  
          and build impactful projects that make a difference.
        </>
      ) 
    },
  ];  

  return (
    <div className="z-10 h-full min-h-screen w-full relative dark:text-black overflow-hidden flex flex-col items-center m-auto pt-32 max-md:pt-12"
      style={{ maxWidth: "1600px" }}>
      {/* ---------content------------ */}
      <div className="w-full flex justify-evenly max-md:items-center z-10 max-md:flex-col text-white dark:text-black">
        <div className="w-[52%] max-md:w-[98%] min-h-[450px] overflow-hidden max-md:h-auto transparent-color md:rounded-[50px] rounded-t-[50px] p-6 border-b-0 relative big-screen-light-dark-shadow" style={{}}>
          <h1 className="text-4xl sm:text-5xl mt-4 font-bold">Hello,</h1>
          <h1 className="text-4xl sm:text-5xl pt-4 font-bold">I&apos;m Chatanya</h1>
          <p className="pt-4 text-gray-300 dark:text-gray-800">
            I am a full stack developer with a passion for creating beautiful and functional web applications. I chose this as a career because I love to create nice stuff. Creativity is the key. Now I target building some awesome stuff that can help people in their daily life.
          </p>
          <p className="pt-4 text-gray-300 dark:text-gray-800">
            I am currently working as a Freelance Developer and a Full Stack Developer Intern and I am open to new opportunities. I have a healthy obsession of learning new everyday which makes a better developer and a better Athlete. I love playing Football.
          </p>
        </div>
        <div className="w-[34%] max-md:w-[98%] h-auto transparent-color md:rounded-[50px] rounded-b-[50px] overflow-hidden flex justify-center items-center big-screen-light-dark-shadow">
          <img src={image2} className="m-auto h-full max-h-[450px]" alt="" />
        </div>
      </div>

      {/* ---------Skils-------------- */}
      <div className="z-10 w-full mt-10">
        <div className="mt-10 mx-auto">
          <Skills />
        </div>
        <div className="w-[110%] overflow-hidden whitespace-nowrap bg-black/30 backdrop-blur-xl -rotate-6 -ml-3 -mb-20 mt-40">
          <div class="w-full whitespace-nowrap relative">
            <div class="animate-scroll inline-flex ">
              <div class="inline-flex whitespace-nowrap py-4 ">
                <img src={WordpressIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Wordpress</span>
                <img src={BootstrapIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Bootstrap</span>
                <img src={laravelIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Laravel</span>
                <img src={JsIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">JavaScript</span>
                <img src={ReactIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">React JS</span>
                <img src={PhpIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Php</span>
                <img src={ExpressIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Express JS</span>
                <img src={CssIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">CSS</span>
                <img src={HtmlIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">HTML</span>
                <img src={JavaIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Java</span>
                <img src={TypescriptIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">TypeScript</span>
                <img src={ApiIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">FastApi</span>
                <img src={laravelIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Laravel</span>
                <img src={ReactIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">React JS</span>
                <img src={ExpressIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Express JS</span>
                <img src={TailwindIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Tailwind</span>
                <img src={TailwindIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Tailwind</span>
                <img src={BootstrapIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Bootstrap</span>
                <img src={AjaxIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">AJAX</span>
                <img src={TypescriptIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">TypeScript</span>
                <img src={ApiIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">FastApi</span>
                <img src={laravelIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Laravel</span>
                <img src={WordpressIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Wordpress</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[110%] overflow-hidden whitespace-nowrap bg-black/30 backdrop-blur-xl rotate-6 -ml-3 mt-5 mb-24">
          <div class="w-full whitespace-nowrap relative">
            <div class="animate-scroll-2 inline-flex ">
              <div class="inline-flex whitespace-nowrap py-4 ">
                <img src={PhpIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Php</span>
                <img src={ExpressIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Express JS</span>
                <img src={TailwindIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Tailwind</span>
                <img src={BootstrapIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Bootstrap</span>
                <img src={AjaxIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">AJAX</span>
                <img src={TypescriptIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">TypeScript</span>
                <img src={ApiIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">FastApi</span>
                <img src={laravelIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Laravel</span>
                <img src={WordpressIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Wordpress</span>
                <img src={CssIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">CSS</span>
                <img src={HtmlIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">HTML</span>
                <img src={JavaIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Java</span>
                <img src={TypescriptIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">TypeScript</span>
                <img src={ApiIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">FastApi</span>
                <img src={laravelIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Laravel</span>
                <img src={ReactIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">React JS</span>
                <img src={ExpressIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Express JS</span>
                <img src={TailwindIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Tailwind</span>
                <img src={BootstrapIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Bootstrap</span>
                <img src={laravelIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Laravel</span>
                <img src={JsIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">JavaScript</span>
                <img src={ReactIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">React JS</span>
                <img src={PhpIcon} className="w-12 mr-3  max-md:mr-10 max-md:w-8" alt="" />
                <span className="text-white text-5xl max-md:text-2xl font-bold pr-16  max-md:pr-10">Php</span>
              </div>
            </div>
          </div>
        </div>
        {/* ------------working-------------- */}
        <Working />
        <Footer />
      </div>
    </div>
  )
}

export default AboutPage
