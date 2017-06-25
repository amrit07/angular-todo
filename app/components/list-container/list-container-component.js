(function () {
    angular.module('myApp')
        .directive('listContainer', function () {
            return {
                templateUrl: '/app/components/list-container/list-container.html',
                scope: {},
                bindToController: true,
                controller: function ($http) {
                    var ctrl = this;
                    this.list = [];
                    this.getTodo = function () {
                        $http.get('/api/v1/todos').then(
                            function (response) {
                                console.log('response is', response.data);
                                ctrl.list = response.data;
                            },
                            function (err) {
                                console.log('error occured while fetching the items')
                            }
                        )
                    };
                    this.addTodo = function () {
                        if (!ctrl.item) {
                            return false;
                        }
                        var itemObj = {};
                        itemObj.title = ctrl.item;
                        itemObj.txt = '';
                        itemObj.isCompleted = false;

                        $http.post('/api/v1/todos', itemObj).then(
                            function (response) {
                                ctrl.list.push(response.data);
                                ctrl.item = '';
                                ctrl.txt = 'You are done with this item';
                                ctrl.calculate();
                            },
                            function (err) {
                                console.log('error occured while adding todoitem');
                            }
                        );

                    };

                    this.delete = function () {

                        alert('Hi');
                        //var olditemObj = this.addTodo;
                        //this.addTodo = [];

                    };

                    this.calculate = function () {
                        var complete = 0;
                        var remaining = 0;
                        ctrl.list.forEach(function (itemObj) {
                            if (itemObj.isCompleted) {
                                complete++;
                            } else {
                                remaining++;
                            }
                        });
                        var total = complete + remaining;
                        var txt = "data";
                        ctrl.completed = complete;
                        ctrl.remaining = remaining;
                        ctrl.total = total;

                    };
                    this.getTodo();

                },
                controllerAs: 'ctrl'
            };
        })
})();
