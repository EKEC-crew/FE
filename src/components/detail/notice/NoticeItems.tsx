import React from "react";
import { useParams } from "react-router-dom";

const NoticeItems = () => {
    const { id } = useParams();

    return (
        <div className = "p-8">
            <div className = "text-2xl font-bold mb-4">공지 상세 페이지</div>
            <p>ID: {id}</p>
            <p>공지 내용</p>
        </div>
    );
};

export default NoticeItems;