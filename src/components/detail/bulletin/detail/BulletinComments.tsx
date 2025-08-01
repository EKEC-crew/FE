import { AnimatePresence, motion } from "framer-motion";

type Comment = {
  id: number;
  text: string;
  date: string;
};

type Props = {
  isOpen: boolean;
  comments: Comment[];
};

const BulletinComments = ({ isOpen, comments }: Props) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="comments"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4 overflow-hidden mt-4"
        >
          <div className="flex items-center gap-2">
            <textarea
              className="flex-1 bg-white border border-gray-300 rounded-lg p-3 text-sm resize-none h-12"
              placeholder="댓글을 입력하세요."
            />
            <button className="bg-[#3A3ADB] text-white text-sm px-4 py-2 rounded-lg h-12 min-w-[60px]">
              등록
            </button>
          </div>

          <div className="space-y-2">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-[#F6F7FA] px-4 py-3 rounded-lg shadow-sm text-sm flex items-center justify-between"
              >
                <div className="text-gray-400 w-[70px] shrink-0">0000님</div>
                <div className="flex-1 px-2 text-gray-800">{comment.text}</div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-gray-400 text-sm">{comment.date}</span>
                  <button className="bg-white border border-gray-300 px-3 py-0.5 rounded-2xl text-sm">
                    댓글
                  </button>
                  <button>
                    <img src="/schedule/iconMore.svg" alt="더보기" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BulletinComments;
