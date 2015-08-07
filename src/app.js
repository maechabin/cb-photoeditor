var dragAndDrop = (function (window, document) {

  "use strict";

  var drag = document.getElementById("cb-drag");
  var disp = document.getElementById("cb-display");
  var file = document.getElementById("cb-file");

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
    img.insertAdjacentHTML("afterend", "<p>■ファイル名: <b>" + data.name + "</b><br>■容量: <b>" + data.size + "</b>バイト</p>");
    disp.appendChild(div);

    customEvent = document.createEvent("HTMLEvents");
    customEvent.initEvent("makeView", true, false);
    div.dispatchEvent(customEvent);

  }

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

  function dragFiles() {

    drag.addEventListener("drop", function (e) {
      e.stopPropagation();
      e.preventDefault();
      readImage(e);
    }, false);

    drag.addEventListener("dragover", function (e) {
      e.stopPropagation();
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

} (window, document));

var photoEditor = (function (window, document) {

  "use strict";

  var featherEditor = new Aviary.Feather({
    apiKey: "4aa4ec3a537c433abd5842b9fb971942",
    onSave: function(imageID, newURL) {
      var img1 = document.getElementById(imageID);
      img1.src = newURL;
    }
  });

  function clearImage() {
    this.parentNode.style.display = "none";
  }

  function launchEditor(id, src) {
    featherEditor.launch({
      image: id,
      url: src
    });
    return false;
  }

  function editPhoto() {
    //console.log(this);
    var id = this.getAttribute("id");
    var src = this.getAttribute("src");
    launchEditor(id, src);
  }

  function makeButton() {
    var button = document.createElement("button");
    button.setAttribute("style",
      "width: 64px;"
      + " line-height: 24px;"
      + " background-color: #37474F;"
      + " color: #fff;"
      + " border: none;"
      + " cursor: pointer;"
      + " border-radius: 2px;"
      + " font-size: 14px;"
      + " position: absolute;"
      + " text-align: center;"
      + " top: 16px;"
      + " right: 8px;"
      + " padding: 0;"
      + " z-index: 1000;"
    );
    button.innerHTML = "削除";
    return button;
  }

  function listener() {

    var disp = document.getElementById("cb-display");

    disp.addEventListener("makeView", function () {

      var image = document.querySelectorAll(".cb-image");
      var button = [];

      for (var i = 0, l = image.length; i < l; i++) {

        button[i] = makeButton();
        image[i].setAttribute("id", "cb-image_" + i);
        image[i].parentNode.style.position = "relative";
        image[i].parentNode.appendChild(button[i]);

        button[i].addEventListener("click", clearImage, false);
        image[i].addEventListener("click", editPhoto, false);
      }

    }, false);

  }

  return {
    init: function () {
      listener();
    }
  };

} (window, document));

dragAndDrop.init();
photoEditor.init();
