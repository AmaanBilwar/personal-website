"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Import CSS for text layer
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfViewer() {
  const pdfUrl = "/AmaanBilwar_resume_Tesla.pdf";
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  function onDocumentLoadError(error: Error): void {
    console.error("Error while loading document! ", error.message);
  }

  const goToPrevPage = () =>
    setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

  const goToNextPage = () =>
    setPageNumber(
      pageNumber + 1 >= (numPages || 1) ? numPages || 1 : pageNumber + 1
    );

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-2">
      <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Navigation Controls */}
        <div className="bg-gray-100 px-6 py-4 border-b flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">Resume</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={goToPrevPage}
              disabled={pageNumber <= 1}
              className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {pageNumber} of {numPages || 0}
            </span>
            <button
              onClick={goToNextPage}
              disabled={pageNumber >= (numPages || 1)}
              className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
            >
              Next
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="p-6 flex justify-center bg-gray-50">
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div className="flex items-center justify-center p-8">
                <div className="text-gray-500">Loading PDF...</div>
              </div>
            }
            error={
              <div className="flex items-center justify-center p-8">
                <div className="text-red-500">
                  Failed to load PDF. Please check if the file exists.
                </div>
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={0.7}
              width={
                typeof window !== "undefined"
                  ? Math.min(900, window.innerWidth - 50)
                  : 900
              }
              className="border shadow-md"
              loading={
                <div className="flex items-center justify-center h-96">
                  <div className="text-gray-500">Loading page...</div>
                </div>
              }
            />
          </Document>
        </div>

        {/* Download Link */}
        <div className="bg-gray-100 px-6 py-4 border-t text-center">
          <a
            href={pdfUrl}
            download="AmaanBilwar_resume_Tesla.pdf"
            className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Download Resume
          </a>
        </div>
      </div>
    </div>
  );
}
