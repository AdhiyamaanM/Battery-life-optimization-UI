import React, { useState } from "react";
import * as XLSX from "xlsx";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Modal,
  Box,
  IconButton,
  CircularProgress,
} from "@mui/material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import CloseIcon from "@mui/icons-material/Close";

const DataExplorer = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [chartType, setChartType] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const chartTypes = ["Line", "Bar", "Area", "Scatter", "Radar", "Pie"];

  // Handle file upload
  const handleFileUpload = (event) => {
    setLoading(true);
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      if (parsedData.length > 0) {
        setColumns(parsedData[0]);
        setData(
          parsedData
            .slice(1)
            .map((row) =>
              Object.fromEntries(
                parsedData[0].map((col, index) => [col, row[index]])
              )
            )
        );
      }
      setLoading(false);
    };
    reader.readAsBinaryString(file);
  };

  // Check if all selections are made
  const handleShowGraph = () => {
    if (xAxis && yAxis && chartType) {
      setOpenModal(true);
    } else {
      alert(
        "Please select X-Axis, Y-Axis, and Chart Type before viewing the graph."
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        width: "90%",
      }}
    >
      {/* File Upload */}
      <Button variant="contained" component="label" sx={{ marginBottom: 3 }}>
        Upload CSV / Excel
        <input
          type="file"
          hidden
          accept=".csv, .xlsx, .xls"
          onChange={handleFileUpload}
        />
      </Button>

      {/* Loading Indicator */}
      {loading && <CircularProgress sx={{ marginBottom: 2 }} />}

      {/* Dropdowns for X-Axis, Y-Axis, and Chart Type */}
      <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>X-Axis</InputLabel>
          <Select value={xAxis} onChange={(e) => setXAxis(e.target.value)}>
            {columns.map((col, index) => (
              <MenuItem key={index} value={col}>
                {col}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Y-Axis</InputLabel>
          <Select value={yAxis} onChange={(e) => setYAxis(e.target.value)}>
            {columns.map((col, index) => (
              <MenuItem key={index} value={col}>
                {col}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Chart Type</InputLabel>
          <Select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
          >
            {chartTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Button to open graph pop-up */}
        <Button variant="contained" onClick={handleShowGraph}>
          View Graph
        </Button>
      </Box>

      {/* Table Display */}
      {data.length > 0 && !loading && (
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <TableContainer
            component={Paper}
            sx={{ maxHeight: 300, overflowY: "auto", width: "80%" }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((col, index) => (
                    <TableCell key={index} sx={{ fontWeight: "bold" }}>
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.slice(0, 10).map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {columns.map((col, colIndex) => (
                      <TableCell key={colIndex}>{row[col]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* Modal for Graph */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "70vw",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          {/* Modal Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">
              {chartType} Chart ({xAxis} vs {yAxis})
            </Typography>
            <IconButton onClick={() => setOpenModal(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Graph Display */}
          <ResponsiveContainer width="100%" height={400}>
            {chartType === "Line" && (
              <LineChart data={data}>
                <XAxis dataKey={xAxis} />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#ccc" />
                <Line type="monotone" dataKey={yAxis} stroke="#8884d8" />
              </LineChart>
            )}
            {chartType === "Bar" && (
              <BarChart data={data}>
                <XAxis dataKey={xAxis} />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#ccc" />
                <Bar dataKey={yAxis} fill="#8884d8" />
              </BarChart>
            )}
            {chartType === "Area" && (
              <AreaChart data={data}>
                <XAxis dataKey={xAxis} />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#ccc" />
                <Area dataKey={yAxis} fill="#82ca9d" />
              </AreaChart>
            )}
            {chartType === "Scatter" && (
              <ScatterChart>
                <XAxis dataKey={xAxis} />
                <YAxis />
                <Tooltip />
                <Scatter data={data} dataKey={yAxis} fill="#8884d8" />
              </ScatterChart>
            )}
            {chartType === "Radar" && (
              <RadarChart data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey={xAxis} />
                <Radar name={yAxis} dataKey={yAxis} fill="#8884d8" />
              </RadarChart>
            )}
            {chartType === "Pie" && (
              <PieChart>
                <Tooltip />
                <Pie
                  data={data}
                  dataKey={yAxis}
                  nameKey={xAxis}
                  fill="#8884d8"
                  label
                />
              </PieChart>
            )}
          </ResponsiveContainer>
        </Box>
      </Modal>
    </Box>
  );
};

export default DataExplorer;
