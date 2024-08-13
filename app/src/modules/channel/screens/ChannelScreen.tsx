import { ActionIcon, Button, Table, Modal, TextInput, Group } from "@mantine/core";

import { URL_ALL_CHANNELS } from "../../../shared/constants/urls.ts";
import { useRequests } from "../../../shared/hooks/useRequests.ts";
import { useEffect, useState } from "react";
import { ChannelType } from "../types/ChannelType.ts";
import { IconTrashFilled, IconEdit } from '@tabler/icons-react';
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";


const ChannelScreen = () => {
  const { getRequest, deleteRequest } = useRequests();
  const [data, updateData] = useState<JSX.Element[]>();
  const [opened, { open, close }] = useDisclosure(false);

  const handleDeleteChannel = async (id: number) => {
    await deleteRequest(URL_ALL_CHANNELS, id);
    getData();
  }

  const handleEditChannel = () => {
    console.log('EDIT CHANNEL');
  }

  const getData = async () => {
    const resp = await getRequest<ChannelType[]>(URL_ALL_CHANNELS);
    if (resp) {
      const rows = resp.map((element: ChannelType) => (
        <Table.Tr key={element.id}>
          <Table.Td>{element.id}</Table.Td>
          <Table.Td>{element.name}</Table.Td>
          <Table.Td>{element.description}</Table.Td>
          <Table.Td>
            <ActionIcon variant="light" color="red" aria-label="Settings" onClick={() => handleDeleteChannel(element.id)}>
              <IconTrashFilled style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon variant="light" aria-label="Settings" onClick={handleEditChannel}>
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
      name: '',
      description: '',
    },
  });

  return (
    <div>
      <Button variant="filled" onClick={open}>Create Channel</Button>
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
          <Button onClick={() => {console.log('SAVE');}}>
            Set random values
          </Button>
        </Group>
      </Modal>
    </div>
  );
};
  
export default ChannelScreen;