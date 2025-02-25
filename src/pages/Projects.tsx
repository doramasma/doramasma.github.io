import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  title: string;
  date: string;
  description: string;
  image?: string;
  link: string;
  githubUrl?: string;
  bulletPoints: string[];
}

export function Projects() {
  const projects: Project[] = [
    //////////////////////////////////////////////////
    {
      title: 'Pesonal Portfolio Website',
      date: 'Feb 24, 2025',
      description: 'My personal portfolio website built with React, TypeScript, and Tailwind CSS.',
      link: 'https://doramasma.github.io/',
      githubUrl: 'https://github.com/doramasma/doramasma.github.io/',
      bulletPoints: [
        ' React, TypeScript, Tailwind CSS',
        ' Dark mode, responsive design',
        ' Blog with markdown support',
      ]
    },
    {
      title: 'NewsAskAI',
      date: 'Jan 23, 2025',
      description: 'Open-source project using Retrieval-Augmented Generation (RAG)',
      link: 'https://github.com/doramasma/NewsAskAI/blob/main/src/news_ask_ai/static/assets/usage_example.gif',
      githubUrl: 'https://github.com/doramasma/NewsAskAI',
      bulletPoints: [
        'Python, UV, textual-UI',
        'LLMs, Embedding models, Vector Database',
        'Open-source project',
      ]
    },
    {
      title: 'DETR (DEtection TRansformer) - Finetune',
      date: 'Feb 12, 2021',
      description: 'Finetuning scripts for an End-to-End Object Detection with Transformers',
      githubUrl: 'https://github.com/doramasma/DERT-finetune',
      link: 'https://github.com/doramasma/DERT-finetune',
      image: '/dert-result.png',
      bulletPoints: [
        'Python, Jupyter notebooks',
        'Transformers, Finetuning, Datasets',
        'Open-source project',
      ]
    },
    {
      title: 'MatLibraryPy',
      date: 'Feb 03, 2021',
      description: 'Matrix library made with C ++ for Python',
      githubUrl: 'https://github.com/doramasma/MatLibraryPy',
      link: 'https://github.com/doramasma/MatLibraryPy',
      bulletPoints: [
        'C++, Boost-python, swig',
        'Matrix, Vectors, Numerical operations',
        'Open-source project',
      ]
    },
    
  ];
///////////////////////////////////////////////////////////////////////
  return (
    <div className="max-w-6xl mx-auto px-6">
      <header className="mb-16">
        <h1 className="text-2xl font-medium mb-4 dark:text-white">Projects</h1>
        <p className="text-[15px] leading-relaxed text-gray-800 dark:text-gray-300">
        Learn from yesterday, live for today, hope for tomorrow. The important thing is not to stop questioning.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <div 
            key={index}
            className="bg-white dark:bg-[#242424] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
          >
            {project.image && (
              <div className="h-40 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-baseline justify-between mb-4">
                <h2 className="text-lg font-medium dark:text-white">{project.title}</h2>
                <time className="text-sm text-gray-500 dark:text-gray-400 ml-4 shrink-0">{project.date}</time>
              </div>
              
              <p className="text-[15px] text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {project.description}
              </p>

              <ul className="space-y-2 mb-6 flex-1">
                {project.bulletPoints.map((point, i) => (
                  <li key={i} className="flex items-start text-[13px] text-gray-600 dark:text-gray-400">
                    <span className="mr-2 mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300 dark:bg-gray-600" />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                <a 
                  href={project.link}
                  className="inline-flex items-center gap-1 text-[13px] text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                >
                  View Project <ExternalLink size={14} className="ml-0.5" />
                </a>
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl}
                    className="inline-flex items-center gap-1 text-[13px] text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <Github size={14} /> Source
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}