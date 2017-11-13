//Constants:
var neighborhoodPatterns = {
  moore: "moore",
  vonNeumann: "vonNeumann"
}
var defColors = [
  "#FFFFFF",
  "#000000",
  "#0000FF",
  "#00FF00",
  "#FF0000",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
]

var rulePresets = {
  life: fromBirthSurvive("Conway's Life", "B3/S23"),
  lifeWithoutDeath: fromBirthSurvive("Life without Death", "B3/S012345678"),
  replicator: fromBirthSurvive("Replicator", "B1357/S1357"),
  seeds: fromBirthSurvive("Seeds", "B2/S"),
  diamoeba: fromBirthSurvive("Diamoeba", "B35678/S5678"),
  anneal: fromBirthSurvive("Anneal", "B4678/S35678", '#00FF00', '#008000'),
  dayAndNight: fromBirthSurvive("Day & Night", "B3678/S34678"),
  morley: fromBirthSurvive("Morley", "B368/S245"),
  twoByTwo: fromBirthSurvive("2x2", "B36/S125"),
  b25s4: fromBirthSurvive("B25/S4", "B25/S4"),
  coral: fromBirthSurvive("Coral", "S45678/B3"),
  gnarl: fromBirthSurvive("Gnarl", "1/1"),
  maze: fromBirthSurvive("Maze", "S12345/B3"),
  briansBrain: {
    name: "Brian's Brain",
    state: {
      0: {
        neighborEquals: {
          2: 1,
        },
        def: 0,
        color: '#000000',
      },
      1: {
        def: 2,
        color: '#FFFFFF',
      },
      2: {
        neighborValue: 0,
        def: 0,
        color: '#0000FF',
      },
      def: {
        def: 0
      }
    },
    lineColor: '#808080',
  },
  fredkin: {
    name: "Fredkin",
    state: {
      0: {
        neighborEquals: {
          1: 1,
          3: 1,
          5: 1,
          7: 1,
        },
        def: 0,
        color: '#FFFFFF',
      },
      1: {
        neighborEquals: {
          0: 1,
          2: 1,
          4: 1,
          6: 1,
          8: 1,
        },
        def: 0,
        color: '#000000',
      },
      def: {
        def: 0
      }
    }
  },
  wireWorld: {
    name: "Wire World",
    state: {
      0: {
        name: "empty",
        def: 0,
        color: "#000000"
      },
      1: {
        name: "Electron Head",
        def: 2,
        color: "#0000FF"
      },
      2: {
        name: "Electron Tail",
        def: 3,
        color: "#FF0000"
      },
      3: {
        name: "Wire",
        neighborCount: {
          1:{//Count cells with id 1
            1: 1, //If 1 neighbor set cell to 1
            2: 1, //If 2 neighbors set cell to 1
          }
        },
        def: 3,
        color: "#FFFF00",
      },
      def: {
        def: 0
      }
    },
    lineColor: "#808080",
    neighborPattern: "moore",
    neighborhoodSize: 1,
    defaultCell: 0
  },
  sandPiles: {
    name: "Sand Piles",
    state: {
      0: {
        color: "#000000"
      },
      1: {
        color: "#FFFF00"
      },
      2: {
        color: "#0000FF"
      },
      3: {
        color: "#FF0000"
      },
      4: {
        color: "#00FF00"
      },
      5: {
        color: "#00FFFF"
      },
      6: {
        color: "#FFFF00"
      },
      7: {
        color: "#FF00FF"
      },
      8: {
        color: "#808080"
      },
      64: {
        color: "#FFFFFF"
      },
      512: {
        color: "#FFFFFF"
      },
      4096: {
        color: "#FFFFFF"
      },
      32768: {
        color: "#FFFFFF"
      },
      262144: {
        color: "#FFFFFF"
      },
      2097152: {
        color: "#FFFFFF"
      },
      16777216: {
        color: "#FFFFFF"
      }
    },
    defcolor: "#FFFFFF",
    lineColor: "#202020",
    neighborhoodSize: 1,
    defaultCell: 0,
    handler: function(grid, i, j){
        let a = getCellAsNeighborWithSafty(i-1, j);
        let b = getCellAsNeighborWithSafty(i+1, j);
        let c = getCellAsNeighborWithSafty(i, j-1);
        let d = getCellAsNeighborWithSafty(i, j+1);
        let overflow = (a >= 4?(Math.floor(a/4)):0) + 
                       (b >= 4?(Math.floor(b/4)):0) + 
                       (c >= 4?(Math.floor(c/4)):0) +
                       (d >= 4?(Math.floor(d/4)):0);
        return (grid[i][j]%4) + overflow;
      }
  },
  sandPilesSlowTopple: {
    name: "Sand Piles slow topple",
    state: {
      0: {
        color: "#000000"
      },
      1: {
        color: "#FFFF00"
      },
      2: {
        color: "#0000FF"
      },
      3: {
        color: "#FF0000"
      },
      4: {
        color: "#00FF00"
      },
      5: {
        color: "#00FFFF"
      },
      6: {
        color: "#FFFF00"
      },
      7: {
        color: "#FF00FF"
      },
      8: {
        color: "#808080"
      },
      64: {
        color: "#FFFFFF"
      },
      512: {
        color: "#FFFFFF"
      },
      4096: {
        color: "#FFFFFF"
      },
      32768: {
        color: "#FFFFFF"
      },
      262144: {
        color: "#FFFFFF"
      },
      2097152: {
        color: "#FFFFFF"
      },
      16777216: {
        color: "#FFFFFF"
      }
    },
    defcolor: "#FFFFFF",
    lineColor: "#202020",
    neighborhoodSize: 1,
    defaultCell: 0,
    handler: function(grid, i, j){
        let a = getCellAsNeighborWithSafty(i-1, j);
        let b = getCellAsNeighborWithSafty(i+1, j);
        let c = getCellAsNeighborWithSafty(i, j-1);
        let d = getCellAsNeighborWithSafty(i, j+1);
        let overflow = (a >= 4?1:0) + 
                       (b >= 4?1:0) + 
                       (c >= 4?1:0) +
                       (d >= 4?1:0);
        return (grid[i][j]>=4?grid[i][j]-4:grid[i][j]) + overflow;
      }
  },
  sandPiles8: {
    name: "Sand Piles 8",
    state: {
      0: {
        color: "#000000"
      },
      1: {
        color: "#FFFF00"
      },
      2: {
        color: "#0000FF"
      },
      3: {
        color: "#FF0000"
      },
      4: {
        color: "#00FF00"
      },
      5: {
        color: "#00FFFF"
      },
      6: {
        color: "#FFFF00"
      },
      7: {
        color: "#FF00FF"
      },
      8: {
        color: "#808080"
      },
      64: {
        color: "#FFFFFF"
      },
      512: {
        color: "#FFFFFF"
      },
      4096: {
        color: "#FFFFFF"
      },
      32768: {
        color: "#FFFFFF"
      },
      262144: {
        color: "#FFFFFF"
      },
      2097152: {
        color: "#FFFFFF"
      },
      16777216: {
        color: "#FFFFFF"
      }
    },
    defcolor: "#FFFFFF",
    lineColor: "#202020",
    neighborhoodSize: 1,
    defaultCell: 0,
    handler: function(grid, i, j){
        let a = getCellAsNeighborWithSafty(i-1, j);
        let b = getCellAsNeighborWithSafty(i+1, j);
        let c = getCellAsNeighborWithSafty(i, j-1);
        let d = getCellAsNeighborWithSafty(i, j+1);
        let e = getCellAsNeighborWithSafty(i-1, j-1);
        let f = getCellAsNeighborWithSafty(i+1, j+1);
        let g = getCellAsNeighborWithSafty(i+1, j-1);
        let h = getCellAsNeighborWithSafty(i-1, j+1);
        let overflow = (a >= 8?(Math.floor(a/8)):0) + 
                       (b >= 8?(Math.floor(b/8)):0) + 
                       (c >= 8?(Math.floor(c/8)):0) +
                       (d >= 8?(Math.floor(d/8)):0) +
                       (e >= 8?(Math.floor(e/8)):0) + 
                       (f >= 8?(Math.floor(f/8)):0) + 
                       (g >= 8?(Math.floor(g/8)):0) +
                       (h >= 8?(Math.floor(h/8)):0);
        return (grid[i][j]%8) + overflow;
      }
  }

  /*banks: { //C0,NN,S3babbabbabba3b,B7ab3aba3b
          name: "Banks",
          state: {
              0: {
                  neighborsAre: [
                      {N:1,E:1,S:1,W:0,val:1},
                      {N:0,E:1,S:1,W:1,val:1},
                      {N:1,E:1,S:0,W:1,val:1},
                      {N:1,E:0,S:1,W:1,val:1},
                  ],
                  def:0,
                  color:"#FFFFFF",
              },
              1: {
                  neighborsAre: [
                      {N:1,E:1,S:0,W:0,val:0},
                      {N:0,E:1,S:1,W:0,val:0},
                      {N:0,E:0,S:1,W:1,val:0},
                      {N:1,E:0,S:0,W:1,val:0},
                  ],
                  def:1,
                  color:"#000000",
              }
          }
      }*/
}

