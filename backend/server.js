// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import bodyParser from "body-parser";
// import dotenv from "dotenv";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import Razorpay from "razorpay";
// import crypto from "crypto";
// import { v4 as uuidv4 } from "uuid";
// import PDFDocument from "pdfkit";
// import nodemailer from "nodemailer";

// dotenv.config();
// const app = express();
// app.use(cors());
// app.use(bodyParser.json({ limit: "10mb" }));

// // ----------------- MongoDB Connection -----------------
// const MONGO_URI = process.env.MONGO_URI;
// if (!MONGO_URI) {
//   console.error("❌ ERROR: MONGO_URI not found in .env file");
//   process.exit(1);
// }

// mongoose
//   .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => {
//     console.error("❌ MongoDB Error:", err.message);
//     process.exit(1);
//   });

// // ----------------- Schemas -----------------
// const studentSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   phone: String,
//   residence: String,
//   profilePic: String,
//   orderId: String,
//   paymentId: String,
//   studentId: String,
//   paymentStatus: String,
//   password: String,
// });

// const examSchema = new mongoose.Schema({
//   uniqueId: String,
//   score: Number,
//   date: String,
// });

// const Student = mongoose.model("Student", studentSchema);
// const Exam = mongoose.model("Exam", examSchema);

// // ----------------- Razorpay -----------------
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // ----------------- Routes -----------------

// // Create Razorpay Order
// app.post("/create-order", async (req, res) => {
//   try {
//     const { amount } = req.body;
//     const options = {
//       amount: amount * 100,
//       currency: "INR",
//       receipt: "receipt_" + Date.now(),
//     };
//     const order = await razorpay.orders.create(options);
//     res.json(order);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Error generating order" });
//   }
// });

// // Verify Payment + Save Student
// app.post("/verify-payment", async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, formData } = req.body;
//     const sign = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSign = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(sign.toString())
//       .digest("hex");

//     if (expectedSign !== razorpay_signature)
//       return res.status(400).json({ success: false, message: "Invalid signature" });

//     if (!formData.studentId) formData.studentId = uuidv4();
//     const hashedPassword = await bcrypt.hash(formData.studentId, 10);

//     const student = new Student({
//       ...formData,
//       orderId: razorpay_order_id,
//       paymentId: razorpay_payment_id,
//       paymentStatus: "Success",
//       password: hashedPassword,
//     });

//     await student.save();

//     const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: "2h" });
//     res.json({ success: true, token, studentId: formData.studentId });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // Login
// app.post("/login", async (req, res) => {
//   try {
//     const { studentId } = req.body;
//     const student = await Student.findOne({ studentId });
//     if (!student) return res.status(404).json({ error: "Student not found" });

//     const isMatch = await bcrypt.compare(studentId, student.password);
//     if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

//     const existingExam = await Exam.findOne({ uniqueId: studentId });
//     if (existingExam) return res.status(403).json({ message: "You have already submitted the exam" });

//     const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: "2h" });
//     res.json({ token, student });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Login failed" });
//   }
// });

// // Exam Login
// app.post("/exam-login", async (req, res) => {
//   try {
//     const { uniqueId } = req.body;
//     const user = await Student.findOne({ studentId: uniqueId });
//     if (!user) return res.status(404).json({ message: "You are not registered" });

//     const existingExam = await Exam.findOne({ uniqueId });
//     if (existingExam) return res.status(403).json({ message: "You have already submitted the exam" });

//     res.json({ name: user.name, email: user.email, uniqueId: user.studentId });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Exam login failed" });
//   }
// });

// // Exam Submission + Certificate (Download + Email)
// app.post("/submit-exam", async (req, res) => {
//   try {
//     const { uniqueId, score } = req.body;
//     const user = await Student.findOne({ studentId: uniqueId });
//     if (!user) return res.status(404).json({ message: "You are not registered" });

//     const existingExam = await Exam.findOne({ uniqueId });
//     if (existingExam)
//       return res.status(403).json({ message: "You have already submitted the exam" });

//     const date = new Date().toLocaleDateString();
//     const exam = new Exam({ uniqueId, score, date });
//     await exam.save();

//     const certId = uuidv4();

//     // Generate PDF in memory
//     const doc = new PDFDocument({ size: "A4", layout: "landscape" });
//     let buffers = [];
//     doc.on("data", buffers.push.bind(buffers));
//     doc.on("end", async () => {
//       const pdfBuffer = Buffer.concat(buffers);

//       // --- Send Email with Certificate ---
//       try {
//         let transporter = nodemailer.createTransport({
//           service: "gmail",
//           auth: {
//             user: process.env.EMAIL_USER, // your gmail
//             pass: process.env.EMAIL_PASS, // your app password
//           },
//         });

//         await transporter.sendMail({
//           from: `"Softwallet" <${process.env.EMAIL_USER}>`,
//           to: user.email,
//           subject: "Your Certificate - AI Online Test",
//           text: `Dear ${user.name},\n\nCongratulations! Please find your certificate attached.\n\nCertificate ID: ${certId}\nDate: ${date}\n\nBest regards,\nSoftwallet Innovative Technologies Pvt. Ltd.`,
//           attachments: [
//             {
//               filename: `certificate_${user.name}.pdf`,
//               content: pdfBuffer,
//             },
//           ],
//         });

//         console.log("📧 Certificate sent to:", user.email);
//       } catch (emailErr) {
//         console.error("❌ Email send error:", emailErr);
//       }

//       // Also send PDF back to frontend for download
//       res.setHeader("Content-Type", "application/pdf");
//       res.setHeader(
//         "Content-Disposition",
//         `attachment; filename=certificate_${user.name}.pdf`
//       );
//       res.end(pdfBuffer);
//     });

//     // --- PDF Content ---
//     const pageWidth = doc.page.width;
//     const pageHeight = doc.page.height;

//     // border
//     doc.save();
//     doc.lineWidth(8);
//     doc.strokeColor("#FFD700");
//     doc.rect(20, 20, pageWidth - 40, pageHeight - 40).stroke();
//     doc.restore();

//     let x = 0, y = 80;
//     doc.fontSize(32).fillColor("#000").text("Certificate of Achievement", x, y, { align: "center" });
//     y += 80;
//     doc.fontSize(16).text("This is proudly presented to", x, y, { align: "center" });
//     y += 30;
//     doc.fontSize(28).fillColor("#000080").text(user.name, x, y, { align: "center", underline: true });
//     y += 50;
//     doc.fontSize(16).fillColor("#000").text(
//       "in recognition of outstanding achievement in the Artificial Intelligence Online Test,",
//       x, y, { align: "center" }
//     );
//     y += 25;
//     doc.text("organized and conducted by Softwallet Innovative Technologies Pvt. Ltd.", x, y, { align: "center" });
//     y += 50;
//     doc.fontSize(14).text(`Awarded on: ${date}`, x, y, { align: "center" });

//     // ✅ Certificate ID above signature
//     y += 40;
//     doc.fontSize(14).fillColor("#333").text(`Certificate ID: ${certId}`, 0, y, { align: "center" });

// // ✅ Signature block pinned safely inside bottom margin
// const sigX = 100;
// const bottomMargin = 100; // increased margin to prevent overflow
// const sigY = pageHeight - bottomMargin - 60; // slightly higher so everything fits

// try {
//   doc.image("signature.png", sigX, sigY - 50, { width: 198, height: 50 });
// } catch (e) {
//   console.log("Signature image missing, skipping...");
// }

// doc.moveTo(sigX, sigY).lineTo(sigX + 200, sigY).stroke();
// doc.fontSize(14).text("Authorized Signatory", sigX, sigY + 5, { align: "left" });
// doc.text("(Softwallet Innovative Technologies Pvt. Ltd.)", sigX, sigY + 25, { align: "left" });

// // Adjusted spacing so "Govt. of India" stays on the same page
// doc.fontSize(12).text("Registered under:- Ministry of Corporate Affairs", sigX, sigY + 45, { align: "left" });
// doc.text("Govt. of India", sigX, sigY + 60, { align: "left" });

// doc.end();

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Exam submission failed" });
//   }
// });

// // ----------------- Start server -----------------
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

//Secure server
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import bodyParser from "body-parser";
// import dotenv from "dotenv";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import Razorpay from "razorpay";
// import crypto from "crypto";
// import { v4 as uuidv4 } from "uuid";
// import PDFDocument from "pdfkit";
// import nodemailer from "nodemailer";
// import path from "path";
// import { fileURLToPath } from "url";
// import helmet from "helmet";
// import rateLimit from "express-rate-limit";
// import { body, validationResult } from "express-validator";
// import cookieParser from "cookie-parser";

// dotenv.config();
// const app = express();

