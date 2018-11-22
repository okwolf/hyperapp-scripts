# Zero-configuration [create-react-app](https://github.com/facebook/create-react-app) style projects with  [Hyperapp](https://github.com/hyperapp/hyperapp)

This package offers a wrapper around the `start`, `build`, and `test` scripts from [`react-scripts`](https://github.com/facebook/create-react-app/tree/master/packages/react-scripts) with customizations to make them work with Hyperapp.

Note: if you want to quickly get started with Hyperapp, you probably want [`create-hyperapp`](https://github.com/okwolf/create-hyperapp) instead.

## Starting a new project from scratch

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
npm i -D hyperapp-scripts
```

Then open your `package.json` in your favorite text editor and add your scripts.

```diff
"scripts": {
+  "start": "hyperapp-scripts",
+  "build": "hyperapp-scripts build",
+  "test": "hyperapp-scripts test"
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
