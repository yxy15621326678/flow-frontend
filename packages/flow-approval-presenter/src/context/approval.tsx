import React from "react";
import {ApprovalLayoutProps, ApprovalState} from "@/typings";
import {ApprovalPresenter} from "@/presenters";
import { FieldPermission,FlowForm } from "@coding-flow/flow-types";
import { MetaService } from "@/service/meta-service";

export class ApprovalContextScope {
    private readonly presenter: ApprovalPresenter;
    private readonly props: ApprovalLayoutProps;


    constructor(presenter: ApprovalPresenter, props: ApprovalLayoutProps) {
        this.presenter = presenter;
        this.props = props;
    }

    public syncState(state: ApprovalState) {
        this.presenter.syncState(state);
    }

    public getPresenter() {
        return this.presenter;
    }

    public getInitData(){
        return this.props.initData;
    }

    public convertMeta(form:FlowForm | undefined, permissions: FieldPermission[]){
        const metaService = new MetaService(form, permissions);
        const data = metaService.getFormMeta();
        return data;
    }


    public close() {
        this.props.onClose?.();
    }

    public initialState() {
        this.presenter.initialState({
            flow: this.props.content,
            review: this.props.review,
        });
    }
}


export const ApprovalContext = React.createContext<ApprovalContextScope | undefined>(undefined);

