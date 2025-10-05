// import React  from 'react';
// import '../css/home.css';
// import Navbar from '../components/Navbar.js';
// import Footer from  '../components/Footer.js';

// const Home=()=>{  
//    return(
//         <div>
            
//             <Navbar />
//             <div className="center-container">
//             <h1>Home</h1> 
         
//             <p>Welcome to Softwallet innovative Technologies Pvt Ltd</p>
//             <p>At Softwallet innovative Technologies Pvt.Ltd, we transform ideas into powerful digital products. As a leading software development company, we deliver custom solutions that are scalable, secure, and performance-driven—designed to meet your unique business goals.
// </p>
//    <h6>🚀 What We Do</h6>   
//    <p>We specialize in developing end-to-end software solutions tailored to your business needs:

// Custom Software Development
// Scalable and robust software built from scratch.

// Web & Mobile App Development
// User-centric, cross-platform apps that drive engagement.

// Cloud Solutions & DevOps
// Modern infrastructure that grows with your business.

// UI/UX Design
// Beautiful interfaces with seamless user experiences.

// Software Consulting
// Strategic guidance to maximize technology ROI.</p>  
// <h6>💡 Why Choose Us</h6>
//  <p>✅ Expert team of developers, designers, and strategists
//  ✅ Agile development process for faster time-to-market</p>
 
//  <p>✅ Transparent communication & on-time delivery
//  ✅ Proven track record with startups & enterprises
//  ✅ Cutting-edge technologies and best practices</p>
//  <h6>🌍 Industries We Serve</h6>
//  <p>We work with clients across various domains including:

// FinTech

// Healthcare

// E-commerce

// Education

// Logistics

// Real Estate
// </p>
// <h6>🛠️ Our Tech Stack</h6>
// <p>We leverage the latest and most reliable technologies:

// Frontend: React, Angular, Vue.js

// Backend: Node.js, Python, .NET, Java

// Mobile: React Native, Flutter, Swift, Kotlin

// Cloud: AWS, Azure, Google Cloud

// Database: MongoDB, PostgreSQL, MySQL, Firebase</p>
// <p>📞 Let’s Build Something Great Together
// Ready to start your digital transformation journey?

// 👉 Contact Us for a free consultation
// 👉 View Our Portfolio to see our success stories</p>
// </div>
            
//             <Footer />
//         </div>
//     );
// }
// export default Home;

//=============================


// import React from 'react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

// const Home = () => {
//   return (
//     <div className="home-page">
//       {/* Navbar */}
//       <Navbar />

//       {/* Main Content */}
//       <main className="home-content">
//         <section className="hero-section">
//           <h1>Welcome to Softwallet Innovative Technologies Pvt Ltd</h1>
//           <p>
//             At Softwallet Innovative Technologies Pvt. Ltd, we transform ideas into powerful digital
//             products. As a leading software development company, we deliver custom solutions that are
//             scalable, secure, and performance-driven—designed to meet your unique business goals.
//           </p>
//         </section>

//         <section className="what-we-do">
//           <h2>🚀 What We Do</h2>
//           <ul>
//             <li>
//               <strong>Custom Software Development:</strong> Scalable and robust software built from
//               scratch.
//             </li>
//             <li>
//               <strong>Web & Mobile App Development:</strong> User-centric, cross-platform apps that
//               drive engagement.
//             </li>
//             <li>
//               <strong>Cloud Solutions & DevOps:</strong> Modern infrastructure that grows with your
//               business.
//             </li>
//             <li>
//               <strong>UI/UX Design:</strong> Beautiful interfaces with seamless user experiences.
//             </li>
//             <li>
//               <strong>Software Consulting:</strong> Strategic guidance to maximize technology ROI.
//             </li>
//           </ul>
//         </section>

//         <section className="why-choose-us">
//           <h2>💡 Why Choose Us</h2>
//           <ul>
//             <li>✅ Expert team of developers, designers, and strategists</li>
//             <li>✅ Agile development process for faster time-to-market</li>
//             <li>✅ Transparent communication & on-time delivery</li>
//             <li>✅ Proven track record with startups & enterprises</li>
//             <li>✅ Cutting-edge technologies and best practices</li>
//           </ul>
//         </section>

