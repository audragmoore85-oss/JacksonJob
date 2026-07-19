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

export interface MultipleChoiceQuestion {
  type: "multipleChoice";
  question: string;
  options: string[];
  answer: number;
}

export interface TrueFalseQuestion {
  type: "trueFalse";
  question: string;
  answer: boolean;
}

export interface ClickPassageQuestion {
  type: "clickPassage";
  question: string;
  sentenceIndex: number;
}

export type ReadingQuestion = MultipleChoiceQuestion | TrueFalseQuestion | ClickPassageQuestion;

export interface ReadingPassage {
  title: string;
  text: string;
  questions: ReadingQuestion[];
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
          { type: "multipleChoice", question: "What color is the ball?", options: ["Blue", "Red", "Green"], answer: 1 },
          { type: "trueFalse", question: "Cat is sad.", answer: false },
          { type: "clickPassage", question: "Click the sentence that tells how Cat feels!", sentenceIndex: 2 },
          { type: "multipleChoice", question: "What does Cat play with?", options: ["A ball", "A car", "A book"], answer: 0 },
        ],
      },
      {
        title: "My Big Dog",
        text: "I have a big dog. My dog is brown. My dog likes to run. We run in the park. My dog is my best friend!",
        questions: [
          { type: "multipleChoice", question: "What color is the dog?", options: ["Brown", "White", "Black"], answer: 0 },
          { type: "trueFalse", question: "The dog likes to run.", answer: true },
          { type: "clickPassage", question: "Click the sentence that says where they run!", sentenceIndex: 3 },
          { type: "multipleChoice", question: "What is the dog to the child?", options: ["A stranger", "A best friend", "A teacher"], answer: 1 },
        ],
      },
      {
        title: "The Busy Bee",
        text: "Bee lives in a garden with many flowers. Bee visits red flowers and blue flowers. Bee makes honey from the flowers. Bee works hard every day. Bee is a good helper in the garden!",
        questions: [
          { type: "multipleChoice", question: "Where does Bee live?", options: ["In a house", "In a garden", "In a tree"], answer: 1 },
          { type: "trueFalse", question: "Bee is lazy and does not work.", answer: false },
          { type: "clickPassage", question: "Click the sentence that tells what Bee makes!", sentenceIndex: 2 },
          { type: "multipleChoice", question: "What color flowers does Bee visit?", options: ["Red and blue", "Green and yellow", "Pink and purple"], answer: 0 },
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
        subject: "Thank You for Helping Me",
        userTemplate: "Hi Ms. Smith. Thank you for helping me today. You showed me where to sit. I like my desk. The work is fun. From, me.",
        coworkerReply: "You are welcome! I am glad you like your desk. What is your favorite thing to do at work?",
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
        subject: "My Day at Work",
        userTemplate: "Hi Mr. Tom. I had a good day at work. I did all my jobs. I read a book and did math. Thank you for the mail today. From, me.",
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
          { type: "multipleChoice", question: "What kind of tree did they find?", options: ["Pine tree", "Oak tree", "Maple tree"], answer: 1 },
          { type: "trueFalse", question: "It took one day to build the treehouse.", answer: false },
          { type: "clickPassage", question: "Click the sentence that tells who helped them!", sentenceIndex: 2 },
          { type: "multipleChoice", question: "What color did they paint it?", options: ["Blue", "Green", "Red"], answer: 0 },
          { type: "multipleChoice", question: "Who helped them build it?", options: ["Their mom", "Their dad", "Their teacher"], answer: 1 },
        ],
      },
      {
        title: "The Science Fair",
        text: "Maria was excited about the science fair. She decided to make a volcano using baking soda and vinegar. She built a paper mache mountain and painted it to look real. On the day of the fair, she poured the vinegar in and the volcano erupted with bubbly foam! Everyone clapped and she won first place. Her teacher gave her a blue ribbon.",
        questions: [
          { type: "multipleChoice", question: "What did Maria make for the science fair?", options: ["A robot", "A volcano", "A rocket"], answer: 1 },
          { type: "trueFalse", question: "Maria won first place at the science fair.", answer: true },
          { type: "clickPassage", question: "Click the sentence where the volcano erupts!", sentenceIndex: 3 },
          { type: "multipleChoice", question: "What did she use to make the eruption?", options: ["Baking soda and vinegar", "Water and soap", "Sand and glue"], answer: 0 },
          { type: "multipleChoice", question: "What did her teacher give her?", options: ["A gold medal", "A blue ribbon", "A certificate"], answer: 1 },
        ],
      },
      {
        title: "The Lost Puppy",
        text: "One rainy afternoon, Lily heard a small whimper outside her door. She opened it and found a wet, shivering puppy huddled on the porch. Lily brought the puppy inside and wrapped it in a warm towel. She gave it food and water. The puppy wagged its tail happily. Lily named the puppy Rain. Her parents said they could keep the puppy if Lily took care of it. Lily was thrilled and promised to feed, walk, and love Rain every single day.",
        questions: [
          { type: "multipleChoice", question: "What was the weather like?", options: ["Sunny", "Rainy", "Snowy"], answer: 1 },
          { type: "trueFalse", question: "The puppy was dry and warm when Lily found it.", answer: false },
          { type: "clickPassage", question: "Click the sentence where Lily names the puppy!", sentenceIndex: 5 },
          { type: "multipleChoice", question: "What did Lily give the puppy first?", options: ["Food and water", "A toy", "A bath"], answer: 0 },
          { type: "multipleChoice", question: "What did Lily promise to do?", options: ["Feed, walk, and love Rain", "Do her homework", "Clean her room"], answer: 0 },
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
          { type: "multipleChoice", question: "What was the Underground Railroad?", options: ["A real train underground", "A secret network helping people escape", "A mining tunnel system"], answer: 1 },
          { type: "trueFalse", question: "The Underground Railroad was a real train underground.", answer: false },
          { type: "clickPassage", question: "Click the sentence that mentions Harriet Tubman!", sentenceIndex: 3 },
          { type: "multipleChoice", question: "What were the guides called?", options: ["Drivers", "Conductors", "Pilots"], answer: 1 },
          { type: "multipleChoice", question: "How many missions did Harriet Tubman make?", options: ["About 5", "About 13", "About 30"], answer: 1 },
          { type: "multipleChoice", question: "Why did they often travel at night?", options: ["It was cooler", "To avoid detection", "They preferred darkness"], answer: 1 },
        ],
      },
      {
        title: "How Computers Work",
        text: "Computers process information using binary code, which consists of only two digits: 0 and 1. Every letter you type, every image you see, and every sound you hear on a computer is ultimately stored as a series of zeros and ones. The central processing unit, or CPU, acts as the brain of the computer, executing instructions at incredible speeds. Modern CPUs can perform billions of operations per second. Memory, or RAM, temporarily stores data that the CPU needs to access quickly, while storage drives like SSDs keep data permanently even when the computer is turned off.",
        questions: [
          { type: "multipleChoice", question: "What two digits make up binary code?", options: ["1 and 2", "0 and 1", "0 and 9"], answer: 1 },
          { type: "trueFalse", question: "RAM keeps data permanently even when the computer is off.", answer: false },
          { type: "clickPassage", question: "Click the sentence that describes what the CPU does!", sentenceIndex: 2 },
          { type: "multipleChoice", question: "What acts as the brain of the computer?", options: ["The RAM", "The CPU", "The SSD"], answer: 1 },
          { type: "multipleChoice", question: "How many operations can modern CPUs perform?", options: ["Millions per second", "Billions per second", "Thousands per second"], answer: 1 },
          { type: "multipleChoice", question: "What keeps data when the computer is off?", options: ["RAM", "Storage drives (SSDs)", "The CPU"], answer: 1 },
        ],
      },
      {
        title: "The Solar System",
        text: "Our solar system has eight planets that orbit around the Sun. The four inner planets are Mercury, Venus, Earth, and Mars. These are rocky planets with solid surfaces. The four outer planets are Jupiter, Saturn, Uranus, and Neptune. These are gas giants made mostly of hydrogen and helium. Jupiter is the largest planet in our solar system, so massive that all the other planets could fit inside it. Saturn is famous for its beautiful rings made of ice and rock particles. Earth is the only planet known to have life, with oceans covering about seventy percent of its surface.",
        questions: [
          { type: "multipleChoice", question: "How many planets are in our solar system?", options: ["Seven", "Eight", "Nine"], answer: 1 },
          { type: "trueFalse", question: "Jupiter is the largest planet in our solar system.", answer: true },
          { type: "clickPassage", question: "Click the sentence about Saturn's rings!", sentenceIndex: 6 },
          { type: "multipleChoice", question: "Which is the largest planet?", options: ["Earth", "Saturn", "Jupiter"], answer: 2 },
          { type: "multipleChoice", question: "What percentage of Earth is covered by oceans?", options: ["About 50%", "About 70%", "About 90%"], answer: 1 },
          { type: "multipleChoice", question: "Which planet is known to have life?", options: ["Mars", "Earth", "Venus"], answer: 1 },
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

export interface WordProblem {
  story: string;
  answer: number;
  options: number[];
  hint: string;
  emoji: string;
}

export const WORD_PROBLEMS: Record<AgeGroup, WordProblem[]> = {
  "4-6": [
    { story: "You have 3 apples. Your friend gives you 2 more. How many apples do you have now?", answer: 5, options: [4, 5, 6, 7], hint: "Count all the apples together!", emoji: "🍎" },
    { story: "There are 5 birds on a tree. 2 fly away. How many birds are left?", answer: 3, options: [2, 3, 4, 5], hint: "Take away the birds that flew away!", emoji: "🐦" },
    { story: "You have 4 cookies. You eat 1. How many cookies are left?", answer: 3, options: [2, 3, 4, 5], hint: "Subtract the cookie you ate!", emoji: "🍪" },
    { story: "There are 2 cats and 3 dogs at the park. How many animals are there?", answer: 5, options: [4, 5, 6, 7], hint: "Add the cats and dogs together!", emoji: "🐱" },
    { story: "You have 6 crayons. You lose 2. How many crayons do you have left?", answer: 4, options: [3, 4, 5, 6], hint: "Subtract the lost crayons!", emoji: "🖍️" },
  ],
  "7-9": [
    { story: "Sarah has 12 stickers. She gives 4 to her friend. How many stickers does Sarah have left?", answer: 8, options: [6, 7, 8, 9], hint: "Subtract the stickers she gave away!", emoji: "⭐" },
    { story: "A book has 8 chapters. Each chapter has 3 pages. How many pages are in the book?", answer: 24, options: [21, 24, 27, 30], hint: "Multiply chapters by pages!", emoji: "📚" },
    { story: "Tom has 15 marbles. He buys 7 more. How many marbles does Tom have now?", answer: 22, options: [20, 21, 22, 23], hint: "Add the new marbles!", emoji: "🔮" },
    { story: "There are 20 students in a class. They sit in rows of 4. How many rows are there?", answer: 5, options: [4, 5, 6, 7], hint: "Divide students by row size!", emoji: "👨‍🎓" },
    { story: "Emma reads 6 pages every day for 5 days. How many pages did she read in total?", answer: 30, options: [25, 28, 30, 35], hint: "Multiply pages per day by days!", emoji: "📖" },
  ],
  "10-12": [
    { story: "A store sells pencils for $2 each. If you buy 12 pencils, how much do you spend?", answer: 24, options: [20, 22, 24, 26], hint: "Multiply price by quantity!", emoji: "✏️" },
    { story: "A pizza is cut into 8 slices. 3 friends share it equally. How many slices does each friend get?", answer: 3, options: [2, 3, 4, 5], hint: "Divide slices by friends — but think about remainders!", emoji: "🍕" },
    { story: "You earn $5 per hour working. You worked 6 hours on Saturday and 4 hours on Sunday. How much did you earn in total?", answer: 50, options: [40, 45, 50, 55], hint: "Add the hours first, then multiply by pay!", emoji: "💰" },
    { story: "A garden has 15 rows with 7 plants in each row. How many plants are in the garden?", answer: 105, options: [98, 105, 112, 120], hint: "Multiply rows by plants per row!", emoji: "🌱" },
    { story: "A library has 144 books. They are split equally onto 6 shelves. How many books are on each shelf?", answer: 24, options: [22, 24, 26, 28], hint: "Divide total books by shelves!", emoji: "📚" },
  ],
};

export function getRandomWordProblem(ageGroup: AgeGroup): WordProblem {
  const problems = WORD_PROBLEMS[ageGroup];
  return problems[Math.floor(Math.random() * problems.length)];
}

export const STICKERS = [
  "⭐", "🌟", "🏆", "🎖️", "🌈", "🎈", "🎨", "🚀",
  "📚", "✏️", "🔢", "⌨️", "🧠", "💡", "🎯", "👑",
  "🦄", "🐙", "🦋", "🌸", "🍎", "🍕", "🍦", "🎁",
  "🐱", "🐶", "🦊", "🐼", "🐨", "🦁", "🐸", "🐧",
  "🦉", "🦜", "🐢", "🐬", "🦕", "🐉", "🧩", "🔮",
  "⚡", "🔥", "❄️", "🌍", "🌙", "☀️", "⭐", "💫",
  "🍰", "🧁", "🍓", "🥕", "🍔", "🌮", "🍣", "🍩",
  "🎮", "🎸", "🎺", "🥁", "🎤", "🎧", "🎹", "🎻",
  "🏅", "🥇", "🥈", "🥉", "💎", "🗝️", "🧸", "🎭",
  "🍀", "🌻", "🌺", "🍄", "🌵", "🌴", "🌊", "⛰️",
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

export interface DeskTheme {
  id: string;
  name: string;
  emoji: string;
  cost: number;
  bgClass: string;
  description: string;
}

export const DESK_THEMES: DeskTheme[] = [
  { id: "default", name: "Classic Office", emoji: "🏢", cost: 0, bgClass: "bg-gradient-to-b from-amber-50 to-orange-50", description: "The default office look" },
  { id: "space", name: "Space Station", emoji: "🚀", cost: 15, bgClass: "bg-gradient-to-b from-indigo-900 via-purple-900 to-blue-900", description: "Work among the stars!" },
  { id: "jungle", name: "Jungle Hut", emoji: "🌿", cost: 12, bgClass: "bg-gradient-to-b from-green-700 via-green-600 to-emerald-800", description: "A wild workspace!" },
  { id: "underwater", name: "Underwater Lab", emoji: "🐠", cost: 15, bgClass: "bg-gradient-to-b from-cyan-400 via-blue-500 to-blue-700", description: "Deep sea office!" },
  { id: "candy", name: "Candy Land", emoji: "🍭", cost: 10, bgClass: "bg-gradient-to-b from-pink-200 via-purple-200 to-pink-300", description: "A sweet workspace!" },
  { id: "volcano", name: "Volcano Base", emoji: "🌋", cost: 20, bgClass: "bg-gradient-to-b from-red-700 via-orange-700 to-yellow-800", description: "Work near the lava!" },
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
  writingCompleted: number;
  perfectScores: number;
  streak: number;
  stickersCollected: number;
  quickCompleted: number;
  wordMatchCompleted: number;
  memoryMatchCompleted: number;
  dailyQuizCompleted: number;
  easterEggsFound: number;
}

export const ACHIEVEMENTS: AchievementBadge[] = [
  { id: "first_star", name: "First Star", emoji: "⭐", description: "Earn your first star", check: (s) => s.totalStars >= 1 },
  { id: "ten_stars", name: "Rising Star", emoji: "🌟", description: "Earn 10 stars", check: (s) => s.totalStars >= 10 },
  { id: "fifty_stars", name: "Superstar", emoji: "✨", description: "Earn 50 stars", check: (s) => s.totalStars >= 50 },
  { id: "hundred_stars", name: "Star Legend", emoji: "💫", description: "Earn 100 stars", check: (s) => s.totalStars >= 100 },
  { id: "first_task", name: "Getting Started", emoji: "🎯", description: "Complete your first task", check: (s) => s.tasksCompleted >= 1 },
  { id: "ten_tasks", name: "Hard Worker", emoji: "💪", description: "Complete 10 tasks", check: (s) => s.tasksCompleted >= 10 },
  { id: "twentyfive_tasks", name: "Task Master", emoji: "🏆", description: "Complete 25 tasks", check: (s) => s.tasksCompleted >= 25 },
  { id: "math_whiz", name: "Math Whiz", emoji: "🔢", description: "Complete 5 math tasks", check: (s) => s.mathCompleted >= 5 },
  { id: "bookworm", name: "Bookworm", emoji: "📚", description: "Complete 5 reading tasks", check: (s) => s.readingCompleted >= 5 },
  { id: "typist", name: "Email Pro", emoji: "⌨️", description: "Complete 5 typing tasks", check: (s) => s.typingCompleted >= 5 },
  { id: "perfect", name: "Perfectionist", emoji: "💯", description: "Get 3 perfect scores", check: (s) => s.perfectScores >= 3 },
  { id: "perfect_five", name: "Flawless", emoji: "👑", description: "Get 5 perfect scores", check: (s) => s.perfectScores >= 5 },
  { id: "streak3", name: "On Fire", emoji: "🔥", description: "3-day streak", check: (s) => s.streak >= 3 },
  { id: "streak7", name: "Unstoppable", emoji: "⚡", description: "7-day streak", check: (s) => s.streak >= 7 },
  { id: "streak14", name: "Dedication", emoji: "📅", description: "14-day streak", check: (s) => s.streak >= 14 },
  { id: "collector", name: "Collector", emoji: "🎨", description: "Collect 10 stickers", check: (s) => s.stickersCollected >= 10 },
  { id: "sticker_hoarder", name: "Sticker Hoarder", emoji: "🖼️", description: "Collect 25 stickers", check: (s) => s.stickersCollected >= 25 },
  { id: "speller", name: "Word Master", emoji: "📝", description: "Complete 5 spelling tasks", check: (s) => s.spellingCompleted >= 5 },
  { id: "logician", name: "Logic Pro", emoji: "🧩", description: "Complete 5 logic tasks", check: (s) => s.logicCompleted >= 5 },
  { id: "author", name: "Young Author", emoji: "✍️", description: "Complete 5 writing tasks", check: (s) => s.writingCompleted >= 5 },
  { id: "speed_demon", name: "Speed Demon", emoji: "⚡", description: "Complete 5 Quick Tasks in Timer Mode", check: (s) => s.quickCompleted >= 5 },
  { id: "word_matcher", name: "Word Matcher", emoji: "🔤", description: "Complete 3 Word Match games", check: (s) => s.wordMatchCompleted >= 3 },
  { id: "memory_master", name: "Memory Master", emoji: "🧠", description: "Complete 3 Memory Match games", check: (s) => s.memoryMatchCompleted >= 3 },
  { id: "quiz_champion", name: "Quiz Champion", emoji: "🎓", description: "Complete 3 Daily Quizzes", check: (s) => s.dailyQuizCompleted >= 3 },
  { id: "explorer", name: "Explorer", emoji: "🔍", description: "Find 3 hidden Easter eggs", check: (s) => s.easterEggsFound >= 3 },
  { id: "well_rounded", name: "Well-Rounded", emoji: "🌟", description: "Complete at least 1 of each task type", check: (s) => s.mathCompleted >= 1 && s.readingCompleted >= 1 && s.typingCompleted >= 1 && s.spellingCompleted >= 1 && s.logicCompleted >= 1 && s.writingCompleted >= 1 },
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

export interface SequencePuzzle {
  type: "sequence";
  sequence: (string | number)[];
  answer: string | number;
  options: (string | number)[];
  patternType: "shape" | "number" | "color";
}

export interface OddOneOutPuzzle {
  type: "oddOneOut";
  items: string[];
  oddIndex: number;
  reason: string;
}

export interface CategoryPuzzle {
  type: "category";
  item: string;
  categories: { name: string; emoji: string }[];
  correctCategory: number;
}

export interface SizeOrderPuzzle {
  type: "sizeOrder";
  items: { emoji: string; name: string; size: number }[];
}

export interface MemoryPuzzle {
  type: "memory";
  pairs: { emoji: string; name: string }[];
}

export type LogicPuzzle = SequencePuzzle | OddOneOutPuzzle | CategoryPuzzle | SizeOrderPuzzle | MemoryPuzzle;

export const LOGIC_PUZZLES: Record<AgeGroup, LogicPuzzle[]> = {
  "4-6": [
    { type: "sequence", sequence: ["🔴", "🔵", "🔴", "🔵", "🔴"], answer: "🔵", options: ["🔴", "🔵", "🟡"], patternType: "color" },
    { type: "sequence", sequence: ["⭐", "🌙", "⭐", "🌙", "⭐"], answer: "🌙", options: ["⭐", "🌙", "☀️"], patternType: "shape" },
    { type: "oddOneOut", items: ["🍎", "🍌", "🐶", "🍇"], oddIndex: 2, reason: "The dog is an animal, the others are fruits!" },
    { type: "sequence", sequence: [1, 2, 3, 4, 5], answer: 6, options: [5, 6, 8], patternType: "number" },
    { type: "category", item: "🍎", categories: [{ name: "Fruit", emoji: "🍎" }, { name: "Animal", emoji: "🐶" }, { name: "Toy", emoji: "🧸" }], correctCategory: 0 },
    { type: "sizeOrder", items: [{ emoji: "🐜", name: "Ant", size: 1 }, { emoji: "🐱", name: "Cat", size: 2 }, { emoji: "🐘", name: "Elephant", size: 3 }] },
    { type: "sequence", sequence: ["🍎", "🍌", "🍎", "🍌", "🍎"], answer: "🍌", options: ["🍎", "🍌", "🍇"], patternType: "shape" },
    { type: "oddOneOut", items: ["🔴", "🔵", "🟢", "⭐"], oddIndex: 3, reason: "The star is a shape, the others are colors!" },
    { type: "sequence", sequence: [2, 4, 6, 8, 10], answer: 12, options: [11, 12, 13], patternType: "number" },
    { type: "category", item: "🐶", categories: [{ name: "Fruit", emoji: "🍎" }, { name: "Animal", emoji: "🐶" }, { name: "Vehicle", emoji: "🚗" }], correctCategory: 1 },
    { type: "sequence", sequence: ["🔺", "🔻", "🔺", "🔻", "🔺"], answer: "🔻", options: ["🔺", "🔻", "⭕"], patternType: "shape" },
    { type: "sizeOrder", items: [{ emoji: "🌱", name: "Seed", size: 1 }, { emoji: "🌿", name: "Sprout", size: 2 }, { emoji: "🌳", name: "Tree", size: 3 }] },
    { type: "memory", pairs: [{ emoji: "🍎", name: "Apple" }, { emoji: "🍌", name: "Banana" }, { emoji: "🍇", name: "Grapes" }] },
  ],
  "7-9": [
    { type: "sequence", sequence: [2, 4, 8, 16, 32], answer: 64, options: [48, 64, 80], patternType: "number" },
    { type: "oddOneOut", items: ["🚗", "🚙", "✈️", "🚚"], oddIndex: 2, reason: "The airplane flies, the others are ground vehicles!" },
    { type: "sequence", sequence: [1, 1, 2, 3, 5, 8], answer: 13, options: [11, 13, 15], patternType: "number" },
    { type: "category", item: "🦁", categories: [{ name: "Pet", emoji: "🏠" }, { name: "Wild Animal", emoji: "🌳" }, { name: "Bird", emoji: "🪶" }], correctCategory: 1 },
    { type: "sequence", sequence: ["🔴", "🟡", "🟢", "🔴", "🟡"], answer: "🟢", options: ["🔴", "🟡", "🟢"], patternType: "color" },
    { type: "sizeOrder", items: [{ emoji: "🪨", name: "Pebble", size: 1 }, { emoji: "🧱", name: "Brick", size: 2 }, { emoji: "⛰️", name: "Boulder", size: 3 }, { emoji: "🏔️", name: "Mountain", size: 4 }] },
    { type: "sequence", sequence: [3, 6, 9, 12, 15], answer: 18, options: [16, 17, 18], patternType: "number" },
    { type: "oddOneOut", items: ["☀️", "🌧️", "❄️", "🎸"], oddIndex: 3, reason: "The guitar is an instrument, the others are weather!" },
    { type: "sequence", sequence: ["A", "B", "C", "A", "B"], answer: "C", options: ["A", "B", "C"], patternType: "shape" },
    { type: "category", item: "🎹", categories: [{ name: "Tool", emoji: "🔧" }, { name: "Instrument", emoji: "🎵" }, { name: "Food", emoji: "🍔" }], correctCategory: 1 },
    { type: "sequence", sequence: [5, 10, 15, 20, 25], answer: 30, options: [28, 30, 35], patternType: "number" },
    { type: "sizeOrder", items: [{ emoji: "💧", name: "Drop", size: 1 }, { emoji: "🥤", name: "Cup", size: 2 }, { emoji: "🪣", name: "Bucket", size: 3 }, { emoji: "🏊", name: "Pool", size: 4 }] },
    { type: "memory", pairs: [{ emoji: "🚗", name: "Car" }, { emoji: "✈️", name: "Plane" }, { emoji: "🚢", name: "Ship" }, { emoji: "🚂", name: "Train" }] },
  ],
  "10-12": [
    { type: "sequence", sequence: [1, 4, 9, 16, 25], answer: 36, options: [30, 36, 42], patternType: "number" },
    { type: "oddOneOut", items: ["📖", "✏️", "📐", "🍕"], oddIndex: 3, reason: "Pizza is food, the others are school supplies!" },
    { type: "sequence", sequence: [2, 6, 12, 20, 30], answer: 42, options: [36, 42, 48], patternType: "number" },
    { type: "category", item: "🧬", categories: [{ name: "Art", emoji: "🎨" }, { name: "Science", emoji: "🔬" }, { name: "Sport", emoji: "⚽" }], correctCategory: 1 },
    { type: "sequence", sequence: [1, 1, 2, 3, 5, 8, 13], answer: 21, options: [18, 21, 24], patternType: "number" },
    { type: "sizeOrder", items: [{ emoji: "🦠", name: "Cell", size: 1 }, { emoji: "🐜", name: "Ant", size: 2 }, { emoji: "🐱", name: "Cat", size: 3 }, { emoji: "🐋", name: "Whale", size: 4 }, { emoji: "🌍", name: "Planet", size: 5 }] },
    { type: "sequence", sequence: [3, 9, 27, 81], answer: 243, options: [162, 243, 324], patternType: "number" },
    { type: "oddOneOut", items: [" Mercury", "Venus", "Moon", "Mars"], oddIndex: 2, reason: "The Moon is a moon, the others are planets!" },
    { type: "sequence", sequence: ["🔵", "🟢", "🟡", "🟠", "🔴", "🔵"], answer: "🟢", options: ["🔵", "🟢", "🟡"], patternType: "color" },
    { type: "category", item: "🏛️", categories: [{ name: "Nature", emoji: "🌿" }, { name: "Building", emoji: "🏗️" }, { name: "Vehicle", emoji: "🚗" }], correctCategory: 1 },
    { type: "sequence", sequence: [100, 90, 80, 70, 60], answer: 50, options: [45, 50, 55], patternType: "number" },
    { type: "sizeOrder", items: [{ emoji: "🤏", name: "Pinch", size: 1 }, { emoji: "✋", name: "Hand", size: 2 }, { emoji: "🧍", name: "Person", size: 3 }, { emoji: "🏠", name: "House", size: 4 }, { emoji: "🏙️", name: "City", size: 5 }] },
    { type: "memory", pairs: [{ emoji: "🌍", name: "Earth" }, { emoji: "🔴", name: "Mars" }, { emoji: "🪐", name: "Saturn" }, { emoji: "🌕", name: "Moon" }, { emoji: "⭐", name: "Star" }] },
  ],
};

// ==================== WRITING PROMPTS ====================

export interface WritingPrompt {
  id: string;
  emoji: string;
  picture: string;
  title: string;
  prompt: string;
  minWords: number;
  minSentences: number;
  wordBank: string[];
}

export const WRITING_PROMPTS: Record<AgeGroup, WritingPrompt[]> = {
  "4-6": [
    { id: "cat-day", emoji: "🐱", picture: "🐱🌞", title: "My Cat's Sunny Day", prompt: "Look at the cat! Write a story about what the cat does today.", minWords: 5, minSentences: 1, wordBank: ["cat", "sun", "play", "eat", "sleep", "happy", "run", "jump"] },
    { id: "space-trip", emoji: "🚀", picture: "🚀🌙⭐", title: "Trip to the Moon", prompt: "Write about a trip to the moon. What do you see?", minWords: 5, minSentences: 1, wordBank: ["moon", "star", "fly", "rocket", "big", "fun", "up", "space"] },
    { id: "magic-tree", emoji: "🌳", picture: "🌳✨🍎", title: "The Magic Tree", prompt: "This tree has magic apples! Write a story about it.", minWords: 5, minSentences: 1, wordBank: ["tree", "apple", "magic", "eat", "red", "big", "yummy", "grow"] },
  ],
  "7-9": [
    { id: "lost-dog", emoji: "🐶", picture: "🐶🗺️🏠", title: "The Lost Puppy", prompt: "Write a story about a puppy who gets lost and tries to find its way home.", minWords: 20, minSentences: 3, wordBank: ["puppy", "lost", "scared", "brave", "friend", "home", "found", "happy", "road", "help"] },
    { id: "island-adventure", emoji: "🏝️", picture: "🏝️🏴‍☠️💎", title: "Island Adventure", prompt: "You discover a mysterious island. Write about what you find there!", minWords: 20, minSentences: 3, wordBank: ["island", "treasure", "map", "adventure", "explore", "jungle", "cave", "gold", "exciting", "discover"] },
    { id: "robot-friend", emoji: "🤖", picture: "🤖🎒📚", title: "My Robot Friend", prompt: "Write a story about a robot who goes to school with you.", minWords: 20, minSentences: 3, wordBank: ["robot", "school", "learn", "friend", "smart", "funny", "help", "math", "read", "play"] },
  ],
  "10-12": [
    { id: "time-travel", emoji: "⏰", picture: "⏰🦕🏛️", title: "Time Traveler", prompt: "You find a watch that takes you back in time. Write about where you go and what happens.", minWords: 40, minSentences: 5, wordBank: ["time", "travel", "past", "future", "ancient", "history", "adventure", "danger", "discovery", "return"] },
    { id: "super-power", emoji: "🦸", picture: "🦸💨🏙️", title: "If I Had a Superpower", prompt: "If you could have any superpower, what would it be? Write a story about how you'd use it.", minWords: 40, minSentences: 5, wordBank: ["power", "super", "hero", "city", "save", "strong", "fast", "invisible", "fly", "help", "villain", "rescue"] },
    { id: "dream-city", emoji: "🏙️", picture: "🏙️🌈🚀", title: "My Dream City", prompt: "Design your perfect city. Describe what makes it special and who lives there.", minWords: 40, minSentences: 5, wordBank: ["city", "build", "park", "school", "home", "friend", "clean", "beautiful", "modern", "community", "green", "safe"] },
  ],
};

export function getRandomWritingPrompt(ageGroup: AgeGroup): WritingPrompt {
  const prompts = WRITING_PROMPTS[ageGroup];
  return prompts[Math.floor(Math.random() * prompts.length)];
}

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

export interface QuickTask {
  question: string;
  answer: string;
  options: string[];
  emoji: string;
}

const QUICK_MATH_TASKS: Record<AgeGroup, QuickTask[]> = {
  "4-6": [
    { question: "2 + 3 = ?", answer: "5", options: ["4", "5", "6", "3"], emoji: "🔢" },
    { question: "7 - 2 = ?", answer: "5", options: ["4", "5", "6", "3"], emoji: "🔢" },
    { question: "1 + 4 = ?", answer: "5", options: ["4", "5", "6", "3"], emoji: "🔢" },
    { question: "6 - 3 = ?", answer: "3", options: ["2", "3", "4", "5"], emoji: "🔢" },
    { question: "4 + 2 = ?", answer: "6", options: ["5", "6", "7", "4"], emoji: "🔢" },
    { question: "8 - 1 = ?", answer: "7", options: ["6", "7", "8", "5"], emoji: "🔢" },
    { question: "3 + 3 = ?", answer: "6", options: ["5", "6", "7", "4"], emoji: "🔢" },
    { question: "9 - 4 = ?", answer: "5", options: ["4", "5", "6", "3"], emoji: "🔢" },
  ],
  "7-9": [
    { question: "6 × 3 = ?", answer: "18", options: ["12", "18", "24", "15"], emoji: "🔢" },
    { question: "15 ÷ 3 = ?", answer: "5", options: ["3", "5", "6", "4"], emoji: "🔢" },
    { question: "8 × 4 = ?", answer: "32", options: ["24", "28", "32", "36"], emoji: "🔢" },
    { question: "27 ÷ 9 = ?", answer: "3", options: ["2", "3", "4", "5"], emoji: "🔢" },
    { question: "7 × 6 = ?", answer: "42", options: ["36", "42", "48", "35"], emoji: "🔢" },
    { question: "48 ÷ 8 = ?", answer: "6", options: ["5", "6", "7", "8"], emoji: "🔢" },
    { question: "9 × 4 = ?", answer: "36", options: ["32", "36", "40", "28"], emoji: "🔢" },
    { question: "56 ÷ 7 = ?", answer: "8", options: ["6", "7", "8", "9"], emoji: "🔢" },
  ],
  "10-12": [
    { question: "12 × 11 = ?", answer: "132", options: ["121", "132", "144", "125"], emoji: "🔢" },
    { question: "144 ÷ 12 = ?", answer: "12", options: ["10", "11", "12", "14"], emoji: "🔢" },
    { question: "15 × 7 = ?", answer: "105", options: ["95", "105", "115", "100"], emoji: "🔢" },
    { question: "81 ÷ 9 = ?", answer: "9", options: ["7", "8", "9", "10"], emoji: "🔢" },
    { question: "25 × 4 = ?", answer: "100", options: ["90", "100", "110", "95"], emoji: "🔢" },
    { question: "63 ÷ 7 = ?", answer: "9", options: ["7", "8", "9", "10"], emoji: "🔢" },
    { question: "14 × 6 = ?", answer: "84", options: ["78", "84", "90", "80"], emoji: "🔢" },
    { question: "96 ÷ 8 = ?", answer: "12", options: ["10", "11", "12", "14"], emoji: "🔢" },
  ],
};

const QUICK_WORD_TASKS: Record<AgeGroup, QuickTask[]> = {
  "4-6": [
    { question: "Which word rhymes with 'cat'?", answer: "hat", options: ["dog", "hat", "sun", "big"], emoji: "📝" },
    { question: "Which letter starts 'apple'?", answer: "a", options: ["b", "a", "c", "e"], emoji: "📝" },
    { question: "How many letters in 'dog'?", answer: "3", options: ["2", "3", "4", "5"], emoji: "📝" },
    { question: "Which word means 'big'?", answer: "large", options: ["tiny", "small", "large", "short"], emoji: "📝" },
    { question: "Which is a color?", answer: "red", options: ["run", "red", "rat", "rug"], emoji: "📝" },
  ],
  "7-9": [
    { question: "Unscramble: 'tca' = ?", answer: "cat", options: ["act", "cat", "tac", "atc"], emoji: "📝" },
    { question: "Unscramble: 'nwio' = ?", answer: "wino", options: ["wino", "owni", "inow", "wion"], emoji: "📝" },
    { question: "Which is a noun?", answer: "house", options: ["run", "quickly", "house", "blue"], emoji: "📝" },
    { question: "Synonym for 'happy'?", answer: "joyful", options: ["sad", "angry", "joyful", "tired"], emoji: "📝" },
    { question: "How many syllables in 'banana'?", answer: "3", options: ["2", "3", "4", "5"], emoji: "📝" },
  ],
  "10-12": [
    { question: "Antonym of 'ancient'?", answer: "modern", options: ["old", "modern", "historic", "aged"], emoji: "📝" },
    { question: "Which is an adjective?", answer: "beautiful", options: ["run", "beautiful", "quickly", "garden"], emoji: "📝" },
    { question: "Synonym for 'enormous'?", answer: "huge", options: ["tiny", "huge", "narrow", "flat"], emoji: "📝" },
    { question: "Unscramble: 'tneerls' = ?", answer: "letters", options: ["letters", "ttersle", "erslett", "letterst"], emoji: "📝" },
    { question: "Past tense of 'write'?", answer: "wrote", options: ["writed", "wrote", "written", "writing"], emoji: "📝" },
  ],
};

const QUICK_LOGIC_TASKS: Record<AgeGroup, QuickTask[]> = {
  "4-6": [
    { question: "Which is biggest?", answer: "elephant", options: ["mouse", "cat", "elephant", "rabbit"], emoji: "🔍" },
    { question: "Which doesn't belong?", answer: "banana", options: ["car", "truck", "bus", "banana"], emoji: "🔍" },
    { question: "Next: red, blue, red, ?", answer: "blue", options: ["red", "blue", "green", "yellow"], emoji: "🔍" },
    { question: "Which is a fruit?", answer: "apple", options: ["car", "apple", "chair", "book"], emoji: "🔍" },
    { question: "Next: 1, 2, 3, ?", answer: "4", options: ["3", "4", "5", "6"], emoji: "🔍" },
  ],
  "7-9": [
    { question: "Next: 2, 4, 6, ?", answer: "8", options: ["7", "8", "9", "10"], emoji: "🔍" },
    { question: "Next: 3, 6, 9, ?", answer: "12", options: ["10", "11", "12", "15"], emoji: "🔍" },
    { question: "Which doesn't belong?", answer: "triangle", options: ["dog", "cat", "triangle", "bird"], emoji: "🔍" },
    { question: "Next: Mon, Tue, Wed, ?", answer: "Thu", options: ["Fri", "Thu", "Sat", "Sun"], emoji: "🔍" },
    { question: "Odd one out?", answer: "swimming", options: ["running", "jumping", "swimming", "sleeping"], emoji: "🔍" },
  ],
  "10-12": [
    { question: "Next: 1, 4, 9, 16, ?", answer: "25", options: ["20", "24", "25", "36"], emoji: "🔍" },
    { question: "Next: 2, 6, 12, 20, ?", answer: "30", options: ["24", "28", "30", "36"], emoji: "🔍" },
    { question: "Next: 1, 1, 2, 3, 5, ?", answer: "8", options: ["6", "7", "8", "9"], emoji: "🔍" },
    { question: "Which is prime?", answer: "13", options: ["12", "13", "15", "21"], emoji: "🔍" },
    { question: "Next: 3, 7, 15, 31, ?", answer: "63", options: ["47", "55", "63", "60"], emoji: "🔍" },
  ],
};

export function generateQuickTask(ageGroup: AgeGroup): QuickTask {
  const categories = [QUICK_MATH_TASKS, QUICK_WORD_TASKS, QUICK_LOGIC_TASKS];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const tasks = category[ageGroup];
  return tasks[Math.floor(Math.random() * tasks.length)];
}

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

// ==================== WORD MATCH ====================

export interface WordMatchPair {
  word: string;
  emoji: string;
}

export const WORD_MATCH_SETS: Record<AgeGroup, WordMatchPair[][]> = {
  "4-6": [
    [
      { word: "cat", emoji: "🐱" },
      { word: "dog", emoji: "🐶" },
      { word: "sun", emoji: "☀️" },
      { word: "tree", emoji: "🌳" },
    ],
    [
      { word: "apple", emoji: "🍎" },
      { word: "fish", emoji: "🐟" },
      { word: "car", emoji: "🚗" },
      { word: "star", emoji: "⭐" },
    ],
    [
      { word: "bird", emoji: "🐦" },
      { word: "cake", emoji: "🎂" },
      { word: "moon", emoji: "🌙" },
      { word: "ball", emoji: "⚽" },
    ],
  ],
  "7-9": [
    [
      { word: "planet", emoji: "🪐" },
      { word: "rocket", emoji: "🚀" },
      { word: "castle", emoji: "🏰" },
      { word: "dragon", emoji: "🐉" },
      { word: "guitar", emoji: "🎸" },
      { word: "pizza", emoji: "🍕" },
    ],
    [
      { word: "volcano", emoji: "🌋" },
      { word: "rainbow", emoji: "🌈" },
      { word: "treasure", emoji: "💎" },
      { word: "robot", emoji: "🤖" },
      { word: "penguin", emoji: "🐧" },
      { word: "octopus", emoji: "🐙" },
    ],
  ],
  "10-12": [
    [
      { word: "telescope", emoji: "🔭" },
      { word: "laboratory", emoji: "🧪" },
      { word: "symphony", emoji: "🎼" },
      { word: "architecture", emoji: "🏛️" },
      { word: "chemistry", emoji: "⚗️" },
      { word: "adventure", emoji: "🗺️" },
    ],
    [
      { word: "ecosystem", emoji: "🌍" },
      { word: "algorithm", emoji: "💻" },
      { word: "democracy", emoji: "🗳️" },
      { word: "renaissance", emoji: "🎨" },
      { word: "metamorphosis", emoji: "🦋" },
      { word: "constellation", emoji: "✨" },
    ],
  ],
};

export function generateWordMatchSet(ageGroup: AgeGroup): WordMatchPair[] {
  const sets = WORD_MATCH_SETS[ageGroup];
  return sets[Math.floor(Math.random() * sets.length)];
}

// ==================== MEMORY MATCH ====================

export const MEMORY_EMOJIS: Record<AgeGroup, string[]> = {
  "4-6": ["🐱", "🐶", "🐰", "🐻", "🦁", "🐼", "🦊", "🐨"],
  "7-9": ["🚀", "🪐", "⭐", "🌙", "☄️", "🛸", "👨‍🚀", "🔭"],
  "10-12": ["🧪", "⚗️", "🔬", "🧬", "💻", "🤖", "🧠", "⚛️"],
};

export function generateMemoryCards(ageGroup: AgeGroup): string[] {
  const emojis = MEMORY_EMOJIS[ageGroup];
  const selected = emojis.slice(0, 6);
  return [...selected, ...selected].sort(() => Math.random() - 0.5);
}

// ==================== DAILY QUIZ ====================

export interface DailyQuizQuestion {
  question: string;
  options: string[];
  answer: number;
  category: string;
  emoji: string;
}

export function generateDailyQuiz(ageGroup: AgeGroup): DailyQuizQuestion[] {
  const allQuestions: DailyQuizQuestion[] = [
    { question: "What is 5 + 3?", options: ["6", "7", "8", "9"], answer: 2, category: "Math", emoji: "🔢" },
    { question: "What color is the sky?", options: ["Green", "Blue", "Red", "Purple"], answer: 1, category: "Science", emoji: "🌍" },
    { question: "How many days in a week?", options: ["5", "6", "7", "8"], answer: 2, category: "General", emoji: "📅" },
    { question: "What is 10 - 4?", options: ["5", "6", "7", "4"], answer: 1, category: "Math", emoji: "🔢" },
    { question: "Which animal says 'moo'?", options: ["Dog", "Cat", "Cow", "Duck"], answer: 2, category: "Animals", emoji: "🐄" },
    { question: "What is the opposite of 'hot'?", options: ["Warm", "Cold", "Cool", "Wet"], answer: 1, category: "Words", emoji: "📝" },
    { question: "How many legs does a spider have?", options: ["6", "8", "10", "4"], answer: 1, category: "Science", emoji: "🕷️" },
    { question: "What is 3 × 3?", options: ["6", "8", "9", "12"], answer: 2, category: "Math", emoji: "🔢" },
    { question: "Which is a fruit?", options: ["Carrot", "Broccoli", "Banana", "Onion"], answer: 2, category: "Food", emoji: "🍌" },
    { question: "What season comes after winter?", options: ["Summer", "Fall", "Spring", "Autumn"], answer: 2, category: "Nature", emoji: "🌸" },
    { question: "What is 20 ÷ 4?", options: ["4", "5", "6", "10"], answer: 1, category: "Math", emoji: "🔢" },
    { question: "Which planet do we live on?", options: ["Mars", "Venus", "Earth", "Jupiter"], answer: 2, category: "Space", emoji: "🌍" },
    { question: "What is the largest ocean?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: 3, category: "Geography", emoji: "🌊" },
    { question: "How many colors in a rainbow?", options: ["5", "6", "7", "8"], answer: 2, category: "Science", emoji: "🌈" },
    { question: "What is 15 + 15?", options: ["25", "30", "35", "20"], answer: 1, category: "Math", emoji: "🔢" },
  ];

  const ageFiltered = ageGroup === "4-6"
    ? allQuestions.filter(q => ["Math", "Animals", "Words", "Food", "Nature"].includes(q.category))
    : ageGroup === "7-9"
    ? allQuestions.filter(q => !["Geography"].includes(q.category))
    : allQuestions;

  const shuffled = [...ageFiltered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 5);
}

// ==================== EASTER EGGS ====================

export interface EasterEgg {
  id: string;
  emoji: string;
  message: string;
  stars: number;
}

export const EASTER_EGGS: EasterEgg[] = [
  { id: "hidden_star", emoji: "⭐", message: "You found a hidden star!", stars: 2 },
  { id: "lucky_clover", emoji: "🍀", message: "Lucky clover! Bonus stars!", stars: 3 },
  { id: "magic_wand", emoji: "🪄", message: "Magic wand discovered!", stars: 1 },
  { id: "secret_treasure", emoji: "💎", message: "Secret treasure found!", stars: 5 },
  { id: "mystery_key", emoji: "🗝️", message: "A mysterious key!", stars: 2 },
];
