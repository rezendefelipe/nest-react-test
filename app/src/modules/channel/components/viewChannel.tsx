import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChannelType } from "../types/ChannelType";
import { URL_CHANNELS } from "../../../shared/constants/urls";
import { useRequests } from "../../../shared/hooks/useRequests";
import { Text, Card, Button } from '@mantine/core';
import classes from '../styles/cardView.module.css';
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from 'react-router-dom';

const ViewChannel = () => {
    let { id } = useParams();
    const [data, setUpdateData] = useState<ChannelType>();
    const { getRequest } = useRequests();
    const navigator = useNavigate();

    const getData = async () => {
        const resp = await getRequest<ChannelType>(`${URL_CHANNELS}/${id}`);
        if (resp) setUpdateData(resp)
    }

    useEffect(() => {
        getData();
    }, []);

    const handleGoBack = () => {
        navigator('/');
    }

    return (
        <>
            <Button
                variant="light"
                leftSection={<IconArrowLeft size={14} />}
                onClick={handleGoBack}
            >
                Go Back
            </Button>
            <Card withBorder p="xl" radius="md">
                <div className={classes.inner}>
                    <div>
                    <Text fz="xl" className={classes.label}>
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
        </>
    )
}

export default ViewChannel