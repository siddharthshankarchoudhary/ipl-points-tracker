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

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

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

// Fallback function to generate mock matches if backend is not available
export const fetchDailyMatches = async (): Promise<Match[]> => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const mockMatches: Match[] = [
        {
            id: "match_1",
            teamA: "Mumbai Indians",
            teamB: "Rajasthan Royals",
            status: "SCHEDULED",
            matchDate: new Date(today.getTime() + 4 * 60 * 60 * 1000).toISOString(),
            winnerTeam: undefined,
        },
        {
            id: "match_2",
            teamA: "Delhi Capitals",
            teamB: "Kolkata Knight Riders",
            status: "SCHEDULED",
            matchDate: new Date(today.getTime() + 8 * 60 * 60 * 1000).toISOString(),
            winnerTeam: undefined,
        },
    ];

    return mockMatches;
};

// Fetch a specific match by ID
export const fetchMatch = async (matchId: string): Promise<Match | null> => {
    const matches = await fetchDailyMatches();
    return matches.find((m) => m.id === matchId) || null;
};

// Get scheduled matches for today
export const getScheduledMatches = async (): Promise<Match[]> => {
    const matches = await fetchDailyMatches();
    return matches.filter((m) => m.status === "SCHEDULED");
};

// Get live matches
export const getLiveMatches = async (): Promise<Match[]> => {
    const matches = await fetchDailyMatches();
    return matches.filter((m) => m.status === "LIVE");
};

// Simulate match status update (used for testing)
export const updateMatchStatus = (
    match: Match,
    status: "SCHEDULED" | "LIVE" | "COMPLETED" | "ABANDONED"
): Match => {
    return { ...match, status };
};
