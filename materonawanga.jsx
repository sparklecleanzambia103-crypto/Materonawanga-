import { useState } from "react";

const SAMPLE_PROFILES = [
  { id: 1, name: "Chanda", age: 24, neighborhood: "Matero Main", bio: "Love dancing, cooking nsima, and long walks at Lusaka City Market 😄", interests: ["Dancing", "Cooking", "Music"], photo: "👩🏾" },
  { id: 2, name: "Mutale", age: 27, neighborhood: "Matero North", bio: "Footballer by heart, engineer by day. Looking for someone real 💯", interests: ["Football", "Music", "Travel"], photo: "👨🏾" },
  { id: 3, name: "Natasha", age: 22, neighborhood: "Chelstone", bio: "Student at UNZA, love Afrobeats and good vibes only ✨", interests: ["Afrobeats", "Fashion", "Reading"], photo: "👩🏿" },
  { id: 4, name: "Bwalya", age: 29, neighborhood: "Kaunda Square", bio: "Business minded. If you can cook, we already have something to talk about 😂", interests: ["Business", "Food", "Fitness"], photo: "👨🏿" },
  { id: 5, name: "Mwamba", age: 25, neighborhood: "Matero East", bio: "Church girl with a wild laugh. I make the best ifisashi in Matero 🍲", interests: ["Church", "Cooking", "Movies"], photo: "👩🏾" },
  { id: 6, name: "Kapasa", age: 31, neighborhood: "Chipata", bio: "Driver, hustler, family man in the making. Let's build together 🙏", interests: ["Football", "Church", "Family"], photo: "👨🏾" },
];

const PLANS = [
  { id: "basic", name: "Basic", price: 20, period: "1 week", features: ["Unlimited swipes", "See who liked you", "1 Profile Boost"] },
  { id: "gold", name: "Gold", price: 50, period: "1 month", features: ["Everything in Basic", "3 Profile Boosts", "Priority in search", "Read receipts"], popular: true },
  { id: "vip", name: "VIP", price: 120, period: "3 months", features: ["Everything in Gold", "Unlimited Boosts", "VIP badge on profile", "Featured on homepage"] },
];

