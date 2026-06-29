/* ============================================================
   ISTQB CTFL v4.0 — Trener · silnik nauki adaptacyjnej
   Korzysta z globalnych: QUESTIONS, CH_NAMES, SVG23, SVG_B23
   ============================================================ */
const LS_KEY = "istqb_ctfl_v4_progress_v2";
const MASTERY = 2;                 // tyle poprawnych z rzędu = „opanowane”
const LS_EXAM = "istqb_exam_date";

const el = id => document.getElementById(id);

let state = loadState();           // { [id]: {seen, wrong, streak} }
let mode = "drill";                // "drill" | "linear"
let view = [];                     // aktualnie widoczna lista (po filtrach), sort wg n
let current = null;                // bieżące pytanie (obiekt)
let hist = [];                     // historia odwiedzin (tryb nauki)
let histPos = 0;
let shown = null;                  // {id, selected[], correct} — pokazana odpowiedź (ulotne)

function loadState(){ try{ return JSON.parse(localStorage.getItem(LS_KEY)) || {}; }catch(e){ return {}; } }
function saveState(){ localStorage.setItem(LS_KEY, JSON.stringify(state)); }
function stOf(q){ return state[q.id] || {seen:0,wrong:0,streak:0}; }
function isMastered(q){ return stOf(q).streak >= MASTERY; }

/* źródło / zestaw */
function catOf(q){ if(q.id[0]==="P") return "own"; if(q.id[0]==="B") return "B"; if(q.id[0]==="A") return "A-dod"; return "A-egz"; }
const SRC_LABEL = {
  "A-egz":"Oficjalne ISTQB · zestaw A (egzamin)",
  "A-dod":"Oficjalne ISTQB · zestaw A (dodatkowe)",
  "B":"Oficjalne ISTQB · zestaw B",
  "own":"Na podstawie sylabusa"
};

/* --- odliczanie do egzaminu --- */
function updateCountdown() {
  const stored = localStorage.getItem(LS_EXAM);
  if (!stored) { el("cdNum").textContent = "–"; el("cdHint").textContent = "kliknij, by ustawić"; return; }
  const exam = new Date(stored); exam.setHours(0,0,0,0);
  const today = new Date(); today.setHours(0,0,0,0);
  el("cdNum").textContent = Math.max(0, Math.round((exam - today) / 86400000));
  el("cdHint").textContent = exam.toLocaleDateString("pl-PL");
}
updateCountdown();
el("cdBox").addEventListener("click", () => {
  const inp = el("cdInput");
  const stored = localStorage.getItem(LS_EXAM);
  if (stored) inp.value = stored;
  inp.style.pointerEvents = "auto";
  inp.showPicker ? inp.showPicker() : inp.click();
  inp.style.pointerEvents = "none";
});
el("cdInput").addEventListener("change", e => {
  if (e.target.value) { localStorage.setItem(LS_EXAM, e.target.value); updateCountdown(); }
});

/* --- pula pytań (przełączana między zakładkami: oficjalne / trening) --- */
let POOL = QUESTIONS;
let isPracticePool = false;

/* --- filtr rozdziałów (przebudowywany przy zmianie puli) --- */
function buildChapterOptions(){
  const sel = el("chapter");
  sel.innerHTML="";
  const o0=document.createElement("option"); o0.value="all"; o0.textContent="Wszystkie rozdziały"; sel.appendChild(o0);
  for(let c=1;c<=6;c++){
    const cnt = POOL.filter(q=>q.ch===c).length;
    if(cnt===0) continue;
    const o=document.createElement("option"); o.value=String(c);
    o.textContent = CH_NAMES[c] + "  (" + cnt + ")";
    sel.appendChild(o);
  }
}
buildChapterOptions();

/* --- przełączanie puli pytań (wywoływane z obsługi zakładek) --- */
function switchPool(which){
  exitExamUI();   // wyjscie z UI egzaminu (jesli bylo aktywne) - timer wstrzymany, postep zachowany
  const isPractice = which==="practice";
  isPracticePool = isPractice;
  POOL = isPractice ? (window.PRACTICE||[]) : QUESTIONS;
  // tryb egzaminu istnieje tylko w puli oficjalnej (rozkład 40 pytań)
  if(isPractice && mode==="exam"){ mode="drill"; }
  el("modeSeg").querySelectorAll("button").forEach(b=>{
    b.classList.toggle("on", b.dataset.mode===mode);
    if(b.dataset.mode==="exam") b.classList.toggle("hidden", isPractice);
  });
  // banner ostrzegawczy + filtr źródła tylko dla oficjalnych
  el("practiceWarn").classList.toggle("hidden", !isPractice);
  el("fldSrc").classList.toggle("hidden", isPractice);
  if(isPractice) el("srcSel").value="all";
  examSet=[]; examSubmitted=false; examReview=false;
  el("examResult").classList.remove("show");
  el("examBar").classList.add("hidden");
  buildChapterOptions();
  el("chapter").value="all"; el("onlyUn").checked=false;
  current=null; setModeUI(); buildView(true);
}
window.switchPool = switchPool;

/* ====================== BUDOWA WIDOKU ====================== */
function buildView(reset){
  const ch = el("chapter").value, src = el("srcSel").value, un = el("onlyUn").checked;
  view = POOL.filter(q=>{
    if(ch!=="all" && q.ch!==Number(ch)) return false;
    if(src!=="all" && catOf(q)!==src) return false;
    if(un && isMastered(q)) return false;
    return true;
  }).sort((a,b)=>a.n-b.n);

  if(reset || !current || !view.includes(current)){
    current = view.find(q=>!isMastered(q)) || view[0] || null;
  }
  hist = current ? [current] : []; histPos = 0; shown = null;
  el("summary").classList.remove("show");
  el("card").classList.remove("hidden");
  if(!current) renderEmpty(); else render();
  updateStats(); renderNav();
}

