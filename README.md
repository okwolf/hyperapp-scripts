# Zero-configuration [create-react-app](https://github.com/facebook/create-react-app) style projects with  [Hyperapp](https://github.com/hyperapp/hyperapp)

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
npm i -D hyperapp-scripts
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
