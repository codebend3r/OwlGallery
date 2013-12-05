module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass'],
                options: {
                    livereload: false
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: [{
                    expand: true,
                    cwd: 'sass',
                    src: ['**/*.scss'],
                    dest: 'css',
                    ext: '.css'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // Default task(s).
    grunt.registerTask('watchsass', ['watch']);
    grunt.registerTask('default', ['sass']);

};