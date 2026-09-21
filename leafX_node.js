function getNodeName(node) {
    const element = node.data.querySelector(':scope > name');
    // console.log(node, element);
    return element.textContent;
}
function getElementName(nodeElement) {
    const element = nodeElement.querySelector(':scope > name');
    // console.log(node, element);
    return element.textContent;
}
function setNodeName(node, newName) {
    let element = node.data.querySelector(':scope > name');
    element.textContent = newName;
}

function getNodeExpr(node) {
    const element = node.data.querySelector(':scope > expr');
    return element.textContent;
}
function setNodeExpr(node, newExpr) {
    let element = node.data.querySelector(':scope > expr');
    element.textContent = newExpr;
}
function setElementExpr(node_element, expr) {
    let element = node_element.querySelector(':scope > expr');
    if (!element) {
        element = node_element.ownerDocument.createElement('expr');
        node_element.data.appendChild(element);
    }
    element.textContent = expr;
}

function getNodeRepExpr(node) {
    const element = node.data.querySelector(':scope > repExpr');
    return element ? element.textContent : "";
}
function setNodeRepExpr(d, newRepExpr) {
    let element = d.data.querySelector(':scope > repExpr');
    if (!element) {
        element = d.data.ownerDocument.createElement('repExpr');
        d.data.appendChild(element);
    }
    element.textContent = newRepExpr;
}
function setElementRepExpr(node_element, repExpre) {
    let element = node_element.querySelector(':scope > repExpr');
    if (!element) {
        element = node_element.ownerDocument.createElement('repExpr');
        node_element.data.appendChild(element);
    }
    element.textContent = repExpre;
}

// function getNodeValue(node) {
//     return node.data.getAttribute("value") || null;
// }
function getNodeValueNoCalc(d) {
    // console.log("getNodeValueNoCalc", d);
    let element = d.data.querySelector(':scope > value');
    if (! element) {
        return "";
    }
    // console.log(element);
    // console.log("#"+element.textContent+"#");
    // console.log("==========================================================")
//     もし <value> の中身を 画面表示用の HTML 文字列 としてどこかで触っているなら、
// 見た目だけ残って textContent は空になることがあります。
    // console.log("length", element.textContent.length);
    // console.log(
    //     Array.from(element.textContent).map(ch => ch.charCodeAt(0))
    // );
    // if (element.textContent !== "") {
    //     console.log("!==");
    // } else {
    //     console.log("===");
    // }
    if (element && element.textContent !== "") {
        // console.log("getNodeValueNoCalc end1", element.textContent);
        return element.textContent;
    }
    // console.log("getNodeValueNoCalc end2", element.textContent);
    return "";
}
function getNodeValue(d) {
    // console.log("getNodeValue", d);
    let element = d.data.querySelector(':scope > value');
    // console.log(element);
    // console.log("#"+element.textContent+"#");
    if (element && element.textContent !== "") {
        // console.log("getNodeValue end1", element.textContent);
        return element.textContent;
    }
    const value = calcEachNode(d);
    // console.log("getNodeValue end", value);
    return value;
}
function getElementValue(node_element) {
    console.log("getElementValue", element);
    let element = node_element.querySelector(':scope > value');
    // console.log(element);
    if (element && element.textContent !== "") {
        console.log("getNodeValue", element.textContent);
        return element.textContent;
    }
    // TODO 未完成
    //const root_node = node_element.ancestors ? node.ancestors().pop() : node_element;
    const value = calcEachNode(d);
    return value;
}

function setNodeValue(d, value) {
    // console.log("==========================================================")
    // console.log("setNodeValue", value, typeof value);
    // console.log("==========================================================")
    let element = d.data.querySelector(':scope > value');
    if (!element) {
        element = d.data.ownerDocument.createElement('value');
        d.data.appendChild(element);
    }
    element.textContent = value;
}
function setElementValue(node_element, value) {
    let element = node_element.querySelector(':scope > value');
    if (!element) {
        element = node_element.ownerDocument.createElement('value');
        node_element.data.appendChild(element);
    }
    element.textContent = value;
}

