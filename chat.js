// Tu JSON del flujo
const flowData = {
    "boxes": [
      {
        "id": "trigger_1758669080534",
        "type": "trigger",
        "x": 60,
        "y": 60,
        "w": 140,
        "h": 70,
        "title": "Trigger 1",
        "triggers": [
          "hola",
          "hello"
        ],
        "steps": [
          {
            "step": 1,
            "id": "question_1758669088200",
            "type": "questions",
            "x": 15,
            "y": 328,
            "w": 140,
            "h": 70,
            "title": "Questions 2",
            "options": {
              "cafe": [
                "cafe",
                "coffee",
                "cafes"
              ],
              "latte": [
                "latte",
                "latte coffee"
              ],
              "americano": [
                "americano",
                "american coffee"
              ],
              "cappuccino": [
                "cappuccino",
                "cappucino"
              ]
            },
            "question": "¿Qué bebida desea?",
            "key": "bebida"
          },
          {
            "step": 2,
            "id": "question_1758669226704",
            "type": "questions",
            "x": 114,
            "y": 484,
            "w": 140,
            "h": 70,
            "title": "Questions 3",
            "options": {
              "cafe": [
                "cafe",
                "coffee",
                "cafes"
              ],
              "latte": [
                "latte",
                "latte coffee"
              ],
              "americano": [
                "americano",
                "american coffee"
              ],
              "cappuccino": [
                "cappuccino",
                "cappucino"
              ]
            },
            "question": "¿Qué bebida desea?",
            "key": "bebida"
          },
          {
            "step": 3,
            "id": "decision_1758669236025",
            "type": "decision",
            "x": 57,
            "y": 116,
            "w": 140,
            "h": 120,
            "title": "Decision 4",
            "options": {
              "cafe": [],
              "flow_1758669293472": []
            }
          }
        ]
      },
      {
        "id": "decision_1758669236025",
        "type": "decision",
        "x": 57,
        "y": 116,
        "w": 140,
        "h": 120,
        "title": "Decision 4",
        "options": {
          "cafe": [],
          "flow_1758669293472": []
        }
      },
      {
        "id": "flow_1758669272704",
        "type": "flow",
        "x": 659,
        "y": 51,
        "w": 140,
        "h": 70,
        "title": "Flow 5",
        "steps": [
          {
            "step": 1,
            "id": "question_1758669557288",
            "type": "questions",
            "x": 816,
            "y": 26,
            "w": 140,
            "h": 70,
            "title": "Questions 7",
            "options": {
              "cafe": [
                "cafe",
                "coffee",
                "cafes"
              ],
              "latte": [
                "latte",
                "latte coffee"
              ],
              "americano": [
                "americano",
                "american coffee"
              ],
              "cappuccino": [
                "cappuccino",
                "cappucino"
              ]
            },
            "question": "¿Qué bebida desea?",
            "key": "bebida"
          },
          {
            "step": 2,
            "id": "end_1758669580745",
            "type": "end",
            "x": 1438,
            "y": 252,
            "w": 140,
            "h": 70,
            "title": "End 9"
          }
        ]
      },
      {
        "id": "flow_1758669293472",
        "type": "flow",
        "x": 643,
        "y": 324,
        "w": 140,
        "h": 70,
        "title": "Flow 6",
        "steps": [
          {
            "step": 1,
            "id": "question_1758669560320",
            "type": "questions",
            "x": 823,
            "y": 368,
            "w": 140,
            "h": 70,
            "title": "Questions 8",
            "options": {
              "cafe": [
                "cafe",
                "coffee",
                "cafes"
              ],
              "latte": [
                "latte",
                "latte coffee"
              ],
              "americano": [
                "americano",
                "american coffee"
              ],
              "cappuccino": [
                "cappuccino",
                "cappucino"
              ]
            },
            "question": "¿Qué bebida desea?",
            "key": "bebida"
          }
        ]
      }
    ],
    "conns": [
      {
        "id": "c1",
        "from": "trigger_1758669080534",
        "fromAnchor": "right",
        "to": "question_1758669088200",
        "toAnchor": "left"
      },
      {
        "id": "c2",
        "from": "question_1758669088200",
        "fromAnchor": "right",
        "to": "question_1758669226704",
        "toAnchor": "left"
      },
      {
        "id": "c3",
        "from": "question_1758669226704",
        "fromAnchor": "right",
        "to": "decision_1758669236025",
        "toAnchor": "left"
      },
      {
        "id": "c4",
        "from": "decision_1758669236025",
        "fromAnchor": "out0",
        "to": "flow_1758669272704",
        "toAnchor": "left"
      },
      {
        "id": "c5",
        "from": "decision_1758669236025",
        "fromAnchor": "out1",
        "to": "flow_1758669293472",
        "toAnchor": "left"
      },
      {
        "id": "c6",
        "from": "flow_1758669272704",
        "fromAnchor": "right",
        "to": "question_1758669557288",
        "toAnchor": "left"
      },
      {
        "id": "c7",
        "from": "flow_1758669293472",
        "fromAnchor": "right",
        "to": "question_1758669560320",
        "toAnchor": "left"
      },
      {
        "id": "c8",
        "from": "question_1758669557288",
        "fromAnchor": "right",
        "to": "end_1758669580745",
        "toAnchor": "left"
      }
    ]
  }

