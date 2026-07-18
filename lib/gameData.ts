export type AgeGroup = "4-6" | "7-9" | "10-12";

export interface DifficultyConfig {
  label: string;
  emoji: string;
  color: string;
  mathRange: { min: number; max: number };
  mathOperations: ("add" | "subtract" | "multiply" | "divide")[];
  readingPassages: ReadingPassage[];
  emailConversations: EmailConversation[];
}

export interface ReadingPassage {
  title: string;
  text: string;
  questions: { question: string; options: string[]; answer: number }[];
}

export interface EmailTemplate {
  to: string;
  subject: string;
  body: string;
}

export interface Coworker {
  name: string;
  role: string;
  avatar: string;
  goodReply: string;
  badReply: string;
}

export interface EmailConversation {
  coworker: Coworker;
  subject: string;
  userTemplate: string;
  coworkerReply: string;
  userReplyTemplate: string;
  coworkerFinalReply: string;
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
          { question: "What color is the ball?", options: ["Blue", "Red", "Green"], answer: 1 },
          { question: "How does Cat feel?", options: ["Sad", "Angry", "Happy"], answer: 2 },
          { question: "What does Cat play with?", options: ["A ball", "A car", "A book"], answer: 0 },
        ],
      },
      {
        title: "My Big Dog",
        text: "I have a big dog. My dog is brown. My dog likes to run. We run in the park. My dog is my best friend!",
        questions: [
          { question: "What color is the dog?", options: ["Brown", "White", "Black"], answer: 0 },
          { question: "Where do they run?", options: ["At home", "In the park", "At school"], answer: 1 },
          { question: "What is the dog to the child?", options: ["A stranger", "A best friend", "A teacher"], answer: 1 },
        ],
      },
      {
        title: "The Busy Bee",
        text: "Bee lives in a garden with many flowers. Bee visits red flowers and blue flowers. Bee makes honey from the flowers. Bee works hard every day. Bee is a good helper in the garden!",
        questions: [
          { question: "Where does Bee live?", options: ["In a house", "In a garden", "In a tree"], answer: 1 },
          { question: "What does Bee make?", options: ["Milk", "Honey", "Bread"], answer: 1 },
          { question: "What color flowers does Bee visit?", options: ["Red and blue", "Green and yellow", "Pink and purple"], answer: 0 },
        ],
      },
    ],
    emailConversations: [
      {
        coworker: {
          name: "Mr. Boss",
          role: "The Boss",
          avatar: "👨\u200d💼",
          goodReply: "Great job today! I am glad you did your work. Keep it up! See you tomorrow.",
          badReply: "Hmm, I could not read your email. How many cups of milk have you had today? Please try again!",
        },
        subject: "My Work Today",
        userTemplate: "Hi Boss. I did my work today. I read a book. I did my math. It was fun. From, me.",
        coworkerReply: "That is great! What book did you read? I love books too!",
        userReplyTemplate: "I read a book about cats. It was a fun book. I like cats. From, me.",
        coworkerFinalReply: "Cats are awesome! Thank you for telling me. Have a great day!",
      },
      {
        coworker: {
          name: "Ms. Smith",
          role: "Office Helper",
          avatar: "👩\u200d🏫",
          goodReply: "Hello! It is nice to hear from you. I am glad you like your desk. Welcome to the team!",
          badReply: "Oh no! Your email is hard to read. Do you have a pet dinosaur at home? Please fix your spelling and send again!",
        },
        subject: "Hello!",
        userTemplate: "Hi Ms. Smith. I am at my desk. I like to work here. The work is fun. Thank you. From, me.",
        coworkerReply: "You are welcome! What is your favorite thing to do at work?",
        userReplyTemplate: "I like to read and do math. Math is my favorite. It is fun. From, me.",
        coworkerFinalReply: "Math is my favorite too! You are doing a great job. Keep learning!",
      },
      {
        coworker: {
          name: "Mr. Tom",
          role: "Mail Room",
          avatar: "📬",
          goodReply: "Hi there! It sounds like you had a great day! I am happy for you. See you soon!",
          badReply: "Wait, what? I think a monkey ate your email! How many bananas do you have? Please check your spelling and try again!",
        },
        subject: "My Day",
        userTemplate: "Hi Mr. Tom. I had a good day. I did all my jobs. I like my desk. It is a good day. From, me.",
        coworkerReply: "That is wonderful! What was your favorite job today?",
        userReplyTemplate: "My favorite job was reading. I read a big book. It was about a dog. From, me.",
        coworkerFinalReply: "A book about a dog sounds great! Thank you for sharing. See you tomorrow!",
      },
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
          { question: "What kind of tree did they find?", options: ["Pine tree", "Oak tree", "Maple tree"], answer: 1 },
          { question: "How long did it take to build?", options: ["One day", "Two days", "Three days"], answer: 2 },
          { question: "What color did they paint it?", options: ["Blue", "Green", "Red"], answer: 0 },
          { question: "Who helped them build it?", options: ["Their mom", "Their dad", "Their teacher"], answer: 1 },
        ],
      },
      {
        title: "The Science Fair",
        text: "Maria was excited about the science fair. She decided to make a volcano using baking soda and vinegar. She built a paper mache mountain and painted it to look real. On the day of the fair, she poured the vinegar in and the volcano erupted with bubbly foam! Everyone clapped and she won first place. Her teacher gave her a blue ribbon.",
        questions: [
          { question: "What did Maria make for the science fair?", options: ["A robot", "A volcano", "A rocket"], answer: 1 },
          { question: "What did she use to make the eruption?", options: ["Baking soda and vinegar", "Water and soap", "Sand and glue"], answer: 0 },
          { question: "What place did she win?", options: ["Second place", "Third place", "First place"], answer: 2 },
          { question: "What did her teacher give her?", options: ["A gold medal", "A blue ribbon", "A certificate"], answer: 1 },
        ],
      },
      {
        title: "The Lost Puppy",
        text: "One rainy afternoon, Lily heard a small whimper outside her door. She opened it and found a wet, shivering puppy huddled on the porch. Lily brought the puppy inside and wrapped it in a warm towel. She gave it food and water. The puppy wagged its tail happily. Lily named the puppy Rain. Her parents said they could keep the puppy if Lily took care of it. Lily was thrilled and promised to feed, walk, and love Rain every single day.",
        questions: [
          { question: "What was the weather like?", options: ["Sunny", "Rainy", "Snowy"], answer: 1 },
          { question: "What did Lily name the puppy?", options: ["Sunny", "Rain", "Cloud"], answer: 1 },
          { question: "What did Lily give the puppy first?", options: ["Food and water", "A toy", "A bath"], answer: 0 },
          { question: "What did Lily promise to do?", options: ["Feed, walk, and love Rain", "Do her homework", "Clean her room"], answer: 0 },
        ],
      },
    ],
    emailConversations: [
      {
        coworker: {
          name: "Mr. Johnson",
          role: "Project Manager",
          avatar: "🧑\u200d💼",
          goodReply: "Hi Alex! Great work on the project. It sounds like you learned a lot. I am proud of you. Keep up the good work!",
          badReply: "I had trouble understanding your email. Do you like eating pizza with pineapple? Please check your spelling and send it again!",
        },
        subject: "Project Update",
        userTemplate: "Dear Mr. Johnson. I finished my project today. I read two books and solved five math problems. The science fair was very exciting. I learned a lot this week. Thank you for your help. Best regards, Alex.",
        coworkerReply: "That is wonderful, Alex! What was your favorite part of the science fair?",
        userReplyTemplate: "My favorite part was the volcano. It erupted with bubbles. Everyone clapped. It was the best. Best regards, Alex.",
        coworkerFinalReply: "The volcano sounds amazing! You should be very proud. See you next week!",
      },
      {
        coworker: {
          name: "Ms. Garcia",
          role: "Team Leader",
          avatar: "👩\u200d💼",
          goodReply: "Hi Sam! Thank you for the meeting notes. It sounds like the team is doing great. I look forward to reading your report on Friday!",
          badReply: "Oh dear, I could not understand your email at all. Is your favorite color purple? Please proofread your email and try again!",
        },
        subject: "Meeting Notes",
        userTemplate: "Dear Ms. Garcia. Here are my notes from the meeting today. We talked about the new project. I will finish my report by Friday. The team is doing a great job. Thank you. Sincerely, Sam.",
        coworkerReply: "Thank you, Sam! Can you tell me more about the new project?",
        userReplyTemplate: "The new project is about animals. We will learn about habitats. I want to study penguins. It will be fun. Sincerely, Sam.",
        coworkerFinalReply: "Penguins are fascinating! I cannot wait to see your report. Great job, Sam!",
      },
      {
        coworker: {
          name: "Mrs. Lee",
          role: "Field Trip Coordinator",
          avatar: "🧑\u200d🏫",
          goodReply: "Hi Jordan! I am so glad you are excited about the museum trip. It will be a wonderful adventure. Do not forget your notebook!",
          badReply: "Hmm, I think a cat walked across your keyboard! Do you have a pet cat? Please fix your spelling and send your email again!",
        },
        subject: "Field Trip",
        userTemplate: "Dear Mrs. Lee. I am writing about the field trip next week. I am very excited to visit the museum. I will bring my lunch and a notebook. I will take notes on what I see. Thank you for planning this trip. Sincerely, Jordan.",
        coworkerReply: "You are very welcome, Jordan! What are you most excited to see at the museum?",
        userReplyTemplate: "I want to see the dinosaurs. I love dinosaurs. They are so big. I will draw pictures of them. Sincerely, Jordan.",
        coworkerFinalReply: "Dinosaurs are amazing! I hope you find some big ones. Have a wonderful trip, Jordan!",
      },
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
          { question: "What was the Underground Railroad?", options: ["A real train underground", "A secret network helping people escape", "A mining tunnel system"], answer: 1 },
          { question: "What were the guides called?", options: ["Drivers", "Conductors", "Pilots"], answer: 1 },
          { question: "How many missions did Harriet Tubman make?", options: ["About 5", "About 13", "About 30"], answer: 1 },
          { question: "When did the Underground Railroad operate?", options: ["The 1700s", "The 1800s", "The 1900s"], answer: 1 },
          { question: "Why did they often travel at night?", options: ["It was cooler", "To avoid detection", "They preferred darkness"], answer: 1 },
        ],
      },
      {
        title: "How Computers Work",
        text: "Computers process information using binary code, which consists of only two digits: 0 and 1. Every letter you type, every image you see, and every sound you hear on a computer is ultimately stored as a series of zeros and ones. The central processing unit, or CPU, acts as the brain of the computer, executing instructions at incredible speeds. Modern CPUs can perform billions of operations per second. Memory, or RAM, temporarily stores data that the CPU needs to access quickly, while storage drives like SSDs keep data permanently even when the computer is turned off.",
        questions: [
          { question: "What two digits make up binary code?", options: ["1 and 2", "0 and 1", "0 and 9"], answer: 1 },
          { question: "What acts as the brain of the computer?", options: ["The RAM", "The CPU", "The SSD"], answer: 1 },
          { question: "What does RAM do?", options: ["Stores data permanently", "Temporarily stores data for quick access", "Displays images on screen"], answer: 1 },
          { question: "How many operations can modern CPUs perform?", options: ["Millions per second", "Billions per second", "Thousands per second"], answer: 1 },
          { question: "What keeps data when the computer is off?", options: ["RAM", "Storage drives (SSDs)", "The CPU"], answer: 1 },
        ],
      },
      {
        title: "The Solar System",
        text: "Our solar system has eight planets that orbit around the Sun. The four inner planets are Mercury, Venus, Earth, and Mars. These are rocky planets with solid surfaces. The four outer planets are Jupiter, Saturn, Uranus, and Neptune. These are gas giants made mostly of hydrogen and helium. Jupiter is the largest planet in our solar system, so massive that all the other planets could fit inside it. Saturn is famous for its beautiful rings made of ice and rock particles. Earth is the only planet known to have life, with oceans covering about seventy percent of its surface.",
        questions: [
          { question: "How many planets are in our solar system?", options: ["Seven", "Eight", "Nine"], answer: 1 },
          { question: "Which is the largest planet?", options: ["Earth", "Saturn", "Jupiter"], answer: 2 },
          { question: "What are Saturn's rings made of?", options: ["Ice and rock particles", "Gas and dust", "Metal and glass"], answer: 0 },
          { question: "What percentage of Earth is covered by oceans?", options: ["About 50%", "About 70%", "About 90%"], answer: 1 },
          { question: "Which planet is known to have life?", options: ["Mars", "Earth", "Venus"], answer: 1 },
        ],
      },
    ],
    emailConversations: [
      {
        coworker: {
          name: "Dr. Williams",
          role: "Department Head",
          avatar: "🧑\u200d🔬",
          goodReply: "Dear Jordan, thank you for the detailed weekly report. I am impressed with your productivity and teamwork. Your dedication is commendable. Keep up the excellent work!",
          badReply: "I received your email but it was unreadable. Do you prefer pancakes or waffles? Please proofread your message carefully and resend it!",
        },
        subject: "Weekly Report",
        userTemplate: "Dear Dr. Williams. I am writing to share my weekly report with you. This week I completed three assignments and helped two coworkers with their projects. I also attended the team meeting on Wednesday. I believe we are making excellent progress on the current assignment. Thank you for your continued support and guidance. Sincerely, Jordan.",
        coworkerReply: "Thank you, Jordan. I am curious, which assignment did you find most challenging this week?",
        userReplyTemplate: "Dear Dr. Williams. The most challenging assignment was the research presentation. I had to gather a lot of information and organize it clearly. However, I learned a great deal from the process. Sincerely, Jordan.",
        coworkerFinalReply: "That is excellent insight, Jordan. Challenging work helps us grow the most. I look forward to your next report!",
      },
      {
        coworker: {
          name: "Mr. Thompson",
          role: "Team Supervisor",
          avatar: "👨\u200d💻",
          goodReply: "Hi Taylor, thank you for following up on the presentation. I am glad you are implementing the feedback. I look forward to seeing the updated version on Tuesday!",
          badReply: "Your email was difficult to understand. Do you think fish can swim backwards? Please check your spelling and grammar, then try again!",
        },
        subject: "Presentation Feedback",
        userTemplate: "Dear Mr. Thompson. Thank you for the opportunity to present my project to the team yesterday. I appreciated the feedback everyone provided. I have already started implementing the suggestions about improving the design. I will send the updated version by next Tuesday. Please let me know if you need anything else. Best regards, Taylor.",
        coworkerReply: "You are very welcome, Taylor. What specific design improvements are you working on?",
        userReplyTemplate: "Dear Mr. Thompson. I am improving the color scheme and making the text easier to read. I am also adding more pictures to make it more engaging. The team suggested these changes and I agree. Best regards, Taylor.",
        coworkerFinalReply: "Those sound like excellent improvements, Taylor. The presentation will be much stronger. Great work!",
      },
      {
        coworker: {
          name: "Ms. Patel",
          role: "Research Director",
          avatar: "👩\u200d🔬",
          goodReply: "Dear Morgan, thank you for sharing your research summary. Your findings on renewable energy are insightful. I appreciate your thorough analysis. I will review the full report shortly.",
          badReply: "I could not make sense of your email. Have you ever tried to juggle oranges? Please proofread your work carefully and resend!",
        },
        subject: "Research Summary",
        userTemplate: "Dear Ms. Patel. I have completed my research on renewable energy sources. Solar and wind power are becoming more affordable each year. Many countries are investing heavily in these technologies. I believe this transition will create numerous job opportunities. I have attached my full report for your review. Sincerely, Morgan.",
        coworkerReply: "Excellent work, Morgan. Which renewable energy source do you think is most promising for the future?",
        userReplyTemplate: "Dear Ms. Patel. I believe solar power is the most promising because the sun is available everywhere. The technology is improving rapidly and costs continue to decrease. Wind power is also excellent but requires specific locations. Sincerely, Morgan.",
        coworkerFinalReply: "I completely agree with your analysis, Morgan. Solar power has tremendous potential. Thank you for your excellent research!",
      },
    ],
  },
};

