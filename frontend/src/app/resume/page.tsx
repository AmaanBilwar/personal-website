"use client";
import dynamic from "next/dynamic";

const PDFViewer = dynamic(() => import("../../components/PdfViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gray-100 px-6 py-4 border-b">
          <h1 className="text-xl font-semibold text-gray-800">Resume</h1>
        </div>
        <div className="p-6 flex justify-center bg-gray-50">
          <div className="flex items-center justify-center h-96">
            <div className="text-gray-500">Loading PDF viewer...</div>
          </div>
        </div>
      </div>
    </div>
  ),
});

export default function ResumePage() {
  return <PDFViewer />;
}
