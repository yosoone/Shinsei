/* Shinsei contact form (contact.html).
   Sends the message to the Yoso forms Worker (https://forms.yoso.one/contact), which checks
   Cloudflare Turnstile and emails it to Yoso. If 'Also join the Shinsei mailing list' is ticked,
   the Worker also adds the sender to Buttondown (tag shinsei); Buttondown confirms by email.
   Wording below is a draft for Yoso. */
(function () {
  "use strict";
  var cf = document.getElementById("cf");
  if (!cf) return;
  var msg = document.getElementById("cfMsg"), send = document.getElementById("cfSend");
  var F = cf.elements;
  var ERR = {
    missing: "Please add your name and a message.",
    email: "Please check your email address.",
    spam: "The spam check didn’t pass. Please try again.",
    send: "The message couldn’t be sent just now. Please try again in a moment."
  };
  function say(t) { msg.textContent = t; }

  cf.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = F["name"].value.trim(), email = F["email"].value.trim(), text = F["message"].value.trim();
    if (!name || !text) { say(ERR.missing); (name ? F["message"] : F["name"]).focus(); return; }
    if (!email || !F["email"].checkValidity()) { say(ERR.email); F["email"].focus(); return; }
    var joined = F["subscribe"].checked;
    send.disabled = true;
    say("Sending…");
    fetch(cf.action, { method: "POST", body: new FormData(cf) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok && j.ok, error: j.error }; }); })
      .catch(function () { return { ok: false }; })
      .then(function (res) {
        send.disabled = false;
        if (res.ok) {
          cf.reset();
          say("Thank you. Your message is on its way, and Yoso will reply by email." +
              (joined ? " Buttondown will email you to confirm the mailing list." : ""));
        } else {
          say(ERR[res.error] || ERR.send);
        }
        try { if (window.turnstile) window.turnstile.reset("#cfTs"); } catch (err) {}
      });
  });
})();
