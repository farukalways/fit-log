<div align="center">

# 🏋️ FitLog — Workout Library

**Train with intent. Log every set.**

A dark, no-nonsense gym companion where you browse a library of lifts, lock
them into today's plan, and watch the week's work add up.


</div>

---

## 📖 Description

FitLog is a workout library and daily planner. Pick a lift from the library,
open its detail page for full instructions and specs, then either **add it
to today's plan** or **save it for later**. A live dashboard on the **My
Plan** page tracks how many exercises, minutes, and calories you've queued
up for the day — all persisted locally, so your plan survives a page
reload.

---

## 🛠️ Technologies Used

| Technology | Purpose |
| --- | --- |
| **Next.js (App Router)** | Routing, layouts, and static generation |
| **TypeScript** | End-to-end type safety |
| **Tailwind CSS v4** | Styling, theming, and responsive layout |
| **React Context + localStorage** | Client-side plan/saved state that persists across reloads |

---

## ✨ Key Features

1. ** Workout Library Grid** — 12 lifts as cards with category tags,
   equipment, duration, calories, and rating, sortable by *Duration*,
   *Calories*, or *Rating* via the Sort By dropdown.
2. ** Detailed Workout Pages** — a full spec sheet (equipment, difficulty,
   sets, reps, duration, calories, rating) plus numbered step-by-step
   instructions, statically pre-rendered per workout so a hard reload never
   errors.
3. ** Today's Plan & Saved, with a 5-Lift Cap** — add a lift to today's plan
   or save it for later from any detail page, with instant toast
   confirmations and a live navbar badge count.
4. ** My Plan Dashboard** — a live Exercises / Minutes / Calories summary,
   tabs for *Today's Plan* vs. *Saved*, search by name or tag, mark-as-done
   and remove actions, and a guided empty state.
5. ** Fully Responsive & Resilient** — the grid, navbar, and plan collapse
   cleanly from desktop to mobile, plan/saved state survives a reload via
   `localStorage`, and a custom 404 page handles unknown routes.

---

## 🚀 Getting Started

```bash
# clone repositorie
git clone https://github.com/farukalways/fit-log.git

# install dependencies
npm install

# run the dev server
npm run dev
```

Open [fit log](https://fit-log-five-beige.vercel.app/) to view it.


---

<div align="center">

© 2026 FitLog — Workout Library. Train hard, log honest.

</div>