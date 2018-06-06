
var scores, roundscore, activePlayer, dice,gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', dice_roll);

function dice_roll() {
    
    if (gamePlaying) {
        //1, random number
        var dice = Math.floor(Math.random() * 6 + 1); //Dice for random number 1 ~ 6.

        //2, display the number
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';//match pic to dice number.

        //3, update the round score if the rolled number is was not 1. 
        if (dice !== 1) { //!= with extra =, means do not perform type coercion
            //add it together
            roundscore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundscore;
        }else{
            nextplayer();
        } 
    }
}

//dice_roll();


document.querySelector('.btn-hold').addEventListener('click', function(){
    
    if (gamePlaying) {
        //add curent score to global score
        scores[activePlayer] += roundscore; //method 1
        /* //method 2
            if (activePlayer === 0) {
                scores[0] += roundscore;
            } else {
                scores[1] += roundscore;
            }
        */
        //update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //check if someon win
        if (scores[activePlayer] >= 30) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-'+ activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer+'-panel').classList.remove('active');
            gamePlaying = false;
        }else {
            //next player
            nextplayer();
        }         
    }
});


function nextplayer() {
    //turn to next player
    //document.querySelector('#current-' + activePlayer).textContent = '0';
    //activePlayer = 1; //method 1
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;//method 2
    /*
    //method 3
    if (activePlayer === 0) {
        activePlayer = 1;
    } else{
         activePlayer = 0;
    }
    */
    
    roundscore = 0;
    
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
        
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active'); 
    
    document.querySelector('.dice').style.display = 'none';
     
}

/*
document.querySelector('.btn-new').addEventListener('click', function() {
    init();
})
*/

document.querySelector('.btn-new').addEventListener('click', init);//same like above code

function init() {
    scores = [0,0];
    activePlayer = 0;
    roundscore = 0;
    
    gamePlaying = true;
    
    //manipulate CSS file.
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.add('winner');
    document.querySelector('.player-1-panel').classList.add('winner');
    
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active'); 
    
    document.querySelector('.player-0-panel').classList.add('active');
}
