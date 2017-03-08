'use strict';

/* eslint comma-dangle:[0, "only-multiline"] */

module.exports = {
  client: {
    lib: {
      css: [
        // bower:css
        'public/lib/bootstrap/dist/css/bootstrap.css',
        'public/lib/bootstrap/dist/css/bootstrap-theme.css',
        'public/lib/ng-img-crop/compile/unminified/ng-img-crop.css',
        'public/lib/bootstrap/bootstrap.min.css',
        'public/lib/bootstrap/bootstrap-theme.min.css',
        'public/lib/animate.css',
        'public/lib/slide/component.css',
        'public/lib/owl_carousel/owl.carousel.css',
        'public/lib/owl_carousel/owl.theme.css',
        'public/lib/minislide/flexslider.css',
        'public/lib/gallery.css',
        'public/lib/fancybox/jquery.fancybox.css',
        'public/lib/main.css',
        'public/lib/responsive.css'
        // endbower
      ],
      js: [
        // bower:js
        'public/lib/angular/angular.js',
        'public/lib/angular-animate/angular-animate.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/lib/ng-file-upload/ng-file-upload.js',
        'public/lib/ng-img-crop/compile/unminified/ng-img-crop.js',
        'public/lib/angular-messages/angular-messages.js',
        'public/lib/angular-mocks/angular-mocks.js',
        'public/lib/angular-resource/angular-resource.js',
        'public/lib/angular-ui-router/release/angular-ui-router.js',
        'public/lib/owasp-password-strength-test/owasp-password-strength-test.js',
        'public/lib/jquery.min.js',
        'public/lib/bootstrap.min.js',
        'public/lib/modernizr.js',
        'public/lib/jquery.appear.js',
        'public/lib/minislide/jquery.flexslider.js',
        'public/lib/owl_carousel/owl.carousel.js',
        'public/lib/gallery/jquery.fancybox.js',
        'public/lib/gallery/jquery.mousewheel-3.0.6.pack.js',
        'public/lib/parallaxsoon2.js',
        'public/lib/isotope.js',
        'public/lib/script.js',
        'public/lib/angular-route.js'
        // 'public/lib/qr/grid.js',
        // 'public/lib/qr/version.js',
        // 'public/lib/qr/detector.js',
        // 'public/lib/qr/formatinf.js',
        // 'public/lib/qr/errorlevel.js',
        // 'public/lib/qr/bitmat.js',
        // 'public/lib/qr/bmparser.js',
        // 'public/lib/qr/datablock.js',
        // 'public/lib/qr/datamask.js',
        // 'public/lib/qr/rsdecoder.js',
        // 'public/lib/qr/gf256poly.js',
        // 'public/lib/qr/gf256.js',
        // 'public/lib/qr/qrcode.js',
        // 'public/lib/qr/decoder.js',
        // 'public/lib/qr/findpat.js',
        // 'public/lib/qr/alignpat.js',
        // 'public/lib/qr/databr.js',
        // 'public/lib/effects.js',
        // 'public/lib/photobooth.min.js',
        // 'public/lib/qr/grid.js'
        // endbower
      ],
      tests: ['public/lib/angular-mocks/angular-mocks.js']
    },

    css: [
      'modules/*/client/css/*.css'
    ],
    less: [
      'modules/*/client/less/*.less'
    ],
    sass: [
      'modules/*/client/scss/*.scss'
    ],
    js: [
      'modules/core/client/app/config.js',
      'modules/core/client/app/init.js',
      'modules/*/client/*.js',
      'modules/*/client/**/*.js'
    ],
    img: [
      'modules/**/*/img/**/*.jpg',
      'modules/**/*/img/**/*.png',
      'modules/**/*/img/**/*.gif',
      'modules/**/*/img/**/*.svg'
    ],
    views: ['modules/*/client/views/**/*.html'],
    templates: ['build/templates.js']
  },
  server: {
    gruntConfig: ['gruntfile.js'],
    gulpConfig: ['gulpfile.js'],
    allJS: ['server.js', 'config/**/*.js', 'modules/*/server/**/*.js'],
    models: 'modules/*/server/models/**/*.js',
    routes: ['modules/!(core)/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
    sockets: 'modules/*/server/sockets/**/*.js',
    config: ['modules/*/server/config/*.js'],
    policies: 'modules/*/server/policies/*.js',
    views: ['modules/*/server/views/*.html']
  }
};
