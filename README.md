# Som Satwik Deo  Portfolio

A Persona 5 menu-inspired portfolio, structured as Model–View–Controller.

**Som Satwik Deo** · Developer, Builder, Cybersecurity Enthusiast  
[github.com/SomSatwik](https://github.com/SomSatwik)

## Structure

```
├── index.html            View skeleton — markup only, no logic or styles
├── css/
│   └── style.css         All styling (theme colors in :root at the top)
├── js/
│   ├── model.js          DATA — projects, skills, GitHub fetch, app state
│   ├── view.js           DOM — rendering, ransom lettering, wipe, cursor, sound
│   ├── controller.js     EVENTS — keyboard/mouse input, navigation logic
│   └── terminal.js       TERMINAL — frontend-only easter egg terminal
└── assets/
    ├── sfx/select.mp3    Menu sound (plays on select/confirm)
    ├── cursors/          Animated cursor sprite strips (30 frames each)
    ├── menus/            per-screen backgrounds: home.jpg, skills.jpg, about.jpg,
    │                     contact.jpg (included)
    ├── cv/               Downloadable resume (linked from About + Contact)
    ├── me.png            Profile photo for the About polaroid and hero art
    └── projects/         Card thumbnails (auto-matched to project names)
```

Missing images hide themselves  no broken icons.

## Editing content

Everything you'd normally want to change lives in **js/model.js**:
featured projects, skill bars, thumbnail overrides, GitHub username.  
Bio and contact links are plain HTML in **index.html**.  
Colors are CSS variables at the top of **css/style.css**.

## Run locally

```
python3 -m http.server
```
then open http://localhost:8000 — opening index.html directly (file://)
blocks the audio fetch and GitHub API in most browsers.

## Controls

↑ / ↓ select · Enter confirm · Esc back · click the name to go home · **T** to open terminal

## Terminal Commands

Open the easter egg terminal with **T** or the `>_` button:

```
help      — list commands
about     — who is Som Satwik?
skills    — tech stack
projects  — featured projects
github    — open GitHub profile
contact   — contact info
resume    — download resume
status    — system status
clear     — clear output
exit      — close terminal
```
