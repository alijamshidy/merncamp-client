import { Modal, Pagination } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import io from "socket.io-client";
import People from "../../components/cards/People";
import PostList from "../../components/cards/PostList";
import CommentForm from "../../components/forms/CommentForm";
import PostForm from "../../components/forms/PostForm";
import UserRoute from "../../components/routes/UserRoute";
import Search from "../../components/Search";
import { UserContext } from "../../context";

const socket = io(process.env.NEXT_PUBLIC_SOCKETIO, {
  reconnection: true,
});

const dashboard = () => {
  const [state, setState] = useContext(UserContext);
  const [content, setContent] = useState("");
  const [image, setImage] = useState({ url: "", public_id: "" });
  const [uploading, setUploading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [people, setPeople] = useState([]);
  const [comment, setComment] = useState("");
  const [visible, setVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  const [totalPostCount, setTotalPostCount] = useState(0);
  const [page, setPage] = useState(1);

  const router = useRouter();
  const postSubmit = async e => {
    e.preventDefault();
    if (content == "<p><br></p>") {
      toast.error("Content is required");
    } else {
      try {
        const { data } = await axios.post("/create-post", { content, image });
        if (data.error) {
          toast.error(data.error);
        } else {
          setPage(1);
          toast.success("Post created");
          setContent("");
          setImage({});
          newsFeed();
          socket.emit("new-post", data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    fetchTotalPostNumber();
  }, []);
  const fetchTotalPostNumber = async () => {
    try {
      const { data } = await axios.get("/total-post-count");
      setTotalPostCount(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async post => {
    try {
      const answer = window.confirm("are You Sure?");
      if (!answer) {
        return;
      } else {
        const { data } = await axios.delete(`/delete-post/${post._id}`);
        toast.error("post deleted");
        newsFeed();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!state?.token) return;
    newsFeed();
    findPeople();
  }, [state?.token, page]);
  const findPeople = async () => {
    try {
      const { data } = await axios.get("/find-people");
      setPeople(data || []);
    } catch (error) {
      console.log(error);
    }
  };
  const newsFeed = async () => {
    try {
      const { data } = await axios.get(`/news-feed/${page}`);
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleImage = async e => {
    const file = e.target.files[0];
    if (!file) {
      return toast.error("No file selected");
    }
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
  const handleFollow = async user => {
    try {
      const { data } = await axios.put("/user-follow", { _id: user._id });
      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));
      setState({ ...state, user: data });
      let filtered = people.filter(p => p._id !== user._id);
      setPeople(filtered);
      toast.success(`following ${user.name}`);
      newsFeed();
    } catch (error) {
      console.log(error);
    }
  };
  const handleLike = async _id => {
    try {
      const { data } = await axios.put("/like-post", { _id });

      newsFeed();
    } catch (error) {
      console.log(error);
    }
  };
  const handleUnlike = async _id => {
    try {
      const { data } = await axios.put("/unlike-post", { _id });

      newsFeed();
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async post => {
    setCurrentPost(post);
    setVisible(true);
  };

  const addComment = async e => {
    e.preventDefault();
    // console.log("add comment to post", currentPost._id, "comment", comment);
    try {
      const { data } = await axios.put("/add-comment", {
        postId: currentPost._id,
        comment,
      });
      console.log(data);
      setComment("");
      setVisible(false);
      newsFeed();
    } catch (error) {
      console.log(error);
    }
  };
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
      newsFeed();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserRoute>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="registerbackground w-full flex justify-center items-center text-[36px] font-bold">
          News feed
        </div>
        <div className="w-[95%] md:w-[90%] mx-auto flex justify-center items-center">
          <div className="w-full flex flex-col md:flex-row justify-center items-start mt-3 gap-4">
            <div className="w-full md:w-8/12">
              <PostForm
                content={content}
                setContent={setContent}
                postSubmit={postSubmit}
                handleImage={handleImage}
                uploading={uploading}
                image={image}
              />

              <PostList
                posts={posts}
                handleDelete={handleDelete}
                handleLike={handleLike}
                handleUnlike={handleUnlike}
                handleComment={handleComment}
                removeComment={removeComment}
              />
              <Pagination
                showSizeChanger={false}
                style={{ marginBottom: "30px" }}
                current={page}
                total={Math.ceil(totalPostCount / 3) * 10}
                onChange={value => {
                  setPage(value);
                  console.log(value);
                }}
              />
            </div>
            <div className="w-full md:w-4/12">
              <Search />
              {state?.user?.following && (
                <Link
                  className="text-blue-500 hover:text-blue-500/80"
                  href={`/user/following`}>
                  {state.user.following.length} Following
                </Link>
              )}

              <People
                people={people}
                handleFollow={handleFollow}
              />
            </div>
          </div>
        </div>
        <Modal
          open={visible}
          onCancel={() => setVisible(false)}
          footer={null}
          title="Comment">
          <CommentForm
            comment={comment}
            setComment={setComment}
            addComment={addComment}
          />
        </Modal>
      </div>
    </UserRoute>
  );
};

export default dashboard;
