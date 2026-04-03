import React, { useState, useEffect } from "react";
import { useRoomService, RoomSettings } from "../services/roomService";
import { Room } from "../services/types";
import { useUser } from "@clerk/clerk-react";

interface RoomSettingsProps {
    room: Room;
    onSettingsUpdate: (updatedRoom: Room) => void;
    onRoomDelete?: () => void;
}

export const RoomSettingsComponent: React.FC<RoomSettingsProps> = ({
    room,
    onSettingsUpdate,
    onRoomDelete,
}) => {
    const { user } = useUser();
    const roomService = useRoomService();
    const [isEditingSettings, setIsEditingSettings] = useState(false);
    const [settings, setSettings] = useState<RoomSettings>({
        allowPredictionChange: room.allowPredictionChange ?? true,
        predictionCutoffMinutes: room.predictionCutoffMinutes ?? 30,
        assignRandomPrediction: room.assignRandomPrediction ?? false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const isAdmin = user?.id === room.adminId;

    const handleSettingsChange = (key: keyof RoomSettings, value: any) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
        setError(null);
        setSuccessMessage(null);
    };

    const handleSaveSettings = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const updatedRoom = await roomService.updateRoomSettings(room.id, settings);
            onSettingsUpdate(updatedRoom);
            setSuccessMessage("Settings updated successfully!");
            setIsEditingSettings(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to update settings");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteRoom = async () => {
        if (!window.confirm("Are you sure you want to delete this room? This action cannot be undone.")) {
            return;
        }

        try {
            setIsLoading(true);
            setError(null);
            await roomService.deleteRoom(room.id);
            setSuccessMessage("Room deleted successfully!");
            if (onRoomDelete) {
                setTimeout(onRoomDelete, 1500);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to delete room");
        } finally {
            setIsLoading(false);
        }
    };

    if (!isAdmin) {
        return null;
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Room Settings</h2>
                <button
                    onClick={() => setIsEditingSettings(!isEditingSettings)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    {isEditingSettings ? "Cancel" : "Edit Settings"}
                </button>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}

            {successMessage && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                    {successMessage}
                </div>
            )}

            {isEditingSettings ? (
                <div className="space-y-4">
                    <div>
                        <label className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                checked={settings.allowPredictionChange}
                                onChange={(e) =>
                                    handleSettingsChange("allowPredictionChange", e.target.checked)
                                }
                                disabled={isLoading}
                                className="w-4 h-4"
                            />
                            <span>Allow users to change their predictions</span>
                        </label>
                    </div>

                    <div>
                        <label className="block mb-2">
                            Prediction cutoff time (minutes before match):
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="120"
                            value={settings.predictionCutoffMinutes}
                            onChange={(e) =>
                                handleSettingsChange("predictionCutoffMinutes", parseInt(e.target.value))
                            }
                            disabled={isLoading}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-sm text-gray-600 mt-1">
                            Users cannot make predictions within this time frame before the match starts.
                        </p>
                    </div>

                    <div>
                        <label className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                checked={settings.assignRandomPrediction}
                                onChange={(e) =>
                                    handleSettingsChange("assignRandomPrediction", e.target.checked)
                                }
                                disabled={isLoading}
                                className="w-4 h-4"
                            />
                            <span>Assign random predictions to users who haven't predicted</span>
                        </label>
                    </div>

                    <div className="flex gap-2 pt-4">
                        <button
                            onClick={handleSaveSettings}
                            disabled={isLoading}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition disabled:opacity-50"
                        >
                            {isLoading ? "Saving..." : "Save Settings"}
                        </button>
                        <button
                            onClick={handleDeleteRoom}
                            disabled={isLoading}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition disabled:opacity-50"
                        >
                            {isLoading ? "Deleting..." : "Delete Room"}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Allow prediction changes:</span>
                        <span className="font-medium">
                            {settings.allowPredictionChange ? "Yes" : "No"}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Prediction cutoff time:</span>
                        <span className="font-medium">{settings.predictionCutoffMinutes} minutes</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Random prediction assignment:</span>
                        <span className="font-medium">
                            {settings.assignRandomPrediction ? "Yes" : "No"}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};
