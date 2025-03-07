import React from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { SiBuymeacoffee } from "react-icons/si";
import { TimelineItem } from '../types';
import { Timeline } from '../components/Timeline';

export function Home() {
  const timelineItems: TimelineItem[] = [
    {
      type: 'blog',
      title: 'GenAI in Cybersecurity',
      date: 'Mar 07, 2025',
      description: 'Generative AI in cybersecurity, practices and its implications',
      link: '/blog/GenAI&Cybersecurity',
      isNew: true
    },
    {
      type: 'project',
      title: 'Personal Portfolio Website',
      date: 'Feb 24, 2025',
      description: 'A minimalist portfolio built with React, TypeScript, and Tailwind CSS.',
      link: 'https://github.com/doramasma/doramasma.github.io/',
      isNew: true
    },
    {
      type: 'project',
      title: 'NewsAskAI',
      date: 'Jan 23, 2025',
      description: 'Open-source project using Retrieval-Augmented Generation (RAG) to enable users to ask questions about the latest news.',
      link: 'https://github.com/doramasma/NewsAskAI',
      isNew: false
    },
    {
      type: 'blog',
      title: 'Building a Spanish Multimodal Model for Enhanced Search Capabilities',
      date: '2024',
      description: 'An informative guide on fine-tuning multimodal models for Spanish-language understanding.',
      link: 'https://www.linkedin.com/pulse/navigating-new-frontiers-building-spanish-multimodal-model-xtbge/',
    },
    {
      type: 'blog',
      title: 'Building an Automated Coding Model',
      date: '2023',
      description: 'First deep dive into NLP: Experimenting with AI-driven code generation',
      link: 'https://medium.com/the-theam-journey/building-our-own-automated-coding-model-29118f444f96',
    },
    {
      type: 'project',
      title: 'DETR (DEtection TRansformer) - Finetune',
      date: '2021',
      description: 'DETR (DEtection TRansformer) - Fine-tuning for urban scene understanding',
      link: 'https://github.com/doramasma/DERT-finetune',
    },
    {
      type: 'project',
      title: 'MatLibraryPy',
      date: '2021',
      description: 'Numerical library for matrix and vector operations.',
      link: 'https://github.com/doramasma/MatLibraryPy',
    }
  ];

  return (
    <div className="w-full px-4 sm:px-6 md:max-w-3xl md:mx-auto"> 
      <header className="mb-8 sm:mb-12">
        <p className="text-sm sm:text-[15px] leading-relaxed text-gray-800 dark:text-gray-300 mb-4">
        Machine Learning Engineer with over 5 years of experience working at the intersection of data, computer vision, generative AI, and language. Experience spans research centers and innovative tech companies, contributing to the development and deployment of cutting-edge ML and AI solutions. Areas of expertise include Large Language Models (LLMs), multimodal systems, and neural radiance fields. Demonstrated expertise to co-lead teams in planning, executing, and delivering successful products, with a strong focus on customer and market needs. Feel free to hit me up in DMs on X at any time!
        </p>
        <div className="flex gap-4 sm:gap-5 items-center">
          {[
            { Icon: Github, href: "https://github.com/doramasma" },
            { Icon: Twitter, href: "https://x.com/doramasma" },
            { Icon: Linkedin, href: "https://www.linkedin.com/in/doramas-baez-bernal" },
            { Icon: Mail, href: "mailto:doramas6@hotmail.com" },
          ].map(({ Icon, href }, index) => (
            <a 
              key={index}
              href={href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </header>

      <Timeline items={timelineItems} />
    </div>
  );
}