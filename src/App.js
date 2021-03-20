import { useEffect, useRef, useState } from "react";
import "./styles.css";
import Progress from "./Progress";
import Fup from "./resumable_upload.png";

export default function App() {
  return (
    <div>
      <div className="header">
        <img src={Fup} alt="Upload" width="150" />
        <h1>File upload component</h1>
      </div>
      <div className="desc">
        <p> Upload Your Files Below</p>
      </div>
      <Progress />
    </div>
  );
}
