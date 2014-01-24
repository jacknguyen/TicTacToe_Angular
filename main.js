var ref;
var IDs;
angular.module("TicTacToe", ["firebase"])
.controller("gameController", function ($scope,$firebase){

	ref = new Firebase("https://heartsvsgems.firebaseio.com/");//initializing firebase through a reference
	$scope.fbRoot = $firebase(ref); //binds the data stored on firebase to fbRoot

	//Lorin's code. Wait until everything is loaded then run inside
	$scope.fbRoot.$on("loaded", function() {
		IDs = $scope.fbRoot.$getIndex(); //setting a local var 'IDs' to the firebase
		
		if(IDs.length == 0) //if there is nothing on the firebase run the code below
		{
			//adds the gameBoard and playerTurn to firebase
	 		$scope.fbRoot.$add( { 
	 			gameBoard:[['', '', ''],['', '', ''],['', '', '']],
 	 			playerTurn:false,
 	 			player1:"",
 	 			player2:"",
 	 			playerMove:0 } );
			//listens for a change to the firebase then run everything inside
			$scope.fbRoot.$on("change", function() {
				IDs = $scope.fbRoot.$getIndex();
				$scope.obj = $scope.fbRoot.$child(IDs[0]); //
			});
		}
		else
		{
			$scope.obj = $scope.fbRoot.$child(IDs[0]);
		}
	});

	//OLD CODE
	// $scope.gameBoard = [['', '', ''],['', '', ''],['', '', '']];
	// $scope.obj.player1 = '';
	// $scope.obj.player2 = '';
	// var playerTurn = {val:false};
	var playerMove = 0;
	var win = false;
	//player click function
	$scope.playerClick = function(row,col) {
		if(win == false){
			if ($scope.obj.gameBoard[row][col] == ""){
				if($scope.obj.playerTurn =!$scope.obj.playerTurn) {
					$scope.obj.gameBoard[row][col] = "X";
				}else{
					$scope.obj.gameBoard[row][col] = "O";
				}
			}
			$scope.obj.playerMove++
			winCheck();
			$scope.obj.$save();
			console.log($scope.fbRoot.$child(IDs[0]))
		}
	};
	//win checker
	function winCheck(){
		var row, col, dia;
		//check rows
		for(var i=0; i<$scope.obj.gameBoard.length;i++){
			if (same($scope.obj.gameBoard[i][0],$scope.obj.gameBoard[i][1],$scope.obj.gameBoard[i][2])=="X"){
				row = "X";
			}else if(same($scope.obj.gameBoard[i][0],$scope.obj.gameBoard[i][1],$scope.obj.gameBoard[i][2])=="O"){
				row = "O";
			}
		}
		//checks columns
		for(var i=0; i<$scope.obj.gameBoard.length;i++){
			if (same($scope.obj.gameBoard[0][i],$scope.obj.gameBoard[1][i],$scope.obj.gameBoard[2][i])=="X"){
				col = "X";
			}else if(same($scope.obj.gameBoard[0][i],$scope.obj.gameBoard[1][i],$scope.obj.gameBoard[2][i])=="O"){
				col = "O";
			}
		}
		//checks diagonals
		for(var i=-1; i<$scope.obj.gameBoard.length;i++){
			if (same($scope.obj.gameBoard[0][1-i],$scope.obj.gameBoard[1][1],$scope.obj.gameBoard[2][1+i])=="X"){
				dia = "X";
			}else if(same($scope.obj.gameBoard[0][1-i],$scope.obj.gameBoard[1][1],$scope.obj.gameBoard[2][1+i])=="O"){
				dia = "O";
			}
		}
		if ((row||col||dia)=="X"){
			// console.log("X wins!");
			$scope.obj.player1++;
			win=true;
		}else if((row||col||dia)=="O"){
			// console.log("O wins!");
			$scope.obj.player2++;
			win=true;
		}
	};
	//checks if values are the same
	function same(val1,val2,val3){
		return (val1==val2&&val2==val3) ? val1 : '';
	};
	//resets game
	$scope.gameReset = function (){
		$scope.fbRoot.$child(IDs[0]).$set( {
			gameBoard:[['', '', ''],['', '', ''],['', '', '']],
			playerMove: 0
		});

		// $scope.obj.gameBoard = [['', '', ''],['', '', ''],['', '', '']];
		// playerMove = 0;
		win = false;
		$scope.obj.playerTurn = false;
	};
});