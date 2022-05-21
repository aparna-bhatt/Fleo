import React from "react";
import Tree from "react-d3-tree";
import { useCenteredTree } from "./helpers";
import SalesCard from "./SalesCard";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import "./App.css";

const containerStyles = {
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgb(245,245,245)",
};
const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
}) => (
  <g>
    <circle r={15}></circle>
    <foreignObject className="foreignObj" {...foreignObjectProps}>
      <SalesCard cardData={nodeDatum} />
    </foreignObject>
  </g>
);

export default function App() {
  const [translate, containerRef] = useCenteredTree();
  const { data, zoomLevel } = useSelector((store) => {
    return store.fleo;
  });
  const nodeSize = { x: 300, y: 400 };
  const foreignObjectProps = {
    width: nodeSize.x,
    height: nodeSize.y,
    x: -nodeSize.x / 2,
    y: -20,
  };
  return (
    <>
      <Navbar />
      <div style={containerStyles} ref={containerRef}>
        <Tree
          data={data}
          translate={translate}
          nodeSize={nodeSize}
          pathFunc="step"
          zoom={zoomLevel}
          zoomable
          separation={{ siblings: 1.5, nonSiblings: 1.5 }}
          renderCustomNodeElement={(rd3tProps) =>
            renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })
          }
          orientation="vertical"
        />
      </div>
    </>
  );
}
