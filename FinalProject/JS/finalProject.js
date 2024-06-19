const $start = $('#startButton');
const $restart = $('#restartButton');
const $key = $('.key');


const word = document.getElementById("selectWord");
const hint = document.getElementById("selectHint");
const output = document.getElementById("output");
const $img = $('#image');
const winId = document.getElementById("win");
const loseId = document.getElementById("lost");



const maxGuess = 7;
let guesses = maxGuess;
let randomWord = "";
let letter = "";
let wins = 0;
let loses = 0;
const winImage = "pictures\\win.jpg";
let downImage = "pictures\\" + maxGuess + ".jpg";

let wordsList = {

    words: [
        "Dark Magician",
        "Blue Eyes White Dragon",
        "Red Eyes Black Dragon",
        "Elemental HERO Neos",
        "Dark Armed Dragon",
        "Judgement Dragon",
        "Stardust Dragon",
        "Red Dragon Archfiend",
        "Crimson Blader",
        "Raigeki",
        "Dark Hole",
        "Heavy Storm",
        "Mirror Force",
        "Salamangreat",
        "Marincess",
        "Destiny Hero Plasma",
        "Phantom Knight",
        "Magic Cylinder",
        "Ring of Destruction",
        "Pot of Greed",
        "Graceful Charity",
        "Allure of Darkness",
        "Scrap Iron Scarecrow",
        "TG Hyper Librarian",
        "Black Rose Dragon",
        "Blackwing",
        "Ice Barrier",
        "Celtic Guardian",
        "Black Luster Soldier",
        "Slifer the Sky Dragon",
        "The Winged Dragon of Ra",
        "Obelisk the Tormentor",
        "TG Striker",
        "Junk Synchron",
        "Kaibaman",
        "Kuriboh",
        "Flame Swordsman",
        "Gearfried the Iron Knight",
        "Summoned Skull",
        "Black Skull Dragon",
        "Mystical Space Typhoon",
        "Graceful Dice",
        "Skull Dice",
        "Card Destruction",
        "Monster Reborn",
        "Dark Magician Girl",
        "Harpie Lady",
        "Trickstar",
        "Morphtronic",
        "Dust Tornado"
    ],
    hints: [
        "The ultimate wizard in terms of attack and defense.",
        "This legendary dragon is a powerful engine of destruction. Virtually invincible, very few have faced this awesome creature and lived to tell the tale.",
        "A ferocious dragon with a deadly attack.",
        "A new Elemental HERO has arrived from Neo-Space! When he initiates a Contact Fusion with a Neo-Spacian his unknown powers are unleashed.",
        "Must be Special Summoned (from your hand) by having exactly 3 DARK monsters in your GY.",
        "Must be Special Summoned (from your hand) by having 4 or more \"Lightsworn\" monsters with different names in your GY.",
        "Yusei Fudo's Ace Monster",
        "Jack Atla's Ace Monster",
        "If this card destroys an opponent's monster by battle and sends it to the Graveyard: Your opponent cannot Normal or Special Summon Level 5 or higher monsters during their next turn.",
        "Destroy all monsters your opponent controls.",
        "Destroy all monsters on the field.",
        "Destroy all Spell and Trap Cards on the field.",
        "When an opponent's monster declares an attack: Destroy all your opponent's Attack Position monsters.",
        "An archetype of fire-based monsters",
        "An archetype of water-based monsters",
        "A hero that can steal the opponent's monsters",
        "An archetype of dark warrior monsters from the 5d's era.",
        "A trap that inflicts damage equal to the monster's attack",
        "A trap that destroys a monster and inflicts damage",
        "A spell that draws 2 cards",
        "A spell that draws 3 cards and discard 2 cards",
        "A spell that draws 2 cards and banished one dark monsters",
        "A trap that negates one attack per turn then resets",
        "A synchro monster that allows the user to draw a card for every synchro summon",
        "Akiza's Ace Monster",
        "An archetype used by Crow.",
        "An archetype of bad water based monsters from hidden arsenal.",
        "An elf who learned to wield a sword, he baffles enemies with lightning-swift attacks.",
        "You can Ritual Summon this card with \"Black Luster Ritual\".",
        "The heavens twist and thunder roars, signaling the coming of this ancient creature, and the dawn of true power.",
        "Spirits sing of a powerful creature that rules over all that is mystic.",
        "The descent of this mighty creature shall be heralded by burning winds and twisted land. And with the coming of this horror, those who draw breath shall know the true meaning of eternal slumber.",
        "Original best starter card for the TG archetype.",
        "A tuner monster used frequently by Yusei.",
        "A card related to Seto Kaiba.",
        "A small monster that can prevent damage",
        "Joey Wheeler's favorite monster.",
        "If either player equips an Equip Card(s) to this card: Destroy that Equip Card(s).",
        "A fiend with dark powers for confusing the enemy. Among the Fiend-Type monsters, this monster boasts considerable force.",
        "A fusion of Red Eyes and Summoned Skull",
        "A spell that destroys one spell/trap cards",
        "A spell that boosts attack with a die roll",
        "A spell that lowers attack with a die roll",
        "A spell that forces both players to discard hands and draw the same number discarded",
        "A spell that revives a monster",
        "A female counterpart to Dark Magician",
        "This human-shaped animal with wings is beautiful to watch but deadly in battle.",
        "An archetype of light-based monsters that focus on dealing burn damage.",
        "An archetype of machine monsters used by Leo.",
        "A trap that destroys a spell/trap card"
    ],
    
    selectWord: function(){
        const randomIndex = Math.floor(Math.random() * this.words.length);
        const wordSelected = this.words[randomIndex];
        return {
            word: wordSelected,
            hint: this.hints[randomIndex],
            hiddenWord: this.createHidden(wordSelected),
            revealWord: this.createReveal(wordSelected)
        };
    },

    createHidden: function(wordSelected) {
        let result = "";
        for (let x = 0; x < wordSelected.length; x++) {
            if(wordSelected[x] === ' '){
                result += ' ';
            }else{
                result += '_';
            }
            
        }
        return result.trim();
    },

    createReveal: function(wordSelected){
        let result = "";
        for (let x = 0; x < wordSelected.length; x++) {
            if(wordSelected[x] === ' '){
                result += ' ';
            }else{
                result += wordSelected[x].toUpperCase();
            }
        }
        return result.trim();
    }

};



