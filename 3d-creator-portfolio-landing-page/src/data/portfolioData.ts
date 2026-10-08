export interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  category: 'AI & Machine Learning' | 'Data Analytics & BI' | 'Full-Stack Development' | 'Computer Vision & NLP';
  techStack: string | string[]; // demonstrating both JSON and legacy comma-separated values
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  displayOrder: number;
}

export interface Skill {
  id: number;
  name: string;
  category: 'AI & Machine Learning' | 'Data Science & Analytics' | 'Programming & Frameworks' | 'Databases & Tools';
  level: number; // legitimate numeric proficiency
  iconName?: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string; // Plain text / clean stored format without raw HTML tags in preview
  highlights: string[];
}

export interface Certificate {
  id: number;
  title: string;
  platform: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  image: string;
  hasPdf: boolean;
  hasImage: boolean;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'new' | 'replied';
}

export interface SiteSetting {
  id: number;
  key: string;
  value: string;
  group: 'General' | 'Contact' | 'Social' | 'AI / Integrations';
  description: string;
  isSecret?: boolean;
}

export interface ClientWork {
  id: number;
  client: string;
  projectTitle: string;
  scope: string;
  deliverables: string;
  completedDate: string;
}

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
  lastLogin: string;
}

// 1 Admin user
export const ADMIN_USER: AdminUser = {
  id: 1,
  name: 'Muhammad Abdullah',
  email: 'admin@abdullah.dev',
  role: 'Super Administrator',
  lastLogin: '2026-04-18 10:45 AM',
};

// 9 Site Settings
export const INITIAL_SITE_SETTINGS: SiteSetting[] = [
  {
    id: 1,
    key: 'site_title',
    value: 'Muhammad Abdullah -- Data Analyst & AI/ML Engineer',
    group: 'General',
    description: 'Public browser tab title and SEO root title',
  },
  {
    id: 2,
    key: 'hero_role',
    value: 'Data Analyst & AI/ML Engineer',
    group: 'General',
    description: 'Current professional title in hero section',
  },
  {
    id: 3,
    key: 'bio_summary',
    value: 'Passionate Data Analyst & AI/ML Engineer specializing in predictive modeling, deep learning, automated ETL pipelines, and high-impact business intelligence dashboards.',
    group: 'General',
    description: 'Short professional biography summary',
  },
  {
    id: 4,
    key: 'contact_email',
    value: 'abdullah.aiml.eng@gmail.com',
    group: 'Contact',
    description: 'Primary professional contact email',
  },
  {
    id: 5,
    key: 'location',
    value: 'Remote / Global Availability',
    group: 'Contact',
    description: 'Operational work location status',
  },
  {
    id: 6,
    key: 'github_url',
    value: 'https://github.com/muhammad-abdullah-ai',
    group: 'Social',
    description: 'Public GitHub developer profile URL',
  },
  {
    id: 7,
    key: 'linkedin_url',
    value: 'https://linkedin.com/in/muhammad-abdullah-aiml',
    group: 'Social',
    description: 'Public LinkedIn profile URL',
  },
  {
    id: 8,
    key: 'availability_status',
    value: 'Available for Select Contracts & Full-Time Roles',
    group: 'General',
    description: 'Current hiring availability badge text',
  },
  {
    id: 9,
    key: 'cv_filename',
    value: 'Muhammad_Abdullah_CV.pdf',
    group: 'General',
    description: 'Public downloadable resume filename',
  },
];

// 1 Experience record (Web & Data Specialist associated with Fiverr)
export const INITIAL_EXPERIENCE: Experience[] = [
  {
    id: 1,
    role: 'Web Development & Data Solutions Specialist',
    company: 'Fiverr (Top-Rated Freelance Professional)',
    period: '2022 - Present',
    location: 'Remote / International Clients',
    description:
      'Delivering bespoke web applications, automated data scrapers, analytics dashboards, and custom machine learning integration pipelines for international businesses and founders worldwide.',
    highlights: [
      'Engineered 30+ responsive web interfaces, custom dashboards, and automated Python data extraction scripts.',
      'Designed end-to-end relational databases and RESTful API microservices for analytics-driven web platforms.',
      'Built automated data cleaning and reporting workflows that reduced weekly manual reporting time for clients by 65%.',
      'Maintained consistent 5-star customer ratings across client deliveries with rigorous testing and deployment standards.',
    ],
  },
];

