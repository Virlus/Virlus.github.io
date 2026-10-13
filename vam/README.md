# VaM project website

Published at https://virlus.github.io/vam/ . The arXiv button currently opens `vam.pdf`, supplied by the authors. The paper lists use the same PDF and project links, with code at https://github.com/Virlus/vam . `images/vam_banner.mp4` is the first 20 seconds of the Box Assembly task video, re-encoded at 640 px for muted looping previews. The full task video is `assets/box-web.mp4`, re-encoded from the preserved local original with H.264 CRF 23 and fast-start metadata.

The build copies only runtime files and assets. Preview logs, raw NPZ/source JSON, the oversized original task video, and figure-generation scripts are not included in the deployed site.


Start from the repository root:

```sh
node vam/preview.mjs
```

Open http://localhost:4322/vam/ . The server binds only to 127.0.0.1 and serves this project only, with byte-range support for video seeking. No external scripts, analytics, fonts, or services are loaded.

This directory is excluded through `.git/info/exclude`. It is intentionally absent from `scripts/sync-legacy-assets.mjs`, homepage publication data, and the public build. Do not add it to deployment or push its contents without explicit publication authorization.

## Content sources

Original material root: `/Users/jason/Downloads/value_learning/`.

- `assets/intro.mp4`: `materials/intro_website.mp4`, unchanged.
- `assets/supplementary.mp4`: `VaM_submission/VaM_supp_video.mp4`, complete and unchanged (260 seconds, original audio).
- `assets/pipeline.mp4`: 144–239 seconds of the supplementary video, matching the animated framework in `materials/video.pptx` slides 5–9. Re-encoded as H.264 without audio for loop playback, preserving the original rendered animation and captions.
- `assets/box-100x.mp4`: `materials/0827_box_100x_speed.mp4`, unchanged.
- `assets/laundry-50x.mp4`: `materials/laundry_folding_50x.mp4`, unchanged.
- `assets/bus-8x.mp4`: `materials/magnetic_bus_assembly_8x_demo.mp4`, unchanged.
- `assets/teaser.png`: `Wenye_ICLR2027/illustrations/teaser-compressed.pdf`, rendered to PNG.
- `assets/success-rate.png`: `Wenye_ICLR2027/exp_fig/figures/online-rl-performance/outputs/success-rate.pdf`.
- `assets/offline-online.png`: `Wenye_ICLR2027/exp_fig/figures/offline-online-comparison/outputs/comparison.pdf`.
- `assets/training-time.png`: `Wenye_ICLR2027/exp_fig/figures/offline-online-gradient-step-time/outputs/time-comparison.pdf`.
- Title and explanatory copy: manuscript `tex/abstract.tex`, `tex/method.tex`, `tex/experiments.tex`. Table values are from the final-three-checkpoint table in `tex/experiments.tex`.

Authors and affiliations are intentional placeholders in `index.html`. Figure labels retain the source artwork verbatim; captions use percentage points for absolute success-rate differences. The teaser's rounded numbers and schedule annotations are original source content.

Uses ARMADA's local Bulma stylesheet with project-specific styling in `style.css`. No change to the public ARMADA page.

## Validation

- Desktop 1440 × 1000 and mobile-width 390 × 844 checked; no horizontal page overflow.
- All five autoplay videos confirmed playing without a play click, with advancing current time, mute, loop and inline playback enabled. Supplementary video retains manual playback and audio.
- All image assets loaded; no page errors or failed asset responses in the browser check. Cover pause/resume control works.
- Video byte-range request returned HTTP 206. Listener confirmed at 127.0.0.1:4322. `public/vam` and `dist/vam` are absent.
- Repository `corepack pnpm build` was attempted twice (including with telemetry disabled), but the existing Astro process stalled before logging build progress and was stopped. The isolated static site does not require Astro; its local browser checks passed.

## Qualitative comparisons

