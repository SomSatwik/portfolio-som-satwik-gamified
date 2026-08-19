/* =====================================================================
   MODEL — the data and state of the app. Never touches the DOM.
   Edit your content here: featured projects, skills, image overrides.
   ===================================================================== */

const Model = {

  githubUser: "SomSatwik",

  // Where the contact form delivers (via formsubmit.co relay)
  contactEmail: "ssomsatwikdeo@gmail.com",

  // App state (read/written by the Controller, displayed by the View)
  state: {
    screen: "home",        // which screen is showing
    menuIndex: 0,          // selected item on the home menu
    reposLoaded: false,
    skillsBuilt: false,
  },

  // ---- Featured projects (hand-written, shown above the GitHub feed) ----
  featured: [
    {
      title: "CyberBattleground",
      tag: "Cybersecurity", color: "#e60012", live: false,
      url: "https://github.com/SomSatwik/CyberBattleground",
      cta: "View on GitHub →",
      img: "assets/projects/CyberBattleground.png",
      desc: "A cybersecurity training environment built around intentionally vulnerable targets and hands-on security challenges. Designed for learning offensive and defensive concepts in a controlled, legal setting.",
    },
    {
      title: "Realtime Tracker",
      tag: "Full-Stack", color: "#3dff6e", live: false,
      url: "https://github.com/SomSatwik/realtime-tracker",
      cta: "View on GitHub →",
      img: "assets/projects/realtime-tracker.png",
      desc: "A real-time location tracking application with live map updates. Built with Node.js, Socket.io, and Leaflet.js — broadcasting device coordinates to all connected clients instantly.",
    },

  ],

  // Repos already shown in "featured" get hidden from the GitHub feed
  featuredRepoNames: [
    "CyberBattleground",
    "realtime-tracker"
  ],

  // Shown if the GitHub API can't be reached
  fallbackRepos: [
    {
      name: "CyberBattleground", language: "Python", stargazers_count: 0,
      html_url: "https://github.com/SomSatwik/CyberBattleground",
      description: "Cybersecurity training environment with intentionally vulnerable targets and hands-on security challenges.",
    },
    {
      name: "realtime-tracker", language: "JavaScript", stargazers_count: 0,
      html_url: "https://github.com/SomSatwik/realtime-tracker",
      description: "Real-time location tracking app with live map updates using Socket.io and Leaflet.js.",
    },

  ],

  // Optional thumbnail overrides: repo name → image path.
  projectImages: {},

  langColors: {
    JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5",
    PHP: "#4F5D95", CSS: "#663399", HTML: "#e34c26",
    "Jupyter Notebook": "#DA5B0B", MATLAB: "#e16737", Java: "#b07219",
    C: "#555", "C++": "#f34b7d", Kotlin: "#7F52FF", Dart: "#00B4AB",
  },

  // ---- Skills screen ----
  skills: [
    { group: "Languages", items: [
      ["Java", 82], ["Python", 80], ["JavaScript", 85], ["C", 65],
    ]},
    { group: "Web & Development", items: [
      ["React / Next.js", 84], ["Node.js & REST APIs", 80],
      ["Vite", 78], ["Tailwind CSS", 82], ["HTML & CSS", 88],
    ]},
    { group: "Database & Backend", items: [
      ["Firebase", 80], ["Supabase", 75], ["Appwrite", 72],
      ["SQL Basics", 70],
    ]},
    { group: "Data & AI", items: [
      ["AI / ML Concepts", 72], ["Power BI", 70],
      ["Data Science Fundamentals", 68],
    ]},
    { group: "Cybersecurity", items: [
      ["Security Testing", 76], ["Web Security Concepts", 74],
      ["CTF Challenges", 72], ["Vulnerability Assessment", 68],
    ]},
    { group: "Tools & DevOps", items: [
      ["Git & GitHub", 90], ["Docker", 70],
      ["Linux / Bash", 72], ["VS Code & Dev Tools", 88],
    ]},
  ],

  // ---- Data fetching ----
  async fetchRepos() {
    const skip = new Set(this.featuredRepoNames);
    try {
      const res = await fetch(
        `https://api.github.com/users/${this.githubUser}/repos?per_page=100&sort=updated`
      );
      if (!res.ok) throw new Error(res.status);
      const repos = (await res.json()).filter(r => !r.fork && !skip.has(r.name));
      return { repos, live: true };
    } catch {
      return { repos: this.fallbackRepos.filter(r => !skip.has(r.name)), live: false };
    }
  },
};
