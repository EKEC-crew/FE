interface TitleInputProps {
    onValueChange: (value: string) => void;
    initialValue?: string;
}
import React, { useEffect, useState } from "react";

const TitleInput: React.FC<TitleInputProps> = ({ onValueChange, initialValue }) => {
    const [value, setValue] = useState("");

    useEffect(() => {
        if (typeof initialValue === "string") {
            setValue(initialValue);
            onValueChange(initialValue);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialValue]);

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