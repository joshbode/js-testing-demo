module.exports = function(grunt) {

  grunt.initConfig({
    karma: {
      unit: {
        frameworks: ['jasmine'],
        browsers: ['PhantomJS'],
        reporters: ['progress'],
        autoWatch: true,
        options: {
          files: ['src/*.js', 'test/*.js']
        }
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
