// create a new scene named "Game"
let gameScene = new Phaser.Scene('Game');
var score = 0;

// some parameters for our scene
gameScene.init = function() {
  // score variables  
  this.score = 0;
  this.scoreText;
  
  // word database:
  this.words = [
    {
      key: "building",
      setXY: {
        x: 100,
        y: 240,
      },
      spanish: "edificio"
    },
    {
      key: "house",
      setXY: {
        x: 240,
        y: 280,
      },
      setScale: {
        x: 0.8,
        y: 0.8
      },
      spanish: "casa"
    },
    {
      key: "car",
      setXY: {
        x: 400,
        y: 300,
      },
      setScale: {
        x: 0.8,
        y: 0.8
      },
      spanish: "automóvil"
    },
    {
      key: "tree",
      setXY: {
        x: 550,
        y: 250,
      },
      spanish: "árbol"
    }
  ];
}

// load asset files for our game
gameScene.preload = function() {

  // Loading our images from the assets folder into memory.
  this.load.image("background", "assets/images/background-city.png")
  this.load.image("building", "assets/images/building.png")
  this.load.image("car", "assets/images/car.png")
  this.load.image("house", "assets/images/house.png")
  this.load.image("tree", "assets/images/tree.png")

  // Loading sound files from the assets folder into memory:
  this.load.audio("treeAudio", "assets/audio/arbol.mp3");
  this.load.audio("carAudio", "assets/audio/auto.mp3");
  this.load.audio("houseAudio", "assets/audio/casa.mp3");
  this.load.audio("buildingAudio", "assets/audio/edificio.mp3");
  this.load.audio("correct", "assets/audio/correct.mp3");
  this.load.audio("wrong", "assets/audio/wrong.mp3");

};

// executed once, after assets were loaded
gameScene.create = function() {

  // Adding the background to the game and setting it's origin point to top left corner.
  this.items = this.add.group(this.words);

  // background
  let bg = this.add.sprite(0, 0, "background").setOrigin(0, 0);

    // show the group sprites on top of the background:
    this.items.setDepth(1);

  // make bg interactive:
  bg.setInteractive();

  // getting the group array
  let items = this.items.getChildren();

  for(let i = 0; i < items.length; i++) {

    let item = items[i];
    // making item ineteractive.
    item.setInteractive();


    // creating tween - resize tween
    item.correctTween = this.tweens.add({
      targets: item,
      scaleX: 1.5,
      scaleY: 1.5,
      duration: 500,
      paused: true,
      yoyo: true,
      ease: 'Quad.easeInOut',
    });

    item.wrongTween = this.tweens.add({
      targets: item,
      scaleX: 1.5,
      scaleY: 1.5,
      duration: 500,
      angle: 90,
      paused: true,
      yoyo: true,
      ease: 'Quad.easeInOut',
    });

    // listen to the pointerdown event - mouse clicking on item.
    item.on("pointerdown", function() {

      let result = this.processAnswer(this.words[i].spanish);

      if (result) {
        item.correctTween.restart();
      }
      else {
        item.wrongTween.restart();
      }
      // show next question:
      this.showNextQuestion();

    }, this);

    // creating tween - alpha tween (transparency)
    item.alphaTween = this.tweens.add({
      targets: item,
      alpha: 0.7,
      duration: 200,
      paused: true,
    });
    
    // listen to the pointer over event
    item.on("pointerover", function(pointer) {
      item.alphaTween.restart();
    });

    // listen to the pointerout event
    item.on("pointerout", function(pointer) {
      // stopping the alphaTween:
      item.alphaTween.stop();
      
      // setting the alpha:
      item.alpha = 1;
    }, this); 

    // create a sound for each word
    this.words[i].sound = this.sound.add(this.words[i].key + "Audio");

  }
  
  // word text object
  this.wordText = this.add.text(30, 20, "", {
    font: "28px Open Sans",
    fill: "#ffffff"
  });

  // score text object
  this.scoreText = this.add.text(30, 50, "0", {
    font: "28px Open Sans",
    fill: "#ffffff"
  });
  
  // show the first question
  this.showNextQuestion();

  // correct / wrong sounds
  this.correctSound = this.sound.add("correct");
  this.wrongSound = this.sound.add("wrong");
}

  // show a new question
  gameScene.showNextQuestion = function() {
    // select a random word
    this.nextWord = Phaser.Math.RND.pick(this.words);

    // play a sound for that word
    this.nextWord.sound.play();

    // show the text for the word in Spanish
    this.wordText.setText(this.nextWord.spanish);

}

gameScene.processAnswer = function(userResponse) {

  // compare the user response with the correct response.
  if(userResponse == this.nextWord.spanish) {
    // play correctSound when correct.
    this.correctSound.play();

    // increment score and display it. 
    score++;
    this.scoreText.setText(score);

    return true;
  }
  else {
    // play wrongSound when wrong.
    this.wrongSound.play();

    return false;
  }
}

// our game's configuration
let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  scene: gameScene,
  title: 'Spanish Learning Game',
  pixelArt: false,
};

// create the game, and pass it the configuration
let game = new Phaser.Game(config);
function newFunction(score) {
  this.score++;
  this.scoreText.setText("Score: " + score);
}

