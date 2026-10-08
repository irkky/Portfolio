<div align="center">
  <img src="public\ProfileDP.png" alt="Rishabh Kumar Kannaujiya" width="120" style="border-radius:9999px" />

  <h2>Rishabh Kumar Kannaujiya</h2>
  <p><strong>AI/ML Developer</strong> • Software Engineer • Problem Solver</p>
  
  <a href="https://rishabh-kumar-kannaujiya.vercel.app/">
    <img src="https://img.shields.io/badge/🌐_Live_Portfolio-0EA5E9?style=for-the-badge&logoColor=white" alt="Portfolio" />
  </a>
</div>

---

## Run locally

From `C:\Users\Rishabh kumar\Portfolio`, open PowerShell. Use Node.js 20.19 or newer.

```powershell
npm ci
npm run dev
```

Open the local address for the port printed by the server (5000 by default).
Use the navigation to explore pages, search/filter projects, and open project details.
Press Escape to close project details. Stop the server with Ctrl+C.
No environment file is required. To choose another port, set `$env:PORT = "5001"` before starting.

## Check and build

```powershell
npm run check
npm run build
npm start
```

The build creates the static site in `dist/public` and the Express server in `dist/index.js`.
Vercel serves the static output using `vercel.json`.
For an Express production deployment, build with development dependencies installed,
then deploy `dist`, `scripts/start.mjs`, `package.json`, and `package-lock.json`.
Run `npm ci --omit=dev` followed by `npm start` on the deployment host.
Production startup does not require Vite, TypeScript, or cross-env.

After building, run `npm run test:browser` for the local browser regression checks.
The test starts its own temporary server and hidden Chrome session and closes them afterward.
On Windows it uses Chrome's standard installation path; set `BROWSER_PATH` to your
Chrome or Edge executable if needed. It uses a separate temporary browser profile.
Checks include mobile popup bounds, keyboard navigation, graphics fallbacks and cleanup,
reduced motion, lazy pages, and production startup with development imports blocked.

If Windows reports `spawn EPERM` during a build, check whether the terminal or sandbox
blocks child processes; retry from an authorized terminal. For a port conflict, inspect
the existing listener before selecting a different `PORT`.

The animated cursor requires compatible WebGL support and is skipped when unavailable.
Reduced-motion preferences disable decorative motion. Sensor tilt is optional;
permission denial leaves the profile card usable. Browser layout and physical sensor
behavior need separate verification from TypeScript/build checks.

## About Me

I'm Rishabh Kumar Kannaujiya, an AI/ML Developer and a Generative AI enthusiast. I am passionate about crafting cutting-edge AI/ML solutions and developing scalable GenAI applications that deliver meaningful impact. I hold a B.Tech in Information Technology from Dr. A.P.J. Abdul Kalam Technical University.

- **Email:** rishabhkrkannaujiya@gmail.com
- **GitHub:** [irkky](https://github.com/irkky)
- **LinkedIn:** [Rishabh Kr. Kannaujiya](https://www.linkedin.com/in/rishabh-kr-kannaujiya/)

---

## 🌟 Portfolio Features

<table>
  <tr>
    <td align="center" width="50%">
      <h3>🎨 Modern Design</h3>
      <p>Smooth animations, page transitions, and tasteful motion effects</p>
    </td>
    <td align="center" width="50%">
      <h3>📱 Fully Responsive</h3>
      <p>Optimized for all devices - mobile, tablet, and desktop</p>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <h3>⚡ Lightning Fast</h3>
      <p>Built with Vite + TypeScript for optimal performance</p>
    </td>
    <td align="center" width="50%">
      <h3>♿ Accessible</h3>
      <p>Keyboard-friendly navigation and ARIA compliant</p>
    </td>
  </tr>
</table>

### 📄 Portfolio Pages

<details open>
<summary><b>Click to explore all pages</b></summary>

| Page | Description | Features |
|------|-------------|----------|
| 🏠 **Home** | Hero introduction | Animated text, CTAs, smooth scrolling |
| 👤 **Profile** | Comprehensive about section | Bio, education, experience, achievements |
| 🚀 **Projects** | Showcase of work | Detailed descriptions, live demos, GitHub links |
| 💪 **Skills** | Technical expertise | Interactive skill cards, proficiency levels |
| 🎯 **Extracurricular** | Beyond coding | Activities, interests, community involvement |
| 📬 **Contact** | Get in touch | Social links, Number, Mail |

</details>

---

## 📜 License

<div align="center">
  <img src="https://img.shields.io/badge/License-MIT-0ea5e9?style=for-the-badge" alt="MIT License" />
  <p>This project is released under the MIT License. See <a href="LICENSE">LICENSE</a> for details.</p>
</div>

---

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0EA5E9&height=100&section=footer" alt="Footer" />
  <p><b>Thanks for visiting! ♥ </b></p>
</div>
