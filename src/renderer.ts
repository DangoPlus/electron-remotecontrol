/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.ts` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */
import { net } from "electron";
import "./index.css";
import { APIURL } from "./utils/config";

console.log(
  '👋 This message is being logged by "renderer.ts", included via Vite'
);

document.getElementById("startFetch").addEventListener("click", fetchData);
// document.getElementById("stopFetch").addEventListener("click", stopFetch);

document.getElementById("masterPassButton").addEventListener("click", () => {
  masterControl("pass");
});
document.getElementById("masterBlockButton").addEventListener("click", () => {
  masterControl("block");
});
document.getElementById("emergencyPassButton").addEventListener("click", () => {
  emergencyControl("pass");
});
document
  .getElementById("emergencyBlockButton")
  .addEventListener("click", () => {
    emergencyControl("block");
  });
function fetchData() {
  const requestOptions = {
    method: "GET",
  };
  fetch(`${APIURL}/masters/`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      document.getElementById("status").textContent = result;
      console.log(result);
    })
    .catch((error) => console.log("error", error));
}

function masterControl(status: string) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    id: 1,
    name: "master",
    status: status,
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
  };

  fetch(`${APIURL}/masters/change_status/master_control`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      fetchData();
    })
    .catch((error) => console.log("error", error));
}
function emergencyControl(status: string) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    id: 2,
    name: "emergency",
    status: status,
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
  };

  fetch(`${APIURL}/masters/change_status/emergency_control`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      fetchData();
    })
    .catch((error) => console.log("error", error));
}
// let fetchInterval: string | number | NodeJS.Timeout;
// function startFetch() {
//   fetchInterval = setInterval(fetchData, 500);
// }
// function stopFetch() {
//   clearInterval(fetchInterval);
// }
