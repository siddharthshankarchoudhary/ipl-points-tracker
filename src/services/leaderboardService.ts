// src/services/leaderboardService.ts
import { useAuth } from "@clerk/clerk-react";
import { LeaderboardEntry } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const useLeaderboardService = () => {
    const { getToken } = useAuth();

    const request = async <T,>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> => {
        const token = await getToken();
        const url = `${API_BASE_URL}/leaderboard${endpoint}`;

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
        getLeaderboard: async (roomId: string): Promise<LeaderboardEntry[]> => {
            return request<LeaderboardEntry[]>(`/${roomId}`, { method: "GET" });
        },
    };
};
