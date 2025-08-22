import { useState } from 'react';
import React from 'react';  
import './App.css';

const classes = [
  'Class 10'
];
const subjects = {
  'Class 10': ['Physics', 'Science', 'Math']
};

function App() {  
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  const [showContent, setShowContent] = useState(false);

  function handleShowContent() {
    setShowContent(true);
  }

  return (
    <div  className="center-wrapper palette-bg">
      
        <div className="mainContent">
          <h1>Main Content</h1>
          <p>Welcome! Here is the main content for {selectedClass} - {selectedSubject}.</p>
        <div className="sketchfab-embed-wrapper">
    <iframe
      title="[Animation] Human Heart"
      frameBorder="0"
      allowFullScreen
      mozAllowFullScreen="true"
      webkitAllowFullScreen="true"
      allow="autoplay; fullscreen; xr-spatial-tracking"
      src="https://sketchfab.com/models/775d6629622740de8a5ed61a959c7506/embed"
    ></iframe>
  <p style={{ fontSize: 13, fontWeight: "normal", margin: 5, color: "#4A4A4A" }}>
    <a
      href="https://sketchfab.com/3d-models/animation-human-heart-775d6629622740de8a5ed61a959c7506?utm_medium=embed&utm_campaign=share-popup&utm_content=775d6629622740de8a5ed61a959c7506"
      target="_blank"
      rel="nofollow"
      style={{ fontWeight: "bold", color: "#1CAAD9" }}
    >
      [Animation] Human Heart
    </a>{" "}
    by{" "}
    <a
      href="https://sketchfab.com/michel.paschalis?utm_medium=embed&utm_campaign=share-popup&utm_content=775d6629622740de8a5ed61a959c7506"
      target="_blank"
      rel="nofollow"
      style={{ fontWeight: "bold", color: "#1CAAD9" }}
    >
      Michel Paschalis
    </a>{" "}
    on{" "}
    <a
      href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=775d6629622740de8a5ed61a959c7506"
      target="_blank"
      rel="nofollow"
      style={{ fontWeight: "bold", color: "#1CAAD9" }}
    >
      Sketchfab
    </a>
  </p>
</div>
           </div>
    </div>
  );
}

export default App;

