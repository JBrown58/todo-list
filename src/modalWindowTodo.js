import { attribute } from './projectFunctions';

export default () => {
  // Get the modal
  const modal = document.getElementById('myModalTodo');

  // Get the button that opens the modal
  const btn = document.getElementById('add-todo');

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName('close-todo')[0];

  // When the user clicks on the button, open the modal
  btn.onclick = function () {
    if (attribute === '') {
      alert('Select a project to add a Todo');
    } else {
      modal.style.display = 'block';
    }
  };
  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = 'none';
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
};