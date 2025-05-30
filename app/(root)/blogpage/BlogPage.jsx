import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import BlogCard from "../components/BlogCard";
import { useDataContext } from "../context/DataContext";
import backgroundLine from "../assets/images/background-line.png";
import Footer from "../components/Footer";
import CommentSection from "../components/CommentSection";
import useAddBlogComment from "../hooks/useAddBlogComment";
import useGetBlogComments from "../hooks/useGetBlogComments";
import { useAuthContext } from "../context/AuthContext";

gsap.registerPlugin(ScrollTrigger);

const BlogPage = () => {
  const { blogs } = useDataContext();
  const { id } = useParams(null);
  const [projectName, setProjectName] = useState("");
  const [projectLongDescription, setProjectLongDescription] = useState("");
  const { loadingBlog, addBlogComment } = useAddBlogComment();
  const { loadingComments, comments, setComments, fetchBlogComments } = useGetBlogComments();
  const { authUser } = useAuthContext();

  useEffect(() => {
    setProjectName("");
    setProjectLongDescription("");
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchByProjectId = async () => {
      try {
        const response = await fetch(`/api/portfolio/blogs/${id}`);
        const result = await response.json();
        if (result.success) {
          setProjectName(result.data.title || "");
          setProjectLongDescription(result.data.longDescription || "");
        } else {
          console.error("Failed to load project data.");
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    if (id) fetchByProjectId();
  }, [id]);

  // GSAP animation for blog cards
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
  }, [blogs]);

  const handleCommentSubmit = async (commentText) => {
    if (id) {
      const tempComment = {
        userId: { image: (authUser?.image ? authUser.image : "//picsum.photos/1920/1080"), username: authUser?.username },
        comment: commentText,
        createdAt: new Date().toISOString(),
      };
      setComments((prev) => [tempComment, ...prev]);
      await addBlogComment({ blogId: id, commentText });
    }
  };

  const handleToggleVisibility = async (commentId, currentVisibility) => {
    try {
      const response = await fetch(`/api/portfolio/blogcomment/${commentId}/visibility`, {
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
      const response = await fetch(`/api/portfolio/blogcomment/${commentId}/delete`, {
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
      fetchBlogComments(id);
    }
  }, [id]);

  return (
    <div className="z-10 h-full min-h-screen w-full relative dark:text-black overflow-hidden flex flex-col items-center m-auto pt-32 max-md:pt-12" style={{ maxWidth: "1600px" }}>
      {projectLongDescription && (
        <div className="w-[95%] min-h-96 transparent-color rounded-[50px] flex max-md:flex-col justify-between p-10 my-10 light-dark-shadow">
          <div className="text-white dark:text-black">
            <h1 className="text-4xl pb-10">{projectName}</h1>
            <p dangerouslySetInnerHTML={{ __html: projectLongDescription }}></p>
          </div>
        </div>
      )}

      {id && (
        <CommentSection
          onSubmit={handleCommentSubmit}  className="mb-8"
          loadingData={loadingBlog}
          loadingComments={loadingComments}
          comments={comments}
          placeholder="Write your project comment..."
          onToggleVisibility={handleToggleVisibility}
          onDeleteComment={handleDeleteComment}
        />
      )}

      <div className={`w-full mx-auto flex flex-col relative blogsection-bg-design ${id && ('mt-8')}`}>
        <img src={backgroundLine} className='w-full h-full absolute -left-2 -right-14' loading="lazy" alt="" />
        <div className="px-4 pb-4 text-8xl font-bold rounded-2xl w-fit mb-4
         text-gradient h-fit flex justify-center items-center mx-auto">
          Blogs
        </div>
        <div className='flex w-full justify-around max-lg:flex-col md:flex-wrap max-md:px-1'>
          {blogs.slice(0, 4).map((blog, index) => (
            <div key={blog._id} className='blogCard'>
              <BlogCard blog={blog} src={"blogs"} count={index + 1}/>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;
