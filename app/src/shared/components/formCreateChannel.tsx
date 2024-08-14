import { Button, Group, TextInput } from "@mantine/core";
import { useRequests } from "../hooks/useRequests";
import { URL_CHANNELS } from "../constants/urls";
import { useForm } from "@mantine/form";
import { useGlobalContext } from "../hooks/useGlobalContext";

const FormCreateChannel = ({...props}) => {

    const { postRequest } = useRequests();
    const { setModalStatus } = useGlobalContext();

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
          name: '',
          description: '',
        },
    });

    const handleSaveOrEditChannel = async () => {
        const dataChannel = form.getValues();
        await postRequest(URL_CHANNELS, {...dataChannel});
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

export default FormCreateChannel;