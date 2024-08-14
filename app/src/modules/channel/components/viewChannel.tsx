import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChannelType } from "../types/ChannelType";
import { URL_CHANNELS } from "../../../shared/constants/urls";
import { useRequests } from "../../../shared/hooks/useRequests";

const ViewChannel = () => {
    let { id } = useParams();
    const [data, setUpdateData] = useState<ChannelType>();
    const { getRequest } = useRequests();

    const getData = async () => {
        const resp = await getRequest<ChannelType>(`${URL_CHANNELS}/${id}`);
        if (resp) setUpdateData(resp)
    }

    useEffect(() => {
        getData();
    }, []);
    return (
        <>
            {data ? <p>Id: {data.id}</p> : null }
            {data ? <p>Name: {data.name}</p> : null }
            {data ? <p>Description: {data.description}</p> : null }
        </>
    )
}

export default ViewChannel