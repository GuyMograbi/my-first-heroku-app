angular.module('videos').controller('VideoPageCtrl', function($scope, VideosService, $routeParams ){
    VideosService.getVideo( $routeParams.videoId).then(function( result ){
        $scope.video = result.data;

        $scope.media =  {
            sources: [{
                src: $scope.video.url,
                type: 'video/webm'
            }]
        }
    });
});