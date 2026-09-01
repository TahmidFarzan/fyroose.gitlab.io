# Alfarabi Fyroose — Video Editor Portfolio

A single-page portfolio website for Alfarabi Fyroose, presenting him as a professional video editor and content creator. The site showcases selected edits, core skills, an experience timeline, and direct contact options.

## Project Description

This is a static, single-page website built with plain HTML, CSS, and JavaScript. It is designed for Alfarabi Fyroose to present his video-editing work, communicate his skills and professional history, and provide prospective clients with direct ways to get in touch.

The site is intended for:

- Potential clients and collaborators seeking a video editor, content creator, or voice-over artist.
- Anyone viewing a professional portfolio of short-form video editing work.

Primary goal: present Alfarabi Fyroose as a professional and invite project discussions.

## Features

- Responsive single-page layout (desktop, tablet, mobile).
- Fixed header with a collapsible mobile navigation menu.
- About section with portrait and contact information.
- Dynamically rendered work grid of video-edit cards loaded from a JavaScript data array.
- Work cards open the original YouTube URL in a new tab (no embedded player or modal).
- Scroll-reveal animations on sections and cards via IntersectionObserver.
- Animated skill-card visuals and an experience timeline.
- Contact actions for Email, WhatsApp, and Phone.
- Auto-updating footer copyright year.
- Reduced-motion support for accessibility.

## Technology Stack

- HTML5
- CSS3 (custom properties / design tokens)
- JavaScript (ES5-style, jQuery)
- Bootstrap 5.3.8 (CSS + JS bundle)
- jQuery 4.0
- Font Awesome 6.5.2 (icons)
- Google Fonts (Bebas Neue, Inter, JetBrains Mono)

## Project Structure

```
/
├── index.html
├── .gitlab-ci.yml
├── LICENSE
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── main.js
    └── images/
        ├── alfarabi-fyroose-profile.jpg
        └── favicon.ico
```

## Website Sections

### Header / Navigation
Fixed navigation bar with the brand logo, a hamburger menu on mobile, and links to every section.

### About
Introduces the editor with a portrait frame, a short bio, role/focus details, action buttons, and contact chips (Email, LinkedIn, WhatsApp).

### Work
A dynamically generated grid of selected video edits. Each card shows a thumbnail, reveals a hover overlay, and opens the original YouTube video in a new tab. A "View More Edits" button reveals additional entries, and a project count is displayed.

### Skills
Four cards covering Video Editing, Social Media Management, Voice Over, and Content Creation, each with an animated decorative visual.

### Experience
A vertical timeline of professional roles, including current, ongoing, and completed positions, with a divider separating previous experience.

### Contact
Heading copy plus three action cards: Send Email, Start a WhatsApp Conversation, and Call.

### Footer
Brand and tagline, footer navigation, social/contact links, and a bottom bar with an auto-updating year.

## Local Setup

This is a static website with no build process. To run it locally:

1. Clone the repository:

   ```bash
   git clone YOUR_GITLAB_REPOSITORY_URL
   ```

2. Open the project folder.

3. Open `index.html` in your browser.

No package installation or server is required for a basic local preview.

## Customization Guide

### CSS
- All custom styles live in `assets/css/style.css`.
- Global design tokens (colors, fonts, spacing, header height) are defined in the `:root` block at the top of the file.
- The file is organized by section (Header, About, Work, Skills, Experience, Contact, Footer) followed by responsive media queries.

### JavaScript
- All interactive logic is in `assets/js/main.js`.
- It handles the sticky header, mobile menu auto-close, footer year, scroll reveal, and the work-card system.

### Content Data
- The work grid is data-driven. To add or remove video projects, edit the `workVideos` array at the top of `assets/js/main.js`. Each entry is a full YouTube URL (supports `/shorts/`, `/watch`, `/embed/`, and `youtu.be` formats). Cards, thumbnails, count, and pagination are generated automatically.
- Pagination is controlled by `INITIAL_WORK_COUNT` and `WORK_LOAD_MORE_COUNT` in the same file.
- Static content (About, Skills, Experience, Contact text) lives directly in `index.html`.