// // ----------------- Security Middleware -----------------
// app.use(helmet());
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL || "http://localhost:3000",
//     credentials: true,
//   })
// );
// app.use(bodyParser.json({ limit: "5mb" }));
// app.use(cookieParser());

// // Rate limit
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: { error: "Too many requests, try again later" },
// });
// app.use(limiter);

// // ----------------- Paths -----------------
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // ----------------- MongoDB Connection -----------------
// const MONGO_URI = process.env.MONGO_URI;
// if (!MONGO_URI) {
//   console.error("❌ ERROR: MONGO_URI not found in .env file");
//   process.exit(1);
// }

// mongoose
//   .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => {
//     console.error("❌ MongoDB Error:", err.message);
//     process.exit(1);
//   });

// // ----------------- Schemas -----------------
// const studentSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   phone: String,
//   residence: String,
//   profilePic: String,
//   orderId: String,
//   paymentId: String,
//   studentId: String,
//   paymentStatus: String,
//   password: String,
// });

// const examSchema = new mongoose.Schema({
//   uniqueId: String,
//   score: Number,
//   date: String,
// });

// const Student = mongoose.model("Student", studentSchema);
// const Exam = mongoose.model("Exam", examSchema);

// // ----------------- Razorpay -----------------
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // ----------------- Routes -----------------

// // Create Razorpay Order
// app.post("/create-order", async (req, res) => {
//   try {
//     const fixedAmount = 100; // INR
//     const options = {
//       amount: fixedAmount * 100,
//       currency: "INR",
//       receipt: "receipt_" + Date.now(),
//     };
//     const order = await razorpay.orders.create(options);
//     res.json(order);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Error generating order" });
//   }
// });

// // Verify Payment + Save Student
// app.post(
//   "/verify-payment",
//   [
//     body("formData.name").isString().trim().escape(),
//     body("formData.email").isEmail().normalizeEmail(),
//     body("formData.phone").isMobilePhone().trim().escape(),
//     body("formData.residence").isString().trim().escape(),
//   ],
//   async (req, res) => {
//     try {
//       console.log("Incoming body:", req.body);
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ success: false, message: "Invalid input" });
//       }

//       const { razorpay_order_id, razorpay_payment_id, razorpay_signature, formData } = req.body;

//       const sign = razorpay_order_id + "|" + razorpay_payment_id;
//       const expectedSign = crypto
//         .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//         .update(sign.toString())
//         .digest("hex");

//       if (expectedSign !== razorpay_signature)
//         return res.status(400).json({ success: false, message: "Invalid signature" });

//       if (!formData.studentId) formData.studentId = uuidv4();

//       const randomPassword = uuidv4();
//       const hashedPassword = await bcrypt.hash(randomPassword, 12);

//       const student = new Student({
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone,
//         residence: formData.residence,
//         profilePic: formData.profilePic || "",
//         orderId: razorpay_order_id,
//         paymentId: razorpay_payment_id,
//         paymentStatus: "Success",
//         studentId: formData.studentId,
//         password: hashedPassword,
//       });

//       await student.save();

//       // Send credentials
//       try {
//         let transporter = nodemailer.createTransport({
//           service: "gmail",
//           auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASS,
//           },
//         });

//         await transporter.sendMail({
//           from: `"Softwallet" <${process.env.EMAIL_USER}>`,
//           to: formData.email,
//           subject: "Login Credentials - AI Online Test",
//           text: `Dear ${formData.name},\n\nYour Student ID: ${formData.studentId}\nTemporary Password: ${randomPassword}\n\n👉 Please change your password after first login.`,
//         });
//       } catch (emailErr) {
//         console.error("❌ Email send error:", emailErr);
//       }

//       const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: "2h" });
//       res.cookie("examToken", token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "strict",
//         maxAge: 2 * 60 * 60 * 1000,
//       });

//       res.json({ success: true, studentId: formData.studentId });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ success: false, message: "Server error" });
//     }
//   }
// );

// // Login
// app.post("/login", async (req, res) => {
//   try {
//     const { studentId, password } = req.body;
//     const student = await Student.findOne({ studentId });
//     if (!student) return res.status(400).json({ error: "Invalid login" });

//     const isMatch = await bcrypt.compare(password, student.password);
//     if (!isMatch) return res.status(400).json({ error: "Invalid login" });

//     const existingExam = await Exam.findOne({ uniqueId: studentId });
//     if (existingExam) return res.status(403).json({ message: "Exam already submitted" });

//     const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: "2h" });
//     res.cookie("examToken", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 2 * 60 * 60 * 1000,
//     });

//     res.json({ success: true, student });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Login failed" });
//   }
// });

// // Auth check
// app.get("/auth-check", (req, res) => {
//   const token = req.cookies.examToken;
//   if (!token) return res.status(401).json({ authenticated: false });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     res.json({ authenticated: true, userId: decoded.id });
//   } catch {
//     res.status(401).json({ authenticated: false });
//   }
// });

// // Logout
// app.post("/logout", (req, res) => {
//   res.clearCookie("examToken");
//   res.json({ success: true });
// });

// // ----------------- Start server -----------------
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

//Only student id works
// ----------------- Imports -----------------
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import bodyParser from "body-parser";
// import dotenv from "dotenv";
// import jwt from "jsonwebtoken";
// import Razorpay from "razorpay";
// import crypto from "crypto";
// import { v4 as uuidv4 } from "uuid";
// import PDFDocument from "pdfkit";
// import nodemailer from "nodemailer";
// import path from "path";
// import { fileURLToPath } from "url";
// import helmet from "helmet";
// import rateLimit from "express-rate-limit";
// import { body, validationResult } from "express-validator";
// import cookieParser from "cookie-parser";

// dotenv.config();
// const app = express();

// // ----------------- Security Middleware -----------------
// app.use(helmet());
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL || "http://localhost:3000",
//     credentials: true,
//   })
// );
// app.use(bodyParser.json({ limit: "5mb" }));
// app.use(cookieParser());

// // Rate limit
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: { error: "Too many requests, try again later" },
// });
// app.use(limiter);

// // ----------------- Paths -----------------
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // ----------------- MongoDB Connection -----------------
// const MONGO_URI = process.env.MONGO_URI;
// if (!MONGO_URI) {
//   console.error("❌ ERROR: MONGO_URI not found in .env file");
//   process.exit(1);
// }

// mongoose
//   .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => {
//     console.error("❌ MongoDB Error:", err.message);
//     process.exit(1);
//   });

// // ----------------- Schemas -----------------
// const studentSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   phone: String,
//   residence: String,
//   profilePic: String,
//   orderId: String,
//   paymentId: String,
//   studentId: String,
//   paymentStatus: String,
// });

// const examSchema = new mongoose.Schema({
//   uniqueId: String,
//   score: Number,
//   date: String,
// });

// const Student = mongoose.model("Student", studentSchema);
// const Exam = mongoose.model("Exam", examSchema);

// // ----------------- Razorpay -----------------
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // ----------------- Routes -----------------

// // Create Razorpay Order
// app.post("/create-order", async (req, res) => {
//   try {
//     const fixedAmount = 100; // INR
//     const options = {
//       amount: fixedAmount * 100,
//       currency: "INR",
//       receipt: "receipt_" + Date.now(),
//     };
//     const order = await razorpay.orders.create(options);
//     res.json(order);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Error generating order" });
//   }
// });

// // Verify Payment + Save Student
// app.post(
//   "/verify-payment",
//   [
//     body("formData.name").isString().trim().escape(),
//     body("formData.email").isEmail().normalizeEmail(),
//     body("formData.phone").isMobilePhone().trim().escape(),
//     body("formData.residence").isString().trim().escape(),
//   ],
//   async (req, res) => {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty())
//         return res.status(400).json({ success: false, message: "Invalid input" });

//       const { razorpay_order_id, razorpay_payment_id, razorpay_signature, formData } =
//         req.body;

//       const sign = razorpay_order_id + "|" + razorpay_payment_id;
//       const expectedSign = crypto
//         .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//         .update(sign.toString())
//         .digest("hex");

//       if (expectedSign !== razorpay_signature)
//         return res.status(400).json({ success: false, message: "Invalid signature" });

//       if (!formData.studentId) formData.studentId = uuidv4();

//       const student = new Student({
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone,
//         residence: formData.residence,
//         profilePic: formData.profilePic || "",
//         orderId: razorpay_order_id,
//         paymentId: razorpay_payment_id,
//         paymentStatus: "Success",
//         studentId: formData.studentId,
//       });

//       await student.save();

//       // Send credentials via email (Student ID)
//       try {
//         let transporter = nodemailer.createTransport({
//           service: "gmail",
//           auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASS,
//           },
//         });

