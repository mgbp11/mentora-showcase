/* Mentora - clickable web prototype.
   A port of the SwiftUI app: same design tokens, same copy, same flows.
   Content is ported from Model/Library.swift; state mirrors Model/AppState.swift. */
(() => {
'use strict';

/* ─────────────────────────── data ─────────────────────────── */

const TUTORS = {
  emma:   {name:'Emma',   personality:'Warm & encouraging', voice:'"Take your time. I’m not going anywhere."',
           orb:['#FFE0B8','#FFA76E','#1C8F84','#0C5A55']},
  alex:   {name:'Alex',   personality:'Smart & direct',     voice:'"Here’s the shortest path. Ready?"',
           orb:['#D9E8FF','#7FA8FF','#4A55C7','#333B8F']},
  maya:   {name:'Maya',   personality:'Fun & energetic',    voice:'"Bet you can beat yesterday’s score 😏"',
           orb:['#FFE3EE','#FF8FB8','#C74A7E','#8F3359']},
  daniel: {name:'Daniel', personality:'Calm & patient',     voice:'"We’ll go one small step at a time."',
           orb:['#E4F2E2','#94C79B','#3E7D4E','#2A5A38']}
};
const AGES = {
  '5':  {label:'Ages 2-7',   blurb:'Voice-first, three tabs, big friendly everything', tutor:'emma',   n:5},
  '13': {label:'Ages 8-17',  blurb:'Challenges, XP and a tutor with attitude',         tutor:'maya',   n:13},
  '20': {label:'Ages 18-34', blurb:'Goal-oriented and clean',                          tutor:'emma',   n:20},
  '40': {label:'Ages 35+',   blurb:'Quiet, efficient, tied to real outcomes',          tutor:'alex',   n:42}
};
const GOALS_LIST = ['📈 Improve my grades','🎓 Pass an exam','🌱 Learn from zero','🗣️ Become fluent',
                    '💼 Improve my career','🛠️ Learn a new skill','✨ Just for fun'];
const LEVELS = [['Beginner','Starting from the beginning'],['Intermediate','I know some of it already'],
                ['Advanced','I want the hard parts']];

const LESSON = [
  {phase:'Review', bubble:"Before anything new, one quick check from yesterday. You’ve got this.",
   q:'½ + ¼ = ?', opts:['¾','⅔','²⁄₆'], correct:0,
   good:"🎉 That’s it, ¾. Warm-up done, brain switched on.",
   bad:"Close! Think in quarters: ½ is the same as two quarters.",
   hint:"💡 Turn ½ into quarters first, then add.",
   conf:"No stress. ½ is just 2 quarters. So 2 quarters + 1 quarter = 3 quarters. Try again?"},
  {phase:'Teach', bubble:"New idea, and it’s the only trick you need today: dividing by a fraction is the same as multiplying by its flip.",
   board:{math:'a ÷ b⁄c  =  a × c⁄b', note:'Dividing = multiply by the flip 🔄'},
   hint:'💡 "Flip" means swap the top and bottom of the second fraction.',
   conf:"Think of ÷½ as asking: how many halves fit inside? Two halves fit in every whole, so dividing by ½ doubles things."},
  {phase:'Example', bubble:"Let’s watch one together before you try.",
   board:{math:'¾ ÷ ½ = ¾ × ²⁄₁ = 1½', note:'Flip ½ into ²⁄₁, then multiply across'},
   hint:'💡 ½ flipped is ²⁄₁, which is just 2.',
   conf:"Step by step: keep ¾, flip ½ into ²⁄₁, multiply tops (3×2=6) and bottoms (4×1=4). 6⁄4 = 1½."},
  {phase:'Practice', bubble:"Nice. Now you try one. Take your time, I’m right here.",
   q:'⅖ ÷ ⅓ = ?', opts:['⅖ × 3 → 6⁄5','⅖ × ³⁄₁ = 1⅕','2⁄15'], correct:1,
   good:"🎉 Exactly! You flipped it. That’s the whole trick.",
   bad:"Almost. Flip the second fraction first, then multiply.",
   hint:"💡 ⅓ flipped becomes ³⁄₁. Then multiply.",
   conf:"Let’s slow down: keep ⅖, flip ⅓ into ³⁄₁. Now it’s ⅖ × ³⁄₁ = 6⁄5 = 1⅕. Which option says that?"},
  {phase:'Check', bubble:"Last one. This proves you own it.",
   q:'⅚ ÷ ¼ = ?', opts:['⅚ × ¼ = 5⁄24','⅚ × ⁴⁄₁ = 3⅓','⁴⁄₆'], correct:1,
   good:"🔥 Three in a row. Fractions are becoming your thing.",
   bad:"You’ve got this. Flip ¼ into ⁴⁄₁ first.",
   hint:"💡 ¼ upside-down is ⁴⁄₁, which is just 4.",
   conf:"Same trick as before: ⅚ stays, ¼ flips into ⁴⁄₁. ⅚ × 4 = 20⁄6 = 3⅓."},
  {phase:'Summary', bubble:"Here’s the whole lesson in one line. Read it once, then it’s yours.",
   board:{math:'÷ a fraction  →  × its flip', note:'You caught your own flip mistake today 👏'},
   hint:'💡 Tomorrow: the same trick inside word problems.',
   conf:"One line to remember: when you divide by a fraction, flip it and multiply. That’s all of it."}
];

const BOARDS = [
  {b:"Let’s look at your homework photo. Question 3: you multiplied instead of dividing. Want to see where it flipped?",
   m:'¾ ÷ ½ = ¾ × ²⁄₁ = 1½', n:'Dividing = multiply by the flip 🔄'},
  {b:'Okay, different angle: dividing by ½ is asking "how many halves fit inside ¾?" Two halves fit in every whole.',
   m:'¾ ÷ ½ → "how many ½s in ¾?" → 1½', n:'Same answer, new lens 👓'},
  {b:"Here’s a fresh one, step by step. Watch what happens to the second fraction:",
   m:'⅗ ÷ ²⁄₃ = ⅗ × ³⁄₂ = ⁹⁄₁₀', n:'Flip ²⁄₃ → ³⁄₂, multiply across'},
  {b:"Totally fine. Let’s slow way down. Dividing by smaller pieces gives you MORE pieces. That’s why ÷½ makes things bigger.",
   m:'6 ÷ 2 = 3   but   6 ÷ ½ = 12', n:'Smaller divisor → bigger answer'},
  {b:"Good question. Here’s the cleanest way I know to see it:",
   m:'⅖ ÷ ⅓ = ⅖ × ³⁄₁ = 1⅕', n:'Your question, on the board'},
  {b:"Opened your worksheet. Question 2 is the fun one. Same flip idea. Walk through it with me?",
   m:'⅘ ÷ ²⁄₅ = ⅘ × ⁵⁄₂ = 2', n:'From your upload'}
];

const SUBJECTS = [
  {e:'🧮',n:'Math',s:'Fractions & more',c:'School',g:['#147D74','#0C5A55']},
  {e:'💬',n:'Languages',s:'Spanish, French…',c:'Languages',g:['#4A55C7','#333B8F']},
  {e:'🧑‍💻',n:'Coding',s:'Python, web',c:'Technology',g:['#FF8A5C','#E2604C']},
  {e:'🎨',n:'Art',s:'Draw & design',c:'Life & Interests',g:['#C74A7E','#8F3359']},
  {e:'🔬',n:'Science',s:'Physics, bio…',c:'School',g:['#3E7D4E','#2A5A38']},
  {e:'📈',n:'Finance',s:'Money skills',c:'Career',g:['#8A6413','#5F4409']},
  {e:'🤖',n:'AI',s:'Use it well',c:'Technology',g:['#17313A','#0C5A55']},
  {e:'🎵',n:'Music',s:'Theory & ear',c:'Life & Interests',g:['#E2604C','#8F3359']},
  {e:'💼',n:'Business',s:'Start & grow',c:'Career',g:['#0C5A55','#17313A']},
  {e:'🏛️',n:'History',s:'Stories that stick',c:'School',g:['#74847F','#17313A']},
  {e:'📚',n:'English',s:'Writing & reading',c:'School',g:['#1C8F84','#0C5A55']},
  {e:'🌍',n:'Other',s:'Ask for anything',c:'Life & Interests',g:['#74847F','#3F5450']}
];
const CATS = ['All','School','Languages','Technology','Career','Life & Interests'];

const GOALS = [
  {id:'spanish',e:'🇪🇸',t:'Speak Spanish fluently',p:.68,meta:'Started in January · 4 milestones',
   note:'"You already understand more than you can say, so we practise speaking, not grammar drills."',
   ms:[['Survival basics','Completed · 3 weeks ago','done'],
       ['Present-tense conversations','Completed · last week','done'],
       ['Hold a 10-minute conversation','Current focus · practice daily with your tutor','now'],
       ['Restaurant & travel talk','Up next',''],
       ['Talk about the past','Later','']]},
  {id:'algebra',e:'📐',t:'Pass the algebra exam',p:.41,meta:'May 12 · on track',
   note:'"We’ll do past papers only once the fractions are automatic. No point rehearsing a shaky step."',
   ms:[['Linear equations','Completed · 2 weeks ago','done'],
       ['Fractions & ratios','Current focus · 4 lessons left','now'],
       ['Quadratics','Up next',''],
       ['Past papers under time','Final two weeks','']]}
];
const EXTRA_GOAL = {id:'guitar',e:'🎸',t:'Learn guitar basics',p:0,meta:'New goal · your tutor is drafting the roadmap…',
  note:'"Give me a day and I’ll have a proper path ready. For now: let’s just make one clean sound."',
  ms:[['Hold the guitar & tune it','Ready now','now'],['Your first three chords','Up next',''],
      ['Play a song end to end','Later','']]};

const SKILLS = [['Fractions',.86,'Mastered'],['Verb tenses',.58,'Improving ↑'],
                ['Word problems',.32,'Practice'],['Reading aloud',.71,'Improving ↑']];
const ACHIEVEMENTS = [['🏅','Problem Solver','Solved 25 problems without a hint',1],
  ['🔥','First streak','5 days in a row',1],['🌅','Early bird','Three lessons before 9am',1],
  ['🎯','Milestone maker','Completed your first milestone',1],
  ['🏃','Marathon','Learn 30 days in a row',0],['🗣️','Ten minutes','Hold a 10-minute Spanish conversation',0]];

const COURSES = {
  pdf:{file:'Algebra Syllabus.pdf',name:'Algebra: Exam Prep',
       l:['Linear equations refresher','Quadratics, gently','Word problems & exam tactics']},
  doc:{file:'Biology notes.docx',name:'Biology: Your Notes, Taught',
       l:['Cells: what your notes cover','Photosynthesis, step by step','Genetics & the tricky parts']},
  photo:{file:'12 book pages',name:'From Your Textbook',
       l:['Chapter 1: the big idea','Chapter 2: worked examples','Chapter 3 and beyond']}
};
const VOICE_LINES = ['So, how many halves fit inside three quarters?',
  'Take a second. Say it out loud when you’ve got it.','One and a half. Exactly right.',
  'That’s the whole idea of dividing by a fraction.'];
const PARENT_NARRATIVE = 'Liam spent 18 minutes with Emma today, mostly counting to twenty and matching letter sounds. He’s strong at numbers. He got every counting question right on the first try. Letter sounds still need practice: b and d get mixed up. Emma will keep them in tomorrow’s warm-up, disguised as a game.';

/* ─────────────────────────── state ─────────────────────────── */

const S = {
  onboarded:false, step:0,
  name:'Noa', age:'20', subjects:new Set(['Math']), goal:3, level:1, tutor:'emma',
  tab:'home', route:null, full:null,
  demo:'active', rtl:false, theme:'light',
  board:0, learnerMsg:'Yes, show me 🙏', listening:false, typing:false, draft:'',
  lesson:0, picked:null, hint:false, confused:false, voiceAnswer:false,
  query:'', cat:'All', course:null, upload:'pick', extraGoal:false, homework:'capture',
  dailyLimit:30, pace:'Steady', voiceReplies:true, voiceLines:0
};
const T = () => TUTORS[S.tutor];
const kid = () => S.age === '5';
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* copy that varies by state and age, ported from AppState.swift */
function greetTitle(){
  if (S.demo==='first') return `Welcome, ${esc(S.name)} 👋`;
  if (S.demo==='goal')  return `You did it, ${esc(S.name)} 🎉`;
  if (S.age==='13') return `Yo, ${esc(S.name)} ⚡`;
  if (S.age==='40') return `Good evening, ${esc(S.name)}`;
  if (kid())        return `Hi ${esc(S.name)}! 🌟`;
  return `Good morning, ${esc(S.name)} 👋`;
}
function greetSub(){
  if (S.demo==='first') return 'Your tutor is ready to meet you';
  if (S.demo==='goal')  return 'Present-tense conversations, complete';
  if (S.demo==='struggle') return 'Yesterday was a tough one. That’s allowed.';
  if (S.demo==='streak') return '5 days in a row. Don’t break it now 🔥';
  if (S.age==='13') return '3 friends kept their streak today';
  if (S.age==='40') return '22 min today · right on pace';
  return 'Ready to keep going?';
}
function tutorMsg(){
  const n = T().name;
  if (S.demo==='first') return `"Hi ${esc(S.name)}, I’m ${n}, your teacher from now on. Shall we start with something small so I can see how you like to learn?"`;
  if (S.demo==='struggle') return '"Yesterday’s word problems knocked you about a bit. That happens to everyone. Let’s take one apart together, slowly. No timer."';
  if (S.demo==='goal') return '"You held a whole conversation in the present tense. Three weeks ago you couldn’t order a coffee. Want to pick the next milestone?"';
  if (S.demo==='streak') return '"Five days running. Ten minutes today keeps it alive. Shall we do the short version?"';
  if (S.age==='13') return '"Beat yesterday’s quiz score? Bet you can’t 😏"';
  if (S.age==='40') return '"Before Thursday’s board meeting, let’s rehearse the cash-flow section once more. 15 minutes is enough."';
  if (kid()) return 'Ready to count with me?';
  return '"Yesterday fractions were tricky. Want a 5-minute warm-up before today’s lesson?"';
}
function ctaLabel(){
  if (S.demo==='first') return 'Start my first lesson';
  if (S.demo==='goal')  return 'Choose the next milestone';
  if (S.demo==='struggle') return `Take it slowly with ${T().name}`;
  if (S.age==='13') return 'Take today’s challenge';
  if (S.age==='40') return 'Start session';
  return 'Continue today’s lesson';
}
const showStreak = () => S.demo !== 'first';
const allGoals = () => S.extraGoal ? GOALS.concat([EXTRA_GOAL]) : GOALS;

/* ─────────────────────────── components ─────────────────────────── */

function orb(size, live, who){
  const c = (TUTORS[who] || T()).orb;
  const g = `radial-gradient(circle at 32% 28%, ${c[0]} 0%, ${c[1]} 40%, ${c[2]} 82%, ${c[3]} 100%)`;
  return `<div class="orb ${live?'live':''}" style="width:${size}px;height:${size}px">
    <div class="ball" style="background:${g}"></div>
    <div class="ring"></div>${live?'<div class="ring2"></div>':''}
  </div>`;
}
const bar = (p, warm) => `<div class="bar ${warm?'warm':''}"><i style="width:${Math.max(0,Math.min(1,p))*100}%"></i></div>`;
const milestone = (t, s, kind, last) => `<div class="milestone ${kind}">
    <div class="track"><div class="dot"></div>${last?'':'<div class="line"></div>'}</div>
    <div class="txt"><b>${t}</b><small>${s}</small></div></div>`;
/* Monochrome glyphs so the chrome reads like the native SF Symbols set
   rather than a row of multicoloured emoji. */
const ICONS = {
  home:'M3 10.2 12 3l9 7.2V21h-6v-6H9v6H3z',
  learn:'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20m4.2 5.8-2.4 6-6 2.4 2.4-6zM12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2',
  goals:'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20m0 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12m0 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4',
  progress:'M3 17.5 9 11l4 4 8-8.5M21 6.5h-5m5 0v5',
  stars:'M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z',
  cap:'M12 3 1.5 8.2 12 13.4l8.5-4.2v5.6h1.9V8.2zM5.6 12.2v4.1c0 1.9 3 3.4 6.4 3.4s6.4-1.5 6.4-3.4v-4.1L12 15.4z',
  keyboard:'M3 6h18v12H3zm3 3h1.5v1.5H6zm3.2 0h1.5v1.5H9.2zm3.2 0H14v1.5h-1.5zm3.3 0H17v1.5h-1.5zM6 12.2h1.5v1.5H6zm3.2 0h1.5v1.5H9.2zm3.2 0H14v1.5h-1.5zm3.3 0H17v1.5h-1.5zM7.5 15h9v1.5h-9z',
  mic:'M12 14.5a3 3 0 0 0 3-3v-5a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3m5.5-3.2a5.5 5.5 0 0 1-11 0H5a7 7 0 0 0 6.2 6.9V21h1.6v-2.8A7 7 0 0 0 19 11.3z',
  camera:'M9.4 4h5.2l1.2 2H20a1.5 1.5 0 0 1 1.5 1.5v11A1.5 1.5 0 0 1 20 20H4a1.5 1.5 0 0 1-1.5-1.5v-11A1.5 1.5 0 0 1 4 6h4.2zM12 8.6a4.2 4.2 0 1 0 0 8.4 4.2 4.2 0 0 0 0-8.4m0 1.8a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8',
  clip:'M17.5 7.5v8.8a5 5 0 0 1-10 0V6.8a3.4 3.4 0 0 1 6.8 0v9a1.8 1.8 0 1 1-3.6 0V7.8h1.7v8a.1.1 0 0 0 .2 0v-9a1.7 1.7 0 1 0-3.4 0v9.5a3.3 3.3 0 0 0 6.6 0V7.5z',
  waveform:'M2 11h2v2H2zm3.5-3h2v8h-2zM9 4.5h2v15H9zm3.5 2h2v11h-2zM16 8h2v8h-2zm3.5 3h2v2h-2z',
  user:'M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9m0 2c-4 0-7.5 2.2-7.5 5v2h15v-2c0-2.8-3.5-5-7.5-5'
};
const icon = (n, size=20, fill=true) => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true"
  ${fill?'fill="currentColor"':'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"'}><path d="${ICONS[n]}"/></svg>`;

const status = (light) => `<div class="statusbar"><span>9:41</span><span class="right">▪▪▪ ᯤ ▮</span></div>`;

const row = (act, emoji, tint, title, sub, opts={}) => `<button class="row ${opts.dashed?'dashed':''}" data-a="${act}" ${opts.arg?`data-arg="${opts.arg}"`:''}>
    <span class="ico" style="background:${tint}">${emoji}</span>
    <span class="t"><b style="${opts.color?`color:${opts.color}`:''}">${title}</b><small>${sub}</small></span>
    ${opts.noChev?'':'<span class="chev">›</span>'}</button>`;

window.__M = {S, TUTORS, AGES, GOALS_LIST, LEVELS, LESSON, BOARDS, SUBJECTS, CATS, GOALS, EXTRA_GOAL,
  SKILLS, ACHIEVEMENTS, COURSES, VOICE_LINES, PARENT_NARRATIVE, T, kid, esc, greetTitle, greetSub,
  tutorMsg, ctaLabel, showStreak, allGoals, orb, bar, milestone, row, icon, status};
})();
