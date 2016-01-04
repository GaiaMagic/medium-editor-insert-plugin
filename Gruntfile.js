module.exports = function (grunt) {
    require('jit-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            dist: {
                src: ['src/js/templates.js', 'src/js/core.js', 'src/js/*.js'],
                dest: 'dist/js/<%= pkg.name %>.min.js'
            }
        },

        concat: {
            dist: {
                src: ['src/js/templates.js', 'src/js/core.js', 'src/js/*.js'],
                dest: 'dist/js/<%= pkg.name %>.js'
            }
        },

        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/sass/',
                    src: ['*.scss'],
                    dest: 'dist/css/',
                    ext: '.css'
                }]
            }
        },

        autoprefixer: {
            dist: {
                src: 'dist/css/*.css'
            }
        },

        csso: {
            dist: {
                options: {
                    banner: '<%= banner %>'
                },
                expand: true,
                cwd: 'dist/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'dist/css/',
                ext: '.min.css'
            }
        },

        watch: {
            styles: {
                files: 'src/sass/**/*.scss',
                tasks: ['css'],
                options: {
                    debounceDelay: 250
                }
            }
        }
    });

    grunt.registerTask('js', ['uglify', 'concat']);
    grunt.registerTask('css', ['sass', 'autoprefixer', 'csso']);
    grunt.registerTask('default', ['js', 'css']);
};
