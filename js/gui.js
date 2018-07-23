"use strict";
var GUI = {};
GUI.updateScore = function (score) {
    // var scoreText = document.getElementById("score-txt");
    // scoreText.innerHTML = ": "+score;
};
GUI.updateLevel = function (level, totalLevel) {
    //TODO TODO
    totalLevel = 20;
    var levelText = $("#level-txt");
    levelText.html(": " + level);
    var levelMeter = $("#level-meter");
    levelMeter.css('width', (level / totalLevel * 100 ) + "%");
};
GUI.updateEnemyStatus = function (enemyKilled, totalEnemy) {
    var enemyText = $("#enemy-txt");
    enemyText.html(": " + enemyKilled + "/" + totalEnemy);
    var enemyMeter = $("#enemy-meter");
    enemyMeter.css('width', (enemyKilled / totalEnemy * 100 ) + "%");
};
GUI.showWinDialog = function (rating) {
    Game.soundManager.playWin();
    Game.isDisabled = true;
    var winDialog = $("#win-dialog");
    winDialog.css('visibility', "visible");
    var starContainer = $("#win-dialog-rating-container");
    starContainer.html('');
    for (var i = 0; i < rating; i++) {
        starContainer.append("<img src='assets/gui/star_active_big.png' alt=''>");
    }
    while (i < 3) {
        starContainer.append("<img src='assets/gui/star_inactive_big.png' alt=''>");
        i++;
    }
};
GUI.hideWinDialog = function () {
    Game.isDisabled = false;
    var defeatDialog = $("#win-dialog");
    defeatDialog.css('visibility', "hidden");
};
GUI.showDefeatDialog = function () {
    Game.soundManager.playDeath();
    Game.isDisabled = true;
    var defeatDialog = $("#defeat-dialog");
    defeatDialog.css('visibility', "visible");
};
GUI.hideDefeatDialog = function () {
    Game.isDisabled = false;
    var defeatDialog = $("#defeat-dialog");
    defeatDialog.css('visibility', "hidden");
};

GUI.showWelcomeScreen = function () {
    Game.soundManager.playBackground();
    Game.isDisabled = true;
    var defeatDialog = $("#welcome-screen");
    defeatDialog.css('visibility', "visible");
    var homeDialog = $("#home-dialog");
    homeDialog.css('visibility', "visible");
};
GUI.hideWelcomeScreen = function () {
    Game.soundManager.stopBackground();
    Game.isDisabled = false;
    var defeatDialog = $("#welcome-screen");
    defeatDialog.css('visibility', "hidden");
    var homeDialog = $("#home-dialog");
    homeDialog.css('visibility', "hidden");
};


