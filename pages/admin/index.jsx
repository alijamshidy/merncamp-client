import axios from "axios";
import parse from "html-react-parser";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminRoute from "../../components/routes/AdminRoute";
import { UserContext } from "../../context";
const Admin = () => {
  const [state, setState] = useContext(UserContext);

  const [posts, setPosts] = useState([]);

  const router = useRouter();

  const handleDelete = async post => {
    try {
      const answer = window.confirm("are You Sure?");
      if (!answer) {
        return;
      } else {
        const { data } = await axios.delete(`/admin/delete-post/${post._id}`);
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
  }, [state?.token]);

  const newsFeed = async () => {
    try {
      const { data } = await axios.get(`/posts`);
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminRoute>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="registerbackground w-full flex justify-center items-center text-[36px] font-bold">
          Admin
        </div>
        <div className="w-[95%] md:w-[90%] mx-auto flex flex-col justify-center items-center">
          {posts?.map(p => (
            <div
              className="flex w-full justify-between items-center relative after:absolute after:w-full after:h-[1px] after:bottom-0 after:bg-black my-1"
              key={p._id}>
              <div className="">
                <span> {parse(p.content)}</span>
                <span className="ml-3">
                  - <b>{p.postedBy.name}</b>
                </span>
              </div>
              <span
                className="cursor-pointer text-[#721c24] font-semibold ml-1"
                onClick={() => handleDelete(p)}>
                Delete
              </span>
            </div>
          ))}
        </div>
      </div>
    </AdminRoute>
  );
};

export default Admin;
