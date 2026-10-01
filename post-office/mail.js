import {places,destinations} from '../src/destinations.js';
import './mail.css';
const base=import.meta.env.BASE_URL;
document.querySelector('h1').textContent=places.post.title;document.querySelector('#back').href=base;
const mail=[
{label:'For a hard day',number:'01',note:'You don’t have to turn today into a lesson. You’re allowed to be tired, to miss someone, to need a little company.',after:'A cup of something warm. No advice tucked inside.',gift:'<path d="M28 36q24-4 46 0l-5 34q-18 11-35 0ZM74 40q24-2 18 17-4 10-21 6M26 78q24 7 52 0M43 25q-8-9 0-17m16 17q-8-9 0-17"/>'},
{label:'For a little courage',number:'02',note:'You can begin before you know how it turns out. One small, imperfect step still counts.',after:'A very small flag for your very small first step.',gift:'<path d="M35 83q1-34-1-67M35 18q20-10 43 3l-9 15 10 13q-22-12-44-1M20 85q16-6 31 0"/><path fill="#ba816855" d="M35 18q20-10 43 3l-9 15 10 13q-22-12-44-1Z"/>'},
{label:'Just because',number:'03',note:'This is for you. No occasion, no achievement, no reason you have to earn it.',after:'An excellent little orange. It brought its own sunshine.',gift:'<path d="M54 28q-3-13 4-20M56 18q24-15 27-1-13 15-27 1"/><path fill="#cc9a6455" d="M54 30q-33-8-33 26t33 29q34 1 33-29T54 30Z"/><path d="M31 47q-8 17 2 28"/>'}
];
const table=document.querySelector('.mail-table');
mail.forEach((item,i)=>{
 const parcel=document.createElement('section');parcel.className='parcel parcel-'+i;
 const button=document.createElement('button');button.className='envelope';button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls','letter-'+i);button.setAttribute('aria-label','Open '+item.label.toLowerCase());
 button.innerHTML='<svg viewBox="0 0 340 220" aria-hidden="true"><path class="envelope-shadow" d="M17 61l311-3 4 149-311 4Z"/><path class="envelope-paper" d="M10 52q140-7 315 0l-2 148q-152 7-311 0Z"/><path class="fold" d="M13 57l152 95L323 54"/><path class="flap" d="M11 54 167 12 324 54l-159 95Z"/><path class="seal" d="M164 123q-15-16-18 0 1 15 18 26 19-12 20-26-4-16-20 0Z"/></svg><span class="mail-label"></span><small></small>';
 button.querySelector('.mail-label').textContent=item.label;button.querySelector('small').textContent='MAIL / '+item.number;
 const letter=document.createElement('div');letter.className='letter';letter.id='letter-'+i;letter.hidden=true;
 const note=document.createElement('p');note.textContent=item.note;
 const gift=document.createElement('div');gift.className='gift';gift.innerHTML='<svg viewBox="0 0 110 100" aria-hidden="true">'+item.gift+'</svg>';
 const after=document.createElement('p');after.className='gift-note';after.textContent=item.after;
 const close=document.createElement('button');close.className='fold-away';close.textContent='Tuck it back';
 function setOpen(open){parcel.classList.toggle('open',open);letter.hidden=!open;button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',(open?'Close ':'Open ')+item.label.toLowerCase())}
 button.addEventListener('click',()=>setOpen(letter.hidden));close.addEventListener('click',()=>{setOpen(false);button.focus()});
 // Hover lifts the flap; opening the letter remains available on touch and keyboard.
 letter.append(note,gift,after,close);parcel.append(button,letter);table.append(parcel);
});
const script=document.createElement('script');script.src=base+'travel-notebook.js';script.onload=()=>window.mountNotebook({base,current:'post',places:destinations.map(p=>({...p,href:p.href?base+p.href:undefined}))});document.head.append(script);
