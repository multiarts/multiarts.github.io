 // Núcleo do Gulp
var    gulp        = require('gulp'),
        size         = require('gulp-size'),       // Exíbe o tamanho dos arquivos minimizados
        uglify       = require("gulp-uglify"),    // Transforma o javascript em formato ilegível para humanos
        watch      = require('gulp-watch'),    // Verifica alterações em tempo real, caso haja, compacta novamente todo o projeto
        concat     = require("gulp-concat"),  // Agrupa todos os arquivos em um
        cssmin     = require("gulp-cssmin"), // Minifica o CSS
        htmlmin    = require('gulp-htmlmin'), // Minimiza o HTML
        imagemin = require('gulp-imagemin'),
        pngquant  = require('imagemin-pngquant'),
        stripCssComments = require('gulp-strip-css-comments'); // Remove comentários CSS

// Definimos o diretório dos arquivos para evitar repetição futuramente
// Todos os arquivos CSS que serão compactados
// Explicação: (/*.css e /*.js) busca todos os arquivos css/js de uma pasta, (/**/*.css e /**/*.js) busca todos os arquivos css/js de uma pasta e sub pasta.
var css = [
    './resources/css/style.css',
    './resources/css/flaticon.css',
    './resources/css/responsive.css'
],
// Todos os arquivos JS que serão compactados
js  = [
    './resources/js/jquery/*',               // Todos os arquivos do diretório Jquery
    './resources/js/bootstrap/*.*',        // Todos os arquivos do diretório bootstrap e sub diretórios
    './resources/js/scripts.js'              // Arquivo único
],
html = [
    './html/*'         // Todos os arquivos do diretório HTML
],
imgs = [
    'resources/images/*'
];
 
gulp.task('minimg', () => {
    return gulp.src(imgs)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./assets/images/'));
});
// Processo que agrupará todos os arquivos CSS, removerá comentários CSS e minificará.
gulp.task('mincss', function(){
    gulp.src(css)
    .pipe(concat('all.min.css'))
    .pipe(stripCssComments({all: true}))
    .pipe(cssmin())
    .pipe(gulp.dest('./assets/css/'))
    .pipe(size());
});
 
// Tarefa de minificação do Javascript
gulp.task('minjs', function () {
    gulp.src(js)                                    // Arquivos que serão carregados, veja variável 'js' no início
    .pipe(concat('all.min.js'))                 // Arquivo único de saída
    .pipe(uglify())                                // Transforma para formato ilegível
    .pipe(gulp.dest('./assets/js/'))          // pasta de destino do arquivo(s)
    .pipe(size());
});

gulp.task('minhtml', function () {
    gulp.src(html)
    .pipe(htmlmin({
        "collapseWhitespace": true,
        "removeTagWhitespace": true,
        "removeComments": true,
    }))
    .pipe(gulp.dest('.'))
    .pipe(size());
});
 
// Tarefa padrão quando executado o comando GULP
gulp.task('default',['minjs','mincss','minhtml']);
 
// Tarefa de monitoração caso algum arquivo seja modificado, deve ser executado e deixado aberto, comando "gulp watch".
gulp.task('watch', function() {
    gulp.watch(js, ['minjs']);
    gulp.watch(css, ['mincss']);
    gulp.watch(html, ['minhtml']);
    gulp.watch(imgs, ['minimg']);
});