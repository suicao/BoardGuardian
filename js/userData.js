var userData = {
    getSetting: function (key) {
        if(key == "free camera"){
            return window.localStorage.getItem("free camera");
        }else if(key == "speed"){
            var speed =  window.localStorage.getItem("speed");
            if(speed){
                return speed;
            }else{
                return 1;
            }
        }
    },
    setSetting: function (key, value) {
        window.localStorage.setItem(key,value);
    },
    //Số sao của level đã chơi
    getLevelRating: function (level) {
        var rating = window.localStorage.getItem("level "+parseInt(level));
        if(!rating){
            return 0;
        }else{
            return rating;
        }
    },
    //key, value
    setLevelRating: function (level, rate) {
        window.localStorage.setItem("level "+parseInt(level),rate)
    }
};