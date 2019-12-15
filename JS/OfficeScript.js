// глобальные пременные для CSS
var left;
var bottom;
var tempId = "wall";
var temp;
var vertical;
var life = 3;
var locator;
var r = /\d+/;
var tempLocation;
var buferLocation;





// функция, выполняется при загрузке - находит элементы по id присваивает им имена
window.onload = function(){
getLocation();
figure=document.getElementById('player');
// bullet=document.getElementById('bullet');
enemy=document.getElementById('monster');
setCoordinatesPlayerMonster();
keywhite=document.getElementById('key_card_white');
keyblack=document.getElementById('key_card_black');
lock_white=document.getElementById('locked_door_white');
lock_black=document.getElementById('locked_door_black');
exit_door=document.getElementById('exit_door_open');
status=document.getElementById('panel');
panel.innerHTML="life:" + life;
setInterval(get_coordinates,250);
timerId = setInterval(botMove,250);
getIdOfDiv();
setIDOfDiv();
};

function getIdOfDiv(){
document.querySelector('#editor').addEventListener('click', function(e){ 
  tempId = e.target.id; 
  console.log(tempId);
  return tempId;
});

}

function setIDOfDiv(){
document.querySelector('#game').addEventListener('click', function(e){ 
   e.target.id = tempId; 
  console.log(tempId);
});


}

function saveHTML(){
  var tempDiv = document.querySelector('#game'); 
  var data = tempDiv.innerHTML;
  alert(data);
}


function setCoordinatesPlayerMonster(){
  left=+figure.style.left.toString().slice(0, -2);
  console.log("player: " + left);
  bottom=+figure.style.bottom.toString().slice(0, -2);
  console.log("player: " + bottom);
  temp=+enemy.style.left.toString().slice(0, -2);
  console.log("monster: " + temp);
  vertical=+enemy.style.bottom.toString().slice(0, -2);
  console.log("monster: " + vertical);

}




function getLocation(){
  locator = window.location;
  buferLocation=locator.toString().slice(-11);
  tempLocation = buferLocation.match(r);
  tempLocation = +tempLocation.toString();
  console.log(buferLocation);
  console.log(tempLocation);
  
}


// функция определения координаты игрока при столкновениях с монстром и вещами
function get_coordinates(){
var p = figure.getBoundingClientRect();
var m = enemy.getBoundingClientRect();
var k = keywhite.getBoundingClientRect();
var b = keyblack.getBoundingClientRect();

// логика работы дверей и карточек-ключей
if (p.right==k.right&&p.bottom==k.bottom) {
    console.log("you have a white card!");
    lock_white.id="unlocked_door";
    keywhite.style.display="none";
    keyblack.style.display="flex";
  }


if (p.right==b.right&&p.bottom==b.bottom) {
    console.log("you have a black card!");
    lock_black.id="unlocked_door";
    keyblack.style.display="none";
  }

// отслеживание выхода игрока с уровня
if (p.bottom>=650 || p.right>=650 || p.bottom<=100 || p.right<=100) {
    document.location.href = "room" + (tempLocation + 1) + ".html";
   // alert("out of game!");
};


// // отслеживание столкновений с ботом
 if (p.right==m.right&&p.bottom==m.bottom){
  if(life==1){
  showMassege();
  setTimeout(location.reload.bind(location), 3000);
 
}
else{
  life-=1;
  panel.innerHTML="life:" + life;
  console.log(life);
}

}

// определение столкновения монстра со стенами "слева"
var mx_left = (m.right-75)
var my_left= (m.bottom-25)
var m_left_elem = document.elementFromPoint(mx_left,my_left);
m_left_empty = m_left_elem.id;
// alert(left_empty);

// определение столкновения монстра со стенами "справа"
var mx_right = (m.right+25)
var my_right= (m.bottom-25)
var m_right_elem = document.elementFromPoint(mx_right,my_right);
m_right_empty = m_right_elem.id;
// alert(right_empty);

// определение столкновения монстра со стенами "снизу"
var mx_down = (m.right-25)
var my_down= (m.bottom+25)
var m_down_elem = document.elementFromPoint(mx_down,my_down);
m_down_empty = m_down_elem.id;
// alert(down_empty);

// определение столкновения монстра со стенами "сверху"
var mx_up = (m.right-25)
var my_up= (m.bottom-75)
var m_up_elem = document.elementFromPoint(mx_up,my_up);
m_up_empty = m_up_elem.id;
// alert(up_empty);





// ___________________________________________________


// определение столкновения игрока со стенами "слева"
var x_left = (p.right-75)
var y_left= (p.bottom-25)
var left_elem = document.elementFromPoint(x_left,y_left);
left_empty = left_elem.id;
// alert(left_empty);

// определение столкновения игрока со стенами "справа"
var x_right = (p.right+25)
var y_right= (p.bottom-25)
var right_elem = document.elementFromPoint(x_right,y_right);
right_empty = right_elem.id;
// alert(right_empty);

// определение столкновения игрока со стенами "снизу"
var x_down = (p.right-25)
var y_down= (p.bottom+25)
var down_elem = document.elementFromPoint(x_down,y_down);
down_empty = down_elem.id;
// alert(down_empty);

// определение столкновения игрока со стенами "сверху"
var x_up = (p.right-25)
var y_up= (p.bottom-75)
var up_elem = document.elementFromPoint(x_up,y_up);
up_empty = up_elem.id;
// alert(up_empty);


}



