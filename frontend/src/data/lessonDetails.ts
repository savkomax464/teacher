export interface LessonDetailData {
  id: number;
  title: string;
  icon: string;
  essence: string;
  rules: string;
  example: {
    description: string;
    code?: string;
    explanation?: string;
  };
  pitfalls: {
    title: string;
    description: string;
  }[];
}

export const lessonDetails: Record<number, LessonDetailData> = {
  1: {
    id: 1,
    title: 'Introduction to Basics',
    icon: '🎯',
    essence:
      'Every complex skill is built from simple fundamentals. This lesson introduces the core building blocks — the vocabulary, concepts, and mental models you need before anything else makes sense. Without these foundations, everything that follows will feel confusing.',
    rules: [
      'Always start with definitions — you can\'t reason about something you can\'t name',
      'Focus on understanding why a concept exists, not just what it is',
      'Connect new ideas to things you already know — analogies are powerful',
      'Don\'t rush — a shaky foundation will collapse under complexity',
      'Write things down in your own words to verify real understanding',
    ],
    example: {
      description: 'Imagine learning a new language. Before you write essays, you need to know what a noun is. In programming, before you build apps, you need to know what a variable is.',
      code: `// Variable — a named container for data\nlet temperature = 25;\nlet name = "Maksim";\nlet isActive = true;`,
      explanation: 'A variable gives a name to a piece of data. Instead of remembering the number 25, you can write "temperature" — and your code becomes readable.',
    },
    pitfalls: [
      {
        title: 'Skipping definitions',
        description: 'Many learners gloss over definitions thinking they\'ll "figure it out later." Later never comes — build the vocabulary first.',
      },
      {
        title: 'Memorizing without understanding',
        description: 'Knowing that something works is not the same as knowing why it works. Exams test the "why."',
      },
      {
        title: 'Trying to learn everything at once',
        description: 'The basics are called "basics" for a reason. Master the core 20% that gives you 80% of the value.',
      },
    ],
  },
  2: {
    id: 2,
    title: 'Building Blocks',
    icon: '🧱',
    essence:
      'Once you know the vocabulary, you can start combining pieces. This lesson is about structures — how individual elements connect to form larger, more useful patterns. Think of it as going from words to sentences.',
    rules: [
      'Small, composable pieces are always better than big, monolithic ones',
      'Every structure should have a single, clear responsibility',
      'Naming matters — if you can\'t name something clearly, you don\'t understand it',
      'Look for patterns in how things connect, not just the things themselves',
      'Build incrementally — verify each piece before adding the next',
    ],
    example: {
      description: 'Functions are the fundamental building block of code organization. They take input, do something, and produce output.',
      code: `function calculateArea(width: number, height: number): number {\n  return width * height;\n}\n\nconst room = calculateArea(5, 4); // 20`,
      explanation: 'Instead of repeating "width × height" everywhere, you create a reusable building block. Change the formula once, and everything updates.',
    },
    pitfalls: [
      {
        title: 'Making building blocks too large',
        description: 'A function that does 10 things is not a building block — it\'s a tangled mess. Keep each piece small and focused.',
      },
      {
        title: 'Ignoring the connections',
        description: 'The interface between pieces is often more important than the pieces themselves.',
      },
      {
        title: 'No clear naming convention',
        description: 'If one function is called "calc" and another "calculateTotalArea," your mental model fractures. Be consistent.',
      },
    ],
  },
  3: {
    id: 3,
    title: 'First Steps',
    icon: '👣',
    essence:
      'Theory becomes real when you actually do something with it. This lesson is about guided practice — simple exercises designed to build muscle memory and confidence. It\'s the difference between reading about swimming and getting in the water.',
    rules: [
      'Start with exercises barely above your current level — small wins build momentum',
      'Type everything yourself — no copy-pasting. Your fingers need to learn too',
      'When something breaks, read the error message before asking for help',
      'Celebrate getting the right answer, but learn more from getting it wrong',
      'Practice consistently — 20 minutes daily beats 3 hours once a week',
    ],
    example: {
      description: 'A simple exercise: write a function that checks if a number is even or odd. It sounds trivial, but doing it from scratch teaches you about functions, parameters, conditionals, and return values.',
      code: `function isEven(n: number): boolean {\n  return n % 2 === 0;\n}\n\nconsole.log(isEven(4)); // true\nconsole.log(isEven(7)); // false`,
      explanation: 'This exercise forces you to combine three building blocks: a function definition, the modulo operator, and a boolean return. Each piece is simple, but together they create real logic.',
    },
    pitfalls: [
      {
        title: 'Jumping to advanced exercises too fast',
        description: 'If you can\'t comfortably solve the easy problems, the hard ones will demoralize you. Earn your difficulty.',
      },
      {
        title: 'Copying solutions without understanding',
        description: 'A copied solution teaches you nothing. Struggle through it yourself — the struggle is where learning happens.',
      },
      {
        title: 'Not practicing enough',
        description: 'Reading a tutorial and nodding along is not practice. Practice means doing it yourself, from scratch, without looking.',
      },
    ],
  },
  4: {
    id: 4,
    title: 'Deep Dive',
    icon: '🌊',
    essence:
      'Now that you can do the basics, it\'s time to understand what\'s actually happening under the hood. This lesson peels back the surface and explores the mechanics, the reasons why things work the way they do, and the intermediate patterns that separate beginners from competent practitioners.',
    rules: [
      'Always ask "why" — not just "how"',
      'Understanding the mechanism makes debugging intuitive',
      'Learn the default behavior before learning the exceptions',
      'Draw diagrams — visualizing systems reveals hidden complexity',
      'Compare different approaches and understand the trade-offs',
    ],
    example: {
      description: 'Consider how a loop actually executes. It\'s not magic — the computer checks a condition, runs the body, updates a counter, and repeats. Understanding this cycle helps you avoid infinite loops and off-by-one errors.',
      code: `// What actually happens, step by step:\n// 1. i = 0 (initialization)\n// 2. Is i < 3? Yes → enter loop\n// 3. Run body\n// 4. i++ (now i = 1)\n// 5. Is i < 3? Yes → repeat\nfor (let i = 0; i < 3; i++) {\n  console.log(i); // 0, 1, 2\n}`,
      explanation: 'Every iteration is a cycle: check → execute → update → check again. When you visualize this, bugs like "off by one" become obvious — you can see exactly when the condition fails.',
    },
    pitfalls: [
      {
        title: 'Accepting "it just works" as an answer',
        description: 'If you can\'t explain how something works, you don\'t truly understand it yet. Dig deeper.',
      },
      {
        title: 'Ignoring edge cases',
        description: 'The default case is easy. The empty input, the negative number, the null value — those are where bugs live.',
      },
      {
        title: 'Getting lost in details',
        description: 'Deep dive doesn\'t mean "learn every detail." Focus on the mechanisms that matter for 90% of use cases.',
      },
    ],
  },
  5: {
    id: 5,
    title: 'Challenge Zone',
    icon: '🔥',
    essence:
      'Comfort zone is where confidence is built; challenge zone is where skill is forged. This lesson pushes you into harder problems that force you to combine everything you\'ve learned. Expect to struggle — that struggle is the signal that growth is happening.',
    rules: [
      'Struggle is normal — if it feels hard, you\'re in the right place',
      'Break big problems into tiny sub-problems you can solve individually',
      'When stuck for more than 20 minutes, take a break and come back fresh',
      'Compare your solution to others after you\'ve finished — learn from the differences',
      'A problem you solved yourself teaches you 10× more than a solution you read',
    ],
    example: {
      description: 'Challenge: write a function that finds the largest number in an array without using built-in methods. You need to combine loops, conditionals, and variables — all the building blocks from previous lessons.',
      code: `function findMax(numbers: number[]): number {\n  let max = numbers[0];\n  for (let i = 1; i < numbers.length; i++) {\n    if (numbers[i] > max) {\n      max = numbers[i];\n    }\n  }\n  return max;\n}\n\nfindMax([3, 1, 9, 2, 7]); // 9`,
      explanation: 'This requires initializing a tracker, iterating through the array, comparing each element, and updating when you find a bigger one. It\'s a synthesis of everything so far.',
    },
    pitfalls: [
      {
        title: 'Giving up too early',
        description: 'The urge to look at the solution within 5 minutes is strong. Resist it. Your brain needs time to wrestle with the problem.',
      },
      {
        title: 'Not breaking the problem down',
        description: 'Trying to solve the whole thing at once leads to paralysis. What\'s the smallest piece you can solve right now?',
      },
      {
        title: 'Comparing yourself to experts',
        description: 'An expert\'s solution looks elegant because they\'ve solved hundreds of similar problems. You\'re building that pattern library now.',
      },
    ],
  },
  6: {
    id: 6,
    title: 'Pattern Recognition',
    icon: '🔍',
    essence:
      'Expertise is largely pattern recognition — the ability to see a problem and immediately know which tool to reach for. This lesson trains your brain to spot common structures hidden inside seemingly different problems.',
    rules: [
      'After solving each problem, ask: "What pattern did I just use?"',
      'Look for the skeleton of a problem — strip away the surface details',
      'Many "new" problems are old patterns dressed in different clothes',
      'Build a mental catalog: "This is a search problem," "This is a grouping problem"',
      'Review old solutions periodically to spot patterns you missed the first time',
    ],
    example: {
      description: 'These two problems look different but share the same pattern — they both require iterating through a collection and accumulating a result.',
      code: `// Problem 1: Sum all numbers\nfunction sum(nums: number[]): number {\n  let total = 0;\n  for (const n of nums) total += n;\n  return total;\n}\n\n// Problem 2: Count total characters\nfunction totalChars(strings: string[]): number {\n  let count = 0;\n  for (const s of strings) count += s.length;\n  return count;\n}`,
      explanation: 'Both follow the pattern: initialize accumulator → iterate → update → return. Once you recognize this "reduce" pattern, dozens of problems become trivial.',
    },
    pitfalls: [
      {
        title: 'Treating every problem as unique',
        description: 'If you start from scratch every time, you\'ll never build speed. Look for the pattern first.',
      },
      {
        title: 'Misidentifying the pattern',
        description: 'Not everything is a loop. Make sure the pattern actually fits before applying it.',
      },
      {
        title: 'Knowing patterns but not practicing them',
        description: 'Recognizing a pattern intellectually is different from being able to apply it fluently. Practice both.',
      },
    ],
  },
  7: {
    id: 7,
    title: 'Problem Solving',
    icon: '🧩',
    essence:
      'Problem solving is a skill separate from the domain knowledge itself. This lesson teaches a structured approach: understand the problem, devise a plan, execute, and verify. This framework works for any domain — from math to programming to real-life decisions.',
    rules: [
      'Always restate the problem in your own words before trying to solve it',
      'Identify what\'s given and what\'s required — the gap between them is your job',
      'Draw it out — diagrams, flowcharts, and tables clarify thinking',
      'Work backwards from the desired result when forward thinking is stuck',
      'Always verify your answer against the original problem statement',
    ],
    example: {
      description: 'Problem: "Find two numbers in a list that add up to a target sum." Let\'s apply the framework.',
      code: `// Step 1: Understand — we need pairs that sum to target\n// Step 2: Plan — for each number, check if (target - number) exists\n// Step 3: Execute:\nfunction twoSum(nums: number[], target: number): [number, number] | null {\n  const seen = new Set<number>();\n  for (const n of nums) {\n    const complement = target - n;\n    if (seen.has(complement)) return [complement, n];\n    seen.add(n);\n  }\n  return null;\n}`,
      explanation: 'By using a Set to track seen numbers, we solve this in one pass instead of checking every pair. The structured approach led us to the efficient solution naturally.',
    },
    pitfalls: [
      {
        title: 'Rushing into coding without understanding',
        description: 'The #1 cause of wasted time is writing code for the wrong problem. Spend 2× longer understanding than solving.',
      },
      {
        title: 'No plan — just trial and error',
        description: 'Random poking occasionally works but teaches nothing. Have a plan before you type.',
      },
      {
        title: 'Skipping verification',
        description: 'An unchecked solution is a hypothesis, not a fact. Always test against the original requirements.',
      },
    ],
  },
  8: {
    id: 8,
    title: 'Logic Puzzles',
    icon: '🧠',
    essence:
      'Logic puzzles train your brain to think precisely and rigorously. They strip away domain-specific knowledge and test pure reasoning — can you follow a chain of implications, spot contradictions, and deduce the answer from limited information?',
    rules: [
      'Write down everything you know — the answer is always hidden in the given information',
      'Eliminate impossibilities — whatever remains, however improbable, must be true',
      'Use truth tables for complex logical relationships',
      'Watch for hidden assumptions — the puzzle never tells you everything',
      'If you\'re stuck, try the opposite assumption and see if it creates a contradiction',
    ],
    example: {
      description: 'Classic puzzle: "If it rains, the ground gets wet. The ground is not wet. What can you conclude?"',
      code: `// Given:\n//   If rain → wet ground  (P → Q)\n//   NOT wet ground        (¬Q)\n// Therefore:\n//   NOT rain              (¬P)  ← Modus Tollens\n\n// This logical rule is the foundation of debugging:\n// If a bug exists → the test fails\n// The test passed\n// Therefore the bug (in this path) doesn't exist`,
      explanation: 'Modus Tollens — denying the consequent — is one of the most powerful reasoning tools. It\'s exactly how debugging works: if the symptom is absent, the cause must be elsewhere.',
    },
    pitfalls: [
      {
        title: 'Confusing "if P then Q" with "if Q then P"',
        description: 'This is the most common logical error. "If it rains, ground is wet" does NOT mean "if ground is wet, it rained" (could be a sprinkler).',
      },
      {
        title: 'Ignoring the contrapositive',
        description: 'P → Q is equivalent to ¬Q → ¬P. This equivalence is incredibly useful but easily forgotten.',
      },
      {
        title: 'Adding information not in the puzzle',
        description: 'Puzzles are self-contained. Don\'t import outside assumptions — they\'ll lead you astray.',
      },
    ],
  },
  9: {
    id: 9,
    title: 'Creative Thinking',
    icon: '💡',
    essence:
      'Not every problem has a single correct answer. Creative thinking is about generating multiple approaches, challenging assumptions, and finding elegant solutions that others miss. It\'s the difference between a competent technician and a true craftsman.',
    rules: [
      'Generate 3 solutions before picking one — the first answer is rarely the best',
      'Question every constraint — is it real, or just assumed?',
      'Look for the simplest possible solution first (Occam\'s razor)',
      'Borrow ideas from unrelated domains — analogical thinking sparks innovation',
      'Sleep on hard problems — your subconscious continues working on them',
    ],
    example: {
      description: 'Problem: "Remove duplicates from an array." The obvious approach is a loop, but creative thinking reveals multiple solutions.',
      code: `// Approach 1: Manual loop\nfunction unique1(arr: any[]): any[] {\n  const result: any[] = [];\n  for (const item of arr) {\n    if (!result.includes(item)) result.push(item);\n  }\n  return result;\n}\n\n// Approach 2: Set (elegant!)\nfunction unique2(arr: any[]): any[] {\n  return [...new Set(arr)];\n}`,
      explanation: 'The Set solution is one line because it leverages a data structure designed for uniqueness. Creative thinking means knowing to look for the right tool, not just using the first one you think of.',
    },
    pitfalls: [
      {
        title: 'Sticking with the first idea',
        description: 'Your first idea is usually the most obvious one that everyone else also thought of. Dig deeper.',
      },
      {
        title: 'Over-constraining the problem',
        description: '"It has to be fast, use no extra memory, work in one pass, and be recursive..." — who said all that? Separate real constraints from imaginary ones.',
      },
      {
        title: 'Dismissing "silly" ideas too quickly',
        description: 'Some of the best solutions initially sound absurd. Give weird ideas a few seconds of serious consideration.',
      },
    ],
  },
  10: {
    id: 10,
    title: 'Advanced Techniques',
    icon: '⚡',
    essence:
      'Advanced techniques aren\'t about knowing more tools — they\'re about using fundamental tools in sophisticated ways. This lesson covers patterns and strategies that experienced practitioners use instinctively, but which beginners haven\'t yet internalized.',
    rules: [
      'Advanced = fundamentals applied with precision and timing, not magic',
      'Learn when NOT to use an advanced technique — restraint is expertise',
      'Every advanced pattern solves a specific pain point — understand the pain first',
      'Study well-written code from experts — reading quality teaches quality',
      'Teach what you learn — explaining forces clarity',
    ],
    example: {
      description: 'Recursion is an advanced technique that seems complex but is just a function calling itself. The key insight: every recursive problem has a base case (when to stop) and a recursive case (how to simplify).',
      code: `// Calculate factorial: 5! = 5 × 4 × 3 × 2 × 1 = 120\nfunction factorial(n: number): number {\n  // Base case: stop here\n  if (n <= 1) return 1;\n  // Recursive case: simplify and call\n  return n * factorial(n - 1);\n}\n\n// factorial(5)\n// = 5 * factorial(4)\n// = 5 * 4 * factorial(3)\n// = 5 * 4 * 3 * factorial(2)\n// = 5 * 4 * 3 * 2 * 1\n// = 120`,
      explanation: 'The elegance of recursion is that you write the logic once and it handles any input size. The trick is always: when does it stop, and how does each step get closer to stopping?',
    },
    pitfalls: [
      {
        title: 'Using advanced techniques to look smart',
        description: 'A simple loop that works is better than an elegant solution that bugs. Choose clarity over cleverness.',
      },
      {
        title: 'Missing the base case in recursion',
        description: 'No base case = infinite recursion = crash. Always write the stopping condition first.',
      },
      {
        title: 'Learning techniques without understanding when to use them',
        description: 'Knowing a pattern is useless if you can\'t recognize the situation it applies to.',
      },
    ],
  },
  11: {
    id: 11,
    title: 'Strategy Guide',
    icon: '🗺️',
    essence:
      'Strategy is the art of planning your learning and problem-solving approach. It\'s meta-thinking — thinking about how you think. Good strategy turns a chaotic scramble into a smooth, efficient process.',
    rules: [
      'Map the territory before you start — know what you don\'t know',
      'Prioritize by impact: learn the most broadly useful skills first',
      'Set specific, measurable goals — "get better" is not a goal',
      'Review and adjust your strategy weekly — don\'t optimize a broken approach',
      'Balance depth and breadth — specialists who can\'t communicate are limited',
    ],
    example: {
      description: 'A learning strategy for mastering a new topic in 30 days:',
      code: `Week 1: Foundations\n  ├── Read introductory material (2 hours/day)\n  ├── Take notes in your own words\n  └── Complete beginner exercises\n\nWeek 2: Practice\n  ├── Solve intermediate problems\n  ├── Build a small project\n  └── Identify knowledge gaps\n\nWeek 3: Deepen\n  ├── Study advanced topics\n  ├── Read expert-level content\n  └── Teach someone else\n\nWeek 4: Apply\n  ├── Build something real\n  ├── Get feedback\n  └── Document what you learned`,
      explanation: 'This strategy works because it progresses from passive (reading) to active (building) to social (teaching) — each phase reinforces the previous one.',
    },
    pitfalls: [
      {
        title: 'No strategy at all',
        description: 'Learning without a plan is like traveling without a map. You might find something good, but you\'ll waste a lot of time.',
      },
      {
        title: 'Over-planning and under-doing',
        description: 'A perfect plan you never execute is worth nothing. Start doing, adjust as you go.',
      },
      {
        title: 'Copying someone else\'s strategy blindly',
        description: 'What works for an expert may not work for a beginner. Adapt strategies to your current level.',
      },
    ],
  },
  12: {
    id: 12,
    title: 'Expert Tips',
    icon: '🎓',
    essence:
      'Expert tips are the kind of knowledge that takes years to earn through trial and error. They\'re not found in textbooks because they\'re not formal rules — they\'re heuristics, intuitions, and shortcuts that working professionals develop.',
    rules: [
      'Rubber duck debugging works — explaining a problem out loud reveals the answer',
      'The 80/20 rule: 20% of causes create 80% of results — find that 20%',
      'If you\'ve been stuck for 30 minutes, the problem is likely simpler than you think',
      'Write code (or anything) for the next person who reads it — that might be future you',
      'The best tool is the boring one you already know well',
    ],
    example: {
      description: 'Expert tip: the best way to understand a complex codebase is not to read it — it\'s to break it. Change one thing at a time and see what happens.',
      code: `// You found this mysterious function:\nfunction process(data: Record<string, any>): any {\n  const x = Object.entries(data).reduce((a, [k, v]) => {\n    a[k] = typeof v === 'string' ? v.trim() : v;\n    return a;\n  }, {} as any);\n  return x;\n}\n\n// Instead of reading it 5 times, just test it:\nconsole.log(process({ name: "  Maksim  ", age: 25 }));\n// Output: { name: "Maksim", age: 25 }\n// → It trims strings and leaves everything else unchanged!`,
      explanation: 'Running the code with sample data teaches you more in 10 seconds than 10 minutes of reading. Experts learn systems by interacting, not by studying.',
    },
    pitfalls: [
      {
        title: 'Dismissing tips as "obvious"',
        description: 'Nothing is obvious until you\'ve learned it. Every expert tip was someone\'s hard-won lesson.',
      },
      {
        title: 'Collecting tips without applying them',
        description: 'Tips are useless until they become habits. Pick one tip per week and consciously practice it.',
      },
      {
        title: 'Following tips blindly without context',
        description: 'Every heuristic has exceptions. Apply judgment — tips guide thinking, they don\'t replace it.',
      },
    ],
  },
  13: {
    id: 13,
    title: 'Real World Applications',
    icon: '🌍',
    essence:
      'The gap between textbook examples and real-world usage is enormous. This lesson bridges that gap by showing how abstract concepts become concrete tools when applied to actual problems in actual systems.',
    rules: [
      'Real data is always messier than examples — plan for cleaning it',
      'Real users will do the thing you said was "impossible" — handle edge cases',
      'Real systems have latency, failures, and timeouts — design for the unhappy path',
      'Real codebases have legacy code and weird decisions — don\'t judge, adapt',
      'Real problems rarely announce which concept to apply — that\'s your job to figure out',
    ],
    example: {
      description: 'Textbook example: sort a list of numbers. Real world: sort a list of products by relevance, which involves user ratings, recency, popularity, and personalization.',
      code: `// Textbook:\nnumbers.sort((a, b) => a - b);\n\n// Real world:\nfunction rankProducts(products: Product[], user: User): Product[] {\n  return products\n    .filter(p => p.inStock)                          // available\n    .map(p => ({\n      ...p,\n      score: p.rating * 0.4 +                         // quality\n             Math.log(p.sales) * 0.3 +                // popularity\n             (isRecent(p.date) ? 0.3 : 0) +           // freshness\n             (p.category === user.favCategory ? 0.2 : 0) // personal\n    }))\n    .sort((a, b) => b.score - a.score);\n}`,
      explanation: 'The real-world version combines multiple factors, weights them, and personalizes the result. The textbook sort function is still in there — it\'s the final .sort() — but everything around it is the messy reality.',
    },
    pitfalls: [
      {
        title: 'Assuming clean data',
        description: 'Real data has nulls, typos, duplicates, and entries from 2019. Always validate and clean.',
      },
      {
        title: 'Optimizing the wrong thing',
        description: 'Making the sort 2× faster doesn\'t matter if the ranking formula is wrong. Optimize correctness before speed.',
      },
      {
        title: 'Ignoring the user experience',
        description: 'Technically correct results that confuse the user are not correct. The user\'s understanding is the real measure.',
      },
    ],
  },
  14: {
    id: 14,
    title: 'Case Studies',
    icon: '📋',
    essence:
      'Case studies are stories of real situations — what happened, what went wrong, what went right, and what we can learn. They\'re the closest thing to experience you can get without actually being there.',
    rules: [
      'Read the full story before forming opinions — context changes everything',
      'Focus on the decision-making process, not just the outcome',
      'Ask "what would I have done?" before reading what they actually did',
      'Look for the moment where things went right or wrong — that\'s the lesson',
      'Multiple case studies reveal patterns that single cases hide',
    ],
    example: {
      description: 'Case study: A major platform crashed because a single server handled all authentication. The fix? Distribute the load. But the lesson is deeper — it\'s about designing for failure.',
      code: `// Before: single point of failure\nconst authServer = new AuthServer();\napp.use('/login', authServer.handle);\n// → Server goes down → entire platform down\n\n// After: distributed auth\nconst authPool = new ServerPool([\n  new AuthServer('us-east'),\n  new AuthServer('us-west'),\n  new AuthServer('eu-west'),\n]);\napp.use('/login', authPool.handleWithFailover);\n// → One server down → others handle the load`,
      explanation: 'The technical fix is straightforward. The deeper lesson: every system has a critical vulnerability. Finding and eliminating it before it fails is what separates robust systems from fragile ones.',
    },
    pitfalls: [
      {
        title: 'Hindsight bias',
        description: 'Everything looks obvious after the fact. Judge decisions based on what was known at the time, not what we know now.',
      },
      {
        title: 'Learning the wrong lesson',
        description: '"Their database was slow, so databases are bad" — no, their specific database with specific config was bad. Generalize carefully.',
      },
      {
        title: 'Passive reading',
        description: 'Reading case studies like stories is entertainment. Reading them like investigations is education. Engage actively.',
      },
    ],
  },
  15: {
    id: 15,
    title: 'Best Practices',
    icon: '✅',
    essence:
      'Best practices are conventions that the community has agreed on through collective experience. They\'re not laws of nature — they\'re agreements that reduce friction, make code readable, and prevent common mistakes.',
    rules: [
      'Follow conventions even if you disagree — consistency beats individual preference',
      'Understand the reason behind each practice before deciding to break it',
      'Best practices evolve — what was true 5 years ago may be outdated',
      'A practice is "best" only if it applies to your specific context',
      'Document any deviation from best practices with a clear explanation of why',
    ],
    example: {
      description: 'Best practice: use meaningful names. This sounds simple but has profound implications.',
      code: `// ❌ Bad practice\nfunction f(a: number, b: number): number {\n  return a * b;\n}\n\n// ✅ Best practice\nfunction calculateRectangleArea(width: number, height: number): number {\n  return width * height;\n}\n\n// The second version: you know what it does from the name\n// You know what each parameter means\n// You can review it for correctness just by reading`,
      explanation: 'Meaningful names are a best practice because they make code self-documenting. The time saved by a reader understanding the code instantly far exceeds the extra seconds spent naming.',
    },
    pitfalls: [
      {
        title: 'Blindly following practices without understanding why',
        description: 'A practice without understanding becomes a superstition. Know the reason.',
      },
      {
        title: 'Breaking practices to be different',
        description: 'Convention-breaking costs everyone time. Only do it when the benefit is clear and significant.',
      },
      {
        title: 'Applying best practices from the wrong domain',
        description: 'What\'s best for a web app may not be best for an embedded system. Context matters.',
      },
    ],
  },
  16: {
    id: 16,
    title: 'Common Pitfalls',
    icon: '⚠️',
    essence:
      'Knowing what NOT to do is half the battle. This lesson catalogs the most frequent mistakes and explains why people make them — so you can recognize the trap before you step in.',
    rules: [
      'Assume you\'re making at least one of these mistakes right now — vigilance prevents',
      'Most pitfalls share a root cause: not pausing to think before acting',
      'When you encounter a new mistake, add it to your personal checklist',
      'Review common pitfalls before starting any new project',
      'The fact that something worked once doesn\'t mean it\'s not a pitfall',
    ],
    example: {
      description: 'The classic off-by-one error: processing one too many or one too few items.',
      code: `// ❌ Pitfall: array index out of bounds\nconst items = ['a', 'b', 'c'];\nfor (let i = 0; i <= items.length; i++) { // <= is the bug!\n  console.log(items[i]);\n  // 'a', 'b', 'c', undefined ← Oops!\n}\n\n// ✅ Correct: strictly less than\nfor (let i = 0; i < items.length; i++) {\n  console.log(items[i]);\n  // 'a', 'b', 'c'\n}`,
      explanation: 'Arrays are zero-indexed: indices 0, 1, 2 for a 3-element array. Using <= instead of < accesses index 3, which doesn\'t exist. This tiny error causes crashes in every language.',
    },
    pitfalls: [
      {
        title: 'Not recognizing the pitfall until it\'s too late',
        description: 'The whole point of studying pitfalls is to build recognition. You should spot these in code reviews instantly.',
      },
      {
        title: 'Creating new pitfalls while avoiding old ones',
        description: 'Over-correcting is real. Don\'t become so afraid of one mistake that you create a different one.',
      },
      {
        title: 'Thinking "this won\'t happen to me"',
        description: 'These are called "common" pitfalls because they happen to everyone — including you. Stay humble.',
      },
    ],
  },
  17: {
    id: 17,
    title: 'Optimization',
    icon: '🚀',
    essence:
      'Optimization is about making things faster, smaller, or more efficient — but only after they\'re correct. Premature optimization is a famous anti-pattern: making code fast and wrong helps nobody.',
    rules: [
      'First make it work, then make it right, then make it fast — in that order',
      'Measure before optimizing — your intuition about bottlenecks is usually wrong',
      'Optimize the hot path (the 20% of code that takes 80% of the time)',
      'Every optimization should have a measurable target — "faster" is not specific',
      'Document why an optimization was made — future maintainers will want to know',
    ],
    example: {
      description: 'Optimization: caching a computation that\'s called repeatedly with the same inputs.',
      code: `// Before: recalculates every time\nfunction fibonacci(n: number): number {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}\n// fibonacci(40) takes ~30 seconds!\n\n// After: memoization (caching)\nconst cache = new Map<number, number>();\nfunction fibonacciFast(n: number): number {\n  if (cache.has(n)) return cache.get(n)!;\n  if (n <= 1) return n;\n  const result = fibonacciFast(n - 1) + fibonacciFast(n - 2);\n  cache.set(n, result);\n  return result;\n}\n// fibonacciFast(40) takes <1 millisecond!`,
      explanation: 'The naive version recalculates the same values exponentially many times. Caching each result once turns exponential time into linear time — a billion-fold speedup from one data structure.',
    },
    pitfalls: [
      {
        title: 'Optimizing before the code works correctly',
        description: 'A fast wrong answer is worse than a slow right one. Correctness first.',
      },
      {
        title: 'Optimizing the wrong thing',
        description: 'Spending 3 hours optimizing a function that runs 0.1% of the time is wasted effort. Profile first.',
      },
      {
        title: 'Making code unreadable for marginal gains',
        description: 'A 5% speedup that makes the code incomprehensible is almost never worth it.',
      },
    ],
  },
  18: {
    id: 18,
    title: 'Scalability',
    icon: '📈',
    essence:
      'Scalability means your solution continues to work when the input grows 10×, 100×, or 1000×. What works for 10 items might catastrophically fail for 10 million. This lesson teaches you to think about growth from the start.',
    rules: [
      'Design for tomorrow\'s scale, not just today\'s needs',
      'Understand Big-O complexity — it predicts when things will break',
      'Stateless designs scale horizontally; stateful designs create bottlenecks',
      'Test with realistic data volumes, not toy examples',
      'Monitor performance continuously — degradation is gradual until it\'s sudden',
    ],
    example: {
      description: 'A linear search works fine for 10 items. For 10 million, it\'s catastrophically slow. A binary search on sorted data handles billions effortlessly.',
      code: `// O(n) — fine for small arrays\nfunction linearSearch(arr: number[], target: number): number {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === target) return i;\n  }\n  return -1;\n}\n// 10M items = up to 10M checks\n\n// O(log n) — blazing fast at any scale\nfunction binarySearch(arr: number[], target: number): number {\n  let lo = 0, hi = arr.length - 1;\n  while (lo <= hi) {\n    const mid = Math.floor((lo + hi) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) lo = mid + 1;\n    else hi = mid - 1;\n  }\n  return -1;\n}\n// 10M items = at most 24 checks`,
      explanation: 'The difference between O(n) and O(log n) is the difference between checking every item and eliminating half the remaining items each step. At scale, this is the difference between seconds and hours.',
    },
    pitfalls: [
      {
        title: 'Assuming linear growth',
        description: 'Data rarely grows neatly. A feature that handles 100 users might buckle at 101 due to a specific pattern.',
      },
      {
        title: 'Optimizing for scale too early',
        description: 'Building for millions of users when you have 10 is wasted effort. Plan for scale but don\'t over-engineer.',
      },
      {
        title: 'Ignoring the cost of scaling',
        description: 'Every scaling solution has a cost — more servers, more complexity, more eventual consistency. Trade-offs are real.',
      },
    ],
  },
  19: {
    id: 19,
    title: 'Mastery Test',
    icon: '📝',
    essence:
      'The mastery test is your chance to prove that everything you\'ve learned actually sticks. It\'s not about passing — it\'s about honestly assessing where you stand and what still needs work. Treat it as a diagnostic tool, not a judgment.',
    rules: [
      'Take the test under real conditions — no notes, no help, timed',
      'Don\'t skip questions you\'re unsure about — uncertainty is data',
      'Review every wrong answer afterward — each one is a learning opportunity',
      'A low score isn\'t failure — it\'s information about what to study next',
      'Retake the test after studying — measure your growth objectively',
    ],
    example: {
      description: 'Sample mastery question: "Write a function that validates an email address." This seems simple but tests string manipulation, pattern matching, and edge case handling.',
      code: `function isValidEmail(email: string): boolean {\n  const parts = email.split('@');\n  if (parts.length !== 2) return false;\n  const [local, domain] = parts;\n  if (!local || !domain) return false;\n  if (!domain.includes('.')) return false;\n  if (local.includes(' ')) return false;\n  if (domain.includes(' ')) return false;\n  return true;\n}\n\n// Tests:\nisValidEmail('user@example.com');    // true\nisValidEmail('user@example');        // false (no dot)\nisValidEmail('@example.com');        // false (no local part)\nisValidEmail('user name@example.com'); // false (space)`,
      explanation: 'This tests multiple skills: string splitting, conditionals, validation logic, and thinking about edge cases. A complete solution would also check character validity, domain length, and more.',
    },
    pitfalls: [
      {
        title: 'Treating the test as the goal rather than a diagnostic',
        description: 'The point isn\'t to get a perfect score — it\'s to learn what you don\'t know yet. Embrace the gaps.',
      },
      {
        title: 'Cheating yourself by looking up answers',
        description: 'Looking up answers during the test corrupts the diagnostic data. Be honest about what you actually know.',
      },
      {
        title: 'Getting discouraged by a low score',
        description: 'A low score on a comprehensive test is normal. It covers everything — nobody knows everything on the first try.',
      },
    ],
  },
  20: {
    id: 20,
    title: 'Final Boss',
    icon: '👾',
    essence:
      'This is it — the culmination of everything. The Final Boss combines every concept, every technique, every insight from all 19 previous lessons into one comprehensive challenge. It\'s designed to be hard. That\'s the point. You\'re not expected to ace it on the first try — you\'re expected to show everything you\'ve learned.',
    rules: [
      'Read the entire challenge before starting — scope matters',
      'Apply every lesson: basics, patterns, strategy, optimization — all of it',
      'Break it into phases and tackle them systematically',
      'If you can solve this, you\'ve genuinely mastered the material',
      'Whether you pass or fail, the attempt itself is growth',
    ],
    example: {
      description: 'The Final Boss: build a complete system from scratch that processes input, applies logic, handles errors, and produces correct output — all optimized and scalable.',
      code: `// The Final Boss combines everything:\n// 1. Variables & types (Lesson 1-2)\n// 2. Functions & control flow (Lesson 3-4)\n// 3. Problem solving (Lesson 7)\n// 4. Pattern recognition (Lesson 6)\n// 5. Creative thinking (Lesson 9)\n// 6. Best practices (Lesson 15)\n// 7. Edge case handling (Lesson 16)\n// 8. Optimization (Lesson 17)\n// 9. Scalability (Lesson 18)\n//\n// You have all the tools. Trust your training.\n\n// The boss awaits. ⚔️\nconst finalBoss = {\n  status: 'ready',\n  difficulty: 'extreme',\n  defeatCondition: 'apply everything',\n  reward: 'mastery',\n};`,
      explanation: 'The Final Boss isn\'t about one technique — it\'s about orchestrating all of them. The mark of mastery isn\'t knowing every detail; it\'s knowing which detail matters right now.',
    },
    pitfalls: [
      {
        title: 'Panic and try random approaches',
        description: 'The Final Boss is designed to overwhelm your instincts. Stay calm and apply your systematic approach.',
      },
      {
        title: 'Assuming there\'s a trick',
        description: 'There\'s no trick. It\'s all the fundamentals, applied thoughtfully. The trick is that there is no trick.',
      },
      {
        title: 'Giving up before trying',
        description: 'You won\'t solve it all perfectly, and that\'s fine. Partial solutions with solid reasoning demonstrate real competence.',
      },
    ],
  },
};