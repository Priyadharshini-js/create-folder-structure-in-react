import React from "react";
import TreeNode from "./TreeNode";

const FolderTree = ({ treeData, onUpdateTree }) => {
  return (
    <div>
      {Object.keys(treeData).map((key) => (
        <TreeNode
          key={key}
          node={treeData[key]}
          name={key}
          path={key}
          updateTree={onUpdateTree}
          fullTree={treeData}
        />
      ))}
    </div>
  );
};

export default FolderTree;
