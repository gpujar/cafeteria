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
        'public/qr/jquery.min.js',
        'public/qr/bootstrap.min.js',
        'public/qr/modernizr.js',
        'public/qr/jquery.appear.js',
        'public/lib/minislide/jquery.flexslider.js',
        'public/lib/owl_carousel/owl.carousel.js',
        'public/lib/gallery/jquery.fancybox.js',
        'public/lib/gallery/jquery.mousewheel-3.0.6.pack.js',
        'public/qr/parallaxsoon2.js',
        'public/qr/isotope.js',
        'public/qr/script.js',
        'public/qr/angular-route.js',
        'public/qr/qr/grid.js',
        'public/qr/qr/version.js',
        'public/qr/qr/detector.js',
        'public/qr/qr/formatinf.js',
        'public/qr/qr/errorlevel.js',
        'public/qr/qr/bitmat.js',
        'public/qr/qr/bmparser.js',
        'public/qr/qr/datablock.js',
        'public/qr/qr/datamask.js',
        'public/qr/qr/rsdecoder.js',
        'public/qr/qr/gf256poly.js',
        'public/qr/qr/gf256.js',
        'public/qr/qr/qrcode.js',
        'public/qr/qr/decoder.js',
        'public/qr/qr/findpat.js',
        'public/qr/qr/alignpat.js',
        'public/qr/qr/databr.js',
        'public/qr/effects.js',
        'public/qr/photobooth.min.js',
        'public/qr/qr/grid.js'
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