//         await transporter.sendMail({
//           from: `"Softwallet" <${process.env.EMAIL_USER}>`,
//           to: formData.email,
//           subject: "Your Student ID - AI Online Test",
//           text: `Dear ${formData.name},\n\nYour Student ID: ${formData.studentId}\nUse this ID to log in and access your exam.\n\nBest wishes!`,
//         });
//       } catch (emailErr) {
//         console.error("❌ Email send error:", emailErr);
//       }

//       const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: "2h" });
//       res.cookie("examToken", token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "strict",
//         maxAge: 2 * 60 * 60 * 1000,
//       });

//       res.json({ success: true, studentId: formData.studentId });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ success: false, message: "Server error" });
//     }
//   }
// );

// // Login with only Student ID
// app.post("/login", async (req, res) => {
//   try {
//     const { studentId } = req.body;
//     const student = await Student.findOne({ studentId });
//     if (!student) return res.status(400).json({ error: "Invalid Student ID" });

//     const existingExam = await Exam.findOne({ uniqueId: studentId });
//     if (existingExam) return res.status(403).json({ message: "Exam already submitted" });

//     const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: "2h" });
//     res.cookie("examToken", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 2 * 60 * 60 * 1000,
//     });

//     res.json({ success: true, student });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Login failed" });
//   }
// });

// // Submit Exam + Generate PDF
// app.post("/submit-exam", async (req, res) => {
//   try {
//     const { uniqueId, score } = req.body;
//     const student = await Student.findOne({ studentId: uniqueId });
//     if (!student) return res.status(400).json({ error: "Student not found" });

//     const existingExam = await Exam.findOne({ uniqueId });
//     if (existingExam) return res.status(403).json({ error: "Exam already submitted" });

//     const exam = new Exam({
//       uniqueId,
//       score,
//       date: new Date().toLocaleString(),
//     });
//     await exam.save();

//     // Generate PDF certificate
//     const doc = new PDFDocument();
//     let buffers = [];
//     doc.on("data", buffers.push.bind(buffers));
//     doc.on("end", () => {
//       let pdfData = Buffer.concat(buffers);
//       res.set({
//         "Content-Type": "application/pdf",
//         "Content-Disposition": "attachment; filename=certificate.pdf",
//         "Content-Length": pdfData.length,
//       });
//       res.send(pdfData);
//     });

//     doc.fontSize(20).text("AI Online Test Certificate", { align: "center" });
//     doc.moveDown();
//     doc.fontSize(14).text(`This is to certify that ${student.name}`, { align: "center" });
//     doc.text(`has successfully completed the AI Online Test.`, { align: "center" });
//     doc.moveDown();
//     doc.text(`Score: ${score}/${3}`, { align: "center" });
//     doc.moveDown();
//     doc.text(`Student ID: ${uniqueId}`, { align: "center" });
//     doc.text(`Date: ${new Date().toLocaleDateString("en-GB")}`, { align: "center" });
//     doc.moveDown();
//     doc.text("Softwallet Innovative Technologies Pvt. Ltd.", { align: "center" });
//     doc.text("Registered under: Ministry of Corporate Affairs, Govt. of India", { align: "center" });

//     doc.end();
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Error submitting exam" });
//   }
// });

// // Auth check
// app.get("/auth-check", (req, res) => {
//   const token = req.cookies.examToken;
//   if (!token) return res.status(401).json({ authenticated: false });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     res.json({ authenticated: true, userId: decoded.id });
//   } catch {
//     res.status(401).json({ authenticated: false });
//   }
// });

// // Logout
// app.post("/logout", (req, res) => {
//   res.clearCookie("examToken");
//   res.json({ success: true });
// });

// // ----------------- Start server -----------------
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

// security 90-95%
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import bodyParser from "body-parser";
// import dotenv from "dotenv";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import Razorpay from "razorpay";
// import crypto from "crypto";
// import { v4 as uuidv4 } from "uuid";
// import PDFDocument from "pdfkit";
// import nodemailer from "nodemailer";
// import path from "path";
// import { fileURLToPath } from "url";
// import helmet from "helmet";
// import rateLimit from "express-rate-limit";
// import { body, validationResult } from "express-validator";
// import cookieParser from "cookie-parser";
// import fs from "fs";

// dotenv.config();
// const app = express();

// // ----------------- Security Middleware -----------------
// app.use(helmet());
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL || "http://localhost:3000",
//     credentials: true,
//   })
// );
// app.use(bodyParser.json({ limit: "5mb" }));
// app.use(cookieParser());

// // Rate limit
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: { error: "Too many requests, try again later" },
// });
// app.use(limiter);

// // ----------------- Paths -----------------
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // ----------------- MongoDB Connection -----------------
// const MONGO_URI = process.env.MONGO_URI;
// if (!MONGO_URI) {
//   console.error("❌ ERROR: MONGO_URI not found in .env file");
//   process.exit(1);
// }

// mongoose
//   .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => {
//     console.error("❌ MongoDB Error:", err.message);
//     process.exit(1);
//   });

// // ----------------- Schemas -----------------
// const studentSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   phone: String,
//   residence: String,
//   profilePic: String,
//   orderId: String,
//   paymentId: String,
//   studentId: String,
//   password: String,
//   paymentStatus: String,
// });

// const examSchema = new mongoose.Schema({
//   uniqueId: String,
//   score: Number,
//   date: String,
// });

// const Student = mongoose.model("Student", studentSchema);
// const Exam = mongoose.model("Exam", examSchema);

// // ----------------- Razorpay -----------------
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // ----------------- Routes -----------------

// // Create Razorpay Order
// app.post("/create-order", async (req, res) => {
//   try {
//     const fixedAmount = 100; // INR
//     const options = {
//       amount: fixedAmount * 100,
//       currency: "INR",
//       receipt: "receipt_" + Date.now(),
//     };
//     const order = await razorpay.orders.create(options);
//     res.json(order);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Error generating order" });
//   }
// });

// // Verify Payment + Save Student
// app.post(
//   "/verify-payment",
//   [
//     body("formData.name").isString().trim().escape(),
//     body("formData.email").isEmail().normalizeEmail(),
//     body("formData.phone").isMobilePhone().trim().escape(),
//     body("formData.residence").isString().trim().escape(),
//   ],
//   async (req, res) => {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty())
//         return res.status(400).json({ success: false, message: "Invalid input" });

//       const { razorpay_order_id, razorpay_payment_id, razorpay_signature, formData } =
//         req.body;

//       const sign = razorpay_order_id + "|" + razorpay_payment_id;
//       const expectedSign = crypto
//         .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//         .update(sign.toString())
//         .digest("hex");

//       if (expectedSign !== razorpay_signature)
//         return res.status(400).json({ success: false, message: "Invalid signature" });

//       if (!formData.studentId) formData.studentId = uuidv4();

//       const tempPassword = uuidv4().slice(0, 8);
//       const hashedPassword = await bcrypt.hash(tempPassword, 10);

//       const student = new Student({
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone,
//         residence: formData.residence,
//         profilePic: formData.profilePic || "",
//         orderId: razorpay_order_id,
//         paymentId: razorpay_payment_id,
//         paymentStatus: "Success",
//         studentId: formData.studentId,
//         password: hashedPassword,
//       });

//       await student.save();

//       // Send credentials via email
//       try {
//         let transporter = nodemailer.createTransport({
//           host: "smtp.gmail.com",
//           port: 587,
//           secure: false,
//           auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASS,
//           },
//         });

//         await transporter.sendMail({
//           from: `"Softwallet" <${process.env.EMAIL_USER}>`,
//           to: formData.email,
//           subject: "Your Student Login Credentials - AI Online Test",
//           text: `Dear ${formData.name},\n\nYour Student ID: ${formData.studentId}\nTemporary Password: ${tempPassword}\n\nUse this ID and password to log in and access your exam. Please change your password after first login.\n\nBest wishes!`,
//         });
//       } catch (emailErr) {
//         console.error("❌ Email send error:", emailErr);
//       }

//       const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: "2h" });
//       res.cookie("examToken", token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "strict",
//         maxAge: 2 * 60 * 60 * 1000,
//       });

//       res.json({ success: true, studentId: formData.studentId });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ success: false, message: "Server error" });
//     }
//   }
// );

// // Login with Student ID + Password
// app.post("/login", async (req, res) => {
//   try {
//     const { studentId, password } = req.body;
//     const student = await Student.findOne({ studentId });
//     if (!student) return res.status(400).json({ error: "Invalid Student ID" });

//     const isMatch = await bcrypt.compare(password, student.password);
//     if (!isMatch) return res.status(400).json({ error: "Invalid password" });

//     const existingExam = await Exam.findOne({ uniqueId: studentId });
//     if (existingExam) return res.status(403).json({ message: "Exam already submitted" });