for (var r in rulePresets) {
  verifyRule(rulePresets[r]);
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function fromBirthSurvive(name, code, deadColor, aliveColor, lineColor) {

  if (deadColor == undefined) {
    deadColor = '#FFFFFF';
  }

  if (aliveColor == undefined) {
    var dc = hexToRgb(deadColor);
    var ac = {
      r: (255 - dc.r),
      g: (255 - dc.g),
      b: (255 - dc.b),
    }

    aliveColor = rgbToHex(ac.r, ac.g, ac.b);
  }

  if (lineColor == undefined) {
    var ac = hexToRgb(aliveColor);
    var dc = hexToRgb(deadColor);

    var lc = {
      r: Math.floor((ac.r + dc.r) / 2),
      g: Math.floor((ac.g + dc.g) / 2),
      b: Math.floor((ac.b + dc.b) / 2),
    }

    lineColor = rgbToHex(lc.r, lc.g, lc.b);
  }

  var a = {};
  var b = {};

  var m = 0;

  var cc = code.split('');

  for (var c in cc) {
    if (cc[c] == 'B' || cc[c] == 'b') {
      m = 0;
    } else if (cc[c] == 'S' || cc[c] == 's') {
      m = 1;
    } else if (cc[c] == '/') {
      m = 1;
    } else if (Number(cc[c]) != undefined) {
      if (m == 0) {
        a[Number(cc[c])] = 1;
      } else if (m == 1) {
        b[Number(cc[c])] = 1;
      }
    }
  }


  return {
    name: name,
    state: {
      0: {
        neighborEquals: a,
        def: 0,
        color: deadColor,
      },
      1: {
        neighborEquals: b,
        def: 0,
        color: aliveColor,
      },
      def: {
        def: 0,
        color: "#FF0000",
      }
    },
    lineColor: lineColor
  }
}

function verifyRule(rule) {
  if (rule.name == undefined) {
    rule.name = "Unnamed";
  }
  //
  if (rule.lifeLike != undefined) {
    var r = fromBirthSurvive(rule.name, rule.lifeLike);
    for (var key in r) {
      if (r.hasOwnProperty(key)) {
        rule[key] = r[key];
      }
    }
  }
  //
  if (rule.neighborPattern == undefined) {
    rule.neighborPattern = neighborhoodPatterns.moore;
  } {
    var pat = false;
    for (var p in neighborhoodPatterns) {
      if (p == rule.neighborPattern) {
        pat = true;
        break;
      }
    }
    if (!pat) {
      rule.neighborPattern = neighborhoodPatterns.moore;
    }
  }
  //
  if (rule.neighborhoodSize == undefined) {
    rule.neighborhoodSize = 1;
  }
  //
  if (rule.defaultCell == undefined) {
    rule.defaultCell = 0;
  }
  //
  if (rule.lineColor == undefined) {
    rule.lineColor = '#DDDDDD';
  }
  //
  if (rule.state == undefined) {
    rule.state = {};
  }
  //
  for (var s in rule.state) {
    if (rule.state[s] == undefined) {
      rule.state[s] = {};
    }
    //
    if (rule.state[s].def == undefined) {
      rule.state[s].def = 0;
    }
    //
    if (rule.state[s].color == undefined) {
      rule.state[s].color = "#FF0000";
    }
    //
    if (rule.state[s].neighborValue == undefined) {
      rule.state[s].neighborValue = Number(s);
    }
  }

}

var currentRule = rulePresets.life;


//Variables:

var editor;
var editorShown = false;
var holderUp = true;
var fancyTextEditorActive = false;

var playing = false;
var interval;

var fpsCap = 10;

var step = 0;

var gridSize = {
  width: 10,
  height: 10
};

var cellSize = 10;
var lineWidth = 1;

var drawGridLines = true;
var wrapAround = true;
var additiveClicking = false;

var lastGridDragged = {x:-1, y:-1}

var grid;
var tempGrid;
var updateGrid;

var mouseDown = false;
var firstPaint = 1;
var secondPaint = 0;
var clearPaint = 0;
var currentPaint = firstPaint;

var pauseDrawing = false;

var selectMode = false;
var selection = {
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0,
  w: 0,
  h: 0,
  g: null,
  clear: function(){
    this.g = null;
    this.w = 0;
    this.y = 0;
    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 0;
    this.y2 = 0;
    if (document.activeElement) {
      document.activeElement.blur();
    }
    redraw();
  },
  setWH: function(){
    if(this.x1 > this.x2){
      var temp = this.x1;
      this.x1 = this.x2;
      this.x2 = temp;
    }
    if(this.y1 > this.y2){
      var temp = this.y1;
      this.y1 = this.y2;
      this.y2 = temp;
    }
    this.w = this.x2-this.x1;
    this.h = this.y2-this.y1;
  },
  pickup: function(){
    this.setWH();
    if(this.w == 0 || this.h == 0){
      this.g = null;
    }else{
      this.g = createArray(this.w, this.h);
      for(var i = 0; i < this.w; i++){
        for(var j = 0; j < this.h; j++){
          if(i+this.x1 >= 0 && j+this.y1 >= 0 && i+this.x1 < gridSize.width && j+this.y1 < gridSize.height){
            this.g[i][j] = grid[i+this.x1][j+this.y1];
            grid[i+this.x1][j+this.y1] = currentRule.defaultCell;
          }else{
            this.g[i][j] = currentRule.defaultCell;
          }
        }
      }
    }
    redraw();
  },
  place: function(delSelf){
    for(var i = 0; i < this.w; i++){
      for(var j = 0; j < this.h; j++){
        if(i+this.x1 >= 0 && j+this.y1 >= 0 && i+this.x1 < gridSize.width && j+this.y1 < gridSize.height){
          if(this.g[i][j] != currentRule.defaultCell){
            grid[i+this.x1][j+this.y1] = this.g[i][j];
          }
        }
      }
    }
    if(delSelf){
      this.clear();
    }else{
      if (document.activeElement) {
        document.activeElement.blur();
      }
      redraw();
    }
  },
  shift: function(i, j){
    this.x1 += i;
    this.x2 += i;
    this.y1 += j;
    this.y2 += j;
    redraw();
  },
  flip: function(hor, ver) {
    var tGrid = createArray(gridSize.width, gridSize.height);

    for (var i = 0; i < this.w; i++) {
      for (var j = 0; j < this.h; j++) {
        tGrid[i][j] = getCellWithSafty((hor ? this.w - 1 - i : i), (ver ? this.h - 1 - j : j));
      }
    }

    for (var i = 0; i < this.w; i++) {
      for (var j = 0; j < this.h; j++) {
        g[i][j] = tGrid[i][j];
      }
    }

    redraw();
  },
  rotate: function(){
    var tGrid = createArray(gridSize.width, gridSize.height);

    for (var i = 0; i < this.w; i++) {
      for (var j = 0; j < this.h; j++) {
        tGrid[i][j] = getCellWithSafty(cw ? j : this.w - 1 - j, !cw ? i : this.h - 1 - i);
      }
    }

    for (var i = 0; i < this.w; i++) {
      for (var j = 0; j < this.h; j++) {
        g[i][j] = tGrid[i][j];
      }
    }
  }

}


//References:
var canvas;
var context;


//Calculation Functions:

function createArray(length) {
  var arr = new Array(length || 0),
      i = length;

  if (arguments.length > 1) {
    var args = Array.prototype.slice.call(arguments, 1);
    while (i--) arr[length - 1 - i] = createArray.apply(this, args);
  }

  return arr;
}

function updateAll(){
  for (var i = 0; i < gridSize.width; i++) {
    for (var j = 0; j < gridSize.height; j++) {
      updateGrid[i][j] = true;
    }
  }
}

function nextStep() {
  step++;

  for (var i = 0; i < gridSize.width; i++) {
    for (var j = 0; j < gridSize.height; j++) {
      
      if(currentRule.handler != undefined){
        tempGrid[i][j] = currentRule.handler(grid, i, j);
        continue;
      }

      var n = neighbourValueSum(i, j);

      var state = currentRule.state[grid[i][j]];

      if (state == undefined) {
        state = currentRule.state.def;
      }

      var c = false;

      if (state.neighborsAre) {
        for (var n = 0; n < state.neighborsAre.length; n++) {
          if (
            (state.neighborsAre[n].N == undefined || state.neighborsAre[n].N == getCellAsNeighborWithSafty(i, j - 1)) &&
            (state.neighborsAre[n].NE == undefined || state.neighborsAre[n].NE == getCellAsNeighborWithSafty(i + 1, j - 1)) &&
            (state.neighborsAre[n].E == undefined || state.neighborsAre[n].E == getCellAsNeighborWithSafty(i + 1, j)) &&
            (state.neighborsAre[n].SE == undefined || state.neighborsAre[n].SE == getCellAsNeighborWithSafty(i + 1, j + 1)) &&
            (state.neighborsAre[n].S == undefined || state.neighborsAre[n].S == getCellAsNeighborWithSafty(i, j + 1)) &&
            (state.neighborsAre[n].SW == undefined || state.neighborsAre[n].SW == getCellAsNeighborWithSafty(i - 1, j + 1)) &&
            (state.neighborsAre[n].W == undefined || state.neighborsAre[n].W == getCellAsNeighborWithSafty(i - 1, j)) &&
            (state.neighborsAre[n].NW == undefined || state.neighborsAre[n].NW == getCellAsNeighborWithSafty(i - 1, j - 1))
          ) {
            tempGrid[i][j] = state.neighborsAre[n].val;
            c = true;
            break;
          }
        }
      }

      if(c){
        continue;
      }

      if (state.neighborEquals != undefined) {
        if (state.neighborEquals[n] != undefined) {
          tempGrid[i][j] = state.neighborEquals[n];
          continue;
        }
      }

      if (state.neighborInRange != undefined) {
        for (var r in state.neighborInRange) {
          if (n >= r.min && n <= r.max) {
            tempGrid[i][j] = r.val;
            continue;
          }
        }
      }

      if (state.neighborCount != undefined) {
        for (var b in state.neighborCount){
          var m = neighbourCount(i, j, b);
          if(state.neighborCount[b][m] != undefined){
            tempGrid[i][j] = state.neighborCount[b][m];
            c = true;
            break;
          }
        }
      }

      if(c){
        continue;
      }

      if (state.def != undefined) {
        tempGrid[i][j] = state.def;
        continue;
      }

      tempGrid[i][j] = grid[i][j];

      //tempGrid[i][j] = currentRule.state[grid[i][j]] != undefined ? (currentRule.state[grid[i][j]].neighborEquals[n] != undefined ? (currentRule.state[grid[i][j]].neighborEquals[n]) : currentRule.state[grid[i][j]].neighborEquals.def) : currentRule.state.def;
    }
  }

  for (var i = 0; i < gridSize.width; i++) {
    for (var j = 0; j < gridSize.height; j++) {
      updateGrid[i][j] = (grid[i][j] != tempGrid[i][j]);
      grid[i][j] = tempGrid[i][j];
      tempGrid[i][j] = currentRule.defaultCell;
    }
  }

  redraw();
}


function neighbourValueSum(x, y) {
  var n = 0;
  neighbors(x, y, currentRule.neighborhoodSize, function (i, j) {
    n += getCellAsNeighborWithSafty(i, j);
  });
  return n;
}


function neighbourCount(x, y, c) {
  var n = 0;
  neighbors(x, y, currentRule.neighborhoodSize, function (i, j) {
    n += getCellAsNeighborWithSafty(i, j) == c ? 1 : 0;
  });
  return n;
}


function neighbors(x, y, r, func) {
  if (currentRule.neighborPattern == neighborhoodPatterns.moore) {
    for (var i = -r; i <= r; i++) {
      for (var j = -r; j <= r; j++) {
        if (!(i == 0 && j == 0)) {
          func(x + i, y + j);
        }
      }
    }
  } else if (currentRule.neighborPattern == neighborhoodPatterns.vonNeumann) {
    for (var i = -r; i <= r; i++) {
      var ri = r - Math.abs(i);
      for (var j = -ri; j <= ri; j++) {
        if (!(i == 0 && j == 0)) {
          func(x + i, y + j);
        }
      }
    }
  } else {
    console.log("Neighborhood Pattern not recognised : ", currentRule.neighborPattern);
  }
}

function getCellAsNeighborWithSafty(x, y) {
  var c = getCellWithSafty(x, y);
  if (currentRule.state[c] != undefined) {
    return currentRule.state[c].neighborValue;
  }
  return c;
}

function getCellWithSafty(x, y) {
  if (wrapAround) {
    if (x < 0) {
      x = gridSize.width + x;
    } else if (x >= gridSize.width) {
      x = x - gridSize.width;
    }

    if (y < 0) {
      y = gridSize.height + y;
    } else if (y >= gridSize.height) {
      y = y - gridSize.height;
    }

    return grid[x][y];
  } else {
    if (x >= 0 && y >= 0 && x < gridSize.width && y < gridSize.height) {
      return grid[x][y];
    } else {
      return currentRule.defaultCell;
    }
  }
  return currentRule.defaultCell;
}

function updateInterval() {
  clearInterval(interval);
  if (fpsCap > 0) {
    interval = setInterval(loopIteration, 1000 / fpsCap);
  }
}

function loopIteration() {
  if (playing) {
    nextStep();
  }
}

function clearGrid() {

  if(selectMode){
    console.log(selection);
    for (var i = 0; i < selection.w; i++) {
      for (var j = 0; j < selection.h; j++) {
        selection.g[i][j] = clearPaint;
      }
    }
  }else{
    for (var i = 0; i < gridSize.width; i++) {
      for (var j = 0; j < gridSize.height; j++) {
        grid[i][j] = clearPaint;
        updateGrid[i][j] = true;
      }
    }
  }

  step = 0;

  firstDraw();

  setPlaying(false);
}

function shiftGrid(x, y) {

  if(selectMode){
    selection.shift(x, y);
    return;
  }

  var tGrid = createArray(gridSize.width, gridSize.height);


  for (var i = 0; i < gridSize.width; i++) {
    for (var j = 0; j < gridSize.height; j++) {
      tGrid[i][j] = getCellWithSafty(i - x, j - y);
    }
  }

  for (var i = 0; i < gridSize.width; i++) {
    for (var j = 0; j < gridSize.height; j++) {
      grid[i][j] = tGrid[i][j];
      updateGrid[i][j] = true;
    }
  }

  redraw();
}

function flipGrid(h, v) {

  if(selectMode){
    selection.flip(h, v);
    return;
  }

  var tGrid = createArray(gridSize.width, gridSize.height);

  for (var i = 0; i < gridSize.width; i++) {
    for (var j = 0; j < gridSize.height; j++) {
      tGrid[i][j] = getCellWithSafty((h ? gridSize.width - 1 - i : i), (v ? gridSize.height - 1 - j : j));
    }
  }

  for (var i = 0; i < gridSize.width; i++) {
    for (var j = 0; j < gridSize.height; j++) {
      grid[i][j] = tGrid[i][j];
      updateGrid[i][j] = true;
    }
  }

  redraw();
}

function rotateGrid(cw) {

  if(selectMode){
    selection.rotate(x, y);
    return;
  }

  var tGrid = createArray(gridSize.width, gridSize.height);


  for (var i = 0; i < gridSize.width; i++) {
    for (var j = 0; j < gridSize.height; j++) {
      tGrid[i][j] = getCellWithSafty(cw ? j : gridSize.width - 1 - j, !cw ? i : gridSize.width - 1 - i);
    }
  }

  for (var i = 0; i < gridSize.width; i++) {
    for (var j = 0; j < gridSize.height; j++) {
      grid[i][j] = tGrid[i][j];
      updateGrid[i][j] = true;
    }
  }

  redraw();
}

function zoom(change){

  if(cellSize + change > 0){
    cellSize += change;
  }

  var oldGrid = createArray(gridSize.width, gridSize.height);
  var oldTempGrid = createArray(gridSize.width, gridSize.height);

  for (var i = 0; i < gridSize.width; i++) {
    for (var j = 0; j < gridSize.height; j++) {
      oldGrid[i][j] = grid[i][j];
      oldTempGrid[i][j] = tempGrid[i][j];
    }
  }

  var xl = gridSize.width;
  var yl = gridSize.height;

  setGridSize();

  grid = createArray(gridSize.width, gridSize.height);
  tempGrid = createArray(gridSize.width, gridSize.height);
  updateGrid = createArray(gridSize.width, gridSize.height);

  var xc = Math.floor((xl - gridSize.width)/2);
  var yc = Math.floor((yl - gridSize.height)/2);

  for (var j = 0; j < gridSize.height; j++) {
    for (var i = 0; i < gridSize.width; i++) {
      if (i+xc >= 0 && j+yc >= 0 && i+xc < xl && j+yc < yl) {
        grid[i][j] = oldGrid[i+xc][j+yc];
        tempGrid[i][j] = oldTempGrid[i+xc][j+yc];
        updateGrid[i][j] = true;
      }else{
        grid[i][j] = currentRule.defaultCell;
        tempGrid[i][j] = currentRule.defaultCell;
        updateGrid[i][j] = true;
      }
    }
  }

  firstDraw();

  if (document.activeElement) {
    document.activeElement.blur();
  }
}



//Rendering Functions:

function setGridSize() {
  gridSize.width = Math.max(Math.floor((canvas.width - 1) / cellSize), 1);
  gridSize.height = Math.max(Math.floor((canvas.height - 1) / cellSize), 1);
}

function firstDraw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = currentRule.lineColor;

  context.lineWidth = currentRule.lineWidth;

  updateAll();

  redraw();

  if (cellSize > 4 && drawGridLines) {
    for (var i = 0; i < gridSize.width; i++) {
      for (var j = 0; j < gridSize.height; j++) {
        context.strokeRect(i * cellSize + .5, j * cellSize + .5, cellSize, cellSize);
      }
    }
  }

}

