interface TitleInputProps {
    onValueChange: (value: string) => void;
}
import React, { useState } from "react";

const TitleInput: React.FC<TitleInputProps> = ({ onValueChange }) => {
    const [value, setValue] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        onValueChange(e.target.value);
    };

    return (
        <input
            type="text"
            value={value}
            placeholder="제목을 입력해주세요"
            className="w-full border border-[#5e6068] p-2 rounded mb-4"
            onChange={handleChange}
        />
    );
}

export default TitleInput;