export const ENCOURAGEMENTS = [
  "Awesome!", "Great job!", "You're a star!", "Fantastic!", "Way to go!",
  "Super!", "Amazing!", "You did it!", "Brilliant!", "Keep it up!",
  "Wonderful!", "You're so smart!", "Perfect!", "Excellent!", "Outstanding!",
];

export function getRandomEncouragement(): string {
  return ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
}

export function generateMathProblem(config: DifficultyConfig): {
  question: string;
  answer: number;
  options: number[];
  operation: string;
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
      } else if (config.mathRange.max <= 100) {
        a = Math.floor(Math.random() * 12) + 2;
        b = Math.floor(Math.random() * 12) + 2;
      } else {
        a = Math.floor(Math.random() * 20) + 6;
        b = Math.floor(Math.random() * 15) + 3;
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
  let attempts = 0;
  while (options.size < 4 && attempts < 100) {
    const variance = Math.max(2, Math.floor(answer * 0.3));
    const wrong = answer + Math.floor(Math.random() * (variance * 2 + 1)) - variance;
    if (wrong >= 0 && wrong !== answer) {
      options.add(wrong);
    }
    attempts++;
  }
  while (options.size < 4) {
    const wrong = answer + options.size + 1;
    options.add(wrong);
  }

  const shuffled = Array.from(options).sort(() => Math.random() - 0.5);
  return { question, answer, options: shuffled, operation: op };
}

