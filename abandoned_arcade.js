/* VARIABLES */
// Broken background var 
let zero; 
let one;
// CYOA var 
let enterButton;
let a1Button;
let a2Button;
let a3Button;
let b1Button;
let b2Button;
let screen = 0;
let width = 400;
let height = 400;
// Maze var 
let player, walls, ghostie, picked;
// Collection var 
let catcher, fallingObject
let score = 0;
// Avoider var
let avoider1, avoider2, avoider3;
let player2;
// Win var 
let win1, win2, win3;

/* SETUP RUNS ONCE */
function setup() {
  //Create space 
  createCanvas(width, height);
  textAlign(CENTER);
  textFont("Robotic Mono");
  textSize(20);
  noStroke();

  // Set up the home screen
  background("green");
  text(
    "Welcome to the abandoned arcade. \nThere are rows upon rows of \nflickering machines. \nA bag of tokens catches your eye.",
    width / 2,
    height / 2 - 100
  );

  // 0 & 1 cascade 
  let zeroText = `
  ..uubbbbuu
  ubbbbbbu
  bbuubbbb
  bbubbubb
  bbubbubb
  bbubbubb
  bbbbuubb
  ubbbbbbu
  uubbbbuu`

  let oneText = `
  ..uubbbbuu
  ubbbbbuu
  ubuubbuu
  uuuubbuu
  uuuubbuu
  uuuubbuu
  uuuubbuu
  ubbbbbbb
  ubbbbbbb`;

    let palette = {
      u: color('green'),
      b: color('lightgreen')
    };

    zeros = new Group(); 
    zeros.img = spriteArt(zeroText, 2, palette);

    ones = new Group(); 
    ones.img = spriteArt(oneText, 2, palette);
}

/* DRAW LOOP REPEATS */
function draw() {
  //print(screen);

  if (screen == 0) {
    showScreen0(); 
  }

  if (screen == 11) {
    showScreen11(); 
  }

  if (screen == 1) {
    showScreen1();
  }

  if (screen == 2) {
    showScreen2();
  }

  if (screen == 3) {
    showScreen3();
  }

  if (screen == 4) {
    showScreen4();
  }

  if (screen == 5) {
    showScreen5();
  }

  if (screen == 6) {
    showScreen6();
  }

  if (screen == 7) {
    showScreen7();
  }

  if (screen == 8) {
    showScreen8();
  }

  if (screen == 9) {
    showScreen9();
  }

  if (win1 == 1 && win2 == 1 && win3 == 1) {
    showScreen10();
  }
}

// Screen 0 (Home)
function showScreen0() {
  // Create zeros 
  zeros.vel.y = random(1,5);
  new zeros.Sprite(random(width), 0, 20);
  new zeros.Sprite(random(width), 0, 20);
  new zeros.Sprite(random(width), 0, 20);
  new zeros.Sprite(random(width), 0, 20);
  new zeros.Sprite(random(width), 0, 20);
  new zeros.Sprite(random(width), 0, 20);

  // Create ones 
  ones.vel.y = random(1,5);
  new ones.Sprite(random(width), 0, 20);
  new ones.Sprite(random(width), 0, 20);
  new ones.Sprite(random(width), 0, 20);
  new ones.Sprite(random(width), 0, 20);
  new ones.Sprite(random(width), 0, 20);
  new ones.Sprite(random(width), 0, 20);

  // Display enter button
  enterButton = new Sprite(width / 2, height / 2 + 100);
  enterButton.w = 100;
  enterButton.h = 50;
  enterButton.collider = "k";
  enterButton.color = "darkgreen";
  enterButton.text = "Enter";
  screen = 11;
}

// Screen 11 (Home Loop)
function showScreen11() {
  background("green");
  text(
    "Welcome to the abandoned arcade. \nThere are rows upon rows of \nflickering machines. \nA bag of tokens catches your eye.",
    width / 2,
    height / 2 - 100
  );
  // Check enter button
  if (enterButton.mouse.presses()) {
    enterButton.pos = { x: -999, y: -999 };
    print("pressed");
    screen = 1;
  }
  //If zero reaches bottom, move back to random position at top 
  for(let i = 0; i < zeros.length; i++) {
    if(zeros[i].y >= height) {
      zeros[i].y = 0;
      zeros[i].x = random(width);
      zeros[i].vel.y = random(1,5);
    }
  }

  //If one reaches bottom, move back to random position at top 
  for(let i = 0; i < ones.length; i++) {
    if(ones[i].y >= height) {
      ones[i].y = 0;
      ones[i].x = random(width);
      ones[i].vel.y = random(1,5);
    }
  }
}

