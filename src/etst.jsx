// import React, { useState } from "react";

// const API_BASE_URL = "https://nonactual-deanne-pretemperate.ngrok-free.dev";

// const initialForm = {
//   donor: "",
//   recipient: "",
//   recipient_region: "",
//   coalesced_purpose_name: "",
//   flow_name: "",
//   commitment_amount_usd_constant: "",
//   total_project_cost: "",
//   start_date: "",
//   commitment_date: "",
//   proposed_end_date: "",
//   implementing_agency: "",
//   financing_agency: "",
//   title: "",
//   is_multi_country: false,
// };

// function App() {
//   const [form, setForm] = useState(initialForm);
//   const [loading, setLoading] = useState(false);
//   const [prediction, setPrediction] = useState(null);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setPrediction(null);

//     try {
//       const payload = {
//         ...form,
//         commitment_amount_usd_constant: parseFloat(
//           form.commitment_amount_usd_constant || "0"
//         ),
//         total_project_cost: form.total_project_cost
//           ? parseFloat(form.total_project_cost)
//           : null,
//       };

//       const res = await fetch(`${API_BASE_URL}/predict`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (!res.ok || data.error) {
//         throw new Error(data.error || `HTTP ${res.status}`);
//       }

//       setPrediction(data);
//     } catch (err) {
//       console.error(err);
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReset = () => {
//     setForm(initialForm);
//     setPrediction(null);
//     setError(null);
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         padding: "clamp(16px, 4vw, 32px)",
//         fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
//         background:
//           "linear-gradient(135deg, #e0f2fe 0%, #f9fafb 45%, #eff6ff 100%)",
//         color: "#0f172a",
//       }}
//     >
//       {/* Header */}
//       <header style={{ marginBottom: "20px" }}>
//         <h1
//           style={{
//             fontSize: "clamp(20px, 5vw, 30px)",
//             fontWeight: 800,
//             marginBottom: "4px",
//             letterSpacing: "0.02em",
//             color: "#0f172a",
//             textShadow: "0 1px 2px rgba(15,23,42,0.15)",
//           }}
//         >
//           AidData Project Delay Risk Dashboard
//         </h1>
//         <p
//           style={{
//             fontSize: "clamp(12px, 2.5vw, 14px)",
//             color: "#1e293b",
//             opacity: 0.85,
//           }}
//         >
//           Powered by your XGBoost end-date model + residual-based delay
//           detection.
//         </p>
//       </header>

//       {/* Top info cards */}
//       <section
//         style={{
//           display: "grid",
//           gap: "14px",
//           gridTemplateColumns:
//             "repeat(auto-fit, minmax(min(100%, 230px), 1fr))",
//           marginBottom: "26px",
//         }}
//       >
//         <InfoCard
//           title="Global delay risk"
//           text="Roughly 15–20% of projects are delayed or significantly delayed, with higher risk in small island states and regional programs."
//         />
//         <InfoCard
//           title="High-risk sectors"
//           text="Rural development, social welfare, biodiversity, WASH, and complex health programs show the highest delay rates."
//         />
//         <InfoCard
//           title="Shock sensitivity"
//           text="COVID-era and cross-country regional projects experienced elevated delays, especially in Africa and Oceania."
//         />
//       </section>

//       <main
//         style={{
//           display: "grid",
//           gap: "22px",
//           gridTemplateColumns:
//             "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
//           alignItems: "flex-start",
//         }}
//       >
//         {/* Form panel */}
//         <section
//           style={{
//             background: "rgba(255,255,255,0.9)",
//             backdropFilter: "blur(10px)",
//             padding: "clamp(14px, 3vw, 20px)",
//             borderRadius: "18px",
//             boxShadow: "0 16px 40px rgba(15,23,42,0.10)",
//             border: "1px solid rgba(191,219,254,0.9)",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               marginBottom: "12px",
//               alignItems: "center",
//               flexWrap: "wrap",
//               gap: "8px",
//             }}
//           >
//             <h2
//               style={{
//                 fontSize: "clamp(14px, 3vw, 16px)",
//                 fontWeight: 700,
//                 color: "#0f172a",
//               }}
//             >
//               Project Risk Calculator
//             </h2>
//             <button
//               onClick={handleReset}
//               style={{
//                 border: "none",
//                 background: "transparent",
//                 fontSize: "12px",
//                 color: "#2563eb",
//                 cursor: "pointer",
//                 textDecoration: "underline",
//               }}
//             >
//               Reset
//             </button>
//           </div>

//           <div
//             style={{
//               display: "grid",
//               gap: "10px",
//               gridTemplateColumns:
//                 "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
//             }}
//           >
//             <Field
//               label="Donor"
//               name="donor"
//               value={form.donor}
//               onChange={handleChange}
//               placeholder="e.g. World Bank"
//             />
//             <Field
//               label="Recipient country"
//               name="recipient"
//               value={form.recipient}
//               onChange={handleChange}
//               placeholder="e.g. Bangladesh"
//             />

//             <Field
//               label="Recipient region"
//               name="recipient_region"
//               value={form.recipient_region}
//               onChange={handleChange}
//               placeholder="e.g. South & Central Asia"
//             />
//             <Field
//               label="Sector / purpose name"
//               name="coalesced_purpose_name"
//               value={form.coalesced_purpose_name}
//               onChange={handleChange}
//               placeholder="e.g. Rural development"
//             />

//             <Field
//               label="Flow name"
//               name="flow_name"
//               value={form.flow_name}
//               onChange={handleChange}
//               placeholder="e.g. ODA grant"
//             />
//             <Field
//               label="Commitment amount (constant USD)"
//               name="commitment_amount_usd_constant"
//               value={form.commitment_amount_usd_constant}
//               onChange={handleChange}
//               type="number"
//               placeholder="e.g. 5000000"
//             />

//             <Field
//               label="Total project cost (optional)"
//               name="total_project_cost"
//               value={form.total_project_cost}
//               onChange={handleChange}
//               type="number"
//               placeholder=""
//             />
//             <Field
//               label="Start date"
//               name="start_date"
//               value={form.start_date}
//               onChange={handleChange}
//               type="date"
//             />
//             <Field
//               label="Proposed end date"
//               name="proposed_end_date"
//               value={form.proposed_end_date}
//               onChange={handleChange}
//               type="date"
//             />
//             <Field
//               label="Commitment date (optional)"
//               name="commitment_date"
//               value={form.commitment_date}
//               onChange={handleChange}
//               type="date"
//             />

//             <Field
//               label="Implementing agency (optional)"
//               name="implementing_agency"
//               value={form.implementing_agency}
//               onChange={handleChange}
//               placeholder="e.g. Ministry of Agriculture"
//             />

//             <Field
//               label="Financing agency (optional)"
//               name="financing_agency"
//               value={form.financing_agency}
//               onChange={handleChange}
//               placeholder="e.g. World Bank"
//             />

//             <Field
//               label="Project title (optional)"
//               name="title"
//               value={form.title}
//               onChange={handleChange}
//               placeholder=""
//               fullRow
//             />

//             <div
//               style={{
//                 gridColumn: "1 / -1",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "6px",
//                 marginTop: "4px",
//               }}
//             >
//               <input
//                 id="is_multi_country"
//                 type="checkbox"
//                 name="is_multi_country"
//                 checked={form.is_multi_country}
//                 onChange={handleChange}
//               />
//               <label htmlFor="is_multi_country" style={{ fontSize: "12px" }}>
//                 Multi-country project
//               </label>
//             </div>

//             <div style={{ gridColumn: "1 / -1", marginTop: "6px" }}>
//               <button
//                 onClick={handleSubmit}
//                 disabled={loading}
//                 style={{
//                   width: "100%",
//                   padding: "9px 16px",
//                   borderRadius: "999px",
//                   border: "none",
//                   background: loading
//                     ? "linear-gradient(135deg,#93c5fd,#60a5fa)"
//                     : "linear-gradient(135deg,#3b82f6,#2563eb)",
//                   color: "white",
//                   fontSize: "13px",
//                   fontWeight: 600,
//                   cursor: loading ? "default" : "pointer",
//                   boxShadow: "0 10px 25px rgba(37,99,235,0.35)",
//                   opacity: loading ? 0.85 : 1,
//                   transition: "transform 0.08s ease, box-shadow 0.08s ease",
//                 }}
//                 onMouseDown={(e) => {
//                   if (!loading) {
//                     e.currentTarget.style.transform = "translateY(1px)";
//                     e.currentTarget.style.boxShadow =
//                       "0 6px 15px rgba(37,99,235,0.3)";
//                   }
//                 }}
//                 onMouseUp={(e) => {
//                   if (!loading) {
//                     e.currentTarget.style.transform = "translateY(0)";
//                     e.currentTarget.style.boxShadow =
//                       "0 10px 25px rgba(37,99,235,0.35)";
//                   }
//                 }}
//               >
//                 {loading ? "Predicting…" : "Predict end date & risk"}
//               </button>
//             </div>
//           </div>

//           {error && (
//             <div
//               style={{
//                 marginTop: "10px",
//                 fontSize: "12px",
//                 color: "#b91c1c",
//                 background: "#fee2e2",
//                 padding: "8px",
//                 borderRadius: "10px",
//                 border: "1px solid #fecaca",
//               }}
//             >
//               Error: {error}
//             </div>
//           )}
//         </section>

//         {/* Results / insights panel */}
//         <section
//           style={{
//             background: "rgba(255,255,255,0.96)",
//             backdropFilter: "blur(10px)",
//             padding: "clamp(14px, 3vw, 20px)",
//             borderRadius: "18px",
//             boxShadow: "0 16px 40px rgba(15,23,42,0.10)",
//             border: "1px solid rgba(191,219,254,0.9)",
//           }}
//         >
//           <h2
//             style={{
//               fontSize: "clamp(14px, 3vw, 16px)",
//               fontWeight: 700,
//               marginBottom: "10px",
//               color: "#0f172a",
//             }}
//           >
//             Prediction & context
//           </h2>

//           {!prediction && (
//             <p style={{ fontSize: "13px", color: "#475569" }}>
//               Fill in the project details on the left and click{" "}
//               <strong>"Predict end date &amp; risk"</strong> to see the model's
//               expected completion date and risk classification.
//             </p>
//           )}

//           {prediction && (
//             <div style={{ fontSize: "13px" }}>
//               <div
//                 style={{
//                   padding: "12px 14px",
//                   borderRadius: "14px",
//                   background: "linear-gradient(135deg,#e0f2fe,#dbeafe,#fff7ed)",
//                   marginBottom: "12px",
//                   border: "1px solid #bfdbfe",
//                 }}
//               >
//                 <div style={{ fontSize: "12px", color: "#1d4ed8" }}>
//                   Predicted completion date
//                 </div>
//                 <div
//                   style={{
//                     fontSize: "clamp(16px, 4vw, 20px)",
//                     fontWeight: 800,
//                     marginTop: "4px",
//                     color: "#0f172a",
//                   }}
//                 >
//                   {prediction.predicted_end_date}
//                 </div>
//               </div>

//               <div
//                 style={{
//                   padding: "11px 13px",
//                   borderRadius: "14px",
//                   background: "#f9fafb",
//                   marginBottom: "12px",
//                   border: "1px dashed #cbd5f5",
//                 }}
//               >
//                 <div style={{ fontSize: "12px", color: "#4b5563" }}>
//                   Schedule tightness vs model
//                 </div>

//                 <div
//                   style={{
//                     fontSize: "12px",
//                     color: "#6b7280",
//                     marginTop: "4px",
//                   }}
//                 >
//                   Model expects completion around{" "}
//                   <strong>{prediction.predicted_end_date}</strong>. Your
//                   proposed end date implies a schedule residual of{" "}
//                   <strong>{prediction.residual_estimate_days} days</strong>{" "}
//                   (proposed − model).
//                 </div>

//                 <div
//                   style={{
//                     marginTop: "8px",
//                     fontSize: "12px",
//                     color: "#4b5563",
//                   }}
//                 >
//                   Delay risk classifications:
//                 </div>

//                 <RiskBadge label="Z-score" value={prediction.risk_zscore} />
//                 <RiskBadge
//                   label="Percentile"
//                   value={prediction.risk_percentile}
//                 />
//                 <RiskBadge label="IQR" value={prediction.risk_iqr} />
//               </div>

//               <div>
//                 <h3
//                   style={{
//                     fontSize: "13px",
//                     fontWeight: 600,
//                     marginBottom: "4px",
//                     color: "#0f172a",
//                   }}
//                 >
//                   How to use this for decision-making
//                 </h3>
//                 <ul
//                   style={{
//                     fontSize: "12px",
//                     color: "#4b5563",
//                     paddingLeft: "18px",
//                     lineHeight: 1.5,
//                   }}
//                 >
//                   <li>
//                     Compare the predicted completion date to the contractual end
//                     date to estimate buffer months.
//                   </li>
//                   <li>
//                     For high-risk regions (e.g. small island states, African
//                     regional programs) consider additional supervision missions
//                     or contingency planning.
//                   </li>
//                   <li>
//                     Combine this prediction with your per-donor / per-sector
//                     delay tables to prioritize where portfolio management
//                     attention is most needed.
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           )}
//         </section>
//       </main>

