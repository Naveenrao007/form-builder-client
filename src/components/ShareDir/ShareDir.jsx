import React, { useEffect, useState } from "react";
import { addTokenToHeader } from "../../Helper/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const ShareDir = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [accessGranted, setAccessGranted] = useState(false);
    const navigate = useNavigate();
    const headers = addTokenToHeader({ headers: {} });

    useEffect(() => {
        const validateAccess = async () => {
            setLoading(true);
            setError("");

            const queryParams = new URLSearchParams(window.location.search);
            const token = queryParams.get("token");
            const permission = queryParams.get("permission");
            console.log({ queryParams, token, permission });

            if (!token || !permission) {
                setError("Invalid or missing token and permission.");
                setLoading(false);
                return;
            }

            try {
                const res = await axios.post(
                    `${import.meta.env.VITE_BaseUrl}/dashboard/sharedirectorybyurl`,
                    { token, permission },
                    { headers }
                );

                if (res.status === 200) {
                    setAccessGranted(true);
                } else {
                    setError("Access denied. Invalid token or permission.");
                }
            } catch (err) {
                console.error("Error validating token:", err);
                setError("An error occurred while validating access.");
            } finally {
                setLoading(false);
            }
        };

        validateAccess();
    }, [headers]);

    useEffect(() => {
        if (loading) return; 
        if (error) {
            toast.error(error, { autoClose: 1400 });
        } else if (accessGranted) {
            toast.success("Directory successfully shared!", { autoClose: 1400 });
            navigate("/home");
        } else {
            toast.error("Directory access denied.", { autoClose: 1400 });
        }
    }, [loading, error, accessGranted, navigate]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return null;
};

export default ShareDir;
