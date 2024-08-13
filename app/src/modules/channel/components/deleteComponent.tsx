import { ActionIcon } from "@mantine/core"
import { IconTrashFilled } from "@tabler/icons-react"
import { useRequests } from "../../../shared/hooks/useRequests";
import { URL_CHANNELS } from "../../../shared/constants/urls";

const DeleteComponent = ({...props}) => {
    const { deleteRequest } = useRequests();

    const handleDeleteChannel = async () => {
        await deleteRequest(URL_CHANNELS, props.id);
        props.getData();
    }

    return (
        <ActionIcon variant="light" color="red" aria-label="Settings" onClick={() => handleDeleteChannel()}>
            <IconTrashFilled style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
    )
}

export default DeleteComponent