angular.module('videos',['ngRoute', 'vjs.video']).config(function($routeProvider){
    $routeProvider
        .when('/videos/:videoId', {
            templateUrl: 'app/views/videosIndex.html',
            controller: 'IndexPageCtrl'
        })
        .when('/videos/:videoId/details', {
            templateUrl: 'app/views/videoPage.html',
            controller: 'VideoPageCtrl'
        })
        .otherwise({ redirectTo: '/videos/any' });
});