`#qualitative` contains the three Box Assembly pairs selected by the main paper in `Wenye_ICLR2027/tex/experiments.tex` (figure `fig:value_caching_mechanism`). The six PNGs in `assets/qualitative/` are unchanged copies of `exp_fig/figures/box-assembly-value-caching/outputs/{with_value_caching/recovery-N,without_value_caching/failure-N}.png`, for N = 1, 2, 3. Pair order follows the manuscript and source `data/selection.csv`; these are separate selected rollouts, not matched initial-condition trials. Recovery rates come from `tab:recovery_rate` in the same manuscript source.

The carousel supports native touch/trackpad scrolling, mouse dragging, previous/next buttons, three pagination buttons, and focused left/right/Home/End keys. Desktop 1440 px and mobile 390 px layout checks passed, as did mouse drag, touch-swipe simulation, buttons, keyboard, six image loads, and no page errors. The repository Astro build again stalled at startup and timed out after 30 seconds; this standalone page continues to run independently.

## Author and experiment revision

Author order and institutional superscripts follow the user's explicit list. Personal homepages verified on 2026-10-02: Wenye Yu (https://virlus.github.io/), Wendi Chen (https://wendichen.me/), Han Xue (https://hanxue.me/), Jun Lv (https://lyuj1998.github.io/), Cewu Lu (https://www.mvig.org/), Chuan Wen (https://alvinwen428.github.io/). Other authors retain the supplied OpenReview profile links; no personal homepage was verified. Yang Jin's ericjin2002.github.io root was a generic template, so it was not used as a personal homepage.

The qualitative section now has independent Box Assembly (3 pairs), Laundry Folding (3 pairs), and Magnetic Bus Assembly (2 pairs) rows, using the exact main-text/appendix figure selections. Explanatory paragraphs and recovery-rate table were removed from this section at the user's request.

The value-replacement section uses original source data retrieved read-only from yuwenye_h20_0. Case 04 = sample 16699, actor 7, batch row 11; case 07 = sample 27752, actor 5, batch row 8. Source case JSON files provide action_file and fk_file paths. NPZ ids and batch indices were cross-checked. Each displayed trace retains all 100 prediction points; XYZ meters are converted to centimeters. Gripper values use action channels 6 and 13 without rescaling. Plot axes use the paper manifest's limits and independent scales. These are recomputed predictions under fixed observations, not three observed physical executions. Frames use the exact original video timestamps from the paper manifest (-3, -2, -1, 0 seconds relative to the sample).

Plotly.js is vendored locally (MIT license header in assets/plotly.min.js); no experimental data is uploaded. Interactive 3D line API reference: https://plotly.com/javascript/3d-line-plots/ .

Final checks for this revision: 10 authors and superscripts verified in the live DOM; all 3 task carousels switch independently; 16 qualitative images decode; both replacement cases render; mouse dragging changes the 3D camera; case selection and condition toggles work; 390 px mobile viewport has no horizontal overflow. Browser console and asset checks passed without errors. The Codex in-app browser also confirmed both WebGL canvases loaded. Local server remains bound to 127.0.0.1:4322.

Author update: Wenye Yu, Yijin Chen, and Kaiyi Xiong share equal contribution (*). Cewu Lu and Chuan Wen are corresponding authors (†). Authors without a verified personal homepage are plain text, without OpenReview fallback links.

Experimental evidence expanded from `/Users/jason/Downloads/value_learning/VaM_submission/VaM_full_paper.pdf` (2026-10-06). Verified rendered pages 7, 15, 16 against Tables 1, 2, 4, 5, 6. Added value-expert replacement, all-LfE checkpoint aggregation, blinded event-level recovery with raw counts and episode budgets, and total wall-clock time. Percentage-point gains are distinguished from relative time reductions; SD is across checkpoints, not seeds. Existing qualitative rows remain concise.

