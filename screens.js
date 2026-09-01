/* Mentora web prototype - screens, router and interaction. */
(() => {
'use strict';
const M = window.__M, S = M.S;
const {T, kid, esc, orb, bar, milestone, row, icon, status} = M;
const el = document.getElementById('screen');

/* ─────────────────────────── onboarding ─────────────────────────── */

function obWelcome(){
  return `<div class="pad center" style="justify-content:center;flex:1;gap:22px;padding-top:40px">
    ${orb(168, true)}
    <h1 class="disp" style="font-size:34px;line-height:1.05">Meet your own<br>private teacher</h1>
    <p style="font-size:15px;color:var(--muted);margin:0">Your Private Teacher. For Anything. For Life.</p>
    <div style="display:flex;gap:8px;margin-top:6px"><span class="chip">Ages 2 to 60+</span><span class="chip">Teaches anything</span></div>
  </div>`;
}
function obWho(){
  return `<div class="pad" style="gap:18px">
    <div><h2 class="disp" style="font-size:30px">Who’s learning?</h2><p class="h-sub">So your tutor knows who they’re talking to.</p></div>
    <div><div class="lab" style="margin-bottom:8px">Name</div>
      <input class="input" id="nm" value="${esc(S.name)}" placeholder="First name" autocomplete="off"></div>
    <div><div class="lab" style="margin-bottom:8px">Age</div>
      <div style="display:flex;flex-direction:column;gap:9px">
      ${Object.entries(M.AGES).map(([k,a])=>`<button class="row" data-a="ob-age" data-arg="${k}"
        style="border-color:${S.age===k?'var(--teal-text)':'var(--border)'};border-width:${S.age===k?2:1.5}px">
        <span class="t"><b>${a.label}</b><small>${a.blurb}</small></span>
        <span style="font-size:19px;color:${S.age===k?'var(--teal-text)':'var(--border)'}">${S.age===k?'◉':'○'}</span>
      </button>`).join('')}</div></div></div>`;
}
function obSubjects(){
  return `<div class="pad" style="gap:16px">
    <div><h2 class="disp" style="font-size:30px">What do you<br>want to learn?</h2>
      <p class="h-sub">Pick as many as you like. Anything missing? Ask your tutor later.</p></div>
    <div class="grid2">${M.SUBJECTS.map((s,i)=>{
      const on = S.subjects.has(s.n);
      return `<button class="tile" data-a="ob-subj" data-arg="${s.n}"
        style="background:linear-gradient(135deg,${s.g[0]},${s.g[1]});outline:${on?'2.5px solid #fff':'none'};outline-offset:-2.5px">
        <span style="display:flex;align-items:center;gap:6px"><b>${s.e} ${s.n}</b>${on?'<span style="margin-left:auto">✓</span>':''}</span>
        <small>${s.s}</small></button>`;}).join('')}</div></div>`;
}
function obGoal(){
  return `<div class="pad" style="gap:16px">
    <div><h2 class="disp" style="font-size:30px">What are you<br>after?</h2>
      <p class="h-sub">Mentora plans around your goal, not a course catalogue.</p></div>
    <div style="display:flex;flex-direction:column;gap:9px">
    ${M.GOALS_LIST.map((g,i)=>`<button class="row" data-a="ob-goal" data-arg="${i}"
      style="border-color:${S.goal===i?'var(--teal-text)':'var(--border)'};border-width:${S.goal===i?2:1.5}px">
      <span class="t"><b>${g}</b></span>
      <span style="font-size:19px;color:${S.goal===i?'var(--teal-text)':'var(--border)'}">${S.goal===i?'◉':'○'}</span>
    </button>`).join('')}</div></div>`;
}
function obLevel(){
  return `<div class="pad" style="gap:16px">
    <div><h2 class="disp" style="font-size:30px">Where are you<br>starting from?</h2>
      <p class="h-sub">An honest answer means fewer wasted lessons.</p></div>
    <div style="display:flex;flex-direction:column;gap:9px">
    ${M.LEVELS.map((l,i)=>`<button class="row" data-a="ob-level" data-arg="${i}"
      style="border-color:${S.level===i?'var(--teal-text)':'var(--border)'};border-width:${S.level===i?2:1.5}px">
      <span class="t"><b>${l[0]}</b><small>${l[1]}</small></span>
      <span style="font-size:19px;color:${S.level===i?'var(--teal-text)':'var(--border)'}">${S.level===i?'◉':'○'}</span>
    </button>`).join('')}
    <button class="card warm" data-a="ob-level" data-arg="3" style="display:flex;gap:12px;align-items:center;
      cursor:pointer;text-align:left;font-family:inherit;color:var(--ink);
      border-color:${S.level===3?'var(--teal-text)':'var(--teal-border)'};border-width:${S.level===3?2:1.5}px">
      ${orb(42,false)}<span><b style="font-size:15px;color:var(--teal-deep)">I don’t know, test me</b>
      <small style="display:block;font-size:12px;color:var(--muted)">Three minutes with ${T().name} and we’ll know exactly.</small></span>
    </button></div></div>`;
}
function obTutor(){
  return `<div class="pad center" style="gap:14px">
    <div><h2 class="disp" style="font-size:30px">Choose your tutor</h2>
      <p class="h-sub" style="text-align:center">You’ll be spending a lot of time together.</p></div>
    ${Object.entries(M.TUTORS).map(([k,t])=>{const on=S.tutor===k;
      return `<button class="card" data-a="ob-tutor" data-arg="${k}" style="width:100%;text-align:left;
        cursor:pointer;font-family:inherit;color:var(--ink);display:flex;flex-direction:column;gap:12px;
        border-color:${on?'var(--teal-text)':'var(--border)'};border-width:${on?2:1}px">
        <span style="display:flex;gap:14px;align-items:center">
          ${orb(on?74:54, on, k)}
          <span><b class="disp" style="font-size:${on?22:18}px;display:block">${t.name}</b>
          <small style="font-size:13px;color:var(--muted)">${t.personality}</small></span></span>
        ${on?`<span class="chip teal" style="width:100%;justify-content:center;padding:10px 13px">▶ ${t.voice}</span>`:''}
      </button>`;}).join('')}</div>`;
}
const OB = [obWelcome, obWho, obSubjects, obGoal, obLevel, obTutor];

function onboarding(){
  const last = OB.length - 1, canGo = S.step!==2 || S.subjects.size>0;
  const cta = S.step===0 ? 'Get my tutor  →' : (S.step===last ? 'Meet my tutor  →' : 'Continue  →');
  return `<div class="body">
    <div style="flex:none;display:flex;align-items:center;gap:12px;padding:12px 20px 0;height:46px;
      opacity:${S.step===0?0:1};pointer-events:${S.step===0?'none':'auto'}">
      <button class="back" data-a="ob-back">‹</button>
      <div style="flex:1;display:flex;gap:5px">${[1,2,3,4,5].map(i=>
        `<span style="flex:1;height:4px;border-radius:99px;background:${i<=S.step?'var(--teal)':'var(--track)'};transition:.35s"></span>`).join('')}</div>
    </div>
    <div class="scroll">${OB[S.step]()}</div>
    <div style="flex:none;padding:8px 22px 28px">
      <button class="btn primary" data-a="ob-next" ${canGo?'':'disabled'}>${cta}</button>
      ${S.step===1?'<p style="font-size:12px;color:var(--muted);text-align:center;margin:10px 0 0">You can change any of this later. Your tutor adapts.</p>':''}
    </div></div>`;
}

/* ─────────────────────────── home ─────────────────────────── */

function tutorCard(){
  return `<button class="card cool" data-a="go" data-arg="tutor" style="display:flex;gap:14px;align-items:center;
    width:100%;text-align:left;cursor:pointer;font-family:inherit;color:var(--ink)">
    ${orb(62,false)}<span style="flex:1"><b style="font-size:14px">${T().name}</b>
    <p style="margin:3px 0 0;font-size:13px;line-height:1.45;color:var(--body)">${M.tutorMsg()}</p></span></button>`;
}
function todayCard(){
  const mins = S.demo==='first' ? 0 : 12;
  return `<div class="card tight">
    <div style="display:flex;justify-content:space-between;font-size:13px;font-weight:700;margin-bottom:8px">
      <span>Today’s goal</span><span style="color:var(--teal-text)">${mins} / 20 min</span></div>
    ${bar(Math.max(.02, mins/20))}
    <div style="height:1px;background:var(--border);margin:14px 0"></div>
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
      <span class="ico" style="width:34px;height:34px;border-radius:var(--r-inner);display:grid;place-items:center;
        font-size:17px;background:var(--teal-tint)">🧮</span>
      <span style="flex:1"><b style="font-size:14px;display:block">Dividing fractions</b>
      <small style="font-size:12px;color:var(--muted)">Math · Lesson 8 of 12</small></span>
      <b style="font-size:13px;color:var(--teal-text)">65%</b></div>
    ${bar(.65)}</div>`;
}
function homeAdult(){
  return `<div class="pad">
    <div style="display:flex;align-items:flex-start;gap:8px">
      <div style="flex:1;min-width:0"><h2 class="disp h-title">${M.greetTitle()}</h2><p class="h-sub">${M.greetSub()}</p></div>
      ${M.showStreak()?'<span class="chip sun">🔥 5</span>':''}
      <button class="back" data-a="push" data-arg="settings" style="color:var(--muted)">${icon('user',20)}</button>
    </div>
    ${tutorCard()}
    <button class="btn primary" data-a="start">▶  ${M.ctaLabel()}</button>
    ${S.demo==='goal'?`<div class="card warm"><div style="display:flex;gap:10px;align-items:center">
      <span style="font-size:26px">🎉</span><span><b class="disp" style="font-size:17px">Milestone complete</b>
      <small style="display:block;font-size:12px;color:var(--muted)">Present-tense conversations · Speak Spanish</small></span></div>
      <div style="display:flex;gap:8px;margin:11px 0"><span class="chip sun">⚡ +120 XP</span><span class="chip teal">3 of 5 milestones</span></div>
      <button class="btn ghost" data-a="push" data-arg="goal:spanish" style="color:var(--teal-deep)">See what’s next  →</button></div>`:''}
    ${todayCard()}
    <div class="group">
      ${row('push','🗣️','var(--apricot-tint)','Restaurant Spanish','Next milestone · Speak Spanish',{arg:'goal:spanish'})}
      ${M.showStreak()?row('push','🏅','var(--sun-tint)','Problem Solver','New achievement, yesterday',{arg:'achievements'}):''}
    </div></div>`;
}
function homeTeen(){
  return `<div class="body" style="overflow:hidden">
    <div style="flex:none;background:#17313A;padding:14px 20px 22px;display:flex;align-items:flex-start;gap:8px">
      <div style="flex:1"><h2 class="disp" style="font-size:23px;color:#fff">${M.greetTitle()}</h2>
      <p style="font-size:13px;color:rgba(255,255,255,.75);margin:3px 0 0">${M.greetSub()}</p></div>
      <span class="chip sun">🔥 12</span></div>
    <div class="scroll"><div class="pad" style="padding-top:16px;gap:13px">
      ${tutorCard()}
      <button class="btn primary" data-a="start">⚡  ${M.ctaLabel()}</button>
      <div class="card tight"><div style="display:flex;justify-content:space-between;font-size:13px;font-weight:700;margin-bottom:8px">
        <span>Weekly XP</span><span style="color:var(--apricot)">840 / 1000</span></div>${bar(.84,true)}</div>
      ${row('start','🧪','var(--teal-tint)','Chemistry: balancing equations','Continue · 7 min left')}
      ${row('start','⚔️','var(--apricot-tint)','Daily challenge','5 questions · beat 4/5 to keep the streak')}
    </div></div>${tabs()}</div>`;
}
function homeMature(){
  return `<div class="pad">
    <div style="display:flex;align-items:center;gap:8px">
      <div style="flex:1"><h2 class="disp" style="font-size:20px;font-weight:700">${M.greetTitle()}</h2>
      <p class="h-sub" style="font-size:13px">${M.greetSub()}</p></div>
      <button data-a="push" data-arg="settings" style="border:none;background:none;cursor:pointer;padding:0">${orb(38,false)}</button></div>
    <div class="card"><div class="lab" style="margin-bottom:7px">From ${T().name}, your tutor</div>
      <p style="margin:0 0 13px;font-size:14px;line-height:1.55;color:var(--body)">${M.tutorMsg()}</p>
      <button class="btn primary" data-a="start" style="padding:13px;font-size:14px">${M.ctaLabel()}</button></div>
    <div class="card tight"><div style="display:flex;justify-content:space-between;font-size:14px;font-weight:700;margin-bottom:8px">
      <span>Financial fluency for founders</span><span style="color:var(--teal-text)">54%</span></div>${bar(.54)}
      <small style="font-size:12px;color:var(--muted);display:block;margin-top:8px">Milestone: read a P&amp;L confidently · 2 sessions left</small></div>
    ${row('go','🇫🇷','var(--teal-tint)','French · conversation practice','Streak protected until 11 pm',{arg:'tutor'})}</div>`;
}
function homeKid(){
  return `<div class="pad center" style="justify-content:center;flex:1;gap:18px">
    <h2 class="disp" style="font-size:31px">${M.greetTitle()}</h2>
    <div style="position:relative">${orb(160,true)}<span style="position:absolute;bottom:-6px;right:-24px;font-size:36px">👋</span></div>
    <div class="card" style="border-radius:20px;padding:14px 20px;font-size:17px;line-height:1.45;max-width:280px">Ready to count<br>with me?</div>
    <button class="btn warm big" data-a="kidplay" style="width:88%">${icon('mic',22)}  Let’s play!</button>
    <div style="display:flex;gap:12px"><button class="chip sun" data-a="go" data-arg="stars" style="cursor:pointer;font-size:15px;padding:10px 16px">⭐ 12 stars</button>
    <span class="chip sun" style="font-size:15px;padding:10px 16px">🔥 3 days</span></div></div>`;
}

/* ─────────────────────────── learn ─────────────────────────── */

function learn(){
  const q = S.query.trim().toLowerCase();
  const list = M.SUBJECTS.filter(s => (S.cat==='All'||s.c===S.cat) && (!q || (s.n+' '+s.s).toLowerCase().includes(q)));
  return `<div class="pad">
    <div><h2 class="disp h-title">Learn</h2><p class="h-sub">Anything. Really, anything.</p></div>
    <input class="input" id="q" value="${esc(S.query)}" placeholder="🔍  What do you want to learn?">
    <div style="display:flex;gap:7px;overflow-x:auto;padding-bottom:2px">
      ${M.CATS.map(c=>`<button class="chip ${S.cat===c?'':''}" data-a="cat" data-arg="${c}"
        style="flex:none;cursor:pointer;font-size:12px;${S.cat===c?'background:var(--teal);border-color:var(--teal);color:#fff':''}">${c}</button>`).join('')}</div>
    ${list.length?`<div class="grid2">${list.map(s=>`<button class="tile" data-a="push" data-arg="subject:${s.n}"
      style="background:linear-gradient(135deg,${s.g[0]},${s.g[1]})"><b>${s.e} ${s.n}</b><small>${s.s}</small></button>`).join('')}</div>`
      :`<button class="card" data-a="go" data-arg="tutor" style="text-align:left;cursor:pointer;font-family:inherit;color:var(--ink)">
        <b style="font-size:14px">Nothing in the catalogue for "${esc(S.query)}"</b>
        <small style="display:block;font-size:13px;color:var(--teal-text);margin-top:4px">${T().name} can teach it anyway. Ask directly →</small></button>`}
    ${S.course&&S.upload==='ready'?row('start','📚','var(--teal-tint)',M.COURSES[S.course].name,`Your course · from ${M.COURSES[S.course].file} · 6 lessons`):''}
    ${row('push','📄','var(--teal-tint)','＋ New course from your materials',`PDF, Word, book photos. ${T().name} builds the lessons`,{arg:'course',dashed:true,color:'var(--teal-deep)'})}
    <button class="card warm" data-a="go" data-arg="tutor" style="display:flex;gap:12px;align-items:center;width:100%;
      text-align:left;cursor:pointer;font-family:inherit;color:var(--ink);padding:13px 15px;border-radius:var(--r-control)">
      ${orb(38,false)}<span style="flex:1"><b style="font-size:14px">Can’t find it? Ask ${T().name}</b>
      <small style="display:block;font-size:12px;color:var(--muted)">A path for anything, built around you</small></span>
      <span class="chev">›</span></button></div>`;
}
function subjectDetail(name){
  const s = M.SUBJECTS.find(x=>x.n===name) || M.SUBJECTS[0];
  return `<div class="pad" style="padding-top:14px">
    <div style="position:relative;border-radius:var(--r-card);overflow:hidden;height:190px;
      background:linear-gradient(135deg,${s.g[0]},${s.g[1]});padding:17px;display:flex;flex-direction:column;justify-content:space-between">
      <button class="back" data-a="pop" style="background:rgba(255,255,255,.2);border:none;color:#fff">‹</button>
      <div><div style="font-size:34px">${s.e}</div><b class="disp" style="font-size:28px;color:#fff;display:block">${s.n}</b>
      <small style="font-size:13px;color:rgba(255,255,255,.85)">${s.s}</small></div></div>
    <div class="bubble">"You’re eight lessons into ${s.n}. Today’s is short. I’d rather you finish it than start something big."</div>
    <button class="btn primary" data-a="start">▶  Continue lesson 8</button>
    <div class="card tight"><div class="lab" style="margin-bottom:12px">Your path</div>
      ${milestone('The basics','Lessons 1-4 · complete','done')}
      ${milestone('Fractions','Lessons 5-9 · you’re here','now')}
      ${milestone('Word problems','Lessons 10-12','',true)}</div>
    <div class="card tight"><div class="lab" style="margin-bottom:11px">Popular right now</div>
      ${['Dividing fractions','Percentages that stick','Ratios in real life'].map(t=>
        `<div style="display:flex;align-items:center;gap:10px;font-size:14px;margin-bottom:9px">
        <span style="color:var(--teal-text)">▷</span><span style="flex:1">${t}</span>
        <small style="color:var(--muted);font-size:12px">6 min</small></div>`).join('')}</div></div>`;
}
function courseBuilder(){
  const head = `<div style="display:flex;align-items:center;gap:12px;padding:14px 20px 0">
    <button class="back" data-a="pop">‹</button><b style="font-size:15px">New course</b></div>`;
  if (S.upload==='pick') return `<div class="body">${head}<div class="scroll"><div class="pad">
    <div style="text-align:center;display:flex;flex-direction:column;align-items:center;gap:8px">
      ${orb(76,false)}<b class="disp" style="font-size:22px">Teach from your materials</b>
      <p style="font-size:13px;color:var(--muted);margin:0;max-width:270px;line-height:1.5">Upload a syllabus, notes, or book pages. ${T().name} reads them and builds real lessons.</p></div>
    ${row('course','📄','var(--teal-tint)','PDF','Syllabus, workbook, exam papers',{arg:'pdf'})}
    ${row('course','📝','var(--apricot-tint)','Word / Docs','Class notes, handouts',{arg:'doc'})}
    ${row('course','📷','var(--sun-tint)','Photos of a book',`Snap the pages, ${T().name} does the rest`,{arg:'photo'})}
    <p style="font-size:12px;color:var(--muted);text-align:center;line-height:1.5;margin-top:6px">Parents can upload school materials too.<br>Lessons adapt to your child’s age and pace.</p>
  </div></div></div>`;
  if (S.upload==='reading') return `<div class="body">${head}
    <div class="pad center" style="justify-content:center;flex:1;gap:16px">
      ${orb(110,true)}<b class="disp" style="font-size:21px">Reading ${M.COURSES[S.course].file}…</b>
      <p style="font-size:13px;color:var(--muted);margin:0;line-height:1.5">Finding topics, ordering them,<br>writing your first lessons</p>
      <span class="chip">● This takes about a minute</span></div></div>`;
  const c = M.COURSES[S.course];
  return `<div class="body">${head}<div class="scroll"><div class="pad">
    <div style="text-align:center"><div style="font-size:34px">🎉</div>
      <b class="disp" style="font-size:22px">Your course is ready</b>
      <p style="font-size:13px;color:var(--muted);margin:4px 0 0">Built from ${c.file}</p></div>
    <div class="card"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:13px">
      <b style="font-size:15px">📚 ${c.name}</b><span class="chip teal" style="font-size:11px;padding:6px 12px">6 lessons</span></div>
      ${milestone(c.l[0],'Lesson 1 · ready now','now')}
      ${milestone(c.l[1],'Lesson 2','')}
      ${milestone(c.l[2],`Lessons 3-6 · ${T().name} adapts as you go`,'',true)}</div>
    <div class="card warm" style="padding:13px 15px;display:flex;gap:11px;align-items:center;border-radius:var(--r-banner)">
      ${orb(34,false)}<p style="margin:0;font-size:13px;line-height:1.5;color:var(--body)">"I kept your teacher’s order but added practice where it usually gets tricky. Shall we start?"</p></div>
    <button class="btn primary" data-a="start">▶  Start lesson 1</button>
    <button class="btn ghost" data-a="pop">Save for later</button>
  </div></div></div>`;
}

/* ─────────────────────────── tutor ─────────────────────────── */

function tutorAdult(){
  const b = M.BOARDS[S.board];
  return `<div class="body">
    <div class="scroll"><div class="pad" style="padding-top:18px;gap:12px">
      <div style="display:flex;flex-direction:column;align-items:center;gap:7px">
        <button data-a="full" data-arg="voice" style="border:none;background:none;cursor:pointer;padding:0">${orb(96,S.listening)}</button>
        <b style="font-size:16px">${T().name}</b>
        <span class="chip ${S.listening?'teal':''}">${S.listening?'● Listening…':'Here with you'}</span></div>
      <div class="bubble fade" key="${S.board}">${b.b}</div>
      ${S.learnerMsg?`<div class="bubble me">${esc(S.learnerMsg)}</div>`:''}
      <div class="card board fade"><div class="lab" style="text-align:left">On the board</div>
        <div class="math">${b.m}</div><p class="n">${b.n}</p></div>
      <div style="display:flex;gap:8px">
        <button class="btn ghost" data-a="board" data-arg="1">Explain<br>differently</button>
        <button class="btn ghost" data-a="board" data-arg="2">Give me<br>an example</button>
        <button class="btn ghost" data-a="board" data-arg="3">I don’t<br>understand</button></div>
    </div></div>
    <div style="flex:none;padding:0 20px 104px;display:flex;flex-direction:column;gap:8px">
      ${S.typing?`<div style="display:flex;gap:8px;align-items:center">
        <input class="input" id="draft" value="${esc(S.draft)}" placeholder="Ask ${T().name} anything…" style="flex:1">
        <button data-a="send" style="width:46px;height:46px;flex:none;border-radius:50%;background:var(--teal);
          color:#fff;border:none;font-size:17px;cursor:pointer;box-shadow:0 6px 14px rgba(20,125,116,.35)">↑</button></div>`:''}
      <div class="dock">
        <button class="dockb" data-a="typing"><i>${icon('keyboard',19)}</i>Type</button>
        <button class="dockb talk ${S.listening?'on':''}" data-a="talk"><i>${icon(S.listening?'waveform':'mic',22)}</i>Talk</button>
        <button class="dockb" data-a="push" data-arg="homework"><i>${icon('camera',19)}</i>Camera</button>
        <button class="dockb" data-a="attach"><i>${icon('clip',19)}</i>Upload</button></div>
    </div>${tabs()}</div>`;
}
function tutorKid(){
  return `<div class="pad center" style="justify-content:center;flex:1;gap:16px">
    ${orb(180,S.listening)}
    <b class="disp" style="font-size:24px">${T().name}</b>
    ${S.listening?'<span class="chip teal" style="font-size:14px">● Listening…</span>':''}
    <div class="card" style="border-radius:20px;padding:15px 20px;font-size:17px;line-height:1.5;max-width:300px">
      Let’s count the apples! One… two… how many come next? 🍎🍎🍎</div>
    <button class="btn warm big" data-a="talk" style="width:88%">${icon('mic',22)}  ${S.listening?'All done!':'Talk to '+T().name}</button></div>`;
}
function voice(){
  const shown = M.VOICE_LINES.slice(0, S.voiceLines);
  return `<div class="sheet voice">${status()}
    <div style="flex:none;display:flex;align-items:center;padding:14px 20px;color:#fff">
      <button class="back" data-a="closefull" style="background:rgba(255,255,255,.12);border:none;color:#fff">⌄</button>
      <b style="flex:1;text-align:center;font-size:13px;color:rgba(255,255,255,.7)">Voice lesson</b>
      <span style="width:34px"></span></div>
    <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:0 36px">
      ${orb(180,true)}
      <b class="disp" style="font-size:24px;color:#fff">${T().name}</b>
      <span style="font-size:13px;color:rgba(255,255,255,.7)">● Speaking</span>
      <div class="wave">${Array.from({length:34},(_,i)=>`<i style="animation-delay:${(i*0.055).toFixed(2)}s"></i>`).join('')}</div>
      <div style="display:flex;flex-direction:column;gap:10px;text-align:center;margin-top:8px">
        ${shown.map((l,i)=>`<p style="margin:0;font-size:15px;line-height:1.5;color:rgba(255,255,255,${i===shown.length-1?.95:.45})">${l}</p>`).join('')}</div>
    </div>
    <div style="flex:none;display:flex;justify-content:center;gap:26px;padding:0 0 40px">
      <button class="dockb" data-a="closefull" style="color:rgba(255,255,255,.65)"><i style="background:rgba(255,255,255,.14);border:none;color:#fff">💬</i>Transcript</button>
      <button data-a="talk" style="width:78px;height:78px;border-radius:50%;background:var(--apricot-fill);color:#fff;
        border:none;cursor:pointer;box-shadow:0 10px 22px rgba(216,84,61,.5);display:grid;place-items:center">${icon('mic',28)}</button>
      <button class="dockb" data-a="closefull" style="color:rgba(255,255,255,.65)"><i style="background:rgba(255,255,255,.14);border:none;color:#fff">✕</i>End</button></div>
  </div>`;
}
function homework(){
  const head = `<div style="display:flex;align-items:center;gap:12px;padding:14px 20px 0">
    <button class="back" data-a="pop">‹</button><b style="font-size:15px">Homework</b></div>`;
  if (S.homework==='capture') return `<div class="body">${head}<div class="scroll"><div class="pad">
    <div style="text-align:center;display:flex;flex-direction:column;align-items:center;gap:8px">
      ${orb(76,false)}<b class="disp" style="font-size:22px">Show me the page</b>
      <p style="font-size:13px;color:var(--muted);margin:0;max-width:280px;line-height:1.5">Snap it, and ${T().name} marks every question, with the reason, not just a tick.</p></div>
    <div style="height:230px;border-radius:20px;border:2px dashed var(--border);display:flex;flex-direction:column;
      align-items:center;justify-content:center;gap:10px;color:var(--muted);background:var(--card)">
      <span style="font-size:42px">🖼</span><small style="font-size:13px">Fit the whole page in the frame</small></div>
    <button class="btn primary" data-a="hw" data-arg="marking">📷  Take a photo</button>
    <button class="btn ghost" data-a="hw" data-arg="marking">Choose from library</button>
  </div></div></div>`;
  if (S.homework==='marking') return `<div class="body">${head}
    <div class="pad center" style="justify-content:center;flex:1;gap:16px">${orb(110,true)}
      <b class="disp" style="font-size:21px">Reading your page…</b>
      <p style="font-size:13px;color:var(--muted);margin:0">Checking each step, not just the answer</p></div></div>`;
  const marks = [[1,1,'Clean working'],[2,1,'Nice, you simplified early'],[3,0,'Flip the second fraction, then multiply'],
                 [4,1,'Correct'],[5,1,'Correct, and quickly']];
  return `<div class="body">${head}<div class="scroll"><div class="pad">
    <div style="display:flex;gap:8px"><span class="chip teal">4 of 5 correct</span><span class="chip sun">1 to look at</span></div>
    <div class="bubble">Four right, and the one you missed is the interesting one. Question 3: you multiplied where you meant to divide. Look:</div>
    <div class="card board"><div class="lab" style="text-align:left">On the board</div>
      <div class="math">¾ ÷ ½ = ¾ × ²⁄₁ = 1½</div><p class="n">You wrote ³⁄₈, which is ¾ × ½</p></div>
    ${marks.map(([n,ok,t])=>`<div class="row" style="cursor:default">
      <span class="ico" style="border-radius:50%;background:${ok?'var(--teal-tint)':'var(--apricot-tint)'};
        color:${ok?'var(--teal-deep)':'var(--apricot-text)'};font-size:14px;font-weight:700">${n}</span>
      <span class="t"><b style="font-weight:400;font-size:13px;color:var(--body)">${t}</b></span>
      <span style="color:${ok?'var(--teal-text)':'var(--apricot)'}">${ok?'✓':'↺'}</span></div>`).join('')}
    <div class="note good">"This is a really common mix-up and it’s fixable in about four minutes. Want to do those four minutes now?"</div>
    <button class="btn primary" data-a="start">▶  Fix question 3 with ${T().name}</button>
    <button class="btn ghost" data-a="pop">Back to my tutor</button>
  </div></div></div>`;
}

window.__SC1 = {onboarding, homeAdult, homeTeen, homeMature, homeKid, learn, subjectDetail,
  courseBuilder, tutorAdult, tutorKid, voice, homework};
function tabs(){ return window.__tabs(); }
})();
