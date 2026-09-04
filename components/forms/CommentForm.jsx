const CommentForm = ({ addComment, comment, setComment }) => {
  return (
    <form
      onSubmit={addComment}
      className="flex gap-2 flex-col justify-center items-start">
      <input
        className="w-full border border-gray-500 p-2 rounded-sm h-[30px] outline-none text-[18px] focus:shadow-lg focus:shadow-blue-400/80"
        type="text"
        placeholder="Write something..."
        value={comment}
        onChange={e => setComment(e.target.value)}
      />
      <button className="bg-blue-500 p-2 border cursor-pointer text-white rounded-md mt-2">
        Submit
      </button>
    </form>
  );
};

export default CommentForm;
