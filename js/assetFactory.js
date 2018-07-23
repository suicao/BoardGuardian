var AssetFactory = function (assetManager, queenLoadedCallback, rookLoadedCallback,knightLoadedCallback, bishopLoadedCallback,enemyLoadedCallback) {
    var _this = this;

    var rookTask = assetManager.addMeshTask("load model rook", "", "./assets/model/rook/", "barbarian.babylon");
    
    rookTask.onSuccess = function (task) {
        _this.rookModel = task.loadedMeshes[0];
        _this.rookModel.isVisible = false;
        _this.rookModel.skeleton = task.loadedSkeletons[0];
        if(rookLoadedCallback){
            rookLoadedCallback();
        }
    };

    var knightTask = assetManager.addMeshTask("load model knight", "", "./assets/model/knight/", "thief.babylon");

    knightTask.onSuccess = function (task) {
        _this.knightModel = task.loadedMeshes[0];
        _this.knightModel.isVisible = false;
        _this.knightModel.skeleton = task.loadedSkeletons[0];
        if(knightLoadedCallback){
            knightLoadedCallback();
        }
    };

    var enemyMeshTask = assetManager.addMeshTask("load model enemy", "", "./assets/model/troll/", "troll.babylon");
    enemyMeshTask.onSuccess = function(task){
        _this.enemyModel = task.loadedMeshes[0];
        _this.enemyModel.isVisible = false;
        _this.enemyModel.skeleton = task.loadedSkeletons[0];
        if(enemyLoadedCallback){
            enemyLoadedCallback();
        }
    };
    var queenTask = assetManager.addMeshTask("load model queen", "", "./assets/model/queen/", "queen.babylon");
    queenTask.onSuccess = function(task){
        _this.queenModel = task.loadedMeshes[0];
        _this.queenModel.isVisible = false;
        _this.queenModel.skeleton = task.loadedSkeletons[0];
        if(queenLoadedCallback){
            queenLoadedCallback();
        }
    };
    var bishopTask = assetManager.addMeshTask("load model bishop", "", "./assets/model/bishop/", "monk.babylon");
    bishopTask.onSuccess = function(task){
        _this.bishopModel = task.loadedMeshes[0];
        _this.bishopModel.isVisible = false;
        _this.bishopModel.skeleton = task.loadedSkeletons[0];
        if(bishopLoadedCallback){
            bishopLoadedCallback();
        }
    };
    assetManager.load();
};
AssetFactory.prototype.constructor = AssetFactory;
AssetFactory.prototype.getHeroModel = function (heroType) {
    var h = {};
    switch (heroType){
        case HeroType.KNIGHT2:
        case HeroType.KNIGHT:
            h = this.knightModel.clone();
            h.skeleton = this.knightModel.skeleton.clone();
            break;
        case HeroType.BISHOP:
        case HeroType.BISHOP2:
            h = this.bishopModel.clone();
            h.skeleton = this.bishopModel.skeleton.clone();
            break;
        case HeroType.QUEEN:
            h = this.queenModel.clone();
            h.skeleton = this.queenModel.skeleton.clone();
            break;
        case HeroType.ROOK2:
        case HeroType.ROOK:
            h = this.rookModel.clone();
            h.skeleton = this.rookModel.skeleton.clone();
            break;
    }
    h.isVisible = true;
    return h;
};
AssetFactory.prototype.getEnemyModel = function (enemyType) {
    var e = this.enemyModel.clone();
    e.skeleton = this.enemyModel.skeleton.clone();
    e.isVisible = true;
    return e;
};