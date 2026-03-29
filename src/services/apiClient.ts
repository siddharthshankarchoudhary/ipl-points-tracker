import { useAuth } from "@clerk/clerk-react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export interface ApiError {
    message: string;
    status: number;
}

export class ApiClient {
    static async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${API_BASE_URL}${endpoint}`;

        try {
            const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    ...options.headers,
                },
                ...options,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw {
                    message: errorData.error || `HTTP ${response.status}`,
                    status: response.status,
                } as ApiError;
            }

            return await response.json();
        } catch (error) {
            if (error instanceof TypeError) {
                throw {
                    message: "Network error. Please check your connection.",
                    status: 0,
                } as ApiError;
            }
            throw error;
        }
    }

    static async get<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: "GET" });
    }

    static async post<T>(endpoint: string, data?: unknown): Promise<T> {
        return this.request<T>(endpoint, {
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    static async delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: "DELETE" });
    }

    static async put<T>(endpoint: string, data?: unknown): Promise<T> {
        return this.request<T>(endpoint, {
            method: "PUT",
            body: JSON.stringify(data),
        });
    }
}

// Hook to use API client with auth token
export const useApiClient = () => {
    const { getToken } = useAuth();

    const request = async <T,>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> => {
        const token = await getToken();
        return ApiClient.request<T>(endpoint, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${token}`,
            },
        });
    };

    return {
        get: <T,>(endpoint: string) => request<T>(endpoint, { method: "GET" }),
        post: <T,>(endpoint: string, data?: unknown) =>
            request<T>(endpoint, { method: "POST", body: JSON.stringify(data) }),
        delete: <T,>(endpoint: string) =>
            request<T>(endpoint, { method: "DELETE" }),
        put: <T,>(endpoint: string, data?: unknown) =>
            request<T>(endpoint, { method: "PUT", body: JSON.stringify(data) }),
    };
};
