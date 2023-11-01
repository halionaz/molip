import { useRef, useState } from "react";
import ContentEditable from "@/components/utility/content-editable";

const EditableBlock = ({ id, tag, html, addBlock, deleteBlock }) => {
    const ref = useRef(null);
    const [content, setContent] = useState({ tag, html });
    const [htmlBackup, setHtmlBackup] = useState(null);
    const [prevKey, setPrevKey] = useState("");

    const onChangeHandler = (e) => {
        // 입력 시 content에 담김
        setContent({ ...content, html: e.target.value });
    };

    const onKeyDownHandler = (event) => {
        if (event.key === "/") {
            setHtmlBackup(content.html);
        }
        if (event.key === "Enter") {
            if (prevKey !== "Shift") {
                // Shift + Enter가 아니라면 새로운 블럭 생성
                event.preventDefault();
                if (!event.nativeEvent.isComposing) {
                    // 한글 입력 오류 방지
                    // 한글은 조합되는 문자라 버그가 잦음
                    addBlock({ id: id, ref: ref.current });
                }
            }
        }
        if (event.key === "Backspace" && content.html === "") {
            // 빈 블럭에서 백스페이스 누르면 블럭 삭제
            event.preventDefault();
            deleteBlock({ id: id, ref: ref.current });
        }
        setPrevKey(event.key);
    };

    return (
        <ContentEditable
            className="block"
            ref={ref}
            tagName={content.tag}
            html={content.html}
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}
        />
    );
};

export default EditableBlock;