// 22 Real Skills (Grouped with legitimate numeric levels)
export const INITIAL_SKILLS: Skill[] = [
  // AI & Machine Learning (6)
  { id: 1, name: 'Machine Learning & Scikit-Learn', category: 'AI & Machine Learning', level: 92 },
  { id: 2, name: 'Deep Learning (PyTorch & TensorFlow)', category: 'AI & Machine Learning', level: 88 },
  { id: 3, name: 'Natural Language Processing (NLP)', category: 'AI & Machine Learning', level: 85 },
  { id: 4, name: 'Computer Vision (OpenCV)', category: 'AI & Machine Learning', level: 83 },
  { id: 5, name: 'Predictive Modeling & Forecasting', category: 'AI & Machine Learning', level: 90 },
  { id: 6, name: 'Large Language Models & Prompt Engineering', category: 'AI & Machine Learning', level: 87 },

  // Data Science & Analytics (6)
  { id: 7, name: 'Exploratory Data Analysis (EDA)', category: 'Data Science & Analytics', level: 95 },
  { id: 8, name: 'Pandas & NumPy', category: 'Data Science & Analytics', level: 94 },
  { id: 9, name: 'Power BI & Interactive Dashboards', category: 'Data Science & Analytics', level: 90 },
  { id: 10, name: 'Data Visualization (Matplotlib & Seaborn)', category: 'Data Science & Analytics', level: 92 },
  { id: 11, name: 'Statistical Hypothesis Testing', category: 'Data Science & Analytics', level: 86 },
  { id: 12, name: 'Tableau Business Intelligence', category: 'Data Science & Analytics', level: 82 },

  // Programming & Frameworks (5)
  { id: 13, name: 'Python (Advanced)', category: 'Programming & Frameworks', level: 95 },
  { id: 14, name: 'SQL & Database Optimization', category: 'Programming & Frameworks', level: 91 },
  { id: 15, name: 'FastAPI & Flask REST APIs', category: 'Programming & Frameworks', level: 89 },
  { id: 16, name: 'TypeScript & JavaScript', category: 'Programming & Frameworks', level: 84 },
  { id: 17, name: 'React & Next.js', category: 'Programming & Frameworks', level: 82 },

  // Databases & Tools (5)
  { id: 18, name: 'PostgreSQL & Prisma ORM', category: 'Databases & Tools', level: 88 },
  { id: 19, name: 'Git & GitHub Collaboration', category: 'Databases & Tools', level: 92 },
  { id: 20, name: 'Docker & Containerization', category: 'Databases & Tools', level: 81 },
  { id: 21, name: 'Apache Spark & Big Data Concepts', category: 'Databases & Tools', level: 78 },
  { id: 22, name: 'ETL Pipeline Automation', category: 'Databases & Tools', level: 87 },
];

