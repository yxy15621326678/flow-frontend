import { Button, Drawer } from "antd";
import React from "react";


interface ViewCodeDrawerProps {
    visible: boolean;
    onClose: () => void;
    code: string;
}

export const ViewCodeDrawer: React.FC<ViewCodeDrawerProps> = (props) => {

    return (
        <Drawer
            closeIcon={false}
            title="视图代码"
            open={props.visible}
            onClose={props.onClose}
            size={'100%'}
            extra={
                <Button onClick={props.onClose}>
                    关闭
                </Button>
            }
        >
            <div>代码内容 {props.code}</div>
        </Drawer>
    );
}