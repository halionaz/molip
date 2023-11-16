"use client";

// react import
import { useEffect, useState } from "react";

// utility import
import uid from "../utility/uid";
import pid from "../utility/pid";

// component import
import styles from "./Editor.module.css";
import EditableBlock from "./Block/EditableBlock";
import setCaretToEnd from "../utility/setCaretToEnd";
import usePrevious from "../utility/usePrevious";

// 첫 블럭
const initialBlock = {
    id: uid(),
    tag: "h1",
    html: "",
};

const Editor = ({ id }) => {
    // 현재 에디터에 있는 블럭들을 저장하는 state
    const [blocks, setBlocks] = useState([initialBlock]);
    const [curBlockID, setCurBlockID] = useState(null);
    const [tagUpdatedBlockID, setTagUpdatedBlockID] = useState(null);
    const prevBlocks = usePrevious(blocks);

    const [lastSaveBlocks, setLastSaveBlocks] = useState(null);
    const [canSave, setCanSave] = useState(false);

    useEffect(() => {
        // On page mount
        const savedData = window.localStorage.getItem(id);
        if (savedData) {
            const savedBlocks = JSON.parse(savedData);
            setBlocks(savedBlocks);
            // 수정 지점 관리
            setLastSaveBlocks(savedBlocks);
        } else {
            setLastSaveBlocks([initialBlock]);
        }
    }, []);

    useEffect(()=>{
        // Ctrl + S를 눌렀을 때, 저장하는 기능
        document.addEventListener("keydown", (event) => {
            if((event.metaKey || event.ctrlKey) && event.key === "s"){
                event.preventDefault();
                savePageHandler();
            }
        });
    }, [blocks]);

    useEffect(() => {
        // 블럭 state가 바뀌면 수정되었다는 상태 표시
        if (lastSaveBlocks) {
            setCanSave(
                JSON.stringify(lastSaveBlocks) !== JSON.stringify(blocks)
            );
        }
    }, [blocks, lastSaveBlocks]);

    useEffect(() => {
        // 블럭이 추가 또는 삭제 되었을 때 키보드 커서 (Caret) 이동 관리 effect
        if (prevBlocks && prevBlocks.length + 1 === blocks.length) {
            // 블럭이 추가됨
            const nextBlockPos =
                blocks.map((block) => block.id).indexOf(curBlockID) + 2;
            const nextBlockDOM = document.querySelector(
                `[data-position="${nextBlockPos}"]`
            );
            if (nextBlockDOM) {
                nextBlockDOM.focus();
            }
        }
        if (prevBlocks && prevBlocks.length - 1 === blocks.length) {
            // 블럭이 삭제됨
            const prevBlockPos = prevBlocks
                .map((block) => block.id)
                .indexOf(curBlockID);
            const prevBlockDOM = document.querySelector(
                `[data-position="${prevBlockPos}"]`
            );
            if (prevBlockDOM) {
                setCaretToEnd(prevBlockDOM);
            }
        }
    }, [blocks, prevBlocks, curBlockID]);

    useEffect(() => {
        // tag가 수정되었을 때 키보드 커서 (Caret) 이동 관리 effect
        if (prevBlocks && tagUpdatedBlockID) {
            const prevBlockPos = prevBlocks
                .map((block) => block.id)
                .indexOf(tagUpdatedBlockID);
            const updatedBlockPos = blocks
                .map((block) => block.id)
                .indexOf(tagUpdatedBlockID);
            if (prevBlocks[prevBlockPos].tag !== blocks[updatedBlockPos].tag) {
                // tag가 바뀌었다면
                const updatedBlockDOM = document.querySelector(
                    `[data-position="${updatedBlockPos + 1}"]`
                );
                if (updatedBlockDOM) {
                    setCaretToEnd(updatedBlockDOM);
                }
            }
        }
    }, [blocks, prevBlocks, tagUpdatedBlockID]);

    const setCaretToTagChangedBlock = (updatedBlockID) => {
        // 블럭의 태그가 수정되었을 때, 그 블럭의 끝으로 키보드 커서 옮겨줘야 하므로
        // id 저장
        setTagUpdatedBlockID(updatedBlockID);
    };

    const updateEditorHandler = (updatedBlock) => {
        // blocks state의 변경들을 관리하는 함수
        // 각 블럭에서 생기는 편집들을 일괄 관리
        const index = blocks.map((block) => block.id).indexOf(updatedBlock.id);
        const updatedBlocks = [...blocks];
        updatedBlocks[index] = {
            ...updatedBlocks[index],
            tag: updatedBlock.tag,
            html: updatedBlock.html,
        };
        setBlocks(updatedBlocks);
    };

    const addBlockHandler = (curBlock) => {
        // 블럭 추가 함수
        setCurBlockID(curBlock.id);
        const newBlock = { id: uid(), tag: "p", html: "" };
        const index = blocks.map((block) => block.id).indexOf(curBlock.id);
        const updatedBlocks = [...blocks];
        // curBlock 다음에 새로운 빈 블럭 추가
        updatedBlocks.splice(index + 1, 0, newBlock);
        setBlocks(updatedBlocks);
    };

    const deleteBlockHandler = (curBlock) => {
        // 블럭 삭제 함수
        if (blocks.length > 1) {
            // 그 전 블럭이 존재할 때만 블럭 삭제
            setCurBlockID(curBlock.id);
            const index = blocks.map((block) => block.id).indexOf(curBlock.id);
            const updatedBlocks = [...blocks];
            // curBlock 삭제
            updatedBlocks.splice(index, 1);
            setBlocks(updatedBlocks);
        }
    };

    const savePageHandler = () => {
        // 저장해야함
        window.localStorage.setItem(id, JSON.stringify(blocks));
        setLastSaveBlocks(blocks);
    };

    return (
        <div className={styles.main}>
            <div className={styles.editorName}>
                {lastSaveBlocks && lastSaveBlocks[0].html
                    ? lastSaveBlocks[0].html
                    : "제목 없음"}{" "}
                {canSave && "●"}
            </div>
            <div className={styles.editor}>
                {blocks.map((block, key) => {
                    const pos = blocks.map((b) => b.id).indexOf(block.id) + 1;
                    return (
                        <EditableBlock
                            key={key}
                            position={pos}
                            id={block.id}
                            tag={block.tag}
                            html={block.html}
                            addBlock={addBlockHandler}
                            deleteBlock={deleteBlockHandler}
                            updateEditor={updateEditorHandler}
                            setCaretToTagChangedBlock={
                                setCaretToTagChangedBlock
                            }
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Editor;
