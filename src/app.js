var drag_and_drop = (function () {

  var drag = document.getElementById("cb-drag");
  var disp = document.getElementById("cb-display");
  var file = document.getElementById("cb-file");

  function readImage(e) {

    var f = (e.dataTransfer) ? e.dataTransfer.files : e.target.files;

    for (var i = 0, l = f.length; i < l; i++) {

      var reader = new FileReader();

      reader.onload = (function (f) {

        var imageData = {};

        return function (evt) {

          if (f.type === "image/gif" || f.type === "image/png" || f.type === "image/jpeg") {

            imageData.type = f.type;
            imageData.name = f.name;
            imageData.size = f.size;
            imageData.date = f.lastModifiedDate.toLocaleDateString();
            imageData.url = evt.target.result;
            makeView(imageData);

          } else {
            return;
          }

        };

      })(f[i]);

      reader.readAsDataURL(f[i]);

    }

  }

  function makeView(data) {

    var div, img, customEvent;

    div = document.createElement("div");
    div.setAttribute("class", "cb-div");

    img = document.createElement("img");
    img.src = data.url;
    img.setAttribute("class", "cb-image");
    img.style.maxWidth = "100%";
    img.style.height = "auto";

    div.appendChild(img);
    img.insertAdjacentHTML("afterend", "<p>■ファイル名: " + data.name + "<br>■容量: " + data.size + "バイト</p>");
    disp.appendChild(div);

    customEvent = document.createEvent("HTMLEvents");
    customEvent.initEvent("makeView", true, false);
    div.dispatchEvent(customEvent);

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


var featherEditor = new Aviary.Feather({
  apiKey: "4aa4ec3a537c433abd5842b9fb971942",
  onSave: function(imageID, newURL) {
    var img1 = document.getElementById(imageID);
    img1.src = newURL;
  }
});

var disp = document.getElementById("cb-display");
disp.addEventListener("makeView", aaa, false);

function aaa() {

  var image = document.querySelectorAll(".cb-image");

  for (var i = 0, l = image.length; i < l; i++) {
    image[i].setAttribute("id", "cb-image_" + i);
    image[i].removeEventListener("click", bbb, false);
    image[i].addEventListener("click", bbb, false);
  }

}

function bbb() {
  var id = this.getAttribute("id");
  var src = this.getAttribute("src");
  launchEditor(id, src);
}

function launchEditor(id, src) {
  featherEditor.launch({
    image: id,
    url: src
  });
  return false;
}
