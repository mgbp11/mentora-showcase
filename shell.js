/* Mentora web prototype - remaining screens, tab bar, router, events. */
(() => {
'use strict';
const M = window.__M, S = M.S, SC = window.__SC1;
const {T, kid, esc, orb, bar, milestone, row, icon, status} = M;
const el = document.getElementById('screen');

/* ─────────────────────────── lesson ─────────────────────────── */

function lesson(){
  const st = M.LESSON[S.lesson], n = M.LESSON.length;
  const answered = S.picked !== null && S.picked === st.correct;
  const wrong = S.picked !== null && S.picked !== st.correct;
  const canNext = !st.q || answered;
  const last = S.lesson >= n - 1;
  return `<div class="sheet">${status()}
    <div style="flex:none;display:flex;align-items:center;gap:12px;padding:14px 20px 4px">
      <button class="back" data-a="closefull">‹</button>${orb(42,false)}
      <div style="flex:1"><b style="font-size:14px">Dividing fractions</b>
        <div style="margin-top:6px">${bar((S.lesson+1)/n)}</div></div>
      <small style="font-size:12px;color:var(--muted);flex:none">${st.phase} · ${S.lesson+1}/${n}</small></div>
    <div class="scroll"><div class="pad" style="padding-top:14px;padding-bottom:18px;gap:12px">
      <div class="bubble fade">${S.confused && st.conf ? st.conf : st.bubble}</div>
      ${st.board?`<div class="card board"><div class="lab" style="text-align:left">On the board</div>
        <div class="math">${st.board.math}</div><p class="n">${st.board.note}</p></div>`:''}
      ${st.q?`<div class="card"><div class="disp" style="font-size:24px;text-align:center;margin-bottom:12px">${st.q}</div>
        <div style="display:flex;flex-direction:column;gap:9px">
        ${st.opts.map((o,i)=>{const cls = S.picked===i ? (i===st.correct?'ok':'no') : '';
          return `<button class="opt ${cls}" data-a="pick" data-arg="${i}"><span>${o}</span>
          <span>${S.picked===i?(i===st.correct?'✓':'✕'):''}</span></button>`;}).join('')}</div>
        <button class="chip" data-a="voiceans" style="width:100%;justify-content:center;margin-top:12px;cursor:pointer;
          font-size:12px;${S.voiceAnswer?'background:var(--apricot-tint);border-color:var(--apricot-border);color:var(--apricot-text)':'background:var(--paper);color:var(--muted)'}">
          ${icon('mic',14)} ${S.voiceAnswer?'Listening. Say your answer':'Or say it out loud'}</button></div>`:''}
      ${answered?`<div class="note good fade">${st.good}</div>`:''}
      ${wrong && !S.confused?`<div class="note gentle fade">${st.bad}</div>`:''}
      ${S.hint?`<div class="note hint fade">${st.hint}</div>`:''}
    </div></div>
    <div style="flex:none;display:flex;gap:8px;padding:8px 20px 18px">
      <button class="btn ghost" data-a="hint">💡 Hint</button>
      <button class="btn ghost" data-a="dontget">I don’t understand</button>
      <button class="btn primary" data-a="next" ${canNext?'':'disabled'} style="padding:12px 6px;font-size:13px">
        ${last?'Finish 🎉':'Next  →'}</button></div>
  </div>`;
}
function complete(){
  return `<div class="sheet" style="background:linear-gradient(var(--paper-warm),var(--paper))">${status()}
    <div class="pad center" style="justify-content:center;flex:1;gap:18px;padding:24px 28px 30px">
      <div style="position:relative">${orb(120,true)}<span style="position:absolute;bottom:-4px;right:-8px;font-size:30px">🎉</span></div>
      <div><b class="disp" style="font-size:30px">Lesson complete!</b>
        <p class="h-sub" style="margin-top:8px">Dividing fractions · Lesson 8 of 12</p></div>
      <div style="display:flex;gap:10px"><span class="chip sun" style="font-size:14px;padding:9px 15px">⚡ +40 XP</span>
        <span class="chip sun" style="font-size:14px;padding:9px 15px">🔥 6-day streak</span></div>
      <div class="card" style="border-radius:var(--r-banner);padding:14px 16px;font-size:14px;line-height:1.5;color:var(--body)">
        "You caught your own flip mistake today. That’s real learning. Tomorrow we’ll try word problems, gently."</div>
      <div style="width:100%;display:flex;flex-direction:column;gap:9px;margin-top:6px">
        <button class="btn primary" data-a="finish">Next step  →</button>
        <button class="btn ghost" data-a="finishprog">See my progress</button></div>
    </div></div>`;
}

/* ─────────────────────────── goals & progress ─────────────────────────── */

function goals(){
  return `<div class="pad">
    <div><h2 class="disp h-title">My goals</h2><p class="h-sub">${T().name} builds the roadmap. You just show up.</p></div>
    ${M.allGoals().map(g=>{
      const open = g.id==='spanish';
      return `<button class="card" data-a="push" data-arg="goal:${g.id}" style="width:100%;text-align:left;
        cursor:pointer;font-family:inherit;color:var(--ink)">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <b style="font-size:15px">${g.e} ${g.t}</b>
          <span class="chip ${g.p>0?'teal':''}" style="font-size:12px;padding:6px 12px">${Math.round(g.p*100)}%</span></div>
        <div style="margin:10px 0 ${open?15:8}px">${bar(g.p)}</div>
        ${open ? g.ms.slice(0,4).map((m,i)=>milestone(m[0],m[1],m[2],i===3)).join('')
               : `<small style="font-size:12px;color:var(--muted)">${g.meta}</small>`}
      </button>`;}).join('')}
    <div style="display:flex;gap:9px">
      <button class="btn ghost" data-a="addgoal">＋ Add a goal</button>
      <button class="btn ghost" data-a="push" data-arg="course" style="color:var(--teal-deep)">📄 From my materials</button></div></div>`;
}
function goalDetail(id){
  const g = M.allGoals().find(x=>x.id===id) || M.GOALS[0];
  return `<div class="pad" style="padding-top:14px">
    <div style="display:flex;align-items:center;gap:12px"><button class="back" data-a="pop">‹</button><b style="font-size:15px">Goal</b></div>
    <div><h2 class="disp" style="font-size:26px">${g.e} ${g.t}</h2>
      <div style="display:flex;gap:10px;align-items:center;margin:10px 0">
        <div style="flex:1">${bar(g.p)}</div><b style="font-size:14px;color:var(--teal-text)">${Math.round(g.p*100)}%</b></div>
      <p class="h-sub">${g.meta}</p></div>
    <div class="card warm" style="padding:14px;display:flex;gap:11px;align-items:center;border-radius:var(--r-banner)">
      ${orb(34,false)}<p style="margin:0;font-size:13px;line-height:1.5;color:var(--body)">${g.note}</p></div>
    <div class="card"><div class="lab" style="margin-bottom:13px">Roadmap</div>
      ${g.ms.map((m,i)=>milestone(m[0],m[1],m[2],i===g.ms.length-1)).join('')}</div>
    <button class="btn primary" data-a="start">▶  Work on this today</button>
    <button class="btn ghost" data-a="go" data-arg="tutor">Talk it through with ${T().name}</button></div>`;
}
function progress(){
  return `<div class="pad">
    <div><h2 class="disp h-title">Progress</h2><p class="h-sub">This week, you showed up 5 times 👏</p></div>
    <div class="grid3">
      <div class="stat"><b>4</b><small>lessons</small></div>
      <div class="stat"><b>2h 35m</b><small>learning</small></div>
      <div class="stat"><b style="color:var(--warn)">🔥 5</b><small>day streak</small></div></div>
    <div class="card tight"><div class="lab" style="margin-bottom:11px">Skills</div>
      ${M.SKILLS.map(([n,v,st])=>`<div style="display:flex;align-items:center;gap:10px;font-size:13px;margin-bottom:11px">
        <span style="width:96px;flex:none">${n}</span><div style="flex:1">${bar(v, st==='Practice')}</div>
        ${st==='Mastered'?'<span class="chip teal" style="font-size:10px;padding:4px 9px">Mastered</span>'
          :`<small style="font-size:11px;font-weight:600;flex:none;color:${st==='Practice'?'var(--warn)':'var(--teal-text)'}">${st}</small>`}
      </div>`).join('')}</div>
    <button class="card tight" data-a="push" data-arg="achievements" style="width:100%;text-align:left;cursor:pointer;font-family:inherit;color:var(--ink)">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:9px">
        <span class="lab">Achievements</span><span class="chev">›</span></div>
      <div style="display:flex;gap:8px;flex-wrap:wrap"><span class="chip sun" style="font-size:12px">🏅 Problem Solver</span>
        <span class="chip sun" style="font-size:12px">🔥 First streak</span>
        <span class="chip lock" style="font-size:12px">🔒 Marathon</span></div></button>
    <div class="card warm tight"><div style="display:flex;gap:11px;align-items:center;margin-bottom:11px">
      ${orb(38,false)}<p style="margin:0;font-size:13px;line-height:1.5;color:var(--body)">"Word problems are next on our list. I’ve planned a gentle path. Trust me, you’re closer than you think."</p></div>
      <button class="btn ghost" data-a="go" data-arg="goals">See the plan  →</button></div>
    ${(kid()||S.age==='13')?row('push','👨‍👩‍👧','var(--teal-tint)','Parent dashboard','Time, lessons and a plain-language summary',{arg:'parent'}):''}</div>`;
}
function achievements(){
  return `<div class="pad" style="padding-top:14px">
    <div style="display:flex;align-items:center;gap:12px"><button class="back" data-a="pop">‹</button><b style="font-size:15px">Achievements</b></div>
    <div><h2 class="disp" style="font-size:26px">4 of 6 earned</h2><p class="h-sub">Two more within reach this month</p></div>
    <div class="grid2">${M.ACHIEVEMENTS.map(([e,t,d,on])=>`<div style="min-height:132px;padding:14px;border-radius:var(--r-control);
      background:${on?'var(--sun-tint)':'var(--card)'};border:1px solid ${on?'var(--sun-border)':'var(--border)'}">
      <div style="font-size:26px">${on?e:'🔒'}</div>
      <b style="font-size:14px;display:block;margin-top:6px;color:${on?'var(--ink)':'var(--locked)'}">${t}</b>
      <small style="font-size:12px;color:var(--muted);display:block;margin-top:4px">${d}</small></div>`).join('')}</div></div>`;
}
function stars(){
  return `<div class="pad center" style="justify-content:center;flex:1;gap:16px">
    <h2 class="disp" style="font-size:31px">Your stars</h2>
    <div class="disp" style="font-size:58px;line-height:1">⭐ 12</div>
    <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:8px;max-width:260px;font-size:28px">
      ${Array.from({length:12},()=>'<span>⭐</span>').join('')}</div>
    <span class="chip sun" style="font-size:15px;padding:10px 16px">🔥 3 days in a row!</span>
    <div class="card" style="border-radius:20px;padding:14px 20px;font-size:16px;line-height:1.5;max-width:280px">
      Every star is something new you learned. Want one more?</div>
    <button class="btn warm big" data-a="kidplay" style="width:88%">${icon('mic',22)}  Earn one more!</button></div>`;
}

/* ─────────────────────────── profile ─────────────────────────── */

function group(title, inner){ return `<div><div class="lab" style="margin-bottom:8px">${title}</div><div class="group">${inner}</div></div>`; }
function settings(){
  return `<div class="pad" style="padding-top:14px">
    <div style="display:flex;align-items:center;gap:12px"><button class="back" data-a="pop">‹</button><b style="font-size:15px">Profile &amp; settings</b></div>
    <div class="card" style="display:flex;gap:14px;align-items:center">${orb(62,false)}
      <div><b class="disp" style="font-size:20px">${esc(S.name)}</b>
      <p class="h-sub" style="font-size:13px">${M.AGES[S.age].n} · learning with ${T().name}</p></div></div>
    ${group('Your tutor', Object.entries(M.TUTORS).map(([k,t])=>`<button class="row" data-a="tutorpick" data-arg="${k}">
      <span class="ico" style="background:transparent;padding:2px">${orb(30,false,k)}</span>
      <span class="t"><b>${t.name}</b><small>${t.personality}</small></span>
      <span style="color:${S.tutor===k?'var(--teal-text)':'var(--locked)'};font-size:${S.tutor===k?'16':'13'}px">${S.tutor===k?'✓':'›'}</span></button>`).join('')
      + `<button class="row" data-a="pace"><span class="t"><b>Pace</b></span>
         <b style="color:var(--teal-text);font-size:14px">${S.pace}</b><span class="chev">⌃⌄</span></button>`)}
    ${group('Learning', `<button class="row" data-a="limit"><span class="t"><b>Daily goal</b></span>
      <b style="color:var(--teal-text);font-size:14px">${S.dailyLimit} min</b><span class="chev">⌃⌄</span></button>`
      + row('go','🎯','transparent','Goals &amp; subjects',`${M.allGoals().length} goals`,{arg:'goals'})
      + row('push','👨‍👩‍👧','transparent','Parent dashboard','Time, mood, what they learned',{arg:'parent'}))}
    ${group('Language', `<button class="row" data-a="rtl"><span class="t"><b>Hebrew · right-to-left layout</b></span>
      <span style="font-size:15px;color:${S.rtl?'var(--teal-text)':'var(--locked)'}">${S.rtl?'◉':'○'}</span></button>`)}
    ${group('Prototype', `<div style="padding:14px 15px">
      <div style="font-size:13px;font-weight:600;margin-bottom:9px">Age band</div>
      <div class="seg" style="margin-bottom:14px">${Object.keys(M.AGES).map(k=>
        `<button data-a="setage" data-arg="${k}" aria-pressed="${S.age===k}">Age ${k}</button>`).join('')}</div>
      <div style="font-size:13px;font-weight:600;margin-bottom:9px">State</div>
      <div class="seg">${[['first','First-time'],['active','Active'],['streak','Streak'],['goal','Goal done'],['struggle','Struggling']].map(([k,l])=>
        `<button data-a="setstate" data-arg="${k}" aria-pressed="${S.demo===k}">${l}</button>`).join('')}</div></div>`
      + `<button class="row" data-a="restart"><span class="ico" style="background:transparent;font-size:17px;color:var(--muted)">↺</span>
         <span class="t"><b>Replay onboarding</b><small>Six steps from the top</small></span><span class="chev">›</span></button>`)}
  </div>`;
}
function parent(){
  return `<div class="pad" style="padding-top:14px">
    <div style="display:flex;align-items:center;gap:12px"><button class="back" data-a="pop">‹</button><b style="font-size:15px">Parent dashboard</b></div>
    <div><h2 class="disp" style="font-size:24px">Liam’s learning</h2><p class="h-sub" style="font-size:13px">Today · Tuesday</p></div>
    <div class="grid3"><div class="stat"><b>18m</b><small>learning time</small></div>
      <div class="stat"><b>2</b><small>lessons</small></div><div class="stat"><b>🙂</b><small>mood</small></div></div>
    <div class="card"><div class="lab" style="margin-bottom:9px">What Liam did today</div>
      <p style="margin:0;font-size:14px;line-height:1.6;color:var(--body)">${M.PARENT_NARRATIVE}</p></div>
    <div class="card tight"><div class="lab" style="margin-bottom:11px">Where he is</div>
      ${[['Counting to 20',.9,'Strong'],['Letter sounds',.4,'Needs practice'],['Listening &amp; focus',.7,'Improving']].map(([n,v,t])=>
        `<div style="display:flex;align-items:center;gap:10px;font-size:13px;margin-bottom:11px">
        <span style="width:112px;flex:none">${n}</span><div style="flex:1">${bar(v, v<.5)}</div>
        <small style="font-size:11px;font-weight:600;flex:none;color:${v<.5?'var(--warn)':'var(--teal-text)'}">${t}</small></div>`).join('')}</div>
    ${group('Controls', `<button class="row" data-a="limit"><span class="t"><b>Daily limit</b></span>
      <b style="color:var(--teal-text);font-size:14px">${S.dailyLimit} min</b><span class="chev">⌃⌄</span></button>`
      + row('noop','🎯','transparent','Goals &amp; subjects','Numbers, letters, curiosity')
      + row('noop','🗣️','transparent','Tutor settings','Pace: gentle · English &amp; Hebrew'))}
    <div class="card warm" style="padding:14px;display:flex;gap:11px;align-items:center;border-radius:var(--r-banner)">
      ${orb(34,false,'emma')}<p style="margin:0;font-size:13px;line-height:1.5;color:var(--body)">"Nothing to worry about with b and d. It’s the most common mix-up at five. I’ll keep working it in quietly."</p></div>
    <button class="btn primary" data-a="switchkid">⇄  Switch to Liam</button></div>`;
}

/* ─────────────────────────── shell ─────────────────────────── */

window.__tabs = function(){
  const t = (id, g, label) => `<button class="tab" data-a="go" data-arg="${id}" aria-selected="${S.tab===id}">
    <span class="g">${icon(g, kid()?24:21, g!=='progress')}</span>${label}</button>`;
  const centre = `<button class="tab center" data-a="go" data-arg="tutor">
    <span class="orbwrap">${icon('cap', kid()?30:26)}</span><span>${kid()?T().name:'Tutor'}</span></button>`;
  return `<nav class="tabs">${kid()
    ? t('home','home','Home') + centre + t('stars','stars','Stars')
    : t('home','home','Home') + t('learn','learn','Learn') + centre + t('goals','goals','Goals') + t('progress','progress','Progress')}</nav>`;
};

function tabScreen(inner, warm){
  return `<div class="body" style="background:${warm?'linear-gradient(var(--paper-warm),var(--paper))':'var(--paper)'}">
    <div class="scroll">${inner}</div>${window.__tabs()}</div>`;
}

function render(){
  document.documentElement.setAttribute('data-theme', S.theme);
  document.documentElement.setAttribute('dir', S.rtl ? 'rtl' : 'ltr');
  let html;
  if (!S.onboarded) html = SC.onboarding();
  else if (S.full === 'lesson') html = lesson();
  else if (S.full === 'complete') html = complete();
  else if (S.full === 'voice') html = SC.voice();
  else if (S.route) {
    const [name, arg] = S.route.split(':');
    const body = name==='subject' ? SC.subjectDetail(arg) : name==='goal' ? goalDetail(arg)
      : name==='achievements' ? achievements() : name==='settings' ? settings()
      : name==='parent' ? parent() : '';
    if (name==='course') html = SC.courseBuilder();
    else if (name==='homework') html = SC.homework();
    else html = `<div class="body"><div class="scroll">${body}</div>${window.__tabs()}</div>`;
  }
  else if (S.tab==='home') html = kid() ? tabScreen(SC.homeKid(), true)
      : S.age==='13' ? SC.homeTeen()
      : S.age==='40' ? `<div class="body" style="background:var(--paper-quiet)"><div class="scroll">${SC.homeMature()}</div>${window.__tabs()}</div>`
      : tabScreen(SC.homeAdult());
  else if (S.tab==='learn') html = tabScreen(SC.learn());
  else if (S.tab==='tutor') html = kid() ? tabScreen(SC.tutorKid(), true) : SC.tutorAdult();
  else if (S.tab==='goals') html = tabScreen(goals());
  else if (S.tab==='progress') html = tabScreen(progress());
  else if (S.tab==='stars') html = tabScreen(stars(), true);
  el.innerHTML = (S.full ? '' : status()) + html;
  const nm = document.getElementById('nm'); if (nm) nm.oninput = e => S.name = e.target.value;
  const q = document.getElementById('q'); if (q) q.oninput = e => { S.query = e.target.value; const p=q.selectionStart; render(); const n=document.getElementById('q'); if(n){n.focus();n.setSelectionRange(p,p);} };
  const d = document.getElementById('draft');
  if (d) { d.focus(); d.oninput = e => S.draft = e.target.value;
           d.onkeydown = e => { if (e.key === 'Enter') send(); }; }
  syncRail();
}

/* ─────────────────────────── actions ─────────────────────────── */

function send(){
  const t = S.draft.trim(); if (!t) return;
  S.board = 4; S.learnerMsg = t; S.draft = ''; S.typing = false; render();
}
function startLesson(){ S.lesson=0; S.picked=null; S.hint=false; S.confused=false; S.voiceAnswer=false; S.full='lesson'; render(); }
function voiceTick(){
  if (S.full !== 'voice') return;
  if (S.voiceLines < M.VOICE_LINES.length) { S.voiceLines++; render(); setTimeout(voiceTick, 1400); }
}

const ACTIONS = {
  'ob-next'(){ if (S.step===5){ S.onboarded=true; S.demo='first'; S.tab='home'; } else S.step++; },
  'ob-back'(){ S.step = Math.max(0, S.step-1); },
  'ob-age'(v){ S.age=v; S.tutor=M.AGES[v].tutor; },
  'ob-subj'(v){ S.subjects.has(v) ? S.subjects.delete(v) : S.subjects.add(v); },
  'ob-goal'(v){ S.goal=+v; },
  'ob-level'(v){ S.level=+v; },
  'ob-tutor'(v){ S.tutor=v; },
  go(v){ S.route=null; S.listening=false; S.tab=v; if(v==='tutor'){S.board=0;S.learnerMsg='Yes, show me 🙏';S.typing=false;} },
  push(v){ S.route=v; if(v==='course'){S.upload='pick';} if(v==='homework'){S.homework='capture';} },
  pop(){ S.route=null; },
  full(v){ if(v==='voice'){S.voiceLines=0; setTimeout(voiceTick,600);} S.full=v; },
  closefull(){ S.full=null; },
  start(){ S.route=null; startLesson(); },
  pick(v){ const st=M.LESSON[S.lesson]; if(S.picked===st.correct) return; S.picked=+v; S.hint=false; S.confused=false; },
  next(){ const st=M.LESSON[S.lesson]; if(st.q && S.picked!==st.correct) return;
          if(S.lesson>=M.LESSON.length-1){ S.full='complete'; }
          else { S.lesson++; S.picked=null; S.hint=false; S.confused=false; S.voiceAnswer=false; } },
  hint(){ S.hint=!S.hint; S.confused=false; },
  dontget(){ S.confused=true; S.hint=false; },
  voiceans(){ S.voiceAnswer=!S.voiceAnswer; },
  finish(){ S.full=null; S.demo='streak'; S.tab='home'; },
  finishprog(){ S.full=null; S.tab='progress'; },
  board(v){ S.board=+v; S.learnerMsg=null; S.listening=false; },
  typing(){ S.typing=!S.typing; },
  send,
  talk(){ S.listening=!S.listening; },
  attach(){ S.board=5; S.learnerMsg='📎 worksheet.pdf'; S.typing=false; },
  kidplay(){ S.listening=true; S.tab='tutor'; S.route=null; },
  cat(v){ S.cat=v; },
  course(v){ S.course=v; S.upload='reading';
             setTimeout(()=>{ if(S.upload==='reading'){ S.upload='ready'; render(); } }, 1700); },
  addgoal(){ S.extraGoal=true; },
  hw(v){ S.homework=v; if(v==='marking') setTimeout(()=>{ if(S.homework==='marking'){S.homework='marked';render();} },1600); },
  tutorpick(v){ S.tutor=v; },
  pace(){ const o=['Gentle','Steady','Push me']; S.pace=o[(o.indexOf(S.pace)+1)%o.length]; },
  limit(){ const o=[10,20,30,45,60]; S.dailyLimit=o[(o.indexOf(S.dailyLimit)+1)%o.length]; },
  rtl(){ S.rtl=!S.rtl; },
  setage(v){ S.age=v; S.tutor=M.AGES[v].tutor; S.tab='home'; S.route=null; },
  setstate(v){ S.demo=v; },
  restart(){ S.onboarded=false; S.step=0; S.route=null; S.subjects=new Set(['Math']); },
  switchkid(){ S.route=null; S.age='5'; S.name='Liam'; S.tutor='emma'; S.tab='home'; },
  noop(){}
};

document.addEventListener('click', e => {
  const b = e.target.closest('[data-a]');
  if (!b) return;
  const fn = ACTIONS[b.dataset.a];
  if (!fn) return;
  e.preventDefault();
  fn(b.dataset.arg);
  render();
});

/* ─────────────────────────── rail ─────────────────────────── */

function syncRail(){
  document.querySelectorAll('#rail [data-r]').forEach(btn => {
    const [k,v] = btn.dataset.r.split(':');
    const cur = k==='age' ? S.age : k==='state' ? S.demo : k==='theme' ? S.theme : String(S.rtl);
    btn.setAttribute('aria-pressed', cur === v);
  });
}
const railEl = document.getElementById('rail');
const toggle = document.getElementById('railToggle');
toggle.addEventListener('click', () => railEl.classList.toggle('open'));
railEl.addEventListener('click', e => { if (e.target === railEl) railEl.classList.remove('open'); });

railEl.addEventListener('click', e => {
  const b = e.target.closest('[data-r]'); if (!b) return;
  const [k,v] = b.dataset.r.split(':');
  if (k==='age'){ S.age=v; S.tutor=M.AGES[v].tutor; S.tab='home'; S.route=null; S.full=null; }
  if (k==='state') S.demo=v;
  if (k==='theme') S.theme=v;
  if (k==='rtl') S.rtl = v==='true';
  if (k==='reset'){ Object.assign(S,{onboarded:false,step:0,route:null,full:null,tab:'home',demo:'active',
    subjects:new Set(['Math']),extraGoal:false,course:null,upload:'pick',lesson:0,picked:null}); }
  railEl.classList.remove('open');
  render();
});

/* ─────────────────────────── boot ─────────────────────────── */

function fit(){
  const avail = window.innerHeight - 48;
  const s = Math.min(1, avail / 874);
  document.documentElement.style.setProperty('--scale', window.innerWidth <= 520 ? 1 : s.toFixed(3));
}
window.__render = render;
window.addEventListener('resize', fit);
fit();
render();
})();
