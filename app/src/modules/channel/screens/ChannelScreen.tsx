import { ActionIcon, Button, Table, Modal, TextInput, Group } from "@mantine/core";

import { URL_CHANNELS } from "../../../shared/constants/urls.ts";
import { useRequests } from "../../../shared/hooks/useRequests.ts";
import { useEffect, useState } from "react";
import { ChannelType } from "../types/ChannelType.ts";
import { IconEdit } from '@tabler/icons-react';
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import DeleteComponent from "../components/deleteComponent.tsx";


const ChannelScreen = () => {
  const { getRequest, deleteRequest, postRequest, putRequest } = useRequests();
  const [data, updateData] = useState<JSX.Element[]>();
  const [opened, { open, close }] = useDisclosure(false);

  const handleEditChannel = (id: number, name: string, description?: string) => {
    form.setFieldValue('name', name);
    form.setFieldValue('description', description || '');
    form.setFieldValue('id', id)
    open();
  }

  const getData = async () => {
    const resp = await getRequest<ChannelType[]>(URL_CHANNELS);
    if (resp) {
      const rows = resp.map((element: ChannelType) => (
        <Table.Tr key={element.id}>
          <Table.Td>{element.id}</Table.Td>
          <Table.Td>{element.name}</Table.Td>
          <Table.Td>{element.description}</Table.Td>
          <Table.Td>
            <DeleteComponent id={element.id} getData={getData} />
            <ActionIcon variant="light" aria-label="Settings" onClick={() => handleEditChannel(element.id, element.name, element.description)}>
              <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
          </Table.Td>
        </Table.Tr>
      ));

      updateData(rows)
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      id: 0,
      name: '',
      description: '',
    },
  });

  const handleSaveOrEditChannel = async () => {
    const dataChannel = form.getValues();
    if (dataChannel.id) {
      console.log('1', dataChannel);
      
      await putRequest(URL_CHANNELS, dataChannel.id, {...dataChannel});  
    } else {
      console.log('2', dataChannel);
      await postRequest(URL_CHANNELS, {...dataChannel});
    }
    getData().then(() => close());
    form.setFieldValue('name', '')
    form.setFieldValue('description', '')
  };

  const openModalCreate = () => {
    form.setFieldValue('id', 0)
    open();
  }

  return (
    <div>
      <Button variant="filled" onClick={openModalCreate}>Create Channel</Button>
      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Id</Table.Th>
            <Table.Th>Channel Name</Table.Th>
            <Table.Th>Channel Description</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{data}</Table.Tbody>
      </Table>
      <Modal opened={opened} onClose={close} title="Authentication" centered>
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
            Set random values
          </Button>
        </Group>
      </Modal>
    </div>
  );
};
  
export default ChannelScreen;