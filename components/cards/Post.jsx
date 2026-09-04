import {
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import parse from "html-react-parser";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context";
import PostImage from "../images/PostImage";

const Post = ({
  post,
  height,
  commentsCount = 10,
  handleDelete,
  handleLike,
  handleUnlike,
  handleComment,
  removeComment,
}) => {
  const router = useRouter();
  const [state] = useContext(UserContext);

  // حالت client-side فقط
  const [mounted, setMounted] = useState(false);
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    setMounted(true);
    setTimeAgo(moment(post?.createdAt).fromNow());
  }, [post?.createdAt]);

  if (!mounted) return null; // تا زمانی که روی کلاینت mount نشده، چیزی رندر نکن

  return (
    <div className="mt-2 w-[99.5%] mx-auto">
      {post?.postedBy && (
        <div
          key={post?._id}
          className="mb-3 border-[1px] border-black rounded-md overflow-hidden">
          <div>
            <div className="bg-gray-200 py-2 w-full flex items-center gap-3 pl-2">
              <Avatar size={40}>{post?.postedBy?.name?.[0]}</Avatar>
              <span>{post?.postedBy?.name}</span>
              <span>{timeAgo}</span>
            </div>
            <div
              className={`${
                post?.image?.url &&
                "after:w-full after:h-[1px] pr-2 after:absolute  after:bottom-0 after:left-0 after:bg-black"
              } relative before:w-full before:h-[1px] before:absolute before:top-0 before:left-0 before:bg-black py-2 pl-7`}>
              {parse(post?.content)}
            </div>
            <div className="bg-gray-200 w-full h-full">
              {post?.image?.url && (
                <PostImage
                  url={post?.image?.url}
                  height={height}
                />
              )}
              <div className="pl-2 py-1 after:absolute relative after:top-0 after:h-[1px] after:w-full after:bg-black after:left-0 flex-row flex justify-start items-center">
                {state?.user && post?.likes?.includes(state.user._id) ? (
                  <HeartFilled
                    onClick={() => handleUnlike(post?._id)}
                    style={{ color: "#C71629", fontSize: "20px" }}
                    className="text-danger h-4 pr-2"
                  />
                ) : (
                  <HeartOutlined
                    onClick={() => handleLike(post?._id)}
                    style={{ color: "#C71629", fontSize: "20px" }}
                    className="text-danger h-4 pr-2"
                  />
                )}
                <span className="pr-4">{post?.likes?.length}</span>
                <CommentOutlined
                  onClick={() => handleComment(post)}
                  style={{ color: "#721c24", fontSize: "20px" }}
                  className="h-4 pr-2"
                />
                <Link
                  href={`/post/${post._id}`}
                  className="text-blue-600 hover:text-blue-600/80 pr-4">
                  {post?.comments?.length} comments
                </Link>
                {state?.user?._id === post?.postedBy?._id && (
                  <>
                    <EditOutlined
                      onClick={() => router.push(`/user/post/${post._id}`)}
                      style={{
                        color: "#721c24",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    />
                    <DeleteOutlined
                      onClick={() => handleDelete(post)}
                      style={{ color: "#721c24", marginRight: "8px" }}
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          {post?.comments?.length > 0 && (
            <ol className="max-h-[140px] overflow-y-scroll">
              {post.comments.slice(0, commentsCount).map(c => (
                <li
                  key={c._id}
                  className="flex justify-between items-start">
                  <div className="ml-2">
                    <div>
                      <Avatar
                        size={20}
                        src={c?.postedBy?.image?.url}
                      />
                      {c.postedBy.name}
                    </div>
                    <div>{c.text}</div>
                  </div>
                  <div className="flex flex-col justify-center items-end pr-2">
                    {moment(c.created).fromNow()}
                    {state?.user?._id === c.postedBy._id && (
                      <div className="text-[#721c24] cursor-pointer">
                        <DeleteOutlined
                          onClick={() => removeComment(post._id, c)}
                        />
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </div>
  );
};

export default Post;
