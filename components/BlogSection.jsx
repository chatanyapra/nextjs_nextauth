import { useEffect } from 'react';
import BlogCard from "./BlogCard";
import { gsap } from "gsap";
import { useDataContext } from '../context/DataContext';
import { Link } from 'react-router-dom';

const BlogSection = () => {
    useEffect(() => {
        const cards = gsap.utils.toArray(".blogCard");
    
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
              animation.scrollTrigger.kill();
            }
            animation.kill(); 
          });
        };
      }, []);

      const { blogs } = useDataContext();
 
    return (
        <div className='w-full mx-auto flex flex-col relative blogsection-bg-design'>
            <div className='transparent-color light-dark-shadow px-4 py-1 text-4xl rounded-2xl w-fit mb-4 text-gradient h-fit flex justify-center items-center ml-6'>
                <div className="rounded-full w-7 h-7 flex justify-center items-center mr-2 mt-1">
                    <div className="bg-gradient-radial w-5 h-5 m-auto rounded-full transition-transform transform hover:scale-125 duration-300 ease-in-out"></div>
                </div>
                <i className="mb-2">Blogs</i>
            </div>
            <div className='flex w-full justify-around max-lg:flex-col md:flex-wrap max-md:px-1'>
            {blogs.slice(0, 4).map((blog, index) => (
                <div key={blog._id} className='blogCard'>
                    <BlogCard blog={blog} src={"blogs"} count={index + 1}/>
                </div>
            ))}
            </div>
            <Link to={"blogs"} className='text-2xl text-white dark:text-black text-right mr-20 cursor-pointer hover:dark:text-blue-700 hover:text-blue-700 z-10'>
                See More...
            </Link>
        </div>
    )
}

export default BlogSection
