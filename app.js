let lista = JSON.parse(localStorage.getItem("tarefas")) || [];

function salvar() {
  localStorage.setItem("tarefas", JSON.stringify(lista));
}

function renderizar() {
  const ul = document.getElementById("lista");
  ul.innerHTML = "";
  lista.forEach((tarefa, index) => {
    const li = document.createElement("li");
    li.innerText = tarefa.texto;
    if (tarefa.concluida) li.classList.add("concluida");

    li.onclick = () => {
      lista[index].concluida = !lista[index].concluida;
      salvar();
      renderizar();
    };

    const btnExcluir = document.createElement("button");
    btnExcluir.innerText = "Excluir";
    btnExcluir.onclick = (e) => {
      e.stopPropagation();
      lista.splice(index, 1);
      salvar();
      renderizar();
    };

    li.appendChild(btnExcluir);
    ul.appendChild(li);
  });
}

function adicionarTarefa() {
  const input = document.getElementById("novaTarefa");
  const texto = input.value.trim();
  if (texto) {
    lista.push({ texto, concluida: false });
    salvar();
    renderizar();
    input.value = "";
  }
}

renderizar();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("Service Worker registrado!"));
}
