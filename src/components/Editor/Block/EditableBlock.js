import { useRef, useState } from "react";
import ContentEditable from "@/components/utility/content-editable";

const EditableBlock = ({ id, tag, html, addBlock }) => {
    const ref = useRef(null);
    const [content, setContent] = useState({ id, tag, html });
    const [htmlBackup, setHtmlBackup] = useState(null);
    const [prevKey, setPrevKey] = useState("");

    const onChangeHandler = (e) => {
        // 입력 시 content에 담김
        setContent({ ...content, html: e.target.value });
    };

    const onBlurHandler = () => {
        console.log(content);
    };

    const onKeyDownHandler = (event) => {
        console.log(event.key);
        if (event.key === "/") {
            setHtmlBackup(content.html);
        }
        if (event.key === "Enter") {
            if (prevKey !== "Shift") {
                // Shift + Enter가 아니라면 새로운 블럭 생성
                event.preventDefault();
                addBlock({ id: id });
                console.log("새로운 블럭 생성!");
            }
        }
        setPrevKey(event.key);
    };

    return (
        <ContentEditable
            className="block"
            innerRef={ref}
            tagName={content.tag}
            html={content.html}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
            onKeyDown={onKeyDownHandler}
        />
    );
};

export default EditableBlock;
