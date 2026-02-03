## Entry 3: Progressive Awakening System

### Strategic Shift
Moving from a static website to a "Progressive Awakening System" (Gradual revelation) to reduce user resistance.

### Gamification Logic
Implementing a leveling system (Lv 0 to Lv 3) where deeper content is unlocked by user interaction.
  * **Lv 0 (AWAKENING)**: `index.html` only. Monitor and Timeline are locked. Unlocked by completing the "If It Were You" Q&A.
  * **Lv 1 (AWARENESS)**: `monitor.html` unlocked. Timeline still locked. Unlocked by 3 interactions (candles, filters, etc.).
  * **Lv 2 (OBSERVER)**: `timeline.html` unlocked. Full access to prophecy timeline.

### Technical Implementation
  * Creation of `progression.js` to manage state (localStorage), level logic, and UI locking/unlocking.
  * Integration points:
    * `index.html`: Trigger level up on Q&A completion.
    * `monitor.html`: Trigger interaction count on candle lighting/filtering.
    * `timeline.html`: Controlled access based on level.

### Goal
To transform the user experience from "information overload" to a "journey of discovery," making users feel they earned the knowledge, thus reducing psychological defense mechanisms.
