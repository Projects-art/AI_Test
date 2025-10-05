// import React from  'react';

// import { BrowserRouter,Routes, Route } from "react-router-dom";

// import './App.css';
// import Home from './components/Home';
// import About from './components/About';

// import Careers from './components/Careers';
// import Description from './components/Description';
// import Tutorial from './components/Tutorial';
// import Register from './components/Register';
// import Exam from './components/Exam';
// import Contact from './components/Contact';
// import ExamLogin from "./ExamLogin";


// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />     
//          <Route path="/careers" element={<Careers />} />
//          <Route path="/description" element={<Description />} />
//          <Route path="/tutorial" element={<Tutorial />} />
//          <Route path="/register" element={<Register />} />
//           <Route path="/exam" element={<Exam />} />

//         <Route path="/contact" element={<Contact />} />
       
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

//========================================================

// App.jsx
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

// Normal site components
import Home from "./components/Home";
import About from "./components/About";
import Careers from "./components/Careers";
import Description from "./components/Description";
import Tutorial from "./components/Tutorial";
import Register from "./components/Register";
import Contact from "./components/Contact";

// Exam components
import ExamLogin from "./components/ExamLogin";
import Exam from "./components/Exam";

function App() {
  const [student, setStudent] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        {/* Normal site routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/description" element={<Description />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />

        {/* Secure Exam Route */}
        <Route
          path="/exam"
          element={
            !student ? (
              <ExamLogin setStudent={setStudent} />
            ) : student.examStatus === "submitted" ? (
              // Redirect to home if exam already submitted
              <Navigate to="/" replace />
            ) : (
              <Exam student={student} setStudent={setStudent} />
            )
          }
        />

        {/* Catch-all route for unknown URLs */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