export const STICKERS = [
  "⭐", "🌟", "🏆", "🎖️", "🌈", "🎈", "🎨", "🚀",
  "📚", "✏️", "🔢", "⌨️", "🧠", "💡", "🎯", "👑",
  "🦄", "🐙", "🦋", "🌸", "🍎", "🍕", "🍦", "🎁",
  "🐱", "🐶", "🦊", "🐼", "🐨", "🦁", "🐸", "🐧",
];

export function getRandomSticker(): string {
  return STICKERS[Math.floor(Math.random() * STICKERS.length)];
}

export interface DeskDecoration {
  id: string;
  name: string;
  emoji: string;
  cost: number;
  description: string;
}

export const DESK_DECORATIONS: DeskDecoration[] = [
  { id: "plant", name: "Desk Plant", emoji: "🪴", cost: 3, description: "A leafy green friend" },
  { id: "lamp", name: "Desk Lamp", emoji: "💡", cost: 5, description: "Brighten up your desk" },
  { id: "calendar", name: "Wall Calendar", emoji: "📅", cost: 5, description: "Stay organized" },
  { id: "coffee", name: "Coffee Mug", emoji: "☕", cost: 3, description: "For productive mornings" },
  { id: "fish", name: "Fish Tank", emoji: "🐠", cost: 10, description: "A swimming buddy" },
  { id: "trophy", name: "Trophy", emoji: "🏆", cost: 15, description: "Show off your achievements" },
  { id: "clock", name: "Fancy Clock", emoji: "⏰", cost: 7, description: "Never lose track of time" },
  { id: "globe", name: "Desk Globe", emoji: "🌍", cost: 8, description: "Explore the world" },
  { id: "headphones", name: "Headphones", emoji: "🎧", cost: 6, description: "Listen to music while working" },
  { id: "picture", name: "Picture Frame", emoji: "🖼️", cost: 6, description: "A photo of loved ones" },
  { id: "robot", name: "Desk Robot", emoji: "🤖", cost: 20, description: "Your personal assistant" },
  { id: "rocket", name: "Mini Rocket", emoji: "🚀", cost: 12, description: "Reach for the stars!" },
];

