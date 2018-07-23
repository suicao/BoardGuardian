var SoundManager = function () {
    this.footStep = {};
    this.heroAttackQueen = new Audio('assets/sound/hero_sword.wav');
    this.heroAttackRook = new Audio('assets/sound/hero_axe.wav');
    this.heroAttackKnight= new Audio('assets/sound/hero_katana.wav');
    this.heroAttackBishop= new Audio('assets/sound/hero_mace.wav');
    this.enemyAttack = new Audio('assets/sound/enemy.wav');
    this.onGameClick = new Audio('assets/sound/on_game_click.wav');
    this.uiClick = new Audio('assets/sound/ui_click.wav');
    this.death = new Audio('assets/sound/death.wav');
    this.win = new Audio('assets/sound/win.mp3');
    this.background = new Audio('assets/sound/02 Lament.mp3');
};

SoundManager.prototype.constructor = SoundManager;
SoundManager.prototype.playFootStep = function () {
    
};
SoundManager.prototype.playBackground = function () {
    this.background.play();
    this.background.loop = true;
};
SoundManager.prototype.stopBackground = function () {
    this.background.pause();
};
SoundManager.prototype.playHeroAttack = function (heroType) {
    switch (heroType){
        case HeroType.QUEEN:
            this.heroAttackQueen.play();
            break;
        case HeroType.ROOK:
        case HeroType.ROOK2:
            this.heroAttackRook.play();
            break;
        case HeroType.KNIGHT:
        case HeroType.KNIGHT2:
            this.heroAttackKnight.play();
            break;
        case HeroType.BISHOP:
        case HeroType.BISHOP2:
            this.heroAttackBishop.play();
            break;
    }
};
SoundManager.prototype.playEnemyAttack = function () {
    this.enemyAttack.play();
};
SoundManager.prototype.playOnGameClick = function () {
    this.onGameClick.play();
};
SoundManager.prototype.playUIClick = function () {
    this.uiClick.play();
};
SoundManager.prototype.playDeath = function () {
    this.death.play();
};
SoundManager.prototype.playWin = function () {
    this.win.play();
};