export type AgeGroup = "4-6" | "7-9" | "10-12";

export interface DifficultyConfig {
  label: string;
  emoji: string;
  color: string;
  mathRange: { min: number; max: number };
  mathOperations: ("add" | "subtract" | "multiply" | "divide")[];
  readingPassages: ReadingPassage[];
  typingWords: string[];
  typingSentences: string[];
}

export interface ReadingPassage {
  title: string;
  text: string;
  questions: { question: string; options: string[]; answer: number }[];
}

export const DIFFICULTY_CONFIGS: Record<AgeGroup, DifficultyConfig> = {
  "4-6": {
    label: "Little Helper",
    emoji: "🌟",
    color: "kid-green",
    mathRange: { min: 1, max: 10 },
    mathOperations: ["add", "subtract"],
    readingPassages: [
      {
        title: "The Happy Cat",
        text: "Cat has a red ball. Cat plays with the ball. Cat is happy! The ball is big and red. Cat runs with the ball all day.",
        questions: [
          {
            question: "What color is the ball?",
            options: ["Blue", "Red", "Green"],
            answer: 1,
          },
          {
            question: "How does Cat feel?",
            options: ["Sad", "Angry", "Happy"],
            answer: 2,
          },
          {
            question: "What does Cat play with?",
            options: ["A ball", "A car", "A book"],
            answer: 0,
          },
        ],
      },
      {
        title: "My Big Dog",
        text: "I have a big dog. My dog is brown. My dog likes to run. We run in the park. My dog is my best friend!",
        questions: [
          {
            question: "What color is the dog?",
            options: ["Brown", "White", "Black"],
            answer: 0,
          },
          {
            question: "Where do they run?",
            options: ["At home", "In the park", "At school"],
            answer: 1,
          },
          {
            question: "What is the dog to the child?",
            options: ["A stranger", "A best friend", "A teacher"],
            answer: 1,
          },
        ],
      },
    ],
    typingWords: ["cat", "dog", "sun", "big", "red", "run", "fun", "hat", "box", "toy"],
    typingSentences: [
      "I like to play.",
      "The cat is big.",
      "My dog can run.",
    ],
  },
  "7-9": {
    label: "Junior Employee",
    emoji: "🚀",
    color: "kid-blue",
    mathRange: { min: 1, max: 100 },
    mathOperations: ["add", "subtract", "multiply"],
    readingPassages: [
      {
        title: "The Treehouse Adventure",
        text: "Emma and Jake wanted to build a treehouse. They found a big oak tree in their backyard. Their dad helped them hammer the wood together. It took three days to finish. They painted it blue and added a small window. Now they play in it every weekend and invite their friends over for snacks and stories.",
        questions: [
          {
            question: "What kind of tree did they find?",
            options: ["Pine tree", "Oak tree", "Maple tree"],
            answer: 1,
          },
          {
            question: "How long did it take to build?",
            options: ["One day", "Two days", "Three days"],
            answer: 2,
          },
          {
            question: "What color did they paint it?",
            options: ["Blue", "Green", "Red"],
            answer: 0,
          },
          {
            question: "Who helped them build it?",
            options: ["Their mom", "Their dad", "Their teacher"],
            answer: 1,
          },
        ],
      },
      {
        title: "The Science Fair",
        text: "Maria was excited about the science fair. She decided to make a volcano using baking soda and vinegar. She built a paper mache mountain and painted it to look real. On the day of the fair, she poured the vinegar in and the volcano erupted with bubbly foam! Everyone clapped and she won first place. Her teacher gave her a blue ribbon.",
        questions: [
          {
            question: "What did Maria make for the science fair?",
            options: ["A robot", "A volcano", "A rocket"],
            answer: 1,
          },
          {
            question: "What did she use to make the eruption?",
            options: ["Baking soda and vinegar", "Water and soap", "Sand and glue"],
            answer: 0,
          },
          {
            question: "What place did she win?",
            options: ["Second place", "Third place", "First place"],
            answer: 2,
          },
          {
            question: "What did her teacher give her?",
            options: ["A gold medal", "A blue ribbon", "A certificate"],
            answer: 1,
          },
        ],
      },
    ],
    typingWords: ["school", "friend", "computer", "science", "reading", "pencil", "teacher", "library", "number", "puzzle"],
    typingSentences: [
      "The quick brown fox jumps.",
      "I love to read books every day.",
      "Science is my favorite subject in school.",
    ],
  },
  "10-12": {
    label: "Senior Associate",
    emoji: "💼",
    color: "kid-purple",
    mathRange: { min: 10, max: 500 },
    mathOperations: ["add", "subtract", "multiply", "divide"],
    readingPassages: [
      {
        title: "The Underground Railroad",
        text: "The Underground Railroad was not actually a railroad underground. It was a secret network of people who helped enslaved individuals escape to freedom in the 1800s. Brave individuals called 'conductors' guided escaped individuals from safe house to safe house, often traveling at night to avoid detection. Harriet Tubman was one of the most famous conductors, making approximately thirteen missions to rescue around seventy people. The journey was dangerous and required tremendous courage from everyone involved.",
        questions: [
          {
            question: "What was the Underground Railroad?",
            options: ["A real train underground", "A secret network helping people escape", "A mining tunnel system"],
            answer: 1,
          },
          {
            question: "What were the guides called?",
            options: ["Drivers", "Conductors", "Pilots"],
            answer: 1,
          },
          {
            question: "How many missions did Harriet Tubman make?",
            options: ["About 5", "About 13", "About 30"],
            answer: 1,
          },
          {
            question: "When did the Underground Railroad operate?",
            options: ["The 1700s", "The 1800s", "The 1900s"],
            answer: 1,
          },
          {
            question: "Why did they often travel at night?",
            options: ["It was cooler", "To avoid detection", "They preferred darkness"],
            answer: 1,
          },
        ],
      },
      {
        title: "How Computers Work",
        text: "Computers process information using binary code, which consists of only two digits: 0 and 1. Every letter you type, every image you see, and every sound you hear on a computer is ultimately stored as a series of zeros and ones. The central processing unit, or CPU, acts as the brain of the computer, executing instructions at incredible speeds. Modern CPUs can perform billions of operations per second. Memory, or RAM, temporarily stores data that the CPU needs to access quickly, while storage drives like SSDs keep data permanently even when the computer is turned off.",
        questions: [
          {
            question: "What two digits make up binary code?",
            options: ["1 and 2", "0 and 1", "0 and 9"],
            answer: 1,
          },
          {
            question: "What acts as the brain of the computer?",
            options: ["The RAM", "The CPU", "The SSD"],
            answer: 1,
          },
          {
            question: "What does RAM do?",
            options: ["Stores data permanently", "Temporarily stores data for quick access", "Displays images on screen"],
            answer: 1,
          },
          {
            question: "How many operations can modern CPUs perform?",
            options: ["Millions per second", "Billions per second", "Thousands per second"],
            answer: 1,
          },
          {
            question: "What keeps data when the computer is off?",
            options: ["RAM", "Storage drives (SSDs)", "The CPU"],
            answer: 1,
          },
        ],
      },
    ],
    typingWords: ["important", "knowledge", "technology", "education", "opportunity", "development", "communication", "responsibility", "achievement", "collaboration"],
    typingSentences: [
      "The important thing is to never stop learning new things.",
      "Technology has changed the way we communicate with each other.",
      "Taking responsibility for your actions shows great character and maturity.",
    ],
  },
};