// // блок функций анимации бота
 var botMoveRight = function() {
if (m_right_empty!="wall" && m_right_empty!="wallCooler"&& m_right_empty!="wallSofa" && m_right_empty!="wallPlant" && m_right_empty!="locked_door_white"&& m_right_empty!="locked_door_black") {
  temp=temp+50;
  enemy.style.left = temp + 'px';
}
}

 var botMoveLeft = function() {
if (m_left_empty!="wall" && m_left_empty!="wallCooler"&& m_left_empty!="wallSofa" && m_left_empty!="wallPlant" && m_left_empty!="locked_door_white"&& m_left_empty!="locked_door_black") {
  temp=temp-50;
  enemy.style.left = temp + 'px';
}
}

var botMoveUp = function() {
if (m_up_empty!="wall"  && m_up_empty!="wallCooler"&& m_up_empty!="wallSofa" && m_up_empty!="wallPlant" && m_up_empty!="locked_door_white"&& m_up_empty!="locked_door_black") { 
  vertical=vertical+50;
  enemy.style.bottom = vertical + 'px';
}
}

var botMoveDown = function() {
if (m_down_empty!="wall"  && m_down_empty!="wallCooler"&& m_down_empty!="wallSofa" && m_down_empty!="wallPlant" && m_down_empty!="locked_door_white"&& m_down_empty!="locked_door_black") {
  vertical=vertical-50;
  enemy.style.bottom = vertical + 'px';
}
}

var botDirection=[botMoveRight, botMoveLeft, botMoveUp, botMoveDown];


function botMove(){
setTimeout(botDirection[Math.floor(Math.random() * (4 - 0)) + 0], 0);
}



// обаботчики нажатий на клавиши
window.onkeyup = function(){


 // left
 if(event.keyCode==37){
    // botMove();
    get_coordinates();
    if (left_empty!="wall" && left_empty!="wallCooler"&& left_empty!="wallSofa" && left_empty!="wallPlant" &&left_empty!="locked_door_white"&&left_empty!="locked_door_black") {
    left=left-50;
    figure.style.left = left + 'px';
    figure.style.backgroundImage='URL("IMG/player_l.png")';
    console.log("player from left: " + left);
    console.log("player from bottom: " + bottom);
    }

}

  // right
    else if(event.keyCode==39){
      // botMove();
      get_coordinates();
      if (right_empty!="wall" && right_empty!="wallCooler"&& right_empty!="wallSofa" && right_empty!="wallPlant" &&right_empty!="locked_door_white"&&right_empty!="locked_door_black") {
      left=left+50;
      figure.style.left = left + 'px';
      figure.style.backgroundImage='URL("IMG/player_r.png")';
      console.log("player from left: " + left);
      console.log("player from bottom: " + bottom);
      }
}

   // down
    else if(event.keyCode==40){
      // botMove();
      get_coordinates();
      if (down_empty!="wall"  && down_empty!="wallCooler"&& down_empty!="wallSofa" && down_empty!="wallPlant" &&down_empty!="locked_door_white"&&down_empty!="locked_door_black") {
      bottom=bottom-50;
      figure.style.bottom= bottom + 'px';
      figure.style.backgroundImage='URL("IMG/player_r.png")';
      console.log("player from left: " + left);
      console.log("player from bottom: " + bottom);
      }
}

// up
    else if(event.keyCode==38){
      // botMove();
      get_coordinates();
      if (up_empty!="wall"  && up_empty!="wallCooler"&& up_empty!="wallSofa" && up_empty!="wallPlant" &&up_empty!="locked_door_white"&&up_empty!="locked_door_black") {
      bottom=bottom+50;
      figure.style.bottom= bottom + 'px';
      figure.style.backgroundImage='URL("IMG/player_l.png")';
      console.log("player from left: " + left);
      console.log("player from bottom: " + bottom);
     }
}



}



// обаботчики нажатия кнопок на станице
function up(){
   // botMove();
   get_coordinates();
      if (up_empty!="wall" && up_empty!="wallCooler"&& up_empty!="wallSofa" && up_empty!="wallPlant" &&up_empty!="locked_door_white"&&up_empty!="locked_door_black") {
      bottom=bottom+50;
      figure.style.bottom= bottom + 'px';
      figure.style.backgroundImage='URL("IMG/player_l.png")';
     }

}

function down(){
  // botMove();
  get_coordinates();
      if (down_empty!="wall" && down_empty!="wallCooler"&& down_empty!="wallSofa" && down_empty!="wallPlant" &&down_empty!="locked_door_white"&&down_empty!="locked_door_black") {
      bottom=bottom-50;
      figure.style.bottom= bottom + 'px';
      figure.style.backgroundImage='URL("IMG/player_r.png")';

     }
}

function lefty(){
  // botMove();
  get_coordinates();
    if (left_empty!="wall" && left_empty!="wallCooler"&& left_empty!="wallSofa" && left_empty!="wallPlant" &&left_empty!="locked_door_white"&&left_empty!="locked_door_black") {
    left=left-50;
    figure.style.left = left + 'px';
    figure.style.backgroundImage='URL("IMG/player_l.png")';
    }

}

function right(){
   // botMove();
   get_coordinates();
      if (right_empty!="wall" && right_empty!="wallCooler"&& right_empty!="wallSofa" && right_empty!="wallPlant" &&right_empty!="locked_door_white"&&right_empty!="locked_door_black") {
      left=left+50;
      figure.style.left= left + 'px';
      figure.style.backgroundImage='URL("IMG/player_r.png")';
      }

}

function showMassege(){

  message=document.getElementById('message');
  message.style.display="block";
  message.innerHTML="<br><br><br><br><br><h1>YOU DIED!</h1>";
  setTimeout(hideMassege, 3000);
}


function hideMassege(){
  
  message=document.getElementById('message');
  message.style.display="none";
 
}

function launchInMonster(){
  if(enemy.style.left == bullet.style.left){
    enemy.style.display = "none"
  }
}