// Screen 1 (Start setup)
function showScreen1() {
  background("green");
  text("Amidst the shower of sparks \nfrom uprooted wires, \nthree machines seem to \nbe in working order.",
    width / 2,
    height / 2 - 100
  );
  zeros.remove();
  ones.remove();

  // Create A2, A2, and A3 sprites 
  a1Button = new Sprite(200, 200);
  a2Button = new Sprite(50, 50);
  a3Button = new Sprite(175, 175);

  // Add A1 button
  a1Button.pos = { x: width / 2 - 100, y: height / 2 + 130 };
  a1Button.w = 150;
  a1Button.h = 50;
  a1Button.collider = "k";
  a1Button.color = "yellow";
  a1Button.text = "Maze Escapade";

  // Add A2 button
  a2Button.pos = { x: width / 2, y: height / 2 + 60 };
  a2Button.w = 120;
  a2Button.h = 50;
  a2Button.collider = "k";
  a2Button.color = "purple";
  a2Button.text = "Cats' Haven";

  // Add A3 button 
  a3Button.pos = { x: width / 2 + 100, y: height / 2 + 130 };
  a3Button.w = 150;
  a3Button.h = 50;
  a3Button.collider = "k";
  a3Button.color = "blue";
  a3Button.text = "Crossy Stream";
  screen = 2;
}

// Screen 2 (Start loop)
function showScreen2() {
  // If maze clicked 
  if (a1Button.mouse.pressing()) {
    print("Maze");
    a1Button.pos = { x: -999, y: -999 };
    a2Button.pos = { x: -999, y: -999 };
    a3Button.pos = { x: -999, y: -999 };
    screen = 3;
  }

  // If cat clicked 
  if (a2Button.mouse.presses()) {
    print("Cat");
    a1Button.pos = { x: -999, y: -999 };
    a2Button.pos = { x: -999, y: -999 };
    a3Button.pos = { x: -999, y: -999 };
    screen = 5;
  }

  // If rain clicked 
  if (a3Button.mouse.presses()) {
    print("Rain");
    a1Button.pos = { x: -999, y: -999 };
    a2Button.pos = { x: -999, y: -999 };
    a3Button.pos = { x: -999, y: -999 };
    screen = 7;
  }
}

// Screen 3 (Maze Setup) 
function showScreen3() {
  background("green");
  picked = 0;
  // Create player sprite
  player = new Sprite(350, 50, 70, 200);
  player.image = 'assets/Torch_Gif.gif';
  player.scale = 0.3;
  player.mass = 5; 
  player.rotationLock = true;

  // Create ghostie 
  ghostie = new Sprite (350, 340, 240, 400);
  ghostie.mass = 2; 
  ghostie.image = 'assets/darkghost.png';
  ghostie.collider = 'd';
  ghostie.scale = 0.15;

  // Create the maze
  walls = new Group();
  walls.color = color('darkgreen');
  walls.collider = 's';
  new walls.Sprite(160, 10, 300, 5,);
  new walls.Sprite(10, height / 2, 5, height - 15);
  new walls.Sprite(150, 60, 5, 100);
  new walls.Sprite(width / 2 + 35, 390, 325, 5);
  new walls.Sprite(50, 300, 75, 5);
  new walls.Sprite(340, 146, 110, 5);
  new walls.Sprite(340, 250, 110, 5);
  new walls.Sprite(285, 198, 5, 109);
  new walls.Sprite(185, 332, 5, 109);
  new walls.Sprite(190, 197, 185, 5);
  new walls.Sprite(395, 200, 5, 380);

  screen = 4;
}

