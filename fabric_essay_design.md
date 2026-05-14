# The Fabric of Global Health Funding — Design Document
## Visual Data Essay: WHO Financing Networks, 2016–2025

*Redesign from Binding Map (scatterplot summary) to full network visual essay*

---

## OUTPUT A — Narrative Outline: 9 Scenes

The organizing metaphor is **fabric**: nodes are knots, edges are threads, density is tightness, clustering is reinforced patches, modularity is separate patches, weakly connected components are loose pieces drifting apart. The story is told through the network itself — not through a scatterplot proxy.

---

**Scene 1 — What is a thread?**
*Introduce the unit: one donor, one WHO programme, one flow*

**Scene 2 — The fabric takes shape**
*Build the network: more donors, more programmes, more flows — the 2016–17 baseline*

**Scene 3 — 2016–17: a relatively integrated fabric**
*Full baseline network view with metric strip*

**Scene 4 — 2018–19: early fraying**
*Fragmentation into more communities; rise in modularity and weakly connected components*

**Scene 5 — 2020–21: expansion without binding**
*COVID peak: more knots, more threads — but density collapses, clustering falls, WCC explodes*

**Scene 6 — 2022–25: partial recovery, different texture**
*Network reorganizes; density and degree recover; clustering and WCC do not return to baseline*

**Scene 7 — 2025: the US thread thins**
*Remove/fade US-related flows; show exposed programmes and high-dependency nodes*

**Scene 8 — Middle powers: possible new stitches**
*Highlight top non-US donors by volume and betweenness; frame as potential bridging opportunity — not a confirmed role*

**Scene 9 — The trajectory: Binding Map as synthesis**
*Show the corrected Binding Map at the end as a compact summary — where each biennium sits in cohesion/stress space*

---

## OUTPUT B — Scene Breakdown

---

### Scene 1 — What is a thread?

**Key message:** A single financing relationship — one donor sending funds to one WHO programme — is the elementary unit of the fabric.

**Visual:** One node (e.g., Germany) connected by a single edge to one recipient node (e.g., WHO African Regional Office). Edge thickness = funding amount. Label both nodes.

**Data used:** Any single edge from `edges_q4_2016-2017.csv`. Suggested: Germany → Africa - Regional Office.

**Metric shown:** None — this is the explanatory frame.

**Annotation:** *"Each thread is a financing relationship. Thickness = funding volume. When many actors fund many programmes, a fabric forms. Whether it holds together is the question."*

---

### Scene 2 — The fabric takes shape

**Key message:** The WHO financing network is a bipartite structure — funders on one side, WHO programmes and recipient states on the other. The fabric is visible once you add enough threads.

**Visual:** Progressive animation — add 5, then 15, then 40 donors connecting to WHO recipients. Show the fabric forming. Color-code by donor category (Member States, Foundations, UN agencies, NGOs, Private Sector).

**Data used:** Top 40 donors by weight in 2016–17 (`edges_q4_2016-2017.csv` + `nodes_q4_2016-2017.csv`).

**Metric shown:** A minimal legend: node color = donor type. Edge opacity = relative weight.

**Annotation:** *"636 actors. 3,477 financing relationships. $5 billion in flows. This is what the fabric looked like in 2016."*

---

### Scene 3 — 2016–17: a relatively integrated fabric

**Key message:** The baseline network has relatively high cohesion: low modularity, low weakly connected components, moderate density.

**Visual:** Full simplified network (top 40 donors + WHO recipients). Force-directed layout. US nodes highlighted with distinctive color. Metric strip visible: Nodes, Edges, Density, Clustering, WCC, Modularity.

**Data used:** `nodes_q4_2016-2017.csv`, `edges_q4_2016-2017.csv`, `metrics_2016-2017.csv` (betweenness for node size). `Results.xlsx` for metric strip.

