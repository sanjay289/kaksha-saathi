// Board-exam test mode for Class 10: subject tests and a mixed model paper,
// OMR-style A/B/C/D answers, countdown timer, score with BSEB division, answer review.
(function(){
  const SUBJECTS=[
    {id:'math',name:'गणित',icon:'∑',color:'#3E9A7B'},
    {id:'science',name:'विज्ञान',icon:'⚗',color:'#5B7FD1'},
    {id:'sst',name:'सामाजिक विज्ञान',icon:'🌍',color:'#C08A2E'},
    {id:'hindi',name:'हिंदी',icon:'अ',color:'#D97358'},
    {id:'english',name:'अंग्रेज़ी',icon:'A',color:'#7A5BD1'},
    {id:'sanskrit',name:'संस्कृत',icon:'ॐ',color:'#B0546E'}
  ];
  const SUBJECT_Q=25, MIXED_PER_SUBJECT=8; // subject test: 25 random of 50; model paper: 6 x 8 = 48 + 2 extra = 50
  const LETTERS=['A','B','C','D'];
  const SEC_PER_Q=72; // ~1.2 min per objective question
  const BEST_KEY='class10-board-best';
  let best={};try{best=JSON.parse(localStorage.getItem(BEST_KEY)||'{}')||{}}catch(e){best={}}
  let T=null,timer=null;
  const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
  // shuffle A/B/C/D so the correct option lands in a random position each attempt
  const mixOptions=x=>{const order=shuffle([0,1,2,3]);return {...x,options:order.map(k=>x.options[k]),answer:order.indexOf(x.answer)}};
  const fmt=s=>`${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;
  const division=p=>p>=60?'प्रथम श्रेणी':p>=45?'द्वितीय श्रेणी':p>=30?'तृतीय श्रेणी':'अनुत्तीर्ण (30% से कम)';
  const sub=id=>SUBJECTS.find(s=>s.id===id);
  window.boardAvailable=()=>typeof boardBank!=='undefined'&&grade===10;
  window.boardStop=()=>{clearInterval(timer);timer=null};

  function header(title,desc){return `<header class="hero"><div class="headrow"><button class="back" aria-label="वापस जाएँ" onclick="goBack()">‹</button><h1>${esc(title)}</h1></div><p>${esc(desc)}</p></header>`}

  window.renderBoardHome=function(){
    const cards=SUBJECTS.map(s=>{const n=boardBank[s.id].length,b=best[s.id];return `<button class="row" style="--accent:${s.color};--tint:${s.color}20" onclick="startBoardTest('${s.id}')"><span class="icon">${s.icon}</span><span class="detail"><strong>${s.name}</strong><small>${SUBJECT_Q} प्रश्न (${n} में से) · ${Math.round(SUBJECT_Q*SEC_PER_Q/60)} मिनट${b!=null?` · <span class="done">सर्वश्रेष्ठ ${b}%</span>`:''}</small></span><span class="arrow">›</span></button>`}).join('');
    const mb=best.mixed;
    return `<header class="hero"><div class="eyebrow">मैट्रिक परीक्षा अभ्यास</div><h1>बोर्ड टेस्ट</h1><p>बिहार बोर्ड जैसे वस्तुनिष्ठ प्रश्न: हर प्रश्न 1 अंक, कोई ऋणात्मक अंकन नहीं।</p></header><main>
      <div class="intro"><span class="intro-icon">📝</span><div><strong>मॉडल पेपर</strong><p>सभी 6 विषयों से 50 प्रश्न, 60 मिनट, बिल्कुल बोर्ड के वस्तुनिष्ठ खंड जैसा। हर बार नए प्रश्न।${mb!=null?` सर्वश्रेष्ठ: ${mb}%`:''}</p><button class="next" onclick="startBoardTest('mixed')">मॉडल पेपर शुरू करें ›</button></div></div>
      <div class="section"><h2>विषयवार टेस्ट</h2><span>${Object.values(boardBank).reduce((n,a)=>n+a.length,0)} प्रश्न बैंक</span></div><div class="list">${cards}</div>
      <p class="note">ये मूल अभ्यास प्रश्न हैं, असली बोर्ड प्रश्नपत्र नहीं। परीक्षा में 100 में से 50 (या 80 में से 40) वस्तुनिष्ठ प्रश्न करने होते हैं; बाकी अंक लघु और दीर्घ उत्तरीय प्रश्नों से आते हैं।</p></main>`;
  };

  window.startBoardTest=function(id){
    let qs;
    if(id==='mixed'){
      const picks=SUBJECTS.map(s=>shuffle(boardBank[s.id]).map(x=>({...x,sid:s.id})));
      let pool=picks.flatMap(p=>p.slice(0,MIXED_PER_SUBJECT));
      const extra=shuffle(picks.flatMap(p=>p.slice(MIXED_PER_SUBJECT))).slice(0,50-pool.length);
      qs=shuffle(pool.concat(extra));
    }
    else qs=shuffle(boardBank[id].map(x=>({...x,sid:id}))).slice(0,SUBJECT_Q);
    qs=qs.map(mixOptions);
    T={id,qs,ans:new Array(qs.length).fill(-1),i:0,left:qs.length*SEC_PER_Q,done:false};
    boardStop();timer=setInterval(()=>{if(!T||T.done)return boardStop();T.left--;const el=document.getElementById('board-timer');if(el)el.textContent='⏱ '+fmt(T.left);if(T.left<=0)submitBoardTest(true)},1000);
    page='board-test';render();
  };

  window.renderBoardTest=function(){
    const x=T.qs[T.i],s=sub(x.sid),answered=T.ans.filter(a=>a>=0).length;
    const dots=T.qs.map((_,k)=>`<button aria-label="प्रश्न ${k+1}" onclick="boardGo(${k})" style="width:30px;height:30px;border-radius:50%;border:1px solid ${k===T.i?'#184e48':'#cadccf'};background:${T.ans[k]>=0?'#184e48':'#fff'};color:${T.ans[k]>=0?'#fff':'#193e39'};font-size:11px;font-weight:700">${k+1}</button>`).join('');
    return header(T.id==='mixed'?'मॉडल पेपर':sub(T.id).name+' टेस्ट',`${answered}/${T.qs.length} उत्तर दिए`)+`<main style="--accent:${s.color};--tint:${s.color}20">
      <div class="summary"><div><strong id="board-timer">⏱ ${fmt(T.left)}</strong><p>बचा समय</p></div><span class="badge">${esc(s.name)}</span></div>
      <section class="activity"><h2>प्रश्न ${T.i+1}</h2><p>${esc(x.text)}</p>${window.sayBtn&&sayAvailable?sayBtn('bq'+T.i,x.text+(x.sid==='english'&&!/[\u0900-\u097F]{2}/.test(x.text)?'. Options: ':'। विकल्प: ')+x.options.map((o,k)=>LETTERS[k]+', '+o).join(x.sid==='english'?'. ':'। ')):''}
      ${x.options.map((o,k)=>`<button class="answer${T.ans[T.i]===k?' correct':''}" onclick="boardPick(${k})"><b>${LETTERS[k]}.</b> ${esc(o)}</button>`).join('')}
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:6px">${T.i>0?'<button class="next" style="background:#e7f0e8;color:#184e48" onclick="boardGo(T_i()-1)">‹ पिछला</button>':''}${T.i<T.qs.length-1?'<button class="next" onclick="boardGo(T_i()+1)">अगला ›</button>':''}<button class="next" style="background:#c0563f" onclick="submitBoardTest(false)">जमा करें ✓</button></div></section>
      <div class="section"><h2>OMR शीट</h2><span>भरे हुए = हरे</span></div><div style="display:flex;flex-wrap:wrap;gap:6px">${dots}</div></main>`;
  };
  window.T_i=()=>T.i;
  window.boardPick=k=>{T.ans[T.i]=k;if(T.i<T.qs.length-1)T.i++;render()};
  window.boardGo=k=>{T.i=Math.max(0,Math.min(T.qs.length-1,k));render()};

  window.submitBoardTest=function(timeUp){
    if(!T||T.done)return;
    const blank=T.ans.filter(a=>a<0).length;
    if(!timeUp&&blank&&!confirm(`${blank} प्रश्न खाली हैं। फिर भी जमा करें?`))return;
    T.done=true;boardStop();
    const correct=T.qs.filter((x,k)=>T.ans[k]===x.answer).length;
    T.score=correct;T.pct=Math.round(correct/T.qs.length*100);T.timeUp=timeUp;
    if(best[T.id]==null||T.pct>best[T.id]){best[T.id]=T.pct;try{localStorage.setItem(BEST_KEY,JSON.stringify(best))}catch(e){}}
    page='board-result';render();
  };

  window.renderBoardResult=function(){
    const wrong=T.qs.map((x,k)=>({x,k})).filter(o=>T.ans[o.k]!==o.x.answer);
    const bySub=SUBJECTS.map(s=>{const its=T.qs.map((x,k)=>({x,k})).filter(o=>o.x.sid===s.id);return its.length?{s,n:its.length,c:its.filter(o=>T.ans[o.k]===o.x.answer).length}:null}).filter(Boolean);
    return header('परिणाम',T.timeUp?'समय समाप्त, टेस्ट अपने आप जमा हुआ।':'आपका टेस्ट जमा हो गया।')+`<main>
      <div class="summary"><div><strong>${T.score}/${T.qs.length}</strong><p>सही उत्तर · ${division(T.pct)}</p></div><div class="ring" style="--progress:${T.pct}%"><span>${T.pct}%</span></div></div>
      ${bySub.length>1?`<div class="section"><h2>विषयवार</h2></div><div class="list">${bySub.map(o=>`<div class="row" style="--accent:${o.s.color};--tint:${o.s.color}20"><span class="icon">${o.s.icon}</span><span class="detail"><strong>${o.s.name}</strong><small>${o.c}/${o.n} सही</small><div class="meter"><i style="width:${o.c/o.n*100}%"></i></div></span></div>`).join('')}</div>`:''}
      <div class="section"><h2>${wrong.length?'गलत / छोड़े गए प्रश्न':'सभी उत्तर सही! 🎉'}</h2><span>${wrong.length}</span></div>
      ${wrong.map(o=>`<div class="point" style="display:block"><b style="color:#193e39">प्र. ${o.k+1}: ${esc(o.x.text)}</b><br><span style="color:#c0563f">आपका उत्तर: ${T.ans[o.k]>=0?LETTERS[T.ans[o.k]]+'. '+esc(o.x.options[T.ans[o.k]]):'खाली'}</span><br><span style="color:#258b70">सही उत्तर: ${LETTERS[o.x.answer]}. ${esc(o.x.options[o.x.answer])}</span><br><small>${esc(o.x.why)}</small></div>`).join('')}
      <button class="next" onclick="startBoardTest('${T.id}')">फिर से टेस्ट दें ›</button> <button class="next" style="background:#e7f0e8;color:#184e48" onclick="openBoard()">सभी टेस्ट</button></main>`;
  };
  window.openBoard=()=>{boardStop();page='board';render()};
})();
