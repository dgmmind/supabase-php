<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Chat Demo</title>
  <style>
    body { font-family: sans-serif; display: flex; justify-content: center; margin-top: 50px; }
    #chatbox { width: 400px; border: 1px solid #ccc; border-radius: 8px; padding: 10px; display: flex; flex-direction: column; height: 500px; }
    #messages { flex: 1; overflow-y: auto; margin-bottom: 10px; }
    .msg { margin: 5px 0; padding: 8px; border-radius: 5px; }
    .bot { background: #f1f1f1; align-self: flex-start; }
    .user { background: #d1e7ff; align-self: flex-end; }
    #inputArea { display: flex; }
    #inputArea input { flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 5px; }
    #inputArea button { margin-left: 5px; padding: 8px 12px; border: none; border-radius: 5px; background: #2b6cb0; color: white; cursor: pointer; }
  </style>
</head>
<body>
  <div id="chatbox">
    <div id="messages"></div>
    <div id="inputArea">
      <input type="text" id="userInput" placeholder="Escribe aquí..." />
      <button onclick="sendMessage()">Enviar</button>
    </div>
  </div>

  <script>
    const flowData = /* pega aquí tu JSON */;
    
    class ChatEngine {
      constructor(flow) {
        this.flow = flow;
        this.currentStep = null;
        this.context = {};
      }

      start(input) {
        const triggers = this.flow.boxes.filter(b => b.type === "trigger");
        for (const trigger of triggers) {
          if (trigger.triggers.map(t=>t.toLowerCase()).includes(input.toLowerCase())) {
            this.addBot(`Trigger detectado: "${trigger.title}"`);
            this.currentStep = this.findNext(trigger.id);
            return this.ask();
          }
        }
        this.addBot("No entendí, intenta otra palabra.");
      }

      ask() {
        if (!this.currentStep) return this.addBot("Conversación terminada.");
        if (this.currentStep.type === "questions") {
          this.addBot(this.currentStep.question);
        } else if (this.currentStep.type === "decision") {
          this.resolveDecision();
        } else if (this.currentStep.type === "end") {
          this.addBot("🏁 Fin del flujo");
          this.currentStep = null;
        }
      }

      send(input) {
        if (!this.currentStep) return this.start(input);
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
            this.addBot(`Guardado: ${this.currentStep.key} = ${matched}`);
          } else {
            return this.addBot("❌ Opción no válida, intenta de nuevo.");
          }
        }
        this.currentStep = this.findNext(this.currentStep.id);
        this.ask();
      }

      findNext(fromId) {
        const conn = this.flow.conns.find(c => c.from === fromId);
        if (!conn) return null;
        return this.flow.boxes.find(b => b.id === conn.to);
      }

      resolveDecision() {
        const decision = this.currentStep;
        const choice = this.context["bebida"];
        if (choice && decision.options[choice] !== undefined) {
          this.currentStep = this.findNext(decision.id);
          this.ask();
        } else {
          this.addBot("No pude decidir, voy a la opción por defecto.");
          this.currentStep = this.findNext(decision.id);
          this.ask();
        }
      }

      addBot(text) {
        const msgBox = document.getElementById("messages");
        const div = document.createElement("div");
        div.className = "msg bot";
        div.textContent = "🤖 " + text;
        msgBox.appendChild(div);
        msgBox.scrollTop = msgBox.scrollHeight;
      }

      addUser(text) {
        const msgBox = document.getElementById("messages");
        const div = document.createElement("div");
        div.className = "msg user";
        div.textContent = text;
        msgBox.appendChild(div);
        msgBox.scrollTop = msgBox.scrollHeight;
      }
    }

    const chat = new ChatEngine(flowData);

    function sendMessage() {
      const input = document.getElementById("userInput");
      const text = input.value.trim();
      if (!text) return;
      chat.addUser(text);
      chat.send(text);
      input.value = "";
    }
  </script>
</body>
</html>
