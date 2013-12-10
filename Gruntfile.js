module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            css: {
                files: [ '**/*.scss', 'index.html' ],
                tasks: ['sass'],
                options: {
                    livereload: 8000,
	                atBegin: true
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
	            files: {
		            'css/main.css': 'sass/main.scss'
	            }
            }
        },
        connect: {
            server: {
                options: {
                    port: 8000,
                    base: '.',
                    keepalive: false,
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // Default task(s).
    grunt.registerTask('watchsass', ['connect', 'watch']);
    grunt.registerTask('default', ['connect', 'watch']);

};