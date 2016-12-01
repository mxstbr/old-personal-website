module.exports = function(grunt) {
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      postcss: {
          options: {
            map: false,
            processors: [
                require('postcss-import')({ // Import all the css files...
                  from: "css/main.css" // ...into main.css...
                }),
                require('postcss-simple-vars')(), // ...replace the variables...
                require('postcss-focus')(), // ...add a :focus to ever :hover...
                require('autoprefixer-core')({ // ...add vendor prefixes...
                  browsers: ['last 2 versions', 'IE > 8'] // ...supporting the last 2 major browser versions and IE 8 and up...
                }),
                require('cssnano')({ // ...and minify the result.
                  autoprefixer: false, // Don't run autoprefixer since we've already done that...
                  zindex: false,
                  discardComments: {
                    removeAll: true // ...and remove all comments, even those marked important.s
                  }
                }),
                require('postcss-reporter')({
                  clearMessages: true
                })
            ]
          },
          dist: {
            src: 'css/main.css', // Compile main.css...
            dest: 'build/css/compiled.css' // ...to compiled.css.
          }
      },
      watch: {
          css: {
            files: ['css/**/*.css'], // If any of the .css files change...
            tasks: ['postcss'], // ...run postcss.
            options: {
              spawn: false,
              livereload: true
            },
          },
          scripts: {
            files: ['js/**/*.js'], // If any of the .js files change...
            tasks: ['browserify:client', 'uglify'], // ...run browserify and uglify.
            options: {
              spawn: false,
              livereload: true
            }
          },
          html: {
            files: ['**/*.html'],
            tasks: ['includes'],
            options: {
              spawn: false,
              livereload: true
            }
          }
      },
      connect: { // Start a server...
          server: {
            options: {
              port: 8000, // ...running at http://localhost:8000
              base: 'build',
              livereload: true,
              hostname: '0.0.0.0',
              open: false
            }
          }
      },
      browserify: { // Transform common.js require()'s into one file
        client: {
          src: 'js/app.js', // From app.js...
          dest: 'build/js/bundle.js', // ...to bundle.js.
        },
        html5shiv: {
          src: 'js/html5shiv.min.js',
          dest: 'build/js/html5shiv.min.js'
        },
        printshiv: {
          src: 'js/html5shiv-printshiv.min.js',
          dest: 'build/js/html5shiv-printshiv.min.js'
        }
      },
      uglify: { // Optimize the JS file, for a full list of things UglifyJS does look here: http://lisperator.net/uglifyjs/compress
        bundle: {
            files: {
              'build/js/bundle.min.js': ['build/js/bundle.js'] // Transform bundle.js into bundle.min.js
          }
        },
        options: {
          wrap: false
        }
      },
      copy: { // Copy files to build folder
        build: {
          files: [
            {expand: true, src: '*', dest: 'build', filter: 'isFile'}
          ]
        }
      },
      includes: {
        files: {
          src: ['*.html', 'casestudies/**/*.html', 'about/**/*.html', 'audits/**/*.html', 'bookshelf/**/*.html', 'zohoverify/**/*.html'], // Source files
          dest: 'build', // Destination directory
          flatten: false,
          cwd: '.',
          options: {
            includePath: 'components',
            silent: true
          }
        }
      }
  });

  // Load the tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-includes');
  // Set the default task to running a server and watching files
  grunt.registerTask('default', ['postcss', 'browserify', 'connect', 'watch']);
  grunt.registerTask('build', ['postcss', 'browserify', 'uglify', 'copy:build', 'includes']);
};
