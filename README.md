# Kids Desk Job 🏢

An interactive educational game where kids work at their very own office desk, completing tasks that teach math, reading, and typing skills!

## Features

- **Office Worker Theme** - Kids sit at an animated desk with a computer, phone, plant, coffee mug, and more
- **Three Age Groups** - Content scales for ages 4-6, 7-9, and 10-12
- **Math Missions** - Addition, subtraction, multiplication, and division with multiple choice answers
- **Reading Reports** - Age-appropriate passages with comprehension questions
- **Typing Tasks** - Word and sentence typing practice with real-time character feedback
- **Sticker Collection** - Kids earn stickers for completing tasks, displayed in a popup board
- **Star Rewards** - Earn stars based on performance (1-3 stars per task)
- **Animations Everywhere** - Framer Motion animations, confetti celebrations, floating elements, and more!

## Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS** (custom kid-friendly theme)
- **Framer Motion** (animations)
- **canvas-confetti** (celebration effects)
- **Lucide React** (icons)

## Getting Started

### Prerequisites

- Node.js 18+ installed

### Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Vercel will auto-detect Next.js and deploy automatically

Or use the Vercel CLI:
```bash
npm i -g vercel
vercel
```

## How to Play

1. Enter your name on the welcome screen
2. Choose your age group (Little Helper, Junior Employee, or Senior Associate)
3. You'll see your desk with three tasks: Math, Reading, and Typing
4. Click any task to start
5. Complete tasks to earn stars and stickers
6. Check your sticker collection by clicking the pink button in the bottom right

## Project Structure

```
├── app/
│   ├── globals.css       # Global styles + Tailwind
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main game controller
├── components/
│   ├── DeskScene.tsx         # Animated office desk
│   ├── DifficultySelector.tsx # Age group selection
│   ├── MathTask.tsx          # Math problems
│   ├── ReadingTask.tsx       # Reading comprehension
│   ├── TypingTask.tsx        # Typing practice
│   └── StickerBoard.tsx      # Sticker collection popup
├── lib/
│   └── gameData.ts       # Difficulty configs, math generator, stickers
└── package.json
```