function redraw() {
  if(pauseDrawing){
    return;
  }
  for (var i = 0; i < gridSize.width; i++) {
    for (var j = 0; j < gridSize.height; j++) {
      if (updateGrid[i][j]) {
        context.fillStyle = currentRule.state[grid[i][j]] != undefined ? currentRule.state[grid[i][j]].color : currentRule.defcolor;
        if (drawGridLines && cellSize > 4) {
          context.fillRect(i * cellSize + 1, j * cellSize + 1, cellSize - 1, cellSize - 1);
        } else {
          context.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
        }
        updateGrid[i][j] = false;
      }
    }
  }
  if(selectMode){
    context.globalAlpha = 0.5;
    context.fillStyle = "#8080FF";
    context.fillRect(selection.x1*cellSize, selection.y1*cellSize, selection.w*cellSize, selection.h*cellSize);
    for(var i = 0; i < selection.w; i++){
      for(var j = 0; j < selection.h; j++){
        context.fillStyle = currentRule.state[selection.g[i][j]] != undefined ? currentRule.state[selection.g[i][j]].color : currentRule.state.def.color;
        if (drawGridLines) {
          context.fillRect((i+selection.x1) * cellSize + 1, (j+selection.y1) * cellSize + 1, cellSize - 1, cellSize - 1);
        } else {
          context.fillRect((i+selection.x1) * cellSize, (j+selection.y1) * cellSize, cellSize, cellSize);
        }
        updateGrid[i+selection.x1][j+selection.y1] = true;
      }
    }
    context.globalAlpha = 1;
  }
}




