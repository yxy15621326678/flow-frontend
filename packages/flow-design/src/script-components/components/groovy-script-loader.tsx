import { getScript } from '@/api/script';
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

    const handleScriptChange = (currentScript: string) => {
        if (script === currentScript) {
            return;
        }
        console.log('script changed', currentScript);
        setScript(currentScript);
    }

    React.useEffect(() => {
        if (scriptKey) {
            getScript(scriptKey).then(res => {
                setScript(res.data);
            });
        }
    }, [scriptKey]);

    return (
        <ScriptContent
            scriptKey={scriptKey}
            value={script}
            onChange={handleScriptChange}
         />
    );
};
