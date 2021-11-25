import { useCallback, useState } from "react";

const useHttp = (applyData) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (requestConfig, applyData) => {
        setIsLoading(true);
        setError(null);
        try {
            console.log(requestConfig, applyData);
            const request = await fetch(requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : "GET",
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
                headers: requestConfig.headers ? requestConfig.headers : {},
            });
            console.log("runs");
            if (!request.ok) throw new Error("Request failed");
            const data = await request.json();
            applyData(data);
        } catch (err) {
            setError(err || "something went wrong");
        }
        setIsLoading(false);
    }, []);
    return {
        isLoading,
        error,
        sendRequest,
    };
};

export default useHttp;