

//Sending email to client

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Exam({ student, examTime = 300 }) { // default 5 minutes
//   const [answers, setAnswers] = useState({});
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [submitted, setSubmitted] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(examTime);
//   const navigate = useNavigate();

//   const questions = [
//     {
//       q: "AI stands for?",
//       options: ["Artificial Intelligence", "Automatic Info", "Applied Innovation"],
//       answer: "Artificial Intelligence",
//     },
//     {
//       q: "React is a?",
//       options: ["Framework", "Library", "Language"],
//       answer: "Library",
//     },
//     {
//       q: "JS is?",
//       options: ["Compiled", "Interpreted", "Both"],
//       answer: "Interpreted",
//     },
//   ];

//   // Countdown timer
//   useEffect(() => {
//     if (submitted) return;
//     if (timeLeft <= 0) {
//       handleSubmit();
//       return;
//     }
//     const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
//     return () => clearInterval(timer);
//   }, [timeLeft, submitted]);

//   // Keyboard navigation: 1-3 selects option, arrows for next/prev
//   useEffect(() => {
//     const handleKey = (e) => {
//       if (submitted) return;

//       const currentOpts = questions[currentQuestion].options;
//       if (["1","2","3","4"].includes(e.key)) {
//         const index = parseInt(e.key, 10) - 1;
//         if (index < currentOpts.length) {
//           setAnswers({ ...answers, [currentQuestion]: currentOpts[index] });
//         }
//       } else if (e.key === "ArrowRight") handleNext();
//       else if (e.key === "ArrowLeft") handlePrev();
//     };

//     window.addEventListener("keydown", handleKey);
//     return () => window.removeEventListener("keydown", handleKey);
//   }, [answers, currentQuestion, submitted]);

//   const handleSubmit = async () => {
//     let score = 0;
//     questions.forEach((q, i) => {
//       if (answers[i] === q.answer) score++;
//     });

//     try {
//       const res = await axios.post(
//         "http://localhost:8000/submit-exam",
//         { uniqueId: student.uniqueId, score },
//         { responseType: "blob" }
//       );

//       const blob = new Blob([res.data], { type: "application/pdf" });
//       const link = document.createElement("a");
//       link.href = window.URL.createObjectURL(blob);
//       link.download = "certificate.pdf";
//       link.click();

//       setSubmitted(true);

//       // ✅ Show success for 3s, then redirect + refresh
//       setTimeout(() => {
//         window.location.href = "/";
//       }, 3000);

//     } catch (err) {
//       alert("Error submitting exam. Try again.");
//       console.error(err);
//     }
//   };

//   const handleNext = () => {
//     if (currentQuestion < questions.length - 1) setCurrentQuestion(currentQuestion + 1);
//     else handleSubmit();
//   };

//   const handlePrev = () => {
//     if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
//   };

//   if (!student) {
//     // Redirect to login if student not set
//     navigate("/login");
//     return null;
//   }

//   if (submitted)
//     return (
//       <div style={styles.container}>
//         <div style={styles.successCard}>
//           <h2 style={{ color: "#28a745", fontSize: 22, fontWeight: "bold" }}>
//             ✅ Exam submitted! Certificate sent to {student.email}. Redirecting...
//           </h2>
//         </div>
//       </div>
//     );

//   const currentQ = questions[currentQuestion];
//   const progressPercent = ((Object.keys(answers).length) / questions.length) * 100;

//   return (
//     <div style={styles.container}>
//       {/* Fixed Top Bar */}
//       <div style={styles.topBar}>
//         <span style={{ fontWeight: "bold" }}>{student.name}</span>
//         <div style={styles.timer}>
//           Time Left: {Math.floor(timeLeft / 60)}:{("0" + (timeLeft % 60)).slice(-2)}
//         </div>
//         <div style={styles.progressBar}>
//           <div style={{ ...styles.progress, width: `${progressPercent}%` }} />
//         </div>
//       </div>

//       <div style={styles.card}>
//         <p style={styles.question}>
//           {currentQuestion + 1}. {currentQ.q}
//         </p>

//         {currentQ.options.map((opt, index) => (
//           <label
//             key={opt}
//             style={{
//               ...styles.option,
//               backgroundColor: answers[currentQuestion] === opt ? "#007BFF" : "#f1f1f1",
//               color: answers[currentQuestion] === opt ? "#fff" : "#000",
//               borderColor: answers[currentQuestion] === opt ? "#0056b3" : "#ccc",
//             }}
//           >
//             <input
//               type="radio"
//               name={`q${currentQuestion}`}
//               value={opt}
//               checked={answers[currentQuestion] === opt}
//               onChange={() => setAnswers({ ...answers, [currentQuestion]: opt })}
//               style={styles.radio}
//             />
//             {opt} ({index + 1})
//           </label>
//         ))}

//         <div style={styles.navButtons}>
//           <button
//             style={{ ...styles.navButton, backgroundColor: currentQuestion === 0 ? "#888" : "#00d4ff" }}
//             onClick={handlePrev}
//             disabled={currentQuestion === 0}
//           >
//             Previous
//           </button>
//           <button style={styles.navButton} onClick={handleNext}>
//             {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     minHeight: "100vh",
//     backgroundColor: "#1e1e2f",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     paddingTop: 80,
//     paddingBottom: 40,
//   },
//   topBar: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     width: "100%",
//     backgroundColor: "#2c2c3e",
//     color: "#fff",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     padding: "10px 20px",
//     zIndex: 10,
//     boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
//   },
//   timer: {
//     marginTop: 5,
//     fontWeight: "bold",
//     color: "#ffdd57",
//   },
//   progressBar: {
//     marginTop: 5,
//     width: "100%",
//     height: 8,
//     backgroundColor: "#444",
//     borderRadius: 4,
//     overflow: "hidden",
//   },
//   progress: {
//     height: "100%",
//     backgroundColor: "#00d4ff",
//     borderRadius: 4,
//     transition: "width 0.3s ease",
//   },
//   card: {
//     backgroundColor: "#2c2c3e",
//     padding: 30,
//     borderRadius: 20,
//     width: "90%",
//     maxWidth: 600,
//     color: "#fff",
//     boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
//   },
//   question: {
//     fontWeight: "bold",
//     fontSize: 20,
//     marginBottom: 15,
//   },
//   option: {
//     display: "block",
//     padding: "12px 18px",
//     marginBottom: 10,
//     borderRadius: 10,
//     border: "2px solid #ccc",
//     cursor: "pointer",
//     transition: "0.3s",
//   },
//   radio: {
//     marginRight: 10,
//   },
//   navButtons: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginTop: 20,
//   },
//   navButton: {
//     padding: "12px 20px",
//     fontSize: 16,
//     fontWeight: "bold",
//     borderRadius: 8,
//     border: "none",
//     cursor: "pointer",
//     backgroundColor: "#00d4ff",
//     color: "#1e1e2f",
//     transition: "0.3s",
//   },
//   successCard: {
//     backgroundColor: "#2c2c3e",
//     padding: 40,
//     borderRadius: 20,
//     textAlign: "center",
//     boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
//   },
// };

// export default Exam;

//secure code with id
//This code works as per the the registration rules best and final
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Exam({ student, examTime = 300 }) { // default 5 minutes
//   const [answers, setAnswers] = useState({});
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [submitted, setSubmitted] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(examTime);
//   const navigate = useNavigate();

//   const questions = [
//     {
//       q: "AI stands for?",
//       options: ["Artificial Intelligence", "Automatic Info", "Applied Innovation"],
//       answer: "Artificial Intelligence",
//     },
//     {
//       q: "React is a?",
//       options: ["Framework", "Library", "Language"],
//       answer: "Library",
//     },
//     {
//       q: "JS is?",
//       options: ["Compiled", "Interpreted", "Both"],
//       answer: "Interpreted",
//     },
//   ];

//   // Countdown timer
//   useEffect(() => {
//     if (submitted) return;
//     if (timeLeft <= 0) {
//       handleSubmit();
//       return;
//     }
//     const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
//     return () => clearInterval(timer);
//   }, [timeLeft, submitted]);

//   // Keyboard navigation: 1-3 selects option, arrows for next/prev
//   useEffect(() => {
//     const handleKey = (e) => {
//       if (submitted) return;
//       const currentOpts = questions[currentQuestion].options;
//       if (["1","2","3","4"].includes(e.key)) {
//         const index = parseInt(e.key, 10) - 1;
//         if (index < currentOpts.length) {
//           setAnswers({ ...answers, [currentQuestion]: currentOpts[index] });
//         }
//       } else if (e.key === "ArrowRight") handleNext();
//       else if (e.key === "ArrowLeft") handlePrev();
//     };
//     window.addEventListener("keydown", handleKey);
//     return () => window.removeEventListener("keydown", handleKey);
//   }, [answers, currentQuestion, submitted]);

//   const handleSubmit = async () => {
//     let score = 0;
//     questions.forEach((q, i) => {
//       if (answers[i] === q.answer) score++;
//     });

//     try {
//       // ⚡ Send studentId, not uniqueId
//       const res = await axios.post(
//         "http://localhost:8000/submit-exam",
//         { uniqueId: student.studentId, score },
//         { responseType: "blob" }
//       );

//       const blob = new Blob([res.data], { type: "application/pdf" });
//       const link = document.createElement("a");
//       link.href = window.URL.createObjectURL(blob);
//       link.download = "certificate.pdf";
//       link.click();

//       setSubmitted(true);

//       // ✅ Show success message for 3s, then redirect
//       setTimeout(() => {
//         window.location.href = "/";
//       }, 3000);

//     } catch (err) {
//       console.error(err);
//       if (err.response && err.response.status === 403) {
//         alert("❌ Exam already submitted.");
//       } else if (err.response && err.response.data?.error) {
//         alert("❌ " + err.response.data.error);
//       } else {
//         alert("❌ Error submitting exam. Try again.");
//       }
//     }
//   };

//   const handleNext = () => {
//     if (currentQuestion < questions.length - 1) setCurrentQuestion(currentQuestion + 1);
//     else handleSubmit();
//   };

//   const handlePrev = () => {
//     if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
//   };

//   if (!student) {
//     navigate("/login");
//     return null;
//   }

//   if (submitted)
//     return (
//       <div style={styles.container}>
//         <div style={styles.successCard}>
//           <h2 style={{ color: "#28a745", fontSize: 22, fontWeight: "bold" }}>
//             ✅ Exam submitted! Certificate downloaded. Redirecting...
//           </h2>
//         </div>
//       </div>
//     );

//   const currentQ = questions[currentQuestion];
//   const progressPercent = ((Object.keys(answers).length) / questions.length) * 100;

//   return (
//     <div style={styles.container}>
//       <div style={styles.topBar}>
//         <span style={{ fontWeight: "bold" }}>{student.name}</span>
//         <div style={styles.timer}>
//           Time Left: {Math.floor(timeLeft / 60)}:{("0" + (timeLeft % 60)).slice(-2)}
//         </div>
//         <div style={styles.progressBar}>
//           <div style={{ ...styles.progress, width: `${progressPercent}%` }} />
//         </div>
//       </div>

//       <div style={styles.card}>
//         <p style={styles.question}>
//           {currentQuestion + 1}. {currentQ.q}
//         </p>

//         {currentQ.options.map((opt, index) => (
//           <label
//             key={opt}
//             style={{
//               ...styles.option,
//               backgroundColor: answers[currentQuestion] === opt ? "#007BFF" : "#f1f1f1",
//               color: answers[currentQuestion] === opt ? "#fff" : "#000",
//               borderColor: answers[currentQuestion] === opt ? "#0056b3" : "#ccc",
//             }}
//           >
//             <input
//               type="radio"
//               name={`q${currentQuestion}`}
//               value={opt}
//               checked={answers[currentQuestion] === opt}
//               onChange={() => setAnswers({ ...answers, [currentQuestion]: opt })}
//               style={styles.radio}
//             />
//             {opt} ({index + 1})
//           </label>
//         ))}

//         <div style={styles.navButtons}>
//           <button
//             style={{ ...styles.navButton, backgroundColor: currentQuestion === 0 ? "#888" : "#00d4ff" }}
//             onClick={handlePrev}
//             disabled={currentQuestion === 0}
//           >
//             Previous
//           </button>
//           <button style={styles.navButton} onClick={handleNext}>
//             {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     minHeight: "100vh",
//     backgroundColor: "#1e1e2f",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     paddingTop: 80,
//     paddingBottom: 40,
//   },
//   topBar: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     width: "100%",
//     backgroundColor: "#2c2c3e",
//     color: "#fff",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     padding: "10px 20px",
//     zIndex: 10,
//     boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
//   },
//   timer: {
//     marginTop: 5,
//     fontWeight: "bold",
//     color: "#ffdd57",
//   },
//   progressBar: {
//     marginTop: 5,
//     width: "100%",
//     height: 8,
//     backgroundColor: "#444",
//     borderRadius: 4,
//     overflow: "hidden",
//   },
//   progress: {
//     height: "100%",
//     backgroundColor: "#00d4ff",
//     borderRadius: 4,
//     transition: "width 0.3s ease",
//   },
//   card: {
//     backgroundColor: "#2c2c3e",
//     padding: 30,
//     borderRadius: 20,
//     width: "90%",
//     maxWidth: 600,
//     color: "#fff",
//     boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
//   },
//   question: {
//     fontWeight: "bold",
//     fontSize: 20,
//     marginBottom: 15,
//   },
//   option: {
//     display: "block",
//     padding: "12px 18px",
//     marginBottom: 10,
//     borderRadius: 10,
//     border: "2px solid #ccc",
//     cursor: "pointer",
//     transition: "0.3s",
//   },
//   radio: {
//     marginRight: 10,
//   },
//   navButtons: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginTop: 20,
//   },
//   navButton: {
//     padding: "12px 20px",
//     fontSize: 16,
//     fontWeight: "bold",
//     borderRadius: 8,
//     border: "none",
//     cursor: "pointer",
//     backgroundColor: "#00d4ff",
//     color: "#1e1e2f",
//     transition: "0.3s",
//   },
//   successCard: {
//     backgroundColor: "#2c2c3e",
//     padding: 40,
//     borderRadius: 20,
//     textAlign: "center",
//     boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
//   },
// };

// export default Exam;
//proctor

// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Exam({ student, examTime = 300 }) {
//   const [answers, setAnswers] = useState({});
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [submitted, setSubmitted] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(examTime);
//   const videoRef = useRef(null);
//   const navigate = useNavigate();

//   const questions = [
//     { q: "AI stands for?", options: ["Artificial Intelligence", "Automatic Info", "Applied Innovation"], answer: "Artificial Intelligence" },
//     { q: "React is a?", options: ["Framework", "Library", "Language"], answer: "Library" },
//     { q: "JS is?", options: ["Compiled", "Interpreted", "Both"], answer: "Interpreted" },
//   ];

//   // Countdown timer
//   useEffect(() => {
//     if (submitted) return;
//     if (timeLeft <= 0) {
//       handleSubmit();
//       return;
//     }
//     const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
//     return () => clearInterval(timer);
//   }, [timeLeft, submitted]);

//   // Keyboard navigation (1-3 selects option, arrows for prev/next)
//   useEffect(() => {
//     const handleKey = (e) => {
//       if (submitted) return;
//       const currentOpts = questions[currentQuestion].options;
//       if (["1","2","3","4"].includes(e.key)) {
//         const index = parseInt(e.key, 10) - 1;
//         if (index < currentOpts.length) setAnswers({ ...answers, [currentQuestion]: currentOpts[index] });
//       } else if (e.key === "ArrowRight") handleNext();
//       else if (e.key === "ArrowLeft") handlePrev();
//     };
//     window.addEventListener("keydown", handleKey);
//     return () => window.removeEventListener("keydown", handleKey);
//   }, [answers, currentQuestion, submitted]);

//   // Tab switch detection
//   useEffect(() => {
//     const handleVisibility = () => {
//       if (document.hidden) alert("⚠️ You switched tabs! Stay on the exam page.");
//     };
//     document.addEventListener("visibilitychange", handleVisibility);
//     return () => document.removeEventListener("visibilitychange", handleVisibility);
//   }, []);

//   // Camera setup (hidden)
//   useEffect(() => {
//     async function setupCamera() {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
//         if (videoRef.current) videoRef.current.srcObject = stream;
//       } catch (err) {
//         console.warn("Camera access denied or not available.");
//       }
//     }
//     setupCamera();
//   }, []);

//   // Fullscreen enforcement
//   useEffect(() => {
//     function enforceFullscreen() {
//       if (!document.fullscreenElement) {
//         alert("⚠️ You must stay in fullscreen mode during the exam.");
//         document.documentElement.requestFullscreen().catch(() => {});
//       }
//     }
//     document.addEventListener("fullscreenchange", enforceFullscreen);
//     enforceFullscreen(); // initial request
//     return () => document.removeEventListener("fullscreenchange", enforceFullscreen);
//   }, []);

//   // Disable right-click & shortcuts
//   useEffect(() => {
//     const handleContextMenu = (e) => e.preventDefault();
//     const handleShortcuts = (e) => {
//       // disable Ctrl+Tab, Ctrl+Shift+I, F12, Ctrl+C/V/X
//       if (
//         e.key === "F12" ||
//         (e.ctrlKey && ["c","v","x","t","Tab","Shift","i"].includes(e.key))
//       ) e.preventDefault();
//     };
//     document.addEventListener("contextmenu", handleContextMenu);
//     document.addEventListener("keydown", handleShortcuts);
//     return () => {
//       document.removeEventListener("contextmenu", handleContextMenu);
//       document.removeEventListener("keydown", handleShortcuts);
//     };
//   }, []);

//   const handleSubmit = async () => {
//     let score = 0;
//     questions.forEach((q, i) => { if (answers[i] === q.answer) score++; });

//     try {
//       const res = await axios.post(
//         "http://localhost:8000/submit-exam",
//         { uniqueId: student.studentId, score },
//         { responseType: "blob" }
//       );

//       const blob = new Blob([res.data], { type: "application/pdf" });
//       const link = document.createElement("a");
//       link.href = window.URL.createObjectURL(blob);
//       link.download = "certificate.pdf";
//       link.click();

//       setSubmitted(true);
//       setTimeout(() => window.location.href = "/", 3000);
//     } catch (err) {
//       console.error(err);
//       if (err.response?.status === 403) alert("❌ Exam already submitted.");
//       else if (err.response?.data?.error) alert("❌ " + err.response.data.error);
//       else alert("❌ Error submitting exam. Try again.");
//     }
//   };

//   const handleNext = () => currentQuestion < questions.length - 1 ? setCurrentQuestion(currentQuestion + 1) : handleSubmit();
//   const handlePrev = () => currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1);

//   if (!student) { navigate("/login"); return null; }
//   if (submitted) return (
//     <div style={styles.container}>
//       <div style={styles.successCard}>
//         <h2 style={{ color: "#28a745", fontSize: 22, fontWeight: "bold" }}>
//           ✅ Exam submitted! Certificate downloaded. Redirecting...
//         </h2>
//       </div>
//     </div>
//   );

//   const currentQ = questions[currentQuestion];
//   const progressPercent = (Object.keys(answers).length / questions.length) * 100;

//   return (
//     <div style={styles.container}>
//       {/* Hidden camera */}
//       <video ref={videoRef} style={{ display: "none" }} autoPlay playsInline muted />

//       <div style={styles.topBar}>
//         <span style={{ fontWeight: "bold" }}>{student.name}</span>
//         <div style={styles.timer}>Time Left: {Math.floor(timeLeft / 60)}:{("0" + (timeLeft % 60)).slice(-2)}</div>
//         <div style={styles.progressBar}><div style={{ ...styles.progress, width: `${progressPercent}%` }} /></div>
//       </div>

//       <div style={styles.card}>
//         <p style={styles.question}>{currentQuestion + 1}. {currentQ.q}</p>
//         {currentQ.options.map((opt, index) => (
//           <label
//             key={opt}
//             style={{
//               ...styles.option,
//               backgroundColor: answers[currentQuestion] === opt ? "#007BFF" : "#f1f1f1",
//               color: answers[currentQuestion] === opt ? "#fff" : "#000",
//               borderColor: answers[currentQuestion] === opt ? "#0056b3" : "#ccc",
//             }}
//           >
//             <input
//               type="radio"
//               name={`q${currentQuestion}`}
//               value={opt}
//               checked={answers[currentQuestion] === opt}
//               onChange={() => setAnswers({ ...answers, [currentQuestion]: opt })}
//               style={styles.radio}
//             />
//             {opt} ({index + 1})
//           </label>
//         ))}

//         <div style={styles.navButtons}>
//           <button style={{ ...styles.navButton, backgroundColor: currentQuestion === 0 ? "#888" : "#00d4ff" }} onClick={handlePrev} disabled={currentQuestion === 0}>Previous</button>
//           <button style={styles.navButton} onClick={handleNext}>{currentQuestion === questions.length - 1 ? "Submit" : "Next"}</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: { minHeight: "100vh", backgroundColor: "#1e1e2f", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 80, paddingBottom: 40 },
//   topBar: { position: "fixed", top: 0, left: 0, width: "100%", backgroundColor: "#2c2c3e", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 20px", zIndex: 10, boxShadow: "0 4px 10px rgba(0,0,0,0.3)" },
//   timer: { marginTop: 5, fontWeight: "bold", color: "#ffdd57" },
//   progressBar: { marginTop: 5, width: "100%", height: 8, backgroundColor: "#444", borderRadius: 4, overflow: "hidden" },
//   progress: { height: "100%", backgroundColor: "#00d4ff", borderRadius: 4, transition: "width 0.3s ease" },
//   card: { backgroundColor: "#2c2c3e", padding: 30, borderRadius: 20, width: "90%", maxWidth: 600, color: "#fff", boxShadow: "0 8px 20px rgba(0,0,0,0.4)" },
//   question: { fontWeight: "bold", fontSize: 20, marginBottom: 15 },
//   option: { display: "block", padding: "12px 18px", marginBottom: 10, borderRadius: 10, border: "2px solid #ccc", cursor: "pointer", transition: "0.3s" },
//   radio: { marginRight: 10 },
//   navButtons: { display: "flex", justifyContent: "space-between", marginTop: 20 },
//   navButton: { padding: "12px 20px", fontSize: 16, fontWeight: "bold", borderRadius: 8, border: "none", cursor: "pointer", backgroundColor: "#00d4ff", color: "#1e1e2f", transition: "0.3s" },
//   successCard: { backgroundColor: "#2c2c3e", padding: 40, borderRadius: 20, textAlign: "center", boxShadow: "0 8px 20px rgba(0,0,0,0.4)" },
// };

// export default Exam;

//upload code to git
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Exam({ student, examTime = 300 }) {
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(examTime);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const questions = [
    { q: "AI stands for?", options: ["Artificial Intelligence", "Automatic Info", "Applied Innovation"], answer: "Artificial Intelligence" },
    { q: "React is a?", options: ["Framework", "Library", "Language"], answer: "Library" },
    { q: "JS is?", options: ["Compiled", "Interpreted", "Both"], answer: "Interpreted" },
  ];

  // Countdown timer
  useEffect(() => {
    if (submitted) return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (submitted) return;
      const currentOpts = questions[currentQuestion].options;
      if (["1","2","3","4"].includes(e.key)) {
        const index = parseInt(e.key, 10) - 1;
        if (index < currentOpts.length) setAnswers({ ...answers, [currentQuestion]: currentOpts[index] });
      } else if (e.key === "ArrowRight") handleNext();
      else if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [answers, currentQuestion, submitted]);

  // Tab switch detection
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) alert("⚠️ You switched tabs! Stay on the exam page.");
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Camera setup
  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.warn("Camera access denied or not available.");
      }
    }
    setupCamera();
  }, []);

  // Fullscreen enforcement
  useEffect(() => {
    function enforceFullscreen() {
      if (!document.fullscreenElement) {
        alert("⚠️ You must stay in fullscreen mode during the exam.");
        document.documentElement.requestFullscreen().catch(() => {});
      }
    }
    document.addEventListener("fullscreenchange", enforceFullscreen);
    enforceFullscreen();
    return () => document.removeEventListener("fullscreenchange", enforceFullscreen);
  }, []);

  // Disable right-click & shortcuts
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    const handleShortcuts = (e) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && ["c","v","x","t","Tab","Shift","i"].includes(e.key))
      ) e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleShortcuts);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleShortcuts);
    };
  }, []);

  // ✅ Fixed submit logic
  const handleSubmit = async () => {
    let score = 0;
    questions.forEach((q, i) => { if (answers[i] === q.answer) score++; });

    try {
      const res = await axios.post(
        "http://localhost:8000/submit-exam",
        { uniqueId: student.studentId, score },
        { responseType: "blob", validateStatus: () => true }
      );

      const contentType = res.headers["content-type"];

      if (contentType && contentType.includes("application/pdf")) {
        const blob = new Blob([res.data], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "certificate.pdf";
        link.click();

        setSubmitted(true);
        setTimeout(() => window.location.href = "/", 3000);
      } else {
        const text = await res.data.text?.().catch(() => null);
        alert("❌ " + (text || "Error submitting exam."));
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("❌ Error submitting exam. Try again.");
    }
  };

  const handleNext = () =>
    currentQuestion < questions.length - 1
      ? setCurrentQuestion(currentQuestion + 1)
      : handleSubmit();

  const handlePrev = () =>
    currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1);

  if (!student) { navigate("/login"); return null; }
  if (submitted) return (
    <div style={styles.container}>
      <div style={styles.successCard}>
        <h2 style={{ color: "#28a745", fontSize: 22, fontWeight: "bold" }}>
          ✅ Exam submitted! Certificate downloaded. Redirecting...
        </h2>
      </div>
    </div>
  );

  const currentQ = questions[currentQuestion];
  const progressPercent = (Object.keys(answers).length / questions.length) * 100;

  return (
    <div style={styles.container}>
      {/* Hidden camera */}
      <video ref={videoRef} style={{ display: "none" }} autoPlay playsInline muted />

      <div style={styles.topBar}>
        <span style={{ fontWeight: "bold" }}>{student.name}</span>
        <div style={styles.timer}>
          Time Left: {Math.floor(timeLeft / 60)}:{("0" + (timeLeft % 60)).slice(-2)}
        </div>
        <div style={styles.progressBar}>
          <div style={{ ...styles.progress, width: `${progressPercent}%` }} />
        </div>
      </div>

      <div style={styles.card}>
        <p style={styles.question}>{currentQuestion + 1}. {currentQ.q}</p>
        {currentQ.options.map((opt, index) => (
          <label
            key={opt}
            style={{
              ...styles.option,
              backgroundColor: answers[currentQuestion] === opt ? "#007BFF" : "#f1f1f1",
              color: answers[currentQuestion] === opt ? "#fff" : "#000",
              borderColor: answers[currentQuestion] === opt ? "#0056b3" : "#ccc",
            }}
          >
            <input
              type="radio"
              name={`q${currentQuestion}`}
              value={opt}
              checked={answers[currentQuestion] === opt}
              onChange={() => setAnswers({ ...answers, [currentQuestion]: opt })}
              style={styles.radio}
            />
            {opt} ({index + 1})
          </label>
        ))}

        <div style={styles.navButtons}>
          <button
            style={{ ...styles.navButton, backgroundColor: currentQuestion === 0 ? "#888" : "#00d4ff" }}
            onClick={handlePrev}
            disabled={currentQuestion === 0}
          >
            Previous
          </button>
          <button
            style={styles.navButton}
            onClick={handleNext}
          >
            {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", backgroundColor: "#1e1e2f", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 80, paddingBottom: 40 },
  topBar: { position: "fixed", top: 0, left: 0, width: "100%", backgroundColor: "#2c2c3e", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 20px", zIndex: 10, boxShadow: "0 4px 10px rgba(0,0,0,0.3)" },
  timer: { marginTop: 5, fontWeight: "bold", color: "#ffdd57" },
  progressBar: { marginTop: 5, width: "100%", height: 8, backgroundColor: "#444", borderRadius: 4, overflow: "hidden" },
  progress: { height: "100%", backgroundColor: "#00d4ff", borderRadius: 4, transition: "width 0.3s ease" },
  card: { backgroundColor: "#2c2c3e", padding: 30, borderRadius: 20, width: "90%", maxWidth: 600, color: "#fff", boxShadow: "0 8px 20px rgba(0,0,0,0.4)" },
  question: { fontWeight: "bold", fontSize: 20, marginBottom: 15 },
  option: { display: "block", padding: "12px 18px", marginBottom: 10, borderRadius: 10, border: "2px solid #ccc", cursor: "pointer", transition: "0.3s" },
  radio: { marginRight: 10 },
  navButtons: { display: "flex", justifyContent: "space-between", marginTop: 20 },
  navButton: { padding: "12px 20px", fontSize: 16, fontWeight: "bold", borderRadius: 8, border: "none", cursor: "pointer", backgroundColor: "#00d4ff", color: "#1e1e2f", transition: "0.3s" },
  successCard: { backgroundColor: "#2c2c3e", padding: 40, borderRadius: 20, textAlign: "center", boxShadow: "0 8px 20px rgba(0,0,0,0.4)" },
};

export default Exam;