//         <section className="industries">
//           <h2>🌍 Industries We Serve</h2>
//           <ul>
//             <li>FinTech</li>
//             <li>Healthcare</li>
//             <li>E-commerce</li>
//             <li>Education</li>
//             <li>Logistics</li>
//             <li>Real Estate</li>
//           </ul>
//         </section>

//         <section className="tech-stack">
//           <h2>🛠️ Our Tech Stack</h2>
//           <ul>
//             <li>
//               <strong>Frontend:</strong> React, Angular, Vue.js
//             </li>
//             <li>
//               <strong>Backend:</strong> Node.js, Python, .NET, Java
//             </li>
//             <li>
//               <strong>Mobile:</strong> React Native, Flutter, Swift, Kotlin
//             </li>
//             <li>
//               <strong>Cloud:</strong> AWS, Azure, Google Cloud
//             </li>
//             <li>
//               <strong>Database:</strong> MongoDB, PostgreSQL, MySQL, Firebase
//             </li>
//           </ul>
//         </section>

//         <section className="call-to-action">
//           <h2>📞 Let’s Build Something Great Together</h2>
//           <p>Ready to start your digital transformation journey?</p>
//           <ul>
//             <li>👉 Contact Us for a free consultation</li>
//             <li>👉 View Our Portfolio to see our success stories</li>
//           </ul>
//         </section>
//       </main>

//       {/* Footer */}
//       <Footer />

//       {/* Inline CSS */}
//       <style>{`
//         .home-page {
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//           color: #333;
//           line-height: 1.6;
//           background-color: #f9f9f9;
//         }

//         .home-content {
//           max-width: 1000px;
//           margin: 40px auto;
//           padding: 0 20px;
//         }

//         .hero-section {
//           text-align: center;
//           padding: 60px 20px;
//           background: linear-gradient(135deg, #4e54c8, #8f94fb);
//           color: #fff;
//           border-radius: 12px;
//           box-shadow: 0 8px 20px rgba(0,0,0,0.1);
//           margin-bottom: 40px;
//         }

//         .hero-section h1 {
//           font-size: 2.5rem;
//           margin-bottom: 20px;
//         }

//         .hero-section p {
//           font-size: 1.2rem;
//           max-width: 700px;
//           margin: 0 auto;
//         }

//         section {
//           margin-bottom: 40px;
//           padding: 20px;
//           background: #fff;
//           border-radius: 12px;
//           box-shadow: 0 4px 15px rgba(0,0,0,0.05);
//         }

//         h2 {
//           font-size: 1.8rem;
//           color: #4e54c8;
//           margin-bottom: 20px;
//         }

//         ul {
//           list-style: none;
//           padding-left: 0;
//         }

//         ul li {
//           margin-bottom: 10px;
//           padding-left: 25px;
//           position: relative;
//         }

//         ul li::before {
//           content: "•";
//           position: absolute;
//           left: 0;
//           color: #4e54c8;
//           font-weight: bold;
//         }

//         .call-to-action ul li::before {
//           content: "👉";
//           color: #ff6f61;
//         }

//         p {
//           margin-bottom: 15px;
//         }

//         @media (max-width: 768px) {
//           .hero-section h1 {
//             font-size: 2rem;
//           }

//           .hero-section p {
//             font-size: 1rem;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Home;

//=======================


