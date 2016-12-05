var restaurantsapp;
(function (restaurantsapp) {
    var Services;
    (function (Services) {
        var RestaurantService = (function () {
            function RestaurantService($resource) {
                this.RestaurantResource = $resource('/api/restaurants/:id');
            }
            RestaurantService.prototype.get = function (restaurantId) {
                console.log(restaurantId);
                console.log(this.RestaurantResource.get({ id: restaurantId }));
                return this.RestaurantResource.get({ id: restaurantId });
            };
            RestaurantService.prototype.list = function () {
                return this.RestaurantResource.query();
            };
            RestaurantService.prototype.save = function (restaurant) {
                return this.RestaurantResource.save(restaurant).$promise;
            };
            RestaurantService.prototype.remove = function (id) {
                return this.RestaurantResource.remove({ id: id }).$promise;
            };
            return RestaurantService;
        }());
        Services.RestaurantService = RestaurantService;
        angular.module('restaurantsapp').service('restaurantService', RestaurantService);
        var UserService = (function () {
            function UserService($resource) {
                this.UserResource = $resource('/api/users/:id');
            }
            UserService.prototype.get = function (userId) {
                console.log(userId);
                console.log(this.UserResource.get({ id: userId }));
                return this.UserResource.get({ id: userId });
            };
            UserService.prototype.list = function () {
                return this.UserResource.query();
            };
            UserService.prototype.save = function (user) {
                return this.UserResource.save(user).$promise;
            };
            UserService.prototype.remove = function (id) {
                return this.UserResource.remove({ id: id }).$promise;
            };
            return UserService;
        }());
        Services.UserService = UserService;
        angular.module('restaurantsapp').service('userService', UserService);
    })(Services = restaurantsapp.Services || (restaurantsapp.Services = {}));
})(restaurantsapp || (restaurantsapp = {}));
