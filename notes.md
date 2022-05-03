**CREATE A SPANISH TEACHING GAME IN PHASER 3**
**INSTRUCTOR: PABLO FARIAS NAVARRO (ZENVA FOUNDER)**

# 1 - Introduction
In this course, you will learn to create a quiz spanish learning game.
You will hear the sound of a word in spanish and then select which one of the objects corresponds to that word.
You will also hear a sound for getting it right and a different sound for getting it wrong.

**LEARNING GOALS**
1. Playing audio 
2. Tween effects 
3. Sprite interactivity (responding to different mouse events) 
4. Creating Multiple group sprites
5. Quiz Logic.

# 2 - Loading Assets and Playing Audio
1. Loading audio files.
2. Playing audio.
3. Using audacity to export audio files.

First, let's load our assets in our preload() method. 
This will read all the assets from our assets folder place them into the memory of our browser.

    this.load.image("background", "assets/images/background.png");

Let's copy and paste this multiple times for each of the amount of images we need to preload:

    
    this.load.image("background", "assets/images/background.png");
    this.load.image("building", "assets/images/building.png");
    this.load.image("car", "assets/images/car.png");
    this.load.image("house", "assets/images/house.png");
    this.load.image("tree", "assets/images/tree.png");

Then let's add the background in create():

    this.add.sprite()

Sprites in phaser have an origin in the middle.
We are going to move the origin to the top left:

    this.add.sprite(0, 0, "background").setOrigin(0, 0);

If we don't set this, the middle of the background will in the corner and half of the image will be off the screen.

**Adding Audio**
Audio is going to be the main content of this lesson.
We have a bunch of files, and we are going to start by loading them in preload().

    this.load.audio("treeAudio", "assets/audio/arbol.mp3");

Replicate this line a few times:

    this.load.audio("treeAudio", "assets/audio/arbol.mp3");
    this.load.audio("treeAudio", "assets/audio/arbol.mp3");
    this.load.audio("treeAudio", "assets/audio/arbol.mp3");
    this.load.audio("treeAudio", "assets/audio/arbol.mp3");
    this.load.audio("treeAudio", "assets/audio/arbol.mp3");
    this.load.audio("treeAudio", "assets/audio/arbol.mp3");

Rename them appropriate to the audio files.

**Why are we loading mp3?**
There are many audio formats.
Years ago, you had to load two audio formats to get cross platform support - .mp3 and .ogg
But in 2017, .ogg was deprecated and mp3 became the main stream audio format for all browsers.
.acc is a prioritised format that is becoming more popular - used for applications for audio formatting and audio supporting.

**Free Sound**
You can get sound from https://freesound.org
It's important that if you are going to use free sound that it allows for commercial use.

**Converting file formats**
Use audacity to convert from .wav files to .mp3.
You can also use audacity to change the sound itself.
1. Download a file from freesound.org.
2. Drag into the audacity.
3. Read file only.
4. Select all of the space
5. Go to edit.
6. select delete. The sound will cut the silent part of the file.
7. Reduce the size by diminishing the project rate.
8. Go to file >> export >> export as MP3 >> choose a location

**Playing audio files in Phaser**
Inside create() you will need to insert a sound object.
Let's do this for the "correct" sound:

    let soundSample = this.sound.add("correct")
    soundSample.play();

If you were playing a song and you wanted to stop the song you can use:

    soundSample.stop();

Pausing sound:

    soundSample.pause();

Resuming:

    soundSample.resume();

If you want to see how sound is implemented, you can go to the Phaser repository:
https://github.com/photonstorm/phaser/blob/master/src/sound/BaseSound.js

The baseSound.js has all of the methods, functions and variables.

**SUMMARY**