//Intreraction Functions:

function initalize() {
  window.addEventListener("keypress", onKeyPress, false);
  window.addEventListener("resize", onResizeWindow, false);

  document.getElementById("inputFps").value = fpsCap;


  editor = new JSONEditor(document.getElementById("jsoneditor"), {});


  initCanvas();

  updateInterval();

  updateRuleUi();

  onResizeWindow();

  applyDisplayForEditor();

  setGrid(drawGridLines);

  changeCurrentRule("life");
}

function changeCurrentRule(n) {

  var r = rulePresets[n]

  if (r == undefined) {
    r = rulePresets.life;
  }

  verifyRule(r);

  currentRule = r;

  for (var j = 0; j < gridSize.height; j++) {
    for (var i = 0; i < gridSize.width; i++) {
      updateGrid[i][j] = true;
    }
  }

  updateRuleUi();

  setWrap(wrapAround);

  setAdditive(additiveClicking);
}

function updateRuleUi() {

  var selectPreset = document.getElementById("inputRulePreset");
  selectPreset.options.length = 0;
  var o;
  for (o in rulePresets) {
    var option = document.createElement("option");
    option.text = rulePresets[o].name;
    option.value = o;
    selectPreset.add(option);
  }

  var n = "";
  for (var i = 0; i < Object.keys(rulePresets).length; i++) {
    if (rulePresets[Object.keys(rulePresets)[i]] == currentRule) {
      n = Object.keys(rulePresets)[i];
    }
  }

  selectPreset.value = n;

  var selectPaint1 = document.getElementById("inputPaint1");
  selectPaint1.options.length = 0;
  for (var p in currentRule.state) {
    if (p != "def") {
      var option = document.createElement("option");
      option.text = (currentRule.state[p].name?currentRule.state[p].name+" ":"") + p + (currentRule.state[p].color ? (" (" + ntc.name(currentRule.state[p].color)[1] + ")") : " (No color)");
      option.value = p;
      selectPaint1.add(option);
    }
  }
  selectPaint1.value = firstPaint;

  var selectPaint2 = document.getElementById("inputPaint2");
  selectPaint2.options.length = 0;
  for (var p in currentRule.state) {
    if (p != "def") {
      var option = document.createElement("option");
      option.text = (currentRule.state[p].name?currentRule.state[p].name+" ":"") + p + (currentRule.state[p].color ? (" (" + ntc.name(currentRule.state[p].color)[1] + ")") : " (No color)");
      option.value = p;
      selectPaint2.add(option);
    }
  }
  selectPaint2.value = secondPaint;

  var selectPaintClear = document.getElementById("inputPaintClear");
  selectPaintClear.options.length = 0;
  for (var p in currentRule.state) {
    if (p != "def") {
      var option = document.createElement("option");
      option.text = (currentRule.state[p].name?currentRule.state[p].name+" ":"") + p + (currentRule.state[p].color ? (" (" + ntc.name(currentRule.state[p].color)[1] + ")") : " (No color)");
      option.value = p;
      selectPaintClear.add(option);
    }
  }
  selectPaintClear.value = clearPaint;


  onResizeWindow();

  redraw();
}

