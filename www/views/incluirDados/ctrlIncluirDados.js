appSimplex.appAngular.controller('ctrlIncluirDados', function ($scope, $rootScope, $location) {

  $('#aba1').removeClass('active');
  $('#aba2').addClass('active');  
  $('#aba3').removeClass('active');  

  //Criando campos dinamicos na tela na tela
  function CamposDinamicos(){
    //Função
    for(var i = 0; i < $rootScope.numVariaveis; i++){
      
      var clone = $('#divSimplex div#default').clone().removeAttr('id').appendTo('#divSimplex');        
          clone.find('.defaultInput').attr('id', 'x' + i);
          //clone.find('.defaultDesc').text('x' + i + ' + ');
          clone.find('.defaultDesc').text('x' + i);
          
          if(i == $rootScope.numVariaveis - 1)
            clone.find('.defaultDesc').text('x' + i);
          
          clone.attr('style', 'display:block;');
    }
    
    //Restrições  
    for(var j = 0; j < $rootScope.numRestricoes; j++){
      
      var idRestricao = 'restricao' + j;
      
      var restricao = $('#divRestricao').clone().removeAttr('id').appendTo('#contentRestricao');
      restricao.attr('id', idRestricao);
      restricao.attr('style', 'display:block;');
      
      for(var i = 0; i < $rootScope.numVariaveis; i++){
        
        var clone = $('#' + idRestricao + ' div#default').clone().removeAttr('id').appendTo('#' + idRestricao);        
            clone.find('.defaultInputRestricao').attr('id', 'r' + j + i);
            clone.find('.defaultDescRestricao').text('x' + i);
            clone.attr('style', 'margin-right:20px; padding-left:0px; display:block;');
            
            
        if(i == $rootScope.numVariaveis - 1)
        {
          clone.find('.defaultDescRestricao').text('x' + i + ' <= ');
          
          var clone = $('#' + idRestricao + ' div#default').clone().removeAttr('id').appendTo('#' + idRestricao);        
              clone.find('.defaultInputRestricao').attr('id', 'r' + j + (i+1));              
              clone.find('.defaultDescRestricao').text('');
              clone.attr('style', 'margin-right:20px; padding-left:0px; display:block;');
              
        }
        
      }
    }
  };
  
  //Executa função para criar campos
  CamposDinamicos();
  
  $scope.ProcessarSimplex = function(){    
  
    $scope.vSimplex = new Array($rootScope.numVariaveis);
    $scope.vSimplexObjetivo = new Array($rootScope.numVariaveis + 2); //com "Z" e "0"
        
    //Matrix
    $scope.vRestricao = new Array($rootScope.numRestricoes);
    
    for(var i = 0; i < $rootScope.numRestricoes; i++){
       
       $scope.vRestricao[i] = new Array($rootScope.numVariaveis + 1);
    }
        
    CarregarVetores();
    GerarObjetivoFolga();
    GerarTabelaSimplex();
    
    logSimplex($scope.vTabelaSimplex); 
    
    while(IdentificaVarEntra())
    {
      CalcularSimplex();
      logSimplex($scope.vTabelaSimplex); 
    }   
        
    //Muda para outra página
    $location.url("/resultado");  
    
  };
  
  
  function CarregarVetores(){
    
    //Armazenar dados nos vetores
    
    //Simplex
    for(var i = 0; i < $rootScope.numVariaveis; i++){
    
      if($rootScope.opcao == 1) //Minimizar       
      {
        $scope.vSimplex[i] = parseInt($('#x' + i).val()) * -1;
      }
      else
      {
        $scope.vSimplex[i] = parseInt($('#x' + i).val());
      }      
    }
    
    //Restrições
    for(var i = 0; i < $rootScope.numRestricoes; i++){
      
      for(var j = 0; j < $rootScope.numVariaveis + 1; j++){
         
         $scope.vRestricao[i][j] = parseInt($('#r' + i + j).val());
        
      }      
    }    
    
    console.table($scope.vRestricao);
    console.table($scope.vSimplex);
    
  };
  
  function GerarObjetivoFolga(){
    
    //Objetivo
    $scope.vSimplexObjetivo[0] = 1;
    $scope.vSimplexObjetivo[$scope.vSimplexObjetivo.length - 1] = 0;
    
    for(var i = 0; i < $scope.vSimplex.length; i++){
      
      $scope.vSimplexObjetivo[i+1] = $scope.vSimplex[i] *-1;
    }
        
  };
  
  
  function GerarTabelaSimplex(){
    
    $scope.linha = $rootScope.numRestricoes + 1;
    $scope.coluna = $rootScope.numVariaveis + $rootScope.numRestricoes + 2;
    var limite = $scope.coluna - 1;
    
    $scope.vTabelaSimplex = new Array($scope.linha);
    
    // Coluna
    for(var i = 0; i < $scope.vTabelaSimplex.length; i++){
       
       $scope.vTabelaSimplex[i] = new Array($scope.coluna); // z, variavel, folga, b
    }
    
    // Preencher a tabela simplex inicial
    var folga = 0;
    
    for(var i = 0; i < $scope.linha; i++){
      
      folga = 0;
      
      for(var j = 0; j < $scope.coluna; j++){
         
         //Linha zero
         if(i == 0)
         {
           $scope.vTabelaSimplex[i][j] = $scope.vSimplexObjetivo[j];
           
           if(j >= $scope.vSimplexObjetivo.length)
             $scope.vTabelaSimplex[i][j] = 0;           
         }
         else
         {
           if(j == 0) // Primeira coluna
           {
             $scope.vTabelaSimplex[i][j] = 0;             
           }
           else if(j == limite) //Ultima coluna
           {
             $scope.vTabelaSimplex[i][j] = $scope.vRestricao[i-1][$rootScope.numVariaveis];
           }
           else if(j > $rootScope.numVariaveis) //Folgas
           {
             folga++;               
             $scope.vTabelaSimplex[i][j] = (i == folga ? 1 : 0);
           }
           else // Variaveis
           {
             $scope.vTabelaSimplex[i][j] = $scope.vRestricao[i-1][j-1];               
           }           
         }
      }      
    } 
  };
  
  
  function IdentificaVarEntra()
  {    
    //1º Identificar variável que entra
    var menorNegativo = 0;
    $scope.colunaPivo = 0;
    
    for(var i = 1; i < $scope.coluna - 1; i++){
      
      if($scope.vTabelaSimplex[0][i] < menorNegativo)
      {
        menorNegativo = $scope.vTabelaSimplex[0][i];
        $scope.colunaPivo = i;
      }
    }
    
    if(menorNegativo < 0)
    {
      return true;
    }
    
    return false;
  }
  
  function CalcularSimplex(){
    
    //2º Identificar linha pivô
    var divisao = 0;
    var maiorPositivo = 99999;
    var linhaPivo = 0;
    
    for(var i = 1; i < $scope.linha; i++){ //Começa da linha 1 e não da 0
      
      divisao = $scope.vTabelaSimplex[i][$scope.coluna - 1] / $scope.vTabelaSimplex[i][$scope.colunaPivo];      
      
      if((divisao > 0) && (divisao < maiorPositivo))
      {
        maiorPositivo = divisao;
        linhaPivo = i;        
      }
    }
    
    //3º Identificar elemento pivô
    var elementoPivo = $scope.vTabelaSimplex[linhaPivo][$scope.colunaPivo];
    
    //4º Calcular nova linha pivô    
    $scope.vNovaTabelaSimplex = new Array($scope.linha);
    
    for(var i = 0; i < $scope.vNovaTabelaSimplex.length; i++){
       
       $scope.vNovaTabelaSimplex[i] = new Array($scope.coluna);
    }    
    
    for(var i = 0; i < $scope.coluna; i++){
      
      $scope.vNovaTabelaSimplex[linhaPivo][i] = $scope.vTabelaSimplex[linhaPivo][i] / elementoPivo;      
      
    };
    
    //5º Calcular novas linhas
    for(var i = 0; i < $scope.linha; i++){
      
      if(i != linhaPivo) //Nova linha pivô já foi calculada
      {
        for(var j = 0; j < $scope.coluna; j++){
          
          $scope.vNovaTabelaSimplex[i][j] = $scope.vNovaTabelaSimplex[linhaPivo][j] * ($scope.vTabelaSimplex[i][$scope.colunaPivo] * -1);
        }
        
        //Soma com a primeira linha
        for(var j = 0; j < $scope.coluna; j++){
          
          $scope.vNovaTabelaSimplex[i][j] = $scope.vNovaTabelaSimplex[i][j] + $scope.vTabelaSimplex[i][j];
        }        
      }
    }
    
    $scope.vTabelaSimplex = $scope.vNovaTabelaSimplex.slice();
    $scope.vNovaTabelaSimplex.length = 0;       
  };
  
  
  
  // function resultadoFinal(vetor)
  // {
    // $rootScope.vResultadoFinal = new Array($scope.Coluna);
    
    // var zero = 0;
    // var um = 0;    
    
    // for(var i = 0; i < $scope.coluna; i++){
      
      // for(var j = 0; j < $scope.linha; j++){
        
        
        // if(vetor[j][i] == 0) zero++;
        
        // if(vetor[j][i] == 0) um++;
        
        // if((zero == $rootScope.numRestricoes + 1) && (um == 1))
        // {
          // $rootScope.vResultadoFinal[i] = vetor[j][$scope.coluna - 1];
        // }
        
      // }      
    // }
  // }
  
  
  $rootScope.TabelaResultadoFinal = $("<div></div>")
  
  function logSimplex(vetor)
  {
    
    var $table = $( "<table class=\"table\"></table>" );
    
    //Header
    var $line = $("<thead style=\"background-color: #2196f3;color: white;\"></thead>");
    $line.append( $( "<th class=\"text-center\"></th>" ).html('Z'));
    
    //X
    for(var i = 0; i < $scope.vSimplex.length; i++){      
      
      $line.append( $( "<th class=\"text-center\"></th>" ).html('X' + i) );
    }
    
    //Folga
    for(var i = 0; i < $scope.vRestricao.length; i++){      
      
      $line.append( $( "<th class=\"text-center\"></th>" ).html('F' + i) );
    }
    
    $line.append( $( "<th class=\"text-center\"></th>" ).html('B'));
    $table.append( $line );
        
    
    //Dados do Simplex
    $line = $("<tbody></tbody>");
    
    for(var i = 0; i < $scope.linha; i++){
      
      $line = $( "<tr></tr>" );
      
      for(var j = 0; j < $scope.coluna; j++){
        
        $line.append( $( "<td class=\"text-center\"></td>" ).html(vetor[i][j]));        
      }
      
      $table.append($line);
    }    
    
    $rootScope.TabelaResultadoFinal.append( $table );
    // $table.appendTo( document.body );
    // //Div
    // $table.appendTo( $('#content'));
  };
  
  

});
