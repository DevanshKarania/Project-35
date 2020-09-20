//Create variables here
var dog,happydog;
var database;
var food,foodstock;
var feed,addFood;
var fedTime,lastFed;
var Foodobj;


function preload(){
dog1 = loadImage("images/dogImg.png");
dogHappy = loadImage("images/dogImg1.png");

}

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(500, 500);
  
  foodstock=database.ref('Food');
  foodstock.on("value",readStock);
  
  dog = createSprite(250,250,50,50);
  dog.addImage(dog1);
  dog.scale = 0.3;
  
  Foodobj = new Food();

  feed = createButton("Feed the Dog");
  feed.position(600,95);
  feed.mousePressed(feed);

  addFood = createButton("Add food");
  addFood.position(700,95);
  addFood.mousePressed(addFood);

}


function draw() {  
  background(46,139,87);
  
  fedTime = database.ref('feedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  Foodobj.display();

  drawSprites();
  textSize(20);
  fill("blue");
  text("Press up arrow to feed the dog.",120,400);
  text("Food Remaining:" + foodstock, 200,100);


  //add styles here
  
}
function readStock(data){
    foodstock = data.val();
}
function writeStock(x){
 if(x<=0){
   x=0;
 }else{
   x=x-1;
 }

 database.ref('/').update({
   Food:x
 })
}
function addfood(){
 if(mousePressed(addFood)) {
    foodstock++;
    database.ref('/').update({
      food:foodstock
    })
  }
  }

function feeddog(){
  if(mousePressed(feed)){
  dog.addImage(dogHappy);
  Foodobj.updateFoodStock(Foodobj.getFoodStock()-1);
  database.ref('/').update({
    Food:Foodobj.getFoodStock(),
    fedTime:hour()
  })
}
}

