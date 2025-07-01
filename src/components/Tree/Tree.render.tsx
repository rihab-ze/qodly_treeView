import { useRenderer, useSources, useWebformPath } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import TreeNodeComponent from './components/TreeNodeComponent';
import TreeNodeData from './components/TreeNodeData';
import { ITreeProps } from './Tree.config';

const Tree: FC<ITreeProps> = ({
  expand,
  style,
  selectedElementColor,
  currentPage,
  className,
  classNames = [],
}) => {
  const { connect, emit } = useRenderer();
  const [value, setValue] = useState<TreeNodeData[]>([]);
  const [selectedNode, setSelectedNode] = useState<TreeNodeData>();
  const {
    sources: { datasource: ds, currentElement: ce },
  } = useSources();
  const path = useWebformPath();
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
  const handleNodeClick = (node: TreeNodeData) => {
    ce && ce.setValue(null, node);
    setSelectedNode(node);
    if (!node.children || node.children.length === 0) {
      if (!currentPage) return;
      const ds = window.DataSource.getSource(currentPage, path);
      node.target && ds?.setValue(null, node.target);
      emit('onPageClick', { node: ce });
    }
  };

  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      <TreeNodeComponent
        treeData={value}
        expand={expand}
        handleNodeClick={handleNodeClick}
        selectedNode={selectedNode}
        selectedElementColor={selectedElementColor}
      />
    </div>
  );
};

export default Tree;
