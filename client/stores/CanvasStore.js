var alt = require('../alt');
var GameActions = require('../actions/GameActions');

var GameHandlerStore = require('./GameHandlerStore');
var GameHelperStore = require('./GameHelperStore');

class CanvasStore {
  constructor() {

    this.gridWidth = 0;
    this.gridHeight = 0;
    this.boardWidth = 0;
    this.boardHeight = 0;
    this.dx = 0;
    this.dy = 0;
    this.gridBorder = 1;
    this.canvas = null;
    this.game = null;
    this.players = {
      one: null,
      two: null
    };

    this.colors = {
      text: '#FFFFFF',
      miss: '#0F0F0F',
      p1: {
        ok: '#FA6775',
        burnt: '#46211A',
        head: {
          ok: '#F52549',
          burnt: '#693D3D'
        },
      },
      p2: {
        ok: '#F4EC6A',
        burnt: '#2E4600',
        head: {
          ok: '#BBCF4A',
          burnt: '#486B00'
        }
      },
      empty: '#118AB2',
      invisible: '#05668D',
      default: '#FFFFFF',

      blank: '#000000',
      hover: '#FFFFFF',
      select: '#FF0000',
    };

    this.bindListeners({
      handleDrawBoard: GameActions.DRAW_BOARD,
      handleSetUpGame: GameActions.SET_UP_GAME,
      handleSelectShip: GameActions.SELECT_SHIP,
      handleTurnChange: GameActions.TURN_CHANGE,
      handleChangeView: GameActions.CHANGE_VIEW,
      handleGameOverEvent: GameActions.GAME_OVER_EVENT,
    });
  }

  handleSetUpGame(game) {
    this.game = game;

    // Size up the canvas
    var size = Math.min(window.innerHeight, window.innerWidth);
    size = Math.round(size * 0.90);

    // Initialize the canvas
    var playerCount = parseInt($("#player-count input[type='radio']:checked").val());
    this.view = playerCount == 0 ? 3 : 1;

    this.canvas = document.getElementById('bs-canvas');
    this.gridWidth = game.getBoardSize();
    this.gridHeight = game.getBoardSize();
    this.dx = Math.max(Math.floor(size / this.gridWidth), 5);
    this.dy = Math.max(Math.floor(size / this.gridHeight), 5);
    this.boardWidth = this.dx * this.gridWidth;
    this.boardHeight = this.dy * this.gridHeight;
    this.canvas.width = this.boardWidth;
    this.canvas.height = this.boardHeight;
    this.context = this.canvas.getContext('2d');
    this.players = GameHandlerStore.getState().players;
    this.selectedShip = null;
    this.lastHover = {x: -1, y: -1};
    this.lastSelect = {x: -1, y: -1};

    // Scale other elements of the page
    $('#info-row').css('maxWidth', this.boardWidth + 'px');

    // Clear the board
    this.context.fillStyle = this.colors.blank;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillRect(0, 0, this.gridWidth * this.dx, this.gridHeight * this.dy);

    // Register canvas events
    var canvasJQ = $('#bs-canvas');
    var _this = this;

    canvasJQ.off();

    // Highlight the square
    canvasJQ.mousemove(function(e) {
      var x = Math.floor(e.offsetX / _this.dx);
      var y = Math.floor(e.offsetY / _this.dy);

      if (_this.lastHover.x != x || _this.lastHover.y != y) {
        _this.hoverBlock(_this.context, _this.colors.blank, _this.lastHover.x, _this.lastHover.y);
        _this.hoverBlock(_this.context, _this.colors.hover, x, y);
        _this.selectBlock(_this.context, _this.colors.select, _this.lastSelect.x, _this.lastSelect.y);
        _this.selectShip(_this.context, _this.colors.select, _this.selectedShip);
        _this.lastHover.x = x;
        _this.lastHover.y = y;
        GameActions.hoverChange(x, y);
      }
    });

    canvasJQ.mouseleave(function(e) {
      if (_this.lastHover.x != null || _this.lastHover.y != null) {
        _this.hoverBlock(_this.context, _this.colors.blank, _this.lastHover.x, _this.lastHover.y);
        _this.selectBlock(_this.context, _this.colors.select, _this.lastSelect.x, _this.lastSelect.y);
      }
      _this.lastHover.x = null;
      _this.lastHover.y = null;
      GameActions.hoverChange(null, null);
    });

    canvasJQ.click(function(e) {
      var x = Math.floor(e.offsetX / _this.dx);
      var y = Math.floor(e.offsetY / _this.dy);

      if (_this.lastSelect.x != x || _this.lastSelect.y != y) {
        // Check if it's a new ship
        var key = _this.getPlayerKey(game);
        if (_this.selectedShip && !_this.selectedShip.occupies(key, x, y)) {
          _this.selectShip(_this.context, _this.colors.blank, _this.selectedShip);
          _this.selectedShip = null;
        }
        _this.selectBlock(_this.context, _this.colors.blank, _this.lastSelect.x, _this.lastSelect.y);
        _this.selectBlock(_this.context, _this.colors.select, x, y);
        _this.selectShip(_this.context, _this.colors.select, _this.selectedShip);
        _this.lastSelect.x = x;
        _this.lastSelect.y = y;
        GameActions.selectChange(x, y);
      }
    });

    GameActions.drawBoard.defer(game);
  }

