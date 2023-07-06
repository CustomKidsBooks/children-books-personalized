"use client";
import Axios from "axios";
import { useRouter } from "next/navigation";

const PromptCard = ({ post }) => {
  const router = useRouter();
  const handleDelete = async () => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      Axios.delete(`http://localhost:4000/books/${post.ID_BOOK}`)
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error deleting book:", error);
        });
    }
  };
  const handleEdit = async () => {
    router.push(`/update-prompt?id=${post.ID_BOOK}`);
  };
  return (
    <div className="prompt_card">
      <div className="flex flex-col">
        <h3 className="font-satoshi font-semibold text-gray-900">
          {post.TITLE}
        </h3>
        <p className="font-inter text-sm text-gray-500">{post.AUTHOR}</p>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">
        {post.DESCRIPTION}
      </p>
      <p className="font-inter text-sm blue_gradient ">{post.PAGE}</p>
      <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
        <p
          className="font-inter text-sm green_gradient cursor-pointer"
          onClick={handleEdit}
        >
          Edit
        </p>
        <p
          className="font-inter text-sm orange_gradient cursor-pointer"
          onClick={handleDelete}
        >
          Delete
        </p>
      </div>
    </div>
  );
};

export default PromptCard;
