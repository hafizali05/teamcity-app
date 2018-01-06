themeSettings.$inject = ['$mdThemingProvider'];
export default function themeSettings($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .accentPalette('blue')
};

