themeSettings.$inject = ['$mdThemingProvider'];
export default function themeSettings($mdThemingProvider) {
    // Register the user `avatar` icons

    $mdThemingProvider.theme('default')
    // .primaryPalette('white')
        .accentPalette('blue')
};

