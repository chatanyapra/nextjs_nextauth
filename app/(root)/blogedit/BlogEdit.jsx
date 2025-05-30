import { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-hot-toast";
import { useDataContext } from "../context/DataContext";
import Loader from "../components/Loader";
import BlogCard from "../components/BlogCard";

const BlogEdit = () => {
  const formRef = useRef(null);
  const editorRef = useRef(null);
  const { blogs, refreshBlogs, loading, setLoading } = useDataContext();

  const { id } = useParams(null);

  // State variables for form fields
  const [blogTitle, setBlogTitle] = useState("");
  const [blogShortDescription, setBlogShortDescription] = useState("");
  const [blogLongDescription, setBlogLongDescription] = useState("");
  const [blogImages, setBlogImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    setBlogTitle("");
    setBlogShortDescription("");
    setBlogLongDescription("");
    setBlogImages([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchByBlogId = async () => {
      try {
        const response = await fetch(`/api/portfolio/blogs/${id}`);
        const result = await response.json();

        if (result.success) {
          setBlogTitle(result.data.title || "");
          setBlogShortDescription(result.data.shortDescription || "");
          setBlogLongDescription(result.data.longDescription || "");
          const fetchedImages = result.data.images || [];
          setBlogImages(fetchedImages);
          setExistingImages(fetchedImages);
        } else {
          console.error("Failed to load blog data.");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    if (id) fetchByBlogId();
  }, [id]);

  const limitImages = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 3) {
      toast.error("Please upload a maximum of 3 images.");
      formRef.current.reset();
    } else {
      const filePreviews = files.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));
      setBlogImages(filePreviews);
    }
  };

  useEffect(() => {
    return () => {
      blogImages.forEach((image) => URL.revokeObjectURL(image.url));
    };
  }, [blogImages]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    window.scrollTo({ top: 0, behavior: 'smooth' });

    const formData = new FormData();
    formData.append("title", blogTitle);
    formData.append("shortDescription", blogShortDescription);
    formData.append("longDescription", editorRef.current.getContent());

    if (blogImages.length > 0) {
      blogImages.forEach((imageObj) => {
        formData.append("files", imageObj.file);
      });
    } else {
      existingImages.forEach((image) => {
        formData.append("files", image.url); // Retain existing image URLs
      });
    }

    try {
      const method = id ? "PUT" : "POST";
      const url = `/api/portfolio/blogs${id ? `/${id}` : ''}`;

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (response.ok) {
        toast.success("Blog submitted successfully!");
        await refreshBlogs();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Submission failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.history.scrollRestoration = 'manual'; // This prevents auto-restoration
  }, []);

  return (
    <div className="z-10 h-full min-h-screen mb-20 w-full relative dark:bg-white dark:text-black overflow-hidden flex flex-col items-center m-auto pt-32 max-md:pt-12"
      style={{ maxWidth: "1600px" }}>
      <h1 className="text-3xl font-bold text-left dark:text-black text-white mb-6 pl-4 w-full">Blog Form</h1>
      <div className="rounded-lg relative shadow-md w-[92%] overflow-hidden light-dark-shadow border border-gray-400">
        {loading && (
          <div className="w-full h-full bg-gray-50 bg-opacity-70 absolute top-0 left-0 z-10 flex justify-center items-center">
            <Loader />
          </div>
        )}
        <form ref={formRef} onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4 w-full">
          <label className="block mb-2">Blog Title</label>
          <input
            type="text"
            name="blogTitle"
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
            className="w-full p-2 border border-gray-400 rounded"
            required
          />

          <label className="block mt-8">Short Description</label>
          <input
            type="text"
            name="blogShortDescription"
            value={blogShortDescription}
            onChange={(e) => setBlogShortDescription(e.target.value)}
            className="w-full p-2 border border-gray-400 rounded"
            required
          />

          <label className="block mt-8">Long Description</label>
          <Editor
            apiKey={import.meta.env.VITE_GOOGLE_EDITOR_API}
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={blogLongDescription}
            init={{
              height: 300,
              menubar: false,
              plugins:
                "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
            }}
          />

          <label className="block mt-8">Images (Max 3)</label>
          <div className="flex flex-col space-y-2">
            <input
              type="file"
              name="blogImages"
              accept="image/*"
              multiple
              onChange={limitImages}
              className="file-input"
            />
          </div>
          {blogImages && blogImages.length > 0 && (
            <div className="flex space-x-2 mt-4">
              {blogImages.map((image, index) => (
                <img
                  key={index}
                  src={image.url}  // Use the temporary preview URL
                  alt={`Blog Image ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-md border-gray-500 border"
                  loading="lazy"
                />
              ))}
            </div>
          )}

          <button type="submit" className="mt-8 bg-blue-500 text-white px-4 py-2 rounded">
            Submit
          </button>
        </form>
      </div>

      <div className='w-full mx-auto flex flex-col relative blogsection-bg-design mt-10'>
        <div className='transparent-color light-dark-shadow px-4 py-1 text-4xl rounded-2xl w-fit mb-4 text-gradient h-fit flex justify-center items-center ml-6'>
          <div className="rounded-full w-7 h-7 flex justify-center items-center mr-2 mt-1">
            <div className="bg-gradient-radial w-5 h-5 m-auto rounded-full transition-transform transform hover:scale-125 duration-300 ease-in-out"></div>
          </div>
          <i className="mb-2">Blogs</i>
        </div>
        <div className='flex w-full justify-around max-lg:flex-col md:flex-wrap max-md:px-1'>
          {blogs.slice(0, 4).map((blog) => (
            <div key={blog._id} className='blogCard'>
              <BlogCard blog={blog} src={"blogedit"} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogEdit;
