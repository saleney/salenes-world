import { openPlace } from './main.js';
const atlasRoom=new URLSearchParams(location.search).get('place');if(atlasRoom)openPlace(atlasRoom);
const backToAtlas=document.createElement('a');backToAtlas.href=new URL(import.meta.env.BASE_URL,location.origin).href;backToAtlas.textContent='← Back to the atlas';backToAtlas.style.cssText='position:fixed;top:16px;left:16px;z-index:100;background:#f8f5e9;padding:10px 16px;color:#514638';document.body.append(backToAtlas);
