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
} from "@mui/material";
import { usePredictionService } from "../services/predictionService";
import { useMatchService } from "../services/matchService";
import { Prediction, Match } from "../services/types";
import { formatMatchDateTime } from "../utils/dateUtils";

interface PredictionsTabProps {
    roomId: string;
}

const PredictionsTab = ({ roomId }: PredictionsTabProps) => {
    const predictionService = usePredictionService();
    const matchService = useMatchService();
    const [predictions, setPredictions] = useState<Prediction[]>([]);
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [creatingPrediction, setCreatingPrediction] = useState<string | null>(
        null
    );

    useEffect(() => {
        loadData();
    }, [roomId]);

    const loadData = async () => {
        try {
            setLoading(true);
            setError(null);
            const [predictionsData, matchesData] = await Promise.all([
                predictionService.getPredictionsForRoom(roomId),
                matchService.getDailyMatches(),
            ]);
            setPredictions(predictionsData);
            setMatches(matchesData);
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
                        const existingPrediction = predictions.find(
                            (p) => p.matchId === match.id
                        );

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
                                    <Box sx={{ mb: 2, display: "flex", gap: 1 }}>
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
                                    </Box>

                                    <Typography variant="h6" gutterBottom fontWeight="bold">
                                        {match.teamA} vs {match.teamB}
                                    </Typography>

                                    {existingPrediction ? (
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
                                                {existingPrediction.selectedTeam}
                                            </Typography>
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
