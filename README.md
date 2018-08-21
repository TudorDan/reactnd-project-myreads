# MyReads Project

---

## Table of Contents

* [About The Project](#about-the-project)
* [Loading Instructions](#loading-instructions)
* [Important](#important)
* [Create React App](#create-react-app)

### About The Project

The purpose of this project is to meet the requirements for the seventh assignment from the _Front-End Web Developer Nanodegree Program_. As requested, this is a readme file regarding the relevant details about the project and its dependencies.

### Loading Instructions

1. Run the development build on local machine:
    * git clone or download the _start repository_ from [here](https://github.com/udacity/reactnd-project-myreads-starter)
    * install all project dependencies with **npm install**
    * run the application on default server with **npm start**
2. Run the production build:
    * git clone or download the _start repository_ from [here](https://github.com/udacity/reactnd-project-myreads-starter)
    * in the _package.json_ file, edit **homepage** with the URL of your homepage (more details [here](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#building-for-relative-paths))
    * in the _index.js_ file, edit **BrowserRouter basename** 
        * if your site is hosted in the root folder delete the **basename atribute**
        * if your site is hosted in a subfolder insert its path in the **basename atribute** (include forward slash but no trailing slash!)
    * generate the _build_ files with **npm run build** command
    * send the files from the _build_ folder to the hosting server and that should be it!
If you wish to host the app on GitHub Pages then the last two steps are done by installing gh-pages (npm install --save gh-pages) and running **npm run deploy** (more details [here](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#github-pages)).
3. You can access the live version from [here](https://tudordan.github.io/reactnd-project-myreads/)

### Important

The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

### Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
