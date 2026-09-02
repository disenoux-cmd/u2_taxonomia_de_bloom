"use strict";

const levels = [
  {
    name: "Recordar",
    order: "Orden inferior",
    definition: "Recupera hechos, datos o conceptos previamente aprendidos sin exigir todavía una comprensión profunda.",
    verbs: ["definir", "nombrar", "listar", "localizar", "reconocer", "recitar", "identificar"],
    evidence: ["Definición escrita", "Diagrama etiquetado", "Listado de términos", "Test rápido"],
    time: "Úsalo durante 5 a 10 minutos para activar saberes previos. Es un trampolín, no el propósito central de toda la sesión."
  },
  {
    name: "Comprender",
    order: "Orden inferior",
    definition: "Construye significado: explica ideas con palabras propias, encuentra relaciones y demuestra una comprensión básica.",
    verbs: ["explicar", "resumir", "clasificar", "comparar", "parafrasear", "interpretar", "inferir"],
    evidence: ["Cuadro comparativo", "Ejemplo propio", "Esquema de conceptos", "Resumen estructurado"],
    time: "Invita a parafrasear e interpretar entre pares. Así reduces explicaciones magistrales y aumentas la participación activa."
  },
  {
    name: "Aplicar",
    order: "Orden inferior",
    definition: "Usa conocimientos, técnicas o conceptos en una situación nueva para resolver un problema o ejecutar una tarea.",
    verbs: ["usar", "resolver", "demostrar", "construir", "simular", "transferir", "organizar"],
    evidence: ["Demostración en vivo", "Simulación de roles", "Entrevista realizada", "Maqueta funcional"],
    time: "Entrega instrucciones ECOS antes de iniciar: específicas, concretas, observables y secuenciales. Evitarás interrupciones repetitivas."
  },
  {
    name: "Analizar",
    order: "Orden superior",
    definition: "Descompone información para identificar causas, motivos, patrones y relaciones; encuentra evidencias para sustentar inferencias.",
    verbs: ["examinar", "comparar", "diferenciar", "inferir", "investigar", "categorizar", "priorizar"],
    evidence: ["Diagrama causa-efecto", "Datos interpretados", "Texto deconstruido", "Informe estructurado"],
    time: "Estructura la concentración con una rutina como “Veo, pienso, me pregunto”. El análisis gana foco y la discusión no se dispersa."
  },
  {
    name: "Evaluar",
    order: "Orden superior",
    definition: "Emite juicios sobre la validez de una idea o la calidad de un trabajo, utilizando criterios específicos y evidencias.",
    verbs: ["justificar", "argumentar", "valorar", "criticar", "defender", "recomendar", "juzgar"],
    evidence: ["Reseña crítica", "Debate estructurado", "Coevaluación con rúbrica", "Juicio sustentado"],
    time: "La coevaluación en duplas empáticas distribuye la retroalimentación y promueve corresponsabilidad en tiempo real."
  },
  {
    name: "Crear",
    order: "Orden superior",
    definition: "Combina elementos para construir algo nuevo, formular un modelo o proponer soluciones alternativas a problemas reales.",
    verbs: ["diseñar", "proponer", "transformar", "formular", "innovar", "modelar", "elaborar"],
    evidence: ["Prototipo funcional", "Plan de acción", "Producción audiovisual", "Solución comunitaria"],
    time: "Asigna roles colaborativos explícitos para que la energía creativa se convierta en trabajo autónomo, coordinado y enfocado."
  }
];

const cases = {
  english: {
    lowTitle: "Repetir sin producir",
    lowAction: "“Repitan después de mí: The dog is big”.",
    lowAnalysis: "La repetición mecánica ocupa el tiempo, pero no exige usar el lenguaje con un propósito real.",
    highTitle: "Aplicar para comunicar",
    highAction: "“Describe un animal que te guste usando adjetivos en una conversación corta”.",
    highAnalysis: "Las y los estudiantes producen lenguaje, toman decisiones y lideran su participación."
  },
  stem: {
    lowTitle: "Colorear sin indagar",
    lowAction: "“Hagan una cartelera con la frase Cuidemos el agua y decórenla”.",
    lowAnalysis: "La operación consume buena parte de la clase sin exigir análisis científico ni uso de datos.",
    highTitle: "Analizar para crear",
    highAction: "“Analicen datos de consumo, formulen una hipótesis y diseñen una solución viable”.",
    highAnalysis: "Cada minuto se dedica a investigar, contrastar variables y proponer una respuesta fundamentada."
  }
};

