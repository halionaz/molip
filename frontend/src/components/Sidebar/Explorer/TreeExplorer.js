import PageBtn from "@/components/Button/PageBtn/PageBtn";

const TreeExplorer = ({ pid, node, data, fetchPagesList }) => {
    // 현재 노드의 child node를 모두 필터링
    let childNodes;

    if (node === null) {
        childNodes = data.filter((node) => !node.parent_ID);
    } else {
        childNodes = data.filter((child) => child.parent_ID === node._id);
    }

    return (
        <>
            {childNodes.map((childNode) => {
                return (
                    <div key={childNode._id} style={{paddingLeft : "0.5rem"}}>
                        <PageBtn
                            pid={pid}
                            curNode={childNode}
                            data={data}
                            fetchPagesList={fetchPagesList}
                        />
                        <TreeExplorer
                            pid={pid}
                            node={childNode}
                            data={data}
                            fetchPagesList={fetchPagesList}
                        />
                    </div>
                );
            })}
        </>
    );
};

export default TreeExplorer;
