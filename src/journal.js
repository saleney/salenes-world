// A local collection. Render written content as text, never as HTML.
export function createJournal({ openWord, openDraft }) {
  const key = 'salene-world-journal-v1'
  const list = document.querySelector('#journal-entries')
  const status = document.querySelector('#journal-status')
  let entries = []
  let drafts = {}
  try {
    const stored = JSON.parse(localStorage.getItem(key) || '[]')
    if (Array.isArray(stored)) entries = stored.filter(item => item && item.type === 'word' && Number.isInteger(item.index) && item.index >= 0 && item.index < 8 && typeof item.title === 'string' && typeof item.text === 'string').slice(0, 8)
  } catch { status.textContent = 'Previous journal entries could not be read in this browser.' }
  function persist() {
    try { localStorage.setItem(key, JSON.stringify(entries)); return true }
    catch { status.textContent = 'Storage unavailable. New entries last only for this visit.'; return false }
  }
  function button(label, action) {
    const b = document.createElement('button')
    b.type = 'button'; b.textContent = label; b.addEventListener('click', action)
    return b
  }
  function render() {
    list.replaceChildren()
    const all = [...entries, ...Object.entries(drafts).filter(([, value]) => value.trim()).map(([prompt, text]) => ({ type: 'draft', title: prompt, text }))]
    if (!all.length) {
      const empty = document.createElement('li'); empty.textContent = 'Your collected words and drafts will appear here.'; list.append(empty)
    }
    all.forEach(entry => {
      const li = document.createElement('li')
      const title = document.createElement('h3'); title.textContent = entry.title
      const text = document.createElement('p'); text.textContent = entry.text
      li.append(title, text, button(entry.type === 'word' ? 'Revisit word' : 'Continue draft', () => entry.type === 'word' ? openWord(entry.index) : openDraft(entry.title)))
      if (entry.type === 'word') li.append(button('Remove word', () => {
        entries = entries.filter(item => item.index !== entry.index)
        persist(); render(); document.querySelector('#journal-title').focus()
      }))
      list.append(li)
    })
  }
  render()
  return {
    keep(entry) {
      if (!entries.some(item => item.index === entry.index)) entries.push(entry)
      const saved = persist(); render()
      return saved
    },
    drafts(value) { drafts = value; render() },
  }
}