/* ====================== NAWIGATOR ====================== */
function renderNav(){
  if(mode==="exam"){ renderExamNav(); return; }
  const g = el("navgrid"); g.innerHTML="";
  view.forEach(q=>{
    const b=document.createElement("button");
    b.textContent=q.id;
    const s=stOf(q);
    if(s.streak>=MASTERY) b.classList.add("ok");
    else if(s.seen>0 && s.streak===0) b.classList.add("bad");
    else if(s.seen>0) b.classList.add("amber");
    if(current && q.id===current.id) b.classList.add("cur");
    b.title = CH_NAMES[q.ch] + (s.seen? "  ·  seria "+s.streak+"/"+MASTERY : "  ·  jeszcze nie próbowane");
    b.onclick=()=>{ goTo(q); };
    g.appendChild(b);
  });
}
function goTo(q){
  current=q;
  if(mode==="drill"){ hist=hist.slice(0,histPos+1); hist.push(q); histPos=hist.length-1; }
  shown=null; render(); renderNav();
}

/* ====================== RENDER PYTANIA ====================== */
function renderEmpty(){
  el("scenario").classList.add("hidden");
  el("qtext").textContent = el("onlyUn").checked
    ? "🎉 Wszystkie pytania w tym filtrze są opanowane! Wyłącz „Tylko nieopanowane” albo zmień filtr."
    : "Brak pytań spełniających wybrane kryteria.";
  el("selhint").textContent=""; el("opts").innerHTML=""; el("checkrow").innerHTML="";
  el("explain").classList.remove("show");
  el("mSrc").classList.add("hidden");
  el("mCh").textContent=""; el("mLo").textContent=""; el("mK").textContent="";
  el("mStat").innerHTML="";
}

function render(){
  if(mode==="exam"){ renderExam(); return; }
  const q=current; if(!q){ renderEmpty(); return; }
  const s=stOf(q);
  const answered = shown && shown.id===q.id;

  // znacznik źródła
  const cat=catOf(q);
  const badge=el("mSrc"); badge.classList.remove("hidden");
  badge.className = "srcbadge " + (cat==="own"?"own":"off");
  badge.innerHTML = `<span class="dot"></span>${SRC_LABEL[cat]}`;

  el("mCh").style.display=""; el("mLo").style.display=""; el("mK").style.display="";
  el("mCh").textContent="Rozdz. "+q.ch; el("mCh").title=CH_NAMES[q.ch];
  el("mLo").textContent=q.lo; el("mK").textContent=q.k;

  // status opanowania + numer
  const idx = view.indexOf(q);
  let pills = `<span class="qnum">${idx>=0?("Pytanie "+(idx+1)+" / "+view.length+" · "):""}#${q.id}</span>`;
  if(s.streak>=MASTERY) pills += `<span class="mpill done">✓ opanowane</span>`;
  else pills += `<span class="mpill">seria ${s.streak}/${MASTERY}</span>`;
  if(s.wrong>0) pills += `<span class="mpill">błędy: ${s.wrong}</span>`;
  el("mStat").innerHTML = pills;

  // scenariusz
  const sc=el("scenario");
  if(q.scenario){ sc.innerHTML=q.scenario; sc.classList.remove("hidden"); }
  else { sc.innerHTML=""; sc.classList.add("hidden"); }

  el("qtext").textContent=q.q;
  el("selhint").textContent = q.sel>1 ? ("Zaznacz "+q.sel+" odpowiedzi.") : "Zaznacz jedną odpowiedź.";

  // opcje
  const wrap=el("opts"); wrap.innerHTML="";
  q.opts.forEach(([letter,text])=>{
    const btn=document.createElement("button");
    btn.className="opt"; btn.dataset.letter=letter;
    btn.innerHTML=`<span class="letter">${letter.toUpperCase()}</span><span class="otext">${escapeHtml(text)}</span><span class="mark"></span>`;
    btn.onclick=()=>onPick(letter);
    wrap.appendChild(btn);
  });

  // wiersz „Sprawdź” dla wielokrotnego wyboru
  const cr=el("checkrow"); cr.innerHTML="";
  if(q.sel>1 && !answered){
    const b=document.createElement("button"); b.className="btn primary"; b.id="btnCheck"; b.textContent="Sprawdź odpowiedź";
    b.onclick=evaluateMulti; cr.appendChild(b);
    const h=document.createElement("span"); h.id="multiHint"; h.style.cssText="font-size:13px;color:var(--muted)"; cr.appendChild(h);
  }

  if(answered){ paintAnswered(q); }
  else { el("explain").classList.remove("show"); if(q.sel>1) updateMultiHint(q); }

  el("btnPrev").disabled = mode==="drill" ? histPos<=0 : view.indexOf(q)<=0;
  el("btnNext").textContent = "Następne →";
  el("card").scrollIntoView({behavior:"smooth",block:"start"});
}

/* ====================== ODPOWIADANIE ====================== */
// bufor zaznaczeń dla bieżącego (jeszcze nieocenionego) pytania wielokrotnego wyboru
let armSel = {id:null, sel:[]};

function onPick(letter){
  const q=current;
  if(mode==="exam"){ if(!examReview) examPick(letter); return; }
  if(shown && shown.id===q.id) return; // zablokowane po ocenie
  if(q.sel===1){ evaluate(q,[letter]); return; }
  if(armSel.id!==q.id) armSel={id:q.id, sel:[]};
  const i=armSel.sel.indexOf(letter);
  if(i>=0) armSel.sel.splice(i,1);
  else { if(armSel.sel.length>=q.sel) armSel.sel.shift(); armSel.sel.push(letter); }
  [...el("opts").children].forEach(b=>b.classList.toggle("sel", armSel.sel.includes(b.dataset.letter)));
  updateMultiHint(q);
}
function updateMultiHint(q){
  const h=el("multiHint"); if(!h) return;
  const sel = armSel.id===q.id?armSel.sel:[];
  const need=q.sel-sel.length;
  h.textContent = need>0 ? ("Zaznacz jeszcze "+need) : "Gotowe — kliknij „Sprawdź”.";
  const b=el("btnCheck"); if(b) b.disabled = sel.length!==q.sel;
}
function evaluateMulti(){
  const q=current; const sel = armSel.id===q.id?armSel.sel:[];
  if(sel.length!==q.sel) return;
  evaluate(q, sel.slice());
}
function evaluate(q, selected){
  const cs=new Set(q.correct), ss=new Set(selected);
  const correct = cs.size===ss.size && [...ss].every(x=>cs.has(x));
  const s = state[q.id] || {seen:0,wrong:0,streak:0};
  s.seen++;
  if(correct) s.streak++; else { s.streak=0; s.wrong++; }
  state[q.id]=s; saveState();
  shown={id:q.id, selected:selected.slice(), correct};
  armSel={id:null, sel:[]};
  paintAnswered(q);
  updateStats(); renderNav();
}

