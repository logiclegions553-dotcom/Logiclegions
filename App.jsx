
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

  function handleSearch(e) {
    e.preventDefault();
    const term = searchTerm.trim().toLowerCase();
    setShowHeartDiagram(term === 'heart diagram' || term === 'heart');
    setShowRespiratoryDiagram(term === 'respiratory system');
  }

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
      <main className="mainContent">
        {activeSection === 'profile' && (
          <div className="searchSection">
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
          <div className="searchSection">
            <h1>Class Section</h1>
            <p>This is the class section. Add your class-related content here.</p>
          </div>
        )}
        {activeSection === 'quizzes' && (
          <div className="searchSection">
            <h1>Quizzes Section</h1>
            <p>This is the quizzes section. Add your quizzes-related content here.</p>
          </div>
        )}
        {activeSection === 'notebooks' && (
          <div className="searchSection">
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
      </main>
    </div>
  );
}

export default App;

