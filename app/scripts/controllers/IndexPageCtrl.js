angular.module('videos').controller('IndexPageCtrl', function( $scope, VideosService, $routeParams ){

    $scope.input = {};

    $scope.loadAll = function(){
        VideosService.listVideos().then(function( result ){
           $scope.videos = result.data;
            if ( $routeParams.videoId === 'any' ){
                $scope.mainVideo = _.first($scope.videos);
            }else{
                $scope.mainVideo = _.find($scope.videos,{id: $routeParams.videoId});

            }

            _.remove($scope.videos,$scope.mainVideo);

            $scope.mainVideo.media = {
                    sources: [{
                        src: $scope.mainVideo.url,
                        type: 'video/webm'
                    }]
                }
        });
    };
    $scope.loadAll();

    $scope.submitInput = function(){
        VideosService.addVideo($scope.input).then(function(){ $scope.loadAll(); });
    };

    $scope.submitRating = function(rating){
        VideosService.addRating($scope.mainVideo.id, rating).then(function( result ){
            $scope.mainVideo.rating = result.data;
        });
    };

    $scope.submitComment = function(){
        VideosService.addComment($scope.mainVideo.id, $scope.comment).then(function(){
           $scope.comment = '';
        });
    };

});