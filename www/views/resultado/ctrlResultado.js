appSimplex.appAngular.controller('ctrlResultado', function ($scope, $rootScope) {
  
  $('#aba2').removeClass('active');
  $('#aba3').addClass('active');
  
  $rootScope.TabelaResultadoFinal.appendTo( document.body );
  $rootScope.TabelaResultadoFinal.appendTo( $('#ResultadoTabela') );  

});
