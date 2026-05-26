import React from 'react';
import { message } from 'antd';
import { ScriptCodeEditor, ScriptMetadata } from '@coding-script/script-engine';

interface GroovyCodeEditorProps {
    title?: string;
    value?: string;
    readonly?: boolean;
    onChange?: (value: string) => void;
    placeholder?: string;
    theme?: 'dark' | 'light';
    options?: {
        fontSize?: number;
        minHeight?: number;
        maxHeight?: number;
    };
}

export const GroovyCodeEditor: React.FC<GroovyCodeEditorProps> = (props) => {

    const title = props.title || '脚本编辑器';

    const sampleMetadata: ScriptMetadata = JSON.parse(`{"binds":[{"dataType":"GroovyBindObject","name":"$request"}],"mainMethod":"run","requests":[{"dataType":"MyScriptRequest","description":"我的测试对象","name":"request"}],"returnType":"Integer","types":{"MyScriptRequest":{"dataType":"MyScriptRequest","description":"我的测试对象","fields":[{"dataType":"int","description":"总数量","name":"count"},{"dataType":"MyTest","description":"test","name":"test"}],"functions":[{"description":"是否匹配","name":"isSupport","parameters":[{"dataType":"int","description":"描述信息","name":"count"}]}]},"Integer":{"dataType":"Integer","fields":[],"functions":[]},"boolean":{"dataType":"boolean","fields":[],"functions":[]},"Long":{"dataType":"Long","fields":[],"functions":[]},"String":{"dataType":"String","fields":[],"functions":[]},"MyTest":{"dataType":"MyTest","description":"test","fields":[{"dataType":"Long","description":"id","name":"id"},{"dataType":"String","description":"name","name":"name"}],"functions":[]},"int":{"dataType":"int","fields":[],"functions":[]}}}`);


    return (
        <ScriptCodeEditor
            title={title}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
            readonly={props.readonly}
            options={props.options}
            defaultTheme={props.theme || 'light'}
            metadata={sampleMetadata}
            enableCompile={true}
            enableFormat={true}
            enableFullscreen={true}
            enableThemeToggle={true}
            onCompile={(code) => {
                console.log('编译脚本:', code);
                message.success('脚本编译测试已提交');
            }}
        />
    )
};