// Screen 4 (Maze Loop)
function showScreen4() {
  background("green");
  // Draw start and end text
  fill(0);
  textSize(20);
  text('Start', 350, 20);
  text('End', 42, 395);
  //Move the player
  if (kb.pressing('left')) {
    player.vel.x = -3;
  }
  else if (kb.pressing('right')) {
    player.vel.x = 3;
  }
  else if (kb.pressing('up')) {
    player.vel.y = -3;
  }
  else if (kb.pressing('down')) {
    player.vel.y = 3;
  }
  else {
    player.vel.x = 0;
    player.vel.y = 0;
  }
  // Player cannot go above maze
  if (player.y < 20) {
    player.y = 20;
  }
  if (player.y > 380 && picked == 0) {
    player.y = 50;
    player.x = 350;
  }
  if (player.y > 380 && Math.abs(ghostie.x - player.x) > 50 && Math.abs(ghostie.y - player.y) > 50) {
    player.y = 50;
    player.x = 350;
  }
  // Pick up the ghostie
  if (player.collides(ghostie)) {
    print('picked');
    picked = 1;
  }

  // After ghostie picked up 
 if (picked == 1) {
    ghostie.moveTo(player, 0.7);
    ghostie.width = 30; 
    ghostie.height = 40;
    ghostie.image = 'assets/lightghost.png';
    ghostie.scale = 0.3;
  }

  // Player wins
  if (player.y > 380 && picked == 1 && Math.abs(ghostie.x - player.x) < 50 && Math.abs(ghostie.y - player.y) < 50) {
    walls.removeAll();
    player.remove();
    ghostie.remove();
    fill(0);
    textSize(20);
    text('You Win!', 190, 190);
    player.vel.x = 0;
    player.vel.y = 0;
    win1 = 1;
    screen = 9;
  }
}

// Screen 5 (Cat Setup) 
function showScreen5() {
  background("pink");
  //Create catcher 
  catcher = new Sprite(200, 370, 800, 40, 'k');
  catcher.image = 'assets/cat1.png';
  catcher.scale = 0.1;

  //Create falling object
  fallingObject = new Sprite(100, 0, 10);
  fallingObject.scale = 0.08;
  fallingObject.image = 'assets/yarn2.webp';
  fallingObject.vel.y = 2;
  screen = 6;
}

// Screen 6 (Cat Loop)
function showScreen6() {
  background("pink");
  // Draw directions to screen
  fill(0);
  textSize(12);
  text("Move the cat \nwith the left and right \narrow keys to catch \nthe falling yarn.", width - 60, 20);

  //If fallingObject reaches bottom, move back to random position at top 
  if (fallingObject.y >= 400) {
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = score/2 + 2;
    score--;
  }

  //Move catcher 
  if (kb.pressing("left")) {
    catcher.vel.x = -3;
  }
  else if (kb.pressing("right")) {
    catcher.vel.x = 3;
  }
  else {
    catcher.vel.x = 0;
  }

  //Stop catcher at edges of screen 
  if (catcher.x < 50) {
    catcher.x = 50;
  }
  else if (catcher.x > 350) {
    catcher.x = 350;
  }

  //If fallingObject collides with catcher, move back to random position at top 
  if (fallingObject.collides(catcher)) {
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = score/2 + 2;
    fallingObject.direction = "down";
    score++
  }

  //Add a score counter 
  text("Score: " + score + " / 5", 30, 20);

  // Player wins
  if (score > 4) {
    catcher.remove();
    fallingObject.remove();
    fill(0);
    textSize(20);
    text('You Win!', 190, 190);
    win2 = 1;
    screen = 9;
  }
}

// Screen 7 (Stream Setup)
function showScreen7() {
  //Create the player 
  player2 = new Sprite(200, 40, 120);
  player2.image = 'assets/duck.gif';
  player2.scale = 0.25;
  player2.rotationLock = true; 

  //Create the avoiders
  avoider1 = new Sprite(10, 100, 400, 60, "k");
  avoider1.image = 'assets/log.png';
  avoider1.scale = 0.2;
  avoider1.vel.x = 3;
  avoider2 = new Sprite(-100, 200, 400, 60, "k");
  avoider2.image = 'assets/log.png';
  avoider2.vel.x = 5;
  avoider2.scale = 0.2;
  avoider3 = new Sprite(-100, 300, 400, 60, "k");
  avoider3.vel.x = 2;
  avoider3.image = 'assets/log.png';
  avoider3.scale = 0.2;
  screen = 8;
}

