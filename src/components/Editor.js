import { Link } from "react-router-dom";
// import Posts from "./Posts";
// import PostCreate from "./PostCreate";
import Files from "./files";

const Editor = () => {
  return (
    <section>
      <h1>Editors Page</h1>
      <br />
      <p>You must have been assigned an Editor role.</p>
      <br />
      <Files />
      {/* <Posts /> */}
      {/* <br /> */}
      {/* <PostCreate /> */}
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};

export default Editor;
