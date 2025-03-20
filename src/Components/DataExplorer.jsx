import React, { useState, useEffect } from "react";
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
  TablePagination,
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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
const API_URL = "http://localhost:8000/data"; // Update with your FastAPI endpoint
const DataExplorer = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [chartType, setChartType] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [expanded, setExpanded] = useState(false);
  const chartTypes = ["Line", "Bar", "Area", "Scatter", "Radar", "Pie"];

  // // Handle file upload
  // const handleFileUpload = (event) => {
  //   setLoading(true);
  //   const file = event.target.files[0];
  //   if (!file) return;
  //   const reader = new FileReader();
  //   reader.onload = (e) => {
  //     const binaryStr = e.target.result;
  //     const workbook = XLSX.read(binaryStr, { type: "binary" });
  //     const sheetName = workbook.SheetNames[0];
  //     const sheet = workbook.Sheets[sheetName];
  //     const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  //     if (parsedData.length > 0) {
  //       setColumns(parsedData[0]);
  //       setData(
  //         parsedData
  //           .slice(1)
  //           .map((row) =>
  //             Object.fromEntries(
  //               parsedData[0].map((col, index) => [col, row[index]])
  //             )
  //           )
  //       );
  //     }
  //     setLoading(false);
  //   };
  //   reader.readAsBinaryString(file);
  // };

  // // Function to format timestamp as 'YYYY-MM-DD'
  // const formatDate = (value) => {
  //   if (!value) return value;

  //   // Handle Excel serial numbers (numeric timestamps)
  //   if (!isNaN(value) && value > 10000) {
  //     const excelEpoch = new Date(1899, 11, 30); // Excel's base date
  //     const date = new Date(excelEpoch.getTime() + value * 86400000);
  //     return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  //   }

  //   // If it's already a date string, return it as is
  //   const parsedDate = Date.parse(value);
  //   if (!isNaN(parsedDate)) {
  //     return new Date(parsedDate).toISOString().split("T")[0]; // Ensure consistency
  //   }

  //   return value; // Return as is if not a date
  // };

  // Fetch data from FastAPI
  const fetchDataFromAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const result = await response.json();

      if (Array.isArray(result) && result.length > 0) {
        const columnNames = Object.keys(result[0]);
        setColumns(columnNames);
        setData(result);
      } else {
        console.error("Invalid data format");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDataFromAPI();
  }, []);
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
  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
      {/* File Upload
      <Button variant="contained" component="label" sx={{ marginBottom: 3 }}>
        Upload CSV / Excel
        <input
          type="file"
          hidden
          accept=".csv, .xlsx, .xls"
          onChange={handleFileUpload}
        />
      </Button> */}

      {/* Fetch Data Button */}
      <Button
        variant="contained"
        onClick={fetchDataFromAPI}
        sx={{ marginBottom: 2 }}
      >
        Fetch Data
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
      {/* Expand/Collapse Button */}
      <IconButton onClick={() => setExpanded(!expanded)}>
        {expanded ? (
          <ExpandLessIcon fontSize="large" />
        ) : (
          <ExpandMoreIcon fontSize="large" />
        )}
      </IconButton>
      {/* Table */}
      <Paper
        sx={{
          width: expanded ? "100vw" : "600px",
          maxWidth: "95vw", // Prevents touching edges
          margin: "auto", // Ensures equal space on both sides
          height: expanded ? "80vh" : "auto",
          overflow: "hidden",
          padding: "16px", // Added padding
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow
          border: "1px solid #ccc",
          transition: "all 0.3s ease-in-out",
        }}
      >
        {/* Table Heading */}
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: 2,
          }}
        >
          Uploaded Data Table
        </Typography>
        {data.length > 0 ? (
          <>
            <TableContainer sx={{ maxHeight: expanded ? "70vh" : "auto" }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {columns.map((column, index) => (
                      <TableCell
                        key={index}
                        sx={{
                          fontWeight: "bold",
                          background: "#2a5353",
                          color: "white",
                          border: "1px solid black",
                        }}
                      >
                        {column}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data
                    .slice(
                      page * rowsPerPage,
                      expanded ? data.length : (page + 1) * rowsPerPage
                    )
                    .map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {columns.map((col, colIndex) => (
                          <TableCell key={colIndex}>{row[col]}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            {!expanded && (
              <TablePagination
                component="div"
                rowsPerPageOptions={[10, 20, 50]}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(_, newPage) => setPage(newPage)}
                onRowsPerPageChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value, 10));
                  setPage(0);
                }}
              />
            )}
          </>
        ) : (
          <Typography variant="h6" color="textSecondary" align="center">
            No data available.
          </Typography>
        )}
      </Paper>

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
