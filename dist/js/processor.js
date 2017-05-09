(function($, root) {
    'use strict';
    var $scope = $(document.body),
        frameId,
        startTime,
        curDuration,
        lastPercentage = 0,
        $proTop = $scope.find(".pro-top");

    function formatTime(duration) {
        duration = Math.round(duration);
        var minute = Math.floor(duration / 60),
            second = duration - minute * 60;
        //确保四位
        if (minute < 10) {
            minute = "0" + minute;
        }
        if (second < 10) {
            second = "0" + second;
        }
        return minute + ":" + second;
    }

    function renderAllTime() {
        var formattedTime = formatTime(curDuration);

        $scope.find(".all-time").text(formattedTime)
    }

    function upDate(percentage) {
        var formattedTime = formatTime(percentage * curDuration);
        $scope.find(".cur-time").text(formattedTime);
        setProcess(percentage);
    }

    function setProcess(percentage) {
        var offset = (percentage - 1) * 100;

        $proTop.css({
            transform: "translateX(" + offset + "%)",
            "-webkit-transform": "translateX(" + offset + "%)",
        })
    }

    function startProgress() {
        startTime = new Date().getTime();
        cancelAnimationFrame(frameId);

        var frame = function() {
            var curTime = new Date().getTime(),
                passed = (curTime - startTime) / (curDuration * 1000),
                percentage = lastPercentage + passed; //加之前播放的时间比例

            if (percentage < 1) {
                //渲染 时间
                upDate(percentage);
                frameId = requestAnimationFrame(frame);
            } else {
                //播放结束
                upDate(1)
                cancelAnimationFrame(frameId);
            }
        };
        frame();
    }

    function stop() {
        var time = new Date().getTime();
        //记录当前播放比例
        lastPercentage += (time - startTime) / (curDuration * 1000);

        cancelAnimationFrame(frameId);
    }

    root.processor = {
        render: function(duration) {
            curDuration = duration;
            lastPercentage = 0;
            upDate(0); //将当前播放时间置为0
            renderAllTime();
        },
        start: function(percentage) {
            lastPercentage = percentage ? percentage : lastPercentage;
            startProgress();
        },
        stop: stop,
        upDate: upDate
    }
})(window.Zepto, window.player || (window.player = {}));