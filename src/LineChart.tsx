import { useState, useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

const data = [
  { Match: "", Arvind: 0, Nirvikar: 0, Siddharth: 0 },
  { Match: "KKR vs RCB", Arvind: 10, Nirvikar: -10, Siddharth: -10 },
  { Match: "SRH vs RR", Arvind: 20, Nirvikar: -20, Siddharth: 0 },
  { Match: "CSK vs MI", Arvind: 30, Nirvikar: -10, Siddharth: 10 },
  { Match: "LSG vs DC", Arvind: 20, Nirvikar: 0, Siddharth: 20 },
  { Match: "PBKS vs GT", Arvind: 10, Nirvikar: 10, Siddharth: 10 },
  { Match: "RR vs KKR", Arvind: 20, Nirvikar: -10, Siddharth: 0 },
];

const latestScores = data[data.length - 1];

// Sorting players by their latest scores in descending order
const sortedPlayers = Object.keys(latestScores)
  .filter((key) => key !== "Match")
  .map((name) => ({ name, score: latestScores[name] }))
  .sort((a, b) => b.score - a.score);

const GameScoreChart = () => {
  const [chartWidth, setChartWidth] = useState(window.innerWidth * 0.9);

  useEffect(() => {
    const handleResize = () => setChartWidth(window.innerWidth * 0.9);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ fontFamily: "Inter, sans-serif", backgroundColor: "#f5f7fa", minHeight: "100vh", padding: "20px" }}>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>

        {/* Current Points Section - Sorted */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          {sortedPlayers.map((player, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "15px 25px",
                boxShadow: "0px 6px 15px rgba(0,0,0,0.1)",
                textAlign: "center",
                minWidth: "120px",
                transition: "transform 0.2s",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "700",
                  color: index === 0 ? "#ff6b6b" : index === 1 ? "#6a89cc" : "#78e08f",
                }}
              >
                {player.name}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "800",
                  color: "#333",
                }}
              >
                {player.score}
              </Typography>
            </div>
          ))}
        </div>

        {/* Line Chart */}
        <div style={{ width: "90%", backgroundColor: "white", borderRadius: "12px", padding: "20px", boxShadow: "0px 6px 15px rgba(0,0,0,0.15)" }}>
          <LineChart
            xAxis={[
              {
                scaleType: "point",
                data: data.map((d) => d.Match),
                tickLabelStyle: { fontSize: 12, textAnchor: "end" },
              },
            ]}
            series={sortedPlayers.map((player, index) => ({
              data: data.map((d) => d[player.name]),
              label: player.name,
              color: index === 0 ? "#ff6b6b" : index === 1 ? "#6a89cc" : "#78e08f",
            }))}
            width={chartWidth}
            height={450}
          />
        </div>

        {/* Points Table */}
        <TableContainer
          component={Paper}
          sx={{
            marginTop: 4,
            maxWidth: 800,
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0px 6px 15px rgba(0,0,0,0.15)",
          }}
        >
          <Typography variant="h6" sx={{ padding: 2, textAlign: "center", fontWeight: "700", background: "linear-gradient(90deg, #ff9a9e, #fad0c4)", color: "#333" }}>
            🏆 मित्र IPL Points Table
          </Typography>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#fff3e0" }}>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>Match</TableCell>
                {sortedPlayers.map((player, index) => (
                  <TableCell key={index} align="center" sx={{ fontWeight: "bold" }}>
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
                    transition: "all 0.2s",
                    "&:hover": { backgroundColor: "#ffe0b2" },
                  }}
                >
                  <TableCell align="center">{row.Match || "Initial"}</TableCell>
                  {sortedPlayers.map((player, i) => (
                    <TableCell key={i} align="center">{row[player.name]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default GameScoreChart;