**Metrics shown:**
- Nodes: 636 · Edges: 3,477
- Density: 0.009 · Clustering: 0.043
- Weakly connected components: **2**
- Modularity: 0.294

**Annotation:** *"Two weakly connected components — essentially one integrated structure. Modularity at its lowest observed value. The fabric holds."*

---

### Scene 4 — 2018–19: early fraying

**Key message:** Before any major external shock, the network shows signs of reduced integration — WCC rises from 2 to 123, modularity jumps 59%.

**Visual:** Transition to 2018–19 network. Communities become more visible (color by modularity class). Isolated nodes/components appear at the periphery.

**Data used:** `nodes_q4_2018-2019.csv`, `edges_q4_2018-2019.csv`, `metrics_2018-2019.csv`.

**Metrics shown:**
- WCC: 2 → **123**
- Modularity: 0.294 → **0.466** (+59%)
- Clustering: 0.050 (still near baseline, though density fell)

**Annotation:** *"Before COVID. The number of disconnected components grows from 2 to 123. The fabric is still largely intact, but the patches are becoming more self-contained — each funding its own set of programmes without crossing over."*

**Theoretical note (academic layer):** This pattern is *suggestive of* declining cross-community integration. In Scheffer's vocabulary, it is *compatible with* reduced systemic recovery capacity — but five aggregate observations are insufficient for formal early-warning signal estimation.

---

### Scene 5 — 2020–21: expansion without binding

**Key message:** The COVID emergency brings more actors and more flows, but structural cohesion collapses. The fabric expands and thins simultaneously.

**Visual:** Animate the addition of new nodes (show "new dots appearing"), then reveal the metric strip decline. Communities fragment visually — show WCC as separate floating clusters. Optional: animate the density collapse as threads becoming thinner while the number of dots grows.

**Data used:** `nodes_q4_2020-2021.csv`, `edges_q4_2020-2021.csv`, `metrics_2020-2021.csv`.

**Metrics shown:**
- Nodes: 624 → **999** (+60%)
- Edges: 3,277 → **4,444** (+36%)
- Density: 0.008 → **0.004** (−50%)
- Clustering: 0.050 → **0.012** (−76%)
- WCC: 123 → **546** (+344%)

**Annotation (two beats):**
1. *"More knots enter the fabric. More threads are drawn."*
2. *"And yet: density halves. Clustering collapses. 546 weakly connected components. The fabric did not stretch — it came apart into pieces."*

**Caution annotation:** *"This is descriptive. The expansion is consistent with emergency financing mobilization. Whether this structural pattern reflects reduced systemic resilience in the Scheffer sense cannot be determined from five aggregate observations."*

---

### Scene 6 — 2022–25: partial recovery, different texture

**Key message:** Post-pandemic, the network reorganizes. Some metrics recover. Clustering and WCC do not return to 2016–17 levels. The fabric has a new texture.

**Visual:** Show 2022–23 and 2024–25 as two network states. Highlight: density and degree recovering (thicker, denser threads), but clustering still low (fewer triangles) and WCC still high (still many loose pieces).

**Data used:** `nodes_q4_2022-2023.csv`, `edges_q4_2022-2023.csv`, `nodes_q1_2024-2025.csv`, `edges_q1_2024-2025.csv`.

**Metrics shown:**
- 2022–23 avg. degree: **7.69** (maximum observed — more threads per knot)
- Clustering: 0.014 (vs. 0.043 in 2016–17)
- WCC: 121 (vs. 2 in 2016–17)
- 2024–25: provisional (Q1 2025 only)

**Annotation:** *"The fabric has partially re-stitched. But it does not look the same. More threads per knot, yet fewer reinforced patches. The loose pieces at the edges have not been pulled back in. This is a different equilibrium — not a restored one."*

---

### Scene 7 — 2025: the US thread thins

**Key message:** US entities contributed ~11–13% of total flows in recent biennia, connected across multiple communities. Their reduction or withdrawal removes threads across the fabric — not uniformly, but unevenly.

