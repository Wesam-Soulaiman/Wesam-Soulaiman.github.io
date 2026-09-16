/* =============================================================
   PORTFOLIO DATA  —  EDIT THIS FILE ONLY
   Everything on the site is generated from the object below.
   Change a value, save, refresh — nothing else needs touching.
   ============================================================= */

const DATA = {

  /* ---------- 1. IDENTITY ---------- */
  profile: {
    githubUser : "Wesam-Soulaiman",
    fullName   : "Wesam Osama Soulaiman",
    shortName  : "Wesam Soulaiman",
    title      : "Software Engineer",
    // Rotating words in the hero. Add / remove freely.
    roles      : [
      "Full-Stack Developer",
      "IT Engineer",
      "Backend & API Design",
      "ERP / Odoo Developer",
      "Systems & Integration"
    ],
    tagline : "I build systems end to end — from requirements and data models to REST APIs, real-time services and the interfaces people actually use.",
    about : [
      "Information Technology Engineering graduate from Damascus University, specialised in Software Engineering and Information Systems, and currently a full-stack developer at 90soft.",
      "I work across the whole stack: requirements analysis, relational and document data modelling, REST API design, ERP customisation and system integration — then the frontend that sits on top of it. Framework- and domain-agnostic by training, I adapt quickly to whichever area a role requires.",
      "My GitHub is a record of that range: a compiler with code generation in Java, a hybrid search engine in Python, a Raft-replicated distributed system, a hospital ERP on Odoo 17, real-time full-stack applications on the MERN stack, and AI search algorithms applied to games."
    ],
    location : "Al-Abasien, Damascus, Syria",
    availability : "Open to IT Engineer & Software Engineer roles",
    // PROFILE PHOTO — two ways to set it:
    //   A) Upload it to GitHub (Settings > Profile > Picture). The URL below
    //      always serves your current GitHub avatar, so the site follows it
    //      automatically and your GitHub profile gets the photo too.
    //   B) Use a local file instead: drop the image in assets/img/ and put
    //      "assets/img/profile.jpg" here. Square, at least 500x500px.
    avatar : "https://avatars.githubusercontent.com/u/138688775?v=4",
    cv : "assets/cv/WesamSoulaiman-CV.pdf"
  },

  /* ---------- 2. CONTACT & LINKS ---------- */
  contact: {
    email    : "wesamsoulaiman@gmail.com",
    phone    : "+963 952 367 001",
    linkedin : "https://www.linkedin.com/in/wesam-soulaiman/",
    github   : "https://github.com/Wesam-Soulaiman"
  },

  /* ---------- 3. QUICK STATS (hero strip) ----------
     live:true  -> the number is fetched from the GitHub API at runtime.
     value      -> used as-is, and as the fallback if the API is unreachable. */
  stats: [
    { key: "repos",     label: "Public Repositories", value: 14, live: true  },
    { key: "languages", label: "Languages Used",      value: 5,  live: true  },
    { key: "years",     label: "Years of Study",      value: 6,  live: false },
    { key: "projects",  label: "Major Projects",      value: 10, live: false }
  ],

  /* ---------- 4. TECHNICAL SKILLS ----------
     icon = a devicon slug. Full list: https://devicon.dev
     Set icon to null to render a plain text chip instead. */
  skills: [
    {
      group: "Languages",
      blurb: "Core languages I design and implement systems in.",
      items: [
        { name: "Java",       icon: "java/java-original" },
        { name: "JavaScript", icon: "javascript/javascript-original" },
        { name: "TypeScript", icon: "typescript/typescript-original" },
        { name: "Python",     icon: "python/python-original" },
        { name: "HTML5",      icon: "html5/html5-original" },
        { name: "CSS3",       icon: "css3/css3-original" },
        { name: "SQL",        icon: null }
      ]
    },
    {
      group: "Frontend",
      blurb: "Responsive, component-based interfaces with state management and Arabic RTL support.",
      items: [
        { name: "React",        icon: "react/react-original" },
        { name: "Angular",      icon: "angularjs/angularjs-original" },
        { name: "Vue",          icon: "vuejs/vuejs-original" },
        { name: "Vite",         icon: "vitejs/vitejs-original" },
        { name: "Tailwind CSS", icon: "tailwindcss/tailwindcss-original" },
        { name: "Material UI",  icon: "materialui/materialui-original" }
      ]
    },
    {
      group: "Backend & Real-time",
      blurb: "REST APIs, authentication, role-based permissions and WebSocket services.",
      items: [
        { name: "Node.js",      icon: "nodejs/nodejs-original" },
        { name: "Express.js",   icon: "express/express-original" },
        { name: "Django REST",  icon: "django/django-plain" },
        { name: "Socket.IO",    icon: "socketio/socketio-original" },
        { name: "Parse Server", icon: null },
        { name: "JWT Auth",     icon: null }
      ]
    },
    {
      group: "Databases",
      blurb: "Relational and document data modelling.",
      items: [
        { name: "Oracle",     icon: "oracle/oracle-original" },
        { name: "PostgreSQL", icon: "postgresql/postgresql-original" },
        { name: "MySQL",      icon: "mysql/mysql-original" },
        { name: "MongoDB",    icon: "mongodb/mongodb-original" }
      ]
    },
    {
      group: "ERP & Platforms",
      blurb: "Odoo 17 custom modules, Linux deployment and containerised environments.",
      items: [
        { name: "Docker",     icon: "docker/docker-original" },
        { name: "Linux",      icon: "linux/linux-original" },
        { name: "Git",        icon: "git/git-original" },
        { name: "Odoo 17",    icon: null },
        { name: "Cloudinary", icon: null }
      ]
    },
    {
      group: "Software Engineering",
      blurb: "The fundamentals underneath all of the above.",
      items: [
        { name: "Requirements Analysis",        icon: null },
        { name: "Object-Oriented Design",       icon: null },
        { name: "Design Patterns",              icon: null },
        { name: "Data Structures & Algorithms", icon: null },
        { name: "REST API Design",              icon: null },
        { name: "System Integration",           icon: null }
      ]
    }
  ],

  /* ---------- 5. EXPERIENCE ---------- */
  experience: [
    {
      role    : "Full-Stack Developer",
      org     : "90soft",
      period  : "2026 — Present",
      current : true,
      points  : [
        "Building <strong>Code Your Future</strong>, a platform that evaluates candidates by real tasks instead of CV keywords.",
        "Full-stack with Angular and Parse Server: cloud functions, data classes, queries, authentication and role-based permissions.",
        "Own features end to end — data model, backend logic and the interface on top of it."
      ],
      tech : ["Angular", "Parse Server", "TypeScript", "REST APIs"]
    },
    {
      role    : "Software Engineer & Technical Recruiter",
      org     : "90soft",
      period  : "2026 — Present",
      current : true,
      points  : [
        "Scope roles with team leads and write job descriptions grounded in what the work actually requires.",
        "Technically screen engineers and run interview loops through offer and onboarding."
      ],
      tech : ["Technical Screening", "Interviewing", "Hiring"]
    },
    {
      role    : "Frontend Developer",
      org     : "Freelancer",
      period  : "2023",
      current : false,
      points  : [
        "Developed modern web applications with React.js, using Material UI and Tailwind CSS.",
        "Maintained existing web applications and improved their performance and user experience.",
        "Delivered frontend and full-stack web features for clients."
      ],
      tech : ["React", "Material UI", "Tailwind CSS"]
    }
  ],

  /* ---------- 6. EDUCATION ---------- */
  education: [
    {
      degree : "Bachelor of Information Technology Engineering",
      org    : "Damascus University",
      period : "2020 — 2026",
      note   : "Specialised in Software Engineering and Information Systems."
    },
    {
      degree : "Bachelor of Science in Management",
      org    : "Syrian Virtual University (SVU)",
      period : "2024 — Present",
      note   : "Specialised in Human Resources."
    }
  ],

  /* ---------- 7. HIGHLIGHT PROJECT (graduation project, not on GitHub) ----------
     Set to null to remove this section entirely. */
  highlight: {
    name    : "Darb — Public Transit Information System",
    badge   : "Graduation Project",
    partner : "In cooperation with Zajil Transport Company",
    period  : "2024 — Present",
    summary : "A GTFS / GTFS-RT compliant transit information system for Damascus, built to an international data standard: routes, schedules, stops, trip monitoring and real-time vehicle tracking.",
    points  : [
      "Built the operator-facing side — dashboards, tables, maps and management workflows.",
      "Integrated every screen with the backend APIs, handling state, loading and error feedback.",
      "Currently being prepared for a live public launch."
    ],
    tech : ["React", "GTFS / GTFS-RT", "Real-time Data", "Maps", "REST APIs"],
    link : ""   // add a public URL once it launches
  },

  /* ---------- 8. FEATURED PROJECTS ----------
     repo     -> must match the GitHub repository name exactly.
                 Stars, language and last-update date are fetched live.
     title    -> display name on the card.
     summary  -> your own description (overrides the GitHub one).
     category -> used by the filter buttons.
     accent   -> violet | indigo | cyan | emerald | amber | rose */
  projects: [
    {
      repo     : "Optical-Shop-Project",
      title    : "Optical Shop API",
      category : "Backend & APIs",
      accent   : "rose",
      summary  : "A Django REST Framework backend for an eyewear e-commerce platform — 24 models and 22 endpoints covering the catalogue (frames, collections, colors, shapes, lens types and options), carts, favourites, orders, customer prescriptions with uploaded images, wallets and store locations. JWT authentication on a custom user model, nested routers, filtering, search and pagination.",
      tech     : ["Python", "Django REST", "MySQL", "JWT", "Djoser", "REST API Design"]
    },
    {
      repo     : "advanced-banking-system",
      title    : "Advanced Banking System",
      category : "Software Design",
      accent   : "violet",
      summary  : "A layered Spring Boot banking API whose domain is built from design patterns — State for the account lifecycle, Strategy for interest, Decorator for overdraft and premium features, Composite for account groups, Chain of Responsibility for the transaction pipeline and Observer for domain events.",
      tech     : ["Java", "Spring Boot", "Spring Security", "JWT", "PostgreSQL", "Design Patterns"]
    },
    {
      repo     : "Angular-Compiler-Code-Generation",
      title    : "Angular Compiler — Code Generation",
      category : "Compilers",
      accent   : "indigo",
      summary  : "A compiler for Angular templates and CSS, written in Java: ANTLR lexer and parser, a visitor that builds a typed AST, a symbol table with semantic error checks, and a code generator that emits runnable HTML, CSS and JavaScript.",
      tech     : ["Java", "ANTLR", "AST", "Symbol Table", "Code Generation"]
    },
    {
      repo     : "ir-search-engine",
      title    : "Information Retrieval Search Engine",
      category : "AI & Data",
      accent   : "cyan",
      summary  : "A search engine over 500,000+ Quora and 240,000+ clinical-trial documents: TF-IDF, BM25 and dense retrieval with Sentence Transformers and FAISS, hybrid ranking with reciprocal rank fusion, sharded BM25 and learning-to-rank reranking — evaluated with MAP, nDCG@10, Precision@10 and Recall.",
      tech     : ["Python", "Django REST", "React", "BM25", "FAISS", "Learning to Rank"]
    },
    {
      repo     : "secure-distributed-system",
      title    : "Secure Distributed System",
      category : "Systems & Security",
      accent   : "emerald",
      summary  : "A three-node Raft cluster — leader election, log replication, majority commits and failover — behind a custom load balancer with weighted round robin and consistent hashing, circuit breakers with exponential-backoff retry, and an Nginx gateway with a WAF and rate limiting. A React dashboard lets you fail the leader and watch the election.",
      tech     : ["Node.js", "Raft", "Load Balancing", "Nginx WAF", "Docker", "React"]
    },
    {
      repo     : "MERN-auth",
      title    : "MERN Authentication",
      category : "Full-Stack",
      accent   : "amber",
      summary  : "A complete authentication flow on the MERN stack: sign-up with email verification, login, forgot and reset password, bcrypt-hashed credentials, and JWT sessions in httpOnly cookies guarding protected routes.",
      tech     : ["MongoDB", "Express", "React", "Node.js", "JWT", "bcrypt"]
    }
  ],

  /* ---------- 9. OTHER REPOSITORIES ---------- */
  showOtherRepos : true,
  otherReposNote : "Everything else on my GitHub — coursework, experiments and smaller builds.",

  /* ---------- 10. SITE OPTIONS ---------- */
  options: {
    defaultTheme  : "dark",   // "dark" or "light"
    showGithubAPI : true,     // live stars / languages / repo list
    footerNote    : "Built from scratch — no template."
  }
};