function paintAnswered(q){
  const cs=new Set(q.correct);
  [...el("opts").children].forEach(btn=>{
    const L=btn.dataset.letter; btn.disabled=true; btn.classList.remove("sel");
    const mk=btn.querySelector(".mark");
    if(cs.has(L)){ btn.classList.add("correct"); mk.textContent="✓"; }
    if(shown.selected.includes(L) && !cs.has(L)){ btn.classList.add("incorrect"); mk.textContent="✗"; }
  });
  el("checkrow").innerHTML="";
  const v=el("verdict");
  const s=stOf(q);
  if(shown.correct){
    const tail = s.streak>=MASTERY ? " — opanowane! 🎯" : ` (seria ${s.streak}/${MASTERY})`;
    v.className="verdict good"; v.innerHTML=`<span class="pill">✓ Poprawnie</span> Dobra odpowiedź!${tail}`;
  } else {
    const good=q.correct.map(c=>c.toUpperCase()).join(", ");
    v.className="verdict poor"; v.innerHTML=`<span class="pill">✗ Niepoprawnie</span> Poprawna odpowiedź: ${good} — wróci do powtórki`;
  }
  const gw=el("expGeneralWrap"); gw.innerHTML="";
  if(q.exp._){ const d=document.createElement("div"); d.className="exgeneral"; d.textContent=q.exp._; gw.appendChild(d); }
  const rows=el("exrows"); rows.innerHTML="";
  q.opts.forEach(([letter])=>{
    const t=q.exp[letter]; if(!t) return;
    const r=document.createElement("div"); r.className="exrow "+(cs.has(letter)?"c":"w");
    r.innerHTML=`<span class="el">${letter.toUpperCase()}</span><span class="et">${escapeHtml(t)}</span>`;
    rows.appendChild(r);
  });
  el("syref").textContent = "Sylabus CTFL v4.0 · cel nauczania "+q.lo+" · poziom "+q.k+" · "+CH_NAMES[q.ch];
  el("explain").classList.add("show");
  // odśwież status (seria mogła się zmienić)
  const idx=view.indexOf(q);
  let pills=`<span class="qnum">${idx>=0?("Pytanie "+(idx+1)+" / "+view.length+" · "):""}#${q.id}</span>`;
  pills += s.streak>=MASTERY ? `<span class="mpill done">✓ opanowane</span>` : `<span class="mpill">seria ${s.streak}/${MASTERY}</span>`;
  if(s.wrong>0) pills += `<span class="mpill">błędy: ${s.wrong}</span>`;
  el("mStat").innerHTML=pills;
}

/* ====================== STATYSTYKI ====================== */
function calc(list){
  let m=0,seen=0,corr=0;
  list.forEach(q=>{ const s=stOf(q); if(s.streak>=MASTERY)m++; seen+=s.seen; corr+=(s.seen-s.wrong); });
  return {m, total:list.length, seen, corr, remain:list.length-m,
          acc: seen?Math.round(corr/seen*100):null,
          mpct: list.length?Math.round(m/list.length*100):0};
}
function updateStats(){
  if(mode==="exam") return;
  const c=calc(view);
  el("stMastered").textContent = c.m+" / "+c.total;
  el("stPct").textContent = c.acc==null?"—":c.acc+"%";
  el("stRemain").textContent = c.remain;
  el("stSeen").textContent = c.seen;
  el("masterFill").style.width = c.mpct+"%";
  el("masterPct").textContent = c.mpct+"%";
}

/* ====================== NAWIGACJA ====================== */
function next(){
  if(mode==="exam"){ examNav(1); return; }
  if(!current){ return; }
  if(view.every(isMastered)){ showSummary(); return; }
  if(mode==="linear"){
    const i=view.indexOf(current);
    if(i<view.length-1){ current=view[i+1]; shown=null; render(); }
    else showSummary();
    renderNav(); return;
  }
  // drill
  if(histPos < hist.length-1){ histPos++; current=hist[histPos]; }
  else {
    current = pickNext(current?current.id:null);
    hist=hist.slice(0,histPos+1); hist.push(current); histPos=hist.length-1;
  }
  shown=null; render(); renderNav();
}
function prev(){
  if(mode==="exam"){ examNav(-1); return; }
  if(mode==="linear"){
    const i=view.indexOf(current);
    if(i>0){ current=view[i-1]; shown=null; render(); renderNav(); }
    return;
  }
  if(histPos>0){ histPos--; current=hist[histPos]; shown=null; render(); renderNav(); }
}
function weight(q){
  const s=stOf(q);
  if(s.streak>=MASTERY) return 1;
  if(s.seen===0) return 6;
  if(s.streak===0) return 12;   // błędne / nieopanowane — najczęściej
  return 4;                      // seria 1 — prawie opanowane
}
function pickNext(excludeId){
  let pool=view.filter(q=>q.id!==excludeId);
  if(pool.length===0) pool=view.slice();
  const un=pool.filter(q=>!isMastered(q));
  const src=un.length?un:pool;
  let tot=0; const w=src.map(q=>{const x=weight(q);tot+=x;return x;});
  let r=Math.random()*tot;
  for(let i=0;i<src.length;i++){ r-=w[i]; if(r<=0) return src[i]; }
  return src[src.length-1];
}

