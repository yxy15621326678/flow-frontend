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
            theme={'light'}
            options={{
                fontSize: 14,
                minHeight: 300,
                maxHeight: 300,
            }}
        />
    );
}