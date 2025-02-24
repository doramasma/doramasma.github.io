import React, { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from "react-pdf";
import { Github, Twitter, Linkedin, Mail, Download } from 'lucide-react';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export function Resume() {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageWidth, setPageWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update the page width on mount and when the window resizes
  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        setPageWidth(containerRef.current.clientWidth);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div className="w-full px-4 sm:px-6 md:max-w-3xl md:mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-medium mb-4 dark:text-white">Resume</h1>
        <p className="text-[15px] leading-relaxed mb-1 text-gray-800 dark:text-gray-300">
          Contact information:
        </p>
        <div className="flex flex-wrap gap-4 sm:gap-5 items-center">
          {[
            { Icon: Github, href: "https://github.com/doramasma" },
            { Icon: Twitter, href: "https://x.com/doramasma" },
            { Icon: Linkedin, href: "https://www.linkedin.com/in/doramas-baez-bernal" },
            { Icon: Mail, href: "mailto:doramas6@hotmail.com" },
            {
              Icon: Download,
              href: '/resume.pdf',
              label: 'Download PDF',
              download: 'My_Resume.pdf'
            },
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

      <div className="w-full md:mx-auto pb-16" ref={containerRef}>
        <Document file="/resume.pdf" onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="mb-2"
              width={pageWidth}
            />
          ))}
        </Document>
      </div>
    </div>
  );
}
