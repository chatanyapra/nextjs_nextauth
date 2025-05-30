import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import backgroundLine from "../assets/images/background-line.png";


const Working = () => {
  const [activeIndex, setActiveIndex] = useState(0);
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
    <section className="text-white dark:text-black py-12 px-6 relative w-full">
      <img src={backgroundLine} className='w-full h-full absolute -left-2 -right-14 -z-10' alt="" />
      <div className="w-[95%] max-sm:w-[100%] ml-3 max-sm:ml-0">
        <div className='transparent-color light-dark-shadow backdrop-blur-xl bg-black/30 px-4 py-1 text-4xl rounded-2xl justify-center items-center w-fit mb-4 text-gradient h-fit flex'>
          <div className="rounded-full w-7 h-7 flex justify-center items-center mr-2 mt-1">
            <div className="bg-gradient-radial w-5 h-5 m-auto rounded-full transition-transform transform hover:scale-125 duration-300 ease-in-out"></div>
          </div>
          <i className="mb-2">Working</i>
        </div>
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold mt-4">Real Passion to Create Amazing Things</h3>
          <p className="text-white dark:text-black mt-4 mb-8">
            I’m passionate about building scalable, high-performing web applications that solve real-world problems, whether for freelance projects or personal development.
          </p>
        </div>
        {/* Collapsible content */}
        {sections.map((section, index) => (
          <div key={index} className="mb-4 transparent-color light-dark-shadow p-4 rounded-3xl ml-7 max-sm:ml-0">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleContent(index)}
            >
              <span className="font-bold text-lg">{section.title}</span>
              <span className="text-2xl text-center">
                {activeIndex === index ? '-' : '+'}
              </span>
            </div>
            <div
              className="overflow-hidden text-gray-400 dark:text-gray-600"
              ref={(el) => (contentRefs.current[index] = el)}
              style={{ height: '0px' }}
            >
              <p className="mt-2 pl-4">{section.content}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Working;
