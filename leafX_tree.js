function getNodeName(node) {
    const element = node.data.querySelector(':scope > name');
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

function getNodeCustomY(d) {
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

function getNodeFontSize(d) {
    return d.data.getAttribute("font-size");
}
function setNodeFontSize(d, font) {
    return d.data.setAttribute("font-size", font);
}

function getNodeFormat(d) {
    let format = d.data.getAttribute("format");
    if (! format) {
        const rootNode = d.ancestors ? d.ancestors().pop() : d;
        format = rootNode.data.getAttribute("format_default") || null;
    }
    return format;
}
function setNodeFormat(d, newformat) {
    if (newformat === null || newformat === undefined || newformat === "") {
        // 空の値が渡されたら format 属性自体を消去し、自動的にデフォルト参照に戻るようにする
        d.data.removeAttribute("format");
    } else {
        d.data.setAttribute("format", newformat);
    }
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

//ノード名制限
//ノード名に使用不可な文字が使われていないかをチェックする
//　`"`,`'`,`/`,`*`,`.`,`&`,`<`,`>`,` `（半角空白）は使えない
// ~~全角の数字は使えない（将来のXML利用に備えて）~~
// ~~ノード名は、数字（半角・全角）、XML（大文字・小文字）で始まってはいけない。~~
// true ノード名として問題なし
// false ノード名として不適当
function isValidNodeName(name) {
    if (typeof name !== "string") return false;
    if (name.length === 0) return false;
    if (/[\"'\/\*\.\&\<\>\ ]/.test(name)) return false;
    // if (/^xml/i.test(name)) return false;
    // if (/^[0-9０-９]/.test(name)) return false;
    // if (/[０-９]/.test(name)) return false;
    return true;
}

function isValidNodeNameChar(ch) {
    return !/["'/*.&<> ]/.test(ch);
}

//ノード名の最初の文字が`_`である無名ノード名の判定
function isNonameNodeName(name) {
    return name.startsWith("_");
}


//兄弟ノード重複制限
// 兄弟ノードでは同じノード名は使えません（無名ノードを除く）。
// 親子間などでは同じノード名を使うことができます。
// 兄弟ノードでも、ノード名の最初の文字が`_`である無名ノードだけは、同一のノード名が使用できます。
// true 重複なし、または、無名ノード名
// false 重複
function checkDuplicateNodeName(parent, name) {
    if (isNonameNodeName(name)) {
        return true;
    }
    const children = parent.children || [];
    const duplicated = children.some(d => getNodeName(d) === name);
    return !duplicated;
    // const parentDepth = parent.depth;
    // if (parent.descendants().find(d => {
    //         if (d.depth !== parentDepth+1) {
    //             return true;
    //         }
    //         return getNodeName(d) === name;
    //     })) {
    //     return false;
    // }
    // return true;
}


//parentノードの子ノードと重複しないノード名をnameから作り出す
// 単に、ノード名の後ろを`_2`などにするだけ。
// 戻り値 重複しないノード名
function renameDuplicateNodeName(parent, name) {
    const match = name.match(/^(.*?)(?:_(\d+))?$/);
    const baseName = match[1];
    const usedNames = new Set(
        parent.children.map(node => getNodeName(node))
    );
    // if (!usedNames.has(baseName) && baseName === name) {
    //     return rootName;
    // }
    let maxNum = 0;
    usedNames.forEach(eachname => {
        if (eachname === baseName) {
            maxNum = Math.max(maxNum, 0);
            return;
        }
        const m = eachname.match(new RegExp(`^${escapeRegExp(baseName)}_(\\d+)$`));
        if (m) {
            maxNum = Math.max(maxNum, Number(m[1]));
        }
    });
    return `${baseName}_${maxNum + 1}`;
}

function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}


//兄弟ノード重複制限
// 兄弟ノードでは同じノード名は使えません（無名ノードを除く）。
// 親子間などでは同じノード名を使うことができます。
// 兄弟ノードでも、ノード名の最初の文字が`_`である無名ノードだけは、同一のノード名が使用できます。
// nodeParentの子孫ノードで重複がないか
// null 重複なし
// not null 重複ノード名のSet
function checkNodeNameBrother(nodeParent) {
    //基本、重複がないことが前提で、早く処理する
    //重複がある場合は時間がかかるのは構わない。
    if (! nodeParent.children) {
        return null;
    }
    const nodes = nodeParent.children;
    if (nodes == null) {
        return null;
    }
    const newMap = nodes.map(node => getNodeName(node));
    // console.log(newMap);
    const uniqueNames = new Set(newMap);
    const flagUnique = uniqueNames.size === nodes.length;
    if (! flagUnique) {
        //重複あり
        const seen = new Set();
        let duplicates = new Set();
        newMap.forEach(item => {
            if (! isNonameNodeName(item)) {
                if (seen.has(item)) {
                    duplicates.add(item); // すでに見たことがあるなら重複セットに入れる
                } else {
                    seen.add(item);        // 初めて見るものは記録用セットに入れる
                }
            }
        });
        nodes.forEach(child => {
            const dup_child = checkNodeNameBrother(child);
            if (dup_child !== null) {
                duplicates = new Set([...duplicates, ...dup_child]);
            }
        } )
        return duplicates;
    }
    let duplicates = new Set();
    nodes.forEach(child => {
        const dup_child = checkNodeNameBrother(child);
        if (dup_child !== null) {
            duplicates = new Set([...duplicates, ...dup_child]);
        }
    } )
    if (duplicates.size === 0) {
        return null;
    }
    return duplicates;
}

//root以下の全階層で、ノード名が重複していないかをチェックする
// 兄弟ノードでは同じノード名は使えません（無名ノードを除く）。
// 親子間などでは同じノード名を使うことができます。
// 兄弟ノードでも、ノード名の最初の文字が`_`である無名ノードだけは、同一のノード名が使用できます。
// null OK
// null以外　重複するノード名　エラー表示のため全ての重複ノード名のセット
function checkNodeName(root) {
    //基本、重複がないことが前提で、早く処理する
    //重複がある場合は時間がかかるのは構わない。
    // まずは単純に重複がなければ、ＯＫ
    const allNodes = root.descendants()
            .filter(node => {return ! isNonameNodeName(getNodeName(node));});
    const uniqueNames = new Set(allNodes.map(node => getNodeName(node)));
    //   console.log(uniqueNames);
    const flagAllUnique = uniqueNames.size === allNodes.length;
    if (flagAllUnique) {
        return null;
    }
    // 重複があれば、兄弟間の重複がないかをチェックする。
    const duplicates = checkNodeNameBrother(root);
    return duplicates;
}


//ノードを探す
// startNode を起点として、targetNameのノードを探す（複数ノードあり）
// 子ノード、孫ノードの順、なければ、
// 親ノード、その親ノードの子ノード、さらに孫ノード、なければ、
// さらに親ノード、…
// どこの階層にもなければ null を返す
function findNodeFromHere(startNode, targetName) {
    //xml前提の処理
    // xmlのstart_nodeから、該当するtarget_nodeを探し、
    // target_nodeのidから、d3.jsのtargetNodeを特定する
    const start_node = startNode.data;
    const xml_doc = start_node.ownerDocument;
    const xml_nodes = findXmlNodeFromHere(start_node, xml_doc, targetName);
    if (xml_nodes === null) {
        return null;
    }
    console.log(xml_nodes);
   // target_nodeのidから、d3.jsのtargetNodeを特定する
    let nodes = [];
    const rootNode = startNode.ancestors ? startNode.ancestors().pop() : startNode;
    xml_nodes.forEach(d => {
        const id = getElementID(d);
        const sameIdNode = rootNode.descendants().
                find(d => d.id ===id);
        nodes.push(sameIdNode);
    })
    console.log(nodes);
    return nodes;
}

function* snapshotIterator(snapshot) {
    for (let i = 0; i < snapshot.snapshotLength; i++) {
        yield snapshot.snapshotItem(i);
    }
}

function findXmlNodeFromHere(start_node, xml_doc, targetName) {
    // 全ノードから探し、1つだけなら、そのノード
    let xpathResult = xml_doc.evaluate(
        '//node[name="' + targetName + '"]', 
        xml_doc, 
        null, 
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, 
        null
    );
    if (xpathResult.snapshotLength === 0) {
        return null;
    }
    if (xpathResult.snapshotLength === 1) {
        // const target_node = xpathResult.snapshotItem(0);
        // console.log("target_node", target_node);
        const nodeArray = Array.from(snapshotIterator(xpathResult));
        return nodeArray;
    }

    // 子孫ノードから探し、1つだけなら、そのノード
    xpathResult = xml_doc.evaluate(
        './/node[name="' + targetName + '"]', 
        start_node, 
        null, 
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, 
        null
    );
    if (xpathResult.snapshotLength === 1) {
        const nodeArray = Array.from(snapshotIterator(xpathResult));
        return nodeArray;
    }
    if (xpathResult.snapshotLength !== 0) {
        // 子ノードから探す。
        xpathResult = xml_doc.evaluate(
            './node[name="' + targetName + '"]', 
            start_node, 
            null, 
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, 
            null
        );
        // 子ノードにあれば、それらのノード
        if (xpathResult.snapshotLength >= 1) {
            //無名ノードの場合は2以上となる場合がある
            const nodeArray = Array.from(snapshotIterator(xpathResult));
            return nodeArray;
        }
        // 子ノードになければ、孫・ひ孫と深く探していく
        let cond = './node/node';
        while(true) {
            xpathResult = xml_doc.evaluate(
                cond + '[name="' + targetName + '"]', 
                start_node, 
                null, 
                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, 
                null
            );
            // 見つかれば、それらのノード
            if (xpathResult.snapshotLength >= 1) {
                //無名ノードでなくても、従兄弟同士なら同名があり得る。
                const nodeArray = Array.from(snapshotIterator(xpathResult));
                return nodeArray;
            }
            cond += '/node';
        }
        // 子孫ノードにあったのだから、どこかで見つかるはず
    } else {
        // 子孫ノードにないので、祖先ノードから探す
        let parent_node = start_node.parentNode;
        while( parent_node.nodeName !== "#document" ) {
            const parentName = parent_node.querySelector(':scope > name').textContent;
            if (parentName === targetName) {
                // 親ノード（祖先ノード）が該当
                return [parent_node];
            }
            // 親ノード（祖先ノード）の子ノードから探す
            xpathResult = xml_doc.evaluate(
                './/node[name="' + targetName + '"]', 
                parent_node, 
                null, 
                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, 
                null
            );
            if (xpathResult.snapshotLength === 1) {
                const nodeArray = Array.from(snapshotIterator(xpathResult));
                return nodeArray;
            }
            if (xpathResult.snapshotLength !== 0) {
                // 子、孫・ひ孫と深く探していく
                let cond = './node';
                while(true) {
                    xpathResult = xml_doc.evaluate(
                        cond + '[name="' + targetName + '"]', 
                        parent_node, 
                        null, 
                        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, 
                        null
                    );
                    // 見つかれば、それらのノード
                    if (xpathResult.snapshotLength >= 1) {
                        const nodeArray = Array.from(snapshotIterator(xpathResult));
                        return nodeArray;
                    }
                    cond += '/node';
                }
                // 子孫ノードにあったのだから、どこかで見つかるはず
            }
            parent_node = parent_node.parentNode;
        }
        // これ以前に、どこかで見つかるはずなのだが。
        console.assert(true, "findXmlNodeFromHere LOGICAL ERROR");
        return null;
    }
    console.assert(true, "findXmlNodeFromHere LOGICAL ERROR");
    return null;
}
// function findNodeFromHere(startNode, targetName) {
//     // 全ノードを取得し、条件に合うものを全て抽出
//     const rootNode = startNode.ancestors ? startNode.ancestors().pop() : startNode;

//     const allTargetNodes = rootNode.descendants().
//             filter(d => getNodeName(d) === targetName);
//     if (allTargetNodes.length === 0) {
//         return null;
//     }
//     if (allTargetNodes.length === 1) {
//         return allTargetNodes[0]; 
//     }
//     // console.log(targetName, allTargetNodes.length);

//     const nodes = startNode.descendants();
//     let depth = startNode.depth + 1;
//     do {
//         var children = nodes.filter((node) => node.depth === depth);
//         const founds =  children.filter((node) => getNodeName(node) === targetName);
//         if (founds.length === 1) {
//             return founds[0];
//         }
//         if (founds.length > 1) {
//             return founds;  // 重複エラー
//         }
//         depth += 1;
//     } while(children.length > 0);
//     // console.log("子孫になし");

//     let parentNode = startNode.parent;
//     while (parentNode !== null) {
//         if (getNodeName(parentNode) === targetName) {
//             return parentNode;
//         }
//         const nodes = parentNode.descendants();
//         let depth = parentNode.depth + 1;
//         do {
//             // console.log("depth", depth);
//             var children = nodes.filter((node) => node.depth === depth);
//             // console.log("children", children);
//             const founds =  children.filter((node) => parentNode === targetName);
//             // console.log("founds", founds);
//             if (founds.length === 1) {
//                 return founds[0];
//             }
//             if (founds.length > 1) {
//                 return founds;  // 重複エラー
//             }
//             depth += 1;
//         } while(children.length > 0);
//         parentNode = parentNode.parent;
//     }
//     return null;
// }


//全ノードを再計算する
// 起動時、ロード時
// exprは必ずある前提、disp,valueは無視
function calcAll(root) {
    console.log("calcAll start");
    root.descendants()
        .forEach(d => {
            d.link_src_set = new Set();
            d.link_ref_set = new Set();
            d.link_path_set = new Set();    // ノードパス指定の途中のノード
            d.link_path_rev_set = new Set();    // ノードパス指定の途中のノード
            setNodeRepExpr(d, "");
            setNodeValue(d, "");
            setNodeDisp(d, "");
        });

    // root.descendants()
    //     // .filter(d => typeof getNodeExpr(d) !== 'string' || ! getNodeExpr(d).startsWith("="))
    //     .filter(d => ! getNodeExpr(d).startsWith("="))
    //     // Excel "abc"=>"abc",'abc=>abc,'123=>123(文字列),123=>123（数値）
    //     .forEach(d => {
    //         calcEachNode(d);
    //         const expr = getNodeExpr(d);
    //         const format = getNodeFormat(d);
    //         console.log(expr);
    //         if (expr.startsWith('"')) {
    //             setNodeRepExpr(d, expr);
    //             let value;
    //             if (expr.startsWith("\"") && expr.endsWith("\"")) {
    //                 // result = dst;
    //                 value = "'" + expr.slice(1, expr.length-1);            
    //             } else {
    //                 value = expr;
    //             }
    //             setNodeValue(d, value);
    //             if (format) {
    //                 setNodeDisp(d, d3.format(format)(value));
    //             } else {
    //                 setNodeDisp(d, value);
    //             }
    //         } else if (expr.startsWith("'")) {
    //             // const expr2 = expr.slice(1);
    //             const expr2 = expr;
    //             setNodeRepExpr(d, expr2);
    //             setNodeValue(d, expr2);
    //             if (format) {
    //                 setNodeDisp(d, d3.format(format)(expr2));
    //             } else {
    //                 setNodeDisp(d, expr2);
    //             }
    //         } else {
    //             setNodeRepExpr(d, expr);
    //             setNodeValue(d, expr);
    //             let disp;
    //             const num = Number(expr);
    //             if (num) {
    //                 if (format) {
    //                     disp = d3.format(format)(num);
    //                 } else {
    //                     // console.log("calcEachNode", node.data.name, node.data.value);
    //                     if (Number.isInteger(num)) {
    //                         disp = d3.format(",")(num);
    //                     } else if (typeof num === 'number' ) {
    //                         disp = d3.format(",.2f")(num);
    //                     } else {
    //                         disp = num;
    //                     }
    //                     // console.log(node.data.disp);
    //                 }
    //             } else {
    //                 if (format) {
    //                     disp = d3.format(format)(expr);
    //                 } else {
    //                     // console.log("calcEachNode", node.data.name, node.data.value);
    //                     disp = expr;
    //                     // console.log(node.data.disp);
    //                 }
    //             }
    //             setNodeDisp(d, disp);
    //         }
    //     });
    // root.descendants()
    //     .filter(d => getNodeExpr(d).startsWith("="))
    //     .forEach(d => {
    //         setNodeRepExpr(d, "");
    //         setNodeValue(d, "");
    //         setNodeDisp(d, "");
    // });
    root.descendants()
        .filter(d => getNodeDisp(d) === "")
        .forEach(d => {
            console.log(getNodeName(d));
            calcEachNode(d);
        });
    return;
}

//ノードの値を計算する
// exprを参考に、value,dispを設定する
// ループエラーに注意
function calcEachNode(node) {
    console.log("start calcEachNode", getNodeName(node));
    if (getNodeValueNoCalc(node) !== "") {
        const value = getNodeValueNoCalc(node);
        console.log("calcEachNode end", value);
        return value;
    }
    var error_get_multi_value = "";
    // console.log(node);
    console.log(node);
    node.link_src_set.clear();
    node.link_path_set.clear();

    // TODO 要検討 link_ref_set の各ノードへの伝搬通知は不要？
    //  calcAllやノード削除・追加などから呼び出されるので
    //  呼び出し元で処理済みの前提

    const rootNode = node.ancestors ? node.ancestors().pop() : node;
    const expr = getNodeExpr(node);
    console.log("expr", "$"+expr+"$");
    // console.log(typeof expr);
    // if (typeof expr === "string") {
    //     console.log(expr.startsWith("="));
    // }
    let rv;
    if (expr === "" || ! expr.startsWith("=")) {
        console.log("そのまま");
        //TODO "～" '～
        let value;
        if (expr.startsWith("'")) {
            value = expr;
            setNodeRepExpr(node, value);
            setNodeValue(node, value);
            setNodeDisp(node, value.slice(1));
        } else if (expr.startsWith("\"") && expr.endsWith("\"")) {
            value = "'" + expr.slice(1, expr.length-1);
            setNodeRepExpr(node, value);
            setNodeValue(node, value);
            setNodeDisp(node, value.slice(1));
        } else {
            if (! Number.isFinite(Number(expr))) {
                value = "'" + expr;
            } else {
                value = expr;
            }
            setNodeRepExpr(node, value);
            setNodeValue(node, value);
            setNodeDisp(node, value);
        }
        rv = value;
    } else {
        // console.log("式");
        setNodeValue(node, "#LOOP");
        let dst = "";
        let index = 1;
        const length = expr.length;
        while (index < length) {
            // console.log(expr);
            if (expr.slice(index).startsWith("'*'")) {
                console.log("startsWith", expr);
                index += 3;

                const children = node.descendants()
                        .filter(d => {return d.depth === node.depth+1;});
                value_list = [];
                children.forEach(child_node => {
                    const child_name = child_node.data.name;
                    const value = getNodeValue(child_node);
                    if (typeof value === "string" && value.startsWith("#")) {
                        const err_value = "#ERROR?" + expr.substring(0, index) + value
                                + expr.substring(index);
                        setNodeValue(node, err_value);
                        setNodeRepExpr(node, err_value);
                        setNodeDisp(node, err_value);
                        console.log("get_multi_value return err", err_value);
                        return err_value;
                    }
                    if (typeof value === "string" && value === "") {
                        const err_value = "#ERROR?" + expr.substring(0, index) + "#EMPTY?"
                                + expr.substring(index);
                        setNodeValue(node, err_value);
                        setNodeRepExpr(node, err_value);
                        setNodeDisp(node, err_value);
                        console.log("get_multi_value return err", err_value);
                        return err_value;
                    }
                    node.link_src_set.add(child_node);
                    child_node.link_ref_set.add(node);
                    value_list.push(value);
                });
                dst += "[" + value_list.join(",") + "]";
            } else if (expr.slice(index).startsWith("'**'")) {
                console.log("startsWith", expr);
                index += 4;
                setNodeValue(node, "#LOOP");

                const children = node.descendants();
                value_list = [];
                children.forEach(child_node => {
                    const child_name = child_node.data.name;
                    const value = getNodeValue(child_node);
                    if (typeof value === "string" && value.startsWith("#")) {
                        const err_value = "#ERROR?" + expr.substring(0, index) + value
                                + expr.substring(index);
                        setNodeValue(node, err_value);
                        setNodeRepExpr(node, err_value);
                        setNodeDisp(node, err_value);
                        return err_value;
                    }
                    if (typeof value === "string" && value === "") {
                        const err_value = "#ERROR?" + expr.substring(0, index) + "#EMPTY?"
                                + expr.substring(index);
                        setNodeValue(node, err_value);
                        setNodeRepExpr(node, err_value);
                        setNodeDisp(node, err_value);
                        console.log("get_multi_value return err", err_value);
                        return err_value;
                    }
                    if (value.startsWith("'")) {
                        // value = value;
                    } else if (value.startsWith("\"") && value.endsWith("\"")) {
                        value = "'" + value.slice(1, value.length-1);
                    } else {
                        // value = value;
                    }
                    node.link_src_set.add(child_node);
                    child_node.link_ref_set.add(node);
                    value_list.push(value);
                });
                dst += "[" + value_list.join(",") + "]";
            } else if (expr[index] === "'") {
                index += 1;
                let node_name = "";
                while (expr[index] !== "'") {
                    node_name += expr[index];
                    index += 1;
                }
                index += 1;
                let value = get_multi_value(node, node_name); // value = "[12,34]"の場合あり
                console.log(value);
                if (value === null) {
                    const err_value = "#ERROR?" + expr.substring(0, index) + error_get_multivalue
                            + expr.substring(index);
                    setNodeValue(node, err_value);
                    setNodeRepExpr(node, err_value);
                    setNodeDisp(node, err_value);
                    console.log("get_multi_value return err", err_value);
                    return err_value;
                }
                if (value.startsWith("'")) {
                    // value = value;
                    dst += "string(\"" + value.slice(1) + "\")";
                } else if (value.startsWith("\"") && value.endsWith("\"")) {
                    dst += "string(" + value + ")";
                    value = "'" + value.slice(1, value.length-1);
                } else {
                    // value = value;
                    dst += value;
                }
            } else {
                // console.log("#"+dst+"#");
                dst += expr[index];
                index += 1;
            }
        }
        console.log("dst", dst);
        setNodeRepExpr(node, dst);
        let result;
        if (dst.startsWith("'")) {
            // result = "\"" + dst.slice(1) + "\"";
            result = dst;
        } else if (dst.startsWith("\"") && dst.endsWith("\"")) {
            // result = dst;
            result = "'" + dst.slice(1, dst.length-1);            
        } else {
            result = math.evaluate(dst);
        }

        //TODO 参照先ノードが文字列の場合はevaluateしない
        //  1234と'1234と"1234"を区別できるか

        console.log("result", result);
        if (result === undefined) {
            result = dst;
            console.log("result", result);
        }
        console.log("result", result);
        setNodeValue(node, result);
        const format = getNodeFormat(node);
        const value = getNodeValue(node);
        console.log("value", value);
        if (format) {
            let disp = d3.format(format)(value);
            setNodeDisp(node, disp);
        } else {
            // console.log("calcEachNode", node.data.name, node.data.value);
            let disp;
            if (Number.isInteger(value)) {
                disp = d3.format(",")(value);
            } else if (typeof value === 'number' ) {
                disp = d3.format(",.2f")(value);
            } else {
                disp = value;
            }
            console.log("disp", disp);
            setNodeDisp(node, disp);
            // console.log(node.data.disp);
        }
        rv = value;
    }
    console.log("calcEachNode end", rv);
    return rv;
}

function get_multi_value(node, indicator) {
    console.log("get_multi_value start");
    console.log(node);
    console.log("#"+indicator+"#");
    var error_get_multi_value = null;
    // var list_get_multi_value = [];
    // const xml_doc = node.data.ownerDocument;
    // console.log("xml_doc", xml_doc);
    if (indicator.startsWith('/')) {
        const root_node = node.ancestors ? node.ancestors().pop() : node;
        const value = get_multi_value_xpath(node, root_node, indicator);
// console.log("root_node", root_node);
// console.log("root_node.data", root_node.data);
// console.log("is xml element", root_node.data instanceof Element);
// console.log("tagName", root_node.data && root_node.data.tagName);
        return value;
    } else if (indicator.startsWith(".")) {
        if (indicator[1] !== "/") {
            error_get_multivalue = "#INVALID_NODE_PATH"
            return null;
        }
        const value = get_multi_value_xpath(node, node, indicator.slice(1));
        return value;
    } else {
        console.log(node, indicator);
        const target_node = findNodeFromHere(node, indicator);
        console.log("target_node", target_node);
        if (target_node === null) {
            error_get_multivalue = "#NAME_NOTFOUND?";
            return null;
        } else if (Array.isArray(target_node)) {
            if (target_node.length === 1) {
                let value = getNodeValue(target_node[0]);
                console.log("value", value);
                if (value.startsWith("'")) {
                    // result = "\"" + dst.slice(1) + "\"";
                    // value = value;
                } else if (value.startsWith("\"") && value.endsWith("\"")) {
                    // result = dst;
                    value = "'" + value.slice(1, value.length-1);            
                // if (value.startsWith("'")) {
                //     value = "\"" + value.slice(1) + "\"";
                }
                node.link_src_set.add(target_node[0]);
                target_node[0].link_ref_set.add(node);
                console.log("get_multi_value end", value);
                return value;
            } else {
                value_list = [];
                target_node.forEach(each_node => {
                    console.log(each_node);
                    const value = getNodeValue(each_node);
                    console.log("value", value);
                    if (value.startsWith("'")) {
                        // result = "\"" + dst.slice(1) + "\"";
                        // value = value;
                    } else if (value.startsWith("\"") && value.endsWith("\"")) {
                        // result = dst;
                        value = "'" + value.slice(1, value.length-1);            
                    }
                    // if (value.startsWith("'")) {
                    //     value = "\"" + value.slice(1) + "\"";
                    // }
                    node.link_src_set.add(each_node);
                    each_node.link_ref_set.add(node);
                    value_list.push(value);
                })
                return "[" + value_list.join(",") + "]";
            }
        } else {
            const value = getNodeValue(target_node);
            console.log("value", value);
            if (value.startsWith("'")) {
                // result = "\"" + dst.slice(1) + "\"";
                // value = value;
            } else if (value.startsWith("\"") && value.endsWith("\"")) {
                // result = dst;
                value = "'" + value.slice(1, value.length-1);            
            }
            // if (value.startsWith("'")) {
            //     value = "\"" + value.slice(1) + "\"";
            // }
            node.link_src_set.add(target_node);
            target_node.link_ref_set.add(node);
            return value;
        }
    }
}

function get_multi_value_xpath(node, base_node, indicator) {

    // TODO
    // '//A/B//C//d'の場合に、
    // A,B,CまでのxPathを別に作り、
    //　それぞれのノードを　
    let link_path_list = [];    // link_path_setを作成用のxPath
    let index = 0;
    let str_xpath = '.';
    const length = indicator.length;
    do {
        str_xpath += indicator[index];
        index ++;
        if (index === length) {
            // 最後が、`/`単独で終わる
            error_get_multivalue = "#INVALID_NODE_PATH"
            return null;
        }
        if (indicator[index] === '/') {
            str_xpath += indicator[index];
            index ++;
            if (index === length) {
                // 最後が、`//`で終わる
                error_get_multivalue = "#INVALID_NODE_PATH"
                return null;
            }
        }
        if (indicator[index] === '*') {
            index++;
            if (index === length) {
                    str_xpath += "node";
                    break;
            }
            if (indicator[index] === '*') {
                index++;
                if (index !== length) {
                    error_get_multivalue = "#INVALID_NODE_PATH";
                    return null;
                }
                str_xpath += "descendant::node";
                break;
            }
            error_get_multivalue = "#INVALID_NODE_PATH";
            return null;
        }
        let str_name = '';
        do {
            if (! isValidNodeNameChar(indicator[index])) {
                if (indicator[index] !== '/') {
                    // ノード名の後ろに、ノード名として適当でない文字がある
                    error_get_multivalue = "#INVALID_NODE_PATH"
                    return null;
                }
                break;
            }
            str_name += indicator[index];
            index ++;
        } while (index < length);
        str_xpath += "node[child::name='" + str_name +"']";
        console.log(str_xpath);
        if (index === length) {
            break;
        }
        link_path_list.push(str_xpath);
    } while (indicator[index] === '/');
    if (index !== length) {
        error_get_multivalue = "#INVALID_NODE_PATH"
        return null;
    }
    console.log(str_xpath);
    const xml_doc = base_node.data.ownerDocument;
    const xpathResult = xml_doc.evaluate(
        str_xpath, 
        base_node.data, 
        null, 
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, 
        null
    );
    console.log(xpathResult.snapshotLength);
    if (xpathResult.snapshotLength == 0) {
        error_get_multivalue = "#NAME_NOTFOUND";
        return null;
    }
    let value_list = [];
    setNodeValue(node, "#LOOP?");
    const nodeArray = Array.from(snapshotIterator(xpathResult));
    const root_node = node.ancestors ? node.ancestors().pop() : node;
    for (const each_element of nodeArray) {
        const id = getElementID(each_element);
        const each_node = root_node.descendants().find(d => d.id === id);
        console.log("each_node", each_node);
        if (each_node === undefined) {
            alert("idが見つからない")
        }

        const value = getNodeValue(each_node);
        if (typeof value === "string" && value.startsWith("#")) {
            error_get_multivalue = value;
            return null;
        }
        if (typeof value === "string" && value === "") {
            error_get_multivalue = "#EMPTY?";
            return null;
        }
        if (value.startsWith("'")) {
            value = "\"" + value.slice(1) + "\"";
        }
        node.link_src_set.add(each_node);
        each_node.link_ref_set.add(node);
        value_list.push(value);
    }
    if (value_list.length === 0) {
        return null;
    }
    link_path_list.forEach(link_path => {
        const linkResult = xml_doc.evaluate(
            link_path,
            base_node.data,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null
        );
        const linkArray = Array.from(snapshotIterator(linkResult));
        for (const each_link of linkArray) {
            const link_id = getElementID(each_link);
            const link_node = root_node.descendants().find(d => d.id ===link_id);
            node.link_path_set.add(link_node);
            link_node.link_path_rev_set.add(node);
        }
    })
    console.log("value_list", value_list, value_list.length);
    if (value_list.length === 1) {
        console.log(value_list[0]);
        return value_list[0];
    }
    return "[" + value_list.join(",") + "]";
}

//今は、使ってないようだ
// function get_multi_value_sub(org_node, node, indicator) {
//     let length = indicator.length;
//     let node_list = [ node ];
//     let value_list = [];
//     node_list = get_multi_value_list(node_list, indicator, 0, length);
//     console.log(node_list);
//     if (node_list === null) {
//         return null;
//     }
//     node_list.forEach(target_node => {
//         const value = getNodeValue(target_node);
//         if (typeof value === "string" && value.startsWith("#")) {
//             error_get_multi_value = value;
//             return null;
//         }
//         if (typeof value === "string" && value === "") {
//             error_get_multi_value = "#EMPTY?";
//             return null;
//         }
//         console.log(node);
//         console.log(target_node);

//         // TODO node は、探す起点であって、この式が入っているノードではない
        
//         org_node.link_src_set.add(target_node);
//         target_node.link_ref_set.add(org_node);
//         value_list.push(value);
//     })
//     console.log(value_list);
//     return value_list;
// }


function get_multi_value_list(_node_list, indicator, _index, length) {
    console.log("get_multi_value_list")
    console.log(_node_list);
    console.log(indicator);
    let node_list = _node_list;
    let index = _index;
   do {
        if (indicator[index] !== "/") {
            error_get_multi_value = "#INVALID?";
            return null;
        }
        if (index + 1 === length) {
            error_get_multi_value = "#INVALID?";
            return null;
        }
        let new_node_list = [];
        if (indicator[index + 1] == "/") {
            // "//"の場合
            console.log("//");
            index += 2;
            if (indicator[index + 1] === "*") {
                break;
            }
            let name = '';
            do {
                if ((indicator[index]=='"') || (indicator[index]=="'")
                        || (indicator[index]=="*") || (indicator[index]==".")) {
                    error_get_multi_value = "#INVALID?";
                    return null;
                }
                name += indicator[index];
                index += 1;
            } while((index !== length) && (indicator[index] !== "/"));
            console.log(name);
            node_list.forEach((node) => {
                children = node.descendants().filter((d) => {return d.data.name === name;});
                new_node_list = new_node_list.concat(children);
            })
        } else {
            // "/"の場合
            console.log("/");
            index += 1;
            if (indicator[index + 1] === "*") {
                break;
            }
            let name = '';
            do {
                if ((indicator[index]=='"') || (indicator[index]=="'")
                        || (indicator[index]=="*") || (indicator[index]==".")) {
                    error_get_multi_value = "#INVALID?";
                    return null;
                }
                name += indicator[index];
                index += 1;
            } while((index !== length) && (indicator[index] !== "/"));
            // console.log(name);
            node_list.forEach((node) => {
                const depth = node.depth;
                children = node.descendants()
                        .filter((d) => {return (d.depth == depth+1) && (d.data.name === name);});
                new_node_list = new_node_list.concat(children);
            })
        }
        node_list = new_node_list;
    } while((index !== length) || (indicator[index] === '/'));
    if (index === length) {
        return node_list;
    }
    if (indicator[index] !== '*') {
        error_get_multi_value = "#INVALID?";
        return null;
    }
    if (index + 1 === length) {
        // "*"
        let list = [];
            const depth = node.depth;
        node_list.forEach((node) => {
            children = node.descendants()
                   .filter((d) => {return d.depth == depth+1;});
            list = list.concat(children);
        })
        return list;
    } else {
        if (index + 2 !== length) {
            error_get_multi_value = "#INVALID?";
            return null;
        }
        if (indicator[index+1] !== "*") {
            error_get_multi_value = "#INVALID?";
            return null;
        }
        // "**"
        let list = [];
        node_list.forEach((node) => {
            children = node.descendants();
            list = list.concat(children);
        })
        return list;
    }
}


function deleteNode(node) {
    console.log("deleteNode", getNodeName(node), node);

    clear_src(node);
    clear_path(node);
    clear_path_rev(node);

    // 削除予定のノード（子孫ノードを含む）を参照しているノードの計算結果をクリアする
    let visited = new Set();
    node.descendants()
        .forEach(child => clear_ref(child, visited));
    node.descendants()
        .forEach(child => {
            console.log(child, child.link_ref_set);
            child.link_ref_set.forEach(d => {d.link_src_set.delete(child);});
            child.link_path_rev_set.forEach(d => {
                setNodeRepExpr(d, "");
                setNodeValue(d, "");
                setNodeDisp(d, "");
                d.link_path_set.delete(child);

            })
        });

    // エラーノード　参照ノード名の重複が解消する可能性がある
    const rootNode = node.ancestors ? node.ancestors().pop() : node;
    rootNode.descendants()
        .filter(d => (! getNodeValueNoCalc(d) ||
                (typeof getNodeValueNoCalc(d) === "string") && (getNodeValueNoCalc(d).startsWith("#"))))
        .forEach(d => {
            setNodeRepExpr(d, "");
            setNodeDisp(d, "");
            setNodeValue(d, "");
        });
    // print_root(rootNode);
    // alert("111111");

    // 1. XML DOM から削除
    if (node.data && node.data.parentNode) {
        node.data.parentNode.removeChild(node.data);
    }

    // 2. D3 hierarchy から削除
    if (node.parent && node.parent.children) {
        const index = node.parent.children.indexOf(node);
        if (index > -1) {
            node.parent.children.splice(index, 1);
        }
        if (node.parent.children.length === 0) {
            node.parent.children = null;
        }
    }

    // print_root(rootNode);
    // alert("22222");

    // 3. 参照関係の後始末
    // rootNode.descendants().forEach(d => {
    //     d.link_ref_set?.delete(node);
    //     d.link_src_set?.delete(node);
    // });

    // console.log("AAAAAAAAA");
    // print_root(rootNode);
    // console.log("BBBBBBBB");
    // 4. 未計算ノードを再計算
    alert("33333");

    rootNode.descendants()
        .filter(d => d.data && getNodeValueNoCalc(d) === "")
        .forEach(d => {
            console.log("before calaEachNode", d);
            calcEachNode(d);
        });
}


//ノード名を変更する
function renameNodeName(node, new_name) {
    const old_name = node.data.name;
    const parent_node = node.parent;
    const inv_name = isValidNodeName(new_name);
    if (! inv_name) {
        alert(`ノード名「${new_name}」は使えない文字を含んでいます。`);
        return false;
    }
    const checkDuplicate = checkDuplicateNodeName(parent_node, new_name);
    if (! checkDuplicate) {
        alert(`ノード名「${new_name}」は重複しています。`);
        return false;
    }
    node.data.name = new_name;

    // 以下のノードのvalueをクリアしてから、再計算
    //  エラーノード
    // 　このノードを参照しているノード、さらにそのノードを参照しているノード
    // 　新ノード名と同一のノード名のノードを参照しているノード、さらに……
    const rootNode = node.ancestors ? node.ancestors().pop() : node;
    // 参照先のノードがなくてエラーや、重複ノードでエラーになっていた
    // ノードがエラーでなくなるかもしれない
    rootNode.descendants()
        .filter(d => (!d.data.value ||
                (typeof d.data.value === "string") && (d.data.value.startsWith("#"))))
        .forEach(d => {
            d.data.disp = null;
            d.data.value = null;
        });

    // ノード名が変わるの参照先でなくなる
    // 別のノードが参照先になることが考えられる
    console.log(node.link_ref_set);
    if (node.link_ref_set.size !== 0) {
        rootNode.descendants()
                .filter(d => node.link_ref_set.has(d))
                .forEach(d => {
                    clear_ref(d);
                    d.link_src_set.clear();
                });
        node.link_ref_set.clear();
    }

    const sameNodes = rootNode.descendants()
        .filter(d => d.data.name == new_name)
        .forEach(d => {
            clear_ref(d);
            d.link_src_set.clear();
        });

    rootNode.descendants()
        .filter(d => (!d.data.value || d.data.value === null))
        .forEach(d => {
            calcEachNode(d);
        });
    return true;
  }


//ノード名、式を変更する
//変更したいない場合もある
function rename_reexpr_Node(node, new_name, new_expr ) {
    if (node.data.expr === new_expr) {
        if (node.data.name === new_name) {
            return false;
        }
        const rv = renameNodeName(node, new_name);
        return rv;
    }
    const rootNode = node.ancestors ? node.ancestors().pop() : node;
    if (node.data.name === new_name) {
        //式のみの変更
        node.data.expr = new_expr;
        node.data.value = null;
        node.data.disp = null;
        if (node.link_ref_set.size !== 0) {
            rootNode.descendants()
                    .filter(d => node.link_ref_set.has(d))
                    .forEach(d => {
                        clear_ref(d);
                        d.link_src_set.clear();
                    });
            node.link_ref_set.clear();
        }
    } else {
        //両方の変更
        const old_name = node.data.name;
        const parent_node = node.parent;
        const inv_name = isValidNodeName(new_name);
        if (! inv_name) {
            alert(`ノード名「${new_name}」は使えない文字を含んでいます。`);
            return false;
        }
        const checkDuplicate = checkDuplicateNodeName(parent_node, new_name);
        // const check_name = parent_node.children.find(child =>
        //         child.data.name === new_name);
        // if (check_name !== undefined) {
        if (! checkDuplicate) {
            alert(`ノード名「${new_name}」は重複しています。`);
            return false;
        }
        node.data.name = new_name;

        node.data.expr = new_expr;
        node.data.value = null;
        node.data.disp = null;

        // 以下のノードのvalueをクリアしてから、再計算
        //  エラーノード
        // 　このノードを参照しているノード、さらにそのノードを参照しているノード
        // 　新ノード名と同一のノード名のノードを参照しているノード、さらに……

        // 参照先のノードがなくてエラーや、重複ノードでエラーになっていた
        // ノードがエラーでなくなるかもしれない
        rootNode.descendants()
            .filter(d => (!d.data.value ||
                    (typeof d.data.value === "string") && (d.data.value.startsWith("#"))))
            .forEach(d => {
                d.data.disp = null;
                d.data.value = null;
            });

        // ノード名が変わるの参照先でなくなる
        // 別のノードが参照先になることが考えられる
        console.log(node.link_ref_set);
        if (node.link_ref_set.size !== 0) {
            rootNode.descendants()
                    .filter(d => node.link_ref_set.has(d))
                    .forEach(d => {
                        clear_ref(d);
                        d.link_src_set.clear();
                    });
            node.link_ref_set.clear();
        }

        const sameNodes = rootNode.descendants()
            .filter(d => d.data.name == new_name)
            .forEach(d => {
                clear_ref(d);
                d.link_src_set.clear();
            });
    }

    rootNode.descendants()
        .filter(d => (!d.data.value || d.data.value === null))
        .forEach(d => {
            calcEachNode(d);
        });
    return true;
  }


//新しいノードを作る
//TODO rootの子を作る
function new_Node(node, new_name, new_expr ) {
    console.log("start new_Node");
    const rootNode = node.ancestors ? node.ancestors().pop() : node;
    const parent_node = node.parent;
    console.log(node);
    console.log(parent_node);
    // const check_name = parent_node.children.find(child =>
    //         child.data.name === new_name);
    // if (check_name !== undefined) {
    //     alert(`ノード名「${new_name}」は重複しています。`);
    //     return false;
    // }
    
    console.log(node.data);
    // node.data.name = new_name;
    // node.data.expr = new_expr;
    // node.data.value = null;
    // node.data.disp = null;
    node.link_ref_set = new Set();
    node.link_src_set = new Set();
    node.link_path_set = new Set();
    node.link_path_rev_set = new Set();

    // 以下のノードのvalueをクリアしてから、再計算
    //  エラーノード
    // 　このノードを参照しているノード、さらにそのノードを参照しているノード
    // 　新ノード名と同一のノード名のノードを参照しているノード、さらに……

    // 参照先のノードがなくてエラーや、重複ノードでエラーになっていた
    // ノードがエラーでなくなるかもしれない
    rootNode.descendants()
        .filter(d => function(d) {
                const value = getNodeValue(d);
                return value.startsWith("#"); })
        .forEach(d => {
            setNodeDisp(d, "");
            setNodeValue(d, "");
            setNodeRepExpr(d, "");
        });

    const sameNodes = rootNode.descendants()
        .filter(d => d.data.name === new_name);
    sameNodes.forEach(d => {
        let visited = new Set();
        clear_ref(d, visited);
        clear_src(d);
    })
    sameNodes.forEach(d => {
        clear_path_rev(d);
    })
    rootNode.descendants()
        .filter(d => (getNodeValue(d) === null))
        .forEach(d => {
            console.log("calcEachNode", getNodeName(d));
            calcEachNode(d);
        });
    console.log("new_Node end");
    return true;
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
function clear_ref(node, visited = new Set()) {
    if (!node || visited.has(node)) {
        return;
    }
    visited.add(node);

    setNodeRepExpr(node, "");
    setNodeDisp(node, "");
    setNodeValue(node, "");

    for (const refNode of node.link_ref_set ?? []) {
        clear_ref(refNode, visited);
    }
}

function clear_path_rev(node) {
    node.link_path_rev_set.forEach(
        d => {
            setNodeRepExpr(d, "");
            setNodeDisp(d, "");
            setNodeValue(d, "");
            d.link_path_set.delete(node);
            d.link_path_set.forEach(dd => dd.link_path_rev_set.delete(d));
            d.link_path_set.clear();
        }
    )
}

// function clear_ref(node) {
//     setNodeRepExpr(node, null);
//     setNodeDisp(node, null);
//     setNodeValue(node, null);
//     // if (node.link_ref_set.size !== 0) {
//     //     // TODO 意味なく、効率が悪そう
//     //     root.descendants()
//     //         .filter(d => node.link_ref_set.has(d))
//     //         .forEach(d => clear_ref(d));
//     // }
//     for (const refNode of node.link_ref_set) {
//         clear_ref(refNode);
//     }
//     //   node.link_ref_set.clear();
//     return;
// }


//移動（ドロップ）したノード（子孫ノードを含む）が別のノードの子ノードとなった
function changeParent(node, new_parent) {
    // 親子間の付替えは、既に終わっている前提
    const rootNode = node.ancestors ? node.ancestors().pop() : node;
    // 参照先のノードがなくてエラーや、重複ノードでエラーになっていた
    // ノードがエラーでなくなるかもしれない
    rootNode.descendants()
        .filter(d => (!d.data.value ||
                (typeof d.data.value === "string") && (d.data.value.startsWith("#"))))
        .forEach(d => {
            d.data.disp = null;
            d.data.value = null;
        });
    // 移動したノード（子孫ノードを含む。以下同じ。）の計算結果のクリア
    node.descendants()
            .filter(d => (typeof d.data.expr === "string") && (d.data.expr.startsWith("=")))
            .forEach(d => {
                d.data.disp = null;
                d.data.value = null;
            });
    // 移動したノードを参照していた他のノード（さらに参照を含む）の計算結果のクリア
    node.descendants()
            .forEach(d => {
                if (d.link_ref_set.size !== 0) {
                    rootNode.descendants()
                            .filter(d2 => node.link_ref_set.has(d2))
                            .forEach(d2 => {
                                clear_ref(d2);
                                d2.link_src_set.clear();
                            });
                }
                d.link_ref_set.clear();
            });

    // 移動したノードのノード名と同じノード名を参照していた他のノードの計算結果のクリア
    const sameNodes = rootNode.descendants()
        .filter(d => d.data.name == node.data.name)
        .forEach(d => {
            clear_ref(d);
            d.link_src_set.clear();
        });
    
    // 計算結果をクリアしたノードの再計算
    rootNode.descendants()
        .filter(d => (!d.data.value || d.data.value === null))
        .forEach(d => {
            calcEachNode(d);
        });
}
