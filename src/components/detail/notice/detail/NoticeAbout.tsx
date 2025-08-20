import React from "react";

export type NoticeAboutProps = {
  content: string; 
};

const NoticeAbout: React.FC<NoticeAboutProps> = ({ content }) => {
  return (
    <div
      className="tui-content rounded-2xl bg-gray-50 ring-gray-50 shadow-sm ring-1 p-4 sm:p-6 lg:p-8"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default NoticeAbout;
