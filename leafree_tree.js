
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

//ノード名の最初の文字が`_`である無名ノード名の判定
function isNonameNodeName(name) {
    return name.startsWith("_");
}


// function checkInvalidNodeName(name) {
//     const invalidChar = /\"|\'|\/|\*|,| |０|１|２|３|４|５|６|７|８|９/; 
//     const rv = invalidChar.test(name); 
//     if (rv) return false;

//     return !rv;
// }

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
    if (parent.descendants().find(d => {return d.data.name === name;})) {
        return false;
    }
    return true;
}


//parentノードの子ノードと重複しないノード名をnameから作り出す
// 単に、ノード名の後ろを`_2`などにするだけ。
// 戻り値 重複しないノード名
function renameDuplicateNodeName(parent, name) {
    const match = name.match(/^(.*?)(?:_(\d+))?$/);
    const baseName = match[1];
    const usedNames = new Set(
        parent.children.map(node => node.data.name)
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
    const newMap = nodes.map(node => node.data.name);
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
    // const nodes = nodeParent.descendants()
    //         .filter(d => {return !d.data.name.startsWith("_");});
    // if (nodes.length !== 0) {
    //     const newMap = nodes.map(node => node.data.name);
    //     // console.log(newMap);
    //     const uniqueNames = new Set(newMap);
    //     const flagUnique = uniqueNames.size === nodes.length;
        
    // }
    // // 子孫ノードのチェックへ
}

//root以下の全階層で、ノード名が重複していないかをチェックする
// 兄弟ノードでは同じノード名は使えません（無名ノードを除く）。
// 親子間などでは同じノード名を使うことができます。
// 兄弟ノードでも、ノード名の最初の文字が`_`である無名ノードだけは、同一のノード名が使用できます。
// null OK
// null以外　重複するノード名
function checkNodeName(root) {
    //基本、重複がないことが前提で、早く処理する
    //重複がある場合は時間がかかるのは構わない。
    // まずは単純に重複がなければ、ＯＫ
    const allNodes = root.descendants()
            .filter(node => {return ! isNonameNodeName(node.data.name);});
    const uniqueNames = new Set(allNodes.map(node => node.data.name));
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
// startNode を起点として、targetNameのノードを探す
// 子ノード、孫ノードの順、なければ、
// 親ノード、その親ノードの子ノード、さらに孫ノード、なければ、
// さらに親ノード、…
// どこの階層にもなければ null を返す
function findNodeFromHere(startNode, targetName) {
    // 全ノードを取得し、条件に合うものを全て抽出
    const rootNode = startNode.ancestors ? startNode.ancestors().pop() : startNode;

    const allTargetNodes = rootNode.descendants().
            filter(d => d.data.name === targetName);
    if (allTargetNodes.length === 0) {
        return null;
    }
    if (allTargetNodes.length === 1) {
        return allTargetNodes[0]; 
    }
    // console.log(targetName, allTargetNodes.length);

    const nodes = startNode.descendants();
    let depth = startNode.depth + 1;
    do {
        var children = nodes.filter((node) => node.depth === depth);
        const founds =  children.filter((node) => node.data.name === targetName);
        if (founds.length === 1) {
            return founds[0];
        }
        if (founds.length > 1) {
            return founds;  // 重複エラー
        }
        depth += 1;
    } while(children.length > 0);
    // console.log("子孫になし");

    let parentNode = startNode.parent;
    while (parentNode !== null) {
        if (parentNode.data.name === targetName) {
            return parentNode;
        }
        const nodes = parentNode.descendants();
        let depth = parentNode.depth + 1;
        do {
            // console.log("depth", depth);
            var children = nodes.filter((node) => node.depth === depth);
            // console.log("children", children);
            const founds =  children.filter((node) => node.data.name === targetName);
            // console.log("founds", founds);
            if (founds.length === 1) {
                return founds[0];
            }
            if (founds.length > 1) {
                return founds;  // 重複エラー
            }
            depth += 1;
        } while(children.length > 0);
        parentNode = parentNode.parent;
    }
    return null;
}


//全ノードを再計算する
// 起動時、ロード時
// exprは必ずある前提、disp,valueは無視
function calcAll(root) {
    // console.log("calcAll start");
    root.descendants()
        .forEach(d => {
            d.link_src_set = new Set();
            d.link_ref_set = new Set();
        });

    root.descendants()
        .filter(d => typeof d.data.expr !== 'string' || ! d.data.expr.startsWith("="))
        .forEach(d => {
            d.data.disp = d.data.expr;
            if (d.data.format) {
                d.data.disp = d3.format(d.data.format)(d.data.value);
            } else {
                // console.log("calcEachNode", node.data.name, node.data.value);
                if (Number.isInteger(d.data.value)) {
                    d.data.disp = d3.format(",")(d.data.value);
                } else if (typeof d.data.value === 'number' ) {
                    d.data.disp = d3.format(",.2f")(d.data.value);
                } else {
                    d.data.disp = d.data.value;
                }
                // console.log(node.data.disp);
            }
        });

    root.descendants()
        .filter(d => typeof d.data.expr === 'string' && d.data.expr.startsWith("="))
        .forEach(d => {
            d.data.disp = null;
            d.data.value = null;
        });
    root.descendants()
        .filter(d => d.data.disp === null)
        .forEach(d => {
            calcEachNode(d);
        });
    return;
}


//ノードの値を計算する
// exprを参考に、value,dispを設定する
// ループエラーに注意
function calcEachNode(node) {
    // console.log("start calcEachNode", node.data.name);
    if (node.data.disp && node.data.disp !== null) {
        return;
    }
    var error_get_multi_value;
    // console.log(node);
    node.link_src_set.clear();
    const expr = node.data.expr;
    // console.log("expr", "$"+expr+"$");
    // console.log(typeof expr);
    // if (typeof expr === "string") {
    //     console.log(expr.startsWith("="));
    // }
    if (typeof expr !== "string" || expr === "" || ! expr.startsWith("=")) {
        // console.log("そのまま");
        node.data.value = expr;
    } else {
        // console.log("式");
        node.data.value = "#LOOP";
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
                        node.data.value = "#ERROR?" + expr.substring(0, index) + value
                                + expr.substring(index);
                        node.data.disp = node.data.value;
                        return;
                    }
                    if (typeof value === "string" && value === "") {
                        node.data.value = "#ERROR?" + expr.substring(0, index) + "#EMPTY?"
                                + expr.substring(index);
                        node.data.disp = node.data.value;
                        return;
                    }
                    node.link_src_set.add(child_node);
                    child_node.link_ref_set.add(node);
                    value_list.push(value);
                });
                dst += "[" + value_list.join(",") + "]";
            } else if (expr.slice(index).startsWith("'**'")) {
                console.log("startsWith", expr);
                index += 4;
                node.data.value = "#LOOP";

                const children = node.descendants();
                value_list = [];
                children.forEach(child_node => {
                    const child_name = child_node.data.name;
                    const value = getNodeValue(child_node);
                    if (typeof value === "string" && value.startsWith("#")) {
                        node.data.value = "#ERROR?" + expr.substring(0, index) + value
                                + expr.substring(index);
                        node.data.disp = node.data.value;
                        return;
                    }
                    if (typeof value === "string" && value === "") {
                        node.data.value = "#ERROR?" + expr.substring(0, index) + "#EMPTY?"
                                + expr.substring(index);
                        node.data.disp = node.data.value;
                        return;
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
                const value = get_multi_value(node, node_name); // value = "12,34"の場合あり
                if (value === null) {
                    node.data.value = "#ERROR?" + expr.substring(0, index) + error_get_multi_value
                            + expr.substring(index);
                    node.data.disp = node.data.value;
                    return;
                }
                dst += value;
            } else {
                // console.log("#"+dst+"#");
                dst += expr[index];
                index += 1;
            }
        }
        console.log("dst", dst);
        const result = math.evaluate(dst);
        node.data.value = result;
    }
    if (node.data.format) {
        node.data.disp = d3.format(node.data.format)(node.data.value);
    } else {
        // console.log("calcEachNode", node.data.name, node.data.value);
        if (Number.isInteger(node.data.value)) {
            node.data.disp = d3.format(",")(node.data.value);
        } else if (typeof node.data.value === 'number' ) {
            node.data.disp = d3.format(",.2f")(node.data.value);
        } else {
            node.data.disp = node.data.value;
        }
        // console.log(node.data.disp);
    }
    return;
}

