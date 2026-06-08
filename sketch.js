
let cX, cY, cW, cH;
let items = [];
let score = 0;
let gameState = "START";

function setup() {
  createCanvas(600, 400);
  cX = width / 2;
  cY = height - 60;
  cW = 80;
  cH = 20;
  
  for (let i = 0; i < 5; i++) {
    items.push(resetItem({}));
  }
}

function draw() {
  background(220, 245, 220);
  
  if (gameState === "START") {
    drawStartScreen();
  } else if (gameState === "PLAY") {
    drawPlayScreen();
  } else if (gameState === "GAME_OVER") {
    drawGameOverScreen();
  }
}

function drawStartScreen() {
  fill(34, 139, 34);
  textAlign(CENTER, CENTER);
  textSize(28);
  text("AGRINHO 2026", width / 2, height / 2 - 60);
  
  textSize(16);
  fill(50);
  text("Agro Forte, Futuro Sustentável", width / 2, height / 2 - 20);
  text("Equilíbrio entre Produção e Meio Ambiente", width / 2, height / 2);
  
  fill(0, 102, 204);
  rect(width / 2 - 75, height / 2 + 50, 150, 40, 10);
  fill(255);
  textSize(18);
  text("JOGAR", width / 2, height / 2 + 70);
}

function drawPlayScreen() {
  fill(34, 139, 34);
  rect(0, height - 30, width, 30);
  
  cX = mouseX - cW / 2;
  cX = constrain(cX, 0, width - cW);
  
  fill(139, 69, 19);
  rect(cX, cY, cW, cH, 5);
  fill(244, 164, 96);
  rect(cX + 5, cY - 5, cW - 10, 5);
  
  for (let item of items) {
    item.y += item.speed;
    
    if (item.type === "GOOD_WATER") {
      fill(0, 153, 255);
      ellipse(item.x, item.y, item.size);
    } else if (item.type === "GOOD_TREE") {
      fill(34, 139, 34);
      triangle(item.x, item.y - item.size/2, item.x - item.size/2, item.y + item.size/2, item.x + item.size/2, item.y + item.size/2);
    } else if (item.type === "GOOD_FOOD") {
      fill(255, 128, 0);
      ellipse(item.x, item.y, item.size);
    } else if (item.type === "BAD") {
      fill(100);
      ellipse(item.x, item.y, item.size);
      ellipse(item.x + 8, item.y - 4, item.size * 0.8);
      ellipse(item.x - 8, item.y + 2, item.size * 0.7);
    }
    
    if (item.y + item.size / 2 >= cY && item.y - item.size / 2 <= cY + cH) {
      if (item.x >= cX && item.x <= cX + cW) {
        if (item.type === "BAD") {
          gameState = "GAME_OVER";
        } else {
          score += 10;
          resetItem(item);
        }
      }
    }
    
    if (item.y > height) {
      resetItem(item);
    }
  }
  
  fill(0);
  textSize(20);
  textAlign(LEFT, TOP);
  text("Pontos: " + score, 20, 20);
}

function drawGameOverScreen() {
  fill(200, 50, 50);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("FIM DE JOGO", width / 2, height / 2 - 40);
  
  fill(50);
  textSize(18);
  text("Sua pontuação no Agrinho: " + score, width / 2, height / 2);
  textSize(14);
  text("Busque sempre o equilíbrio com a natureza!", width / 2, height / 2 + 30);
  
  fill(0, 102, 204);
  rect(width / 2 - 90, height / 2 + 70, 180, 40, 10);
  fill(255);
  textSize(16);
  text("REINICIAR", width / 2, height / 2 + 90);
}

function resetItem(item) {
  item.x = random(20, width - 20);
  item.y = random(-200, -20);
  item.size = random(20, 30);
  item.speed = random(3, 6);
  
  let r = random();
  if (r < 0.25) {
    item.type = "GOOD_WATER";
  } else if (r < 0.50) {
    item.type = "GOOD_TREE";
  } else if (r < 0.75) {
    item.type = "GOOD_FOOD";
  } else {
    item.type = "BAD";
    item.speed += 1.5;
  }
  return item;
}

function mousePressed() {
  if (gameState === "START") {
    if (mouseX > width / 2 - 75 && mouseX < width / 2 + 75 && mouseY > height / 2 + 50 && mouseY < height / 2 + 90) {
      gameState = "PLAY";
      score = 0;
    }
  } else if (gameState === "GAME_OVER") {
    if (mouseX > width / 2 - 90 && mouseX < width / 2 + 90 && mouseY > height / 2 + 70 && mouseY < height / 2 + 110) {
      for (let item of items) {
        resetItem(item);
      }
      score = 0;
      gameState = "PLAY";
    }
  }
}





