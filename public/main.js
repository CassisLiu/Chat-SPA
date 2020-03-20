/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ \"./src/services.js\");\n// Import Method -- Seperation of Concerns\n\nconst app = {\n  'pollId': null,\n  'isLoggedIn': false,\n  'message': [],\n  'error': ''\n}; // ------------------------------------------------ //\n//                Initial Loading                   //\n\nObject(_services__WEBPACK_IMPORTED_MODULE_0__[\"fetchLoginStatus\"])().then(() => {\n  app.isLoggedIn = true;\n  startPoll();\n  renderPage();\n}).catch(() => {\n  app.isLoggedIn = false;\n  renderPage();\n});\n/**\n * @param {boolean} show abc\n */\n\nfunction renderLogin(show) {\n  const login = document.querySelector('.login');\n\n  if (show) {\n    login.innerHTML = \"\\n         <label>Username: <input/></label>\\n         <button class=\\\"to-login\\\" type=\\\"button\\\">Login</button>\\n        \";\n  } else {\n    login.innerHTML = \"\";\n  }\n}\n\nfunction renderError(error) {\n  document.querySelector('.status').innerHTML = error;\n}\n\nfunction startPoll() {\n  if (app.pollId) {\n    return;\n  }\n\n  app.pollId = setInterval(() => {\n    Object(_services__WEBPACK_IMPORTED_MODULE_0__[\"fetchTodos\"])().catch(() => {\n      app.error = 'this should be a real error message';\n      renderPage();\n    }).then(list => {\n      app.error = '';\n      app.message = list;\n      renderPage();\n    });\n  }, 3000);\n}\n\nfunction stopPoll() {\n  clearTimeout(pollId);\n  app.pollId = null;\n}\n\nfunction renderMessage(message) {\n  const messages = document.querySelector('.message');\n  messages.innerHTML = message.map(item => \"<li>\".concat(item, \"</li>\")).join('');\n}\n\nfunction dispalyPage(display) {\n  const displayPanel = document.querySelector('.display-panel');\n  displayPanel.style.visibility = display;\n}\n\nfunction renderPage() {\n  if (!app.isLoggedIn) {\n    renderLogin(true);\n    renderMessage([]);\n    dispalyPage('hidden');\n  } else {\n    renderLogin(false);\n    renderMessage(app.message);\n    dispalyPage('visible');\n  }\n\n  renderError(app.error);\n} // ---------------------------------------------------- //\n//               ADD EVENT LISTERNER                    //\n\n\nconst login = document.querySelector('.login');\nlogin.addEventListener('click', e => {\n  if (!e.target.classList.contains('to-login')) {\n    return;\n  }\n\n  const username = login.querySelector('input').value;\n  Object(_services__WEBPACK_IMPORTED_MODULE_0__[\"fetchLogIn\"])(username).then(messageList => {\n    app.isLoggedIn = true;\n    app.message = messageList;\n    app.error = '';\n    startPoll();\n    renderPage();\n  }).catch(() => {\n    app.error = 'Login failed';\n    renderPage();\n  });\n});\nconst logout = document.querySelector('.logout');\nlogout.addEventListener('click', e => {\n  Object(_services__WEBPACK_IMPORTED_MODULE_0__[\"fetchLogout\"])().then(() => {\n    app.isLoggedIn = false;\n    app.message = [];\n    app.error = '';\n    stopPoll();\n  }).catch(() => {\n    app.error = 'Logout failed';\n    renderPage();\n  });\n});\nconst task = document.querySelector('.add-message');\ntask.addEventListener('click', e => {\n  if (e.target.classList.contains('send')) {\n    const username = username;\n  }\n});\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/*! exports provided: fetchLogIn, fetchLoginStatus, fetchLogout, fetchTodos, fetchNewMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchLogIn\", function() { return fetchLogIn; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchLoginStatus\", function() { return fetchLoginStatus; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchLogout\", function() { return fetchLogout; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchTodos\", function() { return fetchTodos; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchNewMessage\", function() { return fetchNewMessage; });\n/* eslint-disable prefer-promise-reject-errors */\nfunction fetchLogIn(username) {\n  return fetch('/session', {\n    method: 'POST',\n    headers: new Headers({\n      'content-type': 'application/json'\n    }),\n    body: JSON.stringify({\n      'username': username,\n      'action': 'login'\n    })\n  }).catch(() => {\n    return Promise.reject({\n      code: 'network-error'\n    });\n  }).then(response => {\n    if (!response.ok) {\n      return response.json().then(result => Promise.reject(result));\n    }\n\n    return response.json();\n  });\n}\n;\nfunction fetchLoginStatus() {\n  return fetch('/session', {\n    method: 'GET'\n  }).catch(() => {\n    return Promise.reject({\n      code: 'network-error'\n    });\n  }).then(response => {\n    if (!response.ok) {\n      return Promise.reject({\n        code: 'login-invalid'\n      });\n    }\n\n    return response.json();\n  });\n}\n;\nfunction fetchLogout() {\n  return fetch('/session', {\n    method: 'POST',\n    headers: {\n      'content-type': 'application/json'\n    },\n    body: {\n      'username': username,\n      'action': 'logout'\n    }\n  }).catch(() => {\n    return Promise.reject({\n      code: 'network-error'\n    });\n  }).then(response => {\n    if (!response.ok) {\n      return Promise.reject({\n        code: 'logout-failure'\n      });\n    }\n\n    return response.json();\n  });\n}\n;\nfunction fetchTodos() {\n  return fetch('/message', {\n    method: 'GET'\n  }).catch(() => {\n    return Promise.reject({\n      code: 'network-error'\n    });\n  }).then(response => {\n    if (!response.ok) {\n      return response.json().then(result => Promise.reject(result));\n    }\n\n    return response.json();\n  });\n}\n;\nfunction fetchNewMessage(task) {\n  return fetch('/message', {\n    method: 'POST',\n    headers: new Headers({\n      'content-type': 'application/json'\n    }),\n    body: {\n      'username': task.username,\n      'time': task.time,\n      'messageBody': task.body\n    }\n  }).catch(() => {\n    return Promise.reject({\n      code: 'network-error'\n    });\n  }).then(response => {\n    if (!response.ok) {\n      return response.json().then(result => Promise.reject(result));\n    }\n\n    return response.json();\n  });\n}\n;\n\n//# sourceURL=webpack:///./src/services.js?");

/***/ })

/******/ });