/* ====================== PODSUMOWANIE ====================== */
function showSummary(){
  el("card").classList.add("hidden");
  const sm=el("summary"); sm.classList.add("show");
  const c=calc(view);
  el("smScore").innerHTML = c.mpct+`%<small> &nbsp;opanowane (${c.m}/${c.total})</small>`;
  let verdict;
  if(c.m===c.total && c.total>0) verdict="🎉 Cały wybrany materiał opanowany — każde pytanie zaliczone "+MASTERY+"× z rzędu. Możesz przełączyć źródło/rozdział i ciągnąć dalej, albo wrócić tu na dzień przed egzaminem.";
  else verdict=`Opanowane ${c.m} z ${c.total}. Skuteczność ogólna: ${c.acc==null?"—":c.acc+"%"}. Próg ISTQB to 65% (26/40). „Nieopanowane” to te, których nie zaliczyłeś jeszcze ${MASTERY}× z rzędu — lecą częściej w trybie Nauka.`;
  el("smVerdict").textContent=verdict;

  // rozbicie wg rozdziałów (cały zestaw QUESTIONS)
  const br=el("smBreak"); br.innerHTML="";
  const head=document.createElement("div"); head.className="chrow";
  head.innerHTML=`<span class="nm" style="color:var(--muted);font-size:12px;text-transform:uppercase;letter-spacing:.5px">Opanowanie wg rozdziału</span><span class="ct"></span>`;
  br.appendChild(head);
  for(let ch=1;ch<=6;ch++){
    const qs=POOL.filter(q=>q.ch===ch); if(qs.length===0) continue;
    const cc=calc(qs);
    const row=document.createElement("div"); row.className="chrow";
    row.innerHTML=`<span class="nm">${CH_NAMES[ch]}</span><span class="ct">${cc.m}/${cc.total} opanowane · skut. ${cc.acc==null?"—":cc.acc+"%"}</span><span class="chbar"><i style="width:${cc.mpct}%"></i></span>`;
    br.appendChild(row);
  }
  // rozbicie wg zestawu tylko dla oficjalnej puli
  if(POOL===QUESTIONS){
    const head2=document.createElement("div"); head2.className="chrow"; head2.style.marginTop="8px";
    head2.innerHTML=`<span class="nm" style="color:var(--muted);font-size:12px;text-transform:uppercase;letter-spacing:.5px">Opanowanie wg zestawu</span><span class="ct"></span>`;
    br.appendChild(head2);
    [["A-egz","Zestaw A — egzamin"],["A-dod","Zestaw A — dodatkowe"],["B","Zestaw B"]].forEach(([cat,name])=>{
      const qs=QUESTIONS.filter(q=>catOf(q)===cat); const cc=calc(qs);
      const row=document.createElement("div"); row.className="chrow";
      row.innerHTML=`<span class="nm">${name}</span><span class="ct">${cc.m}/${cc.total} opanowane · skut. ${cc.acc==null?"—":cc.acc+"%"}</span><span class="chbar"><i style="width:${cc.mpct}%"></i></span>`;
      br.appendChild(row);
    });
  }
}

/* ====================== ZDARZENIA ====================== */
el("chapter").onchange=()=>buildView(false);
el("srcSel").onchange=()=>buildView(false);
el("onlyUn").onchange=()=>buildView(false);
el("modeSeg").querySelectorAll("button").forEach(b=>{
  b.onclick=()=>{
    mode=b.dataset.mode;
    [...el("modeSeg").children].forEach(x=>x.classList.toggle("on", x===b));
    el("summary").classList.remove("show");
    el("examResult").classList.remove("show");
    setModeUI();
    if(mode==="exam"){
      el("card").classList.remove("hidden");
      if(!examSet.length) startExam();
      else if(examSubmitted && !examReview) showExamResult();
      else { examReview=false; render(); renderNav(); }
    } else {
      el("examBar").classList.add("hidden");
      current=null; buildView(true);
    }
  };
});

/* widoczność elementów zależnie od trybu */
function setModeUI(){
  const exam = mode==="exam";
  el("studyStats").classList.toggle("hidden", exam);
  el("examBar").classList.toggle("hidden", !exam);
  el("fldChapter").classList.toggle("hidden", exam);
  el("fldSrc").classList.toggle("hidden", exam || isPracticePool);
  el("fldOnlyUn").classList.toggle("hidden", exam);
  el("btnSummary").classList.toggle("hidden", exam);
  el("btnSkip").classList.toggle("hidden", exam);
}
el("btnNext").onclick=next;
el("btnPrev").onclick=prev;
el("btnSkip").onclick=next;
el("btnSummary").onclick=showSummary;
el("btnReset").onclick=()=>{ if(confirm("Wyczyścić cały zapisany postęp (serie i statystyki)?")){ state={}; saveState(); current=null; buildView(true); } };
el("smRestart").onclick=()=>{ el("srcSel").value="all"; el("chapter").value="all"; el("onlyUn").checked=false; current=null; buildView(true); };
el("smWrong").textContent="Ćwicz tylko nieopanowane";
el("smWrong").onclick=()=>{ el("onlyUn").checked=true; current=null; buildView(true); };
el("smClose").onclick=()=>{ el("summary").classList.remove("show"); el("card").classList.remove("hidden"); render(); };

document.addEventListener("keydown",e=>{
  if(el("summary").classList.contains("show")) return;
  if(!el("examSelect").classList.contains("hidden")) return;   // ekran wyboru egzaminu - bez skrotow
  if(!el("tabQuiz")||el("tabQuiz").classList.contains("hidden")) return;
  const q=current; if(!q) return;
  const answered = shown && shown.id===q.id;
  if(e.key==="ArrowRight"||(e.key==="Enter"&&answered)){ e.preventDefault(); next(); return; }
  if(e.key==="ArrowLeft"){ e.preventDefault(); prev(); return; }
  if(answered) return;
  let letter=null;
  if(/^[1-5]$/.test(e.key)){ const i=Number(e.key)-1; if(q.opts[i]) letter=q.opts[i][0]; }
  else if(/^[a-eA-E]$/.test(e.key)) letter=e.key.toLowerCase();
  if(letter && q.opts.some(o=>o[0]===letter)){ e.preventDefault(); onPick(letter); }
});

