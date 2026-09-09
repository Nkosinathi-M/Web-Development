# Nkosinathi Mahlangu — Personal Portfolio

A personal portfolio website built with plain HTML5, CSS3, and vanilla JavaScript. No build tools or frameworks required — just open `index.html` in a browser.

## Live Site

<!-- TODO: replace with your GitHub Pages URL once deployed -->
> https://&lt;your-github-username&gt;.github.io/&lt;repo-name&gt;/

## Tech Stack

| Layer | Choice |
|-------|--------|
| Markup | HTML5 (semantic landmarks) |
| Styles | CSS3 (custom properties, Flexbox, media queries) |
| Scripts | Vanilla JavaScript (ES5-compatible) |
| Fonts | Google Fonts — Poppins + Ubuntu |
| Icons | Font Awesome 6 (CDN `<link>`) · Ionicons 7 |

## Sections

1. **Navbar** — fixed, smooth-scroll anchor links, mobile hamburger
2. **Hero** — full-viewport intro with parallax background
3. **About** — bio, photo, CV download
4. **Services** — icon cards for Web Dev, Java, Database, Cloud
5. **Skills** — progress-bar groups: Web Dev · Java · Database
6. **Projects** — card grid: Student Management System, Static Webpage
7. **Teams** — collaborators (placeholder until populated)
8. **Contact** — validated static form + social links
9. **Footer** — copyright, nav links, back-to-top

## Project Structure

```
/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   └── images/
│       ├── nathi.jpg
│       ├── HTML.jpg
│       ├── java.png
│       ├── MySQL.jpg
│       └── cloud.jpg
├── CV/
│   └── Curriculum Vitae of Nkosinathi Mahlangu.pdf
├── .gitignore
└── README.md
```

## Deploying to GitHub Pages

1. Push the repository to GitHub.
2. Go to **Settings → Pages**.
3. Set Source to **Deploy from a branch**, branch `main`, folder `/ (root)`.
4. GitHub will publish the site and provide a URL — paste it above.

> **Note:** All asset paths are relative, so no changes are needed for GitHub Pages hosting.

## Local Development

No dependencies to install. Simply open `index.html` directly in any modern browser.

## TODO Items (marked in source)

- Replace placeholder bio text with real copy
- Swap hero background and profile photo
- Add real GitHub repo and demo URLs to project cards
- Add real social media profile links
- Populate the Teams section with real collaborators
- Adjust skill percentage values to match actual proficiency
- Wire up the contact form to a service (Formspree, Netlify Forms, EmailJS, etc.)
