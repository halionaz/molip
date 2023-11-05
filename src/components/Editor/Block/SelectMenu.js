import { matchSorter } from "match-sorter";
import { useCallback, useEffect, useState } from "react";

const HEIGHT = 150;
const allowedTags = [
    {
        id: "page-title",
        tag: "h1",
        label: "Page Title",
    },
    {
        id: "heading",
        tag: "h2",
        label: "Heading",
    },
    {
        id: "subheading",
        tag: "h3",
        label: "Subheading",
    },
    {
        id: "paragraph",
        tag: "p",
        label: "Paragraph",
    },
];

const SelectMenu = ({ position, onSelect, close }) => {
    const x = position.x;
    const y = position.y - HEIGHT;

    const [selectedItem, setSelectedItem] = useState(0);
    const [command, setCommand] = useState("");
    const [itemsOption, setItemsOption] = useState(allowedTags);

    useEffect(() => {
        // 처음에 Event Listener 추가
        document.addEventListener("keydown", onKeyDown);
        return () => {
            // componentWillUnmount와 동일한 효과
            // 이 메뉴가 없어질 때 Event Listener 없앰
            document.removeEventListener("keydown", onKeyDown);
        };
    }, []);

    useEffect(() => {
        const items = matchSorter(allowedTags, command, { keys: ["tag"] });
        setItemsOption(items);
    }, [command]);

    const onKeyDown = (event) => {
        // ⭐️ 중요! addEventListner를 통해 등록한 함수에서는 state값을 못 읽는다.
        // 따라서 setState 내에서 prev를 체크하는 편법을 사용함
        const curKey = event.key;

        if (curKey === "Enter") {
            event.preventDefault();
            onSelect(itemsOption[selectedItem].tag);
        } else if (curKey === "Backspace") {
            setCommand((prev) => {
                if (prev === "") {
                    // 검색하고 있던 command가 없다면 셀렉메뉴 창 닫기
                    close();
                    return prev;
                }
                // 검색하던 command가 있다면 검색어에서 하나 지움
                return prev.substring(0, prev.length - 1);
            });
        } else if (curKey === "ArrowUp") {
            /*
            구현 필요
            */
            event.preventDefault();
        } else if (curKey === "ArrowDown" || curKey === "Tab") {
            /*
            구현 필요
            */
            event.preventDefault();
        } else if (curKey) {
            setCommand((prev) => prev + curKey);
        }
    };

    return (
        <div className="SelectMenu" style={{ top: `${y}`, left: `${x}` }}>
            <div className="Items">
                {itemsOption.map((item, key) => {
                    const isSelected =
                        itemsOption.indexOf(item) === selectedItem;
                    return (
                        <div
                            className={isSelected ? "selected" : null}
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

export default SelectMenu;
