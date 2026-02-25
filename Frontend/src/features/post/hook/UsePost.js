import { useContext } from "react";
import { PostContext } from "../Post.context";
import { getFeed } from "../services/post.api";

export const usePost = () => {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error("usePost must be used inside PostContextProvider");
  }

  const { loading, setLoading, feed, setFeed } = context;

  const handleGetFeed = async () => {
    try {
      setLoading(true);
      const data = await getFeed();
      setFeed(data.posts);
    } catch (error) {
      console.error("Error fetching feed:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, feed, handleGetFeed };
};