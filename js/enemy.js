"use strict";
var EnemyType = {
    REGULAR: 0 //Còn loại nào không ta?
};
var Enemy = function (enemyType, enemyModel, scene, initialPosition) {
    var _this = this;
    _this._scene = scene;
    switch (enemyType) {
        //Hiện tại có mỗi con queen thôi
        case EnemyType.REGULAR:
            _this.model = enemyModel;
            _this.model.tag = "Enemy";
            _this.model.isPickable = false;
            _this.model.rotation.z = -Math.PI;
            _this.model.rotation.x = Math.PI;
            _this.model.rotation.y = Math.PI;

            _this.model.position.x = initialPosition.x;
            _this.model.position.z = initialPosition.z + 8;
            _this.model.position.y = 4;

            _this.model.scaling.x = 1.33;
            _this.model.scaling.y = 1.33;
            _this.model.scaling.z = 1.33;
            _this.beginWalking = 100;
            _this.endWalking = 132;
            _this.beginAttacking = 147;
            _this.endAttacking = 176;
            _this.beginDying = 178;
            _this.endDying = 189;
            _this.skeleton = enemyModel.skeleton;
            break;
    }
    this.movingAnimation = new BABYLON.Animation("movingAnimation", "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

};
Enemy.prototype = Object.create(BABYLON.Mesh.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.tag = "Enemy";
//TODO set Enemy size
Enemy.WIDTH = 0;
Enemy.HEIGHT = 0;


Enemy.prototype.move = function (callback) {
    //Check để ăn người chơi hehe
    var currentPosition = this.getBoardPosition();

    var newBoardPosition = this.getBoardPosition();
    newBoardPosition.row++;

    var willAttack = false;
    var b1 = gameBoard.getBase(currentPosition.row + 1, currentPosition.column - 1);
    var b2 = gameBoard.getBase(currentPosition.row + 1, currentPosition.column + 1);
    if (newBoardPosition.row > 0) {
        if (b1 && b1.character && b1.character.model.tag == "Hero") {
            newBoardPosition.column--;
            willAttack = true;
        }
        if (b2 && b2.character && b2.character.model.tag == "Hero") {
            newBoardPosition.column++;
            willAttack = true;
        }
    }
    var b3 = gameBoard.getBase(currentPosition.row + 1, currentPosition.column);
    //Bị chặn đầu trước khi vào bàn thì lách sang ô bên cạnh
    //Hình như ưu tiên rẽ trái trước?
    if (currentPosition.row == -1 && b3 && b3.character) {
        var deltaLeft = 9999, deltaRight = 9999;
        //Quét tay trái
        for (var i = currentPosition.column - 1; i >= 0; i--) {
            var b = gameBoard.getBase(0, i);
            if (!b.character) {
                deltaLeft = currentPosition.column - i;
                break;
            }
        }
        //Quét tay phải
        for (i = currentPosition.column + 1; i < GameBoard.COLUMNS; i++) {
            b = gameBoard.getBase(0, i);
            if (!b.character) {
                deltaRight = i - currentPosition.column;
                break;
            }
        }
        console.log(deltaLeft, deltaRight);
        if (deltaLeft <= deltaRight) {
            newBoardPosition.column -= deltaLeft;
        } else {
            newBoardPosition.column += deltaRight;

        }
    }

    var newPosition = gameBoard.getBasePosition(newBoardPosition.row, newBoardPosition.column);
    gameBoard.setCharacterAtPosition(this, newBoardPosition.row, newBoardPosition.column);

    var oldPosition = this.model.position;
    newPosition.y = this.model.position.y;

    if(willAttack){
        newPosition.x = oldPosition.x + (newPosition.x - oldPosition.x)*0.5;
        newPosition.z = oldPosition.z + (newPosition.z - oldPosition.z)*0.5;
    }
    var keys = [];

    keys.push({
        frame: 0,
        value: this.model.position.clone()
    });
    keys.push({
        frame: 20,
        value: newPosition
    });

    this.movingAnimation.setKeys(keys);
    this.model.animations = [];
    this.model.animations.push(this.movingAnimation);

    var rotationAngle = Math.atan((newPosition.x - oldPosition.x) / (newPosition.z - oldPosition.z));
    if (newPosition.z - oldPosition.z < 0 && newPosition.x - oldPosition.x < 0) {
        this.model.rotation.y = -rotationAngle - Math.PI / 2;
    } else if (newPosition.z - oldPosition.z < 0 && newPosition.x - oldPosition.x > 0) {
        this.model.rotation.y = rotationAngle + Math.PI;
    }
    else {
        if (newPosition.z - oldPosition.z < 0) {
            this.model.rotation.y = Math.PI - rotationAngle;
        } else {
            this.model.rotation.y = rotationAngle;

        }
    }

    var _this = this;

    var walking = this._scene.beginAnimation(this.model.skeleton, this.beginWalking, this.endWalking, true, 1);
    this._scene.beginDirectAnimation(_this.model, [_this.movingAnimation], 0, 20, false, 1.5*Game.speed, function () {
        walking.stop();

        if (!willAttack) {

            _this._scene.beginAnimation(_this.model.skeleton, _this.beginWalking - 11, _this.beginWalking - 10 , false, 1.5*Game.speed, function () {
                _this.model.rotation.y = Math.PI;
            });
        }
        else {
            Game.soundManager.playEnemyAttack();
            _this._scene.beginAnimation(_this.model.skeleton, _this.beginAttacking, _this.endAttacking, false, 2*Game.speed, function () {
                _this.model.rotation.y = Math.PI;
                GUI.showDefeatDialog();
            });

        }
        if (callback) {
            callback();
        }

    })
};

Enemy.prototype.die = function (callback) {
    if(callback){
        callback();
    }
    // this._scene.beginAnimation(this.model.skeleton, this.beginDying, this.endDying, false, 1,function () {
    //     if(callback){
    //         callback();
    //     }
    // });
};

Enemy.prototype.setBoardPosition = function (row, column) {
    this._boardPosition = {row: row, column: column};
};
Enemy.prototype.getBoardPosition = function () {
    if (this._boardPosition) {
        return {row: this._boardPosition.row, column: this._boardPosition.column};
    }
};
Enemy.prototype.reset = function () {

};