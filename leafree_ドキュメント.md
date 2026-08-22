# leafree ドキュメント

## データ構造

### ノード

### ルートノード

### 親子関係

### ノード名

#### ノード名制限

`"`,`'`,`/`,`*`,`.`,` `（半角空白）,全角の数字は、ノード名には使えません。

※全角の数字は、将来のXML利用に備えて使えないことにした。

ノード名は、数字（半角・全角）、XML（大文字・小文字）で始まってはいけない。

##### isValidNodeName( name )

###### 呼び出し元

起動時

ロード時

ノード名変更時 renameNodeName,rename_reexpr_Node

TODO 子ノード挿入時

#### 無名ノード名判定

ノード名の最初の文字が`_`である無名ノード名の判定

##### isNonameNodeName(name)

  true 無名ノード名

  false 無名ノード名でない



#### 兄弟ノード重複制限

兄弟ノードでは同じノード名は使えません（無名ノードを除く）。

親子間などでは同じノード名を使うことができます。

兄弟ノードでも、ノード名の最初の文字が`_`である無名ノードだけは、同一のノード名が使用できます。

##### checkDuplicateNodeName(parent, name)

parentノードの子ノードに、nameと重複するノード名があるか否か

###### 戻り値

 true 重複なし、または、無名ノード名

 false 重複

###### 呼び出し元

ノードドラッグ時 d3.drag()   renameDuplicateNodeName

ノード名変更時 renameNodeName,rename_reexpr_Node

子ノード挿入時 addChildNode,addChildToRootAtPosition

子ノードペースト時 paste_node	renameDuplicateNodeName

##### renameDuplicateNodeName(parent, name)

parentノードの子ノードと重複しないノード名をnameから作り出す

単に、ノード名の後ろを`_2`などにするだけ。

###### 戻り値

重複しないノード名

###### 呼び出し元

ノードドラッグ時 d3.drag()

子ノードペースト時 paste_node

##### 

##### checkNodeName(root) 

###### 利用関数

checkNodeNameBrother(nodeParent)



###### 呼び出し元

起動時

ロード時

