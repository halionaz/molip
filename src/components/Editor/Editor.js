"use client";

// react import
import { useEffect, useRef, useState } from "react";

// utility import
import uid from "../utility/uid";

// component import
import "./EditorStyle.css";
import style from "./Editor.module.css";
import EditableBlock from "./Block/EditableBlock";
import setCursorToEnd from "../utility/setCursorToEnd";

// 첫 블럭
const initialBlock = {
    id: uid(),
    tag: "p",
    html: "블럭을 눌러 편집을 시작해보세요!",
};

const Editor = () => {
    // 현재 에디터에 있는 블럭들을 저장하는 state
    const [blocks, setBlocks] = useState([initialBlock]);
    const newBlockRef = useRef(null);

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

    useEffect(() => {
        // blocks 생성 후 그 다음 블럭으로 커서를 옮김
        // setState에선 콜백함수로 바로 바꾸면 됐지만, react hooks 사용 시에는
        // ref를 통해 조건 체크 후 useEffect로 바꿔주어야 함
        console.log(blocks);
        if (newBlockRef.current !== null) {
            // blocks가 바뀌었고, 다음 블럭이 추가된 경우라면
            // 포커스 옮겨주기
            console.log("포커스 다음 블럭으로 옮겨주기");
            newBlockRef.current.nextElementSibling.focus();
            newBlockRef.current = null;
        }
    }, [blocks]);

    const addBlockHandler = (curBlock) => {
        const newBlock = { id: uid(), tag: "p", html: "" };
        const index = blocks.map((block) => block.id).indexOf(curBlock.id);
        const updatedBlocks = [...blocks];
        // curBlock 다음에 새로운 빈 블럭 추가
        updatedBlocks.splice(index + 1, 0, newBlock);
        newBlockRef.current = curBlock.ref;
        setBlocks(updatedBlocks);
    };

    const deleteBlockHandler = (curBlock) => {
        const prevBlock = curBlock.ref.previousElementSibling;
        if (prevBlock) {
            // 그 전 블럭이 존재할 때만 블럭 삭제
            const index = blocks.map((block) => block.id).indexOf(curBlock.id);
            const updatedBlocks = [...blocks];
            // curBlock 삭제
            updatedBlocks.splice(index, 1);
            // prevBlock의 맨 끝으로 타이핑 커서 옮김
            console.log("포커스 이전 블럭으로 옮겨주기");
            setCursorToEnd(prevBlock);
            setBlocks(updatedBlocks);
        }
    };

    return (
        <div className={style.editor}>
            {blocks.map((block, key) => {
                return (
                    <EditableBlock
                        key={key}
                        id={block.id}
                        tag={block.tag}
                        html={block.html}
                        updateEditor={updateEditorHandler}
                        addBlock={addBlockHandler}
                        deleteBlock={deleteBlockHandler}
                    />
                );
            })}
        </div>
    );
};

export default Editor;
