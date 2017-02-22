module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            options: {
                separator: ';',
            },
            basic: {
                src: [
                    'www/app/app.init.js',
                    'www/app/app-filters/truncate.filter.js',
                    'www/app/app-factories/utilidades.factory.js',
                    'www/app/app-factories/itinerario.factory.js',
                    'www/app/app-factories/googleMapsApi.factory.js',
                    'www/app/app-directives/mapsSearch.directive.js',
                    'www/app/app-controllers/pegueFretado.controller.js',
                    'www/app/app-controllers/buscar.controller.js',
                    'www/app/app-controllers/modalNaoEncontrado.controller.js'
                ],
                dest: 'www/assets/all-app.js',
            },
            extras: {
                src: [
                    'www/js/jquery.js', 'www/js/bootstrap.min.js', 'www/js/jquery.inview.min.js', 'www/js/wow.min.js', 'www/js/mousescroll.js', 'www/js/smoothscroll.js', 'www/js/jquery.countTo.js', 'www/js/main.js', 'www/js/angular.min.js', 'www/js/angular-route.min.js', 'www/js/angular-sanitize.min.js', 'www/js/angular-translate.min.js', 'www/js/angular-ui-router.min.js', 'www/js/ui-bootstrap-tpls-1.1.2.min.js', 'www/js/dialogs-default-translations.min.js', 'www/js/dialogs.min.js', 'www/js/html5shiv.js'
                ],
                dest: 'www/assets/all-js-components.js',
            },
            dist: {
                src: [
                    'www/css/bootstrap.min.css', 'www/css/animate.min.css', 'www/css/lightbox.css', 'www/css/main.css', 'www/css/presets/preset3.css', 'www/css/dialogs.min.css', 'www/css/responsive.css'

                ],
                dest: 'www/assets/all-css-components.css',
            },
        },
        compress: {
            main: {
                options: {
                    mode: 'gzip'
                },
                files: [
                    { expand: true, cwd: 'www/app/', src: ['all-app.js'], dest: 'www/assets-gz/', ext: '.gz.js' },
                    {
                        expand: true,
                        cwd: 'www/assets/',
                        src: ['all-js-components.js'],
                        dest: 'www/assets-gz/',
                        ext: '.gz.js'
                    },
                    {
                        expand: true,
                        cwd: 'www/assets/',
                        src: ['all-css-components.css', 'font-awesome.min.css', 'index.css'],
                        dest: 'www/assets-gz/',
                        ext: '.gz.css',
                        filter: 'isFile'
                    }
                ]
            }
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'www/css/',
                    src: ['font-awesome.min.css', 'index.css'],
                    dest: 'www/assets/'
                }, {
                    expand: true,
                    cwd: 'www/',
                    src: ['assets/**', 'assets-gz/**', 'fonts/**', 'images/**', 'index.html', 'buscar.html', 'favicon.ico'],
                    //dest: 'C:/wamp64/www/peguefretado/'
                    dest: 'C:/inetpub/wwwroot/peguefretado/'
                }, ],
            },
        },
    });

    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-compress");

};