  handleDrawBoard(game) {
    this.context = this.canvas.getContext('2d');

    // Clear the board
    this.context.fillStyle = this.colors.blank;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillRect(0, 0, this.gridWidth * this.dx, this.gridHeight * this.dy);

    // Figure out the turn
    var key = this.players.one;
    if (this.view == 0) key = '';
    else if (this.view == 1) key = this.players.one;
    else if (this.view == 2) key = this.players.two;

    var x, y;
    var misses = [];
    var expiresOffset = GameHandlerStore.getState().game.getTurnCount() - 1;
    var k1 = this.players.one;
    var k2 = this.players.two;

    for (x = 0; x < this.gridWidth; x++) {
      for (y = 0; y < this.gridHeight; y++) {

        // Query the location
        var block = game.queryLocation(key, x, y);

        // Show both players view
        if (this.view == 3) {
          var b1 = game.queryLocation(this.players.one, x, y);
          var b2 = game.queryLocation(this.players.two, x, y);

          if (b1.type == 'miss') {
            block = b1;
            key = k1;
          }
          else if (b1.type == 'p1') {
            block = b1;
            key = k1;
          }
          else if (b2.type == 'p2') {
            block = b2;
            key = k2;
          }
          else if (b1.type == 'empty') {
            block = b1;
            key = k1;
          }
          else if (b2.type == 'empty') {
            block = b2;
            key = k2;
          }
          else {
            block = b1;
            key = k1;
          }
        }

        // Determine the color of the block
        var color = '#000000';
        switch (block.type) {
          case 'miss':
            color = this.colors.miss;
            misses.push({x: x, y: y, expires: block.expires - expiresOffset});
            break;

          case 'p1':
            var isShipHead = this.isShipHead(game, key, x, y);
            if (block.state == SBConstants.OK) {
              if (isShipHead) color = this.colors.p1.head.ok;
              else color = this.colors.p1.ok;
            } else {
              if (isShipHead) color = this.colors.p1.head.burnt;
              else color = this.colors.p1.burnt;
            }
            break;

          case 'p2':
          var isShipHead = this.isShipHead(game, key, x, y);
          if (block.state == SBConstants.OK) {
            if (isShipHead) color = this.colors.p2.head.ok;
            else color = this.colors.p2.ok;
          } else {
            if (isShipHead) color = this.colors.p2.head.burnt;
            else color = this.colors.p2.burnt;
          }
            break;

          case 'empty':
            color = this.colors.empty;
            break;

          case 'invisible':
            color = this.colors.invisible;
            break;

          default:
            color = this.colors.default;
        }

        // Draw in the block
        this.draw(this.context, color, x, y);
      }
    }

    // Draw the misses
    for (var i = 0; i < misses.length; i++) {
      var miss = misses[i];
      this.drawText(this.context, this.colors.text, miss.expires, miss.x, miss.y + 1);
    }

    // Draw in the selections
    if (this.lastSelect != null) {
      this.selectBlock(this.context, this.colors.select, this.lastSelect.x, this.lastSelect.y);
    }

    if (this.selectedShip != null) {
      this.selectShip(this.context, this.colors.select, this.selectedShip);
    }

  }

