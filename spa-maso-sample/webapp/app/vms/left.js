define(
    ['jquery', 'underscore', 'knockout', 'knockout.mapping', 'data/data', 'infra/store', 'infra/util', 'nls/nls', 'models/models', './top'],
    function ($, _, ko, mapping, data, store, util, resources, models, top) {
        var
            searchText        = ko.observable(''),
            posts             = ko.observableArray([]),
            filteredPosts     = ko.computed(function () {
                return _.filter(posts(), function (post) {
                    return post.title().toLocaleLowerCase().indexOf(searchText().toLocaleLowerCase()) > -1;
                });
            }),
            postMappingOption = {
                create: function(options) {
                    return new models.Post(options.data);
                }
            },

            getPosts = function (param) {
                $.when(data.deferredRequest('postList', searchText()))
                    .done(function(postList) {
                        mapping.fromJS(postList, postMappingOption, posts);

                        if ($.isFunction(param))
                            param(posts());
                    })
                    .fail(function(data, status) {
                        console.log('error: ' + status);
                    });
            }            
        ;

        top.searchText.subscribe(function (newValue) {
            searchText(newValue);
        });

        return {
            posts        : posts,
            getPosts     : getPosts,
            filteredPosts: filteredPosts
        };
    });