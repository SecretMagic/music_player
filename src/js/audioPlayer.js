(function($, root) {
    'use strict';

    var $scope = $(document.body);
    var AudioPlayer = function() {
        //audio 对象
        this.audio = new Audio();
        //当前播放状态
        this.status = "pause";
    };
    AudioPlayer.prototype = {
        //播放
        play: function() {
            this.audio.play();
            this.status = "play";
        },
        //暂停
        pause: function() {
            this.audio.pause();
            this.status = "pause";
        },
        //跳转播放
        jumpToPlay: function(time) {
            this.audio.currentTime = time;
            this.play();
        },
        setAudioSource: function(src) {
            var audio = this.audio;
            audio.src = src;
            audio.load();
        },
        getStatus: function() {
            return this.status;
        }
    }

    root.AudioPlayer = AudioPlayer;

})(window.Zepto, window.player || (window.player = {}));