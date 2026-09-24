import * as THREE from 'three'
import globeTextureUrl from './assets/salene-globe-surface.png'
import { destinations, places } from './destinations.js'
import './style.css'
import { createJournal } from './journal.js'
import { createWordWoods } from './word-woods.js'
import './word-woods.css'

const placeNames = Object.fromEntries(
  Object.entries(places).map(([id, place]) => [id, place.title]),
)

const heartButton = document.querySelector('#heart-button')
const heartFact = document.querySelector('#heart-fact')
const questionButton = document.querySelector('#question-button')
const question = document.querySelector('#question')
const panelTitle = document.querySelector('#panel-title')
const wordCard = document.querySelector('#word-card')
const wordHanzi = document.querySelector('#word-hanzi')
const wordPinyin = document.querySelector('#word-pinyin')
const wordHint = document.querySelector('#word-hint')
const wordMeaning = document.querySelector('#word-meaning')
const nextWordButton = document.querySelector('#next-word')
const ingredientButtons = document.querySelectorAll('.ingredient')
const soupResult = document.querySelector('#soup-result')
const soupMessage = document.querySelector('#soup-message')
const beautyButton = document.querySelector('#beauty-button')
const beautyPrompt = document.querySelector('#beauty-prompt')
const gardenChoices = document.querySelectorAll('.garden-choice')
const gardenResponse = document.querySelector('#garden-response')
const curiosityButton = document.querySelector('#curiosity-button')
const curiosityFact = document.querySelector('#curiosity-fact')
const postButton = document.querySelector('#post-button')
const postPrompt = document.querySelector('#post-prompt')
const courageButton = document.querySelector('#courage-button')
const couragePrompt = document.querySelector('#courage-prompt')
const arcadeButton = document.querySelector('#arcade-button')
const arcadePrompt = document.querySelector('#arcade-prompt')
const draftButton = document.querySelector('#draft-button')
const draftPrompt = document.querySelector('#draft-prompt')
const aquariumButton = document.querySelector('#aquarium-button')
const aquariumQuestion = document.querySelector('#aquarium-question')
const globe = document.querySelector('#globe')
const globeCanvas = document.querySelector('#globe-canvas')
const mapPlaces = document.querySelector('#map-places')
const placePicker = document.querySelector('#place-picker')
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

destinations.forEach((place, index) => {
  const button = document.createElement('button')
  button.className = 'map-place active'
  button.type = 'button'
  button.dataset.place = place.id
  button.setAttribute('aria-pressed', String(place.id === 'visitor'))
  button.innerHTML = `
    <span class="place-art" aria-hidden="true"><img src="${place.art}" alt="" /></span>
    <span class="place-name">${place.title}</span>
    ${place.tag ? `<span class="place-tag">${place.tag}</span>` : ''}
  `
  mapPlaces.append(button)
  const option = new Option(place.title, place.id, false, place.id === 'visitor')
  placePicker.add(option)
})

const mapButtons = document.querySelectorAll('.map-place.active')

const pocketKey = 'salene-world-wanderings'
let wanderings = []

try {
  wanderings = JSON.parse(window.localStorage.getItem(pocketKey) || '[]')
} catch {
  wanderings = []
}


function rememberPlace(place) {
  wanderings = [...wanderings.filter((visited) => visited !== place), place].slice(-8)
  try { window.localStorage.setItem(pocketKey, JSON.stringify(wanderings)) } catch { /* Navigation still works when storage is unavailable. */ }

}


const questions = [
  'What do you know so well that you have stopped seeing it?',
  'Which ordinary object has the most dramatic secret life?',
  'What would a map of your attention look like today?',
  'What is something you could learn simply because it delights you?',
  'If wonder had a sound, where would you hear it first?',
]

let nextQuestion = 0
let nextWord = 0
let nextBeautyPrompt = 0
let nextCuriosity = 0
let nextPostPrompt = 0
let nextCouragePrompt = 1
let nextArcadePrompt = 0
let nextDraftPrompt = 0
let nextAquariumQuestion = 0

const words = [
  { hanzi: '朋友', pinyin: 'péngyou', meaning: 'friend', scene: 'You save the seat beside you. A friend arrives with two warm buns.' },
  { hanzi: '好奇', pinyin: 'hàoqí', meaning: 'curious', scene: 'A tiny door appears in a tree. You lean closer: what could be inside?'  },
  { hanzi: '星星', pinyin: 'xīngxing', meaning: 'star', scene: 'The lights go out. Above the roof, the first star becomes visible.' },
  { hanzi: '谢谢', pinyin: 'xièxie', meaning: 'thank you', scene: 'Someone holds an umbrella over both of you. You turn toward them: 谢谢.' },
  { hanzi: '一起', pinyin: 'yìqǐ', meaning: 'together', scene: 'There is room on the path for two. You set off together.' },
]

