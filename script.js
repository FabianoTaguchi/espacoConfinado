const questions = [
  {
    text: "Qual medida é essencial antes de entrar em um espaço confinado?",
    options: [
      {
        text: "Emitir a Permissão de Trabalho (PT) e avaliar riscos",
        correct: true,
        feedback:
          "Correto. A PT formaliza controles e autoriza a entrada apenas após avaliação de riscos."
      },
      {
        text: "Verificar se há equipamento por perto",
        correct: false,
        feedback:
          "Parcial. Sem PT e análise de riscos, a entrada não é segura."
      },
      {
        text: "Usar qualquer EPI disponível",
        correct: false,
        feedback:
          "EPI adequado é importante, mas sem PT e avaliação não garante segurança."
      }
    ]
  },
  {
    text:
      "Qual é o principal risco associado à presença de gases em espaços confinados?",
    options: [
      {
        text: "Asfixia ou intoxicação por atmosferas perigosas",
        correct: true,
        feedback:
          "Correto. Atmosferas com deficiência de O2 ou gases tóxicos podem causar morte rápida."
      },
      {
        text: "Fadiga muscular",
        correct: false,
        feedback:
          "Fadiga pode ocorrer, mas o risco crítico é a atmosfera perigosa."
      },
      {
        text: "Perda de ferramentas",
        correct: false,
        feedback:
          "Perda de ferramentas é um problema logístico, não o risco principal."
      }
    ]
  },
  {
    text:
      "Qual prática correta para monitorar a atmosfera antes e durante a entrada?",
    options: [
      {
        text: "Medir continuamente O2, inflamáveis e tóxicos com detector calibrado",
        correct: true,
        feedback:
          "Correto. Monitoramento contínuo e equipamento calibrado são essenciais para segurança."
      },
      {
        text: "Cheirar o ar para notar odores",
        correct: false,
        feedback:
          "Inadequado. Muitos gases são inodoros ou mascaram odores; use detecção instrumentada."
      },
      {
        text: "Medir apenas uma vez antes de entrar",
        correct: false,
        feedback:
          "Insuficiente. Condições mudam; é preciso monitorar durante todo o trabalho."
      }
    ]
  },
  {
    text:
      "Sobre temperatura e ventilação, qual conduta reduz riscos térmicos?",
    options: [
      {
        text: "Avaliar calor, ventilar e planejar pausas/hidratação",
        correct: true,
        feedback:
          "Correto. Controle térmico requer ventilação adequada, pausas programadas e hidratação."
      },
      {
        text: "Entrar rápido para terminar logo",
        correct: false,
        feedback:
          "Inadequado. Acelerar aumenta o estresse térmico e risco de acidentes."
      },
      {
        text: "Usar roupas pesadas para suar menos",
        correct: false,
        feedback:
          "Incorreto. Roupas inadequadas retêm calor; ajuste a vestimenta ao ambiente e à tarefa."
      }
    ]
  },
  {
    text:
      "Quanto à movimentação em espaço confinado, qual procedimento é adequado?",
    options: [
      {
        text: "Manter comunicação e vigia, plano de resgate e controle de acesso",
        correct: true,
        feedback:
          "Correto. Comunicação, vigia e plano de resgate são pilares para movimentação segura."
      },
      {
        text: "Mover-se sem comunicar para evitar ruído",
        correct: false,
        feedback:
          "Inadequado. A comunicação é vital para coordenação e resposta a emergências."
      },
      {
        text: "Levar cargas excessivas para reduzir viagens",
        correct: false,
        feedback:
          "Incorreto. Cargas excessivas aumentam risco de queda, impacto e exaustão."
      }
    ]
  },
  {
    text: "Quem deve permanecer fora como vigia durante a atividade?",
    options: [
      {
        text:
          "Pessoa treinada dedicada, sem outras funções, com meios de comunicação",
        correct: true,
        feedback:
          "Correto. O vigia deve ser treinado, exclusivo à função e capaz de acionar resgate."
      },
      {
        text: "Qualquer colega ocasional",
        correct: false,
        feedback:
          "Inadequado. Sem treinamento e dedicação, não há garantia de resposta eficaz."
      },
      {
        text: "Ninguém, todos entram para ajudar",
        correct: false,
        feedback:
          "Incorreto. A presença de um vigia externo é requisito de segurança."
      }
    ]
  }
];