Display simplified at user request: removed the all-LfE-checkpoint comparison, recovery raw-count/episode-budget panel, and total experimental-time table. Retained the main recovery-rate table and online/offline figures.

Removed the three headline metric cards at user request; experimental results now begin directly with the evidence.

## Warm-paper redesign (2026-10-09)
- ENPIRE reference: https://research.nvidia.com/labs/gear/enpire/ . Independently implemented fixed left contents navigation, mobile drawer, warm paper palette (#fdf9f1), larger dark text and local Source Serif 4. Removed former horizontal navigation. Full supplementary video now titled “Full demonstration”.
- Code: https://github.com/Virlus/vam . arXiv/Twitter remain unavailable placeholders until supplied.
- Logos downloaded from official institutional sites: SJTU https://global.sjtu.edu.cn/en/assets/images/logo_white_130.png ; SII https://www.sii.edu.cn/_upload/tpl/00/09/9/template9/images/logo.svg ; Noematrix https://www.noematrix.ai/en/image/common/logo.png . White SJTU lockup uses a red backing for contrast.
- Source Serif 4 Latin WOFF2 is locally stored under assets/fonts, with its OFL license. Font source: reference site's Source Serif 4 font; license: google/fonts ofl/sourceserif4/OFL.txt. The site makes no third-party asset requests at runtime.
- All three HTML tables replaced with original Matplotlib figures. Each reusable figure lives in figures/{online-success,value-sources,recovery-rate}/ with CSV, plotting script, STYLE.md and PNG/PDF exports. Matplotlib uses the shared paper environment exp_fig/.venvvisual.
- Colors from Wenye_ICLR2027/exp_fig/figures/online-rl-performance/plot.py: VaM #FACA66, no caching #E08E79, no warmup #02709D, RECAP #99B898. Value-source colors: original yellow #FACA66, demo green #99B898, post-warmup blue #02709D.
- Capped bars represent the original sample SD across final three checkpoints for success rates. Recovery rates are event-level fractions with no reported SD; no uncertainty is invented. Mobile chart exports stack the three task panels. Run plot.py --mobile for these exports.

Validation: desktop 1600px and mobile 390px have no page overflow; all three logos and local font load; zero HTML tables remain; all 33 plotted measurements preserve the source tables and required colors. Verified advancing cover autoplay, all three qualitative carousels, real 3D drag rotation, case switching and mobile drawer behavior; no page or HTTP errors. Private server remains bound to 127.0.0.1:4322.

Results restructure (2026-10-09): Value Caching contains Online RL performance, Combating partial observability, and Value source matters. Online RL system contains Closed-loop iterations and Asynchronous online training. Sidebar uses nested lists matching this hierarchy. The 3D case viewer is retained within Value source matters without an independent section heading/link; its colors also match the yellow/green/blue value-source plots. Removed Watch the full video. SJTU logo is the exact user-provided gstatic thumbnail, stored unchanged as assets/logos/sjtu-user.png. All new charts invoke an archived exact copy of the original paper offline-online-comparison create_figure function; differences are limited to series names, data/colors and the recovery-rate axis/absence of unsupported SD.

Expanded purpose and protocol text for the three Value Caching experiments from VaM_full_paper.pdf Sec. 4.1–4.3, Appendix B.1/B.3, and Appendix C/Figs. 10–11. Distinguishes training initialization and extra DAgger rounds, checkpoint-level success-rate SD, blinded event-level recovery, and fixed-input predicted action comparisons. Does not reintroduce raw event-count or evaluation-budget panels.

## Wi-Fi preview (2026-10-10)

User-authorized LAN sharing: `LAN_HOST=$(ipconfig getifaddr en0) node vam/preview.mjs` listens on the Wi-Fi IPv4 address as well as localhost. Without LAN_HOST, the default remains localhost-only. Current LAN URL: http://10.128.0.189:4322/vam/ . No public deployment or router forwarding is configured.