import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />

      <main className="home-content">
        <section className="hero-section">
          <h1>Welcome to Softwallet Innovative Technologies Pvt Ltd</h1>
          <p>
            We transform ideas into powerful digital products. As a leading software development company,
            we deliver custom solutions that are scalable, secure, and performance-driven.
          </p>
        </section>

        <section className="what-we-do card-gradient-1">
          <h2>🚀 What We Do</h2>
          <ul>
            <li><strong>Custom Software Development:</strong> Scalable and robust software built from scratch.</li>
            <li><strong>Web & Mobile App Development:</strong> User-centric, cross-platform apps that drive engagement.</li>
            <li><strong>Cloud Solutions & DevOps:</strong> Modern infrastructure that grows with your business.</li>
            <li><strong>UI/UX Design:</strong> Beautiful interfaces with seamless user experiences.</li>
            <li><strong>Software Consulting:</strong> Strategic guidance to maximize technology ROI.</li>
          </ul>
        </section>

        <section className="why-choose-us card-gradient-2">
          <h2>💡 Why Choose Us</h2>
          <ul>
            <li>✅ Expert team of developers, designers, and strategists</li>
            <li>✅ Agile development process for faster time-to-market</li>
            <li>✅ Transparent communication & on-time delivery</li>
            <li>✅ Proven track record with startups & enterprises</li>
            <li>✅ Cutting-edge technologies and best practices</li>
          </ul>
        </section>

        <section className="industries card-gradient-3">
          <h2>🌍 Industries We Serve</h2>
          <ul>
            <li>FinTech</li>
            <li>Healthcare</li>
            <li>E-commerce</li>
            <li>Education</li>
            <li>Logistics</li>
            <li>Real Estate</li>
          </ul>
        </section>

        <section className="tech-stack card-gradient-4">
          <h2>🛠️ Our Tech Stack</h2>
          <ul>
            <li><strong>Frontend:</strong> React, Angular, Vue.js</li>
            <li><strong>Backend:</strong> Node.js, Python, .NET, Java</li>
            <li><strong>Mobile:</strong> React Native, Flutter, Swift, Kotlin</li>
            <li><strong>Cloud:</strong> AWS, Azure, Google Cloud</li>
            <li><strong>Database:</strong> MongoDB, PostgreSQL, MySQL, Firebase</li>
          </ul>
        </section>

        <section className="call-to-action card-gradient-5">
          <h2>📞 Let’s Build Something Great Together</h2>
          <p>Ready to start your digital transformation journey?</p>
          <ul>
            <li>👉 Contact Us for a free consultation</li>
            <li>👉 View Our Portfolio to see our success stories</li>
          </ul>
        </section>
      </main>

      <Footer />

      <style>{`
        .home-page {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
          background-color: #f5f6fa;
          line-height: 1.6;
        }
        .home-content {
          max-width: 1000px;
          margin: 40px auto;
          padding: 0 20px;
        }

        /* Hero Section */
        .hero-section {
          text-align: center;
          padding: 60px 20px;
          background: linear-gradient(135deg, #4e54c8, #8f94fb);
          color: #fff;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
          margin-bottom: 40px;
        }
        .hero-section h1 {
          font-size: 2.5rem;
          margin-bottom: 20px;
        }
        .hero-section p {
          font-size: 1.2rem;
          max-width: 700px;
          margin: 0 auto;
        }

        /* Card Sections */
        section {
          margin-bottom: 40px;
          padding: 25px;
          border-radius: 12px;
          color: #fff;
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        section:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.15);
        }

        h2 {
          font-size: 1.8rem;
          margin-bottom: 20px;
        }

        ul {
          list-style: none;
          padding-left: 0;
        }
        ul li {
          margin-bottom: 12px;
          padding-left: 25px;
          position: relative;
        }
        ul li::before {
          content: "•";
          position: absolute;
          left: 0;
          font-weight: bold;
          color: #fff;
        }

        .call-to-action ul li::before {
          content: "👉";
          color: #ffdd59;
        }

        /* Gradient colors for cards */
        .card-gradient-1 { background: linear-gradient(135deg, #1abc9c, #16a085); }
        .card-gradient-2 { background: linear-gradient(135deg, #3498db, #2980b9); }
        .card-gradient-3 { background: linear-gradient(135deg, #9b59b6, #8e44ad); }
        .card-gradient-4 { background: linear-gradient(135deg, #e67e22, #d35400); }
        .card-gradient-5 { background: linear-gradient(135deg, #e74c3c, #c0392b); }

        p { margin-bottom: 15px; }

        /* Responsive */
        @media (max-width: 1024px) {
          .home-content {
            margin: 30px auto;
            padding: 0 15px;
          }
        }

        @media (max-width: 768px) {
          .hero-section h1 { font-size: 2rem; }
          .hero-section p { font-size: 1rem; }
          h2 { font-size: 1.5rem; }
          section { padding: 20px; }
        }

        @media (max-width: 480px) {
          .hero-section h1 { font-size: 1.6rem; }
          .hero-section p { font-size: 0.95rem; }
          h2 { font-size: 1.3rem; }
          section { padding: 15px; }
        }
      `}</style>
    </div>
  );
};

export default Home;








