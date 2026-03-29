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

const CreateRoomPage = () => {
    const navigate = useNavigate();
    const roomService = useRoomService();
    const [roomName, setRoomName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCreateRoom = async () => {
        if (!roomName.trim()) {
            setError("Room name is required");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const room = await roomService.createRoom({ name: roomName });
            navigate(`/rooms/${room.id}`);
        } catch (err: any) {
            setError(err.message || "Failed to create room");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ py: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
                    Create a Room
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                    Create a new room to start a friendly betting group with your friends.
                </Typography>

                <Paper elevation={2} sx={{ p: 4, mt: 4 }}>
                    {error && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                    )}

                    <TextField
                        fullWidth
                        label="Room Name"
                        placeholder="e.g., Office Friends, College Buddies"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        disabled={loading}
                        sx={{ mb: 3 }}
                    />

                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            onClick={handleCreateRoom}
                            disabled={loading}
                            sx={{
                                position: "relative",
                            }}
                        >
                            {loading ? <CircularProgress size={24} /> : "Create Room"}
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
                        After creating, you'll receive an invite code to share with your friends.
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
};

export default CreateRoomPage;
