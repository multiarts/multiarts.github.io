 // Núcleo do Gulp
var    gulp      = require('gulp'),
        size       = require('gulp-size'),       // Exíbe o tamanho dos arquivos minimizados
        uglify     = require("gulp-uglify"),    // Transforma o javascript em formato ilegível para humanos
        watch     = require('gulp-watch'),    // Verifica alterações em tempo real, caso haja, compacta novamente todo o projeto
        concat   = require("gulp-concat"),  // Agrupa todos os arquivos em um
        cssmin   = require("gulp-cssmin"), // Minifica o CSS
        htmlmin  = require('gulp-htmlmin'), // Minimiza o HTML
        stripCssComments = require('gulp-strip-css-comments'); // Remove comentários CSS

// Definimos o diretório dos arquivos para evitar repetição futuramente
// Todos os arquivos CSS que serão compactados
// Explicação: (/*.css e /*.js) busca todos os arquivos css/js de uma pasta, (/**/*.css e /**/*.js) busca todos os arquivos css/js de uma pasta e sub pasta.
var css = [
    './resources/css/*.css'
],
// Todos os arquivos JS que serão compactados
js  = [
    './resources/js/jquery/*',               // Todos os arquivos do diretório Jquery
    './resources/js/bootstrap/*.*',        // Todos os arquivos do diretório bootstrap e sub diretórios
    './resources/js/cbpFWTabs.js',     // cbpFWTabs
    './resources/js/scripts.js'              // Arquivo único
],
html = [
    './html/*'         // Todos os arquivos do diretório HTML
];
 
// Processo que agrupará todos os arquivos CSS, removerá comentários CSS e minificará.
gulp.task('minify-css', function(){
    gulp.src(css)
    .pipe(concat('all.min.css'))
    .pipe(stripCssComments({all: true}))
    .pipe(cssmin())
    .pipe(gulp.dest('./assets/css/'))
    .pipe(size());
});
 
// Tarefa de minificação do Javascript
gulp.task('minify-js', function () {
    gulp.src(js)                                    // Arquivos que serão carregados, veja variável 'js' no início
    .pipe(concat('all.min.js'))                 // Arquivo único de saída
    .pipe(uglify())                                // Transforma para formato ilegível
    .pipe(gulp.dest('./assets/js/'))          // pasta de destino do arquivo(s)
    .pipe(size());
});

gulp.task('minify-html', function () {
    gulp.src(html) // path to your files
    .pipe(htmlmin({
        "collapseWhitespace": true,
        "removeTagWhitespace": true,
        "removeComments": true,
    }))
    .pipe(gulp.dest('./'))
    .pipe(size());
});
 
// Tarefa padrão quando executado o comando GULP
gulp.task('default',['minify-js','minify-css','minify-html']);
 
// Tarefa de monitoração caso algum arquivo seja modificado, deve ser executado e deixado aberto, comando "gulp watch".
gulp.task('watch', function() {
    gulp.watch(js, ['minify-js']);
    gulp.watch(css, ['minify-css']);
    gulp-watch(html, ['minify-html']);
});