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
  // promise chain, without the promise
  reader.addEventListener("load", function () {
    var image = new Image();
    image.src = reader.result;
    image.onload = function() {
      let w = image.naturalWidth;
      let h = image.naturalHeight;
      add_to_svg(w, h, ['filter', 'url(#blur)'], reader.result);
      add_to_svg(w, h, ['mask', 'url(#gradient-mask)'], reader.result);
      capture(w, h);
    }
  }, false);
}

function add_to_svg(w, h, filter, content) {
  let svg = document.createElementNS('http://www.w3.org/2000/svg', 'image');
  svg.setAttributeNS(null, 'height', w);
  svg.setAttributeNS(null, 'width', h);
  svg.setAttributeNS(null, filter[0], filter[1]);
  svg.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', content);
  document.getElementById('svg').appendChild(svg);
}

// TODO:
// - get image dimensions and update container size
// - position image correctly
// - fix gradient
// - add adjustable parameters
// - click to select file for upload

function capture(w, h) {
  const {body} = document;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = w;
  canvas.height = h;

  const img = document.createElement('img');
  img.addEventListener('load', onload);
  let svg = document.getElementById('target').innerHTML;
  img.src = 'data:image/svg+xml,' + encodeURIComponent(svg);

  const output = document.createElement('img');
  document.getElementById('target').appendChild(output);

  function onload(e) {
    ctx.drawImage(e.target, 0, 0);
    output.src = canvas.toDataURL();
  }
}