//       {/* Additional Insights Section */}
//       <section
//         style={{
//           marginTop: "26px",
//           background: "rgba(255,255,255,0.9)",
//           backdropFilter: "blur(10px)",
//           padding: "clamp(16px, 4vw, 24px)",
//           borderRadius: "18px",
//           boxShadow: "0 16px 40px rgba(15,23,42,0.10)",
//           border: "1px solid rgba(191,219,254,0.9)",
//         }}
//       >
//         <h2
//           style={{
//             fontSize: "clamp(16px, 4vw, 20px)",
//             fontWeight: 700,
//             marginBottom: "20px",
//             color: "#0f172a",
//           }}
//         >
//           Additional Insights & Analysis
//         </h2>

//         {/* Responsive grid for insights */}
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns:
//               "repeat(auto-fit, minmax(min(100%, 450px), 1fr))",
//             gap: "32px",
//             alignItems: "start",
//           }}
//         >
//           <InsightBox
//             title="Timeliness vs. Project Budget Size"
//             imageSrc="src/assets/MONEY VS DELAY.png"
//           />

//           <InsightBox
//             title="Start year vs. project delay rate"
//             imageSrc="src/assets/starttime vs delay.png"
//           />

//           <InsightBox
//             title="Delay Patterns by Project Size (Commitment Amount)"
//             imageSrc="src/assets/SIZE VS DELAY.png"
//           />

