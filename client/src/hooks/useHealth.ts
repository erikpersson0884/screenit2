import { useEffect, useState } from "react";
import api from "@/api/axiosInstance";

const healthCheckInterval = 10000; // 10 seconds

export const useHealth = () => {
    const [status, setStatus] = useState<"loading" | "ok" | "down">("loading");

    useEffect(() => {
        const check = async () => {
            try {
                const res = await api.get("/health");

                setStatus(res.data.status === "ok" ? "ok" : "down");
            } catch {
                setStatus("down");
            }
        };

        check();

        const interval = setInterval(check, healthCheckInterval);

        return () => clearInterval(interval);
    }, []);

    return status;
};