import Modal from './modal.js'

const modal = Modal();

// Mapeando itens na modal que irão mudar para "marcar como lido e excluir"
const modalTitle = document.querySelector(".modal h2");
const modalDescription = document.querySelector(".modal p");
const modalButton = document.querySelector(".modal button");

// Pegar todos os botões que possuem a classe check
const checkButtons = document.querySelectorAll(".actions a.check");

// Pegando quando o marcar como lido for clicado
checkButtons.forEach(button => {
    button.addEventListener("click", event =>{
        
        handleClick(event);

    } );
});


// Quando o botaode excluir, abre a modal
const deleteButton = document.querySelectorAll(".actions a.delete");

deleteButton.forEach(button => {
    button.addEventListener("click", event => {
        handleClick(event, false);
    });
});

function handleClick(event, check = true) {
    event.preventDefault(); // Evita que o link adicione '#'

    const text = check ? "Marcar como lida" : "Excluir";
    const slug = check ? "check" : "delete";
    const roomId = document.querySelector("#room-id").dataset.id;
    const questionId = event.target.dataset.id;

    const form = document.querySelector(".modal form");
    form.setAttribute("action", `/question/${roomId}/${questionId}/${slug}`);

    modalTitle.innerHTML = `${text} esta pergunta`;
    modalDescription.innerHTML = `Tem certeza que deseja ${text.toLocaleLowerCase()} esta pergunta?`;
    check ? modalButton.classList.remove("red") : modalButton.classList.add("red")
    modalButton.innerHTML = `Sim, ${text.toLocaleLowerCase()}`

    // Abrir modal
    modal.open();
}