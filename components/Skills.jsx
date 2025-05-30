import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGithubLanguages } from '../context/GithubLanguagesContext';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
    const skillBarsRef = useRef([]);
    const { languages, loading, error } = useGithubLanguages();

    useEffect(() => {
        skillBarsRef.current.forEach((bar) => {
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
    }, [languages]); // Re-run GSAP animation when languages change

    return (
        <section className="text-white dark:text-black pb-10 mb-8">
            <div className="w-full mx-auto px-4">
                <div className='transparent-color light-dark-shadow px-4 py-1 text-4xl rounded-2xl w-fit mb-4 text-gradient h-fit flex justify-center items-center ml-3'>
                    <div className="rounded-full w-7 h-7 flex justify-center items-center mr-2 mt-1">
                        <div className="bg-gradient-radial w-5 h-5 m-auto rounded-full transition-transform transform hover:scale-125 duration-300 ease-in-out"></div>
                    </div>
                    <i className="mb-2">My Skills</i>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold my-4 ml-3">I Develop Skills Regularly</h3>
                <p className="text-white dark:text-black mb-8 ml-3">
                    I continuously refine my skills to build modern, efficient, and high-performing web applications.
                </p>

                {loading && <p className="ml-3">Loading skills...</p>}
                {error && <p className="ml-3 text-red-500">Error fetching skills: {error}</p>}

                {!loading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-[95%] m-auto">
                        {Object.entries(languages).map(([name, percentage], index) => (
                            <div key={name}>
                                <div className="flex justify-between mb-1">
                                    <span>{name}</span>
                                    <span>{percentage}</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div
                                        ref={(el) => (skillBarsRef.current[index] = el)}
                                        data-percent={percentage}
                                        className="bg-blue-600 h-2 rounded-full"
                                        style={{ width: '0%' }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Skills;
