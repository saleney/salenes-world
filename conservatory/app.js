import {places,destinations} from '../src/destinations.js';
document.querySelector('h1').textContent=places.curiosity.title;
const discoveryWindow=document.createElement('dialog');
discoveryWindow.className='discovery-window';
discoveryWindow.innerHTML='<button class="dismiss" aria-label="Close discovery">×</button><div class="discovery-content"></div>';
document.body.append(discoveryWindow);
let activeDiscovery;
function openDiscovery(paper,button,title){
  paper.hidden=false;
  discoveryWindow.querySelector('.discovery-content').replaceChildren(paper);
  discoveryWindow.setAttribute('aria-label',title);
  discoveryWindow.dataset.kind=title.includes('leaf')?'leaf':title.includes('aquarium')?'water':title.includes('nest')?'nest':'light';
  button.setAttribute('aria-expanded','true');
  activeDiscovery={paper,button};
  discoveryWindow.showModal();
}
discoveryWindow.querySelector('.dismiss').onclick=()=>discoveryWindow.close();
discoveryWindow.addEventListener('close',()=>{
  if(!activeDiscovery)return;
  activeDiscovery.paper.hidden=true;
  activeDiscovery.button.setAttribute('aria-expanded','false');
  activeDiscovery.button.focus();
  activeDiscovery=null;
});
const specimens=[
{name:'The aquarium',mark:'WATER / 01',questions:['Can fish get thirsty?', 'What would a fish notice first about your world?', 'If the ocean kept a diary, what would it leave out?', 'What makes a place feel like home to a creature that is always moving?'],note:'A question to swim around with.',drawing:'<path class="water" d="M17 51q20-9 43 0t43 0v51H17Z"/><path d="M15 29q40-6 91 0v75H15ZM17 52q20-9 43 0t43 0"/><g class="fish"><path d="M46 72q14-18 28 0-14 17-28 0l-10-10v21Z"/><circle cx="65" cy="70" r="1.5"/></g><circle class="bubble" cx="83" cy="64" r="3"/>'},
{name:'The light drawer',mark:'LIGHT / 02',questions:['What changes when you look from somewhere else?', 'What ordinary thing looks different in the afternoon light?', 'If you could borrow someone’s eyes for a minute, whose would you choose?', 'What have you been looking at without really seeing?'],note:'Try turning the prism.',drawing:'<path class="ray" d="M5 60h33M75 61l34-20m-34 20 34 0m-34 0 34 20"/><path class="prism" d="m38 87 22-58 21 58Z"/>'},
{name:'The folded leaf',mark:'GROWTH / 03',questions:['Do trees experience time differently from us?', 'What would a leaf remember about this morning?', 'What is growing quietly while you aren’t paying attention?', 'If you could ask a tree one question, what would it be?'],note:'A question to carry outside.',drawing:'<path class="leaf" d="M60 102V26q-49 3-34 42 12 19 34 15 41-2 31-43-11-19-31-14Z"/><path d="M60 86 34 56m26 13 22-24M60 54 42 37"/>'},
{name:'The nest',mark:'LIFE / 04',questions:['Do birds dream?', 'How does a hummingbird’s heart keep up?', 'What does a sleeping animal’s heartbeat sound like?', 'How does a bird know where to build its nest?'],note:'',drawing:'<path class="nest-bowl" d="M22 65q35 17 77-2-7 37-38 37-29 0-39-35Z"/><path d="M19 65q34 19 82-2M24 74q35 17 71-2M31 84q28 13 59-2M39 93q22 7 43-2M25 64l-11-8m24 13-9-15m61 10 16-12M32 79l-13 4m74-5 14 3"/><g class="nest-eggs"><ellipse cx="49" cy="57" rx="10" ry="14" transform="rotate(-14 49 57)"/><ellipse cx="69" cy="55" rx="10" ry="15" transform="rotate(12 69 55)"/></g>'}
];
for(const [i,item] of specimens.entries()){
const section=document.createElement('section');section.className='specimen specimen-'+i;
const button=document.createElement('button');button.className='object';button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls','discovery-'+i);button.innerHTML='<svg viewBox="0 0 120 120" aria-hidden="true">'+item.drawing+'</svg><span></span><small></small>';button.querySelector('span').textContent=item.name;button.querySelector('small').textContent=item.mark;
const paper=document.createElement('div');paper.className='discovery';paper.id='discovery-'+i;paper.hidden=true;paper.setAttribute('aria-live','polite');
const question=document.createElement('p');question.textContent=item.questions[0];const note=document.createElement('p');note.className='note';note.textContent=item.note;
let nextQuestion=0;
button.addEventListener('click',()=>{question.textContent=item.questions[nextQuestion];nextQuestion=(nextQuestion+1)%item.questions.length;openDiscovery(paper,button,item.name)});
paper.append(question);if(item.note)paper.append(note);section.append(button);document.querySelector('.objects').append(section)
}

document.querySelector('#back').href=import.meta.env.BASE_URL;
const notebookScript=document.createElement('script');notebookScript.src=import.meta.env.BASE_URL+'travel-notebook.js';notebookScript.onload=()=>window.mountNotebook({base:import.meta.env.BASE_URL,current:'curiosity',places:destinations.map(p=>({...p,href:p.href?import.meta.env.BASE_URL+p.href:undefined}))});document.head.append(notebookScript);
