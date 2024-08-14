import { Button, Group, TextInput } from "@mantine/core";
import { useRequests } from "../../../shared/hooks/useRequests";
import { URL_CHANNELS } from "../../../shared/constants/urls";
import { useForm } from "@mantine/form";
import { useGlobalContext } from "../../../shared/hooks/useGlobalContext";

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
    });

    const handleSaveOrEditChannel = async () => {
        const dataChannel = form.getValues();
        if (props.editValues.id) {
            await putRequest(URL_CHANNELS, props.editValues.id, {...dataChannel});
        } else {
            await postRequest(URL_CHANNELS, {...dataChannel});
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
            <Group justify="center" mt="xl">
                <Button onClick={handleSaveOrEditChannel}>
                    Save
                </Button>
            </Group>
        </div>
    )
}

export default FormChannel;