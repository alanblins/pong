module.exports = function(grunt) {

  grunt.initConfig({
    ts: {
      default : {
          src: ["www-root/**/*.ts", "!node_modules/**/*.ts","!www-root/bower_components/**/*.ts"]
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>',"www-root/*.ts"],
      tasks: ['jshint',"ts"]
    },

    connect: {
      server: {
        options: {
          port: 7000,
          base: 'www-root'
        }
      }
    },

    wiredep: {

      task: {

        // Point to the files that should be updated when
        // you run `grunt wiredep`
        src: [
          'www-root/index.html',   // .html support...
        ],

        options: {
          // See wiredep's configuration documentation for the options
          // you may pass:

          // https://github.com/taptapship/wiredep#configuration
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks("grunt-ts");

  grunt.registerTask('default', ['ts','connect:server','watch']);
};