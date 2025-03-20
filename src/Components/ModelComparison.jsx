import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  LinearProgress,
  Switch,
  Stepper,
  Step,
  StepLabel,
  Button,
  Grid,
  Tabs,
  Tab,
  Drawer,
  Box,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
// Dummy Data
const dummyData = [
  { model: "LSTM", MAE: 0.0994, MSE: 0.0161, R2: 0.5817 },
  { model: "Random Forest", MAE: 0.1627, MSE: 0.0383, R2: 0.003 },
  { model: "Gradient Boosting", MAE: 0.1761, MSE: 0.0408, R2: -0.0616 },
  { model: "Linear Regression", MAE: 0.163, MSE: 0.042, R2: -0.0929 },
];

// Step Labels
const steps = [
  "Best & Worst Models",
  "Compare Multiple Models",
  "Dive into Raw Data",
  "Performance Over Time",
  "Model Breakdown",
  "Actionable Insights",
];

// Drawer Content for Each Step
const drawerContent = {
  0: {
    purpose:
      "Identify the best and worst performing models based on R² score, MAE, and MSE.",
    outcome:
      "The best model has the highest R² score, indicating better predictive accuracy, while the worst model has the lowest accuracy.",
  },
  1: {
    purpose:
      "Compare models based on different evaluation metrics (MAE, MSE, R²).",
    outcome:
      "Understanding differences in errors helps select the best model for deployment.",
  },
  2: {
    purpose: "View raw model performance data in tabular form.",
    outcome:
      "Allows detailed analysis of model errors and performance metrics for informed decision-making.",
  },
  3: {
    purpose:
      "Visualize model performance trends over time using evaluation metrics.",
    outcome:
      "Helps track model drift and make data-driven improvements for sustained accuracy.",
  },
  4: {
    purpose:
      "Analyze model errors and accuracy distribution through visual aids.",
    outcome:
      "Detects patterns in predictions, highlighting strengths and weaknesses in the models.",
  },
};

