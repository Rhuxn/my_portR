// ===================
// Dados dos projetos
// ===================
const projects = [
  {
    title: ["Página de Cursos e Portfólios", "Courses and Portfolios Page"],
    desc: [
      "Participei do desenvolvimento da página que lista cursos e portfólios de alunos, utilizando HTML, CSS e JavaScript para criar um layout responsivo e interativo.",
      "I participated in developing the page listing courses and student portfolios, using HTML, CSS, and JavaScript to build a responsive and interactive layout."
    ],
    imgSrc: "imgProjetos/84u414wv.png",
    imgAlt: ["Imagem da Página de Cursos e Portfólios", "Courses and Portfolios Page Image"],
    url: "https://talentosproz.com.br/"
  },
  {
    title: ["Em breve", "Coming Soon"],
    desc: ["...", "..."],
    imgSrc: "images/projeto2.jpg",
    imgAlt: ["Imagem do Projeto 2", "Project 2 Image"],
    url: "https://link-do-projeto2.com"
  }
];

// ===================
// Elementos DOM
// ===================
let isEnglish = false;

const darkModeToggle = document.getElementById("dark-mode-toggle");
const translateToggle = document.getElementById("translate-toggle");
const menuBtn = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");
const closeBtn = document.getElementById("close-sidebar");

// ===================
// Função: Trocar idioma
// ===================
function applyLanguage() {
  document.querySelector("header h1").textContent = "Rhuan";
  document.querySelector("#sobre h2").textContent = isEnglish ? "About Me" : "Sobre Mim";
  document.querySelector("#projetos h2").textContent = isEnglish ? "Projects" : "Projetos";
  document.querySelector("#contato h2").textContent = isEnglish ? "Contact" : "Contato";

  document.querySelector(".sobre-texto").innerHTML = isEnglish 
    ? "Hello, my name is <strong>Rhuan</strong>, I'm 18 years old and a Systems Analysis and Development student. I'm passionate about technology and programming, and I'm at the beginning of my journey to become a full-stack developer. My goal is to master both front-end and back-end, creating efficient and intuitive applications. I always seek to learn new technologies, improve my skills, and face challenges that help me grow professionally."
    : "Olá, meu nome é <strong>Rhuan</strong>, tenho 18 anos e sou estudante de Análise e Desenvolvimento de Sistemas. Sou apaixonado por tecnologia e programação e estou no início da minha jornada para me tornar um desenvolvedor full-stack. Meu objetivo é dominar tanto o front-end quanto o back-end, criando aplicações eficientes e intuitivas. Sempre busco aprender novas tecnologias, aprimorar minhas habilidades e enfrentar desafios que me ajudem a crescer profissionalmente.";

  document.querySelectorAll(".project").forEach((project, i) => {
    project.querySelector("h3").textContent = isEnglish ? projects[i].title[1] : projects[i].title[0];
    project.querySelector("p").textContent = isEnglish ? projects[i].desc[1] : projects[i].desc[0];

    const img = project.querySelector("img.project-img");
    if (img) {
      img.src = projects[i].imgSrc;
      img.alt = isEnglish ? projects[i].imgAlt[1] : projects[i].imgAlt[0];
    }

    const link = project.querySelector("a.project-link");
    if (link) {
      link.href = projects[i].url;
    }
  });

  const socialLinks = document.querySelectorAll(".social-links a");
  if (socialLinks.length >= 2) {
    socialLinks[0].textContent = "GitHub";
    socialLinks[1].textContent = isEnglish ? "Email" : "Email";
  }
}

// ===================
// Função: Carregar partículas com cor baseada no tema
// ===================
function loadParticles(darkMode = false) {
  const color = darkMode ? "#ffffff" : "#222222";

  tsParticles.load("tsparticles", {
    fullScreen: { enable: false },
    particles: {
      number: { value: 60 },
      color: { value: color },
      shape: { type: "circle" },
      opacity: { value: 0.4 },
      size: { value: 3 },
      move: {
        enable: true,
        speed: 1,
        outModes: { default: "out" }
      },
      links: {
        enable: true,
        distance: 120,
        color: color,
        opacity: 0.5,
        width: 1
      }
    },
    background: { color: "transparent" }
  });
}

// ===================
// Event Listeners
// ===================

// Modo escuro
darkModeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", JSON.stringify(isDark));

  // Recarrega partículas com a cor certa
  if (window.tsParticles && document.getElementById("tsparticles")) {
    tsParticles.dom().forEach(p => p.destroy());
    loadParticles(isDark);
  }
});

// Menu lateral
menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  menuBtn.style.visibility = sidebar.classList.contains("active") ? "hidden" : "visible";
});

closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("active");
  menuBtn.style.visibility = "visible";
});

document.querySelectorAll("#sidebar a").forEach(link => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("active");
    menuBtn.style.visibility = "visible";
  });
});

// Idioma
translateToggle.addEventListener("click", () => {
  isEnglish = !isEnglish;
  translateToggle.textContent = isEnglish ? "🌐 PT" : "🌐 EN";
  applyLanguage();
  localStorage.setItem("isEnglish", JSON.stringify(isEnglish));
});

// ===================
// Inicialização geral
// ===================
document.addEventListener("DOMContentLoaded", () => {
  const savedDarkMode = JSON.parse(localStorage.getItem("darkMode"));
  const savedLang = JSON.parse(localStorage.getItem("isEnglish"));

  if (savedDarkMode) {
    document.body.classList.add("dark-mode");
  }

  if (savedLang !== null) {
    isEnglish = savedLang;
    translateToggle.textContent = isEnglish ? "🌐 PT" : "🌐 EN";
  }

  applyLanguage();

  // AOS (animação)
  if (window.AOS) {
    AOS.init({
      once: false,
      mirror: true,
      duration: 800,
      easing: 'ease-in-out',
    });
  }

  // tsParticles
  if (window.tsParticles && document.getElementById("tsparticles")) {
    loadParticles(savedDarkMode);
  }
});
