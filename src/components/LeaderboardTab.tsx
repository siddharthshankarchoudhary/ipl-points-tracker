import { useEffect, useState } from "react";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Alert,
    Chip,
    Typography,
} from "@mui/material";
import {
    EmojiEvents as TrophyIcon,
} from "@mui/icons-material";
import { useLeaderboardService } from "../services/leaderboardService";
import { LeaderboardEntry } from "../services/types";

interface LeaderboardTabProps {
    roomId: string;
}

const LeaderboardTab = ({ roomId }: LeaderboardTabProps) => {
    const leaderboardService = useLeaderboardService();
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadLeaderboard();
    }, [roomId]);

    const loadLeaderboard = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await leaderboardService.getLeaderboard(roomId);
            setLeaderboard(data);
        } catch (err: any) {
            setError(err.message || "Failed to load leaderboard");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    if (leaderboard.length === 0) {
        return <Alert severity="info">No predictions yet</Alert>;
    }

    const getMedalEmoji = (rank: number) => {
        switch (rank) {
            case 1:
                return "🥇";
            case 2:
                return "🥈";
            case 3:
                return "🥉";
            default:
                return "";
        }
    };

    const getPointsColor = (points: number) => {
        if (points > 0) return "success";
        if (points < 0) return "error";
        return "default";
    };

    return (
        <Box>
            {/* Top 3 display */}
            {leaderboard.slice(0, 3).length > 0 && (
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                        gap: 2,
                        mb: 4,
                    }}
                >
                    {leaderboard.slice(0, 3).map((entry) => (
                        <Paper
                            key={entry.userId}
                            sx={{
                                p: 2,
                                textAlign: "center",
                                backgroundColor:
                                    entry.rank === 1
                                        ? "#fff3cd"
                                        : entry.rank === 2
                                            ? "#e8e8e8"
                                            : "#ffe8d6",
                                borderLeft: entry.rank === 1 ? "4px solid #ffc107" : "none",
                            }}
                        >
                            <Typography variant="h4" sx={{ mb: 1 }}>
                                {getMedalEmoji(entry.rank)}
                            </Typography>
                            <Typography variant="h6" fontWeight="bold">
                                {entry.userName}
                            </Typography>
                            <Typography
                                variant="h4"
                                sx={{
                                    mt: 1,
                                    color:
                                        entry.points > 0
                                            ? "#4caf50"
                                            : entry.points < 0
                                                ? "#f44336"
                                                : "#666",
                                }}
                            >
                                {entry.points >= 0 ? "+" : ""}{entry.points}
                            </Typography>
                        </Paper>
                    ))}
                </Box>
            )}

            {/* Full leaderboard table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                        <TableRow>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                Rank
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Player</TableCell>
                            <TableCell align="right" sx={{ fontWeight: "bold" }}>
                                Points
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {leaderboard.map((entry) => (
                            <TableRow
                                key={entry.userId}
                                sx={{
                                    backgroundColor:
                                        entry.rank === 1
                                            ? "#f9f9f9"
                                            : entry.rank === 2
                                                ? "#f5f5f5"
                                                : undefined,
                                    "&:hover": {
                                        backgroundColor: "#fafafa",
                                    },
                                }}
                            >
                                <TableCell align="center">
                                    <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                                        <Typography sx={{ fontSize: 18 }}>
                                            {getMedalEmoji(entry.rank)}
                                        </Typography>
                                        <Chip
                                            label={`#${entry.rank}`}
                                            size="small"
                                            variant="outlined"
                                        />
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" fontWeight="500">
                                        {entry.userName}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Chip
                                        label={`${entry.points >= 0 ? "+" : ""}${entry.points}`}
                                        color={getPointsColor(entry.points) as any}
                                        variant="outlined"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default LeaderboardTab;
