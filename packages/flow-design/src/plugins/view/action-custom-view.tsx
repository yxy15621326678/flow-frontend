import React from "react";
import { Button, Input, Space } from "antd";
import { ActionCustomViewPlugin, VIEW_KEY } from "@/plugins/action-custom-view-type";
import { ViewBindPlugin } from "@coding-flow/flow-core";
import { GroovyScriptModal } from "@/script-components/components/groovy-script-modal";
import { AdvancedScriptEditor } from "@/script-components/components/advanced-script-editor";
import { ScriptType } from "@/script-components/typings";
import { EditOutlined } from "@ant-design/icons";
import { GroovyScriptConvertorUtil } from "@coding-script/script-engine";
import { SCRIPT_DEFAULT_CUSTOM } from "@/script-components/default-script";


export const ActionCustomView: React.FC<ActionCustomViewPlugin> = (props) => {

    const ActionCustomViewComponent = ViewBindPlugin.getInstance().get(VIEW_KEY);

    const [visible, setVisible] = React.useState(false);

    if (ActionCustomViewComponent) {
        return (
            <ActionCustomViewComponent {...props} />
        );
    }

    return (
        <>
            <Space.Compact>
                <Space.Addon
                    style={{
                        width: '150px',
                    }}
                >
                    触发动作
                </Space.Addon>
                <Input
                    style={{
                        width: '150px',
                    }}
                    value={GroovyScriptConvertorUtil.getScriptTitle(props.value || '')}
                    readOnly
                />
                <Button
                    icon={<EditOutlined />}
                    onClick={() => {
                        setVisible(true);
                    }}
                >
                    编辑
                </Button>
            </Space.Compact>

            <GroovyScriptModal
                type={ScriptType.CUSTOM_ACTION}
                variables={[]}
                open={visible}
                onCancel={() => {
                    setVisible(false)
                }}
                resetScript={()=>{
                    return SCRIPT_DEFAULT_CUSTOM;
                }}
                scriptKey={props.scriptKey}
                script={props.value || ""}
                onConfirm={(script) => {
                    props.onChange?.(script);
                }}
                content={AdvancedScriptEditor}
            />
        </>
    )
}