**Loading audio**
1. For the latest browser support of a format check https://caniuse.com
2. MP3 has almost full support (except for Opera Mini)
3. MP3 has almost full support (except for Opera Mini)
4. Loading audio is similar to loading sprites:

        this.load.audio("treeAudio", "assets/audio/arbol.mp3);

**Playing audio**
1. Creat a sound object.
2. Useful methods: play(), stop(), pause(), resume()

        let soundSample = this.sound.add("correct");
        soundSample.play();

**Audacity**
1. Free, Open Source program for audio editing:
https://www.audaictyteam.org/
2. Useful to perform basic and advanced edits.
3. Export to other formats: file - Export Audio
4. Reducing Project Rate(Hz) can reduce file size.

# 3 - Sprite Interactivity

**LEARNING GOALS**
1. Learning multiple sprites in a group.
2. Sorting group and sprite position using the **depth** property.
3. Making sprites interactive.
4. Listening to pointer down eventsr.

Before doing anything else, we want to make it so that the width of the game is 100% of the window so we can see the entire game.

In the index.html file, put this in the head section:
    
    <style>
        canvas { width: 100%; }     
    </style>

Refresh and you can see the entire game, even if your screen is divided with your window.
Remove playing that soundSample.play(); or it will just keep playing when making the game.

Now create all of the items that we want in this particular scene inside the create() function.
Create a group, so we can add an array that will create every single one of our elements that we need for the scene.

    this.items = this.add.group();
This will create a new group for us.

Now if we want to create a new group with a single element we can do this:

    this.items = this.add.group([{
        key: "building",
        setXY: {
            x: 100,
            y: 240,
        }
    }); 
This will add our building to the scene.

You can go and add multiple elements to the scene by adding different objects with different sprites:

        this.items = this.add.group([
        {
            key: "building",
            setXY: {
                x: 100,
                y: 240,
            }
        },
        {
            key: "house",
            setXY: {
                x: 240,
                y: 280,
            },
        }
    ]); 

This will add the house to the array.
But the house is a bit too big.
After the part where we set the setXY: {} we can add a comma to the end cirly brace and add this:

    setScale: {
        x: 0.8,
        y: 0.8
    }
This will scale the house only.
So it will look like this:

        this.items = this.add.group([
        {
            key: "building",
            setXY: {
                x: 100,
                y: 240,
            }
        },
        {
            key: "building",
            setXY: {
                x: 100,
                y: 240,
            },
            setScale: {
                x: 0.8,
                y: 0.8
            }
        }
    ]); 

Imagine if we placed the background after placing the elemenets.
We wouldn't be able to see anything.

You can change the depth of the background.
Put the background in a variable:

    let bg = this.add.sprite(0, 0, "background").setOrigin(0, 0);
    consoole.log(bg);
This will give you information about the background, and you can set the depth:

    bg.depth = -1;

Now what if we wanted to change the depth of the elements in the group:

    this.items.setDepth(1);

Remember the background will have a depth of 0, so we set it to 1.

Now add the rest of the scene items to the group:

        this.items = this.add.group([
        {
            key: "building",
            setXY: {
                x: 100,
                y: 240,
            }
        },
        {
            key: "building",
            setXY: {
                x: 100,
                y: 240,
            },
            setScale: {
                x: 0.8,
                y: 0.8
            }
        }
        {
            key: "car",
            setXY: {
                x: 400,
                y: 300,
            }
        }, 
        setScale: {
            x: 0.8,
            y: 0.8
        }
        {
            key: "building",
            setXY: {
                x: 100,
                y: 240,
            }
        },
        {
            key: "tree",
            setXY: {
                x: 550,
                y: 250,
            }
        }    
    ]);     

**Note:** if you add the building first before the house, the house will be shown ontop of the building.

Now let's go and make our items interact.
let's do it with the background first:
Put the background in a variable if it's not:

    let bg = this.add.sprite(0, 0, "background").setOrigin(0, 0);
    bg.setInteractive();
What this does is enables Phaser's input plugin on the background sprite.
This gives us access to a series of events that have to do with the mouse or the touch screen.

We can detect when the mouse is down, but will also work for a touchscreen.
Now that our background is interactive, we can add an event listener:

    bg.on("pointerdown", function(pointer) {
        console.log("click");
        console.log(pointer);
    });
When the pointer is down we can call the function.
The pointer parameter will give you information such as the coordinates of where your mouse pointer is and where you click.
We log this information to the console so you can see it as a test. 

What we will do now is now is add an event listener for all of our items to make them interactive.
There are many ways of doing this.
one way:

    Phaser.Actions.Call(this.items.getChildren(), function(item) {

    }, this);
So first this.items.getChildren() are calling a function for all of the elements inside an array.
Then function(item) is calling a function for each one of the items.
Remember passing in **this** which is the current context of our scene object so we can access this object inside this function.

When we do that, we now have access to item here.
This will be each one of the different sprites that we are processing.
We need to make the item interactive:

    item.setInteractive();

**Note:** Remenber that item is simply a sprite, so you can do anything that you can do with sprites. A group is nothing but a set of sprites.

Now that we want to listen to the pointerdown event:

    item.on("pointerdown", function(pointer) {
        
    });

So in this part we cna say something like:

    console.log("you clicked " + item.texture.key);
You can show the key of the corresponding key of the asset.

So this entire function should look like this:

    Phaser.Actions.Call(this.items.getChildren(), function(item) {
        item.setInteractive();

        item.on("pointerdown", function(pointer) {
            console.log("you clicked " + item.texture.key);
        });        
    }, this);


Now you can test this and check the console as to what element you click on in the game.

**SUMMARY**

**Create multiple sprites in a group**
1. this.group.add(/* array of objects */)

        this.items = this.add.group([ {
            key: "building",
            setXY: {
                x: 100,
                y: 240,
            },
            setScale: {
                x: 0.8,
                y: 0.8,
            }            
        }]);

**Depth Property**
1. Sprites with higher depth are rendered on top of those with lower depth.
2. Setting depth for all group items:

        this.items.setDepth(1);

**Interactive objects and events**
1. Enables the input plugin on Phaser

        //make item interactive
        item.setInteractive();

        // listen to the pointer down event
        item.on("pointerdown", function(pointer) {
            console.log("you clicked " + item.texture.key);
        });

# 4 - Tween Animations
1. Easing functions and tween concepts.
2. Tweening properties in Phaser.
3. Point over and out events.

Easing functions in tweening will make a sprite to move  with acceleration and deceleration at a certain speed over time.
The term "tween" comes from "in-between" and it's an animation term for generating a set amount of frames from a starting point to an ending point.
We use easing functions to adjust the properties of how this happens.
There are many different types of easing functions. Some are:
1. easeInSine
2. easeOutSine
3. easeInOutSine
4. easeInQuad
5. easeOutQuad
6. easeInOutQuad
7. easeInCubic
8. easeOutCubic
9. easeInOutCubic
10. easeInQuart
11. easeOutQuart
12. easeInOutQuart

You can find out more at https://easings.net

We need to create and apply a tween effect to every one of our items.
We need to create a tween and then run it.
First, we want the element to grow bigger and then go back to it's original size:

We could create it in this way:

    let resizeTween = this.

And it can be created again for each one of the children. 
But let's create it in the property of our item so we can access it anywhere in our code:

    item.resizeTween = this.tweens.add({

    });
This will create a new tween.
Now let's pass on some parameters:

    item.resizeTween = this.tweens.add({
        targets: item,
    });
The targets property is very important - which sprites are going to be effected by this tween. 
In this case one but you can also enter an array of sprites so we are creating a tween for our item.

    item.resizeTween = this.tweens.add({
        targets: item,
        scaleX: 1.5,
        scaleY: 1.5,
    });

Next is the first property of the tween we want to change.
We want to change scaleX and scaleY to be 50% of it's normal size.

    item.resizeTween = this.tweens.add({
        targets: item,
        scaleX: 1.5,
        scaleY: 1.5,
        duration: 1000,
    });
The duration is 1 second.

Testing this now will apply the tween immediately to all of the sprites.

Now let's add another property for paused. 
This will not initiate immediately so it waits for an interaction: 

    item.resizeTween = this.tweens.add({
        targets: item,
        scaleX: 1.5,
        scaleY: 1.5,
        duration: 1000,
        paused: true
    });

Now let's make it so that the tween only works with one of the elements when the mouse is clicking down on it.
Replace this:

    item.on("pointerdown", function() {
      console.log("You clicked " + item.texture.key);
    }, this);

With this:

    item.on("pointerdown", function() {
      item.resizeTween.restart();
    }, this);
item.resizeTween.restart() will restart if it's already running.

But to make it so that the elements go back to their original size, we need to add the yoyo property to the tween:

        item.resizeTween = this.tweens.add({
        targets: item,
        scaleX: 1.5,
        scaleY: 1.5,
        duration: 1000,
        paused: true,
        yoyo: true,
    });
Now they will go back to their original size when they reach their maximum size.

Now we want to add that whenever hovering the cursor over the element to indicate that the element is interactive so they know they can click on it.
First, create another tween to change the opacity of the sprite so when you hover the mouse, it will look kinda transparent - changing the alpha value of the sprite.

    item.alphaTween = this.tweens.add({
        targets: item,
        alpha: 0.7,
        duration: 200,
        paused: true,
    });


Now, let's create a pointerover listening event:

    item.on("pointerover", function(pointer) {
        item.alphaTween.restart();
    })

But we want them to go back to normal when the mouse leaves the sprite's area:

    item.on("pointerout", function(pointer) {
        item.alpha = 1;
    });

It does go back to normal, but if the mouse leaves the area before the alphaTween is finished, it will not change back because it has not stopped.
Let's stop the alphaTween.
Inside the "pointerout":

    item.on("pointerout", function(pointer) {
        item.alphaTween.stop();

        item.alpha = 1;
    });
Now even if you leave the sprite really quickly when the alphaTween is running, it will stop and return the sprite to the current alpha value.

**Specifying different types of easing functions**
Inside the tween, you can use the 'ease' property to set a type of easing, so it will not just tween from one value to another value at the one speeed.
You can then set it a value.
You can find the values at the Phaser repository:
https://github.com/photonstorm/phaser/blob/master/src/math/easing/EaseMap.js

You can pick any of these and see how they effect the sprite.
You can also find all of the objects in the folders if you want to see the source code for it.

**SUMMARY**

**Tweening**
1. Easing functions: change of a property over time.
2. Tweening in animation: interpolating frames based on a starting and ending point of one or more properties.

**Tweening in Phaser**

    item.resizeTween = this.tweens.add({
      targets: item,
      scaleX: 1.5,
      scaleY: 1.5,
      duration: 1000,
      paused: true,
      yoyo: true
      ease: 'Quad.easeInOut',
    });

    item.resizeTween.restart();

    item.alphaTween = this.tweens.add({
      targets: item,
      alpha: 0.7,
      duration: 200,
      paused: true,
    });

    item.alphaTween.stop();

**Point over and out events**
1. Triggered on interactive objects:

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
        });

