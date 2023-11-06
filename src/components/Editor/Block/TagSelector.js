import { matchSorter } from "match-sorter";
import { useCallback, useEffect, useState } from "react";
import style from "./SelectMenu.module.css";

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
    const x = position.x;
    const y = position.y - HEIGHT;

    const [selection, setSelection] = useState({
        itemsOption: allowedTags,
        selectedItem: 0,
    });
    const [command, setCommand] = useState("");
    const [checkClose, setCheckClose] = useState(false);

    useEffect(() => {
        // 처음에 Event Listener 추가
        document.addEventListener("keydown", onKeyDown);
        return () => {
            // componentWillUnmount와 동일한 효과
            // 이 메뉴가 없어질 때 Event Listener 없앰
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [onkeydown]);

    useEffect(() => {
        const items = matchSorter(allowedTags, command, { keys: ["tag"] });
        setSelection((prev) => {
            return { ...prev, itemsOption: items };
        });
    }, [command]);

    useEffect(() => {
        if (checkClose) {
            close();
        }
    }, [checkClose]);

    const onKeyDown = useCallback((event) => {
        // ⭐️ 중요! addEventListner를 통해 등록한 함수에서는 state값을 못 읽는다.
        // 따라서 setState 내에서 prev를 체크하는 편법을 사용함
        const curKey = event.key;

        switch (event.key) {
            case "Enter":
                event.preventDefault();
                setSelection((prev) => {
                    onSelect(prev.itemsOption[prev.selectedItem].tag);
                    return prev;
                });
                break;
            case "Backspace":
                setCommand((prev) => {
                    if (prev === "") {
                        // 검색하고 있던 command가 없다면 셀렉메뉴 창 닫기
                        event.preventDefault();
                        // 원래 바로 close()를 쓰려 했는데, 다른 component의 state들이 동시에 실행되는 현상이 생겨버려
                        // Warning이 뿜어져 나옴
                        // 따라서 state로 close() 실행하는 식으로 관리
                        setCheckClose(true);
                        return prev;
                    }
                    // 검색하던 command가 있다면 검색어에서 하나 지움
                    return prev.substring(0, prev.length - 1);
                });
                break;
            case "ArrowUp":
                event.preventDefault();
                setSelection((prev) => {
                    const newSel =
                        prev.selectedItem === 0
                            ? prev.itemsOption.length - 1
                            : prev.selectedItem - 1;
                    return {
                        ...prev,
                        selectedItem: newSel,
                    };
                });
                break;
            case "ArrowDown":
            case "Tab":
                event.preventDefault();
                setSelection((prev) => {
                    const newSel =
                        prev.selectedItem === prev.itemsOption.length - 1
                            ? 0
                            : prev.selectedItem + 1;
                    return {
                        ...prev,
                        selectedItem: newSel,
                    };
                });
                break;
            default:
                setCommand((prev) => prev + curKey);
                break;
        }
    }, []);

    return (
        <div className="SelectMenu" style={{ top: `${y}`, left: `${x}` }}>
            <div className="Items">
                {selection.itemsOption.map((item, key) => {
                    const isSelected =
                        selection.itemsOption.indexOf(item) ===
                        selection.selectedItem;
                    return (
                        <div
                            className={isSelected ? style.selected : null}
                            key={key}
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