export interface AchievementBadge {
  id: string;
  name: string;
  emoji: string;
  description: string;
  check: (stats: AchievementStats) => boolean;
}

export interface AchievementStats {
  totalStars: number;
  tasksCompleted: number;
  mathCompleted: number;
  readingCompleted: number;
  typingCompleted: number;
  spellingCompleted: number;
  logicCompleted: number;
  perfectScores: number;
  streak: number;
  stickersCollected: number;
}

export const ACHIEVEMENTS: AchievementBadge[] = [
  { id: "first_star", name: "First Star", emoji: "⭐", description: "Earn your first star", check: (s) => s.totalStars >= 1 },
  { id: "ten_stars", name: "Rising Star", emoji: "🌟", description: "Earn 10 stars", check: (s) => s.totalStars >= 10 },
  { id: "fifty_stars", name: "Superstar", emoji: "✨", description: "Earn 50 stars", check: (s) => s.totalStars >= 50 },
  { id: "first_task", name: "Getting Started", emoji: "🎯", description: "Complete your first task", check: (s) => s.tasksCompleted >= 1 },
  { id: "ten_tasks", name: "Hard Worker", emoji: "💪", description: "Complete 10 tasks", check: (s) => s.tasksCompleted >= 10 },
  { id: "math_whiz", name: "Math Whiz", emoji: "🔢", description: "Complete 5 math tasks", check: (s) => s.mathCompleted >= 5 },
  { id: "bookworm", name: "Bookworm", emoji: "📚", description: "Complete 5 reading tasks", check: (s) => s.readingCompleted >= 5 },
  { id: "typist", name: "Email Pro", emoji: "⌨️", description: "Complete 5 typing tasks", check: (s) => s.typingCompleted >= 5 },
  { id: "perfect", name: "Perfectionist", emoji: "💯", description: "Get 3 perfect scores", check: (s) => s.perfectScores >= 3 },
  { id: "streak3", name: "On Fire", emoji: "🔥", description: "3-day streak", check: (s) => s.streak >= 3 },
  { id: "streak7", name: "Unstoppable", emoji: "⚡", description: "7-day streak", check: (s) => s.streak >= 7 },
  { id: "collector", name: "Collector", emoji: "🎨", description: "Collect 10 stickers", check: (s) => s.stickersCollected >= 10 },
  { id: "speller", name: "Word Master", emoji: "📝", description: "Complete 5 spelling tasks", check: (s) => s.spellingCompleted >= 5 },
  { id: "logician", name: "Logic Pro", emoji: "🧩", description: "Complete 5 logic tasks", check: (s) => s.logicCompleted >= 5 },
];

