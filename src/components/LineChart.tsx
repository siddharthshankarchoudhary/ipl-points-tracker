import { useState, useEffect, useRef } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";

interface MatchData {
  Match: string;
  Arvind: number;
  Nirvikar: number;
  Siddharth: number;
}

const data: MatchData[] = [
  { Match: "", Arvind: 0, Nirvikar: 0, Siddharth: 0 },
  { Match: "KKR vs RCB", Arvind: 10, Nirvikar: -10, Siddharth: -10 },
  { Match: "SRH vs RR", Arvind: 10, Nirvikar: -10, Siddharth: 10 },
  { Match: "CSK vs MI", Arvind: 10, Nirvikar: 10, Siddharth: 10 },
  { Match: "LSG vs DC", Arvind: -10, Nirvikar: 10, Siddharth: 10 },
  { Match: "PBKS vs GT", Arvind: -10, Nirvikar: 10, Siddharth: -10 },
  { Match: "RR vs KKR", Arvind: 10, Nirvikar: -10, Siddharth: -10 },
  { Match: "SRH vs LSG", Arvind: -10, Nirvikar: 20, Siddharth: -10 },
  { Match: "CSK vs RCB", Arvind: 10, Nirvikar: -10, Siddharth: -10 },
  { Match: "GT vs MI", Arvind: 10, Nirvikar: -10, Siddharth: -10 },
  { Match: "DC vs SRH", Arvind: -10, Nirvikar: 10, Siddharth: -10 },
  { Match: "RR vs CSK", Arvind: -10, Nirvikar: -10, Siddharth: -10 },
  { Match: "MI vs KKR", Arvind: -10, Nirvikar: 10, Siddharth: -10 },
  { Match: "LSG vs PBKS", Arvind: -10, Nirvikar: 10, Siddharth: 10 },
  { Match: "RCB vs GT", Arvind: -10, Nirvikar: 10, Siddharth: 10 },
  { Match: "KKR vs SRH", Arvind: -10, Nirvikar: 10, Siddharth: -10 },
  { Match: "LSG vs MI", Arvind: 10, Nirvikar: -10, Siddharth: -10 },
  { Match: "CSK vs DC", Arvind: 10, Nirvikar: -10, Siddharth: -10 },
  { Match: "RR vs PBKS", Arvind: -10, Nirvikar: 10, Siddharth: -10 },
  { Match: "SRH vs GT", Arvind: -10, Nirvikar: 10, Siddharth: 10 },
  { Match: "MI vs RCB", Arvind: 10, Nirvikar: -10, Siddharth: -10 },
  { Match: "KKR vs LSG", Arvind: 10, Nirvikar: -10, Siddharth: 10 },
  { Match: "PBKS vs CSK", Arvind: 10, Nirvikar: -10, Siddharth: -10 },
  { Match: "GT vs RR", Arvind: 10, Nirvikar: -10, Siddharth: 10 },
  { Match: "RCB vs DC", Arvind: -10, Nirvikar: 10, Siddharth: 10 }, 
  { Match: "CSK vs KKR", Arvind: 10, Nirvikar: -10, Siddharth: -10 },   
  { Match: "GT vs LSG", Arvind: -10, Nirvikar: 10, Siddharth: -10 },   
  { Match: "SRH vs PBKS", Arvind: 10, Nirvikar: 10, Siddharth: -10 },
  { Match: "RR vs RCB", Arvind: 10, Nirvikar: -10, Siddharth: -10 },
  { Match: "DC vs MI", Arvind: -10, Nirvikar: 10, Siddharth: -10 },
  { Match: "LSG vs CSK", Arvind: -10, Nirvikar: 10, Siddharth: 10 }, 
];

const cumulativeData = data.map((match, index) => ({
  Match: match.Match,
  Arvind: data.slice(0, index + 1).reduce((sum, m) => sum + m.Arvind, 0),
  Nirvikar: data.slice(0, index + 1).reduce((sum, m) => sum + m.Nirvikar, 0),
  Siddharth: data.slice(0, index + 1).reduce((sum, m) => sum + m.Siddharth, 0),
}));

const latestScores = Object.fromEntries(
  Object.entries(cumulativeData[cumulativeData.length - 1]).filter(
    ([key]) => key !== "Match",
  ),
) as Record<keyof Omit<MatchData, "Match">, number>;

const sortedPlayers = (
  Object.keys(latestScores) as Array<keyof Omit<MatchData, "Match">>
)
  .map((name) => ({ name, score: latestScores[name] }))
  .sort((a, b) => b.score - a.score);

const GameScoreChart = () => {
  const theme = useTheme();

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState<number>(600); // fallback

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        setChartWidth(entries[0].contentRect.width);
      }
    });

    if (chartContainerRef.current) {
      observer.observe(chartContainerRef.current);
    }

    return () => {
      if (chartContainerRef.current) {
        observer.unobserve(chartContainerRef.current);
      }
    };
  }, []);

  return (
    <Box
      sx={{
        fontFamily: "Inter, sans-serif",
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
        px: 2,
        py: 4,
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          gap={2}
          mb={4}
          width="100%"
        >
          {sortedPlayers.map((player, index) => (
            <Box
              key={player.name}
              sx={{
                backgroundColor: "white",
                borderRadius: 3,
                p: 2,
                boxShadow: 3,
                textAlign: "center",
                minWidth: 120,
              }}
            >
              <Typography variant="h5" mb={0.5}>
                {["🥇", "🥈", "🥉"][index] || ""}
              </Typography>
              <Typography
                variant="h6"
                fontWeight="700"
                color={
                  index === 0 ? "#ff6b6b" : index === 1 ? "#6a89cc" : "#78e08f"
                }
              >
                {player.name}
              </Typography>
              <Typography variant="h4" fontWeight="800" color="#333">
                {player.score}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box
          ref={chartContainerRef}
          sx={{
            width: "100%",
            maxWidth: 1000,
            backgroundColor: "white",
            borderRadius: 3,
            p: 2,
            boxShadow: 3,
          }}
        >
          <LineChart
            xAxis={[
              {
                scaleType: "point",
                data: cumulativeData.map((d) => d.Match),
                tickLabelStyle: { fontSize: 12, textAnchor: "end" },
              },
            ]}
            series={sortedPlayers.map((player, index) => ({
              data: cumulativeData.map((d) => d[player.name]),
              label: player.name,
              color:
                index === 0 ? "#ff6b6b" : index === 1 ? "#6a89cc" : "#78e08f",
            }))}
            width={chartWidth}
            height={450}
          />
        </Box>

        {/* Points Table */}
        <TableContainer
          component={Paper}
          sx={{
            mt: 4,
            width: "100%",
            overflowX: "auto",
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              p: 2,
              textAlign: "center",
              fontWeight: "700",
              background: "linear-gradient(90deg, #ff9a9e, #fad0c4)",
              color: "#333",
            }}
          >
            🏆 मित्र IPL Points Table
          </Typography>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#fff3e0" }}>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Match
                </TableCell>
                {sortedPlayers.map((player) => (
                  <TableCell
                    key={player.name}
                    align="center"
                    sx={{ fontWeight: "bold" }}
                  >
                    {player.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#fff" : "#f5f5f5",
                    "&:hover": { backgroundColor: "#ffe0b2" },
                  }}
                >
                  <TableCell align="center">{row.Match || "Initial"}</TableCell>
                  {sortedPlayers.map((player) => (
                    <TableCell key={player.name} align="center">
                      {row[player.name]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default GameScoreChart;
