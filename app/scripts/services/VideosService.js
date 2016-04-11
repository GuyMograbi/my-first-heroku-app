angular.module('videos').service('VideosService', function( $http ){
    this.addVideo = function( video ) {
        return $http.post('/videos',video);
    };

    this.getVideo = function(videoId){
        return $http.get('/videos/' + videoId);
    };

    this.listVideos = function(){
        return $http.get('/videos');
    };

    this.addRating = function(videoId, rating){
        return $http.post('/videos/' + videoId + '/rating' , { rating : rating } );
    };

    this.addComment =function(videoId, comment){
        return $http.post('/videos/' + videoId + '/comment', { comment: comment });
    }


});