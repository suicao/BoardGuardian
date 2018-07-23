"use strict";
var GameBoard = function (assetsManager, scene) {
    var _this = this;
    this.bases = [];
    var baseSize = GameBoard.SIZE / GameBoard.ROWS;

    _this.whiteMaterial = new BABYLON.StandardMaterial("White", scene);
    _this.whiteMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);

    _this.selectedMaterial = new BABYLON.StandardMaterial("Black", scene);
    _this.selectedMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);

    for (var r = 0; r < GameBoard.ROWS; r++) {
        var col = [];
        for (var c = 0; c < GameBoard.COLUMNS; c++) {
            var b = BABYLON.Mesh.CreateBox("base" + r + "" + c, baseSize - 1, scene);
            b.material = new BABYLON.StandardMaterial("base", scene);
            if ((r + c) % 2 == 0) {
                b.material.diffuseTexture = new BABYLON.Texture("./assets/textures/ground.jpg", scene);
            } else {
                b.material.diffuseTexture = new BABYLON.Texture("./assets/textures/ground2.jpg", scene);

            }
            //b.material.bumpTexture = new BABYLON.Texture("./assets/textures/cobblestones_bump.png", scene);
            b.material.diffuseTexture.vScale = 1;
            b.material.diffuseTexture.uScale = 1;
            b.material.specularColor = BABYLON.Color3.Black();
            b.position.z = (3 - r + 0.5) * baseSize;
            b.position.x = (3 - c + 0.5) * baseSize;
            b.position.y = -3.5;
            b.tag = "Base";
            b.boardPosition = {
                row: r,
                column: c
            };
            b.movable = true;
            var baseHighlight = BABYLON.Mesh.CreateCylinder("base" + r + "" + c, 0.2, baseSize - 4, baseSize - 4, 6, 1, scene);
            baseHighlight.position.z = (3 - r + 0.5) * baseSize;
            baseHighlight.position.x = (3 - c + 0.5) * baseSize;
            baseHighlight.position.y = 0.2;
            baseHighlight.material = new BABYLON.StandardMaterial("baseHighlight", scene);
            baseHighlight.material.diffuseColor = BABYLON.Color3.Yellow();
            baseHighlight.backFaceCulling = true;
            b.highlight = baseHighlight;
            baseHighlight.isVisible = false;
            //terrible hack
            baseHighlight.fromBase = b;
            baseHighlight.tag = "Base Highlight";
            col.push(b);

        }
        this.bases.push(col);
    }

};

GameBoard.prototype.tag = "gameBoard";
//Chiều dài - rộng
GameBoard.SIZE = 64;
//Bàn cờ vua
GameBoard.ROWS = 8;
GameBoard.COLUMNS = 8;

GameBoard.prototype = Object.create(BABYLON.Mesh.prototype);
GameBoard.prototype.reset = function () {
    for (var i = 0; i < GameBoard.ROWS; i++) {
        for (var j = 0; j < GameBoard.COLUMNS; j++) {
            var b = this.getBase(i, j);
            b.highlight.isVisible = false;
            b.character = null;
        }
    }
};
GameBoard.prototype.getBase = function (row, col) {
    return this.bases[row][col];
};
GameBoard.prototype.getBasePosition = function (row, col) {
    var absolutePosition =  this.bases[row][col].getAbsolutePosition();
    return absolutePosition.clone();
};

GameBoard.prototype.getRow = function (row) {
    return this.bases[row];
};

GameBoard.prototype.getColumn = function (col) {
    var array = [];
    for (var row = 0; l < GameBoard.ROWS; l++) {
        array.push(this.bases[row][col]);
    }
    return array;
};
var isBaseABlocker = function (b) {
    if (b.character) {
        if (b.character.model.tag == "Hero") {
            b.highlight.isVisible = true;
            b.movable = false;
        } else {
            b.highlight.isVisible = true;
            b.movable = true;
        }
        return false;
    } else {
        b.movable = true;
        b.highlight.isVisible = true;
        return true;
    }
};
GameBoard.prototype.highlightMovableBases = function (heroType, row, column) {
    for (var r = 0; r < GameBoard.ROWS; r++) {
        for (var c = 0; c < GameBoard.COLUMNS; c++) {
            this.getBase(r, c).movable = false;
            this.getBase(r, c).highlight.isVisible = false;
        }
    }


    //Highlight đường đi có thể của hero
    var b = {};
    if (heroType == HeroType.QUEEN || heroType == HeroType.ROOK ||heroType==HeroType.ROOK2) {
        for (var i = row - 1; i >= 0; i--) {
            b = this.getBase(i, column);
            if (!isBaseABlocker(b)) {
                break;
            }
        }
        for (i = row + 1; i < GameBoard.ROWS; i++) {
            b = this.getBase(i, column);
            if (!isBaseABlocker(b)) {
                break;
            }
        }
        for (i = column - 1; i >= 0; i--) {
            b = this.getBase(row, i);
            if (!isBaseABlocker(b)) {
                break;
            }
        }
        for (i = column + 1; i < GameBoard.COLUMNS; i++) {
            b = this.getBase(row, i);
            if (!isBaseABlocker(b)) {
                break;
            }
        }
    }
    var j = 0;
    if (heroType == HeroType.QUEEN || heroType == HeroType.BISHOP ||heroType==HeroType.BISHOP2) {
        for (i = row - 1, j = column - 1; i >= 0 && j>=0; i--, j--) {
            b = this.getBase(i, j);
            if (!isBaseABlocker(b)) {
                break;
            }
        }
        for (i = row - 1, j = column + 1; i >= 0 && j < GameBoard.COLUMNS; i--, j++) {
            b = this.getBase(i, j);
            if (!isBaseABlocker(b)) {
                break;
            }
        }
        for (i = row + 1, j = column + 1; i < GameBoard.ROWS && j < GameBoard.COLUMNS; i++, j++) {
            b = this.getBase(i, j);
            if (!isBaseABlocker(b)) {
                break;
            }
        }
        for (i = row + 1, j = column - 1; i < GameBoard.ROWS && j>=0; i++, j--) {
            b = this.getBase(i, j);
            if (!isBaseABlocker(b)) {
                break;
            }
        }
    }

    if (heroType == HeroType.KNIGHT || heroType == HeroType.KNIGHT2) {
        for (r = 0; r < GameBoard.ROWS; r++) {
            for (c = 0; c < GameBoard.COLUMNS; c++) {
                if ((r - row == 2 && c - column == 1) ||
                    (r - row == 2 && c - column == -1) ||
                    (r - row == 1 && c - column == 2) ||
                    (r - row == 1 && c - column == -2) ||
                    (r - row == -2 && c - column == 1) ||
                    (r - row == -2 && c - column == -1) ||
                    (r - row == -1 && c - column == 2) ||
                    (r - row == -1 && c - column == -2)) {
                    isBaseABlocker(gameBoard.getBase(r,c));
                } else {
                    this.bases[r][c].highlight.isVisible = false;
                    this.bases[r][c].movable = false;
                }
            }
        }
    }
    this.getBase(row, column).movable = false;
    this.getBase(row, column).highlight.isVisible = true;
};

GameBoard.prototype.setCharacterAtPosition = function (character, row, column) {
    this.bases[row][column].character = character;
    character.setBoardPosition(row, column);
};
GameBoard.prototype.clearCharacterAtPosition = function (row, column) {
    this.bases[row][column].character = null;
};
GameBoard.prototype.getCharacterAtPosition = function (row, column) {
    return this.bases[row][column].character;
};
