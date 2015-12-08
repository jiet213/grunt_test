/*
 *less多文件压缩
 *运行命令grunt只执行default
 */
'use strict';
module.exports = function(grunt) {

    // LiveReload的默认端口号，你也可以改成你想要的端口号
    var lrPort = 35729;
    // 使用connect-livereload模块，生成一个与LiveReload脚本
    // <script src="http://127.0.0.1:35729/livereload.js?snipver=1" type="text/javascript"></script>
    var lrSnippet = require('connect-livereload')({ port: lrPort });
    // 使用 middleware(中间件)，就必须关闭 LiveReload 的浏览器插件
    var lrMiddleware = function(connect, options) {
        return [
            // 把脚本，注入到静态文件中
            lrSnippet,
            // 静态文件服务器的路径
            connect.static(options.base[0]),
            // 启用目录浏览(相当于IIS中的目录浏览)
            connect.directory(options.base[0])
        ];
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'), //可以获取package.json配置调用方式：<%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %>

        // Metadata.
        meta: {
            basePath: '../',
            srcSassPath: 'sass/',
            srcLessPath: 'less/',
            srcJsPath: 'js/',
            deployPath: 'css/',
            deployCMPath: 'css_min/',
            deployJMPath: 'js_min/',
        },

        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> ',


        //sass complie
        sass: {
            dist: {
                files: {
                    '<%= meta.deployPath %>sass_test.css': '<%= meta.srcSassPath %>sass_test.scss'
                },
                options: {
                    sourcemap: 'true'
                }
            }
        },

        less: {
            //线下
            dist: { //自定义名称

                options: {

                    paths: ['./'], //可以直接以根目录的方式写
                    ieCompat: true, //让css支持ie
                    compress: false, //压缩文件去掉空白处
                    cleancss: false, //压缩文件去掉注释
                    banner: '/*! <%= pkg.author %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                files: { // 文件files 固定命名
                    '<%= meta.deployPath %>personal.css': '<%= meta.srcLessPath %>personal.less'
                }
            }
        },

        cssmin: {

            options: {

                //css压缩文件头部注释生成
                banner:'/*! <%= pkg.author %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'

            },

            dist: {

                //文件对象模式
                files: {

                    '<%= meta.deployCMPath %>css_min.css': '<%= meta.deployPath %>/**/*.css'
                    /*,'<%= meta.deployPath %>common.min.css': '<%= meta.deployPath %>common.css'*/
                }

            }

        },

        /*uncss: {
          dist: {
            src: ['app/hot_word.html', 'app/index.html'],
            dest: 'dist/css/tidy.css'
          }
        },

        processhtml: {
          dist: {
            files: {
              'dist/index.html': ['app/index.html'],
              'dist/hot_word.html': ['app/hot_word.html']
            }
          }
        },*/

        concat: { //合并文件

            options: {

                separator: ';'

            },

            dist: { // src-dest(源文件-目标文件)文件映射的方式

                src: '<%= meta.srcJsPath %>/**/*.js',

                dest: '<%= meta.deployJMPath %>index.js'

            }

        },

        uglify: { //压缩文件

            options: {

                mangle: true, //false不混淆变量名

                preserveComments: false, //false（删除全部注释），some（保留@preserve @license @cc_on等注释），all是保留注释

                //压缩文件头部注释生成
                banner: '/*! <%= pkg.author %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'

            },

            dist: {

                //文件对象模式
                files: {

                    //'<%= meta.deployJMPath %>indx.min.js': '<%= concat.dist.dest %>'
                    '<%= meta.deployJMPath %>plunges.min.js': '<%= meta.deployJMPath %>plunges.js',
                    '<%= meta.deployJMPath %>global.min.js': '<%= meta.deployJMPath %>global.js',
                    '<%= meta.deployJMPath %>index.min.js': '<%= meta.deployJMPath %>index.js',
                    '<%= meta.deployJMPath %>maidian.min.js': '<%= meta.deployJMPath %>maidian.js',
                }

            }

        },

        jshint: { //代码效验

            options: {

                globals: {

                    jQuery: true,

                    console: true,

                    module: true,

                    document: true

                }

            },

            files: ['Gruntfile.js', '<%= meta.srcJsPath %>/**/*.js']

        },

        sprite: { // 自动雪碧图 必须以background:url(***);的路径匹配

            options: {

                imagepath: 'images/', //sprite背景图源文件夹，只有匹配次路径才会处理，默认 images/slice/

                imagepath_map: null, //映射css中背景路径，支持数组和函数，默认 null

                spritedest: 'publish/images/index', //雪碧图输出目录，注意，会覆盖之前文件！默认 null

                spritepath: '../images/index', //替换后的背景路径

                padding: 2, //各图片间间距，如果设置为奇数，会强制+1以保证生成的2x图片为偶数宽高，默认 0

                useimageset: false, //是否使用image-set 作为2x图片实现，默认不使用

                newsprite: false, //是否以时间戳为文件名生成新的雪碧图文件，如果启用请注意清理之前生成的文件，默认不生成新文件

                spritestamp: false, //给雪碧图追加时间戳，false -- 默认不追加, true -- 追加

                cssstamp: false, //在CSS文件末尾追加时间戳，false -- 默认不追加, true -- 追加

                algorithm: 'binary-tree', //默认使用二叉树最优排序算法

                //engine: 'pngsmith' //默认使用'pngsmith'图像处理引擎
            },

            autoSprite: {

                files: [{

                    expand: true, //启用动态扩展

                    cwd: './css/', //文件源的文件夹

                    src: 'icon_sprite.css', //匹配规则

                    dest: './publish/css/', //导出css和sprite 的路径地址

                    ext: '.sprite.css' //导出的 css名

                }]

            }
        },

        // 通过connect任务，创建一个静态服务器
        connect: {
            options: {
                // 服务器端口号
                port: 8000,
                // 服务器地址(可以使用主机名localhost，也能使用IP)
                hostname: 'localhost',
                // 要监测文件的根目录，相对于Gruntfile.js而言
                base: '../'
            },
            livereload: {
                options: {
                    // 通过LiveReload脚本，让页面重新加载。
                    middleware: lrMiddleware
                }
            }
        },

        watch: {
            options: {


            },

            less: { //less
                files: '<%= meta.srcLessPath %>/**/*.less',
                tasks: ['less']
            },

            sass:{
                files:'<%= meta.srcSassPath %>/**/*.scss',
                tasks:['sass'],
                options: {
                    debounceDelay: 250
                }
            },


            cssmin: {

                files: '<%= meta.deployPath %>/**/*.css', //监测 css压缩文件

                tasks: ['cssmin']

            },

            concat: {

                files: '<%= meta.srcJsPath %>/**/*.js', //监测 js合并

                tasks: ['concat']
            },

            uglify: {

                files: ['<%= concat.dist.dest %>'], //监测 js压缩文件

                tasks: ['uglify']

            },

            sprite: { //sprite
                files: ['./css/icon_sprite.css'],
                tasks: ['sprite']
            },

            client: {
                // 我们不需要配置额外的任务，watch任务已经内建LiveReload浏览器刷新的代码片段。
                options: {
                    livereload: lrPort
                },
                // '**' 表示包含所有的子目录
                // '*' 表示包含所有的文件
                files: ['../**/*', 'static/css/*', 'js/*', 'images/**/*']//监听文件
            }
        }
    });

    //watch中的event事件 可以详细的看到你修改了那些文件
    // grunt.event.on('watch', function(action, filepath, target) {
    //   grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    // });

    //载入less编译插件
    grunt.loadNpmTasks('grunt-contrib-less');

    //载入sass编译插件
    grunt.loadNpmTasks('grunt-contrib-sass');

    //载入css压缩插件
    grunt.loadNpmTasks('grunt-contrib-cssmin');

   /* //载入uncss压缩插件
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-processhtml');
*/
    //载入js合并插件
    grunt.loadNpmTasks('grunt-contrib-concat');

    //载入js压缩插件
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //载入文件检测 文件是否规范插件
    grunt.loadNpmTasks('grunt-contrib-jshint');

    //载入雪碧图生成插件
    grunt.loadNpmTasks('grunt-css-sprite');

    //载入页面自动刷新
    grunt.loadNpmTasks('grunt-contrib-connect');

    //载入文件监听插件
    grunt.loadNpmTasks('grunt-contrib-watch');

    //注册js代码校验插件
    grunt.registerTask('test', ['jshint']);

    //执行默认
    grunt.registerTask('default', ['less','sass', 'cssmin',  'concat', 'uglify', 'sprite','connect', 'watch']);
    //grunt.registerTask('bulidless', ['less']);运行命令 grunt bulidless(注：自定义方法不能以插件名称定义名称)
}

