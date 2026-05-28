import React from "react";
import { GroovyScriptContent } from "@/script-components/components/groovy-script-modal";
import { GroovyCodeEditor } from '@/components/groovy-code';

export const AdvancedScriptEditor: React.FC<GroovyScriptContent> = (props) => {


    const { script, onChange, readonly } = props;

    const handleChange = (value: string) => {
        if (!readonly) {
            onChange(value);
        }
    };



    return (
        <GroovyCodeEditor
            value={script}
            scriptKey={props.scriptKey}
            readonly={readonly}
            onChange={handleChange}
            placeholder={"请输入脚本..."}
            toolbar={[
                {
                    key: 'reset',
                    title: '重置',
                    label: '重置脚本',
                    backgroundColor: '#ff4d4f',
                    hoverBackgroundColor: '#ff7875',
                    textColor: '#fff',
                    borderColor: '#ff4d4f',
                    onClick: () => {
                        const newScript = props.resetScript?.() || '';
                        handleChange(newScript);
                    }
                }
            ]}
            theme={'light'}
            options={{
                fontSize: 14,
                minHeight: 300,
                maxHeight: 300,
            }}
        />
    );
}