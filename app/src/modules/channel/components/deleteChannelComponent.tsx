import { ActionIcon, Button, Group, Modal, Text } from "@mantine/core"
import { IconTrashFilled } from "@tabler/icons-react"
import { useRequests } from "../../../shared/hooks/useRequests";
import { URL_CHANNELS } from "../../../shared/constants/urls";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

const DeleteChannelComponent = ({...props}) => {
    const { deleteRequest } = useRequests();
    const [opened, { open, close }] = useDisclosure(false);

    const confirmDelete = async () => {
        await deleteRequest(URL_CHANNELS, props.id);
        notifications.show({
            title: 'Channel deleted.',
            message: '',
        })
        props.getData();
    }

    return (
        <>
            <Modal opened={opened} onClose={close} title="Delete Channel" centered>
                <Text>Are you sure to delete this item?</Text>
                <Group mt="xl" justify="space-between">
                    <Button variant="primary" onClick={() => close()}>Cancelar</Button>
                    <Button variant="filled" onClick={() => confirmDelete()} color="red">Confirm</Button>
                </Group>
            </Modal>
            <ActionIcon variant="light" color="red" aria-label="Settings" onClick={open}>
                <IconTrashFilled style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
        </>
    )
}

export default DeleteChannelComponent