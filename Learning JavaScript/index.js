 let rolledMsg;
  document.getElementById("btnRollDices").onclick = function(){
    const max = 6;
    const min = 1;
    let randomNumOne = Math.floor((Math.random() * max) + min);
    document.getElementById("dice-rolled-number1").textContent = randomNumOne;

    let randomNumTwo = Math.floor((Math.random() * max) + min);
    document.getElementById("dice-rolled-number2").textContent = randomNumTwo;

    rolledMsg = "You Have Rolled. Give another person a chance!";
    document.getElementById("Rolled-confirmation").textContent = rolledMsg;
  }