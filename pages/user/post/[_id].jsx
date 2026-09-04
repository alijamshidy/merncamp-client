import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import PostForm from "../../../components/forms/PostForm";
import UserRoute from "../../../components/routes/UserRoute";
import { UserContext } from "../../../context";

const EditPost = () => {
  const router = useRouter();
  const [post, setPost] = useState({});
  const [state, setState] = useContext(UserContext);
  const [content, setContent] = useState("");
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  const [posts, setPosts] = useState([]);

  const _id = router.query._id;
  useEffect(() => {
    if (_id) {
      fetchPost();
    }
  }, [_id]);
  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`/user-post/${_id}`);
      console.log(data);
      setPost(data);
      setContent(data.content);
      setImage(data.image);
    } catch (error) {
      console.log(error);
    }
  };
  const PostSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/update-post/${_id}`, {
        content,
        image,
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Post Updated");
        router.push("/user/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleImage = async e => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    formData.append("content", content);
    console.log([...formData]);
    setUploading(true);

    try {
      const { data } = await axios.post("/upload-image", formData);
      console.log(data);
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  return (
    <UserRoute>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="registerbackground w-full flex justify-center items-center text-[36px] font-bold">
          News feed
        </div>
        <div className="w-[95%] md:w-[90%] mx-auto flex justify-center items-center">
          <div className="w-full flex flex-col md:flex-row justify-center items-center">
            <div className="w-1/2">
              <PostForm
                content={content}
                setContent={setContent}
                postSubmit={PostSubmit}
                handleImage={handleImage}
                uploading={uploading}
                image={image}
              />
            </div>
          </div>
        </div>
      </div>
    </UserRoute>
  );
};

export default EditPost;