export function getTodayString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function isDailyChallengeAvailable(lastChallengeDate: string | null): boolean {
  if (!lastChallengeDate) return true;
  const today = getTodayString();
  return lastChallengeDate !== today;
}

export function calculateStreak(lastChallengeDate: string | null, streak: number): number {
  if (!lastChallengeDate) return 0;
  const today = getTodayString();
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = `${yesterdayDate.getFullYear()}-${String(yesterdayDate.getMonth() + 1).padStart(2, "0")}-${String(yesterdayDate.getDate()).padStart(2, "0")}`;
  if (lastChallengeDate === today) return streak;
  if (lastChallengeDate === yesterday) return streak;
  return 0;
}

// ==================== SPELLING / VOCABULARY ====================

export interface SpellingWord {
  word: string;
  scrambled: string;
  hint: string;
  definition: string;
}

export interface FillInBlank {
  sentence: string;
  blankedWord: string;
  options: string[];
  answer: number;
}

export const SPELLING_WORDS: Record<AgeGroup, SpellingWord[]> = {
  "4-6": [
    { word: "cat", scrambled: "tac", hint: "A furry pet that meows", definition: "A small furry pet" },
    { word: "dog", scrambled: "ogd", hint: "A pet that barks", definition: "A pet that barks and wags its tail" },
    { word: "sun", scrambled: "nus", hint: "Bright in the sky", definition: "The bright star in the sky during day" },
    { word: "hat", scrambled: "ath", hint: "You wear it on your head", definition: "Something you wear on your head" },
    { word: "box", scrambled: "oxb", hint: "You put things in it", definition: "A container with four sides" },
    { word: "red", scrambled: "erd", hint: "A color like an apple", definition: "The color of an apple" },
    { word: "big", scrambled: "igb", hint: "Not small", definition: "The opposite of small" },
    { word: "run", scrambled: "unr", hint: "Moving fast on your feet", definition: "To move fast on your feet" },
  ],
  "7-9": [
    { word: "school", scrambled: "ooslhc", hint: "Where you go to learn", definition: "A place where you learn" },
    { word: "friend", scrambled: "riednf", hint: "Someone you like to play with", definition: "A person you like and trust" },
    { word: "happy", scrambled: "ahppy", hint: "How you feel when smiling", definition: "Feeling joy or pleasure" },
    { word: "planet", scrambled: "alntep", hint: "Earth is one", definition: "A large body in space that orbits a star" },
    { word: "garden", scrambled: "adnreg", hint: "Where flowers grow", definition: "A place where plants and flowers grow" },
    { word: "winter", scrambled: "iwntre", hint: "The coldest season", definition: "The coldest season of the year" },
    { word: "pencil", scrambled: "ecnilp", hint: "You write with it", definition: "A writing tool made of wood and graphite" },
    { word: "bridge", scrambled: "rigbed", hint: "It goes over a river", definition: "A structure that crosses over something" },
  ],
  "10-12": [
    { word: "computer", scrambled: "opcmuter", hint: "You're using one now", definition: "An electronic device that processes data" },
    { word: "science", scrambled: "ceinsce", hint: "The study of the natural world", definition: "The systematic study of the natural world" },
    { word: "adventure", scrambled: "vntraeued", hint: "An exciting journey", definition: "An exciting or unusual experience" },
    { word: "knowledge", scrambled: "ekngldowe", hint: "What you gain from learning", definition: "Information and skills acquired through experience" },
    { word: "important", scrambled: "imnorttap", hint: "Something that matters a lot", definition: "Of great significance or value" },
    { word: "discover", scrambled: "sdcoiver", hint: "To find something new", definition: "To find something for the first time" },
    { word: "creative", scrambled: "ceravite", hint: "Using your imagination", definition: "Having the ability to make new things" },
    { word: "language", scrambled: "lagugane", hint: "Words we use to communicate", definition: "A system of communication using words" },
  ],
};

