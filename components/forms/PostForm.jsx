import { CameraOutlined, LoadingOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
// Or if you only need the core build
// import Quill from 'quill/core';

import "react-quill/dist/quill.snow.css";

const PostForm = ({
  content,
  setContent,
  postSubmit,
  handleImage,
  uploading,
  image,
}) => {
  // const quill = new Quill("#editor", { theme: "snow" });
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full flex justify-center items-center">
        <form
          id="editor"
          onSubmit={postSubmit}
          className="w-full flex justify-start items-start flex-col border border-gray-400 rounded-md p-3">
          <ReactQuill
            theme="snow"
            required
            value={content}
            onChange={e => setContent(e)}
            className="w-full border border-gray-400 outline-none p-2 rounded-sm"
            placeholder="Write something..."
            name=""
            id=""
          />
          {/* <div id="editor">{quill}</div> */}

          <div className="flex justify-between w-full items-center">
            <button className="bg-blue-500 px-[8px] py-1 mt-1 cursor-pointer text-white rounded-sm">
              Post
            </button>
            <label className="cursor-pointer">
              {image && image.url ? (
                <Avatar
                  size={30}
                  src={image.url}
                />
              ) : uploading ? (
                <LoadingOutlined />
              ) : (
                <CameraOutlined />
              )}
              <input
                onChange={handleImage}
                className="hidden"
                type="file"
                name=""
                accept="images/*"
                id=""
              />
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
