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
    <div className="center-wrapper">
      {!showContent ? (
        <div className="student-app">
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
                <option value="" className='option'>Choose Class</option>
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