export const FILL_IN_BLANKS: Record<AgeGroup, FillInBlank[]> = {
  "4-6": [
    { sentence: "The ___ is yellow and bright.", blankedWord: "sun", options: ["sun", "cat", "box"], answer: 0 },
    { sentence: "I wear a ___ on my head.", blankedWord: "hat", options: ["shoe", "hat", "ball"], answer: 1 },
    { sentence: "The ___ says meow.", blankedWord: "cat", options: ["dog", "cat", "pig"], answer: 1 },
    { sentence: "Grass is ___.", blankedWord: "green", options: ["red", "blue", "green"], answer: 2 },
  ],
  "7-9": [
    { sentence: "We go to ___ to learn.", blankedWord: "school", options: ["park", "school", "store"], answer: 1 },
    { sentence: "A ___ is someone you trust.", blankedWord: "friend", options: ["friend", "stranger", "enemy"], answer: 0 },
    { sentence: "Earth is a ___.", blankedWord: "planet", options: ["moon", "planet", "star"], answer: 1 },
    { sentence: "In ___ it snows.", blankedWord: "winter", options: ["summer", "winter", "spring"], answer: 1 },
  ],
  "10-12": [
    { sentence: "A ___ processes information.", blankedWord: "computer", options: ["computer", "bicycle", "sandwich"], answer: 0 },
    { sentence: "___ is the study of the natural world.", blankedWord: "science", options: ["art", "science", "music"], answer: 1 },
    { sentence: "An ___ is an exciting journey.", blankedWord: "adventure", options: ["adventure", "apple", "answer"], answer: 0 },
    { sentence: "Using your imagination makes you ___.", blankedWord: "creative", options: ["tired", "creative", "hungry"], answer: 1 },
  ],
};

// ==================== LOGIC / PATTERN PUZZLES ====================

export interface PatternPuzzle {
  sequence: (string | number)[];
  answer: string | number;
  options: (string | number)[];
  type: "shape" | "number" | "color";
}

export const PATTERN_PUZZLES: Record<AgeGroup, PatternPuzzle[]> = {
  "4-6": [
    { sequence: ["🔴", "🔵", "🔴", "🔵", "🔴"], answer: "🔵", options: ["🔴", "🔵", "🟡"], type: "color" },
    { sequence: ["⭐", "🌙", "⭐", "🌙", "⭐"], answer: "🌙", options: ["⭐", "🌙", "☀️"], type: "shape" },
    { sequence: [1, 2, 3, 4, 5], answer: 6, options: [5, 6, 8], type: "number" },
    { sequence: ["🍎", "🍌", "🍎", "🍌", "🍎"], answer: "🍌", options: ["🍎", "🍌", "🍇"], type: "shape" },
    { sequence: [2, 4, 6, 8, 10], answer: 12, options: [11, 12, 13], type: "number" },
    { sequence: ["🔺", "🔻", "🔺", "🔻", "🔺"], answer: "🔻", options: ["🔺", "🔻", "⭕"], type: "shape" },
  ],
  "7-9": [
    { sequence: [2, 4, 8, 16, 32], answer: 64, options: [48, 64, 80], type: "number" },
    { sequence: [1, 1, 2, 3, 5, 8], answer: 13, options: [11, 13, 15], type: "number" },
    { sequence: ["🔴", "🟡", "🟢", "🔴", "🟡"], answer: "🟢", options: ["🔴", "🟡", "🟢"], type: "color" },
    { sequence: [3, 6, 9, 12, 15], answer: 18, options: [16, 17, 18], type: "number" },
    { sequence: ["A", "B", "C", "A", "B"], answer: "C", options: ["A", "B", "C"], type: "shape" },
    { sequence: [5, 10, 15, 20, 25], answer: 30, options: [28, 30, 35], type: "number" },
  ],
  "10-12": [
    { sequence: [1, 4, 9, 16, 25], answer: 36, options: [30, 36, 42], type: "number" },
    { sequence: [2, 6, 12, 20, 30], answer: 42, options: [36, 42, 48], type: "number" },
    { sequence: [1, 1, 2, 3, 5, 8, 13], answer: 21, options: [18, 21, 24], type: "number" },
    { sequence: [3, 9, 27, 81], answer: 243, options: [162, 243, 324], type: "number" },
    { sequence: ["🔵", "🟢", "🟡", "🟠", "🔴", "🔵"], answer: "🟢", options: ["🔵", "🟢", "🟡"], type: "color" },
    { sequence: [100, 90, 80, 70, 60], answer: 50, options: [45, 50, 55], type: "number" },
  ],
};

