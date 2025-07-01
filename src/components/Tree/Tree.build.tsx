import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC } from 'react';
import TreeNodeComponent from './components/TreeNodeComponent';
import { ITreeProps } from './Tree.config';
const treeData = [
  {
    key: '1',
    icon: 'fa-regular fa-folder',
    label: 'Node 1',
    children: [
      {
        key: '2',
        label: 'Node 1.1',
        icon: 'fa-solid fa-inbox',
        children: [
          { key: '4', label: 'Node 1.1.1', icon: 'fa-regular fa-file' },
          { key: '5', label: 'Node 1.1.2', icon: 'fa-regular fa-file' },
        ],
      },
      { key: '3', icon: 'fa-regular fa-calendar-days', label: 'Node 1.2' },
    ],
  },
  { key: '4', icon: 'fa-regular fa-folder', label: 'Node 2' },
];
const Tree: FC<ITreeProps> = ({
  expand,
  selectedElementColor,
  style,
  className,
  classNames = [],
}) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();
  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      <TreeNodeComponent
        treeData={treeData}
        expand={expand}
        selectedElementColor={selectedElementColor}
      />
    </div>
  );
};

export default Tree;
