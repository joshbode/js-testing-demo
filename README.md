# Javascript Frameworks

Automated JavaScript BDD Testing and Documentation, using:

- [nodejs](http://nodejs.org/)
- [GruntJS](http://gruntjs.com/)
- [JSDoc](http://usejsdoc.org/)
- [Karma](http://http://karma-runner.github.io/)
- [Jasmine](http://jasmine.github.io/)


## Install Prerequisites

0. Install `nodejs` and `npm`.

1. Install `karma-cli` and `grunt-cli` (globally accessible):

        $ npm install -g grunt-cli karma-cli

2. Install dev dependencies from `package.json`:

        $ cd graph
        $ npm install


## Run Tests with `karma`

1. Run `karma` grunt task:

        $ grunt karma

To perform testing via a real browser (rather than `PhantomJS`) update the
`browsers` option in `Gruntfile.js` (e.g. `browsers: ['Firefox', 'Chrome']` to
test via Firefox _and_ Chrome simultaneously).


## Generate JSDoc Documentation

1. Run `jsdoc` grunt task:

        $ grunt jsdoc

2. Open [documentation](docs/index.html)
