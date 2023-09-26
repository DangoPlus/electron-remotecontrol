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

import './index.css';
import { APIURL } from './utils/config';

console.log('👋 This message is being logged by "renderer.ts", included via Vite');


document.getElementById('fetchButton').addEventListener('click', fetchData);

function fetchData() {
const requestOptions = {
    method: 'GET',
};

fetch(`${APIURL}/masters`, requestOptions)
    .then(response => response.text())
    .then(result => { 
        document.getElementById('status').textContent = result;
        console.log(result)
         })
    .catch(error => console.log('error', error));
}


// setInterval(fetchData,500);