const levelTabs = [...document.querySelectorAll(".level-tabs [data-level]")];

function renderLevel(index, focusPanel = false) {
  const level = levels[index];
  document.querySelector("#level-number").textContent = String(index + 1);
  document.querySelector("#level-order").textContent = level.order;
  document.querySelector("#level-name").textContent = level.name;
  document.querySelector("#level-definition").textContent = level.definition;
  document.querySelector("#level-verbs").replaceChildren(...level.verbs.map((verb) => {
    const chip = document.createElement("span");
    chip.textContent = verb;
    return chip;
  }));
  document.querySelector("#level-evidence").replaceChildren(...level.evidence.map((evidence) => {
    const item = document.createElement("li");
    item.textContent = evidence;
    return item;
  }));
  document.querySelector("#level-time").textContent = level.time;
  levelTabs.forEach((tab, tabIndex) => {
    const selected = tabIndex === index;
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });
  document.querySelector("#level-panel").setAttribute("aria-labelledby", `level-tab-${index}`);
  document.querySelector(".level-identity").style.backgroundColor = ["#0b5e9b", "#087d83", "#126aa5", "#d9620d", "#a97b00", "#0a457d"][index];
  if (focusPanel) document.querySelector("#level-panel").focus({ preventScroll: true });
}

document.querySelectorAll(".bloom-tray").forEach((tray) => {
  tray.addEventListener("click", () => {
    const index = Number(tray.dataset.level);
    document.querySelector(".tray-workbench").classList.add("has-selection");
    document.querySelectorAll(".bloom-tray").forEach((item) => {
      const selected = item === tray;
      item.classList.toggle("is-open", selected);
      item.setAttribute("aria-expanded", String(selected));
    });
    renderLevel(index);
    window.setTimeout(() => document.querySelector("#niveles").scrollIntoView({ behavior: "smooth" }), 360);
  });
});

levelTabs.forEach((tab) => tab.addEventListener("click", () => renderLevel(Number(tab.dataset.level), true)));

function enableTabKeyboard(tabs, activate) {
  tabs.forEach((tab, index) => tab.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : index + (event.key === "ArrowRight" ? 1 : -1);
    nextIndex = (nextIndex + tabs.length) % tabs.length;
    tabs[nextIndex].focus();
    activate(tabs[nextIndex]);
  }));
}

enableTabKeyboard(levelTabs, (tab) => renderLevel(Number(tab.dataset.level)));

const caseTabs = [...document.querySelectorAll(".case-switch button")];

function renderCase(button) {
  const selectedCase = cases[button.dataset.case];
  caseTabs.forEach((item) => {
    const selected = item === button;
    item.setAttribute("aria-selected", String(selected));
    item.tabIndex = selected ? 0 : -1;
  });
  document.querySelector("#case-panel").setAttribute("aria-labelledby", button.id);
  Object.entries(selectedCase).forEach(([key, value]) => {
    document.querySelector(`#case-${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`).textContent = value;
  });
}

caseTabs.forEach((button) => {
  button.addEventListener("click", () => {
    renderCase(button);
  });
});

enableTabKeyboard(caseTabs, renderCase);

document.querySelectorAll(".answer-options button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".answer-options button").forEach((item) => item.classList.toggle("is-selected", item === button));
    const correct = button.dataset.answer === "b";
    const feedback = document.querySelector("#feedback");
    feedback.hidden = false;
    feedback.textContent = correct
      ? "Elección acertada. Crear un modelo y explicar sus interacciones convierte la indagación en evidencia observable y evita la copia pasiva."
      : "Aún puedes elevar el rigor. Cambiar el recurso o memorizar información mantiene a las y los estudiantes en un rol pasivo. Prueba otra decisión.";
  });
});

renderLevel(0);

const progressItems = [...document.querySelectorAll(".progress li")];
const progressSections = ["inicio", "niveles", "casos", "reto"].map((id) => document.getElementById(id));
function updateProgress() {
  let currentIndex = 0;
  progressSections.forEach((section, index) => {
    if (section.getBoundingClientRect().top <= window.innerHeight * .55) currentIndex = index;
  });
  progressItems.forEach((item, index) => {
    item.classList.toggle("is-current", index === currentIndex);
    if (index === currentIndex) item.setAttribute("aria-current", "step");
    else item.removeAttribute("aria-current");
  });
}

window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();
