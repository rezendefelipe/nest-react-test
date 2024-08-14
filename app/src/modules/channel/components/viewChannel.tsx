import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChannelType } from "../types/ChannelType";
import { URL_CHANNELS } from "../../../shared/constants/urls";
import { useRequests } from "../../../shared/hooks/useRequests";
import { Text, Card, Button, Container, Space, Group, Loader } from '@mantine/core';
import classes from '../styles/cardView.module.css';
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from 'react-router-dom';

const ViewChannel = () => {
    let { id } = useParams();
    const [data, setUpdateData] = useState<ChannelType>();
    const { getRequest } = useRequests();
    const [loading, setLoading] = useState(true);
    const navigator = useNavigate();

    const getData = async () => {
        const resp = await getRequest<ChannelType>(`${URL_CHANNELS}/${id}`);
        if (resp) setUpdateData(resp)
    }

    useEffect(() => {
        getData();
        setLoading(false);
    }, []);

    const handleGoBack = () => {
        navigator('/');
    }

    return (
        <>
            <Container>
                <Button
                    variant="light"
                    leftSection={<IconArrowLeft size={14} />}
                    onClick={handleGoBack}
                >
                    Go Back
                </Button>
                <Space h="xl" />
                <>
                    {
                        loading
                        ? <Group justify="center"><Loader color="blue" data-testid="loader"/></Group>
                        : <Card withBorder p="xl" radius="md">
                            <div className={classes.inner}>
                                <div>
                                    <Text fz="xl" data-testid="name" className={classes.label}>
                                        Name: {data ? <>{data.name}</> : null }
                                    </Text>
                                    <div>
                                        <Text fz="xs" c="dimmed">
                                            Description: {data ? <>{data.description}</> : null }
                                        </Text>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    }
                </>
            </Container>
        </>
    )
}

export default ViewChannel