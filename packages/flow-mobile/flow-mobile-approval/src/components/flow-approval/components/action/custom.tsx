import React from "react";
import { FlowActionProps } from "./type";
import { ActionFactory } from "@/components/flow-approval/components/action/factory";
import { ActionType } from "@coding-flow/flow-types";
import { ViewBindPlugin } from "@coding-flow/flow-core";
import { APPROVAL_ACTION_CUSTOM_KEY } from "@/components/flow-approval";

/**
 * 自定义
 * @param props
 * @constructor
 */
export const CustomAction: React.FC<FlowActionProps> = (props) => {
    const action = props.action;

    const triggerType = action.triggerType;
    const triggerFrontEvent = action.triggerFrontEvent;

    const ActionPluginView = ViewBindPlugin.getInstance().get(APPROVAL_ACTION_CUSTOM_KEY);

    if (ActionPluginView) {
        return (
            <ActionPluginView
                {...props}
            />
        )
    }

    if (triggerFrontEvent) {
        return (
            <></>
        )
    }

    if (triggerType) {
        const ActionView = ActionFactory.getInstance().render({
            ...props.action,
            type: triggerType as ActionType,
        });

        if (ActionView) {
            return ActionView
        }
    }


}