// Ouvrir le terminal de commande : se placer dans le dossier et appuyer sur "Shift + clic droit" => ouvrir une fenêtre de commande

module.exports = function(grunt) {
  
  grunt.initConfig({
    
    less:{
        compile: {
            options: {
                compress: true,
                yuicompress: true
            },
            files:{
                "css/style.css": "css/style.less",
                "dist/css/style.css": "css/style.less"
            }
        }
    },
    
    uglify: {
        options: {
            mangle: false
        },
        target: {
            files: {
                "js/app.js" : ["js/controller/allCtrl.js", "js/controller/homeCtrl.js"],
                "dist/js/app.js" : ["js/controller/allCtrl.js", "js/controller/homeCtrl.js"]
            }
        }
    },
    
    minifyHtml: {
        options: {
            cdata: true
        },
        dist: {
            files: {
                "dist/views/home.php": "views/home.php"
            }
        }
    },
    
    watch: {
        style: {
            files: "**/*.less",
            tasks: ["less:compile"]
        },
        script: {
            files: "js/controller/*.js",
            tasks: ["uglify"]
        },
        html: {
            files: ["views/*.php"],
            tasks: ["minifyHtml"]
        }
    }
    
  });
  
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-minify-html");
  
  // Il est conseiller de compiler avant de lancer "Watch"
  grunt.registerTask("goUgly", ["uglify"]);
  grunt.registerTask("goLess", ["less:compile"]);
  grunt.registerTask("goMinify", ["minifyHtml"]);
  grunt.registerTask("goGrunt", ["less:compile", "watch"]);
  
};

/*"js/js.min.js" : ["js/js.js"],
"js/jquery.min.js" : ["js/jquery.js"],
"js/ajax.min.js" : ["js/ajax.js"],
"bootstrap/js/modal.min.js" : ["bootstrap/js/modal.js"]*/