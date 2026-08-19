/* =====================================================================
   TERMINAL EASTER EGG — simulated frontend-only terminal.
   Does NOT execute any real shell commands.
   Activated by pressing T or clicking the >_ button.
   ===================================================================== */

const Terminal = {

  open: false,
  history: [],
  historyIdx: -1,

  el: {
    overlay:  null,
    output:   null,
    input:    null,
    closeBtn: null,
  },

  init() {
    this.el.overlay  = document.getElementById("terminal-overlay");
    this.el.output   = document.getElementById("terminal-output");
    this.el.input    = document.getElementById("terminal-input");
    this.el.closeBtn = document.getElementById("terminal-close");

    document.getElementById("terminal-trigger")?.addEventListener("click", () => this.toggle());
    this.el.closeBtn.addEventListener("click", () => this.close());
    this.el.input.addEventListener("keydown", e => this.handleKey(e));

    // "T" key to open from home screen
    addEventListener("keydown", e => {
      if (e.key === "t" || e.key === "T") {
        if (document.activeElement?.tagName === "INPUT" ||
            document.activeElement?.tagName === "TEXTAREA") return;
        if (Model.state.screen === "home" || this.open) this.toggle();
      }
      if (e.key === "Escape" && this.open) {
        this.close();
        e.stopPropagation();
      }
    });
  },

  toggle() {
    this.open ? this.close() : this.show();
  },

  show() {
    this.open = true;
    this.el.overlay.classList.add("visible");
    this.el.overlay.setAttribute("aria-hidden", "false");
    if (!this.el.output.innerHTML) this.boot();
    setTimeout(() => this.el.input.focus(), 80);
  },

  close() {
    this.open = false;
    this.el.overlay.classList.remove("visible");
    this.el.overlay.setAttribute("aria-hidden", "true");
  },

  boot() {
    const lines = [
      "╔══════════════════════════════════════════╗",
      "║   SOM.DEV  ·  PORTFOLIO TERMINAL v1.0   ║",
      "╚══════════════════════════════════════════╝",
      "",
      " SYSTEM  : SomSatwik's Portfolio",
      " STATUS  : ONLINE",
      " MODE    : BUILDING",
      "",
      " Type <strong>help</strong> to see available commands.",
      "",
    ];
    lines.forEach(l => this.print(l));
  },

  print(text, cls = "") {
    const p = document.createElement("p");
    if (cls) p.className = cls;
    p.innerHTML = text;
    this.el.output.appendChild(p);
    this.el.output.scrollTop = this.el.output.scrollHeight;
  },

  echo(text) {
    this.print(`<span class="term-cmd">$ ${text}</span>`);
  },

  handleKey(e) {
    if (e.key === "Enter") {
      const cmd = this.el.input.value.trim();
      this.el.input.value = "";
      if (!cmd) return;
      this.history.unshift(cmd);
      this.historyIdx = -1;
      this.echo(cmd);
      this.run(cmd.toLowerCase());
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (this.historyIdx < this.history.length - 1) {
        this.historyIdx++;
        this.el.input.value = this.history[this.historyIdx];
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (this.historyIdx > 0) {
        this.historyIdx--;
        this.el.input.value = this.history[this.historyIdx];
      } else {
        this.historyIdx = -1;
        this.el.input.value = "";
      }
    }
  },

  run(cmd) {
    const c = cmd.split(" ")[0];
    switch (c) {
      case "help":
        this.print("Available commands:");
        this.print("  <strong>about</strong>      — who is Som Satwik?");
        this.print("  <strong>skills</strong>     — tech stack & skills");
        this.print("  <strong>projects</strong>   — featured projects");
        this.print("  <strong>github</strong>     — open GitHub profile");
        this.print("  <strong>contact</strong>    — contact info");
        this.print("  <strong>resume</strong>     — download resume");
        this.print("  <strong>status</strong>     — current system status");
        this.print("  <strong>clear</strong>      — clear the terminal");
        this.print("  <strong>exit</strong>       — close the terminal");
        break;

      case "about":
        this.print("");
        this.print(" <strong>Som Satwik Deo</strong> — Developer, Builder, Cyber Enthusiast");
        this.print(" Building across Web, AI/ML, Cybersecurity, and IoT.");
        this.print(" Stack: Java · Python · JavaScript · React · Node.js · Docker");
        this.print(" Interests: Security research, full-stack apps, open source.");
        this.print("");
        break;

      case "skills":
        this.print("");
        this.print(" LANGUAGES   : Java, Python, JavaScript, C");
        this.print(" WEB         : React, Next.js, Node.js, Vite, Tailwind CSS");
        this.print(" BACKEND     : Firebase, Supabase, Appwrite");
        this.print(" DATA / AI   : AI/ML, Power BI, Data Science");
        this.print(" SECURITY    : CTF, Web Security, Vulnerability Assessment");
        this.print(" TOOLS       : Git, Docker, Linux, VS Code");
        this.print("");
        break;

      case "projects":
        this.print("");
        this.print(" 01. <strong>CyberBattleground</strong>     — Cybersecurity training environment");
        this.print("     <a href='https://github.com/SomSatwik/CyberBattleground' target='_blank' rel='noopener'>github.com/SomSatwik/CyberBattleground</a>");
        this.print("");
        this.print(" 02. <strong>Realtime Tracker</strong>       — Live location tracking app");
        this.print("     <a href='https://github.com/SomSatwik/realtime-tracker' target='_blank' rel='noopener'>github.com/SomSatwik/realtime-tracker</a>");
        this.print("");
        this.print(" See all → navigate to PROJECTS or visit github.com/SomSatwik");
        this.print("");
        break;

      case "github":
        this.print(" Opening GitHub profile…");
        window.open("https://github.com/SomSatwik", "_blank", "noopener");
        break;

      case "contact":
        this.print("");
        this.print(" EMAIL    : ssomsatwikdeo@gmail.com");
        this.print(" GITHUB   : github.com/SomSatwik");
        this.print(" LINKEDIN : linkedin.com/in/som-satwik-deo");
        this.print(" INSTAGRAM: instagram.com/som.7wik");
        this.print(" PHONE    : +91 8511766395");
        this.print("");
        break;

      case "resume":
        this.print(" Downloading resume…");
        const a = document.createElement("a");
        a.href = "assets/cv/Som Satwik Deo Resume.pdf";
        a.download = "Som_Satwik_Deo_Resume.pdf";
        a.click();
        break;

      case "status":
        this.print("");
        this.print(` SYSTEM  : SOM.DEV`);
        this.print(` TIME    : ${new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})} IST`);
        this.print(` MODE    : BUILDING`);
        this.print(` STATUS  : <span style="color:#3dff6e">● ONLINE</span>`);
        this.print(` UPTIME  : Since birth, roughly`);
        this.print("");
        break;

      case "clear":
        this.el.output.innerHTML = "";
        break;

      case "exit":
        this.close();
        break;

      case "whoami":
        this.print(" som — developer, builder, cyber enthusiast.");
        break;

      case "sudo":
        this.print(" Nice try. This is a frontend terminal.", "term-error");
        break;

      case "ls":
      case "dir":
        this.print(" projects/  skills/  about/  contact/  resume.pdf");
        break;

      case "cat":
        this.print(" Usage: try <strong>about</strong> or <strong>projects</strong> instead.");
        break;

      case "ping":
        this.print(" PING som.dev: 64 bytes — time=1ms TTL=64");
        this.print(" Reply: I'm here.");
        break;

      case "":
        break;

      default:
        this.print(` Command not found: <strong>${cmd.split(" ")[0]}</strong>. Type <strong>help</strong> for commands.`, "term-error");
    }
  },
};

document.addEventListener("DOMContentLoaded", () => Terminal.init());
