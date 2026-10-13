// Read-aloud ("सुनें") for lessons. Uses the phone's built-in voice through the
// Android app bridge (works offline), or the browser's speech engine on the website.
// Text is split into Hindi and English pieces so each part uses the right voice.
(function(){
  const hasBridge = typeof window.KakshaTTS !== 'undefined';
  let playingId = null, seq = 0, pending = 0;

  function splitLang(text){
    // Split into sentence-like chunks, then label each chunk by its majority script.
    // Short English words inside a Hindi sentence (e.g. "Noun", "AP") stay in the Hindi chunk,
    // because the Hindi voice reads them acceptably and splitting every word sounds choppy.
    const chunks = String(text).split(/(?<=[।.?!:;])\s+|\s*\n+\s*/).map(s => s.replace(/^[–—]\s*/, '').trim()).filter(Boolean)
      // "।" after an English sentence reads oddly in the English voice; use "." instead.
      .map(s => /[\u0900-\u0963\u0966-\u097F]/.test(s) ? s : s.replace(/।$/, '.').replace(/\.\.+$/, '.'));
    const parts = [];
    // Main language: count words (Devanagari words vs real English words, ignoring formula variables,
    // trig names and acronyms). Formula-only text (e.g. "tan θ = ?") is read in Hindi, the app's medium.
    const hiWords = (String(text).match(/[\u0900-\u0963\u0966-\u097F]+/g) || []).length;
    const enWords = (String(text).match(/[A-Za-z]{3,}/g) || []).filter(w => !/^(sin|cos|tan|sec|cot|cosec|log)$/i.test(w) && !/^[A-Z0-9]{2,}$/.test(w) && !/^([A-Z][a-z]?\d*){1,4}$/.test(w)).length;
    const mainLang = hiWords >= enWords ? 'hi' : 'en';
    for (const c of chunks) {
      const hi = (c.match(/[\u0900-\u0963\u0966-\u097F]/g) || []).length;
      const en = (c.match(/[A-Za-z]/g) || []).length;
      if (!hi && !en) { if (parts.length) parts[parts.length - 1].text += ' ' + c; else parts.push({lang: mainLang, text: c}); continue; }
      // Formulas like "V = I × R", "sin²θ + cos²θ = 1" or "2H₂ + O₂" are not English sentences;
      // they follow the lesson's main language. A chunk counts as English only with 3+ real words.
      const isFormula = /[=+×÷→²³√θπ₀-₉]/.test(c) && (c.match(/[A-Za-z]{2,}/g) || []).filter(w => !/^(sin|cos|tan|sec|cot|cosec|log)$/i.test(w)).length < 3;
      const words = (c.match(/[A-Za-z]{2,}/g) || []).filter(w => !/^(sin|cos|tan|sec|cot|cosec|log)$/i.test(w) && !/^[A-Z0-9]{2,}$/.test(w) && !/^([A-Z][a-z]?\d*){1,4}$/.test(w)).length;
      // Latin-only bits without real English words (option letters, formulas, acronyms like "WTO",
      // "SSS, SAS") stay with the main language so the voice does not keep switching.
      const tiny = !hi && words < 3 && mainLang === 'hi';
      // Any chunk with 2+ Hindi words uses the Hindi voice (it reads short English words fine; the English voice cannot read Hindi).
      const hiWordCount = (c.match(/[\u0900-\u0963\u0966-\u097F]+/g) || []).length;
      const lang = hi ? (hiWordCount >= 2 || hi >= en * 0.5 ? 'hi' : 'en') : ((isFormula || tiny) ? mainLang : (words ? 'en' : mainLang));
      const last = parts[parts.length - 1];
      if (lang === 'en' && hi) {
        // English chunk with a Hindi gloss ("rhythm, लय", "the bed (नीचे)"): give each Hindi run its own Hindi part,
        // because the English voice skips Devanagari.
        for (const seg of c.split(/([\u0900-\u0963\u0966-\u097F][\u0900-\u097F\s]*[\u0900-\u0963\u0966-\u097F]|[\u0900-\u0963\u0966-\u097F])/)) {
          if (!seg.trim()) continue;
          const sl = /[\u0900-\u0963\u0966-\u097F]/.test(seg) ? 'hi' : 'en';
          if (sl === 'en' && !/[A-Za-z0-9]/.test(seg)) { if (parts.length) parts[parts.length - 1].text += seg.trim(); continue; }
          const l2 = parts[parts.length - 1];
          if (l2 && l2.lang === sl) l2.text += ' ' + seg.trim(); else parts.push({lang: sl, text: seg.trim()});
        }
        continue;
      }
      if (last && last.lang === lang) last.text += ' ' + c; else parts.push({lang, text: c});
    }
    return parts.map(p => ({lang: p.lang, text: speakSymbols(p.text, p.lang)}));
  }

  // Maths/science symbols are read as words so the voice does not skip them.
  const SYM = {
    hi: [[/×/g,' गुणा '],[/÷/g,' भाग '],[/=/g,' बराबर '],[/−/g,' घटा '],[/(?<=\d)[–](?=\d)/g,' से '],[/\+/g,' जोड़ '],[/→/g,' से बनता है '],[/²/g,' का वर्ग '],[/³/g,' का घन '],[/√/g,' वर्गमूल '],[/π/g,' पाई '],[/°/g,' डिग्री '],[/%/g,' प्रतिशत '],[/₹\s*([\d,.]+)/g,'$1 रुपये']],
    en: [[/×/g,' times '],[/÷/g,' divided by '],[/=/g,' equals '],[/−/g,' minus '],[/(?<=\d)[–](?=\d)/g,' to '],[/\+/g,' plus '],[/→/g,' gives '],[/²/g,' squared '],[/³/g,' cubed '],[/√/g,' root '],[/π/g,' pi '],[/°/g,' degrees '],[/%/g,' percent '],[/₹\s*([\d,.]+)/g,'$1 rupees']]
  };
  const SUB = {'₀':'0','₁':'1','₂':'2','₃':'3','₄':'4','₅':'5','₆':'6','₇':'7','₈':'8','₉':'9','ₙ':'n'};
  function speakSymbols(t, lang){
    t = t.replace(/[₀-₉ₙ]/g, c => SUB[c]);
    for (const [re, word] of SYM[lang] || SYM.hi) t = t.replace(re, word);
    // A dash used as punctuation ("fly – a word") becomes a pause, not "minus".
    t = t.replace(/\s[–—-]\s/g, ', ').replace(/।।+/g, '।').replace(/\.\.+/g, '.');
    return t.replace(/\s+/g, ' ').trim();
  }

  function clean(t){
    t = String(t);
    const mostlyEnglish = (t.match(/[A-Za-z]/g) || []).length > (t.match(/[\u0900-\u0963\u0966-\u097F]/g) || []).length;
    return t.replace(/___+/g, mostlyEnglish ? ' blank ' : ' खाली स्थान ').replace(/[“”"‘’]/g, '').replace(/\s+/g, ' ').trim();
  }

  function setButtons(){
    document.querySelectorAll('[data-say]').forEach(b => {
      const on = b.dataset.say === playingId;
      b.classList.toggle('saying', on);
      b.textContent = on ? '⏹ रोकें' : '🔊 सुनें';
      b.setAttribute('aria-pressed', on);
    });
  }

  function finished(){ playingId = null; pending = 0; setButtons(); }
  window.sayRefresh = setButtons;
  window.saySplit = (t) => splitLang(clean(t)); // exposed for testing

  window.sayStop = function(){
    seq++;
    if (hasBridge) { try { KakshaTTS.stop(); } catch(e){} }
    else if ('speechSynthesis' in window) speechSynthesis.cancel();
    finished();
  };

  window.sayText = function(id, text){
    if (playingId === id) { sayStop(); return; }
    sayStop();
    const parts = splitLang(clean(text));
    if (!parts.length) return;
    const my = ++seq; playingId = id; pending = parts.length; setButtons();
    if (hasBridge) {
      // Each part is queued; the app calls window.onSaid(tag) as each finishes.
      parts.forEach((p, i) => {
        const ok = KakshaTTS.say(p.text, p.lang, 's' + my + '_' + i, i === 0);
        if (!ok && i === 0) { finished(); sayNoVoice(); }
      });
    } else if ('speechSynthesis' in window) {
      const voices = speechSynthesis.getVoices();
      parts.forEach(p => {
        const u = new SpeechSynthesisUtterance(p.text);
        u.lang = p.lang === 'hi' ? 'hi-IN' : 'en-IN';
        const v = voices.find(v => v.lang && v.lang.toLowerCase().startsWith(p.lang));
        if (v) u.voice = v;
        u.rate = 0.9;
        u.onend = u.onerror = () => { if (my === seq && --pending <= 0) finished(); };
        speechSynthesis.speak(u);
      });
    } else { finished(); sayNoVoice(); }
  };

  window.onSaid = function(tag){
    const m = /^s(\d+)_/.exec(tag || '');
    if (!m || +m[1] !== seq) return;
    if (--pending <= 0) finished();
  };

  function sayNoVoice(){
    alert('इस फ़ोन में बोलने वाली आवाज़ (Text-to-speech) चालू नहीं है।\nसेटिंग्स › भाषा › Text-to-speech में Google आवाज़ चुनें और हिंदी डाउनलोड करें।');
  }

  // Button HTML helper used by the lesson pages.
  window.sayBtn = function(id, text){
    const enc = encodeURIComponent(text);
    return `<button type="button" class="say-btn" data-say="${id}" aria-pressed="false" onclick="sayText('${id}', decodeURIComponent('${enc.replace(/'/g, '%27')}'))">🔊 सुनें</button>`;
  };

  // Stop speaking whenever the page re-renders to a different screen.
  window.sayAvailable = hasBridge || 'speechSynthesis' in window;

  const css = document.createElement('style');
  css.textContent = '.say-btn{border:1px solid #cadccf;background:#fff;color:#184e48;border-radius:99px;padding:7px 13px;font:800 13px system-ui,sans-serif;cursor:pointer;margin:8px 0 2px}.say-btn.saying{background:#184e48;color:#fff;border-color:#184e48}';
  document.head.appendChild(css);
})();
