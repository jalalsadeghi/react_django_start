import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getPosts = async () => {
      try {
        const response = await axiosPrivate.get("/api/blog/post/", {
          signal: controller.signal,
        });
        console.log(response.data.results);
        isMounted && setPosts(response.data.results);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getPosts();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Posts list</h2>
      {posts?.length ? (
        <ul>
          {posts.map((post, i) => (
            <li key={i}>{post?.title}</li>
          ))}
        </ul>
      ) : (
        <p>No post to display</p>
      )}
    </article>
  );
};

export default Posts;
