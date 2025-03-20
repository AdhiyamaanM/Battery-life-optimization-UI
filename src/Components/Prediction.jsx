// import React, { useState, useEffect } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const SoHChart = () => {
//   const [actualVsPredictedData] = useState([
//     { week: 1, actual: 82, predicted: 80 },
//     { week: 2, actual: 81, predicted: 79.5 },
//     { week: 3, actual: 79, predicted: 78 },
//     { week: 4, actual: 78, predicted: 77.2 },
//     { week: 5, actual: 76, predicted: 75.8 },
//     { week: 6, actual: 74, predicted: 73.9 },
//     { week: 7, actual: 72, predicted: 72 },
//     { week: 8, actual: 70, predicted: 70.5 },
//     { week: 9, actual: 68, predicted: 69 },
//     { week: 10, actual: 65, predicted: 66.5 },
//   ]);

//   const [forecastedSoHData] = useState([
//     { week: 1, forecasted: 63.5582160949707 },
//     { week: 2, forecasted: 63.13310241699219 },
//     { week: 3, forecasted: 62.733299255371094 },
//     { week: 4, forecasted: 62.36094284057617 },
//   ]);

//   const [expandedCard, setExpandedCard] = useState(null); // Track which card is clicked

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         background: "#f5f7fa",
//         padding: "20px",
//         borderRadius: "12px",
//         boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
//         width: "90%",
//         maxWidth: "1000px",
//         margin: "auto",
//       }}
//     >
//       <h3 style={{ color: "#333", textAlign: "center", marginBottom: "20px" }}>
//         SOH Charts
//       </h3>

//       {/* Charts Container */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           width: "100%",
//           gap: "20px",
//         }}
//       >
//         {/* Actual vs Predicted SOH Card */}
//         <div
//           style={{
//             background: "white",
//             padding: "20px",
//             borderRadius: "12px",
//             boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
//             width: expandedCard === "actualVsPredicted" ? "70%" : "28%",
//             cursor: "pointer",
//             textAlign: "center",
//             transition: "width 0.3s ease-in-out",
//           }}
//           onClick={() =>
//             setExpandedCard(
//               expandedCard === "actualVsPredicted" ? null : "actualVsPredicted"
//             )
//           }
//         >
//           <h3 style={{ color: "#555", marginBottom: "10px" }}>
//             Actual vs Predicted SOH
//           </h3>

//           {expandedCard === "actualVsPredicted" && (
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={actualVsPredictedData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
//                 <XAxis
//                   dataKey="week"
//                   label={{
//                     value: "Weeks",
//                     position: "insideBottom",
//                     offset: -5,
//                   }}
//                 />
//                 <YAxis
//                   label={{ value: "SOH", angle: -90, position: "insideLeft" }}
//                 />
//                 <Tooltip />
//                 <Legend
//                   verticalAlign="top"
//                   align="right"
//                   wrapperStyle={{ marginBottom: 10 }}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="actual"
//                   stroke="blue"
//                   dot={{ r: 4 }}
//                   name="Actual SOH"
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="predicted"
//                   stroke="orange"
//                   dot={{ r: 4 }}
//                   name="Predicted SOH"
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           )}
//         </div>

//         {/* Forecasted SOH Card */}
//         <div
//           style={{
//             background: "white",
//             padding: "20px",
//             borderRadius: "12px",
//             boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
//             width: expandedCard === "forecasted" ? "70%" : "28%",
//             cursor: "pointer",
//             textAlign: "center",
//             transition: "width 0.3s ease-in-out",
//           }}
//           onClick={() =>
//             setExpandedCard(expandedCard === "forecasted" ? null : "forecasted")
//           }
//         >
//           <h3 style={{ color: "#555", marginBottom: "10px" }}>
//             Forecasted SOH
//           </h3>

//           {expandedCard === "forecasted" && (
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={forecastedSoHData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
//                 <XAxis
//                   dataKey="week"
//                   label={{
//                     value: "Weeks",
//                     position: "insideBottom",
//                     offset: -5,
//                   }}
//                 />
//                 <YAxis
//                   label={{ value: "SOH", angle: -90, position: "insideLeft" }}
//                 />
//                 <Tooltip />
//                 <Legend
//                   verticalAlign="top"
//                   align="right"
//                   wrapperStyle={{ marginBottom: 10 }}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="forecasted"
//                   stroke="green"
//                   dot={{ r: 4 }}
//                   name="Forecasted SOH"
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SoHChart;

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SoHChart = () => {
  const [actualVsPredictedData] = useState([
    { week: 1, actual: 82, predicted: 80 },
    { week: 2, actual: 81, predicted: 79.5 },
    { week: 3, actual: 79, predicted: 78 },
    { week: 4, actual: 78, predicted: 77.2 },
    { week: 5, actual: 76, predicted: 75.8 },
    { week: 6, actual: 74, predicted: 73.9 },
    { week: 7, actual: 72, predicted: 72 },
    { week: 8, actual: 70, predicted: 70.5 },
    { week: 9, actual: 68, predicted: 69 },
    { week: 10, actual: 65, predicted: 66.5 },
  ]);

  const [forecastedSoHData] = useState([
    { week: 1, forecasted: 63.5 },
    { week: 2, forecasted: 63.1 },
    { week: 3, forecasted: 62.7 },
    { week: 4, forecasted: 62.3 },
  ]);

  const [expandedCard, setExpandedCard] = useState(null);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "#fff",
        padding: "20px",
        borderRadius: "16px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        width: "95%",
        maxWidth: "1200px",
        margin: "auto",
      }}
    >
      <h2
        style={{
          color: "#222",
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "22px",
          fontWeight: "bold",
        }}
      >
        SOH Analysis Charts
      </h2>

      {/* Charts Container */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        {/* Reusable Card Component */}
        {[
          {
            id: "actualVsPredicted",
            title: "Actual vs Predicted SOH",
            data: actualVsPredictedData,
            lines: [
              { dataKey: "actual", color: "blue", name: "Actual SOH" },
              { dataKey: "predicted", color: "orange", name: "Predicted SOH" },
            ],
          },
          {
            id: "forecasted",
            title: "Forecasted SOH",
            data: forecastedSoHData,
            lines: [
              { dataKey: "forecasted", color: "green", name: "Forecasted SOH" },
            ],
          },
        ].map(({ id, title, data, lines }) => (
          <div
            key={id}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              width: expandedCard === id ? "70%" : "30%",
              cursor: "pointer",
              textAlign: "center",
              transition: "width 0.3s ease-in-out",
              minHeight: "100px",
            }}
            onClick={() => setExpandedCard(expandedCard === id ? null : id)}
          >
            <h3
              style={{ color: "#444", marginBottom: "10px", fontSize: "18px" }}
            >
              {title}
            </h3>

            {expandedCard === id && (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                  <XAxis
                    dataKey="week"
                    label={{
                      value: "Weeks",
                      position: "insideBottom",
                      offset: -5,
                    }}
                  />
                  <YAxis
                    label={{ value: "SOH", angle: -90, position: "insideLeft" }}
                  />
                  <Tooltip />
                  <Legend verticalAlign="top" align="center" />
                  {lines.map(({ dataKey, color, name }) => (
                    <Line
                      key={dataKey}
                      type="monotone"
                      dataKey={dataKey}
                      stroke={color}
                      dot={{ r: 4 }}
                      name={name}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SoHChart;
