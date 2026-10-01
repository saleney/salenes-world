import { destinations } from './destinations.js';
const positions={visitor:[12,68],post:[22,49],curiosity:[17,28],language:[32,13],beauty:[39,38],arcade:[36,63],soup:[29,86],aquarium:[53,89],heart:[54,64],drafts:[66,45],questions:[59,10],grief:[76,7],ideas:[82,36],courage:[92,15]};
const drawings={
visitor:'<path d="m14 34 25-19 27 20M19 31v32h42V31M34 63V47h13v16"/><circle cx="40" cy="37" r="3" fill="#b9755c"/>',
post:'<path fill="#d6c7af" d="M17 28 62 27 63 57 18 58ZM18 29l23 17 21-18"/>',
curiosity:'<path d="M18 61V35Q19 12 40 12T62 35v26ZM40 13v47M20 39h40M29 18v43M51 18v42"/>',
language:'<path fill="#a7b49a" d="m12 60 17-43 15 43Zm27-5 12-32 15 32Z"/>',
beauty:'<circle cx="40" cy="38" r="24"/><path d="M17 39h46M41 14v48"/>',
arcade:'<path d="m18 16 46 1-1 48-44 1Z"/><circle cx="31" cy="34" r="3"/><circle cx="51" cy="34" r="3"/><path d="M28 48q12 10 25-1"/>',
soup:'<path d="m12 34 29-19 27 21M18 32v32h45V33M32 64V46h15v18M49 20v-8h9v15"/>',
aquarium:'<path d="M13 26q1-5 8-5l42 1q6 0 5 9l-1 25q0 6-7 6H20q-7 0-7-7Z"/><path stroke="#8da6a9" d="M21 46q15-16 34 0M22 50q20-5 35 0"/>',
heart:'<path stroke="#b9755c" d="M40 65Q9 45 18 24q8-19 22-4 18-15 24 3 7 21-24 42Z"/>',
drafts:'<path d="m23 13 33 1-1 51-34-1ZM23 22h32M26 30h25M26 37h23M27 45h16"/>',
questions:'<circle fill="#aab69d" stroke="none" cx="29" cy="32" r="15"/><circle fill="#b9c3ad" stroke="none" cx="50" cy="30" r="18"/><path d="M30 45v17M51 46v17"/>',
grief:'<path d="M40 63V29M40 47q-18-2-20-15 18-2 20 15M40 40q17-2 18-14-17-2-18 14M20 66q20-8 39 0"/><circle fill="#bdab81" cx="40" cy="20" r="9"/>',
ideas:'<path d="m9 62 28-50 32 49ZM27 30l11 7 9-8"/>',
courage:'<path d="M16 53v-15q23-38 47 0v15ZM39 24v-9M33 16h13M17 58h46"/><circle fill="#cba55f" stroke="none" cx="39" cy="24" r="4"/>'};
const map=document.querySelector('.map');
for(const d of destinations){const b=document.createElement('a');b.className='place';b.style.left='clamp(52px, '+positions[d.id][0]+'%, calc(100% - 52px))';b.style.top=positions[d.id][1]+'%';b.innerHTML=`<svg viewBox="0 0 80 80" aria-hidden="true">${drawings[d.id]}</svg><span>${d.title}</span><em>${d.tag||d.kicker.toLowerCase()}</em>`;b.setAttribute('aria-label',d.title);b.href=d.href?new URL(d.href+'index.html',new URL(import.meta.env.BASE_URL,location.origin)).href:'./room.html?place='+d.id;if(d.id==='visitor'){b.addEventListener('click',e=>{e.preventDefault();openVisitor(b)})}document.querySelector('#places').append(b);}
let drag=null,x=0,y=0;map.onpointerdown=e=>{if(e.target.closest('button,a,aside'))return;drag={sx:e.clientX,sy:e.clientY,x,y};map.setPointerCapture(e.pointerId)};map.onpointermove=e=>{if(drag){x=Math.max(-60,Math.min(60,drag.x+e.clientX-drag.sx));y=Math.max(-40,Math.min(40,drag.y+e.clientY-drag.sy));map.style.setProperty('--x',x+'px');map.style.setProperty('--y',y+'px')}else if(matchMedia('(prefers-reduced-motion: no-preference)').matches){map.style.setProperty('--hill',(e.clientX/innerWidth-.5)*10+'px')}};map.onpointerup=()=>drag=null;document.querySelector('#reset').onclick=()=>{x=y=0;map.style.setProperty('--x','0px');map.style.setProperty('--y','0px')};
const notebookScript=document.createElement('script');notebookScript.src=import.meta.env.BASE_URL+'travel-notebook.js';notebookScript.onload=()=>window.mountNotebook({base:import.meta.env.BASE_URL,places:destinations.map(p=>({...p,href:p.href?import.meta.env.BASE_URL+p.href:undefined}))});document.head.append(notebookScript);

const visitorScroll=document.createElement('dialog');visitorScroll.className='visitor-scroll';visitorScroll.setAttribute('aria-labelledby','visitor-scroll-title');
const closeScroll=document.createElement('button');closeScroll.className='scroll-close';closeScroll.textContent='×';closeScroll.setAttribute('aria-label','Close Visitor Center');
const scrollTitle=document.createElement('h2');scrollTitle.id='visitor-scroll-title';scrollTitle.textContent=destinations.find(p=>p.id==='visitor').title;
visitorScroll.append(closeScroll,scrollTitle);
for(const text of destinations.find(p=>p.id==='visitor').scrollNote){const p=document.createElement('p');p.textContent=text;visitorScroll.append(p)}
document.body.append(visitorScroll);
let scrollTrigger;
function openVisitor(trigger){scrollTrigger=trigger;visitorScroll.classList.remove('closing');visitorScroll.showModal();closeScroll.focus()}
function closeVisitor(){if(visitorScroll.classList.contains('closing'))return;visitorScroll.classList.add('closing');setTimeout(()=>{visitorScroll.close();scrollTrigger?.focus()},matchMedia('(prefers-reduced-motion: reduce)').matches?0:280)}
closeScroll.addEventListener('click',closeVisitor);visitorScroll.addEventListener('cancel',e=>{e.preventDefault();closeVisitor()});