GUI.showLevelSelectDialog = function () {
    var levelSelectDialog = $("#level-select-dialog");
    levelSelectDialog.html('');
    levelSelectDialog.append("<div class='dialog-title' style='height: 100px'> " +
        "<div style='text-align: center'>" +
        "Select Level" +
        "</div>" +
        "</div>");
    var rows = 4, columns = 5;
    for (var i = 0; i < rows; i++) {
        var rowContent = '';
        console.log("wut");

        for (var j = 0; j < columns; j++) {
            var toLevel = (columns * (i) + j + 1);
            rowContent +=
                "<div onclick='selectLevel(" + toLevel + ")'>" +
                "<span>" + toLevel + "</span>"
                + "<br>" + "<span>";
            var rating = userData.getLevelRating(toLevel);
            for (var r = 0; r < rating; r++) {
                rowContent += "<img src='assets/gui/star_active.png' alt=''>"
            }
            while (r < 3) {
                rowContent += "<img src='assets/gui/star_inactive.png' alt=''>"
                r++
            }
            rowContent += "</span>" + "</div>";
        }
        rowContent = "<div class='level-row'>" + rowContent + "</div>";
        levelSelectDialog.append(rowContent);
    }
    levelSelectDialog.append(
        " <div class='dialog-button-container' >" +
        "<div>" +
        "<img src='assets/gui/back_btn.png'  style='top: -5px' onclick='backToLevelSelect();'>" +
        "</div>" +
        "</div>");
    levelSelectDialog.css("visibility", "visible");
};
var backToLevelSelect = function () {
    Game.soundManager.playUIClick();
    GUI.showWelcomeScreen();
    GUI.hideWinDialog();
    GUI.hideDefeatDialog();
    var settingDialog = $("#setting-dialog");
    settingDialog.css("visibility", "hidden");
    var levelSelectDialog = $("#level-select-dialog");
    levelSelectDialog.css("visibility", "hidden");
};
var showMenu = function () {
    Game.soundManager.playUIClick();
    Game.isSolutionMode = false;
    if (Game.state != State.IDLE) {
        return;
    }
    GUI.showWelcomeScreen();
};
var hideMenu = function () {
    Game.soundManager.playUIClick();
    GUI.hideWelcomeScreen();
};
var retry = function () {
    Game.soundManager.playUIClick();
    Game.isSolutionMode = false;
    if (Game.state != State.IDLE) {
        return;
    }
    GUI.hideDefeatDialog();
    initLevel(Game.currentLevel.level);
};
var next = function () {
    Game.soundManager.playUIClick();
    GUI.hideWinDialog();
    initLevel(Game.currentLevel.level + 1);
};
var showSolution = function () {
    Game.soundManager.playUIClick();
    if (Game.isSolutionMode || Game.state == State.LOCKED) {
        return;
    }
    GUI.hideDefeatDialog();
    GUI.hideWinDialog();
    Game.isSolutionMode = true;
    Game.state = State.LOCKED;
    initLevel(Game.currentLevel.level);
    var i = -1;
    var solution = Game.currentLevel.solution;
    var loop = function () {
        if (!Game.isSolutionMode) {
            setTimeout(function () {
                Game.state = State.IDLE;
            }, 500);
            return;
        }
        if (i < solution.length - 1) {
            i++;
            currentHero = hero[solution[i][0]];
            gameBoard.highlightMovableBases(currentHero.heroType, currentHero.getBoardPosition().row, currentHero.getBoardPosition().column);
            setTimeout(function () {
                heroMove(solution[i][1], solution[i][2], loop);
            }, 500);
        } else {
            Game.isSolutionMode = false;
            setTimeout(function () {
                Game.state = State.IDLE;
            }, 500);
        }
    };
    loop();
};

var startCampaign = function () {
    Game.soundManager.playUIClick();
    var homeDialog = $("#home-dialog");
    homeDialog.css('visibility', "hidden");
    GUI.showLevelSelectDialog();
};


var selectLevel = function (level) {
    Game.soundManager.playUIClick();
    GUI.hideWelcomeScreen();
    var levelDialog = $("#level-select-dialog");
    levelDialog.css('visibility', "hidden");
    Game.isDisabled = false;
    initLevel(level);
};

var saveSetting = function () {
    Game.soundManager.playUIClick();
    var freeCamera = $("#setting-camera");
    if (freeCamera.prop('checked')) {
        userData.setSetting("free camera", 1);
    } else {
        userData.setSetting("free camera", 0);
    }
    var speed = $("#setting-speed").val();
    speed = parseFloat(speed);
    if (speed == 50) {
        speed = 1;
    } else if (speed < 50) {
        speed = (50 + speed) / 100;
        //y = (50+x)/100
    } else {
        speed = (speed - 25) / 25;
        //y = (x - 25)/25
    }
    console.log("saved speed ", +speed);
    userData.setSetting("speed", speed);
    updateSetting();
    backToLevelSelect();
};
var showSetting = function () {
    Game.soundManager.playUIClick();
    var homeDialog = $("#home-dialog");
    homeDialog.css('visibility', "hidden");
    var settingDialog = $("#setting-dialog");
    settingDialog.css("visibility", "visible");

    var cameraCheckbox = $("#setting-camera");
    cameraCheckbox.prop('checked', Game.isFreeCamera);
    var speedRange = $("#setting-speed");
    var speed = parseFloat(Game.speed);
    if (speed == 1) {
        speedRange.val(50);
    } else if (speed > 1) {
        speedRange.val((speed + 1) * 25);
    } else {
        speedRange.val(100 * speed - 50);
    }
};