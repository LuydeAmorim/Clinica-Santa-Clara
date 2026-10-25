let consultas = [];
let filtroAtual = 'todas';

document.getElementById('btn-aumentar').onclick = () => document.documentElement.style.setProperty('--font-size', '18px');
document.getElementById('btn-diminuir').onclick = () => document.documentElement.style.setProperty('--font-size', '14px');
document.getElementById('btn-contraste').onclick = () => document.body.classList.toggle('alto-contraste');

document.getElementById('form-agendamento').onsubmit = (e) => {
  e.preventDefault();
  consultas.push({
    id: Date.now(),
    nome: document.getElementById('nome').value,
    especialidade: document.getElementById('especialidade').value,
    data: document.getElementById('data').value,
    status: 'Agendado'
  });
  e.target.reset();
  render();
};

function render() {
  const lista = document.getElementById('lista-consultas');
  lista.innerHTML = '';
  
  consultas
    .filter(c => filtroAtual === 'todas' || c.status === filtroAtual)
    .forEach(c => {
      lista.innerHTML += `
        <div class="item">
          <div>
            <strong>${c.nome}</strong> - ${c.especialidade} (${c.data})<br>
            <small>Status: ${c.status}</small>
          </div>
          <button onclick="mudarStatus(${c.id})">Mudar Status</button>
        </div>
      `;
    });
}

function mudarStatus(id) {
  const c = consultas.find(item => item.id === id);
  if (c) c.status = c.status === 'Agendado' ? 'Concluído' : 'Agendado';
  render();
}

function filtrar(tipo) {
  filtroAtual = tipo;
  render();
}