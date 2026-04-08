import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:8080/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const responseData = error?.response?.data;

    let firstFieldError;
    if (typeof responseData === "object" && responseData !== null && "fieldErrors" in responseData) {
      const rawFieldErrors = responseData.fieldErrors;
      if (typeof rawFieldErrors === "object" && rawFieldErrors !== null) {
        const firstValue = Object.values(rawFieldErrors)[0];
        if (typeof firstValue === "string") {
          firstFieldError = firstValue;
        }
      }
    }

    let backendMessage;
    if (typeof responseData === "object" && responseData !== null && "message" in responseData) {
      const rawMessage = responseData.message;
      if (typeof rawMessage === "string") {
        backendMessage = rawMessage;
      }
    }

    let backendError;
    if (typeof responseData === "object" && responseData !== null && "error" in responseData) {
      const rawError = responseData.error;
      if (typeof rawError === "string") {
        backendError = rawError;
      }
    }

    const fallbackMessage = typeof error?.message === "string" ? error.message : "Request failed.";
    const message = firstFieldError ?? backendMessage ?? backendError ?? fallbackMessage;

    return Promise.reject(new Error(message));
  }
);

export default apiClient;
