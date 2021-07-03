export default function Modal() {

    const cancelButton = document.querySelector('.button.cancel');

    cancelButton.addEventListener("click", close);

    const modalWapper = document.querySelector('.modal-wrapper');

    function open() {
        modalWapper.classList.add("active");
    }

    function close() {
        modalWapper.classList.remove("active");
    }

    return {
        open,
        close
    }

    
}