"use client";

// react import
import { useEffect, useState } from "react";

// utility import
import uid from "../utility/uid";

// component import
import "./EditorStyle.css";
import style from "./Editor.module.css";
import EditableBlock from "./Block/EditableBlock";
import setCaretToEnd from "../utility/setCaretToEnd";
import usePrevious from "../utility/usePrevious";

// 첫 블럭
const initialBlock = {
    id: uid(),
    tag: "p",
    html: "블럭을 눌러 편집을 시작해보세요!",
};

const Editor = () => {
    // 현재 에디터에 있는 블럭들을 저장하는 state
    const [blocks, setBlocks] = useState([initialBlock]);
    const [curBlockID, setCurBlockID] = useState(null);
    const prevBlocks = usePrevious(blocks);

    useEffect(()=> {
        // cursor 옮기기 관리
        if(prevBlocks && prevBlocks.length + 1 === blocks.length){
            // 블럭이 추가됨
            const nextBlockPos = blocks.map((block)=>block.id).indexOf(curBlockID) + 2;
            const nextBlockDOM = document.querySelector(`[data-position="${nextBlockPos}"]`);
            if(nextBlockDOM){
                nextBlockDOM.focus();
            }
        }
        if(prevBlocks && prevBlocks.length - 1 === blocks.length){
            // 블럭이 삭제됨
            const prevBlockPos = prevBlocks.map((block) => block.id).indexOf(curBlockID);
            const prevBlockDOM = document.querySelector(`[data-position="${prevBlockPos}"]`);
            if(prevBlockDOM){
                setCaretToEnd(prevBlockDOM);
            }
        }
    }, [blocks, prevBlocks, curBlockID]);

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
        setCurBlockID(curBlock.id);
        const newBlock = { id: uid(), tag: "p", html: "" };
        const index = blocks.map((block) => block.id).indexOf(curBlock.id);
        const updatedBlocks = [...blocks];
        // curBlock 다음에 새로운 빈 블럭 추가
        updatedBlocks.splice(index + 1, 0, newBlock);
        setBlocks(updatedBlocks);
    };

    const deleteBlockHandler = (curBlock) => {
        if(blocks.length > 1){
            // 그 전 블럭이 존재할 때만 블럭 삭제
            setCurBlockID(curBlock.id);
            const index = blocks.map((block) => block.id).indexOf(curBlock.id);
            const updatedBlocks = [...blocks];
            // curBlock 삭제
            updatedBlocks.splice(index, 1);
            setBlocks(updatedBlocks);
        }
    };

    return (
        <div className={style.editor}>
            {blocks.map((block, key) => {
                return (
                    <EditableBlock
                        key={key}
                        position={key+1}
                        id={block.id}
                        tag={block.tag}
                        html={block.html}
                        addBlock={addBlockHandler}
                        deleteBlock={deleteBlockHandler}
                        updateEditor={updateEditorHandler}
                    />
                );
            })}
        </div>
    );
};

export default Editor;