//     const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: "2h" });
//     res.cookie("examToken", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 2 * 60 * 60 * 1000,
//     });

//     res.json({ success: true, student });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Login failed" });
//   }
// });

// // Submit Exam + Generate PDF
// app.post("/submit-exam", async (req, res) => {
//   try {
//     const { uniqueId, score } = req.body;
//     const student = await Student.findOne({ studentId: uniqueId });
//     if (!student) return res.status(400).json({ error: "Student not found" });

//     const existingExam = await Exam.findOne({ uniqueId });
//     if (existingExam) return res.status(403).json({ error: "Exam already submitted" });

//     const exam = new Exam({
//       uniqueId,
//       score,
//       date: new Date().toLocaleString(),
//     });
//     await exam.save();

//     // ---------------- PDF Certificate ----------------
// const doc = new PDFDocument({ size: "A4", margin: 50 });
// let buffers = [];
// doc.on("data", buffers.push.bind(buffers));
// doc.on("end", () => {
//   let pdfData = Buffer.concat(buffers);
//   res.set({
//     "Content-Type": "application/pdf",
//     "Content-Disposition": "attachment; filename=certificate.pdf",
//     "Content-Length": pdfData.length,
//   });
//   res.send(pdfData);
// });

// const pageWidth = doc.page.width;
// const pageHeight = doc.page.height;
// const certId = uuidv4();
// const date = new Date().toLocaleDateString("en-GB");

// // border
// doc.save();
// doc.lineWidth(8);
// doc.strokeColor("#FFD700");
// doc.rect(20, 20, pageWidth - 40, pageHeight - 40).stroke();
// doc.restore();

// // safe text area
// const marginX = 60;
// const contentWidth = pageWidth - marginX * 2;
// let y = 100;

// doc.fontSize(32).fillColor("#000").text("Certificate of Achievement", marginX, y, {
//   width: contentWidth,
//   align: "center",
// });
// y += 60;

// doc.fontSize(16).text("This is proudly presented to", marginX, y, {
//   width: contentWidth,
//   align: "center",
// });
// y += 25;

// doc.fontSize(28)
//   .fillColor("#000080")
//   .text(student.name, marginX, y, {
//     width: contentWidth,
//     align: "center",
//     underline: true,
//   });
// y += 35;

// doc.fontSize(16).fillColor("#333").text(`Score: ${score}/3`, marginX, y, {
//   width: contentWidth,
//   align: "center",
// });
// y += 25;

// doc.fontSize(16)
//   .fillColor("#000")
//   .text(
//     "in recognition of outstanding achievement in the Artificial Intelligence Online Test,",
//     marginX,
//     y,
//     { width: contentWidth, align: "center", lineGap: 6 }
//   );
// y += 40;

// doc.text(
//   "organized and conducted by Softwallet Innovative Technologies Pvt. Ltd.",
//   marginX,
//   y,
//   { width: contentWidth, align: "center", lineGap: 6 }
// );
// y += 40;

// // Awarded on
// doc.fontSize(14).text(`Awarded on: ${date}`, marginX, y, {
//   width: contentWidth,
//   align: "center",
// });

// // ---------------- Signature & Certificate ID ----------------
// // Place signature and certificate ID relative to the "Awarded on" line
// const sigSpacing = 60; // space after "Awarded on"
// const sigX = 100;
// const sigY = y + sigSpacing;

// // Certificate ID just above signature
// doc.fontSize(14)
//   .fillColor("#333")
//   .text(`Certificate ID: ${certId}`, marginX, sigY - 40, {
//     width: contentWidth,
//     align: "center",
//   });

// // Signature image
// try {
//   const sigPath = path.join(__dirname, "signature.png");
//   if (fs.existsSync(sigPath)) {
//     doc.image(sigPath, sigX, sigY - 20, { width: 180, height: 45 });
//   }
// } catch (e) {
//   console.log("Signature image missing, skipping...");
// }

// // Signature text
// doc.moveTo(sigX, sigY + 30).lineTo(sigX + 200, sigY + 30).stroke();
// doc.fontSize(14).text("Authorized Signatory", sigX, sigY + 35, { align: "left" });
// doc.text("(Softwallet Innovative Technologies Pvt. Ltd.)", sigX, sigY + 55, { align: "left" });
// doc.fontSize(12).text("Registered under:- Ministry of Corporate Affairs", sigX, sigY + 75, { align: "left" });
// doc.text("Govt. of India", sigX, sigY + 90, { align: "left" });

// doc.end();

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Error submitting exam" });
//   }
// });

// // Auth check
// app.get("/auth-check", (req, res) => {
//   const token = req.cookies.examToken;
//   if (!token) return res.status(401).json({ authenticated: false });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     res.json({ authenticated: true, userId: decoded.id });
//   } catch {
//     res.status(401).json({ authenticated: false });
//   }
// });

// // Logout
// app.post("/logout", (req, res) => {
//   res.clearCookie("examToken");
//   res.json({ success: true });
// });

// // ----------------- Start server -----------------
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

//This is my final code for server and register
// server.js
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import bodyParser from "body-parser";
// import dotenv from "dotenv";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import Razorpay from "razorpay";
// import crypto from "crypto";
// import { v4 as uuidv4 } from "uuid";
// import PDFDocument from "pdfkit";
// import nodemailer from "nodemailer";
// import path from "path";
// import { fileURLToPath } from "url";
// import helmet from "helmet";
// import rateLimit from "express-rate-limit";
// import { body, validationResult } from "express-validator";
// import cookieParser from "cookie-parser";
// import fs from "fs";

// dotenv.config();
// const app = express();

// // ----------------- Security Middleware -----------------
// app.use(helmet());
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL || "http://localhost:3000",
//     credentials: true,
//   })
// );
// app.use(bodyParser.json({ limit: "5mb" }));
// app.use(cookieParser());

// // Rate limit
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: { error: "Too many requests, try again later" },
// });
// app.use(limiter);

// // ----------------- Paths -----------------
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // ----------------- MongoDB Connection -----------------
// const MONGO_URI = process.env.MONGO_URI;
// if (!MONGO_URI) {
//   console.error("❌ ERROR: MONGO_URI not found in .env file");
//   process.exit(1);
// }

// mongoose
//   .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => {
//     console.error("❌ MongoDB Error:", err.message);
//     process.exit(1);
//   });

// // ----------------- Schemas -----------------
// const studentSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   phone: String,
//   residence: String,
//   profilePic: String,
//   orderId: String,
//   paymentId: String,
//   studentId: String,
//   password: String,
//   paymentStatus: String,
// });

// const examSchema = new mongoose.Schema({
//   uniqueId: String,
//   score: Number,
//   date: String,
// });

// const Student = mongoose.model("Student", studentSchema);
// const Exam = mongoose.model("Exam", examSchema);

// // ----------------- Razorpay -----------------
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // ----------------- Routes -----------------

// // Create Razorpay Order
// app.post("/create-order", async (req, res) => {
//   try {
//     const fixedAmount = 100; // INR
//     const options = {
//       amount: fixedAmount * 100,
//       currency: "INR",
//       receipt: "receipt_" + Date.now(),
//     };
//     const order = await razorpay.orders.create(options);
//     res.json(order);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Error generating order" });
//   }
// });

// // Verify Payment + Save Student
// app.post(
//   "/verify-payment",
//   [
//     body("formData.name").isString().trim().escape(),
//     body("formData.email").isEmail().normalizeEmail(),
//     body("formData.phone").isMobilePhone().trim().escape(),
//     body("formData.residence").isString().trim().escape(),
//   ],
//   async (req, res) => {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty())
//         return res.status(400).json({ success: false, message: "Invalid input" });

//       const { razorpay_order_id, razorpay_payment_id, razorpay_signature, formData } = req.body;

//       const sign = razorpay_order_id + "|" + razorpay_payment_id;
//       const expectedSign = crypto
//         .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//         .update(sign.toString())
//         .digest("hex");

//       if (expectedSign !== razorpay_signature)
//         return res.status(400).json({ success: false, message: "Invalid signature" });

//       if (!formData.studentId) formData.studentId = uuidv4();

//       const tempPassword = uuidv4().slice(0, 8);
//       const hashedPassword = await bcrypt.hash(tempPassword, 10);

//       const student = new Student({
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone,
//         residence: formData.residence,
//         profilePic: formData.profilePic || "",
//         orderId: razorpay_order_id,
//         paymentId: razorpay_payment_id,
//         paymentStatus: "Success",
//         studentId: formData.studentId,
//         password: hashedPassword,
//       });

//       await student.save();

