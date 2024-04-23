import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';

import { ITreeProps } from './Tree.config';

const Tree: FC<ITreeProps> = ({ style, className, classNames = [] }) => {
  const { connect } = useRenderer();
  const [value, setValue] = useState<TreeNodeData[]>([]);
  const {
    sources: { datasource: ds },
  } = useSources();

  useEffect(() => {
    if (!ds) return;

    const listener = async (/* event */) => {
      const v = await ds.getValue<TreeNodeData[]>();
      setValue(v);
    };

    listener();

    ds.addListener('changed', listener);

    return () => {
      ds.removeListener('changed', listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ds]);

  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      <TreeNodeComponent treeData={value} />
    </div>
  );
};

export default Tree;

interface TreeNodeData {
  key: string;
  label: string;
  icon?: string;
  children?: TreeNodeData[];
}

interface Treetest {
  treeData?: TreeNodeData[];
  onLastItemClick?: (node: TreeNodeData) => void;
}

function TreeNodeComponent({ treeData, onLastItemClick }: Treetest) {
  return (
    <ul>
      {treeData?.map((node, index) => (
        <TreeNode
          node={node}
          key={node.key}
          isLast={index === treeData.length - 1}
          onLastItemClick={onLastItemClick}
        />
      ))}
    </ul>
  );
}

interface TreeNodeProps {
  node: TreeNodeData;
  isLast: boolean;
  onLastItemClick?: (node: TreeNodeData) => void;
}
function TreeNode({ node, isLast, onLastItemClick }: TreeNodeProps) {
  const { children, label, icon } = node;

  const [showChildren, setShowChildren] = useState(false);

  const handleClick = () => {
    if (isLast) {
      setShowChildren(!showChildren);
      if (onLastItemClick) {
        onLastItemClick(node);
      }
    } else {
      setShowChildren(!showChildren);
    }
  };
  return (
    <>
      <div onClick={handleClick} style={{ marginBottom: '10px' }}>
        <div className="flex items-center gap-1" style={{ cursor: children ? 'pointer' : '' }}>
          {showChildren && children ? (
            <i className="fa-solid fa-angle-down mr-2"></i>
          ) : children ? (
            <i className="fa-solid fa-angle-right mr-2"></i>
          ) : (
            ''
          )}
          {icon && <i className={` ${icon} mr-1`}></i>}

          <span>{label}</span>
        </div>
      </div>
      <ul style={{ paddingLeft: '10px', marginLeft: '27px' }}>
        {showChildren && <TreeNodeComponent treeData={children} />}
      </ul>
    </>
  );
}
