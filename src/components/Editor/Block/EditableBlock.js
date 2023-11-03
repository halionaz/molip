import { useRef, useState } from "react";
import ContentEditable from "@/components/utility/content-editable";
import style from "./EditableBlock.module.css";

const EditableBlock = ({
    id,
    tag,
    html,
    updateEditor,
    addBlock,
    deleteBlock,
}) => {
    const ref = useRef(null);
    const [htmlBackup, setHtmlBackup] = useState(null);
    const [prevKey, setPrevKey] = useState("");

    const onChangeHandler = (e) => {
        updateEditor({
            id: id,
            tag: tag,
            html: e.target.value,
        });
    };

    const onKeyDownHandler = (event) => {
        if (event.key === "/") {
            setHtmlBackup(html);
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
        if (event.key === "Backspace" && (html === "" || html === "<br>")) {
            // 빈 블럭에서 백스페이스 누르면 블럭 삭제
            event.preventDefault();
            deleteBlock({ id: id, ref: ref.current });
        }
        // 키 조합을 확인하기 위해 prevKey 저장
        setPrevKey(event.key);
    };

    return (
        <ContentEditable
            className={`block ${style.block}`}
            ref={ref}
            tagName={tag}
            html={html}
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}
        />
    );
};

export default EditableBlock;
