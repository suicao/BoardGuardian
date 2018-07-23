"use strict";

var HeroType = {
    QUEEN: 0, //Hậu
    ROOK: 1, //Xe
    BISHOP: 2, //Tượng
    KNIGHT: 3, //Mã,
    ROOK2: 4,
    BISHOP2: 5,
    KNIGHT2: 6
};

var AnimationType = {
    MOVE: 0,
    ATTACK: 1,
    DIE: 2
};
var Hero = function (heroType, heroModel, scene, initialPosition) {
    //this có thể trỏ lung tung nhé nên lưu lại _this trỏ tới object hero
    var _this = this;
    _this._scene = scene;
    _this.heroType = heroType;
    _this.model = heroModel;
    _this.model.tag = "Hero";
    _this.model.actionManager = new BABYLON.ActionManager(scene);
    // _this.model.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function(ev){
    //     canvas.style.cursor = 'url(../assets/gui/cursorHand_blue.png), pointer';
    // }));
    switch (heroType) {

        case HeroType.QUEEN:
            _this.beginWalking = 32;
            _this.endWalking = 64;
            _this.beginAttacking = 1;
            _this.endAttacking = 20;
            break;
        case HeroType.BISHOP2:
        case HeroType.BISHOP:
            _this.beginWalking = 9;
            _this.endWalking = 42;
            _this.beginAttacking = 50;
            _this.endAttacking = 80;
            break;
        case HeroType.KNIGHT2:
        case HeroType.KNIGHT:
            _this.beginWalking = 19;
            _this.endWalking = 50;
            _this.beginAttacking = 52;
            _this.endAttacking = 74;
            break;
        case HeroType.ROOK2:
        case HeroType.ROOK:
            _this.beginWalking = 18;
            _this.endWalking = 50;
            _this.beginAttacking = 42 + 9;
            _this.endAttacking = 56 + 9;
            break;
    }
    _this.model.material.specularColor = BABYLON.Color3.Black();
    _this.model.rotation.z = -Math.PI;
    _this.model.rotation.x = Math.PI;

    _this.model.position.x = initialPosition.x;
    _this.model.position.z = initialPosition.z;
    _this.model.position.y = 3.6;
    _this.model.scaling.x = 1.4;
    _this.model.scaling.y = 1.4;
    _this.skeleton = heroModel.skeleton;
    _this.model.scaling.z = 1.4;
    //Quick fix
    if (heroType == HeroType.KNIGHT || heroType == HeroType.KNIGHT2) {
        _this.model.position.y = 0.8;
        _this.model.scaling.x = 2.3;
        _this.model.scaling.y = 2.3;
        _this.model.scaling.z = 2.3;
    }
    if (heroType == HeroType.BISHOP || heroType == HeroType.BISHOP2) {
        _this.model.position.y = 3;
    }
    this.movingAnimation = new BABYLON.Animation("movingAnimation", "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

};
Hero.prototype.constructor = Hero;

//TODO set player size
Hero.WIDTH = 0;
Hero.HEIGHT = 0;


Hero.prototype.move = function (row, column, callback, moveInstantly) {
    var keys = [];
    var oldPosition = this.model.position.clone();

    var newPosition = gameBoard.getBasePosition(row, column);
    newPosition.y = oldPosition.y;

    if (moveInstantly) {
        this.model.position.x = newPosition.x;
        this.model.position.z = newPosition.z;
        return;
    }

    var distance =
        Math.sqrt((oldPosition.x - newPosition.x) * (oldPosition.x - newPosition.x) + (oldPosition.z - newPosition.z) * (oldPosition.z - newPosition.z));
    keys.push({
        frame: 0,
        value: oldPosition
    });

    keys.push({
        frame: 3 * distance,
        value: newPosition
    });
    this.movingAnimation.setKeys(keys);
    this.model.animations = [];
    var walking = {};
    walking = this._scene.beginAnimation(this.model.skeleton, this.beginWalking, this.endWalking, true, 3*Game.speed);


    var _this = this;
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

    if (this.heroType == HeroType.KNIGHT || this.heroType == HeroType.KNIGHT2) {
        this.model.rotation.y = fixKnightRotationAngle(this.model.rotation.y);
        if (this.model.rotation.y == -120 / 180 * Math.PI) {
            this.model.rotation.y = -150 / 180 * Math.PI;
        }else if (this.model.rotation.y == -150 / 180 * Math.PI) {
            this.model.rotation.y = -120 / 180 * Math.PI;
        }
    }
    if (gameBoard.getBase(row, column).character &&
        gameBoard.getBase(row, column).character.model.tag == "Enemy") {
        var attackPosition = gameBoard.getBasePosition(row, column).clone();
        attackPosition.x = newPosition.x * (distance - 5) / (distance) + oldPosition.x * 5 / distance;
        attackPosition.z = newPosition.z * (distance - 5) / (distance) + oldPosition.z * 5 / distance;
        keys.splice(1, 0, {
            frame: 3 * distance - 15,
            value: attackPosition
        });
        //Đi đến gần
        this._scene.beginDirectAnimation(this.model, [this.movingAnimation], 0, 3 * distance - 15, false, 2*Game.speed, function () {
            _this.model.position.x = attackPosition.x;
            _this.model.position.z = attackPosition.z;
            //Rồi dừng lại
            walking.stop();
            var t = 1.5;
            if (_this.heroType == HeroType.BISHOP || _this.heroType == HeroType.BISHOP2
            ||_this.heroType == HeroType.KNIGHT || _this.heroType == HeroType.KNIGHT2 ) {
                t = 2.5;
            }
            //Tấn công
            Game.soundManager.playHeroAttack(_this.heroType);
            _this._scene.beginAnimation(_this.model.skeleton, _this.beginAttacking, _this.endAttacking, false, t*Game.speed, function () {
                //Đi tiếp
                walking = _this._scene.beginAnimation(_this.model.skeleton, _this.beginWalking, _this.endWalking, true, 3*Game.speed);
                _this._scene.beginDirectAnimation(_this.model, [_this.movingAnimation], 3 * distance - 15, 3 * distance, false, 1.5*Game.speed, function () {
                    walking.stop();

                    _this._scene.beginAnimation(_this.model.skeleton, _this.beginWalking - 9, _this.beginWalking - 8, false, 4*Game.speed, function () {
                        Game.isDisabled = false;
                        if (callback) {
                            _this.model.rotation.y = 0;
                            callback();
                        }
                    });

                });
            });

        });
    } else {
        this.movingAnimation.setKeys(keys);
        this._scene.beginDirectAnimation(this.model, [this.movingAnimation], 0, 3 * distance, false, 1.5*Game.speed, function () {
            walking.stop();
            _this._scene.beginAnimation(_this.model.skeleton, _this.beginWalking - 9, _this.beginWalking - 8, false, 1.5*Game.speed, function () {
                Game.isDisabled = false;
                if (callback) {
                    _this.model.rotation.y = 0;
                    callback();
                }
            });

        });
    }
};

//Người chơi đứng ở 1 ô gần ô có quái, tấn công, rồi di chuyển đến ô đó (toPosition)
Hero.prototype.attack = function (toPosition) {

};

Hero.prototype.setBoardPosition = function (row, column) {
    this._boardPosition = {row: row, column: column};
};
Hero.prototype.getBoardPosition = function () {
    if (this._boardPosition) {
        return {row: this._boardPosition.row, column: this._boardPosition.column};
    }
};
Hero.prototype.reset = function () {

};

var fixKnightRotationAngle = function (rotationAngle) {
    rotationAngle = rotationAngle / Math.PI * 180;
    var correctAngle = [30, 60, -30, -60, -150, -120, 150, 120];
    var min = 0;
    for (var i = 0; i < correctAngle.length; i++) {
        var d = correctAngle[i] - rotationAngle;
        if (Math.abs(d) < Math.abs(correctAngle[min] - rotationAngle)) {
            min = i;
        }
    }
    return correctAngle[min] / 180 * Math.PI;
};