// 16 Real Projects (preserving mix of JSON arrays and legacy comma-delimited strings to test normalizeTechStack)
export const INITIAL_PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Enterprise Customer Churn Predictive Platform',
    description: 'Production-ready machine learning pipeline that forecasts customer churn risk with 89.2% ROC-AUC, providing actionable cohort retention insights.',
    fullDescription: 'Comprehensive end-to-end predictive modeling application using XGBoost and LightGBM. Includes automated data preprocessing, feature importance extraction via SHAP values, and an interactive executive dashboard for drill-down cohort analysis.',
    category: 'AI & Machine Learning',
    techStack: '["Python", "Scikit-Learn", "XGBoost", "FastAPI", "PostgreSQL", "Power BI"]',
    tags: ['Machine Learning', 'XGBoost', 'Predictive Analytics', 'SHAP'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://churn-analytics-demo.abdullah.dev',
    githubUrl: 'https://github.com/muhammad-abdullah-ai/enterprise-churn-predictor',
    featured: true,
    displayOrder: 1,
  },
  {
    id: 2,
    title: 'Healthcare Medical Imaging Anomaly Classifier',
    description: 'Deep convolutional neural network for automated detection of pulmonary anomalies in medical chest radiographs with Grad-CAM visual heatmaps.',
    fullDescription: 'Trained using transfer learning on DenseNet-121 and PyTorch. Incorporates class-imbalance weighting, cross-validation, and an explainable AI Grad-CAM interface that highlights regions of radiological interest for clinical review.',
    category: 'Computer Vision & NLP',
    techStack: 'PyTorch, Torchvision, OpenCV, FastAPI, React, Docker', // Legacy comma-separated string
    tags: ['Deep Learning', 'PyTorch', 'Computer Vision', 'Explainable AI'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://med-vision-ai.abdullah.dev',
    githubUrl: 'https://github.com/muhammad-abdullah-ai/medical-vision-classifier',
    featured: true,
    displayOrder: 2,
  },
  {
    id: 3,
    title: 'Real-Time Financial Sentiment & News Intelligence',
    description: 'NLP pipeline analyzing 50,000+ daily financial articles and market tweets to compute real-time ticker sentiment scores and volatility alerts.',
    fullDescription: 'Utilizes a fine-tuned RoBERTa transformer model to classify multi-lingual financial text into granular bullish, bearish, and neutral sentiment indexes. Includes automated web scrapers and asynchronous FastAPI endpoints.',
    category: 'AI & Machine Learning',
    techStack: '["Python", "Hugging Face Transformers", "RoBERTa", "FastAPI", "Redis", "Next.js"]',
    tags: ['NLP', 'Transformers', 'Financial Analytics', 'Sentiment Analysis'],
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://fin-sentiment.abdullah.dev',
    githubUrl: 'https://github.com/muhammad-abdullah-ai/market-sentiment-stream',
    featured: true,
    displayOrder: 3,
  },
  {
    id: 4,
    title: 'Automated E-Commerce Sales Forecasting Engine',
    description: 'Time-series forecasting system leveraging Prophet and SARIMAX to predict multi-store inventory demand across 1,200 SKU catalog items.',
    fullDescription: 'Custom time-series architecture integrating holiday effects, pricing elasticity, and promotional campaigns. Enables retail managers to optimize re-order thresholds, lowering stockouts by 34%.',
    category: 'Data Analytics & BI',
    techStack: 'Python, Prophet, SARIMAX, Pandas, Streamlit, PostgreSQL',
    tags: ['Time Series', 'Demand Forecasting', 'Prophet', 'Inventory Analytics'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://forecast-engine.abdullah.dev',
    githubUrl: 'https://github.com/muhammad-abdullah-ai/sales-forecasting-engine',
    featured: false,
    displayOrder: 4,
  },
  {
    id: 5,
    title: 'Executive Business Intelligence & KPI Cockpit',
    description: 'Centralized enterprise analytics dashboard connecting disparate PostgreSQL and Stripe data sources into unified operational KPI views.',
    fullDescription: 'Constructed with Power BI and automated Python extraction scripts. Provides real-time MRR, CAC, LTV, net revenue retention, and customer cohort attrition matrices.',
    category: 'Data Analytics & BI',
    techStack: '["Power BI", "DAX", "SQL", "PostgreSQL", "Python ETL"]',
    tags: ['Business Intelligence', 'Power BI', 'DAX', 'KPI Dashboards'],
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://bi-cockpit.abdullah.dev',
    githubUrl: 'https://github.com/muhammad-abdullah-ai/executive-bi-dashboards',
    featured: false,
    displayOrder: 5,
  },
  {
    id: 6,
    title: 'Intelligent Resume Parsing & Talent Matcher',
    description: 'Semantic vector search engine and candidate ranking system matching technical resumes against unstructured job specifications.',
    fullDescription: 'Extracts skills, certifications, and years of experience using spaCy and BERT embeddings. Computes cosine similarity scores and produces match breakdown summaries for hiring teams.',
    category: 'Computer Vision & NLP',
    techStack: 'Python, spaCy, Sentence-Transformers, ChromaDB, Flask, React',
    tags: ['Semantic Search', 'Vector Database', 'NLP', 'BERT'],
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://talent-matcher.abdullah.dev',
    githubUrl: 'https://github.com/muhammad-abdullah-ai/resume-talent-matcher',
    featured: false,
    displayOrder: 6,
  },
  {
    id: 7,
    title: 'Autonomous Defect Detection in Manufacturing',
    description: 'Computer vision quality inspection pipeline detecting surface cracks and solder defects on PCB assembly lines at 45 FPS.',
    fullDescription: 'Custom fine-tuned YOLOv8 model deployed on edge inference hardware. Includes synthetic data augmentation, bounding box telemetry logging, and an alert dispatch webhook service.',
    category: 'Computer Vision & NLP',
    techStack: '["YOLOv8", "PyTorch", "OpenCV", "Python", "MQTT"]',
    tags: ['Computer Vision', 'YOLOv8', 'Edge AI', 'Quality Control'],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://pcb-vision.abdullah.dev',
    githubUrl: 'https://github.com/muhammad-abdullah-ai/pcb-defect-detector',
    featured: false,
    displayOrder: 7,
  },
  {
    id: 8,
    title: 'Real Estate Price Valuation & Geospatial Engine',
    description: 'Multivariate regression framework predicting metropolitan property market valuations based on 40+ structural and geospatial proximity features.',
    fullDescription: 'Combines CatBoost regression, OpenStreetMap geo-distance metrics, and census demographic features. Achieved mean absolute percentage error (MAPE) under 6.8% on unseen testing listings.',
    category: 'AI & Machine Learning',
    techStack: 'Python, CatBoost, GeoPandas, Scikit-Learn, Streamlit',
    tags: ['Regression', 'CatBoost', 'Geospatial', 'Property Valuation'],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://estate-valuations.abdullah.dev',
    githubUrl: 'https://github.com/muhammad-abdullah-ai/realestate-price-engine',
    featured: false,
    displayOrder: 8,
  },
  {
    id: 9,
    title: 'Automated High-Volume Data Scraper & ETL Pipeline',
    description: 'Fault-tolerant distributed web crawler and data transformation pipeline ingesting 250,000 product records weekly into PostgreSQL.',
    fullDescription: 'Engineered with Scrapy and Celery worker queues. Implements proxy rotation, user-agent randomization, automated data schema validation with Pydantic, and automatic failure retry logic.',
    category: 'Data Analytics & BI',
    techStack: '["Python", "Scrapy", "Celery", "Redis", "PostgreSQL", "Docker"]',
    tags: ['Data Engineering', 'ETL', 'Scrapy', 'Celery'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://etl-stream.abdullah.dev',
    githubUrl: 'https://github.com/muhammad-abdullah-ai/distributed-scraper-etl',
    featured: false,
    displayOrder: 9,
  },
  {
    id: 10,
    title: 'Dynamic Portfolio Analytics & Investment Tracker',
    description: 'Full-stack financial portfolio dashboard calculating Sharpe ratio, value-at-risk (VaR), and historical benchmark correlations for retail investors.',
    fullDescription: 'Modern web dashboard built with Next.js and Tailwind CSS on the frontend, with a Python statistical backend utilizing NumPy and yfinance to calculate live risk metrics.',
    category: 'Full-Stack Development',
    techStack: 'Next.js, TypeScript, Tailwind CSS, FastAPI, SQLite, Python',
    tags: ['Full Stack', 'Financial Analytics', 'Next.js', 'Risk Analytics'],
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://portfolio-risk.abdullah.dev',
    githubUrl: 'https://github.com/muhammad-abdullah-ai/portfolio-risk-tracker',
    featured: false,
    displayOrder: 10,
  },
  {
    id: 11,
    title: 'Credit Risk Scoring & Default Assessment Engine',
    description: 'Compliant credit default classification model implementing monotonic weight-of-evidence (WoE) transformations and logistic scorecard calibrations.',
    fullDescription: 'Engineered according to Basel banking regulatory guidelines. Generates individual scorecard points, population stability indexes (PSI), and automated feature drift monitoring reports.',
    category: 'AI & Machine Learning',
    techStack: '["Python", "Scikit-Learn", "OptBinning", "Pandas", "Matplotlib"]',
    tags: ['Credit Scoring', 'Risk Modeling', 'Fintech', 'Scorecards'],
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://credit-risk.abdullah.dev',
    githubUrl: 'https://github.com/muhammad-abdullah-ai/credit-risk-engine',
    featured: false,
    displayOrder: 11,
  },
  {
    id: 12,
    title: 'Social Media Toxic Speech & Moderation Filter',
    description: 'Fine-tuned multilingual transformer classifier detecting toxic, hate, and threatening speech in online forum comments with 94.6% precision.',
    fullDescription: 'Trained on Jigsaw toxicity datasets with data balancing and focal loss. Deployed as a lightweight low-latency REST API suitable for continuous chat and community moderation.',
    category: 'Computer Vision & NLP',
    techStack: 'Python, PyTorch, Hugging Face, FastAPI, Docker',
    tags: ['NLP', 'Transformers', 'Moderation', 'FastAPI'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://toxic-filter.abdullah.dev',
    githubUrl: 'https://github.com/muhammad-abdullah-ai/toxic-comment-moderator',
    featured: false,
    displayOrder: 12,
  },
  {
    id: 13,
    title: 'Interactive Healthcare Patient Appointment Portal',
    description: 'Secure full-stack patient scheduling and clinical visit management system with automated SMS/email reminders and physician workload charts.',
    fullDescription: 'Custom-built for a regional medical clinic using React, Node.js, and PostgreSQL. Features role-based access control, appointment conflict resolution algorithms, and HIPAA-conscious data storage.',
    category: 'Full-Stack Development',
    techStack: '["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"]',
    tags: ['Full Stack', 'Healthcare', 'PostgreSQL', 'RBAC'],
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://clinic-portal.abdullah.dev',
    githubUrl: 'https://github.com/muhammad-abdullah-ai/clinic-scheduling-portal',
    featured: false,
    displayOrder: 13,
  },
  {
    id: 14,
    title: 'Customer Lifetime Value (CLV) Segmentation Engine',
    description: 'Probabilistic BG/NBD and Gamma-Gamma purchase frequency model estimating future customer monetary value and buying cycles.',
    fullDescription: 'Segments multi-brand retail client cohorts into champions, loyalists, potential switchers, and hibernating tiers to direct personalized retention email automations.',
    category: 'Data Analytics & BI',
    techStack: 'Python, Lifetimes, Pandas, Seaborn, SQL, Tableau',
    tags: ['Customer Analytics', 'CLV', 'Segmentation', 'RFM'],
    image: 'https://images.unsplash.com/photo-1556742049-0a67e557224d?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://clv-engine.abdullah.dev',
    githubUrl: 'https://github.com/muhammad-abdullah-ai/customer-clv-engine',
    featured: false,
    displayOrder: 14,
  },
  {
    id: 15,
    title: 'Automated Exploratory Data Analysis (AutoEDA) CLI',
    description: 'Lightweight command-line tool that profiles any CSV, Parquet, or SQL table and generates interactive interactive HTML statistical diagnostic reports.',
    fullDescription: 'Checks missing values, skewness, collinearity, outlier detection via IQR, and data types in seconds. Published on PyPI with over 8,500 developer downloads.',
    category: 'Data Analytics & BI',
    techStack: '["Python", "Click", "Jinja2", "Matplotlib", "Pandas"]',
    tags: ['CLI Tool', 'AutoEDA', 'Data Profiling', 'Open Source'],
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://autoeda-cli.abdullah.dev',
    githubUrl: 'https://github.com/muhammad-abdullah-ai/autoeda-cli-tool',
    featured: false,
    displayOrder: 15,
  },
  {
    id: 16,
    title: 'Modern Developer Portfolio & Admin CMS',
    description: 'Production personal portfolio and content management system featuring server-side database querying, protected admin dashboard, and AI assistant.',
    fullDescription: 'The current application architecture migrated from Flask to Next.js/React and PostgreSQL, with Prisma ORM, responsive styling, and comprehensive management capabilities.',
    category: 'Full-Stack Development',
    techStack: 'Next.js, React 19, TypeScript, PostgreSQL, Prisma, Tailwind CSS',
    tags: ['Full Stack', 'Next.js', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://abdullah.dev',
    githubUrl: 'https://github.com/muhammad-abdullah-ai/nextjs-portfolio-cms',
    featured: false,
    displayOrder: 16,
  },
];

// 9 Real Certificates
export const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: 1,
    title: 'Machine Learning Specialization',
    platform: 'DeepLearning.AI & Stanford Online',
    date: '2023',
    credentialId: 'DLAI-ML-984210',
    credentialUrl: 'https://coursera.org/verify/specialization/DLAI-ML',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    hasPdf: true,
    hasImage: true,
  },
  {
    id: 2,
    title: 'IBM Data Science Professional Certificate',
    platform: 'IBM',
    date: '2023',
    credentialId: 'IBM-DS-774019',
    credentialUrl: 'https://coursera.org/verify/professional-cert/IBM-DS',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    hasPdf: true,
    hasImage: true,
  },
  {
    id: 3,
    title: 'Google Data Analytics Professional Certificate',
    platform: 'Google',
    date: '2022',
    credentialId: 'GOOGLE-DA-552018',
    credentialUrl: 'https://coursera.org/verify/professional-cert/GOOGLE-DA',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
    hasPdf: true,
    hasImage: true,
  },
  {
    id: 4,
    title: 'Deep Learning Specialization',
    platform: 'DeepLearning.AI',
    date: '2023',
    credentialId: 'DLAI-DL-331902',
    credentialUrl: 'https://coursera.org/verify/specialization/DLAI-DL',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
    hasPdf: true,
    hasImage: true,
  },
  {
    id: 5,
    title: 'Microsoft Certified: Power BI Data Analyst Associate',
    platform: 'Microsoft',
    date: '2023',
    credentialId: 'MS-PL300-8812',
    credentialUrl: 'https://learn.microsoft.com/credentials/certifications/power-bi-data-analyst-associate',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    hasPdf: true,
    hasImage: true,
  },
  {
    id: 6,
    title: 'Natural Language Processing with Attention Models',
    platform: 'DeepLearning.AI',
    date: '2024',
    credentialId: 'DLAI-NLP-10948',
    credentialUrl: 'https://coursera.org/verify/DLAI-NLP',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    hasPdf: true,
    hasImage: true,
  },
  {
    id: 7,
    title: 'AWS Certified Cloud Practitioner',
    platform: 'Amazon Web Services',
    date: '2023',
    credentialId: 'AWS-CCP-649018',
    credentialUrl: 'https://aws.amazon.com/verification',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    hasPdf: true,
    hasImage: true,
  },
  {
    id: 8,
    title: 'Meta Back-End Developer Professional Certificate',
    platform: 'Meta',
    date: '2023',
    credentialId: 'META-BE-440192',
    credentialUrl: 'https://coursera.org/verify/professional-cert/META-BE',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    hasPdf: true,
    hasImage: true,
  },
  {
    id: 9,
    title: 'Advanced SQL for Data Scientists & Analysts',
    platform: 'LinkedIn Learning',
    date: '2022',
    credentialId: 'LIL-SQL-901844',
    credentialUrl: 'https://linkedin.com/learning/certificates/sql',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80',
    hasPdf: true,
    hasImage: true,
  },
];

// 2 Real Blog Posts
export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: 'demystifying-end-to-end-ml-pipelines',
    title: 'Demystifying End-to-End Machine Learning Pipelines: From EDA to Production',
    excerpt: 'A practical architectural walkthrough on building resilient ML services, avoiding data leakage, tracking model artifacts, and deploying automated scoring endpoints.',
    content: `Building machine learning models in Jupyter notebooks is satisfying, but moving those models into production requires engineering discipline. In this guide, we break down the critical stages of an enterprise ML pipeline:

1. Data Ingestion & Sanitization: Establishing immutable raw data stages and automated schema assertions with Pydantic.
2. Exploratory Data Analysis (EDA): Quantifying class imbalance, multicollinearity, and missing value distributions before feature extraction.
3. Feature Engineering Without Leakage: Ensuring transformations are fit strictly on training splits to prevent subtle lookahead biases.
4. Experiment Tracking & Model Versioning: Keeping reproducible hyperparameters, metrics, and serialized artifacts.
5. RESTful Serving & Monitoring: Exposing low-latency FastAPI endpoints equipped with input payload validation and latency telemetry.

By adopting these practices, data teams transition from ad-hoc experimental scripts to dependable production intelligence systems.`,
    date: 'April 2026',
    readTime: '6 min read',
    category: 'Machine Learning',
    tags: ['Machine Learning', 'MLOps', 'FastAPI', 'Production Engineering'],
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    slug: 'optimizing-sql-queries-and-bi-pipelines',
    title: 'Optimizing SQL Queries and High-Volume Data Pipelines for Modern BI',
    excerpt: 'Key strategies for eliminating slow table scans, optimizing window functions, indexing high-cardinality keys, and feeding real-time Power BI dashboards.',
    content: `When analytics tables swell into millions of records, poorly written SQL queries degrade dashboard load times and strain analytical databases. Here are key optimization strategies honed across client analytics projects:

1. Pruning Unnecessary Columns: Avoiding 'SELECT *' reduces memory footprint and enables columnar engines to leverage projection pushdowns.
2. Indexing and Partitioning: Structuring time-series tables around date partitions and creating composite B-tree indexes for frequently joined foreign keys.
3. Efficient Window Functions: Replacing correlated subqueries with dense_rank() and row_number() to consolidate scans into a single pass.
4. Materialized Views for Aggregations: Precomputing heavy hourly or daily rollups to serve executive dashboards in milliseconds.

Executing these optimizations ensures that stakeholder business intelligence cockpits remain snappy and cost-effective under heavy concurrent usage.`,
    date: 'March 2026',
    readTime: '8 min read',
    category: 'Data Analytics & SQL',
    tags: ['SQL', 'Data Engineering', 'Performance', 'Power BI'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  },
];

// 0 Testimonials (as verified by baseline data)
export const INITIAL_TESTIMONIALS = [];

// 3 Real Contact Messages
export const INITIAL_MESSAGES: ContactMessage[] = [
  {
    id: 1,
    name: 'David Vance',
    email: 'david.vance@fintech-ventures.io',
    subject: 'Consulting Inquiry: Predictive Churn & Retention Pipeline',
    message: 'Hi Muhammad, I reviewed your churn prediction project and was impressed with the SHAP-based feature importance breakdown. We are looking for an experienced Data/ML specialist to audit our current customer retention data and build automated forecasting models. Are you available for a brief discovery call next week?',
    createdAt: '2026-04-14 02:20 PM',
    status: 'new',
  },
  {
    id: 2,
    name: 'Elena Rostova',
    email: 'elena@meditech-labs.de',
    subject: 'Collaboration on Computer Vision Medical Dataset',
    message: 'Hello Muhammad, our medical imaging team came across your anomaly classifier research. We have a clinical dataset that requires transfer learning fine-tuning and explainable Grad-CAM visualizations. Would love to discuss contract possibilities.',
    createdAt: '2026-04-11 09:15 AM',
    status: 'replied',
  },
  {
    id: 3,
    name: 'Marcus Sterling',
    email: 'marcus@ecom-growth.co',
    subject: 'Executive Power BI & Automated Data Scraper Project',
    message: 'Hey Muhammad, we need an automated pipeline to pull catalog pricing intelligence from 5 competitors and feed it directly into our executive Power BI dashboard. Saw your Fiverr track record and wanted to connect directly.',
    createdAt: '2026-04-08 04:45 PM',
    status: 'new',
  },
];

// 2 Real Client Work records
export const INITIAL_CLIENT_WORK: ClientWork[] = [
  {
    id: 1,
    client: 'OmniRetail Global Solutions',
    projectTitle: 'Automated E-Commerce Sales Forecasting & Reorder Engine',
    scope: 'Developed multi-SKU time-series prediction models integrated with client inventory ERP to automate weekly re-order point calculations.',
    deliverables: 'Prophet forecasting pipeline, PostgreSQL integration scripts, and interactive Streamlit administrative control panel.',
    completedDate: 'January 2026',
  },
  {
    id: 2,
    client: 'Apex Health Systems',
    projectTitle: 'Interactive Executive BI & Patient Workload Dashboard',
    scope: 'Consolidated multi-facility clinical databases into a centralized Power BI business intelligence suite for executive medical directors.',
    deliverables: 'Custom DAX measures, automated ETL refresh schedules, and responsive role-tailored dashboard reporting views.',
    completedDate: 'November 2025',
  },
];