**Visual:** Fade/grey out US-related edges. Show which nodes become more isolated (those with ≥50% US dependency). Highlight: Iraq (US share 51%, US flow $10.2M), Poland (74%, $5.2M), Czechia (73%, $5.1M), Slovakia (58%, $1.3M). Show the remaining fabric — and which areas remain well-connected.

**Data used:** `nodes_q1_2024-2025.csv`, `edges_q1_2024-2025.csv`. US node IDs confirmed across all biennia (USAID, CDC, NIH, DTRA, USFDA, USDA, USDOS, USEPA, CDC Foundation).

**Metric shown:**
- US total flow 2024–25: **$525M** (10.9% of positive flows)
- US edges: **1,530** of 12,092 total
- Nodes losing ≥50% of their flows: **4 identified** (Poland, Czechia, Slovakia, Iraq)
- Nodes losing ALL connections: **0** (no node is exclusively US-funded in this dataset)

**Annotation:** *"No single programme collapses if US funding is removed — at least not in this data. But the fabric becomes sparser in specific areas. Some national programmes lose their primary thread. The question is not catastrophic failure but structural thinning — a fabric with fewer reinforcing connections in geographically and thematically specific zones."*

**Caution:** *"This scenario is based on 2024–25 Q1 data only (provisional). It describes financial structure, not implementation capacity. It does not predict which programmes will be disrupted — only which nodes were most structurally dependent on US flows."*

---

### Scene 8 — Middle powers: possible new stitches

**Key message:** Several non-US donors have significant volume and spread across multiple communities. They are potential — not confirmed — bridging actors if US flows contract.

**Visual:** Highlight top non-US, non-Foundation donors by volume (2022–23) and by betweenness centrality (from `metrics_2022-2023.csv`). Show their edges in a distinct color. Annotate: Germany, EU institutions (DG-INTPA, ECHO), Canada, UN CERF, India, China.

**Data used:** `metrics_2022-2023.csv` (betweenesscentrality, modularity_class), `edges_q4_2022-2023.csv` (weighted flows).

**Key actors by volume (2022–23, non-US, non-Gates):**
- Germany: $335M
- EU DG-INTPA: $167M
- Rotary International: $153M
- EU ECHO: $149M
- Canada (DFATD): $149M
- UN CERF: $140M
- India: $66M
- France (MEAE): $63M

**Betweenness centrality (non-US, non-recipient, 2022–23 top 5):**
- India: 0.0003
- China: 0.0002
- Nigeria: 0.0002
- Russian Federation: 0.0002
- Malaysia: 0.0002

**Critical caveat:** Betweenness values are all below 0.001 — very low absolute values indicating no single non-US donor has dominant brokerage position. The "middle power opportunity" is a structural gap, not a confirmed role. Any claim that these actors *are* bridges must be conditioned on whether they *increase* cross-community funding — something the current data shows partially but not definitively.

**Annotation:** *"These actors are not identified here as bridges because they have proven they can bridge — but because the data shows they fund across multiple communities and have volume. Whether they can or will expand that role is a political and institutional question the network data alone cannot answer."*

---

### Scene 9 — The Binding Map as synthesis

**Key message:** The full trajectory can be summarized in one compact visual — a map of where each biennium sits in cohesion/stress space. This is the epilogue, not the story.

**Visual:** The corrected Binding Map (bottom-right = Integrated/Adaptive; top-left = Fragmented/Brittle). Five points with temporal arrows. Annotation of trajectory: 2016–17 → 2018–19 → 2020–21 → 2022–23 → 2024–25.

**Data used:** `Results.xlsx`, Table 1. Composite indices as computed previously.

**Annotation:** *"A single map cannot show what the network showed. But it shows where the system has been, and where it has not returned to."*

---

## OUTPUT C — Visual Grammar

