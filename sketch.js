var sky
var seedArray
var seeds

function preload(){
  sky = loadImage('images/sky.jpg')
}


function setup(){
  var c = createCanvas(700,700)
  c.parent("game_container")
  noStroke()
  seedArray = []

  seed1 = new Seed(150,150)
}

function draw(){
  background(0)
  image(sky,0,0,700,700)
  for(let i = 0; i < seedArray.length; i++){
    seedArray[i].display()
    seedArray[i].move()



}

  push()
  translate(0,0,50)
  fill(136,176,55)
  rect(0,580,700,120)
  pop()

}

class Seed{

  constructor(x,y){
    this.yMovement = 2
    this.xPos = x
    this.yPos = y
    this.seed1
    this.sizeX = 5
    this.sizeY = 5
    this.grow = 0.05
    this.moreheight = 1
    this.ynew = 580
    this.actualheight = random(60,530)

    this.flowradius = random(10,50)
    this.flowersize = 0
    this.rectXsize = 0
    this.rectYsize = 0
    this.red = random(255)
    this.green = random(255)
    this.blue = random(255)
    this.rectXHigh = this.flowradius * 2
    this.rectYHigh = this.flowradius * 3.5
    this.opaque = 255
    this.angle = 45
    //anglemode

  }
  display(){

    fill(0)
    ellipse(this.xPos,this.yPos,this.sizeX,this.sizeY)

  }

  move(){
    this.yPos += this.yMovement
    if(this.yPos >= 580){
       this.yPos = 580
       this.expand()
    }
  }

  expand(){
    this.sizeX += this.grow
    this.sizeY += this.grow
    if(this.sizeY >= 30 && this.sizeX >=30){
      this.sizeY = 30
      this.sizeX = 30
      this.growtall()
    }
  }

  growtall(){
    this.ynew -= this.moreheight
    stroke(4)
    line(this.xPos,this.yPos,this.xPos,this.ynew)
    if(this.ynew <= this.actualheight){
      this.ynew = this.actualheight
      this.growcircle()
    }



  }

  growcircle(){
    noStroke(0)
    fill(this.red,this.green,this.blue,this.opaque)
    if(this.flowersize <= this.flowradius){
        this.flowersize += this.grow
    }
    else{
      this.growpetals()
    }
    ellipse(this.xPos,this.ynew,this.flowersize)
  }
  growpetals(){
    if(this.rectXsize <= this.rectXHigh && this.rectYsize <= this.rectYHigh){
      this.rectXsize += .22
      this.rectYsize += .7
    }
    // if(this.rectXsize <= this.rectXHigh){
    //   this.rectXsize += .70
    // }
    // if(this.rectYsize <= this.rectYHigh){
    //   this.rectYsize += 1.4
    // }

    push()
    rectMode(CENTER)

    translate(this.xPos,this.ynew)
    rotate(radians(this.angle))
    this.angle += 0.15
    noStroke(0)
    fill(this.red,this.green,this.blue,100)
    rect(0,0,this.rectXsize,this.rectYsize)
    rotate(radians(90))
    rect(0,0,this.rectXsize,this.rectYsize)
    if(dist(mouseX,mouseY,this.xPos,this.ynew)< 40){
      this.angle += 0.8
    }

    pop()
  }


}

function mouseClicked(){
  seedArray.push(new Seed(mouseX,mouseY))
}