export function generateMathProblem(config: DifficultyConfig): {
  question: string;
  answer: number;
  options: number[];
} {
  const { min, max } = config.mathRange;
  const ops = config.mathOperations;
  const op = ops[Math.floor(Math.random() * ops.length)];
  let a: number, b: number, answer: number, question: string;

  switch (op) {
    case "add":
      a = Math.floor(Math.random() * (max - min + 1)) + min;
      b = Math.floor(Math.random() * (max - min + 1)) + min;
      answer = a + b;
      question = `${a} + ${b}`;
      break;
    case "subtract":
      a = Math.floor(Math.random() * (max - min + 1)) + min;
      b = Math.floor(Math.random() * (a - min + 1)) + min;
      answer = a - b;
      question = `${a} - ${b}`;
      break;
    case "multiply":
      if (config.mathRange.max <= 10) {
        a = Math.floor(Math.random() * 10) + 1;
        b = Math.floor(Math.random() * 10) + 1;
      } else {
        a = Math.floor(Math.random() * 12) + 2;
        b = Math.floor(Math.random() * 12) + 2;
      }
      answer = a * b;
      question = `${a} × ${b}`;
      break;
    case "divide":
      b = Math.floor(Math.random() * 11) + 2;
      answer = Math.floor(Math.random() * 12) + 1;
      a = b * answer;
      question = `${a} ÷ ${b}`;
      break;
  }

  const options = new Set<number>([answer]);
  while (options.size < 4) {
    const variance = Math.max(2, Math.floor(answer * 0.3));
    const wrong = answer + Math.floor(Math.random() * (variance * 2 + 1)) - variance;
    if (wrong >= 0 && wrong !== answer) {
      options.add(wrong);
    }
  }

  const shuffled = Array.from(options).sort(() => Math.random() - 0.5);
  return { question, answer, options: shuffled };
}

export const STICKERS = [
  "⭐", "🌟", "🏆", "🎖️", "🌈", "🎈", "🎨", "🚀",
  "📚", "✏️", "🔢", "⌨️", "🧠", "💡", "🎯", "👑",
  "🦄", "🐙", "🦋", "🌸", "🍎", "🍕", "🍦", "🎁",
];

export function getRandomSticker(): string {
  return STICKERS[Math.floor(Math.random() * STICKERS.length)];
}
