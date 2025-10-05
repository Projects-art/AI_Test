// import React  from 'react';
// import '../css/about.css';
// import Navbar from '../components/Navbar.js';
// // import { handleClick } from '../minicomponents/Button.js';
// // import { Button } from '../minicomponents/Button.js';
// import Footer from  '../components/Footer.js';

// const About=()=>{
//     return(
//         <div>
//             <Navbar />
// <h1>About Us</h1>
// <h6>👁️ Our Vision</h6>
// <p>Reduce brain drain by building strong national platforms that channel the knowledge and expertise of talented individuals within the country for its sustainable growth.</p>
// <p>Identify and nurture talent through structured tests and interviews across diverse sectors, followed by specialized training programs to contribute to national development.</p>
// <p>Empower youth with advanced technology skills, bridging national and global gaps in innovation, research, and professional expertise.</p>
// <p>To be a global leader in software innovation—transforming how businesses operate, compete, and grow through cutting-edge technology.</p>
// <h6>🧭 Our Mission</h6>
// <p>To empower businesses through innovative, user-centric, and reliable software solutions that drive real-world impact.</p>

// <p>Innovation – We embrace change and always push boundaries.

// Integrity – We build trust through honesty, transparency, and accountability.

// Excellence – We aim for the highest quality in everything we do.

// Collaboration – We believe great things happen when we work together.

// Customer Focus – Your success is our success.</p>
// <h6>💼 Our Core Values</h6>
// <h6>Driving Innovation. Empowering Society</h6>
// <p>At Softwallet Algorithms Technologies pvt Ltd, we’re more than just a software company—we’re your trusted technology partner.</p>

// <p>Founded with a vision to bridge the gap between ideas and technology, we specialize in delivering tailor-made software solutions that help businesses of all sizes scale, innovate, and thrive in the digital age.</p>
// <h6>
// 👨‍💻 Who We Are</h6>
// <p>We are a team of passionate engineers, designers, strategists, and problem-solvers committed to building high-impact digital products. From startups to global enterprises, we work closely with our clients to turn challenges into growth opportunities.</p>
// <p>With years of experience and a strong technical foundation, we deliver solutions that are not only innovative but also efficient, secure, and scalable.</p>

// <h6>🌐 What Sets Us Apart</h6>
// <p>Agile & collaborative development process

// Skilled and dedicated in-house team

// Client-first approach with transparent communication

// Proven track record across industries

// Support that continues after launch</p>
// <h6>📍 Where We Are Based</h6>
// <p>We operate globally, with our headquarters in Jammu & Kashmir(Srinagar)-India and remote teams working across multiple time zones to support clients around the world.</p>
// <h6>📢 Let’s Collaborate</h6>
// <p>At Softwallet, we don’t just write code—we craft digital experiences that create lasting value. Whether you're looking to build a product from scratch, scale your current systems, or explore new technologies, we’re here to help.</p>
// <p>👉 Get in Touch with us today to start your journey.</p>


// <Footer />
//         </div>
//     );

// }
// export default About;

