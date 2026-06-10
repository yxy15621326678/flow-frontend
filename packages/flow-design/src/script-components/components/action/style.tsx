import { Button, Col, ColorPicker, Input, Row, Space } from "antd";
import React from "react";
import { GroovyScriptLoader, GroovyScriptLoaderContent } from "../groovy-script-loader";
import { AdvancedScriptEditor } from "../advanced-script-editor";
import { ScriptType } from "@/script-components/typings";
import { GroovyScriptConvertorUtil } from "@coding-script/script-engine";
import { GroovyScriptModal, GroovyScriptContent } from "../groovy-script-modal";
import { EditOutlined } from "@ant-design/icons";
import { DisplayStyle } from "@coding-flow/flow-types";


interface ActionStyleProps {
    value?: any;
    onChange?: (value: any) => void;
}


const ActionScriptContent: React.FC<GroovyScriptContent> = (props) => {
    return (
        <AdvancedScriptEditor
            {...props}
        />
    )
}

const ActionScript: React.FC<GroovyScriptLoaderContent> = (props) => {

    const [visible, setVisible] = React.useState(false);

    return (
        <>
            <Space.Compact>
                <Space.Addon
                    style={{
                        width: '150px',
                    }}
                >
                    <span>显示条件</span>
                </Space.Addon>
                <Input
                    readOnly
                    style={{
                        width: '150px',
                    }}
                    value={GroovyScriptConvertorUtil.getScriptTitle(props.value || '')}
                />
                <Button
                    icon={<EditOutlined />}
                    onClick={() => {
                        setVisible(true);
                    }}
                >
                    修改
                </Button>

            </Space.Compact>

            <GroovyScriptModal
                type={ScriptType.ACTION_DISPLAY}
                variables={[]}
                scriptKey={props.scriptKey}
                script={props.value || ''}
                open={visible}
                onCancel={() => {
                    setVisible(false);
                }}
                onConfirm={(value) => {
                    props.onChange?.(value);
                    setVisible(false);
                }}
                content={ActionScriptContent}
            />

        </>
    )
}


export const ActionStyle: React.FC<ActionStyleProps> = (props) => {

    const [style, setStyle] = React.useState<DisplayStyle>(props.value || {} as any);

    React.useEffect(() => {
        props.onChange && props.onChange(style);
    }, [style]);

    return (
        <div>
            <Row gutter={[8, 8]}>
                <Col span={12}>
                    <Space.Compact>
                        <Space.Addon
                            style={{
                                width: '150px',
                            }}
                        >
                            <span>背景颜色</span>
                        </Space.Addon>
                        <ColorPicker
                            value={style.backgroundColor || ''}
                            onChange={(value) => {
                                if (value) {
                                    setStyle(prevState => {
                                        return {
                                            ...prevState,
                                            backgroundColor: value.toHex()
                                        }
                                    })
                                }
                            }}
                        />
                    </Space.Compact>
                </Col>
                <Col span={12}>
                    <Space.Compact>
                        <Space.Addon
                            style={{
                                width: '150px',
                            }}
                        >
                            <span>边框颜色</span>
                        </Space.Addon>
                        <ColorPicker
                            value={style.borderColor || ''}
                            onChange={(value) => {
                                if (value) {
                                    setStyle(prevState => {
                                        return {
                                            ...prevState,
                                            borderColor: value.toHex()
                                        }
                                    })
                                }
                            }}
                        />
                    </Space.Compact>
                </Col>
                <Col span={12}>
                    <Space.Compact>
                        <Space.Addon
                            style={{
                                width: '150px',
                            }}
                        >
                            <span>边框圆角</span>
                        </Space.Addon>
                        <Input
                            type={"number"}
                            style={{
                                width: '150px',
                            }}
                            placeholder={"请输入边框圆角"}
                            value={style.borderRadius}
                            onChange={(event) => {
                                setStyle(prevState => {
                                    return {
                                        ...prevState,
                                        borderRadius: event.target.value
                                    }
                                })
                            }}
                        />
                    </Space.Compact>
                </Col>
                <Col span={12}>
                    <Space.Compact>
                        <Space.Addon
                            style={{
                                width: '150px',
                            }}
                        >
                            <span>边框大小</span>
                        </Space.Addon>
                        <Input
                            style={{
                                width: '150px',
                            }}
                            type={"number"}
                            placeholder={"请输入边框大小"}
                            value={style.borderSize}
                            onChange={(event) => {
                                setStyle(prevState => {
                                    return {
                                        ...prevState,
                                        borderSize: event.target.value
                                    }
                                })
                            }}
                        />
                    </Space.Compact>
                </Col>
                <Col span={24}>
                    <GroovyScriptLoader
                        content={ActionScript}
                        value={style.script}
                    />
                </Col>
            </Row>

        </div>
    )
}