import {produce} from './produce.js';
// Keep distinct hand-drawn ingredient silhouettes for the tray and basket.
export const ingredientArt=Object.fromEntries(Object.entries(produce).map(([kind,art])=>[kind,art.replace('<svg ', '<svg class="ingredient-drawing" ').replace('aria-hidden="true">','aria-hidden="true" stroke-linecap="round" stroke-linejoin="round">')]));
// Small animated vector plants; color and silhouette identify each recipe ingredient.
const stemColors={Beet:'#b3848b',Carrot:'#c28d62',Pear:'#a0aa78',Apple:'#b97c75',Orange:'#d2a351',Grapefruit:'#cfb27d','Red chard':'#b38583'};
for(const kind of Object.keys(produce)){
 const color=stemColors[kind]||'#9ba888';
 produce[kind]=`<svg class="stick-stem" viewBox="0 0 75 170" preserveAspectRatio="none" aria-hidden="true"><path d="M38 164C24 117 54 66 38 23" fill="none" stroke="${color}" stroke-width="1" stroke-linecap="round"/></svg><span class="plant-tip">${ingredientArt[kind]}</span>`;
}