//       // ------------------ Send credentials via email ------------------
//       let emailSent = false;
//       try {
//         let transporter = nodemailer.createTransport({
//           host: process.env.EMAIL_HOST || "smtp.gmail.com",
//           port: process.env.EMAIL_PORT ? Number(process.env.EMAIL_PORT) : 587,
//           secure: process.env.EMAIL_SECURE === "true" || false,
//           auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASS,
//           },
//           tls: { rejectUnauthorized: false },
//           connectionTimeout: 30000,
//         });

//         await transporter.sendMail({
//           from: `"Softwallet" <${process.env.EMAIL_USER}>`,
//           to: formData.email,
//           subject: "Your Student Login Credentials - AI Online Test",
//           text: `Dear ${formData.name},\n\nYour Student ID: ${formData.studentId}\nTemporary Password: ${tempPassword}\n\nUse this ID and password to log in and access your exam. Please change your password after first login.\n\nBest wishes!`,
//         });

//         emailSent = true;
//         console.log(`✅ Email sent to ${formData.email}`);
//       } catch (emailErr) {
//         console.error("❌ Email send error:", emailErr);
//         console.warn("⚠️ Registration successful, but email could not be sent. Temp password included in response.");
//       }

//       const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: "2h" });
//       res.cookie("examToken", token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "strict",
//         maxAge: 2 * 60 * 60 * 1000,
//       });

//       res.json({
//         success: true,
//         studentId: formData.studentId,
//         tempPassword,
//         emailSent,
//       });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ success: false, message: "Server error" });
//     }
//   }
// );

// // Login with Student ID + Password
// app.post("/login", async (req, res) => {
//   try {
//     const { studentId, password } = req.body;
//     const student = await Student.findOne({ studentId });
//     if (!student) return res.status(400).json({ error: "Invalid Student ID" });

//     const isMatch = await bcrypt.compare(password, student.password);
//     if (!isMatch) return res.status(400).json({ error: "Invalid password" });

//     // Check if exam already submitted
//     const existingExam = await Exam.findOne({ uniqueId: studentId });
//     if (existingExam)
//       return res.status(403).json({ error: "Exam already submitted. You cannot login again." });

//     const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: "2h" });
//     res.cookie("examToken", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 2 * 60 * 60 * 1000,
//     });

//     res.json({ success: true, student });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Login failed" });
//   }
// });

// // Submit Exam + Generate PDF
// app.post("/submit-exam", async (req, res) => {
//   try {
//     const { uniqueId, score } = req.body;
//     const student = await Student.findOne({ studentId: uniqueId });
//     if (!student) return res.status(400).json({ error: "Student not found" });

//     const existingExam = await Exam.findOne({ uniqueId });
//     if (existingExam) return res.status(403).json({ error: "Exam already submitted" });

//     const exam = new Exam({
//       uniqueId,
//       score,
//       date: new Date().toLocaleString(),
//     });
//     await exam.save();

//     // ---------------- PDF Certificate ----------------
//     const doc = new PDFDocument({ size: "A4", margin: 50 });
//     let buffers = [];
//     doc.on("data", buffers.push.bind(buffers));
//     doc.on("end", () => {
//       let pdfData = Buffer.concat(buffers);
//       res.set({
//         "Content-Type": "application/pdf",
//         "Content-Disposition": "attachment; filename=certificate.pdf",
//         "Content-Length": pdfData.length,
//       });
//       res.send(pdfData);
//     });

//     const pageWidth = doc.page.width;
//     const pageHeight = doc.page.height;
//     const certId = uuidv4();
//     const date = new Date().toLocaleDateString("en-GB");

//     // border
//     doc.save();
//     doc.lineWidth(8);
//     doc.strokeColor("#FFD700");
//     doc.rect(20, 20, pageWidth - 40, pageHeight - 40).stroke();
//     doc.restore();

//     const marginX = 60;
//     const contentWidth = pageWidth - marginX * 2;
//     let y = 100;

//     doc.fontSize(32).fillColor("#000").text("Certificate of Achievement", marginX, y, { width: contentWidth, align: "center" });
//     y += 60;
//     doc.fontSize(16).text("This is proudly presented to", marginX, y, { width: contentWidth, align: "center" });
//     y += 25;

//     doc.fontSize(28).fillColor("#000080").text(student.name, marginX, y, { width: contentWidth, align: "center", underline: true });
//     y += 35;

//     doc.fontSize(16).fillColor("#333").text(`Score: ${score}/3`, marginX, y, { width: contentWidth, align: "center" });
//     y += 25;

//     doc.fontSize(16).fillColor("#000").text(
//       "in recognition of outstanding achievement in the Artificial Intelligence Online Test,",
//       marginX,
//       y,
//       { width: contentWidth, align: "center", lineGap: 6 }
//     );
//     y += 40;
//     doc.text(
//       "organized and conducted by Softwallet Innovative Technologies Pvt. Ltd.",
//       marginX,
//       y,
//       { width: contentWidth, align: "center", lineGap: 6 }
//     );
//     y += 40;

//     doc.fontSize(14).text(`Awarded on: ${date}`, marginX, y, { width: contentWidth, align: "center" });

//     const sigSpacing = 60;
//     const sigX = 100;
//     const sigY = y + sigSpacing;

//     doc.fontSize(14).fillColor("#333").text(`Certificate ID: ${certId}`, marginX, sigY - 40, { width: contentWidth, align: "center" });

//     try {
//       const sigPath = path.join(__dirname, "signature.png");
//       if (fs.existsSync(sigPath)) {
//         doc.image(sigPath, sigX, sigY - 20, { width: 180, height: 45 });
//       }
//     } catch (e) {
//       console.log("Signature image missing, skipping...");
//     }

//     doc.moveTo(sigX, sigY + 30).lineTo(sigX + 200, sigY + 30).stroke();
//     doc.fontSize(14).text("Authorized Signatory", sigX, sigY + 35, { align: "left" });
//     doc.text("(Softwallet Innovative Technologies Pvt. Ltd.)", sigX, sigY + 55, { align: "left" });
//     doc.fontSize(12).text("Registered under:- Ministry of Corporate Affairs", sigX, sigY + 75, { align: "left" });
//     doc.text("Govt. of India", sigX, sigY + 90, { align: "left" });

//     doc.end();

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Error submitting exam" });
//   }
// });

// // Auth check
// app.get("/auth-check", (req, res) => {
//   const token = req.cookies.examToken;
//   if (!token) return res.status(401).json({ authenticated: false });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     res.json({ authenticated: true, userId: decoded.id });
//   } catch {
//     res.status(401).json({ authenticated: false });
//   }
// });

// // Logout
// app.post("/logout", (req, res) => {
//   res.clearCookie("examToken");
//   res.json({ success: true });
// });

// // ----------------- Start server -----------------
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

//Removed sending mail 
//This code works as per the the registration rules best and final
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import bodyParser from "body-parser";
// import dotenv from "dotenv";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import Razorpay from "razorpay";
// import crypto from "crypto";
// import { v4 as uuidv4 } from "uuid";
// import PDFDocument from "pdfkit";
// import path from "path";
// import { fileURLToPath } from "url";
// import helmet from "helmet";
// import rateLimit from "express-rate-limit";
// import { body, validationResult } from "express-validator";
// import cookieParser from "cookie-parser";
// import fs from "fs";

// dotenv.config();
// const app = express();

// // ----------------- Security Middleware -----------------
// app.use(helmet());
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL || "http://localhost:3000",
//     credentials: true,
//   })
// );
// app.use(bodyParser.json({ limit: "5mb" }));
// app.use(cookieParser());

// // Rate limit
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: { error: "Too many requests, try again later" },
// });
// app.use(limiter);

// // ----------------- Paths -----------------
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // ----------------- MongoDB Connection -----------------
// const MONGO_URI = process.env.MONGO_URI;
// if (!MONGO_URI) {
//   console.error("❌ ERROR: MONGO_URI not found in .env file");
//   process.exit(1);
// }

// mongoose
//   .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => {
//     console.error("❌ MongoDB Error:", err.message);
//     process.exit(1);
//   });

// // ----------------- Schemas -----------------
// const studentSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   phone: String,
//   residence: String,
//   profilePic: String,
//   orderId: String,
//   paymentId: String,
//   studentId: String,
//   password: String,
//   paymentStatus: String,
// });

// const examSchema = new mongoose.Schema({
//   uniqueId: String,
//   score: Number,
//   date: String,
// });

// const Student = mongoose.model("Student", studentSchema);
// const Exam = mongoose.model("Exam", examSchema);

// // ----------------- Razorpay -----------------
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // ----------------- Routes -----------------

// // Create Razorpay Order
// app.post("/create-order", async (req, res) => {
//   try {
//     const fixedAmount = 100; // INR
//     const options = {
//       amount: fixedAmount * 100,
//       currency: "INR",
//       receipt: "receipt_" + Date.now(),
//     };
//     const order = await razorpay.orders.create(options);
//     res.json(order);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Error generating order" });
//   }
// });

