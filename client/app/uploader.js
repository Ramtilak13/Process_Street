angular.module("application", []).component("uploader",{
    templateUrl: 'uploader.html',
    controller: uploaderController    
});

function uploaderController($scope){  
    var ctrl = this;    
    ctrl.title = 'AngularJS - Upload videos with Blueimp';
    ctrl.message = '';    
    var urlWistia = 'https://upload.wistia.com/?api_password=';
    var apiPassword = '75d9ee40b6662648b255f5dd45bbc64952198cd5f0b15541d712133c365b11c4';
    $scope.cssprogress = { 'width' : '0%', background : '#ff7400'};    
  
    $('#fileupload').fileupload({                        
        url : urlWistia + apiPassword,        
        add: function (e, data) {                               
            data.submit();
        },
        start: function(e){            
            $scope.cssprogress = {'width' : '0%', background : '#ff7400'};                        
            ctrl.message = 'Uploading file...';         
            $scope.$apply();
        },
        progress: function (e, data) {          
            var progress = parseInt(data.loaded / data.total * 100, 10);            
            $scope.cssprogress = {'width' : progress + '%', background : '#ff7400'};
            $scope.$apply();
        },
        done: function (e, data) {                                                                
            $scope.cssprogress = {'width' : '100%', background : '#5cb85c'};       
            var container = angular.element(document.querySelector('#video-container'));
            container.append('<div class="wistia_embed wistia_async_' + data.result.hashed_id + ' video-item"></div>');            
            ctrl.message = 'Your file has been uploaded!';
            $scope.$apply();            
        },
        fail: function(e, data){                        
            $scope.cssprogress = {'width' : '100%', background : 'red'};
            ctrl.message = 'An error has occurred: "' + data.errorThrown + '".' + ' Please check if Wistia account exceeded uploaded videos limit.';
            $scope.$apply();
        }
    });  
}