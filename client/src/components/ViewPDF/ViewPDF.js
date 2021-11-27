// Core viewer
import { Viewer, Worker } from "@react-pdf-viewer/core";
// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import React from "react";
import "./ViewPDF.css";

export default function ViewPDF({ cvUrl, exitViewPdf }) {
  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className="pdfContainer">
      <div style={{ textAlign: "right" }}>
        <button className="exitBtn" onClick={() => exitViewPdf(false)}>
          Exit
        </button>
      </div>
      <div className="pdfBody">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
          <Viewer fileUrl={cvUrl} plugins={[defaultLayoutPluginInstance]} />
        </Worker>
      </div>
    </div>
  );
}