const soupRecipes = {
  notice: 'Send this: “I saw this and thought of you.” Specific noticing is a tiny way of saying: I keep you with me.',
  invite: 'Try this: “Want to take a walk / get a snack / sit on a call together this week?” Small invitations leave room to say yes.',
  return: 'Try this: “I was thinking about what you told me—how did that go?” Coming back is one of the kindest forms of attention.',
}

const beautyPrompts = [
  'Find one color today that makes you feel more alive. If you can, send it to someone.',
  'Put on a song that makes the room feel bigger. Let it be enough that it exists.',
  'Notice the light on an ordinary surface: a wall, a spoon, somebody’s sleeve. Beautiful counts even when no one else sees it.',
  'Share a small delight with a friend: a strange fruit, a funny dog, an excellent cloud, a sentence worth keeping.',
  'Make one tiny thing more beautiful for your future self: clear a corner, light a candle, put a flower in water.',
]

const gardenResponses = {
  name: 'You might say their name, write one ordinary thing you miss, or let the memory be specific. Love leaves particular shapes behind.',
  stay: 'You do not need the perfect words. “I’m here. I remember. I can sit with you” is often enough.',
  soften: 'A laugh, a beautiful day, or a moment of ease does not betray what was lost. It is part of continuing to love life.',
}

const curiosityFacts = [
  'Octopuses have three hearts. The ocean has been quietly carrying this fact around all along.',
  'A rainbow is not an object in one fixed place. It changes with where you are standing. So does a surprising amount of life.',
  'Your brain is always making predictions about what comes next. Curiosity is what happens when you let a prediction be interrupted.',
  'Honey can last for thousands of years without spoiling. Imagine being the person who first opened an ancient jar and decided to taste it.',
]

const postPrompts = [
  'Try: “I saw this and it made me think of you.” Specific remembering is a kind of care.',
  'Try: “No pressure to reply fast—I just wanted to say I am glad you are here.”',
  'Try: “How is the thing you told me about going?” Returning to a story is a small form of loyalty.',
  'Try: “Want to sit together soon?” Sometimes a simple invitation is enough to open a door.',
]

const couragePrompts = [
  'You do not need to feel ready in order to take one honest step.',
  'Name the smallest version of the brave thing. Make it tiny enough to begin today.',
  'Being scared is not a verdict. It might just mean you are standing near something that matters.',
  'Try asking: “What would I do if I trusted my own point of view for ten minutes?”',
]

const arcadePrompts = [
  'Text someone: “Want to trade one tiny win and one tiny annoyance from today?”',
  'Make a two-person playlist with alternating songs. No explaining the choices until later.',
  'Ask someone to send you a photo of the most interesting thing within arm’s reach.',
  'Try a co-op question: “What would our extremely niche themed café be called?”',
]

const draftPrompts = [
  'Write a six-word story about a plant that has become too powerful.',
  'Draw the worst possible logo for a club you secretly wish existed.',
  'Invent a useless object. Give it one very specific feature.',
  'Write the opening sentence of a mystery novel where the detective is a pigeon.',
]

const aquariumQuestions = [
  'Can fish get thirsty?',
  'Why are there no naturally green mammals?',
  'If you replaced every part of a ship, when would it become a different ship?',
  'What would a map of your attention look like today?',
  'Do trees experience time differently from us?',
]

heartButton.addEventListener('click', () => {
  heartButton.classList.toggle('is-beating')
  heartFact.textContent = heartButton.classList.contains('is-beating')
    ? 'There it is. A steady little drummer, working for you all day long.'
    : 'Your heart beats roughly 100,000 times a day, without you having to remember.'
})

questionButton.addEventListener('click', () => {
  question.textContent = questions[nextQuestion]
  nextQuestion = (nextQuestion + 1) % questions.length
})

wordCard.addEventListener('click', () => {
  const isRevealed = wordCard.getAttribute('aria-expanded') === 'true'
  wordCard.setAttribute('aria-expanded', String(!isRevealed))
  wordMeaning.hidden = isRevealed
  wordHint.hidden = !isRevealed
  nextWordButton.hidden = isRevealed
})

