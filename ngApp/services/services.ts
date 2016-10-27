namespace restaurantsapp.Services {

    export class RestaurantService {
        private RestaurantResource;

        public get(restaurantId) {
            console.log(restaurantId);
            console.log(this.RestaurantResource.get({id:restaurantId}))

            return this.RestaurantResource.get({id:restaurantId});

        }

        public list() {
            return this.RestaurantResource.query();
        }

        public save(restaurant) {
            return this.RestaurantResource.save(restaurant).$promise;
        }
        public remove(id) {
            return this.RestaurantResource.remove({id:id}).$promise;
        }

        constructor($resource:ng.resource.IResourceService) {
            this.RestaurantResource = $resource('/api/restaurants/:id');
        }

    }

    angular.module('restaurantsapp').service('restaurantService', RestaurantService);


    export class UserService {
        private UserResource;

        public get(userId) {
            console.log(userId);
            console.log(this.UserResource.get({id:userId}))

            return this.UserResource.get({id:userId});

        }

        public list() {
            return this.UserResource.query();
        }

        public save(user) {
            return this.UserResource.save(user).$promise;
        }
        public remove(id) {
            return this.UserResource.remove({id:id}).$promise;
        }

        constructor($resource:ng.resource.IResourceService) {
            this.UserResource = $resource('/api/users/:id');
        }

    }

    angular.module('restaurantsapp').service('userService', UserService);

}
