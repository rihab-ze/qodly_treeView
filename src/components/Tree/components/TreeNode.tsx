import TreeNodeData from './TreeNodeData';
import { useState } from 'react';
import { TreeNodeComponent } from '.';

interface TreeNodeProps {
  node: TreeNodeData;
  handleNodeClick?: (node: TreeNodeData) => void;
  expand?: boolean;
  selectedNode?: TreeNodeData;
  selectedElementColor: string;
}
function TreeNode({
  node,
  handleNodeClick,
  expand,
  selectedElementColor,
  selectedNode,
}: TreeNodeProps) {
  const { children, label, icon, url, target } = node;
  const [showChildren, setShowChildren] = useState(expand || false);
  const handleClick = () => {
    handleNodeClick && handleNodeClick(node);
    setShowChildren(!showChildren);
  };
  return (
    <>
      <div
        onClick={handleClick}
        style={{
          marginBottom: '10px',
          backgroundColor:
            selectedNode && selectedNode.key === node.key ? selectedElementColor : 'transparent', // Highlight if selected
          padding: '5px',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        <div className="flex items-center gap-1" style={{ cursor: children ? 'pointer' : '' }}>
          {children && (
            <i className={`fa-solid ${showChildren ? 'fa-angle-down' : 'fa-angle-right'} mr-2`}></i>
          )}
          {icon && <i className={`${icon} mr-1`}></i>}
          {url ? (
            <a href={url}>{label}</a>
          ) : (
            <div className={`${target && 'cursor-pointer'}`}>{label}</div>
          )}
        </div>
      </div>
      {showChildren && children && (
        <ul style={{ paddingLeft: '10px', marginLeft: '27px' }}>
          <TreeNodeComponent
            treeData={children}
            expand={expand}
            handleNodeClick={handleNodeClick}
            selectedNode={selectedNode}
            selectedElementColor={selectedElementColor}
          />
        </ul>
      )}
    </>
  );
}

export default TreeNode;
