import React, { useState } from 'react';
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export function Resume() {
  const [numPages, setNumPages] = useState<number>(0);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
<div className="w-full px-4 sm:px-6 md:max-w-3xl md:mx-auto">
  <header className="mb-16">
    <h1 className="text-2xl font-medium mb-4 dark:text-white">Resume</h1>
    <p className="text-[15px] leading-relaxed text-gray-800 dark:text-gray-300">
      coming soon...
    </p>
  </header>

  <div className="w-full md:mx-auto pb-16"> 
    <Document file="/resume.pdf" onLoadSuccess={onDocumentLoadSuccess}>
      {Array.from(new Array(numPages), (_, index) => (
        <Page
          key={`page_${index + 1}`}
          pageNumber={index + 1}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          className="mb-2"
        />
      ))}
    </Document>
  </div>
</div>

  );
}
