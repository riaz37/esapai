# Hero Video: Generate (Veo / Whisk) + Scroll-Linked Scrubbing

Steps for generating product hero background video with AI (Veo or Whisk), then driving it frame-by-frame from scroll for a smooth cinematic hero.

---

## 1. Generate the video

### Option A: Google Veo (Vertex AI)

- **What:** Text-to-video or image-to-video via [Veo on Vertex AI](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/veo-video-generation).
- **Specs (Veo 3.1):** 4 / 6 / 8 s, 720p or 1080p, 16:9 or 9:16, 24 FPS, MP4.
- **Steps:**
  1. Enable Vertex AI and Veo in Google Cloud.
  2. Call the video generation API (text prompt or first/last frame).
  3. Download the generated MP4 (e.g. to `public/` or your CDN).
  4. Reference it in `content.hero.demoVideo` (e.g. `/hero-erp.mp4`).

**References:**  
[Veo 3.1 Generate](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/veo/3-1-generate) · [Veo video generation API](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/veo-video-generation)

### Option B: Google Whisk (Labs)

- **What:** [Whisk](https://labs.google/fx/tools/whisk) (Google Labs) – image-based prompting; uses Imagen 3 for images and **Veo for video**.
- **Flow:** Upload/reference images → Gemini captions → Imagen 3 image → animate with Veo → short video.
- **Limits:** Free tier ~5 videos/month (region-dependent); more with Google AI Pro/Ultra.
- **Steps:**
  1. Go to [labs.google/fx/tools/whisk](https://labs.google/fx/tools/whisk).
  2. Create or upload images (subject, scene, style).
  3. Generate video from the generated image.
  4. Download the result (MP4) and add to `public/` (or host and set URL in `content.hero.demoVideo`).

**Reference:** [Whisk Help / FAQ](https://labs.google/fx/tools/whisk/faq)

### Recommendation for this app

- **Veo (Vertex):** Best if you need API integration, reproducible prompts, and 1080p/controlled length (e.g. 6–8 s hero loops).
- **Whisk:** Best for quick, visual iteration and one-off hero concepts; then export MP4 and use the same pipeline below.

Use a **short loop** (4–8 s) so the hero feels continuous; our scroll timeline drives *which* moment is shown, not playback speed.

---

## 2. Use the video: two approaches

### Approach 1: Scroll-scrubbed HTML5 video (simplest)

**Idea:** One video file; scroll progress maps to `video.currentTime`. Scroll down → video goes forward; scroll up → rewind.

**Implementation (GSAP ScrollTrigger):**

```ts
// In the same pinned timeline (or a dedicated ScrollTrigger)
ScrollTrigger.create({
  trigger: containerRef.current,
  start: "top top",
  end: "+=2500%", // match your cinematic section length
  scrub: true,
  onUpdate: (self) => {
    if (videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime = self.progress * videoRef.current.duration;
    }
  },
});
```

**Pros:** One asset, small bundle, easy to wire.  
**Cons:** Can stutter on mobile, depends on decode/seek; autoplay policies; compression artifacts.

**References:**  
[GSAP forum: link video playback to scroll](https://gsap.com/community/forums/topic/31718-how-can-i-link-video-playback-to-scroll-position-with-scrolltrigger/) · [Video scrubbing on the web](https://ghosh.dev/posts/playing-with-video-scrubbing-animations-on-the-web)

---

### Approach 2: Frame sequence (smoother, recommended for “frame-by-frame”)

**Idea:** Pre-render the video to a sequence of images (e.g. one per frame or every N ms). Drive the *displayed frame index* from scroll progress. No video decode during scroll.

**Pipeline:**

1. **Generate video** (Veo or Whisk) → get MP4.
2. **Extract frames** (e.g. FFmpeg):
   ```bash
   # Example: 30 fps → frame_001.png, frame_002.png, ...
   ffmpeg -i hero-erp.mp4 -vf "fps=30" "public/hero-erp/frame_%03d.png"
   ```
3. **Optional:** Convert to WebP for smaller size:
   ```bash
   ffmpeg -i "public/hero-erp/frame_%03d.png" -c:v libwebp -quality 80 "public/hero-erp/frame_%03d.webp"
   ```
4. **In the app:**  
   - `totalFrames = number of images`.  
   - On ScrollTrigger `onUpdate`: `frameIndex = Math.round(self.progress * (totalFrames - 1))`, then show `frame_XXX.png` (or `.webp`).  
   - Render via `<img src={...} />` or draw into a **canvas** (better for many frames and to avoid DOM flicker).

**Pros:** Smooth, no seek lag; works well on mobile; no autoplay issues; full control over which “frame” is shown at each scroll position.  
**Cons:** More files (or a sprite sheet), more implementation (preload, canvas or img swap).

**Reference:**  
[Creating smooth scroll-synced animation (OPTIKKA): from HTML5 video to frame sequences](https://tympanus.net/codrops/2025/10/16/creating-smooth-scroll-synchronized-animation-for-optikka-from-html5-video-to-frame-sequences/) (Codrops) – same pattern: video → frames → scroll-driven frame index.

---

## 3. Recommended steps for this app

| Step | Action |
|------|--------|
| 1 | **Generate hero video** with Veo (Vertex) or Whisk; 4–8 s, 16:9, 24–30 fps; export MP4. |
| 2 | **Host the MP4** in `public/` (e.g. `public/hero-erp.mp4`) and set `content.hero.demoVideo` for that product. |
| 3a | **Quick path:** Keep current hero: use the video as-is and add **scroll-scrubbing** by mapping the pinned section’s scroll progress to `video.currentTime` (Approach 1). |
| 3b | **Smoother path:** Export a **frame sequence** from the MP4 (FFmpeg), serve frames from `public/hero-erp/`, and drive the visible frame index from the same scroll progress (Approach 2). |
| 4 | **Optional:** Use device-specific frame counts (e.g. fewer frames on mobile) and preload nearby frames for the current scroll position to keep it smooth. |

**Practical order:** Implement **Approach 1** (scroll-scrubbed video) first so hero video is driven by scroll; if you see stutter or seek issues, move to **Approach 2** (frame sequence + canvas or img).

---

## 4. Summary

- **Generate:** Veo (API, control) or Whisk (fast visual iteration) → MP4.
- **Use:** Either scrub one video with `video.currentTime = progress * duration`, or convert to frames and show the frame that matches scroll progress for a true “frame-by-frame” feel.
- **Smooth animation:** For best results, prefer a **frame sequence** driven by scroll (Approach 2); use **video scrub** (Approach 1) as a simpler first step.
