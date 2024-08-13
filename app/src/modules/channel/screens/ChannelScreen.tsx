import { ActionIcon, Table } from "@mantine/core";

import { URL_ALL_CHANNELS } from "../../../shared/constants/urls.ts";
import { useRequests } from "../../../shared/hooks/useRequests.ts";
import { useEffect, useState } from "react";
import { ChannelType } from "../types/ChannelType.ts";
import { IconTrashFilled, IconEdit } from '@tabler/icons-react';


const ChannelScreen = () => {
  const { getRequest } = useRequests();
  const [data, updateData] = useState<JSX.Element[]>();

  useEffect(() => {
    const getData = async () => {
      const resp = await getRequest<ChannelType[]>(URL_ALL_CHANNELS);
      if (resp) {
        const rows = resp.map((element: ChannelType) => (
          <Table.Tr key={element.id}>
            <Table.Td>{element.id}</Table.Td>
            <Table.Td>{element.name}</Table.Td>
            <Table.Td>{element.description}</Table.Td>
            <Table.Td>
              <ActionIcon variant="light" color="red" aria-label="Settings">
                <IconTrashFilled style={{ width: '70%', height: '70%' }} stroke={1.5} />
              </ActionIcon>
              <ActionIcon variant="light" aria-label="Settings">
                <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
              </ActionIcon>
            </Table.Td>
          </Table.Tr>
        ));

        updateData(rows)
      }
    }
    getData();
  }, []);

  return (
    <div>
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
    </div>
  );
};
  
export default ChannelScreen;