function initCanvas() {
  canvas = document.getElementById("canvasMain");
  context = canvas.getContext('2d');

  //canvas.width = window.innerWidth;
  //canvas.height = window.innerHeight - document.getElementById("controlsDiv").offsetHeight;

  canvas.onmousedown = onDownCanvas;
  canvas.onmouseup = onUpCanvas;
  canvas.onmousemove = onMoveCanvas;

  canvas.addEventListener('contextmenu', function (event) {
    event.preventDefault();
  }, false);

  setGridSize();

  grid = createArray(gridSize.width, gridSize.height);
  tempGrid = createArray(gridSize.width, gridSize.height);
  updateGrid = createArray(gridSize.width, gridSize.height);

  for (var i = 0; i < gridSize.width; i++) {
    for (var j = 0; j < gridSize.height; j++) {
      updateGrid[i][j] = true;
      grid[i][j] = currentRule.defaultCell;
      tempGrid[i][j] = currentRule.defaultCell;
    }
  }

  firstDraw();

  onResizeWindow();
}


function getMousePosition(event) {
  var x = event.x;
  var y = event.y;

  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;

  return {
    x: x,
    y: y
  }
}


function onDownCanvas(event) {
  event.preventDefault();
  mouseDown = true;
  var mousePosition = getMousePosition(event);
  var x = Math.floor((mousePosition.x + window.scrollX) / cellSize);
  var y = Math.floor((mousePosition.y + window.scrollY) / cellSize);
  if (x >= 0 && y >= 0 && x < gridSize.width && y < gridSize.height) {
    if(selectMode){
      if(selection.g != null){
        selection.place(true);
      }
      selection.x1 = x;
      selection.y1 = y;
    }else{
      updateGrid[x][y] = true;
      if (event.button == 0) {
        currentPaint = (grid[x][y] == firstPaint && !additiveClicking) ? currentRule.defaultCell : firstPaint;
      } else if (event.button == 2) {
        currentPaint = (grid[x][y] == secondPaint && !additiveClicking) ? currentRule.defaultCell : secondPaint;
      }
      grid[x][y] = (additiveClicking && currentPaint!=0)?(parseInt(grid[x][y])+parseInt(currentPaint)):currentPaint;
      lastGridDragged = {x:-1, y:-1};
    }
  }
  redraw();
  if (document.activeElement) {
    document.activeElement.blur();
  }
}

