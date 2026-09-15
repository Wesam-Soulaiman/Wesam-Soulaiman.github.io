# Portfolio — wesam-soulaiman.github.io

Personal portfolio site. Plain HTML, CSS and JavaScript — no build step, no framework, no dependencies to install.

**Live:** https://wesam-soulaiman.github.io/

---

## Editing content

All text, links, skills, jobs and projects live in **one file**:

```
assets/js/data.js
```

Change a value there, save, refresh. Nothing else needs to be touched.

| I want to change… | Edit in `data.js` |
|---|---|
| Name, title, tagline, About paragraphs | `profile` |
| Email, phone, LinkedIn, GitHub | `contact` |
| The four numbers under the hero | `stats` |
| Skill groups and badges | `skills` |
| Jobs | `experience` |
| Degrees | `education` |
| The Darb highlight block | `highlight` (set to `null` to remove) |
| Featured project cards | `projects` |
| Default theme, footer note | `options` |

### Adding a project

Append to the `projects` array. `repo` must match the GitHub repository name exactly — stars, forks and language are then fetched live:

```js
{
  repo     : "Spotify-Full-Stack",
  title    : "Spotify Clone — Full Stack",
  category : "Full-Stack",
  accent   : "rose",              // violet | indigo | cyan | emerald | amber | rose
  summary  : "…",
  tech     : ["React", "Node.js", "MongoDB"]
}
```

A new `category` automatically becomes a new filter button.

### Replacing the CV

Overwrite `assets/cv/WesamSoulaiman-CV.pdf`, keeping the filename — or change `profile.cv` to point elsewhere.

---

## Publishing

1. Create a **public** repository named exactly `Wesam-Soulaiman.github.io`.
2. Push this folder to it:

   ```bash
   git init
   git add .
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/Wesam-Soulaiman/Wesam-Soulaiman.github.io.git
   git push -u origin main
   ```

3. **Settings → Pages →** Source: `Deploy from a branch`, Branch: `main` / `(root)`.
4. Live at `https://wesam-soulaiman.github.io/` within a couple of minutes.

`.nojekyll` is included so GitHub serves the files as-is rather than running Jekyll over them.

---

## Local preview

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`. Opening `index.html` directly via `file://` also works, but a local server matches production more closely.

---

## How it works

| File | Role |
|---|---|
| `index.html` | Semantic shell — empty containers with ids |
| `assets/css/style.css` | Design tokens, layout, components, dark/light themes |
| `assets/js/data.js` | **All content** |
| `assets/js/main.js` | Renders every section from `DATA`, then enriches it with the GitHub API |

**Live GitHub data** comes from `api.github.com` — unauthenticated, 60 requests/hour per IP. If that limit is hit, the GitHub section hides itself and everything else still renders from `data.js`.

**Features:** dark/light toggle (remembered in `localStorage`), scroll progress bar, active-section nav, reveal-on-scroll, animated count-up stats, rotating role text, project category filter, live stars/languages/repo list, responsive to 360px, `prefers-reduced-motion` respected, print stylesheet.

---

## Improving how the repos look on GitHub

The site pulls each repository's description live. Four of the featured repos have none — adding them improves both this site and the GitHub profile:

| Repo | Suggested description |
|---|---|
| `Angular-Compiler-Code-Generation` | Compiler for a subset of the Angular template language in Java — lexer, parser, AST, semantic analysis and code generation. |
| `ir-search-engine` | Information retrieval search engine in Python — inverted index, TF-IDF ranking and standard IR evaluation metrics. |
| `secure-distributed-system` | Distributed system with authenticated inter-node communication, access control and protected data in transit. |
| `MERN-auth` | Authentication on the MERN stack — hashed credentials, JWT sessions and protected routes on API and client. |

Adding **topics** to each repo (`java`, `compiler`, `information-retrieval`, `mern`, `odoo`…) also makes them discoverable in GitHub search.