// --- Motor del chat ---
class ChatEngine {
  constructor(flow) {
    this.flow = flow;
    this.currentStep = null;
    this.context = {}; // guarda respuestas (ej: bebida)
  }

  start(input) {
    const triggers = this.flow.boxes.filter(b => b.type === "trigger");
    for (const trigger of triggers) {
      if (trigger.triggers.includes(input.toLowerCase())) {
        console.log(`🤖 Trigger detectado: "${trigger.title}"`);
        // primer paso conectado al trigger
        this.currentStep = this.findNext(trigger.id);
        return this.ask();
      }
    }
    console.log("🤖 No entendí, intenta otra palabra.");
  }

  ask() {
    if (!this.currentStep) {
      console.log("🤖 Conversación terminada.");
      return;
    }

    if (this.currentStep.type === "questions") {
      console.log("🤖 " + this.currentStep.question);
    } else if (this.currentStep.type === "decision") {
      console.log("🤖 Tomando decisión...");
      this.resolveDecision();
    } else if (this.currentStep.type === "end") {
      console.log("🏁 Fin del flujo");
      this.currentStep = null;
    }
  }

  send(input) {
    if (!this.currentStep) {
      // intenta arrancar
      return this.start(input);
    }

    if (this.currentStep.type === "questions") {
      let matched = null;
      for (const [key, synonyms] of Object.entries(this.currentStep.options)) {
        if (synonyms.some(s => s.toLowerCase() === input.toLowerCase())) {
          matched = key;
          break;
        }
      }
      if (matched) {
        this.context[this.currentStep.key] = matched;
        console.log(`✅ Guardado: ${this.currentStep.key} = ${matched}`);
      } else {
        console.log("❌ Opción no válida, intenta de nuevo.");
        return;
      }
    }

    // Avanzar al siguiente nodo
    this.currentStep = this.findNext(this.currentStep.id);
    this.ask();
  }

  findNext(fromId) {
    const conn = this.flow.conns.find(c => c.from === fromId);
    if (!conn) return null;
    return this.flow.boxes.find(b => b.id === conn.to);
  }

  resolveDecision() {
    // decisión basada en contexto
    const decision = this.currentStep;
    for (const [option, _] of Object.entries(decision.options)) {
      if (this.context["bebida"] === option) {
        this.currentStep = this.findNext(decision.id);
        return this.ask();
      }
    }
    // default → primer salida
    this.currentStep = this.findNext(decision.id);
    this.ask();
  }
}

// --- Uso desde consola ---
const chat = new ChatEngine(flowData);

// Ejemplo:
chat.send("hola")
// chat.send("cafe")
// chat.send("latte")
