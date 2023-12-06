import { useRef, useState } from "react";

import ContentEditable from "@/components/utility/content-editable";

import styles from "./EditableBlock.module.css";
import TagSelector from "./TagSelector";

import getSelectorCoord from "@/components/utility/getSelectorCoord";
import { Draggable } from "@hello-pangea/dnd";
import { GoGrabber } from "react-icons/go";
import setSelection from "@/components/utility/setSelection";
import getCaretPosition from "@/components/utility/getCaretPosition";

const EditableBlock = ({
    position,
    id,
    tag,
    html,
    addBlock,
    deleteBlock,
    updateEditor,
    setCaretToTagChangedBlock,
}) => {
    const blockRef = useRef(null);

    const [htmlBackup, setHtmlBackup] = useState(null);
    const [isTagSelectorOpen, setIsTagSelectorOpen] = useState(false);
    const [tagSelectorPos, setTagSelectorPos] = useState({ x: null, y: null });

    const [placeholder, setPlaceholder] = useState(false);

    const onChange = (event) => {
        updateEditor({
            id: id,
            tag: tag,
            html: event.target.value,
        });
    };

    const onKeyDown = (event) => {
        // if(event.key === "Enter" && event.shiftKey){
        //     // 테스트
        //     event.preventDefault();
        //     setSelection(blockRef.current, 0, 1);
        // }
        if(event.key === "-"){
            console.log(blockRef.current.childNodes);
        }
        if (event.key === "/" && !event.shiftKey) {
            setHtmlBackup(html);
        }
        if (event.key === "Enter") {
            if (!event.shiftKey && !isTagSelectorOpen) {
                // Shift + Enter가 아니고, 태그 셀렉터가 오픈되어 있는 경우가 아니라면
                // 새로운 블럭 생성
                event.preventDefault();
                if (!event.nativeEvent.isComposing) {
                    // 한글 입력 오류 방지
                    // 한글은 조합되는 문자라 버그가 잦음
                    addBlock({ id: id, html: html, ref: blockRef.current });
                }
            }
        }
        if (event.key === "Backspace") {
            // 수정 필요 
            // 문장의 처음에서 백스페이스 누르면 전 블럭에 병합
            const caretPos = getCaretPosition();
            if(caretPos.endOffset === 0 && (!blockRef.current.firstChild || caretPos.endNode === blockRef.current.firstChild)){
                event.preventDefault();
                deleteBlock({ id: id, ref: blockRef.current });
            }
        }
    };

    const onKeyUp = (event) => {
        if (event.key === "/") {
            if (!event.shiftKey) {
                // ? 입력이 아니라면
                openTagSelector();
            }
        }
    };

    const onFocus = () => {
        setPlaceholder(true);
    };
    const onBlur = () => {
        setPlaceholder(false);
    };

    const openTagSelector = () => {
        setIsTagSelectorOpen(true);
        // 좌표값 잡기
        const pos = getSelectorCoord();
        setTagSelectorPos(pos);
        document.addEventListener("click", closeTagSelector);
    };

    const closeTagSelector = () => {
        setHtmlBackup(null);
        setTagSelectorPos({ x: null, y: null });
        setIsTagSelectorOpen(false);
        document.removeEventListener("click", closeTagSelector);
    };

    const applyTag = (newTag) => {
        updateEditor({
            id: id,
            tag: newTag,
            html: htmlBackup,
        });
        closeTagSelector();
        setCaretToTagChangedBlock(id);
    };

    const onDragHandlerClick = () => {
        // 줄의 태그 변경, 삭제 제어할 수 있는 창 띄우기
    };

    return (
        <>
            {isTagSelectorOpen && (
                <TagSelector
                    position={tagSelectorPos}
                    close={closeTagSelector}
                    onSelect={applyTag}
                />
            )}
            <Draggable draggableId={id} index={position}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        className={`${styles.draggable} ${
                            styles[`data-tagdraggable-${tag}`]
                        }`}
                        {...provided.draggableProps}
                    >
                        <span
                            role="drag handler button"
                            tabIndex={0}
                            className={styles.draghandler}
                            onClick={onDragHandlerClick}
                            {...provided.dragHandleProps}
                        >
                            <GoGrabber />
                        </span>
                        <ContentEditable
                            ref={blockRef}
                            tagName={tag}
                            html={html}
                            onChange={onChange}
                            onKeyDown={onKeyDown}
                            onKeyUp={onKeyUp}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            className={[
                                styles.block,
                                styles[`data-tagblock-${tag}`],
                                // 처음엔 data-position이라는 자체 attribution을 이용해 pos를 관리했지만
                                // react에서 array state가 변경되었을 시 data-position까지 변경해주는 re-render을 안해주어서
                                // 줄 관리에 있어서 버그가 속출했음
                                // 따라서 class로 pos 관리
                                `data-position-${position}`,
                                placeholder ? styles.placeholder : null,
                            ].join(" ")}
                        />
                    </div>
                )}
            </Draggable>
        </>
    );
};

export default EditableBlock;
