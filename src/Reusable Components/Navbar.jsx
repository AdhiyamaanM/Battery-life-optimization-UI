import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Breadcrumbs,
  Link,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "Data Explorer", icon: <ExploreIcon />, path: "/data-explorer" },
    // { text: "Plot", icon: <InsertChartIcon />, path: "/plot" },
    { text: "Prediction", icon: <AssessmentIcon />, path: "/prediction" },
    {
      text: "Model Comparison",
      icon: <CompareArrowsIcon />,
      path: "/model-comparison",
    },
  ];

  // Generate breadcrumb links with icons
  const pathnames = location.pathname.split("/").filter((x) => x);
  const breadcrumbIcons = {
    "data-explorer": <ExploreIcon sx={{ fontSize: 16, mr: 0.5 }} />,
    plot: <InsertChartIcon sx={{ fontSize: 16, mr: 0.5 }} />,
    prediction: <AssessmentIcon sx={{ fontSize: 16, mr: 0.5 }} />,
    "model-comparison": <CompareArrowsIcon sx={{ fontSize: 16, mr: 0.5 }} />,
  };

  return (
    <>
      {/* Navbar */}
      <AppBar
        position="static"
        sx={{ background: "linear-gradient(to right, #2a5353, #71e0df)" }}
      >
        <Toolbar>
          {/* Menu Icon */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          {/* Animated Breadcrumbs */}
          <Box sx={{ flexGrow: 1 }}>
            <Breadcrumbs
              separator={
                <NavigateNextIcon fontSize="small" sx={{ color: "white" }} />
              }
              sx={{
                color: "white",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* Home Breadcrumb */}
              <Link
                onClick={() => navigate("/")}
                sx={{
                  cursor: "pointer",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <HomeIcon sx={{ fontSize: 16, mr: 0.5 }} /> Home
              </Link>

              {/* Dynamic Breadcrumbs */}
              {pathnames.map((value, index) => {
                const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                return (
                  <Link
                    key={to}
                    onClick={() => navigate(to)}
                    sx={{
                      cursor: "pointer",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {breadcrumbIcons[value] || null}{" "}
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </Link>
                );
              })}
            </Breadcrumbs>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Left Sidebar Drawer */}
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: 250,
            background: "linear-gradient(to bottom, #2a5353, #71e0df)",
            height: "100%",
            backdropFilter: "blur(10px)", // Glassmorphism Effect
            padding: 2,
          }}
        >
          <List>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.text}
                onClick={() => {
                  navigate(item.path);
                  setOpen(false);
                }}
                sx={{
                  color: "white",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.4)",
                    transform: "scale(1.05)", // Scale effect
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