let currentIndex = 0;
let score = 0;
let confirmed = false;

const els = {
  quiz: document.getElementById("quiz"),
  question: document.getElementById("question"),
  options: document.getElementById("options"),
  feedback: document.getElementById("feedback"),
  confirmBtn: document.getElementById("confirmBtn"),
  nextBtn: document.getElementById("nextBtn"),
  currentNumber: document.getElementById("currentNumber"),
  totalNumber: document.getElementById("totalNumber"),
  result: document.getElementById("result"),
  correctCount: document.getElementById("correctCount"),
  totalCount: document.getElementById("totalCount"),
  percent: document.getElementById("percent"),
  restartBtn: document.getElementById("restartBtn")
};

function renderQuestion() {
  confirmed = false;
  els.feedback.textContent = "";
  els.feedback.classList.remove("correct", "incorrect");

  const q = questions[currentIndex];
  els.question.textContent = q.text;

  // progress
  els.currentNumber.textContent = String(currentIndex + 1);
  els.totalNumber.textContent = String(questions.length);

  // options
  els.options.innerHTML = "";
  q.options.forEach((opt, idx) => {
    const wrapper = document.createElement("div");
    wrapper.className = "option";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "option";
    input.id = `opt-${idx}`;
    input.value = String(idx);

    const label = document.createElement("label");
    label.setAttribute("for", `opt-${idx}`);
    label.textContent = opt.text;

    wrapper.appendChild(input);
    wrapper.appendChild(label);
    els.options.appendChild(wrapper);
  });

  els.confirmBtn.disabled = true;
  els.nextBtn.disabled = true;

  els.options.addEventListener("change", onOptionChange, { once: true });
}

function onOptionChange() {
  els.confirmBtn.disabled = false;
}

function getSelectedIndex() {
  const selected = document.querySelector('input[name="option"]:checked');
  return selected ? Number(selected.value) : null;
}

function confirmAnswer() {
  if (confirmed) return;
  const idx = getSelectedIndex();
  if (idx === null) {
    els.feedback.textContent = "Selecione uma alternativa para confirmar.";
    els.feedback.classList.remove("correct", "incorrect");
    return;
  }
  confirmed = true;

  const { options } = questions[currentIndex];
  const chosen = options[idx];

  if (chosen.correct) {
    score += 1;
    els.feedback.textContent = chosen.feedback;
    els.feedback.classList.add("correct");
    els.feedback.classList.remove("incorrect");
  } else {
    els.feedback.textContent = chosen.feedback;
    els.feedback.classList.add("incorrect");
    els.feedback.classList.remove("correct");
  }

  // lock options after confirm
  document.querySelectorAll('input[name="option"]').forEach((el) => (el.disabled = true));
  els.confirmBtn.disabled = true;
  els.nextBtn.disabled = false;
}

function nextQuestion() {
  if (!confirmed) return; // prevent skipping without confirmar
  currentIndex += 1;
  if (currentIndex >= questions.length) {
    showResult();
  } else {
    renderQuestion();
  }
}

function showResult() {
  els.quiz.classList.add("hidden");
  els.result.classList.remove("hidden");
  const total = questions.length;
  const percent = Math.round((score / total) * 100);
  els.correctCount.textContent = String(score);
  els.totalCount.textContent = String(total);
  els.percent.textContent = String(percent);
}

function restart() {
  currentIndex = 0;
  score = 0;
  confirmed = false;
  els.result.classList.add("hidden");
  els.quiz.classList.remove("hidden");
  renderQuestion();
}

function init() {
  els.totalNumber.textContent = String(questions.length);
  renderQuestion();
  els.confirmBtn.addEventListener("click", (e) => {
    e.preventDefault();
    confirmAnswer();
  });
  els.nextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    nextQuestion();
  });
  els.restartBtn.addEventListener("click", restart);
}

init();