function get_multi_value(node, indicator) {
    console.log("get_multi_value start");
    console.log(node);
    console.log("#"+indicator+"#");
    var error_get_multi_value = null;
    // var list_get_multi_value = [];

    if (indicator.startsWith("***")) {
        if (indicator.startsWith("***/")) {
            const rootNode = node.ancestors ? node.ancestors().pop() : node;
            value_list = get_multi_value_sub(node, rootNode, indicator.slice(3));
            if (value_list === null) {
                return null;
            }
            return "[" + value_list.join(",") + "]";
        } else {
            error_get_multi_value = "#INVALID?";
            return null;
        }
    } else if (indicator.startsWith("**")) {
        if (indicator !== "**") {
            error_get_multi_value = "#INVALID?";
            return null;
        }
        node.data.value = "#LOOP?";
        const children = node.descendants();
        value_list = [];
        children.forEach(child_node => {
            const child_name = child_node.data.name;
            const value = getNodeValue(child_node);
            if (typeof value === "string" && value.startsWith("#")) {
                error_get_multi_value = value;
                return null;
            }
            if (typeof value === "string" && value === "") {
                error_get_multi_value = "#EMPTY?";
                return null;
            }
            node.link_src_set.add(child_node);
            child_node.link_ref_set.add(node);
            value_list.push(value);
        });
        return value_list.join(",");
    } else if (indicator.startsWith("*")) {
        if (indicator === "*") {
            console.log("startsWith", expr);
            node.data.value = "#LOOP?";
            const children = node.descendants()
                    .filter(d => {return d.depth === node.depth+1;});
            value_list = [];
            children.forEach(child_node => {
                const child_name = child_node.data.name;
                const value = getNodeValue(child_node);
                if (typeof value === "string" && value.startsWith("#")) {
                    error_get_multi_value = value;
                    return null;
                }
                if (typeof value === "string" && value === "") {
                    error_get_multi_value = "#EMPTY?";
                    return null;
                }
                node.link_src_set.add(child_node);
                child_node.link_ref_set.add(node);
                value_list.push(value);
            });
            return "[" + value_list.join(",") + "]";
        } else if (indicator.startsWith("*./")) {
            value_list = get_multi_value_sub(node, node, indicator.slice(2));
            if (value_list === null) {
                return null;
            }
            return"[" + value_list.join(",") + "]";
        } else {
            error_get_multi_value = "#INVALID?";
            return null;
        }
    } else {
        const target_node = findNodeFromHere(node, indicator);
        if (target_node === null) {
            error_get_multi_value = "#NAME_NOTFOUND?";
            return null;
        } else if (Array.isArray(target_node)) {
            error_get_multi_value = "#DUPLICATE?'";
            return null;
        }
        node.link_src_set.add(target_node);
        target_node.link_ref_set.add(node);
        node.data.value = "#LOOP?";
        const value = getNodeValue(target_node);
        // console.log(target_node.data.name, "%"+value+"%");
        if (typeof value === "string" && value.startsWith("#")) {
            error_get_multi_value = value;
            return null;
        }
        if (typeof value === "string" && value === "") {
            error_get_multi_value = "#EMPTY?";
            return null;
        }
        return value;
    }
}


