(function($, root) {
    'use strict';
    var $scope = $(document.body);

    //渲染歌曲信息
    function renderInfo(info) {
        var html = '<h1 class="song-name">' + info.song + '</h1>' +
            '<h3 class="singer-name">' + info.singer + '</h3>' +
            '<h3 class="album-name">' + info.album + '</h3>';
        $scope.find(".song-info").html(html);
    }

    function setImageBg(src) {
        var image = new Image();

        image.onload = function() {
            // 图片放入到 img 元素上
            $scope.find(".song-img img").attr("src", src);
            //背景模糊
            root.blurImg(this, $scope.find(".content-wrap"));
        }

        image.src = src;
    }

    root.render = function(data) {
        renderInfo(data);
        setImageBg(data.image);
    };

})(window.Zepto, window.player || (window.player = {}));