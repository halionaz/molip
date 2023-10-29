"use client";

import { useState } from "react";
import style from "./Editor.module.css";
import uid from "../Uid.js";
import EditableBlock from "../Block/EditableBlock";

const initialBlock = { id: uid(), html: "에디터일겁니다", tag: "p" };

const Editor = () => {
    const [blocks, setBlocks] = useState([initialBlock]);

    const updateEditorHandler = (updatedBlock) => {
        const index = blocks.map((block) => block.id).indexOf(updatedBlock.id);
        const updatedBlocks = [...blocks];
        updatedBlocks[index] = {
            ...updatedBlocks[index],
            tag: updatedBlock.tag,
            html: updatedBlock.html,
        };
        setBlocks(updatedBlocks);
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
                    />
                );
            })}
        </div>
    );
};

export default Editor;
