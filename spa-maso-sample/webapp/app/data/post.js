﻿define(
    ['jquery', 'amplify'],
    function ($, amplify) {
        var
            init = function () {
                amplify.request.define('postList', 'ajax', {
                    url: 'api/post',
                    dataType: 'json',
                    type: 'GET'
                });

                amplify.request.define('postDetail', 'ajax', {
                    url: 'api/post/{id}',
                    dataType: 'json',
                    type: 'GET'
                });

                amplify.request.define('savePost', 'ajax', {
                    url: 'api/post',
                    dataType: 'json',
                    type: 'POST'
                });
            };


        init();

    }
);