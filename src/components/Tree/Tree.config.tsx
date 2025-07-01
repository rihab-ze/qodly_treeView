import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { LuFolderTree } from 'react-icons/lu';

import TreeSettings, { BasicSettings } from './Tree.settings';

export default {
  craft: {
    displayName: 'Tree',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(TreeSettings, BasicSettings),
    },
  },
  info: {
    displayName: 'Tree',
    exposed: true,
    icon: LuFolderTree,
    events: [
      {
        label: 'On Page Click',
        value: 'onPageClick',
      },
    ],
    datasources: {
      accept: ['array'],
    },
  },
  defaultProps: {
    expand: true,
    selectedElementColor: '#f0f0f0',
  },
} as T4DComponentConfig<ITreeProps>;

export interface ITreeProps extends webforms.ComponentProps {
  expand: boolean;
  currentPage: string;
  selectedElementColor: string;
}
