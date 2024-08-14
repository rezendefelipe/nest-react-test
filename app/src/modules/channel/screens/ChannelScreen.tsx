import { ActionIcon, Button, ScrollArea, Table } from "@mantine/core";

import { URL_CHANNELS } from "../../../shared/constants/urls.ts";
import { useRequests } from "../../../shared/hooks/useRequests.ts";
import { useEffect, useState } from "react";
import { ChannelType } from "../types/ChannelType.ts";
import DeleteComponent from "../components/deleteChannelComponent.tsx";

import FormCreateChannel from "../components/formChannel.tsx";
import { useGlobalContext } from "../../../shared/hooks/useGlobalContext.tsx";
import { IconEdit, IconEyeShare } from "@tabler/icons-react";
import { useNavigate } from 'react-router-dom';
import CustomModal from "../../../shared/components/customModal.tsx";
import cx from 'clsx';
import classes from '../styles/TableScrollArea.module.css';


const ChannelScreen = () => {
  const { getRequest } = useRequests();
  const [data, setUpdateData] = useState<JSX.Element[]>();
  const [editValues, setEditValues] = useState<{}>();
  const [scrolled, setScrolled] = useState(false);
  const { setModalStatus } = useGlobalContext();
  const navigator = useNavigate();

  const handleEditChannel = (id: number, name: string, description?: string) => {
    setEditValues({
      name: name,
      id: id,
      description: description ? description : "",
    });
    setModalStatus(true)
  }

  const handleViewChannel = (id: number): void => {
    navigator(`/view/${id}`);
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
            <ActionIcon variant="light" aria-label="Settings" onClick={() => handleViewChannel(element.id)}>
              <IconEyeShare style={{ width: '70%', height: '70%' }} stroke={1.5} />
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

  const openModalCreateChannel = () => {
    setEditValues({});
    setModalStatus(true);
  }

  return (
    <>
      <CustomModal>
        <FormCreateChannel editValues={editValues} getData={getData} />
      </CustomModal>
      <ScrollArea h={500} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
        <Button variant="filled" onClick={openModalCreateChannel}>Create Channel</Button>
        <Table miw={700} striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
            <Table.Tr>
              <Table.Th>Id</Table.Th>
              <Table.Th>Channel Name</Table.Th>
              <Table.Th>Channel Description</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{data}</Table.Tbody>
        </Table>
      </ScrollArea>
    </>
  );
};
  
export default ChannelScreen;