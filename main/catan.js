// Randomly roll a certain number of dice type (e.g. three d6 or one d36)
var rollDice = function(numberOfDice, diceSides, numRolls){

  // Clear out any previous roll data
  clearRolls();

  // Save the max roll possibility
  var maxDice = diceSides * numberOfDice;

  // Create the dice outcomes container object
  for (var j = numberOfDice; j < maxDice + 1; j += 1) {
    diceOutcomes[j] = {
      count: 0, 
      percent: 0
    };
  }

  // Loop through arguments and create random dice rolls
  for (var r = 0; r < numRolls; r += 1) {
    var rolls = [];
    for (var i = 0; i < numberOfDice; i += 1) {
        rolls.push(getRandomInt(1, diceSides));
    }

    // Push the total of the dice roll into diceRoll array
    diceRolls.push(rolls.reduce(function(previousValue, currentValue, index, array) {
      return previousValue + currentValue;
    }));

    percentRolls[r] = [];
    var currentRoles = diceRolls.length;
    for (var c = numberOfDice; c < maxDice + 1; c += 1){
      percentRolls[r][c] = {
        count: diceRolls.reduce(function(total, x) { return x === c ? total + 1 : total; }, 0),
      };
      percentRolls[r][c].percent = percentRolls[r][c].count / currentRoles
    }
  }

  // Count number of discrete dice rolls and their percentage of total rolls in the diceRoll array
  for (var k = numberOfDice; k < maxDice + 1; k += 1){
    diceOutcomes[k].count = diceRolls.reduce(function(total, x) { return x === k ? total + 1 : total; }, 0);
    diceOutcomes[k].percent = diceOutcomes[k].count / numRolls;
  }

};

var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var clearRolls = function() {
  window.diceRolls = [],
  window.percentRolls = [];
  window.diceOutcomes = {};
};