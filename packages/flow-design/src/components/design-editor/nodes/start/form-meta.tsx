import {provideJsonSchemaOutputs, syncVariableTitle,} from '@flowgram.ai/form-materials';
import {FormMeta, FormRenderProps, ValidateTrigger,} from '@flowgram.ai/fixed-layout-editor';
import {FlowNodeJSON} from '../../typings';
import {useIsSidebar} from '../../hooks';
import {NodeHeader} from "@/components/design-editor/node-components/header";
import {NodePanel} from "@/components/design-editor/node-components/panel";
import {TabNodeLayout} from "@/components/design-editor/node-components/layout";
import {NodeTitleStrategy} from "@/components/design-editor/node-components/strategy/node-title";
import {RevokeStrategy} from "@/components/design-editor/node-components/strategy/revoke";
import {View} from "@/components/design-editor/node-components/view";
import {useDesignContext} from "@/components/design-panel/hooks/use-design-context";
import {GroovyScriptConvertorUtil} from "@coding-flow/flow-core";
import { GroovyScriptLoader } from '@/script-components/components/groovy-script-loader';


interface ScriptContentProps {
    scriptKey: string;
    value?: string;
    onChange?: (value: string) => void;
}

const ScriptContent: React.FC<ScriptContentProps> = (props) => {

    return (
        <div>
            {GroovyScriptConvertorUtil.getScriptTitle(props.value || '')}
        </div>
    );
}


export const renderForm = (data: FormRenderProps<FlowNodeJSON['data']>) => {
    const isSidebar = useIsSidebar();
    const {state} = useDesignContext();
    if (isSidebar) {
        return (
            <NodePanel data={data}>
                <NodeHeader/>
                <TabNodeLayout>
                    <View/>
                    <NodeTitleStrategy/>
                    <RevokeStrategy/>
                </TabNodeLayout>
            </NodePanel>
        );
    }
    return (
        <NodePanel data={data}>
            <NodeHeader/>
            <GroovyScriptLoader
                content={ScriptContent}
                value={state.workflow.operatorCreateScript}
            />
        </NodePanel>
    );
};

export const formMeta: FormMeta<FlowNodeJSON['data']> = {
    render: renderForm,
    validateTrigger: ValidateTrigger.onChange,
    validate: {
        title: ({value}: { value: string }) => (value ? undefined : 'Title is required'),
    },
    effect: {
        title: syncVariableTitle,
        outputs: provideJsonSchemaOutputs,
    },
};