nextWordButton.addEventListener('click', () => {
  nextWord = (nextWord + 1) % words.length
  const word = words[nextWord]
  document.querySelector('#word-scene').textContent = word.scene
  document.querySelector('#word-keep-status').textContent = ''
  wordHanzi.textContent = word.hanzi
  wordPinyin.textContent = word.pinyin
  wordMeaning.textContent = word.meaning
  wordCard.setAttribute('aria-expanded', 'false')
  wordMeaning.hidden = true
  wordHint.hidden = false
  nextWordButton.hidden = true
  wordCard.focus()
})

ingredientButtons.forEach((button) => {
  button.addEventListener('click', () => {
    ingredientButtons.forEach((ingredient) => ingredient.setAttribute('aria-pressed', 'false'))
    button.setAttribute('aria-pressed', 'true')
    soupMessage.textContent = soupRecipes[button.dataset.ingredient]
    soupResult.hidden = false
  })
})

beautyButton.addEventListener('click', () => {
  beautyPrompt.textContent = beautyPrompts[nextBeautyPrompt]
  beautyButton.textContent = 'Find another little thing ↗'
  nextBeautyPrompt = (nextBeautyPrompt + 1) % beautyPrompts.length
})

gardenChoices.forEach((button) => {
  button.addEventListener('click', () => {
    gardenChoices.forEach((choice) => choice.setAttribute('aria-pressed', 'false'))
    button.setAttribute('aria-pressed', 'true')
    gardenResponse.textContent = gardenResponses[button.dataset.gardenChoice]
    gardenResponse.hidden = false
  })
})

curiosityButton.addEventListener('click', () => {
  curiosityFact.textContent = curiosityFacts[nextCuriosity]
  curiosityButton.textContent = 'Open another drawer ↗'
  nextCuriosity = (nextCuriosity + 1) % curiosityFacts.length
})

postButton.addEventListener('click', () => {
  postPrompt.textContent = postPrompts[nextPostPrompt]
  postButton.textContent = 'Stamp another note ↗'
  nextPostPrompt = (nextPostPrompt + 1) % postPrompts.length
})

courageButton.addEventListener('click', () => {
  couragePrompt.textContent = couragePrompts[nextCouragePrompt]
  courageButton.textContent = 'Turn it again ↗'
  nextCouragePrompt = (nextCouragePrompt + 1) % couragePrompts.length
})

arcadeButton.addEventListener('click', () => {
  arcadePrompt.textContent = arcadePrompts[nextArcadePrompt]
  arcadeButton.textContent = 'Insert another token ↗'
  nextArcadePrompt = (nextArcadePrompt + 1) % arcadePrompts.length
})

draftButton.addEventListener('click', () => {
  saveDraft()
  draftPrompt.textContent = draftPrompts[nextDraftPrompt]
  draftButton.textContent = 'Pull another prompt ↗'
  nextDraftPrompt = (nextDraftPrompt + 1) % draftPrompts.length
  restoreDraft()
  draftInput.focus({ preventScroll: true })
})

aquariumButton.addEventListener('click', () => {
  nextAquariumQuestion = (nextAquariumQuestion + 1) % aquariumQuestions.length
  aquariumQuestion.textContent = aquariumQuestions[nextAquariumQuestion]
  aquariumButton.textContent = 'Catch another question ↗'
})

// Each prompt keeps its own writing; changing rooms or prompts never clears it.
const draftInput = document.querySelector('#first-draft')
const draftStatus = document.querySelector('#draft-save-status')
const draftsKey = 'salene-world-first-drafts-v1'
let savedDrafts = {}
let saveTimer
try {
  const stored = JSON.parse(localStorage.getItem(draftsKey) || '{}')
  if (stored && typeof stored === 'object' && !Array.isArray(stored)) {
    savedDrafts = Object.fromEntries(Object.entries(stored).filter(([, value]) => typeof value === 'string'))
  }
} catch { /* An unreadable saved note must not prevent opening the world. */ }
function saveDraft() {
  clearTimeout(saveTimer)
  savedDrafts[draftPrompt.textContent] = draftInput.value
  try {
    localStorage.setItem(draftsKey, JSON.stringify(savedDrafts))
    draftStatus.textContent = 'Kept in this browser.'
  } catch {
    draftStatus.textContent = 'Browser storage unavailable. Copy your draft before leaving.'
  }
}
function restoreDraft() {
  draftInput.value = savedDrafts[draftPrompt.textContent] || ''
}
restoreDraft()
draftInput.addEventListener('input', () => {
  draftStatus.textContent = 'Saving…'
  clearTimeout(saveTimer)
  saveTimer = setTimeout(saveDraft, 500)
})
draftInput.addEventListener('blur', saveDraft)
window.addEventListener('pagehide', saveDraft)

