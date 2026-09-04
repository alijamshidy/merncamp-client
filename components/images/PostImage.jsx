const PostImage = ({ url, height = "340px" }) => {
  return (
    <div
      className={`py-3 bg-contain bg-center bg-no-repeat w-full`}
      style={{
        backgroundImage: `url(${url})`,
        height: `${height}`,
      }}></div>
  );
};

export default PostImage;
