"use client";
import Axios from "axios";
import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post.ID_BOOK}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};
const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    Axios.get("http://localhost:4000/books")
      .then((response) => {
        setAllPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  };
  return (
    <section className="feed">
      {/* All Prompts */}

      <PromptCardList data={allPosts} />
    </section>
  );
};

export default Feed;
