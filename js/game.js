"use strict";

var Game = Game || {};
var canvas, Engine;
var currentHero, hero, gameBoard, terrain;
var state;
var enemyList = [];
document.addEventListener("DOMContentLoaded", function () {
    canvas = document.getElementById("renderCanvas");

    Engine = new BABYLON.Engine(canvas, true);
    Engine.loadingUIText = "Board Guardians";

    window.addEventListener("resize", function () {
        if (Engine) {
            Engine.resize();
        }
    });

    Engine.runRenderLoop(function () {
        if (Game.scene) {
            Game.scene.render();
        }
    });
    initScene();

}, false);

var State = {
    IDLE: 0,
    PLAYER_MOVE: 1,
    ENEMY_MOVE: 2,
    OVER: 3,
    LOCKED: 4
};
var initGui = function () {

};
var initScene = function () {
    Game.scene = new BABYLON.Scene(Engine);
    Game.camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 5.5, 130, BABYLON.Vector3.Zero(), Game.scene);
    Game.camera.setTarget(BABYLON.Vector3.Zero());
    Game.camera.attachControl(canvas, false);
    Game.soundManager = new SoundManager();
    Game.soundManager.playBackground();
    updateSetting();

    Game.light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(0, 1, 0), Game.scene);
    Game.light.insensity = 0.5;
    Game.assetManager = new BABYLON.AssetsManager(Game.scene);
    var skyBox = BABYLON.Mesh.CreateSphere("skyBox", 100, 1000, Game.scene);

    BABYLON.Engine.ShadersRepository = "shaders/";

    var shader = new BABYLON.ShaderMaterial("gradient", Game.scene, "gradient", {});
    shader.setFloat("offset", 10);
    shader.setColor3("topColor", BABYLON.Color3.FromInts(0, 119, 255));
    shader.setColor3("bottomColor", BABYLON.Color3.FromInts(240, 240, 255));

    shader.backFaceCulling = false;

    skyBox.material = shader;
    initTerrain();
    initGui();

    initGameBoard();
    initLevel(2);
    initGameLogic();

    Game.state = State.IDLE;
};

var initTerrain = function () {
    terrain = new Terrain(Game.assetManager, Game.scene);

};
var initGameBoard = function () {
    gameBoard = new GameBoard(Game.assetManager, Game.scene);
};