// A real 3D globe: Three.js draws the sphere, while ordinary HTML buttons are
// projected onto its surface. This keeps the playful labels accessible and lets
// each place naturally move behind the horizon when you spin the world.
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
// Leave a visible ring of air around the sphere. At 4.7 it filled the entire
// WebGL square, which physically clipped its top and sides.
camera.position.set(0, 0, 5.2)

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputColorSpace = THREE.SRGBColorSpace
globeCanvas.append(renderer.domElement)

const texture = new THREE.TextureLoader().load(globeTextureUrl)
texture.colorSpace = THREE.SRGBColorSpace
texture.anisotropy = renderer.capabilities.getMaxAnisotropy()

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(1.55, 64, 64),
  new THREE.MeshStandardMaterial({ map: texture, roughness: 0.9, metalness: 0 }),
)
sphere.rotation.y = -0.28
scene.add(sphere)

scene.add(new THREE.HemisphereLight(0xfff2d2, 0x244d54, 1.25))
const sunlight = new THREE.DirectionalLight(0xfff1d2, 3.35)
sunlight.position.set(-3, 4, 5)
scene.add(sunlight)
const farSideGlow = new THREE.DirectionalLight(0x8fcbd0, 0.55)
farSideGlow.position.set(3, -2, -3)
scene.add(farSideGlow)

// A tiny Fresnel glow adds atmosphere only at the silhouette of the sphere.
// That makes the edge read as a real curved horizon rather than a cropped image.
const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(1.59, 64, 64),
  new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: `
      varying vec3 viewNormal;
      void main() {
        viewNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 viewNormal;
      void main() {
        float rim = pow(1.0 - max(viewNormal.z, 0.0), 2.7);
        gl_FragColor = vec4(0.58, 0.82, 0.84, rim * 0.34);
      }
    `,
  }),
)
atmosphere.scale.setScalar(1.025)
scene.add(atmosphere)

function pointFromLatLon(lat, lon, radius = 1.61) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  )
}

const markerPoints = Object.fromEntries(
  destinations.map((place) => [place.id, pointFromLatLon(place.lat, place.lon)]),
)

function updateMarkers() {
  mapButtons.forEach((button) => {
    const point = markerPoints[button.dataset.place].clone().applyEuler(sphere.rotation)
    // Keep every landmark fully inside the circle on its first view. The
    // farther side still disappears as the visitor turns the globe.
    const isVisible = point.z > 0.1
    const projected = point.project(camera)
    const depth = Math.max(0, Math.min(1, (point.z + 1.55) / 3.1))

    button.style.left = `${(projected.x * 0.5 + 0.5) * 100}%`
    button.style.top = `${(-projected.y * 0.5 + 0.5) * 100}%`
    button.style.opacity = isVisible ? String(0.45 + depth * 0.55) : '0'
    button.style.pointerEvents = isVisible ? 'auto' : 'none'
    button.toggleAttribute('hidden', !isVisible)
  })
}

let isTurning = false
let lastPointerX = 0
let lastPointerY = 0
let spinVelocityX = 0
let spinVelocityY = 0

renderer.domElement.addEventListener('pointerdown', (event) => {
  isTurning = true
  lastPointerX = event.clientX
  lastPointerY = event.clientY
  renderer.domElement.setPointerCapture(event.pointerId)
  globeCanvas.classList.add('is-turning')
})

renderer.domElement.addEventListener('pointermove', (event) => {
  if (!isTurning) return
  spinVelocityY = (event.clientX - lastPointerX) * 0.006
  spinVelocityX = (event.clientY - lastPointerY) * 0.004
  sphere.rotation.y += spinVelocityY
  sphere.rotation.x = Math.max(-0.58, Math.min(0.58, sphere.rotation.x + spinVelocityX))
  lastPointerX = event.clientX
  lastPointerY = event.clientY
})

function stopTurning(event) {
  isTurning = false
  if (reducedMotion.matches) spinVelocityX = spinVelocityY = 0
  if (renderer.domElement.hasPointerCapture(event.pointerId)) renderer.domElement.releasePointerCapture(event.pointerId)
  globeCanvas.classList.remove('is-turning')
}

renderer.domElement.addEventListener('pointerup', stopTurning)
renderer.domElement.addEventListener('pointercancel', stopTurning)

