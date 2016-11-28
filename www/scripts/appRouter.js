// Definindo Rotas
appSimplex.appAngular.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider      
      .state('home', {
          url: '/',
          templateUrl: './views/home/home.html',
          controller: 'ctrlHome'
      })
      .state('incluirDados', {
          url: '/incluirDados',
          templateUrl: './views/incluirDados/incluirDados.html',
          controller: 'ctrlIncluirDados'
      })
      .state('resultado', {
          url: '/resultado',
          templateUrl: './views/resultado/resultado.html',
          controller: 'ctrlResultado'
      });
});

