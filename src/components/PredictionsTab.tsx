import { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    CircularProgress,
    Alert,
    Chip,
    Collapse,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from "@mui/icons-material";
import { usePredictionService } from "../services/predictionService";
import { useMatchService } from "../services/matchService";
import { useRoomService } from "../services/roomService";
import { Prediction, Match } from "../services/types";
import { formatMatchDateTime } from "../utils/dateUtils";
import { useUser } from "@clerk/clerk-react";

interface PredictionsTabProps {
    roomId: string;
}

const PredictionsTab = ({ roomId }: PredictionsTabProps) => {
    const { user } = useUser();
    const predictionService = usePredictionService();
    const matchService = useMatchService();
    const roomService = useRoomService();
    const [predictions, setPredictions] = useState<Prediction[]>([]);
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [creatingPrediction, setCreatingPrediction] = useState<string | null>(null);
    const [expandedMatch, setExpandedMatch] = useState<string | null>(null);
    const [room, setRoom] = useState<any>(null);

    useEffect(() => {
        loadData();
    }, [roomId]);

    const loadData = async () => {
        try {
            setLoading(true);
            setError(null);
            const [predictionsData, matchesData, roomData] = await Promise.all([
                predictionService.getPredictionsForRoom(roomId),
                matchService.getDailyMatches(),
                roomService.getRoomDetails(roomId),
            ]);
            setPredictions(predictionsData);
            setMatches(matchesData);
            setRoom(roomData);
        } catch (err: any) {
            setError(err.message || "Failed to load predictions");
        } finally {
            setLoading(false);
        }
    };

    const handleMakePrediction = async (matchId: string, selectedTeam: string) => {
        setCreatingPrediction(matchId);
        try {
            await predictionService.createPrediction({
                roomId,
                matchId,
                selectedTeam,
            });
            await loadData();
        } catch (err: any) {
            setError(err.message || "Failed to create prediction");
        } finally {
            setCreatingPrediction(null);
        }
    };

    const handleDeletePrediction = async (predictionId: string) => {
        if (!window.confirm("Are you sure you want to delete this prediction?")) {
            return;
        }

        try {
            await predictionService.deletePrediction(predictionId);
            await loadData();
        } catch (err: any) {
            setError(err.message || "Failed to delete prediction");
        }
    };

    const getMatchPredictions = (matchId: string) => {
        return predictions.filter((p) => p.matchId === matchId);
    };

    const getUserPredictionForMatch = (matchId: string) => {
        return predictions.find((p) => p.matchId === matchId && p.userId === user?.id);
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

    return (
        <Box>
            {matches.length === 0 ? (
                <Alert severity="info">No matches scheduled for today</Alert>
            ) : (
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                        gap: 3,
                    }}
                >
                    {matches.map((match) => {
                        const userPrediction = getUserPredictionForMatch(match.id);
                        const matchPredictions = getMatchPredictions(match.id);
                        const isExpanded = expandedMatch === match.id;

                        return (
                            <Card
                                key={match.id}
                                sx={{
                                    height: "100%",
                                    backgroundColor:
                                        match.status !== "SCHEDULED" ? "#f5f5f5" : undefined,
                                }}
                            >
                                <CardContent>
                                    <Box sx={{ mb: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
                                        <Chip
                                            label={match.status}
                                            size="small"
                                            color={
                                                match.status === "SCHEDULED" ? "default" : "warning"
                                            }
                                        />
                                        <Chip
                                            label={formatMatchDateTime(match.matchDate)}
                                            size="small"
                                            variant="outlined"
                                        />
                                        {matchPredictions.length > 0 && (
                                            <Chip
                                                label={`${matchPredictions.length} prediction${matchPredictions.length !== 1 ? "s" : ""}`}
                                                size="small"
                                                color="primary"
                                                variant="outlined"
                                            />
                                        )}
                                    </Box>

                                    <Typography variant="h6" gutterBottom fontWeight="bold">
                                        {match.teamA} vs {match.teamB}
                                    </Typography>

                                    {match.status === "COMPLETED" && match.winnerTeam && (
                                        <Box sx={{ mt: 2, p: 1.5, backgroundColor: "#fff3cd", borderRadius: 1 }}>
                                            <Typography variant="body2" color="text.secondary">
                                                Winner: <strong>{match.winnerTeam}</strong>
                                            </Typography>
                                        </Box>
                                    )}

                                    {userPrediction ? (
                                        <Box
                                            sx={{
                                                p: 2,
                                                backgroundColor: "#e8f5e9",
                                                borderRadius: 1,
                                                mt: 2,
                                            }}
                                        >
                                            <Typography variant="body2" color="text.secondary">
                                                Your prediction:
                                            </Typography>
                                            <Typography variant="h6" color="success.main">
                                                {userPrediction.selectedTeam}
                                            </Typography>
                                            {match.status === "SCHEDULED" && (
                                                <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        onClick={() =>
                                                            handleMakePrediction(match.id, match.teamA)
                                                        }
                                                        disabled={creatingPrediction === match.id}
                                                    >
                                                        Change to {match.teamA}
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        onClick={() =>
                                                            handleMakePrediction(match.id, match.teamB)
                                                        }
                                                        disabled={creatingPrediction === match.id}
                                                    >
                                                        Change to {match.teamB}
                                                    </Button>
                                                    <Button
                                                        color="error"
                                                        size="small"
                                                        onClick={() => handleDeletePrediction(userPrediction.id)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </Box>
                                            )}
                                        </Box>
                                    ) : match.status === "SCHEDULED" ? (
                                        <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                                            <Button
                                                variant="outlined"
                                                fullWidth
                                                onClick={() =>
                                                    handleMakePrediction(match.id, match.teamA)
                                                }
                                                disabled={creatingPrediction === match.id}
                                            >
                                                {match.teamA}
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                fullWidth
                                                onClick={() =>
                                                    handleMakePrediction(match.id, match.teamB)
                                                }
                                                disabled={creatingPrediction === match.id}
                                            >
                                                {match.teamB}
                                            </Button>
                                        </Box>
                                    ) : (
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                                            Predictions closed for this match
                                        </Typography>
                                    )}

                                    {matchPredictions.length > 0 && (
                                        <Box sx={{ mt: 3, pt: 2, borderTop: "1px solid #e0e0e0" }}>
                                            <Button
                                                size="small"
                                                fullWidth
                                                onClick={() =>
                                                    setExpandedMatch(isExpanded ? null : match.id)
                                                }
                                                endIcon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                            >
                                                Show all predictions ({matchPredictions.length})
                                            </Button>
                                            <Collapse in={isExpanded} timeout="auto">
                                                <Box sx={{ mt: 2, space: 1 }}>
                                                    {matchPredictions.map((pred) => (
                                                        <Box
                                                            key={pred.id}
                                                            sx={{
                                                                p: 1.5,
                                                                mb: 1,
                                                                backgroundColor: "#f5f5f5",
                                                                borderRadius: 1,
                                                                borderLeft:
                                                                    pred.userId === user?.id
                                                                        ? "3px solid #4caf50"
                                                                        : "3px solid #999",
                                                            }}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    display: "flex",
                                                                    justifyContent: "space-between",
                                                                    alignItems: "center",
                                                                }}
                                                            >
                                                                <Typography variant="body2">
                                                                    <strong>{pred.userName}</strong>
                                                                    {pred.userId === user?.id && (
                                                                        <Chip
                                                                            label="You"
                                                                            size="small"
                                                                            sx={{ ml: 1, height: "auto" }}
                                                                        />
                                                                    )}
                                                                </Typography>
                                                                <Typography
                                                                    variant="body2"
                                                                    sx={{
                                                                        fontWeight: "bold",
                                                                        color:
                                                                            pred.selectedTeam === match.winnerTeam
                                                                                ? "#4caf50"
                                                                                : "#999",
                                                                    }}
                                                                >
                                                                    {pred.selectedTeam}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    ))}
                                                </Box>
                                            </Collapse>
                                        </Box>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </Box>
            )}
        </Box>
    );
};

export default PredictionsTab;
