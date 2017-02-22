/// <binding Clean='copy:main' />
module.exports = function(grunt) {
    grunt.initConfig({
        copy: {
            main: {
                files: [
                    // copia todos os arquivos do diretorio e subdiretorio
                    { expand: true, cwd: 'bower_components/', src: ['**/*min.css'], dest: 'assets/frameworks/' },
                    { expand: true, cwd: 'bower_components/', src: ['**/*.eot', '**/*.svg', '**/*.ttf', '**/*.woff', '**/*.woff2'], dest: 'assets/frameworks/' },
                    { expand: true, cwd: 'bower_components/', src: ['**/*min.js'], dest: 'assets/frameworks/' },
                ],
            },
        }
    });
    grunt.registerTask('default', ['copy'])
    grunt.loadNpmTasks("grunt-contrib-copy");



};