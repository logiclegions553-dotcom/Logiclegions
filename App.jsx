
import { useState } from 'react';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showHeartDiagram, setShowHeartDiagram] = useState(false);
  const [showRespiratoryDiagram, setShowRespiratoryDiagram] = useState(false);

  function handleSearch(e) {
    e.preventDefault();
    const term = searchTerm.trim().toLowerCase();
    setShowHeartDiagram(term === 'heart diagram' || term === 'heart');
    setShowRespiratoryDiagram(term === 'respiratory system');
  }

  return (
    <div className="center-wrapper palette-bg" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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

      <div className="Searchresults" style={{ width: '100%' }}>
        <h1>Search Results</h1>
        {/* Show heart diagram if searched */}
        {showHeartDiagram && (
          <div className="sketchfab-embed-wrapper">
            <iframe
              title="[Animation] Human Heart"
              frameBorder="0"
              allowFullScreen
              mozAllowFullScreen="true"
              webkitAllowFullScreen="true"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              src="https://sketchfab.com/models/775d6629622740de8a5ed61a959c7506/embed"
              style={{ width: '100%', height: '480px', border: 'none' }}
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
  );
}

export default App;

