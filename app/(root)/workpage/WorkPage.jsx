import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import backgroundLine from "../assets/images/background-line.png";
import "./WorkPage.css";
import ProjectCard from "../components/ProjectCard";
import Footer from "../components/Footer";
import { useDataContext } from "../context/DataContext";
import { useParams } from "react-router-dom";
import IconsImage from "../components/IconsImage";
import CommentSection from "../components/CommentSection";
import useAddProjectComment from "../hooks/useAddProjectComment";
import useGetProjectComments from "../hooks/useGetProjectComments";
import { useAuthContext } from "../context/AuthContext";

gsap.registerPlugin(ScrollTrigger);

const WorkPage = () => {
  const { id } = useParams();
  const projectCardRefs = useRef([]);
  const{loadingProject, addProjectComment} =  useAddProjectComment();
  const { loadingComments, comments, setComments, fetchProjectComments } = useGetProjectComments();

  const [projectName, setProjectName] = useState("");
  const [projectLongDescription, setProjectLongDescription] = useState("");
  const [ techStacks, setTechStacks] = useState([]);
  const {authUser}  = useAuthContext();

  useEffect(() => {
    setTechStacks([]);
    setProjectName("");
    setProjectLongDescription("");
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchByProjectId = async () => {
      try {
        const response = await fetch(`/api/portfolio/projects/${id}`);
        const result = await response.json();

        if (result.success) {
          setProjectName(result.data.title || "");
          setProjectLongDescription(result.data.longDescription || "");
          setTechStacks(result.data.techStack || []);
        } else {
          console.error("Failed to load project data.");
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    if (id) fetchByProjectId();
  }, [id]);

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
          delay: 3.1,
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
  }, [projectCardRefs]);

  const { projects } = useDataContext();
  const handleCommentSubmit = async (commentText) => {
    if(id){
      const tempComment = {
        userId: { image: (authUser?.image ? authUser.image : "//picsum.photos/1920/1080"), username: authUser?.username }, 
        comment: commentText,
        createdAt: new Date().toISOString(),
      };
      setComments((prev) => [tempComment, ...prev]);
      await addProjectComment({projectId: id, commentText});
    }
  }

  

  const handleToggleVisibility = async (commentId, currentVisibility) => {
    try {
      const response = await fetch(`/api/portfolio/projectcomment/${commentId}/visibility`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ showOnHomepage: !currentVisibility }), 
      });
      const result = await response.json();
      if (result.success) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId ? { ...comment, showOnHomepage: !currentVisibility } : comment
          )
        );        
      }
    } catch (error) {
      console.error("Error toggling visibility:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(`/api/portfolio/projectcomment/${commentId}/delete`, {
        method: "PATCH",
      });
      const result = await response.json();
      if (result.success) {
        setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProjectComments(id);
    }
  }, [id]);

  return (
    <div className="z-10 h-full min-h-screen w-full relative dark:text-black overflow-hidden flex flex-col items-center m-auto pt-32 max-md:pt-12" style={{ maxWidth: "1600px" }}>
      {projectLongDescription && (
        <>
          <div className="w-[95%] min-h-96 transparent-color light-dark-shadow rounded-[50px] flex max-md:flex-col justify-between p-10 ">
            <div className="text-white dark:text-black">
              <h1 className="text-4xl pb-10">{projectName}</h1>
              <p dangerouslySetInnerHTML={{ __html: projectLongDescription }}></p>
            </div>
          </div>

          <div className="w-full">
            <div className="mt-16 z-10 transparent-color light-dark-shadow px-4 py-1 text-4xl rounded-2xl w-fit mb-4 text-gradient h-fit flex ml-6 justify-center items-center">
              <div className="rounded-full w-7 h-7 flex justify-center items-center mr-2 mt-1">
                <div className="bg-gradient-radial w-5 h-5 m-auto rounded-full transition-transform transform hover:scale-125 duration-300 ease-in-out"></div>
              </div>
              <i className="mb-2"> Tech Stack</i>
            </div>
          </div>

          <div className="w-[95%] transparent-color light-dark-shadow rounded-[50px] mt-6">
            <IconsImage techStacks={techStacks} />
          </div>
        </>
      )}
      {id && (
        <CommentSection onSubmit={handleCommentSubmit} className="mb-8"
        loadingData={loadingProject} 
        loadingComments={loadingComments} 
        comments={comments} 
        placeholder="Write your project comment..."
        onToggleVisibility={handleToggleVisibility}
        onDeleteComment={handleDeleteComment}/>
      )}

      <div className={`w-full mx-auto flex flex-col relative blogsection-bg-design ${id && ('mt-8')}`}>
        <img src={backgroundLine} className='w-full h-full absolute -left-2 -right-14' loading="lazy" alt="" />
        <div className="px-4 pb-4 text-8xl font-bold rounded-2xl w-fit mb-4
         text-gradient h-fit flex justify-center items-center mx-auto">
          Projects
        </div>

        <div className="flex w-full justify-around flex-wrap">
          {projects.map((project, index) => (
            <div
              key={project._id}
              className="projectCard" 
              ref={(el) => (projectCardRefs.current[index] = el)}
            >
              <ProjectCard project={project} src={"work"} count={index + 1}/>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WorkPage;