//           <InsightBox
//             title="SHAP feature Importance for the project"
//             imageSrc="src/assets/shap values.png"
//           />
//           <div>
//             <h3
//               style={{
//                 fontSize: "clamp(14px, 3vw, 18px)",
//                 fontWeight: 600,
//                 marginBottom: "12px",
//                 color: "#1e293b",
//               }}
//             >
//               Project delay rate by specific countries
//             </h3>
//             <img
//               src="src/assets/newplot.png"
//               alt=""
//               style={{ width: "900px" }}
//             />
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// /* Small presentational components */

// function InfoCard({ title, text }) {
//   return (
//     <div
//       style={{
//         background: "rgba(239,246,255,0.95)",
//         borderRadius: "14px",
//         padding: "12px 14px",
//         border: "1px solid rgba(191,219,254,0.9)",
//         boxShadow: "0 10px 25px rgba(148,163,184,0.18)",
//       }}
//     >
//       <div
//         style={{
//           fontSize: "12px",
//           fontWeight: 700,
//           marginBottom: "4px",
//           color: "#1d4ed8",
//           letterSpacing: "0.03em",
//           textTransform: "uppercase",
//         }}
//       >
//         {title}
//       </div>
//       <div style={{ fontSize: "12px", color: "#1f2937" }}>{text}</div>
//     </div>
//   );
// }

