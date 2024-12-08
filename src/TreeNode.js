import React, { useState } from "react";

const TreeNode = ({ node, name, path, updateTree, fullTree }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAdd = () => {
    const isFolder = window.confirm("Add a Folder? Click Cancel for a File.");
    const newName = prompt("Enter name:");
    if (!newName) return;

    const newData = { ...fullTree };
    let current = newData;

    path.split("/").forEach((p, i, arr) => {
      if (i === arr.length - 1) {
        if (Array.isArray(current[p])) {
          current[p].push(isFolder ? { [newName]: [] } : newName);
        } else {
          current[p][newName] = isFolder ? {} : [];
        }
      } else {
        current = current[p];
      }
    });

    updateTree(newData);
  };

  const handleEdit = () => {
    const newName = prompt("Enter the new name:", name);
    if (!newName || newName === name) return;

    const newData = { ...fullTree };
    let current = newData;

    path.split("/").forEach((p, i, arr) => {
      if (i === arr.length - 1) {
        if (Array.isArray(current)) {
          const index = current.indexOf(name);
          current[index] = newName;
        } else {
          current[newName] = current[name];
          delete current[name];
        }
      } else {
        current = current[p];
      }
    });

    updateTree(newData);
  };

  const handleDelete = () => {
    const confirmation = window.confirm(`Delete ${name}?`);
    if (!confirmation) return;

    const newData = { ...fullTree };
    let current = newData;

    path.split("/").forEach((p, i, arr) => {
      if (i === arr.length - 1) {
        if (Array.isArray(current)) {
          const index = current.indexOf(name);
          current.splice(index, 1);
        } else {
          delete current[name];
        }
      } else {
        current = current[p];
      }
    });

    updateTree(newData);
  };

  if (typeof node === "string") {
    return (
      <div className="file-name">
        📄 {node}
        <button type="button" className="btn-edit" onClick={handleEdit}>
          Edit
        </button>
        <button type="button" className="btn-delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
    );
  }

  return (
    <div className="folder-name">
      <div onClick={() => setIsOpen(!isOpen)} style={{ cursor: "pointer" }}>
        {isOpen ? "📂" : "📁"} {name}
        <button type="button" className="btn-add" onClick={handleAdd}>
          Add
        </button>
        <button type="button" className="btn-edit" onClick={handleEdit}>
          Edit
        </button>
        <button type="button" className="btn-delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
      {isOpen &&
        Object.keys(node).map((key) => (
          <TreeNode
            key={key}
            node={node[key]}
            name={key}
            path={`${path}/${key}`}
            updateTree={updateTree}
            fullTree={fullTree}
          />
        ))}
    </div>
  );
};

export default TreeNode;
