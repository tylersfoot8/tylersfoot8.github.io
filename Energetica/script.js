var units = 1;
var unitsVis = 0;
var unitsPerClick = 1;
var unitsTotal = 0;
var unitsPerSecond = 0;
var unitsPerSecondVis = 0;

var upgrade1Cost = 20;
var upgrade1MultCost = 100;
var upgrade1Amount = 0;
var upgrade1Power = 1;
var upgrade1Percent = 0;

var upgrade2Cost = 20;
var upgrade2MultCost = 100;
var upgrade2Amount = 0;
var upgrade2Power = 1;

var upgrade3Cost = 20;
var upgrade3MultCost = 100;
var upgrade3Amount = 0;
var upgrade3Power = 1;

var savegame = JSON.parse(localStorage.getItem("save"));

function start() {
  if (localStorage.darkmode == 1) {
    var body = document.body;
    body.classList.toggle("dark-mode");
  } else {
    localStorage.darkmode = 0;
  }
  loadData();
  update();
  unitChange = units;
  loadAuto();
}
window.onload = start;


function close(){
   saveData();
   return null;
}
window.onbeforeunload = close;

function loadData() {
  try {
			string1 = localStorage.getItem('save1');
		} catch(err) {
			console.log('Cannot access localStorage - browser may not support localStorage, or storage may be corrupt') }
if (string1){
			loadVar = JSON.parse(string1);
			console.log("Loaded saved game from localStorage");
      if (loadVar.units != null) units = loadVar.units;
      if (loadVar.unitsPerClick != null) unitsPerClick = loadVar.unitsPerClick;
      if (loadVar.unitsTotal != null) unitsTotal = loadVar.unitsTotal;

      if (loadVar.upgrade1Cost != null) upgrade1Cost = loadVar.upgrade1Cost;
      if (loadVar.upgrade1MultCost != null) upgrade1MultCost = loadVar.upgrade1MultCost;
      if (loadVar.upgrade1Amount != null) upgrade1Amount = loadVar.upgrade1Amount;
      if (loadVar.upgrade1Power != null) upgrade1Power = loadVar.upgrade1Power;

      if (loadVar.upgrade2Cost != null) upgrade2Cost = loadVar.upgrade2Cost;
      if (loadVar.upgrade2MultCost != null) upgrade2MultCost = loadVar.upgrade2MultCost;
      if (loadVar.upgrade2Ammount != null) upgrade2Amount = loadVar.upgrade2Amount;
      if (loadVar.upgrade2Power != null) upgrade2Power = loadVar.upgrade2Power;

      if (loadVar.upgrade3Cost != null) upgrade3Cost = loadVar.upgrade3Cost;
      if (loadVar.upgrade3MultCost != null) upgrade3MultCost = loadVar.upgrade3MultCost;
      if (loadVar.upgrade3Ammount != null) upgrade3Amount = loadVar.upgrade3Amount;
      if (loadVar.upgrade3Power != null) upgrade3Power = loadVar.upgrade3Power;
      } else {
			console.log("Unable to find variables in localStorage")
      }
    update();
}

function saveData() {
  var savegame = {
  unitsTotal: unitsTotal,
  units: units,
  unitsPerClick: unitsPerClick,

  upgrade1Cost: upgrade1Cost,
  upgrade1MultCost: upgrade1MultCost,
  upgrade1Amount: upgrade1Amount,
  upgrade1Power: upgrade1Power,

  upgrade2Cost: upgrade2Cost,
  upgrade2MultCost: upgrade2MultCost,
  upgrade2Amount: upgrade2Amount,
  upgrade2Power: upgrade2Power,

  upgrade3Cost: upgrade3Cost,
  upgrade3MultCost: upgrade3MultCost,
  upgrade3Amount: upgrade3Amount,
  upgrade3Power: upgrade3Power
}
  localStorage.setItem("save1",JSON.stringify(savegame));
  update();
}

