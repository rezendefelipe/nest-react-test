import { Table } from "@mantine/core";


const ChannelScreen = () => {

  const elements = [
    { id: 1, name: 'name name', description: 'C' },
    { id: 2, name: 'name name', description: 'C' },
    { id: 3, name: 'name name', description: 'C' },
    { id: 4, name: 'name name', description: 'C' },
    { id: 5, name: 'name name', description: 'C' },
  ];

  const rows = elements.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.id}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.description}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Id</Table.Th>
          <Table.Th>Channel Name</Table.Th>
          <Table.Th>Channel Description</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};
  
export default ChannelScreen;