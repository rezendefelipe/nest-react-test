import { Container, Space, Text } from "@mantine/core";
import { useEffect } from "react";
import { getAuthorizationToken, unsetAuthorizationToken } from "../../../shared/functions/connections/auth";
import { connectionAPIGetWithToken } from "../../../shared/functions/connections/connectionAPI";
import { UserType } from "../../login/types/UserType";
import { URL_USER } from "../../../shared/constants/urls";
import { useGlobalContext } from "../../../shared/hooks/useGlobalContext";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

const SecretPage = () => {
    const { setUser, user } = useGlobalContext();
    const navigator = useNavigate();

    const sendOut = () => {
        unsetAuthorizationToken();
        notifications.show({
            title: 'Not Authorized.',
            message: '',
            color: 'red'
        })
        navigator('/');
    }

    useEffect(() => {
        // TO-DO protext routes on isolated Component to be reused
        const token = getAuthorizationToken();
    
        if (token) {
          connectionAPIGetWithToken<UserType>(URL_USER)
            .then((resp) => {
              setUser(resp);
            }).catch(() => {
                sendOut();
            });
        } else {
            sendOut();
        }
    }, [])

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