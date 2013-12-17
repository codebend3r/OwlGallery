module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
	    watch: {
		    dev: {
			    files: [ 'sass/**/*.scss', 'js/compiled/**/*.js', 'js/internal/**/*.js', 'js/vendor/**/*.js', 'index.html' ],
			    tasks: ['dev'],
			    options: {
				    livereload: 8000,
				    atBegin: true
			    }
		    },
		    prod: {
			    files: [ 'sass/**/*.scss', 'js/compiled/**/*.js', 'js/internal/**/*.js', 'js/vendor/**/*.js', 'index.html' ],
			    tasks: ['prod'],
			    options: {
				    livereload: 8000,
				    atBegin: true
			    }
		    },
		    release: {
			    files: [ 'sass/**/*.scss', 'js/compiled/**/*.js', 'js/internal/**/*.js', 'js/vendor/**/*.js', 'index.html' ],
			    tasks: ['release'],
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
		    },
		    release: {
			    files: [
				    {src: ['index.html'], dest: '<%= pkg.outputFolder %>/index.html'},
				    {src: ['images/**'], dest: '<%= pkg.outputFolder %>/'},
				    {src: ['css/'], dest: '<%= pkg.outputFolder %>/css'},
				    {src: ['js/'], dest: '<%= pkg.outputFolder %>/js'},
				    {src: ['js/compiled/<%= pkg.outputName %>-<%= pkg.version %>.min.js'], dest: '<%= pkg.outputFolder %>/js/<%= pkg.outputName %>-<%= pkg.version %>.min.js'},
				    {src: ['css/compiled/<%= pkg.outputName %>-<%= pkg.version %>.min.css'], dest: '<%= pkg.outputFolder %>/css/<%= pkg.outputName %>-<%= pkg.version %>.min.css'}
			    ]
		    }
	    },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'css/main.css': 'sass/main.scss',
                    'css/owlgallery.css': 'sass/owlgallery.scss'
                }
            }
        },
	    concat: {
		    options: {
			    // define a string to put between each file in the concatenated output
                stripBanners: true,
			    separator: '\n\n/* ====================== */\n\n'
		    },
		    jsconcat: {
			    // the files to concatenate
			    src: [
				    'js/plugins/jquery-1.9.1.js',
				    'js/plugins/jquery.owlgallery-0.1.5.js',
				    'js/plugins/jquery.owlswipe-0.1.js',
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
				    'css/reset.css',
				    'css/main.css',
				    'css/owlgallery.css'
			    ],
			    dest: 'css/compiled/<%= pkg.outputName %>-<%= pkg.version %>.css'
		    }
	    },
	    uglify: {
		    options: {
			    // the banner is inserted at the top of the output
                stripBanners: true
		    },
		    dist: {
			    files: {
				    'js/compiled/<%= pkg.outputName %>-<%= pkg.version %>.min.js': [
					    'js/compiled/<%= pkg.outputName %>-<%= pkg.version %>.js'
				    ]
			    }
		    }
	    },
	    cssmin: {
		    compress: {
			    options: {
				    report: 'min',
                    stripBanners: true
			    },
			    files: {
				    'css/compiled/<%= pkg.outputName %>-<%= pkg.version %>.min.css': [
					    'css/compiled/<%= pkg.outputName %>-<%= pkg.version %>.css'
				    ]
			    }
		    }
	    },
        connect: {
            dev: {
                options: {
                    port: 8000,
                    base: '<%= pkg.outputFolder %>',
                    keepalive: false,
                    livereload: true
                }
            },
	        prod: {
		        options: {
			        port: 8000,
                    base: '<%= pkg.outputFolder %>',
			        keepalive: false,
			        livereload: false
		        }
	        },
	        release: {
		        options: {
			        port: 8000,
                    base: '<%= pkg.outputFolder %>',
			        keepalive: false,
			        livereload: false
		        }
	        }
        },
	    env: {
		    dev: {
			    NODE_ENV: 'DEV'
		    },
		    prod: {
			    NODE_ENV: 'PROD'
		    },
		    release: {
			    NODE_ENV: 'RELEASE'
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
		    },
		    release: {
			    src: 'index.html',
			    dest: '<%= pkg.outputFolder %>/index.html',
			    options: {
				    context: {
					    name: '<%= pkg.outputName %>',
					    version: '<%= pkg.version %>'
				    }
			    }
		    }

	    },
        'ftp-deploy': {
            build: {
                auth: {
                    host: 's141590.gridserver.com',
                    port: 21,
                    authKey: 'key1'
                },
                src: 'www',
                dest: '/domains/crivas.net/html/git/owlgallery'
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
    grunt.loadNpmTasks('grunt-ftp-deploy');

    // Default task(s).
	grunt.registerTask('watchdev', [ 'connect:dev', 'watch:dev' ]);
	grunt.registerTask('watchprod', [ 'connect:prod', 'watch:prod' ]);
	grunt.registerTask('watchrelease', [ 'connect:release', 'watch:release' ]);
	grunt.registerTask('dev', [ 'env:dev', 'sass', 'clean', 'copy:dev', 'preprocess:dev' ]);
	grunt.registerTask('prod', [ 'env:prod', 'sass', 'concat', 'clean', 'copy:prod', 'preprocess:prod' ]);
    grunt.registerTask('release', [ 'env:release', 'sass', 'concat', 'uglify', 'cssmin', 'clean', 'copy:release', 'preprocess:release' ]);
    grunt.registerTask('deploy', [ 'ftp-deploy' ]);
    grunt.registerTask('launch', [ 'release', 'deploy' ]);
    grunt.registerTask('default', ['dev']);

};