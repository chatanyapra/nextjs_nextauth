import { FaLink, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"; 
import "./Project.css";

const ProjectCard = ({ project, src, count }) => {
    return (
        <div className="transparent-color light-dark-shadow card-container my-5 w-[550px] flex max-md:w-[95%] max-md:h-[350px] max-sm:h-[300px] mx-auto overflow-hidden relative group">
            <div className="card-project md:w-[450px] max-md:w-[85%] max-md:h-[350px] max-sm:h-[300px] ">
                <div className="img-content">
                    {project.images && project.images.length > 0 && (
                        <img src={project.images[0].url} alt={project.images[0].alt || 'Project Image'} 
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>
                <div className="content-project max-md:w-[85%] w-[80%] overflow-hidden">
                    <p className="heading max-sm:text-xl text-3xl">{project.title}</p>
                    <p className="max-sm:text-xs">{project.shortDescription}</p>
                </div>
            </div>
            <div className="flex m-auto flex-col h-full justify-around text-white dark:text-black">
                <div className="rounded-full flex justify-center items-center mx-auto">
                    <div className="bg-gradient-radial w-10 md:w-12 h-10 md:h-12 m-auto rounded-full transition-transform transform group-hover:scale-125 duration-500 ease-in-out flex justify-center items-center font-bold text-3xl">
                        {count}
                    </div>
                </div>
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <FaLink className="text-4xl max-sm:text-3xl cursor-pointer" />
                </a>
                <Link to={`/${src}/${project._id}`}>
                    <FaArrowUpRightFromSquare className="text-3xl max-sm:text-2xl cursor-pointer" />
                </Link>
            </div>
        </div>
    );
};

// Define PropTypes for ProjectCard
ProjectCard.propTypes = {
    src: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    project: PropTypes.shape({
        title: PropTypes.string.isRequired,
        shortDescription: PropTypes.string,
        images: PropTypes.arrayOf(
            PropTypes.shape({
                url: PropTypes.string.isRequired,
                alt: PropTypes.string,
                _id: PropTypes.string,
            })
        ),
        link: PropTypes.string,
        _id: PropTypes.string.isRequired,
    }).isRequired,
};

export default ProjectCard;
