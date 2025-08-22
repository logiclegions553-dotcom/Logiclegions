import { useState, useEffect } from 'react';
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
    const [uploadedImage, setUploadedImage] = useState(null);
    const [subtopics, setSubtopics] = useState({
      Science: {
        'Introduction to Physics': ['Motion', 'Force', 'Energy'],
      },
      Maths: {
        'Algebra Fundamentals': ['Equations', 'Expressions', 'Functions'],
        'Geometry Basics': ['Shapes', 'Angles', 'Theorems']
      },
      Biology: {
        'Human Heart': ['Structure', 'Function', 'Diseases'],
        'Respiratory System': ['Organs', 'Process', 'Diseases']
      }
    });
    const topicContents = {
      Science: {
        'Introduction to Physics': {
          Motion: {
            title: 'Motion',
            points: [
              'Motion is the change in position of an object with respect to a reference point and time.',
              'If an object changes its position over time, it is said to be in motion.',
              'If it does not change its position, it is at rest.'
            ],
            types: [
              { name: 'Translational Motion', desc: 'Motion in which a body moves from one point to another in space.', example: 'A car moving on a road.', diagram: 'SphereAnimation' },
              { name: 'Rotational Motion', desc: 'Motion in which a body rotates about a fixed axis.', example: 'Rotation of Earth on its axis.', diagram: 'RotationalAnimation' },
              { name: 'Oscillatory Motion', desc: 'Motion that repeats itself in a regular time interval.', example: 'Motion of a pendulum.', diagram: 'OscillatoryAnimation' },
              { name: 'Random Motion', desc: 'Irregular and unpredictable motion.', example: 'Motion of dust particles in air.', diagram: 'RandomAnimation' }
            ],
            terms: [
              { name: 'Distance', desc: 'Total path covered by an object (scalar quantity).' },
              { name: 'Displacement', desc: 'Shortest straight-line distance between initial and final position (vector quantity).' },
              { name: 'Speed', desc: 'Distance traveled per unit time (scalar).' },
              { name: 'Velocity', desc: 'Displacement per unit time (vector).' },
              { name: 'Acceleration', desc: 'Rate of change of velocity.' }
            ]
          },
          Force: {
            title: 'Force',
            points: [
              'Force is a push or pull upon an object resulting from its interaction with another object.',
              'Force can change the state of motion of an object.',
              'Force can be contact (e.g., friction) or non-contact (e.g., gravity).' 
            ],
            types: [
              { name: 'Applied Force', desc: 'A force that is applied to an object by a person or another object.', example: 'Pushing a box.', diagram: 'ForceAnimation' },
              { name: 'Frictional Force', desc: 'A force that opposes the motion of an object.', example: 'Sliding a book on a table.', diagram: 'ForceAnimation' },
              { name: 'Gravitational Force', desc: 'A force that attracts objects toward the center of the Earth.', example: 'A ball falling down.', diagram: 'ForceAnimation' }
            ],
            terms: [
              { name: 'Magnitude', desc: 'The amount of force applied.' },
              { name: 'Direction', desc: 'The direction in which the force is applied.' }
            ]
          },
          Energy: {
            title: 'Energy',
            points: [
              'Energy is the ability to do work.',
              'Energy exists in different forms: kinetic, potential, thermal, etc.',
              'Energy can be transformed from one form to another.'
            ],
            types: [
              { name: 'Kinetic Energy', desc: 'Energy due to motion.', example: 'A moving car.', diagram: 'EnergyAnimation' },
              { name: 'Potential Energy', desc: 'Stored energy due to position.', example: 'A stretched bow.', diagram: 'EnergyAnimation' },
              { name: 'Thermal Energy', desc: 'Energy due to temperature.', example: 'Boiling water.', diagram: 'EnergyAnimation' }
            ],
            terms: [
              { name: 'Joule', desc: 'SI unit of energy.' },
              { name: 'Law of Conservation of Energy', desc: 'Energy cannot be created or destroyed, only transformed.' }
            ]
          }
        },

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
      },
      Biology: {
        'Human Heart': {
          Structure: {
            title: 'Structure of the Heart',
            points: [
              'What is the Heart?',
              'The heart is a muscular organ that pumps blood throughout the body via the circulatory system. It supplies oxygen and nutrients and removes carbon dioxide and waste products.',
              'Location and Size',
              'Located in the thoracic cavity, between the lungs (slightly to the left of the midline).',
              'About the size of a fist and weighs around 250–350 grams.',
              'Main Characteristics',
              'Type of muscle: Cardiac muscle (involuntary and striated).',
              'Protective covering: Pericardium (a double-walled sac filled with pericardial fluid).',
              'The heart is a muscular organ about the size of your fist, located just behind and slightly left of the breastbone.',
              'It consists of four chambers: two atria (upper chambers) and two ventricles (lower chambers).',
              'The chambers are separated by valves that prevent the backflow of blood.'
            ],
            types: [],
            terms: [
              { name: 'Aorta', desc: 'The largest artery in the body, carrying blood away from the heart to the rest of the body.' },
              { name: 'Atrium', desc: 'One of the two upper chambers of the heart that receive blood.' },
              { name: 'Ventricle', desc: 'One of the two lower chambers of the heart that pump blood out of the heart.' },
              { name: 'Valve', desc: 'A structure that opens and closes to control the flow of blood.' }
            ]
          },
          Function: {
            title: 'Function of the Heart',
            points: [
              'The heart pumps blood through the circulatory system, supplying oxygen and nutrients to the tissues and removing carbon dioxide and wastes.',
              'The right side of the heart receives deoxygenated blood from the body and pumps it to the lungs for oxygenation.',
              'The left side of the heart receives oxygenated blood from the lungs and pumps it to the rest of the body.'
            ],
            types: [],
            terms: [
              { name: 'Circulation', desc: 'The movement of blood through the heart and blood vessels.' },
              { name: 'Oxygenation', desc: 'The process of adding oxygen to the blood.' },
              { name: 'Deoxygenated', desc: 'Blood that is low in oxygen and high in carbon dioxide.' },
              { name: 'Oxygenated', desc: 'Blood that is rich in oxygen and low in carbon dioxide.' }
            ]
          },
          Diseases: {
            title: 'Diseases of the Heart',
            points: [
              'Common heart diseases include coronary artery disease, heart attack, and heart failure.',
              'Risk factors for heart disease include high blood pressure, high cholesterol, smoking, and diabetes.',
              'Maintaining a healthy lifestyle can reduce the risk of heart disease.'
            ],
            types: [],
            terms: [
              { name: 'Coronary Artery Disease', desc: 'A condition caused by the buildup of plaque in the coronary arteries, reducing blood flow to the heart muscle.' },
              { name: 'Heart Attack', desc: 'A medical emergency where the blood flow to a part of the heart is blocked, causing damage to the heart muscle.' },
              { name: 'Heart Failure', desc: 'A condition in which the heart cannot pump enough blood to meet the body\'s needs.' }
            ]
          }
        },
        'Respiratory System': {
          Organs: {
            title: 'Organs of the Respiratory System',
            points: [
              'The respiratory system includes the nose, throat, larynx, trachea, bronchi, and lungs.',
              'Air enters the body through the nose or mouth and travels down the trachea, which divides into two bronchi, one for each lung.',
              'The lungs are the main organs of respiration, where gas exchange occurs.'
            ],
            types: [],
            terms: [
              { name: 'Nose', desc: 'The external part of the respiratory system that filters, warms, and moistens air.' },
              { name: 'Trachea', desc: 'The windpipe; a tube that connects the larynx to the bronchi.' },
              { name: 'Bronchi', desc: 'The two main branches of the trachea that lead to the lungs.' },
              { name: 'Lungs', desc: 'The pair of organs in the chest that are responsible for breathing.' }
            ]
          },
          Process: {
            title: 'Process of Respiration',
            points: [
              'Respiration is the process of exchanging oxygen and carbon dioxide between the body and the environment.',
              'Inhalation brings oxygen-rich air into the lungs, and exhalation removes carbon dioxide-rich air.',
              'The diaphragm and intercostal muscles play a key role in breathing by contracting and relaxing to change the volume of the thoracic cavity.'
            ],
            types: [],
            terms: [
              { name: 'Inhalation', desc: 'The act of taking air into the lungs.' },
              { name: 'Exhalation', desc: 'The act of expelling air from the lungs.' },
              { name: 'Diaphragm', desc: 'The muscle that separates the chest cavity from the abdominal cavity and is involved in breathing.' },
              { name: 'Intercostal Muscles', desc: 'The muscles between the ribs that assist in breathing.' }
            ]
          },
          Diseases: {
            title: 'Diseases of the Respiratory System',
            points: [
              'Common respiratory diseases include asthma, chronic obstructive pulmonary disease (COPD), and pneumonia.',
              'Risk factors for respiratory diseases include smoking, air pollution, and respiratory infections.',
              'Preventive measures include avoiding smoking, reducing exposure to pollutants, and getting vaccinated against respiratory infections.'
            ],
            types: [],
            terms: [
              { name: 'Asthma', desc: 'A chronic disease that causes inflammation and narrowing of the airways, leading to difficulty in breathing.' },
              { name: 'COPD', desc: 'A group of lung diseases that block airflow and make it difficult to breathe.' },
              { name: 'Pneumonia', desc: 'An infection that inflames the air sacs in one or both lungs, which may fill with fluid.' }
            ]
          }
        }
      }
    }
  

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
                    {/* <li style={{ padding: '10px 0', fontSize: 17, borderBottom: '1px solid #eee', cursor: 'pointer' }} onClick={() => setSelectedSubject('Biology')}>Biology</li> */}
                    <li style={{ padding: '10px 0', fontSize: 17, borderBottom: '1px solid #eee', cursor: 'pointer' }} onClick={() => setSelectedSubject('Maths')}>Maths</li>
                    <li style={{ padding: '10px 0', fontSize: 17, borderBottom: '1px solid #eee', cursor: 'pointer' }} onClick={() => setSelectedSubject('Biology')}>Biology</li>
                  </ul>
                </div>
                {selectedSubject === 'Science' && (
                  <div style={{ marginTop: 24 , marginLeft: 60, right: 50 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <div>
                        <button
                          onClick={() => handleChapterClick('Introduction to Physics')}
                          style={{ padding: '10px 18px', fontSize: 16, background: '#e94560', color: '#fff', border: 'none', borderRadius: 8, marginBottom: 8, cursor: 'pointer', fontWeight: selectedChapter === 'Introduction to Physics' ? 'bold' : 'normal' }}
                        >
                          1. Introduction to Physics
                        </button>
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
                        <button
                          onClick={() => handleChapterClick('Basics of Chemistry')}
                          style={{ padding: '10px 18px', fontSize: 16, background: '#e94560', color: '#fff', border: 'none', borderRadius: 8, marginBottom: 8, cursor: 'pointer', fontWeight: selectedChapter === 'Basics of Chemistry' ? 'bold' : 'normal' }}
                        >
                          2. Basics of Chemistry
                        </button>
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
                        <button
                          onClick={() => handleChapterClick('Algebra Fundamentals')}
                          style={{ padding: '10px 18px', fontSize: 16, background: '#e94560', color: '#fff', border: 'none', borderRadius: 8, marginBottom: 8, cursor: 'pointer', fontWeight: selectedChapter === 'Algebra Fundamentals' ? 'bold' : 'normal' }}
                        >
                          1. Algebra Fundamentals
                        </button>
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
                        <button
                          onClick={() => handleChapterClick('Geometry Basics')}
                          style={{ padding: '10px 18px', fontSize: 16, background: '#e94560', color: '#fff', border: 'none', borderRadius: 8, marginBottom: 8, cursor: 'pointer', fontWeight: selectedChapter === 'Geometry Basics' ? 'bold' : 'normal' }}
                        >
                          2. Geometry Basics
                        </button>
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
                {selectedSubject === 'Biology' && (  
                  <div style={{ marginTop: 24 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <div>
                        <button
                          onClick={() => handleChapterClick('Human Heart')}
                          style={{ padding: '10px 18px', fontSize: 16, background: '#e94560', color: '#fff', border: 'none', borderRadius: 8, marginBottom: 8, cursor: 'pointer', fontWeight: selectedChapter === 'Human Heart' ? 'bold' : 'normal' }}
                        >
                          1. Human Heart
                        </button>
                        {selectedChapter === 'Human Heart' && (
                          <div style={{ marginTop: 8 }}>
                            <h5>Subtopics</h5>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                              {subtopics['Biology']['Human Heart'].map((topic, idx) => (
                                <button key={topic} onClick={() => setSelectedTopic(topic)} style={{ padding: '8px 16px', fontSize: 15, background: '#fff', color: '#e94560', border: '1px solid #e94560', borderRadius: 8, cursor: 'pointer', textAlign: 'left' }}>{`${idx + 1}. ${topic}`}</button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div>
                        <button
                          onClick={() => handleChapterClick('Respiratory System')}
                          style={{ padding: '10px 18px', fontSize: 16, background: '#e94560', color: '#fff', border: 'none', borderRadius: 8, marginBottom: 8, cursor: 'pointer', fontWeight: selectedChapter === 'Respiratory System' ? 'bold' : 'normal' }}
                        >
                          2. Respiratory System
                        </button>
                        {selectedChapter === 'Respiratory System' && (
                          <div style={{ marginTop: 8 }}>
                            <h5>Subtopics</h5>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                              {subtopics['Biology']['Respiratory System'].map((topic, idx) => (
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
  <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.12)', padding: 32, minWidth: 320, maxWidth: 600, maxHeight: 500, zIndex: 2000, textAlign: 'center', overflowY: 'auto' }}>
    {selectedSubject === 'Biology' && selectedChapter === 'Human Heart' && selectedTopic === 'Structure' ? (
      <div style={{ display: 'flex', gap: 32, textAlign: 'left' }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ color: '#e94560', marginBottom: 16 }}>{topicContents['Biology']['Human Heart']['Structure'].title}</h2>
          <ul style={{ marginBottom: 12 }}>
            {topicContents['Biology']['Human Heart']['Structure'].points.map((pt, i) => (
              <li key={i} style={{ marginBottom: 6 }}>{pt}</li>
            ))}
          </ul>
          <h4>Important Terms</h4>
          <ul>
            {topicContents['Biology']['Human Heart']['Structure'].terms.map((term, i) => (
              <li key={i} style={{ marginBottom: 6 }}><strong>{term.name}:</strong> {term.desc}</li>
            ))}
          </ul>
        </div>
        <div style={{ flex: 1 }}>
          <div className="sketchfab-embed-wrapper">
            <iframe title="[Animation] Human Heart" frameBorder="0" allowFullScreen mozAllowFullScreen="true" webkitAllowFullScreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" src="https://sketchfab.com/models/775d6629622740de8a5ed61a959c7506/embed" style={{ width: '100%', height: '400px', border: 'none' }}></iframe>
            <p style={{ fontSize: 13, fontWeight: 'normal', margin: 5, color: '#4A4A4A' }}>
              <a href="https://sketchfab.com/3d-models/animation-human-heart-775d6629622740de8a5ed61a959c7506?utm_medium=embed&utm_campaign=share-popup&utm_content=775d6629622740de8a5ed61a959c7506" target="_blank" rel="nofollow" style={{ fontWeight: 'bold', color: '#1CAAD9' }}>
                [Animation] Human Heart
              </a> by{' '}
              <a href="https://sketchfab.com/michel.paschalis?utm_medium=embed&utm_campaign=share-popup&utm_content=775d6629622740de8a5ed61a959c7506" target="_blank" rel="nofollow" style={{ fontWeight: 'bold', color: '#1CAAD9' }}>
                Michel Paschalis
              </a> on{' '}
              <a href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=775d6629622740de8a5ed61a959c7506" target="_blank" rel="nofollow" style={{ fontWeight: 'bold', color: '#1CAAD9' }}>
                Sketchfab
              </a>
            </p>
          </div>
        </div>
      </div>
    ) : (
      <>
        <h2 style={{ color: '#e94560', marginBottom: 16 }}>{typeof topicContents[selectedSubject][selectedChapter][selectedTopic] === 'object' ? topicContents[selectedSubject][selectedChapter][selectedTopic].title : selectedTopic}</h2>
        <div style={{ maxHeight: 320, overflowY: 'auto', marginBottom: 20, textAlign: 'left', paddingRight: 8 }}>
          {typeof topicContents[selectedSubject][selectedChapter][selectedTopic] === 'object' ? (
            <>
              <ul style={{ marginBottom: 12 }}>
                {topicContents[selectedSubject][selectedChapter][selectedTopic].points.map((pt, i) => (
                  <li key={i} style={{ marginBottom: 6 }}>{pt}</li>
                ))}
              </ul>
              <h4>Types of Motion</h4>
              <ul style={{ marginBottom: 12 }}>
                {topicContents[selectedSubject][selectedChapter][selectedTopic].types.map((type, i) => (
                  <li key={i} style={{ marginBottom: 6 }}>
                    <strong>{type.name}:</strong> {type.desc} <br />
                    <em>Example:</em> {type.example}
                    {type.diagram === 'SphereAnimation' && (
                      <div style={{ margin: '16px 0', height: 60, position: 'relative', background: '#f6f6f6', borderRadius: 8, overflow: 'hidden' }}>
                        <SphereAnimation />
                      </div>
                    )}
                    {type.diagram === 'RotationalAnimation' && (
                      <div style={{ margin: '16px 0', height: 60, position: 'relative', background: '#f6f6f6', borderRadius: 8, overflow: 'hidden' }}>
                        <RotationalAnimation />
                      </div>
                    )}
                    {type.diagram === 'OscillatoryAnimation' && (
                      <div style={{ margin: '16px 0', height: 60, position: 'relative', background: '#f6f6f6', borderRadius: 8, overflow: 'hidden' }}>
                        <OscillatoryAnimation />
                      </div>
                    )}
                    {type.diagram === 'RandomAnimation' && (
                      <div style={{ margin: '16px 0', height: 60, position: 'relative', background: '#f6f6f6', borderRadius: 8, overflow: 'hidden' }}>
                        <RandomAnimation />
                      </div>
                    )}
                    {type.diagram === 'ForceAnimation' && (
                      <div style={{ margin: '16px 0', height: 60, position: 'relative', background: '#f6f6f6', borderRadius: 8, overflow: 'hidden' }}>
                        <ForceAnimation type={type.name} />
                      </div>
                    )}
                    {type.diagram === 'EnergyAnimation' && (
                      <div style={{ margin: '16px 0', height: 60, position: 'relative', background: '#f6f6f6', borderRadius: 8, overflow: 'hidden' }}>
                        <EnergyAnimation type={type.name} />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
              <h4>Important Terms</h4>
              <ul>
                {topicContents[selectedSubject][selectedChapter][selectedTopic].terms.map((term, i) => (
                  <li key={i} style={{ marginBottom: 6 }}><strong>{term.name}:</strong> {term.desc}</li>
                ))}
              </ul>
            </>
          ) : (
            <p style={{ fontSize: 18 }}>{topicContents[selectedSubject][selectedChapter][selectedTopic]}</p>
          )}
          {uploadedImage && (
            <div style={{ marginBottom: 18 }}>
              <img src={uploadedImage} alt="Topic" style={{ maxWidth: '100%', maxHeight: 180, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
            </div>
          )}
        </div>
      </>
    )}
    <div style={{ margin: '18px 0' }}>
      <label htmlFor="topicImage" style={{ fontWeight: 500, marginRight: 10 }}>Upload an image for this topic:</label>
      <input id="topicImage" type="file" accept="image/*" onChange={e => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = ev => setUploadedImage(ev.target.result);
          reader.readAsDataURL(file);
        }
      }} />
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 32 }}>
      <button onClick={() => setSelectedTopic(null)} style={{ padding: '10px 24px', fontSize: 16, background: '#e94560', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}>Close</button>
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
  </div>
)}
        </main>
      </div>
    );

  function SphereAnimation() {
    const [pos, setPos] = useState(0);
    const [moving, setMoving] = useState(true);
    useEffect(() => {
      if (!moving) return;
      const interval = setInterval(() => {
        setPos(prev => {
          if (prev < 220) return prev + 4;
          setMoving(false);
          return prev;
        });
      }, 20);
      return () => clearInterval(interval);
    }, [moving]);
    return (
      <div style={{ position: 'relative', width: 240, height: 60 }}>
        {/* Markers A and B */}
        <span style={{ position: 'absolute', left: 0, top: 50, fontWeight: 'bold', color: '#e94560' }}>A</span>
        <span style={{ position: 'absolute', left: 220, top: 50, fontWeight: 'bold', color: '#1caad9' }}>B</span>
        <div style={{ position: 'absolute', left: pos, top: 10, width: 40, height: 40, borderRadius: '50%', background: '#1caad9', boxShadow: '0 2px 8px rgba(0,0,0,0.12)', transition: 'left 0.02s linear' }}></div>
      </div>
    );
  }
  function RotationalAnimation() {
    const [angle, setAngle] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
        setAngle(prev => (prev < 360 ? prev + 4 : prev));
      }, 20);
      return () => clearInterval(interval);
    }, []);
    return (
      <div style={{ position: 'relative', width: 120, height: 60 }}>
        <div style={{ position: 'absolute', left: 50, top: 10, width: 40, height: 40, borderRadius: '50%', background: '#1caad9', boxShadow: '0 2px 8px rgba(0,0,0,0.12)', transform: `rotate(${angle}deg)`, transition: 'transform 0.02s linear' }}></div>
        <span style={{ position: 'absolute', left: 68, top: 52, fontWeight: 'bold', color: '#e94560' }}>Axis</span>
      </div>
    );
  }
  function OscillatoryAnimation() {
    const [pos, setPos] = useState(0);
    const [dir, setDir] = useState(1);
    useEffect(() => {
      const interval = setInterval(() => {
        setPos(prev => {
          if (prev >= 80) setDir(-1);
          if (prev <= 0) setDir(1);
          return prev + dir * 4;
        });
      }, 20);
      return () => clearInterval(interval);
    }, [dir]);
    return (
      <div style={{ position: 'relative', width: 100, height: 60 }}>
        <div style={{ position: 'absolute', left: pos, top: 10, width: 40, height: 40, borderRadius: '50%', background: '#1caad9', boxShadow: '0 2px 8px rgba(0,0,0,0.12)', transition: 'left 0.02s linear' }}></div>
        <span style={{ position: 'absolute', left: 0, top: 52, fontWeight: 'bold', color: '#e94560' }}>Start</span>
        <span style={{ position: 'absolute', left: 80, top: 52, fontWeight: 'bold', color: '#1caad9' }}>End</span>
      </div>
    );
  }
  function RandomAnimation() {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    useEffect(() => {
      const interval = setInterval(() => {
        setPos({ x: Math.random() * 80, y: Math.random() * 20 });
      }, 300);
      return () => clearInterval(interval);
    }, []);
    return (
      <div style={{ position: 'relative', width: 100, height: 60 }}>
        <div style={{ position: 'absolute', left: pos.x, top: 10 + pos.y, width: 40, height: 40, borderRadius: '50%', background: '#1caad9', boxShadow: '0 2px 8px rgba(0,0,0,0.12)', transition: 'left 0.3s, top 0.3s' }}></div>
        <span style={{ position: 'absolute', left: 0, top: 52, fontWeight: 'bold', color: '#e94560' }}>Random</span>
      </div>
    );
  }
  function ForceAnimation({ type }) {
    if (type === 'Applied Force') {
      // Push box animation
      const [pos, setPos] = useState(0);
      const [moving, setMoving] = useState(true);
      useEffect(() => {
        if (!moving) return;
        const interval = setInterval(() => {
          setPos(prev => {
            if (prev < 120) return prev + 4;
            setMoving(false);
            return prev;
          });
        }, 20);
        return () => clearInterval(interval);
      }, [moving]);
      return (
        <div style={{ position: 'relative', width: 160, height: 60 }}>
          <span style={{ position: 'absolute', left: 0, top: 50, fontWeight: 'bold', color: '#e94560' }}>A</span>
          <span style={{ position: 'absolute', left: 120, top: 50, fontWeight: 'bold', color: '#1caad9' }}>B</span>
          <div style={{ position: 'absolute', left: pos, top: 20, width: 40, height: 20, background: '#1caad9', borderRadius: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.12)', transition: 'left 0.02s linear' }}></div>
        </div>
      );
    }
    if (type === 'Frictional Force') {
      // Book sliding and slowing down
      const [pos, setPos] = useState(0);
      const [speed, setSpeed] = useState(4);
      useEffect(() => {
        const interval = setInterval(() => {
          setPos(prev => {
            if (prev < 120 && speed > 0.5) {
              setSpeed(s => s * 0.97);
              return prev + speed;
            }
            return prev;
          });
        }, 20);
        return () => clearInterval(interval);
      }, [speed]);
      return (
        <div style={{ position: 'relative', width: 160, height: 60 }}>
          <span style={{ position: 'absolute', left: 0, top: 50, fontWeight: 'bold', color: '#e94560' }}>A</span>
          <span style={{ position: 'absolute', left: 120, top: 50, fontWeight: 'bold', color: '#1caad9' }}>B</span>
          <div style={{ position: 'absolute', left: pos, top: 20, width: 40, height: 10, background: '#e94560', borderRadius: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.12)', transition: 'left 0.02s linear' }}></div>
        </div>
      );
    }
    if (type === 'Gravitational Force') {
      // Ball falling down
      const [pos, setPos] = useState(0);
      const [falling, setFalling] = useState(true);
      useEffect(() => {
        if (!falling) return;
        const interval = setInterval(() => {
          setPos(prev => {
            if (prev < 40) return prev + 4;
            setFalling(false);
            return prev;
          });
        }, 20);
        return () => clearInterval(interval);
      }, [falling]);
      return (
        <div style={{ position: 'relative', width: 60, height: 60 }}>
          <span style={{ position: 'absolute', left: 20, top: 0, fontWeight: 'bold', color: '#e94560' }}>A</span>
          <span style={{ position: 'absolute', left: 20, top: 40, fontWeight: 'bold', color: '#1caad9' }}>B</span>
          <div style={{ position: 'absolute', left: 20, top: pos, width: 20, height: 20, borderRadius: '50%', background: '#1caad9', boxShadow: '0 2px 8px rgba(0,0,0,0.12)', transition: 'top 0.02s linear' }}></div>
        </div>
      );
    }
    return null;
  }
  function EnergyAnimation({ type }) {
    if (type === 'Kinetic Energy') {
      // Moving ball
      const [pos, setPos] = useState(0);
      const [moving, setMoving] = useState(true);
      useEffect(() => {
        if (!moving) return;
        const interval = setInterval(() => {
          setPos(prev => {
            if (prev < 120) return prev + 4;
            setMoving(false);
            return prev;
          });
        }, 20);
        return () => clearInterval(interval);
      }, [moving]);
      return (
        <div style={{ position: 'relative', width: 160, height: 60 }}>
          <span style={{ position: 'absolute', left: 0, top: 50, fontWeight: 'bold', color: '#e94560' }}>A</span>
          <span style={{ position: 'absolute', left: 120, top: 50, fontWeight: 'bold', color: '#1caad9' }}>B</span>
          <div style={{ position: 'absolute', left: pos, top: 20, width: 20, height: 20, borderRadius: '50%', background: '#1caad9', boxShadow: '0 2px 8px rgba(0,0,0,0.12)', transition: 'left 0.02s linear' }}></div>
        </div>
      );
    }
    if (type === 'Potential Energy') {
      // Ball at height
      return (
        <div style={{ position: 'relative', width: 60, height: 60 }}>
          <span style={{ position: 'absolute', left: 20, top: 0, fontWeight: 'bold', color: '#e94560' }}>A</span>
          <span style={{ position: 'absolute', left: 20, top: 40, fontWeight: 'bold', color: '#1caad9' }}>B</span>
          <div style={{ position: 'absolute', left: 20, top: 0, width: 20, height: 20, borderRadius: '50%', background: '#e94560', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}></div>
        </div>
      );
    }
    if (type === 'Thermal Energy') {
      // Boiling water (simple animated steam)
      const [steam, setSteam] = useState(0);
      useEffect(() => {
        const interval = setInterval(() => {
          setSteam(prev => (prev < 40 ? prev + 2 : 0));
        }, 100);
        return () => clearInterval(interval);
      }, []);
      return (
        <div style={{ position: 'relative', width: 60, height: 60 }}>
          <div style={{ position: 'absolute', left: 20, top: 40, width: 20, height: 20, borderRadius: '50%', background: '#1caad9', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}></div>
          <div style={{ position: 'absolute', left: 28, top: 40 - steam, width: 4, height: 20, borderRadius: 2, background: '#e94560', opacity: 0.5, transition: 'top 0.1s linear' }}></div>
          <span style={{ position: 'absolute', left: 20, top: 40, fontWeight: 'bold', color: '#e94560' }}>A</span>
          <span style={{ position: 'absolute', left: 20, top: 0, fontWeight: 'bold', color: '#1caad9' }}>B</span>
        </div>
      );
    }
    return null;
  }}
  export default App;

