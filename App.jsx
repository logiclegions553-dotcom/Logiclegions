import { useState } from 'react';
import './App.css';
import SketchfabHeartViewer from './SketchfabHeartViewer.jsx';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showHeartDiagram, setShowHeartDiagram] = useState(false);
  const [showRespiratoryDiagram, setShowRespiratoryDiagram] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentProfile, setStudentProfile] = useState({ name: 'John Doe', lessonsCompleted: 12, quizzesScore: 85 });
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const subtopics = {
    Science: {
      'Introduction to Physics': ['Motion', 'Force', 'Energy'],
      'Basics of Chemistry': ['Atoms', 'Molecules', 'Reactions']
    },
    Maths: {
      'Algebra Fundamentals': ['Equations', 'Expressions', 'Functions'],
      'Geometry Basics': ['Shapes', 'Angles', 'Theorems']
    }
  };
  const topicContents = {
    Science: {
      'Introduction to Physics': {
        Motion: 'Motion is the change in position of an object over time.',
        Force: 'Force is a push or pull upon an object resulting from its interaction with another object.',
        Energy: 'Energy is the ability to do work.'
      },
      'Basics of Chemistry': {
        Atoms: 'Atoms are the basic units of matter.',
        Molecules: 'Molecules are groups of atoms bonded together.',
        Reactions: 'Chemical reactions involve the transformation of substances.'
      }
    },
    Maths: {
      'Algebra Fundamentals': {
        Equations: 'Equations are mathematical statements that assert the equality of two expressions.',
        Expressions: 'Expressions are combinations of numbers, variables, and operators.',
        Functions: 'Functions relate inputs to outputs.'
      },
      'Geometry Basics': {
        Shapes: 'Shapes are the forms of objects having boundaries.',
        Angles: 'Angles are formed by two rays meeting at a common endpoint.',
        Theorems: 'Theorems are statements that can be proven based on previously established statements.'
      }
    }
  };

  function handleSearch(e) {
    e.preventDefault();
    const term = searchTerm.trim().toLowerCase();
    setShowHeartDiagram(term === 'heart diagram' || term === 'heart');
    setShowRespiratoryDiagram(term === 'respiratory system');
  }

  const handleSubtopicClick = () => {
    setSelectedChapter(null);
  };

  const handleChapterClick = (chapter) => {
    setSelectedChapter(selectedChapter === chapter ? null : chapter);
  };

  return (
    <div className="appLayout">
      <nav className="sidebar">
        <h2>Menu</h2>
        <ul>
          <li title="Home" onClick={() => setActiveSection('home')}><span className="material-icons">home</span></li>
          <li title="Class" onClick={() => setActiveSection('class')}><span className="material-icons">school</span></li>
          <li title="Quizzes" onClick={() => setActiveSection('quizzes')}><span className="material-icons">quiz</span></li>
          <li title="Notebooks" onClick={() => setActiveSection('notebooks')}><span className="material-icons">book</span></li>
        </ul>
      </nav>

      <nav className="sidebar rightSidebar" style={{ right: 0, left: 'auto',paddingLeft: 17 , background: 'linear-gradient(135deg, #16213e 60%, #1a1a2e 100%)', zIndex: 999, position: 'fixed', borderTopRightRadius: 0, borderBottomLeftRadius: 24 }}>
        <ul>
          <li title="Profile" onClick={() => setActiveSection('profile')}><span className="material-icons">person</span></li>
          <li title="Class Group Messages"><span className="material-icons">forum</span></li>
        </ul>
      </nav>
  <main className="mainContent" style={{ position: 'relative' }}>
        {activeSection === 'profile' && (
          <div className="searchSection" style={{ flex: 1 }}>
            {!isLoggedIn ? (
              <form
                style={{ maxWidth: 400, width: '100%', margin: '40px auto', display: 'flex', flexDirection: 'column', gap: 16 }}
                onSubmit={e => { e.preventDefault(); setIsLoggedIn(true); }}
              >
                <h2>Login</h2>
                <input type="text" placeholder="Username" required style={{ padding: 10, fontSize: 16 }} />
                <input type="password" placeholder="Password" required style={{ padding: 10, fontSize: 16 }} />
                <button type="submit" style={{ padding: 12, fontSize: 16, background: '#e94560', color: '#fff', border: 'none', borderRadius: 8 }}>Login</button>
              </form>
            ) : (
              <div style={{ maxWidth: 600, width: '100%', margin: '40px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: 32 }}>
                <h2>Student Profile</h2>
                <p><strong>Name:</strong> {studentProfile.name}</p>
                <div style={{ marginTop: 24 }}>
                  <h3>Dashboard</h3>
                  <p><strong>Lessons Completed:</strong> {studentProfile.lessonsCompleted}</p>
                  <p><strong>Quizzes Score:</strong> {studentProfile.quizzesScore}%</p>
                </div>
              </div>
            )}
          </div>
        )}
        {activeSection === 'class' && (
          <div style={{ width: '1600px', height: '700px', display: 'flex', flexDirection: 'row', position: 'relative', justifyContent: 'center', alignItems: 'center', margin: '0 auto' }}>
            <div className="subjectsSection" style={{ width: 300, minWidth: 220, height: '100%', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', margin: '40px 0 40px 0px', padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', position: 'absolute', left: 100, top: 0 }}>
              <button onClick={() => setSelectedSubject(null)} style={{ marginBottom: 24, padding: '8px 16px', fontSize: 16, background: '#e94560', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
                ← Back
              </button>
              <h3>{selectedSubject ? 'Chapters' : 'Subjects'}</h3>
              <div className="subjectsList" style={{ width: '100%', marginBottom: 16, display: selectedSubject ? 'none' : 'block' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, width: '100%' }}>
                  <li style={{ padding: '10px 0', fontSize: 17, borderBottom: '1px solid #eee', cursor: 'pointer' }} onClick={() => setSelectedSubject('Science')}>Science</li>
                  <li style={{ padding: '10px 0', fontSize: 17, borderBottom: '1px solid #eee', cursor: 'pointer' }} onClick={() => setSelectedSubject('Maths')}>Maths</li>
                </ul>
              </div>
              {selectedSubject === 'Science' && (
                <div style={{ marginTop: 24 , marginLeft: 60, right: 50 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div>
                      <button onClick={() => handleChapterClick('Introduction to Physics')} style={{ padding: '10px 18px', fontSize: 16, background: '#e94560', color: '#fff', border: 'none', borderRadius: 8, marginBottom: 8, cursor: 'pointer', fontWeight: selectedChapter === 'Introduction to Physics' ? 'bold' : 'normal' }}>1. Introduction to Physics</button>
                      {selectedChapter === 'Introduction to Physics' && (
                        <div style={{ marginTop: 8 }}>
                          <h5>Subtopics</h5>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {subtopics['Science']['Introduction to Physics'].map((topic, idx) => (
                              <button key={topic} onClick={() => setSelectedTopic(topic)} style={{ padding: '8px 16px', fontSize: 15, background: '#fff', color: '#e94560', border: '1px solid #e94560', borderRadius: 8, cursor: 'pointer', textAlign: 'left' }}>{`${idx + 1}. ${topic}`}</button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <button onClick={() => handleChapterClick('Basics of Chemistry')} style={{ padding: '10px 18px', fontSize: 16, background: '#e94560', color: '#fff', border: 'none', borderRadius: 8, marginBottom: 8, cursor: 'pointer', fontWeight: selectedChapter === 'Basics of Chemistry' ? 'bold' : 'normal' }}>2. Basics of Chemistry</button>
                      {selectedChapter === 'Basics of Chemistry' && (
                        <div style={{ marginTop: 8 }}>
                          <h5>Subtopics</h5>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {subtopics['Science']['Basics of Chemistry'].map((topic, idx) => (
                              <button key={topic} onClick={() => setSelectedTopic(topic)} style={{ padding: '8px 16px', fontSize: 15, background: '#fff', color: '#e94560', border: '1px solid #e94560', borderRadius: 8, cursor: 'pointer', textAlign: 'left' }}>{`${idx + 1}. ${topic}`}</button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {selectedSubject === 'Maths' && (  
                <div style={{ marginTop: 24 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div>
                      <button onClick={() => handleChapterClick('Algebra Fundamentals')} style={{ padding: '10px 18px', fontSize: 16, background: '#e94560', color: '#fff', border: 'none', borderRadius: 8, marginBottom: 8, cursor: 'pointer', fontWeight: selectedChapter === 'Algebra Fundamentals' ? 'bold' : 'normal' }}>1. Algebra Fundamentals</button>
                      {selectedChapter === 'Algebra Fundamentals' && (
                        <div style={{ marginTop: 8 }}>
                          <h5>Subtopics</h5>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {subtopics['Maths']['Algebra Fundamentals'].map((topic, idx) => (
                              <button key={topic} onClick={() => setSelectedTopic(topic)} style={{ padding: '8px 16px', fontSize: 15, background: '#fff', color: '#e94560', border: '1px solid #e94560', borderRadius: 8, cursor: 'pointer', textAlign: 'left' }}>{`${idx + 1}. ${topic}`}</button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <button onClick={() => handleChapterClick('Geometry Basics')} style={{ padding: '10px 18px', fontSize: 16, background: '#e94560', color: '#fff', border: 'none', borderRadius: 8, marginBottom: 8, cursor: 'pointer', fontWeight: selectedChapter === 'Geometry Basics' ? 'bold' : 'normal' }}>2. Geometry Basics</button>
                      {selectedChapter === 'Geometry Basics' && (
                        <div style={{ marginTop: 8 }}>
                          <h5>Subtopics</h5>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {subtopics['Maths']['Geometry Basics'].map((topic, idx) => (
                              <button key={topic} onClick={() => setSelectedTopic(topic)} style={{ padding: '8px 16px', fontSize: 15, background: '#fff', color: '#e94560', border: '1px solid #e94560', borderRadius: 8, cursor: 'pointer', textAlign: 'left' }}>{`${idx + 1}. ${topic}`}</button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {activeSection === 'quizzes' && (
          <div>
            <h1>Quizzes Section</h1>
            <p>This is the quizzes section. Add your quizzes-related content here.</p>
          </div>
        )}
        {activeSection === 'notebooks' && (
          <div>
            <h1>Notebooks Section</h1>
            <p>This is the notebooks section. Add your notebooks-related content here.</p>
          </div>
        )}
        {activeSection === 'home' && (
          <div className="searchSection">
            <form onSubmit={handleSearch} style={{ marginBottom: 20, textAlign: 'center' }}>
              <input
                type="text"
                placeholder="Search for diagrams..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ padding: '8px', width: '400px', fontSize: '16px' }}
              />
              <button type="submit" style={{ padding: '8px 16px', marginLeft: '8px', fontSize: '16px' }}>Search</button>
            </form>

            <div className="searchResults" style={{ width: '100%' }}>
              <h1>Search Results</h1>
              {/* Show heart diagram if searched */}
              {showHeartDiagram && (
                <SketchfabHeartViewer />
              )}
              {/* Show respiratory system diagram if searched */}
              {showRespiratoryDiagram && (
                <div className="sketchfab-embed-wrapper">
                  <iframe
                    title="Human Respiratory system review"
                    frameBorder="0"
                    allowFullScreen
                    mozAllowFullScreen="true"
                    webkitAllowFullScreen="true"
                    allow="autoplay; fullscreen; xr-spatial-tracking"
                    src="https://sketchfab.com/models/250911151757489da1cf5501b791f363/embed"
                    style={{ width: '100%', height: '480px', border: 'none' }}
                  ></iframe>
                  <p style={{ fontSize: 13, fontWeight: "normal", margin: 5, color: "#4A4A4A" }}>
                    <a
                      href="https://sketchfab.com/3d-models/human-respiratory-system-review-250911151757489da1cf5501b791f363?utm_medium=embed&utm_campaign=share-popup&utm_content=250911151757489da1cf5501b791f363"
                      target="_blank"
                      rel="nofollow"
                      style={{ fontWeight: "bold", color: "#1CAAD9" }}
                    >
                      Human Respiratory system review
                    </a>{" "}
                    by{" "}
                    <a
                      href="https://sketchfab.com/shinjou?utm_medium=embed&utm_campaign=share-popup&utm_content=250911151757489da1cf5501b791f363"
                      target="_blank"
                      rel="nofollow"
                      style={{ fontWeight: "bold", color: "#1CAAD9" }}
                    >
                      Darmawan Pujisetyadi
                    </a>{" "}
                    on{" "}
                    <a
                      href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=250911151757489da1cf5501b791f363"
                      target="_blank"
                      rel="nofollow"
                      style={{ fontWeight: "bold", color: "#1CAAD9" }}
                    >
                      Sketchfab
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        {selectedTopic && selectedChapter && selectedSubject && (
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.12)', padding: 32, minWidth: 320, maxWidth: 500, zIndex: 2000, textAlign: 'center' }}>
            <h2 style={{ color: '#e94560', marginBottom: 16 }}>{selectedTopic}</h2>
            <p style={{ fontSize: 18 }}>{topicContents[selectedSubject][selectedChapter][selectedTopic]}</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 32 }}>
      <button style={{ padding: '10px 24px', fontSize: 16, background: '#e94560', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}>Solve Quiz</button>
      <button onClick={() => {
        const topics = Object.keys(topicContents[selectedSubject][selectedChapter]);
        const idx = topics.indexOf(selectedTopic);
        if (idx < topics.length - 1) {
          setSelectedTopic(topics[idx + 1]);
        } else {
          setSelectedTopic(null);
        }
      }} style={{ padding: '10px 24px', fontSize: 16, background: '#1caad9', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}>Next</button>
    </div>
            <button onClick={() => setSelectedTopic(null)} style={{ marginTop: 24, padding: '10px 24px', fontSize: 16, background: '#e94560', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}>Close</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