function getNodeDisp(d) {
    let element = d.data.querySelector(':scope > disp');
    // const element = Array.from(d.data.children)
    //     .find(child => child.tagName === "disp");
    // console.log("#"+element.textContent+"#");
    return element ? element.textContent!== "" ? element.textContent : "": "";
}
function setNodeDisp(d, disp) {
    let element = d.data.querySelector(':scope > disp');
    if (!element) {
        element = d.data.ownerDocument.createElement('disp');
        d.data.appendChild(element);
    }
    element.textContent = disp;
}
function setElementDisp(node_element, disp) {
    let element = node_element.querySelector(':scope > disp');
    if (!element) {
        element = node_element.ownerDocument.createElement('disp');
        d.data.appendChild(element);
    }
    element.textContent = disp;
}

function getNodeMemo(d) {
    let element = d.data.querySelector(':scope > memo');
    return element ? element.textContent : "";
}
function setNodeMemo(d, memo) {
    let element = d.data.querySelector(':scope > memo');
    if (!element) {
        element = d.data.ownerDocument.createElement('memo');
        d.data.appendChild(element);
    }
    element.textContent = memo;
}
function setElementMemo(node_element, memo) {
    let element = node_element.querySelector(':scope > memo');
    if (!element) {
        element = node_element.ownerDocument.createElement('memo');
        d.data.appendChild(element);
    }
    element.textContent = memo;
}


function getNodeID(d) {
    return Number(d.data.getAttribute("id")) || null;
}
function getElementID(d) {
    return Number(d.getAttribute("id")) || null;
}
function setNodeID(d, newID) {
    d.data.setAttribute("id", newID);
}
function setElementID(node_element, newID) {
    node_element.setAttribute("id", newID);
}

function getNodeCustomX(d) {
    return Number(d.data.getAttribute("customX")) || undefined;
}
function setNodeCustomX(d, customX) {
    d.data.setAttribute("customX", customX);
}
function resetNodeCustom(d) {
    d.data.removeAttribute("customX");
    d.data.removeAttribute("customY");
}

function getNodeCustomY(d) {
    // console.log(d.data.getAttribute("customY"), Number(d.data.getAttribute("customY")) || undefined);
    return Number(d.data.getAttribute("customY")) || undefined;
}
function setNodeCustomY(d, customY) {
    d.data.setAttribute("customY", customY);
}

function getNodeRectW(d) {
    return Number(d.data.getAttribute("rectW")) || undefined;
}
function setNodeRectW(d, rectW) {
    d.data.setAttribute("rectW", rectW);
}

function getNodeRectH(d) {
    return Number(d.data.getAttribute("rectH")) || undefined;
}
function setNodeRectW(d, rectH) {
    d.data.setAttribute("rectW", rectH);
}

function getNodeFontFamily(d) {
    return d.data.getAttribute("font-family");
}
function setNodeFontFamily(d, font) {
    return d.data.setAttribute("font-family", font);
}
function removeNodeFontFamily(d) {
    d.data.removeAttribute("font-family");
}

function getNodeFontSize(d) {
    return d.data.getAttribute("font-size");
}
function setNodeFontSize(d, font) {
    return d.data.setAttribute("font-size", font);
}

function getNodeColor(d) {
    return d.data.getAttribute("color");
}
function setNodeColor(d, color) {
    return d.data.setAttribute("color", color);
}

function getNodeFormat(d) {
    return d.data.getAttribute("format");
}
function setNodeFormat(d, newformat) {
    d.data.setAttribute("format", newformat);
}
function removeNodeFormat(d) {
    d.data.removeAttribute("format");
}

function getNodeMemo(d) {
    return d.data.getAttribute("memo");
}
function setNodeMemo(d, newMemo) {
    d.data.setAttribute("memo", newMemo);
}
function removeNodeMemo(d) {
    d.data.removeAttribute("memo");
}

