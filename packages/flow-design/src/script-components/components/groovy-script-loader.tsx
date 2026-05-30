import { getScript, save } from '@/api/script';
import React from 'react';

export interface GroovyScriptLoaderProps {
    value?: string;
    onChange?: (value: string) => void;
    content: React.ComponentType<GroovyScriptContent>;
}


export interface GroovyScriptContent {
    scriptKey: string;
    value?: string;
    onChange?: (value: string) => void;
}


export const GroovyScriptLoader: React.FC<GroovyScriptLoaderProps> = (props) => {

    const scriptKey = props.value || '';

    const [script, setScript] = React.useState('');

    const ScriptContent = props.content;

    const handlerSaveScript = (script: string) => {
        save({
            key: scriptKey,
            script: script
        }).then((res: any) => {

        });
    }


    const handleScriptChange = (currentScript: string) => {
        if (script === currentScript) {
            return;
        }
        console.log('script changed', currentScript);
        handlerSaveScript(currentScript);

        props.onChange?.(scriptKey);
    }

    React.useEffect(() => {
        if (scriptKey) {
            getScript(scriptKey).then((res: any) => {
                setScript(res.data);
            });
        }
    }, [scriptKey]);

    React.useEffect(() => {
        return () => {
            setScript('');
        };
    }, []);

    return (
        <ScriptContent
            scriptKey={scriptKey}
            value={script}
            onChange={handleScriptChange}
        />
    );
};
