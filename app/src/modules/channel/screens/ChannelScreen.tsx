import { ActionIcon, Table } from "@mantine/core";

import { URL_CHANNELS } from "../../../shared/constants/urls.ts";
import { useRequests } from "../../../shared/hooks/useRequests.ts";
import { useEffect, useState } from "react";
import { ChannelType } from "../types/ChannelType.ts";
import { IconEdit } from '@tabler/icons-react';
// import { useDisclosure } from "@mantine/hooks";
// import { useForm } from "@mantine/form";
import DeleteComponent from "../components/deleteComponent.tsx";
import CustomModal from "../../../shared/components/CustomModal.tsx";
import FormCreateChannel from "../../../shared/components/formCreateChannel.tsx";


const ChannelScreen = () => {
  const { getRequest, postRequest, putRequest } = useRequests();
  const [data, setUpdateData] = useState<JSX.Element[]>();

  const handleEditChannel = (id: number, name: string, description?: string) => {
    // form.setFieldValue('name', name);
    // form.setFieldValue('description', description || '');
    // form.setFieldValue('id', id)
    // open();
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

      setUpdateData(rows)
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <CustomModal>
        <FormCreateChannel getData={getData} />
      </CustomModal>
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
    </>
  );
};
  
export default ChannelScreen;