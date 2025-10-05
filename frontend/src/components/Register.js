
// //Good ui register code with acknowledgement card generator
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // ✅ for redirect
// import Navbar from "../components/Navbar.js";
// import Footer from "../components/Footer.js";
// import jsPDF from "jspdf";
// import axios from "axios";
// import { v4 as uuidv4 } from "uuid";

// const Register = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     residence: "",
//     profilePic: null,
//     profilePicPreview: "",
//   });
//   const [orderId, setOrderId] = useState(null);
//   const [paymentDone, setPaymentDone] = useState(false);
//   const [uniqueId, setUniqueId] = useState(null);
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "profilePic" && files.length > 0) {
//       const file = files[0];
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData({
//           ...formData,
//           profilePic: reader.result,
//           profilePicPreview: URL.createObjectURL(file),
//         });
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   // ✅ Payment flow
//   const startPayment = async () => {
//     try {
//       const { data: order } = await axios.post("http://localhost:8000/create-order", {
//         amount: 100,
//       });
//       setOrderId(order.id);

//       const rzp = new window.Razorpay({
//         key: process.env.REACT_APP_RAZORPAY_KEY_ID,
//         amount: order.amount,
//         currency: order.currency,
//         name: "AI Exam Registration",
//         description: "Secure Payment",
//         order_id: order.id,
//         handler: async (response) => {
//           const studentId = uuidv4();
//           setUniqueId(studentId);

//           const verifyRes = await axios.post("http://localhost:8000/verify-payment", {
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//             formData: { ...formData, studentId },
//           });

//           if (verifyRes.data.success) {
//             localStorage.setItem("examToken", verifyRes.data.token);
//             setPaymentDone(true);
//             alert("🎉 Registration successful & payment verified!");
//           } else {
//             alert("❌ Payment verification failed");
//           }
//         },
//         prefill: {
//           name: formData.name,
//           email: formData.email,
//           contact: formData.phone,
//         },
//         theme: { color: "#3399cc" },
//       });

//       rzp.open();
//     } catch (err) {
//       console.error("Payment error:", err);
//       alert("Error initiating payment");
//     }
//   };

//   // ✅ PDF download and redirect
//   const downloadAcknowledgment = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(18);
//     doc.text("Acknowledgment Card", 70, 20);

//     doc.setFontSize(12);
//     doc.text(`Name: ${formData.name}`, 20, 50);
//     doc.text(`Email: ${formData.email}`, 20, 60);
//     doc.text(`Phone: ${formData.phone}`, 20, 70);
//     doc.text(`Residence: ${formData.residence}`, 20, 80);
//     doc.text("Payment Status: Successful ✅", 20, 90);
//     doc.text(`Order ID: ${orderId}`, 20, 100);
//     if (uniqueId) doc.text(`Unique Student ID: ${uniqueId}`, 20, 110);

//     const finalizePDF = () => {
//       addSignatureSection(doc);
//       doc.save("Acknowledgment_Card.pdf");

//       // ✅ Redirect to home
//       navigate("/");
//     };

//     if (formData.profilePicPreview) {
//       const img = new Image();
//       img.src = formData.profilePicPreview;
//       img.onload = () => {
//         doc.addImage(img, "JPEG", 150, 40, 40, 40);
//         finalizePDF();
//       };
//     } else {
//       finalizePDF();
//     }
//   };

//   const addSignatureSection = (doc) => {
//     const pageHeight = doc.internal.pageSize.height;
//     const marginY = pageHeight - 70;
//     const today = new Date().toLocaleDateString("en-GB");

//     doc.setFontSize(12);
//     doc.setFont("helvetica", "bold");
//     doc.text("Authorized Signatory", 20, marginY);

//     doc.setFont("helvetica", "normal");
//     doc.text("Softwallet Innovative Technologies Pvt. Ltd.", 20, marginY + 10);
//     doc.text("Registered Under :- Ministry of Corporate Affairs", 20, marginY + 20);
//     doc.text("Govt. of India", 20, marginY + 30);

//     doc.text(`Issued on: ${today}`, 20, marginY + 45);
//   };

//   const containerWidth = windowWidth > 600 ? "500px" : "90%";
//   const profileSize = windowWidth > 600 ? 80 : 60;

//   const styles = {
//     container: {
//       maxWidth: containerWidth,
//       margin: "50px auto",
//       padding: "20px",
//       backgroundColor: "#fff",
//       boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//       borderRadius: "10px",
//     },
//     formInput: {
//       width: "100%",
//       marginBottom: "15px",
//       padding: "10px",
//       fontSize: 14,
//       boxSizing: "border-box",
//     },
//     button: {
//       width: "100%",
//       padding: "10px",
//       fontSize: 14,
//       backgroundColor: "#4CAF50",
//       color: "#fff",
//       border: "none",
//       borderRadius: "5px",
//       cursor: "pointer",
//     },
//     profilePreview: {
//       display: "block",
//       margin: "10px auto",
//       width: profileSize,
//       height: profileSize,
//       objectFit: "cover",
//       borderRadius: "50%",
//       border: "2px solid #ddd",
//     },
//   };

//   return (
//     <div>
//       <Navbar />
//       <div style={styles.container}>
//         <h1 style={{ textAlign: "center" }}>Step Into the Future – AI Exam Registration</h1>
//         <form>
//           <input
//             style={styles.formInput}
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//           <input
//             style={styles.formInput}
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           <input
//             style={styles.formInput}
//             type="tel"
//             name="phone"
//             placeholder="Phone"
//             value={formData.phone}
//             onChange={handleChange}
//             required
//           />
//           <input
//             style={styles.formInput}
//             type="text"
//             name="residence"
//             placeholder="Residence"
//             value={formData.residence}
//             onChange={handleChange}
//             required
//           />

//           <label>Upload Profile Picture</label>
//           <input
//             style={styles.formInput}
//             type="file"
//             name="profilePic"
//             accept="image/*"
//             onChange={handleChange}
//             required
//           />
//           {formData.profilePicPreview && (
//             <img src={formData.profilePicPreview} alt="Preview" style={styles.profilePreview} />
//           )}

//           {!paymentDone ? (
//             <button type="button" style={styles.button} onClick={startPayment}>
//               Pay & Register
//             </button>
//           ) : (
//             <div style={{ textAlign: "center", marginTop: "20px" }}>
//               <button type="button" style={styles.button} onClick={downloadAcknowledgment}>
//                 Download Acknowledgment (PDF)
//               </button>
//               <p style={{ marginTop: "15px", fontSize: "16px", color: "green" }}>
//                 ✅ Your Unique Exam ID: <strong>{uniqueId}</strong>
//               </p>
//             </div>
//           )}
//         </form>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Register;

//Secure register page

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar.js";
// import Footer from "../components/Footer.js";
// import jsPDF from "jspdf";
// import axios from "axios";
// import { v4 as uuidv4 } from "uuid";

// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = "http://localhost:8000";

// const Register = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     residence: "",
//     profilePic: null,
//     profilePicPreview: "",
//   });
//   const [orderId, setOrderId] = useState(null);
//   const [paymentDone, setPaymentDone] = useState(false);
//   const [uniqueId, setUniqueId] = useState(null);
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "profilePic" && files.length > 0) {
//       const file = files[0];
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData({
//           ...formData,
//           profilePic: reader.result,
//           profilePicPreview: URL.createObjectURL(file),
//         });
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   // ✅ Simple frontend validation
//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = "Full Name is required";
//     if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
//       newErrors.email = "Valid Email is required";
//     if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone))
//       newErrors.phone = "Enter a valid 10-digit phone number";
//     if (!formData.residence.trim()) newErrors.residence = "Residence is required";
//     if (!formData.profilePic) newErrors.profilePic = "Profile picture is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const startPayment = async () => {
//     if (!validateForm()) return;

//     try {
//       const { data: order } = await axios.post("/create-order", { amount: 100 });
//       setOrderId(order.id);

//       const rzp = new window.Razorpay({
//         key: process.env.REACT_APP_RAZORPAY_KEY_ID,
//         amount: order.amount,
//         currency: order.currency,
//         name: "AI Exam Registration",
//         description: "Secure Payment",
//         order_id: order.id,
//         handler: async (response) => {
//           const studentId = uuidv4();
//           setUniqueId(studentId);

//           // ✅ Ensure phone has +91 prefix
//           let formattedPhone = formData.phone.trim();
//           if (!formattedPhone.startsWith("+91")) {
//             formattedPhone = "+91" + formattedPhone;
//           }

//           // ✅ Only send expected fields
//           const payload = {
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//             formData: {
//               name: formData.name,
//               email: formData.email,
//               phone: formattedPhone,
//               residence: formData.residence,
//               studentId,
//               profilePic: formData.profilePic,
//             },
//           };

//           console.log("Payload Sent:", payload);

//           const verifyRes = await axios.post("/verify-payment", payload);

//           if (verifyRes.data.success) {
//             setPaymentDone(true);
//             alert("🎉 Registration successful & payment verified!");
//           } else {
//             alert("❌ Payment verification failed");
//           }
//         },
//         prefill: {
//           name: formData.name,
//           email: formData.email,
//           contact: formData.phone,
//         },
//         theme: { color: "#3399cc" },
//       });

//       rzp.open();
//     } catch (err) {
//       console.error("Payment error:", err);
//       alert("Error initiating payment");
//     }
//   };

//   const downloadAcknowledgment = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(18);
//     doc.text("Acknowledgment Card", 70, 20);

//     doc.setFontSize(12);
//     doc.text(`Name: ${formData.name}`, 20, 50);
//     doc.text(`Email: ${formData.email}`, 20, 60);
//     doc.text(`Phone: ${formData.phone}`, 20, 70);
//     doc.text(`Residence: ${formData.residence}`, 20, 80);
//     doc.text("Payment Status: Successful ✅", 20, 90);
//     doc.text(`Order ID: ${orderId}`, 20, 100);
//     if (uniqueId) doc.text(`Unique Student ID: ${uniqueId}`, 20, 110);

//     const finalizePDF = () => {
//       addSignatureSection(doc);
//       doc.save("Acknowledgment_Card.pdf");
//       navigate("/");
//     };

//     if (formData.profilePicPreview) {
//       const img = new Image();
//       img.src = formData.profilePicPreview;
//       img.onload = () => {
//         doc.addImage(img, "JPEG", 150, 40, 40, 40);
//         finalizePDF();
//       };
//     } else {
//       finalizePDF();
//     }
//   };

//   const addSignatureSection = (doc) => {
//     const pageHeight = doc.internal.pageSize.height;
//     const marginY = pageHeight - 70;
//     const today = new Date().toLocaleDateString("en-GB");

//     doc.setFontSize(12);
//     doc.setFont("helvetica", "bold");
//     doc.text("Authorized Signatory", 20, marginY);

//     doc.setFont("helvetica", "normal");
//     doc.text("Softwallet Innovative Technologies Pvt. Ltd.", 20, marginY + 10);
//     doc.text("Registered Under :- Ministry of Corporate Affairs", 20, marginY + 20);
//     doc.text("Govt. of India", 20, marginY + 30);
//     doc.text(`Issued on: ${today}`, 20, marginY + 45);
//   };

//   const containerWidth = windowWidth > 600 ? "500px" : "90%";
//   const profileSize = windowWidth > 600 ? 80 : 60;

//   const styles = {
//     container: {
//       maxWidth: containerWidth,
//       margin: "50px auto",
//       padding: "20px",
//       backgroundColor: "#fff",
//       boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//       borderRadius: "10px",
//     },
//     formInput: {
//       width: "100%",
//       marginBottom: "10px",
//       padding: "10px",
//       fontSize: 14,
//       boxSizing: "border-box",
//     },
//     errorText: { color: "red", fontSize: "12px", marginBottom: "10px" },
//     button: {
//       width: "100%",
//       padding: "10px",
//       fontSize: 14,
//       backgroundColor: "#4CAF50",
//       color: "#fff",
//       border: "none",
//       borderRadius: "5px",
//       cursor: "pointer",
//     },
//     profilePreview: {
//       display: "block",
//       margin: "10px auto",
//       width: profileSize,
//       height: profileSize,
//       objectFit: "cover",
//       borderRadius: "50%",
//       border: "2px solid #ddd",
//     },
//   };

//   return (
//     <div>
//       <Navbar />
//       <div style={styles.container}>
//         <h1 style={{ textAlign: "center" }}>
//           Step Into the Future – AI Exam Registration
//         </h1>
//         <form>
//           <input
//             style={styles.formInput}
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={formData.name}
//             onChange={handleChange}
//           />
//           {errors.name && <p style={styles.errorText}>{errors.name}</p>}

//           <input
//             style={styles.formInput}
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//           {errors.email && <p style={styles.errorText}>{errors.email}</p>}

//           <input
//             style={styles.formInput}
//             type="tel"
//             name="phone"
//             placeholder="Phone (10 digits)"
//             value={formData.phone}
//             onChange={handleChange}
//           />
//           {errors.phone && <p style={styles.errorText}>{errors.phone}</p>}

//           <input
//             style={styles.formInput}
//             type="text"
//             name="residence"
//             placeholder="Residence"
//             value={formData.residence}
//             onChange={handleChange}
//           />
//           {errors.residence && <p style={styles.errorText}>{errors.residence}</p>}

//           <label>Upload Profile Picture</label>
//           <input
//             style={styles.formInput}
//             type="file"
//             name="profilePic"
//             accept="image/*"
//             onChange={handleChange}
//           />
//           {errors.profilePic && <p style={styles.errorText}>{errors.profilePic}</p>}
//           {formData.profilePicPreview && (
//             <img
//               src={formData.profilePicPreview}
//               alt="Preview"
//               style={styles.profilePreview}
//             />
//           )}

//           {!paymentDone ? (
//             <button type="button" style={styles.button} onClick={startPayment}>
//               Pay & Register
//             </button>
//           ) : (
//             <div style={{ textAlign: "center", marginTop: "20px" }}>
//               <button
//                 type="button"
//                 style={styles.button}
//                 onClick={downloadAcknowledgment}
//               >
//                 Download Acknowledgment (PDF)
//               </button>
//               <p style={{ marginTop: "15px", fontSize: "16px", color: "green" }}>
//                 ✅ Your Unique Exam ID: <strong>{uniqueId}</strong>
//               </p>
//             </div>
//           )}
//         </form>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Register;

//Only student id works
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar.js";
// import Footer from "../components/Footer.js";
// import jsPDF from "jspdf";
// import axios from "axios";
// import { v4 as uuidv4 } from "uuid";

// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = "http://localhost:8000";

// const Register = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     residence: "",
//     profilePic: null,
//     profilePicPreview: "",
//   });
//   const [orderId, setOrderId] = useState(null);
//   const [paymentDone, setPaymentDone] = useState(false);
//   const [studentId, setStudentId] = useState(null);
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "profilePic" && files.length > 0) {
//       const file = files[0];
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData({
//           ...formData,
//           profilePic: reader.result,
//           profilePicPreview: URL.createObjectURL(file),
//         });
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = "Full Name is required";
//     if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
//       newErrors.email = "Valid Email is required";
//     if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone))
//       newErrors.phone = "Enter a valid 10-digit phone number";
//     if (!formData.residence.trim()) newErrors.residence = "Residence is required";
//     if (!formData.profilePic) newErrors.profilePic = "Profile picture is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const startPayment = async () => {
//     if (!validateForm()) return;

//     try {
//       const { data: order } = await axios.post("/create-order", { amount: 100 });
//       setOrderId(order.id);

//       const rzp = new window.Razorpay({
//         key: process.env.REACT_APP_RAZORPAY_KEY_ID,
//         amount: order.amount,
//         currency: order.currency,
//         name: "AI Exam Registration",
//         description: "Secure Payment",
//         order_id: order.id,
//         handler: async (response) => {
//           const newStudentId = uuidv4();
//           setStudentId(newStudentId);

//           let formattedPhone = formData.phone.trim();
//           if (!formattedPhone.startsWith("+91")) formattedPhone = "+91" + formattedPhone;

//           const payload = {
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//             formData: {
//               name: formData.name,
//               email: formData.email,
//               phone: formattedPhone,
//               residence: formData.residence,
//               studentId: newStudentId,
//               profilePic: formData.profilePic,
//             },
//           };

//           const verifyRes = await axios.post("/verify-payment", payload);

//           if (verifyRes.data.success) {
//             setPaymentDone(true);
//             alert(
//               `🎉 Registration successful & payment verified!\n\nYour Unique Student ID: ${newStudentId}\nUse this ID to log in and access your exam.`
//             );
//           } else {
//             alert("❌ Payment verification failed");
//           }
//         },
//         prefill: {
//           name: formData.name,
//           email: formData.email,
//           contact: formData.phone,
//         },
//         theme: { color: "#3399cc" },
//       });

//       rzp.open();
//     } catch (err) {
//       console.error("Payment error:", err);
//       alert("Error initiating payment");
//     }
//   };

//   const downloadAcknowledgment = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(18);
//     doc.text("Acknowledgment Card", 70, 20);

//     doc.setFontSize(12);
//     doc.text(`Name: ${formData.name}`, 20, 50);
//     doc.text(`Email: ${formData.email}`, 20, 60);
//     doc.text(`Phone: ${formData.phone}`, 20, 70);
//     doc.text(`Residence: ${formData.residence}`, 20, 80);
//     doc.text("Payment Status: Successful ✅", 20, 90);
//     doc.text(`Order ID: ${orderId}`, 20, 100);
//     if (studentId)
//       doc.text(
//         `Unique Student ID: ${studentId} (Use this ID to log in and access your exam)`,
//         20,
//         110
//       );

//     const finalizePDF = () => {
//       addSignatureSection(doc);
//       doc.save("Acknowledgment_Card.pdf");
//       navigate("/");
//     };

//     if (formData.profilePicPreview) {
//       const img = new Image();
//       img.src = formData.profilePicPreview;
//       img.onload = () => {
//         doc.addImage(img, "JPEG", 150, 40, 40, 40);
//         finalizePDF();
//       };
//     } else {
//       finalizePDF();
//     }
//   };

//   const addSignatureSection = (doc) => {
//     const pageHeight = doc.internal.pageSize.height;
//     const marginY = pageHeight - 70;
//     const today = new Date().toLocaleDateString("en-GB");

//     doc.setFontSize(12);
//     doc.setFont("helvetica", "bold");
//     doc.text("Authorized Signatory", 20, marginY);

//     doc.setFont("helvetica", "normal");
//     doc.text("Softwallet Innovative Technologies Pvt. Ltd.", 20, marginY + 10);
//     doc.text("Registered Under :- Ministry of Corporate Affairs", 20, marginY + 20);
//     doc.text("Govt. of India", 20, marginY + 30);
//     doc.text(`Issued on: ${today}`, 20, marginY + 45);
//   };

//   const containerWidth = windowWidth > 600 ? "500px" : "90%";
//   const profileSize = windowWidth > 600 ? 80 : 60;

//   const styles = {
//     container: {
//       maxWidth: containerWidth,
//       margin: "50px auto",
//       padding: "20px",
//       backgroundColor: "#fff",
//       boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//       borderRadius: "10px",
//     },
//     formInput: {
//       width: "100%",
//       marginBottom: "10px",
//       padding: "10px",
//       fontSize: 14,
//       boxSizing: "border-box",
//     },
//     errorText: { color: "red", fontSize: "12px", marginBottom: "10px" },
//     button: {
//       width: "100%",
//       padding: "10px",
//       fontSize: 14,
//       backgroundColor: "#4CAF50",
//       color: "#fff",
//       border: "none",
//       borderRadius: "5px",
//       cursor: "pointer",
//     },
//     profilePreview: {
//       display: "block",
//       margin: "10px auto",
//       width: profileSize,
//       height: profileSize,
//       objectFit: "cover",
//       borderRadius: "50%",
//       border: "2px solid #ddd",
//     },
//   };

//   return (
//     <div>
//       <Navbar />
//       <div style={styles.container}>
//         <h1 style={{ textAlign: "center" }}>
//           Step Into the Future – AI Exam Registration
//         </h1>
//         <form>
//           <input
//             style={styles.formInput}
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={formData.name}
//             onChange={handleChange}
//           />
//           {errors.name && <p style={styles.errorText}>{errors.name}</p>}

//           <input
//             style={styles.formInput}
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//           {errors.email && <p style={styles.errorText}>{errors.email}</p>}

//           <input
//             style={styles.formInput}
//             type="tel"
//             name="phone"
//             placeholder="Phone (10 digits)"
//             value={formData.phone}
//             onChange={handleChange}
//           />
//           {errors.phone && <p style={styles.errorText}>{errors.phone}</p>}

//           <input
//             style={styles.formInput}
//             type="text"
//             name="residence"
//             placeholder="Residence"
//             value={formData.residence}
//             onChange={handleChange}
//           />
//           {errors.residence && <p style={styles.errorText}>{errors.residence}</p>}

//           <label>Upload Profile Picture</label>
//           <input
//             style={styles.formInput}
//             type="file"
//             name="profilePic"
//             accept="image/*"
//             onChange={handleChange}
//           />
//           {errors.profilePic && <p style={styles.errorText}>{errors.profilePic}</p>}
//           {formData.profilePicPreview && (
//             <img
//               src={formData.profilePicPreview}
//               alt="Preview"
//               style={styles.profilePreview}
//             />
//           )}

//           {!paymentDone ? (
//             <button type="button" style={styles.button} onClick={startPayment}>
//               Pay & Register
//             </button>
//           ) : (
//             <div style={{ textAlign: "center", marginTop: "20px" }}>
//               <button
//                 type="button"
//                 style={styles.button}
//                 onClick={downloadAcknowledgment}
//               >
//                 Download Acknowledgment (PDF)
//               </button>
//               <p style={{ marginTop: "15px", fontSize: "16px", color: "green" }}>
//                 ✅ Your Unique Exam ID: <strong>{studentId}</strong>
//               </p>
//             </div>
//           )}
//         </form>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Register;

//security 90-95%
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar.js";
// import Footer from "../components/Footer.js";
// import jsPDF from "jspdf";
// import axios from "axios";
// import { v4 as uuidv4 } from "uuid";

// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = "http://localhost:8000";

// const Register = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     residence: "",
//     profilePic: null,
//     profilePicPreview: "",
//   });
//   const [orderId, setOrderId] = useState(null);
//   const [paymentDone, setPaymentDone] = useState(false);
//   const [studentId, setStudentId] = useState(null);
//   const [tempPassword, setTempPassword] = useState(null);
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "profilePic" && files.length > 0) {
//       const file = files[0];
//       if (!file.type.startsWith("image/")) { alert("Only image files allowed"); return; }
//       if (file.size > 2 * 1024 * 1024) { alert("File size must be <2MB"); return; }
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData({ ...formData, profilePic: reader.result, profilePicPreview: URL.createObjectURL(file) });
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = "Full Name is required";
//     if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid Email is required";
//     if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) newErrors.phone = "Enter a valid 10-digit phone number";
//     if (!formData.residence.trim()) newErrors.residence = "Residence is required";
//     if (!formData.profilePic) newErrors.profilePic = "Profile picture is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const startPayment = async () => {
//     if (!validateForm()) return;
//     try {
//       const { data: order } = await axios.post("/create-order", { amount: 100 });
//       setOrderId(order.id);

//       const rzp = new window.Razorpay({
//         key: process.env.REACT_APP_RAZORPAY_KEY_ID,
//         amount: order.amount,
//         currency: order.currency,
//         name: "AI Exam Registration",
//         description: "Secure Payment",
//         order_id: order.id,
//         handler: async (response) => {
//           const newStudentId = uuidv4();
//           setStudentId(newStudentId);

//           let formattedPhone = formData.phone.trim();
//           if (!formattedPhone.startsWith("+91")) formattedPhone = "+91" + formattedPhone;

//           const payload = {
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//             formData: { ...formData, studentId: newStudentId, phone: formattedPhone },
//           };

//           const verifyRes = await axios.post("/verify-payment", payload);

//           if (verifyRes.data.success) {
//             setPaymentDone(true);
//             setTempPassword(verifyRes.data.tempPassword);
//             alert(
//               `🎉 Registration successful & payment verified!\n\nYour Unique Student ID: ${newStudentId}\nCheck your email for Temporary Password. Use both to log in.`
//             );
//           } else {
//             alert("❌ Payment verification failed");
//           }
//         },
//         prefill: { name: formData.name, email: formData.email, contact: formData.phone },
//         theme: { color: "#3399cc" },
//       });
//       rzp.open();
//     } catch (err) {
//       console.error("Payment error:", err);
//       alert("Error initiating payment");
//     }
//   };

//   const downloadAcknowledgment = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(18);
//     doc.text("Acknowledgment Card", 70, 20);
//     doc.setFontSize(12);
//     doc.text(`Name: ${formData.name}`, 20, 50);
//     doc.text(`Email: ${formData.email}`, 20, 60);
//     doc.text(`Phone: ${formData.phone}`, 20, 70);
//     doc.text(`Residence: ${formData.residence}`, 20, 80);
//     doc.text("Payment Status: Successful ✅", 20, 90);
//     doc.text(`Order ID: ${orderId}`, 20, 100);
//     if (studentId) doc.text(`Unique Student ID: ${studentId}`, 20, 110);

//     const finalizePDF = () => {
//       addSignatureSection(doc);
//       doc.save("Acknowledgment_Card.pdf");
//       navigate("/");
//     };

//     if (formData.profilePicPreview) {
//       const img = new Image();
//       img.src = formData.profilePicPreview;
//       img.onload = () => { doc.addImage(img, "JPEG", 150, 40, 40, 40); finalizePDF(); };
//     } else finalizePDF();
//   };

//   const addSignatureSection = (doc) => {
//     const pageHeight = doc.internal.pageSize.height;
//     const marginY = pageHeight - 70;
//     const today = new Date().toLocaleDateString("en-GB");
//     doc.setFontSize(12);
//     doc.setFont("helvetica", "bold");
//     doc.text("Authorized Signatory", 20, marginY);
//     doc.setFont("helvetica", "normal");
//     doc.text("Softwallet Innovative Technologies Pvt. Ltd.", 20, marginY + 10);
//     doc.text("Registered Under :- Ministry of Corporate Affairs", 20, marginY + 20);
//     doc.text("Govt. of India", 20, marginY + 30);
//     doc.text(`Issued on: ${today}`, 20, marginY + 45);
//   };

//   const containerWidth = windowWidth > 600 ? "500px" : "90%";
//   const profileSize = windowWidth > 600 ? 80 : 60;

//   const styles = {
//     container: { maxWidth: containerWidth, margin: "50px auto", padding: "20px", backgroundColor: "#fff", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", borderRadius: "10px" },
//     formInput: { width: "100%", marginBottom: "10px", padding: "10px", fontSize: 14, boxSizing: "border-box" },
//     errorText: { color: "red", fontSize: "12px", marginBottom: "10px" },
//     button: { width: "100%", padding: "10px", fontSize: 14, backgroundColor: "#4CAF50", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" },
//     profilePreview: { display: "block", margin: "10px auto", width: profileSize, height: profileSize, objectFit: "cover", borderRadius: "50%", border: "2px solid #ddd" },
//   };

//   return (
//     <div>
//       <Navbar />
//       <div style={styles.container}>
//         <h1 style={{ textAlign: "center" }}>Step Into the Future – AI Exam Registration</h1>
//         <form>
//           <input style={styles.formInput} type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
//           {errors.name && <p style={styles.errorText}>{errors.name}</p>}
//           <input style={styles.formInput} type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
//           {errors.email && <p style={styles.errorText}>{errors.email}</p>}
//           <input style={styles.formInput} type="tel" name="phone" placeholder="Phone (10 digits)" value={formData.phone} onChange={handleChange} />
//           {errors.phone && <p style={styles.errorText}>{errors.phone}</p>}
//           <input style={styles.formInput} type="text" name="residence" placeholder="Residence" value={formData.residence} onChange={handleChange} />
//           {errors.residence && <p style={styles.errorText}>{errors.residence}</p>}
//           <label>Upload Profile Picture</label>
//           <input style={styles.formInput} type="file" name="profilePic" accept="image/*" onChange={handleChange} />
//           {errors.profilePic && <p style={styles.errorText}>{errors.profilePic}</p>}
//           {formData.profilePicPreview && <img src={formData.profilePicPreview} alt="Preview" style={styles.profilePreview} />}

//           {!paymentDone ? (
//             <button type="button" style={styles.button} onClick={startPayment}>Pay & Register</button>
//           ) : (
//             <div style={{ textAlign: "center", marginTop: "20px" }}>
//               <button type="button" style={styles.button} onClick={downloadAcknowledgment}>Download Acknowledgment (PDF)</button>
//               <p style={{ marginTop: "15px", fontSize: "16px", color: "green" }}>✅ Your Unique Exam ID: <strong>{studentId}</strong></p>
//               <p style={{ fontSize: "14px", color: "blue" }}>Check your email for Temporary Password to log in.</p>
//             </div>
//           )}
//         </form>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Register;

//This is my final code for server and register

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar.js";
// import Footer from "../components/Footer.js";
// import jsPDF from "jspdf";
// import axios from "axios";
// import { v4 as uuidv4 } from "uuid";

// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = "http://localhost:8000";

// const Register = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     residence: "",
//     profilePic: null,
//     profilePicPreview: "",
//   });
//   const [orderId, setOrderId] = useState(null);
//   const [studentId, setStudentId] = useState(null);
//   const [tempPassword, setTempPassword] = useState(null);
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleChange = (e) => {
//     if (isSubmitting) return;
//     const { name, value, files } = e.target;
//     if (name === "profilePic" && files.length > 0) {
//       const file = files[0];
//       if (!file.type.startsWith("image/")) {
//         alert("Only image files allowed");
//         return;
//       }
//       if (file.size > 2 * 1024 * 1024) {
//         alert("File size must be <2MB");
//         return;
//       }
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData({
//           ...formData,
//           profilePic: reader.result,
//           profilePicPreview: URL.createObjectURL(file),
//         });
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = "Full Name is required";
//     if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
//       newErrors.email = "Valid Email is required";
//     if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone))
//       newErrors.phone = "Enter a valid 10-digit phone number";
//     if (!formData.residence.trim()) newErrors.residence = "Residence is required";
//     if (!formData.profilePic) newErrors.profilePic = "Profile picture is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const startPayment = async () => {
//     if (!validateForm()) return;
//     setIsSubmitting(true);
//     try {
//       const { data: order } = await axios.post("/create-order", { amount: 100 });
//       setOrderId(order.id);

//       const rzp = new window.Razorpay({
//         key: process.env.REACT_APP_RAZORPAY_KEY_ID,
//         amount: order.amount,
//         currency: order.currency,
//         name: "AI Exam Registration",
//         description: "Secure Payment",
//         order_id: order.id,
//         handler: async (response) => {
//           const newStudentId = uuidv4();
//           setStudentId(newStudentId);

//           let formattedPhone = formData.phone.trim();
//           if (!formattedPhone.startsWith("+91"))
//             formattedPhone = "+91" + formattedPhone;

//           const payload = {
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//             formData: { ...formData, studentId: newStudentId, phone: formattedPhone },
//           };

//           const verifyRes = await axios.post("/verify-payment", payload);

//           if (verifyRes.data.success) {
//             setTempPassword(verifyRes.data.tempPassword || "Sent via Email");

//             // Auto-generate acknowledgment PDF
//             downloadAcknowledgment(newStudentId, verifyRes.data.tempPassword);

//             // Auto redirect home after PDF
//             setTimeout(() => navigate("/"), 1500);
//           } else {
//             alert("❌ Payment verification failed");
//             setIsSubmitting(false);
//           }
//         },
//         prefill: { name: formData.name, email: formData.email, contact: formData.phone },
//         theme: { color: "#3399cc" },
//       });
//       rzp.open();
//     } catch (err) {
//       console.error("Payment error:", err);
//       alert("Error initiating payment");
//       setIsSubmitting(false);
//     }
//   };

//   const downloadAcknowledgment = (id, password) => {
//     const doc = new jsPDF();
//     doc.setFontSize(18);
//     doc.text("Acknowledgment Card", 70, 20);
//     doc.setFontSize(12);
//     doc.text(`Name: ${formData.name}`, 20, 50);
//     doc.text(`Email: ${formData.email}`, 20, 60);
//     doc.text(`Phone: ${formData.phone}`, 20, 70);
//     doc.text(`Residence: ${formData.residence}`, 20, 80);
//     doc.text("Payment Status: Successful ✅", 20, 90);
//     doc.text(`Order ID: ${orderId}`, 20, 100);
//     doc.text(`Unique Student ID: ${id}`, 20, 110);
//     doc.text(`Temporary Password: ${password || "Check Email"}`, 20, 120);

//     const finalizePDF = () => {
//       addSignatureSection(doc);
//       doc.save("Acknowledgment_Card.pdf");
//     };

//     if (formData.profilePicPreview) {
//       const img = new Image();
//       img.src = formData.profilePicPreview;
//       img.onload = () => {
//         doc.addImage(img, "JPEG", 150, 40, 40, 40);
//         finalizePDF();
//       };
//     } else finalizePDF();
//   };

//   const addSignatureSection = (doc) => {
//     const pageHeight = doc.internal.pageSize.height;
//     const marginY = pageHeight - 70;
//     const today = new Date().toLocaleDateString("en-GB");
//     doc.setFontSize(12);
//     doc.setFont("helvetica", "bold");
//     doc.text("Authorized Signatory", 20, marginY);
//     doc.setFont("helvetica", "normal");
//     doc.text("Softwallet Innovative Technologies Pvt. Ltd.", 20, marginY + 10);
//     doc.text("Registered Under :- Ministry of Corporate Affairs", 20, marginY + 20);
//     doc.text("Govt. of India", 20, marginY + 30);
//     doc.text(`Issued on: ${today}`, 20, marginY + 45);
//   };

//   const containerWidth = windowWidth > 600 ? "500px" : "90%";
//   const profileSize = windowWidth > 600 ? 80 : 60;

//   const styles = {
//     container: { maxWidth: containerWidth, margin: "50px auto", padding: "20px", backgroundColor: "#fff", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", borderRadius: "10px" },
//     formInput: { width: "100%", marginBottom: "10px", padding: "10px", fontSize: 14, boxSizing: "border-box" },
//     errorText: { color: "red", fontSize: "12px", marginBottom: "10px" },
//     button: { width: "100%", padding: "10px", fontSize: 14, backgroundColor: "#4CAF50", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" },
//     profilePreview: { display: "block", margin: "10px auto", width: profileSize, height: profileSize, objectFit: "cover", borderRadius: "50%", border: "2px solid #ddd" },
//   };

//   return (
//     <div>
//       <Navbar />
//       <div style={styles.container}>
//         <h1 style={{ textAlign: "center" }}>Step Into the Future – AI Exam Registration</h1>
//         <form>
//           <input style={styles.formInput} type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} disabled={isSubmitting} />
//           {errors.name && <p style={styles.errorText}>{errors.name}</p>}

//           <input style={styles.formInput} type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} disabled={isSubmitting} />
//           {errors.email && <p style={styles.errorText}>{errors.email}</p>}

//           <input style={styles.formInput} type="tel" name="phone" placeholder="Phone (10 digits)" value={formData.phone} onChange={handleChange} disabled={isSubmitting} />
//           {errors.phone && <p style={styles.errorText}>{errors.phone}</p>}

//           <input style={styles.formInput} type="text" name="residence" placeholder="Residence" value={formData.residence} onChange={handleChange} disabled={isSubmitting} />
//           {errors.residence && <p style={styles.errorText}>{errors.residence}</p>}

//           <label>Upload Profile Picture</label>
//           <input style={styles.formInput} type="file" name="profilePic" accept="image/*" onChange={handleChange} disabled={isSubmitting} />
//           {errors.profilePic && <p style={styles.errorText}>{errors.profilePic}</p>}
//           {formData.profilePicPreview && <img src={formData.profilePicPreview} alt="Preview" style={styles.profilePreview} />}

//           <button type="button" style={{ ...styles.button, opacity: isSubmitting ? 0.6 : 1 }} onClick={startPayment} disabled={isSubmitting}>
//             {isSubmitting ? "Processing..." : "Pay & Register"}
//           </button>
//         </form>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Register;

//Removed sending mail
//This code works as per the the registration rules best and final
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar.js";
// import Footer from "../components/Footer.js";
// import jsPDF from "jspdf";
// import axios from "axios";
// import { v4 as uuidv4 } from "uuid";

// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = "http://localhost:8000";

// const Register = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     residence: "",
//     profilePic: null,
//     profilePicPreview: "",
//   });
//   const [orderId, setOrderId] = useState(null);
//   const [studentId, setStudentId] = useState(null);
//   const [tempPassword, setTempPassword] = useState(null);
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleChange = (e) => {
//     if (isSubmitting) return;
//     const { name, value, files } = e.target;
//     if (name === "profilePic" && files.length > 0) {
//       const file = files[0];
//       if (!file.type.startsWith("image/")) {
//         alert("Only image files allowed");
//         return;
//       }
//       if (file.size > 2 * 1024 * 1024) {
//         alert("File size must be <2MB");
//         return;
//       }
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData({
//           ...formData,
//           profilePic: reader.result,
//           profilePicPreview: URL.createObjectURL(file),
//         });
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = "Full Name is required";
//     if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
//       newErrors.email = "Valid Email is required";
//     if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone))
//       newErrors.phone = "Enter a valid 10-digit phone number";
//     if (!formData.residence.trim()) newErrors.residence = "Residence is required";
//     if (!formData.profilePic) newErrors.profilePic = "Profile picture is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const startPayment = async () => {
//     if (!validateForm()) return;
//     setIsSubmitting(true);
//     try {
//       const { data: order } = await axios.post("/create-order", { amount: 100 });
//       setOrderId(order.id);

//       const rzp = new window.Razorpay({
//         key: process.env.REACT_APP_RAZORPAY_KEY_ID,
//         amount: order.amount,
//         currency: order.currency,
//         name: "AI Exam Registration",
//         description: "Secure Payment",
//         order_id: order.id,
//         handler: async (response) => {
//           const newStudentId = uuidv4();
//           setStudentId(newStudentId);

//           let formattedPhone = formData.phone.trim();
//           if (!formattedPhone.startsWith("+91")) formattedPhone = "+91" + formattedPhone;

//           const payload = {
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//             formData: { ...formData, studentId: newStudentId, phone: formattedPhone },
//           };

//           const verifyRes = await axios.post("/verify-payment", payload);

//           if (verifyRes.data.success) {
//             setTempPassword(verifyRes.data.tempPassword);

//             // ✅ Generate PDF and show alert after PDF is saved
//             downloadAcknowledgment(newStudentId, verifyRes.data.tempPassword, () => {
//               alert(`✅ Registration Successful!\n\nYour Student ID: ${newStudentId}\nTemporary Password: ${verifyRes.data.tempPassword}`);
//               setTimeout(() => navigate("/"), 1500);
//             });
//           } else {
//             alert("❌ Payment verification failed");
//             setIsSubmitting(false);
//           }
//         },
//         prefill: { name: formData.name, email: formData.email, contact: formData.phone },
//         theme: { color: "#3399cc" },
//       });
//       rzp.open();
//     } catch (err) {
//       console.error("Payment error:", err);
//       alert("Error initiating payment");
//       setIsSubmitting(false);
//     }
//   };

//   const downloadAcknowledgment = (id, password, callback) => {
//     const doc = new jsPDF();
//     doc.setFontSize(18);
//     doc.text("Acknowledgment Card", 70, 20);
//     doc.setFontSize(12);
//     doc.text(`Name: ${formData.name}`, 20, 50);
//     doc.text(`Email: ${formData.email}`, 20, 60);
//     doc.text(`Phone: ${formData.phone}`, 20, 70);
//     doc.text(`Residence: ${formData.residence}`, 20, 80);
//     doc.text("Payment Status: Successful ✅", 20, 90);
//     doc.text(`Order ID: ${orderId}`, 20, 100);
//     doc.text(`Unique Student ID: ${id}`, 20, 110);
//     doc.text(`Temporary Password: ${password}`, 20, 120);

//     const finalizePDF = () => {
//       addSignatureSection(doc);
//       doc.save("Acknowledgment_Card.pdf");
//       if (callback) callback(); // ✅ Alert after PDF is saved
//     };

//     if (formData.profilePicPreview) {
//       const img = new Image();
//       img.src = formData.profilePicPreview;
//       img.onload = () => {
//         doc.addImage(img, "JPEG", 150, 40, 40, 40);
//         finalizePDF();
//       };
//     } else finalizePDF();
//   };

//   const addSignatureSection = (doc) => {
//     const pageHeight = doc.internal.pageSize.height;
//     const marginY = pageHeight - 70;
//     const today = new Date().toLocaleDateString("en-GB");
//     doc.setFontSize(12);
//     doc.setFont("helvetica", "bold");
//     doc.text("Authorized Signatory", 20, marginY);
//     doc.setFont("helvetica", "normal");
//     doc.text("Softwallet Innovative Technologies Pvt. Ltd.", 20, marginY + 10);
//     doc.text("Registered Under :- Ministry of Corporate Affairs", 20, marginY + 20);
//     doc.text("Govt. of India", 20, marginY + 30);
//     doc.text(`Issued on: ${today}`, 20, marginY + 45);
//   };

//   const containerWidth = windowWidth > 600 ? "500px" : "90%";
//   const profileSize = windowWidth > 600 ? 80 : 60;

//   const styles = {
//     container: { maxWidth: containerWidth, margin: "50px auto", padding: "20px", backgroundColor: "#fff", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", borderRadius: "10px" },
//     formInput: { width: "100%", marginBottom: "10px", padding: "10px", fontSize: 14, boxSizing: "border-box" },
//     errorText: { color: "red", fontSize: "12px", marginBottom: "10px" },
//     button: { width: "100%", padding: "10px", fontSize: 14, backgroundColor: "#4CAF50", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" },
//     profilePreview: { display: "block", margin: "10px auto", width: profileSize, height: profileSize, objectFit: "cover", borderRadius: "50%", border: "2px solid #ddd" },
//   };

//   return (
//     <div>
//       <Navbar />
//       <div style={styles.container}>
//         <h1 style={{ textAlign: "center" }}>Step Into the Future – AI Exam Registration</h1>
//         <form>
//           <input style={styles.formInput} type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} disabled={isSubmitting} />
//           {errors.name && <p style={styles.errorText}>{errors.name}</p>}

//           <input style={styles.formInput} type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} disabled={isSubmitting} />
//           {errors.email && <p style={styles.errorText}>{errors.email}</p>}

//           <input style={styles.formInput} type="tel" name="phone" placeholder="Phone (10 digits)" value={formData.phone} onChange={handleChange} disabled={isSubmitting} />
//           {errors.phone && <p style={styles.errorText}>{errors.phone}</p>}

//           <input style={styles.formInput} type="text" name="residence" placeholder="Residence" value={formData.residence} onChange={handleChange} disabled={isSubmitting} />
//           {errors.residence && <p style={styles.errorText}>{errors.residence}</p>}

//           <label>Upload Profile Picture</label>
//           <input style={styles.formInput} type="file" name="profilePic" accept="image/*" onChange={handleChange} disabled={isSubmitting} />
//           {errors.profilePic && <p style={styles.errorText}>{errors.profilePic}</p>}
//           {formData.profilePicPreview && <img src={formData.profilePicPreview} alt="Preview" style={styles.profilePreview} />}

//           <button type="button" style={{ ...styles.button, opacity: isSubmitting ? 0.6 : 1 }} onClick={startPayment} disabled={isSubmitting}>
//             {isSubmitting ? "Processing..." : "Pay & Register"}
//           </button>
//         </form>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Register;
//proctor
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar.js";
// import Footer from "../components/Footer.js";
// import jsPDF from "jspdf";
// import axios from "axios";
// import { v4 as uuidv4 } from "uuid";

// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = "http://localhost:8000";

// const Register = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     residence: "",
//     profilePic: null,
//     profilePicPreview: "",
//   });
//   const [orderId, setOrderId] = useState(null);
//   const [studentId, setStudentId] = useState(null);
//   const [tempPassword, setTempPassword] = useState(null);
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleChange = (e) => {
//     if (isSubmitting) return;
//     const { name, value, files } = e.target;
//     if (name === "profilePic" && files.length > 0) {
//       const file = files[0];
//       if (!file.type.startsWith("image/")) {
//         alert("Only image files allowed");
//         return;
//       }
//       if (file.size > 2 * 1024 * 1024) {
//         alert("File size must be <2MB");
//         return;
//       }
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData({
//           ...formData,
//           profilePic: reader.result,
//           profilePicPreview: URL.createObjectURL(file),
//         });
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = "Full Name is required";
//     if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
//       newErrors.email = "Valid Email is required";
//     if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone))
//       newErrors.phone = "Enter a valid 10-digit phone number";
//     if (!formData.residence.trim()) newErrors.residence = "Residence is required";
//     if (!formData.profilePic) newErrors.profilePic = "Profile picture is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const startPayment = async () => {
//     if (!navigator.onLine) {
//       alert("❌ You are offline. Please check your internet connection.");
//       return;
//     }

//     if (!validateForm()) return;
//     setIsSubmitting(true);

//     try {
//       const { data: order } = await axios.post("/create-order", { amount: 100 });
//       setOrderId(order.id);

//       const rzp = new window.Razorpay({
//         key: process.env.REACT_APP_RAZORPAY_KEY_ID,
//         amount: order.amount,
//         currency: order.currency,
//         name: "AI Exam Registration",
//         description: "Secure Payment",
//         order_id: order.id,
//         handler: async (response) => {
//           try {
//             const newStudentId = uuidv4();
//             setStudentId(newStudentId);

//             let formattedPhone = formData.phone.trim();
//             if (!formattedPhone.startsWith("+91")) formattedPhone = "+91" + formattedPhone;

//             const payload = {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               formData: { ...formData, studentId: newStudentId, phone: formattedPhone },
//             };

//             const verifyRes = await axios.post("/verify-payment", payload);

//             if (verifyRes.data.success) {
//               setTempPassword(verifyRes.data.tempPassword);
//               downloadAcknowledgment(newStudentId, verifyRes.data.tempPassword, () => {
//                 alert(`✅ Registration Successful!\n\nYour Student ID: ${newStudentId}\nTemporary Password: ${verifyRes.data.tempPassword}`);
//                 setTimeout(() => navigate("/"), 1500);
//               });
//             } else {
//               alert("❌ Payment verification failed");
//               setIsSubmitting(false);
//             }
//           } catch (err) {
//             console.error("Verify payment error:", err);
//             alert("❌ Payment verification failed due to server error");
//             setIsSubmitting(false);
//           }
//         },
//         prefill: { name: formData.name, email: formData.email, contact: formData.phone },
//         theme: { color: "#3399cc" },
//       });

//       rzp.open();
//     } catch (err) {
//       console.error("Payment error:", err);
//       alert("❌ Error initiating payment");
//       setIsSubmitting(false);
//     }
//   };

//   const downloadAcknowledgment = (id, password, callback) => {
//     const doc = new jsPDF();
//     doc.setFontSize(18);
//     doc.text("Acknowledgment Card", 70, 20);
//     doc.setFontSize(12);
//     doc.text(`Name: ${formData.name}`, 20, 50);
//     doc.text(`Email: ${formData.email}`, 20, 60);
//     doc.text(`Phone: ${formData.phone}`, 20, 70);
//     doc.text(`Residence: ${formData.residence}`, 20, 80);
//     doc.text("Payment Status: Successful ✅", 20, 90);
//     doc.text(`Order ID: ${orderId}`, 20, 100);
//     doc.text(`Unique Student ID: ${id}`, 20, 110);
//     doc.text(`Temporary Password: ${password}`, 20, 120);

//     const finalizePDF = () => {
//       addSignatureSection(doc);
//       doc.save("Acknowledgment_Card.pdf");
//       if (callback) callback();
//     };

//     if (formData.profilePicPreview) {
//       const img = new Image();
//       img.src = formData.profilePicPreview;
//       img.onload = () => {
//         doc.addImage(img, "JPEG", 150, 40, 40, 40);
//         finalizePDF();
//       };
//     } else finalizePDF();
//   };

//   const addSignatureSection = (doc) => {
//     const pageHeight = doc.internal.pageSize.height;
//     const marginY = pageHeight - 70;
//     const today = new Date().toLocaleDateString("en-GB");
//     doc.setFontSize(12);
//     doc.setFont("helvetica", "bold");
//     doc.text("Authorized Signatory", 20, marginY);
//     doc.setFont("helvetica", "normal");
//     doc.text("Softwallet Innovative Technologies Pvt. Ltd.", 20, marginY + 10);
//     doc.text("Registered Under :- Ministry of Corporate Affairs", 20, marginY + 20);
//     doc.text("Govt. of India", 20, marginY + 30);
//     doc.text(`Issued on: ${today}`, 20, marginY + 45);
//   };

//   const containerWidth = windowWidth > 600 ? "500px" : "90%";
//   const profileSize = windowWidth > 600 ? 80 : 60;

//   const styles = {
//     container: { maxWidth: containerWidth, margin: "50px auto", padding: "20px", backgroundColor: "#fff", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", borderRadius: "10px" },
//     formInput: { width: "100%", marginBottom: "10px", padding: "10px", fontSize: 14, boxSizing: "border-box" },
//     errorText: { color: "red", fontSize: "12px", marginBottom: "10px" },
//     button: { width: "100%", padding: "10px", fontSize: 14, backgroundColor: "#4CAF50", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" },
//     profilePreview: { display: "block", margin: "10px auto", width: profileSize, height: profileSize, objectFit: "cover", borderRadius: "50%", border: "2px solid #ddd" },
//   };

//   return (
//     <div>
//       <Navbar />
//       <div style={styles.container}>
//         <h1 style={{ textAlign: "center" }}>Step Into the Future – AI Exam Registration</h1>
//         <form>
//           <input style={styles.formInput} type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} disabled={isSubmitting} />
//           {errors.name && <p style={styles.errorText}>{errors.name}</p>}

//           <input style={styles.formInput} type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} disabled={isSubmitting} />
//           {errors.email && <p style={styles.errorText}>{errors.email}</p>}

//           <input style={styles.formInput} type="tel" name="phone" placeholder="Phone (10 digits)" value={formData.phone} onChange={handleChange} disabled={isSubmitting} />
//           {errors.phone && <p style={styles.errorText}>{errors.phone}</p>}

//           <input style={styles.formInput} type="text" name="residence" placeholder="Residence" value={formData.residence} onChange={handleChange} disabled={isSubmitting} />
//           {errors.residence && <p style={styles.errorText}>{errors.residence}</p>}

//           <label>Upload Profile Picture</label>
//           <input style={styles.formInput} type="file" name="profilePic" accept="image/*" onChange={handleChange} disabled={isSubmitting} />
//           {errors.profilePic && <p style={styles.errorText}>{errors.profilePic}</p>}
//           {formData.profilePicPreview && <img src={formData.profilePicPreview} alt="Preview" style={styles.profilePreview} />}

//           <button type="button" style={{ ...styles.button, opacity: isSubmitting ? 0.6 : 1 }} onClick={startPayment} disabled={isSubmitting}>
//             {isSubmitting ? "Processing..." : "Pay & Register"}
//           </button>
//         </form>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Register;

//code to upload on git

// src/pages/Register.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import jsPDF from "jspdf";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    residence: "",
    profilePic: null,
    profilePicPreview: "",
  });
  const [orderId, setOrderId] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [tempPassword, setTempPassword] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    if (isSubmitting) return;
    const { name, value, files } = e.target;
    if (name === "profilePic" && files.length > 0) {
      const file = files[0];
      if (!file.type.startsWith("image/")) {
        alert("Only image files allowed");
        return;
      }
      if (file.size > 100 * 1024) {
        alert("File size must be less than 100KB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          profilePic: reader.result,
          profilePicPreview: URL.createObjectURL(file),
        });
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid Email is required";
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Enter a valid 10-digit phone number";
    if (!formData.residence.trim()) newErrors.residence = "Residence is required";
    if (!formData.profilePic) newErrors.profilePic = "Profile picture is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const startPayment = async () => {
    if (!navigator.onLine) {
      alert("❌ You are offline. Please check your internet connection.");
      return;
    }

    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const { data: order } = await axios.post("/create-order");
      setOrderId(order.id);

      const rzp = new window.Razorpay({
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "AI Exam Registration",
        description: "Secure Payment",
        order_id: order.id,
        handler: async (response) => {
          try {
            const newStudentId = uuidv4();
            setStudentId(newStudentId);

            let formattedPhone = formData.phone.trim();
            if (!formattedPhone.startsWith("+91"))
              formattedPhone = "+91" + formattedPhone;

            const payload = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              formData: {
                ...formData,
                studentId: newStudentId,
                phone: formattedPhone,
              },
            };

            const verifyRes = await axios.post("/verify-payment", payload);

            if (verifyRes.data.success) {
              setTempPassword(verifyRes.data.tempPassword);
              setOrderId(verifyRes.data.orderId);

              downloadAcknowledgment(
                newStudentId,
                verifyRes.data.tempPassword,
                verifyRes.data.orderId,
                () => {
                  alert(
                    `✅ Registration Successful!\n\nYour Student ID: ${newStudentId}\nTemporary Password: ${verifyRes.data.tempPassword}`
                  );
                  setTimeout(() => navigate("/"), 1500);
                }
              );
            } else {
              alert("❌ Payment verification failed");
              setIsSubmitting(false);
            }
          } catch (err) {
            console.error("Verify payment error:", err);
            alert("❌ Payment verification failed due to server error");
            setIsSubmitting(false);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#3399cc" },
      });

      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("❌ Error initiating payment");
      setIsSubmitting(false);
    }
  };

  const downloadAcknowledgment = (id, password, orderId, callback) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Acknowledgment Card", 70, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${formData.name}`, 20, 50);
    doc.text(`Email: ${formData.email}`, 20, 60);
    doc.text(`Phone: ${formData.phone}`, 20, 70);
    doc.text(`Residence: ${formData.residence}`, 20, 80);
    doc.text("Payment Status: Successful ✅", 20, 90);
    doc.text(`Order ID: ${orderId}`, 20, 100);
    doc.text(`Unique Student ID: ${id}`, 20, 110);
    doc.text(`Temporary Password: ${password}`, 20, 120);

    const finalizePDF = () => {
      addSignatureSection(doc);
      doc.save("Acknowledgment_Card.pdf");
      if (callback) callback();
    };

    if (formData.profilePicPreview) {
      const img = new Image();
      img.src = formData.profilePicPreview;
      img.onload = () => {
        doc.addImage(img, "JPEG", 150, 40, 40, 40);
        finalizePDF();
      };
    } else finalizePDF();
  };

  const addSignatureSection = (doc) => {
    const pageHeight = doc.internal.pageSize.height;
    const marginY = pageHeight - 70;
    const today = new Date().toLocaleDateString("en-GB");
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Authorized Signatory", 20, marginY);
    doc.setFont("helvetica", "normal");
    doc.text("Softwallet Innovative Technologies Pvt. Ltd.", 20, marginY + 10);
    doc.text("Registered Under :- Ministry of Corporate Affairs", 20, marginY + 20);
    doc.text("Govt. of India", 20, marginY + 30);
    doc.text(`Issued on: ${today}`, 20, marginY + 45);
  };

  const containerWidth = windowWidth > 600 ? "500px" : "90%";
  const profileSize = windowWidth > 600 ? 80 : 60;

  const styles = {
    container: {
      maxWidth: containerWidth,
      margin: "50px auto",
      padding: "20px",
      backgroundColor: "#fff",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      borderRadius: "10px",
    },
    formInput: {
      width: "100%",
      marginBottom: "10px",
      padding: "10px",
      fontSize: 14,
      boxSizing: "border-box",
    },
    errorText: { color: "red", fontSize: "12px", marginBottom: "10px" },
    button: {
      width: "100%",
      padding: "10px",
      fontSize: 14,
      backgroundColor: "#4CAF50",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    profilePreview: {
      display: "block",
      margin: "10px auto",
      width: profileSize,
      height: profileSize,
      objectFit: "cover",
      borderRadius: "50%",
      border: "2px solid #ddd",
    },
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h1 style={{ textAlign: "center" }}>
          Step Into the Future – AI Exam Registration
        </h1>
        <form>
          <input
            style={styles.formInput}
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          {errors.name && <p style={styles.errorText}>{errors.name}</p>}

          <input
            style={styles.formInput}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          {errors.email && <p style={styles.errorText}>{errors.email}</p>}

          <input
            style={styles.formInput}
            type="tel"
            name="phone"
            placeholder="Phone (10 digits)"
            value={formData.phone}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          {errors.phone && <p style={styles.errorText}>{errors.phone}</p>}

          <input
            style={styles.formInput}
            type="text"
            name="residence"
            placeholder="School/College"
            value={formData.residence}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          {errors.residence && <p style={styles.errorText}>{errors.residence}</p>}

          <label>Upload Profile Picture</label>
          <input
            style={styles.formInput}
            type="file"
            name="profilePic"
            accept="image/*"
            onChange={handleChange}
            disabled={isSubmitting}
          />
          {errors.profilePic && <p style={styles.errorText}>{errors.profilePic}</p>}
          {formData.profilePicPreview && (
            <img
              src={formData.profilePicPreview}
              alt="Preview"
              style={styles.profilePreview}
            />
          )}

          <button
            type="button"
            style={{ ...styles.button, opacity: isSubmitting ? 0.6 : 1 }}
            onClick={startPayment}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Pay ₹300 & Register"}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
