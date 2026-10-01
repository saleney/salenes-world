import {destinations,places} from '../src/destinations.js';
import {createWordWoods} from '../src/word-woods.js';
document.querySelector('h1').textContent=places.language.title;
document.querySelector('#back').href=import.meta.env.BASE_URL;
createWordWoods(document.querySelector('#woods-toy'),()=>false,{directMeaning:true});
const notebookScript=document.createElement('script');notebookScript.src=import.meta.env.BASE_URL+'travel-notebook.js';notebookScript.onload=()=>window.mountNotebook({base:import.meta.env.BASE_URL,current:'language',places:destinations.map(p=>({...p,href:p.href?import.meta.env.BASE_URL+p.href:undefined}))});document.head.append(notebookScript);
