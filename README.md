# [Hyperapp](https://github.com/hyperapp/hyperapp) for zero-configuration [create-react-app](https://github.com/facebook/create-react-app) style projects

## Starting a new project

Start by creating a new folder for your awesome new Hyperapp project and initialize a new project with [npm](https://nodejs.org/en/download).

```console
mkdir my-awesome-project
cd my-awesome-project
mkdir public src
npm init -y
```

Install your dependencies (they're good for your health).

```console
npm i hyperapp
npm i -D cra-hyperapp
```

Then open your `package.json` in your favorite text editor and add your scripts.

```diff
"scripts": {
+  "start": "hyperapp-scripts",
+  "build": "hyperapp-scripts build"
},
```

Create a `public/index.html` file.

```html
<!doctype html>
<html>
  <head>
    <title>My awesome app!</title>
  </head>
  <body></body>
</html>
```

Next create a `src/index.js` file with a basic hello world app.

```jsx
import { h, app } from "hyperapp"

const state = { title: "Hi." }
const actions = {}
const view = state => <h1>{state.title}</h1>

app(state, actions, view, document.body)
```

Finally start your app and gaze upon its glory.

```console
npm start
```

Congratulations! Your app is now ready to make even more awesome! 😎

## A 12 step recovery program for kicking your React/Redux habit in favor of Hyperapp

1. Remove the `react`, `react-dom`, `redux`, and `react-redux` dependencies.

```console
npm rm react react-dom redux react-redux
```

2. Add the `hyperapp` and `cra-hyperapp` dependencies.

```console
npm i hyperapp cra-hyperapp
```

3. Replace `react-scripts` with `hyperapp-scripts` in your `package.json`.

```diff
"scripts": {
-  "start": "react-scripts start",
-  "build": "react-scripts build"
+  "start": "hyperapp-scripts start",
+  "build": "hyperapp-scripts build"
},
```

4. Remove your Redux `store`.

```console
rm src/store.js
```

5. Replace `import React from "react"` with `import { h } from "cra-hyperapp"`. This gives some compatibility features like `onClick` style support and children as a component prop instead of 2nd argument.

```diff
-import React from "react"
+import { h } from "cra-hyperapp"
```

6. Replace the `ReactDOM.render` with `app` from `hyperapp` using the `withReducer` HOA to pass your root reducer.

```diff
-import React from "react";
-import { render } from "react-dom";
-import { Provider } from "react-redux";
-import store from "./store";
+import { h, withReducer } from "cra-hyperapp";
+import { app } from "hyperapp";
+import reducer from "./reducer";

-render(
+withReducer(reducer)(app)(
+  state,
+  actions,
-  <Provider store={store}>
-    <App />
-  </Provider>,
+  (state, actions) => <App />,
   document.getElementById("root")
 );
```

7. Replace `import { connect } from "react-redux"` with `import { connect } from "cra-hyperapp"`.

```diff
-import { connect } from "react-redux";
+import { connect } from "cra-hyperapp";
```

### Your app should now be back in a working state. Verify this before going full Hyperapp.

8. Move your action/reducer combinations over to native Hyperapp one at a time.
9. Move your components over to native Hyperapp one at a time to use the built-in `h` and removing the `connect` HOC (this happens somewhat simultaneously with the last step).

```diff
-import { h, connect } from "cra-hyperapp"
+import { h } from "hyperapp";
```

10. Remove the `withReducer` HOA from your `app`.

```diff
-import { withReducer } from "cra-hyperapp";
import { h, app } from "hyperapp";
-import reducer from "./reducer";

-withReducer(reducer)(app)(
+app(
  state,
  actions,
  view,
   document.getElementById("root")
 );
```

11. Delete your reducer.

```console
rm src/reducer.js
```

12. Profit with Hyperapp. 💰
