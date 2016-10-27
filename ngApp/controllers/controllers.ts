namespace restaurantsapp.Controllers {

    export class HomeController {
        public restaurants;
        public restaurant = {};
        public validationErrors;

        public save() {
          this.restaurantService.save(this.restaurant).then((response) => {

            //   console.log (response.data.redirect);
            //   $state.go (response.data.redirect, { message: response.data.message });

            this.restaurants = this.restaurantService.list();
            this.restaurant = {};
            this.validationErrors = null;
          }).catch((err) => {
            console.error(err);
            this.validationErrors = err.data.errors;
          });
        }

        public remove(id) {
          this.restaurantService.remove(id).then(() => {
            this.restaurants = this.restaurantService.list();
          }).catch((err) => {
            console.error(err);
        });
      }

      constructor(
        private restaurantService:restaurantsapp.Services.RestaurantService,
        private $state:ng.ui.IStateService,
        private $stateParams:ng.ui.IStateParamsService
      ) {
        this.restaurants = restaurantService.list();
        let restaurantId = $stateParams['id'];

      }

    }

    export class EditController {
        public restaurant;

        public save() {
          this.restaurantService.save(this.restaurant).then(() => {
            this.$state.go('userHome');
          }).catch((err) => {
            console.error(err);
        });
}

        constructor(
          private restaurantService:restaurantsapp.Services.RestaurantService,
          private $state:ng.ui.IStateService,
          private $stateParams:ng.ui.IStateParamsService
        ) {
          let restaurantId = $stateParams['id'];
          console.log(restaurantId);
          this.restaurant = restaurantService.get(restaurantId);
          console.log('restaurant: ', this.restaurant);
        }

      }
    export class AboutController {
        public message = 'Hello from the about page!';
    }

    export class UserController {
        public users;
        public user = {};
        public validationErrors;

        public save() {
          this.userService.save(this.user).then((response) => {

            //   console.log (response.data.redirect);
            //   $state.go (response.data.redirect, { message: response.data.message });

            this.users = this.userService.list();
            this.user = {};
            this.validationErrors = null;
          }).catch((err) => {
            console.error(err);
            this.validationErrors = err.data.errors;
          });
        }

        public remove(id) {
          this.userService.remove(id).then(() => {
            this.users = this.userService.list();
          }).catch((err) => {
            console.error(err);
        });
      }

      constructor(
        private userService:restaurantsapp.Services.UserService,
        private $state:ng.ui.IStateService,
        private $stateParams:ng.ui.IStateParamsService
      ) {
        this.users = userService.list();
        let userId = $stateParams['id'];
        console.log('here now', this.users);

      }

    }
}