### Node colors (by donor category)
| Category | Color | Hex |
|---|---|---|
| Member States – Voluntary | Blue | `#2196F3` |
| Philanthropic Foundations | Purple | `#9C27B0` |
| Partnerships (GAVI, etc.) | Pink | `#E91E63` |
| UN Organizations | Teal | `#00ACC1` |
| NGOs | Green | `#4CAF50` |
| Private Sector | Amber | `#FF9800` |
| Development Banks & Funds | Brown | `#795548` |
| Intergovernmental Orgs | Blue-grey | `#607D8B` |
| Assessed Contributions | Red | `#F44336` |
| WHO States (recipients) | Light grey | `#BDBDBD` |
| WHO Regional Offices | Medium grey | `#9E9E9E` |

**Special overlays:**
- US nodes: red ring/stroke (`#B71C1C`, stroke-width 3px), visible regardless of category color
- Middle-power candidates: gold ring (`#F9A825`)
- US-dependent nodes (≥50% US flows): dashed orange ring

### Node size logic
`r = 5 + 18 * (log(total_weight + 1) - log_min) / (log_max - log_min)`

Minimum radius 5px (tiny donors), maximum 23px (top donors like US, Gates, Germany). Log scale essential given 3+ orders of magnitude range in funding volumes. For recipient nodes: size by in-weight (total received).

### Edge weight logic
`opacity = 0.15 + 0.55 * (log(weight + 1) - log_min) / (log_max - log_min)`
`stroke-width = 0.5 + 3 * (log(weight + 1) - log_min) / (log_max - log_min)`

Thin, semi-transparent for small flows; thick, opaque for major flows. Never fully opaque (0.7 max) to preserve visibility of node layer.

**Special edges:**
- US-origin edges: `#EF9A9A` (light red) in US-removal scenario
- Middle-power candidate edges: `#FFF176` (light gold) in Scene 8

### Community representation
Modularity classes from `metrics_*.csv` (`modularity_class` column). Do not color nodes by community in the main network view — too many classes, too much color noise. Instead:
- Use community color ONLY in the dedicated "fraying" scene (Scene 4)
- Show at most 5–6 largest communities with distinct background halos

### Tooltip content
```
Actor: [Label]
Type: [Category]
Total flow: $[out_w/1e6]M (outflow) / $[in_w/1e6]M (inflow)
Betweenness: [btw]
Community: [mod_cls]
US-related: [yes/no]
```

### Avoiding visual clutter
- **Filter aggressively:** Show top 40 donors by out-weight per biennium (not all 600+)
- **Aggregate recipients:** Collapse WHO state recipients into regional groups for scenes 1–6; show individual states only in US-removal scene (Scene 7)
- **No labels by default:** Label only on hover (tooltip) or for the top 10 nodes by weight
- **Persistent static labels** only for: Assessed Contributions, Bill & Melinda Gates Foundation, USAID, Germany, WHO Regional Offices
- **Edge culling:** Only show edges above a minimum threshold (e.g., $1M in each biennium) to prevent hairball effect
- **Opacity fade:** Non-highlighted nodes/edges fade to 10% opacity when a scene focuses on specific actors

---

## OUTPUT D — Data Audit

### Available variables

| Variable | Available | Source | Notes |
|---|---|---|---|
| Actor name/label | ✅ | `nodes_*.csv` — `Label` column | Full names |
| Actor type/category | ✅ | `nodes_*.csv` — `Category` column | 15+ categories |
| Donor → programme edge | ✅ | `edges_*.csv` — Source, Target, Weight | Bipartite directed |
| Funding amount (weight) | ✅ | `edges_*.csv` — `Weight` | USD; some negative values (returns/corrections) |
| Biennium | ✅ | Encoded in filename | Not a column within files |
| Country (recipient) | ✅ | `nodes_*.csv` — Recep_State nodes | States labeled directly |
| WHO programme name | ⚠️ | Only 1 `Recep_program` node present per biennium | Recipients are mostly states + regional offices, not named programmes |
| Year within biennium | ❌ | Not available in these files | Data is aggregated per biennium |
| Betweenness centrality | ✅ | `metrics_*.csv` — `betweenesscentrality` | Node-level |
| Modularity class | ✅ | `metrics_*.csv` — `modularity_class` | Gephi walktrap |
| Clustering coefficient | ✅ | `metrics_*.csv` — `clustering` | Node-level |
| US node identification | ✅ | Via label keyword matching | USAID, CDC, NIH, DTRA, USFDA, USDA, USDOS, USEPA, CDC Foundation — confirmed across all biennia |