function escapeHtml(t){ return String(t).replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c])); }

/* ======================================================================
   TRYB EGZAMIN — 40 pytań z rozkładem jak na prawdziwym egzaminie CTFL
   ====================================================================== */
const EXAM_DIST = {1:8, 2:6, 3:4, 4:11, 5:9, 6:2};   // pytań na rozdział (suma 40)
const EXAM_PASS = 26;                                 // próg 65% = 26/40
const EXAM_HIST_KEY = "istqb_exam_history";
let examSet=[], examAns={}, examIdx=0, examSubmitted=false, examReview=false, examResult=null;
let examHistory = loadHist();
function loadHist(){ try{ return JSON.parse(localStorage.getItem(EXAM_HIST_KEY)) || []; }catch(e){ return []; } }
function saveHist(){ localStorage.setItem(EXAM_HIST_KEY, JSON.stringify(examHistory)); }
function sampleN(arr,n){ const a=arr.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a.slice(0,n); }
function nowStr(){ try{ return new Date().toLocaleString("pl-PL",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}); }catch(e){ return ""; } }

/* ============================================================
   ZAKLADKA EGZAMINY — egzamin na czas z zegarem
   ============================================================ */
const EXAM_ACTIVE_KEY = "istqb_exam_active";
let examTab=false, examSource="mixed", examDurationMin=60;
let examEndTime=0, examTimerId=null;

function sampleByDist(pool){
  let set=[];
  for(let ch=1;ch<=6;ch++) set.push(...sampleN(pool.filter(q=>q.ch===ch), EXAM_DIST[ch]));
  if(set.length<40){ const have=new Set(set.map(q=>q.id)); set.push(...sampleN(pool.filter(q=>!have.has(q.id)), 40-set.length)); }
  return sampleN(set, set.length);
}
const EXAM_PRESETS = [
  {key:"A", badge:"off", title:"Oficjalny egzamin A", desc:"40 oficjalnych pytań ISTQB z zestawu Sample Exam A, w oryginalnej kolejności egzaminacyjnej.",
   build:()=>QUESTIONS.filter(q=>catOf(q)==="A-egz").slice(0,40)},
  {key:"B", badge:"off", title:"Oficjalny egzamin B", desc:"40 oficjalnych pytań ISTQB z zestawu Sample Exam B, druga pełna sesja egzaminacyjna.",
   build:()=>QUESTIONS.filter(q=>catOf(q)==="B").slice(0,40)},
  {key:"mixed", badge:"off", title:"Losowy 40 (oficjalne)", desc:"40 pytań losowanych z całej oficjalnej puli (A + B) z rozkładem rozdziałów jak na prawdziwym egzaminie.",
   build:()=>sampleByDist(QUESTIONS.filter(q=>catOf(q)!=="A-dod"))},
  {key:"practice", badge:"own", title:"Trening 40 (nieoficjalne)", desc:"40 pytań z puli treningowej (na podstawie sylabusa) z egzaminacyjnym rozkładem rozdziałów. Pytania nieoficjalne.",
   build:()=>sampleByDist(window.PRACTICE||[])},
];
function presetOf(key){ return EXAM_PRESETS.find(p=>p.key===key) || EXAM_PRESETS[2]; }
function questionById(id){ return QUESTIONS.find(q=>q.id===id) || (window.PRACTICE||[]).find(q=>q.id===id); }

/* --- zegar (czas liczony od bezwzglednego endTime, nie tykanie) --- */
function fmtClock(ms){ const s=Math.max(0,Math.round(ms/1000)); const m=Math.floor(s/60), ss=s%60; return (m<10?"0":"")+m+":"+(ss<10?"0":"")+ss; }
function startTimer(){ stopTimer(); examTimerId=setInterval(tickTimer,1000); tickTimer(); }
function stopTimer(){ if(examTimerId){ clearInterval(examTimerId); examTimerId=null; } }
function tickTimer(){
  if(mode!=="exam" || examSubmitted){ stopTimer(); return; }
  const rem=examEndTime-Date.now();
  updateTimerUI(rem);
  if(rem<=0){ stopTimer(); finishExam(true); }
}
function updateTimerUI(rem){
  const total=examDurationMin*60000;
  el("exClock").textContent=fmtClock(rem);
  const fill=el("exTimerFill"); if(fill) fill.style.width=Math.max(0,Math.min(100, rem/total*100))+"%";
  const bar=el("examBar");
  bar.classList.toggle("danger", rem<=300000);
  bar.classList.toggle("warn", rem<=total*0.25 && rem>300000);
  // tempo
  const p=el("exPace");
  if(p){
    const elapsed=total-rem, perQ=total/examSet.length;
    const expected=Math.min(examSet.length, Math.floor(elapsed/perQ));
    const answered=examCount();
    p.classList.remove("ok","behind","late");
    if(answered>=expected){ p.classList.add("ok"); p.textContent="Na czas"; }
    else if(expected-answered<=2){ p.classList.add("behind"); p.textContent="Lekko z tyłu"; }
    else { p.classList.add("late"); p.textContent="Spóźniasz się"; }
  }
  const remS=Math.round(rem/1000);
  if(remS===300||remS===60){ el("exLive").textContent="Pozostało "+Math.round(remS/60)+" min"; }
}

