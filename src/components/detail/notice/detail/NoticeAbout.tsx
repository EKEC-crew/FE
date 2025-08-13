interface NoticeAboutProps {
  contentHtml?: string;
}

const NoticeAbout: React.FC<NoticeAboutProps> = ({ contentHtml }) => {
  return (
    <div className="text-sm bg-[#EFF0F4] px-4 py-6 rounded-2xl text-gray-800">
      <div className="flex items-center gap-2 mb-2">
      </div>
      {contentHtml ? (
        <div
          className="leading-7"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      ) : (
        <div className="text-gray-600">내용이 없습니다.</div>
      )}
    </div>
  );
};

export default NoticeAbout;
