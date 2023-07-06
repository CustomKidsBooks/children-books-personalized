"use client";
import { useState } from "react";
import Axios from "axios";
import Form from "@components/Form";
import { useRouter } from "next/navigation";

const CreateBook = () => {
  const router = useRouter();
  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({
    title: "",
    desc: "",
    author: "",
    page: "",
  });

  const createPrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      Axios.post("http://localhost:4000/create_book", {
        title: post.title,
        description: post.desc,
        author: post.author,
        page: post.page,
        image: post.image,
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
      setPost({
        title: "",
        desc: "",
        author: "",
        page: "",
      });
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreateBook;