// ==================== AVATARS ====================

export interface Avatar {
  id: string;
  emoji: string;
  name: string;
}

export const AVATARS: Avatar[] = [
  { id: "worker1", emoji: "🧑‍💻", name: "Tech Worker" },
  { id: "worker2", emoji: "👩‍💼", name: "Business Woman" },
  { id: "worker3", emoji: "🧑‍🔬", name: "Scientist" },
  { id: "worker4", emoji: "👨‍💼", name: "Business Man" },
  { id: "worker5", emoji: "👩‍💻", name: "Developer" },
  { id: "worker6", emoji: "🧑‍🎨", name: "Designer" },
  { id: "worker7", emoji: "👨‍🔬", name: "Researcher" },
  { id: "worker8", emoji: "👩‍🔬", name: "Lab Tech" },
  { id: "worker9", emoji: "🧑‍🚀", name: "Astronaut" },
  { id: "worker10", emoji: "👨‍🚀", name: "Space Worker" },
  { id: "worker11", emoji: "👩‍🚀", name: "Space Explorer" },
  { id: "worker12", emoji: "🧑‍🔧", name: "Mechanic" },
];

// ==================== SEASONAL / HOLIDAY THEMES ====================

export interface SeasonalTheme {
  id: string;
  name: string;
  emoji: string;
  deskEmoji: string;
  bgGradient: string;
  confettiEmoji: string;
}

export function getCurrentSeasonalTheme(): SeasonalTheme | null {
  const now = new Date();
  const month = now.getMonth();
  const day = now.getDate();
  if (month === 9 && day >= 15) return { id: "halloween", name: "Halloween", emoji: "🎃", deskEmoji: "👻", bgGradient: "from-orange-600 to-purple-900", confettiEmoji: "🎃" };
  if (month === 10) return { id: "thanksgiving", name: "Thanksgiving", emoji: "🦃", deskEmoji: "🍂", bgGradient: "from-orange-700 to-yellow-800", confettiEmoji: "🍂" };
  if (month === 11) return { id: "christmas", name: "Christmas", emoji: "🎄", deskEmoji: "🎅", bgGradient: "from-green-700 to-red-800", confettiEmoji: "🎄" };
  if (month === 0 && day <= 5) return { id: "newyear", name: "New Year", emoji: "🎆", deskEmoji: "🎉", bgGradient: "from-purple-800 to-blue-900", confettiEmoji: "🎆" };
  if (month === 1) return { id: "valentines", name: "Valentine's Day", emoji: "💝", deskEmoji: "💗", bgGradient: "from-pink-600 to-red-700", confettiEmoji: "💝" };
  if (month === 2) return { id: "stpatricks", name: "St. Patrick's Day", emoji: "🍀", deskEmoji: "🌈", bgGradient: "from-green-600 to-emerald-800", confettiEmoji: "🍀" };
  if (month === 6) return { id: "summer", name: "Summer", emoji: "☀️", deskEmoji: "🏖️", bgGradient: "from-yellow-400 to-orange-500", confettiEmoji: "☀️" };
  if (month === 9 && day < 15) return { id: "autumn", name: "Autumn", emoji: "🍂", deskEmoji: "🍁", bgGradient: "from-orange-600 to-amber-700", confettiEmoji: "🍂" };
  return null;
}

// ==================== OFFICE PET ====================

export interface PetStage {
  stage: number;
  name: string;
  emoji: string;
  starsNeeded: number;
  description: string;
}

export const PET_STAGES: PetStage[] = [
  { stage: 0, name: "Egg", emoji: "🥚", starsNeeded: 0, description: "Your pet hasn't hatched yet!" },
  { stage: 1, name: "Baby", emoji: "🐣", starsNeeded: 5, description: "A baby pet just hatched!" },
  { stage: 2, name: "Kid", emoji: "🐥", starsNeeded: 15, description: "Your pet is growing up!" },
  { stage: 3, name: "Teen", emoji: "🐤", starsNeeded: 30, description: "Your pet is getting bigger!" },
  { stage: 4, name: "Adult", emoji: "🦅", starsNeeded: 50, description: "Your pet is fully grown!" },
  { stage: 5, name: "Master", emoji: "🐉", starsNeeded: 100, description: "Your pet has evolved into a legend!" },
];