// // Verify Payment + Save Student
// app.post(
//   "/verify-payment",
//   [
//     body("formData.name").isString().trim().escape(),
//     body("formData.email").isEmail().normalizeEmail(),
//     body("formData.phone").isMobilePhone().trim().escape(),
//     body("formData.residence").isString().trim().escape(),
//   ],
//   async (req, res) => {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty())
//         return res.status(400).json({ success: false, message: "Invalid input" });

//       const { razorpay_order_id, razorpay_payment_id, razorpay_signature, formData } = req.body;

//       const sign = razorpay_order_id + "|" + razorpay_payment_id;
//       const expectedSign = crypto
//         .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//         .update(sign.toString())
//         .digest("hex");

//       if (expectedSign !== razorpay_signature)
//         return res.status(400).json({ success: false, message: "Invalid signature" });

//       if (!formData.studentId) formData.studentId = uuidv4();

//       const tempPassword = uuidv4().slice(0, 8);
//       const hashedPassword = await bcrypt.hash(tempPassword, 10);

//       const student = new Student({
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone,
//         residence: formData.residence,
//         profilePic: formData.profilePic || "",
//         orderId: razorpay_order_id,
//         paymentId: razorpay_payment_id,
//         paymentStatus: "Success",
//         studentId: formData.studentId,
//         password: hashedPassword,
//       });

//       await student.save();

//       // ✅ Email sending removed

//       const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: "2h" });
//       res.cookie("examToken", token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "strict",
//         maxAge: 2 * 60 * 60 * 1000,
//       });

//       res.json({
//         success: true,
//         studentId: formData.studentId,
//         tempPassword,
//       });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ success: false, message: "Server error" });
//     }
//   }
// );

// // Login with Student ID + Password
// app.post("/login", async (req, res) => {
//   try {
//     const { studentId, password } = req.body;
//     const student = await Student.findOne({ studentId });
//     if (!student) return res.status(400).json({ error: "Invalid Student ID" });

//     const isMatch = await bcrypt.compare(password, student.password);
//     if (!isMatch) return res.status(400).json({ error: "Invalid password" });

//     const existingExam = await Exam.findOne({ uniqueId: studentId });
//     if (existingExam)
//       return res.status(403).json({ error: "Exam already submitted. You cannot login again." });

//     const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: "2h" });
//     res.cookie("examToken", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 2 * 60 * 60 * 1000,
//     });

//     res.json({ success: true, student });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Login failed" });
//   }
// });

// // Submit Exam + Generate PDF
// app.post("/submit-exam", async (req, res) => {
//   try {
//     const { uniqueId, score } = req.body;
//     const student = await Student.findOne({ studentId: uniqueId });
//     if (!student) return res.status(400).json({ error: "Student not found" });

//     const existingExam = await Exam.findOne({ uniqueId });
//     if (existingExam) return res.status(403).json({ error: "Exam already submitted" });

//     const exam = new Exam({
//       uniqueId,
//       score,
//       date: new Date().toLocaleString(),
//     });
//     await exam.save();

//     // ---------------- PDF Certificate ----------------
// const doc = new PDFDocument({ size: "A4", margin: 50 });
// let buffers = [];
// doc.on("data", buffers.push.bind(buffers));
// doc.on("end", () => {
//   let pdfData = Buffer.concat(buffers);
//   res.set({
//     "Content-Type": "application/pdf",
//     "Content-Disposition": "attachment; filename=certificate.pdf",
//     "Content-Length": pdfData.length,
//   });
//   res.send(pdfData);
// });

// const pageWidth = doc.page.width;
// const pageHeight = doc.page.height;
// const certId = uuidv4();
// const date = new Date().toLocaleDateString("en-GB");

// // ----------------- Watermark -----------------
// doc.save();
// doc.fontSize(60)
//    .fillColor('#CCCCCC')
//    .opacity(0.2)
//    .rotate(-45, { origin: [pageWidth / 2, pageHeight / 2] })
//    .text('Softwallet Innovative Technologies Pvt. Ltd.', pageWidth / 4, pageHeight / 2, {
//      width: pageWidth / 2,
//      align: 'center',
//    });
// doc.rotate(0).opacity(1); // Reset rotation and opacity
// doc.restore();

// // Border
// doc.save();
// doc.lineWidth(6);
// doc.strokeColor("#FFD700");
// doc.rect(20, 20, pageWidth - 40, pageHeight - 40).stroke();
// doc.restore();

// // Margins and content width
// const marginX = 60;
// const contentWidth = pageWidth - marginX * 2;
// let y = 100;

// // Title
// doc.fontSize(36).fillColor("#000080").text("Certificate of Achievement", marginX, y, {
//   width: contentWidth,
//   align: "center",
//   underline: true,
// });
// y += 70;

// // Subtitle
// doc.fontSize(18).fillColor("#333").text("This certificate is proudly presented to", marginX, y, {
//   width: contentWidth,
//   align: "center",
// });
// y += 35;

// // Student Name
// doc.fontSize(30).fillColor("#000").text(student.name, marginX, y, {
//   width: contentWidth,
//   align: "center",
//   underline: true,
// });
// y += 50;

// // Score
// doc.fontSize(18).fillColor("#333").text(`Score: ${score}/3`, marginX, y, {
//   width: contentWidth,
//   align: "center",
// });
// y += 35;

// // Description - split lines to prevent overlap
// doc.fontSize(16).fillColor("#000").text(
//   "In recognition of outstanding achievement",
//   marginX,
//   y,
//   { width: contentWidth, align: "center", lineGap: 8 }
// );
// y += 25;

// doc.text(
//   "in the Artificial Intelligence Online Test,",
//   marginX,
//   y,
//   { width: contentWidth, align: "center", lineGap: 8 }
// );
// y += 25;

// doc.text(
//   "organized and conducted by Softwallet Innovative Technologies Pvt. Ltd.",
//   marginX,
//   y,
//   { width: contentWidth, align: "center", lineGap: 8 }
// );
// y += 40;

// // Date
// doc.fontSize(14).fillColor("#333").text(`Awarded on: ${date}`, marginX, y, {
//   width: contentWidth,
//   align: "center",
// });
// y += 60;

// // Signature section
// const sigSpacing = 60;
// const sigX = 100;
// const sigY = y;

// doc.fontSize(14).fillColor("#333").text(`Certificate ID: ${certId}`, sigX, sigY - 40, {
//   width: 400,
//   align: "left",
// });

// try {
//   const sigPath = path.join(__dirname, "signature.png");
//   if (fs.existsSync(sigPath)) {
//     doc.image(sigPath, sigX, sigY, { width: 180, height: 45 });
//   }
// } catch (e) {
//   console.log("Signature image missing, skipping...");
// }

// doc.moveTo(sigX, sigY + 50).lineTo(sigX + 200, sigY + 50).stroke();
// doc.fontSize(14).text("Authorized Signatory", sigX, sigY + 55, { align: "left" });
// doc.text("(Softwallet Innovative Technologies Pvt. Ltd.)", sigX, sigY + 75, { align: "left" });
// doc.fontSize(12).text("Registered under:- Ministry of Corporate Affairs", sigX, sigY + 95, { align: "left" });
// doc.text("Govt. of India", sigX, sigY + 110, { align: "left" });

// doc.end();


//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Error submitting exam" });
//   }
// });

// // Auth check
// app.get("/auth-check", (req, res) => {
//   const token = req.cookies.examToken;
//   if (!token) return res.status(401).json({ authenticated: false });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     res.json({ authenticated: true, userId: decoded.id });
//   } catch {
//     res.status(401).json({ authenticated: false });
//   }
// });

// // Logout
// app.post("/logout", (req, res) => {
//   res.clearCookie("examToken");
//   res.json({ success: true });
// });

// // ----------------- Start server -----------------
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

//Proctor
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import bodyParser from "body-parser";
// import dotenv from "dotenv";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import Razorpay from "razorpay";
// import crypto from "crypto";
// import { v4 as uuidv4 } from "uuid";
// import PDFDocument from "pdfkit";
// import path from "path";
// import { fileURLToPath } from "url";
// import helmet from "helmet";
// import rateLimit from "express-rate-limit";
// import { body, validationResult } from "express-validator";
// import cookieParser from "cookie-parser";
// import fs from "fs";

// dotenv.config();
// const app = express();

// // ----------------- Security Middleware -----------------
// app.use(helmet());
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL || "http://localhost:3000",
//     credentials: true,
//   })
// );
// app.use(bodyParser.json({ limit: "5mb" }));
// app.use(cookieParser());

