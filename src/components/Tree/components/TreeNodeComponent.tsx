import { TreeNode } from './';
import TreeNodeData from './TreeNodeData';
interface TreeNodeComponentProps {
  treeData?: TreeNodeData[];
  onLastItemClick?: (node: TreeNodeData) => void;
  expand?: boolean;
  activeKey?: string | null;
  onActiveNodeChange?: (key: string) => void;
}

function TreeNodeComponent({ treeData, onLastItemClick, expand, activeKey, onActiveNodeChange }: TreeNodeComponentProps) {
  return (
    <ul>
      {treeData?.map((node, index) => (
        <TreeNode
          node={node}
          key={node.key}
          isLast={index === treeData.length - 1}
          onLastItemClick={onLastItemClick}
          expand={expand}
          activeKey={activeKey}
          onActiveNodeChange={onActiveNodeChange}
        />
      ))}
    </ul>
  );
}

export default TreeNodeComponent;
