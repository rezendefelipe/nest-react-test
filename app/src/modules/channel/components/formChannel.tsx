import { Button, Group, TextInput } from "@mantine/core";
import { useRequests } from "../../../shared/hooks/useRequests";
import { URL_CHANNELS } from "../../../shared/constants/urls";
import { useForm } from "@mantine/form";
import { useGlobalContext } from "../../../shared/hooks/useGlobalContext";
import { notifications } from "@mantine/notifications";

const FormChannel = ({...props}) => {

    const { postRequest, putRequest } = useRequests();
    const { setModalStatus } = useGlobalContext();

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            id: props.editValues.id ? props.editValues.id : null,
            name: props.editValues.name ? props.editValues.name : '',
            description: props.editValues.description ? props.editValues.description : '',
        },
        validate: {
            name: (value) => {
                const valid = false

                if (!value.length) return 'Name is required';
                if (value.length < 2) return 'First name is too short';

                return valid;
            },
        },
    });

    const notificationMesage = (title: string, message: string, color?: string) => {
        notifications.show({
            title: title,
            message: message,
            color
        })
    }

    const handleSaveOrEditChannel = async () => {
        if (form.validate().hasErrors) return;
        
        const dataChannel = form.getValues();
        if (props.editValues.id) {
            const resp = await putRequest(URL_CHANNELS, props.editValues.id, {...dataChannel});
            if (resp) {
                notificationMesage('Channel edited.','');
            } else {
                notificationMesage('Error on edit', 'Could not edit channel', 'red');
            }
        } else {
            const resp = await postRequest(URL_CHANNELS, {...dataChannel});
            if (resp) {
                notificationMesage('Channel created.','');
            } else {
                notificationMesage('Error on create', 'Could not save channel', 'red');
            }
            
        }
        setModalStatus(false);
        form.setFieldValue('name', '')
        form.setFieldValue('description', '')
        await props.getData();
    };

    return (
        <div>
            <TextInput
                label="Name"
                placeholder="Name"
                key={form.key('name')}
                {...form.getInputProps('name')}
            />
            <TextInput
                mt="md"
                label="Description"
                placeholder="Description"
                key={form.key('description')}
                {...form.getInputProps('description')}
            />
            <Group justify="space-between" mt="xl">
                <Button onClick={() => setModalStatus(false)}>
                    Cancel
                </Button>
                <Button color="green" onClick={handleSaveOrEditChannel}>
                    Save
                </Button>
            </Group>
        </div>
    )
}

export default FormChannel;