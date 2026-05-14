# Pitch — The Pudding
## Visual essay: WHO Financing Networks, 2016–2025

---

## 1. Subject Line

**Pitch: Why more funding didn't make a global health network stronger**

---

## 2. Pitch (300 words)

There's a pattern that shows up in complex systems — bridges, ecosystems, supply chains — where adding more parts doesn't make the whole more stable. It can do the opposite. This essay is about one instance of that pattern, measured precisely and shown visually: the World Health Organization's financing network between 2016 and 2025.

The data come from WHO's own Programme Budget releases, reconstructed as a network of actors — governments, foundations, private donors, multilateral agencies — connected by financial flows across five two-year periods. Using standard network analysis, we tracked how the system's structure changed over time: how dense it was, how clustered, how fragmented, how modular.

The central visual is a **Binding Map** — a scatter plot where the X-axis measures cohesion (how well the network holds together) and the Y-axis measures structural stress signals (fragmentation, disconnection, distance). Each biennium becomes a point. The story is the trajectory.

What the trajectory shows is this: in 2020–2021, the network expanded sharply — 60% more actors, 36% more financial links. And structural cohesion collapsed to its lowest observed value. Density halved. Clustering fell 76%. The number of disconnected components jumped from 123 to 546. More ingredients entered the mixture. The mixture did not bind.

Post-pandemic recovery is real but incomplete. The current equilibrium — provisional data through Q1 2025 — sits at a structurally different position than where the system started. This matters now because in 2025, the WHO funding architecture is under acute pressure: geopolitical withdrawal, donor concentration risk, and the structural fragility the data already describe.

**What we offer:** original data, a peer-reviewed publication, a reproducible repository, and a working HTML scrollytelling prototype. The visual concept is novel, the dataset is rare, and the question — *why does growth sometimes erode resilience?* — is one readers will recognize from their own experience of systems failing.

A few honest limits: five observations is a small N. The indices are heuristic composites, not formal early-warning indicators. We make no predictions and claim no causal proof. The story is descriptive — and the description is striking enough.

---

## 3. Five Possible Titles

1. **More Parts, Less Whole** — *How a global health network grew larger and became more fragile*
2. **The Binding Problem** — *What a map of cohesion and stress reveals about nine years of WHO financing*
3. **Why the Mixture Didn't Hold** — *A visual history of structural fragility in global health funding*
4. **Growth Without Texture** — *The WHO financing network expanded in a crisis. It didn't bind.*
5. **Where Resilience Goes** — *Tracking the structural health of the world's largest health funder, biennium by biennium*

---

## 4. Three Hook Sentences

1. *In 2020, the WHO financing network gained 375 new actors and lost half its structural density — more money, more donors, less coherence.*

2. *There's a word in cooking for when a sauce breaks: it separates, the emulsion fails, the texture is gone. Something similar happens to networks. This is what it looks like when it happens to global health funding.*

3. *The system didn't collapse. It did something more interesting: it grew in all directions while quietly losing the property that makes networks resilient — the capacity to hold together.*

---

## 5. Assets to Attach

**Immediately available:**
- [ ] `binding_map_prototype.html` — working scrollytelling prototype (open in any browser, no server required; self-contained HTML/CSS/JS/D3)
- [ ] `binding_map_analysis.md` — full methodological dossier: index formulas, narrative scenes, public and academic texts, caution box
- [ ] `binding_map.R` — reproducible ggplot2 static prototype (run in R with ggplot2 + ggrepel)
- [ ] `data/raw/Results.xlsx` — source metrics table (Table 1 from the published paper)
- [ ] Link to peer-reviewed publication: *Vol. XV, Santos Dominguez et al.* (include DOI or journal link)
- [ ] Link to GitHub/OSF repository with full replication materials (nodes, edges, processed metrics, R scripts)

**To prepare before sending:**
- [ ] Static `.png` render of the Binding Map (run `binding_map.R` → exports `binding_map_prototype.png`)
- [ ] One-paragraph author bio with institutional affiliation and relevant publication record
- [ ] Optional: GIF or screen recording of the prototype's scroll behavior (15–20 seconds)
- [ ] Optional: A second visual — the raw time-series of density and WCC — to show the story without the composite index first

---

*Note on tone for submission: The Pudding editorial team is skeptical of academic framing. Lead with the visual concept and the finding, not the methodology. The 300-word pitch above is designed to be sent as-is in an email body. Attach the HTML prototype and the static PNG. Hold the methodological dossier for a follow-up if they express interest.*
