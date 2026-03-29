import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    Alert,
    CircularProgress,
    Container,
} from "@mui/material";
import { useRoomService } from "../services/roomService";

const JoinRoomPage = () => {
    const navigate = useNavigate();
    const roomService = useRoomService();
    const [inviteCode, setInviteCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleJoinRoom = async () => {
        if (!inviteCode.trim()) {
            setError("Invite code is required");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const result = await roomService.joinRoom({ inviteCode });
            navigate(`/rooms/${result.roomId}`);
        } catch (err: any) {
            setError(err.message || "Failed to join room");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ py: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
                    Join a Room
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                    Enter the invite code shared by your friend to join a room.
                </Typography>

                <Paper elevation={2} sx={{ p: 4, mt: 4 }}>
                    {error && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                    )}

                    <TextField
                        fullWidth
                        label="Invite Code"
                        placeholder="Enter 8-character code"
                        value={inviteCode}
                        onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                        disabled={loading}
                        inputProps={{
                            maxLength: 8,
                            style: { textTransform: "uppercase", letterSpacing: 2 },
                        }}
                        sx={{ mb: 3 }}
                    />

                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            onClick={handleJoinRoom}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : "Join Room"}
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            fullWidth
                            onClick={() => navigate("/rooms")}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
                        Don't have an invite code? Ask your friend to create a room and share
                        the code with you.
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
};

export default JoinRoomPage;