### Images
- Replace `assets/images/alfarabi-fyroose-profile.jpg` with your own portrait while keeping the same filename and path, or update the `src` in `index.html`.
- `assets/images/favicon.ico` is the site's browser icon.

## Asset Management

- Portrait image: `assets/images/alfarabi-fyroose-profile.jpg` (referenced in the About section).
- Favicon: `assets/images/favicon.ico` (referenced in the `<head>`).
- Icons: provided by the Font Awesome CDN — no local icon files are used.
- Fonts: loaded from Google Fonts CDN — no local font files are used.
- YouTube thumbnails are loaded lazily from `img.youtube.com` based on each video ID, with a lower-resolution fallback image.

Suggestions for production optimization: ensure profile images are reasonably compressed, and consider minifying `style.css` and `main.js` before deployment.

## License

This project is licensed under the MIT License.

See the [LICENSE](LICENSE) file for details.

---

# How to Host This Project on GitLab Pages

GitLab Pages hosts static websites from a Git repository. Because this project is plain HTML, CSS, and JavaScript with no build step, deployment is a simple file copy.

## Step 1 — Create a GitLab Repository

1. Log in to your GitLab account.
2. Click **New project** (or **New blank project**).
3. Give the project a name (for example, `my-portfolio`), choose your namespace or group, and set visibility.
4. Create an empty repository (no README needed) and keep the default branch as `main`.

## Step 2 — Push the Project to GitLab

Open a terminal in the project folder and run:

```bash
git init

git add .

git commit -m "Initial commit"

git branch -M main

git remote add origin YOUR_GITLAB_REPOSITORY_URL

git push -u origin main
```

Replace `YOUR_GITLAB_REPOSITORY_URL` with the repository URL GitLab provides (shown on the project's empty-repository page). Do not run any command after replacing the URL that you do not intend to execute.

## Step 3 — Configure GitLab Pages

Create a `.gitlab-ci.yml` file in the project root (it already exists in this repository). For this static website, use:

```yaml
pages:
  stage: deploy
  script:
    - mkdir public
    - cp -r index.html assets public/
  artifacts:
    paths:
      - public
  rules:
    - if: $CI_COMMIT_BRANCH == "main"
```

This pipeline creates a `public/` folder containing `index.html` and `assets/`, stores that folder as an artifact, and runs only on the `main` branch. GitLab Pages treats the `public/` artifact as the published website.

Commit and push the file:

```bash
git add .gitlab-ci.yml

git commit -m "Add GitLab Pages deployment"

git push
```

Then wait for the pipeline to complete. You can follow its progress under **Build → Pipelines** in the GitLab project. When the `pages` job finishes successfully, the site is deployed.

## Step 4 — Access the Published Website

After a successful deployment:

1. Go to your project.
2. Open **Deploy → Pages**.
3. GitLab provides the live URL, formatted like:

   ```text
   https://username.gitlab.io/project-name/
   ```

The exact URL depends on your GitLab username and project name; check the **Pages** page of your project for the actual address. Private projects may require adjusted visibility settings for the site to be publicly accessible.

## Step 5 — Updating the Website

After making changes, commit and push to reflect them on the hosted site:

```bash
git add .

git commit -m "Update website"

git push
```

GitLab Pages automatically rebuilds and republishes the site once the `pages` pipeline for your new commit completes successfully.

---

## Contributing

This is a personal portfolio project. Contributions are not currently expected. If you find a bug or have a suggestion, please open an issue in the repository.

## Contact

This portfolio is for Alfarabi Fyroose. The public contact details are listed on the website itself and can also be found directly in `index.html`:

- Email: `alffyroose007@gmail.com`
- WhatsApp: `+880 1671 786285`
- Phone: `+880 1671 786285`
- LinkedIn: `https://www.linkedin.com/in/alfarabi-fyroose`