// Screen 8 (Stream Loop)
function showScreen8() {
  background(137, 213, 210);

  // Draw directions to screen
  fill(0);
  textSize(12);
  text("Swim with arrow keys. \nWatch out for the logs!", width - 70, 20);

  //Program the player to move
  if (kb.pressing("left")) {
    player2.vel.x = -2.5;
  } else if (kb.pressing("right")) {
    player2.vel.x = 3.5;
  } else if (kb.pressing("up")) {
    player2.vel.y = -3;
  } else if (kb.pressing("down")) {
    player2.vel.y = 3;
  } else {
    player2.vel.x = 0.5;
    player2.vel.y = 0;
  }

  //Reset avoider locations once they reach edge of screen 
  if (avoider1.x > width) {
    avoider1.x = -50;
    avoider1.y = 100;
    avoider1.vel.x = 3;
  }
  if (avoider2.x > width) {
    avoider2.x = -50;
    avoider2.y = 200;
    avoider2.vel.x = 5;
  }
  if (avoider3.x > width) {
    avoider3.x = -50;
    avoider3.y = 300;
    avoider3.vel.x = 2;
  }

  //Don't let the player move off the screen
  if (player2.y < 20) {
    player2.y = 20;
  } else if (player2.y > 400) {
    player2.vel.x = 0;
    player2.vel.y = 0;
    player2.remove();
    youWin();
  }

  if (player2.x < 20) {
    player2.x = 20;
  } else if (player2.x > 380) {
    player2.x = 380;
  }

  //Check if player collides with avoiders 
  if (player2.collides(avoider1) || player2.collides(avoider2) || player2.collides(avoider3)) {
    player2.y = 20;
    player2.x = 200;
  }

  function youWin() {
    //Draw avoiders off of screen
    avoider1.x = -200;
    avoider1.vel.x = 0;
    avoider2.x = -500;
    avoider2.vel.x = 0;
    avoider3.x = -1000;
    avoider3.vel.x = 0;

    //Display you win message
    fill(0, 128, 128);
    textAlign(CENTER);
    textSize(20);
    text('You win!', 200, 200);
    win3 = 1;
    screen = 9;
  }
}

// Screen 9 (Win)
function showScreen9() {
  background("green");
  fill(0);
  textSize(40);
  text("YOU WIN!",
      width / 2, 
      height / 2 - 120
      ); 
  textSize(20);
   text("The lights in the arcade \nget ever so slightly brighter.",
    width / 2,
    height / 2 - 60
    );

  // Add A1 button
  a1Button.pos = { x: width / 2 - 100, y: height / 2 + 130 };
  a1Button.w = 150;
  a1Button.h = 50;
  a1Button.collider = "k";
  a1Button.color = "yellow";
  a1Button.text = "Maze Escapade";

  // Add A2 button
  a2Button.pos = { x: width / 2, y: height / 2 + 60 };
  a2Button.w = 120;
  a2Button.h = 50;
  a2Button.collider = "k";
  a2Button.color = "purple";
  a2Button.text = "Cats' Haven";

  // Add A3 button 
  a3Button.pos = { x: width / 2 + 100, y: height / 2 + 130 };
  a3Button.w = 150;
  a3Button.h = 50;
  a3Button.collider = "k";
  a3Button.color = "blue";
  a3Button.text = "Crossy Stream";

  screen = 2; 
}

// Screen 10 (Final Ending)
function showScreen10() {
  background("green");
  a1Button.pos = { x: -999, y: -999 };
  a2Button.pos = { x: -999, y: -999 };
  a3Button.pos = { x: -999, y: -999 };
  textSize(20);
  text("Due to your continued efforts, \nthe arcade is now fixed. \nCustomers pour in to experience \nthe joys of games.",
    width / 2,
    height / 2 - 100
    );
  textSize(40);
  text("Thank you \nfor playing!", 
    width / 2, 
    height / 2 + 60
    );
}
