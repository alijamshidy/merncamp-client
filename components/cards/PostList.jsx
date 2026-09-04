import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../../context";
import Post from "./Post";
const PostList = ({
  posts,
  handleDelete,
  handleLike,
  handleUnlike,
  handleComment,
  removeComment,
}) => {
  const router = useRouter();
  const [state] = useContext(UserContext);
  return (
    <div className="mt-2 w-[99.5%] mx-auto">
      {posts &&
        posts.map((post, i) => (
          <Post
            key={post._id}
            post={post}
            handleDelete={handleDelete}
            handleLike={handleLike}
            handleUnlike={handleUnlike}
            handleComment={handleComment}
            removeComment={removeComment}
          />
        ))}
    </div>
  );
};

export default PostList;
