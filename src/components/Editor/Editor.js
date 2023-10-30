"use client";

// react import
import { useState } from "react";

// utility import
import uid from "../utility/uid";

// component import
import style from "./Editor.module.css";
import EditableBlock from "./Block/EditableBlock";

// 첫 블럭
const initialBlock = {
    id: uid(),
    tag: "p",
    html: "블럭을 눌러 편집을 시작해보세요!",
};

const Editor = () => {
    // 현재 에디터에 있는 블럭들을 저장하는 state
    const [blocks, setBlocks] = useState([initialBlock]);

    return (
        <div className={style.editor}>
            {blocks.map((block, key) => {
                return (
                    <EditableBlock
                        key={key}
                        id={block.id}
                        tag={block.tag}
                        html={block.html}
                    />
                );
            })}
        </div>
    );
};

export default Editor;
