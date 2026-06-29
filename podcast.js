/* ============================================================
   PODCAST — odtwarzacz kursu audio ISTQB CTFL v4.0
   Pliki hostowane w GitHub Release (podcast-v1).
   ============================================================ */
(function(){
  const BASE = "https://github.com/kasprzakqa/istqb-trainer/releases/download/podcast-v1/";
  const CH = [
    { n:1, t:"Podstawy testowania",                    f:"ISTQB-nbl-rozdzial-1.mp3" },
    { n:2, t:"Testowanie w cyklu życia oprogramowania", f:"ISTQB-nbl-rozdzial-2.mp3" },
    { n:3, t:"Testowanie statyczne",                   f:"ISTQB-nbl-rozdzial-3.mp3" },
    { n:4, t:"Analiza i projektowanie testów",         f:"ISTQB-nbl-rozdzial-4.mp3" },
    { n:5, t:"Zarządzanie działaniami testowymi",      f:"ISTQB-nbl-rozdzial-5.mp3" },
    { n:6, t:"Narzędzia wspomagające testowanie",      f:"ISTQB-nbl-rozdzial-6.mp3" },
  ];
  const FULL = BASE + "ISTQB-CTFL-v4-NotebookLM.mp3";
  const LS = "istqb_podcast_pos";
  const $ = id => document.getElementById(id);
  let inited = false, cur = -1, seekTo = 0;

  function save(){ if(cur>=0){ try{ localStorage.setItem(LS, JSON.stringify({i:cur, t:$("podAudio").currentTime||0})); }catch(e){} } }
  function load(){ try{ return JSON.parse(localStorage.getItem(LS)); }catch(e){ return null; } }

  function selectCh(i, autoplay){
    cur = i;
    const a = $("podAudio");
    a.src = BASE + CH[i].f;
    a.load();
    $("podNow").innerHTML = `Teraz: <b>${CH[i].n}. ${CH[i].t}</b>`;
    [...$("podList").children].forEach((r,j)=>r.classList.toggle("on", j===i));
    if(autoplay){ const p=a.play(); if(p&&p.catch) p.catch(()=>{}); }
  }

  function init(){
    if(inited) return; inited = true;
    const a = $("podAudio"), list = $("podList");
    $("podDownload").href = FULL;

    CH.forEach((c,i)=>{
      const b = document.createElement("button");
      b.className = "pod-item";
      b.innerHTML = `<span class="pod-idx">${c.n}</span><span class="pod-name">${c.t}</span><span class="pod-play">▶</span>`;
      b.onclick = ()=>selectCh(i, true);
      list.appendChild(b);
    });

    // wznow ostatni rozdzial i pozycje
    const s = load();
    if(s && typeof s.i==="number" && s.i>=0 && s.i<CH.length){
      seekTo = s.t || 0;
      selectCh(s.i, false);
      a.addEventListener("loadedmetadata", function once(){
        a.removeEventListener("loadedmetadata", once);
        if(seekTo>0 && seekTo < a.duration){ try{ a.currentTime = seekTo; }catch(e){} }
      });
    }

    a.addEventListener("timeupdate", save);
    a.addEventListener("pause", save);
    a.addEventListener("ended", ()=>{ if(cur < CH.length-1) selectCh(cur+1, true); });
  }

  window.initPodcast = init;
})();
