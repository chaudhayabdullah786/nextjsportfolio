import React from 'react';
import {
  BrainCircuit,
  BarChart3,
  Layers,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';
import { FadeIn } from './FadeIn';

export const ServicesSection: React.FC<{ onContactClick: () => void }> = ({
  onContactClick,
}) => {
  const services = [
    {
      id: 'ai-ml',
      title: 'AI & Machine Learning Engineering',
      tagline: 'Custom predictive architectures, computer vision & NLP models',
      description:
        'End-to-end design, training, and deployment of production ML systems. Specializing in classification, regression, demand forecasting, medical vision diagnostics, and transformer-based sentiment analysis.',
      icon: BrainCircuit,
      color: 'text-[#6366F1]',
      borderHover: 'hover:border-[#6366F1]/50',
      bgIcon: 'bg-[#6366F1]/15',
      capabilities: [
        'Supervised & Unsupervised Learning (Scikit-Learn, XGBoost, LightGBM)',
        'Deep Neural Networks with PyTorch & Transfer Learning',
        'Computer Vision (YOLOv8, OpenCV, Image Anomaly Detection)',
        'Natural Language Processing (Transformers, RoBERTa, spaCy)',
        'Explainable AI via SHAP & Grad-CAM visual saliency heatmaps',
        'Model Packaging & Containerized Inference with Docker & FastAPI',
      ],
    },
    {
      id: 'data-analytics',
      title: 'Data Science & Business Intelligence',
      tagline: 'Turning noisy data into clear executive decisions',
      description:
        'Transforming distributed operational data into unified analytical datasets and interactive executive dashboards. In-depth statistical analysis, cohort retention modeling, and automated ETL ingestion.',
      icon: BarChart3,
      color: 'text-[#22D3EE]',
      borderHover: 'hover:border-[#22D3EE]/50',
      bgIcon: 'bg-[#22D3EE]/15',
      capabilities: [
        'Exploratory Data Analysis (EDA) & Data Cleansing in Pandas & NumPy',
        'Interactive Business Intelligence Dashboards in Power BI & Tableau',
        'Customer Churn, CLV & RFM Cohort Segmentation Analysis',
        'Time-Series Forecasting with Prophet & SARIMAX Models',
        'Automated Python Web Scraping & Distributed Scrapy Pipelines',
        'Complex SQL Queries, Window Functions & Database Schema Tuning',
      ],
    },
    {
      id: 'fullstack-dev',
      title: 'Full-Stack Data Web Solutions',
      tagline: 'Production-ready web applications powered by analytical backends',
      description:
        'Building responsive, user-friendly web platforms that interact seamlessly with statistical models, databases, and third-party APIs. Experience built on 30+ freelance client deliverables.',
      icon: Layers,
      color: 'text-[#A855F7]',
      borderHover: 'hover:border-[#A855F7]/50',
      bgIcon: 'bg-[#A855F7]/15',
      capabilities: [
        'High-performance REST API microservices with FastAPI & Flask',
        'Modern Frontend Web Interfaces in React, TypeScript & Tailwind CSS',
        'PostgreSQL & SQLite Database Integration with Prisma & SQLAlchemy',
        'Role-Based Access Control (RBAC) & Secure Session Authentication',
        'Real-time Metric Stream Monitoring & Interactive Data Visualizations',
        'Automated Scheduled Data Sync & Background Celery Worker Queues',
      ],
    },
  ];

  return (
    <section id="services" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto w-full relative">
      <div className="flex flex-col items-center text-center gap-3 mb-16">
        <FadeIn delay={0.05} y={-10}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/20 text-xs font-semibold uppercase tracking-wider text-[#22D3EE]">
            Services &amp; Capabilities
          </div>
        </FadeIn>
        <FadeIn delay={0.15} y={20}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F8FAFC] tracking-tight">
            Specialized Solutions Backed by Real Engineering
          </h2>
        </FadeIn>
        <FadeIn delay={0.25} y={20}>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl leading-relaxed">
            Delivering data-driven software that enhances operational visibility, streamlines decision-making,
            and solves complex predictive challenges.
          </p>
        </FadeIn>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <FadeIn key={service.id} delay={0.15 + index * 0.1} y={25} className="h-full">
              <div
                className={`h-full p-6 sm:p-8 rounded-2xl bg-[#0B1020] border border-[#94A3B8]/15 ${service.borderHover} transition-all duration-300 flex flex-col justify-between group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3.5 rounded-xl ${service.bgIcon} ${service.color} transition-transform group-hover:scale-110`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-medium text-[#7C879B]">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#F8FAFC] group-hover:text-[#22D3EE] transition-colors leading-tight">
                    {service.title}
                  </h3>

                  <p className="text-xs font-medium text-[#7C879B] mt-1.5 mb-4">
                    {service.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="pt-4 border-t border-[#94A3B8]/15 flex flex-col gap-2.5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">
                      Core Capabilities:
                    </span>
                    {service.capabilities.map((cap, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#CBD5E1]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#22D3EE] shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 mt-6 border-t border-[#94A3B8]/10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={onContactClick}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#CBD5E1] group-hover:text-[#F8FAFC] transition-colors cursor-pointer"
                  >
                    <span>Discuss a Project</span>
                    <ArrowUpRight className="w-4 h-4 text-[#22D3EE] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
};

export default ServicesSection;
