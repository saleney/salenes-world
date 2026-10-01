import {places,destinations} from '../src/destinations.js';
document.querySelector('h1').textContent=places.courage.title;
const discoveries=[
{note:'The unfinished letter',action:'You do not need to feel ready in order to take one honest step.',points:[[240,220],[310,110],[400,195],[510,100],[580,210]]},
{note:'The small beginning',action:'Name the smallest version of the brave thing. Make it tiny enough to begin today.',points:[[220,220],[310,190],[380,145],[460,115],[555,90]]},
{note:'Your own point of view',action:'Try asking: “What would I do if I trusted my own point of view for ten minutes?”',points:[[290,210],[245,135],[350,90],[480,110],[540,200],[410,240],[290,210]]},
{note:'A hand within reach',action:'Being scared is not a verdict. It might just mean you are standing near something that matters.',points:[[260,130],[340,200],[420,130],[500,200],[580,130]]}
];
let next=0;const sky=document.querySelector('#constellation');
document.querySelector('.telescope').addEventListener('click',()=>{
 const item=discoveries[next];next=(next+1)%discoveries.length;
 sky.replaceChildren();const ns='http://www.w3.org/2000/svg';const line=document.createElementNS(ns,'polyline');line.setAttribute('points',item.points.map(p=>p.join(',')).join(' '));line.setAttribute('class','route');sky.append(line);
 item.points.forEach(([x,y],i)=>{const star=document.createElementNS(ns,'path');star.setAttribute('d',`M${x} ${y-5}l1.5 3.5 3.5 1.5-3.5 1.5-1.5 3.5-1.5-3.5-3.5-1.5 3.5-1.5Z`);star.setAttribute('class','star');star.style.animationDelay=i*.1+'s';sky.append(star)});
 document.querySelector('.annotation').textContent=item.action;
 document.querySelector('.tube').style.transform=`rotate(${[-8,4,-3,8][next]}deg)`;
});
const notebook=document.createElement('script');notebook.src=import.meta.env.BASE_URL+'travel-notebook.js';notebook.onload=()=>window.mountNotebook({base:import.meta.env.BASE_URL,current:'courage',places:destinations.map(p=>({...p,href:p.href?import.meta.env.BASE_URL+p.href:undefined}))});document.head.append(notebook);

document.querySelector('header a').href=import.meta.env.BASE_URL;