// // Rate limit
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: { error: "Too many requests, try again later" },
// });
// app.use(limiter);

// // ----------------- Paths -----------------
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // ----------------- MongoDB Connection -----------------
// const MONGO_URI = process.env.MONGO_URI;
// if (!MONGO_URI) {
//   console.error("❌ ERROR: MONGO_URI not found in .env file");
//   process.exit(1);
// }

// mongoose
//   .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => {
//     console.error("❌ MongoDB Error:", err.message);
//     process.exit(1);
//   });

// // ----------------- Schemas -----------------
// const studentSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   phone: String,
//   residence: String,
//   profilePic: String,
//   orderId: String,
//   paymentId: String,
//   studentId: String,
//   password: String,
//   paymentStatus: String,
// });

// const examSchema = new mongoose.Schema({
//   uniqueId: String,
//   score: Number,
//   date: String,
// });

// const Student = mongoose.model("Student", studentSchema);
// const Exam = mongoose.model("Exam", examSchema);

// // ----------------- Razorpay -----------------
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // ----------------- Routes -----------------

// // Create Razorpay Order
// app.post("/create-order", async (req, res) => {
//   try {
//     const fixedAmount = 100; // INR
//     const options = {
//       amount: fixedAmount * 100,
//       currency: "INR",
//       receipt: "receipt_" + Date.now(),
//     };
//     const order = await razorpay.orders.create(options);
//     res.json(order);
//   } catch (err) {
//     console.error("Razorpay order error:", err);
//     res.status(500).json({ error: "Error generating order" });
//   }
// });

// // Verify Payment + Save Student (Crash-proof)
// app.post(
//   "/verify-payment",
//   [
//     body("formData.name").isString().trim().escape(),
//     body("formData.email").isEmail().normalizeEmail(),
//     body("formData.phone").isMobilePhone().trim().escape(),
//     body("formData.residence").isString().trim().escape(),
//   ],
//   async (req, res) => {
//     try {
//       if (!req.body) return res.status(400).json({ success: false, message: "No data sent" });

//       const { razorpay_order_id, razorpay_payment_id, razorpay_signature, formData } = req.body || {};

//       if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !formData) {
//         return res.status(400).json({ success: false, message: "Missing payment or form data" });
//       }

//       const errors = validationResult(req);
//       if (!errors.isEmpty())
//         return res.status(400).json({ success: false, message: "Invalid input", errors: errors.array() });

//       const sign = razorpay_order_id + "|" + razorpay_payment_id;
//       const expectedSign = crypto
//         .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//         .update(sign.toString())
//         .digest("hex");

//       if (expectedSign !== razorpay_signature)
//         return res.status(400).json({ success: false, message: "Invalid signature" });

//       if (!formData.studentId) formData.studentId = uuidv4();

//       const tempPassword = uuidv4().slice(0, 8);
//       const hashedPassword = await bcrypt.hash(tempPassword, 10);

//       let student;
//       try {
//         student = new Student({
//           name: formData.name,
//           email: formData.email,
//           phone: formData.phone,
//           residence: formData.residence,
//           profilePic: formData.profilePic || "",
//           orderId: razorpay_order_id,
//           paymentId: razorpay_payment_id,
//           paymentStatus: "Success",
//           studentId: formData.studentId,
//           password: hashedPassword,
//         });
//         await student.save();
//       } catch (err) {
//         console.error("MongoDB save error:", err);
//         return res.status(500).json({ success: false, message: "Error saving student data" });
//       }

//       const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: "2h" });
//       res.cookie("examToken", token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "strict",
//         maxAge: 2 * 60 * 60 * 1000,
//       });

//       res.json({
//         success: true,
//         studentId: formData.studentId,
//         tempPassword,
//       });
//     } catch (err) {
//       console.error("Verify payment error:", err);
//       res.status(500).json({ success: false, message: "Server error" });
//     }
//   }
// );

// // Login
// app.post("/login", async (req, res) => {
//   try {
//     const { studentId, password } = req.body || {};
//     if (!studentId || !password) return res.status(400).json({ error: "Student ID and password required" });

//     const student = await Student.findOne({ studentId });
//     if (!student) return res.status(400).json({ error: "Invalid Student ID" });

//     const isMatch = await bcrypt.compare(password, student.password);
//     if (!isMatch) return res.status(400).json({ error: "Invalid password" });

//     const existingExam = await Exam.findOne({ uniqueId: studentId });
//     if (existingExam)
//       return res.status(403).json({ error: "Exam already submitted. You cannot login again." });

//     const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: "2h" });
//     res.cookie("examToken", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 2 * 60 * 60 * 1000,
//     });

//     res.json({ success: true, student });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ error: "Login failed" });
//   }
// });

// // Submit Exam + PDF (Crash-proof)
// app.post("/submit-exam", async (req, res) => {
//   try {
//     const { uniqueId, score } = req.body || {};
//     if (!uniqueId || score === undefined) return res.status(400).json({ error: "Missing exam data" });

//     const student = await Student.findOne({ studentId: uniqueId });
//     if (!student) return res.status(400).json({ error: "Student not found" });

//     const existingExam = await Exam.findOne({ uniqueId });
//     if (existingExam) return res.status(403).json({ error: "Exam already submitted" });

//     const exam = new Exam({
//       uniqueId,
//       score,
//       date: new Date().toLocaleString(),
//     });
//     await exam.save();

//     // ---------------- PDF Certificate ----------------
//     const doc = new PDFDocument({ size: "A4", margin: 50 });
//     let buffers = [];
//     doc.on("data", buffers.push.bind(buffers));
//     doc.on("end", () => {
//       const pdfData = Buffer.concat(buffers);
//       res.set({
//         "Content-Type": "application/pdf",
//         "Content-Disposition": "attachment; filename=certificate.pdf",
//         "Content-Length": pdfData.length,
//       });
//       res.send(pdfData);
//     });

//     const pageWidth = doc.page.width;
//     const pageHeight = doc.page.height;
//     const certId = uuidv4();
//     const date = new Date().toLocaleDateString("en-GB");

//     // ----------------- Watermark -----------------
//     doc.save();
//     doc.fontSize(60)
//       .fillColor("#CCCCCC")
//       .opacity(0.2)
//       .rotate(-45, { origin: [pageWidth / 2, pageHeight / 2] })
//       .text("Softwallet Innovative Technologies Pvt. Ltd.", pageWidth / 4, pageHeight / 2, {
//         width: pageWidth / 2,
//         align: "center",
//       });
//     doc.rotate(0).opacity(1);
//     doc.restore();

//     // Border
//     doc.save();
//     doc.lineWidth(6);
//     doc.strokeColor("#FFD700");
//     doc.rect(20, 20, pageWidth - 40, pageHeight - 40).stroke();
//     doc.restore();

//     const marginX = 60;
//     const contentWidth = pageWidth - marginX * 2;
//     let y = 100;

//     doc.fontSize(36).fillColor("#000080").text("Certificate of Achievement", marginX, y, {
//       width: contentWidth,
//       align: "center",
//       underline: true,
//     });
//     y += 70;
//     doc.fontSize(18).fillColor("#333").text("This certificate is proudly presented to", marginX, y, {
//       width: contentWidth,
//       align: "center",
//     });
//     y += 35;
//     doc.fontSize(30).fillColor("#000").text(student.name, marginX, y, {
//       width: contentWidth,
//       align: "center",
//       underline: true,
//     });
//     y += 50;
//     doc.fontSize(18).fillColor("#333").text(`Score: ${score}/3`, marginX, y, { width: contentWidth, align: "center" });
//     y += 35;
//     doc.fontSize(16).fillColor("#000").text("In recognition of outstanding achievement", marginX, y, {
//       width: contentWidth,
//       align: "center",
//       lineGap: 8,
//     });
//     y += 25;
//     doc.text("in the Artificial Intelligence Online Test,", marginX, y, { width: contentWidth, align: "center", lineGap: 8 });
//     y += 25;
//     doc.text(
//       "organized and conducted by Softwallet Innovative Technologies Pvt. Ltd.",
//       marginX,
//       y,
//       { width: contentWidth, align: "center", lineGap: 8 }
//     );
//     y += 40;
//     doc.fontSize(14).fillColor("#333").text(`Awarded on: ${date}`, marginX, y, { width: contentWidth, align: "center" });
//     y += 60;

//     const sigSpacing = 60;
//     const sigX = 100;
//     const sigY = y;
//     doc.fontSize(14).fillColor("#333").text(`Certificate ID: ${certId}`, sigX, sigY - 40, { width: 400, align: "left" });

//     try {
//       const sigPath = path.join(__dirname, "signature.png");
//       if (fs.existsSync(sigPath)) doc.image(sigPath, sigX, sigY, { width: 180, height: 45 });
//     } catch (e) {
//       console.log("Signature image missing, skipping...");
//     }