const AIRTEL_NUMBER = "0970953082";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
  :root {
    --rose: #E63946; --pink: #FF6B8A; --blush: #FFB3C1;
    --dark: #1a0a0d; --gold: #FFD700; --green: #00C853;
  }
  body { font-family: 'DM Sans', sans-serif; background: var(--dark); color: white; overflow: hidden; height: 100vh; }
  .app { width: 100%; max-width: 430px; margin: 0 auto; height: 100vh; position: relative; overflow: hidden; background: var(--dark); }

  /* SPLASH */
  .splash { height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center;
    background: radial-gradient(ellipse at 30% 20%, #8b0000 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, #6b0020 0%, transparent 50%), var(--dark);
    padding:2rem; animation: splashIn 0.8s ease; }
  @keyframes splashIn { from{opacity:0;transform:scale(0.95)} to{opacity:1;transform:scale(1)} }
  .splash-heart { font-size:5rem; animation:heartbeat 1.5s ease infinite; margin-bottom:1rem; }
  @keyframes heartbeat { 0%,100%{transform:scale(1)} 50%{transform:scale(1.1)} }
  .splash h1 { font-family:'Playfair Display',serif; font-size:2.8rem; color:white; text-align:center; line-height:1.1; }
  .splash h1 span { color:var(--pink); font-style:italic; }
  .splash p { color:var(--blush); margin:1rem 0 2.5rem; text-align:center; font-size:0.95rem; opacity:0.8; }

  .btn-primary { background:linear-gradient(135deg,var(--rose),var(--pink)); color:white; border:none; padding:1rem 2.5rem;
    border-radius:50px; font-size:1rem; font-weight:500; cursor:pointer; width:100%; max-width:280px;
    box-shadow:0 8px 30px rgba(230,57,70,0.4); transition:transform 0.2s; font-family:'DM Sans',sans-serif; }
  .btn-primary:active { transform:scale(0.97); }
  .btn-secondary { background:transparent; color:var(--blush); border:1px solid rgba(255,179,193,0.3); padding:0.8rem 2rem;
    border-radius:50px; font-size:0.9rem; cursor:pointer; margin-top:0.8rem; width:100%; max-width:280px; font-family:'DM Sans',sans-serif; }

  /* ONBOARDING */
  .onboard { height:100vh; padding:2rem 1.5rem; display:flex; flex-direction:column;
    background:radial-gradient(ellipse at top, #3d0010 0%, var(--dark) 60%); }
  .onboard h2 { font-family:'Playfair Display',serif; font-size:1.8rem; margin:1.5rem 0 0.5rem; }
  .onboard p { color:var(--blush); font-size:0.9rem; margin-bottom:2rem; opacity:0.8; }
  .step-dots { display:flex; gap:6px; margin-bottom:1.5rem; }
  .dot { width:8px; height:8px; border-radius:50%; background:rgba(255,179,193,0.3); transition:all 0.3s; }
  .dot.active { width:24px; border-radius:4px; background:var(--pink); }
  .input-group { margin-bottom:1.2rem; }
  .input-group label { display:block; color:var(--blush); font-size:0.8rem; margin-bottom:0.4rem; text-transform:uppercase; letter-spacing:0.05em; }
  .input-group input, .input-group select, .input-group textarea {
    width:100%; background:rgba(255,255,255,0.07); border:1px solid rgba(255,179,193,0.2);
    color:white; padding:0.85rem 1rem; border-radius:12px; font-size:0.95rem;
    font-family:'DM Sans',sans-serif; outline:none; transition:border 0.2s; }
  .input-group input:focus, .input-group select:focus, .input-group textarea:focus { border-color:var(--pink); }
  .input-group select option { background:#1a0a0d; }
  .input-group textarea { resize:none; height:80px; }
  .emoji-picker { display:flex; gap:0.8rem; flex-wrap:wrap; margin-top:0.5rem; }
  .emoji-opt { font-size:2.2rem; cursor:pointer; padding:0.3rem; border-radius:50%; transition:transform 0.2s,background 0.2s; }
  .emoji-opt:active { transform:scale(1.2); }
  .emoji-opt.selected { background:rgba(255,107,138,0.2); }

  /* HOME */
  .home { height:100vh; display:flex; flex-direction:column; background:var(--dark); }
  .top-bar { display:flex; align-items:center; justify-content:space-between; padding:1.2rem 1.5rem 0.8rem; }
  .top-bar .logo { font-family:'Playfair Display',serif; font-size:1.3rem; color:var(--pink); font-style:italic; }
  .top-bar .icon-btn { background:rgba(255,255,255,0.07); border:none; color:white; width:40px; height:40px;
    border-radius:50%; font-size:1.1rem; cursor:pointer; display:flex; align-items:center; justify-content:center; }
  .card-stack { flex:1; position:relative; padding:0 1.2rem; }
  .profile-card { position:absolute; inset:0; margin:0 1.2rem; border-radius:24px; overflow:hidden;
    background:linear-gradient(145deg,#2a0a10,#1a0507); border:1px solid rgba(255,179,193,0.1);
    box-shadow:0 20px 60px rgba(0,0,0,0.5); transition:transform 0.3s ease,opacity 0.3s ease; cursor:grab; }
  .profile-card.swipe-left { transform:translateX(-120%) rotate(-15deg); opacity:0; }
  .profile-card.swipe-right { transform:translateX(120%) rotate(15deg); opacity:0; }
  .profile-card.behind { transform:scale(0.95) translateY(10px); opacity:0.6; }
  .card-photo { height:55%; display:flex; align-items:center; justify-content:center;
    background:radial-gradient(ellipse,#4a0a18 0%,#1a0507 100%); font-size:7rem; position:relative; }
  .like-badge, .nope-badge { position:absolute; top:1.5rem; padding:0.3rem 1rem; border-radius:6px;
    font-weight:700; font-size:1.2rem; opacity:0; transition:opacity 0.2s; border:3px solid; }
  .like-badge { left:1.5rem; color:#00ff88; border-color:#00ff88; transform:rotate(-15deg); }
  .nope-badge { right:1.5rem; color:var(--rose); border-color:var(--rose); transform:rotate(15deg); }
  .like-badge.show, .nope-badge.show { opacity:1; }
  .card-info { padding:1.2rem 1.5rem; }
  .card-name { font-family:'Playfair Display',serif; font-size:1.6rem; margin-bottom:0.2rem; }
  .card-meta { color:var(--blush); font-size:0.85rem; margin-bottom:0.8rem; opacity:0.7; }
  .card-bio { font-size:0.9rem; color:rgba(255,255,255,0.8); line-height:1.5; margin-bottom:1rem; }
  .card-tags { display:flex; gap:0.5rem; flex-wrap:wrap; }
  .tag { background:rgba(255,107,138,0.15); border:1px solid rgba(255,107,138,0.3); color:var(--blush); font-size:0.75rem; padding:0.25rem 0.7rem; border-radius:20px; }
  .action-bar { display:flex; justify-content:center; align-items:center; gap:1.5rem; padding:1rem 1.5rem 1.5rem; }
  .action-btn { border:none; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:1.4rem; transition:transform 0.2s; }
  .action-btn:active { transform:scale(0.9); }
  .btn-pass { width:56px; height:56px; background:rgba(255,255,255,0.07); color:#ff6b6b; }
  .btn-like { width:68px; height:68px; background:linear-gradient(135deg,var(--rose),var(--pink)); color:white; box-shadow:0 8px 25px rgba(230,57,70,0.4); }
  .btn-star { width:56px; height:56px; background:rgba(255,215,0,0.1); color:gold; }

  /* MATCH */
  .match-screen { height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center;
    background:radial-gradient(ellipse at center,#5a0020 0%,var(--dark) 70%); padding:2rem; text-align:center;
    animation:matchIn 0.5s ease; }
  @keyframes matchIn { from{opacity:0;transform:scale(0.9)} to{opacity:1;transform:scale(1)} }
  .match-emojis { font-size:4rem; margin-bottom:1rem; animation:bounce 0.6s ease infinite alternate; }
  @keyframes bounce { from{transform:translateY(0)} to{transform:translateY(-10px)} }
  .match-screen h2 { font-family:'Playfair Display',serif; font-size:2.2rem; color:var(--pink); margin-bottom:0.5rem; }
  .match-screen p { color:var(--blush); margin-bottom:2rem; opacity:0.8; }
  .match-profiles { display:flex; gap:1.5rem; margin-bottom:2rem; }
  .match-avatar { font-size:4rem; width:80px; height:80px; background:rgba(255,107,138,0.1); border:3px solid var(--pink); border-radius:50%; display:flex; align-items:center; justify-content:center; }

  /* CHAT */
  .chat-screen { height:100vh; display:flex; flex-direction:column; background:var(--dark); }
  .chat-header { padding:1rem 1.5rem; border-bottom:1px solid rgba(255,179,193,0.1); display:flex; align-items:center; gap:1rem; }
  .chat-avatar { font-size:2rem; width:44px; height:44px; background:rgba(255,107,138,0.1); border-radius:50%; display:flex; align-items:center; justify-content:center; }
  .chat-header h3 { font-family:'Playfair Display',serif; }
  .chat-header p { color:var(--blush); font-size:0.8rem; opacity:0.7; }
  .back-btn { background:none; border:none; color:var(--blush); font-size:1.2rem; cursor:pointer; margin-right:0.5rem; }
  .messages { flex:1; overflow-y:auto; padding:1rem 1.2rem; display:flex; flex-direction:column; gap:0.8rem; }
  .msg { max-width:75%; padding:0.7rem 1rem; border-radius:18px; font-size:0.9rem; line-height:1.4; animation:msgIn 0.3s ease; }
  @keyframes msgIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
  .msg.them { background:rgba(255,255,255,0.08); border-radius:18px 18px 18px 4px; align-self:flex-start; }
  .msg.me { background:linear-gradient(135deg,var(--rose),var(--pink)); border-radius:18px 18px 4px 18px; align-self:flex-end; }
  .chat-input-bar { padding:0.8rem 1rem 1.2rem; display:flex; gap:0.8rem; border-top:1px solid rgba(255,179,193,0.1); }
  .chat-input { flex:1; background:rgba(255,255,255,0.07); border:1px solid rgba(255,179,193,0.2); color:white;
    padding:0.75rem 1rem; border-radius:25px; font-size:0.9rem; font-family:'DM Sans',sans-serif; outline:none; }
  .send-btn { background:linear-gradient(135deg,var(--rose),var(--pink)); border:none; color:white; width:44px; height:44px; border-radius:50%; font-size:1rem; cursor:pointer; }

  /* MATCHES LIST */
  .matches-screen { height:100%; display:flex; flex-direction:column; }
  .matches-screen h2 { font-family:'Playfair Display',serif; padding:1.5rem 1.5rem 0.5rem; font-size:1.5rem; }
  .matches-list { flex:1; overflow-y:auto; padding:0.5rem 1rem; }
  .match-item { display:flex; align-items:center; gap:1rem; padding:0.8rem; border-radius:16px; cursor:pointer; transition:background 0.2s; margin-bottom:0.5rem; }
  .match-item:active { background:rgba(255,255,255,0.05); }
  .match-item .avatar { font-size:2rem; width:52px; height:52px; background:rgba(255,107,138,0.1); border:2px solid rgba(255,107,138,0.3); border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .match-item .info h4 { font-size:0.95rem; margin-bottom:0.2rem; }
  .match-item .info p { color:var(--blush); font-size:0.8rem; opacity:0.7; }
  .match-item .time { color:var(--blush); font-size:0.75rem; opacity:0.5; margin-left:auto; }

  /* PREMIUM SCREEN */
  .premium-screen { height:100vh; overflow-y:auto; padding:1.5rem; background:radial-gradient(ellipse at top,#3d1500 0%,var(--dark) 60%); }
  .premium-screen h2 { font-family:'Playfair Display',serif; font-size:1.8rem; text-align:center; margin-bottom:0.3rem; }
  .premium-screen .sub { color:var(--blush); text-align:center; font-size:0.85rem; opacity:0.8; margin-bottom:1.5rem; }
  .plan-card { background:rgba(255,255,255,0.05); border:1px solid rgba(255,179,193,0.15); border-radius:20px;
    padding:1.2rem; margin-bottom:1rem; cursor:pointer; transition:all 0.2s; position:relative; }
  .plan-card.selected { border-color:var(--pink); background:rgba(255,107,138,0.1); }
  .plan-card.popular::before { content:'POPULAR'; position:absolute; top:-10px; right:1rem;
    background:linear-gradient(135deg,var(--rose),var(--pink)); color:white; font-size:0.65rem;
    font-weight:700; padding:0.2rem 0.6rem; border-radius:20px; letter-spacing:0.05em; }
  .plan-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:0.8rem; }
  .plan-name { font-family:'Playfair Display',serif; font-size:1.2rem; }
  .plan-price { text-align:right; }
  .plan-price .amount { font-size:1.4rem; font-weight:700; color:var(--pink); }
  .plan-price .period { font-size:0.75rem; color:var(--blush); opacity:0.7; display:block; }
  .plan-features { list-style:none; }
  .plan-features li { font-size:0.82rem; color:rgba(255,255,255,0.75); padding:0.2rem 0; }
  .plan-features li::before { content:'✓ '; color:var(--green); font-weight:700; }

  /* PAYMENT MODAL */
  .payment-modal { position:fixed; inset:0; background:rgba(0,0,0,0.85); display:flex; align-items:flex-end;
    justify-content:center; z-index:100; animation:fadeIn 0.3s ease; }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  .payment-sheet { background:#1f0a0e; border-radius:24px 24px 0 0; padding:1.5rem; width:100%; max-width:430px;
    border-top:1px solid rgba(255,179,193,0.2); animation:slideUp 0.3s ease; }
  @keyframes slideUp { from{transform:translateY(100%)} to{transform:translateY(0)} }
  .payment-sheet h3 { font-family:'Playfair Display',serif; font-size:1.3rem; text-align:center; margin-bottom:0.3rem; }
  .payment-sheet .psub { color:var(--blush); text-align:center; font-size:0.82rem; opacity:0.8; margin-bottom:1.5rem; }
  .airtel-box { background:linear-gradient(135deg,#c8102e,#e63946); border-radius:16px; padding:1.2rem; margin-bottom:1rem; }
  .airtel-box .airtel-logo { font-size:1rem; font-weight:700; letter-spacing:0.05em; margin-bottom:0.8rem; opacity:0.9; }
  .airtel-steps { list-style:none; }
  .airtel-steps li { font-size:0.85rem; padding:0.3rem 0; display:flex; gap:0.6rem; align-items:flex-start; }
  .airtel-steps li .step-num { background:rgba(255,255,255,0.2); width:20px; height:20px; border-radius:50%;
    display:flex; align-items:center; justify-content:center; font-size:0.7rem; font-weight:700; flex-shrink:0; }
  .number-box { background:rgba(0,0,0,0.3); border-radius:10px; padding:0.8rem 1rem; margin:0.8rem 0;
    display:flex; justify-content:space-between; align-items:center; }
  .number-box .num { font-size:1.3rem; font-weight:700; letter-spacing:0.05em; }
  .copy-btn { background:rgba(255,255,255,0.2); border:none; color:white; padding:0.3rem 0.8rem;
    border-radius:8px; font-size:0.75rem; cursor:pointer; font-family:'DM Sans',sans-serif; }
  .copy-btn.copied { background:var(--green); }
  .ref-note { background:rgba(255,255,255,0.07); border-radius:12px; padding:0.8rem 1rem; margin-bottom:1rem;
    font-size:0.82rem; color:var(--blush); line-height:1.5; }
  .ref-note strong { color:white; }
  .amount-badge { display:inline-block; background:rgba(255,107,138,0.2); border:1px solid rgba(255,107,138,0.4);
    color:var(--pink); padding:0.2rem 0.8rem; border-radius:20px; font-weight:700; margin:0 0.2rem; }
  .close-sheet { background:rgba(255,255,255,0.07); border:none; color:var(--blush); width:100%;
    padding:0.8rem; border-radius:12px; font-size:0.9rem; cursor:pointer; font-family:'DM Sans',sans-serif; margin-top:0.5rem; }

  /* NAV */
  .bottom-nav { display:flex; justify-content:space-around; padding:0.8rem 0 1rem;
    border-top:1px solid rgba(255,179,193,0.1); background:rgba(26,5,7,0.95); }
  .nav-btn { background:none; border:none; color:rgba(255,255,255,0.4); font-size:1.3rem; cursor:pointer; padding:0.3rem 1rem; transition:color 0.2s; }
  .nav-btn.active { color:var(--pink); }
  .empty-state { text-align:center; padding:3rem 2rem; color:var(--blush); opacity:0.6; }
  .empty-state .icon { font-size:3rem; margin-bottom:1rem; }
  ::-webkit-scrollbar { width:0; }
`;

export default function Materonawanga() {
  const [screen, setScreen] = useState("splash");
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({ name: "", age: "", neighborhood: "Matero Main", bio: "", photo: "😊" });
  const [profiles] = useState(SAMPLE_PROFILES);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [swipeDir, setSwipeDir] = useState(null);
  const [matches, setMatches] = useState([]);
  const [matchedWith, setMatchedWith] = useState(null);
  const [activeChat, setActiveChat] = useState(null);
  const [chatMessages, setChatMessages] = useState({});
  const [msgInput, setMsgInput] = useState("");
  const [activeTab, setActiveTab] = useState("swipe");
  const [likeShow, setLikeShow] = useState(false);
  const [nopeShow, setNopeShow] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("gold");
  const [showPayment, setShowPayment] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  const neighborhoods = ["Matero Main","Matero North","Matero East","Chelstone","Kaunda Square","Chipata","Mandevu","Chawama","Kanyama"];
  const emojis = ["😊","👩🏾","👨🏾","👩🏿","👨🏿","👩🏻","👨🏻","🥰","😎"];

  const doSwipe = (dir) => {
    if (currentIdx >= profiles.length) return;
    const current = profiles[currentIdx];
    setSwipeDir(dir);
    if (dir === "right" && Math.random() > 0.4) {
      setTimeout(() => {
        setMatchedWith(current);
        setMatches(m => [...m, { ...current, lastMsg: "You matched! Say hi 👋", time: "now" }]);
        setScreen("match");
      }, 400);
    } else {
      setTimeout(() => { setSwipeDir(null); setCurrentIdx(i => i + 1); setLikeShow(false); setNopeShow(false); }, 400);
    }
  };

  const sendMessage = () => {
    if (!msgInput.trim() || !activeChat) return;
    const key = activeChat.id;
    const newMsg = { text: msgInput, from: "me" };
    setChatMessages(prev => ({ ...prev, [key]: [...(prev[key] || []), newMsg] }));
    setMsgInput("");
    setTimeout(() => {
      const replies = ["Haha 😂","That's nice!","Tell me more 😊","Eish! Really?","I like that 💕","You're funny 😄","Come on now 😏"];
      const reply = { text: replies[Math.floor(Math.random() * replies.length)], from: "them" };
      setChatMessages(prev => ({ ...prev, [key]: [...(prev[key] || []), reply] }));
    }, 1200);
  };

  const copyNumber = () => {
    navigator.clipboard?.writeText(AIRTEL_NUMBER).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const plan = PLANS.find(p => p.id === selectedPlan);
  const currentProfile = profiles[currentIdx];

  return (
    <>
      <style>{styles}</style>
      <div className="app">

        {/* SPLASH */}
        {screen === "splash" && (
          <div className="splash">
            <div className="splash-heart">💕</div>
            <h1>Matero<span>nawanga</span></h1>
            <p>Find love in your neighborhood 🇿🇲<br/>Matero & surrounding areas</p>
            <button className="btn-primary" onClick={() => setScreen("onboard")}>Get Started — It's Free</button>
            <button className="btn-secondary" onClick={() => { setProfile({ name: "Guest", age: "25", neighborhood: "Matero Main", bio: "", photo: "😊" }); setScreen("home"); }}>Browse as Guest</button>
          </div>
        )}

        {/* ONBOARDING */}
        {screen === "onboard" && (
          <div className="onboard">
            <div className="step-dots">{[0,1,2].map(i => <div key={i} className={`dot ${i===step?"active":""}`}/>)}</div>
            {step === 0 && (<>
              <h2>What's your name?</h2>
              <p>Let's set up your profile</p>
              <div className="input-group"><label>First Name</label><input placeholder="e.g. Chanda" value={profile.name} onChange={e=>setProfile({...profile,name:e.target.value})}/></div>
              <div className="input-group"><label>Age</label><input type="number" placeholder="e.g. 24" value={profile.age} onChange={e=>setProfile({...profile,age:e.target.value})}/></div>
              <div style={{marginTop:"auto"}}><button className="btn-primary" style={{maxWidth:"100%"}} onClick={()=>profile.name&&profile.age&&setStep(1)}>Continue →</button></div>
            </>)}
            {step === 1 && (<>
              <h2>Where are you from?</h2>
              <p>Find people near you</p>
              <div className="input-group"><label>Neighborhood</label>
                <select value={profile.neighborhood} onChange={e=>setProfile({...profile,neighborhood:e.target.value})}>
                  {neighborhoods.map(n=><option key={n}>{n}</option>)}
                </select>
              </div>
              <div className="input-group"><label>About You</label><textarea placeholder="Tell people something about yourself..." value={profile.bio} onChange={e=>setProfile({...profile,bio:e.target.value})}/></div>
              <div style={{marginTop:"auto"}}><button className="btn-primary" style={{maxWidth:"100%"}} onClick={()=>setStep(2)}>Continue →</button></div>
            </>)}
            {step === 2 && (<>
              <h2>Pick your avatar</h2>
              <p>Choose what represents you</p>
              <div className="emoji-picker">{emojis.map(e=><span key={e} className={`emoji-opt ${profile.photo===e?"selected":""}`} onClick={()=>setProfile({...profile,photo:e})}>{e}</span>)}</div>
              <div style={{marginTop:"auto"}}><button className="btn-primary" style={{maxWidth:"100%"}} onClick={()=>setScreen("home")}>Start Finding Matches 💕</button></div>
            </>)}
          </div>
        )}

        {/* HOME */}
        {screen === "home" && (
          <div className="home">
            <div className="top-bar">
              <span className="logo">Materonawanga {isPremium && <span style={{fontSize:"0.7rem",color:"gold"}}>⭐ VIP</span>}</span>
              <div style={{display:"flex",gap:"0.5rem"}}>
                <button className="icon-btn" onClick={()=>setActiveTab("matches")}>💌</button>
                <button className="icon-btn" onClick={()=>setActiveTab("premium")}>👑</button>
              </div>
            </div>

            {/* SWIPE TAB */}
            {activeTab === "swipe" && (
              <>
                <div className="card-stack">
                  {currentIdx < profiles.length ? (<>
                    {profiles[currentIdx+1] && (
                      <div className="profile-card behind" style={{zIndex:1}}>
                        <div className="card-photo">{profiles[currentIdx+1].photo}</div>
                      </div>
                    )}
                    <div className={`profile-card ${swipeDir==="left"?"swipe-left":""} ${swipeDir==="right"?"swipe-right":""}`} style={{zIndex:2}}>
                      <div className="card-photo">
                        <span>{currentProfile.photo}</span>
                        <div className={`like-badge ${likeShow?"show":""}`}>LIKE</div>
                        <div className={`nope-badge ${nopeShow?"show":""}`}>NOPE</div>
                      </div>
                      <div className="card-info">
                        <div className="card-name">{currentProfile.name}, {currentProfile.age}</div>
                        <div className="card-meta">📍 {currentProfile.neighborhood}</div>
                        <div className="card-bio">{currentProfile.bio}</div>
                        <div className="card-tags">{currentProfile.interests.map(i=><span key={i} className="tag">{i}</span>)}</div>
                      </div>
                    </div>
                  </>) : (
                    <div className="empty-state" style={{paddingTop:"4rem"}}>
                      <div className="icon">😅</div>
                      <p>You've seen everyone nearby!</p>
                      <button className="btn-primary" style={{marginTop:"1.5rem",maxWidth:"200px"}} onClick={()=>setCurrentIdx(0)}>Start Over</button>
                    </div>
                  )}
                </div>
                {currentIdx < profiles.length && (
                  <div className="action-bar">
                    <button className="action-btn btn-pass" onClick={()=>{setNopeShow(true);setTimeout(()=>doSwipe("left"),200);}}>✕</button>
                    <button className="action-btn btn-like" onClick={()=>{setLikeShow(true);setTimeout(()=>doSwipe("right"),200);}}>♥</button>
                    <button className="action-btn btn-star" onClick={()=>{setLikeShow(true);setTimeout(()=>doSwipe("right"),200);}}>★</button>
                  </div>
                )}
              </>
            )}

            {/* MATCHES TAB */}
            {activeTab === "matches" && (
              <div className="matches-screen" style={{height:"calc(100vh - 120px)"}}>
                <h2>Your Matches 💕</h2>
                <div className="matches-list">
                  {matches.length === 0 ? (
                    <div className="empty-state"><div className="icon">💔</div><p>No matches yet</p><p style={{fontSize:"0.85rem",marginTop:"0.5rem"}}>Keep swiping!</p></div>
                  ) : matches.map(m=>(
                    <div key={m.id} className="match-item" onClick={()=>{setActiveChat(m);setActiveTab("chat");}}>
                      <div className="avatar">{m.photo}</div>
                      <div className="info"><h4>{m.name}, {m.age}</h4><p>{chatMessages[m.id]?.slice(-1)[0]?.text||m.lastMsg}</p></div>
                      <span className="time">{m.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CHAT TAB */}
            {activeTab === "chat" && activeChat && (
              <div className="chat-screen" style={{height:"calc(100vh - 60px)"}}>
                <div className="chat-header">
                  <button className="back-btn" onClick={()=>setActiveTab("matches")}>←</button>
                  <div className="chat-avatar">{activeChat.photo}</div>
                  <div><h3>{activeChat.name}</h3><p>{activeChat.neighborhood}</p></div>
                </div>
                <div className="messages">
                  <div className="msg them">Hey! We matched 😊 How are you?</div>
                  {(chatMessages[activeChat.id]||[]).map((m,i)=><div key={i} className={`msg ${m.from}`}>{m.text}</div>)}
                </div>
                <div className="chat-input-bar">
                  <input className="chat-input" placeholder="Type a message..." value={msgInput} onChange={e=>setMsgInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMessage()}/>
                  <button className="send-btn" onClick={sendMessage}>➤</button>
                </div>
              </div>
            )}

            {/* PREMIUM TAB */}
            {activeTab === "premium" && (
              <div style={{height:"calc(100vh - 60px)",overflowY:"auto"}}>
                <div className="premium-screen">
                  <div style={{fontSize:"2.5rem",textAlign:"center",marginBottom:"0.5rem"}}>👑</div>
                  <h2>Go Premium</h2>
                  <p className="sub">Unlock the full Materonawanga experience</p>

                  {isPremium ? (
                    <div style={{textAlign:"center",padding:"2rem",background:"rgba(255,215,0,0.1)",borderRadius:"20px",border:"1px solid rgba(255,215,0,0.3)"}}>
                      <div style={{fontSize:"3rem",marginBottom:"0.8rem"}}>⭐</div>
                      <p style={{color:"gold",fontFamily:"'Playfair Display',serif",fontSize:"1.2rem"}}>You're a Premium Member!</p>
                      <p style={{color:"var(--blush)",fontSize:"0.85rem",marginTop:"0.5rem",opacity:0.8}}>Enjoy all the exclusive features</p>
                    </div>
                  ) : (<>
                    {PLANS.map(p=>(
                      <div key={p.id} className={`plan-card ${selectedPlan===p.id?"selected":""} ${p.popular?"popular":""}`} onClick={()=>setSelectedPlan(p.id)}>
                        <div className="plan-header">
                          <div className="plan-name">{p.name}</div>
                          <div className="plan-price"><span className="amount">K{p.price}</span><span className="period">{p.period}</span></div>
                        </div>
                        <ul className="plan-features">{p.features.map(f=><li key={f}>{f}</li>)}</ul>
                      </div>
                    ))}
                    <button className="btn-primary" style={{maxWidth:"100%",marginTop:"0.5rem"}} onClick={()=>setShowPayment(true)}>
                      Pay with Airtel Money — K{plan?.price}
                    </button>
                  </>)}
                </div>
              </div>
            )}

            {activeTab !== "chat" && (
              <div className="bottom-nav">
                <button className={`nav-btn ${activeTab==="swipe"?"active":""}`} onClick={()=>setActiveTab("swipe")}>🔥</button>
                <button className={`nav-btn ${activeTab==="matches"?"active":""}`} onClick={()=>setActiveTab("matches")}>💌</button>
                <button className={`nav-btn ${activeTab==="premium"?"active":""}`} onClick={()=>setActiveTab("premium")}>👑</button>
                <button className="nav-btn">👤</button>
              </div>
            )}
          </div>
        )}

        {/* MATCH CELEBRATION */}
        {screen === "match" && matchedWith && (
          <div className="match-screen">
            <div className="match-emojis">🎉💕🎉</div>
            <h2>It's a Match!</h2>
            <p>You and {matchedWith.name} liked each other!</p>
            <div className="match-profiles">
              <div className="match-avatar">{profile.photo||"😊"}</div>
              <div style={{fontSize:"2rem",alignSelf:"center"}}>❤️</div>
              <div className="match-avatar">{matchedWith.photo}</div>
            </div>
            <button className="btn-primary" onClick={()=>{setActiveChat(matchedWith);setActiveTab("chat");setScreen("home");setSwipeDir(null);setCurrentIdx(i=>i+1);}}>Send a Message</button>
            <button className="btn-secondary" onClick={()=>{setScreen("home");setSwipeDir(null);setCurrentIdx(i=>i+1);}}>Keep Swiping</button>
          </div>
        )}

        {/* AIRTEL MONEY PAYMENT SHEET */}
        {showPayment && plan && (
          <div className="payment-modal" onClick={e=>e.target.className==="payment-modal"&&setShowPayment(false)}>
            <div className="payment-sheet">
              <h3>Pay with Airtel Money</h3>
              <p className="psub">Activate <strong>{plan.name}</strong> plan — <span style={{color:"var(--pink)"}}>K{plan.price}</span> for {plan.period}</p>

              <div className="airtel-box">
                <div className="airtel-logo">📱 AIRTEL MONEY</div>
                <ul className="airtel-steps">
                  <li><span className="step-num">1</span><span>Dial <strong>*778#</strong> on your Airtel line</span></li>
                  <li><span className="step-num">2</span><span>Select <strong>"Send Money"</strong></span></li>
                  <li><span className="step-num">3</span><span>Enter this number:</span></li>
                </ul>
                <div className="number-box">
                  <span className="num">{AIRTEL_NUMBER}</span>
                  <button className={`copy-btn ${copied?"copied":""}`} onClick={copyNumber}>{copied?"Copied ✓":"Copy"}</button>
                </div>
                <ul className="airtel-steps">
                  <li><span className="step-num">4</span><span>Enter amount: <strong>K{plan.price}</strong></span></li>
                  <li><span className="step-num">5</span><span>Use your name as reference</span></li>
                  <li><span className="step-num">6</span><span>Confirm with your PIN</span></li>
                </ul>
              </div>

              <div className="ref-note">
                📌 After paying, send your <strong>transaction ID</strong> to <strong>{AIRTEL_NUMBER}</strong> on WhatsApp with the message: <br/><br/>
                <em>"Materonawanga {plan.name} - [your name]"</em><br/><br/>
                Your account will be activated within <strong>1 hour</strong>.
              </div>

              <button className="btn-primary" style={{maxWidth:"100%",marginBottom:"0.5rem"}} onClick={()=>{setShowPayment(false);setIsPremium(true);setActiveTab("premium");}}>
                I've Paid — Activate My Account ✓
              </button>
              <button className="close-sheet" onClick={()=>setShowPayment(false)}>Cancel</button>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
