import {FlowNodeRegistry} from '../../typings';
import {formMeta} from './form-meta';

export const InclusiveElseBranchNodeRegistry: FlowNodeRegistry = {
    type: 'INCLUSIVE_ELSE_BRANCH',
    extend: 'block',
    meta: {
        copyDisable: true,
        addDisable: true,
        sidebarDisable:true,
        deleteDisable: true,
    },
    info: {
        icon: 'INCLUSIVE_ELSE_BRANCH',
        description: '包容else分支',
    },
    /**
     * Render node via formMeta
     */
    formMeta,
};