# 5 - Generating Questions

**LEARNING GOALS**
1. Showing text.
2. Basic question logic.
3. Picking a random element from an array.

We want to add text and sound.
Instead of having the definition of all of the elements inside of the group, we are going to put this array somewhere else and add some more properties so it can be used in other parts of the code.
So we are going to grab all of the definitions inside of the group and put it into the init() function.
We are going to create a word database there.

    this.words = [{
            {
        key: "building",
        setXY: {
            x: 100,
            y: 240,
        }
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
        }
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
        }
        },
        {
        key: "tree",
        setXY: {
            x: 550,
            y: 250,
        },
        }
    }]
Ideally you want to load this information from an external file so that you can change the position of your elements or add other elements instead of being stored inside the code of your game.
For this example, we will store it within the game.

Now we need to add the corresponding spanish words as well.

    this.words = [{
            {
        key: "building",
        setXY: {
            x: 100,
            y: 240,
        }
        },
        spanish: "edificio"
        {
        key: "house",
        setXY: {
            x: 240,
            y: 280,
        },
        setScale: {
            x: 0.8,
            y: 0.8
        }
        },
        spanish: "casa"
        {
        key: "car",
        setXY: {
            x: 400,
            y: 300,
        },
        setScale: {
            x: 0.8,
            y: 0.8
        }
        },
        spanish: "automóvil"
        {
        key: "tree",
        setXY: {
            x: 550,
            y: 250,
        },
        spanish: "árbol"
        }
    }]