/* --- trwałość (wznowienie po reloadzie / powrocie do zakładki) --- */
function persistActive(){
  try{ localStorage.setItem(EXAM_ACTIVE_KEY, JSON.stringify({
    source:examSource, dur:examDurationMin, endTime:examEndTime,
    ids:examSet.map(q=>q.id), ans:examAns, idx:examIdx
  })); }catch(e){}
}
function clearActive(){ try{ localStorage.removeItem(EXAM_ACTIVE_KEY); }catch(e){} }
function loadActive(){ try{ return JSON.parse(localStorage.getItem(EXAM_ACTIVE_KEY)); }catch(e){ return null; } }

/* --- widoki zakładki --- */
function hideStudyUI(){
  el("studyStats").classList.add("hidden");
  el("studyControls").classList.add("hidden");
  el("practiceWarn").classList.add("hidden");
  el("summary").classList.remove("show");
}
function setExamView(state){ // 'select' | 'running' | 'result'
  el("examSelect").classList.toggle("hidden", state!=="select");
  el("examBar").classList.toggle("hidden", state!=="running");
  el("card").classList.toggle("hidden", state!=="running");
  el("navgrid").style.display = state==="running" ? "" : "none";
  el("examResult").classList.toggle("show", state==="result");
}
function renderExamCards(){
  const g=el("examCards"); g.innerHTML="";
  EXAM_PRESETS.forEach(p=>{
    const n=Math.min(40, p.build().length);
    const c=document.createElement("div"); c.className="excard";
    c.innerHTML=`<div class="excard-top"><span class="excard-badge ${p.badge}">${p.badge==="own"?"Nieoficjalne":"Oficjalne ISTQB"}</span></div>`+
      `<h3>${p.title}</h3><p>${p.desc}</p>`+
      `<div class="excard-meta"><span><b>${n}</b> pytań</span><span><b class="exCardTime">${examDurationMin}</b> min</span><span>próg <b>26/40</b></span></div>`+
      `<button class="btn primary" data-start="${p.key}">Rozpocznij egzamin</button>`;
    g.appendChild(c);
  });
  g.querySelectorAll("[data-start]").forEach(b=>b.onclick=()=>startTimedExam(b.dataset.start, examDurationMin));
}
function renderResume(a){
  const box=el("examResume"); const rem=a.endTime-Date.now();
  box.classList.remove("hidden");
  box.innerHTML=`<span class="rtxt">Masz niedokończony egzamin: <b>${presetOf(a.source).title}</b>. Pozostało <b>${fmtClock(rem)}</b>.</span>`+
    `<button class="btn primary" id="exResumeBtn">Wznów</button><button class="btn ghost" id="exDiscardBtn">Odrzuć</button>`;
  el("exResumeBtn").onclick=()=>resumeActive(a);
  el("exDiscardBtn").onclick=()=>{ clearActive(); box.classList.add("hidden"); };
}
function enterExamTab(){
  examTab=true; if(mode==="exam") mode="drill";
  hideStudyUI();
  const a=loadActive();
  if(a && a.ids && a.ids.length && (a.endTime-Date.now()>0)) renderResume(a);
  else { clearActive(); el("examResume").classList.add("hidden"); }
  renderExamCards();
  setExamView("select");
}
function exitExamUI(){
  examTab=false; stopTimer();
  if(mode==="exam"){ mode="drill"; }
  el("examSelect").classList.add("hidden");
  el("examBar").classList.add("hidden");
  el("examResult").classList.remove("show");
  el("navgrid").style.display="";
  // przywroc UI nauki ukryte przez enterExamTab + schowaj przyciski egzaminu
  el("studyControls").classList.remove("hidden");
  el("studyStats").classList.remove("hidden");
  el("btnFinish").classList.add("hidden");
  el("btnExamBack").classList.add("hidden");
}
function startTimedExam(sourceKey, durationMin){
  examSource=sourceKey; examDurationMin=durationMin;
  examSet=presetOf(sourceKey).build();
  examAns={}; examIdx=0; examSubmitted=false; examReview=false; examResult=null;
  mode="exam";
  examEndTime=Date.now()+durationMin*60000;
  persistActive();
  current=examSet[0];
  el("examBar").classList.remove("review");
  setExamView("running");
  startTimer();
  render(); renderExamNav();
}
function resumeActive(a){
  examSource=a.source; examDurationMin=a.dur; examEndTime=a.endTime;
  examSet=(a.ids||[]).map(questionById).filter(Boolean);
  if(!examSet.length){ clearActive(); enterExamTab(); return; }
  examAns=a.ans||{}; examIdx=Math.min(a.idx||0, examSet.length-1);
  examSubmitted=false; examReview=false; examResult=null; mode="exam";
  current=examSet[examIdx];
  el("examBar").classList.remove("review");
  setExamView("running");
  if(examEndTime-Date.now()<=0){ finishExam(true); return; }
  startTimer();
  render(); renderExamNav();
}
window.enterExamTab = enterExamTab;
window.exitExamUI = exitExamUI;
window.suspendExam = stopTimer;
document.addEventListener("visibilitychange", ()=>{ if(!document.hidden && mode==="exam" && !examSubmitted && examTab) tickTimer(); });

function startExam(){
  examSet=[];
  for(let ch=1;ch<=6;ch++) examSet.push(...sampleN(QUESTIONS.filter(q=>q.ch===ch), EXAM_DIST[ch]));
  examSet = sampleN(examSet, examSet.length);           // losowa kolejność
  examAns={}; examIdx=0; examSubmitted=false; examReview=false; examResult=null;
  current=examSet[0];
  el("examBar").classList.remove("review");
  el("examResult").classList.remove("show");
  el("card").classList.remove("hidden");
  render(); renderNav();
}

function examCount(){ return examSet.filter(q=>(examAns[q.id]||[]).length===q.sel).length; }

