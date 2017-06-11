(function(){
    angular.module('myApp')
    .directive('listContainer',function(){
        return {
            templateUrl : '/app/components/list-container/list-container.html',
            scope:{},
            bindToController:true,
            controller:function(){
                var ctrl = this;
                this.list = [];
                this.addTodo = function(){
                    if(!ctrl.item){
                        return false;
                    }
                    var itemObj = {};
                    itemObj.title = ctrl.item;
                    itemObj.isCompleted = false;
                    ctrl.list.push(itemObj);
                    ctrl.item = '';
                    ctrl.calculate();

                };
                this.calculate = function(){
                    var complete = 0;
                    var remaining = 0;
                    ctrl.list.forEach(function(itemObj){
                            if(itemObj.isCompleted){
                                complete++;
                            }
                            else{
                                remaining++;
                            }
                    });
                    var total = complete+remaining;
                    ctrl.completed = complete;
                    ctrl.remaining = remaining;
                    ctrl.total = total;
                };
               
            },
            controllerAs :'ctrl'
        };
    })
})()