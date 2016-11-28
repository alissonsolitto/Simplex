var appSimplex = new Object();

//Iniciando o Angular JS
appSimplex.appAngular = angular.module('appSimplex', ['ui.router']);

appSimplex.appAngular.run(["$rootScope", function ($rootScope) {
   
    $rootScope.opcao = 0;
    $rootScope.numVariaveis = 0;
    $rootScope.numRestricoes = 0;
    
}]);