function renderExam(){
  const q=examSet[examIdx]; if(!q){ return; }
  current=q;
  const cat=catOf(q);
  const badge=el("mSrc"); badge.classList.remove("hidden");
  badge.className="srcbadge "+(cat==="own"?"own":"off");
  badge.innerHTML=`<span class="dot"></span>${SRC_LABEL[cat]}`;
  // w trakcie egzaminu chowamy rozdział/LO/K (jak na prawdziwym); w przeglądzie pokazujemy
  el("mCh").style.display = examReview?"":"none";
  el("mLo").style.display = examReview?"":"none";
  el("mK").style.display  = examReview?"":"none";
  if(examReview){ el("mCh").textContent="Rozdz. "+q.ch; el("mLo").textContent=q.lo; el("mK").textContent=q.k; }

  const sel = examAns[q.id]||[];
  let pills = `<span class="qnum">Pytanie ${examIdx+1} / ${examSet.length} · #${q.id}</span>`;
  if(examReview){
    const ok = sameSet(sel, q.correct);
    pills += `<span class="mpill ${ok?"done":""}">${ok?"✓ poprawnie":"✗ błędnie"}</span>`;
  } else if(sel.length===q.sel){ pills += `<span class="mpill">✓ odpowiedziano</span>`; }
  el("mStat").innerHTML=pills;

  const sc=el("scenario");
  if(q.scenario){ sc.innerHTML=q.scenario; sc.classList.remove("hidden"); } else { sc.innerHTML=""; sc.classList.add("hidden"); }
  el("qtext").textContent=q.q;
  el("selhint").textContent = q.sel>1 ? ("Zaznacz "+q.sel+" odpowiedzi.") : "Zaznacz jedną odpowiedź.";

  const wrap=el("opts"); wrap.innerHTML="";
  q.opts.forEach(([letter,text])=>{
    const btn=document.createElement("button");
    btn.className="opt"; btn.dataset.letter=letter;
    btn.innerHTML=`<span class="letter">${letter.toUpperCase()}</span><span class="otext">${escapeHtml(text)}</span><span class="mark"></span>`;
    if(!examReview) btn.onclick=()=>examPick(letter);
    wrap.appendChild(btn);
  });
  el("checkrow").innerHTML="";

  if(examReview){ paintExamReview(q); }
  else {
    [...wrap.children].forEach(b=>b.classList.toggle("sel", sel.includes(b.dataset.letter)));
    el("explain").classList.remove("show");
  }

  // przyciski nawigacji
  el("btnPrev").disabled = examIdx===0;
  el("btnNext").disabled = examIdx===examSet.length-1;
  el("btnNext").textContent="Następne →";
  el("btnFinish").classList.toggle("hidden", examReview);
  el("btnExamBack").classList.toggle("hidden", !examReview);
  el("exAns").textContent = examCount();
  el("examBar").classList.toggle("review", examReview);
  el("examBarTxt").innerHTML = examReview
    ? `Przegląd egzaminu — <b>${examResult.score}/${examResult.total}</b> (${examResult.pct}%)`
    : `<b>${presetOf(examSource).title}</b> · próg 26/40`;
  el("card").scrollIntoView({behavior:"smooth",block:"start"});
}

function sameSet(a,b){ const x=new Set(a),y=new Set(b); return x.size===y.size && [...x].every(v=>y.has(v)); }

function examPick(letter){
  const q=examSet[examIdx]; let sel=(examAns[q.id]||[]).slice();
  if(q.sel===1) sel=[letter];
  else { const i=sel.indexOf(letter); if(i>=0) sel.splice(i,1); else { if(sel.length>=q.sel) sel.shift(); sel.push(letter); } }
  examAns[q.id]=sel;
  [...el("opts").children].forEach(b=>b.classList.toggle("sel", sel.includes(b.dataset.letter)));
  el("exAns").textContent=examCount();
  renderExamNav();
  if(!examReview) persistActive();
}

function examNav(dir){
  const ni=examIdx+dir;
  if(ni<0 || ni>=examSet.length) return;
  examIdx=ni; current=examSet[examIdx]; render(); renderExamNav();
}

function renderExamNav(){
  const g=el("navgrid"); g.innerHTML="";
  examSet.forEach((q,i)=>{
    const b=document.createElement("button"); b.textContent=i+1;
    if(examReview){ if(sameSet(examAns[q.id]||[],q.correct)) b.classList.add("ok"); else b.classList.add("bad"); }
    else if((examAns[q.id]||[]).length===q.sel) b.classList.add("amber");
    if(i===examIdx) b.classList.add("cur");
    b.title = "Pytanie "+(i+1);
    b.onclick=()=>{ examIdx=i; current=examSet[i]; render(); renderExamNav(); };
    g.appendChild(b);
  });
}

function paintExamReview(q){
  const cs=new Set(q.correct), sel=examAns[q.id]||[];
  [...el("opts").children].forEach(btn=>{
    const L=btn.dataset.letter; btn.disabled=true; btn.classList.remove("sel");
    const mk=btn.querySelector(".mark");
    if(cs.has(L)){ btn.classList.add("correct"); mk.textContent="✓"; }
    if(sel.includes(L) && !cs.has(L)){ btn.classList.add("incorrect"); mk.textContent="✗"; }
  });
  const v=el("verdict"); const ok=sameSet(sel,q.correct);
  if(ok){ v.className="verdict good"; v.innerHTML=`<span class="pill">✓ Poprawnie</span> Twoja odpowiedź była prawidłowa`; }
  else {
    const good=q.correct.map(c=>c.toUpperCase()).join(", ");
    const your=sel.length?sel.map(c=>c.toUpperCase()).join(", "):"— brak —";
    v.className="verdict poor"; v.innerHTML=`<span class="pill">✗ Niepoprawnie</span> Twoja: ${your} · poprawna: ${good}`;
  }
  const gw=el("expGeneralWrap"); gw.innerHTML="";
  if(q.exp._){ const d=document.createElement("div"); d.className="exgeneral"; d.textContent=q.exp._; gw.appendChild(d); }
  const rows=el("exrows"); rows.innerHTML="";
  q.opts.forEach(([letter])=>{ const t=q.exp[letter]; if(!t) return;
    const r=document.createElement("div"); r.className="exrow "+(cs.has(letter)?"c":"w");
    r.innerHTML=`<span class="el">${letter.toUpperCase()}</span><span class="et">${escapeHtml(t)}</span>`; rows.appendChild(r); });
  el("syref").textContent="Sylabus CTFL v4.0 · cel nauczania "+q.lo+" · poziom "+q.k+" · "+CH_NAMES[q.ch];
  el("explain").classList.add("show");
}