//====================================

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="about-page">
      <Navbar />

      <main className="about-content">
        {/* About Us Card */}
        <section className="card card-gradient-1">
          <h1>About Us</h1>
          <p>
            At Softwallet Innovative Technologies Pvt Ltd, we turn ideas into innovative digital solutions
            that empower businesses and society.
          </p>
        </section>

        {/* Vision */}
        <section className="card card-gradient-2">
          <h2>👁️ Our Vision</h2>
          <p>Reduce brain drain by building strong national platforms that channel the knowledge and expertise of talented individuals within the country for sustainable growth.</p>
          <p>Identify and nurture talent through structured tests and interviews across diverse sectors, followed by specialized training programs to contribute to national development.</p>
          <p>Empower youth with advanced technology skills, bridging national and global gaps in innovation, research, and professional expertise.</p>
          <p>To be a global leader in software innovation—transforming how businesses operate, compete, and grow through cutting-edge technology.</p>
        </section>

        {/* Mission */}
        <section className="card card-gradient-3">
          <h2>🧭 Our Mission</h2>
          <p>To empower businesses through innovative, user-centric, and reliable software solutions that drive real-world impact.</p>
          <ul>
            <li>Innovation – We embrace change and always push boundaries</li>
            <li>Integrity – We build trust through honesty, transparency, and accountability</li>
            <li>Excellence – We aim for the highest quality in everything we do</li>
            <li>Collaboration – We believe great things happen when we work together</li>
            <li>Customer Focus – Your success is our success</li>
          </ul>
        </section>

        {/* Core Values */}
        <section className="card card-gradient-4">
          <h2>💼 Our Core Values</h2>
          <p>Driving Innovation. Empowering Society</p>
          <p>
            At Softwallet Innovative Technologies Pvt Ltd, we’re more than a software company—we’re your trusted technology partner.
            Founded with a vision to bridge the gap between ideas and technology, we deliver tailor-made solutions that help businesses scale, innovate, and thrive in the digital age.
          </p>
        </section>

        {/* Team */}
        <section className="card card-gradient-5">
          <h2>👨‍💻 Who We Are</h2>
          <p>
            We are a team of passionate engineers, designers, strategists, and problem-solvers committed to building high-impact digital products.
            From startups to global enterprises, we work closely with clients to turn challenges into growth opportunities.
          </p>
          <p>With years of experience and a strong technical foundation, we deliver solutions that are innovative, efficient, secure, and scalable.</p>
        </section>

        {/* What Sets Us Apart */}
        <section className="card card-gradient-6">
          <h2>🌐 What Sets Us Apart</h2>
          <ul>
            <li>Agile & collaborative development process</li>
            <li>Skilled and dedicated in-house team</li>
            <li>Client-first approach with transparent communication</li>
            <li>Proven track record across industries</li>
            <li>Support that continues after launch</li>
          </ul>
        </section>

        {/* Location */}
        <section className="card card-gradient-1">
          <h2>📍 Where We Are Based</h2>
          <p>
            We operate globally, with headquarters in Jammu & Kashmir (Srinagar), India, and remote teams across multiple time zones to support clients worldwide.
          </p>
        </section>

        {/* Collaboration CTA */}
        <section className="card card-gradient-2">
          <h2>📢 Let’s Collaborate</h2>
          <p>
            At Softwallet, we craft digital experiences that create lasting value. Whether building a product from scratch, scaling systems, or exploring new technologies, we’re here to help.
          </p>
          <a href="#contact" className="btn primary-btn">Get in Touch</a>
        </section>
      </main>

      <Footer />

      {/* Inline CSS */}
      <style>{`
        .about-page {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f5f6fa;
          color: #333;
          line-height: 1.7;
        }

        .about-content {
          max-width: 900px;
          margin: 40px auto;
          padding: 0 20px;
        }

        .card {
          margin-bottom: 30px;
          padding: 25px;
          border-radius: 12px;
          color: #fff;
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.15);
        }

        h1, h2 {
          margin-bottom: 15px;
        }
        h1 { font-size: 1.8rem; }
        h2 { font-size: 1.6rem; }

        ul {
          list-style: none;
          padding-left: 0;
        }
        ul li {
          margin-bottom: 8px;
          padding-left: 20px;
          position: relative;
        }
        ul li::before {
          content: "•";
          position: absolute;
          left: 0;
          font-weight: bold;
          color: #fff;
        }

        .btn {
          display: inline-block;
          padding: 12px 25px;
          margin-top: 15px;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        .primary-btn {
          background: #ff6f61;
          color: #fff;
        }
        .primary-btn:hover {
          background: #ff3b2f;
          transform: translateY(-3px);
        }

        /* Gradients for cards */
        .card-gradient-1 { background: linear-gradient(135deg, #1abc9c, #16a085); }
        .card-gradient-2 { background: linear-gradient(135deg, #3498db, #2980b9); }
        .card-gradient-3 { background: linear-gradient(135deg, #9b59b6, #8e44ad); }
        .card-gradient-4 { background: linear-gradient(135deg, #e67e22, #d35400); }
        .card-gradient-5 { background: linear-gradient(135deg, #e74c3c, #c0392b); }
        .card-gradient-6 { background: linear-gradient(135deg, #2ecc71, #27ae60); }

        /* Responsive */
        @media (max-width: 768px) {
          h1 { font-size: 1.6rem; }
          h2 { font-size: 1.4rem; }
          .card { padding: 20px; }
        }

        @media (max-width: 480px) {
          h1 { font-size: 1.4rem; }
          h2 { font-size: 1.2rem; }
          .card { padding: 15px; }
        }
      `}</style>
    </div>
  );
};

export default About;
