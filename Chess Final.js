const token = "e9e91ee0-12e3-44a3-88ea-10c953cd62e4";
const Websocket = require('ws');
const ws = new Websocket("ws://megachess.herokuapp.com/service?authtoken="+token);
ws.onopen = function() {
    console.log("mflorespi connected");
}
        
let searchMove = (allMoves) => {
    let aux = allMoves[0][4];
    let chosenMove = allMoves[0];
    for(let n=0; n<allMoves.length; n++) {
        if(aux<allMoves[n][4]) {
            aux = allMoves[n][4];
            chosenMove = allMoves[n];
        }
    }
    return chosenMove;
}
let moveUp = (x, y, board, color, points) => {
    let priorityPoints = [14, 15, 10, 11, 12, 13];
    let enemy = [];
    if (color=="white") {
        enemy = ["p", "q", "b", "h", "k", "r"];
    } else {
        enemy = ["P", "Q", "B", "H", "K", "R"];
    }
    let possibilities = [];
    let count = x;
    while(count>0 && board[count-1][y]== " ") {
        let move =[x, y, count-1, y, points];
        possibilities.push(move);
        count--;
    }                       
    if (count>0 && enemy.indexOf(board[count-1][y])>-1) {
        eatPoints = priorityPoints [enemy.indexOf(board[count-1][y])]
        let move =[x, y, count-1, y, eatPoints];
        possibilities.push(move);
    }
    return possibilities;
}  
                     
let moveDown = (x, y,board, color, points) => {
    let priorityPoints = [14, 15, 10, 11, 12, 13];
    let enemy = [];
    if (color=="white") {
        enemy = ["p", "q", "b", "h", "k", "r"];
    } else {
        enemy = ["P", "Q", "B", "H", "K", "R"];
    }
    let possibilities = [];
    let count = x;
    while(count<15 && board[count+1][y]== " ") {
        let move =[x, y, count+1, y, points];
        possibilities.push(move);
        count++;
    }                       
    if (count<15 && enemy.indexOf(board[count+1][y])>-1) {
        eatPoints = priorityPoints [enemy.indexOf(board[count+1][y])]
        let move =[x, y, count+1, y, eatPoints];
        possibilities.push(move);
    }
    return possibilities;
}  
let moveLeft =(x, y, board, color, points) => {
    let priorityPoints = [14, 15, 10, 11, 12, 13];
    let enemy = [];
    if (color=="white") {
        enemy = ["p", "q", "b", "h", "k", "r"];
    } else {
        enemy = ["P", "Q", "B", "H", "K", "R"];
    }
    let possibilities = [];
    let count = y;
    while(count>0 && board[x][count-1]== " ") {
        let move =[x, y, x, count-1, points];
        possibilities.push(move);
        count--;
    }                       
    if (count>0 && enemy.indexOf(board[x][count-1])>-1) {
        eatPoints = priorityPoints [enemy.indexOf(board[x][count-1])]
        let move =[x, y, x, count-1, eatPoints];
        possibilities.push(move);
    }
    return possibilities;
}  
let moveRight =(x, y, board, color, points) => {
    let priorityPoints = [14, 15, 10, 11, 12, 13];
    let enemy = [];
    if (color=="white") {
        enemy = ["p", "q", "b", "h", "k", "r"];
    } else {
        enemy = ["P", "Q", "B", "H", "K", "R"];
    }
    let possibilities = [];
    let count = y;
    while(count<15 && board[x][count+1]== " ") {
        let move =[x, y, x, count+1, points];
        possibilities.push(move);
        count++;
    }                       
    if (count<15 && enemy.indexOf(board[x][count+1])>-1) {
        eatPoints = priorityPoints [enemy.indexOf(board[x][count+1])]
        let move =[x, y, x, count+1, eatPoints];
        possibilities.push(move);
    }
    return possibilities;
}  