export function getPetStage(totalStars: number): PetStage {
  let current = PET_STAGES[0];
  for (const stage of PET_STAGES) {
    if (totalStars >= stage.starsNeeded) current = stage;
  }
  return current;
}

export function getNextPetStage(totalStars: number): PetStage | null {
  for (const stage of PET_STAGES) {
    if (totalStars < stage.starsNeeded) return stage;
  }
  return null;
}

// ==================== BOSS BATTLE / BIG PROJECT ====================

export interface BossProject {
  id: string;
  name: string;
  emoji: string;
  description: string;
  tasksRequired: number;
  bonusStars: number;
  bonusSticker: string;
}

export const BOSS_PROJECTS: BossProject[] = [
  { id: "party", name: "Plan the Office Party", emoji: "🎉", description: "Complete 1 math + 1 reading + 1 email task to plan the best office party ever!", tasksRequired: 3, bonusStars: 10, bonusSticker: "🎊" },
  { id: "report", name: "Quarterly Report", emoji: "📊", description: "Complete 1 math + 1 reading + 1 email task to finish the quarterly report!", tasksRequired: 3, bonusStars: 10, bonusSticker: "📈" },
  { id: "hire", name: "New Hire Training", emoji: "🎓", description: "Complete 1 math + 1 reading + 1 email task to train the new employee!", tasksRequired: 3, bonusStars: 10, bonusSticker: "🎓" },
  { id: "launch", name: "Product Launch", emoji: "🚀", description: "Complete 1 math + 1 reading + 1 email task to launch the new product!", tasksRequired: 3, bonusStars: 15, bonusSticker: "🚀" },
];

export function getAvailableBossProject(tasksCompleted: number, projectsDone: string[]): BossProject | null {
  const nextIdx = projectsDone.length;
  if (nextIdx >= BOSS_PROJECTS.length) return null;
  const threshold = 3 + nextIdx * 5;
  if (tasksCompleted >= threshold) return BOSS_PROJECTS[nextIdx];
  return null;
}

export function getBossProjectThreshold(tasksCompleted: number, projectsDone: string[]): number {
  const nextIdx = projectsDone.length;
  if (nextIdx >= BOSS_PROJECTS.length) return -1;
  return 3 + nextIdx * 5;
}

// ==================== COWORKER GALLERY ====================

export interface GalleryCoworker {
  id: string;
  name: string;
  role: string;
  avatar: string;
  personality: string;
  unlockAt: number;
}

export const COWORKER_GALLERY: GalleryCoworker[] = [
  { id: "sam", name: "Sam", role: "Office Manager", avatar: "🧑‍💼", personality: "Friendly and organized", unlockAt: 0 },
  { id: "alex", name: "Alex", role: "IT Support", avatar: "👨‍💻", personality: "Tech-savvy and helpful", unlockAt: 2 },
  { id: "jordan", name: "Jordan", role: "Receptionist", avatar: "👩‍💼", personality: "Cheerful and welcoming", unlockAt: 4 },
  { id: "taylor", name: "Taylor", role: "Accountant", avatar: "🧑‍🔬", personality: "Precise and detail-oriented", unlockAt: 6 },
  { id: "morgan", name: "Morgan", role: "Marketing Lead", avatar: "👩‍🎨", personality: "Creative and energetic", unlockAt: 8 },
  { id: "casey", name: "Casey", role: "HR Director", avatar: "👨‍🏫", personality: "Patient and supportive", unlockAt: 12 },
  { id: "riley", name: "Riley", role: "CEO", avatar: "👩‍✈️", personality: "Inspiring and visionary", unlockAt: 20 },
];

export function getUnlockedCoworkers(typingCompleted: number): GalleryCoworker[] {
  return COWORKER_GALLERY.filter((c) => typingCompleted >= c.unlockAt);
}

export function getLockedCoworkers(typingCompleted: number): GalleryCoworker[] {
  return COWORKER_GALLERY.filter((c) => typingCompleted < c.unlockAt);
}

// ==================== TIMER MODE ====================

export const TIMER_DURATIONS: Record<AgeGroup, number> = {
  "4-6": 60,
  "7-9": 45,
  "10-12": 30,
};

// ==================== COFFEE BREAK ====================

export interface CoffeeBreakItem {
  id: string;
  emoji: string;
  name: string;
}

export const COFFEE_BREAK_ITEMS: CoffeeBreakItem[] = [
  { id: "coffee", emoji: "☕", name: "Coffee" },
  { id: "tea", emoji: "🫖", name: "Tea" },
  { id: "water", emoji: "💧", name: "Water" },
  { id: "juice", emoji: "🧃", name: "Juice" },
  { id: "snack", emoji: "🍪", name: "Cookie" },
  { id: "fruit", emoji: "🍎", name: "Apple" },
  { id: "sandwich", emoji: "🥪", name: "Sandwich" },
  { id: "donut", emoji: "🍩", name: "Donut" },
];