var initLevel = function (level) {

    Game.currentLevel = levelData.get(level);
    if (enemyList.length > 0) {
        for (var i = 0; i < enemyList.length; i++) {
            enemyList[i].model.dispose();
        }
        enemyList = [];
    }
    GUI.updateLevel(Game.currentLevel.level, 5);
    GUI.updateEnemyStatus(Game.currentLevel.enemySpawned, Game.currentLevel.totalEnemy);
    gameBoard.reset();
    if (!Game.assetFactory) {
        hero = [];
        Game.assetFactory = new AssetFactory(Game.assetManager,
            function () {
                if (Game.currentLevel.heroTypeList.indexOf(HeroType.QUEEN) >= 0) {
                    var initColumn = Game.currentLevel.heroSpawnLocation[Game.currentLevel.heroTypeList.indexOf(HeroType.QUEEN)];
                    var h = new Hero(HeroType.QUEEN, Game.assetFactory.getHeroModel(HeroType.QUEEN), Game.scene, gameBoard.getBasePosition(7, initColumn));
                    hero.push(h);
                    currentHero = h;
                    gameBoard.setCharacterAtPosition(h, 7, initColumn);
                    gameBoard.highlightMovableBases(h.heroType, 7, initColumn);
                    terrain.shadowGenerator.getShadowMap().renderList.push(h.model);
                }
            }, function () {
                var ht = [HeroType.ROOK, HeroType.ROOK2, HeroType.BISHOP, HeroType.BISHOP2];
                for (var i = 0; i < ht.length; i++) {
                    if (Game.currentLevel.heroTypeList.indexOf(ht[i]) >= 0) {
                        var initColumn = Game.currentLevel.heroSpawnLocation[Game.currentLevel.heroTypeList.indexOf(ht[i])];
                        var h = new Hero(ht[i], Game.assetFactory.getHeroModel(ht[i]), Game.scene, gameBoard.getBasePosition(7, initColumn));
                        hero.push(h);
                        currentHero = h;
                        gameBoard.setCharacterAtPosition(h, 7, initColumn);
                        gameBoard.highlightMovableBases(h.heroType, 7, initColumn);
                        terrain.shadowGenerator.getShadowMap().renderList.push(h.model);
                    }
                }
            }, function () {
                var ht = [HeroType.KNIGHT, HeroType.KNIGHT2];
                for (var i = 0; i < ht.length; i++) {
                    if (Game.currentLevel.heroTypeList.indexOf(ht[i]) >= 0) {
                        var initColumn = Game.currentLevel.heroSpawnLocation[Game.currentLevel.heroTypeList.indexOf(ht[i])];
                        var h = new Hero(ht[i], Game.assetFactory.getHeroModel(ht[i]), Game.scene, gameBoard.getBasePosition(7, initColumn));
                        hero.push(h);
                        currentHero = h;
                        gameBoard.setCharacterAtPosition(h, 7, initColumn);
                        gameBoard.highlightMovableBases(h.heroType, 7, initColumn);
                        terrain.shadowGenerator.getShadowMap().renderList.push(h.model);
                    }
                }
            }, function () {
                var ht = [HeroType.BISHOP, HeroType.BISHOP2];
                for (var i = 0; i < ht.length; i++) {
                    if (Game.currentLevel.heroTypeList.indexOf(ht[i]) >= 0) {
                        var initColumn = Game.currentLevel.heroSpawnLocation[Game.currentLevel.heroTypeList.indexOf(ht[i])];
                        var h = new Hero(ht[i], Game.assetFactory.getHeroModel(ht[i]), Game.scene, gameBoard.getBasePosition(7, initColumn));
                        hero.push(h);
                        currentHero = h;
                        gameBoard.setCharacterAtPosition(h, 7, initColumn);
                        gameBoard.highlightMovableBases(h.heroType, 7, initColumn);
                        terrain.shadowGenerator.getShadowMap().renderList.push(h.model);
                    }
                }
            }
            , function () {
                addEnemy(function () {
                    if (Game.state != State.LOCKED) {
                        setTimeout(function () {
                            Game.state = State.IDLE;
                        }, 300);
                    }
                });
            });
    } else {

        for (i = 0; i < hero.length; i++) {
            if (Game.currentLevel.heroTypeList.indexOf(hero[i].heroType) < 0) {
                hero[i].model.dispose();
                hero[i].model = null;
                hero.splice(i, 1);
                i--;
            }
        }
        var currentHeroTypeList = [];
        for (i = 0; i < hero.length; i++) {
            currentHeroTypeList.push(hero[i].heroType);
        }
        for (i = 0; i < Game.currentLevel.heroTypeList.length; i++) {
            if (currentHeroTypeList.indexOf(Game.currentLevel.heroTypeList[i]) < 0) {
                var h = new Hero(Game.currentLevel.heroTypeList[i], Game.assetFactory.getHeroModel(Game.currentLevel.heroTypeList[i]), Game.scene, gameBoard.getBasePosition(7, 2));
                hero.push(h);
            }
        }
        for (i = 0; i < hero.length; i++) {
            var initColumn = Game.currentLevel.heroSpawnLocation[Game.currentLevel.heroTypeList.indexOf(hero[i].heroType)];
            gameBoard.setCharacterAtPosition(hero[i], 7, initColumn);
            hero[i].move(7, initColumn, null, true);
            hero[i].setBoardPosition(7, initColumn);
        }
        currentHero = hero[hero.length - 1];
        gameBoard.highlightMovableBases(hero[hero.length - 1].heroType, currentHero.getBoardPosition().row, currentHero.getBoardPosition().column);
        addEnemy(function () {
            if (Game.state != State.LOCKED) {
                setTimeout(function () {
                    Game.state = State.IDLE;
                }, 300);
            }
        });
    }

};

var initGameLogic = function () {

    Game.scene.onPointerDown = function (event, pickResult) {
        if (Game.state != State.IDLE || Game.isSolutionMode) {
            return;
        }
        if (pickResult.pickedMesh) {
            var mesh = pickResult.pickedMesh;
            if (mesh.tag == "Base Highlight") {
                mesh = mesh.fromBase;
            } else if (mesh.tag == "Enemy") {
                mesh = gameBoard.getBase(mesh.getBoardPosition().row, mesh.getBoardPosition().column);
            }
            switch (mesh.tag) {
                case "Hero":
                    Game.soundManager.playOnGameClick();
                    for (var i = 0; i < hero.length; i++) {
                        if (hero[i].model == mesh) {
                            currentHero = hero[i];
                            break;
                        }
                    }
                    gameBoard.highlightMovableBases(currentHero.heroType, currentHero.getBoardPosition().row, currentHero.getBoardPosition().column);

                    break;
                case "GameBoard":
                    break;
                case "Base":

                    if (mesh.movable) {
                        Game.soundManager.playOnGameClick();
                        if (Game.state != State.LOCKED) {
                            setTimeout(function () {

                                Game.state = State.PLAYER_MOVE;
                            }, 300)
                        }
                        heroMove(mesh.boardPosition.row, mesh.boardPosition.column);
                    }

            }
        }

    }
};