let moveRightUp = (x, y, board, color, points) => {
    let priorityPoints = [14, 15, 10, 11, 12, 13];
    let enemy;
    if(color=="white") {
        enemy = ["p", "q", "h", "b", "r", "k"];
    } else {
        enemy = ["P","Q", "H", "B", "R", "K"];
    }
    let possibilities = [];
    let countX = x;
    let countY = y;
    while(countX>0 && countY<15 && board[countX-1][countY+1]==" ") {
        let move = [x, y, countX-1, countY+1, points];
        possibilities.push(move);
        countX--;
        countY++;
    }
    if(countX>0 && countY<15 && enemy.indexOf(board[countX-1][countY+1])>-1){
        eatPoints = priorityPoints[enemy.indexOf(board[countX-1][countY+1])];
        let move = [x, y, countX-1, countY+1, eatPoints];
        possibilities.push(move);
    }
    return possibilities;
}
let moveLeftUp = (x, y, board, color, points) => {
    let priorityPoints = [14, 15, 10, 11, 12, 13];
    let enemy;
    if(color=="white") {
        enemy = ["p", "q", "h", "b", "r", "k"];
    } else {
        enemy = ["P","Q", "H", "B", "R", "K"];
    }
    let possibilities = [];
    let countX = x;
    let countY = y;
    while(countX>0 && countY>0 && board[countX-1][countY-1]==" ") {
        let move = [x, y, countX-1, countY-1, points];
        possibilities.push(move);
        countX--;
        countY--;
    }
    if(countX>0 && countY>0 && enemy.indexOf(board[countX-1][countY-1])>-1){
        eatPoints = priorityPoints[enemy.indexOf(board[countX-1][countY-1])];
        let move = [x, y, countX-1, countY-1, eatPoints];
        possibilities.push(move);
    }
    return possibilities;
}
let moveDownRight = (x, y, board, color, points) => {
    let priorityPoints = [14, 15, 10, 11, 12, 13];
    let enemy;
    if(color=="white") {
        enemy = ["p", "q", "h", "b", "r", "k"];
    } else {
        enemy = ["P","Q", "H", "B", "R", "K"];
    }
    let possibilities = [];
    let countX = x;
    let countY = y;
    while(countX<15 && countY<15 && board[countX+1][countY+1]==" ") {
        let move = [x, y, countX+1, countY+1, points];
        possibilities.push(move);
        countX++;
        countY++;
    }
    if(countX<15 && countY<15 && enemy.indexOf(board[countX+1][countY+1])>-1){
        eatPoints = priorityPoints[enemy.indexOf(board[countX+1][countY+1])];
        let move = [x, y, countX+1, countY+1, eatPoints];
        possibilities.push(move);
    }
    return possibilities;
}
let moveDownLeft = (x, y, board, color, points) => {
    let priorityPoints = [14, 15, 10, 11, 12, 13];
    let enemy;
    if(color=="white") {
        enemy = ["p", "q", "h", "b", "r", "k"];
    } else {
        enemy = ["P","Q", "H", "B", "R", "K"];
    }
    let possibilities = [];
    let countX = x;
    let countY = y;
    while(countX<15 && countY>0 && board[countX+1][countY-1]==" ") {
        let move = [x, y, countX+1, countY-1, points];
        possibilities.push(move);
        countX++;
        countY--;
    }
    if(countX<15 && countY>0 && enemy.indexOf(board[countX+1][countY-1])>-1){
        eatPoints = priorityPoints[enemy.indexOf(board[countX+1][countY-1])];
        let move = [x, y, countX+1, countY-1, eatPoints];
        possibilities.push(move);
    }
    return possibilities;
}

let moveQueen = (x, y, board, color) => {
    let  moves = [];
    moves.push([0,0,0,0,0]);
    moves = moves.concat(moveUp(x, y, board, color, 0));
    moves = moves.concat(moveDown(x, y, board, color, 0));
    moves = moves.concat(moveRight(x, y, board, color, 0));
    moves = moves.concat(moveLeft(x, y, board, color, 0));
    moves = moves.concat(moveRightUp(x, y, board, color, 0));
    moves = moves.concat(moveDownRight(x, y, board, color, 0));
    moves = moves.concat(moveDownLeft(x, y, board, color, 0));
    moves = moves.concat(moveLeftUp(x, y, board, color, 0));
    moves.shift();
    return moves;
   
}
let moveRook = (x, y, board, color) => {
    let moves = [];
    moves.push([0,0,0,0,0]);
    moves = moves.concat(moveUp(x, y, board, color, 3));
    moves = moves.concat(moveDown(x, y, board, color, 3));
    moves = moves.concat(moveRight(x, y, board, color, 3));
    moves = moves.concat(moveLeft(x, y, board, color, 3));
    moves.shift();
    return moves;
}
let moveBishop  = (x, y, board, color) => {
    let moves = [];
    moves.push([0,0,0,0,0]);
    moves = moves.concat(moveRightUp(x, y, board, color, 2));
    moves = moves.concat(moveDownRight(x, y, board, color, 2));
    moves = moves.concat(moveDownLeft(x, y, board, color, 2));
    moves = moves.concat(moveLeftUp(x, y, board, color, 2));
    moves.shift();
    return moves;
}
let movePawn = (x, y, board, color, points) => {
    let priorityPoints = [14,15, 10, 11, 12, 13];
    let enemy;
    let possibilities = [];
    let movePoints;
    if(color=="white") {
        enemy = ["p", "q", "b", "h", "k", "r"];
        if(board[x-1][y]==" ") {
            if(x==13) {
                movePoints = 5;
            } else if(x==12) {
                movePoints = 6;
            } else if(x==11) {
                movePoints = 7;
            } else if(x==10) {
                movePoints = 8;
            } else if(x==9) {
                movePoints = 9;
            }
            let move = [x, y, x-1, y, movePoints];
            possibilities.push(move);
        }
        if(y>0 && enemy.indexOf(board[x-1][y-1])>-1) {
            eatPoints = priorityPoints[enemy.indexOf(board[x-1][y-1])];
            let move = [x, y, x-1, y-1, eatPoints];
            possibilities.push(move);
        }
        if(y<15 && enemy.indexOf(board[x-1][y+1])>-1) {
            eatPoints = priorityPoints[enemy.indexOf(board[x-1][y+1])];
            let move = [x, y, x-1, y-1, eatPoints];
            possibilities.push(move);
    }
} else {
        enemy = ["P", "Q", "B", "H", "K", "R"];
        if(board[x+1][y]==" ") {
            if(x==2) {
                movePoints = 5;
            } else if(x==3) {
                movePoints = 6;
            } else if(x==4) {
                movePoints = 7;
            } else if(x==5) {
                movePoints = 8;
            } else if(x==6) {
                movePoints = 9;
            }
            let move = [x, y, x+1, y, movePoints];
            possibilities.push(move);
        }
        if(y>0 && enemy.indexOf(board[x+1][y-1])>-1) {
            eatPoints = priorityPoints[enemy.indexOf(board[x+1][y-1])];
            let move = [x, y, x+1, y-1, eatPoints];
            possibilities.push(move);
        }
        if(y<15 && enemy.indexOf(board[x+1][y+1])>-1) {
            eatPoints = priorityPoints[enemy.indexOf(board[x+1][y+1])];
            let move = [x, y, x+1, y+1, eatPoints];
            possibilities.push(move)
        }
    }
    return possibilities
}


