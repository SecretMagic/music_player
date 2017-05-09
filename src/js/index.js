//高斯模糊
var $ = window.Zepto;
var $scope = $(document.body);
var root = window.player;
var dataUrl = "/mock/data.json";
var player = new root.AudioPlayer();
var processor = root.processor;
var controlManager;
var songList;

//自定义事件
$scope.on("player:change", function(e, index) {
    var curData = songList[index],
        status = player.getStatus();
    //渲染歌曲信息，背景图片 & 专辑图片
    root.render(curData);
    //渲染总时长
    processor.render(curData.duration);
    //设置新的 audio source
    player.setAudioSource(curData.audio);
    if (status === "play") {
        player.play();
        processor.start();
    }
})

$scope.on("player:jump", function(e, percentage) {
    var index = controlManager.index;
    player.jumpToPlay(Math.round(percentage * songList[index].duration));
    processor.start(percentage);
    $scope.find(".play-btn").addClass("playing");
})

function bindTouch() {
    var $slidePoint = $scope.find(".slide-point"),
        offset = $scope.find(".pro-wrap").offset(),
        offsetX = offset.left,
        width = offset.width,
        percentage;
    $slidePoint.on("touchstart", function() {
        //停止进度条
        processor.stop();
    }).on("touchmove", function(e) {
        var x = e.changedTouches[0].clientX - offsetX;
        percentage = x / width;

        if (percentage >= 1 || percentage <= 0) {
            return false;
        }

        processor.upDate(percentage);

        return false;
    }).on("touchend", function(e) {
        percentage = (e.changedTouches[0].clientX - offsetX) / width;

        $scope.trigger("player:jump", percentage);
    })
}

function bindClick() {
    //绑定点击事件
    $scope.on("click", ".next-btn", function() {
        //获取当前的 index
        var index = controlManager.next();
        $scope.trigger("player:change", index);

        // root.render(songList[index])

    })
    $scope.on("click", ".prev-btn", function() {
            //获取当前的 index
            var index = controlManager.prev();
            $scope.trigger("player:change", index);

        })
        //播放按钮
    $scope.on("click", ".play-btn", function() {
        if ($(this).hasClass("playing")) {
            player.pause();
            processor.stop()
        } else {
            player.play();
            processor.start();
        }
        $(this).toggleClass("playing");
    })
}

function getData(url, cb) {
    $.ajax({
        url: url,
        type: "GET",
        success: cb,
        error: function(e) {
            alert(e);
        }
    })
}

var success = function(data) {
    //渲染页面
    songList = data;
    bindClick();
    bindTouch();
    //实例化ControlManager
    controlManager = new root.ControlManager(data.length);
    $scope.trigger("player:change", 0);
    player.setAudioSource(data[0].audio)
}

getData(dataUrl, success);