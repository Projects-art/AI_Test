// import React from 'react';
// import '../css/careers.css';
// import Navbar from './Navbar';
// import Footer from './Footer';
// const jobOpenings = [
//   {
//     title: 'Frontend Developer',
//     location: 'Remote / Srinagar, India',
//     type: 'Full-Time',
//     description:
//       'Build modern web interfaces using React.js, Tailwind CSS, and RESTful APIs. Collaborate closely with designers and backend developers.',
//     applyLink: '/apply/frontend-developer',
//   },
//   {
//     title: 'Backend Developer',
//     location: 'Remote / Srinagar, India',
//     type: 'Full-Time',
//     description:
//       'Develop scalable APIs and microservices using Node.js or Django. Experience with databases and DevOps is a plus.',
//     applyLink: '/apply/backend-developer',
//   },
//   {
//     title: 'UI/UX Designer',
//     location: 'Remote',
//     type: 'Contract',
//     description:
//       'Design intuitive and user-friendly experiences for mobile and web. Familiarity with Figma or Adobe XD is required.',
//     applyLink: '/apply/ui-ux-designer',
//   },
//   {
//     title: 'Digital Marketing Specialist',
//     location: 'Srinagar, India',
//     type: 'Full-Time',
//     description:
//       'Plan and execute SEO, social media, and paid ad campaigns. Track performance metrics and optimize for conversions.',
//     applyLink: '/apply/digital-marketing',
//   },
// ];

// const Careers=()=>{
//     return(
//         <div>
//             <Navbar/>
            
//             <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Hero Section */}
//         <div className="text-center mb-16">
//           <h1 className="text-4xl font-bold text-gray-800 mb-4">Join Our Team</h1>
//           <p className="text-gray-600 text-lg">
//             At Softwallet Algorithms, we’re building more than just software — we’re building a culture of innovation, growth, and collaboration.
//           </p>
//         </div>

//         {/* Culture Section */}
//         <div className="grid md:grid-cols-3 gap-6 mb-16">
//           <div className="bg-white p-6 rounded-xl shadow">
//             <h3 className="text-xl font-semibold text-blue-700 mb-2">🌍 Remote Friendly</h3>
//             <p className="text-sm text-gray-600">Work from anywhere with flexible hours and a fully digital team environment.</p>
//           </div>
//           <div className="bg-white p-6 rounded-xl shadow">
//             <h3 className="text-xl font-semibold text-blue-700 mb-2">📚 Learn & Grow</h3>
//             <p className="text-sm text-gray-600">We invest in training, certifications, and learning opportunities for every team member.</p>
//           </div>
//           <div className="bg-white p-6 rounded-xl shadow">
//             <h3 className="text-xl font-semibold text-blue-700 mb-2">🚀 Impactful Work</h3>
//             <p className="text-sm text-gray-600">Work on meaningful projects with real-world impact across industries.</p>
//           </div>
//         </div>

//         {/* Open Positions */}
//         <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">Current Openings</h2>
//         <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
//           {jobOpenings.map((job, index) => (
//             <div
//               key={index}
//               className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
//             >
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
//               <p className="text-sm text-gray-600 mb-1"><strong>Location:</strong> {job.location}</p>
//               <p className="text-sm text-gray-600 mb-3"><strong>Type:</strong> {job.type}</p>
//               <p className="text-sm text-gray-700 mb-4">{job.description}</p>
//               <a
//                 href={job.applyLink}
//                 className="text-white bg-blue-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700"
//               >
//                 Apply Now
//               </a>
//             </div>
//           ))}
//         </div>

//         {/* Call to Action */}
//         <div className="text-center mt-20">
//           <h3 className="text-2xl font-semibold text-gray-800 mb-4">Don’t see a role that fits?</h3>
//           <p className="text-gray-600 mb-6">We’re always on the lookout for great talent. Drop us your resume and we’ll get in touch.</p>
//           <a
//             href="/contact"
//             className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition"
//           >
//             Send Resume
//           </a>
//         </div>
//       </div>
//     </div>
//             <Footer/>
//         </div>
//     );
// }
// export default Careers;

//===============================================

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const jobOpenings = [
  {
    title: 'Frontend Developer',
    location: 'Remote / Srinagar, India',
    type: 'Full-Time',
    description:
      'Build modern web interfaces using React.js, Tailwind CSS, and RESTful APIs. Collaborate closely with designers and backend developers.',
    applyLink: '/apply/frontend-developer',
  },
  {
    title: 'Backend Developer',
    location: 'Remote / Srinagar, India',
    type: 'Full-Time',
    description:
      'Develop scalable APIs and microservices using Node.js or Django. Experience with databases and DevOps is a plus.',
    applyLink: '/apply/backend-developer',
  },
  {
    title: 'UI/UX Designer',
    location: 'Remote',
    type: 'Contract',
    description:
      'Design intuitive and user-friendly experiences for mobile and web. Familiarity with Figma or Adobe XD is required.',
    applyLink: '/apply/ui-ux-designer',
  },
  {
    title: 'Digital Marketing Specialist',
    location: 'Srinagar, India',
    type: 'Full-Time',
    description:
      'Plan and execute SEO, social media, and paid ad campaigns. Track performance metrics and optimize for conversions.',
    applyLink: '/apply/digital-marketing',
  },
  {
    title: 'Robotics Engineer',
    location: 'Remote / Srinagar, India',
    type: 'Full-Time',
    description:
      'Develop and program cutting-edge robotic systems and automation technologies for real-world applications.',
    applyLink: '/apply/robotics-engineer',
  },
  {
    title: 'Artificial Intelligence Specialist',
    location: 'Remote / Srinagar, India',
    type: 'Full-Time',
    description:
      'Design and implement intelligent systems using machine learning, deep learning, and AI technologies.',
    applyLink: '/apply/ai-specialist',
  },
];

