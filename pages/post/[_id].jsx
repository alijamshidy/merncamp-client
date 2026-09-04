import { RollbackOutlined } from "@ant-design/icons";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Post from "../../components/cards/Post";
const PostComments = () => {
  const router = useRouter();
  const [post, setPost] = useState({});
  const _id = router.query._id;
  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`/user-post/${_id}`);
      setPost(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (_id) {
      fetchPost();
    }
  }, [_id]);
  const removeComment = async (postId, comment) => {
    let answer = window.confirm("Are you sure?");
    if (!answer) {
      return;
    }
    try {
      const { data } = await axios.put("/remove-comment", {
        postId,
        comment,
      });
      console.log(data);
      fetchPost();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="">
      <div className="registerbackground w-full flex justify-center items-center text-[36px] font-bold">
        MERNCAMP
      </div>
      <div className="w-[70%] mx-auto">
        <Post
          post={post}
          commentsCount={100}
          removeComment={removeComment}
        />
      </div>
      <div className="flex justify-center items-center cursor-pointer text-blue-400 mt-10">
        <Link href={`/user/dashboard`}>
          <RollbackOutlined />
        </Link>
      </div>
    </div>
  );
};

export default PostComments;
