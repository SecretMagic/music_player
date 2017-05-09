(function ($, root) {
    'use strict';

    var $playList = $('<div class="play-list">' +
               '<div class="list-head">播放列表</div>' +
                '<ul class="play-list-container"></ul>' +
                '<div class="close-btn">关闭</div>' +
    '</div>'),
        tempIndex,
        $scope = $(document.body);

    // 渲染播放列表
    function renderList(data) {
        var html = '';

        for (var len = data.length, i = 0; i < len; i++) {
            var cur = data[i];

            html += '<li class="playlist-item" data-index="' + i + '"><h3>' + cur.song + '<span> - ' + cur.singer + '</span></h3></li>';
        }

        $playList.find('.play-list-container').html(html);
        $scope.append($playList);
    }

    function show (index) {
        if (index !== tempIndex) {
            signCurSong(index);
        }
        tempIndex = index;
        $playList.addClass('show');
    }

    function hide () {
        $playList.removeClass('show');
    }

    function bindEvent () {
        $playList.on('click', '.close-btn', function () {
            hide();
        });
        $playList.on('click', '.playlist-item', function () {
            var index = $(this).index();

            signCurSong(index);
            // 这里强制播放
            $scope.trigger('player:change', [index, true]);

            setTimeout(function () {
                hide();
            }, 500);
        });
    }

    function signCurSong (index) {
        $playList.find('.playing').removeClass('playing');
        $playList.find('li').eq(index).addClass('playing');
    }

    root.playList = {
        show: show,
        hide: hide,
        init: function (data) {
            $scope.append($playList);
            renderList(data);
            bindEvent();
        }
    };

})(window.Zepto, window.player || (window.player = {}));