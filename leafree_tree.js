
//ノード名が重複していないかをチェックする
// 兄弟間での重複だけがダメ
// null OK
// null以外　重複するノード名
function checkNodeName(root) {
  // まずは単純に重複がなければ、ＯＫ
  const allNodes = root.descendants();
  const uniqueNames = new Set(allNodes.map(node => node.data.name));
//   console.log(uniqueNames);
  const flagAllUnique = uniqueNames.size === allNodes.length;
  if (flagAllUnique) {
    return null;
  }
  // 重複があれば、兄弟間の重複がないかをチェックする。
  const duplicates = checkNodeNameBrother(root);
  function checkNodeNameBrother(nodeParent) {
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
        const seen = new Set();
        const duplicates = new Set();
        newMap.forEach(item => {
            if (seen.has(item)) {
                duplicates.add(item); // すでに見たことがあるなら重複セットに入れる
            } else {
                seen.add(item);        // 初めて見るものは記録用セットに入れる
            }
            });  
        return duplicates;
    }
    var duplicates = new Set();
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
        let dst = "";
        let index = 1;
        const length = expr.length;
        while (index < length) {
            if (expr[index] === "'") {
                index += 1;
                let node_name = "";
                while (expr[index] !== "'") {
                    node_name += expr[index];
                    index += 1;
                }
                index += 1;
                const target_node = findNodeFromHere(node, node_name);
                if (target_node === null) {
                    node.data.value = "#ERROR?" + expr.substring(0, index) + "#NAME?'"
                            + expr.substring(index);
                    node.data.disp = node.data.value;
                    return;
                } else if (Array.isArray(target_node)) {
                    node.data.value = "#ERROR?" + expr.substring(0, index) + "#DUPLICATE?'"
                            + expr.substring(index);
                    node.data.disp = node.data.value;
                    return;
                }
                node.link_src_set.add(target_node);
                target_node.link_ref_set.add(node);
                node.data.value = "#LOOP";
                const value = getNodeValue(target_node);
                // console.log(target_node.data.name, "%"+value+"%");
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
                dst += value;
            } else {
                // console.log("#"+dst+"#");
                dst += expr[index];
                index += 1;
            }
        }
        // console.log("dst", dst);
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
    const check_name = parent_node.children.find(child =>
            child.data.name === new_name);
    if (check_name !== undefined) {
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
        const check_name = parent_node.children.find(child =>
                child.data.name === new_name);
        if (check_name !== undefined) {
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
