# 📁 Portfolio — Bollam Sherlin Varshitha
## File Structure

```
portfolio/
├── index.html     ← Main HTML structure
├── style.css      ← All styles & animations
├── script.js      ← Interactions, typing effect, counters
├── photo.jpg      ← YOUR PHOTO (add this!)
├── resume.pdf     ← YOUR RESUME (add this!)
└── README.md      ← This file
```

---

## 🚀 How to Run
Just open `index.html` in any browser — no build tools needed!

---

## 🖼️ How to Add Your Photo
1. Save your photo as `photo.jpg` in the same folder as `index.html`
2. Recommended: Square crop, minimum 400×400px
3. That's it! The `<img src="photo.jpg">` tag in the hero will pick it up automatically.

---

## 🔗 How to Update Project Links
Open `index.html` and find each project card. Update these 3 links per project:

```html
<!-- GitHub link -->
<a href="https://github.com/YOUR_USERNAME/YOUR_REPO" target="_blank" class="card-link-btn">

<!-- LinkedIn post link -->
<a href="https://linkedin.com/posts/YOUR_POST_ID" target="_blank" class="card-link-btn linkedin">

<!-- Live demo / video link (YouTube, Drive, Vercel, etc.) -->
<a href="https://your-demo-link.com" target="_blank" class="card-link-btn demo">
```

---

## ✏️ What to Customize Later
- [ ] Replace `photo.jpg` with your actual photo
- [ ] Replace `resume.pdf` with your actual resume
- [ ] Update all GitHub repo links with your real repos
- [ ] Update LinkedIn post links for each project
- [ ] Add live demo/video links (YouTube, Vercel, Google Drive)
- [ ] Update GitHub/LinkedIn/LeetCode profile URLs in the navbar social row
- [ ] Add more projects or remove any placeholder ones

---

## 🎨 Color Scheme
| Variable      | Color          | Used for          |
|---------------|----------------|-------------------|
| `--accent`    | `#c8f542`      | Lime green accent |
| `--teal`      | `#42f5c8`      | Teal highlights   |
| `--pink`      | `#f542a4`      | Pink highlights   |
| `--bg`        | `#0a0a0f`      | Main background   |

Change any color in `style.css` under `:root { }` at the top.
