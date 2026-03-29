// src/services/matchService.ts
import { useAuth } from "@clerk/clerk-react";
import { Match } from "./types";

// Mock IPL teams data
export const IPL_TEAMS = [
    "Chennai Super Kings",
    "Delhi Capitals",
    "Gujarat Titans",
    "Kolkata Knight Riders",
    "Lucknow Super Giants",
    "Mumbai Indians",
    "Rajasthan Royals",
    "Royal Challengers Bangalore",
    "Sunrisers Hyderabad",
];

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export const useMatchService = () => {
    const { getToken } = useAuth();

    const request = async <T,>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> => {
        const token = await getToken();
        const url = `${API_BASE_URL}/matches${endpoint}`;

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
        getDailyMatches: async (): Promise<Match[]> => {
            return request<Match[]>("/", { method: "GET" });
        },

        getMatch: async (matchId: string): Promise<Match> => {
            return request<Match>(`/${matchId}`, { method: "GET" });
        },
    };
};

// Simulate match status update (used for testing)
export const updateMatchStatus = (
    match: Match,
    status: "SCHEDULED" | "LIVE" | "COMPLETED" | "ABANDONED"
): Match => {
    return { ...match, status };
};
