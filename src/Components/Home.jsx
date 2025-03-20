import React, { useState, useRef, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  Box,
  Modal,
  IconButton,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion, AnimatePresence, color } from "framer-motion"; // Animation library
import CloseIcon from "@mui/icons-material/Close";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Collapse } from "@mui/material";
import HomeBackground from "../Assets/Background Images/HomeBackground.webp";
import SectionTwo from "../Assets/Background Images/SectionTwo.jpg";
import SectionThree from "../Assets/Background Images/SectionThree.jpg";
import SectionOne from "../Assets/Background Images/SectionOne.jpg";
import Section from "../Assets/Background Images/Section.webp";
import {
  EvStation as EvStationIcon,
  Speed as SpeedIcon,
  BatteryChargingFull as BatteryIcon,
  AcUnit as AcUnitIcon,
  Sync as SyncIcon,
  DeviceThermostat as ThermostatIcon,
  Air as AirIcon,
  Height as HeightIcon,
  GpsFixed as GpsIcon,
  DirectionsCar as CarIcon,
  FlashOn as FlashIcon,
  Speed as RpmIcon,
  Storage as DataIcon,
  Timeline as GraphIcon,
  LocationOn as LocationIcon,
  CompareArrows as SlopeIcon,
  RotateRight as TorqueIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grid, List, ListItem, ListItemText, Avatar } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
