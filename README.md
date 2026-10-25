# Ranger Wagayen · Personal Portfolio

A complete React, TypeScript, and Vite portfolio for **Ranger Aganon F. Wagayen**, a fourth-year BS Information Technology student majoring in Computer Security at PHINMA Araullo University. Built for OJT and internship applications, with a navy-and-cyan design, original CSS/SVG illustrations, and accessible interactions.

**Target GitHub repository:** `rangerdgreate/rangerdgreate.github.io`

**Intended public address:** https://rangerdgreate.github.io/

**Deployment status:** GitHub Pages publishes `main` using the existing workflow. Check [GitHub Actions](https://github.com/rangerdgreate/rangerdgreate.github.io/actions) for the current deployment result.

The local Git repository uses `main`, with `origin` configured for the intended portfolio repository. The implementation is committed locally; authenticate and push when ready.

## Run locally

Use Node.js **22.12 or newer** (Node 22 is selected in `.nvmrc` and the deployment workflow).

```sh
npm ci
npm run dev
```

Open the Local URL printed by Vite, normally http://127.0.0.1:5173/. No environment variables, credentials, database, or backend are needed.

To serve the actual production build:

```sh
npm run build
npm run preview
```

The preview normally runs at http://127.0.0.1:4173/. It is a local verification server, not a production hosting service.

## Project structure

```text
.github/workflows/deploy.yml   GitHub Pages build and deployment
public/
  assets/
    certificates/             Optional original, issued badge images
    fonts/                    Self-hosted Latin fonts and original OFL licenses
    favicon.svg               Original monogram
    social-preview.svg        Editable original social artwork
    social-preview.png        1200 × 630 sharing image
  resume/                     Add the real resume PDF here
  robots.txt
  sitemap.xml
  .nojekyll
src/
  components/                 Navigation, terminal, cards, project dialog, headings
  data/
    profile.ts                Personal information, navigation, skills
    projects.ts               Reusable project data and type
    credentials.ts            Exact Oracle titles, dates, verification URLs
  sections/                   Hero, About, Skills, Projects, Credentials, Resume, Contact
  styles/                     Global responsive styles and font declarations
  App.tsx
  main.tsx
scripts/
  check-content.mjs           Public content and configuration safeguards
  check-links.mjs             Optional network reachability checks
  capture.mjs                 Browser screenshots and social PNG generation
  vendor-fonts.mjs            Optional font download/refresh helper
tests/portfolio.spec.ts       Browser, keyboard, responsive, and axe checks
playwright.config.ts
vite.config.ts
package.json
package-lock.json             Reproducible dependency resolution
```

`dist/` is the generated website. `node_modules/`, `.npm-cache/`, screenshots in `artifacts/`, and local environment files are ignored by Git.

## Edit content

### Portrait hero

The hero uses the supplied professional photo at `public/assets/ranger-portrait.png`, preserved unchanged. Responsive WebP copies retain its composition and proportions. After replacing the original with an approved photograph, run `node scripts/optimize-portrait.mjs` to regenerate those copies; update the width, height, aspect ratio, and responsive filenames if the new image dimensions differ.

`src/components/Portrait.tsx` renders the image, `src/styles/portrait.css` controls the cinematic entrance and framing, and `src/hooks/usePortraitMotion.ts` adds restrained desktop pointer and scroll motion. Animation uses native CSS and one on-demand animation frame loop, without an additional runtime animation dependency. Tilt and parallax are disabled on small screens, touch pointers, and reduced-motion preferences; reduced motion also removes entrance effects. The existing sections and interactions are unchanged.

- Change personal information, the email address, interests, skills, and career objective in `src/data/profile.ts`.
- About text and other section-specific copy live in `src/sections/`.
- Update page titles, descriptions, canonical URL, and Open Graph tags in `index.html` if the identity or public URL changes. Update `public/robots.txt` and `public/sitemap.xml` when changing the domain.
- Colors, typography, layouts, motion, responsive rules, and print styles live in `src/styles/global.css`. Fonts are served locally; there are no runtime Google Fonts requests.
- The site uses hash navigation instead of client-side routes, so no GitHub Pages router fallback is needed.

### Add a project

Add an object conforming to `Project` in `src/data/projects.ts`:

```ts
{
  id: 'my-project',
  name: 'My Project',
  fullName: 'My Project — A descriptive title',
  category: 'Project category',
  role: 'Your accurate contribution',
  summary: 'A concise, factual public overview.',
  technologies: ['Technology'],
  features: ['Confirmed feature or contribution'],
  note: 'Relevant context and limitations.',
  visibility: 'Private',
}
```

Set `training: true` for Training & Exploration. Public projects can use `visibility: 'Public'` and a real `repository` URL. Omit `repository` for private projects. The first non-training project is featured. Unknown project IDs receive a generic illustration; add an icon mapping in `ProjectCard.tsx` if desired.

All illustrations are labeled as concepts. They do not represent actual application screenshots. To add real screenshots later, place approved, sanitized images in `public/assets/`, extend the project type with an optional image field, and render it with descriptive alt text in `ProjectCard.tsx`. Do not publish private source, group materials, tokens, credentials, customer data, or sensitive information visible in screenshots.

### Add original certificate images

1. Place the unmodified official badge images in `public/assets/certificates/`.
2. Add `image: '/assets/certificates/your-official-badge.png'` to the matching entry in `src/data/credentials.ts`.
3. Keep the issued title, date, name, and Oracle verification URL accurate.

The current award icons are generic interface decoration, not fabricated Oracle badge images. The original certificates use **Ranger Wagayen**; the site explicitly explains this name variation. Oracle verification links remain available without uploaded images.

### Add the resume PDF

Upload the actual approved resume to exactly:

```text
public/resume/Ranger_Aganon_F_Wagayen_Resume.pdf
```

Restart the development server or rebuild after adding the file. `vite.config.ts` checks the file exists and begins with a PDF signature at build time. Only then do **Download Resume** and **Download My Resume** appear. Merely changing a data flag is not sufficient.

Without the PDF, the hero links to the on-page summary. The Resume section offers **Print Resume Summary** and an email request link. Printing displays the resume summary and contact information; it does not claim to be an uploaded original resume. Your browser’s print dialog can save that summary as a PDF.

## Validation

```sh
npm run typecheck
npm run check:content
npm run build
npm run check:links
npm audit
```

`check:content` verifies required sections and literal internal anchors, secure new-tab link configuration, exclusion of private repository URLs, the resume download guard, three well-formed official credential links, the root Vite base, compiled Pages artifact configuration, and common secret patterns. This is a focused safeguard, not a complete security audit.

`check:links` makes public HTTP requests to the GitHub profile, the Stellar repository, and the three Oracle URLs. It exits unsuccessfully for unreachable or blocked URLs and labels rate limiting or forbidden responses for manual checking. HTTP success establishes reachability, not credential authenticity or project functionality. Email links are configured with `mailto:`; sending email was not tested.

### Browser tests

Serve a current production build on port 4173 in one terminal:

```sh
npm run build
npm run preview
```

Then run in another terminal:

```sh
npm test
```

The default browser is installed Microsoft Edge. To use Playwright Chromium instead, install it and set `PLAYWRIGHT_CHANNEL=chromium`:

```sh
npx playwright install chromium
```

PowerShell:

```powershell
$env:PLAYWRIGHT_CHANNEL = 'chromium'
npm test
```

macOS / Linux:

```sh
PLAYWRIGHT_CHANNEL=chromium npm test
```

The seven test groups cover rendered content and links; all four dialogs with Escape and focus restoration; mobile navigation and the active indicator; horizontal overflow at 320, 390, 768, 1024, and 1440 pixels; automated WCAG A/AA checks for desktop, mobile, and an open dialog; reduced motion; print visibility; portrait image loading and proportions; the completed cinematic entrance; desktop pointer and scroll motion; and disabling portrait motion on mobile. Automated accessibility checks complement manual review and do not establish full WCAG conformance.

With the preview running, `npm run capture` saves full-page desktop/mobile screenshots under ignored `artifacts/` and regenerates `public/assets/social-preview.png` from the SVG. Update the SVG first when changing the sharing artwork. `node scripts/vendor-fonts.mjs` refreshes the chosen fonts and original licenses; it is not needed for normal development or deployment.

### Checks completed during implementation

- Dependencies installed and locked; TypeScript and production build passed.
- Content/configuration safeguards passed.
- All five browser test groups passed in headless Microsoft Edge.
- Desktop and mobile screenshots were reviewed.
- Automated axe WCAG A/AA scans reported no violations in the tested desktop, mobile, and dialog states.
- GitHub profile, public Stellar repository, and all three Oracle URLs returned HTTP 200.
- `npm audit` reported zero known vulnerabilities across production and development dependencies at the time of implementation.
- No original resume, official badge images, actual project screenshots, WebGuard documentation, or private project source was present. No private source was imported.
- GitHub publication was not completed; no live deployment success is claimed.

## Publish to GitHub Pages

The workflow follows the [Vite GitHub Pages deployment guidance](https://vite.dev/guide/static-deploy.html#github-pages). Vite uses `base: '/'` because this is the user site, not a project subdirectory. The workflow installs from the lockfile with `npm ci`, checks public content, type-checks and builds, uploads only `dist/` with the official Pages artifact action, and deploys it with the official Pages deployment action. Deployments run on pushes to `main` and can be started manually. Permissions are scoped by job, and the Pages concurrency group avoids overlapping deployments.

Remaining account actions:

1. Sign in to GitHub as **rangerdgreate**. Create the public repository **rangerdgreate.github.io** if it does not already exist. For a new repository, leave it empty instead of initializing a README or other files remotely.
2. In that repository, open **Settings → Pages → Build and deployment → Source**, and select **GitHub Actions**.
3. Authenticate local Git using GitHub Desktop or your credential manager. Do not put a token into source files, the remote URL, or chat.
4. From this workspace, inspect `git status` and `git remote -v`. The intended origin is `https://github.com/rangerdgreate/rangerdgreate.github.io.git`. Commit any new edits, then push:

```sh
git push -u origin main
```

5. Open the repository’s **Actions** tab. Wait for **Deploy portfolio to GitHub Pages** and both its build/deploy jobs to succeed. If needed, use **Run workflow** on `main` after configuring Pages.
6. Open the URL reported by the successful deployment. The intended address is **https://rangerdgreate.github.io/**. That address is not confirmed live until GitHub finishes deploying.

If copying this source into another directory without Git metadata, initialize and connect it first:

```sh
git init -b main
git add .
git commit -m "Build professional cybersecurity portfolio"
git remote add origin https://github.com/rangerdgreate/rangerdgreate.github.io.git
git push -u origin main
```

If the remote already contains commits, fetch and review that history before integrating these files. Do not force-push over existing work.

### Deployment troubleshooting

| Symptom                                                       | Check                                                                                                                                                                  |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository not found / authentication required                | Confirm the signed-in account, repository spelling, repository existence, and write access.                                                                            |
| Pages returns 404                                             | Confirm the exact repository name, GitHub Actions as the Pages source, a successful deploy job, and the URL reported by GitHub.                                        |
| Blank page or missing scripts/styles                          | Keep `base: '/'` for this user site. Deploy the artifact from `dist/`, not `src/` or the root `index.html`. Check the browser console and network panel.               |
| `npm ci` reports lockfile mismatch                            | Run `npm install` locally after editing dependencies, then commit both package files.                                                                                  |
| Node engine error                                             | Use Node 22.12+; the supplied workflow uses Node 22.                                                                                                                   |
| Workflow cannot deploy / environment protection blocks it     | Check Pages source settings, Actions policy, the `github-pages` environment’s allowed branches, and the deploy job’s `pages: write` and `id-token: write` permissions. |
| Workflow does not start                                       | Push to `main`, check Actions are enabled, or run it manually.                                                                                                         |
| Resume still displays the fallback                            | Check the exact filename, casing, PDF signature, tracked file, and rebuild. GitHub filenames are case-sensitive.                                                       |
| Local Windows sandbox blocks Vite parent-directory resolution | Run the build in a terminal with normal read access to the project’s parent directories. The source configuration does not need changing.                              |
| Sharing preview appears old                                   | Confirm the PNG is committed and deployed, then allow the sharing platform’s cache to refresh.                                                                         |

## Content boundaries

CyberScan is a solo AI-assisted project for authorized assessments, with findings requiring validation. Shopora is a solo demonstration with simulated electronic payments. WebGuard is a group capstone where Ranger served as Project Manager. Stellar / Soroban is a guided seminar activity; its frontend and smart contract examples are not claimed to be one verified integrated application. The three private project repositories are not linked or included. No employment history, GPA, graduation date, phone number, LinkedIn profile, production deployment, or unsupported security accomplishment has been invented.

---

Original repository README (preserved from the initial remote commit):

# rangerdgreate.github.io
