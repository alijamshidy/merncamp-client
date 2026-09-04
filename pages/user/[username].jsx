import { RollbackOutlined } from "@ant-design/icons";
import { Card } from "antd";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context";

const UserName = () => {
  const [state, setState] = useContext(UserContext);
  const [user, setUser] = useState({});
  const router = useRouter();
  useEffect(() => {
    if (router.query.username) fetchUser();
  }, [router.query.username]);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`/user/${router.query.username}`);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[90%] mx-auto flex justify-center items-center">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="mt-4 w-[50%] mx-auto">
            <Card
              hoverable
              cover={
                <img
                  className="w-full h-[350px]"
                  src={user?.image?.url}
                  alt={user.name}
                />
              }>
              <Card.Meta
                title={user.name}
                description={user.about}
              />
              <p>Joined {moment(user.createdAt).fromNow()}</p>
              <div className="flex justify-between items-center mt-3">
                <span>{user?.followers?.length} Followers</span>
                <span>{user?.following?.length} Following</span>
              </div>
            </Card>
          </div>
          <div className="w-full flex justify-center items-center my-3 ">
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

export default UserName;
