import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { useEffect } from "react";

interface CustomModalProps {
    children: React.ReactNode; // Use React.ReactNode para permitir qualquer conteúdo
}

const CustomModal: React.FC<CustomModalProps> = ({children}) => {
    const [opened, { open, close }] = useDisclosure(false);
    const { modalStatus, setModalStatus } = useGlobalContext();

    useEffect(() => {
        modalStatus ? open() : close();
    }, [modalStatus])

    const closeModal = () => setModalStatus(false)

    return (
        <>
            <Modal opened={opened} onClose={closeModal} title="Create Channel" centered>
                { children }
            </Modal>
        </>
    )
}

export default CustomModal;