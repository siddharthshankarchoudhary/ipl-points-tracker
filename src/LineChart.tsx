import { useState, useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const GameScoreChart = () => {
  const data = [
    { round: "", Arvind: 0, Nirvikar: 0, Siddharth: 0 },
    { round: "KKR vs RCB", Arvind: 10, Nirvikar: -10, Siddharth: -10 },
    { round: "SRH vs RR", Arvind: 20, Nirvikar: -20, Siddharth: 0 },
    { round: "CSK vs MI", Arvind: 30, Nirvikar: -10, Siddharth: 10 },
    { round: "LSG vs DC", Arvind: 20, Nirvikar: 0, Siddharth: 20 },
    { round: "PBKS vs GT", Arvind: 10, Nirvikar: 10, Siddharth: 10 },
    { round: "RR vs KKR", Arvind: 20, Nirvikar: -10, Siddharth: 0 },
  ];

  const [chartWidth, setChartWidth] = useState(window.innerWidth * 0.9);

  useEffect(() => {
    const handleResize = () => setChartWidth(window.innerWidth * 0.9);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          width: "90%",
          margin: "auto",
          backgroundColor: "white",
        }}
      >
        <LineChart
          xAxis={[{ scaleType: "point", data: data.map((d) => d.round) }]}
          series={[
            { data: data.map((d) => d.Arvind), label: "Arvind", color: "red" },
            { data: data.map((d) => d.Nirvikar), label: "Nirvikar", color: "blue" },
            { data: data.map((d) => d.Siddharth), label: "Siddharth", color: "green" },
          ]}
          width={chartWidth}
          height={400}
        />
      </div>
    </div>
  );
};

export default GameScoreChart;