// Data Points
const dataPoints = [
  {
    title: "ELV Spy",
    description:
      "Monitors battery voltage, current, and temperature in real-time. Early detection of fluctuations helps prevent rapid degradation.",
    icon: <EvStationIcon />,
  },
  {
    title: "Speed",
    description:
      "High speeds cause excessive battery discharge cycles, accelerating capacity loss. Maintaining moderate speeds improves longevity.",
    icon: <SpeedIcon />,
  },
  {
    title: "SOC (State of Charge)",
    description:
      "Extreme SOC levels (0% or 100%) stress battery cells, reducing lifespan. Keeping SOC between 20-80% optimizes health.",
    icon: <BatteryIcon />,
  },
  {
    title: "Ambient Temperature",
    description:
      "High temperatures accelerate chemical degradation, while cold reduces charge efficiency. Thermal management stabilizes SOH.",
    icon: <AcUnitIcon />,
  },
  {
    title: "Regenerated Energy (Wh)",
    description:
      "Efficient regenerative braking reduces deep discharge cycles, improving overall battery lifespan.",
    icon: <SyncIcon />,
  },
  {
    title: "Motor Power (W)",
    description:
      "High power output increases heat and battery stress. Smooth acceleration reduces strain and extends lifespan.",
    icon: <FlashIcon />,
  },
  {
    title: "Aux Power (100W)",
    description:
      "Excessive auxiliary power drains the battery, reducing available energy for driving. Optimizing power consumption preserves range.",
    icon: <DataIcon />,
  },
  {
    title: "Motor Temperature",
    description:
      "Overheating can cause thermal runaway, permanently damaging the battery. Proper cooling systems prevent overheating.",
    icon: <ThermostatIcon />,
  },
  {
    title: "Torque (Nm)",
    description:
      "High torque demand leads to rapid battery discharge, affecting SOH. Gentle acceleration minimizes strain on cells.",
    icon: <TorqueIcon />,
  },
  {
    title: "RPM",
    description:
      "High RPM increases heat and energy loss, leading to inefficiency. Optimizing gear ratios and driving habits improves SOH.",
    icon: <RpmIcon />,
  },
  {
    title: "Battery Capacity",
    description:
      "Frequent deep discharges reduce battery capacity over time. Partial charging strategies slow down SOH decline.",
    icon: <BatteryIcon />,
  },
  {
    title: "Reference Consumption",
    description:
      "High energy consumption drains the battery faster, reducing cycle life. Efficient driving techniques enhance SOH.",
    icon: <GraphIcon />,
  },
  {
    title: "Wind Speed (mph & kph)",
    description:
      "Strong winds increase resistance, requiring more power and shortening battery lifespan. Adjusting speed reduces drag effects.",
    icon: <AirIcon />,
  },
  {
    title: "Wind Degree",
    description:
      "Crosswinds increase energy usage, leading to faster discharge. Predictive driving can minimize energy waste.",
    icon: <AirIcon />,
  },
  {
    title: "Frontal Wind",
    description:
      "Headwinds force the motor to work harder, increasing energy demand. Lower speeds reduce wind resistance and save energy.",
    icon: <AirIcon />,
  },
  {
    title: "Vehicle Angle",
    description:
      "Steep inclines demand more power, depleting battery faster. Regenerative braking helps recover energy downhill.",
    icon: <CarIcon />,
  },
  {
    title: "Total Vehicles",
    description:
      "Traffic congestion leads to frequent acceleration and braking, accelerating battery wear. Smooth driving reduces SOH loss.",
    icon: <CarIcon />,
  },
  {
    title: "Speed Average",
    description:
      "Consistently high speeds cause frequent deep discharges, lowering SOH. Maintaining stable speeds extends battery life.",
    icon: <SpeedIcon />,
  },
  {
    title: "Max Speed",
    description:
      "Excessive speed rapidly drains battery power, reducing overall longevity. Keeping speeds moderate enhances efficiency.",
    icon: <SpeedIcon />,
  },
  {
    title: "Radius",
    description:
      "Frequent sharp turns increase energy loss and tire friction, reducing efficiency. Smooth driving reduces wear.",
    icon: <CarIcon />,
  },
  {
    title: "Acceleration (m/s²)",
    description:
      "Rapid acceleration leads to high current draw, stressing battery cells. Gradual acceleration optimizes SOH.",
    icon: <SpeedIcon />,
  },
  {
    title: "Battery Capacity (Wh)",
    description:
      "Battery capacity declines with repeated charge cycles. Avoiding full discharges extends overall lifespan.",
    icon: <BatteryIcon />,
  },
  {
    title: "Longitude & Latitude",
    description:
      "Terrain and climate vary by location, affecting energy efficiency. Route optimization reduces unnecessary power use.",
    icon: <GpsIcon />,
  },
  {
    title: "Altitude",
    description:
      "Higher altitudes affect cooling efficiency and battery chemistry. Adaptive power management helps optimize usage.",
    icon: <HeightIcon />,
  },
  {
    title: "Slope (º)",
    description:
      "Climbing steep slopes increases energy demand, reducing SOH. Using regenerative braking conserves energy downhill.",
    icon: <SlopeIcon />,
  },
  {
    title: "Completed Distance (km)",
    description:
      "Long distances contribute to natural battery aging. Strategic charging patterns slow down degradation.",
    icon: <CarIcon />,
  },
  {
    title: "Remaining Range (km)",
    description:
      "Frequent full discharges lead to reduced capacity over time. Predictive range management improves SOH.",
    icon: <BatteryIcon />,
  },
];

function DataCard({ title, description, icon, onClick, open }) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Card
        sx={{
          width: 250,
          height: open ? "auto" : 160,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          borderRadius: 3,
          p: 2,
          background: "rgba(255, 255, 255, 0.1)", // Glassmorphism background
          backdropFilter: "blur(10px)", // Blurring background
          color: "wheat",
          transition: "transform 0.4s ease, box-shadow 0.4s ease",
          cursor: "pointer",
          boxShadow: open
            ? "0px 4px 20px rgba(0, 153, 255, 0.3)"
            : "0px 8px 20px rgba(0, 153, 255, 0.3)",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0px 8px 20px rgba(0, 153, 255, 0.3)",
          },
        }}
        onClick={onClick}
      >
        <CardContent sx={{ textAlign: "center" }}>
          {icon}
          <Typography
            variant="h6"
            sx={{ mt: 1, fontSize: "1rem", fontWeight: 600 }}
          >
            {title}
          </Typography>
        </CardContent>

        {/* Expandable content */}
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Typography variant="body1" sx={{ mt: 2, color: "wheat" }}>
            {description}
          </Typography>
        </Collapse>
      </Card>
    </motion.div>
  );
}
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const hoverEffect = {
  scale: 1.05,
  boxShadow: "0px 8px 15px rgba(0,0,0,0.2)",
};