function update(){
    randomWord = wordsList.selectWord();
    word.innerHTML = randomWord.hiddenWord;
    hint.innerHTML = randomWord.hint;
    guesses = maxGuess;
    let outputTxt = guesses + " guesses remaining";
    output.innerHTML = outputTxt;
    downImage = "pictures\\" + guesses + ".jpg";
    changeImage(downImage);
};


function check(letter) {
    let updateHidden = "";
    let found = false;

    for (let x = 0; x < randomWord.revealWord.length; x++) {
        if (randomWord.revealWord[x] === letter){
            updateHidden += letter;
            found = true
        }else{
            updateHidden += randomWord.hiddenWord[x];
        }
    }

    randomWord.hiddenWord = updateHidden.trim();
    word.innerHTML = randomWord.hiddenWord;

    if (found == false){
        guesses -= 1;
        downImage = "pictures\\" + guesses + ".jpg";
        changeImage(downImage);
    }

    if (guesses == 0){
        lost();
    }else if(randomWord.hiddenWord === randomWord.revealWord){
        win();
    }
    else{
        let outputTxt = guesses + " guesses remaining";
        output.innerHTML = outputTxt;
        word.innerHTML = randomWord.hiddenWord;
    }
    
};


function lost(){
    let outputTxt = "No more guesses remaining. You Lose!";
    outputTxt += `<br>The correct word is: ${randomWord.word}`;
    output.innerHTML = outputTxt;
    $key.prop('disabled', true);
    $restart.prop('disabled', true);
    $start.prop('disabled', false);
    loses += 1;
    loseId.innerHTML = loses;
};

function win(){
    let outputTxt = "You have guess the word. You win!"
    
    changeImage(winImage);

    output.innerHTML = outputTxt;
    $key.prop('disabled', true);
    $restart.prop('disabled', true);
    $start.prop('disabled', false);
    wins += 1;
    winId.innerHTML = wins;
};

function changeImage(inputImage) {
    $img.fadeOut(500, function() {
        $img.attr("src", inputImage).fadeIn(500);
    });
}


$start.click(function() {
    update();
    $key.prop('disabled', false);
    this.disabled = true;
    $restart.prop('disabled', false);
    $start.text("Play Again");
    changeImage(downImage);
});


$restart.click(function() {
    update();
    $key.prop('disabled', false);
});


$key.click(function() {
    this.disabled = true;
    letter = $(this).text();
    check(letter);
});



$(document).ready(function() {
    $restart.prop('disabled', true);
    $key.prop('disabled', true);
});