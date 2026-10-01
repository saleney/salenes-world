import {produce,recipes,growthStage,dropPoint} from './produce.js';
import {ingredientArt} from './living-art.js';
const $=s=>document.querySelector(s),garden=$('.garden'),soil=$('.soil'),hint=$('#hint');
// Keep native image dragging from interrupting the garden’s pointer gestures.
for(const surface of [garden,...document.querySelectorAll('button'),$('.seed-packets')]){
 surface.addEventListener('dragstart',e=>e.preventDefault());
}
const sprout='<svg viewBox="0 0 75 170" aria-hidden="true"><path d="M38 157q-4-31 1-48" stroke="#889560" stroke-width="4" fill="none"/><path d="M37 130Q12 121 18 105q22-2 19 25m1-10q5-31 24-21 1 20-24 21" fill="#809558"/></svg>';
const key='richard-living-garden-v1';let plants=[],harvest={},durable=true,recipe=0,selected=null,drag=null,suppress=0;
try{const data=JSON.parse(localStorage.getItem(key)||'{"plants":[],"harvest":{}}');if(!Array.isArray(data.plants)||data.plants.some(p=>!p||!produce[p.kind]||typeof p.id!=='string'||!Number.isFinite(p.created)||!Number.isFinite(p.x)||!Number.isFinite(p.y)||p.x<0||p.x>1||p.y<0||p.y>1)||!data.harvest||typeof data.harvest!=='object'||Object.values(data.harvest).some(n=>!Number.isInteger(n)||n<0))throw Error();plants=data.plants;harvest=data.harvest;}catch{durable=false;$('#storage').textContent='Saved garden data could not be read. It has not been changed. This garden lasts for this visit.';}
const visiblePlantIds=new Set(plants.slice(-5).map(p=>p.id));
function save(){if(!durable)return;try{localStorage.setItem(key,JSON.stringify({plants,harvest}));}catch{durable=false;$('#storage').textContent='Browser storage is unavailable. Your garden lasts for this visit.';}}
function choose(kind){selected=kind;garden.classList.toggle('choosing',!!kind);$('#spots').hidden=!kind;document.querySelectorAll('.packet').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.kind===kind)));hint.textContent=kind?`Plant ${kind.toLowerCase()}: tap the soil or choose a spot.`:'Click to plant. Drag to place.';}
function renderPlants(){const root=$('.planted');const focus=document.activeElement?.dataset?.plant;root.replaceChildren();for(const p of plants.filter(p=>visiblePlantIds.has(p.id))){const stage=growthStage(p.created);const b=document.createElement('button');b.className='crop '+stage;b.dataset.plant=p.id;b.dataset.stage=stage;b.style.setProperty('--growth-delay',-Math.max(0,(Date.now()-p.created)/1000)+'s');b.style.setProperty('--plant-height',(95+p.x*90+p.y*25)+'px');b.style.left=p.positionVersion===2?`calc(${p.x*100}% - 22px)`:(5+p.x*87-2)+'%';b.style.top=p.positionVersion===2?`calc(${p.y*100}% + 8px)`:(22+p.y*(matchMedia('(max-width:600px)').matches?20:38))+'%';b.innerHTML=produce[p.kind];b.title=p.kind+' · '+stage;b.setAttribute('aria-label',`Harvest ${p.kind.toLowerCase()}`);const art=document.createElement('span');art.className='crop-art';art.append(...b.childNodes);b.append(art);attachPlantTouch(b);b.addEventListener('click',()=>{harvest[p.kind]=(harvest[p.kind]||0)+1;plants=plants.filter(x=>x.id!==p.id);save();sendToBasket(b,p.kind);renderPlants();hint.textContent=`${p.kind} harvested. There’s room to plant again.`;});b.style.setProperty('--sway-time',(4+p.x*3+p.y*2)+'s');b.style.setProperty('--sway-phase',(-p.x*8-p.y*5)+'s');setPlantVariation(b,p.id);root.append(b);if(focus===p.id)b.focus({preventScroll:true});}requestAnimationFrame(spaceHarvestTips);}
function plantAt(x,y,kind=selected,positionVersion=1){if(!kind)return;if(plants.length>=120){choose(null);hint.textContent='This garden has 120 plants. You can pick a little to make room.';return;}plants.push({id:crypto.randomUUID(),kind,positionVersion,x:Math.max(0,Math.min(1,x)),y:Math.max(0,Math.min(1,y)),created:Date.now()});visiblePlantIds.add(plants[plants.length-1].id);save();renderPlants();hint.textContent=`${kind} planted. Watch for a little sprout.`;}
function renderBasket(){const total=Object.values(harvest).reduce((a,b)=>a+b,0);$('.basket').setAttribute('aria-label',total?`Open basket. Your harvest: ${Object.entries(harvest).map(([k,n])=>`${n} ${k}`).join(', ')}`:'Open your empty harvest basket');$('.basket-caption').textContent='Your Harvest';const tray=$('.basket-produce');tray.replaceChildren();Object.entries(harvest).filter(([k,n])=>produce[k]&&n).slice(-5).forEach(([kind],i)=>{const wrap=document.createElement('span');wrap.innerHTML=ingredientArt[kind];const art=wrap.firstElementChild;art.style.left=(i*15)+'%';art.style.transform=`rotate(${i*9-18}deg)`;tray.append(art);});}
function sendToBasket(source,kind){
 const start=(source.querySelector('.harvest-volume svg,.crop-art svg')||source).getBoundingClientRect(),basket=$('.basket').getBoundingClientRect();
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){renderBasket();return;}
 const flight=document.createElement('div');flight.className='harvest-flight';flight.setAttribute('aria-hidden','true');flight.innerHTML=produce[kind];
 Object.assign(flight.style,{left:start.left+'px',top:start.top+'px',width:start.width+'px',height:start.height+'px'});document.body.append(flight);
 const dx=basket.left+basket.width*.5-(start.left+start.width*.5),dy=basket.top+basket.height*.25-(start.top+start.height*.55);
 const lift=Math.max(35,Math.min(85,start.height*.65));
 // One uninterrupted arc: travel begins on release, with no separate lift or dwell.
 const frames=Array.from({length:41},(_,i)=>{
  const t=i/40;
  return {offset:t,transform:`translate(${dx*t}px,${dy*t-4*lift*t*(1-t)}px)`,opacity:t<.9?1:(1-t)/.1};
 });
 const motion=flight.animate(frames,{duration:2000,easing:'linear',fill:'forwards'});
 const finish=()=>{flight.remove();renderBasket();$('.basket').animate([{transform:'rotate(-3deg) translateY(0)'},{transform:'rotate(-2deg) translateY(2px)'},{transform:'rotate(-3deg) translateY(0)'}],{duration:220});};motion.onfinish=finish;motion.oncancel=()=>{flight.remove();renderBasket();};
}
function pick(b){if(b.disabled)return;const kind=b.dataset.kind;harvest[kind]=(harvest[kind]||0)+1;save();sendToBasket(b,kind);b.disabled=true;b.classList.add('picked');b.setAttribute('aria-label',kind+' picked');b.innerHTML='<svg viewBox="0 0 75 170" aria-hidden="true"><path d="M31 155l5-16 5 16" fill="none" stroke="#7b7950" stroke-width="3"/></svg>';hint.textContent=`${kind} picked for ${recipes[recipe].name.toLowerCase()} juice.`;}
function attachDrag(b,type,touchHandle=false){b.addEventListener('pointerdown',e=>{if(e.button!==0||b.disabled||drag||e.pointerType==='touch'&&!touchHandle)return;drag={b,type,pointerId:e.pointerId,x:e.clientX,y:e.clientY,moved:false,ghost:null};b.setPointerCapture(e.pointerId);});b.addEventListener('pointermove',e=>{if(!drag||drag.b!==b||e.pointerId!==drag.pointerId)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.hypot(dx,dy)<7&&!drag.moved)return;drag.moved=true;drag.clientY=e.clientY;if(!drag.ghost){const ghost=document.createElement('div');ghost.className='held-ingredient';ghost.innerHTML=produce[b.dataset.kind];document.body.append(ghost);drag.ghost=ghost;b.classList.add('held');const scrollHeld=()=>{if(!drag?.moved)return;const y=drag.clientY;if(y<90)window.scrollBy(0,-9);else if(y>innerHeight-90)window.scrollBy(0,9);drag.frame=requestAnimationFrame(scrollHeld);};drag.frame=requestAnimationFrame(scrollHeld);}drag.ghost.style.left=e.clientX+'px';drag.ghost.style.top=e.clientY+'px';if(type==='seed')garden.classList.add('choosing');});function finish(e,cancelled=false){if(!drag||drag.b!==b||e.pointerId!==drag.pointerId)return;const {moved,ghost,frame}=drag;cancelAnimationFrame(frame);ghost?.remove();drag=null;b.classList.remove('held');garden.classList.toggle('choosing',!!selected);if(cancelled){suppress=performance.now()+350;return;}if(!moved)return;suppress=performance.now()+350;if(type==='harvest')pick(b);else{const valid=dropPoint(soil.getBoundingClientRect(),e.clientX,e.clientY);const p=valid&&dropPoint(garden.getBoundingClientRect(),e.clientX,e.clientY);if(p)plantAt(p.x,p.y,b.dataset.kind,2);else hint.textContent='Drop the ingredient in the garden.';}}b.addEventListener('pointerup',e=>finish(e));b.addEventListener('pointercancel',e=>finish(e,true));b.addEventListener('lostpointercapture',e=>finish(e,true));}
function renderIngredients(){const plot=$('.vegetables'),packets=$('.seed-packets');plot.replaceChildren();packets.replaceChildren();recipes[recipe].ingredients.forEach((kind,i)=>{const b=document.createElement('button');b.className='leaf';b.dataset.kind=kind;b.title=kind;b.innerHTML=produce[kind];b.style.setProperty('--bed-column',i%4);b.style.setProperty('--bed-row',Math.floor(i/4));b.style.setProperty('--pick-column',i%3);b.style.setProperty('--pick-row',Math.floor(i/3));b.style.left=(65+(i%5)*6)+'%';b.style.top=(i<5?29:39)+'%';b.style.height=(i<5?17:12)+'%';b.style.zIndex=String(i<5?3:4);b.setAttribute('aria-label','Pick '+kind.toLowerCase());attachHarvest(b);plot.append(b);const packet=document.createElement('button');packet.className='packet';packet.dataset.kind=kind;packet.setAttribute('aria-label','Plant '+kind.toLowerCase());packet.setAttribute('aria-pressed','false');packet.innerHTML=ingredientArt[kind]+'<span>'+kind+'</span>';attachDrag(packet,'seed',true);packet.addEventListener('click',()=>{if(performance.now()>suppress)plantAt(.08+Math.random()*.84,.08+Math.random()*.84,kind);});const option=document.createElement('div');option.className='seed-option';option.append(packet);packets.append(option);});$('.seed-shelf>p').firstChild.textContent=recipes[recipe].name+' ingredients. ';}
soil.addEventListener('click',e=>{if(selected){const p=dropPoint(soil.getBoundingClientRect(),e.clientX,e.clientY);if(p)plantAt(p.x,p.y);}});$('#plant').addEventListener('click',()=>{$('.packet').focus();});$('#cancel').addEventListener('click',()=>choose(null));document.querySelectorAll('[data-spot]').forEach(b=>b.addEventListener('click',()=>plantAt([.15,.5,.85][+b.dataset.spot],.5)));document.addEventListener('keydown',e=>{if(e.key==='Escape')choose(null);});
function selectRecipe(i){const oldRecipe=recipe;recipe=(i+3)%3;const r=recipes[recipe];$('.recipe-frame').setAttribute('viewBox',r.frame);$('.recipe-frame').setAttribute('aria-label','Richard’s original '+r.name.toLowerCase()+' juice card');$('#transcript').replaceChildren(...r.text.split(' · ').map(line=>{const item=document.createElement('p');item.textContent=line;return item;}));$('.recipe-name').textContent=r.name;document.querySelectorAll('[data-card]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.card===recipe)));const readable=false;$('.card-turn').classList.toggle('turned',readable);$('#flip-card').setAttribute('aria-pressed',String(readable));$('#flip-card').textContent=readable?'See handwriting':'Read text';choose(null);renderIngredients();if($('#recipes').open)revealCard(recipe>=oldRecipe?1:-1);}
let recipeOpener=$('.bench');function openRecipes(e){recipeOpener=e.currentTarget;$('.card-turn').classList.remove('turned');$('#flip-card').setAttribute('aria-pressed','false');$('#flip-card').textContent='Read text';document.body.classList.add('sitting');$('#recipes').showModal();revealCard();}$('.bench').addEventListener('click',openRecipes);$('.recipe-sign').addEventListener('click',openRecipes);$('#recipes').addEventListener('close',()=>{document.body.classList.remove('sitting');recipeOpener.focus();});document.querySelectorAll('[data-card]').forEach(b=>b.addEventListener('click',()=>selectRecipe(+b.dataset.card)));$('#previous-card').addEventListener('click',()=>selectRecipe(recipe-1));$('#next-card').addEventListener('click',()=>selectRecipe(recipe+1));$('#flip-card').addEventListener('click',()=>{const turned=$('.card-turn').classList.toggle('turned');$('#flip-card').setAttribute('aria-pressed',String(turned));$('#flip-card').textContent=turned?'See handwriting':'Read text';revealCard(turned?1:-1);});$('#regrow').addEventListener('click',()=>{renderIngredients();hint.textContent='The back patch is full again. Your basket and planted seeds are unchanged.';});
selectRecipe(0);renderPlants();renderBasket();setInterval(()=>{if(document.hidden||document.querySelector('.crop-held'))return;const buttons=[...document.querySelectorAll('.planted button')];if(plants.filter(p=>visiblePlantIds.has(p.id)).some(p=>buttons.find(b=>b.dataset.plant===p.id)?.dataset.stage!==growthStage(p.created)))renderPlants();},400);

function showCollection(){const entries=Object.entries(harvest).filter(([kind,n])=>produce[kind]&&n>0);$('.collection-list').replaceChildren(...entries.map(([kind,n])=>{const li=document.createElement('li');li.innerHTML=ingredientArt[kind];const label=document.createElement('span');label.textContent=kind;const count=document.createElement('strong');count.textContent=String(n);li.append(label,count);return li;}));const total=entries.reduce((sum,[,n])=>sum+n,0);$('.collection-total').textContent=total?`${total} ingredients collected`:'';$('.collection-empty').hidden=total>0;$('#collection').showModal();document.body.classList.add('basket-open');if(!reduceMotion())$('#collection').animate([{transform:matchMedia('(max-width:600px)').matches?'translateY(70px)':'translateY(14px)',opacity:0},{transform:'translateY(0)',opacity:1}],{duration:320,easing:'cubic-bezier(.2,.8,.2,1)'});}
$('.basket').addEventListener('click',showCollection);$('#collection').addEventListener('close',()=>{document.body.classList.remove('basket-open');$('.basket').focus();});

// Bend the touched ingredient while keeping its root and hit area fixed.
function attachHarvest(button){
 button.classList.add('harvest-object');
 button.innerHTML=harvestArt(button.dataset.kind);
 let pointer=null,busy=false;
 function reset(){button.classList.remove('harvest-held','harvest-plucking');pointer=null;}
 function release(){
  if(busy||button.disabled)return;
  busy=true;
  if(button.isConnected)pick(button);
  reset();busy=false;
 }
 button.addEventListener('pointerdown',e=>{
  if(e.button!==0||button.disabled||busy)return;
  pointer=e.pointerId;button.setPointerCapture(pointer);button.classList.add('harvest-held');
 });
 button.addEventListener('pointermove',e=>{
  if(pointer!==e.pointerId)return;
  const r=button.getBoundingClientRect();
  button.style.setProperty('--bend',Math.max(-24,Math.min(24,(e.clientX-r.left-r.width/2)*.5))+'deg');
 });
 button.addEventListener('pointerup',e=>{if(pointer!==e.pointerId)return;pointer=null;release();});
 button.addEventListener('pointercancel',reset);
 button.addEventListener('lostpointercapture',()=>{if(pointer!==null)reset();});
 button.addEventListener('click',e=>{if(e.detail===0)release();});
}
function harvestArt(kind){return `<span class="harvest-volume" aria-hidden="true">${produce[kind]}</span>`;}

const sizeGarden=()=>garden.style.setProperty('--scene-height',garden.clientHeight+'px');
sizeGarden();new ResizeObserver(sizeGarden).observe(garden);

// Animate artwork inside fixed planting coordinates; growth remains on the inner SVG.
function reduceMotion(){return matchMedia('(prefers-reduced-motion: reduce)').matches;}
function attachPlantTouch(button){
 let held=null;
 const reset=()=>{held=null;button.classList.remove('crop-held');button.style.removeProperty('--plant-bend');};
 button.addEventListener('pointerdown',e=>{
  if(e.button!==0||selected)return;
  held={id:e.pointerId,x:e.clientX};button.setPointerCapture(e.pointerId);
  button.classList.add('crop-held');button.style.setProperty('--plant-bend','-9deg');
 });
 button.addEventListener('pointermove',e=>{
  if(held?.id!==e.pointerId)return;
  button.style.setProperty('--plant-bend',Math.max(-20,Math.min(20,(e.clientX-held.x)*.45))+'deg');
 });
 button.addEventListener('pointerup',reset);
 button.addEventListener('pointercancel',reset);
 button.addEventListener('lostpointercapture',reset);
}
function revealCard(direction=1){
 const card=$('.card-turn');card.getAnimations().forEach(a=>a.cancel());
 if(reduceMotion())return;
 card.animate([{opacity:.45,transform:`translateX(${direction*10}px) rotate(${direction*.6}deg)`},{opacity:1,transform:'none'}],{duration:320,easing:'cubic-bezier(.2,.8,.2,1)'});
}
// The sheet grip owns the drag; the ingredient list keeps ordinary scrolling.
const collection=$('#collection'),grip=$('.sheet-grip');let sheetDrag=null,sheetClickUntil=0;
grip.addEventListener('click',e=>{if(e.detail===0||performance.now()>sheetClickUntil)collection.close();});
grip.addEventListener('pointerdown',e=>{if(e.button!==0)return;collection.getAnimations().forEach(a=>a.cancel());sheetDrag={id:e.pointerId,y:e.clientY,dy:0};grip.setPointerCapture(e.pointerId);});
grip.addEventListener('pointermove',e=>{if(sheetDrag?.id!==e.pointerId)return;sheetDrag.dy=Math.max(0,e.clientY-sheetDrag.y);collection.style.transform=`translateY(${sheetDrag.dy}px)`;});
function finishSheet(e){
 if(sheetDrag?.id!==e.pointerId)return;
 const distance=sheetDrag.dy;if(distance>5||e.type!=='pointerup')sheetClickUntil=performance.now()+400;sheetDrag=null;collection.style.removeProperty('transform');
 if(e.type==='pointerup'&&distance>70){collection.close();return;}
 if(distance>0&&!reduceMotion())collection.animate([{transform:`translateY(${distance}px)`},{transform:'none'}],{duration:230,easing:'ease-out'});
}
grip.addEventListener('pointerup',finishSheet);grip.addEventListener('pointercancel',finishSheet);grip.addEventListener('lostpointercapture',finishSheet);
collection.addEventListener('close',()=>{sheetDrag=null;collection.style.removeProperty('transform');collection.getAnimations().forEach(a=>a.cancel());});

function togglePanel(panel,button){
 const opening=panel.hidden;document.querySelectorAll('.garden-panel').forEach(p=>p.hidden=true);
 document.querySelectorAll('[aria-controls="about-panel"],[aria-controls="music-panel"]').forEach(b=>b.setAttribute('aria-expanded','false'));
 panel.hidden=!opening;button.setAttribute('aria-expanded',String(opening));
 if(opening&&!reduceMotion())panel.animate([{opacity:0,transform:'translate(-50%, calc(-50% + 8px))'},{opacity:1,transform:'translate(-50%, -50%)'}],{duration:350,easing:'ease-out'});
}
$('.about-garden').addEventListener('click',()=>togglePanel($('#about-panel'),$('.about-garden')));
$('.garden-fire').addEventListener('click',()=>togglePanel($('#music-panel'),$('.garden-fire')));
for(const close of document.querySelectorAll('.panel-close'))close.addEventListener('click',()=>{const panel=close.closest('.garden-panel');panel.hidden=true;const button=document.querySelector(`[aria-controls="${panel.id}"]`);button.setAttribute('aria-expanded','false');button.focus();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')for(const panel of document.querySelectorAll('.garden-panel:not([hidden])')){panel.hidden=true;const button=document.querySelector(`[aria-controls="${panel.id}"]`);button.setAttribute('aria-expanded','false');button.focus();}});

$('.read-recipes').addEventListener('click',openRecipes);
const meadow=document.createElement('div');meadow.className='meadow';meadow.setAttribute('aria-label','Garden ingredients to harvest');garden.prepend(meadow);
const kinds=Object.keys(produce);
// Start with a few seedlings; visitors fill the garden by planting.
for(let i=0;i<3;i++){const plant=document.createElement('button');plant.className='meadow-plant';plant.dataset.kind=kinds[i%kinds.length];plant.setAttribute('aria-label','Harvest '+plant.dataset.kind.toLowerCase());plant.addEventListener('click',()=>pick(plant));plant.innerHTML=produce[plant.dataset.kind];plant.style.left=(3+(i*37%89))+'%';plant.style.top=(24+(matchMedia('(max-width:600px)').matches?i*9%22:i*19%40))+'%';plant.style.height=(100+(i*23%105))+'px';plant.style.setProperty('--sway-time',(5+i%5)+'s');plant.style.setProperty('--sway-phase',(-i*.6)+'s');setPlantVariation(plant,'meadow-'+i);meadow.append(plant);}

// Stable variation prevents the breeze from changing whenever growth rerenders.
function setPlantVariation(element,id){
 let hash=2166136261;for(const char of id)hash=Math.imul(hash^char.charCodeAt(0),16777619)>>>0;
 const fraction=(hash%1000)/1000;
 element.style.setProperty('--sway-time',(4.5+fraction*3.3)+'s');
 element.style.setProperty('--sway-phase',(-fraction*11)+'s');
 element.style.setProperty('--sway-left',(-1.4-fraction*1.8)+'deg');
 element.style.setProperty('--sway-right',(1.3+fraction*1.6)+'deg');
 element.style.setProperty('--plant-scale',(.88+fraction*.23));
 element.style.setProperty('--plant-flip',hash%2?-1:1);
 const stem=element.querySelector('.stick-stem path');
 const curves=['M38 164C37 113 40 66 38 23','M38 164C19 121 57 72 38 23','M38 164C58 126 19 67 38 23','M38 164C23 106 21 54 38 23','M38 164C54 114 58 55 38 23'];
 if(stem)stem.setAttribute('d',curves[hash%curves.length]);
 if(element.style.height)element.style.setProperty('--plant-height',element.style.height);

}

// Give every visible ingredient a clear target, including densely planted clusters.
function spaceHarvestTips(){
 const occupied=[],bounds=garden.getBoundingClientRect();
 for(const button of garden.querySelectorAll('.meadow-plant:not(:disabled),.planted .crop')){
  if(button.dataset.plant&&plants.find(p=>p.id===button.dataset.plant)?.positionVersion===2)continue;
  const rect=button.getBoundingClientRect();let x=rect.left+rect.width/2,y=rect.top+12;
  let dx=0,dy=0;
  for(let attempt=0;attempt<40&&occupied.some(p=>Math.abs(p.x-x)<48&&Math.abs(p.y-y)<48);attempt++){
   dx+=48;x+=48;
   if(x>bounds.right-70){x=bounds.left+35;dx=x-(rect.left+rect.width/2);y+=48;dy+=48;}
  }
  if(dx)button.style.left=`calc(${button.style.left} + ${dx}px)`;
  if(dy)button.style.top=`calc(${button.style.top} + ${dy}px)`;
  occupied.push({x,y});
 }
}
requestAnimationFrame(spaceHarvestTips);

// A brief, live-announced notice rather than permanent instructions in the scene.
let noticeTimer;
const notify=()=>{clearTimeout(noticeTimer);if(!hint.textContent.trim()){hint.classList.remove('visible');return;}hint.classList.toggle('visible',!!hint.textContent.trim());noticeTimer=setTimeout(()=>{hint.classList.remove('visible');hint.textContent='';},3500)};
new MutationObserver(notify).observe(hint,{childList:true,characterData:true,subtree:true});
hint.textContent='';
const controls=document.createElement('nav');controls.className='garden-pocket-controls';controls.setAttribute('aria-label','Garden controls');
for(const item of [$('.garden-fire'),$('.basket'),$('#pocket-notebook'),$('#back')])if(item)controls.append(item);
document.body.append(controls);