function onUpCanvas(event) {
  mouseDown = false;
  var mousePosition = getMousePosition(event);
  var x = Math.floor((mousePosition.x + window.scrollX) / cellSize);
  var y = Math.floor((mousePosition.y + window.scrollY) / cellSize);
  if(selectMode){
    selection.x2 = x;
    selection.y2 = y;
    selection.pickup();
    firstDraw();
  }
}

function onMoveCanvas(event) {
  event.preventDefault();
  var mousePosition = getMousePosition(event);
  var x = Math.floor((mousePosition.x + window.scrollX) / cellSize);
  var y = Math.floor((mousePosition.y + window.scrollY) / cellSize);
  if (mouseDown) {
    if(selectMode){
      selection.x2 = x;
      selection.y2 = y;
    }else{
      if (x >= 0 && y >= 0 && x < gridSize.width && y < gridSize.height) {
        if(lastGridDragged.x != x || lastGridDragged.y != y){
          updateGrid[x][y] = true;
          grid[x][y] = (additiveClicking && currentPaint!=0)?(parseInt(grid[x][y])+parseInt(currentPaint)):currentPaint;
          lastGridDragged = {x:x, y:y};
        }
      }
    }

    redraw();
  }
}

function onKeyPress(event) {
  //console.log(document.activeElement.nodeName);
  if (document.activeElement.nodeName == "BODY") {
    event.preventDefault();
    if (event.keyCode == 97) { //a
      shiftGrid(-1, 0);
    } else if (event.keyCode == 119) { //w
      shiftGrid(0, -1);
    } else if (event.keyCode == 100) { //d
      shiftGrid(1, 0);
    } else if (event.keyCode == 115) { //s
      shiftGrid(0, 1);
    } else if (event.keyCode == 113) { //q
      flipGrid(false, true);
    } else if (event.keyCode == 101) { //e
      flipGrid(true, false);
    } else if (event.keyCode == 65) { //A
      shiftGrid(-10, 0);
    } else if (event.keyCode == 87) { //W
      shiftGrid(0, -10);
    } else if (event.keyCode == 68) { //D
      shiftGrid(10, 0);
    } else if (event.keyCode == 83) { //S
      shiftGrid(0, 10);
    } else if (event.keyCode == 81) { //Q
      rotateGrid(false);
    } else if (event.keyCode == 69) { //E
      rotateGrid(true);
    } else if (event.keyCode == 32) { //space
      setPlaying(!playing);
    } else if (event.keyCode == 110) { //n
      nextStep();
    }
  }
}

