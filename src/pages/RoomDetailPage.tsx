import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Container,
    Typography,
    Button,
    Tabs,
    Tab,
    CircularProgress,
    Alert,
} from "@mui/material";
import { ArrowBack as BackIcon } from "@mui/icons-material";
import { useRoomService } from "../services/roomService";
import { Room } from "../services/types";
import PredictionsTab from "../components/PredictionsTab";
import LeaderboardTab from "../components/LeaderboardTab";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`room-tabpanel-${index}`}
            aria-labelledby={`room-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
        </div>
    );
}

const RoomDetailPage = () => {
    const { roomId } = useParams<{ roomId: string }>();
    const navigate = useNavigate();
    const roomService = useRoomService();

    const [room, setRoom] = useState<Room | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        loadRoom();
    }, [roomId]);

    const loadRoom = async () => {
        if (!roomId) return;

        try {
            setLoading(true);
            setError(null);
            const data = await roomService.getRoomDetails(roomId);
            setRoom(data);
        } catch (err: any) {
            setError(err.message || "Failed to load room");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Container sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                <CircularProgress />
            </Container>
        );
    }

    if (!room) {
        return (
            <Container sx={{ py: 4 }}>
                <Alert severity="error">Room not found</Alert>
                <Button onClick={() => navigate("/rooms")} sx={{ mt: 2 }}>
                    Back to Rooms
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 4 }}>
                <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2 }}>
                    <Button
                        startIcon={<BackIcon />}
                        onClick={() => navigate("/rooms")}
                        variant="text"
                    >
                        Back
                    </Button>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h3" component="h1" fontWeight="bold">
                            {room.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {room.membersCount} member{room.membersCount !== 1 ? "s" : ""}
                            {" • "}
                            Invite code: <strong>{room.inviteCode}</strong>
                        </Typography>
                    </Box>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <Tabs
                    value={tabValue}
                    onChange={(_, value) => setTabValue(value)}
                    aria-label="room tabs"
                    sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}
                >
                    <Tab label="Predictions" id="room-tab-0" aria-controls="room-tabpanel-0" />
                    <Tab label="Leaderboard" id="room-tab-1" aria-controls="room-tabpanel-1" />
                </Tabs>

                <TabPanel value={tabValue} index={0}>
                    <PredictionsTab roomId={roomId!} />
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                    <LeaderboardTab roomId={roomId!} />
                </TabPanel>
            </Box>
        </Container>
    );
};

export default RoomDetailPage;
