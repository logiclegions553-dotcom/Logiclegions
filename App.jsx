import { useState } from 'react';
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
    <div className="center-wrapper palette-bg">
      {!showContent ? (
        <div className="student-app">
          <div className="robot-area">
            <svg className="robot-svg" viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="30" y="40" width="60" height="80" rx="18" fill="#a5b4fc" stroke="#6366f1" strokeWidth="4"/>
              <rect x="50" y="120" width="20" height="30" rx="8" fill="#6366f1"/>
              <circle cx="60" cy="70" r="10" fill="#fff" stroke="#6366f1" strokeWidth="3"/>
              <circle cx="60" cy="70" r="4" fill="#6366f1"/>
              <rect x="40" y="55" width="10" height="10" rx="3" fill="#fff" stroke="#6366f1" strokeWidth="2"/>
              <rect x="70" y="55" width="10" height="10" rx="3" fill="#fff" stroke="#6366f1" strokeWidth="2"/>
              <rect x="55" y="90" width="10" height="8" rx="2" fill="#fff" stroke="#6366f1" strokeWidth="2"/>
              <rect x="20" y="60" width="10" height="40" rx="5" fill="#a5b4fc" stroke="#6366f1" strokeWidth="2"/>
              <rect x="90" y="60" width="10" height="40" rx="5" fill="#a5b4fc" stroke="#6366f1" strokeWidth="2"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <h1>Student Portal</h1>
            <div className="form-container">
              <div className="form-group">
                <label htmlFor="classSelect">Select Class</label>
                <select
                  id="classSelect"
                  value={selectedClass}
                  onChange={e => {
                    setSelectedClass(e.target.value);
                    setSelectedSubject('');
                  }}
                >
                  <option value="">Choose Class</option>
                  {classes.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="subjectSelect">Select Subject</label>
                <select
                  id="subjectSelect"
                  value={selectedSubject}
                  onChange={e => setSelectedSubject(e.target.value)}
                  disabled={!selectedClass}
                >
                  <option value="">Choose Subject</option>
                  {selectedClass && subjects[selectedClass].map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
              {selectedClass && selectedSubject && (
                <div className="summary">
                  <h2>Selection Summary</h2>
                  <p>Class: <strong>{selectedClass}</strong></p>
                  <p>Subject: <strong>{selectedSubject}</strong></p>
                  <button onClick={handleShowContent}>Continue</button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="mainContent">
          <h1>Main Content</h1>
          <p>Welcome! Here is the main content for {selectedClass} - {selectedSubject}.</p>
          {/* Add your main content here */}
        </div>
      )}
    </div>
  );
}

export default App;