function onResizeWindow() {
  canvas.width = window.innerWidth - 24;
  canvas.height = window.innerHeight - document.getElementById("controlsDiv").clientHeight - 16;

  smallSize = {
    width: gridSize.width,
    height: gridSize.height
  }

  setGridSize();

  smallSize.width = Math.min(smallSize.width, gridSize.width);
  smallSize.height = Math.min(smallSize.height, gridSize.height);

  var oldGrid = createArray(gridSize.width, gridSize.height);
  var oldTempGrid = createArray(gridSize.width, gridSize.height);

  for (var i = 0; i < gridSize.width; i++) {
    for (var j = 0; j < gridSize.height; j++) {
      oldGrid[i][j] = currentRule.defaultCell;
      oldTempGrid[i][j] = currentRule.defaultCell;
    }
  }
  for (var i = 0; i < smallSize.width; i++) {
    for (var j = 0; j < smallSize.height; j++) {
      oldGrid[i][j] = grid[i][j];
      oldTempGrid[i][j] = tempGrid[i][j];
    }
  }

  grid = createArray(gridSize.width, gridSize.height);
  tempGrid = createArray(gridSize.width, gridSize.height);
  updateGrid = createArray(gridSize.width, gridSize.height);

  for (var j = 0; j < gridSize.height; j++) {
    for (var i = 0; i < gridSize.width; i++) {
      grid[i][j] = oldGrid[i][j];
      tempGrid[i][j] = oldTempGrid[i][j];
      updateGrid[i][j] = true;
    }
  }

  mouseDown = false;

  firstDraw();
}

function setPlaying(p) {
  playing = p;
  document.getElementById("buttonPlayPause").innerHTML = playing ? "Pause" : "Play";

  if (document.activeElement) {
    document.activeElement.blur();
  }
}

