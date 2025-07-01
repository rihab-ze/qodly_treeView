import { TreeNode } from './';
import TreeNodeData from './TreeNodeData';
interface TreeNodeComponentProps {
  treeData?: TreeNodeData[];
  handleNodeClick?: (node: TreeNodeData) => void;
  expand?: boolean;
  selectedNode?: TreeNodeData;
  selectedElementColor: string;
}

function TreeNodeComponent({
  treeData,
  handleNodeClick,
  expand,
  selectedNode,
  selectedElementColor,
}: TreeNodeComponentProps) {
  return (
    <ul>
      {treeData?.map((node) => (
        <TreeNode
          node={node}
          key={node.key}
          handleNodeClick={handleNodeClick}
          expand={expand}
          selectedNode={selectedNode}
          selectedElementColor={selectedElementColor}
        />
      ))}
    </ul>
  );
}

export default TreeNodeComponent;
