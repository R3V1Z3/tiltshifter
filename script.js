const target = document.getElementById('target');
target.addEventListener("dragover", dragover);
target.addEventListener("dragenter", dragenter);
target.addEventListener("dragleave", dragleave);
target.addEventListener("drop", drop);

function dragover(e) {
  e.preventDefault();
}

function dragenter(e) {
  e.preventDefault();
  e.target.style.filter = 'invert(20%)';
}

function dragleave(e) {
  e.preventDefault();
  e.target.style.filter = 'invert(0%)';
}

function drop(e) {
  e.preventDefault();
  e.target.style.filter = 'invert(0%)';
  const files = e.dataTransfer.files;
  file = files[0];
  const reader  = new FileReader();
  reader.readAsDataURL(file);
  reader.addEventListener("load", function () {
    const blurred = document.getElementById('blurred');
    blurred.src = reader.result;
    const overlayed = document.getElementById('overlayed');
    overlayed.src = reader.result;
  }, false);
}
