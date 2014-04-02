var pickFiles = require('broccoli-static-compiler');
var compileSass = require('broccoli-sass');
var templateCompiler = require('broccoli-template-compiler');
var pickFiles = require('broccoli-static-compiler');
var concat = require('broccoli-concat');

module.exports = function (broccoli) {
  var html = broccoli.makeTree("assets");
  var stylesheets = broccoli.makeTree("stylesheets");
  var bundle = broccoli.makeTree("tmp/watchify");
  var bower = broccoli.makeTree("bower_components");
  var templates = broccoli.makeTree("templates");

  var templates = pickFiles(templates, {
    srcDir: "/",
    destDir: "/templates"
  });

  bower = pickFiles(bower, {
    srcDir: '/',
    destDir: 'bower_components'
  });

  templates = concat(templateCompiler(templates), {
    inputFiles: ['**/*.js'],
    outputFile: "/templates.js"
  });

  var css = compileSass([stylesheets], 'main.scss', 'main.css');

  return [html,css,bundle,bower,templates];
};
