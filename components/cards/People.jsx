import { Avatar, List } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../../context";

const People = ({ people, handleFollow, handleUnfollow }) => {
  const [state] = useContext(UserContext);
  const router = useRouter();
  return (
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
                  <Link href={`/user/${user?.username}`}>{user?.username}</Link>
                  {user?.followers?.includes(state?.user?._id) ? (
                    <span
                      onClick={() => handleUnfollow(user)}
                      className="text-[#0d6efd] cursor-pointer ">
                      Unfollow
                    </span>
                  ) : (
                    <span
                      onClick={() => handleFollow(user)}
                      className="text-[#0d6efd] cursor-pointer ">
                      Follow
                    </span>
                  )}
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default People;