export default function Home() {
  const bgImages = [
    "https://source.unsplash.com/800x500/?battery,energy",
    "https://source.unsplash.com/800x500/?ai,technology",
    "https://source.unsplash.com/800x500/?performance,data",
  ];

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme }) => ({
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const swiperRef = useRef(null);
  const [selectedData, setSelectedData] = useState(null); // Track clicked card
  const [expandedCard, setExpandedCard] = useState(null); // Track which card is expanded
  const [expanded, setExpanded] = useState({});
  const [bubbleStart, setBubbleStart] = useState(false);
  const [offsetY, setOffsetY] = useState(0);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  // Handle Scroll for Parallax Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY * 0.5); // Adjust speed here
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCardClick = (card) => {
    setExpandedCard(expandedCard === card ? null : card); // Toggle expand/collapse
    setSelectedData(card); // Set data to show in the expanded state
  };

  const modalOffset = { x: -80, y: -30 }; // Adjust these values to move the modal

  const aiModels = [
    {
      title: "Long Short-Term Memory (LSTM)",
      overview: "Deep Learning for Time-Series Battery SOH Forecasting",
      description: `LSTM is a specialized Recurrent Neural Network (RNN) designed to process sequential data, making it ideal for tracking battery health trends over time.`,
      benefits: [
        "Captures long-term dependencies in battery degradation.",
        "Learns from past charge-discharge cycles to predict future SOH.",
        "Handles real-time battery usage fluctuations effectively.",
        "Identifies early warning signs of battery failure.",
      ],
      useCases: [
        "SOH prediction based on historical charging and discharging patterns.",
        "Real-time monitoring of battery health under different workloads.",
        "Forecasting sudden degradation due to extreme conditions.",
      ],
      bestFor: "Long-term SOH forecasting & anomaly detection.",
    },
    {
      title: "Random Forest (RF)",
      overview: "Interpretable Machine Learning for SOH Estimation",
      description: `Random Forest is an ensemble learning algorithm that builds multiple decision trees to improve prediction accuracy and reduce overfitting.`,
      benefits: [
        "Handles both categorical and numerical battery parameters.",
        "Identifies key factors affecting battery SOH degradation.",
        "Provides feature importance for better decision-making.",
        "Robust against noisy data and missing values.",
      ],
      useCases: [
        `Classifying battery SOH into "Healthy," "Warning," and "Critical" categories.`,
        "Predicting SOH based on environmental and operational factors.",
        "Analyzing the impact of temperature, charge cycles, and voltage drops on SOH.",
      ],
      bestFor:
        "Understanding SOH impact factors & building interpretable predictions.",
    },
    {
      title: "Gradient Boosting (XGBoost, LightGBM, CatBoost)",
      overview:
        "High-Precision SOH Predictions with Advanced Ensemble Learning",
      description: `Gradient Boosting methods iteratively improve weak models to build a powerful SOH prediction system. These models excel at detecting complex patterns in battery performance data.`,
      benefits: [
        "Achieves high accuracy in SOH prediction by reducing errors iteratively.",
        "Learns non-linear relationships between battery parameters.",
        "Handles missing values and unbalanced datasets effectively.",
        "Provides insights into subtle SOH degradation trends.",
      ],
      useCases: [
        "Predicting the rate of SOH decline based on historical and real-time data.",
        "Detecting anomalies in battery performance for proactive maintenance.",
        "Identifying optimal settings for maximizing battery life.",
      ],
      bestFor: "High-accuracy SOH modeling & trend analysis.",
    },
    {
      title: "Linear Regression (LR)",
      overview: "A Simple yet Effective Model for SOH Estimation",
      description: `Linear Regression is a fundamental statistical model that establishes relationships between battery health indicators and SOH. It serves as a baseline model before applying more complex algorithms.`,
      benefits: [
        "Provides quick and interpretable SOH estimations.",
        "Establishes a baseline for more advanced models.",
        "Offers insights into how key factors (voltage, temperature, cycles) influence SOH.",
        "Requires minimal computational resources, making it efficient for real-time applications.",
      ],
      useCases: [
        "Predicting battery SOH based on simple linear trends.",
        "Quick SOH approximation for low-power IoT and edge devices.",
        "Identifying the direct impact of charge cycles on SOH.",
      ],
      bestFor: "Fast and efficient SOH approximation.",
    },
    {
      title: "Hybrid Model Approach",
      overview: "Combining AI & ML for Maximum SOH Prediction Accuracy",
      description: `A hybrid AI approach integrates multiple models to leverage their strengths and minimize weaknesses.`,
      benefits: [
        "LSTM: Captures sequential SOH trends for long-term forecasting.",
        "Random Forest: Identifies key degradation factors.",
        "Gradient Boosting: Provides high-precision predictions.",
        "Linear Regression: Establishes a quick, interpretable SOH baseline.",
      ],
      useCases: [
        "Developing an AI-powered battery management system (BMS) for predictive maintenance.",
        "Optimizing battery charging strategies based on real-time SOH insights.",
        "Preventing unexpected battery failures in industrial applications.",
      ],
      bestFor: "Powering the Future with Intelligent Battery Management.",
    },
  ];
  const metrics = [
    {
      title: "Mean Squared Error (MSE)",
      description:
        "Measures the average squared difference between actual and predicted values.",
    },
    {
      title: "Mean Absolute Error (MAE)",
      description:
        "Calculates the average absolute difference between actual and predicted values.",
    },
    {
      title: "R² Score",
      description:
        "Indicates how well the model explains the variance in the data (closer to 1 is better).",
    },
  ];
  const handleExpandClick = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };
  useEffect(() => {
    const timer = setTimeout(() => setBubbleStart(true), 1000); // Bubble effect starts after 1s
    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = (event, metric) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setModalPosition({ x: rect.left + rect.width / 2, y: rect.top });
    setSelectedMetric(metric);
  };

  const handleClose = () => setSelectedMetric(null);
  return (
    <>
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        {/* Parallax Background */}

        {/* Overlay Text */}

        {/* 🔥 Section 1: Home */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            minHeight: "100vh",
            backgroundImage: `url(${Section})`,
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.5)",
              zIndex: 1,
            }}
          />
          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              color: "wheat",
              textAlign: "center",
              p: 4,
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              ⚡ EV Battery Optimization
            </Typography>
            <Typography
              variant="h5"
              sx={{ maxWidth: "800px", margin: "auto", mt: 2 }}
            >
              Optimizing electric vehicle batteries for efficiency, longevity,
              and performance using AI-driven analytics.
            </Typography>
          </Box>
          {/* Carousel */}
          <Box
            sx={{
              padding: "20px",
              maxWidth: "90%",
              margin: "auto",
              mt: "200px",
              color: "#fff !important",
            }}
          >
            <Swiper
              slidesPerView={4}
              spaceBetween={20}
              navigation={true}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              modules={[Navigation, Pagination, Autoplay]}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              style={{ paddingBottom: "60px" }}
            >
              {dataPoints.map((item, index) => (
                <SwiperSlide key={index}>
                  <DataCard
                    {...item}
                    onClick={() => handleCardClick(item)}
                    open={expandedCard === item}
                    sx={{
                      background: "rgba(255, 255, 255, 0.15)", // Increase opacity for better contrast
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      borderRadius: "10px",
                      padding: "20px",
                      color: "#fff !important", // Ensure white text
                      transition: "0.3s",
                      "& *": { color: "#fff !important" }, // Force all child elements to be white
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
                      },
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Box>

        {/* AI Model Cards Section */}
        {/* 🔥 Section 2: AI Models */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            minHeight: "100vh",
            backgroundImage: `url(${SectionTwo})`,
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.5)",
              zIndex: 1,
            }}
          />
          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              color: "wheat",
              textAlign: "center",
              p: 4,
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              AI Models for Analysis & Training
            </Typography>
            <Grid
              container
              spacing={4}
              sx={{ maxWidth: "80%", margin: "auto" }}
            >
              {aiModels.map((model, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      maxWidth: 345,
                      borderRadius: "16px",
                      boxShadow: 3,
                      background: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                      color: "#fff",
                      "&:hover": { boxShadow: 6 },
                    }}
                  >
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: red[500] }}>
                          {model.title.charAt(0)}
                        </Avatar>
                      }
                      title={model.title}
                      subheader={model.overview}
                      sx={{ color: "wheat" }}
                    />
                    <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
                      <CardContent>
                        <Typography variant="body2" sx={{ color: "wheat" }}>
                          {model.description}
                        </Typography>
                      </CardContent>
                    </Collapse>
                    <CardActions disableSpacing>
                      <ExpandMoreIcon
                        onClick={() => handleExpandClick(index)}
                        sx={{
                          cursor: "pointer",
                          transform: expanded[index]
                            ? "rotate(180deg)"
                            : "rotate(0)",
                          transition: "0.3s",
                        }}
                      />
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        {/* Performance Metrics Section */}
        {/* 🔥 Section 3: Model Performance Metrics */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            minHeight: "100vh",
            backgroundImage: `url(${SectionThree})`,
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.5)",
              zIndex: 1,
            }}
          />
          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              color: "wheat",
              textAlign: "center",
              p: 4,
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              Model Performance Metrics
            </Typography>
            <Typography
              variant="h6"
              sx={{ maxWidth: "800px", margin: "auto", mt: 2 }}
            >
              Evaluate model accuracy, efficiency, and reliability across
              multiple performance benchmarks.
            </Typography>
            <Grid
              container
              spacing={4}
              sx={{ maxWidth: "80%", margin: "auto" }}
            >
              {metrics.map((metric, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Card
                    sx={{
                      borderRadius: "12px",
                      boxShadow: 3,
                      p: 3,
                      textAlign: "center",
                      background:
                        "linear-gradient(135deg, #3f51b5 30%, #1e88e5 90%)",
                      color: "#fff",
                      cursor: "pointer",
                      "&:hover": { boxShadow: 6 },
                    }}
                    onMouseEnter={(e) => handleMouseEnter(e, metric)}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {metric.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="rgba(255,255,255,0.8)"
                      sx={{ mt: 1 }}
                    >
                      Hover to see details
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Modal Popup */}
            <AnimatePresence>
              {selectedMetric && (
                <Modal
                  open={Boolean(selectedMetric)}
                  onClose={handleClose}
                  BackdropProps={{
                    sx: { backdropFilter: "blur(8px)" }, // Apply blur effect to background
                  }}
                >
                  <Box
                    component={motion.div}
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    sx={{
                      position: "fixed", // Ensures it stays relative to the viewport
                      top: "30%", // Move modal's top edge to the center
                      left: "35%", // Move modal's left edge to the center
                      transform: "translate(-50%, -50%)", // Adjust position correctly
                      bgcolor: "white",
                      p: 4,
                      borderRadius: "16px",
                      boxShadow: 24,
                      textAlign: "center",
                      width: "300px",
                      minWidth: "300px",
                    }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                      {selectedMetric.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {selectedMetric.description}
                    </Typography>
                  </Box>
                </Modal>
              )}
            </AnimatePresence>
          </Box>
        </Box>
      </Box>
    </>
  );
}
