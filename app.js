console.log("JS connected");
let myShip={
    hull:20,
    firepower:5,
    accuracy:0.7,
    attack:function(index){
        if(Math.random()<myShip.accuracy){
            console.log("%c You HIT the alien!!!", "color: lightblue; font-size: large");
            return true;
        }else{
            console.log("%c You missed hitting the alien!!!", "color: silver; font-size: large");
            return false;
        }
    }
}
class alienShip{
    constructor(prop1,prop2,prop3){
        this.hull= prop1;
        this.firepower= prop2;
        this.accuracy = prop3;
    }
     attack(){
        if(Math.random()<this.accuracy){
            console.log("%c Alien HIT you", "color: lightred; font-size: large");
            myShip.hull =myShip.hull-this.firepower;
        }
        else{
            console.log("%c Alien missed the attack", "color: white; font-size: large");
        }
       // console.log(myShip);
    }
    
}
let enemies=[];
for(let i=0;i<6;i++){
    let alienHull = Math.floor(Math.abs(Math.random()) * 4) + 3;
    let alienFirepower = Math.abs(Math.floor(Math.random(0,1) * 3)) + 2; 
    let alienAccuracy = (Math.floor(Math.random(0,1) * 3) + 6) / 10;
    let alien = new alienShip(alienHull,alienFirepower,alienAccuracy);
    enemies.push(alien);
}
//console.log(enemies);
let isGameOn=true;
let game=()=>{
    let userWin=true;
    let alive=false;
    function isAlive(){
        if(myShip.hull>0){
            alive=true;
        }
        else{
            console.log("%c Game is Over and You lost!!!", "color: red; font-size: x-large");
        }
        return alive;
    }
    function checkWin(){
        for(enemy of enemies){
            if(enemy.hull>0){
                userWin=false;
            }
        }
        if(userWin==true){
            console.log("%c Game is Over and You WON!!!", "color: lightgreen; font-size: x-large");
            alert("Congratulations!!! You won");
        }

        return userWin;
    }
    isAlive();
    checkWin();
    if(alive==true && userWin==false){
        isGameOn=true;
    }
    else{
        isGameOn=false;
    }
    return isGameOn;
}
isGameOn = game();
var exit_loops = false;
let userInput =window.prompt("Enter 'ATTACK' or 'RETREAT' to continue or quit the game","");
if(userInput ==null){
    alert("Please enter attack or retreat to continue");
    userInput = window.prompt("Enter 'ATTACK' or 'RETREAT' to continue or quit the game","");
}
let lowercaseUserInput =userInput.toLowerCase();
if(lowercaseUserInput==="attack"){
    console.log("%c spacebattle", "background: blue; color: yellow; font-size: x-large");
    while(isGameOn){
            for(let i=0;i<6;i++){
                if(isGameOn){
                    //console.log("inside for loop :"+i);
                    let alien = enemies[i];
                   // console.log("%c You are attacking the alien", "color: green; font-size: large");
                    // console.log(alien);
                    if(alien.hull>0)
                    {
                        let attackFlag=myShip.attack(i);
                        if(attackFlag){
                            let damage=myShip.firepower;
                                enemies[i].hull =enemies[i].hull-myShip.firepower;
                                console.log(`%c You have done ${damage} damage to the alien`, "background: grey; font-size: large");

                        }
                        if(alien.hull<0){
                            console.log("%c Alien was distroyed!!!", "color: orange; font-size: large");
                        }
                        else{
                            userInput = window.prompt("Enter 'ATTACK' or 'RETREAT' to continue or quit the game","");
                            if(userInput==null){
                                alert("Please enter attack or retreat to continus");
                                userInput = window.prompt("Enter 'ATTACK' or 'RETREAT' to continue or quit the game","");
                            }
                            lowercaseUserInput =userInput.toLowerCase();
                            if(userInput && lowercaseUserInput=="retreat"){
                                alert("Sorry You lost");
                                isGameOn=false;
                                exit_loops=true;
                                break;
                            }
                            else if(userInput && lowercaseUserInput=="attack"){
                                // console.log(myShip);
                                console.log("%c alien is attacking you", "color: gold; font-size: large");
                                alien.attack();
                                if(myShip.hull<0){
                                    isGameOn= false;
                                    alert("Sorry You lost");
                                    console.log("%c Game is Over and You lost!!!", "color: red; font-size: x-large");
                                    exit_loops=true;
                                    break;
                                }
                                else{
                                    isGameOn = game();       
                                }
                            }
    
                        }
                    }
                    else
                    {
                        console.log("%c alien has negative hull", "color: white; font-size: large");
                    }
                }
                else
                {
                    exit_loops=true;
                    break;
                }
                isGameOn = game();     
            }
            // console.log("outside the for loop");
            if(exit_loops)
                break;
            isGameOn = game();   
        }
    }
else if(userInput.toLowerCase=="retreat"){
    isGameOn=false;
    console.log("%c Game is Over and You lost!!!", "color: red; font-size: x-large");
}
console.log("%c Game is Over!!!", "color: lightblue; font-size: x-large");

  
