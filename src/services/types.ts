// src/services/types.ts

export interface Room {
    id: string;
    name: string;
    adminId: string;
    inviteCode: string;
    createdAt: string;
    membersCount: number;
    members: RoomMember[];
}

export interface RoomMember {
    userId: string;
    userName: string;
    joinedAt: string;
}

export interface Match {
    id: string;
    teamA: string;
    teamB: string;
    status: "SCHEDULED" | "LIVE" | "COMPLETED" | "ABANDONED";
    matchDate: string;
    winnerTeam?: string;
}

export interface Prediction {
    id: string;
    userId: string;
    userName: string;
    matchId: string;
    match: Match;
    selectedTeam: string;
    createdAt: string;
}

export interface LeaderboardEntry {
    userId: string;
    userName: string;
    points: number;
    rank: number;
    joinedAt: string;
}

export interface CreateRoomRequest {
    name: string;
}

export interface JoinRoomRequest {
    inviteCode: string;
}

export interface CreatePredictionRequest {
    roomId: string;
    matchId: string;
    selectedTeam: string;
}

export type MatchStatus = "SCHEDULED" | "LIVE" | "COMPLETED" | "ABANDONED";
