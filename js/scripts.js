        $(function() {

        jQuery.fn.center = function () {
            this.css("position","absolute");
            this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
                                                        $(window).scrollTop()) + "px");
            this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
                                                        $(window).scrollLeft()) + "px");
            return this;
        }

        // center the 'world' on the page
        $('.circle-big').center();

        // reposition the 'world' on resize
        $(window).resize(function(){
              $('.circle-big').center();   
              $('#vimeoiframeId').center();
        });

        // hide the video frame (until clicked)
        $('#vimeoiframeId').hide();

        // the video iFrame
        var f;

        // Listen for messages from the player
        if (window.addEventListener){
            window.addEventListener('message', onMessageReceived, false);
        }
        else {
            window.attachEvent('onmessage', onMessageReceived, false);
        }

        // Handle messages received from the player
        function onMessageReceived(e) {
            var data = JSON.parse(e.data);

            switch (data.event) {
                case 'ready':
                onReady();
                break;

                case 'finish':
                onFinish();
                break;
            }
        }


        // Call the API when a button is pressed
        $('a').on('click', function(e) {

            // prevent deafault click behavior
            e.preventDefault();

            // show and center the video frame
            $('#vimeoiframeId').fadeIn();
            $('#vimeoiframeId').center();

            // hide the 'worlds' interface
            $('.circle-big').fadeOut();

            // get ID and URL of the video to be shown
            var currentIframeId = $(this).attr('id');
            var currentSrc = $(this).attr('src');

            //grab just the numeric video ID from the Vimeo URL
            var currentvideoId = currentSrc.substring(currentSrc.lastIndexOf('/') + 1);


            // target the iFrame
            f = $('#vimeoiframeId iframe');

            f.attr('id', currentIframeId);
            f.attr('src', 'http://player.vimeo.com/video/' + currentvideoId + '?api=1&player_id='+ currentIframeId);

            url = f.attr('src').split('?')[0],
            action = 'play',
            status = $('.status'),
            action;

        });


        // Helper function for sending a message to the player
        function post(action, value) {
            var data = { method: action };

            if (value) {
                data.value = value;
            }

            f[0].contentWindow.postMessage(JSON.stringify(data), url);
        }

        function onReady() {

            // listen for the finish of the video
            post('addEventListener', 'finish');

            // if we clicked a video link, start playing it
            if(action){
                post(action);
            }
        }

        function onFinish() {

            // hide the video interface
            $('#vimeoiframeId').fadeOut();

            // show and center the worlds frame
            $('.circle-big').fadeIn();
            $('.circle-big').center();

        }

        }); 