function reset() {
  var really = confirm("Really reset?");
	if (really){
  localStorage.removeItem("save1")
  loadData();
units = 0;
unitsVis = 0;
unitsPerClick = 1;
unitsTotal = 0;
unitsPerSecond = 0;
unitsPerSecondVis = 0;

upgrade1Cost = 20;
upgrade1MultCost = 100;
upgrade1Amount = 0;
upgrade1Power = 1;
upgrade1Percent = 0;

upgrade2Cost = 20;
upgrade2MultCost = 100;
upgrade2Amount = 0;
upgrade2Power = 1;

upgrade3Cost = 20;
upgrade3MultCost = 100;
upgrade3Amount = 0;
upgrade3Power = 1;
  update();
  }
}

function loadAuto() {
  var i=1;
  var handle = setInterval( function() {
  unitsPerClick = (1 + upgrade1Amount) * upgrade1Power;
  upgrade2Amount = prettify(upgrade2Amount + (upgrade3Amount * upgrade3Power * 0.02))
  unitsPerSecond = upgrade2Amount * upgrade2Power * 0.02;
  unitsPerSecondVis = prettify(unitsPerSecond * 50);
  units += unitsPerSecond;

  unitsVis = prettify(Math.floor(units));
  update(); 
  document.getElementById("counttest").innerHTML =  "tick=" + i;
  i++;
  if (i<0) clearInterval(handle);
  }, 20 );
}

function darkMode() {
   var body = document.body;
   body.classList.toggle("dark-mode");
   if (localStorage.darkmode != 0) {
     localStorage.darkmode = 0;
   } else {
     localStorage.darkmode = 1;
   }
   update()
}

function update() {

  var bar1Width = document.getElementById("upgrade1Bar");
  upgrade1Percent = Math.round(units / upgrade1Cost * 250);
  if (upgrade1Percent > 250) {
    upgrade1Percent = 250;
  }
  bar1Width.style.width = upgrade1Percent + "px";
  bar1Width.innerHTML = Math.round(upgrade1Percent / 2.5) + "%";

  document.getElementById("unitsDisplayAmount").innerHTML = "Σnergetica | Units: " + notate(unitsVis, 4);
  document.getElementById("unitsDisplayAmountReal").innerHTML = "Units TRUE: " + units;
  document.getElementById("unitsDisplayClickAmount").innerHTML = "Units Per Click: " + unitsPerClick;
  document.getElementById("unitsDisplayTotalUnits").innerHTML = "Total units gained: " + unitsTotal;
  document.getElementById("unitsDisplayPerSecond").innerHTML = "Units Per Second: " + unitsPerSecondVis;
  document.getElementById("unitsDisplayPerSecondReal").innerHTML = "Units Per 20ms: " + unitsPerSecond;

  document.querySelector('#buttonUpgrade1Add').value = "Improve Generators: " + upgrade1Cost + " Energy";
  document.getElementById("unitsDisplayUpgrade1Cost").innerHTML = "Upgrade 1 Cost: " + upgrade1Cost;
  document.getElementById
  ("unitsDisplayUpgrade1MultCost").innerHTML = "Upgrade 1 Multiplier Cost: " + upgrade1MultCost;
  document.querySelector('#buttonUpgrade1Mult').value = "Upgrade Generators: " + upgrade1MultCost + " Energy"; 
  document.getElementById("unitsDisplayUpgrade1Amount").innerHTML = "Upgrade 1 Amount: " + upgrade1Amount;
  document.getElementById("unitsDisplayUpgrade1Power").innerHTML = "Upgrade 1 Power: " + upgrade1Power;

   document.querySelector('#buttonUpgrade2Add').value = "Hire Worker: " + upgrade2Cost + " Energy";
  document.getElementById("unitsDisplayUpgrade2Cost").innerHTML = "Upgrade 2 Cost: " + upgrade2Cost;
   document.getElementById("unitsDisplayUpgrade2MultCost").innerHTML = "Upgrade 2 Multiplier Cost: " + upgrade2MultCost;
   document.querySelector('#buttonUpgrade2Mult').value = "Train Workers: " + upgrade2MultCost + " Energy";
  document.getElementById("unitsDisplayUpgrade2Amount").innerHTML = "Upgrade 2 Amount: " + upgrade2Amount;
  document.getElementById("unitsDisplayUpgrade2Power").innerHTML = "Upgrade 2 Power: " + upgrade2Power;

   document.querySelector('#buttonUpgrade3Add').value = "Hire Worker: " + upgrade3Cost + " Energy";
  document.getElementById("unitsDisplayUpgrade3Cost").innerHTML = "Upgrade 3 Cost: " + upgrade3Cost;
   document.getElementById("unitsDisplayUpgrade3MultCost").innerHTML = "Upgrade 3 Multiplier Cost: " + upgrade3MultCost;
   document.querySelector('#buttonUpgrade3Mult').value = "Train Workers: " + upgrade3MultCost + " Energy";
  document.getElementById("unitsDisplayUpgrade3Amount").innerHTML = "Upgrade 3 Amount: " + upgrade3Amount;
  document.getElementById("unitsDisplayUpgrade3Power").innerHTML = "Upgrade 3 Power: " + upgrade3Power;



}