We should be able to access the words when we create our sprites.

    this.items = this.add.group(this.words);
Now we can access that elsewhere and do other things with it.

We are going to create a new method for showing a new question:

    gameScene.showNextQuestion = function() {

    }
We will be calling this function at the beginning of the game after we define the words.
At the very end of create() we will call the function:

    this.showNextQuestion();

Also when you respond to a question, we should call this function to show the next question.
But we need to check to see if the question is correct or not first.
For the showNextQuestion() function, we need to select a random word, play a sound for that word and then show the text of the word.
First we need to select a random word.

    let nextWord = Phaser.Math.RND.pick(this.words);

Now we would like to play a sound with that word:
With the way we loaded our assets, it should be possible to access the audio by knowing the key of the image.
We could go through all of the different elements in our group and we could create a sound object for that corresponding audio.
We are going to replace our loop for this.items.getChildren() with a for loop of our own:

    for (let i = 0; i < items.length; i++) {

    }
Now we need to delete the this context at the end of the loop.

For item, it is now inside the for loop:

    let item = items[i];
Now that we have access to position i where we will be able to have access to the corresponding position word entry.
So the for loop will go through each of the words and see which one is the one that is selected and we will play a sound relevant to that word.
Let's create a sound for each word:

    this.sound.add(this.words[1].key + "Audio");

Then we can play the coresponding sound:

    nextWord.sound.play();

Now all we need to do is show the text in spanish.
Since we are going to replace the same text again and again, we will just create a text object at the end of create().

    this.wordText = this.add.text(30, 20, " ", {
        font: "28px Open Sans",
        fill: "#ffffff";
    });
We have text with some properties for the text.
We need a space in the text otherwise you will get an error.

