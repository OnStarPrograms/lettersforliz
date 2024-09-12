


// Get the datai
//
//
let Notes = [];
let MNotes = [];
let inputed = ['','',''];
let previous = ['','',''];
let removed = ""
let Coord = [];
let count = 0;
let firstload = true;
let Checker = "";
var blue_sticky = new Image();
blue_sticky.src = "./Stickies/BlueSticky.svg";
var green_sticky = new Image();
green_sticky.src = "./Stickies/GreenSticky.svg";
var red_sticky = new Image();
red_sticky.src = "./Stickies/RedSticky.svg";
var red2_sticky = new Image();
red2_sticky.src = "./Stickies/RedSticky2.svg";
var bimg = new Image();

bimg.src = './background.png';




var c = document.getElementById("myCanvas");
  window.addEventListener('resize', resizeCanvas, false);
     
 
       
    function resizeCanvas() {
      c.width = window.innerWidth-30;
      c.height = window.innerHeight-75;
                
    /**
     * Your drawings need to be inside this function otherwise they will be reset when 
     * you resize the browser window and the canvas goes will be cleared.
     */
}

c.width = window.innerWidth-30;
c.height = window.innerHeight-75;


function randomXY()
{
  for (let i = 0; i < count; i++)
  {
    Coord.push(Math.floor(Math.random() * (window.innerWidth-200)));//randomx
    Coord.push(20+Math.floor(Math.random() * (window.innerHeight-200)));//randomY
    Coord.push(Math.floor(Math.random()*4));//RandomStickyNote
  }
}

function DrawSticky()
{ //TimeStamp
  //Name
  //Text
  //Num

  var ctx = c.getContext("2d");
  ctx.fillStyle = '#15181c';
  ctx.fillRect(0,0,window.innerWidth-15,window.innerHeight-15);
  let i = 0;
  const ptrn = ctx.createPattern(bimg, 'repeat'); // Create a pattern with this image, and set it to "repeat".
  ctx.fillStyle = ptrn;
  ctx.fillRect(0, 0, c.width, c.height);
  while (MNotes.length>0){
    ctx.fillStyle = '#f007b9';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;

    switch (Coord[i+2]) {
      case 0:
        
        ctx.drawImage(blue_sticky, Coord[i]-30,Coord[i+1]-15, 300, 300);
        break;
      case 1:
        ctx.drawImage(red_sticky, Coord[i]-30,Coord[i+1]-15, 300, 300);
        break;
      case 2:
        ctx.drawImage(green_sticky, Coord[i]-30,Coord[i+1]-15, 300, 300);
        break;
      case 3:
        ctx.drawImage(red2_sticky, Coord[i]-60,Coord[i+1]-10, 400, 300);
        break;





      default:
        break;
    }

    //ctx.fillRect(Coord[i], Coord[i+1], 200,200);
    //ctx.strokeRect(Coord[i], Coord[i+1], 200,200);
    ctx.font = "20px Georgia";
    ctx.fillStyle = '#15181c';
    
    ctx.fillText(MNotes.pop(), Coord[i]+130, Coord[i+1]+160);
    let MNText = MNotes.pop();
    
    MNText = MNText.split(" ");
    let k = 0;
    let l = -10;
    let lettercount = 10;
    for (let j = 0; j < MNText.length; j++){
      if (lettercount <= 5){
        k = k + 20;
        l = -10;
        lettercount = 20;
      }
      if (MNText[j][0] == "<")
      {
        ctx.fillText(MNText[j], Coord[i]+140, Coord[i+1]+40);
      }
      else{
        ctx.fillText(MNText[j], Coord[i]+20+l, Coord[i+1]+90+k);
      }
      l+=7*(MNText[j].length+2);
      lettercount -= MNText[j].length;
    }
    ctx.font = "30px Georgia";
    ctx.fillText(MNotes.pop(), Coord[i]+10, Coord[i+1]+40);
    ctx.font = "10px Georgia";
    ctx.fillText(MNotes.pop(), Coord[i]+10, Coord[i+1]+60);

    i+=3;
  }
}


function loadform()
{
  document.getElementById('_former').innerHTML = 
  '<form\
      action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSehw2OE7C_HlXgRb4kcx8AbcmcXB5SdL_WSO__CU-htnmCzSA/formResponse"\
      target="hiddenFrame" id = "form">\
      <input type="text" name="entry.498945756" value="Name" id="name">\
      <input type="text" name="entry.1254765034" value="Text" id="text">\
      <input type="text" name="entry.762508820" value="#" id="notenum">\
      <input type="submit" value="Submit" onClick="getInputedValues()">\
    </form>'
}

function name() {
  Notes.reverse();
  removed = "Loading: "
  Checker = ""
  while (Notes.length>0){
    let temp1 = Notes.pop();
    let temp2 = Notes.pop();
    let temp3 = Notes.pop();
    let temp4 = Notes.pop();
    count++;
    if (temp2 == inputed[0] && temp3 == inputed[1] && temp4 == inputed[2])
    {
      inputed = ['','','']
    }
    if (temp2 != '-'){
      if (!(Checker.includes((temp2+temp3+temp4)))){ 
        MNotes.push(temp1);
        MNotes.push(temp2);
        MNotes.push(temp3);
        MNotes.push(temp4);
        Checker+=(temp2+temp3+temp4);

      }
    }
  }
    if (inputed[0] != "-"){
      removed += inputed[0]+": "+inputed[1]+" #"+inputed[2];
    }
    if (firstload)
    {
      firstload = false;
      randomXY();
    }
    document.getElementById("sheets").innerHTML = removed;
}
function getInputedValues()
{
  alert('submitted');
  inputed[0] = document.getElementById('name').value;
  inputed[1] = document.getElementById('text').value;
  inputed[2] = document.getElementById('notenum').value;
  setTimeout(() => {
     document.getElementById('_former').innerHTML = '<button onclick="loadform()">New Letter</button>';
  }, 100);

  

}
    // Gets the Google Sheet
function LoadResources(){
  //console.out.println('triggered');
  fetch("https://opensheet.elk.sh/1FgtYz-MPHcBMKC1Rbj7dboBBfMFsEibWiMyMrdWmpkQ/1").then((res) => res.json())
    .then((data) => {
      data.forEach((row) => {
        Notes.push(row.Timestamp);
        Notes.push(row.Name);
        Notes.push(row.Text);
        Notes.push(row.MessageNum);
        // Do something with each row here.
      });
      name();
      DrawSticky();
    });
    setTimeout(LoadResources, 1000);
}
LoadResources();
