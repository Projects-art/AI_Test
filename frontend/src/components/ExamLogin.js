
// import React, { useState } from "react";
// import axios from "axios";

// function ExamLogin({ setStudent }) {
//   const [uniqueId, setUniqueId] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post("http://localhost:8000/exam-login", { uniqueId });
//       setStudent(res.data);
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div style={{
//       backgroundColor: "#f0f2f5",
//       minHeight: "100vh",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center"
//     }}>
//       <div style={{
//         backgroundColor: "#fff",
//         padding: "40px",
//         borderRadius: "12px",
//         textAlign: "center",
//         boxShadow: "0px 6px 15px rgba(0,0,0,0.2)",
//         width: "350px"
//       }}>
//         <h2 style={{ color: "#1a73e8", marginBottom: "20px" }}>Enter Unique ID</h2>
//         <input
//           type="text"
//           placeholder="Your ID"
//           value={uniqueId}
//           onChange={(e) => setUniqueId(e.target.value)}
//           style={{
//             padding: "10px",
//             margin: "10px 0",
//             width: "100%",
//             borderRadius: "6px",
//             border: "1px solid #ccc"
//           }}
//         />
//         <button
//           onClick={handleLogin}
//           style={{
//             padding: "10px 20px",
//             backgroundColor: "#1a73e8",
//             color: "#fff",
//             border: "none",
//             borderRadius: "6px",
//             cursor: "pointer",
//             width: "100%",
//             marginTop: "10px",
//             fontWeight: "bold"
//           }}
//         >
//           Start Exam
//         </button>
//         {error && <p style={{ color: "red", marginTop: "15px" }}>{error}</p>}
//       </div>
//     </div>
//   );
// }

// export default ExamLogin;

// secure login
// import React, { useState } from "react";
// import axios from "axios";

// axios.defaults.withCredentials = true; // ✅ send cookies with requests
// axios.defaults.baseURL = "http://localhost:8000"; // adjust for production

// function ExamLogin({ setStudent }) {
//   const [uniqueId, setUniqueId] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post("/exam-login", { uniqueId });
//       setStudent(res.data);
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div
//       style={{
//         backgroundColor: "#f0f2f5",
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: "#fff",
//           padding: "40px",
//           borderRadius: "12px",
//           textAlign: "center",
//           boxShadow: "0px 6px 15px rgba(0,0,0,0.2)",
//           width: "350px",
//         }}
//       >
//         <h2 style={{ color: "#1a73e8", marginBottom: "20px" }}>Enter Unique ID</h2>
//         <input
//           type="text"
//           placeholder="Your ID"
//           value={uniqueId}
//           onChange={(e) => setUniqueId(e.target.value)}
//           style={{
//             padding: "10px",
//             margin: "10px 0",
//             width: "100%",
//             borderRadius: "6px",
//             border: "1px solid #ccc",
//           }}
//         />
//         <button
//           onClick={handleLogin}
//           style={{
//             padding: "10px 20px",
//             backgroundColor: "#1a73e8",
//             color: "#fff",
//             border: "none",
//             borderRadius: "6px",
//             cursor: "pointer",
//             width: "100%",
//             marginTop: "10px",
//             fontWeight: "bold",
//           }}
//         >
//           Start Exam
//         </button>
//         {error && <p style={{ color: "red", marginTop: "15px" }}>{error}</p>}
//       </div>
//     </div>
//   );
// }

// export default ExamLogin;
// import React, { useState } from "react";
// import axios from "axios";

// axios.defaults.withCredentials = true; // ✅ send cookies with requests
// axios.defaults.baseURL = "http://localhost:8000"; // adjust for production

// function ExamLogin({ setStudent }) {
//   const [studentId, setStudentId] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post("/login", { studentId });
//       setStudent(res.data.student); // ✅ backend sends { success, student }
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div
//       style={{
//         backgroundColor: "#f0f2f5",
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: "#fff",
//           padding: "40px",
//           borderRadius: "12px",
//           textAlign: "center",
//           boxShadow: "0px 6px 15px rgba(0,0,0,0.2)",
//           width: "350px",
//         }}
//       >
//         <h2 style={{ color: "#1a73e8", marginBottom: "20px" }}>Enter Student ID</h2>
//         <input
//           type="text"
//           placeholder="Your Student ID"
//           value={studentId}
//           onChange={(e) => setStudentId(e.target.value)}
//           style={{
//             padding: "10px",
//             margin: "10px 0",
//             width: "100%",
//             borderRadius: "6px",
//             border: "1px solid #ccc",
//           }}
//         />
//         <button
//           onClick={handleLogin}
//           style={{
//             padding: "10px 20px",
//             backgroundColor: "#1a73e8",
//             color: "#fff",
//             border: "none",
//             borderRadius: "6px",
//             cursor: "pointer",
//             width: "100%",
//             marginTop: "10px",
//             fontWeight: "bold",
//           }}
//         >
//           Start Exam
//         </button>
//         {error && <p style={{ color: "red", marginTop: "15px" }}>{error}</p>}
//       </div>
//     </div>
//   );
// }

// export default ExamLogin;


//secure login 90-95%
// ExamLogin.js
//This code works as per the the registration rules best and final
// import React, { useState } from "react";
// import axios from "axios";

// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = "http://localhost:8000";

// function ExamLogin({ setStudent }) {
//   const [studentId, setStudentId] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post("/login", { studentId, password });
//       setStudent(res.data.student);
//       setError(""); // clear previous errors
//     } catch (err) {
//       setError(err.response?.data?.error || "Login failed");
//     }
//   };

//   return (
//     <div style={{ backgroundColor: "#f0f2f5", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
//       <div style={{ backgroundColor: "#fff", padding: "40px", borderRadius: "12px", textAlign: "center", boxShadow: "0px 6px 15px rgba(0,0,0,0.2)", width: "350px" }}>
//         <h2 style={{ color: "#1a73e8", marginBottom: "20px" }}>Login with Student ID</h2>
//         <input
//           type="text"
//           placeholder="Your Student ID"
//           value={studentId}
//           onChange={(e) => setStudentId(e.target.value)}
//           style={{ padding: "10px", margin: "10px 0", width: "100%", borderRadius: "6px", border: "1px solid #ccc" }}
//         />
//         <input
//           type="password"
//           placeholder="Temporary Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           style={{ padding: "10px", margin: "10px 0", width: "100%", borderRadius: "6px", border: "1px solid #ccc" }}
//         />
//         <button
//           onClick={handleLogin}
//           style={{ padding: "10px 20px", backgroundColor: "#1a73e8", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", width: "100%", marginTop: "10px", fontWeight: "bold" }}
//         >
//           Start Exam
//         </button>
//         {error && <p style={{ color: "red", marginTop: "15px" }}>{error}</p>}
//       </div>
//     </div>
//   );
// }

// export default ExamLogin;
//proctor
// import React, { useState } from "react";
// import axios from "axios";

// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = "http://localhost:8000";

// function ExamLogin({ setStudent }) {
//   const [studentId, setStudentId] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post("/login", { studentId, password });
//       setStudent(res.data.student);
//       setError(""); // clear previous errors
//     } catch (err) {
//       setError(err.response?.data?.error || "Login failed");
//     }
//   };

//   return (
//     <div style={{ backgroundColor: "#f0f2f5", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
//       <div style={{ backgroundColor: "#fff", padding: "40px", borderRadius: "12px", textAlign: "center", boxShadow: "0px 6px 15px rgba(0,0,0,0.2)", width: "350px" }}>
//         <h2 style={{ color: "#1a73e8", marginBottom: "20px" }}>Login with Student ID</h2>
//         <input
//           type="text"
//           placeholder="Your Student ID"
//           value={studentId}
//           onChange={(e) => setStudentId(e.target.value)}
//           style={{ padding: "10px", margin: "10px 0", width: "100%", borderRadius: "6px", border: "1px solid #ccc" }}
//         />
//         <input
//           type="password"
//           placeholder="Temporary Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           style={{ padding: "10px", margin: "10px 0", width: "100%", borderRadius: "6px", border: "1px solid #ccc" }}
//         />
//         <button
//           onClick={handleLogin}
//           style={{ padding: "10px 20px", backgroundColor: "#1a73e8", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", width: "100%", marginTop: "10px", fontWeight: "bold" }}
//         >
//           Start Exam
//         </button>
//         {error && <p style={{ color: "red", marginTop: "15px" }}>{error}</p>}
//       </div>
//     </div>
//   );
// }

// export default ExamLogin;

//Upload code to git

import React, { useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";

function ExamLogin({ setStudent }) {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("/login", { studentId, password });
      if (res.data.success) {
        setStudent(res.data.student);
        setError("");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "12px",
          textAlign: "center",
          boxShadow: "0px 6px 15px rgba(0,0,0,0.2)",
          width: "350px",
        }}
      >
        <h2 style={{ color: "#1a73e8", marginBottom: "20px" }}>
          Login with Student ID
        </h2>
        <input
          type="text"
          placeholder="Your Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          style={{
            padding: "10px",
            margin: "10px 0",
            width: "100%",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="password"
          placeholder="Temporary Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "10px",
            margin: "10px 0",
            width: "100%",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleLogin}
          style={{
            padding: "10px 20px",
            backgroundColor: "#1a73e8",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            width: "100%",
            marginTop: "10px",
            fontWeight: "bold",
          }}
        >
          Start Exam
        </button>
        {error && <p style={{ color: "red", marginTop: "15px" }}>{error}</p>}
      </div>
    </div>
  );
}

export default ExamLogin;
