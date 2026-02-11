# Anshik Thakur — Portfolio

A dark, futuristic React.js portfolio with neon glow effects, particle fields, and smooth animations.

## Project Structure

```
portfolio/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── UI.jsx          # Reusable: GlitchText, CyberButton, SectionTitle, SkillBar, ParticleField
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx       # Bio + Experience Timeline
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx    # Breeze + THT
│   │   ├── Achievements.jsx # SIH, Certifications, Mentoring
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── data/
│   │   └── index.js        # ← Edit your info here!
│   ├── App.jsx
│   ├── index.js
│   └── index.css
└── package.json
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm start

# Build for production
npm run build
```

## Customization

All your personal data lives in **`src/data/index.js`** — update skills, projects, achievements there.

To update contact links (GitHub, LinkedIn), edit **`src/components/Contact.jsx`**.

## Hosting

After `npm run build`, deploy the `build/` folder to:
- **Netlify**: Drag & drop `build/` folder at netlify.com
- **Vercel**: `vercel --prod` from the project root
- **GitHub Pages**: Use `gh-pages` package