To change the text of the object:

    this.wordText.setText(nextWord.spanish);

Now if we click on any of the other items, we are calling showNextQuestion and a sound will play.

We will add checking response to see if it is correct next.

**SUMMARY**

**Showing text**
1. Creat a text object:

        this.wordText = this.add.text(30, 20, "hi there", {
            font: "28px Open Sans",
            fill: "#ffffff"
        });

2. Change text: this.wordText.setText("Hello");
3. Origin is in the center

**Question Logic**
1. Pick a random question:

        let nextWord = Phaser.Math.RND.pick(this.words);

2. Play sound

        nextWord.sound.play();

3. Show text

        this.wordText.setText(nextWord.spanish);

# 6 - Checking Questions
1. Checking responses logic.
2. Play a sound depending on the result.
3. Different tween effects for right/wrong answers.

We want to be able to check the user's answer to let them know whether they got it right or whether they got it wrong.
We need to create a method for that:

    gameScene.processAnswer = function(userResponse) {

    }
This method will receive the spanish word that the user entered as a response.
What we will do is check the user response corresponding to the correct answer.
When we select a random word, we are going to store that in our checkResponse method.
We are actually going to store that in the scene so that we can access that in our checkResponse method.
Change this:

    let nextWord

to

    this.nextWord

and ensure

    this 

is with every nextWord variable.

We are going to play sounds inside processAnswer() as well, so inside processAnswer() we are going to be checking the userResponse with the nextWord variable and then seting up a few things:

    if(userResponse == this.nextWord.spanish) {
        // it's correct

        // play sound

        return true;

    }
    else {
        // it's wrong

        // play sound
    }

    return false;
We are going to return true and false so we can have different animations as well depending on whether they got the answer rightor wrong.

If it is correct, we are going to play a sound.
We are going to do that at the bottom of create():

    this.correctSound = this.sound.add("Correct");
    this.correctSound = this.sound.add("wrong");

Then we play the sounds in the right places in the processAnswer() function:

    this.correctSound.play();
    this.wrongSound.play();

So the if(userResponse == this.nextWord.spanish) statement should look like this:

    if(userResponse == this.nextWord.spanish) {
        // it's correct

        // play sound

        return true;

    }
    else {
        // it's wrong

        // play sound
    }

    return false;

When do we actually call this processResponse() and how do we deal with this return value?
We are going to do that when the user selects an element.
Instead of running the resize tween we are going to store the result in a variable and we are going to process the response to the user.
And the response to the user will be passsing the spanish word so it will know whether it is correct or wrong.

    let result = this.processAnswer(this.words[i].spanish)

Now let's add different tween effects depending on correct and incorrect answers.
Copy the tweens for resize.
Name one correctTween and wrongTween.

    item.correctTween = this.tweens.add({
        targets: item,
        scaleX: 1.5,
        scaleY: 1.5,
        duration: 300,
        paused: true,
        yoyo: true,
        ease: "Quad.easeInOut",
    })

    
    item.wrongTween = this.tweens.add({
        targets: item,
        scaleX: 1.5,
        scaleY: 1.5,
        duration: 300,
        angle: 90,          // notice we added the angle property so it can spin a bit.
        paused: true,
        yoyo: true,
        ease: "Quad.easeInOut",
    })

Now we need to call these tweens to activate appropriate:
in the "pointerdown", function(pointer), add the following:

    if(result) {
        item.correctTween.restart();
    }
    else {
        item.wrongTween.restart();
    }

Remembering that we are returning result and result stores whatever processAnswer returns.
Now we are able to detect the user's answer, output the appropriate sound and tween as well as updating the question.
Optionally, you can add a text object and get it to update a score every time the player gets it right.
Define variable for score in the global scope above all other code.

    var score = 0;

Now create a text object for score inside the create() function:

    this.scoreText = this.add.text(30, 50, "0", {
        font: "28px Open Sans",
        fill: "#ffffff",
    });

Then inside gameScene.processAnswer add this underneath the corrrectSound.play() to update the score visually for the player:

    score++;
    this.scoreText.setText(score);
This will increment the score by 1. 
You can do score += 1; to inrement score if you want to have more control over the amount of score the player gets per 


**SUMMARY**

**Response Logic**
1. Compare user response with the correct response.
2. Depending on the result, play different sounds / tweens
3. Can easily be expanded for score / other features.


**CONCLUSION**
1. Playing audio
2. Tween effects
3. Sprite interactivity.
4. Creating multiple group sprites
5. Quiz logic