function finishExam(auto){
  if(!auto){
    const unanswered = examSet.length-examCount();
    if(unanswered>0 && !confirm("Pozostało bez odpowiedzi: "+unanswered+". Niezaznaczone liczą się jako błędne. Zakończyć egzamin?")) return;
  }
  stopTimer(); clearActive();
  let score=0; const per={}; for(let c=1;c<=6;c++) per[c]={c:0,t:0};
  examSet.forEach(q=>{ per[q.ch].t++; if(sameSet(examAns[q.id]||[],q.correct)){ score++; per[q.ch].c++; } });
  const pct=Math.round(score/examSet.length*100);
  const pass=score>=EXAM_PASS;
  const timeUsedMs=Math.max(0, Math.min(examDurationMin*60000, examDurationMin*60000-(examEndTime-Date.now())));
  examResult={score,total:examSet.length,pct,pass,per,date:nowStr(),timeUsedMs,timedOut:auto===true,source:examSource};
  examHistory.push({score,total:examSet.length,pct,pass,date:examResult.date}); saveHist();
  examSubmitted=true;
  showExamResult();
}

function showExamResult(){
  el("card").classList.add("hidden");
  el("examBar").classList.add("hidden");
  const r=examResult;
  const res=el("examResult"); res.classList.add("show");
  el("exScore").className="bigscore exscore "+(r.pass?"pass":"fail");
  el("exScore").innerHTML = `${r.score}/${r.total}<small> &nbsp;(${r.pct}%)</small>`;
  el("exVerdict").innerHTML = (r.pass
      ? `<span class="pill pass">ZDANY</span>Gratulacje! Wynik na poziomie egzaminu (próg ${EXAM_PASS}/40 = 65%).`
      : `<span class="pill fail">NIEZDANY</span>Do progu ${EXAM_PASS}/40 (65%) zabrakło ${EXAM_PASS-r.score} pkt. Przejrzyj odpowiedzi i ćwicz dalej w trybie Nauka.`)
      + (r.timeUsedMs!=null ? `<div style="font-size:13px;color:var(--muted);margin-top:8px">Czas: <b style="color:var(--text)">${fmtClock(r.timeUsedMs)}</b> z ${examDurationMin}:00${r.timedOut?" · czas się skończył (auto-zakończenie)":""}</div>` : "");
  const br=el("exBreak"); br.innerHTML="";
  const head=document.createElement("div"); head.className="chrow";
  head.innerHTML=`<span class="nm" style="color:var(--muted);font-size:12px;text-transform:uppercase;letter-spacing:.5px">Wynik wg rozdziału</span><span class="ct"></span>`;
  br.appendChild(head);
  for(let ch=1;ch<=6;ch++){ const p=r.per[ch]; const pc=p.t?Math.round(p.c/p.t*100):0;
    const row=document.createElement("div"); row.className="chrow";
    row.innerHTML=`<span class="nm">${CH_NAMES[ch]}</span><span class="ct">${p.c}/${p.t} · ${pc}%</span><span class="chbar"><i style="width:${pc}%"></i></span>`;
    br.appendChild(row); }
  renderHist();
}

function renderHist(){
  const box=el("exHist");
  if(!examHistory.length){ box.innerHTML=""; return; }
  const n=examHistory.length;
  const avg=Math.round(examHistory.reduce((s,e)=>s+e.pct,0)/n);
  const best=Math.max(...examHistory.map(e=>e.pct));
  const passed=examHistory.filter(e=>e.pass).length;
  const recent=examHistory.slice(-8).reverse();
  box.innerHTML = `<div class="histbox"><h3>Statystyki egzaminów</h3>
    <div class="histstats">
      <div class="hs"><div class="v">${n}</div><div class="k">podejść</div></div>
      <div class="hs"><div class="v">${avg}%</div><div class="k">średnia</div></div>
      <div class="hs"><div class="v">${best}%</div><div class="k">najlepszy</div></div>
      <div class="hs"><div class="v">${passed}/${n}</div><div class="k">zdane</div></div>
    </div>
    ${recent.map((e,i)=>`<div class="histrow"><span>${e.date||("podejście "+(n-i))}</span><span>${e.score}/${e.total} · ${e.pct}% <span class="${e.pass?"r-pass":"r-fail"}">${e.pass?"ZDANY":"NIEZDANY"}</span></span></div>`).join("")}
    <button class="clr" id="histClr">Wyczyść historię egzaminów</button></div>`;
  el("histClr").onclick=()=>{ if(confirm("Wyczyścić historię egzaminów?")){ examHistory=[]; saveHist(); renderHist(); } };
}

/* przyciski wyniku egzaminu */
el("btnFinish").onclick=finishExam;
el("btnExamBack").onclick=()=>{ showExamResult(); };
el("exNew").onclick=()=>{ el("examResult").classList.remove("show"); enterExamTab(); };
el("exReview").onclick=()=>{ examReview=true; examIdx=0; el("examResult").classList.remove("show"); el("examBar").classList.add("review"); el("card").classList.remove("hidden"); el("examBar").classList.remove("hidden"); el("navgrid").style.display=""; render(); renderExamNav(); };
el("exClose").onclick=()=>{ el("examResult").classList.remove("show"); examReview=false; enterExamTab(); };

/* wybor limitu czasu na ekranie egzaminow */
el("examTimeSeg").querySelectorAll("button").forEach(b=>{
  b.onclick=()=>{
    examDurationMin=Number(b.dataset.min);
    el("examTimeSeg").querySelectorAll("button").forEach(x=>x.classList.toggle("on", x===b));
    document.querySelectorAll(".exCardTime").forEach(t=>t.textContent=examDurationMin);
  };
});

/* init */
buildView(true);
