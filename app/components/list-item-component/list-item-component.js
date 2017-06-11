(function(){
    angular.module('listItem')
    .directive('listItem',function(){
        //DDO directive defination Object
        return {
            templateUrl :'/app/components/list-item-component/list-item.html',
            scope : {
                itemObj : '=',
                onUpdate :'&'
            },
            controller : function(){
                
            },
            controllerAs :'ctrl',
            bindToController:true
        };
    })
})()