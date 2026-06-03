import React from 'react';
import { ScriptCodeEditor, ScriptMetadata, ToolbarItem } from '@coding-script/script-engine';

interface JavaScriptCodeEditorProps {
    title?: string;
    value?: string;
    toolbar?: ToolbarItem[];
    scriptKey?: string;
    readonly?: boolean;
    onChange?: (value: string) => void;
    onCompile?: (code: string) => void;
    resetScript?: () => string;
    placeholder?: string;
    theme?: 'dark' | 'light';
    options?: {
        fontSize?: number;
        minHeight?: number;
        maxHeight?: number;
    };
}

export const JavaScriptCodeEditor: React.FC<JavaScriptCodeEditorProps> = (props) => {

    const title = props.title || 'javscript脚本编辑器';


    return (
        <ScriptCodeEditor
            title={title}
            language="javascript"
            toolbar={props.toolbar}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
            readonly={props.readonly}
            options={props.options}
            defaultTheme={props.theme || 'light'}
            enableCompile={false}
            enableFormat={false}
            enableFullscreen={true}
            enableThemeToggle={true}
            onCompile={(code) => {
                props.onCompile?.(code);
            }}

        />
    )
};
