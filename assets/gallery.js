/* Renders the works list into any element with data-works="scroll|painting|home",
   and opens a full-screen viewer when a piece is selected. */
(function () {
  var works = window.SHINSEI_WORKS || [];
  var base = document.documentElement.getAttribute("data-base") || "";

  function meta(w) {
    return [w.year, w.medium, w.size].filter(Boolean).join(", ");
  }

  function frame(w) {
    var f = document.createElement("div");
    f.className = "work-frame";
    f.style.aspectRatio = String(w.ratio || 1);
    if (w.image) {
      var img = document.createElement("img");
      img.src = base + "images/" + w.image;
      img.alt = w.title + (w.medium ? ", " + w.medium : "");
      img.loading = "lazy";
      f.appendChild(img);
    } else {
      var p = document.createElement("span");
      p.className = "placeholder";
      p.setAttribute("aria-hidden", "true");
      p.innerHTML = "<span>心</span><span>性</span>";
      f.appendChild(p);
      f.setAttribute("role", "img");
      f.setAttribute("aria-label", w.title + ", photograph to come");
    }
    return f;
  }

  function figure(w) {
    var fig = document.createElement("figure");
    fig.className = "work";
    var btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("aria-label", "View " + w.title);
    btn.appendChild(frame(w));
    btn.addEventListener("click", function () { openViewer(w); });
    fig.appendChild(btn);
    var cap = document.createElement("figcaption");
    var t = document.createElement("span");
    t.className = "work-title";
    t.textContent = w.title;
    cap.appendChild(t);
    var m = meta(w);
    if (m) {
      var s = document.createElement("span");
      s.className = "work-meta";
      s.textContent = m;
      cap.appendChild(s);
    }
    fig.appendChild(cap);
    return fig;
  }

  document.querySelectorAll("[data-works]").forEach(function (el) {
    var kind = el.getAttribute("data-works");
    works
      .filter(function (w) { return kind === "home" ? w.home : w.type === kind; })
      .forEach(function (w) { el.appendChild(figure(w)); });
  });

  var dlg = document.getElementById("viewer");
  if (!dlg) return;
  var stage = dlg.querySelector(".viewer-stage");
  var title = dlg.querySelector(".work-title");
  var metaEl = dlg.querySelector(".viewer-meta");
  var note = dlg.querySelector(".viewer-note");

  function openViewer(w) {
    stage.innerHTML = "";
    if (w.image) {
      var img = document.createElement("img");
      img.src = base + "images/" + w.image;
      img.alt = w.title;
      stage.appendChild(img);
    } else {
      stage.appendChild(frame(w));
    }
    title.textContent = w.title;
    metaEl.textContent = meta(w);
    note.textContent = w.note || "";
    note.hidden = !w.note;
    if (typeof dlg.showModal === "function") dlg.showModal();
    else dlg.setAttribute("open", "");
  }

  dlg.querySelector(".viewer-close").addEventListener("click", function () { dlg.close(); });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
})();