function get_min_rectW_default(root) {
    let min_rectW_default = root.data.getAttribute("min_rectW_default");
    return min_rectW_default;
}
function set_min_rectW_default(root, min_rectW_default) {
    if (min_rectW_default === null || min_rectW_default === undefined || min_rectW_default === "") {
        // 空の値が渡されたら format 属性自体を消去し、自動的にデフォルト参照に戻るようにする
        root.data.removeAttribute("min_rectW_default");
    } else {
        root.data.setAttribute("min_rectW_default", min_rectW_default);
    }
}
function get_min_rectH_default(root) {
    let min_rectH_default = root.data.getAttribute("min_rectH_default");
    return min_rectH_default;
}
function set_min_rectH_default(root, min_rectH_default) {
    if (min_rectH_default === null || min_rectH_default === undefined || min_rectH_default === "") {
        // 空の値が渡されたら format 属性自体を消去し、自動的にデフォルト参照に戻るようにする
        root.data.removeAttribute("min_rectH_default");
    } else {
        root.data.setAttribute("min_rectH_default", min_rectH_default);
    }
}
function getNodeFontFamilyDefault(root) {
    return root.data.getAttribute("font-family_default");
}
function setNodeFontFamilyDefault(root, font) {
    return root.data.setAttribute("font-family_default", font);
}
function getNodeFontSizeDefault(root) {
    return root.data.getAttribute("font-size_defalut");
}
function setNodeFontSizeDefault(root, font) {
    return root.data.setAttribute("font-size_defalut", font);
}
function getNodeColorDefault(root) {
    return root.data.getAttribute("color_default");
}
function setNodeColorDefault(root, font) {
    return root.data.setAttribute("color_default", font);
}




//そのノードnodeが参照しているノード(node.link_src_setから辿る）
//のlink_ref_setからnodeを削除する
//nodeのlink_src_setをクリアする。
//  ノードの削除、ノードの式の変更などで使う
function clear_src(node) {
    node.link_src_set.forEach(d => d.link_ref_set.delete(node))
    node.link_src_set.clear();
}

//そのノードnodeがノードパス指定でパス参照しているノード(node.link_path_setから辿る）
//のlink_path_rev_setからnodeを削除する
//nodeのlink_path_setをクリアする。
//  ノードの削除、ノードの式の変更などで使う
function clear_path(node) {
    node.link_path_set.forEach(d => d.link_path_rev_set.delete(node))
    node.link_path_set.clear();
}


//そのノードとそのノードを参照しているノード、さらに…ノードの
//valueをクリアし、
function clear_ref(node, visited) { // = new Set()) {
    if (visited.has(node)) {
        for (const refNode of node.link_ref_set ?? []) {
            refNode.link_src_set.delete(node);
        }
        return;
    }
    for (const refNode of node.link_ref_set ?? []) {
        setNodeRepExpr(refNode, "");
        setNodeDisp(refNode, "");
        setNodeValue(refNode, "");
        clear_ref(refNode, visited);
        refNode.link_src_set.delete(node);
    }
    node.link_ref_set.clear();
    // 要　確認
    // nodeの参照先の一つが参照先として無効（データが変わる、削除される）になるなら、
    // nodeは一から再計算なので、link_src_setを一部残しても意味がないはず
    node.link_src_set.forEach(d => d.link_ref_set.delete(node));
    node.link_src_set.clear();
}
// function clear_ref(node, visited = new Set()) {
//     if (!node || visited.has(node)) {
//         return;
//     }
//     visited.add(node);
//     setNodeRepExpr(node, "");
//     setNodeDisp(node, "");
//     setNodeValue(node, "");

//     for (const refNode of node.link_ref_set ?? []) {
//         clear_ref(refNode, visited);
//     }
// }

function clear_path_rev(node) {
    node.link_path_rev_set.forEach(
        d => {
            setNodeRepExpr(d, "");
            setNodeDisp(d, "");
            setNodeValue(d, "");
            d.link_path_set.delete(node);
            d.link_path_set.forEach(dd => dd.link_path_rev_set.delete(d));
            d.link_path_set.clear();
            d.link_src_set.forEach(dd => dd.link_ref_set.delete(d));
            d.link_src_set.clear();
        }
    )
}