const Careers = () => {
  return (
    <div className="careers-page">
      <Navbar />

      <div className="container">
        {/* Hero Section */}
        <section className="hero-section">
          <h1>Join Our Team</h1>
          <p>
            At Softwallet Innovative Technologies Pvt. Ltd, we’re building more than just software — we’re building a culture
            of innovation, growth, and collaboration.
          </p>
        </section>

        {/* Culture Section */}
        <section className="culture-section">
          <div className="culture-card card-gradient-1">
            <h3>🌍 Remote Friendly</h3>
            <p>Work from anywhere with flexible hours and a fully digital team environment.</p>
          </div>
          <div className="culture-card card-gradient-2">
            <h3>📚 Learn & Grow</h3>
            <p>We invest in training, certifications, and learning opportunities for every team member.</p>
          </div>
          <div className="culture-card card-gradient-3">
            <h3>🚀 Impactful Work</h3>
            <p>Work on meaningful projects with real-world impact across industries.</p>
          </div>
        </section>

        {/* Job Openings */}
        <section className="jobs-section">
          <h2>Current Openings</h2>
          <div className="jobs-grid">
            {jobOpenings.map((job, index) => (
              <div key={index} className="job-card">
                <h3>{job.title}</h3>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Type:</strong> {job.type}</p>
                <p>{job.description}</p>
                <a href={job.applyLink} className="btn">Apply Now</a>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <h3>Don’t see a role that fits?</h3>
          <p>We’re always on the lookout for great talent. Drop us your resume and we’ll get in touch.</p>
          <a href="/contact" className="btn">Send Resume</a>
        </section>
      </div>

      <Footer />

      {/* Inline CSS */}
      <style>{`
        .careers-page {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f5f6fa;
          color: #333;
          line-height: 1.7;
        }
        .container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 20px;
        }
        /* Hero Section */
        .hero-section {
          text-align: center;
          padding: 50px 20px;
          background: linear-gradient(135deg, #3498db, #2980b9);
          color: #fff;
          border-radius: 12px;
          margin-bottom: 50px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        .hero-section h1 { font-size: 2.5rem; margin-bottom: 20px; }
        .hero-section p { font-size: 1.2rem; }

        /* Culture Section */
        .culture-section { display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; margin-bottom: 50px; }
        .culture-card { flex: 1 1 280px; padding: 25px; border-radius: 12px; color: #fff; text-align: center; box-shadow: 0 6px 20px rgba(0,0,0,0.08); transition: transform 0.3s, box-shadow 0.3s; }
        .culture-card:hover { transform: translateY(-5px); box-shadow: 0 12px 30px rgba(0,0,0,0.15); }
        .culture-card h3 { margin-bottom: 15px; font-size: 1.4rem; }
        .culture-card p { font-size: 1rem; }

        /* Jobs Section */
        .jobs-section h2 { text-align: center; font-size: 2rem; margin-bottom: 30px; }
        .jobs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .job-card { background: #fff; padding: 25px; border-radius: 12px; box-shadow: 0 6px 20px rgba(0,0,0,0.08); transition: transform 0.3s, box-shadow 0.3s; }
        .job-card:hover { transform: translateY(-5px); box-shadow: 0 12px 30px rgba(0,0,0,0.15); }
        .job-card h3 { font-size: 1.4rem; margin-bottom: 10px; }
        .job-card p { margin-bottom: 10px; color: #555; }

        .btn { display: inline-block; padding: 10px 20px; background: #3498db; color: #fff; border-radius: 50px; text-decoration: none; font-weight: 600; transition: all 0.3s ease; }
        .btn:hover { background: #2980b9; transform: translateY(-2px); }

        /* Card Gradients */
        .card-gradient-1 { background: linear-gradient(135deg, #1abc9c, #16a085); }
        .card-gradient-2 { background: linear-gradient(135deg, #9b59b6, #8e44ad); }
        .card-gradient-3 { background: linear-gradient(135deg, #e67e22, #d35400); }

        /* CTA Section */
        .cta-section { text-align: center; margin: 50px 0; }
        .cta-section h3 { font-size: 1.8rem; margin-bottom: 15px; }
        .cta-section p { margin-bottom: 20px; color: #555; }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-section h1 { font-size: 2rem; }
          .hero-section p { font-size: 1rem; }
          .culture-card h3 { font-size: 1.2rem; }
          .culture-card p { font-size: 0.95rem; }
          .job-card h3 { font-size: 1.2rem; }
        }
        @media (max-width: 480px) {
          .hero-section h1 { font-size: 1.6rem; }
          .hero-section p { font-size: 0.9rem; }
          .culture-card { padding: 15px; }
          .job-card { padding: 15px; }
          .job-card h3 { font-size: 1.1rem; }
        }
      `}</style>
    </div>
  );
};

export default Careers;
