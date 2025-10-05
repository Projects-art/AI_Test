

import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Description = () => {
  return (
    <div className="description-page min-h-screen bg-gray-100">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-700">
            {/* 📢 State-Level Artificial Intelligence Test 2025-26 */}
            📢 Artificial Intelligence Talent Hunt Test 2025-26
          </h1>
          <p className="text-gray-700 text-center md:text-lg">
            Organized by <span className="font-semibold">Softwallet Innovative Technologies Pvt. Ltd. Registered under Ministry of Corporate Affairs. Govt of India.</span>
            <p>Registration and Examination are conducted online — accessible via mobile or computer.</p>
          </p>

          {/* Date */}
          <section className="section-card">
           
            <h2 className="text-xl font-semibold text-blue-600">🗓 Date of Examination</h2>
            <p className="text-gray-700 mt-2">28th December 2025/tantative.</p>
           
          </section>

          {/* Objective */}
          <section className="section-card">
            <h2 className="text-xl font-semibold text-blue-600">🎯 Objective</h2>
            <p className="text-gray-700 mt-2">
              The test is designed to assess participants’ understanding of Artificial Intelligence, 
              problem-solving ability, and application of concepts in real-world scenarios. 
              It also aims to identify and support 103 talented participants through a fair competition 
              that includes registration, prizes, recognition, and free advanced training.
            </p>
          </section>

          {/* Eligibility */}
          <section className="section-card">
            <h2 className="text-xl font-semibold text-blue-600">👥 Eligibility</h2>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Open to students from schools and colleges, as well as any interested participant.</li>
              <li>No prior experience in AI required.</li>
            </ul>
          </section>

          {/* Examination Pattern */}
          <section className="section-card">
            <h2 className="text-xl font-semibold text-blue-600">📝 Examination Pattern</h2>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li><b>Mode:</b> Online (accessible from home)</li>
              <li><b>Duration:</b> 60 minutes</li>
              <li><b>Questions:</b> 120 questions</li>
              <li><b>Format:</b> Multiple Choice Questions (MCQs)</li>
              <li><b>Syllabus Highlights:</b> Basics of AI, ML Fundamentals, AI Applications (see tutorials tab on website)</li>
            </ul>
          </section>

          {/* Registration */}
          <section className="section-card">
            <h2 className="text-xl font-semibold text-blue-600">📝 Registration</h2>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li><b>Registration Fee:</b> ₹300 per participant and the mode of payment is Online</li>
              <li><b>Purpose:</b> To ensure serious participation & cover basic costs.</li>
              <li><b>Benefit:</b> All participants receive a <b>Participation Certificate in AI</b>.</li>
            </ul>
          </section>

          {/* Prize Table */}
          <section className="section-card">
            <h4>💰 Total Prize Worth ₹20,000 + Free Training for All Winners + Certificates for Everyone!</h4>
            <h2 className="text-xl font-semibold text-blue-600">🏆 Prize Structure</h2>
            <div className="overflow-x-auto mt-3">
              <table className="w-full border border-gray-300 rounded-lg text-gray-700">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="border px-4 py-2">Rank/Position</th>
                    <th className="border px-4 py-2">Prize</th>
                    <th className="border px-4 py-2">Additional Benefits</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-4 py-2">1st Prize</td>
                    <td className="border px-4 py-2">₹6,050</td>
                    <td className="border px-4 py-2">Winner’s Certificate + Medal+ 1-Month Free Training</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">2nd Prize</td>
                    <td className="border px-4 py-2">₹2,750</td>
                    <td className="border px-4 py-2">Winner’s Certificate + Medal + 1-Month Free Training</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">3rd Prize</td>
                    <td className="border px-4 py-2">₹1,500</td>
                    <td className="border px-4 py-2">Winner’s Certificate + Medal + 1-Month Free Training</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">4th – 100th</td>
                    <td className="border px-4 py-2">₹100 Each</td>
                    <td className="border px-4 py-2">Winner’s Certificate + 1-Month Free Training</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">All Other Participants</td>
                    <td className="border px-4 py-2">-</td>
                    <td className="border px-4 py-2">E-certificates for all participants (they can show on LinkedIn/Resume). </td>
                    
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Selection Process */}
          <section className="section-card">
            <h2 className="text-xl font-semibold text-blue-600">⚖️ Selection Process</h2>
            <ol className="list-decimal list-inside text-gray-700 mt-2 space-y-1">
              <li>Phase 1 – Screening Test: Written/online test covering AI concepts.</li>
              <li>Phase 2 – Interviews & Practical Assessment: Shortlisted candidates demonstrate problem-solving in AI.</li>
              <li>Tie-Break Rule: Additional test/interview if more than 3 participants tie for top ranks.</li>
              <li>Final Selection: Only 100 participants receive prizes, certificates & training.</li>
            </ol>
          </section>

          {/* Training Program */}
          <section className="section-card">
            <h2 className="text-xl font-semibold text-blue-600">📚 One-Month Free Training Program</h2>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li><b>Domain Covered:</b> Artificial Intelligence</li>
              <li><b>Duration:</b> 1 Month (4 weeks, 2 hrs/day)</li>
              <li><b>Mode:</b> Online</li>
              <li><b>Trainers:</b> Industry experts & mentors</li>
              <li><b>Outcome:</b> Hands-on exposure, Certificate of Completion, Career-ready skills</li>
            </ul>
          </section>

          {/* Benefits */}
          <section className="section-card">
            <h2 className="text-xl font-semibold text-blue-600">🌟 Benefits</h2>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Nominal registration fee (₹300)</li>
              <li>Internship/Live Projects opportunities for toppers max 3</li>
              <li>Cash rewards + Free AI training for top 100</li>
              <li>Fair competition & transparency</li>
              <li>Winner & participation certificates</li>
              <li>Building skilled youth in AI & advanced tech</li>
              
            </ul>
          </section>

          {/* How to Apply */}
          <section className="section-card">
            <h2 className="text-xl font-semibold text-blue-600">📌 How to Apply</h2>
            <ol className="list-decimal list-inside text-gray-700 mt-2 space-y-1">
              <li>Register through our official website <span className="text-blue-600 font-semibold">[Your Website Link]</span>.</li>
              <li>Pay the registration fee online (details on the registration page).</li>
              <li>Receive your Admit Card & login details before the test.</li>
              <li>Important: Cash payments and sharing of login details with anyone are strictly prohibited</li>
            </ol>
          </section>

          {/* Contact */}
          <section className="section-card text-center">
            <h2 className="text-xl font-semibold text-blue-600">📞 Contact</h2>
            <p className="text-gray-700 mt-2">📧 Email: [Your Email ID]</p>
            <p className="text-gray-700">📱 Phone: [Your Contact Number]</p>
          </section>
        </div>
      </div>

      <Footer />

      <style>{`
        .section-card {
          background: #fdfdfd;
          padding: 20px;
          border-radius: 15px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);
        }

        @media (max-width: 768px) {
          .section-card {
            padding: 15px;
          }
          h1 { font-size: 2rem; }
          h2 { font-size: 1.25rem; }
        }

        @media (max-width: 480px) {
          h1 { font-size: 1.5rem; }
          h2 { font-size: 1.1rem; }
        }
      `}</style>
    </div>
  );
};

export default Description;

