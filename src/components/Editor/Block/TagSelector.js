import { matchSorter } from "match-sorter";
import { useEffect, useState } from "react";
import styles from "./SelectMenu.module.css";

const HEIGHT = 150;
const allowedTags = [
    {
        id: "page-title",
        tag: "h1",
        label: "제목 1",
    },
    {
        id: "heading",
        tag: "h2",
        label: "제목 2",
    },
    {
        id: "subheading",
        tag: "h3",
        label: "제목 3",
    },
    {
        id: "paragraph",
        tag: "p",
        label: "텍스트",
    },
];

const TagSelector = ({ position, onSelect, close }) => {
    const isMenuOutsideOfTop = position.y - HEIGHT < 0;
    const x = position.x;
    const y = isMenuOutsideOfTop
        ? position.y + HEIGHT / 3
        : position.y - HEIGHT;

    const [tagList, setTagList] = useState(allowedTags);
    const [selectedInd, setSelectedInd] = useState(0);
    const [inp, setInp] = useState("");
    const [checkClose, setCheckClose] = useState(false);

    useEffect(() => {
        setTagList(matchSorter(allowedTags, inp, { keys: ["tag"] }));
    }, [inp]);

    useEffect(() => {
        const onKeyDown = (event) => {
            switch (event.key) {
                case "Enter":
                    event.preventDefault();
                    onSelect(tagList[selectedInd].tag);
                    break;
                case "Backspace":
                    if (inp) {
                        setInp((prev) => {
                            return prev.substring(0, prev.length - 1);
                        });
                    } else {
                        // 검색하고 있던 input이 없다면 셀렉 메뉴 창 닫기
                        event.preventDefault();
                        close();
                    }
                    break;
                case "ArrowUp":
                    event.preventDefault();
                    const prevSel =
                        selectedInd === 0
                            ? tagList.length - 1
                            : selectedInd - 1;
                    setSelectedInd(prevSel);
                    break;
                case "ArrowDown":
                case "Tab":
                    event.preventDefault();
                    const nextSel =
                        selectedInd === tagList.length - 1
                            ? 0
                            : selectedInd + 1;
                    setSelectedInd(nextSel);
                    break;
                default:
                    setInp((prev) => prev + event.key);
                    break;
            }
        };

        // 처음에 Event Listener 추가
        document.addEventListener("keydown", onKeyDown);
        return () => {
            // componentWillUnmount와 동일한 효과
            // 이 메뉴가 없어질 때 Event Listener 없앰
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [tagList, selectedInd]);

    return (
        <div
            className="SelectMenu"
            style={{
                top: `${y}`,
                left: `${x}`,
                justifyContent: !isMenuOutsideOfTop ? "flex-end" : "flex-start",
            }}
        >
            <div className="Items">
                {tagList.map((item, key) => {
                    const isSelected = tagList.indexOf(item) === selectedInd;
                    return (
                        <div
                            key={key}
                            className={isSelected ? styles.selected : null}
                            tabIndex="0"
                            onClick={() => {
                                onSelect(item.tag);
                            }}
                        >
                            {item.label}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TagSelector;