//     doc.moveTo(sigX, sigY + 50).lineTo(sigX + 200, sigY + 50).stroke();
//     doc.fontSize(14).text("Authorized Signatory", sigX, sigY + 55, { align: "left" });
//     doc.text("(Softwallet Innovative Technologies Pvt. Ltd.)", sigX, sigY + 75, { align: "left" });
//     doc.fontSize(12).text("Registered under:- Ministry of Corporate Affairs", sigX, sigY + 95, { align: "left" });
//     doc.text("Govt. of India", sigX, sigY + 110, { align: "left" });

//     doc.end();
//   } catch (err) {
//     console.error("Submit exam error:", err);
//     res.status(500).json({ error: "Error submitting exam" });
//   }
// });

// // Auth check
// app.get("/auth-check", (req, res) => {
//   const token = req.cookies.examToken;
//   if (!token) return res.status(401).json({ authenticated: false });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     res.json({ authenticated: true, userId: decoded.id });
//   } catch {
//     res.status(401).json({ authenticated: false });
//   }
// });

// // Logout
// app.post("/logout", (req, res) => {
//   res.clearCookie("examToken");
//   res.json({ success: true });
// });

// // ----------------- Global Handlers -----------------
// app.use((req, res) => res.status(404).json({ error: "Route not found" }));

// app.use((err, req, res, next) => {
//   console.error("Unhandled error:", err);
//   res.status(500).json({ error: "Internal Server Error" });
// });

// process.on("uncaughtException", (err) => console.error("Uncaught Exception:", err));
// process.on("unhandledRejection", (reason, promise) => console.error("Unhandled Rejection:", reason));

// // ----------------- Start server -----------------
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

//code to upload on git

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Razorpay from "razorpay";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import PDFDocument from "pdfkit";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import fs from "fs";

dotenv.config();
const app = express();

// ----------------- Security Middleware -----------------
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json({ limit: "5mb" }));
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Too many requests, try again later" },
});
app.use(limiter);

// ----------------- Paths -----------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ----------------- MongoDB Connection -----------------
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Error:", err.message);
    process.exit(1);
  });

// ----------------- Schemas -----------------
const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  residence: String,
  profilePic: String,
  orderId: String,
  paymentId: String,
  studentId: String,
  password: String,
  paymentStatus: { type: String, enum: ["Success","Failed","Pending"], default: "Pending" },
  examSubmitted: { type: Boolean, default: false },
});

const examSchema = new mongoose.Schema({
  uniqueId: String,
  score: Number,
  date: String,
});

const Student = mongoose.model("Student", studentSchema);
const Exam = mongoose.model("Exam", examSchema);

// ----------------- Razorpay -----------------
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ----------------- Routes -----------------

// Create Razorpay order (fixed 300 INR)
app.post("/create-order", async (req, res) => {
  try {
    const order = await razorpay.orders.create({
      amount: 300 * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error generating order" });
  }
});

// Verify payment & save student
app.post("/verify-payment", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, formData } = req.body;
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !formData)
    return res.status(400).json({ success: false, message: "Missing payment or form data" });

  try {
    // Razorpay signature verification
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
                               .update(sign)
                               .digest("hex");
    if (expectedSign !== razorpay_signature)
      return res.status(400).json({ success: false, message: "Invalid signature" });

    // Check if payment already used
    const existingPayment = await Student.findOne({ paymentId: razorpay_payment_id });
    if (existingPayment) {
      return res.status(400).json({ success: false, message: "Payment already used" });
    }

    // Generate temp password
    const tempPassword = uuidv4().slice(0, 8);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const student = new Student({
      ...formData,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      password: hashedPassword,
      paymentStatus: "Success",
    });

    await student.save();

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: "2h" });
    res.cookie("examToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 2 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      studentId: student.studentId,
      tempPassword,
      orderId: razorpay_order_id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ----------------- Submit Exam -----------------
app.post("/submit-exam", async (req, res) => {
  try {
    const { uniqueId, score } = req.body;
    if (!uniqueId) return res.status(400).json({ error: "Student ID required" });

    const student = await Student.findOne({ studentId: uniqueId });
    if (!student) return res.status(404).json({ error: "Student not found" });

    if (student.examSubmitted) return res.status(403).json({ error: "Exam already submitted" });

    student.examSubmitted = true;
    await student.save();

    const exam = new Exam({ uniqueId: student.studentId, score, date: new Date().toLocaleDateString() });
    await exam.save();

    // ---------------- PDF Certificate ----------------
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    let buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=certificate.pdf",
        "Content-Length": pdfData.length,
      });
      res.send(pdfData);
    });

    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;
    const certId = uuidv4();
    const date = new Date().toLocaleDateString("en-GB");

    // Watermark
    doc.save();
    doc.fontSize(60)
      .fillColor("#CCCCCC")
      .opacity(0.2)
      .rotate(-45, { origin: [pageWidth / 2, pageHeight / 2] })
      .text("Softwallet Innovative Technologies Pvt. Ltd.", pageWidth / 4, pageHeight / 2, {
        width: pageWidth / 2,
        align: "center",
      });
    doc.rotate(0).opacity(1);
    doc.restore();

    // Border
    doc.save();
    doc.lineWidth(6);
    doc.strokeColor("#FFD700");
    doc.rect(20, 20, pageWidth - 40, pageHeight - 40).stroke();
    doc.restore();

    const marginX = 60;
    const contentWidth = pageWidth - marginX * 2;
    let y = 100;

    doc.fontSize(36).fillColor("#000080").text("Certificate of Achievement", marginX, y, {
      width: contentWidth,
      align: "center",
      underline: true,
    });
    y += 70;
    doc.fontSize(18).fillColor("#333").text("This certificate is proudly presented to", marginX, y, {
      width: contentWidth,
      align: "center",
    });
    y += 35;
    doc.fontSize(30).fillColor("#000").text(student.name, marginX, y, {
      width: contentWidth,
      align: "center",
      underline: true,
    });
    y += 50;
    doc.fontSize(18).fillColor("#333").text(`Score: ${score}/3`, marginX, y, { width: contentWidth, align: "center" });
    y += 35;
    doc.fontSize(16).fillColor("#000").text("In recognition of outstanding achievement", marginX, y, {
      width: contentWidth,
      align: "center",
      lineGap: 8,
    });
    y += 25;
    doc.text("in the Artificial Intelligence Online Test,", marginX, y, { width: contentWidth, align: "center", lineGap: 8 });
    y += 25;
    doc.text(
      "organized and conducted by Softwallet Innovative Technologies Pvt. Ltd.",
      marginX,
      y,
      { width: contentWidth, align: "center", lineGap: 8 }
    );
    y += 40;
    doc.fontSize(14).fillColor("#333").text(`Awarded on: ${date}`, marginX, y, { width: contentWidth, align: "center" });
    y += 60;

    const sigX = 100;
    const sigY = y;
    doc.fontSize(14).fillColor("#333").text(`Certificate ID: ${certId}`, sigX, sigY - 40, { width: 400, align: "left" });

    try {
      const sigPath = path.join(__dirname, "signature.png");
      if (fs.existsSync(sigPath)) doc.image(sigPath, sigX, sigY, { width: 180, height: 45 });
    } catch (e) {
      console.log("Signature image missing, skipping...");
    }

    doc.moveTo(sigX, sigY + 50).lineTo(sigX + 200, sigY + 50).stroke();
    doc.fontSize(14).text("Authorized Signatory", sigX, sigY + 55, { align: "left" });
    doc.text("(Softwallet Innovative Technologies Pvt. Ltd.)", sigX, sigY + 75, { align: "left" });
    doc.fontSize(12).text("Registered under:- Ministry of Corporate Affairs", sigX, sigY + 95, { align: "left" });
    doc.text("Govt. of India", sigX, sigY + 110, { align: "left" });

    doc.end();

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit exam" });
  }
});

// ----------------- Login -----------------
app.post("/login", async (req, res) => {
  const { studentId, password } = req.body;
  const student = await Student.findOne({ studentId });
  if (!student) return res.status(401).json({ error: "Invalid login details" });

  const match = await bcrypt.compare(password, student.password);
  if (!match) return res.status(401).json({ error: "Invalid login details" });

  // 🚨 Block login if exam already submitted
  if (student.examSubmitted) {
    return res.status(403).json({ error: "You have already submitted the exam" });
  }

  res.json({ success: true, student });
});

// ----------------- Auth-check -----------------
app.get("/auth-check", (req, res) => res.json({ success: true }));

// ----------------- Global handlers -----------------
app.use((req, res) => res.status(404).json({ error: "Route not found" }));
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// ----------------- Start server -----------------
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
