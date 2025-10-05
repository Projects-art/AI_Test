// import React, { useState } from "react";
// import Navbar from '../components/Navbar.js';
// import Footer from  '../components/Footer.js';

// const Tutorial = () => {
//   const [openIndex, setOpenIndex] = useState(null);

//   const toggleSection = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   const sections = [
//     {
//       title: "1. What is AI",
//       content: `Artificial Intelligence (AI) is the branch of computer science that focuses on creating machines capable of simulating human intelligence. It involves developing systems that can perform tasks such as reasoning, problem-solving, learning from data, and making decisions. Unlike traditional software, which follows strict rules defined by humans, AI adapts and improves based on experience. The idea of AI is rooted in building systems that can mimic cognitive functions like understanding language, recognizing images, or playing strategic games. AI is not a single technology but a combination of algorithms, data, and computational power. In today’s world, AI powers everyday applications such as search engines, digital assistants, autonomous vehicles, fraud detection, and recommendation systems. Its strength lies in analyzing massive datasets far faster than humans. AI can be narrow (task-specific) or general (multi-task capable, like human intelligence). The future of AI also envisions artificial superintelligence, which may surpass human thinking. Ultimately, AI aims to make machines more useful, efficient, and intelligent in solving real-world problems.`,
//     },
//     {
//       title: "2. Types of AI",
//       content: `AI can be classified in different ways. The most common classification is based on capability and functionality. Based on capability, there are three types:
// 1) Narrow AI (Weak AI): Focused on a single task, like voice assistants (Alexa, Siri).
// 2) General AI (Strong AI): Hypothetical AI that can perform any intellectual task a human can.
// 3) Super AI: AI that surpasses human intelligence, still a concept under research.
// Based on functionality, AI is grouped as:
// 4) Reactive Machines: Basic AI systems that respond to inputs, e.g., IBM’s Deep Blue chess computer.
// 5) Limited Memory: AI that learns from past experiences, e.g., self-driving cars.
// 6) Theory of Mind: Future AI that understands emotions and social interactions.
// 7) Self-aware AI: Theoretical AI with consciousness and self-awareness.
// These types highlight how AI ranges from simple rule-based systems to futuristic models capable of reasoning like humans. Understanding AI types is crucial for grasping its limitations and potential.`,
//     },
//     {
//       title: "3. History of AI",
//       content: `The history of AI dates back to the mid-20th century. In 1950, Alan Turing proposed the Turing Test to measure machine intelligence. In 1956, John McCarthy coined the term “Artificial Intelligence” at the Dartmouth Conference, marking AI’s birth. The 1960s saw the development of symbolic AI and expert systems, but progress slowed due to limited computational power. The 1970s–1980s faced the “AI Winter,” where funding and interest declined due to unmet expectations. In the 1990s, AI rebounded with advances in machine learning and probabilistic models. A landmark moment came in 1997 when IBM’s Deep Blue defeated world chess champion Garry Kasparov. In the 2000s, growth in data and computing power enabled breakthroughs in natural language processing and computer vision. By 2011, IBM’s Watson won Jeopardy, and in 2016, Google’s AlphaGo defeated a Go world champion, showcasing AI’s strength in complex tasks. Today, AI is integrated into everyday life—powering autonomous cars, chatbots, recommendation systems, and medical research. Its history reflects cycles of hype, challenges, and groundbreaking achievements.`,
//     },
//     {
//       title: "4. Applications of AI",
//       content: `AI is transforming industries worldwide. In healthcare, AI assists in diagnosing diseases, predicting patient outcomes, and supporting robotic surgeries. In finance, it is used for fraud detection, algorithmic trading, and personalized banking. In education, AI powers adaptive learning platforms that customize lessons to individual students. Transportation benefits from AI in autonomous vehicles, traffic management, and logistics optimization. In entertainment, AI recommends music, movies, and content on platforms like Netflix and Spotify. Retail uses AI for inventory management, customer service chatbots, and demand forecasting. Agriculture applies AI for precision farming, crop monitoring, and smart irrigation. Cybersecurity relies on AI for threat detection and risk assessment. Additionally, government and defense deploy AI for surveillance, predictive policing, and decision-making systems. Everyday applications include virtual assistants (Siri, Alexa), search engines, and smart home devices. The diversity of AI applications demonstrates its ability to enhance efficiency, reduce costs, and solve problems across domains, making it one of the most transformative technologies of the 21st century.`,
//     },
//     {
//       title: "5. AI Terminology",
//       content: `Understanding AI requires familiarity with key terms:
// I.Algorithm: A set of rules or steps a computer follows to solve a problem.
// II.Machine Learning (ML): A subset of AI where systems learn patterns from data without explicit programming.
// III.Deep Learning: A branch of ML using neural networks with multiple layers to analyze complex data.
// IV.Neural Network: A model inspired by the human brain that processes information in interconnected nodes.
// V.Dataset: A collection of structured or unstructured data used to train AI systems.
// VI.Training: The process of teaching an AI model using data.
// VII.Inference: The stage where an AI model makes predictions on new data.
// VIII.Overfitting: When a model performs well on training data but poorly on new data.
// IX.Natural Language Processing (NLP): Enables machines to understand and process human language.
// X.Computer Vision: The AI field that enables machines to interpret visual data from the world.
// These terms form the foundation of AI literacy, helping learners navigate technical concepts with ease.`,
//     },
//     {
//       title: "6. AI Ethics",
//       content: `AI ethics is the study of moral principles and values that guide the development and use of artificial intelligence. Since AI impacts human lives directly, ethical concerns are essential. One key issue is bias—AI systems trained on biased data may produce unfair results, leading to discrimination in hiring, lending, or law enforcement. Another concern is accountability: when AI makes mistakes, who is responsible—the developer, user, or machine? Transparency is also critical; AI decisions should be explainable to ensure trust. Ethical debates also touch on privacy—AI systems often collect personal data, which may be misused if not properly protected. Additionally, there is the question of job displacement, as AI automation could replace human workers. In military use, autonomous weapons raise concerns about human control over life-and-death decisions. Ethical frameworks such as fairness, accountability, and transparency (FAT) guide responsible AI use. Global organizations emphasize “AI for good,” ensuring technology benefits society rather than causing harm. Without ethical guidelines, AI could widen inequality and undermine trust in technology.`,
//     },
//     {
//       title: "7. Data Privacy",
//       content: `Data privacy in AI refers to protecting users’ personal information when collected, stored, and analyzed by AI systems. Since AI relies heavily on large datasets, safeguarding sensitive data is vital. For example, AI applications in healthcare handle patient medical records, which must remain confidential. Similarly, financial AI tools analyze credit histories and transactions, demanding strict privacy controls. Data breaches can expose users to fraud or identity theft. Governments enforce regulations like GDPR (General Data Protection Regulation) in Europe and CCPA (California Consumer Privacy Act) to protect individuals’ rights. Privacy concerns also arise from surveillance technologies, such as facial recognition, which can monitor people without consent. Companies must use techniques like data anonymization, differential privacy, and encryption to secure data. Users should also have rights to control how their information is used. Striking a balance between innovation and privacy protection ensures public trust. Ultimately, data privacy is not just a legal requirement—it is a moral responsibility in building safe and reliable AI.`,
//     },
//     {
//       title: "8. AI Regulations",
//       content: `AI regulations are laws, rules, and frameworks established by governments and organizations to ensure safe and fair AI use. Since AI impacts industries, jobs, and rights, regulation is becoming critical. For example, the European Union’s AI Act is the world’s first major AI law, classifying AI systems by risk levels—from minimal risk (chatbots) to high risk (healthcare AI, biometric systems). The act mandates strict transparency and accountability. In the U.S., regulations are more fragmented, with different states introducing AI-related laws, especially around privacy and employment. China also enforces strong regulations, particularly in facial recognition and content moderation. Regulations address issues like data protection, safety standards, bias prevention, and accountability for AI errors. Without regulation, AI could cause harm through unfair decisions or misuse in surveillance. However, over-regulation may slow down innovation. The challenge is to create balanced frameworks that encourage innovation while protecting citizens. Future regulations may also govern AI in warfare, deepfakes, and superintelligent AI systems.`,
//     },
//     {
//       title: "9. AI in Society",
//       content: `AI has profound effects on society, both positive and negative. On the positive side, AI improves daily life by enabling personalized shopping, healthcare diagnostics, and virtual assistants. It also helps governments make smarter decisions by analyzing large-scale data, such as during pandemics for contact tracing. In education, AI tailors lessons to individual learners, reducing inequality in access. However, AI also poses societal risks. Job displacement is a major issue—automation may replace workers in manufacturing, transportation, and customer service. Another concern is digital inequality: wealthier nations and groups benefit more from AI, while underdeveloped regions may fall further behind. AI in surveillance can also reduce privacy and freedom. On a cultural level, AI-generated content (art, music, writing) raises questions about creativity and ownership. Societal trust in AI depends on transparency and ethical design. Ultimately, AI can create smarter, safer, and healthier societies—but only if guided responsibly and inclusively.`,
//     },
//     {
//       title: "10. Future of AI",
//       content: `The future of AI holds immense potential and challenges. In the short term, AI will continue improving automation, natural language processing, and robotics. Self-driving cars may become common, reducing accidents and traffic issues. In healthcare, AI could predict diseases before symptoms appear, revolutionizing preventive medicine. The future also includes general AI, which may match human-level intelligence across domains. Some experts warn about superintelligent AI that could surpass humans in decision-making, raising existential risks. On the positive side, AI could solve global problems like climate change, resource management, and education gaps. However, there are risks of misuse in surveillance, cyber warfare, and misinformation (deepfakes). The future also demands new jobs in AI ethics, regulation, and human-AI collaboration. Companies are exploring AI-human augmentation, where humans and AI work together to enhance capabilities. The ultimate vision is AI that supports humanity’s progress while being controlled safely and ethically.`,
//     },
//     {
//       title: "11. AI in Industry",
//       content: `AI is revolutionizing industries by improving efficiency, reducing costs, and enhancing decision-making. In manufacturing, AI powers predictive maintenance, quality control, and robotics. Healthcare industries use AI for drug discovery, diagnosis, and personalized treatment. Finance applies AI in fraud detection, algorithmic trading, and risk management. Retail benefits from customer behavior analysis, personalized recommendations, and inventory optimization. In agriculture, AI supports smart farming, crop monitoring, and weather predictions. Transportation and logistics industries use AI for route optimization, supply chain management, and autonomous vehicles. Entertainment and media use AI to recommend movies, create content, and detect fake news. In energy, AI helps optimize grids, predict demand, and support renewable energy use. Even construction benefits from AI-driven project management and safety monitoring. Across industries, AI not only automates repetitive tasks but also provides insights for strategic decision-making. Its industrial impact is so large that experts call AI the “fourth industrial revolution.”`,
//     },
//     {
//       title: "12. Problem Solving in AI",
//       content: `Problem solving is one of the core goals of Artificial Intelligence. It involves designing algorithms and techniques that allow machines to analyze situations, evaluate alternatives, and choose the best course of action. Traditional problem-solving in AI is modeled on how humans approach challenges. One common technique is the search method, where AI explores different possible solutions to reach a goal—for example, in pathfinding problems like GPS navigation. Heuristic search improves efficiency by using rules of thumb to guide the search toward better solutions, as seen in chess-playing AI. Another approach is constraint satisfaction, where AI solves puzzles or scheduling tasks by meeting predefined conditions. AI also uses logic-based reasoning, applying formal logic to infer conclusions. In modern AI, machine learning enhances problem-solving by allowing systems to learn strategies from data instead of relying only on preprogrammed rules. For example, reinforcement learning agents solve problems by trial and error, improving performance over time. Problem solving in AI is widely applied in robotics, medical diagnosis, optimization, planning, and natural language understanding. The effectiveness of AI problem solving depends on accurate models, efficient algorithms, and the ability to generalize across new situations.`,
//     },
//     {
//       title: "13.  Introduction to Machine Learning",
//       content: `Machine Learning (ML) is a subfield of AI that focuses on enabling computers to learn from data without being explicitly programmed. Unlike traditional software, where rules are manually coded, ML systems identify patterns and improve automatically with experience. The process begins with feeding the system data (examples) that contain input features and, in supervised cases, the correct output. The ML algorithm then builds a model that can make predictions or decisions. There are three main types of ML: supervised learning, where the model learns from labeled data; unsupervised learning, where it finds patterns in unlabeled data; and reinforcement learning, where it learns through feedback from interactions. Key ML tasks include classification (e.g., spam detection), regression (e.g., predicting house prices), clustering (e.g., customer segmentation), and recommendation (e.g., Netflix suggestions). ML relies heavily on training and testing data to evaluate performance. Modern ML is powered by advances in computing power, big data, and specialized algorithms like deep learning. Today, ML drives applications ranging from self-driving cars to medical diagnosis and voice recognition, making it one of the most practical aspects of AI.`,
//     },
//     {
//       title: "14. Supervised Learning",
//       content: `Supervised learning is a machine learning approach where models are trained using labeled data. Each training example consists of an input (features) and an output (label), allowing the algorithm to learn a mapping between the two. The goal is for the model to make accurate predictions when presented with new, unseen data. Common supervised learning tasks include classification, where outputs are categories (e.g., spam or not spam emails), and regression, where outputs are continuous values (e.g., predicting sales revenue). Algorithms like linear regression, decision trees, support vector machines, and neural networks are widely used in supervised learning. Training involves minimizing errors between predicted and actual outputs, often using techniques like gradient descent. The success of supervised learning depends on the quality and quantity of labeled data—more diverse data helps the model generalize better. It is applied in voice recognition, fraud detection, disease diagnosis, and recommendation systems. One major challenge is overfitting, where the model memorizes training data instead of generalizing. Despite challenges, supervised learning is the most commonly used form of ML due to its accuracy and practicality in solving real-world problems.`,
//     },
//     {
//       title: "15. Unsupervised Learning",
//       content: `Unsupervised learning deals with unlabeled data, meaning the system does not know the correct answers beforehand. Instead, the goal is to discover hidden patterns, structures, or groupings in the data. A common technique is clustering, where similar data points are grouped together—for example, customer segmentation in marketing. Another method is dimensionality reduction, which simplifies data by reducing the number of variables while preserving essential patterns, such as in image compression or visualization. Algorithms like k-means clustering, hierarchical clustering, and principal component analysis (PCA) are widely used. Unlike supervised learning, unsupervised methods do not require expensive labeled datasets, making them useful for exploratory data analysis. However, evaluation is more challenging since there are no predefined “correct” outputs. Applications of unsupervised learning include market basket analysis (discovering which products are often bought together), anomaly detection (detecting fraud or unusual patterns), and recommendation systems. In many real-world cases, unsupervised learning serves as a foundation for deeper analysis, helping businesses and researchers gain insights into complex, unstructured data.`,
//     },
//     {
//       title: "16. Reinforcement Learning",
//       content: `Reinforcement Learning (RL) is a type of machine learning where an agent learns to make decisions by interacting with an environment. Unlike supervised learning, which relies on labeled data, RL focuses on trial-and-error experiences. The agent takes an action in a given state, and the environment provides feedback in the form of rewards or penalties. Over time, the agent aims to maximize cumulative rewards by developing an optimal strategy, known as a policy. A core concept in RL is the exploration vs. exploitation dilemma: the agent must explore new actions to discover better strategies, while also exploiting known strategies that yield good results. RL techniques often use Markov Decision Processes (MDPs) to model environments and decision-making. Popular algorithms include Q-Learning, SARSA, and advanced methods like Deep Q-Networks (DQN), which combine deep learning with reinforcement learning. RL has achieved remarkable success in areas like robotics (teaching robots to walk), gaming (AlphaGo defeating world champions in Go), autonomous driving, and resource management. However, RL is computationally expensive and requires large amounts of training data. Despite challenges, RL represents a powerful approach for teaching machines to solve complex, sequential decision-making problems.`,
//     },
//     {
//       title: "17. Evaluation Metrics",
//       content: `Evaluation metrics in AI and machine learning are methods used to measure how well a model performs. Since different tasks require different criteria, choosing the right metric is crucial. In classification problems, common metrics include accuracy (percentage of correct predictions), precision (true positives out of predicted positives), recall (true positives out of actual positives), and the F1-score (balance between precision and recall). For regression tasks, metrics like Mean Squared Error (MSE), Mean Absolute Error (MAE), and R² (coefficient of determination) are used. Another important tool is the confusion matrix, which provides detailed insights into correct and incorrect classifications. In ranking and recommendation systems, metrics like ROC-AUC, Mean Average Precision (MAP), and Hit Ratio are relevant. For deep learning, especially in computer vision and NLP, metrics such as BLEU score (for language translation) or Intersection over Union (IoU) (for image segmentation) are used. Proper evaluation avoids overestimating model performance and helps in model selection. Importantly, a single metric may not capture all aspects, so combining metrics often provides a more balanced view. Ultimately, evaluation metrics ensure AI systems are not just accurate but also reliable, fair, and trustworthy.`,
//     },
//     {
//       title: "18. Overfitting and Underfitting",
//       content: `Overfitting and underfitting are two major challenges in machine learning. Overfitting occurs when a model learns training data too well, including noise and irrelevant details, which harms its ability to generalize to new data. This usually happens when models are too complex, such as deep neural networks trained on small datasets. Symptoms of overfitting include very high accuracy on training data but poor accuracy on testing data. Techniques like regularization (L1, L2), dropout, cross-validation, and using more training data help reduce overfitting. On the other hand, underfitting happens when a model is too simple to capture underlying patterns in the data. For example, using linear regression on a highly nonlinear dataset results in poor performance on both training and test sets. To address underfitting, one can increase model complexity, add more features, or train longer. The goal in machine learning is to find the right balance, achieving good generalization where the model performs well on both seen and unseen data. Understanding and managing overfitting and underfitting ensures that AI systems remain practical and reliable in real-world applications.`,
//     },
//     {
//       title: "19. Neural Networks",
//       content: `Neural networks are the backbone of modern AI, inspired by the structure of the human brain. A neural network consists of layers of nodes (neurons) connected by weighted edges. Each neuron processes inputs, applies a mathematical transformation (activation function), and passes the result to the next layer. The main types of layers are the input layer (receives data), hidden layers (process information), and output layer (produces predictions). Training a neural network involves adjusting weights using backpropagation and optimization algorithms like gradient descent. Neural networks can model complex, nonlinear relationships in data, making them suitable for tasks such as image recognition, speech processing, and language translation. Variants include Convolutional Neural Networks (CNNs) for computer vision, Recurrent Neural Networks (RNNs) for sequential data, and Transformers for NLP. While powerful, neural networks require large amounts of data and computational resources. They also face challenges like lack of interpretability, where decisions are difficult to explain. Despite these issues, neural networks have revolutionized AI, enabling breakthroughs in healthcare, autonomous vehicles, and generative models like ChatGPT. `,
//     },
//     {
//       title: "20. Deep Learning",
//       content: `Deep Learning is a specialized branch of machine learning that uses neural networks with many hidden layers to process and analyze complex data. The term “deep” refers to the depth of layers, which allows the network to learn hierarchical features. For example, in image recognition, lower layers may detect edges, middle layers recognize shapes, and higher layers identify objects like faces or animals. Deep learning is powered by algorithms such as Convolutional Neural Networks (CNNs), Recurrent Neural Networks (RNNs), and Transformers. One major advantage of deep learning is its ability to handle unstructured data such as text, audio, and images, which traditional algorithms struggle with. Training deep learning models requires large amounts of labeled data and powerful hardware, particularly GPUs and TPUs. Applications include self-driving cars, voice assistants, fraud detection, and medical imaging. Deep learning has achieved state-of-the-art results in tasks like machine translation, speech recognition, and computer vision. However, it faces challenges like lack of interpretability, data hunger, and high computational cost. Despite limitations, deep learning is considered the driving force behind modern AI, fueling advancements in both academia and industry.`,
//     },
//     {
//       title: "21. Computer Vision",
//       content: `Computer Vision (CV) is a field of AI that enables machines to interpret and understand visual information from the world. It mimics the human ability to see and analyze images or videos. The process involves several steps: capturing images, preprocessing them (like resizing or filtering), detecting key features, and making decisions based on analysis. Techniques like image classification, object detection, semantic segmentation, and face recognition are common in CV. Algorithms such as CNNs play a major role in extracting features from raw images. Real-world applications include autonomous vehicles (detecting pedestrians and traffic signs), medical imaging (identifying tumors from X-rays), security systems (facial recognition), and retail (product recognition in stores). Computer vision also powers technologies like augmented reality (AR) and virtual reality (VR). However, challenges exist, such as poor performance in low-light conditions, privacy concerns in surveillance, and bias in facial recognition datasets. As hardware and algorithms advance, computer vision is becoming more accurate and accessible, transforming industries and everyday life.`,
//     },
//     {
//       title: "22. Natural Language Processing (NLP)",
//       content: `Natural Language Processing (NLP) is an AI field that focuses on enabling machines to understand, interpret, and generate human language. It bridges the gap between computer communication (structured data) and human communication (unstructured text or speech). NLP tasks include sentiment analysis (detecting emotions in text), machine translation (Google Translate), speech recognition (Alexa, Siri), chatbots, and text summarization. Traditional NLP relied on rule-based approaches and statistical models, but modern NLP leverages deep learning techniques such as Recurrent Neural Networks (RNNs), Long Short-Term Memory (LSTM) networks, and Transformers (like GPT). A key challenge in NLP is dealing with the ambiguity and context of human language, such as words with multiple meanings. Pre-trained models like BERT, GPT, and T5 have revolutionized NLP by learning from massive text corpora and achieving state-of-the-art performance. Applications extend to business intelligence, healthcare (analyzing medical records), law (document review), and customer support automation. However, NLP also faces issues of bias in training data and misuse in generating misinformation. Despite challenges, NLP remains one of the most impactful areas of AI, shaping how humans interact with technology.`,
//     },
//     {
//       title: "23. Generative AI",
//       content: `Generative AI refers to systems that can create new content such as text, images, music, or videos, often indistinguishable from human-created material. Unlike traditional AI, which classifies or predicts, generative AI produces original outputs. It is powered by models like Generative Adversarial Networks (GANs), Variational Autoencoders (VAEs), and large-scale transformer-based models (like GPT for text or Stable Diffusion for images). For example, GANs use two networks—a generator that creates data and a discriminator that evaluates it—to refine results until they appear realistic. Generative AI has many applications: creating art, writing code, designing new drugs, generating realistic virtual environments, and producing synthetic training data. In business, it helps automate content creation, product design, and marketing campaigns. However, it also raises ethical issues, such as deepfakes, which can spread misinformation, and concerns about copyright violations. Despite risks, generative AI is seen as a revolutionary tool, enhancing creativity and productivity across industries. As the technology evolves, balancing innovation with regulation will be critical to harnessing generative AI responsibly.`,
//     },
   
