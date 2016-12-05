var restaurantsapp;
(function (restaurantsapp) {
    var Controllers;
    (function (Controllers) {
        var HomeController = (function () {
            function HomeController(restaurantService, $state, $stateParams) {
                this.restaurantService = restaurantService;
                this.$state = $state;
                this.$stateParams = $stateParams;
                this.restaurant = {};
                this.restaurants = restaurantService.list();
                var restaurantId = $stateParams['id'];
            }
            HomeController.prototype.save = function () {
                var _this = this;
                this.restaurantService.save(this.restaurant).then(function (response) {
                    _this.restaurants = _this.restaurantService.list();
                    _this.restaurant = {};
                    _this.validationErrors = null;
                }).catch(function (err) {
                    console.error(err);
                    _this.validationErrors = err.data.errors;
                });
            };
            HomeController.prototype.remove = function (id) {
                var _this = this;
                this.restaurantService.remove(id).then(function () {
                    _this.restaurants = _this.restaurantService.list();
                }).catch(function (err) {
                    console.error(err);
                });
            };
            return HomeController;
        }());
        Controllers.HomeController = HomeController;
        var EditController = (function () {
            function EditController(restaurantService, $state, $stateParams) {
                this.restaurantService = restaurantService;
                this.$state = $state;
                this.$stateParams = $stateParams;
                var restaurantId = $stateParams['id'];
                console.log(restaurantId);
                this.restaurant = restaurantService.get(restaurantId);
                console.log('restaurant: ', this.restaurant);
            }
            EditController.prototype.save = function () {
                var _this = this;
                this.restaurantService.save(this.restaurant).then(function () {
                    _this.$state.go('userHome');
                }).catch(function (err) {
                    console.error(err);
                });
            };
            return EditController;
        }());
        Controllers.EditController = EditController;
        var AboutController = (function () {
            function AboutController() {
                this.message = 'Hello from the about page!';
            }
            return AboutController;
        }());
        Controllers.AboutController = AboutController;
        var UserController = (function () {
            function UserController(userService, $state, $stateParams) {
                this.userService = userService;
                this.$state = $state;
                this.$stateParams = $stateParams;
                this.user = {};
                this.users = userService.list();
                var userId = $stateParams['id'];
                console.log('here now', this.users);
            }
            UserController.prototype.save = function () {
                var _this = this;
                this.userService.save(this.user).then(function (response) {
                    _this.users = _this.userService.list();
                    _this.user = {};
                    _this.validationErrors = null;
                }).catch(function (err) {
                    console.error(err);
                    _this.validationErrors = err.data.errors;
                });
            };
            UserController.prototype.remove = function (id) {
                var _this = this;
                this.userService.remove(id).then(function () {
                    _this.users = _this.userService.list();
                }).catch(function (err) {
                    console.error(err);
                });
            };
            return UserController;
        }());
        Controllers.UserController = UserController;
    })(Controllers = restaurantsapp.Controllers || (restaurantsapp.Controllers = {}));
})(restaurantsapp || (restaurantsapp = {}));