  handleSelectShip(ship) {
    this.selectedShip = ship;
    this.selectShip(this.context, this.colors.select, ship);
  }

  handleTurnChange(game) {
    // Reset values
    if (this.view != 3) this.view = (game.getTurnCount() % 2) + 1;
    this.selectedShip = null;
    this.lastHover = {x: -1, y: -1};
    this.lastSelect = {x: -1, y: -1};
  }

  handleChangeView(val) {
    this.view = val;
    this.handleDrawBoard(this.game);
  }

  handleGameOverEvent(e, game) {
    this
    this.handleDrawBoard(this.game);
  }

  isShipHead(game, key, x, y) {
    var fleet = game.getFleetByKey(key);
    if (fleet) {
      for (var i = 0; i < fleet.length; i++) {
        var ship = fleet[i];
        var pos = ship.getPosition(key);
        if (pos.x == x && pos.y == y) return true;
      }
    }
    return false;
  }

  draw(context, color, x, y) {
    var px = Math.floor((x * this.dx) + this.gridBorder);
    var py = Math.floor((y * this.dy) + this.gridBorder);
    var width = Math.floor(this.dx - 2 * this.gridBorder);
    var height = Math.floor(this.dy - 2 * this.gridBorder);
    context.fillStyle = color;
    context.fillRect(px, py, width, height);
  }

  drawBorder(context, color, x, y) {
    var px = Math.floor((x * this.dx));
    var py = Math.floor((y * this.dy));
    var width = Math.floor(this.dx);
    var height = Math.floor(this.dy);
    context.lineWidth = "2";
    context.strokeStyle = color;
    context.rect(px, py, width, height);
  }

  drawText(context, color, text, x, y, maxWidth) {
    maxWidth = maxWidth || this.dx;
    var px = Math.floor((x * this.dx));
    var py = Math.floor((y * this.dy));
    context.font = (this.dy - 2) + "px serif";
    context.textAlign = 'center';
    context.fillStyle = color;
    context.fillText(text, px + (this.dx / 2), py - 1, maxWidth - 2);
  }

  hoverBlock(context, color, x, y) {
    if (x != null && y != null) {
      context.beginPath();
      this.drawBorder(context, color, x, y);
      context.stroke();
    }
  }

  selectBlock(context, color, x, y) {
    if (x != null && y != null) {
      context.beginPath();
      this.drawBorder(context, color, x, y);
      context.stroke();
    }
  }

  selectShip(context, color, ship) {
    if (ship != null) {
      // Draw the ship borders
      var key = this.getPlayerKey(this.game);
      var pos = ship.getPosition(key);
      var size = ship.getSize(key);

      var newPos = {x: pos.x, y: pos.y};
      context.beginPath();
      for (var i = 0; i < size; i++) {
        this.drawBorder(context, color, newPos.x, newPos.y);
        newPos.x = (newPos.x + SBConstants.dxByDir(pos.direction)) % this.gridWidth;
        newPos.y = (newPos.y + SBConstants.dyByDir(pos.direction)) % this.gridHeight;
        if (newPos.x < 0) newPos.x += this.gridWidth;
        if (newPos.y < 0) newPos.y += this.gridHeight;
      }
      context.stroke();
    }
  }

  getPlayerKey(game) {
    var isPlayerOne = game.getStatus() == SBConstants.PLAYER_ONE;
    var key = isPlayerOne ? this.players.one : this.players.two;
    return key;
  }

  convertToGridXY(x, y) {
    var gx = Math.floor(x / this.dx);
    var gy = Math.floor(y / this.dy);
    return {x: gx, y: gy};
  }

}

module.exports = alt.createStore(CanvasStore, 'CanvasStore');
