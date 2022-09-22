import "../css/app.css"
import "phoenix_html"
import { Socket } from "phoenix"
import { LiveSocket } from "phoenix_live_view"
import topbar from "../vendor/topbar"
function focusInput(input) {
  let end = input.value.length;
  input.setSelectionRange(end, end);
  input.focus();
}

let Hooks = {}
Hooks.FocusInputItem = {
  mounted() {
    focusInput(document.getElementById("update_todo"));
  },
  updated() {
    focusInput(document.getElementById("update_todo"));
  }
}

let csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content")
let liveSocket = new LiveSocket("/live", Socket, { params: { _csrf_token: csrfToken }, hooks: Hooks })

topbar.config({ barColors: { 0: "#29d" }, shadowColor: "rgba(0, 0, 0, .3)" })
window.addEventListener("phx:page-loading-start", info => topbar.show())
window.addEventListener("phx:page-loading-stop", info => topbar.hide())

liveSocket.connect()


window.liveSocket = liveSocket


let msg = document.getElementById('msg');      
let form = document.getElementById('form-msg');       


document.getElementById('form').addEventListener('submit', function () {
  setTimeout(() => { document.getElementById('new_todo').value = ""; }, 1)
});