function get_multi_value_sub(org_node, node, indicator) {
    let length = indicator.length;
    let node_list = [ node ];
    let value_list = [];
    node_list = get_multi_value_list(node_list, indicator, 0, length);
    console.log(node_list);
    if (node_list === null) {
        return null;
    }
    node_list.forEach(target_node => {
        const value = getNodeValue(target_node);
        if (typeof value === "string" && value.startsWith("#")) {
            error_get_multi_value = value;
            return null;
        }
        if (typeof value === "string" && value === "") {
            error_get_multi_value = "#EMPTY?";
            return null;
        }
        console.log(node);
        console.log(target_node);

        // TODO node は、探す起点であって、この式が入っているノードではない
        
        org_node.link_src_set.add(target_node);
        target_node.link_ref_set.add(org_node);
        value_list.push(value);
    })
    console.log(value_list);
    return value_list;
}


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
            console.log(name);
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

//ノードの値を返す
// 未計算なら計算する
function getNodeValue(node) {
  if (node.data.value != null) {
    return node.data.value;
  }
  calcEachNode(node);
  return node.data.value;
}


function deleteNode(node) {
    node.descendants()
        .forEach(child => clear_ref(child));

    // エラーノード　参照ノード名の重複が解消する可能性がある
    const rootNode = node.ancestors ? node.ancestors().pop() : node;
    rootNode.descendants()
        .filter(d => (!d.data.value ||
                (typeof d.data.value === "string") && (d.data.value.startsWith("#"))))
        .forEach(d => {
            d.data.disp = null;
            d.data.value = null;
        });

    if (node.parent.data && node.parent.data.children) {
        const pIdx = node.parent.data.children.indexOf(node.data);
        if (pIdx > -1) {
            node.parent.data.children.splice(pIdx, 1);
        }
    }
    // --- 2. D3ノードデータ構造から削除 ---
    const index = node.parent.children.indexOf(node);
    if (index > -1) {
        node.parent.children.splice(index, 1);
    }
    // if (d.parent.children.length === 0) {
    //     d.parent.children = null;
    // }

    root.descendants()
        .filter(d => d.data && (!d.data.value || d.data.value === null))
        .forEach(d => {
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
    node.data.name = new_name;
    node.data.expr = new_expr;
    node.data.value = null;
    node.data.disp = null;
    node.link_ref_set = new Set();
    node.link_src_set = new Set();

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

    const sameNodes = rootNode.descendants()
        .filter(d => d.data.name === new_name)
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



//そのノードとそのノードを参照しているノード、さらに…ノードの
//valueをクリアし、
function clear_ref(node) {
    node.data.disp = null;
    node.data.value = null;
    console.log(node.data.name, node.link_ref_set);
    if (node.link_ref_set.size !== 0) {
        root.descendants()
            .filter(d => node.link_ref_set.has(d))
            .forEach(d => clear_ref(d));
    }
    //   node.link_ref_set.clear();
    return;
}


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
