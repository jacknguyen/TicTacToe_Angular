function gameController($scope){
	$scope.gameBoard = [['', '', ''],['', '', ''],['', '', '']];
	$scope.player1 = '';
	$scope.player2 = '';
	var playerTurn = {val:false};
	var playerMove = 0;
	var win = false;
	//player click function
	$scope.playerClick = function(row,col) {
		if(win == false){
			if ($scope.gameBoard[row][col] == ""){
				if(playerTurn.val =!playerTurn.val) {
					$scope.gameBoard[row][col] = "X";
				}else{
					$scope.gameBoard[row][col] = "O";
				}
			}
			playerMove++
			winCheck();
		}
	};
	//win checker
	function winCheck(){
		var row, col, dia;
		//check rows
		for(var i=0; i<$scope.gameBoard.length;i++){
			if (same($scope.gameBoard[i][0],$scope.gameBoard[i][1],$scope.gameBoard[i][2])=="X"){
				row = "X";
			}else if(same($scope.gameBoard[i][0],$scope.gameBoard[i][1],$scope.gameBoard[i][2])=="O"){
				row = "O";
			}
		}
		//checks columns
		for(var i=0; i<$scope.gameBoard.length;i++){
			if (same($scope.gameBoard[0][i],$scope.gameBoard[1][i],$scope.gameBoard[2][i])=="X"){
				col = "X";
			}else if(same($scope.gameBoard[0][i],$scope.gameBoard[1][i],$scope.gameBoard[2][i])=="O"){
				col = "O";
			}
		}
		//checks diagonals
		for(var i=-1; i<$scope.gameBoard.length;i++){
			if (same($scope.gameBoard[0][1-i],$scope.gameBoard[1][1],$scope.gameBoard[2][1+i])=="X"){
				dia = "X";
			}else if(same($scope.gameBoard[0][1-i],$scope.gameBoard[1][1],$scope.gameBoard[2][1+i])=="O"){
				dia = "O";
			}
		}
		if ((row||col||dia)=="X"){
			// console.log("X wins!");
			$scope.player1++;
			win=true;
		}else if((row||col||dia)=="O"){
			// console.log("O wins!");
			$scope.player2++;
			win=true;
		}
	};
	//checks if values are the same
	function same(val1,val2,val3){
		return (val1==val2&&val2==val3) ? val1 : '';
	};
	//resets game
	$scope.gameReset = function (){
		$scope.gameBoard = [['', '', ''],['', '', ''],['', '', '']];
		playerMove = 0;
		win = false;
		playerTurn.val = false;
	};
};