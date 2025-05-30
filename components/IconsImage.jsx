import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PropTypes from 'prop-types';

// Importing icons
import BootstrapIcon from "../assets/IconsImage/bootstrap.png";
import AjaxIcon from "../assets/IconsImage/ajax.png";
import Jquery from "../assets/IconsImage/jquery.png";
import Mongo from "../assets/IconsImage/mongodb.png";
import JavaIcon from "../assets/IconsImage/java.png";
import Mysql from "../assets/IconsImage/mysql.png";
import Nodejs from "../assets/IconsImage/nodejs.png";
import Postgre from "../assets/IconsImage/postgresql.png";
import Wordpress from "../assets/IconsImage/wordpress.png";
import Docker from "../assets/IconsImage/docker.png";
import Golang from "../assets/IconsImage/golang.png";
import ApiIcon from "../assets/IconsImage/api.png";
import CssIcon from "../assets/IconsImage/css.png";
import Html from "../assets/IconsImage/html.png";
import ExpressIcon from "../assets/IconsImage/expressjs.png";
import JsIcon from "../assets/IconsImage/js.png";
import ReactIcon from "../assets/IconsImage/react.png";
import TailwindIcon from "../assets/IconsImage/tailwindcss.png";
import TypescriptIcon from "../assets/IconsImage/typescript.png";
import PhpIcon from "../assets/IconsImage/php.png";
import LaravelIcon from "../assets/IconsImage/laravel.png";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const IconsImage = ({ techStacks }) => {
    const techIconsRef = useRef([]);

    // Array of icon objects with corresponding names
    const icons = [
        { name: 'Bootstrap', src: BootstrapIcon },
        { name: 'Ajax', src: AjaxIcon },
        { name: 'API', src: ApiIcon },
        { name: 'CSS', src: CssIcon },
        { name: 'NodeJs', src: Nodejs },
        { name: 'GoLang', src: Golang },
        { name: 'Docker', src: Docker },
        { name: 'MongoDB', src: Mongo },
        { name: 'PostgreSql', src: Postgre },
        { name: 'Wordpress', src: Wordpress },
        { name: 'MySql', src: Mysql },
        { name: 'Java', src: JavaIcon },
        { name: 'HTML', src: Html },
        { name: 'Jquery', src: Jquery },
        { name: 'Express', src: ExpressIcon },
        { name: 'JavaScript', src: JsIcon },
        { name: 'React', src: ReactIcon },
        { name: 'Tailwind', src: TailwindIcon },
        { name: 'TypeScript', src: TypescriptIcon },
        { name: 'PHP', src: PhpIcon },
        { name: 'Laravel', src: LaravelIcon },
    ];

    // GSAP animation effect
    useEffect(() => {
        const elements = techIconsRef.current.filter(Boolean); // Filter out any null references

        if (elements.length > 0) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: techIconsRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                    scrub: 1,
                },
            });

            tl.fromTo(
                elements,
                { opacity: 0, scale: 0.5 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1.5,
                    ease: "power2.out",
                    stagger: 0.2,
                }
            );
        }

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill()); // Cleanup on unmount
        };
    }, [techStacks]);

    return (
        <div className="icon-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 p-4 text-white dark:text-black">
            {techStacks.map((techStack, index) => {

                // First check for exact match
                let matchingIcon = icons.find(icon =>
                    icon.name.toLowerCase() === techStack.name.toLowerCase()
                );

                // If no exact match, check the first 4 characters
                if (!matchingIcon) {
                    matchingIcon = icons.find(icon =>
                        icon.name.slice(0, 4).toLowerCase() === techStack.name.slice(0, 4).toLowerCase()
                    );
                }

                return (
                    <div
                        key={index}
                        className="tech-stack-item flex flex-col items-center space-y-2"
                        ref={(el) => (techIconsRef.current[index] = el)}
                    >
                        {matchingIcon ? (
                            <>
                                <div className="icon-container bg-white dark:bg-gray-300 rounded-2xl w-20 h-20 flex justify-center items-center p-2">
                                    <img src={matchingIcon.src} className="w-12 h-12 object-contain" alt={matchingIcon.name} />
                                </div>
                                <div className="tech-stack-name text-center font-medium ">{techStack.name}</div>
                            </>
                        ) : (
                            <div className="tech-stack-name text-center font-medium !">{techStack.name}</div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

// Define PropTypes for IconsImage
IconsImage.propTypes = {
    techStacks: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired
        })
    ).isRequired
};

export default IconsImage;
