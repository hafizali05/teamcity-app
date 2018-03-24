export default class BuildListsController {
    constructor(
        $scope,
        $state,
        $http,
        $rootScope
    ){
        this.$scope = $scope;
        this.$state = $state;
        this.$rootScope = $rootScope;
        this.$http = $http;
        this.$scope.allbuilds = null;
    }
    $onInit() {
        this.onChanged();
        const chromeStorage = chrome.storage.sync;
        chromeStorage.get('teamcity',(ele)=>{
            this.populateBuilds(ele);
        })        
    }
    populateBuilds(ele){
        var url = `${ ele.teamcity.teamcityURL }/httpAuth/app/rest/builds`;
        this.$http.get(url)
            .then((response)=>{
                this.$scope.allbuilds = response.data.build;
            })
    }
    startWatch(data){
        chrome.storage.sync.get('teamcity',(ele)=>{
            var userdata = ele;
            console.log('userdata:',userdata.teamcity.build);
            if(Array.isArray(userdata.teamcity.build)){
                userdata.teamcity.build.push(data);
                console.log('userdata has build:',userdata);
                chrome.storage.sync.set({
                    'teamcity':userdata.teamcity
                },(error)=>{
                    console.log(error);
                })                
            } else {
                console.log('userdata does not have build:',userdata);                
                userdata.teamcity.build = [data];
                chrome.storage.sync.set(userdata,(error)=>{
                    console.log(error);
                })                
            }
        })
    }
    
    onChanged(){
        chrome.storage.onChanged.addListener(function(changes, nameSpace){
            console.log('changes, nameSpace',changes, nameSpace);
        });        
    }    
}