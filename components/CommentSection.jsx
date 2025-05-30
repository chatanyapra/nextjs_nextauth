/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaRegPaperPlane, FaTrashCan, FaEye, FaEyeSlash } from "react-icons/fa6";
import Swal from "sweetalert2";
import { useAuthContext } from "../context/AuthContext";

const formatToCustomDate = (isoDate) => {
    const date = new Date(isoDate);

    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const amPm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    return `${month}/${day}/${year}, ${hours}:${minutes} ${amPm}`;
};

// eslint-disable-next-line react/prop-types
const CommentSection = ({
    onSubmit,
    loadingData,
    loadingComments,
    comments,
    placeholder = "Write your comment...",
    onDeleteComment,
    onToggleVisibility,
}) => {
    const [comment, setComment] = useState("");
    const { authUser } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!comment.trim()) {
            console.log("Comment is empty or whitespace only.");
            return;
        }

        console.log("Comment to be submitted:", comment);
        onSubmit(comment);
        setComment("");
    };

    const handleDeleteComment = (commentId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete",
            customClass: 'bg-gray-600 border-gray-700 text-white rounded-xl dark:bg-white dark:border-gray-300 dark:text-gray-800 dark:rounded-xl',
        }).then((result) => {
            if (result.isConfirmed) {
                onDeleteComment(commentId);
                Swal.fire("Deleted!", "Your comment has been deleted.", "success");
            }
        });
    };

    const handleToggleVisibility = (commentId, currentStatus) => {
        const newStatus = !currentStatus;
        onToggleVisibility(commentId, newStatus);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="sm:w-[95%] w-[98%] mx-auto mt-10 sm:p-6 p-4 dark:text-gray-700 text-white transparent-color light-dark-shadow sm:rounded-[50px] rounded-3xl"
        >
            {authUser && (
                <>
                    <div className="flex justify-between mt-4">
                        <h2 className="text-2xl font-bold mb-4">Share Your Opinion</h2>
                        <button
                            type="submit"
                            disabled={loadingData}
                            className="bg-blue-600 text-white py-3 px-6 text-2xl rounded-3xl shadow-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {loadingData ? (
                                <div className="loader flex justify-center items-center">
                                    <div className="w-7 h-7 border-4 border-gray-200 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : (
                                <FaRegPaperPlane />
                            )}
                        </button>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="comment"
                                className="block text-sm font-medium"
                            >
                                Your Comment
                            </label>
                            <textarea
                                id="comment"
                                name="comment"
                                rows="2"
                                placeholder={placeholder}
                                className="mt-1 block w-full p-3 rounded-2xl border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                            ></textarea>
                        </div>
                    </div>
                </>
            )}

            <div className="mt-8">
                <h3 className="text-xl font-medium mb-1">Comments</h3>
                <div className="max-h-[450px] custom-scrollbar pt-1 sm:pt-4 w-full overflow-x-hidden">
                    <div className="space-y-4 sm:pl-6 mb-6 mx-auto">
                        {loadingComments && <p>Loading comments...</p>}

                        {comments && comments.length > 0 ? (
                            comments
                                .filter(c => authUser?.isAdmin || c.showOnHomepage) 
                                .map((c, index) => (
                                    <div key={index}  className="sm:py-4">
                                        <div className="relative border-2 w-full border-gray-400 sm:p-4 px-3 py-2 rounded-r-[50px] rounded-bl-[50px] max-sm:rounded-tl-[4px] shadow-md">
                                            <div className="sm:absolute relative sm:-top-8 -left-6 sm:border-2 max-sm:ml-3 sm:dark:bg-white sm:bg-black border-gray-400 w-full sm:w-fit sm:min-w-96 min-h-14 rounded-[40px] flex p-2 items-center">
                                                <img
                                                    src={c.userId?.image || "//picsum.photos/1920/1080"}
                                                    className="w-12 h-12 rounded-full"
                                                    alt=""
                                                />
                                                <div className="sm:px-4 w-full overflow-hidden flex justify-between items-center">
                                                    <h4 className="text-base font-semibold capitalize max-sm:pl-2">
                                                        {c.userId?.username}
                                                    </h4>
                                                    {authUser?.isAdmin && (
                                                        <div className="text-white dark:text-black flex mr-2">
                                                            {c.showOnHomepage ? (
                                                                <FaEye
                                                                    className="mr-2 text-2xl cursor-pointer"
                                                                    onClick={() =>
                                                                        handleToggleVisibility(c._id, !c.showOnHomepage)
                                                                    }
                                                                />
                                                            ) : (
                                                                <FaEyeSlash
                                                                    className="mr-2 text-2xl cursor-pointer"
                                                                    onClick={() =>
                                                                        handleToggleVisibility(c._id, !c.showOnHomepage)
                                                                    }
                                                                />
                                                            )}
                                                            <FaTrashCan
                                                                className="ml-2 text-xl cursor-pointer"
                                                                onClick={() =>
                                                                    handleDeleteComment(c._id)
                                                                }
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="w-[94%] h-[2px] mx-auto rounded-[100%] bg-white dark:bg-gray-400 mb-2 max-sm:block hidden"></div>
                                            <div className="sm:mt-8 -mt-2 pl-5 overflow-hidden">
                                                <p className="text-white dark:text-black mt-1 max-sm:text-gray-200 text-wrap">
                                                    {c.comment}
                                                </p>
                                                <span className="text-xs text-gray-300 dark:text-gray-600 float-end px-5 py-2">
                                                    {formatToCustomDate(c.createdAt)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        ) : (
                            <p>No comments to display.</p>
                        )}


                    </div>
                </div>
            </div>
        </form>
    );
};

export default CommentSection;
