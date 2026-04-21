// Mock data for Harshil Buha's Portfolio

export const personalInfo = {
  name: "HARSHIL BUHA",
  firstName: "HARSHIL",
  lastName: "BUHA",
  title: "React Native Developer",
  tagline: "Building High-Performance Mobile Experiences",
  email: "harshilbuha119@gmail.com",
  phone: "+91 9898669528",
  linkedin: "https://in.linkedin.com/in/harshil-buha-682630261",
  github: "https://github.com/harshilbuha119",
  resumeUrl: "https://customer-assets.emergentagent.com/job_cd384ade-14c3-4cc4-98bd-63d60554ac99/artifacts/96kj2nar_Harshil-CV2025.pdf",
  about: "Passionate React Native Developer with expertise in building scalable, high-performance mobile applications. Specialized in performance optimization, real-time systems, and creating seamless user experiences. Proven track record of reducing API latency by 65% and improving app performance through smart architecture and modern development practices."
};

export const projects = [
  {
    id: 5,
    title: "Ashirwad Jewellers",
    subtitle: "Luxury Jewellery E-Commerce Platform",
    description:
      "Engineered a premium dark-editorial jewellery e-commerce app for Ashirwad Jewellers with cinematic animated splash/login flows, live gold & silver price engine, smart product discovery, cart management, multi-method checkout, deep linking, and an admin banner upload system.",
    image: "https://res.cloudinary.com/ds3x2mbi3/image/upload/v1772018369/Frame_1_3_fjqyqy.png",
    techStack: [
      "React Native",
      "Firebase Auth",
      "Supabase",
      "TanStack Query",
      "React Navigation",
      "Notifee",
      "Linear Gradient",
      "FastImage",
    ],
    highlights: [
      "Cinematic 7-stage animated splash & letter-by-letter brand reveal on login",
      "Live metal price engine: rate_per_gm_24k × purity multiplier × 10% duty + 3% GST",
      "Deep link product sharing with carat, color & width params encoded in URL",
      "Admin panel: festival banner upload to Supabase Storage with animated progress bar",
      "Staggered FlatList animations, gold shimmer dividers & spring-physics interactions throughout",
      "Supabase-backed cart, favourites, orders & real-time jewellery catalog",
      "Google Sign-In via Firebase Auth with full session persistence",
      "Custom floating pill tab bar with keyboard-aware hide/show logic",
    ],
    metrics: {
      animation: "7-stage cinematic entrance sequence per screen",
      pricing: "Live price = rate_per_gm_24k × purity × weight + 13% taxes",
    },
    liveLink: "#",
    githubLink: "https://github.com/HarshilBuha119/Ashirwad-Jewellers",
  },
  {
    id: 4,
    title: "Porralia - Betting App",
    subtitle: "Social Pools & Sports Prediction Platform",
    description:
      "Built a cross-platform React Native social pools and prediction app where users create contests around sports and TV events, make picks together, and compete using a virtual points system instead of real money.",
    image: "https://res.cloudinary.com/ds3x2mbi3/image/upload/v1771336096/Thumbnail_2_up2ude.png",
    techStack: [
      "React Native",
      "Expo",
      "Redux Toolkit",
      "React Query",
      "REST APIs",
      "JWT Authentication"
    ],
    highlights: [
      "Designed guided 5-step pool creation flow with validation and structured API payloads",
      "Implemented monthly 100 virtual points allocation system with balance tracking",
      "Built flexible reward distribution: Points Split & Podium (1st/2nd/3rd) modes",
      "Season-long rankings with leaderboard & recurring competitive challenges"
    ],
    metrics: {
      gamification: "100 monthly virtual points per user",
      flexibility: "Multiple reward distribution modes"
    },
    liveLink: "#",
    githubLink: "#",
  },
  {
    id: 1,
    title: "ActSafe Emergency Response",
    subtitle: "Emergency Management & Operations Platform",
    description: "Engineered a cross-platform emergency management app for incident reporting, real-time team coordination, and field operations with Firebase-powered messaging and geolocation workflows.",
    image: "https://res.cloudinary.com/ds3x2mbi3/image/upload/v1769675055/Poster_for_act_safe_1_edavt1.jpg",
    techStack: ["React Native", "Firebase", "React Query", "Context API", "Geolocation", "WebSockets"],
    highlights: [
      "Real-time messaging with Firebase Realtime Database",
      "Atomic transactions & offline sync",
      "Geolocation with react-native-maps integration",
      "Optimized FlatList with memoization & windowing"
    ],
    metrics: {
      performance: "Optimized rendering with debounced updates",
      scale: "Handles 100+ concurrent users"
    },
    liveLink: "#",
    githubLink: "https://github.com/harshilbuha119"
  },
  {
    id: 2,
    title: "InvoiceApp",
    subtitle: "High-Performance Invoice Management",
    description: "Developed a full-featured invoice management app with CRUD operations, offline persistence, biometric authentication, and lightning-fast PDF/HTML export capabilities.",
    image: "https://res.cloudinary.com/ds3x2mbi3/image/upload/v1771403151/Cover_1_ypvna9.png",
    techStack: ["Expo", "React Native", "MMKV", "TanStack Query", "Biometric Auth", "expo-print"],
    highlights: [
      "Sub-second data operations (244ms write, 27ms read)",
      "Secure biometric/fingerprint authentication",
      "O(1) HashMap lookups for instant search",
      "Offline-first architecture with background sync"
    ],
    metrics: {
      performance: "244ms write for 10K records",
      speed: "27ms read for 13K records"
    },
    liveLink: "#",
    githubLink: "#"
  },
  {
    id: 3,
    title: "Crypto Trading Simulator",
    subtitle: "Real-Time Trading Platform with AI Assistant",
    description: "Developed a full-stack paper trading simulator leveraging Binance WebSocket API for real-time cryptocurrency data across 50+ trading pairs with AI-powered trading insights.",
    image: "https://res.cloudinary.com/ds3x2mbi3/image/upload/v1771416196/Untitled_scttao.png",
    techStack: ["React Native", "WebSocket", "OpenRouter AI", "Chart Kit", "Node.js", "Binance API"],
    highlights: [
      "AI trading assistant with personalized insights",
      "WebSocket with auto-reconnection & data throttling",
      "Processes 1,000+ price updates per second",
      "Interactive charts with 8 timeframes & real-time candlesticks"
    ],
    metrics: {
      realtime: "1,000+ updates/second",
      coverage: "50+ trading pairs"
    },
    liveLink: "#",
    githubLink: "#"
  },
];