//   ];

//   return (
     
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
//         <Navbar/>
//       <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-6">
//         <h1 className="text-3xl font-bold text-center mb-6">AI Tutorial</h1>
       
//         {sections.map((section, index) => (
//           <div key={index} className="mb-4 border-b pb-2">
//             <button
//               onClick={() => toggleSection(index)}
//               className="w-full flex justify-between items-center text-lg font-semibold focus:outline-none"
//             >
//               {section.title}
//               {/* <span>{openIndex === index ? "−" : ""}</span> */}
//             </button>
//             {openIndex === index && (
//               <p className="mt-2 text-gray-700 whitespace-pre-line">
//                 {section.content}
//               </p>
//             )}
//           </div>
//         ))}
//       </div>
//       <Footer/>
//     </div>
//   );
// };

// export default Tutorial;

//===================================================


import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const tutorials = [
  {
  title: "1. What is AI",
  description: "Artificial Intelligence (AI) is the branch of computer science that focuses on creating machines capable of simulating human intelligence. It involves developing systems that can perform tasks such as reasoning, problem-solving, learning from data, and making decisions. Unlike traditional software, which follows strict rules defined by humans, AI adapts and improves based on experience. The idea of AI is rooted in building systems that can mimic cognitive functions like understanding language, recognizing images, or playing strategic games. AI is not a single technology but a combination of algorithms, data, and computational power. In today’s world, AI powers everyday applications such as search engines, digital assistants, autonomous vehicles, fraud detection, and recommendation systems. Its strength lies in analyzing massive datasets far faster than humans. AI can be narrow (task-specific) or general (multi-task capable, like human intelligence). The future of AI also envisions artificial superintelligence, which may surpass human thinking. AI is also being integrated with robotics, IoT, and edge computing to create smarter environments and workplaces. Researchers continue to explore ethical AI, transparency, and responsible use to ensure its benefits are maximized. Ultimately, AI aims to make machines more useful, efficient, and intelligent in solving real-world problems.",
},

{
  title: "2. Types of AI",
  description: "AI can be classified in different ways. The most common classification is based on capability and functionality. Based on capability, there are three types: 1) Narrow AI (Weak AI): Focused on a single task, like voice assistants (Alexa, Siri). 2) General AI (Strong AI): Hypothetical AI that can perform any intellectual task a human can. 3) Super AI: AI that surpasses human intelligence, still a concept under research. Based on functionality, AI is grouped as: 4) Reactive Machines: Basic AI systems that respond to inputs, e.g., IBM’s Deep Blue chess computer. 5) Limited Memory: AI that learns from past experiences, e.g., self-driving cars. 6) Theory of Mind: Future AI that understands emotions and social interactions. 7) Self-aware AI: Theoretical AI with consciousness and self-awareness. Understanding AI types is crucial for grasping its limitations and potential. Modern applications show how narrow AI powers virtual assistants, healthcare diagnostics, finance, autonomous vehicles, and customer support systems. Researchers are exploring hybrid AI models that combine multiple types to achieve more versatile intelligence. AI in education adapts to learning styles, while AI in cybersecurity detects threats in real time. Emerging trends include AI-human collaboration, ethical AI design, and explainable AI that makes decisions transparent. Ethical considerations, such as bias, fairness, and privacy, are critical when designing and deploying AI systems to ensure trust and accountability.",
},



{
  title: "3. History of AI",
  description: "The history of AI dates back to the mid-20th century. In 1950, Alan Turing proposed the Turing Test to measure machine intelligence. In 1956, John McCarthy coined the term “Artificial Intelligence” at the Dartmouth Conference, marking AI’s birth. The 1960s saw the development of symbolic AI and expert systems, but progress slowed due to limited computational power. The 1970s–1980s faced the “AI Winter,” where funding and interest declined due to unmet expectations. In the 1990s, AI rebounded with advances in machine learning and probabilistic models. A landmark moment came in 1997 when IBM’s Deep Blue defeated world chess champion Garry Kasparov. In the 2000s, growth in data and computing power enabled breakthroughs in natural language processing and computer vision. By 2011, IBM’s Watson won Jeopardy, and in 2016, Google’s AlphaGo defeated a Go world champion, showcasing AI’s strength in complex tasks. Today, AI is integrated into everyday life—powering autonomous cars, chatbots, recommendation systems, and medical research. Modern AI also drives robotics, virtual assistants, autonomous drones, and predictive analytics. Current research focuses on ethical AI, explainability, and human-AI collaboration, ensuring AI evolves responsibly and safely. AI history reflects cycles of hype, challenges, and groundbreaking achievements that continue to shape the future.",
},

  {
    title: "4. Applications of AI",
    description:
      "AI is transforming industries worldwide. In healthcare, AI assists in diagnosing diseases, predicting patient outcomes, and supporting robotic surgeries. In finance, it is used for fraud detection, algorithmic trading, and personalized banking. In education, AI powers adaptive learning platforms that customize lessons to individual students. Transportation benefits from AI in autonomous vehicles, traffic management, and logistics optimization. In entertainment, AI recommends music, movies, and content on platforms like Netflix and Spotify. Retail uses AI for inventory management, customer service chatbots, and demand forecasting. Agriculture applies AI for precision farming, crop monitoring, and smart irrigation. Cybersecurity relies on AI for threat detection and risk assessment. Additionally, government and defense deploy AI for surveillance, predictive policing, and decision-making systems. Everyday applications include virtual assistants (Siri, Alexa), search engines, and smart home devices. The diversity of AI applications demonstrates its ability to enhance efficiency, reduce costs, and solve problems across domains, making it one of the most transformative technologies of the 21st century.",
  },
  {
    title: "5. AI Terminology",
   description: 
  "Understanding AI requires familiarity with key terms:\n I. Algorithm: A set of rules or steps a computer follows to solve a problem.\nII. Machine Learning (ML): A subset of AI where systems learn patterns from data without explicit programming.\nIII. Deep Learning: A branch of ML using neural networks with multiple layers to analyze complex data.\nIV. Neural Network: A model inspired by the human brain that processes information in interconnected nodes.\nV. Dataset: A collection of structured or unstructured data used to train AI systems.\nVI. Training: The process of teaching an AI model using data.\nVII. Inference: The stage where an AI model makes predictions on new data.\nVIII. Overfitting: When a model performs well on training data but poorly on new data.\nIX. Natural Language Processing (NLP): Enables machines to understand and process human language.\nX. Computer Vision: The AI field that enables machines to interpret visual data from the world.\nThese terms form the foundation of AI literacy, helping learners navigate technical concepts with ease and apply AI effectively in real-world scenarios, research, and industry applications.",

  },
  {
    title: "6. AI Ethics",
    description:
      "AI ethics is the study of moral principles and values that guide the development and use of artificial intelligence. Since AI impacts human lives directly, ethical concerns are essential. One key issue is bias—AI systems trained on biased data may produce unfair results, leading to discrimination in hiring, lending, or law enforcement. Another concern is accountability: when AI makes mistakes, who is responsible—the developer, user, or machine? Transparency is also critical; AI decisions should be explainable to ensure trust. Ethical debates also touch on privacy—AI systems often collect personal data, which may be misused if not properly protected. Additionally, there is the question of job displacement, as AI automation could replace human workers. In military use, autonomous weapons raise concerns about human control over life-and-death decisions. Ethical frameworks such as fairness, accountability, and transparency (FAT) guide responsible AI use. Global organizations emphasize “AI for good,” ensuring technology benefits society rather than causing harm. Without ethical guidelines, AI could widen inequality and undermine trust in technology.",
  },
  {
    title: "7. Data Privacy",
    description: "Data privacy in AI refers to protecting users’ personal information when collected, stored, and analyzed by AI systems. Since AI relies heavily on large datasets, safeguarding sensitive data is vital. For example, AI applications in healthcare handle patient medical records, which must remain confidential. Similarly, financial AI tools analyze credit histories and transactions, demanding strict privacy controls. Data breaches can expose users to fraud or identity theft. Governments enforce regulations like GDPR (General Data Protection Regulation) in Europe and CCPA (California Consumer Privacy Act) to protect individuals’ rights. Privacy concerns also arise from surveillance technologies, such as facial recognition, which can monitor people without consent. Companies must use techniques like data anonymization, differential privacy, and encryption to secure data. Users should also have rights to control how their information is used. Striking a balance between innovation and privacy protection ensures public trust. Ultimately, data privacy is not just a legal requirement—it is a moral responsibility in building safe and reliable AI.",
  },
  {
    title: "8. AI Regulations",
    description:
      "AI regulations are laws, rules, and frameworks established by governments and organizations to ensure safe and fair AI use. Since AI impacts industries, jobs, and rights, regulation is becoming critical. For example, the European Union’s AI Act is the world’s first major AI law, classifying AI systems by risk levels—from minimal risk (chatbots) to high risk (healthcare AI, biometric systems). The act mandates strict transparency and accountability. In the U.S., regulations are more fragmented, with different states introducing AI-related laws, especially around privacy and employment. China also enforces strong regulations, particularly in facial recognition and content moderation. Regulations address issues like data protection, safety standards, bias prevention, and accountability for AI errors. Without regulation, AI could cause harm through unfair decisions or misuse in surveillance. However, over-regulation may slow down innovation. The challenge is to create balanced frameworks that encourage innovation while protecting citizens. Future regulations may also govern AI in warfare, deepfakes, and superintelligent AI systems.",
  },
  {
    title: "9. AI in Society",
    description:
      "AI has profound effects on society, both positive and negative. On the positive side, AI improves daily life by enabling personalized shopping, healthcare diagnostics, and virtual assistants. It also helps governments make smarter decisions by analyzing large-scale data, such as during pandemics for contact tracing. In education, AI tailors lessons to individual learners, reducing inequality in access. However, AI also poses societal risks. Job displacement is a major issue—automation may replace workers in manufacturing, transportation, and customer service. Another concern is digital inequality: wealthier nations and groups benefit more from AI, while underdeveloped regions may fall further behind. AI in surveillance can also reduce privacy and freedom. On a cultural level, AI-generated content (art, music, writing) raises questions about creativity and ownership. Societal trust in AI depends on transparency and ethical design. Ultimately, AI can create smarter, safer, and healthier societies—but only if guided responsibly and inclusively.",
  },
 {
  title: "10. Future of AI",
  description: "The future of AI holds immense potential and challenges. AI will continue improving automation, natural language processing, and robotics, impacting everyday life. Self-driving cars may reduce accidents and traffic issues, while healthcare AI could predict diseases before symptoms appear, revolutionizing preventive medicine. The development of general AI may eventually match human-level intelligence across multiple domains, though superintelligent AI could pose ethical and existential risks. On the positive side, AI can help address global problems like climate change, resource management, and education gaps. New opportunities will arise in AI ethics, regulation, and human-AI collaboration. AI-powered tools may also enhance creativity, scientific research, and personalized learning. AI-driven simulations and virtual assistants are expected to become more human-like and context-aware. AI may enable advanced scientific discoveries, automate routine tasks, and improve accessibility for people with disabilities. Future AI systems are also likely to integrate with augmented reality and IoT devices, creating smarter cities and workplaces. Continuous advancements in AI explainability, fairness, and security will be essential for responsible deployment. The ultimate goal is AI that supports humanity’s progress safely and ethically, improving quality of life across the globe.",
},

{
  title: "11. AI in Industry",
  description: "AI is transforming industries by increasing efficiency, reducing costs, and enhancing decision-making. In manufacturing, it drives predictive maintenance, quality control, and robotics. Healthcare uses AI for drug discovery, diagnosis, and personalized treatment. Finance leverages AI for fraud detection, algorithmic trading, and risk management. Retail benefits from customer behavior analysis, personalized recommendations, and inventory optimization. Agriculture uses AI for smart farming, crop monitoring, and weather predictions. Transportation and logistics apply AI to route optimization, supply chain management, and autonomous vehicles. Energy and utilities adopt AI for smart grids, demand forecasting, and renewable energy management. Entertainment and media industries rely on AI for content recommendations, creation, and moderation. AI adoption also fosters innovation and creates new career opportunities across sectors. Businesses increasingly integrate AI with IoT, cloud computing, and big data analytics to gain a competitive edge. Emerging trends include AI-driven digital twins, robotics process automation, and real-time decision-making. Companies must also address challenges such as data privacy, algorithmic bias, and cybersecurity threats. Across industries, AI not only automates tasks but also provides strategic insights. Its impact is so profound that it is often called the “fourth industrial revolution.”",
},


{
  title: "12. Problem Solving in AI",
  description: "Problem solving is one of the core goals of Artificial Intelligence. It involves designing algorithms and techniques that allow machines to analyze situations, evaluate alternatives, and choose the best course of action. Traditional problem-solving in AI is modeled on how humans approach challenges. One common technique is the search method, where AI explores different possible solutions to reach a goal—for example, in pathfinding problems like GPS navigation. Heuristic search improves efficiency by using rules of thumb to guide the search toward better solutions, as seen in chess-playing AI. Another approach is constraint satisfaction, where AI solves puzzles or scheduling tasks by meeting predefined conditions. AI also uses logic-based reasoning, applying formal logic to infer conclusions. In modern AI, machine learning enhances problem-solving by allowing systems to learn strategies from data instead of relying only on preprogrammed rules. For example, reinforcement learning agents solve problems by trial and error, improving performance over time. Problem solving in AI is widely applied in robotics, medical diagnosis, optimization, planning, and natural language understanding. The effectiveness of AI problem solving depends on accurate models, efficient algorithms, and the ability to generalize across new situations.",
},

  {
  title: "13.  Introduction to Machine Learning",
  description: `Machine Learning (ML) is a subfield of AI that focuses on enabling computers to learn from data without being explicitly programmed. Unlike traditional software, where rules are manually coded, ML systems identify patterns and improve automatically with experience. The process begins with feeding the system data (examples) that contain input features and, in supervised cases, the correct output. The ML algorithm then builds a model that can make predictions or decisions. There are three main types of ML: supervised learning, where the model learns from labeled data; unsupervised learning, where it finds patterns in unlabeled data; and reinforcement learning, where it learns through feedback from interactions. Key ML tasks include classification (e.g., spam detection), regression (e.g., predicting house prices), clustering (e.g., customer segmentation), and recommendation (e.g., Netflix suggestions). ML relies heavily on training and testing data to evaluate performance. Modern ML is powered by advances in computing power, big data, and specialized algorithms like deep learning. Today, ML drives applications ranging from self-driving cars to medical diagnosis and voice recognition, making it one of the most practical aspects of AI.`,
},
{
  title: "14. Supervised Learning",
  description: `Supervised learning is a machine learning approach where models are trained using labeled data. Each training example consists of an input (features) and an output (label), allowing the algorithm to learn a mapping between the two. The goal is for the model to make accurate predictions when presented with new, unseen data. Common supervised learning tasks include classification, where outputs are categories (e.g., spam or not spam emails), and regression, where outputs are continuous values (e.g., predicting sales revenue). Algorithms like linear regression, decision trees, support vector machines, and neural networks are widely used in supervised learning. Training involves minimizing errors between predicted and actual outputs, often using techniques like gradient descent. The success of supervised learning depends on the quality and quantity of labeled data—more diverse data helps the model generalize better. It is applied in voice recognition, fraud detection, disease diagnosis, and recommendation systems. One major challenge is overfitting, where the model memorizes training data instead of generalizing. Despite challenges, supervised learning is the most commonly used form of ML due to its accuracy and practicality in solving real-world problems.`,
},
{
  title: "15. Unsupervised Learning",
  description: `Unsupervised learning deals with unlabeled data, meaning the system does not know the correct answers beforehand. Instead, the goal is to discover hidden patterns, structures, or groupings in the data. A common technique is clustering, where similar data points are grouped together—for example, customer segmentation in marketing. Another method is dimensionality reduction, which simplifies data by reducing the number of variables while preserving essential patterns, such as in image compression or visualization. Algorithms like k-means clustering, hierarchical clustering, and principal component analysis (PCA) are widely used. Unlike supervised learning, unsupervised methods do not require expensive labeled datasets, making them useful for exploratory data analysis. However, evaluation is more challenging since there are no predefined “correct” outputs. Applications of unsupervised learning include market basket analysis (discovering which products are often bought together), anomaly detection (detecting fraud or unusual patterns), and recommendation systems. In many real-world cases, unsupervised learning serves as a foundation for deeper analysis, helping businesses and researchers gain insights into complex, unstructured data.`,
},
{
  title: "16. Reinforcement Learning",
  description: `Reinforcement Learning (RL) is a type of machine learning where an agent learns to make decisions by interacting with an environment. Unlike supervised learning, which relies on labeled data, RL focuses on trial-and-error experiences. The agent takes an action in a given state, and the environment provides feedback in the form of rewards or penalties. Over time, the agent aims to maximize cumulative rewards by developing an optimal strategy, known as a policy. A core concept in RL is the exploration vs. exploitation dilemma: the agent must explore new actions to discover better strategies, while also exploiting known strategies that yield good results. RL techniques often use Markov Decision Processes (MDPs) to model environments and decision-making. Popular algorithms include Q-Learning, SARSA, and advanced methods like Deep Q-Networks (DQN), which combine deep learning with reinforcement learning. RL has achieved remarkable success in areas like robotics (teaching robots to walk), gaming (AlphaGo defeating world champions in Go), autonomous driving, and resource management. However, RL is computationally expensive and requires large amounts of training data. Despite challenges, RL represents a powerful approach for teaching machines to solve complex, sequential decision-making problems.`,
},
{
  title: "17. Evaluation Metrics",
  description: `Evaluation metrics in AI and machine learning are methods used to measure how well a model performs. Since different tasks require different criteria, choosing the right metric is crucial. In classification problems, common metrics include accuracy (percentage of correct predictions), precision (true positives out of predicted positives), recall (true positives out of actual positives), and the F1-score (balance between precision and recall). For regression tasks, metrics like Mean Squared Error (MSE), Mean Absolute Error (MAE), and R² (coefficient of determination) are used. Another important tool is the confusion matrix, which provides detailed insights into correct and incorrect classifications. In ranking and recommendation systems, metrics like ROC-AUC, Mean Average Precision (MAP), and Hit Ratio are relevant. For deep learning, especially in computer vision and NLP, metrics such as BLEU score (for language translation) or Intersection over Union (IoU) (for image segmentation) are used. Proper evaluation avoids overestimating model performance and helps in model selection. Importantly, a single metric may not capture all aspects, so combining metrics often provides a more balanced view. Ultimately, evaluation metrics ensure AI systems are not just accurate but also reliable, fair, and trustworthy.`,
},
{
  title: "18. Overfitting and Underfitting",
  description: `Overfitting and underfitting are two major challenges in machine learning. Overfitting occurs when a model learns training data too well, including noise and irrelevant details, which harms its ability to generalize to new data. This usually happens when models are too complex, such as deep neural networks trained on small datasets. Symptoms of overfitting include very high accuracy on training data but poor accuracy on testing data. Techniques like regularization (L1, L2), dropout, cross-validation, and using more training data help reduce overfitting. On the other hand, underfitting happens when a model is too simple to capture underlying patterns in the data. For example, using linear regression on a highly nonlinear dataset results in poor performance on both training and test sets. To address underfitting, one can increase model complexity, add more features, or train longer. The goal in machine learning is to find the right balance, achieving good generalization where the model performs well on both seen and unseen data. Understanding and managing overfitting and underfitting ensures that AI systems remain practical and reliable in real-world applications.`,
},
{
  title: "19. Neural Networks",
  description: `Neural networks are the backbone of modern AI, inspired by the structure of the human brain. A neural network consists of layers of nodes (neurons) connected by weighted edges. Each neuron processes inputs, applies a mathematical transformation (activation function), and passes the result to the next layer. The main types of layers are the input layer (receives data), hidden layers (process information), and output layer (produces predictions). Training a neural network involves adjusting weights using backpropagation and optimization algorithms like gradient descent. Neural networks can model complex, nonlinear relationships in data, making them suitable for tasks such as image recognition, speech processing, and language translation. Variants include Convolutional Neural Networks (CNNs) for computer vision, Recurrent Neural Networks (RNNs) for sequential data, and Transformers for NLP. While powerful, neural networks require large amounts of data and computational resources. They also face challenges like lack of interpretability, where decisions are difficult to explain. Despite these issues, neural networks have revolutionized AI, enabling breakthroughs in healthcare, autonomous vehicles, and generative models like ChatGPT.`,
},
{
  title: "20. Deep Learning",
  description: `Deep Learning is a specialized branch of machine learning that uses neural networks with many hidden layers to process and analyze complex data. The term “deep” refers to the depth of layers, which allows the network to learn hierarchical features. For example, in image recognition, lower layers may detect edges, middle layers recognize shapes, and higher layers identify objects like faces or animals. Deep learning is powered by algorithms such as Convolutional Neural Networks (CNNs), Recurrent Neural Networks (RNNs), and Transformers. One major advantage of deep learning is its ability to handle unstructured data such as text, audio, and images, which traditional algorithms struggle with. Training deep learning models requires large amounts of labeled data and powerful hardware, particularly GPUs and TPUs. Applications include self-driving cars, voice assistants, fraud detection, and medical imaging. Deep learning has achieved state-of-the-art results in tasks like machine translation, speech recognition, and computer vision. However, it faces challenges like lack of interpretability, data hunger, and high computational cost. Despite limitations, deep learning is considered the driving force behind modern AI, fueling advancements in both academia and industry.`,
},
{
  title: "21. Computer Vision",
  description: `Computer Vision (CV) is a field of AI that enables machines to interpret and understand visual information from the world. It mimics the human ability to see and analyze images or videos. The process involves several steps: capturing images, preprocessing them (like resizing or filtering), detecting key features, and making decisions based on analysis. Techniques like image classification, object detection, semantic segmentation, and face recognition are common in CV. Algorithms such as CNNs play a major role in extracting features from raw images. Real-world applications include autonomous vehicles (detecting pedestrians and traffic signs), medical imaging (identifying tumors from X-rays), security systems (facial recognition), and retail (product recognition in stores). Computer vision also powers technologies like augmented reality (AR) and virtual reality (VR). However, challenges exist, such as poor performance in low-light conditions, privacy concerns in surveillance, and bias in facial recognition datasets. As hardware and algorithms advance, computer vision is becoming more accurate and accessible, transforming industries and everyday life.`,
},
{
  title: "22. Natural Language Processing (NLP)",
  description: `Natural Language Processing (NLP) is part of our everyday lives, often without us noticing. When you ask Siri to play a song, type a message, or search Google in plain English, NLP is at work. It handles tasks like spelling correction, autocomplete, spam filtering, and detecting offensive content. E-commerce platforms use NLP to recommend products, while social media monitors conversations for harmful content. NLP turns unstructured text into actionable insights for software. Challenges remain, like ensuring privacy, handling dialects, and cultural context. Despite this, interacting with technology may soon feel as natural as talking to another person. Virtual assistants and search engines are becoming smarter, analyzing context and sentiment to improve user experience.`,
},

{
  title: "23. Natural Language Processing (NLP)",
  description: `NLP is more than chatbots and translations—it is a key tool for research and innovation. In healthcare, it helps doctors analyze patient records to detect diseases early. In education, it powers tutoring systems that adapt to a student’s learning style. Scientists use NLP to process thousands of research papers, identifying patterns and breakthroughs. Governments analyze public opinion and monitor threats, while companies review legal documents efficiently. Advanced models like Transformers understand context across languages. Ethical issues like bias, misinformation, and data misuse are concerns, but NLP continues to expand, helping solve global challenges and accelerate scientific discovery. NLP is also enhancing customer service, journalism, and real-time translation applications.`,
},

{
  title: "24. Natural Language Processing (NLP)",
  description: `NLP is at the heart of modern AI applications that understand and generate human language. It enables chatbots, voice assistants, and translation tools to interact naturally with users. Businesses use NLP for sentiment analysis, recommendation systems, and automating routine tasks. Researchers apply NLP to process massive datasets, extracting insights quickly. Emerging applications include detecting fake news, summarizing content, and improving accessibility. Despite its advances, NLP faces challenges like handling ambiguity, cultural context, and ethical considerations. As models become more sophisticated, NLP will continue bridging the gap between humans and machines, making interactions seamless and intuitive.`,
},

];

const Tutorial = () => {
  return (
    <div className="tutorial-page">
      <Navbar />

      <div className="container">
        {/* Hero Section */}
        <section className="hero-section">
          <h1>Master the Future: Tutorials on Artificial Intelligence</h1>
          <p>
            Step into AI: Learn deeply, study smartly, achieve more
          </p>
        </section>

        {/* Tutorials Section */}
        <section className="tutorials-section">
          <div className="tutorials-grid">
            {tutorials.map((item, index) => (
              <div key={index} className="tutorial-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />

      {/* Inline CSS */}
      <style>{`
        .tutorial-page {
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
        .tutorials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }
        .tutorial-card {
          background: #fff;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .tutorial-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.15);
        }
        .tutorial-card h3 { font-size: 1.4rem; margin-bottom: 10px; }
        .tutorial-card p { margin-bottom: 0; color: #555; }
        @media (max-width: 768px) {
          .hero-section h1 { font-size: 2rem; }
          .hero-section p { font-size: 1rem; }
        }
        @media (max-width: 480px) {
          .hero-section h1 { font-size: 1.6rem; }
          .hero-section p { font-size: 0.9rem; }
        }
      `}</style>
    </div>
  );
};

export default Tutorial;


