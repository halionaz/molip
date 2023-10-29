"use client"

import { useState } from "react";
import style from "./Editor.module.css";
import uid from "../Uid.js";

const initialBlock = {id : uid(), html: "에디터일겁니다", tag: "p"};

const Editor = () => {

    const [blocks, setBlocks] = useState([initialBlock]);

    return <div className={style.editor}>
        {blocks.map((block, key) => {
            return (
                <div key={key} id={block.id}>
                    Tag: {block.tag}, Content: {block.html}
                </div>
            )
        })}
    </div>
};

export default Editor;
