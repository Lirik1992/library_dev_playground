(function(){
    angular.module('mainApp')
       .constant('constants', function() {
          return {
             APP_NAME: "BookLogger",
             AUTHORS: "D.Likharev(frontend), A.Puzikov(backend)",
             APP_VERSION: 1.0
          }
       })
}());