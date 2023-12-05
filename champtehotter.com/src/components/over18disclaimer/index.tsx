import { Modal } from "antd";
import { CONFIG_DISCLAIMER_ALTURL } from "configs";
import { useCallback, useEffect, useState } from "react";
import { useDislaimerAccepted } from "store";

export default function Over18Disclaimer() {
    const [showModal, setShowModal] = useState(false)
    const [isAccepted, setDisclaimerAccepted] = useDislaimerAccepted();

    const handleOk = useCallback(() => {
        setDisclaimerAccepted(true);
    }, [setDisclaimerAccepted]);

    const handleCancel = useCallback(() => {
        setShowModal(false);
        window.location.href = CONFIG_DISCLAIMER_ALTURL
    }, []);

    useEffect(() => {
        setShowModal(!isAccepted)
    }, [isAccepted])

    return (
        <>
        <Modal title="Are you 18+?" open={showModal} okText="Yes, I'm 18+ and accept the content" cancelText="I'm NOT, Take me out" onOk={handleOk} onCancel={handleCancel}>
            <p><strong>You must be 18+ to enter</strong>, or whatever age the law requires in your jurisdiction. <strong>Do not proceed</strong> if you are offended by erotic diaper stories, diaper usage, infantilism, diaperfur, or kinky perverted diaper stuff in general. You have been warned! <strong>Flamers, Haters, and Harassers will be ignored and blocked</strong>, thank you!</p>
        </Modal>
        </>
    );
}