var heroMove = function (row, column, callback) {
    Game.currentLevel.round++;
    currentHero.move(row, column, function () {
        gameBoard.clearCharacterAtPosition(currentHero.getBoardPosition().row, currentHero.getBoardPosition().column);

        var c = gameBoard.getBase(row, column).character;
        gameBoard.setCharacterAtPosition(currentHero, row, column);
        for (var i = 0; i < enemyList.length; i++) {
            enemyList[i].model.position.y = 4;
        }
        if (c && c.tag == "Enemy") {
            c.model.dispose();
            enemyList.splice(enemyList.indexOf(c), 1);
            Game.currentLevel.score++;
            Game.currentLevel.enemyKilled++;
            GUI.updateScore(Game.currentLevel.score);
            GUI.updateEnemyStatus(Game.currentLevel.enemyKilled, Game.currentLevel.totalEnemy);
            if (Game.currentLevel.enemyKilled >= Game.currentLevel.totalEnemy) {
                var round = Game.currentLevel.round;
                var idealRound = Game.currentLevel.solution.length;
                var rating = 1;
                if (round <= idealRound) {
                    rating = 3;
                } else if (round - idealRound <= 3) {
                    rating = 2;
                } else {
                    rating = 1;
                }
                userData.setLevelRating(Game.currentLevel.level, rating);

                GUI.showWinDialog(rating);

            }

        }
        enemyMove(row, column, callback);

    });
};
var enemyMove = function (row, column, callback) {
    //Tất cả những quân tốt không bị chặn đầu đều được đi
    if (Game.state != State.LOCKED) {
        setTimeout(function () {

            Game.state = State.ENEMY_MOVE;

        }, 300);
    }
    for (var i = 0; i < enemyList.length; i++) {
        var enemy = enemyList[i];
        var pos = enemy.getBoardPosition();
        if (pos.row >= GameBoard.ROWS - 1) {
            Game.isDisabled = true;
            GUI.showDefeatDialog();
        }
        if (pos.row < GameBoard.ROWS - 1) {
            pos.row++;
        }
        if (!gameBoard.getCharacterAtPosition(pos.row, pos.column)) {
            if (enemy.getBoardPosition().row >= 0) {
                gameBoard.clearCharacterAtPosition(enemy.getBoardPosition().row, enemy.getBoardPosition().column);
            }
            enemy.move();
        }
    }
    //Tiếp theo là những quân bị chặn đầu nhưng chưa vào bàn
    //Sẽ đi vào ô gần chúng nhất mà chưa có ai, ưu tiên ô bên tay trái
    for (i = 0; i < enemyList.length; i++) {
        enemy = enemyList[i];
        pos = enemy.getBoardPosition();
        if (pos.row == -1) {
            enemy.move();
        }
    }

    addEnemy(function () {
        gameBoard.highlightMovableBases(currentHero.heroType, row, column);
        if (Game.state != State.LOCKED) {
            setTimeout(function () {

                Game.state = State.IDLE;
            }, 300);
        }
        if (callback) {
            callback();
        }
    });

};
var addEnemy = function (callback) {
    if (Game.currentLevel.enemySpawned >= Game.currentLevel.totalEnemy) {
        if (callback) {
            callback();
        }
        return;
    } else {
        GUI.updateEnemyStatus(Game.currentLevel.enemyKilled, Game.currentLevel.totalEnemy);
    }
    for (var i = 0; i < Game.currentLevel.enemySpawnPerRound[Game.currentLevel.round]; i++) {
        //Lúc spawn ra vẫn chưa vào bàn
        var r = -1;
        var c = Game.currentLevel.enemySpawnLocation[Game.currentLevel.enemySpawned];
        Game.currentLevel.enemySpawned++;
        var enemy = new Enemy(EnemyType.REGULAR, Game.assetFactory.getEnemyModel(), Game.scene, gameBoard.getBasePosition(r + 1, c));
        enemy.setBoardPosition(-1, c);
        enemyList.push(enemy);
        terrain.shadowGenerator.getShadowMap().renderList.push(enemy.model);
    }
    if (callback) {
        callback();
    }
};
var updateSetting = function () {
    Game.speed = userData.getSetting("speed");
    Game.isFreeCamera = userData.getSetting("free camera");
    Game.isFreeCamera = Game.isFreeCamera != 0;
    if (!Game.isFreeCamera) {
        Game.camera.lowerAlphaLimit = -Math.PI / 2;
        Game.camera.upperAlphaLimit = -Math.PI / 2;
        Game.camera.lowerBetaLimit = Math.PI / 8;
        Game.camera.upperBetaLimit = Math.PI / 2.5;
        Game.camera.lowerRadiusLimit = 80;
        Game.camera.upperRadiusLimit = 220;
    } else {
        Game.camera.lowerAlphaLimit = null;
        Game.camera.upperAlphaLimit = null;
        Game.camera.lowerBetaLimit = 0.01;
        Game.camera.upperBetaLimit = Math.PI;
        Game.camera.lowerRadiusLimit = null;
        Game.camera.upperRadiusLimit = null;
    }
};