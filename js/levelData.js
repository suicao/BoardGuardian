var levelData = {
    get: function (level) {
        var totalEnemy = 1;
        var heroTypeList = [];
        var enemySpawnPerRound = 1;
        var enemySpawnLocation = [];
        var heroSpawnLocation = [];
        var solution = [];
        switch (level) {
            case 1:
                totalEnemy = 7;
                heroTypeList = [HeroType.QUEEN];
                heroSpawnLocation = [3];
                enemySpawnPerRound = [1, 1, 1, 1, 1, 1, 1, 1];
                enemySpawnLocation = [1, 6, 3, 1, 5, 3, 7];
                solution = [
                    [0, 7, 2], [0, 7, 1], [0, 1, 1], [0, 1, 6], [0, 1, 3], [0, 1, 1], [0, 1, 5],
                    [0, 1, 3], [0, 1, 7]
                ];
                break;
            case 2:
                totalEnemy = 9;
                heroTypeList = [HeroType.QUEEN];
                heroSpawnLocation = [2];
                enemySpawnPerRound = [2, 2, 1, 2, 1, 1];
                enemySpawnLocation = [1, 7, 0, 5, 6, 0, 3, 1, 7];
                solution = [
                    [0, 0, 2], [0, 0, 1], [0, 0, 5], [0, 0, 6], [0, 0, 3], [0, 0, 1], [0, 0, 7], [0, 6, 7], [0, 6, 0], [0, 5, 0]
                ];
                break;
            case 3:
                totalEnemy = 14;
                heroTypeList = [HeroType.QUEEN, HeroType.ROOK];
                heroSpawnLocation = [5, 2];
                enemySpawnPerRound = [2, 1, 2, 1, 2, 1, 2, 1, 2];
                enemySpawnLocation = [1, 4, 7, 2, 7, 3, 0, 7, 1, 6, 7, 0, 1, 6];
                solution = [
                    [0, 6, 4], [0, 0, 4], [0, 0, 7], [1, 0, 2], [0, 1, 6], [0, 0, 7], [1, 0, 1], [1, 6, 1],
                    [0, 0, 0], [0, 0, 1], [1, 6, 3], [1, 6, 0], [0, 5, 6], [1, 6, 5], [0, 4, 6]
                ];
                break;
            case 4:
                totalEnemy = 12;
                heroTypeList = [HeroType.ROOK];
                heroSpawnLocation = [4];
                enemySpawnPerRound = [1, 1, 1, 1, 1, 1, 2, 4];
                enemySpawnLocation = [2, 3, 7, 6, 4, 6, 2, 6, 0, 1, 2, 3];
                solution = [
                    [0, 0, 4], [0, 0, 2], [0, 0, 3], [0, 0, 7], [0, 0, 6], [0, 0, 4], [0, 0, 6], [0, 0, 5],
                    [0, 0, 3], [0, 0, 1], [0, 2, 1], [0, 2, 2], [0, 4, 2], [0, 6, 2], [0, 6, 0]
                ];
                break;
            case 5:
                totalEnemy = 13;
                heroTypeList = [HeroType.ROOK, HeroType.ROOK2];
                heroSpawnLocation = [1, 6];
                enemySpawnPerRound = [2, 2, 1, 2, 1, 1, 2, 1, 1];
                enemySpawnLocation = [4, 5, 3, 7, 2, 1, 5, 2, 7, 0, 1, 5, 3];
                solution = [
                    [1, 7, 5], [1, 0, 5], [1, 0, 3], [1, 0, 2], [1, 0, 5], [1, 0, 2], [1, 0, 7], [1, 5, 7],
                    [0, 7, 4], [1, 5, 1], [1, 3, 1], [1, 3, 5], [1, 3, 3], [1, 3, 0], [1, 7, 0]
                ];
                break;
            case 6:
                totalEnemy = 13;
                heroTypeList = [HeroType.BISHOP, HeroType.ROOK];
                heroSpawnLocation = [2, 5];
                enemySpawnPerRound = [1, 1, 1, 1, 1, 1, 1, 6];
                enemySpawnLocation = [2, 3, 7, 6, 4, 6, 6, 0, 1, 2, 3, 4, 5];
                solution = [
                    [1, 0, 5], [1, 0, 2], [1, 0, 3], [1, 0, 7], [1, 0, 6], [1, 0, 4], [1, 0, 6],
                    [1, 0, 5], [1, 0, 6], [0, 6, 3], [0, 5, 2], [0, 3, 0], [0, 4, 1], [0, 5, 2], [0, 6, 3], [0, 7, 4]

                ];
                break;
            case 7:
                totalEnemy = 5;
                heroTypeList = [HeroType.BISHOP];
                heroSpawnLocation = [3];
                enemySpawnPerRound = [3, 2];
                enemySpawnLocation = [0, 2, 4, 1, 3];
                solution = [
                    [0, 4, 6], [0, 0, 2], [0, 1, 1], [0, 5, 5], [0, 3, 3], [0, 4, 4], [0, 3, 3], [0, 6, 0], [0, 5, 1]
                ];
                break;
            case 8:
                totalEnemy = 12;
                heroTypeList = [HeroType.BISHOP, HeroType.BISHOP2];
                heroSpawnLocation = [2, 5];
                enemySpawnPerRound = [6, 0, 0, 0, 0, 6];
                enemySpawnLocation = [2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5];
                solution = [
                    [1, 5, 7], [1, 0, 2], [1, 1, 3], [1, 2, 4], [1, 3, 5], [1, 4, 6], [1, 5, 7],
                    [1, 1, 3], [1, 2, 2], [1, 3, 1], [1, 4, 0], [0, 5, 4], [0, 6, 5]
                ];
                break;
            case 9:
                totalEnemy = 8;
                heroTypeList = [HeroType.ROOK, HeroType.KNIGHT];
                heroSpawnLocation = [5, 2];
                enemySpawnPerRound = [4, 0, 0, 4];
                enemySpawnLocation = [1, 3, 5, 7, 0, 2, 4, 6];
                solution = [
                    [1, 5, 1], [1, 3, 0], [1, 1, 1], [1, 2, 3], [1, 3, 5], [1, 4, 7], [1, 2, 6], [1, 3, 4],
                    [1, 4, 2], [1, 5, 0]

                ];
                break;
            case 10:
                totalEnemy = 9;
                heroTypeList = [HeroType.KNIGHT, HeroType.KNIGHT2];
                heroSpawnLocation = [2, 5];
                enemySpawnPerRound = [2, 1, 1, 2, 0, 1, 1, 1];
                enemySpawnLocation = [0, 7, 7, 4, 2, 6, 3, 4, 4];
                solution = [
                    [1, 5, 6], [0, 5, 3], [0, 3, 2], [0, 2, 0], [1, 3, 7], [1, 1, 6], [1, 3, 7],
                    [0, 3, 2], [0, 5, 3], [1, 5, 6], [0, 7, 4], [1, 4, 4], [1, 6, 3], [1, 4, 4]
                ];
                break;
            case 11:
                totalEnemy = 17;
                heroTypeList = [HeroType.ROOK, HeroType.KNIGHT];
                heroSpawnLocation = [5, 2];
                enemySpawnPerRound = [2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2];
                enemySpawnLocation = [7, 2, 2, 6, 3, 4, 6, 2, 0, 3, 0, 5, 0, 0, 5, 4, 3];
                solution = [
                    [0, 7, 7], [0, 0, 7], [0, 0, 3], [0, 0, 6], [0, 0, 4], [0, 0, 6], [0, 0, 2],
                    [0, 0, 3], [0, 0, 0], [0, 0, 1], [0, 0, 0], [0, 0, 5], [1, 6, 0], [1, 7, 2],
                    [0, 5, 5], [0, 5, 2], [0, 6, 2], [1, 5, 3], [0, 6, 4]
                ];
                break;
            case 12:
                totalEnemy = 14;
                heroTypeList = [HeroType.QUEEN];
                heroSpawnLocation = [4];
                enemySpawnPerRound = [2, 1, 2, 1, 2, 1, 2, 1, 2];
                enemySpawnLocation = [1, 7, 4, 0, 3, 1, 0, 7, 7, 2, 4, 7, 3, 5];
                solution = [
                    [0, 7, 7], [0, 0, 7], [0, 0, 4], [0, 0, 3], [0, 0, 1], [0, 4, 1], [0, 3, 0],
                    [0, 2, 0], [0, 2, 7], [0, 2, 4], [0, 5, 7], [0, 3, 7], [0, 3, 5], [0, 6, 2],
                    [0, 5, 3]
                ];
                break;
            case 13: // 14 trong game
                totalEnemy = 13;
                heroTypeList = [HeroType.ROOK, HeroType.KNIGHT];
                heroSpawnLocation = [5, 2];
                enemySpawnPerRound = [3, 1, 2, 1, 2, 1, 1, 1, 1];
                enemySpawnLocation = [2, 5, 7, 4, 0, 6, 3, 0, 4, 7, 4, 2, 1];
                solution = [
                    [0, 0, 5], [0, 0, 4], [0, 0, 3], [0, 0, 6], [0, 0, 3], [0, 0, 4], [0, 0, 7],
                    [0, 6, 7], [0, 6, 2], [0, 6, 0], [0, 5, 0], [1, 6, 0], [0, 5, 4], [1, 4, 1],
                    [1, 6, 2]
                ];
                break;
            case 14: // 25 trong game
                totalEnemy = 19;
                heroTypeList = [HeroType.QUEEN, HeroType.ROOK];
                heroSpawnLocation = [5, 2];
                enemySpawnPerRound = [2, 2, 3, 2, 2, 2, 3, 1, 2];
                enemySpawnLocation = [0, 4, 0, 7, 0, 2, 7, 0, 3, 0, 7, 0, 4, 0, 6, 7, 0, 0, 6];
                solution = [
                    [0, 0, 5], [0, 0, 4], [0, 0, 0], [0, 2, 0], [0, 0, 0], [0, 0, 1], [0, 2, 3],
                    [0, 4, 1], [0, 5, 2], [1, 7, 7], [0, 1, 6], [0, 4, 6], [0, 6, 4], [1, 7, 0],
                    [1, 7, 7], [1, 7, 0], [1, 7, 7], [1, 7, 0], [1, 7, 7], [1, 7, 0]
                ];
                break;
            case 15: // 27 trong game
                totalEnemy = 13;
                heroTypeList = [HeroType.QUEEN, HeroType.BISHOP];
                heroSpawnLocation = [5, 2];
                enemySpawnPerRound = [3, 2, 1, 2, 1, 2, 2];
                enemySpawnLocation = [0, 4, 7, 1, 5, 7, 2, 3, 1, 1, 7, 0, 5];
                solution = [
                    [0, 7, 4], [0, 0, 4], [0, 0, 1], [0, 0, 7], [0, 3, 7], [0, 3, 5], [1, 5, 0],
                    [0, 3, 3], [0, 3, 1], [0, 3, 7], [0, 3, 5], [1, 7, 2], [1, 5, 0], [1, 6, 1]
                ];
                break;
            case 16: // 28 trong game
                totalEnemy = 14;
                heroTypeList = [HeroType.QUEEN];
                heroSpawnLocation = [3];
                enemySpawnPerRound = [2, 4, 2, 0, 1, 1, 0, 1, 1, 1, 1];
                enemySpawnLocation = [1, 5, 0, 2, 4, 6, 3, 7, 4, 3, 5, 2, 4, 3];
                solution = [
                    [0, 5, 1], [0, 0, 1], [0, 0, 0], [0, 2, 2], [0, 1, 3], [0, 2, 2], [0, 4, 4],
                    [0, 6, 6], [0, 7, 5], [0, 6, 6], [0, 7, 7], [0, 7, 4], [0, 6, 3], [0, 7, 4],
                    [0, 6, 5], [0, 6, 2], [0, 6, 3], [0, 7, 4], [0, 6, 3]
                ];
                break;
            case 17: // 29 trong game
                totalEnemy = 9;
                heroTypeList = [HeroType.KNIGHT, HeroType.KNIGHT2];
                heroSpawnLocation = [2, 5];
                enemySpawnPerRound = [2, 1, 1, 2, 0, 1, 1, 1];
                enemySpawnLocation = [0, 7, 7, 4, 2, 6, 3, 4, 4];
                solution = [
                    [1, 5, 6], [0, 5, 3], [0, 4, 1], [0, 2, 0], [1, 3, 7], [1, 1, 6], [1, 3, 7],
                    [0, 3, 2], [0, 5, 3], [1, 5, 6], [0, 7, 4], [1, 4, 4], [1, 6, 3], [1, 4, 4]
                ];
                break;
            case 18: // 32 trong game
                totalEnemy = 18;
                heroTypeList = [HeroType.QUEEN];
                heroSpawnLocation = [2];
                enemySpawnPerRound = [3, 2, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1];
                enemySpawnLocation = [2, 4, 7, 2, 5, 2, 4, 5, 0, 7, 0, 2, 7, 1, 5, 6, 3, 0];
                solution = [
                    [0, 0, 2], [0, 0, 4], [0, 0, 2], [0, 0, 4], [0, 0, 5], [0, 4, 1], [0, 4, 5],
                    [0, 6, 7], [0, 1, 2], [0, 1, 7], [0, 7, 1], [0, 6, 0], [0, 6, 7], [0, 6, 0],
                    [0, 5, 1], [0, 3, 3], [0, 6, 6], [0, 7, 5], [0, 6, 6], [0, 6, 0]
                ];
                break;
            case 19: // 15 trong game
                totalEnemy = 13;
                heroTypeList = [HeroType.BISHOP, HeroType.BISHOP2];
                heroSpawnLocation = [2, 5];
                enemySpawnPerRound = [2, 1, 1, 2, 0, 2, 0, 1, 1, 0, 1, 1, 1];
                enemySpawnLocation = [5, 7, 4, 1, 0, 2, 1, 4, 1, 4, 5, 2, 7];
                solution = [
                    [0, 5, 0], [1, 5, 3], [0, 4, 1], [1, 3, 5], [1, 2, 4], [1, 3, 5], [1, 5, 7],
                    [0, 3, 0], [0, 4, 1], [0, 5, 2], [0, 4, 1], [1, 2, 4], [1, 1, 5], [0, 7, 4],
                    [0, 4, 1], [0, 3, 2], [1, 3, 7]
                ];
                break;
            case 20: // Tu nghi
                totalEnemy = 13;
                heroTypeList = [HeroType.KNIGHT, HeroType.KNIGHT2];
                heroSpawnLocation = [2, 5];
                enemySpawnPerRound = [2, 0, 2, 1, 1, 1, 2, 1, 1, 0, 1, 0, 1];
                enemySpawnLocation = [1, 6, 4, 6, 2, 2, 4, 1, 6, 6, 2, 0, 4];
                solution = [
                    [1, 5, 4], [1, 3, 5], [1, 1, 6], [1, 0, 4], [1, 1, 6], [1, 2, 4], [0, 5, 1],
                    [0, 3, 2], [0, 1, 1], [0, 3, 2], [1, 3, 6], [1, 2, 4], [1, 3, 6], [0, 2, 0],
                    [0, 3, 2], [0, 2, 4]
                ];
                break;
        }
        return {
            totalEnemy: totalEnemy,
            heroSpawnLocation: heroSpawnLocation,
            enemySpawned: 0,
            enemySpawnPerRound: enemySpawnPerRound,
            enemySpawnLocation: enemySpawnLocation,
            round: 0,
            enemyKilled: 0,
            score: 0,
            heroTypeList: heroTypeList,
            level: level,
            solution: solution
        }
    }
};