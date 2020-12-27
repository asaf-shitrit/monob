<h3 align="center">monob</h3>

<div align="center">

</div>

---

<p align="center"> A monorepo build tool
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)

## 🧐 About <a name = "about"></a>

Monob is meant to allow monorepo based JS projects to have the ability
to build local projects in an optimized manner without needing to understand
the dependency structure of the monorepo or perform builds manually.

## 🏁 Getting Started <a name = "getting_started"></a>

Install Monob using [`yarn`](https://yarnpkg.com/en/package/jest):

```bash
yarn add --dev monob
```

Or [`npm`](https://www.npmjs.com/package/jest):

```bash
npm install --save-dev monob
```

Add the following section to your package.json

```json
{
  "monob": {
    "packages": [
      "./packages-path"
    ]
  }
}
```

The packages you define will be the search paths where 
the tool will look for projects to build so you can either
define only your modules or add your apps to the mix.

You can now call the monob from inside the scripts in your
package.json file

```json
{
  "scripts": {
    "build-packages": "monob"
  }
}
```