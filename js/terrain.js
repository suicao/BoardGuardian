var Terrain = function (assetManager, scene) {
    this.light = new BABYLON.DirectionalLight("dir", new BABYLON.Vector3(1, -1, -2), scene);
    this.light.position = new BABYLON.Vector3(-300, 300, 600);
    this.shadowGenerator = new BABYLON.ShadowGenerator(1024, this.light);
    assetManager.reset();
    var meshTask = assetManager.addMeshTask("load terrain", "", "./assets/terrain/castle/", "castle.babylon");
    assetManager.load();
    meshTask.onSuccess = function (task) {
        for (var i = 0; i < task.loadedMeshes.length; i++) {
            task.loadedMeshes[i].material.specularColor = BABYLON.Color3.Black();
            task.loadedMeshes[i].scaling.x = 50;
            task.loadedMeshes[i].scaling.y = 50;
            task.loadedMeshes[i].scaling.z = 50;

            task.loadedMeshes[i].position.y = 1.5;
            task.loadedMeshes[i].position.z = -15;
            task.loadedMeshes[i].position.x = -2;

            task.loadedMeshes[i].material.backFaceCulling = task.loadedMeshes[i].name != "Castle_Exterior";
            if (task.loadedMeshes[i].name == "Ground_and_Fountain" ||
                task.loadedMeshes[i].name == "wagen1_Lp_" ||
                task.loadedMeshes[i].name == "Cube" ||
                task.loadedMeshes[i].name == "Barrel.002") {
                terrain.shadowGenerator.getShadowMap().renderList.push(task.loadedMeshes[i]);
            }
            if (task.loadedMeshes[i].name == "Ground_and_Fountain") {
                task.loadedMeshes[i].receiveShadows = true;
            }
        }
    };
};