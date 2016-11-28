appSimplex.appAngular.controller('ctrlHome', function ($scope, $rootScope, $location) {
  
  $('#aba1').addClass('active');
  $('#aba2').removeClass('active');  
  
  $scope.opcaoHome = $rootScope.opcao;
  $scope.numVariaveisHome = $rootScope.numVariaveis;
  $scope.numRestricoesHome = $rootScope.numRestricoes;
  
  $scope.onClickAvancar = function(){
    
    $rootScope.opcao = parseInt($scope.opcaoHome);
    $rootScope.numVariaveis = parseInt($scope.numVariaveisHome);
    $rootScope.numRestricoes = parseInt($scope.numRestricoesHome);
    
    $rootScope.tipoSimplex = ($scope.opcaoHome == 0 ? "Maximizar" : "Minimizar");
            
    $location.url("/incluirDados");        
  };
    
});