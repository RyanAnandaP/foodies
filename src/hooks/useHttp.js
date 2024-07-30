import { useState, useEffect, useCallback } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);

  const respData = await response.json();

  if (!response.ok) {
    throw new Error(respData.message || "something went wrong");
  }

  return respData;
}

export default function useHttp(url, config, initialData) {
  const [responseData, setResponseData] = useState(initialData);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const sendRequest = useCallback(
    async function sendRequest(data) {
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data });
        setResponseData(resData);
      } catch (error) {
        setError(error.message || "something went wrong");
      }
      setLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    responseData,
    loading,
    error,
    sendRequest,
  };
}
