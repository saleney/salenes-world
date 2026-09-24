// Stable journal indices 0–4 belong to the original collected words.
export const woodlandWords = [
  { hanzi: '雨', pinyin: 'yǔ', meaning: 'rain', effect: 'rain', duration: 4200, scene: 'A brief shower falls into the clearing.' },
  { hanzi: '鸟', pinyin: 'niǎo', meaning: 'bird', effect: 'bird', duration: 6500, scene: 'A bird lands beside the table.' },
  { hanzi: '风', pinyin: 'fēng', meaning: 'wind', effect: 'wind', duration: 3000, scene: 'Leaves rustle. A loose leaf slides across the table.' },
]
export function createWordWoods(root, keep) {
  root.innerHTML = `<div class="woods-top"><p>Drag a tile into the clearing, or tap it.</p><button type="button" id="woods-sound" aria-pressed="false">Sound off</button></div>
  <div class="woods-clearing" aria-label="Woodland clearing: place a tile here">
  <svg class="woods-art" viewBox="0 0 720 440" aria-hidden="true">
    <path fill="#e4e6d3" d="M0 0H720V440H0Z"/>
    <path fill="#c9d0b4" d="M0 238Q180 163 335 227T720 198V440H0Z"/>
    <path fill="#d9d4b7" d="M120 440Q240 230 420 254T720 440Z"/>
    <g fill="none" stroke="#67715c" stroke-width="13"><path d="M67 360L89 0M95 156L18 49M84 99L155 9M650 365L626 0M634 113L709 36M629 172L551 54"/></g>
    <g class="woods-leaves" fill="#78886a" stroke="#556b53" stroke-width="1.5"><path d="M0 80Q60 9 111 36Q75 98 0 80M84 121Q126 58 184 79Q152 140 84 121M565 63Q585 1 643 10Q633 67 565 63M635 155Q665 90 720 108Q696 165 635 155"/><path d="M0 180Q29 110 77 140Q64 196 0 180M523 132Q553 73 598 100Q588 149 523 132"/></g>
    <g stroke="#6b5644" stroke-width="3"><path fill="#ae8964" d="M115 315L579 298L637 375L65 390Z"/><path fill="#8b684e" d="M65 390L637 375V389L65 405Z"/><path d="M117 404L110 440M583 390L598 440" stroke-width="16"/><path d="M99 367L611 353M111 342L594 329" stroke-width="1"/></g>
    <g fill="none" stroke="#886e53" stroke-width="1"><path d="M171 359Q280 349 411 355M301 323Q450 311 558 321M146 380Q260 370 349 378"/></g>
    <g class="woods-bowl"><path fill="#a56f56" stroke="#744d3d" stroke-width="2" d="M469 327Q480 375 540 366Q571 359 574 325Z"/><ellipse fill="#dbb49a" stroke="#744d3d" stroke-width="2" cx="521" cy="326" rx="53" ry="14"/><path fill="#42665b" stroke="#eee7d2" stroke-width="5" d="M491 322L499 300L516 305L510 327M526 328L534 304L549 312L541 333"/></g>
    <path class="table-leaf" fill="#a65f3e" d="M207 348Q224 323 247 339Q230 358 207 348Z"/>
    <g class="clearing-bird" fill="#5b6755" stroke="#394838" stroke-width="2"><path d="M384 279Q357 257 370 246Q383 235 398 250L416 235L410 262Q403 281 384 279L369 288Z"/><path fill="#c3ac83" d="M374 251Q394 247 401 266Q381 276 374 251"/><path d="M397 278L400 291M390 279L389 291"/><circle cx="403" cy="245" r="2" fill="#222"/><path d="M415 241L424 245L413 248"/></g>
    <g class="clearing-rain" stroke="#637d86" stroke-width="2">${Array.from({length:24},(_,i)=>`<path d="M${145+(i*47)%440} ${35+(i*31)%210}l-8 24"/>`).join('')}</g>
    <g class="wind-lines" fill="none" stroke="#65735a" stroke-width="2"><path d="M172 166Q243 145 287 169T375 165M221 190Q318 170 391 191M442 215Q499 202 538 217"/></g>
  </svg><div class="placed-tile" hidden><span lang="zh-Hans"></span><small></small></div></div>
  <div class="woods-rack" role="group" aria-label="Word tiles">${woodlandWords.map((w,i)=>`<button type="button" class="woods-tile" data-word="${i}" aria-label="Place ${w.hanzi}" aria-pressed="false"><span lang="zh-Hans">${w.hanzi}</span></button>`).join('')}</div>
  <div class="woods-tools" hidden><button type="button" data-action="flip" aria-pressed="false">Turn over</button><button type="button" data-action="hear">Hear Mandarin</button><button type="button" data-action="again">Try again</button><button type="button" data-action="return">Return tile</button><button type="button" data-action="keep">Keep word</button></div><p class="woods-status" role="status"></p><p class="woods-audio" role="status"></p>`
  const scene = root.querySelector('.woods-clearing'), placed = root.querySelector('.placed-tile'), status = root.querySelector('.woods-status'), audioStatus = root.querySelector('.woods-audio'), controls = root.querySelector('.woods-tools'), sound = root.querySelector('#woods-sound')
  const tiles = [...root.querySelectorAll('.woods-tile')]
  let selected = null, timer, flipped = false, soundOn = false, context, drag = null, suppressClick = false
  function clack() {
    if (!soundOn) return
    try {
      context ||= new (window.AudioContext || window.webkitAudioContext)()
      context.resume().catch(() => {})
      const oscillator=context.createOscillator(), gain=context.createGain()
      oscillator.type='triangle'; oscillator.frequency.setValueAtTime(820,context.currentTime); oscillator.frequency.exponentialRampToValueAtTime(190,context.currentTime+.045)
      gain.gain.setValueAtTime(.035,context.currentTime); gain.gain.exponentialRampToValueAtTime(.001,context.currentTime+.065)
      oscillator.connect(gain);gain.connect(context.destination);oscillator.start();oscillator.stop(context.currentTime+.07)
    } catch { audioStatus.textContent='Tile sound is unavailable.' }
  }
  function face() {
    const word=woodlandWords[selected]
    placed.querySelector('span').textContent=word.hanzi
    placed.querySelector('small').textContent=flipped ? `${word.pinyin} · ${word.meaning}` : ''
    placed.classList.toggle('is-back',flipped)
    root.querySelector('[data-action="flip"]').setAttribute('aria-pressed',String(flipped))
    root.querySelector('[data-action="flip"]').textContent=flipped?'Character side':'Turn over'
  }
  function play() {
    clearTimeout(timer); const word=woodlandWords[selected]
    scene.dataset.effect=''; void scene.offsetWidth; scene.dataset.effect=word.effect
    status.textContent=word.scene;clack()
    timer=setTimeout(()=>{scene.dataset.effect=''; status.textContent=word.effect==='rain'?'The shower has passed.':word.effect==='bird'?'The bird has flown on.':'The leaves settle.'},word.duration)
  }
  function place(index) {
    window.speechSynthesis?.cancel()
    selected=index;flipped=false;placed.hidden=false;controls.hidden=false;audioStatus.textContent=''
    tiles.forEach((tile,i)=>tile.setAttribute('aria-pressed',String(i===index)))
    face();play()
  }
  function reset() {
    clearTimeout(timer);scene.dataset.effect='';placed.hidden=true;controls.hidden=true;window.speechSynthesis?.cancel()
    const previous=selected;selected=null;tiles.forEach(t=>t.setAttribute('aria-pressed','false'));status.textContent='Tile returned.';audioStatus.textContent='';if(previous!==null)tiles[previous].focus()
  }
  sound.addEventListener('click',()=>{soundOn=!soundOn;sound.textContent=soundOn?'Sound on':'Sound off';sound.setAttribute('aria-pressed',String(soundOn));if(!soundOn)window.speechSynthesis?.cancel()})
  tiles.forEach((tile,i)=>{
    tile.addEventListener('click',()=>{if(suppressClick){suppressClick=false;return}place(i)})
    tile.addEventListener('pointerdown',e=>{if(e.button!==0)return;drag={id:e.pointerId,x:e.clientX,y:e.clientY,tile,index:i,moved:false};tile.setPointerCapture(e.pointerId)})
    tile.addEventListener('pointermove',e=>{if(!drag||drag.id!==e.pointerId)return;const x=e.clientX-drag.x,y=e.clientY-drag.y;if(Math.hypot(x,y)>8)drag.moved=true;if(drag.moved){tile.style.transform=`translate(${x}px,${y}px) rotate(-4deg)`;tile.classList.add('dragging')}})
    tile.addEventListener('pointerup',e=>{if(!drag)return;const d=drag;drag=null;tile.style.transform='';tile.classList.remove('dragging');if(d.moved){suppressClick=true;setTimeout(()=>suppressClick=false,0);const r=scene.getBoundingClientRect();if(e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom)place(i)}})
    tile.addEventListener('pointercancel',()=>{drag=null;tile.style.transform='';tile.classList.remove('dragging')})
  })
  controls.addEventListener('click',e=>{
    const action=e.target.dataset.action;if(selected===null)return;const word=woodlandWords[selected]
    if(action==='flip'){flipped=!flipped;face()}
    if(action==='again')play()
    if(action==='return')reset()
    if(action==='keep')status.textContent=keep({id:`word-${selected+5}`,type:'word',index:selected+5,title:`${word.hanzi} · ${word.pinyin}`,text:`${word.meaning}. ${word.scene}`})?'Kept in your travel journal.':'Kept for this visit; browser storage is unavailable.'
    if(action==='hear'){
      flipped=true;face()
      if(!soundOn){audioStatus.textContent='Turn sound on to hear Mandarin.';return}
      const voice=window.speechSynthesis?.getVoices().find(v=>/^zh(?:[-_](?:CN|SG|TW|Hans|Hant))?$/i.test(v.lang))
      if(!voice){audioStatus.textContent=`Mandarin audio is unavailable here. ${word.hanzi} · ${word.pinyin}.`;return}
      window.speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(word.hanzi);utterance.voice=voice;utterance.lang=voice.lang;utterance.rate=.75
      utterance.onerror=e=>{if(!['interrupted','canceled'].includes(e.error))audioStatus.textContent=`Audio could not play. ${word.pinyin}.`};audioStatus.textContent='';window.speechSynthesis.speak(utterance)
    }
  })
  new MutationObserver(()=>{if(root.closest('[hidden]')){clearTimeout(timer);scene.dataset.effect='';window.speechSynthesis?.cancel()}}).observe(root.parentElement,{attributes:true,attributeFilter:['hidden']})
  return {place}
}
