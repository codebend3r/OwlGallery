module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
	    watch: {
		    dev: {
			    files: [ 'sass/**/*.scss', 'js/**/*.js', 'index.html' ],
			    tasks: ['dev'],
			    options: {
				    livereload: 8000,
				    atBegin: true
			    }
		    }
	    },
	    clean: ["<%= pkg.outputFolder %>", "compiled" ],
	    copy: {
		    dev: {
			    files: [
				    {src: ['index.html'], dest: '<%= pkg.outputFolder %>/index.html'},
				    {src: ['images/**'], dest: '<%= pkg.outputFolder %>/'},
				    {src: ['css/**'], dest: '<%= pkg.outputFolder %>/'},
				    {src: ['js/internal/**'], dest: '<%= pkg.outputFolder %>/'},
				    {src: ['js/plugins/**'], dest: '<%= pkg.outputFolder %>/'},
				    {src: ['js/vendor/**'], dest: '<%= pkg.outputFolder %>/'}
			    ]
		    },
		    prod: {
			    files: [
				    {src: ['index.html'], dest: '<%= pkg.outputFolder %>/index.html'},
				    {src: ['images/**'], dest: '<%= pkg.outputFolder %>/'},
				    {src: ['css/'], dest: '<%= pkg.outputFolder %>/css'},
				    {src: ['js/'], dest: '<%= pkg.outputFolder %>/js'},
				    {src: ['js/compiled/<%= pkg.outputName %>-<%= pkg.version %>.js'], dest: '<%= pkg.outputFolder %>/js/<%= pkg.outputName %>-<%= pkg.version %>.js'},
				    {src: ['css/compiled/<%= pkg.outputName %>-<%= pkg.version %>.css'], dest: '<%= pkg.outputFolder %>/css/<%= pkg.outputName %>-<%= pkg.version %>.css'}
			    ]
		    }
	    },
	    concat: {
		    options: {
			    // define a string to put between each file in the concatenated output
			    separator: '\n\n\n/* ====================== */\n\n\n'
		    },
		    jsconcat: {
			    // the files to concatenate
			    src: [
				    'js/vendor/jquery-1.9.1.js',,
				    'js/vendor/jquery.owlgallery-0.1.5.js',
				    'js/vendor/knockout-2.2.1.js',
				    'js/vendor/TweenMax.min.js',
				    'js/internal/Crivas.Main.js',
				    'js/internal/Crivas.Gallery.js',
				    'js/internal/Crivas.Documentation.js',
				    'js/internal/Crivas.ImageData.js',
				    'js/internal/Crivas.ViewModel.js',
				    'js/internal/Crivas.Init.js'
			    ],
			    // the location of the resulting JS file
			    dest: 'js/compiled/<%= pkg.outputName %>-<%= pkg.version %>.js'
		    },
		    cssconcat: {
			    src: [
				    'css/release/main.css'
			    ],
			    dest: 'css/compiled/<%= pkg.outputName %>-<%= pkg.version %>.css'
		    }
	    },
	    uglify: {
		    options: {
			    // the banner is inserted at the top of the output
			    banner: '\n\n\n/* ====================== */\n\n\n'
		    },
		    dist: {
			    files: {
				    'js/compiled/<%= pkg.outputName %>-<%= pkg.version %>.min.js': [
					    'js/vendor/jquery-1.9.1.js',,
					    'js/vendor/jquery.owlgallery-0.1.5.js',
					    'js/vendor/knockout-2.2.1.js',
					    'js/vendor/TweenMax.min.js',
					    'js/internal/Crivas.Main.js',
					    'js/internal/Crivas.Gallery.js',
					    'js/internal/Crivas.Documentation.js',
					    'js/internal/Crivas.ImageData.js',
					    'js/internal/Crivas.ViewModel.js',
					    'js/internal/Crivas.Init.js'
				    ]
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
	    cssmin: {
		    compress: {
			    files: {
				    "css/compiled/<%= pkg.outputName %>-<%= pkg.version %>.min.css": ['css/compiled/<%= pkg.outputName %>-<%= pkg.version %>.css']
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
        },
	    env: {
		    dev: {
			    NODE_ENV: 'DEVELOPMENT'
		    },
		    prod: {
			    NODE_ENV: 'PRODUCTION'
		    }
	    },
	    preprocess: {

		    dev: {
			    src: 'index.html',
			    dest: '<%= pkg.outputFolder %>/index.html',
			    options: {
				    context: {
					    name: '<%= pkg.outputName %>',
					    version: '<%= pkg.version %>'
				    }
			    }
		    },
		    prod: {
			    src: 'index.html',
			    dest: '<%= pkg.outputFolder %>/index.html',
			    options: {
				    context: {
					    name: '<%= pkg.outputName %>',
					    version: '<%= pkg.version %>'
				    }
			    }
		    }
	    }
    });

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-preprocess');
	grunt.loadNpmTasks('grunt-env');

    // Default task(s).
	grunt.registerTask('watchdev', [ 'watch:dev' ]);
	grunt.registerTask('dev', [ 'env:dev', 'sass', 'preprocess:dev', 'clean', 'copy:dev' ]);
	grunt.registerTask('prod', [ 'env:prod', 'sass', 'concat', 'preprocess:prod', 'clean', 'copy:prod' ]);
    grunt.registerTask('default', ['dev']);

};