// function Field({
//   label,
//   name,
//   value,
//   onChange,
//   type = "text",
//   placeholder,
//   fullRow,
// }) {
//   return (
//     <div
//       style={{
//         gridColumn: fullRow ? "1 / -1" : "auto",
//       }}
//     >
//       <label
//         htmlFor={name}
//         style={{
//           display: "block",
//           fontSize: "11px",
//           marginBottom: "3px",
//           color: "#475569",
//         }}
//       >
//         {label}
//       </label>
//       <input
//         id={name}
//         name={name}
//         value={value}
//         onChange={onChange}
//         type={type}
//         placeholder={placeholder}
//         style={{
//           width: "100%",
//           padding: "7px 9px",
//           fontSize: "12px",
//           borderRadius: "10px",
//           border: "1px solid #cbd5f5",
//           outline: "none",
//           backgroundColor: "#f9fbff",
//           color: "#0f172a",
//           boxSizing: "border-box",
//         }}
//       />
//     </div>
//   );
// }

// function RiskBadge({ label, value }) {
//   const colors = {
//     early: { bg: "#d1fae5", text: "#065f46" },
//     on_time: { bg: "#dbeafe", text: "#1e40af" },
//     delayed: { bg: "#fef9c3", text: "#92400e" },
//     significantly_delayed: { bg: "#fee2e2", text: "#991b1b" },
//   };

//   const c = colors[value] || colors["on_time"];

//   return (
//     <div style={{ marginTop: "6px" }}>
//       <span
//         style={{
//           display: "inline-block",
//           padding: "5px 12px",
//           borderRadius: "999px",
//           background: c.bg,
//           color: c.text,
//           fontSize: "11px",
//           fontWeight: 600,
//           marginRight: "8px",
//         }}
//       >
//         {label}: {value}
//       </span>
//     </div>
//   );
// }

// function InsightBox({ title, imageSrc }) {
//   return (
//     <div style={{ marginBottom: "20px", width: "100%" }}>
//       <h3
//         style={{
//           fontSize: "clamp(14px, 3vw, 18px)",
//           fontWeight: 600,
//           marginBottom: "12px",
//           color: "#1e293b",
//         }}
//       >
//         {title}
//       </h3>
//       <div
//         style={{
//           width: "100%",
//           overflow: "hidden",
//           borderRadius: "12px",
//           boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//           backgroundColor: "#f8fafc",
//         }}
//       >
//         <img
//           src={imageSrc}
//           alt={title}
//           style={{
//             width: "100%",
//             height: "auto",
//             display: "block",
//           }}
//         />
//       </div>
//     </div>
//   );
// }

// export default App;
