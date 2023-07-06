"use client";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const UpdateBook = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({
    title: "",
    desc: "",
    author: "",
    page: "",
  });
  useEffect(() => {
    const getPromptDetails = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:4000/editBook/${promptId}`
        );
        const book = response.data; // assuming the response data is the book object

        setPost({
          title: book[0].TITLE,
          desc: book[0].DESCRIPTION,
          author: book[0].AUTHOR,
          page: book[0].PAGE,
        });
      } catch (error) {
        console.error("Error fetching prompt details:", error);
      }
    };

    if (promptId) {
      getPromptDetails();
    }
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await Axios.post(
        `http://localhost:4000/update_book/${promptId}`,
        {
          title: post.title,
          description: post.desc,
          author: post.author,
          page: post.page,
          image: post.image,
        }
      );
      if (response.status === 200) {
        router.push("/");
      }
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
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdateBook;