new ResizeObserver(([entry]) => {
  const { width, height } = entry.contentRect
  if (!width || !height) return
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height, false)
}).observe(globe)

function animate() {
  requestAnimationFrame(animate)
  if (!reducedMotion.matches && !isTurning && (Math.abs(spinVelocityX) > 0.0001 || Math.abs(spinVelocityY) > 0.0001)) {
    sphere.rotation.y += spinVelocityY
    sphere.rotation.x = Math.max(-0.58, Math.min(0.58, sphere.rotation.x + spinVelocityX))
    spinVelocityX *= 0.94
    spinVelocityY *= 0.94
  }
  updateMarkers()
  renderer.render(scene, camera)
}

animate()

function openPlace(id) {
  const place = places[id]
  if (!place) return
  rememberPlace(id)
  mapButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.place === id)))
  placePicker.value = id
  panelTitle.textContent = place.title
  document.querySelectorAll('.panel-game').forEach((game) => { game.hidden = true })
  const activeGame = document.getElementById(place.game || 'coming-soon')
  if (activeGame) activeGame.hidden = false
  if (place.comingSoon) document.querySelector('#coming-soon-text').textContent = place.comingSoon
  panelTitle.focus({ preventScroll: true })
  document.querySelector('#first-room').scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start' })
}
mapButtons.forEach((button) => button.addEventListener('click', () => openPlace(button.dataset.place)))
placePicker.addEventListener('change', () => openPlace(placePicker.value))
document.querySelector('.return-map').addEventListener('click', (event) => {
  event.preventDefault()
  placePicker.focus({ preventScroll: true })
  document.querySelector('#world-map').scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start' })
})
reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) spinVelocityX = spinVelocityY = 0
})

const journal = createJournal({ openWord(index) {
  if (index >= 5) { openPlace('language'); woods.place(index - 5); return }
  document.querySelector('#legacy-words').open = true
  nextWord = index
  const word = words[index]
  wordHanzi.textContent = word.hanzi
  wordPinyin.textContent = word.pinyin
  wordMeaning.textContent = word.meaning
  document.querySelector('#word-scene').textContent = word.scene
  wordCard.setAttribute('aria-expanded', 'true')
  wordMeaning.hidden = false
  wordHint.hidden = true
  nextWordButton.hidden = false
  openPlace('language')
}, openDraft(prompt) {
  saveDraft()
  draftPrompt.textContent = prompt
  restoreDraft()
  openPlace('drafts')
  draftInput.focus({ preventScroll: true })
}})
document.querySelector('#word-scene').textContent = words[0].scene
document.querySelector('#keep-word').addEventListener('click', () => {
  const word = words[nextWord]
  const kept = journal.keep({ id: 'word-' + nextWord, type: 'word', index: nextWord, title: word.hanzi + ' · ' + word.pinyin, text: word.meaning + '. ' + word.scene })
  document.querySelector('#word-keep-status').textContent = kept ? 'Kept in your travel journal.' : 'Kept for this visit. Browser storage is unavailable.'
})
const audioStatus = document.querySelector('#word-audio-status')
const hearWord = document.querySelector('#hear-word')
function mandarinVoice() {
  return window.speechSynthesis?.getVoices().find(voice => /^zh[-_](CN|SG|Hans)/i.test(voice.lang))
}
function updateVoiceAvailability() {
  hearWord.disabled = !mandarinVoice()
  audioStatus.textContent = hearWord.disabled ? 'Mandarin audio is unavailable in this browser; pinyin is shown above.' : ''
}
updateVoiceAvailability()
window.speechSynthesis?.addEventListener('voiceschanged', updateVoiceAvailability)
hearWord.addEventListener('click', () => {
  const voice = mandarinVoice()
  if (!voice) { updateVoiceAvailability(); return }
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(words[nextWord].hanzi)
  utterance.voice = voice
  utterance.lang = voice.lang
  utterance.rate = 0.8
  utterance.onerror = () => { audioStatus.textContent = 'Audio could not play. Pinyin is shown above.' }
  window.speechSynthesis.speak(utterance)
})
// Existing drafts remain in their original store; the journal is an index into them.
function syncJournalDrafts() { journal.drafts(savedDrafts) }
draftInput.addEventListener('blur', syncJournalDrafts)
draftButton.addEventListener('click', syncJournalDrafts)
syncJournalDrafts()

const woods = createWordWoods(document.querySelector('#woods-toy'), entry => journal.keep(entry))
