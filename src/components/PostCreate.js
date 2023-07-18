import { useRef, useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const LOGIN_URL = "/api/blog/post/";

const PostCreate = () => {
  const axiosPrivate = useAxiosPrivate();

  const postRef = useRef();
  const errRef = useRef();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [img, setImg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    postRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [title, content]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosPrivate.post(
        LOGIN_URL,
        JSON.stringify({ title, content, file: img }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      setTitle("");
      setContent("");
      setImg("");
      window.location.reload();
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing title, content or image");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Post create Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Post Create</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          ref={postRef}
          autoComplete="off"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />

        <label htmlFor="content">Content:</label>
        <input
          type="text"
          id="content"
          onChange={(e) => setContent(e.target.value)}
          value={content}
          required
        />

        <label htmlFor="img">Image:</label>
        <input
          type="file"
          id="img"
          onChange={(e) => setImg(e.target.value)}
          value={img}
          required
        />
        <button>Submit</button>
      </form>
    </section>
  );
};

export default PostCreate;
