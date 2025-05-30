import { useEffect } from 'react';
import ProjectCard from './ProjectCard';
import backgroundLine from "../assets/images/background-line.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDataContext } from '../context/DataContext';
import { Link } from 'react-router-dom';
gsap.registerPlugin(ScrollTrigger);

const Project = () => {

  useEffect(() => {
    const cards = gsap.utils.toArray(".projectCard");
    const animations = cards.map((card, index) =>
      gsap.fromTo(
        card,
        {
          opacity: 0,
          scale: 0.8,
          x: index % 2 === 0 ? -200 : 200,
          y: 40,
        },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 60%",
            scrub: false,
            once: true,
          },
        }
      )
    );

    return () => {
      animations.forEach((animation) => {
        if (animation.scrollTrigger) {
          animation.scrollTrigger.kill(); // Kill ScrollTrigger instance
        }
        animation.kill(); // Kill GSAP animation
      });
    };
  }, []);
  
  const { projects } = useDataContext();

  return (
    <div className="w-full mb-16 mt-24 mx-auto flex flex-col relative project-card-bglighter">
      <img
        src={backgroundLine}
        className="w-full h-full absolute -left-2 -right-14"
        style={{ transform: "scaleY(-1)" }}
        loading="lazy"
        alt=""
      />
      <div className="transparent-color light-dark-shadow px-4 py-1 text-4xl rounded-2xl w-fit mb-4 text-gradient h-fit flex justify-center items-center ml-6">
        <div className="rounded-full w-7 h-7 flex justify-center items-center mr-2 mt-1">
          <div className="bg-gradient-radial w-5 h-5 m-auto rounded-full transition-transform transform hover:scale-125 duration-300 ease-in-out"></div>
        </div>
        <i className="mb-2">Projects</i>
      </div>
      <div className="flex w-full justify-around flex-wrap max-md:pl-4">
        {projects.slice(0, 4).map((project, index) => (
            <div key={project._id} className="projectCard">
                <ProjectCard project={project} src={"work"} count={index + 1} />
            </div>
        ))}

      </div>
      <Link to={"work"} className="text-2xl text-white dark:text-black text-right mr-20 cursor-pointer hover:dark:text-blue-700 hover:text-blue-700 z-10">
        See More...
      </Link>
    </div>
  );
};

export default Project;
