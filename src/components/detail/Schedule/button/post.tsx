type PostProps = {
  onClick: () => void;
};

const Post = ({ onClick }: PostProps) => (
  <button
    className="bg-[#3A3ADB] hover:bg-blue-700 text-white text-sm font-bold py-1 px-8 rounded-sm"
    onClick={onClick}
  >
    글쓰기
  </button>
);

export default Post;
