import { Container, Space, Text } from "@mantine/core";
import { useGlobalContext } from "../../../shared/hooks/useGlobalContext";

const SecretPage = () => {
    const { user } = useGlobalContext();

    return (
        <Container>
            <Text ta="center">{user?.name}, you are logged!!!</Text>
            <Space h="lg"></Space>
            <Container size="xs">
                <img src="https://picsum.photos/500/500" />
            </Container>
        </Container>
      );
}

export default SecretPage;