### Critical data quality issue: recipient inconsistency

The number of `Recep_` prefix nodes varies dramatically across biennia:

| Biennium | Recep_State | Recep_Regional Office | Recep_program |
|---|---|---|---|
| 2016–17 | 75 | 6 | 1 |
| 2018–19 | **0** | 5 | 1 |
| 2020–21 | **0** | 0 | 1 |
| 2022–23 | 101 | 6 | 1 |
| 2024–25 | 116 | 6 | 1 |

**Interpretation:** In 2018–19 and 2020–21, recipient states are likely present in the network but without the `Recep_` category prefix — possibly classified as `Member States - Voluntary Specified` or other categories in those Gephi exports. This is a formatting inconsistency in the raw data, not an absence of flows to states.

**Consequence for visualization:** Cross-biennium network comparison must acknowledge this. The simplified network for 2018–19 and 2020–21 will appear to have fewer recipient nodes — which misrepresents the actual structure. **Recommended handling:** Display a note in the prototype; use metric strip (density, WCC, modularity from `Results.xlsx`) as the authoritative structural signal rather than visual node count.

### US node identification

Confirmed entities across biennia (by keyword matching): USAID, CDC, NIH, DTRA, USFDA, USDA, USDOS, USEPA, CDC Foundation. These appear consistently in all five biennia. Reliable for US-removal scenario.

**US flow summary:**
- 2016–17: $616M (12.4% of total)
- 2018–19: $82M (2.1%) — significant drop, likely reflects data formatting/categorization
- 2020–21: $326M (6.1%)
- 2022–23: $780M (13.1%)
- 2024–25: $525M (10.9%, Q1 provisional)

---

## OUTPUT E — Middle-Power Analysis Plan

### Metrics available
- **Weighted out-degree** (total flows): from `edges_*.csv` aggregated by Source
- **Betweenness centrality**: from `metrics_*.csv`, column `betweenesscentrality`
- **Modularity class**: from `metrics_*.csv`, column `modularity_class`
- **PageRank/eigenvector**: **NOT pre-computed** — would require re-running igraph on raw data
- **Participation coefficient**: **NOT available** — would require inter-community edge counting
- **Before/after US removal**: computable from raw edges (remove US Source IDs, recompute connectivity)

### Criteria for calling an actor a "bridge"

An actor qualifies as a **potential bridging node** only if it meets at least two of:
1. **Volume criterion**: Top 15 non-US, non-assessed donors by out-weight in most recent biennium
2. **Betweenness criterion**: Betweenness centrality above the 90th percentile for non-recipient nodes
3. **Cross-community criterion**: Edges to nodes in at least 3 distinct modularity classes
4. **Structural gap criterion**: Funds programmes/areas that become disconnected in US-removal scenario

### Current data findings

By volume (2022–23), the top candidates outside US and major foundations are: Germany, EU DG-INTPA, Canada, Rotary International, EU ECHO, UN CERF, India, France.

By betweenness (2022–23), the top non-US non-recipient actors are: India (0.0003), China (0.0002), Nigeria (0.0002), Russian Federation (0.0002), Malaysia (0.0002). **All values are below 0.001 — extremely low in absolute terms.** No actor has high brokerage position in structural terms.

### Warning

