import React from 'react';
import { Brain, LineChart, Code2, Server, Check } from 'lucide-react';
import { FadeIn } from './FadeIn';

export const AboutSection: React.FC = () => {
  const highlights = [
    'Specialist in end-to-end Machine Learning pipelines from data preprocessing to model serving',
    'Proven track record delivering client web applications, scrapers, and analytics on Fiverr',
    'Certified in Deep Learning, Data Analytics, and Power BI by Stanford Online, IBM, and Google',
    'Proficient in Python, SQL, PyTorch, Scikit-Learn, FastAPI, React, and PostgreSQL',
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto w-full relative">
      <div className="flex flex-col items-center text-center gap-3 mb-16">
        <FadeIn delay={0.05} y={-10}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6366F1]/10 border border-[#6366F1]/20 text-xs font-semibold uppercase tracking-wider text-[#6366F1]">
            About Muhammad Abdullah
          </div>
        </FadeIn>
        <FadeIn delay={0.15} y={20}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F8FAFC] tracking-tight">
            Engineering Actionable Intelligence &amp; Robust AI Systems
          </h2>
        </FadeIn>
        <FadeIn delay={0.25} y={20}>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl leading-relaxed">
            Bridging the gap between raw data complexity, statistical modeling, and production-ready
            software applications.
          </p>
        </FadeIn>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left column: Editorial overview */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <FadeIn delay={0.2} y={20}>
            <div className="p-6 sm:p-8 rounded-2xl card-elevated flex flex-col gap-5">
              <h3 className="text-xl sm:text-2xl font-bold text-[#F8FAFC] tracking-tight">
                Data Analyst &amp; AI/ML Practitioner
              </h3>
              <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
                I am a focused Data Analyst and AI/ML Engineer driven by extracting meaningful insights
                from structured and unstructured datasets. My work spans predictive modeling, classification,
                time-series forecasting, exploratory data analysis, and scalable data pipeline automation.
              </p>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                Having completed 30+ client projects through international freelance engagements on Fiverr,
                I approach every project with strict technical rigor: validating data integrity, preventing
                training leakage, tracking model reproducibility, and providing transparent business-oriented
                dashboards that decision-makers rely on.
              </p>

              <div className="pt-3 border-t border-[#94A3B8]/15 flex flex-col gap-2.5">
                {highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#CBD5E1]">
                    <div className="w-5 h-5 rounded-full bg-[#22D3EE]/15 text-[#22D3EE] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Right column: 4 Core pillars */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          <FadeIn delay={0.25} y={20}>
            <div className="p-5 rounded-xl bg-[#0B1020] border border-[#94A3B8]/15 hover:border-[#6366F1]/40 transition-colors flex items-start gap-4">
              <div className="p-3 rounded-lg bg-[#6366F1]/15 text-[#6366F1] shrink-0">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#F8FAFC]">Predictive Machine Learning</h4>
                <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
                  Supervised and unsupervised models, gradient boosted trees, deep learning architectures, and explainable AI (SHAP, Grad-CAM).
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.35} y={20}>
            <div className="p-5 rounded-xl bg-[#0B1020] border border-[#94A3B8]/15 hover:border-[#22D3EE]/40 transition-colors flex items-start gap-4">
              <div className="p-3 rounded-lg bg-[#22D3EE]/15 text-[#22D3EE] shrink-0">
                <LineChart className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#F8FAFC]">Data Science &amp; Business Intelligence</h4>
                <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
                  Rigorous hypothesis testing, cohort retention matrices, customer lifetime value modeling, and enterprise Power BI reporting suites.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.45} y={20}>
            <div className="p-5 rounded-xl bg-[#0B1020] border border-[#94A3B8]/15 hover:border-[#A855F7]/40 transition-colors flex items-start gap-4">
              <div className="p-3 rounded-lg bg-[#A855F7]/15 text-[#A855F7] shrink-0">
                <Server className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#F8FAFC]">Automated ETL &amp; Data Engineering</h4>
                <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
                  Automated Python scrapers, Celery worker queues, SQL database schema design, and scheduled ingestion into PostgreSQL.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.55} y={20}>
            <div className="p-5 rounded-xl bg-[#0B1020] border border-[#94A3B8]/15 hover:border-[#22C55E]/40 transition-colors flex items-start gap-4">
              <div className="p-3 rounded-lg bg-[#22C55E]/15 text-[#22C55E] shrink-0">
                <Code2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#F8FAFC]">Full-Stack Analytics Web Apps</h4>
                <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
                  Exposing machine learning models via high-performance FastAPI/Flask backends paired with clean Next.js/React user interfaces.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
