import { useEffect, useRef, useState } from "react";
import ContentEditable from "@/components/utility/content-editable";
import style from "./EditableBlock.module.css";
import SelectMenu from "./SelectMenu";
import getSelMenuCoordinates from "@/components/utility/getSelMenuCoordinates";
import setCursorToEnd from "@/components/utility/setCursorToEnd";

const EditableBlock = ({
    id,
    tag,
    html,
    updateEditor,
    addBlock,
    deleteBlock
}) => {
    const [htmlBackup, setHtmlBackup] = useState(null);
    const [isSelectMenuOpen, setIsSelectMenuOpen] = useState(false);
    const [selectMenuPos, setSelectMenuPos] = useState({ x: null, y: null });
    const ref = useRef(null);

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
            openSelectMenuHandler();
        }
        if (event.key === "Enter") {
            if (!event.shiftKey) {
                // Shift + Enter가 아니라면 새로운 블럭 생성
                event.preventDefault();
                if (!event.nativeEvent.isComposing) {
                    // 한글 입력 오류 방지
                    // 한글은 조합되는 문자라 버그가 잦음
                    addBlock({ id: id, ref: ref.current });
                }
            }
        }
        if (event.key === "Backspace") {
            if (html === "" || html === "<br>") {
                // 빈 블럭에서 백스페이스 누르면 블럭 삭제
                event.preventDefault();
                deleteBlock({ id: id, ref: ref.current });
            }
        }
    };

    const openSelectMenuHandler = () => {
        setIsSelectMenuOpen(true);
        // 좌표값 잡기
        const pos = getSelMenuCoordinates();
        setSelectMenuPos(pos);
        document.addEventListener("click", closeSelectMenuHandler);
    };

    const closeSelectMenuHandler = () => {
        setHtmlBackup(null);
        setIsSelectMenuOpen(false);
        setSelectMenuPos({ x: null, y: null });
        document.removeEventListener("click", closeSelectMenuHandler);
    };

    const applySelTagHandler = (newTag) => {
        updateEditor(
            {
                id: id,
                tag: newTag,
                html: htmlBackup,
            }
        );
        console.log("포커스 현 블럭으로 옮겨주기")
        setCursorToEnd(ref.current);
        closeSelectMenuHandler();
    };

    return (
        <>
            {isSelectMenuOpen && (
                <SelectMenu
                    position={selectMenuPos}
                    onSelect={applySelTagHandler}
                    close={closeSelectMenuHandler}
                />
            )}
            <ContentEditable
                className={`block ${style.block}`}
                tagName={tag}
                html={html}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                ref={ref}
            />
        </>
    );
};

export default EditableBlock;
