# Grief Garden — first informal playtest

Salene observed a first grader exploring the garden. This is one informal observation reported by Salene, not a broad usability study.

## Observation
The foreground soil attracted attention. Picking produce in the back patch and opening the bench recipe were not apparent. The visitor stayed with one recipe and did not discover that the card changed the ingredients. The separate word “Drag” was not understood as the way to move a packet on a phone. Salene wanted to inspect the basket quantities, preferred handwriting before transcription, and found “Let the vegetables grow back” ambiguous.

## Response
- Added quiet in-scene “Pick here” and “Richard’s recipes” signs.
- Exposed Morning / Afternoon 1 / Afternoon 2 choices beside the garden, synchronized with the recipe reader.
- Moved the basket left and made it a keyboard-accessible button opening item counts and a total, with an empty state.
- Enabled direct touch dragging on the entire seed packet and removed separate Drag controls. Tapping then choosing soil remains available. Packet gestures move ingredients; gaps and the shelf margin remain ordinary page-scrolling surfaces. Edge scrolling supports reaching soil while dragging. This tradeoff needs another real-phone playtest.
- Restored handwriting first on every device. Read text remains one action away.
- Renamed the refill action “Refill the picking patch”; feedback specifies that the basket and planted seeds are unchanged.
- Used Salene’s explicitly confirmed About wording, including friends, Third Street, a warehouse, Chinatown, and “best damn juice.”

## Learning
An interaction can work technically and still be invisible to a visitor. The foreground and the object itself were stronger invitations than distant artwork or a small textual handle. This revises the previous assumption that a separate drag handle was the best solution for this audience. The fantasy of fruit growing from soil stays: the observed joke is part of the playful internet garden, not a requirement for a realistic orchard.

## Verification and next observation
Browser checks at 320, 390, 430 and 1160px confirm the scene fits, recipe-choice buttons meet 44px height, and no separate drag controls remain. Direct packet drag into soil, basket quantities, exterior recipe switching and handwriting-first were exercised. Existing three unit tests pass. These browser pointer tests do not prove physical iPhone Safari touch behavior.
Next: repeat the informal phone playtest. Without coaching, can a visitor notice picking, switch ingredients, drag a packet directly, and open the basket? Observe scrolling around packets too. Treat these changes as hypotheses until that observation happens.


### Follow-up: accidental highlighting

The visitor reported that clicking sometimes highlighted content. Garden objects and button labels now disable native text selection and touch callouts; scene images cannot start native browser image dragging. The recipe transcription and About text remain selectable, and keyboard focus outlines are unchanged. This keeps browser selection gestures from competing with picking and planting. Physical iPhone confirmation remains a follow-up.
