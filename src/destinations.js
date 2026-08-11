import aquariumArt from './assets/landmarks/wild-question-aquarium.png'
import beautyArt from './assets/landmarks/beauty-exchange.png'
import bodyArt from './assets/landmarks/body-cabinet.png'
import courageArt from './assets/landmarks/courage-observatory.png'
import curiosityArt from './assets/landmarks/curiosity-conservatory.png'
import draftsArt from './assets/landmarks/bad-first-drafts.png'
import griefArt from './assets/landmarks/grief-garden.png'
import ideasArt from './assets/landmarks/mount-maybe.png'
import languageArt from './assets/landmarks/word-woods.png'
import postArt from './assets/landmarks/little-post-office.png'
import questionsArt from './assets/landmarks/question-forest.png'
import soupArt from './assets/landmarks/warmth-workshop.png'
import visitorArt from './assets/landmarks/visitor-center.png'
import arcadeArt from './assets/landmarks/friendship-arcade.png'

// This is Salene's World destination database.
// To add a place, copy one entry and give it a unique id, globe coordinates,
// landmark image, and either an existing game id or a comingSoon message.
// `game` values match the ids of the activity panels in index.html.
export const destinations = [
  { id: 'heart', kicker: 'YOU FOUND A TINY WONDER', title: 'The Body Cabinet', copy: 'Your body is busy doing astonishing things, even while you are reading this sentence.', game: 'heart-game', lat: 5, lon: -166, art: bodyArt, tag: 'tiny wonders' },
  { id: 'language', kicker: 'A NEW WORD IS WAGGING ITS TAIL', title: 'Word Woods', copy: 'Words are little portals. Tap one to meet it, then grow another whenever you are curious.', game: 'word-game', lat: 28, lon: -138, art: languageArt, tag: 'language games' },
  { id: 'arcade', kicker: 'THE TWO-PLAYER MACHINE IS GLOWING', title: 'The Friendship Arcade', copy: 'A tiny arcade for practicing the kind of play that says: I want to be in this with you.', game: 'arcade-game', lat: -14, lon: -110, art: arcadeArt },
  { id: 'curiosity', kicker: 'THE GLASS IS FOGGING UP WITH QUESTIONS', title: 'The Curiosity Conservatory', copy: 'A greenhouse for following the little “wait, why?” moments that make a world larger.', game: 'curiosity-game', lat: 7, lon: -82, art: curiosityArt },
  { id: 'grief', kicker: 'THE GARDEN MAKES ROOM FOR EVERY SEASON', title: 'The Grief Garden', copy: 'A quiet place to remember that grief can deepen compassion without becoming the whole story.', game: 'grief-game', lat: -7, lon: -54, art: griefArt, tag: 'sit for a while' },
  { id: 'aquarium', kicker: 'A QUESTION JUST WIGGLED PAST YOUR ANKLE', title: 'The Wild Question Aquarium', copy: 'An aquarium for questions with no obvious practical purpose—and therefore plenty of room to surprise you.', game: 'aquarium-game', lat: -27, lon: -26, art: aquariumArt },
  { id: 'courage', kicker: 'THE STARS ARE NOT PROMISING IT WILL BE EASY', title: 'The Courage Observatory', copy: 'A lookout for trusting your convictions, doing things scared, and taking the next small brave step.', game: 'courage-game', lat: 35, lon: 2, art: courageArt },
  { id: 'ideas', kicker: 'THE AIR IS THINNER UP HERE', title: 'Mount Maybe', copy: 'Soon: a place for doing things scared, trusting your strange conviction, and letting an idea become bigger than you planned.', comingSoon: 'The trail to Mount Maybe is currently being made by someone walking it.', lat: -5, lon: 30, art: ideasArt, tag: 'brave little ideas' },
  { id: 'drafts', kicker: 'SOMETHING WONDERFULLY IMPERFECT IS HAPPENING', title: 'The Hall of Bad First Drafts', copy: 'A place to make the first try, write the clumsy line, and let a beginning be gloriously unfinished.', game: 'drafts-game', lat: -20, lon: 58, art: draftsArt },
  { id: 'post', kicker: 'A LETTER JUST ARRIVED FOR SOMEONE YOU LOVE', title: 'The Little Post Office', copy: 'Connection does not always require a grand gesture. Sometimes it is one true sentence, sent gently.', game: 'post-game', lat: 8, lon: 86, art: postArt },
  { id: 'beauty', kicker: 'A SMALL LOVELY THING CAUGHT THE LIGHT', title: 'The Beauty Exchange', copy: 'Beauty is not extra. It is a way of staying awake to life—and a gift when we pass it along.', game: 'beauty-game', lat: -22, lon: 114, art: beautyArt, tag: 'something lovely, for you' },
  { id: 'soup', kicker: 'A POT IS GENTLY BUBBLING', title: 'The Warmth Workshop', copy: 'A place for small acts of connection. Pick an ingredient and see what it might become.', game: 'soup-game', lat: -17, lon: 142, art: soupArt, tag: 'something warm is on' },
  { id: 'questions', kicker: 'YOU HEARD A RUSTLE IN THE LEAVES', title: 'The Question Forest', copy: 'Questions do not need to be useful to be worth following. This forest has no exit signs on purpose.', game: 'question-game', lat: -9, lon: 170, art: questionsArt, tag: 'get delightfully lost' },
  { id: 'visitor', kicker: 'THE DOOR IS OPEN. THE LIGHT IS ON.', title: 'The Visitor Center', copy: 'A small note about the person who built this world, and the things she is trying to practice inside it.', game: 'visitor-game', lat: 43, lon: 120, art: visitorArt },
]

export const places = Object.fromEntries(destinations.map(({ id, ...place }) => [id, place]))
