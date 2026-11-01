import React, { useState } from 'react';

export default function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [role, setRole] = useState('athlete');
  const [toast, setToast] = useState('');
  const [sportFilter, setSportFilter] = useState('all');
  const [selectedCase, setSelectedCase] = useState(null);
  const [formData, setFormData] = useState({ category: '', details: '', privacy: 'anonymous', fileName: '' });

  const [cases, setCases] = useState([
    {
      id: 'SP-2026-8921',
      category: 'Verbal Abuse & Harassment',
      date: '2026-10-24',
      status: 'In Review',
      progress: 65,
      investigator: 'IC Officer A. Sharma (Neutral Panel)',
      details: 'Unprofessional language and severe intimidation reported during evening training session.',
      timeline: [
        { title: 'Report Submitted Encrypted', date: '2026-10-24', done: true },
        { title: 'IC Reviewer Assigned', date: '2026-10-25', done: true },
        { title: 'Witness Testimony Verification', date: 'In Progress', done: false },
        { title: 'Final Decision & Action Plan', date: 'Pending', done: false }
      ]
    },
    {
      id: 'SP-2026-4012',
      category: 'Unsafe Training Environment',
      date: '2026-10-15',
      status: 'Resolved',
      progress: 100,
      investigator: 'Committee B. Patel',
      details: 'Defective gymnasium safety equipment reported. Equipment replaced and safety verified.',
      timeline: [
        { title: 'Report Submitted', date: '2026-10-15', done: true },
        { title: 'Equipment Inspection', date: '2026-10-18', done: true },
        { title: 'Resolved & Facility Certified', date: '2026-10-20', done: true }
      ]
    }
  ]);

  const coaches = [
    { id: 1, name: "Rajesh Kumar", sport: "athletics", location: "Delhi NCR", cert: "SAI Certified Senior Coach", avail: "Immediate Transfer Available" },
    { id: 2, name: "Ananya Sen", sport: "badminton", location: "Bengaluru", cert: "BWF Certified Level 2", avail: "Available Next Week" },
    { id: 3, name: "Vikram Singh", sport: "boxing", location: "Patiala", cert: "NIS Gold Medalist Coach", avail: "Immediate Transfer Available" },
    { id: 4, name: "Meera Joshi", sport: "swimming", location: "Mumbai", cert: "FINA Certified Trainer", avail: "Limited Slots" }
  ];

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleRoleSwitch = (newRole) => {
    setRole(newRole);
    if (newRole === 'reviewer') {
      setActiveScreen('dashboard');
      triggerToast('Switched to IC Reviewer Panel Mode');
    } else {
      setActiveScreen('home');
      triggerToast('Switched to Athlete Portal View');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newId = `SP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCase = {
      id: newId,
      category: formData.category,
      date: '2026-11-01',
      status: 'Submitted',
      progress: 25,
      investigator: 'Pending Assignment',
      details: formData.details,
      timeline: [
        { title: 'Report Logged Encrypted', date: '2026-11-01', done: true },
        { title: 'Assigning IC Investigator', date: 'In Progress', done: false }
      ]
    };
    setCases([newCase, ...cases]);
    triggerToast(`Report ${newId} Logged Encrypted!`);
    setFormData({ category: '', details: '', privacy: 'anonymous', fileName: '' });
    setActiveScreen('dashboard');
  };

  const filteredCoaches = sportFilter === 'all' 
    ? coaches 
    : coaches.filter(c => c.sport === sportFilter);

  return (
    <div style={{ backgroundColor: '#0b0f19' }} className="flex flex-col items-center min-h-screen text-slate-900">
      
      {toast && (
        <div className="fixed top-4 z-50 bg-slate-900 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-xl border border-slate-700">
          {toast}
        </div>
      )}

      {/* Top Navbar */}
      <header className="w-full max-w-[480px] bg-slate-900 text-white p-4 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-xl shadow-lg">
            🛡️
          </div>
          <div>
            <h1 className="font-extrabold text-lg leading-tight flex items-center gap-2">
              SafePlay <span className="bg-blue-500 text-[9px] px-1.5 py-0.5 rounded font-bold">PRO</span>
            </h1>
            <p className="text-slate-400 text-[10px]">Athlete Protection Governance</p>
          </div>
        </div>

        <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button 
            onClick={() => handleRoleSwitch('athlete')}
            className={`px-2.5 py-1 text-[10px] font-semibold rounded-md flex items-center gap-1.5 ${role === 'athlete' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Athlete
          </button>
          <button 
            onClick={() => handleRoleSwitch('reviewer')}
            className={`px-2.5 py-1 text-[10px] font-semibold rounded-md flex items-center gap-1.5 ${role === 'reviewer' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span> Reviewer
          </button>
        </div>
      </header>

      {/* Main Viewport Container */}
      <main className="w-full max-w-[480px] bg-slate-50 min-h-[88vh] p-5 shadow-2xl relative">

        {/* SCREEN 1: HOME */}
        {activeScreen === 'home' && (
          <div className="space-y-5">
            <div className="bg-gradient-to-br from-blue-900 to-blue-600 text-white p-5 rounded-2xl shadow-lg">
              <span className="bg-white/20 text-[10px] px-2.5 py-1 rounded-full font-semibold">🔒 100% Encrypted & Anonymous</span>
              <h2 className="text-lg font-bold mt-2">Protected Athlete Environment</h2>
              <p className="text-xs text-blue-100 mt-1 leading-relaxed">Report safety concerns without fear of retaliation & transfer coaches smoothly.</p>
              
              <div className="flex items-center gap-6 mt-4 pt-3 border-t border-white/20">
                <div>
                  <strong className="text-base block">100%</strong>
                  <span className="text-[10px] text-blue-200">Identity Privacy</span>
                </div>
                <div className="w-[1px] h-6 bg-white/20"></div>
                <div>
                  <strong className="text-base block">24/7</strong>
                  <span className="text-[10px] text-blue-200">Legal & Med Support</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-800">Core Action Hub</h3>
              <p className="text-xs text-slate-500">Select a verified service below</p>
            </div>

            <div className="space-y-3">
              <div onClick={() => setActiveScreen('report')} className="bg-white p-4 rounded-xl border border-slate-200 border-l-4 border-l-blue-600 flex items-center gap-3 cursor-pointer hover:shadow-md transition">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-lg">📝</div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold">Report a Concern</h4>
                  <p className="text-[11px] text-slate-500">File a secure incident report</p>
                </div>
                <span className="text-slate-400 font-bold">→</span>
              </div>

              <div onClick={() => setActiveScreen('support')} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3 cursor-pointer hover:shadow-md transition">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-lg">🆘</div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold">Get Support Network</h4>
                  <p className="text-[11px] text-slate-500">Emergency Helpline & Legal Aid</p>
                </div>
                <span className="text-slate-400 font-bold">→</span>
              </div>

              <div onClick={() => setActiveScreen('coach')} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3 cursor-pointer hover:shadow-md transition">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-lg">👟</div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold">Find Alternative Coach</h4>
                  <p className="text-[11px] text-slate-500">Seamless safe transfer</p>
                </div>
                <span className="text-slate-400 font-bold">→</span>
              </div>

              <div onClick={() => setActiveScreen('dashboard')} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3 cursor-pointer hover:shadow-md transition">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-lg">⚖️</div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold">Investigation Status</h4>
                  <p className="text-[11px] text-slate-500">Track active report case progress</p>
                </div>
                <span className="text-slate-400 font-bold">→</span>
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 2: REPORT A CONCERN */}
        {activeScreen === 'report' && (
          <div>
            <button onClick={() => setActiveScreen('home')} className="text-blue-600 text-xs font-bold mb-3">← Back to Dashboard</button>
            <h2 className="text-lg font-bold">File a Safety Report</h2>
            <p className="text-xs text-slate-500 mb-4">Your identity remains strictly confidential.</p>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1">Category *</label>
                <select 
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs"
                >
                  <option value="">Select category...</option>
                  <option value="Verbal Abuse & Harassment">Verbal Abuse / Intimidation</option>
                  <option value="Unsafe Training Environment">Unsafe Equipment / Facility Hazard</option>
                  <option value="Selection Bias & Discrimination">Selection Bias / Exclusion</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Incident Overview *</label>
                <textarea 
                  required
                  rows="4"
                  value={formData.details}
                  onChange={(e) => setFormData({...formData, details: e.target.value})}
                  placeholder="Describe facts (date, location, overview)..."
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Attach Evidence (Optional Demo)</label>
                <input 
                  type="file" 
                  onChange={(e) => setFormData({...formData, fileName: e.target.files[0]?.name || ''})}
                  className="w-full text-xs p-2 bg-slate-100 rounded-lg"
                />
              </div>

              <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-lg">
                Submit Encrypted Report
              </button>
            </form>
          </div>
        )}

        {/* SCREEN 3: GET SUPPORT */}
        {activeScreen === 'support' && (
          <div>
            <button onClick={() => setActiveScreen('home')} className="text-blue-600 text-xs font-bold mb-3">← Back to Dashboard</button>
            <h2 className="text-lg font-bold">Support & Protection Network</h2>
            <p className="text-xs text-slate-500 mb-4">Immediate helpline & fair process access.</p>

            <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-center gap-3 mb-5">
              <div className="text-2xl">🚨</div>
              <div>
                <strong className="text-xs text-slate-800">24/7 National Athlete Support Helpline</strong>
                <div className="text-sm font-extrabold text-red-600">1800-419-SAFE (7233)</div>
              </div>
            </div>

            <h3 className="text-xs font-bold text-slate-800 mb-3">Fair Investigation Protocol</h3>
            <div className="space-y-2">
              {['Confidential Logging', 'Neutral Committee Review', 'Objective Hearing', 'Career Transfer Order'].map((step, idx) => (
                <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 text-xs font-extrabold flex items-center justify-center">{idx + 1}</span>
                  <span className="text-xs font-semibold text-slate-700">{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SCREEN 4: FIND ANOTHER COACH */}
        {activeScreen === 'coach' && (
          <div>
            <button onClick={() => setActiveScreen('home')} className="text-blue-600 text-xs font-bold mb-3">← Back to Dashboard</button>
            <h2 className="text-lg font-bold">Career Continuity Directory</h2>
            <p className="text-xs text-slate-500 mb-4">Transfer safely without losing training progress.</p>

            <select 
              value={sportFilter}
              onChange={(e) => setSportFilter(e.target.value)}
              className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs mb-4"
            >
              <option value="all">All Disciplines</option>
              <option value="athletics">Athletics</option>
              <option value="badminton">Badminton</option>
              <option value="boxing">Boxing</option>
              <option value="swimming">Swimming</option>
            </select>

            <div className="space-y-3">
              {filteredCoaches.map(c => (
                <div key={c.id} className="bg-white p-4 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-center">
                    <strong className="text-xs font-bold">{c.name}</strong>
                    <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded">✔️ Verified</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Location: {c.location}</p>
                  <p className="text-[11px] text-slate-600">{c.cert}</p>
                  <button 
                    onClick={() => triggerToast(`Transfer request sent for ${c.name}`)}
                    className="w-full mt-3 py-2 bg-slate-100 text-slate-700 font-semibold text-xs rounded-lg border border-slate-200"
                  >
                    Initiate Safe Transfer
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SCREEN 5: FAIR INVESTIGATION DASHBOARD */}
        {activeScreen === 'dashboard' && (
          <div>
            <button onClick={() => setActiveScreen('home')} className="text-blue-600 text-xs font-bold mb-3">← Back to Dashboard</button>
            <h2 className="text-lg font-bold">Fair Investigation Dashboard</h2>
            <p className="text-xs text-slate-500 mb-4">Neutral progress tracking panel.</p>

            <div className="space-y-3">
              {cases.map(c => (
                <div key={c.id} className="bg-white p-4 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-center">
                    <strong className="text-xs font-bold">Case: {c.id}</strong>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {c.status}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-800 mt-2">{c.category}</p>
                  
                  <div className="w-full bg-slate-100 h-1.5 rounded-full my-2 overflow-hidden">
                    <div className="bg-blue-600 h-full transition-all" style={{ width: `${c.progress}%` }}></div>
                  </div>

                  <button 
                    onClick={() => setSelectedCase(c)}
                    className="w-full mt-2 py-1.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg"
                  >
                    View Timeline Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Case Details Modal */}
      {selectedCase && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white max-w-[400px] w-full p-5 rounded-2xl relative shadow-2xl">
            <button onClick={() => setSelectedCase(null)} className="absolute top-3 right-3 text-slate-400 font-bold">✕</button>
            <h3 className="text-sm font-bold">Case Timeline: {selectedCase.id}</h3>
            <p className="text-xs text-slate-500 mb-3">{selectedCase.category}</p>
            
            <div className="space-y-2 mt-4">
              {selectedCase.timeline.map((t, idx) => (
                <div key={idx} className={`border-l-2 pl-3 py-1 ${t.done ? 'border-emerald-500' : 'border-slate-200'}`}>
                  <strong className="text-xs block">{t.title}</strong>
                  <span className="text-[10px] text-slate-400">{t.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}