function inputChanged(element) {
  if (element.id == "inputFps") {
    fpsCap = element.value;
    updateInterval();
  } else if (element.id == "inputRulePreset") {
    changeCurrentRule(element.options[element.selectedIndex].value);
  } else if (element.id == "inputPaint1") {
    firstPaint = element.options[element.selectedIndex].value;
  } else if (element.id == "inputPaint2") {
    secondPaint = element.options[element.selectedIndex].value;
  } else if (element.id == "inputPaintClear") {
    clearPaint = element.options[element.selectedIndex].value;
  }
}

function toggleTranformationTable() {
  var transTable = document.getElementById("transformationTable");
  transTable.style.display = transTable.style.display == "none" ? "block" : "none";
  var button = document.getElementById("buttonToggleTranformationTable");
  button.innerHTML = transTable.style.display == "none" ? "&#8644;&#8645;" : "Hide";

  if (document.activeElement) {
    document.activeElement.blur();
  }
}

function ruleToTextbox() {
  var nameT = document.getElementById("inputTextNewRuleName");
  //var codeT = document.getElementById("inputTextNewRule");
  var n = "";
  for (var i = 0; i < Object.keys(rulePresets).length; i++) {
    if (rulePresets[Object.keys(rulePresets)[i]] == currentRule) {
      n = Object.keys(rulePresets)[i];
      break;
    }
  }
  nameT.value = n;
  if (fancyTextEditorActive) {
    editor.set(currentRule);
  } else {
    var text = document.getElementById("ruleTestBox");
    text.value = JSON.stringify(currentRule, null, 2);
  }

  editorShown = true;

  applyDisplayForEditor();
}

function textboxToRule() {
  var nameT = document.getElementById("inputTextNewRuleName");
  //var codeT = document.getElementById("inputTextNewRule");
  if (fancyTextEditorActive) {
    rulePresets[nameT.value] = editor.get();
  } else {
    var text = document.getElementById("ruleTestBox");
    rulePresets[nameT.value] = JSON.parse(text.value);
  }
  changeCurrentRule(nameT.value);

  applyDisplayForEditor();
}

function popInOut() {
  var holderUpper = document.getElementById("holderTextAreaUpper");
  var holderLower = document.getElementById("holderTextAreaLower");

  holderUp = !holderUp;

  var newH = holderUp ? holderUpper : holderLower;
  var oldH = holderUp ? holderLower : holderUpper;

  while (oldH.childNodes.length > 0) {
    newH.appendChild(oldH.childNodes[0]);
  }

  applyDisplayForEditor();
}

function showHideEditor() {
  editorShown = !editorShown;

  applyDisplayForEditor();
}

function applyDisplayForEditor() {
  var holderUpper = document.getElementById("holderTextAreaUpper");
  var holderLower = document.getElementById("holderTextAreaLower");
  var fancy = document.getElementById("jsoneditor");
  var text = document.getElementById("ruleTestBox");

  var buttonPopInOut = document.getElementById("buttonPopInOut");
  buttonPopInOut.innerHTML = holderUp ? "Move Editor Down" : "Move Editor Up";
  buttonPopInOut.style.display = editorShown ? "block" : "none";

  var buttonToggleFancyText = document.getElementById("buttonToggleFancyText");
  buttonToggleFancyText.innerHTML = fancyTextEditorActive ? "Basic Editor" : "Fancy Editor";
  buttonToggleFancyText.style.display = editorShown ? "block" : "none";

  var buttonShowHidEditor = document.getElementById("buttonShowHidEditor");
  buttonShowHidEditor.innerHTML = editorShown ? "Hide Editor" : "Show Editor";

  holderUpper.style.display = editorShown ? "block" : "none";
  holderLower.style.display = editorShown ? "block" : "none";

  fancy.style.display = fancyTextEditorActive ? "block" : "none";
  text.style.display = fancyTextEditorActive ? "none" : "block";
  onResizeWindow();

  if (document.activeElement) {
    document.activeElement.blur();
  }
}

function fancyTextEditor() {

  fancyTextEditorActive = !fancyTextEditorActive;

  var text = document.getElementById("ruleTestBox");

  if (fancyTextEditorActive) {
    editor.set(JSON.parse(text.value));
  } else {
    text.value = JSON.stringify(editor.get(), null, 2);
  }

  applyDisplayForEditor();

}

function toggleSelectMode(){
  var button = document.getElementById("buttonSelectMode");
  selectMode = !selectMode;
  button.innerHTML = selectMode ? "Place" : "Select";

  document.getElementById("buttonCopyHere").style.display = selectMode ? "block" : "none";
  //document.getElementById("buttonDelSelection").style.display = selectMode ? "block" : "none";

  if(!selectMode){
    selection.place(true);
  }

  firstDraw();
  if (document.activeElement) {
    document.activeElement.blur();
  }
}

function setWrap(val){
  if(val == undefined){
    wrapAround = document.getElementById("checkWrap").checked;
  }else{
    wrapAround = val;
    document.getElementById("checkWrap").checked = wrapAround;
  }
}

function setGrid(val){
  if(val == undefined){
    drawGridLines = document.getElementById("checkGrid").checked;
  }else{
    drawGridLines = val;
    document.getElementById("checkGrid").checked = drawGridLines;
  }
  firstDraw();
}

function setAdditive(val){
    if(val == undefined){
        additiveClicking = document.getElementById("checkAdditive").checked;
    }else{
        document.getElementById("checkAdditive").checked = additiveClicking;
    }
}