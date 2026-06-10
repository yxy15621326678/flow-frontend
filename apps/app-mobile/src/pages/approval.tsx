import React from "react";
import { ApprovalPanel } from "@coding-flow/flow-mobile-approval";
import { useLocation, useNavigate } from "react-router";
import { EventBus } from "@coding-flow/flow-core";

const ApprovalPage = () => {

    const location = useLocation();
    const workflowCode = location.state.workflowCode;
    const recordId = location.state.recordId;
    const review = location.state.review;
    const navigate = useNavigate();

    const handleClose = () => {
        navigate(-1);
    }

    React.useEffect(() => {
        EventBus.getInstance().on('compile', () => {
            alert('compile')
        });
        return () => {
            EventBus.getInstance().off('compile');
        }
    }, []);

    return (
        <ApprovalPanel
            recordId={recordId}
            workflowCode={workflowCode}
            onClose={handleClose}
            review={review}
        />
    )
}

export default ApprovalPage