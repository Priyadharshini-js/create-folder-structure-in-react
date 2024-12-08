import React, { useState } from "react";
import FolderTree from "./FolderTree";

const App = () => {
  const [treeData, setTreeData] = useState({
    Documents: ["Document1.jpg", "Document2.jpg", "Document3.jpg"],
    Desktop: ["Screenshot1.jpg", "videopal.mp4"],
    Downloads: {
      Drivers: ["Printerdriver.dmg", "cameradriver.dmg"],
      "chromedriver.dmg": [],
    },
    Applications: [
      "Webstorm.dmg",
      "Pycharm.dmg",
      "FileZila.dmg",
      "Mattermost.dmg",
    ],
  });

  const handleUpdateTree = (newTree) => {
    setTreeData(newTree);
  };

  return (
    <div className="mxy-20">
      <h1>React Folder Structure</h1>
      <FolderTree treeData={treeData} onUpdateTree={handleUpdateTree} />
    </div>
  );
};

export default App;
