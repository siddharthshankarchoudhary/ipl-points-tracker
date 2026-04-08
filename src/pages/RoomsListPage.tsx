import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Container,
    Typography,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Alert,
    TextField,
    IconButton,
    Tooltip,
} from "@mui/material";
import {
    AddCircle as AddIcon,
    Login as JoinIcon,
    GetApp as CopyIcon,
} from "@mui/icons-material";
import { useRoomService } from "../services/roomService";
import { Room } from "../services/types";

const RoomsListPage = () => {
    const navigate = useNavigate();
    const roomService = useRoomService();
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

    useEffect(() => {
        loadRooms();
    }, []);

    const loadRooms = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await roomService.getUserRooms();
            setRooms(data);
        } catch (err: any) {
            setError(err.message || "Failed to load rooms");
        } finally {
            setLoading(false);
        }
    };

    const handleCopyInviteCode = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopyFeedback(code);
        setTimeout(() => setCopyFeedback(null), 2000);
    };

    if (loading) {
        return (
            <Container sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 4 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 4,
                    }}
                >
                    <Box>
                        <Typography variant="h3" component="h1" fontWeight="bold">
                            My Rooms
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {rooms.length} room{rooms.length !== 1 ? "s" : ""}
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => navigate("/create-room")}
                        >
                            Create Room
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<JoinIcon />}
                            onClick={() => navigate("/join-room")}
                        >
                            Join Room
                        </Button>
                    </Box>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                {rooms.length === 0 ? (
                    <Card sx={{ textAlign: "center", py: 6 }}>
                        <Typography variant="h6" color="text.secondary">
                            No rooms yet
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Create a new room or join an existing one to get started
                        </Typography>
                    </Card>
                ) : (
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                sm: "repeat(2, 1fr)",
                                md: "repeat(3, 1fr)",
                            },
                            gap: 3,
                        }}
                    >
                        {rooms.map((room) => (
                            <Card
                                key={room.id}
                                sx={{
                                    cursor: "pointer",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        boxShadow: 6,
                                        transform: "translateY(-4px)",
                                    },
                                }}
                                onClick={() => navigate(`/rooms/${room.id}`)}
                            >
                                <CardContent>
                                    <Typography variant="h6" gutterBottom fontWeight="bold">
                                        {room.name}
                                    </Typography>

                                    <Box sx={{ my: 2 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Members: {room.membersCount}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Created: {new Date(room.createdAt).toLocaleDateString()}
                                        </Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                            mt: 2,
                                            p: 1.5,
                                            backgroundColor: "#f5f5f5",
                                            borderRadius: 1,
                                        }}
                                    >
                                        <TextField
                                            size="small"
                                            value={room.inviteCode}
                                            disabled
                                            variant="standard"
                                            sx={{ flex: 1 }}
                                            slotProps={{
                                                input: {
                                                    style: {
                                                        fontSize: 12,
                                                        letterSpacing: 1,
                                                        fontWeight: "bold",
                                                    },
                                                },
                                            }}
                                        />
                                        <Tooltip title="Copy invite code">
                                            <IconButton
                                                size="small"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleCopyInviteCode(room.inviteCode);
                                                }}
                                            >
                                                <CopyIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>

                                    {copyFeedback === room.inviteCode && (
                                        <Typography
                                            variant="caption"
                                            sx={{ color: "green", display: "block", mt: 1 }}
                                        >
                                            Copied!
                                        </Typography>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default RoomsListPage;
