var restaurantsapp;
(function (restaurantsapp) {
    angular.module('restaurantsapp', ['ui.router', 'ngResource', 'ui.bootstrap']).config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state('home', {
            url: '/',
            templateUrl: '/ngApp/views/mainHome.html',
        })
            .state('admin', {
            url: '/admin',
            templateUrl: '/ngApp/views/adminHome.html',
            controller: restaurantsapp.Controllers.UserController,
            controllerAs: 'controller'
        })
            .state('about', {
            url: '/about',
            templateUrl: '/ngApp/views/about.html',
        })
            .state('error', {
            url: '/error',
            templateUrl: '/ngApp/views/error.html',
        })
            .state('logout', {
            url: '/logout',
            templateUrl: '/ngApp/views/logout.html',
        })
            .state('profile', {
            url: '/profile',
            templateUrl: '/ngApp/views/profile.html',
        })
            .state('reset', {
            url: '/reset',
            templateUrl: 'ngApp/views/reset.html',
        })
            .state('signup', {
            url: '/signup',
            templateUrl: 'ngApp/views/signup.html',
            controller: restaurantsapp.Controllers.UserController,
            controllerAs: 'controller'
        })
            .state('userHome', {
            url: '/userHome',
            templateUrl: '/ngApp/views/userHome.html',
            controller: restaurantsapp.Controllers.HomeController,
            controllerAs: 'controller'
        })
            .state('edit', {
            url: '/edit/:id',
            templateUrl: '/ngApp/views/edit.html',
            controller: restaurantsapp.Controllers.EditController,
            controllerAs: 'controller'
        })
            .state('login', {
            url: '/login',
            templateUrl: 'ngApp/views/login.html',
        })
            .state('notFound', {
            url: '/notFound',
            templateUrl: '/ngApp/views/notFound.html'
        });
        $urlRouterProvider.otherwise('/notFound');
        $locationProvider.html5Mode(true);
    });
})(restaurantsapp || (restaurantsapp = {}));