let sendMove = (message, x1, y1, x2, y2) => {
    const msg = {
        action: "move",
        data: {
            board_id: message.data.board_id,
            turn_token: message.data.turn_token,
            from_row: x1,
            from_col: y1,
            to_row: x2,
            to_col: y2
        }
    }
    ws.send(JSON.stringify(msg)); 
}

let sendChallenge = (user) => {
    const msg = {
        action: "challenge",
        data: {
            username: user,
            message: "Let´s play!"
        }
    }
    ws.send(JSON.stringify(msg));
}


let acceptChallenge = (message) => {
    const msg = {
        action: "accept_challenge",
        data: {
            board_id: message.data.board_id
        }
    }
    ws.send(JSON.stringify(msg));
}
let chessBoard = (characters) => {
    let ffl = [];
    let chessboard = [];
    for(let x=0; x<16; x++) {
        for(let y=0; y<16; y++){
            ffl[y] = characters.charAt(16*x+y);
        }
        chessboard.push(ffl)
        ffl = []
    }
    return chessboard;
}

let printBoard = (board) => {
    let aff = "";
    for( let x=0; x<16; x++) {
        for(let y=0; y<16; y++) {
            aff += "["+board[x][y]+"]" ;
        }
        console.log(aff);
        aff = "";
    }
}


ws.onmessage = (event) => {
    const msg = JSON.parse (event.data);
    console.log ("New message!: " + msg.event);

    if (msg.event == "update_user_list") {
        console.log( "Updated list:");
        console.log(msg.data.users_list);
    }

    if (msg.event == "ask_challenge") {
        console.log ("New challenge!");
        console.log ("Start game" + msg.data.username);
        acceptChallenge(msg);
    }

    if (msg.event == "gameover") {
         console.log ("Game over!!!");
         let p1 = msg.data.white_username;
         let p2 = msg.data.black_username;
         let s1 = msg.data.white_score;
         let s2 = msg.data.black_score; 
         let endGame = msg.data.game;
         console.log (p1+" : "+ s1);
         console.log (p2+" : "+ s2);  
    }

    if(msg.event == "your_turn") {
        const characters = msg.data.board;
        const board = chessBoard(characters);
        printBoard(board);
        const color = msg.data.actual_turn;
        let myPieces;
        if(color=="black") {
            myPieces = ["p","q","h","b","r","k"];
        } else {
            myPieces = ["P","Q","H","B","R","K"];
        }
        let allMoves = [];
        allMoves.push([0,0,0,0,0]);

        for(let x=0; x<16; x++) {
            for(let y=0; y<16; y++) {
                if(myPieces.indexOf(board[x][y])>-1) {
                    let num = myPieces.indexOf(board[x][y]);
                    if(num==0) {
                        allMoves = allMoves.concat(movePawn(x, y, board, color));
                    }
                    if(num==1) {
                        allMoves = allMoves.concat(moveQueen(x, y, board, color));
                    }
                    if(num==3) {
                        allMoves = allMoves.concat(moveBishop(x, y, board, color));
                    }
                    if(num==4) {
                        allMoves = allMoves.concat(moveRook(x, y, board, color));
                    }
                }
            }
        }
        allMoves.shift();
        if(allMoves.length>0) {
            let chosenMove = searchMove(allMoves);
            sendMove(msg, chosenMove[0], chosenMove[1], chosenMove[2], chosenMove[3]);
        }
        
    }
     
}

  
        