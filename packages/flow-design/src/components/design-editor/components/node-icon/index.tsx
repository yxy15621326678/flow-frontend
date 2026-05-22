import React from "react";
import {NodeType} from "@coding-flow/flow-types";
import {theme} from "antd";
import {
    ApiOutlined,
    AuditOutlined,
    BellOutlined,
    BranchesOutlined,
    ClockCircleOutlined,
    EditOutlined,
    MergeOutlined,
    NodeExpandOutlined,
    PoweroffOutlined,
    PullRequestOutlined,
    ShareAltOutlined,
    StarOutlined,
    UserOutlined
} from "@ant-design/icons";


interface NodeIconProps {
    type: NodeType;
}

type AntdIcon = React.ComponentType<{ style?: React.CSSProperties }>;

const ICON_MAP: Partial<Record<NodeType, AntdIcon>> = {
    APPROVAL: AuditOutlined,
    CONDITION: BranchesOutlined,
    CONDITION_BRANCH: BranchesOutlined,
    CONDITION_ELSE_BRANCH: BranchesOutlined,
    DELAY: ClockCircleOutlined,
    END: PoweroffOutlined,
    HANDLE: EditOutlined,
    MANUAL: UserOutlined,
    MANUAL_BRANCH: UserOutlined,
    INCLUSIVE: MergeOutlined,
    INCLUSIVE_BRANCH: MergeOutlined,
    INCLUSIVE_ELSE_BRANCH: MergeOutlined,
    NOTIFY: BellOutlined,
    PARALLEL: NodeExpandOutlined,
    PARALLEL_BRANCH: NodeExpandOutlined,
    ROUTER: PullRequestOutlined,
    START: StarOutlined,
    SUB_PROCESS: ShareAltOutlined,
    TRIGGER: ApiOutlined,
};

export const NodeIcon: React.FC<NodeIconProps> = (props) => {
    const {token} = theme.useToken();

    const IconComponent = props.type ? ICON_MAP[props.type] : undefined;
    if (!IconComponent) return null;

    const wrapperStyle: React.CSSProperties = {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 20,
        height: 20,
        marginRight: 4,
        marginLeft: 4,
        borderRadius: 5,
        background: token.colorPrimaryBg,
    };

    return (
        <span style={wrapperStyle}>
            <IconComponent style={{fontSize: 14, color: token.colorPrimary}}/>
        </span>
    );
};