const ModelPerformance = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [openDialog, setOpenDialog] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedMetricTab, setSelectedMetricTab] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pendingDialog, setPendingDialog] = useState(null); // Tracks which dialog to open after drawer
  const [modelsData, setModelsData] = useState([]); // State for API data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch API data inside useEffect
  // useEffect(() => {
  //   const dummyData = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await fetch("https://api.example.com/models"); // Replace with actual API URL
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       const data = await response.json();
  //       setModelsData(data); // Update state with API data
  //     } catch (error) {
  //       setError(error.message); // Set error state
  //     } finally {
  //       setLoading(false); // Stop loading
  //     }
  //   };

  //   fetchModels();
  // }, []);

  const bestModel = dummyData.reduce((prev, curr) =>
    curr.R2 > prev.R2 ? curr : prev
  );
  const worstModel = dummyData.reduce((prev, curr) =>
    curr.R2 < prev.R2 ? curr : prev
  );

  // Step 1: Open Drawer First
  const handleOpenDialog = (index) => {
    setActiveStep(index);
    setPendingDialog(index); // Store the index of the dialog to open later
    setDrawerOpen(true); // Open drawer first
  };

  // Step 2: Open Dialog Only After Closing Drawer
  const handleCloseDrawer = () => {
    setDrawerOpen(false); // Close drawer first
    if (pendingDialog !== null) {
      setOpenDialog(pendingDialog); // Open dialog after drawer closes
      setPendingDialog(null); // Reset pending dialog state
    }
  };

  // Step 3: Close Dialog
  const handleCloseDialog = () => {
    setOpenDialog(null);
  };
  return (
    <div
      style={{
        padding: "20px",
        background: darkMode ? "#121212" : "#fff",
        color: darkMode ? "#fff" : "#000",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Model Performance Dashboard</Typography>
        <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
      </div>

      {/* Stepper Navigation */}
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        style={{ margin: "20px 0" }}
      >
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Grid Layout for Cards */}
      <Grid container spacing={3}>
        {steps.map((title, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              onClick={() => handleOpenDialog(index)}
              style={{
                cursor: "pointer",
                backgroundColor: darkMode ? "#333" : "#f5f5f5",
                textAlign: "center",
                padding: "15px",
              }}
            >
              <CardContent>
                <Typography variant="h6">{title}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Drawer for Context Before Dialog Opens */}
      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={handleCloseDrawer}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "& .MuiDrawer-paper": {
            width: "auto",
            maxWidth: 500,
            padding: "30px",
            margin: "auto",
            borderRadius: "12px",
            background: "rgba(255, 255, 255, 0.95)",
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
            animation: "fadeIn 0.5s ease-in-out",
          },
        }}
        BackdropProps={{
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(8px)",
          },
        }}
      >
        <Box
          sx={{
            animation: "slideUp 0.5s ease-in-out",
          }}
        >
          {/* Centered Heading */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#234848",
              textAlign: "center",
              letterSpacing: "0.5px",
              marginBottom: 2,
            }}
          >
            {steps[activeStep]}
          </Typography>

          {/* Purpose Section */}
          <Box sx={{ textAlign: "left", marginBottom: 2 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "600",
                color: "#2a5353",
                fontSize: "17px",
                paddingBottom: "3px",
                position: "relative",
                "&::after": {
                  content: '""',
                  display: "block",
                  width: "40px",
                  height: "3px",
                  backgroundColor: "#71e0df",
                  marginTop: "3px",
                },
              }}
            >
              Purpose:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: "15px",
                opacity: 0.9,
              }}
            >
              {drawerContent[activeStep]?.purpose}
            </Typography>
          </Box>

          {/* Outcome Section */}
          <Box sx={{ textAlign: "left", marginBottom: 3 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "600",
                color: "#2a5353",
                fontSize: "17px",
                paddingBottom: "3px",
                position: "relative",
                "&::after": {
                  content: '""',
                  display: "block",
                  width: "40px",
                  height: "3px",
                  backgroundColor: "#71e0df",
                  marginTop: "3px",
                },
              }}
            >
              Outcome:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: "15px",
                opacity: 0.9,
              }}
            >
              {drawerContent[activeStep]?.outcome}
            </Typography>
          </Box>

          {/* Action Button */}
          <Button
            variant="contained"
            fullWidth
            sx={{
              background: "#2a5353",
              color: "white",
              position: "relative",
              overflow: "hidden",
              padding: "12px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              "&::after": {
                content: '""',
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "10px",
                height: "10px",
                background: "rgba(255, 255, 255, 0.3)",
                borderRadius: "50%",
                transform: "translate(-50%, -50%) scale(0)",
                opacity: 0,
                transition: "transform 0.6s ease-out, opacity 0.6s ease-out",
              },
              "&:active::after": {
                transform: "translate(-50%, -50%) scale(4)",
                opacity: 0.15,
              },
              "&:hover": {
                background: "#234848",
              },
            }}
            onClick={handleCloseDrawer}
          >
            Unveil Model Patterns
          </Button>
        </Box>
      </Drawer>

      {/* Popups for Each Card */}
      <Dialog
        open={openDialog !== null}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {steps[openDialog]}{" "}
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {/* Purpose & Outcome for each step */}

          {/* Step 0: Best & Worst Models */}
          {openDialog === 0 && (
            <>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} sm={6}>
                  <Card sx={{ background: "#66bb6a", color: "#fff" }}>
                    <CardContent>
                      <Typography variant="h5">🏆 Best Model</Typography>
                      <Typography>{bestModel.model}</Typography>
                      <Typography>R²: {bestModel.R2.toFixed(3)}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Card sx={{ background: "#e53935", color: "#fff" }}>
                    <CardContent>
                      <Typography variant="h5">🚨 Worst Model</Typography>
                      <Typography>{worstModel.model}</Typography>
                      <Typography>R²: {worstModel.R2.toFixed(3)}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </>
          )}

          {/* Step 1: Compare Multiple Models */}
          {openDialog === 1 && (
            <>
              <Tabs
                value={selectedMetricTab}
                onChange={(event, newValue) => setSelectedMetricTab(newValue)}
                centered
              >
                <Tab label="MAE Comparison" />
                <Tab label="MSE Comparison" />
                <Tab label="R² Comparison" />
              </Tabs>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dummyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="model"
                    label={{
                      value: "Model",
                      position: "insideBottom",
                      offset: -5,
                    }}
                  />
                  <YAxis
                    label={{
                      value:
                        selectedMetricTab === 0
                          ? "Mean Absolute Error (MAE)"
                          : selectedMetricTab === 1
                            ? "Mean Squared Error (MSE)"
                            : "R² Score",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <RechartsTooltip />
                  <Bar
                    dataKey={
                      selectedMetricTab === 0
                        ? "MAE"
                        : selectedMetricTab === 1
                          ? "MSE"
                          : "R2"
                    }
                    fill={
                      selectedMetricTab === 0
                        ? "#1976D2"
                        : selectedMetricTab === 1
                          ? "#D32F2F"
                          : "#388E3C"
                    }
                    barSize={25} // Adjust the width of bars (try 20-30 for a balanced look)
                    radius={[4, 4, 0, 0]} // Optional: Add rounded corners at the top
                    isAnimationActive={false} // Disable hover animation
                  />
                </BarChart>
              </ResponsiveContainer>
            </>
          )}

          {/* Step 2: Dive into Raw Data */}
          {openDialog === 2 && (
            <>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Model</TableCell>
                    <TableCell>MAE</TableCell>
                    <TableCell>MSE</TableCell>
                    <TableCell>R²</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dummyData.map((row) => (
                    <TableRow key={row.model}>
                      <TableCell>{row.model}</TableCell>
                      <TableCell>{row.MAE.toFixed(4)}</TableCell>
                      <TableCell>{row.MSE.toFixed(4)}</TableCell>
                      <TableCell>{row.R2.toFixed(4)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
          {/* Step 3: Performance Over Time */}
          {openDialog === 3 && (
            <>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dummyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="model"
                    label={{
                      value: "Model",
                      position: "insideBottom",
                      offset: -5,
                    }}
                  />
                  <YAxis
                    label={{
                      value: "R² Score",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <RechartsTooltip />
                  <Line
                    type="monotone"
                    dataKey="R2"
                    stroke="#FF9800"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </>
          )}

          {/* Step 4: Model Breakdown - Progress Bars */}
          {openDialog === 4 && (
            <>
              <Tabs
                value={selectedMetricTab}
                onChange={(event, newValue) => setSelectedMetricTab(newValue)}
                centered
              >
                <Tab label="MAE Comparison" />
                <Tab label="MSE Comparison" />
                <Tab label="R² Comparison" />
              </Tabs>

              {/* Color Indicator Legend */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  marginTop: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      backgroundColor: "#2e7d32", // Green (Success)
                      borderRadius: "50%",
                    }}
                  />
                  <Typography variant="body2">Good</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      backgroundColor: "#ed6c02", // Orange (Warning)
                      borderRadius: "50%",
                    }}
                  />
                  <Typography variant="body2">Moderate</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      backgroundColor: "#d32f2f", // Red (Error)
                      borderRadius: "50%",
                    }}
                  />
                  <Typography variant="body2">Poor</Typography>
                </Box>
              </Box>

              <Grid container spacing={2} style={{ marginTop: 20 }}>
                {["MAE", "MSE", "R2"].map((metric, index) => {
                  if (index !== selectedMetricTab) return null; // Show only selected tab content

                  return (
                    <Grid item xs={12} key={index}>
                      <Typography variant="h6" gutterBottom>
                        {metric} Comparison
                      </Typography>
                      {dummyData.map((model, idx) => {
                        let value = model[metric];
                        let progressValue =
                          metric === "R2"
                            ? (value + 1) * 50
                            : (1 - value) * 100;
                        let progressColor =
                          metric === "R2"
                            ? value >= 0.5
                              ? "success"
                              : value > 0
                                ? "warning"
                                : "error"
                            : value < 0.1
                              ? "success"
                              : value < 0.2
                                ? "warning"
                                : "error";

                        return (
                          <Grid item xs={12} key={idx}>
                            <Typography variant="body1" gutterBottom>
                              {model.model}: {value.toFixed(4)}
                            </Typography>
                            <Box
                              sx={{
                                position: "relative",
                                height: 10,
                                borderRadius: 5,
                                overflow: "hidden",
                                backgroundColor: "#e0e0e0",
                              }}
                            >
                              <Box
                                sx={{
                                  width: `${progressValue}%`,
                                  height: "100%",
                                  backgroundColor:
                                    progressColor === "success"
                                      ? "#2e7d32"
                                      : progressColor === "warning"
                                        ? "#ed6c02"
                                        : "#d32f2f",
                                  transition: "width 2s ease-in-out",
                                  animation:
                                    "progressAnimation 2s infinite alternate",
                                }}
                              />
                            </Box>
                          </Grid>
                        );
                      })}
                    </Grid>
                  );
                })}
              </Grid>

              {/* Progress Bar Animation */}
              <style>
                {`
        @keyframes progressAnimation {
          0% { transform: scaleX(1); }
          50% { transform: scaleX(1.02); }
          100% { transform: scaleX(1); }
        }
      `}
              </style>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModelPerformance;
