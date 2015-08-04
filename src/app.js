var drag_and_drop = (function () {

  var drag = document.getElementById("cb-drag");
  var disp = document.getElementById("cb-display");
  var file = document.getElementById("cb-file");

  function readImage(e) {

    var f = (e.dataTransfer) ? e.dataTransfer.files : e.target.files;

    for (var i = 0, l = f.length; i < l; i++) {

      var imageData = {};
      var reader = new FileReader();

      console.log(f[i].name);
      console.log(f[i].type);
      console.log(f[i].size);
      console.log(f[i].lastModifiedDate.toLocaleDateString());

      reader.onload = (function (f) {

        return function (evt) {

          if (f.type === "image/gif" || f.type === "image/png" || f.type === "image/jpeg") {

            imageData.type = f.type;
            imageData.name = f.name;
            imageData.size = f.size;
            imageData.date = f.lastModifiedDate.toLocaleDateString();
            imageData.url = evt.target.result;
            makeView(imageData);
            //return imageData;

          } else {
            return;
          }

        };

      })(f[i]);

      reader.readAsDataURL(f[i]);

    }

  }

  function makeView(data) {

    var div, img;

    div = document.createElement("div");
    div.setAttribute("class", "cb-image");

    img = document.createElement("img");
    img.src = data.url;
    img.style.maxWidth = "100%";
    img.style.height = "auto";

    div.appendChild(img);
    img.insertAdjacentHTML("afterend", "<p>■ファイル名: " + data.name + "<br>■容量: " + data.size + "バイト</p>");
    disp.appendChild(div);

  }

  function dragFiles() {

    drag.addEventListener("drop", function (e) {
      e.preventDefault();
      readImage(e);
    }, false);

    drag.addEventListener("dragover", function (e) {
      e.preventDefault();
    }, false);

  }

  function uploadFiles() {

    file.addEventListener("change", function(e) {
      readImage(e);
    }, false);

  }

  return {

    init: function () {
      dragFiles();
      uploadFiles();
    }

  };

})();

drag_and_drop.init();
