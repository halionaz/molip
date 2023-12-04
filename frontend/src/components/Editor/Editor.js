"use client";

// react import
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// utility import
import uid from "@/components/utility/uid";

// component import
import styles from "./Editor.module.css";
import EditableBlock from "@/components/Editor/Block/EditableBlock";
import setCaretToEnd from "@/components/utility/setCaretToEnd";
import usePrevious from "@/components/utility/usePrevious";
import Title from "@/components/Editor/Title";
import RightSidebar from "@/components/Sidebar/RightSidebar";
import Header from "./Header";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import setSelection from "../utility/setSelection";

const Editor = ({ pid, fetchPagesList }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    // DB에서 받아와야하는 State
    const [emoji, setEmoji] = useState("");
    const [title, setTitle] = useState("");
    const [blocks, setBlocks] = useState([]);

    const [lastSaveEmoji, setLastSaveEmoji] = useState("");
    const [lastSaveTitle, setLastSaveTitle] = useState("");
    const [lastSaveBlocks, setLastSaveBlocks] = useState("");

    // Editor 관련 State
    const [curBlockID, setCurBlockID] = useState(null);
    const [tagUpdatedBlockID, setTagUpdatedBlockID] = useState(null);
    const [saving, setSaving] = useState(false);
    const [canSave, setCanSave] = useState(false);
    const prevBlocks = usePrevious(blocks);

    useEffect(() => {
        // On page mount

        // Ctrl + S 구현
        document.addEventListener("keydown", (event) => {
            if ((event.metaKey || event.ctrlKey) && event.key === "s") {
                event.preventDefault();
                setSaving(true);
            }
        });

        // Page Contents Sever Fatch
        fetch(`${process.env.NEXT_PUBLIC_API}/pages/${pid}`, {
            cache: "no-cache",
        })
            .then((val) => {
                return val.json();
            })
            .then((val) => {
                if (val.length === 0 || val.error) {
                    router.push("/p/655cbf3f3ddee11a74739254");
                } else {
                    setEmoji(val[0].emoji);
                    setLastSaveEmoji(val[0].emoji);
                    setTitle(val[0].title);
                    setLastSaveTitle(val[0].title);
                    setBlocks(JSON.parse(val[0].content));
                    setLastSaveBlocks(val[0].content);
                    setLoading(false);
                }
            });
    }, []);

    useEffect(() => {
        // 내용이 바뀌면 수정되었다는 상태 표시
        let isChange = false;

        if (lastSaveBlocks) {
            isChange = isChange || lastSaveBlocks !== JSON.stringify(blocks);
        }
        if (lastSaveEmoji) {
            isChange = isChange || emoji !== lastSaveEmoji;
        }
        if (lastSaveTitle) {
            isChange = isChange || title !== lastSaveTitle;
        }

        setCanSave(isChange);
    }, [blocks, lastSaveBlocks, emoji, lastSaveEmoji, title, lastSaveTitle]);

    useEffect(() => {
        // 블럭이 추가 또는 삭제 되었을 때 키보드 커서 (Caret) 이동 관리 effect
        if (prevBlocks && prevBlocks.length + 1 === blocks.length) {
            // 블럭이 추가됨
            const nextBlockPos =
                blocks.map((block) => block.id).indexOf(curBlockID) + 2;
            const nextBlockDOM = document.querySelector(
                `.data-position-${nextBlockPos}`
            );
            if (nextBlockDOM) {
                nextBlockDOM.focus();
                if(nextBlockDOM.firstChild !== null){
                    // 새로 생긴 블럭에 내용이 있다면
                    setSelection(nextBlockDOM, 0, 0);
                }
            }
        }
        if (prevBlocks && prevBlocks.length - 1 === blocks.length) {
            // 블럭이 삭제됨
            const prevBlockPos = prevBlocks
                .map((block) => block.id)
                .indexOf(curBlockID);
            const prevBlockDOM = document.querySelector(
                `.data-position-${prevBlockPos}`
            );
            if (prevBlockDOM) {
                // setSelection(prevBlockDOM, 1, 1);
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
            if (
                updatedBlockPos !== -1 &&
                prevBlocks[prevBlockPos].tag !== blocks[updatedBlockPos].tag
            ) {
                // tag가 바뀌었다면
                const updatedBlockDOM = document.querySelector(
                    `.data-position-${updatedBlockPos + 1}`
                );
                if (updatedBlockDOM) {
                    setCaretToEnd(updatedBlockDOM);
                }
            }
        }
    }, [blocks, prevBlocks, tagUpdatedBlockID]);

    useEffect(() => {
        // 저장 버그 관리용 effect
        if (saving) {
            savePageHandler();
            setSaving(false);
        }
    }, [blocks, saving]);

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

    const addBlockHandler = (curBlock, curCaretPos) => {
        // 블럭 추가 함수
        setCurBlockID(curBlock.id);

        let nextBlockHTML = curBlock.html.slice(curCaretPos);

        // updateEditor({
        //     id: id,
        //     tag: tag,
        //     html: html.slice(0, curCaretPos),
        // });

        const newBlock = { id: uid(), tag: "p", html: nextBlockHTML };
        const index = blocks.map((block) => block.id).indexOf(curBlock.id);
        const updatedBlocks = [...blocks];
        // curBlock 내용 수정
        updatedBlocks[index].html = updatedBlocks[index].html.slice(
            0,
            curCaretPos
        );
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
        // 페이지 내용 저장
        fetch(`${process.env.NEXT_PUBLIC_API}/pages/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                emoji: emoji,
                title: title,
                content: JSON.stringify(blocks),
            }),
            // 저장 되는 경우, 제목이 바뀔 수도 있으므로 pages list 업데이트
        }).then(fetchPagesList);
        setLastSaveEmoji(emoji);
        setLastSaveTitle(title);
        setLastSaveBlocks(JSON.stringify(blocks));
    };

    const onDragEndHandler = ({ source, destination }) => {
        // 목적지가 없거나 (droppable 영역 밖으로 드롭핑)
        // 목적지가 바뀌지 않는다면
        if (!destination || destination.index === source.index) {
            return;
        }

        const updatedBlocks = [...blocks];
        const removedBlocks = updatedBlocks.splice(source.index - 1, 1);
        updatedBlocks.splice(destination.index - 1, 0, removedBlocks[0]);
        setBlocks(updatedBlocks);
    };

    return (
        <>
            <div className={styles.container} spellCheck={false}>
                {!loading && (
                    <>
                        <Header
                            emoji={lastSaveEmoji}
                            titleName={lastSaveTitle}
                            canSave={canSave}
                        />
                        <Title
                            titleName={title}
                            emoji={emoji}
                            setTitle={setTitle}
                            setEmoji={setEmoji}
                        />
                        <div className={styles.editor}>
                            <DragDropContext onDragEnd={onDragEndHandler}>
                                <Droppable droppableId={pid}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            {blocks.map((block, ind) => {
                                                return (
                                                    <EditableBlock
                                                        key={block.id}
                                                        position={ind + 1}
                                                        id={block.id}
                                                        tag={block.tag}
                                                        html={block.html}
                                                        addBlock={
                                                            addBlockHandler
                                                        }
                                                        deleteBlock={
                                                            deleteBlockHandler
                                                        }
                                                        updateEditor={
                                                            updateEditorHandler
                                                        }
                                                        setCaretToTagChangedBlock={
                                                            setCaretToTagChangedBlock
                                                        }
                                                    />
                                                );
                                            })}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </div>
                    </>
                )}
            </div>
            <RightSidebar />
        </>
    );
};

export default Editor;