export const skills = {
  languages: ["JavaScript", "TypeScript", "Python", "Java"],
  mobile: [
    "React Native",
    "Expo",
    "React Navigation",
    "Reanimated",
    "Gesture Handler",
    "Notifee",
    "FCM"
  ],
  stateManagement: [
    "Redux Toolkit",
    "Context API",
    "React Query",
    "AsyncStorage",
    "Firebase Realtime DB"
  ],
  backend: [
    "Node.js",
    "REST APIs",
    "WebSockets",
    "JWT Authentication",
    "Flask"
  ],
  tools: [
    "Git",
    "GitHub",
    "Android Studio",
    "VS Code",
    "Postman",
    "EAS Build"
  ],
  dataScience: ["Pandas", "NumPy", "Exploratory Data Analysis"]
};

export const experience = [
  {
    id: 1,
    company: "DotPitch Technologies",
    location: "Ahmedabad",
    position: "React Native Developer",
    period: "Jul 2025 - Present",
    type: "Full-time",
    achievements: [
      "Built and deployed REST APIs with JWT auth, Joi validation, and rate limiting, significantly reducing unauthorized access",
      "Integrated FCM and Notifee for local, scheduled, and push notifications, improving user engagement and delivery reliability",
      "Added voice features using expo-av and expo-speech for audio recording, playback, and text-to-speech powered interactions",
      "Improved API performance using React Query caching, batching, and retry logic, cutting average latency from 800ms to 280ms"
    ],
    impact: "65% latency reduction"
  },
  {
    id: 2,
    company: "Silver Sky Technology",
    location: "Ahmedabad",
    position: "React Native Intern",
    period: "Dec 2024 - Jul 2025",
    type: "Internship",
    achievements: [
      "Integrated 10+ REST APIs with pagination, skeleton loaders, and optimistic UI updates, improving perceived performance",
      "Implemented Redux Toolkit for centralized state management across 8 feature modules, reducing prop drilling and state-related bugs by 60%",
      "Collaborated with backend team to optimize API payloads using field filtering and data compression, reducing response size by 40% and improving load time by 18%"
    ],
    impact: "60% bug reduction"
  }
];

export const education = {
  degree: "Bachelor of Technology in Computer Science and Engineering",
  university: "LJ University",
  location: "Ahmedabad",
  period: "2022 - 2026"
};

export const certifications = [
  "React Native Bootcamp - LetsUpgrade",
  "Exploratory Data Analysis for Machine Learning - IBM (Coursera)",
  "Inheritance and Data Structures in Java - Coursera",
  "Introduction to Java - LearnQuest"
];