The current dataset does **not** support a strong claim that any specific actor *is* a bridge. The betweenness values are too low to indicate structural brokerage. The volume-based candidates (Germany, EU, Canada) are large funders, but whether they fund *across* communities in a bridging way requires the participation coefficient, which is not pre-computed.

**Safe framing:** "These actors have the volume and geographic spread that *could* position them as structural bridges — but demonstrating that they currently bridge separate communities requires computing the participation coefficient from the raw edge/community data."

**What can be claimed from available data:** Germany, EU institutions, and Canada each contribute large flows across multiple WHO programme areas and regional offices. If US flows contract, these actors have the scale to partially fill the resulting gaps. Whether they will do so, and whether their funding patterns overlap with US-funded areas, requires further analysis.

---

## OUTPUT F — Technical Recommendation

### Framework comparison

| Framework | Strengths | Weaknesses | Verdict |
|---|---|---|---|
| **D3.js v7** | Full control, no dependencies, excellent for custom layouts, good for scroll transitions, wide documentation | Requires writing force simulation from scratch; steep learning curve; verbose | **Recommended** — already in the Binding Map prototype; extends naturally |
| **Sigma.js + Graphology** | Optimized for large graphs (1000+ nodes), WebGL rendering, built-in layout algorithms | Less flexible for custom scroll storytelling; harder to integrate with text narrative | Useful if the full 636-node graph is needed; overkill for top-40 simplified version |
| **Observable + Plot** | Elegant reactive charts, easy data binding | Less suitable for force-directed network layouts; requires Observable notebook environment | Better for the metric strip component than the network |
| **Cytoscape.js** | Network-specific, good for biological/social network visualizations | Less elegant visual output; harder to style for publication quality | Alternative to Sigma if full graph is needed |
| **Svelte + D3** | Reactive, clean component model | Requires build step; too complex for a first prototype | Good for a production version, not a prototype |

### Recommended stack for prototype

- **D3.js v7** (CDN) for force layout + Binding Map
- **Pure HTML/CSS/JS** (self-contained file, no build step, opens in any browser)
- **IntersectionObserver** for scroll-triggered transitions
- **Top 40 donors + simplified recipients** per biennium (manageable node count for force simulation)
- **Embedded JSON data** (from the pre-generated `network_data.js`)

### What is realistic for a first prototype

A working first prototype can include:
1. ✅ Force-directed network for 2016–17 baseline with metric strip
2. ✅ Scroll-triggered biennium transitions (fade + re-simulate)
3. ✅ Metric strip (6 metrics, sparkline bars)
4. ✅ US node highlighting + US-removal fade
5. ✅ Node tooltips with actor name, type, flow volume
6. ✅ Final Binding Map as synthesis
7. ⚠️ Community halos (complex — use simplified version with color-coded node rings)
8. ❌ Full 600-node graph (too slow in D3 force; use Sigma.js for that)
9. ❌ Animated node entry/exit between biennia (requires careful transition design; leave for v2)

---

## OUTPUT G — Minimal Prototype Plan

### Architecture

```
who_fabric_essay.html (self-contained)
├── Embedded CSS (styles)
├── Embedded data (network_data.js content, pasted inline)
├── D3 v7 (CDN)
│
├── Section 1: Hero — "The Fabric of Global Health Funding"
├── Section 2: [network panel + story steps, sticky left]
│   ├── Sticky LEFT: SVG network panel (force simulation)
│   │   ├── Network canvas (D3 force)
│   │   └── Metric strip (6 bars below canvas)
│   └── Scrollable RIGHT: story steps (9 scenes)
├── Section 3: US removal scenario (full-width, interactive)
├── Section 4: Middle powers panel (highlighted subnetwork)
└── Section 5: Binding Map synthesis (full-width)
```

### Network panel behavior

