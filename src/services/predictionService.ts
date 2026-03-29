// src/services/predictionService.ts
import { useAuth } from "@clerk/clerk-react";
import { Prediction, CreatePredictionRequest } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const usePredictionService = () => {
    const { getToken } = useAuth();

    const request = async <T,>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> => {
        const token = await getToken();
        const url = `${API_BASE_URL}/predictions${endpoint}`;

        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.error || `HTTP ${response.status}`);
        }

        return response.json();
    };

    return {
        createPrediction: async (
            data: CreatePredictionRequest
        ): Promise<Prediction> => {
            return request<Prediction>("/", {
                method: "POST",
                body: JSON.stringify(data),
            });
        },

        getPredictionsForRoom: async (roomId: string): Promise<Prediction[]> => {
            return request<Prediction[]>(`/${roomId}`, { method: "GET" });
        },

        deletePrediction: async (predictionId: string): Promise<{ message: string }> => {
            return request<{ message: string }>(`/${predictionId}`, {
                method: "DELETE",
            });
        },
    };
};
