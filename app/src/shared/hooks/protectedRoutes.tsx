import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserType } from "../../modules/login/types/UserType";
import { URL_USER } from "../constants/urls";
import { getAuthorizationToken } from "../functions/connections/auth";
import { connectionAPIGetWithToken } from "../functions/connections/connectionAPI";
import { useGlobalContext } from "./useGlobalContext";
import { notifications } from "@mantine/notifications";

const ProtectedRoutes = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const token = getAuthorizationToken();
    const { setUser } = useGlobalContext();

    useEffect(() => {
        const checkAuthorization = async () => {
            if (!token) {
                setIsAuthorized(false);
                setIsLoading(false);
                notAuthorized();
                return;
            }

            try {
                const resp = await connectionAPIGetWithToken<UserType>(URL_USER);
                setUser(resp);
                setIsAuthorized(true);
            } catch {
                setIsAuthorized(false);
                notAuthorized();
                return;
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthorization();
    }, []);

    const notAuthorized = () => {
        notifications.show({
            title: 'Not Authorized.',
            message: '',
            color: 'red'
        })
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthorized) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;