- **Sticky position** (left half of viewport, full height)
- **D3 force simulation** with: charge repulsion (−200), link distance (60), center force
- **Node update on step change**: fade out old nodes/edges, update data, re-run simulation briefly (alpha 0.3)
- **Metric strip**: 6 labeled bars below the SVG, updated per biennium with animated value transitions

### Metric strip metrics (from Results.xlsx Table 1)

```
Nodes | Edges | Density | Clustering | WCC | Modularity
```
Each shown as: label + numeric value + mini bar (normalized to max across 5 biennia).

### US removal scenario

- Toggle button: "Remove US flows"
- On toggle: fade edges from US Source nodes to opacity 0.05; highlight dependent nodes (≥50% US flow) with dashed ring
- Show "exposed" count and total flow removed ($525M, 10.9%)
- No structural re-simulation needed — purely visual filter

### Binding Map (final section)

- Reuse the corrected binding_map SVG from previous prototype
- Resize to full-width, larger version
- Animate points entering one by one with a "play trajectory" button

---

## OUTPUT H — Academic Paragraph: Why This Belongs in the Article

The visual essay presented here functions as a **network reading** of structural change in WHO financing systems — not as an additional causal model. It is grounded in the same node, edge, and metric data underlying the quantitative analysis, and makes no claims that exceed those of the text. Its function is to make the aggregate structural changes — captured numerically in Table 1 — legible as a temporal process: a fabric forming, fraying, and partially reconstituting.

This type of visualization serves three purposes that a statistical table cannot. First, it shows the *unit of analysis* — the individual financing relationship between a specific donor and a specific WHO programme or recipient state — before abstracting it into network metrics. This anchors the theoretical constructs (density, modularity, weakly connected components) in substantively identifiable actors and flows. Second, it makes the comparative temporal claim — that the post-pandemic network is structurally distinct from the pre-pandemic baseline — visible as a spatial trajectory, not merely a numerical change. Third, the US-withdrawal scenario and middle-power panel translate structural findings into forward-looking structural questions without overstating what the data can show.

The visual essay does not replace the article's statistical analysis; it precedes and illustrates it. It is properly understood as a *visual apparatus* for a descriptive structural claim: that this network expanded without achieving durable integration, and that its current configuration is consistent with, but does not prove, reduced systemic resilience in the sense described by Scheffer and colleagues.

---

## OUTPUT I — Public-Facing Title, Subtitle, and 250-Word Pitch

**Title:** The Fabric of Global Health Funding

**Subtitle:** How the WHO financing network grew, frayed, and partially mended — and what it means when a thread is pulled

---

**Pitch (250 words):**

Every global health programme is funded by a web of relationships — governments, foundations, international agencies, private donors, each connected to WHO programmes and recipient countries through flows of money. Together these relationships form a fabric: a structure that can hold, stretch, or come apart.

This visual essay maps that fabric across nine years of WHO Programme Budget data, from 2016 to 2025. Five biennia. Five snapshots of a network that changed in ways the headline numbers alone do not reveal.

In 2016–2017, the fabric was relatively integrated: a small number of disconnected components, moderate density, and consistent clustering across the network. By 2018–2019, before any major external shock, signs of fragmentation appeared: the number of disconnected pieces grew from 2 to 123. Then came 2020–2021: the COVID-19 period brought a 60% expansion in the number of actors and a 36% increase in financing links — and a simultaneous collapse in structural cohesion. Density fell by half. Clustering fell by 76%. The number of disconnected pieces rose to 546. More threads, less fabric.

Post-pandemic, the network has partially reorganized. But it has not restored its original texture. Clustering remains low. Fragmentation remains high. And in 2025, a new stress has emerged: the announced contraction of US financing, which accounted for over 13% of recent WHO flows.

This essay does not predict collapse. It describes a structure — and asks whether it can hold.

*Data: WHO Programme Budget (public). Analysis: peer-reviewed. Prototype: reproducible.*

---

*End of fabric_essay_design.md*
