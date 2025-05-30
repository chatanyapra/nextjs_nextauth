import { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-hot-toast";
import ProjectCard from "../components/ProjectCard";
import { useDataContext } from "../context/DataContext";
import Loader from "../components/Loader";

const ProjectEdit = () => {
  const formRef = useRef(null);
  const editorRef = useRef(null);
  const { projects, refreshProjects, loading, setLoading} = useDataContext();
  
  const { id } = useParams(null);

  const [projectName, setProjectName] = useState("");
  const [projectShortDescription, setProjectShortDescription] = useState("");
  const [projectLongDescription, setProjectLongDescription] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [techStacks, setTechStacks] = useState([""]);
  const [projectImages, setProjectImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  

  useEffect(() => {
    setTechStacks([""]);
    setProjectName("");
    setProjectShortDescription("");
    setProjectLink("");
    setProjectImages([""]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const fetchByProjectId = async () => {
      try {
        const response = await fetch(`/api/portfolio/projects/${id}`);
        const result = await response.json();
        
        if (result.success) {
          setProjectName(result.data.title || "");
          setProjectShortDescription(result.data.shortDescription || "");
          setProjectLongDescription(result.data.longDescription || "");
          setProjectLink(result.data.link || "");
          const fetchedImages = result.data.images || [];
          setProjectImages(fetchedImages);  
          setExistingImages(fetchedImages); 

          const initialTechStacks = result.data.techStack.map((stack) => ({ name: stack.name || "" }));
          setTechStacks(initialTechStacks);
        } else {
          console.error("Failed to load project data.");
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };
    if (id) fetchByProjectId();
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
      setProjectImages(filePreviews);
    }
  };

  useEffect(() => {
    return () => {
      projectImages.forEach((image) => URL.revokeObjectURL(image.url));
    };
  }, [projectImages]);  

  const addTechStackField = () => {
    if (techStacks.length >= 15) {
      toast.error("You cannot add more than 15 tech stack fields.");
      return;
    }
    setTechStacks([...techStacks, ""]);
  };

  const handleTechStackChange = (index, value) => {
    const updatedTechStacks = techStacks.map((techStack, idx) => 
      idx === index ? { name: value } : techStack
    );
    setTechStacks(updatedTechStacks);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  
    const formData = new FormData();
    formData.append("title", projectName);
    formData.append("shortDescription", projectShortDescription);
    formData.append("longDescription", editorRef.current.getContent());
    formData.append("link", projectLink);
    formData.append("techStack", JSON.stringify(techStacks));
  
    if (projectImages.length > 0) {
      projectImages.forEach((imageObj) => {
        formData.append("files", imageObj.file);
      });
    } else {
      existingImages.forEach((image) => {
        formData.append("files", image); 
      });
    }
  
    try {
      const method = id ? "PUT" : "POST";
      const url = `/api/portfolio/projects${id ? `/${id}` : ''}`;
  
      const response = await fetch(url, {
        method,
        body: formData,
      });
  
      if (response.ok) {
        toast.success("Project submitted successfully!");
        await refreshProjects();
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
      <h1 className="text-3xl font-bold text-left dark:text-black text-white mb-6 pl-4 w-full">Project Form</h1>
      <div className="rounded-lg relative shadow-md md:col-span-7 w-[92%] overflow-hidden light-dark-shadow border border-gray-400">
        {loading && (
          <div className="w-full h-full bg-gray-50 bg-opacity-70 absolute top-0 left-0 z-10 flex justify-center items-center">
            <div className="mx-auto">
              <Loader/>
            </div>
          </div>
        )}
        <form ref={formRef} onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4 w-full">
          <label className="block mb-2">Project Name</label>
          <input
            type="text"
            name="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full p-2 border border-gray-400 rounded"
            required
          />

          <label className="block mt-8">Short Description</label>
          <input
            type="text"
            name="projectShortDescription"
            value={projectShortDescription}
            onChange={(e) => setProjectShortDescription(e.target.value)}
            className="w-full p-2 border border-gray-400 rounded"
            required
          />

          <label className="block mt-8">Long Description</label>
          <Editor
            apiKey={import.meta.env.VITE_GOOGLE_EDITOR_API}
            onInit={(evt, editor) => (editorRef.current = editor)}
            // onInit={(e) => setProjectLongDescription(e.target.value)}
            initialValue={projectLongDescription}
            init={{
              height: 300,
              menubar: false,
              plugins:
                "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
            }}
          />

          <label className="block mt-8">Project Link</label>
          <input
            type="url"
            name="projectLink"
            value={projectLink}
            onChange={(e) => setProjectLink(e.target.value)}
            className="w-full p-2 border border-gray-400 rounded"
            placeholder="https://example.com"
            required
          />

          <label className="block mt-8">Tech Stack (Add Multiple)</label>
          <div id="techStackContainer" className="space-y-2">
            {techStacks.map((techStack, index) => (
              <input
                key={index}
                type="text"
                value={techStack.name || ""}
                onChange={(e) => handleTechStackChange(index, e.target.value)}
                className="w-72 mr-5 p-2 border border-gray-400 rounded"
                placeholder="Tech Stack Name"
              />
            ))}
          </div>
          <button
            type="button"
            onClick={addTechStackField}
            className="mt-2 bg-gray-200 text-gray-700 px-4 py-1 rounded"
          >
            Add More
          </button>

          <label className="block mt-8">Images (Max 3)</label>
          <div className="flex flex-col space-y-2">
            <input
              type="file"
              name="projectImages"
              accept="image/*"
              multiple
              onChange={limitImages}
              className="file-input"
            />
          </div>
          {projectImages && projectImages.length > 0 && (
            <div className="flex space-x-2 mt-4">
              {projectImages.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
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
        <div className="mt-16 z-10 transparent-color light-dark-shadow px-4 py-1 text-4xl rounded-2xl w-fit mb-4 text-gradient h-fit flex justify-center items-center ml-6">
          <div className="rounded-full w-7 h-7 flex justify-center items-center mr-2 mt-1">
            <div className="bg-gradient-radial w-5 h-5 m-auto rounded-full transition-transform transform hover:scale-125 duration-300 ease-in-out"></div>
          </div>
          <i className="mb-2"> Projects</i>
        </div>

        <div className="flex w-full justify-around flex-wrap">
          {projects.map((project) => (
            <div
              key={project._id}
              className="projectCard"
            >
              <ProjectCard project={project} src={`projectedit`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectEdit;