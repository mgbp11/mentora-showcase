# Mentora — web prototype

A clickable web port of the Mentora native SwiftUI iOS app, plus a gallery of
screenshots from the real iOS build.

- `index.html` — the interactive prototype. Tap through it like the app.
- `gallery.html` — screenshots captured from the app running on an iPhone 17 Pro
  simulator (iOS 26.5).

Plain HTML, CSS and JavaScript. No build step, no dependencies.

The design tokens, copy and flows are ported from the Swift source: colours and
the four-step radius scale from `Design/Theme.swift`, all tutor dialogue from
`Model/Library.swift`, and the state machine from `Model/AppState.swift`.

## What is interactive

Six-step onboarding · four age variants (2-7, 8-17, 18-34, 35+) · five learner
states · light and dark · Hebrew RTL · the full six-beat lesson with answers,
hints and "I don't understand" · tutor screen with quick actions and typing ·
voice mode · course-from-materials · homework marking · goals and roadmaps ·
progress · achievements · parent dashboard.

Use the controls panel (the gear, or the side rail on a wide screen) to switch
age, state, theme and layout direction at any point.
