# webapp-base

This is for writing the super battleship game a2 assignment for COMP 426. The dev environment was essentially just a node server serving static content. For writing the code, a React/Flux implementation was used. Under the `client` folder, there are 3 main sections: the react components, alt.js stores, and alt.js actions. This is a typically unidirectionally data flow implementation of Flux, where actions are called, which triggers the callbacks in stores, which may end up changing hte view.

All code is browserified into `javacsripts/build/app.js` and `stylesheets/build/style.css`. None of the code I wrote will be minified, but it still will be difficult to read. 
