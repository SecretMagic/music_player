// 控制播放器的歌曲序号 
// 根据操作返回应该得到的序号
(function($, root) {
    'use strict';
    var ControlManager = function(length) {
        this.length = length;
        this.index = 0;
    };
    ControlManager.prototype = {
        next: function() {
            return this.getIndex(1);
        },
        prev: function() {
            return this.getIndex(-1);
        },
        getIndex: function(val) {
            var index = this.index,
                len = this.length,
                curIndex = (index + val + len) % len;
            this.index = curIndex;
            return curIndex;
        }
    };
    root.ControlManager = ControlManager;


})(window.Zepto, window.player || (window.player = {}));