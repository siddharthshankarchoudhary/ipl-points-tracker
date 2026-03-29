// src/services/roomService.ts
import { useAuth } from "@clerk/clerk-react";
import { Room, CreateRoomRequest, JoinRoomRequest } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const useRoomService = () => {
    const { getToken } = useAuth();

    const request = async <T,>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> => {
        const token = await getToken();
        const url = `${API_BASE_URL}/rooms${endpoint}`;

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
        createRoom: async (data: CreateRoomRequest): Promise<Room> => {
            return request<Room>("/", {
                method: "POST",
                body: JSON.stringify(data),
            });
        },

        joinRoom: async (data: JoinRoomRequest): Promise<{ message: string; roomId: string }> => {
            return request<{ message: string; roomId: string }>("/join", {
                method: "POST",
                body: JSON.stringify(data),
            });
        },

        getUserRooms: async (): Promise<Room[]> => {
            return request<Room[]>("/", { method: "GET" });
        },

        getRoomDetails: async (roomId: string): Promise<Room> => {
            return request<Room>(`/${roomId}`, { method: "GET" });
        },
    };
};