function prettify(input){
    var output = Math.round(input * 1000000)/1000000;
	return output;
}

function buttonAddUnits() {
  units += unitsPerClick;
  unitsTotal += unitsPerClick
  update();
}

function buttonUpgrade1Add() {
  if (units >= upgrade1Cost) {
    upgrade1Amount += 1;
    units -= upgrade1Cost;
    upgrade1Cost = Math.round(upgrade1Cost + 1);
} else {
  window.alert("Sorry, but you cannot afford Upgrade 1.");
  }
  update();
}

function buttonUpgrade1Mult(x) {
  if (units >= upgrade1MultCost) {
    upgrade1Power = upgrade1Power * x;
    units -= upgrade1MultCost;
    upgrade1MultCost = Math.round(upgrade1MultCost + 1);
  } else {
    window.alert("Sorry, but you cannot afford Upgrade 1 Multiplier.");
  }
  update();
}

function buttonUpgrade2Add() {
  if (units >= upgrade2Cost) {
  upgrade2Amount += 1;
  units -= upgrade2Cost;
  upgrade2Cost = Math.round(upgrade2Cost + 1);
} else {
  window.alert("Sorry, but you cannot afford Upgrade 2.");
  }
  update();
}

function buttonUpgrade2Mult(x) {
  if (units >= upgrade2MultCost) {
    upgrade2Power = upgrade2Power * x;
    units -= upgrade2MultCost;
    upgrade2MultCost = Math.round(upgrade2MultCost + 1);
  } else {
    window.alert("Sorry, but you cannot afford Upgrade 2 Multiplier.");
  }
  update();
}

function buttonUpgrade3Add() {
  if (units >= upgrade3Cost) {
  upgrade3Amount += 1;
  units -= upgrade3Cost;
  upgrade3Cost = Math.round(upgrade3Cost + 1);
} else {
  window.alert("Sorry, but you cannot afford Upgrade 3.");
  }
  update();
}

function buttonUpgrade3Mult(x) {
  if (units >= upgrade3MultCost) {
    upgrade3Power = upgrade3Power * x;
    units -= upgrade3MultCost;
    upgrade3MultCost = Math.round(upgrade3MultCost + 1);
  } else {
    window.alert("Sorry, but you cannot afford Upgrade 3 Multiplier.");
  }
  update();
}


function notate(num, digits) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "Mi" },
    { value: 1e9, symbol: "Bi" },
    { value: 1e12, symbol: "Tr" },
    { value: 1e15, symbol: "Qa" },
    { value: 1e18, symbol: "Qi" },
    { value: 1e21, symbol: "Sx" },
    { value: 1e24, symbol: "Sp" },
    { value: 1e27, symbol: "Oc" },
    { value: 1e30, symbol: "No" },
    { value: 1e33, symbol: "Dc" },
    { value: 1e36, symbol: "Ud" },
    { value: 1e39, symbol: "Dd" },
    { value: 1e42, symbol: "Td" },
    { value: 1e45, symbol: "Qad" },
    { value: 1e48, symbol: "Qid" },
    { value: 1e51, symbol: "Sxd" },
    { value: 1e54, symbol: "Spd" },
    { value: 1e57, symbol: "Ocd" },
    { value: 1e60, symbol: "Nod" },
    { value: 1e63, symbol: "Vg" },
    { value: 1e66, symbol: "Uvg" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function(item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}
