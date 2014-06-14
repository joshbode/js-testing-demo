module.exports = function(grunt) {

  grunt.initConfig({
    karma: {
      options: {
        frameworks: ['jasmine'],
        files: ['src/*.js', 'test/*.js']
      },
      continuous: {
        singleRun: true,
        browsers: ['PhantomJS']
      },
      dev: {
        reporters: 'dots',
        browsers: ['PhantomJS'],
        autoWatch: true
      }
    },
    jsdoc: {
      dist: {
        src: ['src/*.js', 'test/*.js'], 
        options: {
          destination: 'doc'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-jsdoc');

};
