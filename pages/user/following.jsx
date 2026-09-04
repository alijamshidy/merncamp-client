import { RollbackOutlined } from "@ant-design/icons";
import { Avatar, List } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../../context";

const following = () => {
  const [state, setState] = useContext(UserContext);
  const [people, setPeople] = useState([]);
  const router = useRouter();
  useEffect(() => {
    if (state && state.token) {
      fetchFollowing();
    }
  }, [state && state.token]);
  const handleUnfollow = async user => {
    try {
      const { data } = await axios.put("/user-unfollow", { _id: user._id });
      console.log(data);
      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));
      setState({ ...state, user: data });
      let filtered = people.filter(p => p._id !== user._id);
      setPeople(filtered);
      toast.success(`Unollowed ${user.name}`);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchFollowing = async () => {
    try {
      const { data } = await axios.get("/user-following");
      setPeople(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[90%] mx-auto flex justify-center items-center">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-full flex justify-center items-center">
            <List
              className="w-full"
              itemLayout="horizontal"
              dataSource={people}
              renderItem={user => (
                <List.Item className="w-full">
                  <List.Item.Meta
                    avatar={<Avatar src={user?.image?.url || ""} />}
                    className="w-full"
                    title={
                      <div className="flex justify-between items-center">
                        <Link href={`/user/${user.username}`}>
                          {user.username}
                        </Link>
                        <span
                          onClick={() => handleUnfollow(user)}
                          className="text-[#0d6efd] cursor-pointer ">
                          Unfollow
                        </span>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </div>
          <div className="w-full flex justify-center items-center">
            {" "}
            <Link href="/user/dashboard">
              <RollbackOutlined
                style={{ color: "#0d6efd", fontSize: "20px" }}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default following;
