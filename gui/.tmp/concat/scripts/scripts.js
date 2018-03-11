'use strict';

/**
 * @ngdoc overview
 * @name yardStickGui2App
 * @description
 * # yardStickGui2App
 *
 * Main module of the application.
 */
angular
    .module('yardStickGui2App', [
        'ui.router',
        'ngAnimate',
        'ngSanitize',
        'mgcrea.ngStrap',
        'ncy-angular-breadcrumb',
        'mgo-angular-wizard',
        'ngResource',
        'ngFileUpload',
        'toaster',
        'ngDialog',
        'angularUtils.directives.dirPagination',
        'ngStorage',
        'vAccordion',
        'darthwade.dwLoading',
        'ui.bootstrap'


    ]);

'use strict';

angular.module('yardStickGui2App')
    .run(
        ['$rootScope', '$state', '$stateParams',
            function($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;

            }
        ]
    )
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider) {
            $urlRouterProvider
                .otherwise('main/environment');




            $stateProvider

                .state('app', {
                    url: "/main",
                    controller: 'ContentController',
                    templateUrl: "views/main.html",
                    ncyBreadcrumb: {
                        label: 'Main'
                    }
                })

            .state('app.environment', {
                    url: '/environment',
                    templateUrl: 'views/environmentList.html',
                    controller: 'MainCtrl',
                    ncyBreadcrumb: {
                        label: 'Environment'
                    }
                })
                .state('app.testcase', {
                    url: '/testcase',
                    templateUrl: 'views/testcaselist.html',
                    controller: 'TestcaseController',
                    ncyBreadcrumb: {
                        label: 'Test Case'
                    }
                })
                .state('app.testsuite', {
                    url: '/suite',
                    templateUrl: 'views/suite.html',
                    controller: 'SuiteListController',
                    ncyBreadcrumb: {
                        label: 'Test Suite'
                    }
                })
                .state('app.suitcreate', {
                    url: '/suitcreate',
                    templateUrl: 'views/testcasechoose.html',
                    controller: 'suitcreateController',
                    ncyBreadcrumb: {
                        label: 'Suite Create'
                    }
                })
                .state('app.testcasedetail', {
                    url: '/testdetail/:name',
                    templateUrl: 'views/testcasedetail.html',
                    controller: 'testcaseDetailController',
                    ncyBreadcrumb: {
                        label: 'Test Case Detail'
                    },
                    params: { name: null }
                })
                .state('app.suitedetail', {
                    url: '/suitedetail/:name',
                    templateUrl: 'views/suitedetail.html',
                    controller: 'suiteDetailController',
                    ncyBreadcrumb: {
                        label: 'Suite Detail'
                    },
                    params: { name: null }
                })
                .state('app.environmentDetail', {
                    url: '/envDetail/:uuid',
                    templateUrl: 'views/environmentDetail.html',
                    controller: 'DetailController',
                    params: { uuid: null, ifNew: null },
                    ncyBreadcrumb: {
                        label: 'Environment Detail'
                    }
                })
                .state('app.uploadImage', {
                    url: '/envimageDetail/:uuid',
                    templateUrl: 'views/uploadImage.html',
                    controller: 'ImageController',
                    params: { uuid: null },
                    ncyBreadcrumb: {
                        label: 'Upload Image'
                    }

                })
                .state('app.podUpload', {
                    url: '/envpodupload/:uuid',
                    templateUrl: 'views/podupload.html',
                    controller: 'PodController',
                    params: { uuid: null },
                    ncyBreadcrumb: {
                        label: 'Pod Upload'
                    }
                })
                .state('app.container', {
                    url: '/envcontainer/:uuid',
                    templateUrl: 'views/container.html',
                    controller: 'ContainerController',
                    params: { uuid: null },
                    ncyBreadcrumb: {
                        label: 'Container Manage'
                    }
                })
                .state('app.projectList', {
                    url: '/project',
                    templateUrl: 'views/projectList.html',
                    controller: 'ProjectController',
                    ncyBreadcrumb: {
                        label: 'Project'
                    }

                })
                .state('app.tasklist', {
                    url: '/task/:taskId',
                    templateUrl: 'views/taskList.html',
                    controller: 'TaskController',
                    params: { taskId: null },
                    ncyBreadcrumb: {
                        label: 'Task'
                    }

                })
                .state('app.taskLog', {
                    url: '/task/:taskId/log',
                    templateUrl: 'views/taskLog.html',
                    controller: 'TaskLogController',
                    params: { taskId: null },
                    ncyBreadcrumb: {
                        label: 'TaskLog'
                    }

                })
                .state('app.report', {
                    url: '/report/:taskId',
                    templateUrl: 'views/report.html',
                    controller: 'ReportController',
                    params: { taskId: null },
                    ncyBreadcrumb: {
                        label: 'Report'
                    }

                })
                .state('app.projectdetail', {
                    url: '/projectdetail/:projectId',
                    templateUrl: 'views/projectdetail.html',
                    controller: 'ProjectDetailController',
                    params: { projectId: null },
                    ncyBreadcrumb: {
                        label: 'Project Detail'
                    }

                })
                .state('app.taskModify', {
                    url: '/taskModify/:taskId',
                    templateUrl: 'views/taskmodify.html',
                    controller: 'TaskModifyController',
                    params: { taskId: null },
                    ncyBreadcrumb: {
                        label: 'Modify Task'
                    }


                })





        }
    ])
    .run();

'use strict';

angular.module('yardStickGui2App')
    .controller('MainCtrl', ['$scope', '$state', '$stateParams', 'mainFactory', 'Upload', 'toaster', 'ngDialog', '$localStorage', '$loading', '$interval',
        function($scope, $state, $stateParams, mainFactory, Upload, toaster, ngDialog, $localStorage, $loading, $interval) {


            init();
            $scope.project = 0;
            $scope.showloading = false;
            $scope.showEnvrionment = false;
            $scope.loadingOPENrc = false;
            $scope.uuidEnv = null;
            $scope.showPod = null;
            $scope.showImage = null;
            $scope.showContainer = null;
            $scope.showNextOpenRc = null;
            $scope.showNextPod = 1;
            $scope.displayContainerInfo = [];
            $scope.containerList = [{ value: 'create_influxdb', name: "InfluxDB" }, { value: 'create_grafana', name: "Grafana" }]

            $scope.$on('$destroy', function() {
                $interval.cancel($scope.intervalImgae)
            });
            $scope.showImageStatus = 0;






            function init() {


                $scope.gotoProject = gotoProject;
                $scope.gotoEnvironment = gotoEnvironment;
                $scope.gotoTask = gotoTask;
                $scope.gotoExcute = gotoExcute;
                $scope.gotoReport = gotoReport;
                $scope.deleteEnvItem = deleteEnvItem;
                $scope.addInfo = addInfo;
                $scope.submitOpenRcFile = submitOpenRcFile;
                $scope.uploadFilesPod = uploadFilesPod;
                $scope.uploadFiles = uploadFiles;
                $scope.showEnvriomentStatus = showEnvriomentStatus;
                $scope.openEnvironmentDialog = openEnvironmentDialog;
                $scope.getEnvironmentList = getEnvironmentList;
                $scope.gotoDetail = gotoDetail;
                $scope.addEnvironment = addEnvironment;
                $scope.createContainer = createContainer;
                $scope.chooseResult = chooseResult;

                getEnvironmentList();

            }

            function gotoProject() {
                $scope.project = 1;
            }

            function gotoEnvironment() {
                $scope.project = 0;
            }

            function gotoTask() {
                $scope.project = 2;
            }

            function gotoExcute() {
                $scope.project = 3;

            }

            function gotoReport() {
                $scope.project = 4;
            }
            $scope.skipPod = function skipPod() {
                $scope.showContainer = 1;

            }
            $scope.skipContainer = function skipContainer() {
                getEnvironmentList();
                ngDialog.close();
            }

            $scope.goToImage = function goToImage() {
                getImageList();
                $scope.showImage = 1;
            }
            $scope.goToPod = function goToPod() {
                $scope.showPod = 1;
            }
            $scope.goToPodPrev = function goToPodPrev() {
                $scope.showImage = null;

            }
            $scope.skipPodPrev = function skipPodPrev() {
                $scope.showImage = 1;
                $scope.showPod = null;

            }
            $scope.skipContainerPrev = function skipContainerPrev() {
                $scope.showPod = 1;
                $scope.showContainer = null;
            }

            $scope.envInfo = [
                { name: 'OS_USERNAME', value: '' },
                { name: 'OS_PASSWORD', value: '' },
                { name: 'OS_PROJECT_NAME', value: '' },
                { name: 'EXTERNAL_NETWORK', value: '' }
            ];


            function deleteEnvItem(index) {
                $scope.envInfo.splice(index, 1);
            }

            function addInfo() {
                var tempKey = null;
                var tempValue = null;
                var temp = {
                    name: tempKey,
                    value: tempValue
                }
                $scope.envInfo.push(temp);

            }

            function submitOpenRcFile() {
                $scope.showloading = true;

                var postData = {};
                postData['action'] = 'update_openrc';
                rebuildEnvInfo();
                postData['args'] = {};
                postData.args["openrc"] = $scope.postEnvInfo;
                postData.args['environment_id'] = $scope.uuidEnv;
                mainFactory.postEnvironmentVariable().post(postData).$promise.then(function(response) {
                    $scope.showloading = false;

                    if (response.status == 1) {

                        $scope.openrcInfo = response.result;
                        toaster.pop({
                            type: 'success',
                            title: 'create success',
                            body: 'you can go next step',
                            timeout: 3000
                        });
                        $scope.showEnvrionment = true;
                        // $scope.showImage = response.status;
                        $scope.showNextOpenRc = 1;
                    } else {
                        toaster.pop({
                            type: 'error',
                            title: 'fail',
                            body: response.error_msg,
                            timeout: 3000
                        });
                    }

                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });

                })
            }

            function uploadFiles($file, $invalidFiles) {
                $scope.openrcInfo = {};
                $scope.loadingOPENrc = true;
                $scope.displayOpenrcFile = $file;
                timeConstruct($scope.displayOpenrcFile.lastModified);
                Upload.upload({
                    url: Base_URL + '/api/v2/yardstick/openrcs',
                    data: { file: $file, 'environment_id': $scope.uuidEnv, 'action': 'upload_openrc' }
                }).then(function(response) {

                    $scope.loadingOPENrc = false;
                    if (response.data.status == 1) {
                        toaster.pop({
                            type: 'success',
                            title: 'upload success',
                            body: 'you can go next step',
                            timeout: 3000
                        });
                        $scope.openrcInfo = response.data.result;

                        getItemIdDetailforOpenrc();
                        $scope.showNextOpenRc = 1;
                    } else {
                        toaster.pop({
                            type: 'error',
                            title: 'fail',
                            body: response.error_msg,
                            timeout: 3000
                        });
                    }

                }, function(error) {
                    $scope.uploadfile = null;
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }

            //reconstruc EnvInfo
            function rebuildEnvInfo() {
                $scope.postEnvInfo = {};
                for (var i = 0; i < $scope.envInfo.length; i++) {
                    $scope.postEnvInfo[$scope.envInfo[i].name] = $scope.envInfo[i].value;
                }

            }
            function uploadFilesPod($file, $invalidFiles) {
                $scope.loadingOPENrc = true;

                $scope.displayPodFile = $file;
                timeConstruct($scope.displayPodFile.lastModified);
                Upload.upload({
                    url: Base_URL + '/api/v2/yardstick/pods',
                    data: { file: $file, 'environment_id': $scope.uuidEnv, 'action': 'upload_pod_file' }
                }).then(function(response) {

                    $scope.loadingOPENrc = false;
                    if (response.data.status == 1) {
                        toaster.pop({
                            type: 'success',
                            title: 'upload success',
                            body: 'you can go next step',
                            timeout: 3000
                        });

                        $scope.podData = response.data.result;


                    } else {
                        toaster.pop({
                            type: 'error',
                            title: 'fail',
                            body: response.error_msg,
                            timeout: 3000
                        });
                    }

                }, function(error) {
                    $scope.uploadfile = null;
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }

            function timeConstruct(array) {
                var date = new Date(1398250549490);
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                var D = date.getDate() + ' ';
                var h = date.getHours() + ':';
                var m = date.getMinutes() + ':';
                var s = date.getSeconds();
                $scope.filelastModified = Y + M + D + h + m + s;

            }

            //display environment
            function showEnvriomentStatus() {
                $scope.showEnvironment = true;
            }

            //open Environment dialog
            function openEnvironmentDialog() {
                $scope.showEnvrionment = false;
                $scope.loadingOPENrc = false;
                $scope.uuidEnv = null;
                $scope.showPod = null;
                $scope.showImage = null;
                $scope.showContainer = null;
                $scope.showNextOpenRc = null;
                $scope.showNextPod = 1;
                $scope.displayContainerInfo = [];

                $scope.displayPodFile = null;
                $scope.name = null;
                $scope.openrcInfo = null;
                $scope.envInfo = [
                    { name: 'OS_USERNAME', value: '' },
                    { name: 'OS_PASSWORD', value: '' },
                    { name: 'OS_PROJECT_NAME', value: '' },
                    { name: 'EXTERNAL_NETWORK', value: '' }
                ];
                $scope.displayOpenrcFile = null;
                $scope.podData = null;
                $scope.displayContainerInfo = null;
                ngDialog.open({
                    preCloseCallback: function(value) {
                        getEnvironmentList();
                    },
                    template: 'views/modal/environmentDialog.html',
                    scope: $scope,
                    className: 'ngdialog-theme-default',
                    width: 950,
                    showClose: true,
                    closeByDocument: false
                })
            }

            function getEnvironmentList() {
                $loading.start('key');

                mainFactory.getEnvironmentList().get().$promise.then(function(response) {
                    $scope.environmentList = response.result.environments;
                    $loading.finish('key');

                }, function(error) {
                    $loading.finish('key');
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });

                })
            }

            //go to detail page
            function gotoDetail(ifNew, uuid) {

                $state.go('app.environmentDetail', { uuid: uuid, ifNew: ifNew });
            }


            function addEnvironment(name) {
                mainFactory.addEnvName().post({
                    'action': 'create_environment',
                    args: {
                        'name': name
                    }
                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        toaster.pop({
                            type: 'success',
                            title: 'create name success',
                            body: 'you can go next step',
                            timeout: 3000
                        });
                        $scope.uuidEnv = response.result.uuid;
                        $scope.name = name;

                    }

                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }



            $scope.goBack = function goBack() {
                    $state.go('app.projectList');
                }
            $scope.displayContainerInfo = [];

            function createContainer(selectContainer) {

                $scope.showloading = true;
                mainFactory.runAcontainer().post({
                    'action': selectContainer.value,
                    'args': {
                        'environment_id': $scope.uuidEnv,
                    }
                }).$promise.then(function(response) {
                    $scope.showloading = false;
                    if (response.status == 1) {
                        toaster.pop({
                            type: 'success',
                            title: 'create container success',
                            body: 'you can go next step',
                            timeout: 3000
                        });

                        setTimeout(function() {
                            getItemIdDetail();
                        }, 10000);
                        $scope.ifskipOrClose = 1;
                    } else {
                        toaster.pop({
                            type: 'error',
                            title: 'Wrong',
                            body: response.result,
                            timeout: 3000
                        });
                    }

                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }

            function getConDetail(id) {
                mainFactory.containerDetail().get({
                    'containerId': id
                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        // $scope.podData = response.result;
                        $scope.displayContainerInfo.push(response.result.container);

                    }

                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })

            }

            function chooseResult(name) {
                $scope.selectContainer = name;
            }

            function getItemIdDetail() {
                $scope.displayContainerInfo = [];
                mainFactory.ItemDetail().get({
                    'envId': $scope.uuidEnv
                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        $scope.envName = response.result.environment.name;
                        $scope.containerId = response.result.environment.container_id;
                        if ($scope.containerId != null) {

                            var keysArray = Object.keys($scope.containerId);
                            for (var k in $scope.containerId) {
                                getConDetail($scope.containerId[k]);

                            }


                        } else {
                            $scope.podData = null;
                        }

                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }

            $scope.yardstickImage = {
                'yardstick-image': {
                    'name': 'yardstick-image',
                    'description': '',
                    'status': 'N/A'
                },
                'Ubuntu-16.04': {
                    'name': 'Ubuntu-16.04',
                    'description': '',
                    'status': 'N/A'
                },
                'cirros-0.3.5': {
                    'name': 'cirros-0.3.5',
                    'description': '',
                    'status': 'N/A'
                }
            };

            $scope.selectImageList = [];

            $scope.selectImage = function(name){
                $scope.selectImageList.push(name);
            }

            $scope.unselectImage = function(name){
                var index = $scope.selectImageList.indexOf(name);
                $scope.selectImageList.splice(index, 1);
            }

            $scope.uploadImage = function() {
                $scope.imageStatus = 0;
                $scope.showImageStatus = 1;
                $scope.showloading = true;

                var updateImageTask = $interval(function(){
                    mainFactory.ImageList().get({}).$promise.then(function(response){
                        if(response.status == 1){
                            var isOk = true;
                            angular.forEach($scope.selectImageList, function(ele){
                                if(typeof(response.result.images[ele]) != 'undefined' && response.result.images[ele].status == 'ACTIVE'){
                                    $scope.yardstickImage[ele] = response.result.images[ele];
                                }else{
                                    isOk = false;
                                }
                            });
                            if(isOk){
                                $interval.cancel(updateImageTask);
                                $scope.imageStatus = 1;
                            }
                        }else{
                            mainFactory.errorHandler1(response);
                        }
                    }, function(response){
                        mainFactory.errorHandler2(response);
                    });
                }, 10000);

                angular.forEach($scope.selectImageList, function(ele){
                    mainFactory.uploadImage().post({
                        'action': 'load_image',
                        'args': {
                            'name': ele
                        }
                    }).$promise.then(function(response) {
                        if(response.status == 1){
                            $scope.showloading = false;
                            $scope.showNextPod = 1;
                        }else{
                            mainFactory.errorHandler1(response);
                        }
                    }, function(response) {
                        mainFactory.errorHandler2(response);
                    })
                });
            }

            function getImageList() {

                mainFactory.ImageList().get({}).$promise.then(function(response) {
                    if (response.status == 1) {
                        angular.forEach($scope.yardstickImage, function(value, key){
                            if(typeof(response.result.images[key]) != 'undefined'){
                                $scope.yardstickImage[key] = response.result.images[key];
                            }
                        });
                        $scope.imageStatus = response.result.status;
                    }else{
                        mainFactory.errorHandler1(response);
                    }
                }, function(response) {
                    mainFactory.errorHandler2(response);
                })
            }

            $scope.openDeleteEnv = function openDeleteEnv(id, name) {
                $scope.deleteName = name;
                $scope.deleteId = id;
                ngDialog.open({
                    template: 'views/modal/deleteConfirm.html',
                    scope: $scope,
                    className: 'ngdialog-theme-default',
                    width: 500,
                    showClose: true,
                    closeByDocument: false
                })

            }

            $scope.deleteEnv = function deleteEnv() {
                mainFactory.deleteEnv().delete({ 'env_id': $scope.deleteId }).$promise.then(function(response) {
                    if (response.status == 1) {
                        toaster.pop({
                            type: 'success',
                            title: 'delete environment success',
                            body: 'you can go next step',
                            timeout: 3000
                        });
                        ngDialog.close();
                        getEnvironmentList();
                    } else {
                        toaster.pop({
                            type: 'error',
                            title: 'Wrong',
                            body: response.result,
                            timeout: 3000
                        });
                    }

                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }






            function getItemIdDetailforOpenrc() {

                mainFactory.ItemDetail().get({
                    'envId': $scope.uuidEnv
                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        $scope.baseElementInfo = response.result.environment;


                        if ($scope.ifNew != 'true') {
                            $scope.baseElementInfo = response.result.environment;
                            if ($scope.baseElementInfo.openrc_id != null) {
                                getOpenrcDetailForOpenrc($scope.baseElementInfo.openrc_id);
                            }
                        }

                    } else {
                        toaster.pop({
                            type: 'error',
                            title: 'fail',
                            body: response.error_msg,
                            timeout: 3000
                        });

                    }
                }, function(error) {

                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });

                })
            }



            //getopenRcid
            function getOpenrcDetailForOpenrc(openrcId) {
                mainFactory.getEnvironmentDetail().get({
                    'openrc_id': openrcId
                }).$promise.then(function(response) {
                    $scope.openrcInfo = response.result;
                    buildToEnvInfoOpenrc($scope.openrcInfo.openrc)
                }, function(response) {
                    toaster.pop({
                        type: 'error',
                        title: 'error',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }

            //buildtoEnvInfo
            function buildToEnvInfoOpenrc(object) {
                var tempKeyArray = Object.keys(object);
                $scope.envInfo = [];


                for (var i = 0; i < tempKeyArray.length; i++) {
                    var tempkey = tempKeyArray[i];
                    var tempValue = object[tempKeyArray[i]];
                    var temp = {
                        name: tempkey,
                        value: tempValue
                    };
                    $scope.envInfo.push(temp);
                }
            }














        }
    ]);

'use strict';

/**
 * get data factory
 */


var Base_URL;
var Grafana_URL;

angular.module('yardStickGui2App')
    .factory('mainFactory', ['$resource','$rootScope','$http', '$location', 'toaster',function($resource, $rootScope ,$http ,$location, toaster) {

        Base_URL = 'http://' + $location.host() + ':' + $location.port();
        Grafana_URL = 'http://' + $location.host();

        return {

            postEnvironmentVariable: function() {
                return $resource(Base_URL + '/api/v2/yardstick/openrcs', {}, {
                    'post': {
                        method: 'POST'
                    }
                })
            },
            uploadOpenrc: function() {
                return $resource(Base_URL + '/ap/v2/yardstick/openrcs', {}, {
                    'post': {
                        method: 'POST'
                    }
                })
            },
            getEnvironmentList: function() {
                return $resource(Base_URL+ '/api/v2/yardstick/environments', {}, {
                    'get': {
                        method: 'GET'
                    }
                })
            },
            getEnvironmentDetail: function() {
                return $resource(Base_URL + '/api/v2/yardstick/openrcs/:openrc_id', { openrc_id: "@openrc_id" }, {
                    'get': {
                        method: 'GET'
                    }
                })
            },
            addEnvName: function() {
                return $resource(Base_URL + '/api/v2/yardstick/environments', {}, {
                    'post': {
                        method: 'POST'
                    }
                })
            },
            ItemDetail: function() {
                return $resource(Base_URL + '/api/v2/yardstick/environments/:envId', { envId: "@envId" }, {
                    'get': {
                        method: 'GET'
                    }
                })
            },
            ImageDetail: function() {
                return $resource(Base_URL + '/api/v2/yardstick/images/:image_id', { image_id: "@image_id" }, {
                    'get': {
                        method: 'GET'
                    }
                })
            },
            podDeatil: function() {
                return $resource(Base_URL + '/api/v2/yardstick/pods/:podId', { podId: "@podId" }, {
                    'get': {
                        method: 'GET'
                    }
                })
            },
            containerDetail: function() {
                return $resource(Base_URL + '/api/v2/yardstick/containers/:containerId', { containerId: "@containerId" }, {
                    'get': {
                        method: 'GET'
                    }
                })
            },
            ImageList: function() {
                return $resource(Base_URL + '/api/v2/yardstick/images', {}, {
                    'get': {
                        method: 'GET'
                    }
                })
            },
            getImage: function(){
                return $resource(Base_URL + '/api/v2/yardstick/images/:imageId', {imageId: "@imageId"}, {
                    'get': {
                        method: 'GET'
                    }
                })
            },
            deleteImage: function() {
                return $resource(Base_URL + '/api/v2/yardstick/images/:imageId', { imageId: '@imageId' }, {
                    'delete': {
                        method: 'DELETE'
                    }
                })
            },
            uploadImage: function() {
                return $resource(Base_URL + '/api/v2/yardstick/images', {}, {
                    'post': {
                        method: 'POST'
                    }
                })
            },
            uploadImageByUrl: function() {
                return $resource(Base_URL + '/api/v2/yardstick/images', {}, {
                    'post': {
                        method: 'POST'
                    }
                })
            },
            getPodDetail: function() {
                return $resource(Base_URL + '/api/v2/yardstick/pods/:podId', { podId: "@podId" }, {
                    'get': {
                        method: 'GET'
                    }
                })
            },
            runAcontainer: function() {
                return $resource(Base_URL + '/api/v2/yardstick/containers', { podId: "@podId" }, {
                    'post': {
                        method: 'POST'
                    }
                })
            },
            getTestcaselist: function() {
                return $resource(Base_URL + '/api/v2/yardstick/testcases', {}, {
                    'get': {
                        method: 'GET'
                    }
                })
            },
            getTestcaseDetail: function() {
                return $resource(Base_URL + '/api/v2/yardstick/testcases/:testcasename', { testcasename: "@testcasename" }, {
                    'get': {
                        method: 'GET'
                    }
                })
            },
            suiteList: function() {
                return $resource(Base_URL + '/api/v2/yardstick/testsuites', {}, {
                    'get': {
                        method: 'GET'
                    }
                })
            },
            suiteDetail: function() {
                return $resource(Base_URL + '/api/v2/yardstick/testsuites/:suiteName', { suiteName: "@suiteName" }, {
                    'get': {
                        method: 'GET'
                    }
                })
            },
            suiteCreate: function() {
                return $resource(Base_URL + '/api/v2/yardstick/testsuites', {}, {
                    'post': {
                        method: 'POST'
                    }
                })
            },
            projectList: function() {
                return $resource(Base_URL + '/api/v2/yardstick/projects', {}, {
                    'get': {
                        method: 'GET'
                    }
                })
            },
            createProjectName: function() {
                return $resource(Base_URL + '/api/v2/yardstick/projects', {}, {
                    'post': {
                        method: 'POST'
                    }
                })
            },
            getProjectDetail: function() {
                return $resource(Base_URL + '/api/v2/yardstick/projects/:project_id', { project_id: "@project_id" }, {
                    'post': {
                        method: 'POST'
                    }
                })
            },
            createTask: function() {
                return $resource(Base_URL + '/api/v2/yardstick/tasks', {}, {
                    'post': {
                        method: 'POST'
                    }
                })
            },
            getTaskDetail: function() {
                return $resource(Base_URL + '/api/v2/yardstick/tasks/:taskId', { taskId: "@taskId" }, {
                    'get': {
                        method: 'GET'
                    }
                })
            },

            getTaskLog: function(){
                return $resource(Base_URL + '/api/v2/yardstick/tasks/:taskId/log?index=:index', { taskId: "@taskId", index: "@index" }, {
                    'get': {
                        method: 'GET'
                    }
                })
            },

            taskAddEnv: function() {
                return $resource(Base_URL + '/api/v2/yardstick/tasks/:taskId', { taskId: "@taskId" }, {
                    'put': {
                        method: 'PUT'
                    }
                })
            },
            //delete operate
            deleteEnv: function() {
                return $resource(Base_URL + '/api/v2/yardstick/environments/:env_id', { env_id: '@env_id' }, {
                    'delete': {
                        method: 'DELETE'
                    }
                })
            },
            deleteOpenrc: function() {
                return $resource(Base_URL + '/api/v2/yardstick/openrcs/:openrc', { openrc: '@openrc' }, {
                    'delete': {
                        method: 'DELETE'
                    }
                })
            },
            deletePod: function() {
                return $resource(Base_URL + '/api/v2/yardstick/pods/:podId', { podId: '@podId' }, {
                    'delete': {
                        method: 'DELETE'
                    }
                })
            },
            deleteContainer: function() {
                return $resource(Base_URL + '/api/v2/yardstick/containers/:containerId', { containerId: '@containerId' }, {
                    'delete': {
                        method: 'DELETE'
                    }
                })
            },
            deleteTestCase: function() {
                return $resource(Base_URL + '/api/v2/yardstick/testcases/:caseName', { caseName: '@caseName' }, {
                    'delete': {
                        method: 'DELETE'
                    }
                })
            },
            deleteTestSuite: function() {
                return $resource(Base_URL + '/api/v2/yardstick/testsuites/:suite_name', { suite_name: '@suite_name' }, {
                    'delete': {
                        method: 'DELETE'
                    }
                })
            },
            deleteProject: function() {
                return $resource(Base_URL + '/api/v2/yardstick/projects/:project_id', { project_id: '@project_id' }, {
                    'delete': {
                        method: 'DELETE'
                    }
                })
            },
            deleteTask: function() {
                return $resource(Base_URL + '/api/v2/yardstick/tasks/:task_id', { task_id: '@task_id' }, {
                    'delete': {
                        method: 'DELETE'
                    }
                })
            },
            errorHandler1: function(response){
                toaster.pop({
                    'type': 'error',
                    'title': 'error',
                    'body': response.result,
                    'showCloseButton': true
                });
            },
            errorHandler2: function(response){
                toaster.pop({
                    'type': 'error',
                    'title': response.status,
                    'body': response.statusText,
                    'showCloseButton': true
                });
            }

        };
    }]);

'use strict';

angular.module('yardStickGui2App')
    .controller('ContentController', ['$scope', '$state', '$stateParams', 'mainFactory', 'Upload', 'toaster', '$location', '$localStorage',
        function ($scope, $state, $stateParams, mainFactory, Upload, toaster, $location, $localStorage) {




            init();
            $scope.showEnvironment = false;
            $scope.counldGoDetail = false;
            $scope.activeStatus = 0;
            $scope.ifshowEnvChild = false;

            $scope.$watch(function () {
                return location.hash
            }, function (newvalue, oldvalue) {
                if (location.hash.indexOf('project') > -1) {
                    $scope.projectShow = true;
                    $scope.taskShow = false;
                    $scope.reportShow = false;
                } else if (location.hash.indexOf('task') > -1) {
                    $scope.taskShow = true;
                    $scope.projectShow = true;
                } else if (location.hash.indexOf('report') > -1) {
                    $scope.reportShow = true;
                    $scope.taskShow = true;
                    $scope.projectShow = true;
                } else if (location.hash.indexOf('envDetail') > -1 || location.hash.indexOf('envimageDetail') > -1 ||
                    location.hash.indexOf('envpodupload') > -1 || location.hash.indexOf('envcontainer') > -1) {
                    $scope.ifshowEnvChild = true;
                    $scope.activeStatus=0;
                }else{
                    $scope.ifshowEnvChild=false;
                    $scope.activeStatus=-1;
                }

            })


            function init() {


                $scope.showEnvironments = showEnvironments;
                $scope.showSteps = $location.path().indexOf('project');
                $scope.test = test;
                $scope.gotoUploadPage = gotoUploadPage;
                $scope.gotoOpenrcPage = gotoOpenrcPage;
                $scope.gotoPodPage = gotoPodPage;
                $scope.gotoContainerPage = gotoContainerPage;
                $scope.gotoTestcase = gotoTestcase;
                $scope.gotoEnviron = gotoEnviron;
                $scope.gotoSuite = gotoSuite;
                $scope.gotoProject = gotoProject;
                $scope.gotoTask = gotoTask;
                $scope.gotoReport = gotoReport;
                $scope.stepsStatus = $localStorage.stepsStatus;
                $scope.goBack = goBack;


            }



            function showEnvironments() {
                $scope.showEnvironment = true;
            }

            function test() {
                alert('test');
            }

            function gotoOpenrcPage() {
                $scope.path = $location.path();
                $scope.uuid = $scope.path.split('/').pop();
                $state.go('app.environmentDetail', { uuid: $scope.uuid })
            }

            function gotoUploadPage() {
                $scope.path = $location.path();
                $scope.uuid = $scope.path.split('/').pop();
                $state.go('app.uploadImage', { uuid: $scope.uuid });
            }

            function gotoPodPage() {
                $scope.path = $location.path();
                $scope.uuid = $scope.path.split('/').pop();
                $state.go('app.podUpload', { uuid: $scope.uuid });
            }

            function gotoContainerPage() {
                $scope.path = $location.path();
                $scope.uuid = $scope.path.split('/').pop();
                $state.go('app.container', { uuid: $scope.uuid });
            }

            function gotoTestcase() {
                $state.go('app.testcase');
            }

            function gotoEnviron() {
                if ($location.path().indexOf('env') > -1 || $location.path().indexOf('environment') > -1) {
                    $scope.counldGoDetail = true;
                }
                $state.go('app.environment');
            }

            function gotoSuite() {
                $state.go('app.testsuite');
            }

            function gotoProject() {
                $state.go('app.projectList');
            }

            function gotoTask() {
                $state.go('app.tasklist');
            }

            function gotoReport() {
                $state.go('app.report');
            }

            function goBack() {
                if ($location.path().indexOf('main/environment')) {
                    return;
                } else if ($location.path().indexOf('main/envDetail/') || $location.path().indexOf('main/imageDetail/') ||
                    $location.path().indexOf('main/podupload/') || $location.path().indexOf('main/container/')) {
                    $state.go('app.environment');
                    return;
                } else {
                    window.history.back();
                }

            }






        }
    ]);

'use strict';

angular.module('yardStickGui2App')
    .controller('DetailController', ['$scope', '$state', '$stateParams', 'mainFactory', 'Upload', 'toaster', '$location', 'ngDialog',
        function($scope, $state, $stateParams, mainFactory, Upload, toaster, $location, ngDialog) {




            init();
            $scope.showEnvironment = false;
            $scope.envInfo = [];

            function init() {
                $scope.showEnvironments = showEnvironments;
                // $scope.openrcID = $stateParams.uuid;
                $scope.deleteEnvItem = deleteEnvItem;
                $scope.addInfo = addInfo;
                $scope.submitOpenRcFile = submitOpenRcFile;
                $scope.uploadFiles = uploadFiles;
                $scope.addEnvironment = addEnvironment;

                $scope.uuid = $stateParams.uuid;
                $scope.openrcID = $stateParams.opercId;
                $scope.imageID = $stateParams.imageId;
                $scope.podID = $stateParams.podId;
                $scope.containerId = $stateParams.containerId;
                $scope.ifNew = $stateParams.ifNew;


                getItemIdDetail();
            }



            function showEnvironments() {
                $scope.showEnvironment = true;
            }


            function deleteEnvItem(index) {
                $scope.envInfo.splice(index, 1);
            }

            function addInfo() {
                var tempKey = null;
                var tempValue = null;
                var temp = {
                    name: tempKey,
                    value: tempValue
                }
                $scope.envInfo.push(temp);

            }

            function submitOpenRcFile() {
                $scope.showloading = true;

                var postData = {};
                postData['action'] = 'update_openrc';
                rebuildEnvInfo();
                postData['args'] = {};
                postData['args']['openrc'] = $scope.postEnvInfo;
                postData['args']['environment_id'] = $scope.uuid;


                mainFactory.postEnvironmentVariable().post(postData).$promise.then(function(response) {
                    $scope.showloading = false;

                    if (response.status == 1) {

                        $scope.openrcInfo = response.result;
                        toaster.pop({
                            type: 'success',
                            title: 'create success',
                            body: 'you can go next step',
                            timeout: 3000
                        });
                        $scope.showEnvrionment = true;
                        getItemIdDetail();
                    } else {
                        toaster.pop({
                            type: 'error',
                            title: 'faile',
                            body: response.error_msg,
                            timeout: 3000
                        });
                    }

                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }

            //reconstruc EnvInfo
            function rebuildEnvInfo() {
                $scope.postEnvInfo = {};
                for (var i = 0; i < $scope.envInfo.length; i++) {
                    $scope.postEnvInfo[$scope.envInfo[i].name] = $scope.envInfo[i].value;
                }

            }

            //buildtoEnvInfo
            function buildToEnvInfo(object) {
                $scope.envInfo=[];
                var tempKeyArray = Object.keys(object);

                for (var i = 0; i < tempKeyArray.length; i++) {
                    var tempkey = tempKeyArray[i];
                    var tempValue = object[tempKeyArray[i]];
                    var temp = {
                        name: tempkey,
                        value: tempValue
                    };
                    $scope.envInfo.push(temp);

                }

                console.log($scope.envInfo);
                console.log($scope.openrcInfo);
            }

            function uploadFiles($file, $invalidFiles) {
                $scope.openrcInfo = {};
                $scope.loadingOPENrc = true;

                $scope.displayOpenrcFile = $file;
                timeConstruct($scope.displayOpenrcFile.lastModified);
                Upload.upload({
                    url: Base_URL + '/api/v2/yardstick/openrcs',
                    data: { file: $file, 'environment_id': $scope.uuid, 'action': 'upload_openrc' }
                }).then(function(response) {

                    $scope.loadingOPENrc = false;
                    if (response.data.status == 1) {
                        toaster.pop({
                            type: 'success',
                            title: 'upload success',
                            body: 'you can go next step',
                            timeout: 3000
                        });
                        $scope.openrcInfo = response.data.result;
                        getItemIdDetail();

                    } else {
                        toaster.pop({
                            type: 'error',
                            title: 'faile',
                            body: response.error_msg,
                            timeout: 3000
                        });
                    }

                }, function(error) {
                    $scope.uploadfile = null;
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }

            function timeConstruct(array) {
                var date = new Date(1398250549490);
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                var D = date.getDate() + ' ';
                var h = date.getHours() + ':';
                var m = date.getMinutes() + ':';
                var s = date.getSeconds();
                $scope.filelastModified = Y + M + D + h + m + s;

            }

            function addEnvironment() {
                mainFactory.addEnvName().post({
                    'action': 'create_environment',
                    args: {
                        'name': $scope.baseElementInfo.name
                    }
                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        toaster.pop({
                            type: 'success',
                            title: 'create name success',
                            body: 'you can go next step',
                            timeout: 3000
                        });
                        $scope.uuid = response.result.uuid;
                        var path = $location.path();
                        path = path + $scope.uuid;
                        $location.url(path);
                        getItemIdDetail();
                    }

                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }

            function getItemIdDetail() {

                mainFactory.ItemDetail().get({
                    'envId': $scope.uuid
                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        $scope.baseElementInfo = response.result.environment;


                        if ($scope.ifNew != 'true') {
                            $scope.baseElementInfo = response.result.environment;
                            if ($scope.baseElementInfo.openrc_id != null) {
                                getOpenrcDetail($scope.baseElementInfo.openrc_id);
                            }
                        }

                    } else {
                        toaster.pop({
                            type: 'error',
                            title: 'fail',
                            body: response.error_msg,
                            timeout: 3000
                        });

                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });

                })
            }
            //getopenRcid
            function getOpenrcDetail(openrcId) {
                mainFactory.getEnvironmentDetail().get({
                    'openrc_id': openrcId
                }).$promise.then(function(response) {
                    $scope.openrcInfo = response.result;
                    buildToEnvInfo($scope.openrcInfo.openrc)
                }, function(response) {

                })
            }


            //getImgDetail
            function getImageDetail() {
                mainFactory.ImageDetail().get({
                    'image_id': $scope.baseElementInfo.image_id
                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        $scope.imageDetail = response.result.image;
                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }

            //getPodDetail
            function getPodDetail() {
                mainFactory.podDeatil().get({
                    'podId': $scope.baseElementInfo.pod_id
                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        $scope.podDetail = response.result.pod;
                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }
            //getContainerDetail
            function getPodDetail(containerId) {
                mainFactory.containerDetail().get({
                    'containerId': containerId
                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        $scope.podDetail = response.result.pod;
                    } else {
                        toaster.pop({
                            type: 'error',
                            title: 'fail',
                            body: response.error_msg,
                            timeout: 3000
                        });
                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }
            $scope.goBack = function goBack() {
                window.history.back();
            }

            $scope.goNext = function goNext() {
                $scope.path = $location.path();
                $scope.uuid = $scope.path.split('/').pop();
                $state.go('app.uploadImage', { uuid: $scope.uuid });
            }

            $scope.openDeleteEnv = function openDeleteEnv(id, name) {
                $scope.deleteName = name;
                $scope.deleteId = id;
                ngDialog.open({
                    template: 'views/modal/deleteConfirm.html',
                    scope: $scope,
                    className: 'ngdialog-theme-default',
                    width: 500,
                    showClose: true,
                    closeByDocument: false
                })

            }

            $scope.deleteOpenRc = function deleteOpenRc() {
                mainFactory.deleteOpenrc().delete({ 'openrc': $scope.baseElementInfo.openrc_id }).$promise.then(function(response) {
                    if (response.status == 1) {
                        toaster.pop({
                            type: 'success',
                            title: 'delete openrc success',
                            body: 'you can go next step',
                            timeout: 3000
                        });
                        ngDialog.close();
                        getItemIdDetail();
                        $scope.openrcInfo = null;
                        $scope.envInfo = [];
                        $scope.displayOpenrcFile = null;
                    } else {
                        toaster.pop({
                            type: 'error',
                            title: 'Wrong',
                            body: response.result,
                            timeout: 3000
                        });
                    }

                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }









        }


    ]);

'use strict';

angular.module('yardStickGui2App')
    .controller('ImageController', ['$scope', '$state', '$stateParams', 'mainFactory', 'Upload', 'toaster', '$location', '$interval', 'ngDialog',
        function($scope, $state, $stateParams, mainFactory, Upload, toaster, $location, $interval, ngDialog) {


            init();

            function init() {
                $scope.showloading = false;
                $scope.ifshowStatus = 0;

                $scope.yardstickImage = [
                    {
                        'name': 'yardstick-image',
                        'description': '',
                        'size': 'N/A',
                        'status': 'N/A',
                        'time': 'N/A'
                    },
                    {
                        'name': 'Ubuntu-16.04',
                        'description': '',
                        'size': 'N/A',
                        'status': 'N/A',
                        'time': 'N/A'
                    },
                    {
                        'name': 'cirros-0.3.5',
                        'description': '',
                        'size': 'N/A',
                        'status': 'N/A',
                        'time': 'N/A'
                    }
                ];
                $scope.customImage = [];


                $scope.uuid = $stateParams.uuid;
                $scope.showloading = false;
                $scope.url = null;
                $scope.environmentInfo = null;

                getYardstickImageList();
                getCustomImageList(function(image, image_id){});
            }

            function getYardstickImageList(){
                mainFactory.ImageList().get({}).$promise.then(function(response){
                    if(response.status == 1){
                        angular.forEach($scope.yardstickImage, function(ele, index){
                            if(typeof(response.result.images[ele.name]) != 'undefined'){
                                $scope.yardstickImage[index] = response.result.images[ele.name];
                            }
                        });
                    }else{
                        mainFactory.errorHandler1(response);
                    }
                }, function(response){
                    mainFactory.errorHandler2(response);
                });
            }

            function getCustomImageList(func){
                mainFactory.ItemDetail().get({
                    'envId': $stateParams.uuid
                }).$promise.then(function(response) {
                    if(response.status == 1){
                        $scope.environmentInfo = response.result.environment;
                        $scope.customImage = [];
                        angular.forEach(response.result.environment.image_id, function(ele){
                            mainFactory.getImage().get({'imageId': ele}).$promise.then(function(responseData){
                                if(responseData.status == 1){
                                    $scope.customImage.push(responseData.result.image);
                                    func(responseData.result.image, ele);
                                }else{
                                    mainFactory.errorHandler1(responseData);
                                }
                            }, function(errorData){
                                mainFactory.errorHandler2(errorData);
                            });
                        });
                    }else{
                        mainFactory.errorHandler1(response);
                    }
                }, function(response){
                    mainFactory.errorHandler2(response);
                });
            }

            $scope.loadYardstickImage = function(image_name){

                var updateImageTask = $interval(updateYardstickImage, 10000);

                function updateYardstickImage(){
                    mainFactory.ImageList().get({}).$promise.then(function(responseData){
                        if(responseData.status == 1){
                            if(typeof(responseData.result.images[image_name]) != 'undefined' && responseData.result.images[image_name].status == 'ACTIVE'){
                                angular.forEach($scope.yardstickImage, function(ele, index){
                                    if(ele.name == image_name){
                                        $scope.yardstickImage[index] = responseData.result.images[ele.name];
                                    }
                                });
                                $interval.cancel(updateImageTask);
                            }
                        }else{
                            mainFactory.errorHandler1(responseData);
                        }
                    },function(errorData){
                        mainFactory.errorHandler2(errorData);
                    });
                }

                mainFactory.uploadImage().post({'action': 'load_image', 'args': {'name': image_name}}).$promise.then(function(response){
                },function(response){
                    mainFactory.errorHandler2(response);
                });
            }

            $scope.deleteYardstickImage = function(image_name){

                var updateImageTask = $interval(updateYardstickImage, 10000);

                function updateYardstickImage(){
                    mainFactory.ImageList().get({}).$promise.then(function(response){
                        if(response.status == 1){
                            if(typeof(response.result.images[image_name]) == 'undefined'){
                                angular.forEach($scope.yardstickImage, function(ele, index){
                                    if(ele.name == image_name){
                                        $scope.yardstickImage[index].size = 'N/A';
                                        $scope.yardstickImage[index].status = 'N/A';
                                        $scope.yardstickImage[index].time = 'N/A';
                                    }
                                });
                                $interval.cancel(updateImageTask);
                            }
                        }else{
                            mainFactory.errorHandler1(response);
                        }
                    },function(response){
                        mainFactory.errorHandler2(response);
                    });
                }

                mainFactory.uploadImage().post({'action': 'delete_image', 'args': {'name': image_name}}).$promise.then(function(response){
                },function(response){
                    mainFactory.errorHandler2(response);
                });
            }

            $scope.uploadCustomImageByUrl = function(url){
                mainFactory.uploadImageByUrl().post({
                    'action': 'upload_image_by_url',
                    'args': {
                        'environment_id': $stateParams.uuid,
                        'url': url
                    }
                }).$promise.then(function(response){
                    if(response.status == 1){
                        var updateImageTask = $interval(getCustomImageList, 30000, 10, true, function(image, image_id){
                            if(image_id == response.result.uuid && image.status == 'ACTIVE'){
                                $interval.cancel(updateImageTask);
                            }
                        });
                        ngDialog.close();
                    }else{
                        mainFactory.errorHandler1(response);
                    }
                }, function(response){
                    mainFactory.errorHandler2(response);
                });
            }

            $scope.uploadCustomImage = function($file, $invalidFiles) {
                $scope.showloading = true;

                $scope.displayImageFile = $file;
                Upload.upload({
                    url: Base_URL + '/api/v2/yardstick/images',
                    data: { file: $file, 'environment_id': $scope.uuid, 'action': 'upload_image' }
                }).then(function(response) {

                    $scope.showloading = false;
                    if (response.data.status == 1) {

                        toaster.pop({
                            type: 'success',
                            title: 'upload success',
                            body: 'you can go next step',
                            timeout: 3000
                        });

                        var updateImageTask = $interval(getCustomImageList, 10000, 10, true, function(image, image_id){
                            if(image_id == response.data.result.uuid && image.status == 'ACTIVE'){
                                $interval.cancel(updateImageTask);
                            }
                        });
                    }else{
                        mainFactory.errorHandler1(response);
                    }

                }, function(response) {
                    $scope.uploadfile = null;
                    mainFactory.errorHandler2(response);
                })
            }

            $scope.deleteCustomImage = function(image_id){
                mainFactory.deleteImage().delete({'imageId': image_id}).$promise.then(function(response){
                    if(response.status == 1){
                        $interval(getCustomImageList, 10000, 5, true, function(image, image_id){
                        });
                    }else{
                        mainFactory.errorHandler2(response);
                    }
                }, function(response){
                    mainFactory.errorHandler2(response);
                });
            }

            $scope.openImageDialog = function(){
                $scope.url = null;
                ngDialog.open({
                    preCloseCallback: function(value) {
                    },
                    template: 'views/modal/imageDialog.html',
                    scope: $scope,
                    className: 'ngdialog-theme-default',
                    width: 950,
                    showClose: true,
                    closeByDocument: false
                })
            }

            $scope.goBack = function goBack() {
                $state.go('app.projectList');
            }

            $scope.goNext = function goNext() {
                $scope.path = $location.path();
                $scope.uuid = $scope.path.split('/').pop();
                $state.go('app.podUpload', { uuid: $scope.uuid });
            }

        }
    ]);

'use strict';

angular.module('yardStickGui2App')
    .controller('PodController', ['$scope', '$state', '$stateParams', 'mainFactory', 'Upload', 'toaster', '$location', 'ngDialog',
        function($scope, $state, $stateParams, mainFactory, Upload, toaster, $location, ngDialog) {


            init();
            $scope.showloading = false;
            $scope.loadingOPENrc = false;

            function init() {


                $scope.uuid = $stateParams.uuid;
                $scope.uploadFiles = uploadFiles;
                getItemIdDetail();

            }

            function getItemIdDetail() {
                mainFactory.ItemDetail().get({
                    'envId': $scope.uuid
                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        $scope.name = response.result.environment.name;
                        $scope.podId = response.result.environment.pod_id;
                        if ($scope.podId != null) {
                            getPodDetail($scope.podId);
                        } else {
                            $scope.podData = null;
                        }

                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }

            function getPodDetail(id) {
                mainFactory.getPodDetail().get({
                    'podId': id
                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        $scope.podData = response.result;

                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })

            }

            //upload pod file
            function uploadFiles($file, $invalidFiles) {
                $scope.loadingOPENrc = true;

                $scope.displayOpenrcFile = $file;
                timeConstruct($scope.displayOpenrcFile.lastModified);
                Upload.upload({
                    url: Base_URL + '/api/v2/yardstick/pods',
                    data: { file: $file, 'environment_id': $scope.uuid, 'action': 'upload_pod_file' }
                }).then(function(response) {

                    $scope.loadingOPENrc = false;
                    if (response.data.status == 1) {
                        toaster.pop({
                            type: 'success',
                            title: 'upload success',
                            body: 'you can go next step',
                            timeout: 3000
                        });

                        $scope.podData = response.data.result;

                        getItemIdDetail();


                    } else {

                    }

                }, function(error) {
                    $scope.uploadfile = null;
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }

            function timeConstruct(array) {
                var date = new Date(1398250549490);
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                var D = date.getDate() + ' ';
                var h = date.getHours() + ':';
                var m = date.getMinutes() + ':';
                var s = date.getSeconds();
                $scope.filelastModified = Y + M + D + h + m + s;

            }
            $scope.goBack = function goBack() {
                $state.go('app.projectList');
            }


            $scope.goNext = function goNext() {
                $scope.path = $location.path();
                $scope.uuid = $scope.path.split('/').pop();
                $state.go('app.container', { uuid: $scope.uuid });
            }

            $scope.openDeleteEnv = function openDeleteEnv(id, name) {
                $scope.deleteName = name;
                $scope.deleteId = id;
                ngDialog.open({
                    template: 'views/modal/deleteConfirm.html',
                    scope: $scope,
                    className: 'ngdialog-theme-default',
                    width: 500,
                    showClose: true,
                    closeByDocument: false
                })

            }

            $scope.deletePod = function deletePod() {
                mainFactory.deletePod().delete({ 'podId': $scope.podId }).$promise.then(function(response) {
                    if (response.status == 1) {
                        toaster.pop({
                            type: 'success',
                            title: 'delete pod success',
                            body: 'you can go next step',
                            timeout: 3000
                        });
                        ngDialog.close();
                        $scope.uuid = $stateParams.uuid;
                        $scope.uploadFiles = uploadFiles;
                        $scope.displayOpenrcFile = null;
                        getItemIdDetail();
                    } else {
                        toaster.pop({
                            type: 'error',
                            title: 'Wrong',
                            body: response.result,
                            timeout: 3000
                        });
                    }

                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });

                })
            }





        }
    ]);
'use strict';

angular.module('yardStickGui2App')
    .controller('ContainerController', ['$scope', '$state', '$stateParams', 'mainFactory', 'Upload', 'toaster', 'ngDialog',
        function($scope, $state, $stateParams, mainFactory, Upload, toaster, ngDialog) {


            init();
            $scope.showloading = false;

            $scope.displayContainerInfo = [];
            $scope.containerList = [{ value: 'create_influxdb', name: "InfluxDB" }, { value: 'create_grafana', name: "Grafana" }]

            function init() {


                $scope.uuid = $stateParams.uuid;
                $scope.createContainer = createContainer;
                $scope.openChooseContainnerDialog = openChooseContainnerDialog;


                getItemIdDetail();

            }

            function getItemIdDetail() {
                $scope.displayContainerInfo = [];
                mainFactory.ItemDetail().get({
                    'envId': $scope.uuid
                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        $scope.envName = response.result.environment.name;
                        $scope.containerId = response.result.environment.container_id;
                        if ($scope.containerId != null) {

                            var keysArray = Object.keys($scope.containerId);
                            for (var k in $scope.containerId) {
                                getConDetail($scope.containerId[k]);
                            }
                        } else {
                            $scope.podData = null;
                        }

                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }

            function getConDetail(id) {
                mainFactory.containerDetail().get({
                    'containerId': id
                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        // $scope.podData = response.result;
                        response.result.container['id'] = id;
                        $scope.displayContainerInfo.push(response.result.container);

                    }

                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })

            }

            function createContainer() {

                $scope.showloading = true;
                mainFactory.runAcontainer().post({
                    'action': $scope.selectContainer.value,
                    'args': {
                        'environment_id': $scope.uuid,
                    }
                }).$promise.then(function(response) {
                    $scope.showloading = false;
                    if (response.status == 1) {
                        toaster.pop({
                            type: 'success',
                            title: 'create container success',
                            body: 'you can go next step',
                            timeout: 3000
                        });
                        setTimeout(function() {
                            getItemIdDetail();
                        }, 10000);
                    } else {
                        toaster.pop({
                            type: 'error',
                            title: 'Wrong',
                            body: response.error_msg,
                            timeout: 3000
                        });
                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });

                })
            }

            function openChooseContainnerDialog() {
                ngDialog.open({
                    template: 'views/modal/chooseContainer.html',
                    scope: $scope,
                    className: 'ngdialog-theme-default',
                    width: 500,
                    showClose: true,
                    closeByDocument: false
                })
            }

            function chooseResult(name) {
                $scope.selectContainer = name;
            }
            $scope.goBack = function goBack() {
                $state.go('app.projectList');
            }

            $scope.openDeleteEnv = function openDeleteEnv(id, name) {
                $scope.deleteName = name;
                $scope.deleteId = id;
                ngDialog.open({
                    template: 'views/modal/deleteConfirm.html',
                    scope: $scope,
                    className: 'ngdialog-theme-default',
                    width: 500,
                    showClose: true,
                    closeByDocument: false
                })

            }

            $scope.deleteContainer = function deleteContainer() {
                mainFactory.deleteContainer().delete({ 'containerId': $scope.deleteId }).$promise.then(function(response) {
                    if (response.status == 1) {
                        toaster.pop({
                            type: 'success',
                            title: 'delete container success',
                            body: 'you can go next step',
                            timeout: 3000
                        });
                        ngDialog.close();
                        getItemIdDetail();

                    } else {
                        toaster.pop({
                            type: 'error',
                            title: 'Wrong',
                            body: response.error_msg,
                            timeout: 3000
                        });
                    }

                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }



        }
    ]);

'use strict';

angular.module('yardStickGui2App')
    .controller('TestcaseController', ['$scope', '$state', '$stateParams', 'mainFactory', 'Upload', 'toaster', 'ngDialog', '$loading',
        function($scope, $state, $stateParams, mainFactory, Upload, toaster, ngDialog, $loading) {


            init();
            $scope.loadingOPENrc = false;


            function init() {
                $scope.testcaselist = [];
                getTestcaseList();
                $scope.gotoDetail = gotoDetail;
                $scope.uploadFiles = uploadFiles;


            }

            function getTestcaseList() {
                $loading.start('key');
                mainFactory.getTestcaselist().get({

                }).$promise.then(function(response) {
                    $loading.finish('key');
                    if (response.status == 1) {
                        $scope.testcaselist = response.result;


                    }
                }, function(error) {
                    $loading.finish('key');
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }

            function gotoDetail(name) {
                $state.go('app.testcasedetail', { name: name });
            }


            function uploadFiles($file, $invalidFiles) {
                $scope.loadingOPENrc = true;

                $scope.displayOpenrcFile = $file;
                timeConstruct($scope.displayOpenrcFile.lastModified);
                Upload.upload({
                    url: Base_URL + '/api/v2/yardstick/testcases',
                    data: { file: $file, 'action': 'upload_case' }
                }).then(function(response) {

                    $scope.loadingOPENrc = false;
                    if (response.data.status == 1) {
                        toaster.pop({
                            type: 'success',
                            title: 'upload success',
                            body: 'you can go next step',
                            timeout: 3000
                        });



                    } else {

                    }

                }, function(error) {
                    $scope.uploadfile = null;
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }

            function timeConstruct(array) {
                var date = new Date(1398250549490);
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                var D = date.getDate() + ' ';
                var h = date.getHours() + ':';
                var m = date.getMinutes() + ':';
                var s = date.getSeconds();
                $scope.filelastModified = Y + M + D + h + m + s;

            }
            $scope.goBack = function goBack() {
                $state.go('app.projectList');
            }

            $scope.openDeleteEnv = function openDeleteEnv(id, name) {
                $scope.deleteName = name;
                $scope.deleteId = id;
                ngDialog.open({
                    template: 'views/modal/deleteConfirm.html',
                    scope: $scope,
                    className: 'ngdialog-theme-default',
                    width: 500,
                    showClose: true,
                    closeByDocument: false
                })

            }

            $scope.deleteTestCase = function deleteTestCase() {
                mainFactory.deleteTestCase().delete({ 'caseName': $scope.deleteId }).$promise.then(function(response) {
                    if (response.status == 1) {
                        toaster.pop({
                            type: 'success',
                            title: 'delete Test Case success',
                            body: 'you can go next step',
                            timeout: 3000
                        });
                        ngDialog.close();
                        getTestcaseList();
                    } else {
                        toaster.pop({
                            type: 'error',
                            title: 'Wrong',
                            body: response.result,
                            timeout: 3000
                        });
                    }

                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });

                })
            }










        }
    ]);
'use strict';

angular.module('yardStickGui2App')
    .controller('testcaseDetailController', ['$scope', '$state', '$stateParams', 'mainFactory', 'Upload', 'toaster',
        function($scope, $state, $stateParams, mainFactory, Upload, toaster) {


            init();


            function init() {

                getTestcaseDetail();


            }

            function getTestcaseDetail() {
                mainFactory.getTestcaseDetail().get({
                    'testcasename': $stateParams.name

                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        $scope.testcaseInfo = response.result.testcase;

                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }

            $scope.goBack = function goBack() {
                window.history.back();
            }









        }
    ]);
'use strict';

angular.module('yardStickGui2App')
    .controller('SuiteListController', ['$scope', '$state', '$stateParams', 'mainFactory', 'Upload', 'toaster', 'ngDialog', '$loading',
        function($scope, $state, $stateParams, mainFactory, Upload, toaster, ngDialog, $loading) {


            init();


            function init() {
                $scope.testsuitlist = [];
                getsuiteList();
                $scope.gotoDetail = gotoDetail;
                $scope.gotoCreateSuite = gotoCreateSuite;


            }

            function getsuiteList() {
                $loading.start('key');
                mainFactory.suiteList().get({

                }).$promise.then(function(response) {
                    $loading.finish('key');
                    if (response.status == 1) {
                        $scope.testsuitlist = response.result.testsuites;

                    }
                }, function(error) {
                    $loading.finish('key');
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }

            function gotoDetail(name) {
                var temp = name.split('.')[0];

                $state.go('app.suitedetail', { name: temp })

            }

            function gotoCreateSuite() {
                $state.go('app.suitcreate');
            }

            $scope.goBack = function goBack() {
                $state.go('app.projectList');
            }


            $scope.openDeleteEnv = function openDeleteEnv(id, name) {
                $scope.deleteName = name;
                $scope.deleteId = id.split('.')[0];
                ngDialog.open({
                    template: 'views/modal/deleteConfirm.html',
                    scope: $scope,
                    className: 'ngdialog-theme-default',
                    width: 500,
                    showClose: true,
                    closeByDocument: false
                })

            }

            $scope.deleteSuite = function deleteSuite() {
                mainFactory.deleteTestSuite().delete({ 'suite_name': $scope.deleteId }).$promise.then(function(response) {
                    if (response.status == 1) {
                        toaster.pop({
                            type: 'success',
                            title: 'delete Test Suite success',
                            body: 'you can go next step',
                            timeout: 3000
                        });
                        ngDialog.close();
                        getTestcaseList();
                    } else {
                        toaster.pop({
                            type: 'error',
                            title: 'Wrong',
                            body: response.result,
                            timeout: 3000
                        });
                    }

                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }


















        }
    ]);
'use strict';

angular.module('yardStickGui2App')
    .controller('suiteDetailController', ['$scope', '$state', '$stateParams', 'mainFactory', 'Upload', 'toaster',
        function($scope, $state, $stateParams, mainFactory, Upload, toaster) {


            init();


            function init() {

                getSuiteDetail();

            }

            function getSuiteDetail() {
                mainFactory.suiteDetail().get({
                    'suiteName': $stateParams.name

                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        $scope.suiteinfo = response.result.testsuite;

                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }
            $scope.goBack = function goBack() {
                window.history.back();
            }









        }
    ]);

'use strict';

angular.module('yardStickGui2App')
    .controller('suitcreateController', ['$scope', '$state', '$stateParams', 'mainFactory', 'Upload', 'toaster', 'ngDialog',
        function($scope, $state, $stateParams, mainFactory, Upload, toaster, ngDialog) {


            init();


            function init() {

                getTestcaseList();
                $scope.constructTestSuit = constructTestSuit;
                $scope.openDialog = openDialog;
                $scope.createSuite = createSuite;

            }

            function getTestcaseList() {
                mainFactory.getTestcaselist().get({

                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        $scope.testcaselist = response.result;


                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }

            $scope.testsuiteList = [];
            $scope.suitReconstructList = [];

            function constructTestSuit(name) {

                var index = $scope.testsuiteList.indexOf(name);
                if (index > -1) {
                    $scope.testsuiteList.splice(index, 1);
                } else {
                    $scope.testsuiteList.push(name);
                }


                $scope.suitReconstructList = $scope.testsuiteList;

            }

            function createSuite(name) {
                mainFactory.suiteCreate().post({
                    'action': 'create_suite',
                    'args': {
                        'name': name,
                        'testcases': $scope.testsuiteList
                    }
                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        toaster.pop({
                            type: 'success',
                            title: 'create suite success',
                            body: 'you can go next step',
                            timeout: 3000
                        });
                        ngDialog.close();
                    } else {

                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }

            function openDialog() {
                ngDialog.open({
                    template: 'views/modal/suiteName.html',
                    className: 'ngdialog-theme-default',
                    scope: $scope,
                    width: 314,
                    showClose: true,
                    closeByDocument: false
                })
            }








        }
    ]);
'use strict';

angular.module('yardStickGui2App')
    .controller('TaskController', ['$scope', '$state', '$stateParams', 'mainFactory', 'Upload', 'toaster', 'ngDialog',
        function($scope, $state, $stateParams, mainFactory, Upload, toaster, ngDialog) {


            init();


            function init() {
                getDetailTaskForList();

            }

            function getDetailTaskForList() {
                mainFactory.getTaskDetail().get({
                    'taskId': $stateParams.taskId
                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        if (response.result.task.status == -1) {
                            response.result.task['stausWidth'] = '5%';
                        } else if (response.result.task.status == 0) {
                            response.result.task['stausWidth'] = '50%';
                        } else if (response.result.task.status == 1) {
                            response.result.task['stausWidth'] = '100%';
                        } else if (response.result.task.status == 2) {
                            response.result.task['stausWidth'] = 'red';
                        }

                        $scope.taskDetailData = response.result.task;
                        if ($scope.taskDetailData.environment_id != null) {
                            getItemIdDetail($scope.taskDetailData.environment_id);
                        }

                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }


            function getItemIdDetail(id) {
                mainFactory.ItemDetail().get({
                    'envId': id
                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        $scope.displayEnv = response.result.environment;

                        if (response.result.environment.pod_id != null) {
                            getPodDetail(response.result.environment.pod_id);
                        } else if (response.result.environment.image_id != null) {
                            getImageDetail(response.result.environment.image_id);
                        } else if (response.result.environment.openrc_id != null) {
                            getOpenrcDetail(response.result.environment.openrc_id != null);
                        } else if (response.result.environment.container_id.length != 0) {
                            $scope.displayContainerDetail = [];
                            var containerArray = response.result.environment.container_id;
                            for (var i = 0; i < containerArray.length; i++) {
                                getContainerId(containerArray[i]);
                            }

                        }
                    } else {
                        toaster.pop({
                            type: 'error',
                            title: 'fail',
                            body: response.error_msg,
                            timeout: 3000
                        });
                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }

            //getopenRcid
            function getOpenrcDetail(openrcId) {
                mainFactory.getEnvironmentDetail().get({
                    'openrc_id': openrcId
                }).$promise.then(function(response) {
                    //openrc数据
                    $scope.openrcInfo = response.result;
                    // buildToEnvInfo($scope.openrcInfo.openrc)
                }, function(response) {

                })
            }


            //getImgDetail
            function getImageDetail(id) {
                mainFactory.ImageDetail().get({
                    'image_id': id
                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        $scope.imageDetail = response.result.image;

                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }

            //getPodDetail
            function getPodDetail(id) {
                mainFactory.podDeatil().get({
                    'podId': id
                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        $scope.podDetail = response.result.pod;
                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }
            //getContainerDetail
            function getContainerId(containerId) {
                mainFactory.containerDetail().get({
                    'containerId': containerId
                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        $scope.container = response.result.container;
                        $scope.displayContainerDetail.push($scope.container);

                    } else {
                        toaster.pop({
                            type: 'error',
                            title: 'fail',
                            body: response.error_msg,
                            timeout: 3000
                        });
                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }
            $scope.goBack = function goBack() {
                window.history.back();
            }








        }
    ]);
'use strict';

angular.module('yardStickGui2App').controller('TaskLogController', ['$scope', '$stateParams', '$http', '$interval', 'mainFactory', function ($scope, $stateParams, $http, $interval, mainFactory) {
        $scope.logLines = [];
        $scope.getLog = getLog;
        $scope.taskId = $stateParams.taskId;
        $scope.taskStatus = 0;
        $scope.index = 0;

        $scope.goBack = function goBack() {
            window.history.back();
        }

        function getLog(){

            function get_data(){
                mainFactory.getTaskLog().get({'taskId': $scope.taskId, 'index': $scope.index}).$promise.then(function(data){
                    angular.forEach(data.result.data, function(ele){
                        $scope.logLines.push(ele);
                        $scope.index = data.result.index;
                    });

                    if(data.status == 1){
                        $interval.cancel($scope.intervalTask);
                        $scope.taskStatus = 1;
                    }
                });
            }

            $scope.intervalTask = $interval(get_data, 2000);
        }

        getLog();
}]);

'use strict';

angular.module('yardStickGui2App')
    .controller('ReportController', ['$scope', '$state', '$stateParams', 'mainFactory', 'Upload', 'toaster', 'ngDialog',
        function($scope, $state, $stateParams, mainFactory, Upload, toaster, ngDialog) {


            init();


            function init() {
                getDetailTaskForList();



            }
            $scope.goBack = function goBack() {
                window.history.back();
            }

            function getDetailTaskForList(id) {
                mainFactory.getTaskDetail().get({
                    'taskId': $stateParams.taskId
                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        if (response.result.task.status == -1) {
                            response.result.task['stausWidth'] = '5%';
                        } else if (response.result.task.status == 0) {
                            response.result.task['stausWidth'] = '50%';
                        } else if (response.result.task.status == 1) {
                            response.result.task['stausWidth'] = '100%';
                        } else if (response.result.task.status == 2) {
                            response.result.task['stausWidth'] = 'red';
                        }
                        $scope.result = response.result.task;
                        $scope.testcaseinfo = response.result.task.result.testcases;
                        var key = Object.keys($scope.testcaseinfo);
                        $scope.testcaseResult = $scope.testcaseinfo[key];

                        $scope.envIdForTask = response.result.task.environment_id;
                        getItemIdDetail();


                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });

                })
            }

            $scope.goToExternal = function goToExternal(id) {
                var url = Grafana_URL +':'+$scope.jumpPort+'/dashboard/db'+ '/' + id;

                window.open(url, '_blank');
            }

            function getItemIdDetail() {
                $scope.displayContainerInfo = [];
                mainFactory.ItemDetail().get({
                    'envId': $scope.envIdForTask
                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        if (response.result.environment.container_id.grafana != null) {
                            getConDetail(response.result.environment.container_id.grafana);

                        } else {
                            $scope.jumpPort = 3000;
                        }


                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }

            function getConDetail(id) {
                mainFactory.containerDetail().get({
                    'containerId': id
                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        // $scope.podData = response.result;
                        $scope.jumpPort = response.result.container.port;

                    }

                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })

            }







        }
    ]);

'use strict';

angular.module('yardStickGui2App')
    .controller('ProjectController', ['$scope', '$state', '$stateParams', 'mainFactory', 'Upload', 'toaster', 'ngDialog', '$loading',
        function($scope, $state, $stateParams, mainFactory, Upload, toaster, ngDialog, $loading) {


            init();


            function init() {


                getProjectList();
                $scope.openCreateProject = openCreateProject;
                $scope.createName = createName;
                $scope.gotoDetail = gotoDetail;


            }

            function getProjectList() {
                $loading.start('key');
                mainFactory.projectList().get({}).$promise.then(function(response) {
                    $loading.finish('key');
                    if (response.status == 1) {
                        $scope.projectListData = response.result.projects;


                    } else {

                    }
                }, function(error) {
                    $loading.finish('key');
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });

                })
            }

            function openCreateProject() {

                ngDialog.open({
                    template: 'views/modal/projectCreate.html',
                    scope: $scope,
                    className: 'ngdialog-theme-default',
                    width: 400,
                    showClose: true,
                    closeByDocument: false
                })
            }

            function createName(name) {

                mainFactory.createProjectName().post({
                    'action': 'create_project',
                    'args': {
                        'name': name,
                    }
                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        toaster.pop({
                            type: 'success',
                            title: 'create project success',
                            body: 'you can go next step',
                            timeout: 3000
                        });
                        ngDialog.close();
                        getProjectList();
                    } else {
                        toaster.pop({
                            type: 'error',
                            title: 'failed',
                            body: 'create project failed',
                            timeout: 3000
                        });
                    }

                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'failed',
                        body: 'Something Wrong',
                        timeout: 3000
                    });
                })
            }

            function gotoDetail(id) {
                $state.go('app.projectdetail', { projectId: id })
            }


            $scope.openDeleteEnv = function openDeleteEnv(id, name) {
                $scope.deleteName = name;
                $scope.deleteId = id;
                ngDialog.open({
                    template: 'views/modal/deleteConfirm.html',
                    scope: $scope,
                    className: 'ngdialog-theme-default',
                    width: 500,
                    showClose: true,
                    closeByDocument: false
                })

            }

            $scope.deleteProject = function deleteProject() {
                mainFactory.deleteProject().delete({ 'project_id': $scope.deleteId }).$promise.then(function(response) {
                    if (response.status == 1) {
                        toaster.pop({
                            type: 'success',
                            title: 'delete Project success',
                            body: 'you can go next step',
                            timeout: 3000
                        });
                        ngDialog.close();
                        getProjectList();
                    } else {
                        toaster.pop({
                            type: 'error',
                            title: 'Wrong',
                            body: response.result,
                            timeout: 3000
                        });
                    }

                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });

                })
            }

















        }
    ]);

'use strict';

angular.module('yardStickGui2App')
    .controller('ProjectDetailController', ['$scope', '$state', '$stateParams', 'mainFactory', 'Upload', 'toaster', 'ngDialog', '$localStorage', '$loading', '$interval',
        function($scope, $state, $stateParams, mainFactory, Upload, toaster, ngDialog, $localStorage, $loading, $interval) {


            init();
            // $scope.taskListDisplay = [];
            $scope.blisterPackTemplates = [{ id: 1, name: "Test Case" }, { id: 2, name: "Test Suite" }]
            $scope.selectType = null;
            $scope.ifHasEnv = false;
            $scope.ifHasCase = false;
            $scope.ifHasSuite = false;
            $scope.$on('$destroy', function() {
                $interval.cancel($scope.intervalCount)
            });
            $scope.finalTaskListDisplay = [];


            function init() {


                getProjectDetail();

                $scope.openCreate = openCreate;
                $scope.createTask = createTask;
                $scope.constructTestSuit = constructTestSuit;
                $scope.addEnvToTask = addEnvToTask;
                $scope.triggerContent = triggerContent;
                $scope.constructTestCase = constructTestCase;
                $scope.getTestDeatil = getTestDeatil;
                $scope.confirmAddCaseOrSuite = confirmAddCaseOrSuite;
                $scope.runAtask = runAtask;
                $scope.gotoDetail = gotoDetail;
                $scope.gotoReport = gotoReport;
                $scope.gotoModify = gotoModify;
                $scope.goBack = goBack;
                $scope.goToExternal = goToExternal;


            }

            function getProjectDetail() {
                if ($scope.intervalCount != undefined) {
                    $interval.cancel($scope.intervalCount);
                }
                $loading.start('key');
                $scope.taskListDisplay = [];
                $scope.finalTaskListDisplay = [];
                mainFactory.getProjectDetail().get({
                    project_id: $stateParams.projectId
                }).$promise.then(function(response) {
                    $loading.finish('key');
                    if (response.status == 1) {

                        $scope.projectData = response.result.project;
                        if ($scope.projectData.tasks.length != 0) {


                            for (var i = 0; i < $scope.projectData.tasks.length; i++) {
                                getDetailTaskForList($scope.projectData.tasks[i]);
                            }
                            $scope.intervalCount = $interval(function() {
                                getDetailForEachTask();
                            }, 10000);
                        } else {

                            if ($scope.intervalCount != undefined) {
                                $interval.cancel($scope.intervalCount);
                            }
                        }
                    } else {

                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });

                })
            }

            // function getProjectDetailSimple() {
            //     getDetailForEachTask();
            // }

            function openCreate() {
                $scope.newUUID = null;
                $scope.displayEnvName = null;
                $scope.selectEnv = null;
                $scope.selectCase = null;
                $scope.selectType = null;
                $scope.contentInfo = null;
                $scope.ifHasEnv = false;
                $scope.ifHasCase = false;
                $scope.ifHasSuite = false;

                // getEnvironmentList();
                $scope.selectEnv = null;
                ngDialog.open({
                    template: 'views/modal/taskCreate.html',
                    scope: $scope,
                    className: 'ngdialog-theme-default',
                    width: 800,
                    showClose: true,
                    closeByDocument: false,
                    preCloseCallback: function(value) {
                        getProjectDetail();
                    },
                })
            }

            function createTask(name) {
                mainFactory.createTask().post({
                    'action': 'create_task',
                    'args': {
                        'name': name,
                        'project_id': $stateParams.projectId
                    }
                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        toaster.pop({
                            type: 'success',
                            title: 'create task success',
                            body: 'you can go next step',
                            timeout: 3000
                        });
                        $scope.newUUID = response.result.uuid;
                        getEnvironmentList();

                    } else {
                        toaster.pop({
                            type: 'error',
                            title: 'create task wrong',
                            body: 'you can go next step',
                            timeout: 3000
                        });
                    }



                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'create task wrong',
                        body: 'you can go next step',
                        timeout: 3000
                    });
                })
            }

            function getDetailTaskForList(id) {

                mainFactory.getTaskDetail().get({
                    'taskId': id
                }).$promise.then(function(response) {

                    if (response.status == 1) {
                        if (response.result.task.status == -1) {
                            response.result.task['stausWidth'] = '5%';
                        } else if (response.result.task.status == 0) {
                            response.result.task['stausWidth'] = '50%';
                        } else if (response.result.task.status == 1) {
                            response.result.task['stausWidth'] = '100%';
                        } else if (response.result.task.status == 2) {
                            response.result.task['stausWidth'] = 'red';
                        }
                        $scope.taskListDisplay.push(response.result.task);
                        console.log($scope.taskListDisplay);

                        $scope.finalTaskListDisplay = $scope.taskListDisplay;

                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });

                })
            }

            function getDetailTaskForListSimple(id, index) {

                mainFactory.getTaskDetail().get({
                    'taskId': id
                }).$promise.then(function(response) {

                    if (response.status == 1) {
                        if (response.result.task.status == -1) {

                            $scope.finalTaskListDisplay[index].stausWidth = '5%';
                            $scope.finalTaskListDisplay[index].status = response.result.task.status;
                        } else if (response.result.task.status == 0) {

                            $scope.finalTaskListDisplay[index].stausWidth = '50%';
                            $scope.finalTaskListDisplay[index].status = response.result.task.status;
                        } else if (response.result.task.status == 1) {

                            $scope.finalTaskListDisplay[index].stausWidth = '100%';
                            $scope.finalTaskListDisplay[index].status = response.result.task.status;
                        } else if (response.result.task.status == 2) {

                            $scope.finalTaskListDisplay[index].stausWidth = 'red';
                            $scope.finalTaskListDisplay[index].status = response.result.task.status;
                        }


                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });

                })
            }

            function getDetailForEachTask() {
                for (var i = 0; i < $scope.finalTaskListDisplay.length; i++) {
                    if ($scope.finalTaskListDisplay[i].status != 1 && $scope.finalTaskListDisplay[i].status != -1) {
                        getDetailTaskForListSimple($scope.finalTaskListDisplay[i].uuid, i);
                    }
                }
            }

            function getEnvironmentList() {
                mainFactory.getEnvironmentList().get().$promise.then(function(response) {
                    $scope.environmentList = response.result.environments;
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });

                })
            }

            function constructTestSuit(id, name) {
                $scope.displayEnvName = name;
                $scope.selectEnv = id;

            }

            function constructTestCase(name) {

                $scope.selectCase = name;
                if ($scope.selectType.name == 'Test Case') {
                    getCaseInfo();
                } else {
                    getSuiteInfo();
                }

            }




            function addEnvToTask() {
                mainFactory.taskAddEnv().put({
                    'taskId': $scope.newUUID,
                    'action': 'add_environment',
                    'args': {
                        'task_id': $scope.newUUID,
                        'environment_id': $scope.selectEnv
                    }
                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        toaster.pop({
                            type: 'success',
                            title: 'add environment success',
                            body: 'you can go next step',
                            timeout: 3000
                        });
                        $scope.ifHasEnv = true;


                    } else {
                        toaster.pop({
                            type: 'error',
                            title: 'create task wrong',
                            body: 'you can go next step',
                            timeout: 3000
                        });
                    }



                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'create task wrong',
                        body: 'you can go next step',
                        timeout: 3000
                    });
                })
            }

            function triggerContent(name) {
                $scope.selectCase = null;
                $scope.displayTable = true;

                $scope.selectType = name;
                if (name.name == 'Test Case') {
                    getTestcaseList();
                } else if (name.name == 'Test Suite') {
                    getsuiteList();
                }
            }

            function getTestcaseList() {
                mainFactory.getTestcaselist().get({

                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        $scope.testcaselist = response.result;


                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }

            function getsuiteList() {
                mainFactory.suiteList().get({

                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        $scope.testsuitlist = response.result.testsuites;

                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }

            function getTestDeatil() {


                if ($scope.selectType.name == 'Test Case') {
                    getTestcaseDetail();
                } else {
                    getSuiteDetail();
                }

            }

            function getCaseInfo() {



                mainFactory.getTestcaseDetail().get({
                    'testcasename': $scope.selectCase

                }).$promise.then(function(response) {
                    if (response.status == 1) {

                        $scope.contentInfo = response.result.testcase;

                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }

            function getSuiteInfo() {
                mainFactory.suiteDetail().get({
                    'suiteName': $scope.selectCase.split('.')[0]

                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        $scope.contentInfo = response.result.testsuite;

                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }


            function getSuiteDetail() {
                mainFactory.suiteDetail().get({
                    'suiteName': $scope.selectCase.split('.')[0]

                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        $scope.displayTable = false;
                        $scope.contentInfo = response.result.testsuite;

                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }


            function getTestcaseDetail() {
                mainFactory.getTestcaseDetail().get({
                    'testcasename': $scope.selectCase

                }).$promise.then(function(response) {
                    if (response.status == 1) {

                        $scope.displayTable = false;
                        $scope.contentInfo = response.result.testcase;

                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }

            function addCasetoTask(content) {
                mainFactory.taskAddEnv().put({
                    'taskId': $scope.newUUID,
                    'action': 'add_case',
                    'args': {
                        'task_id': $scope.newUUID,
                        'case_name': $scope.selectCase,
                        'case_content': content
                    }
                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        toaster.pop({
                            type: 'success',
                            title: 'add test case success',
                            body: 'you can go next step',
                            timeout: 3000
                        });
                        $scope.ifHasCase = true;


                    } else {
                        toaster.pop({
                            type: 'error',
                            title: 'create task wrong',
                            body: 'you can go next step',
                            timeout: 3000
                        });
                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'create task wrong',
                        body: 'you can go next step',
                        timeout: 3000
                    });
                })
            }

            function addSuitetoTask(content) {
                mainFactory.taskAddEnv().put({
                    'taskId': $scope.newUUID,
                    'action': 'add_suite',
                    'args': {
                        'task_id': $scope.newUUID,
                        'suite_name': $scope.selectCase.split('.')[0],
                        'suite_content': content
                    }
                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        toaster.pop({
                            type: 'success',
                            title: 'add test suite success',
                            body: 'you can go next step',
                            timeout: 3000
                        });
                        $scope.ifHasSuite = true;


                    } else {
                        toaster.pop({
                            type: 'error',
                            title: 'create task wrong',
                            body: 'wrong',
                            timeout: 3000
                        });
                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'create task wrong',
                        body: 'something wrong',
                        timeout: 3000
                    });
                })
            }

            function confirmAddCaseOrSuite(content) {
                if ($scope.selectType.name == "Test Case") {
                    addCasetoTask(content);
                } else {
                    addSuitetoTask(content);
                }
            }

            function runAtask(id) {
                mainFactory.taskAddEnv().put({
                    'taskId': id,
                    'action': 'run',
                    'args': {
                        'task_id': id
                    }
                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        toaster.pop({
                            type: 'success',
                            title: 'run a task success',
                            body: 'you can go next step',
                            timeout: 3000
                        });
                        ngDialog.close();
                        // getProjectDetail();
                    } else {

                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });

                })
            }

            $scope.runAtaskForTable = function runAtaskForTable(id) {
                mainFactory.taskAddEnv().put({
                    'taskId': id,
                    'action': 'run',
                    'args': {
                        'task_id': id
                    }
                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        // toaster.pop({
                        //     type: 'success',
                        //     title: 'run a task success',
                        //     body: 'you can go next step',
                        //     timeout: 3000
                        // });
                        // ngDialog.close();
                        getProjectDetail();
                    } else {
                        toaster.pop({
                            type: 'error',
                            title: 'fail',
                            body: response.result,
                            timeout: 3000
                        });

                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });

                })
            }

            function gotoDetail(id) {


                $state.go('app.tasklist', { taskId: id });

            }

            function gotoReport(id) {
                $state.go('app.report', { taskId: id });
            }

            function gotoModify(id) {
                $state.go('app.taskModify', { taskId: id });
            }

            function goBack() {
                window.history.back();
            }

            function goToExternal() {
                window.open(External_URL, '_blank');
            }

            $scope.openDeleteEnv = function openDeleteEnv(id, name) {
                $scope.deleteName = name;
                $scope.deleteId = id;
                ngDialog.open({
                    template: 'views/modal/deleteConfirm.html',
                    scope: $scope,
                    className: 'ngdialog-theme-default',
                    width: 500,
                    showClose: true,
                    closeByDocument: false
                })

            }

            $scope.deleteTask = function deleteTask() {
                mainFactory.deleteTask().delete({ 'task_id': $scope.deleteId }).$promise.then(function(response) {
                    if (response.status == 1) {
                        toaster.pop({
                            type: 'success',
                            title: 'delete Task success',
                            body: 'you can go next step',
                            timeout: 3000
                        });
                        ngDialog.close();
                        getProjectDetail();
                    } else {
                        toaster.pop({
                            type: 'error',
                            title: 'Wrong',
                            body: response.result,
                            timeout: 3000
                        });
                    }

                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });

                })
            }

            $scope.gotoLog = function gotoLog(task_id) {
                $state.go('app.taskLog', { taskId: task_id });
            }
        }
    ]);

'use strict';

angular.module('yardStickGui2App')
    .controller('TaskModifyController', ['$scope', '$state', '$stateParams', 'mainFactory', 'Upload', 'toaster',
        function($scope, $state, $stateParams, mainFactory, Upload, toaster) {


            init();
            $scope.blisterPackTemplates = [{ id: 1, name: "Test Case" }, { id: 2, name: "Test Suite" }]
            $scope.selectType = null;

            $scope.sourceShow = null;



            function init() {
                getDetailTaskForList();
                getEnvironmentList();
                $scope.triggerContent = triggerContent;
                $scope.constructTestSuit = constructTestSuit;
                $scope.constructTestCase = constructTestCase;
                $scope.getTestDeatil = getTestDeatil;
                $scope.confirmToServer = confirmToServer;
                $scope.addEnvToTask = addEnvToTask;
            }

            function getDetailTaskForList() {
                mainFactory.getTaskDetail().get({
                    'taskId': $stateParams.taskId
                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        if (response.result.task.status == -1) {
                            response.result.task['stausWidth'] = '5%';
                        } else if (response.result.task.status == 0) {
                            response.result.task['stausWidth'] = '50%';
                        } else if (response.result.task.status == 1) {
                            response.result.task['stausWidth'] = '100%';
                        } else if (response.result.task.status == 2) {
                            response.result.task['stausWidth'] = 'red';
                        }

                        $scope.taskDetailData = response.result.task;
                        $scope.selectEnv = $scope.taskDetailData.environment_id;

                        if ($scope.taskDetailData.environment_id != null) {
                            getItemIdDetail($scope.taskDetailData.environment_id);
                        }

                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }

            function getItemIdDetail(id) {
                mainFactory.ItemDetail().get({
                    'envId': id
                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        $scope.envName = response.result.environment.name;
                        // $scope.selectEnv = $scope.envName;
                    } else {
                        alert('Something Wrong!');
                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }

            //getopenRcid
            function getOpenrcDetail(openrcId) {
                mainFactory.getEnvironmentDetail().get({
                    'openrc_id': openrcId
                }).$promise.then(function(response) {
                    $scope.openrcInfo = response.result;
                    // buildToEnvInfo($scope.openrcInfo.openrc)
                }, function(response) {

                })
            }


            //getImgDetail
            function getImageDetail(id) {
                mainFactory.ImageDetail().get({
                    'image_id': id
                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        $scope.imageDetail = response.result.image;

                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }

            //getPodDetail
            function getPodDetail(id) {
                mainFactory.podDeatil().get({
                    'podId': id
                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        $scope.podDetail = response.result.pod;
                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }
            //getContainerDetail
            function getContainerId(containerId) {
                mainFactory.containerDetail().get({
                    'containerId': containerId
                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        $scope.container = response.result.container;
                        $scope.displayContainerDetail.push($scope.container);

                    } else {

                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }

            function getEnvironmentList() {
                mainFactory.getEnvironmentList().get().$promise.then(function(response) {
                    $scope.environmentList = response.result.environments;
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }


            function triggerContent(name) {
                $scope.selectCase = null;
                $scope.displayTable = true;

                $scope.selectType = name;
                if (name.name == 'Test Case') {
                    $scope.taskDetailData.suite = false;
                    getTestcaseList();
                } else if (name.name == 'Test Suite') {
                    $scope.taskDetailData.suite = true;
                    getsuiteList();
                }
            }

            function getTestcaseList() {
                mainFactory.getTestcaselist().get({

                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        $scope.testcaselist = response.result;


                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }

            function getsuiteList() {
                mainFactory.suiteList().get({

                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        $scope.testsuitlist = response.result.testsuites;

                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }


            function constructTestSuit(id, name) {

                $scope.envName = name;
                $scope.selectEnv = id;

            }

            function constructTestCase(name) {

                $scope.selectCase = name;
                if ($scope.selectType.name == 'Test Case') {
                    getCaseInfo();
                } else {
                    getSuiteInfo();
                }

            }

            function getCaseInfo() {



                mainFactory.getTestcaseDetail().get({
                    'testcasename': $scope.selectCase

                }).$promise.then(function(response) {
                    if (response.status == 1) {

                        $scope.contentInfo = response.result.testcase;

                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }

            function getSuiteInfo() {
                mainFactory.suiteDetail().get({
                    'suiteName': $scope.selectCase.split('.')[0]

                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        $scope.contentInfo = response.result.testsuite;

                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }


            function getTestDeatil() {


                if ($scope.selectType.name == 'Test Case') {
                    getTestcaseDetail();
                } else {
                    getSuiteDetail();
                }

            }

            function getSuiteDetail() {
                mainFactory.suiteDetail().get({
                    'suiteName': $scope.selectCase.split('.')[0]

                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        $scope.displayTable = false;
                        $scope.contentInfo = response.result.testsuite;

                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }


            function getTestcaseDetail() {
                mainFactory.getTestcaseDetail().get({
                    'testcasename': $scope.selectCase

                }).$promise.then(function(response) {
                    if (response.status == 1) {

                        $scope.displayTable = false;
                        $scope.contentInfo = response.result.testcase;

                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }



            function addCasetoTask(content) {
                mainFactory.taskAddEnv().put({
                    'taskId': $stateParams.taskId,
                    'action': 'add_case',
                    'args': {
                        'task_id': $stateParams.taskId,
                        'case_name': $scope.selectCase,
                        'case_content': content
                    }
                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        toaster.pop({
                            type: 'success',
                            title: 'add test case success',
                            body: 'you can go next step',
                            timeout: 3000
                        });
                        $scope.ifHasCase = true;


                    } else {
                        toaster.pop({
                            type: 'error',
                            title: 'create task wrong',
                            body: '',
                            timeout: 3000
                        });
                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'create task wrong',
                        body: '',
                        timeout: 3000
                    });
                })
            }

            function addSuitetoTask(content) {
                mainFactory.taskAddEnv().put({
                    'taskId': $stateParams.taskId,
                    'action': 'add_suite',
                    'args': {
                        'task_id': $stateParams.taskId,
                        'suite_name': $scope.selectCase.split('.')[0],
                        'suite_content': content
                    }
                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        toaster.pop({
                            type: 'success',
                            title: 'add test suite success',
                            body: 'you can go next step',
                            timeout: 3000
                        });
                        $scope.ifHasSuite = true;


                    } else {
                        toaster.pop({
                            type: 'error',
                            title: 'create task wrong',
                            body: 'wrong',
                            timeout: 3000
                        });
                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'create task wrong',
                        body: 'something wrong',
                        timeout: 3000
                    });
                })
            }
            $scope.changeStatussourceTrue = function changeStatussourceTrue() {
                $scope.selectCase = null;
                $scope.sourceShow = true;
            }

            $scope.changeStatussourceFalse = function changeStatussourceFalse() {
                $scope.sourceShow = false;
            }

            function confirmToServer(content1, content2) {

                var content;
                if ($scope.sourceShow == false) {
                    content = content2;
                    $scope.selectCase = $scope.taskDetailData.case_name;
                } else if ($scope.sourceShow == true) {
                    content = content1;
                }
                if ($scope.selectCase == 'Test Case' || $scope.taskDetailData.suite == false) {

                    addCasetoTask(content);
                } else {
                    addSuitetoTask(content);
                }
            }


            function addEnvToTask() {

                mainFactory.taskAddEnv().put({
                    'taskId': $stateParams.taskId,
                    'action': 'add_environment',
                    'args': {
                        'task_id': $stateParams.taskId,
                        'environment_id': $scope.selectEnv
                    }
                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        toaster.pop({
                            type: 'success',
                            title: 'add environment success',
                            body: 'you can go next step',
                            timeout: 3000
                        });
                        $scope.ifHasEnv = true;


                    } else {
                        toaster.pop({
                            type: 'error',
                            title: 'create task wrong',
                            body: 'you can go next step',
                            timeout: 3000
                        });
                    }



                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'create task wrong',
                        body: 'you can go next step',
                        timeout: 3000
                    });
                })
            }

            $scope.goBack = function goBack() {
                window.history.back();
            }

            $scope.runAtask = function runAtask() {
                mainFactory.taskAddEnv().put({
                    'taskId': $stateParams.taskId,
                    'action': 'run',
                    'args': {
                        'task_id': $stateParams.taskId
                    }
                }).$promise.then(function(response) {
                    if (response.status == 1) {
                        toaster.pop({
                            type: 'success',
                            title: 'run a task success',
                            body: 'go to task list page...',
                            timeout: 3000
                        });
                        setTimeout(function() {
                            window.history.back();
                        }, 2000);



                    } else {
                        toaster.pop({
                            type: 'error',
                            title: 'fail',
                            body: response.error_msg,
                            timeout: 3000
                        });
                    }
                }, function(error) {
                    toaster.pop({
                        type: 'error',
                        title: 'fail',
                        body: 'unknow error',
                        timeout: 3000
                    });
                })
            }














        }
    ]);

angular.module('yardStickGui2App').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/container.html',
    "<!--container management--> <div class=\"content\"> <div style=\"display:flex;flex-direction:row\"> <div style=\"width:750px\"> <h3>{{envName}} -- Container <!--<button class=\"btn btn-default\" style=\"float:right\">Go Next</button>--> </h3> <!--<p>In this process, you can input your define openrc config or upload a openrc file</p>--> <hr> <select ng-model=\"selectContainer\" data-ng-options=\"container as container.name for container in containerList\"> <option value=\"\">Choose...</option> </select> <button class=\"btn btn-default\" ng-click=\"createContainer()\" ng-disabled=\"selectContainer==null\"> <div ng-show=\"!showloading\">Create</div> <img src=\"images/loading2.gif\" width=\"25\" height=\"25\" ng-if=\"showloading\"> </button> <hr> <div> <h4 ng-show=\"displayContainerInfo.length==0\">No Container Data</h4> <div ng-show=\"displayContainerInfo.length!=0\"> <h4>Current Container</h4> <table class=\"table table-striped\"> <tr> <th>name</th> <th>status</th> <th>time</th> <th>delete</th> </tr> <tr ng-repeat=\"con in displayContainerInfo\"> <td>{{con.name}}</td> <td>{{con.status}}</td> <td>{{con.time}}</td> <td> <button class=\"btn btn-default btn-sm\" ng-click=\"openDeleteEnv(con.id,'container')\">Delete</button> </td> </tr> </table> </div> </div> </div> </div> </div> <toaster-container></toaster-container> <style>.form-control {\n" +
    "        border-radius: 5px;\n" +
    "        width: 200px;\n" +
    "        margin-bottom: 10px;\n" +
    "    }\n" +
    "\n" +
    "    .uploadbutton {\n" +
    "        background-color: #007ACC;\n" +
    "        color: #fff;\n" +
    "        border: 0px;\n" +
    "        border-radius: 5px;\n" +
    "        height: 27px;\n" +
    "    }\n" +
    "\n" +
    "    .edit-title {\n" +
    "        border: 0px;\n" +
    "        background-color: #ffffff;\n" +
    "        margin-bottom: 5px;\n" +
    "        font-size: 12px;\n" +
    "    }\n" +
    "\n" +
    "    .null-edit-title {\n" +
    "        border: 1px solid #e5e6e7;\n" +
    "        border-radius: 5px;\n" +
    "        margin-bottom: 3px;\n" +
    "    }\n" +
    "\n" +
    "    .item-info {\n" +
    "        display: flex;\n" +
    "        flex-direction: row;\n" +
    "    }\n" +
    "\n" +
    "    .delete-img {\n" +
    "        width: 15px;\n" +
    "        height: 15px;\n" +
    "        opacity: 0.8;\n" +
    "        margin-left: -10px;\n" +
    "        margin-top: -3px;\n" +
    "        cursor: pointer;\n" +
    "    }\n" +
    "\n" +
    "    .nextButton {\n" +
    "        margin-top: 30px;\n" +
    "        border: none;\n" +
    "        border-radius: 5px;\n" +
    "        padding: 6px;\n" +
    "        background-color: #339933;\n" +
    "        color: #ffffff;\n" +
    "        text-align: center;\n" +
    "        /* margin-left: 300px; */\n" +
    "    }\n" +
    "\n" +
    "    select {\n" +
    "        height: 30px;\n" +
    "        border-radius: 5px;\n" +
    "        border: 1px solid #e8e8e8;\n" +
    "        width: 135px;\n" +
    "        margin-top: 20px;\n" +
    "        margin-left: 20px;\n" +
    "    }</style>"
  );


  $templateCache.put('views/content.html',
    ""
  );


  $templateCache.put('views/environmentDetail.html',
    "<!--environment detail page--> <div class=\"content\" style=\"overflow-x: scroll\"> <div style=\"display:flex;flex-direction:row\"> <div> <h3> {{baseElementInfo.name}} -- Openrc <button class=\"btn btn-default\" style=\"float:right\" ng-click=\"goNext()\">Next</button> <button class=\"btn btn-default\" style=\"float:right;margin-right:10px\" ng-click=\"openDeleteEnv(1,'openrc')\">Delete</button> </h3> <!--<p>In this process, you can input your define openrc config or upload a openrc file</p>--> <div> <button style=\"display:inline\" class=\"btn btn-default\" ng-click=\"addEnvironment()\" ng-show=\"uuid==null\">Add Name</button> </div> <hr> <div bs-tabs style=\"width:600px\"> <div data-title=\"Detail\" bs-pane ng-if=\"openrcInfo.openrc!=null\"> <h4> You have already set up the openrc parameters </h4> <hr> <div ng-repeat=\"(key,value) in openrcInfo.openrc\"> <nobr> <font style=\"font-weight:600;font-size:14px\">{{key}} : </font> <font style=\"font-size:14px\">{{value}}</font> </nobr> </div> </div> <div data-title=\"Update\" bs-pane> <div style=\"margin-top:20px\"> <button class=\"btn btn-default\" ng-click=\"addInfo()\" style=\"margin-bottom:20px\">Add</button> <div style=\"height:300px;width:800px;display:flex;flex-direction:column;flex-wrap:wrap;margin-left:5px\"> <div ng-repeat=\"info in envInfo\"> <!--<div> {{info.name}}</div>--> <input class=\"edit-title\" ng-model=\"info.name\" ng-class=\"{'null-edit-title':info.name==null}\" ng-attr-type=\"{{info.name.indexOf('PASSWORD')>-1 ? password : text}}\"> <div class=\"item-info\"> <input class=\"form-control\" type=\"text\" ng-model=\"info.value\"> <!--<button class=\"delete-button\" ng-click=\"deleteEnvItem($index)\">delete</button>--> <img src=\"images/close.png\" ng-click=\"deleteEnvItem($index)\" class=\"delete-img\"> </div> </div> </div> <button class=\"btn btn-default\" ng-click=\"submitOpenRcFile()\" style=\"margin-bottom:20px\"> <div ng-if=\"!showloading\">submit</div> <img src=\"images/loading2.gif\" width=\"25\" height=\"25\" ng-if=\"showloading\"> </button> </div> </div> <div data-title=\"Upload File\" bs-pane> <div style=\"margin-top:20px;height:405px\"> <button class=\"btn btn-default\" style=\"margin-bottom:20px\" ngf-select=\"uploadFiles($file, $invalidFiles)\" ngf-max-size=\"5MB\"> <div ng-show=\"!loadingOPENrc\">Upload</div> <img src=\"images/loading2.gif\" width=\"25\" height=\"25\" ng-if=\"loadingOPENrc\"> </button> <!--<div ng-show=\"displayOpenrcFile!=null || displayOpenrcFile!=undefined\">\n" +
    "                            {{displayOpenrcFile.name}} last modified: {{filelastModified}}\n" +
    "                        </div>--> </div> </div> </div> </div> </div> </div> <toaster-container></toaster-container> <style>.form-control {\n" +
    "        border-radius: 5px;\n" +
    "        width: 200px;\n" +
    "        margin-bottom: 10px;\n" +
    "    }\n" +
    "\n" +
    "    .uploadbutton {\n" +
    "        background-color: #007ACC;\n" +
    "        color: #fff;\n" +
    "        border: 0px;\n" +
    "        border-radius: 5px;\n" +
    "        height: 27px;\n" +
    "    }\n" +
    "\n" +
    "    .edit-title {\n" +
    "        border: 0px;\n" +
    "        background-color: #ffffff;\n" +
    "        margin-bottom: 5px;\n" +
    "        font-size: 12px;\n" +
    "    }\n" +
    "\n" +
    "    .null-edit-title {\n" +
    "        border: 1px solid #e5e6e7;\n" +
    "        border-radius: 5px;\n" +
    "        margin-bottom: 3px;\n" +
    "    }\n" +
    "\n" +
    "    .item-info {\n" +
    "        display: flex;\n" +
    "        flex-direction: row;\n" +
    "    }\n" +
    "\n" +
    "    .delete-img {\n" +
    "        width: 15px;\n" +
    "        height: 15px;\n" +
    "        opacity: 0.8;\n" +
    "        margin-left: -10px;\n" +
    "        margin-top: -3px;\n" +
    "        cursor: pointer;\n" +
    "    }\n" +
    "\n" +
    "    .nextButton {\n" +
    "        margin-top: 30px;\n" +
    "        border: none;\n" +
    "        border-radius: 5px;\n" +
    "        padding: 6px;\n" +
    "        background-color: #339933;\n" +
    "        color: #ffffff;\n" +
    "        text-align: center;\n" +
    "        /* margin-left: 300px; */\n" +
    "    }</style>"
  );


  $templateCache.put('views/environmentList.html',
    "<div class=\"content\"> <!--environmentList--> <i class=\"fa fa-arrow-left fa-1x\" aria-hidden=\"true\" style=\"color: #999;cursor:pointer\" ng-click=\"goBack()\">Back</i> <div> <h3>Environments <button class=\"btn btn-default btn-sm\" style=\"margin-left:30px;display:inline\" ng-click=\"openEnvironmentDialog()\">Add</button> </h3> <hr> <!--<div ng-repeat=\"env in environmentList\">\n" +
    "            {{env.name}}\n" +
    "        </div>--> <div dw-loading=\"key\" dw-loading-options=\"{text:'loading'}\"> <div style=\"display:flex;flex-direction:row;justify-content:space-between;padding:8px;border-top: 1px solid #e9ecec;background-color: #f9f9f9\"> <div style=\"font-weight:600\">Name</div> <div style=\"font-weight:600;margin-right:80px\">Action</div> </div> <div dir-paginate=\"env in environmentList | orderBy:'-id' | itemsPerPage: 10 \"> <div style=\"display:flex;flex-direction:row;justify-content:space-between;padding:8px;border-top: 1px solid #e9ecec\"> <div> <a style=\"color:#4dc5cf\" ng-click=\"gotoDetail('false',env.uuid)\">{{env.name}}</a></div> <div> <!-- <button class=\"btn btn-default btn-sm\" ng-click=\"openDeleteEnv(env.uuid,'environment')\">Delete</button> --> <div class=\"btn-group\" uib-dropdown is-open=\"status.isopen\" style=\"margin-right:60px\"> <button id=\"single-button\" type=\"button\" class=\"btn btn-default btn-sm\" uib-dropdown-toggle> delete <span class=\"caret\"></span> </button> <ul class=\"dropdown-menu\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"single-button\"> <li role=\"menuitem\"><a ng-click=\"openDeleteEnv(env.uuid,'environment')\">delete</a></li> </ul> </div> </div> </div> </div> <center> <dir-pagination-controls></dir-pagination-controls> </center> </div> </div> </div> <toaster-container></toaster-container> <style>.form-control {\n" +
    "        border-radius: 5px;\n" +
    "        width: 300px;\n" +
    "        margin-bottom: 10px;\n" +
    "    }\n" +
    "\n" +
    "    .uploadbutton {\n" +
    "        background-color: #007ACC;\n" +
    "        color: #fff;\n" +
    "        border: 0px;\n" +
    "        border-radius: 5px;\n" +
    "        height: 27px;\n" +
    "    }\n" +
    "\n" +
    "    .edit-title {\n" +
    "        border: 0px;\n" +
    "        background-color: #ffffff;\n" +
    "        margin-bottom: 5px;\n" +
    "    }\n" +
    "\n" +
    "    .null-edit-title {\n" +
    "        border: 1px solid #e5e6e7;\n" +
    "        border-radius: 5px;\n" +
    "        margin-bottom: 3px;\n" +
    "    }\n" +
    "\n" +
    "    .item-info {\n" +
    "        display: flex;\n" +
    "        flex-direction: row;\n" +
    "    }\n" +
    "\n" +
    "    .delete-img {\n" +
    "        width: 19px;\n" +
    "        height: 19px;\n" +
    "        opacity: 0.8;\n" +
    "        margin-left: 5px;\n" +
    "        margin-top: 4px;\n" +
    "        cursor: pointer;\n" +
    "    }\n" +
    "\n" +
    "    .deepColor {\n" +
    "        background-color: #f9f9f9;\n" +
    "    }\n" +
    "\n" +
    "    .nextButton {\n" +
    "        margin-top: 30px;\n" +
    "        border: none;\n" +
    "        border-radius: 5px;\n" +
    "        padding: 6px;\n" +
    "        background-color: #339933;\n" +
    "        color: #ffffff;\n" +
    "        text-align: center;\n" +
    "        /* margin-left: 300px; */\n" +
    "    }\n" +
    "\n" +
    "    .bs-sidenav {\n" +
    "        margin-top: 40px;\n" +
    "        margin-bottom: 20px;\n" +
    "        width: 124px;\n" +
    "    }\n" +
    "\n" +
    "    .nav {\n" +
    "        margin-bottom: 0;\n" +
    "        padding-left: 0;\n" +
    "        list-style: none;\n" +
    "    }\n" +
    "\n" +
    "    .nav>li {\n" +
    "        position: relative;\n" +
    "        display: block;\n" +
    "    }\n" +
    "\n" +
    "    li {\n" +
    "        display: list-item;\n" +
    "        text-align: -webkit-match-parent;\n" +
    "    }\n" +
    "\n" +
    "    a {\n" +
    "        cursor: pointer;\n" +
    "    }\n" +
    "\n" +
    "    a.active {\n" +
    "        background-color: #EEEEEE;\n" +
    "        border-radius: 5px;\n" +
    "    }</style>"
  );


  $templateCache.put('views/layout/footer.html',
    "<div class=\"footer\"> <div class=\"container\"> <p></p> </div> </div>"
  );


  $templateCache.put('views/layout/header.html',
    "<div class=\"header\"> <div class=\"navbar navbar-default\" role=\"navigation\"> <div> <div class=\"navbar-header\"> <img src=\"images/logo.png\" style=\"width:50px;height:50px;float:left;margin-left:20px\"> <a class=\"navbar-brand\" href=\"#/\">Yardstick</a> </div> </div> </div> </div>  <style>.header {\n" +
    "        position: fixed;\n" +
    "        top: 0px;\n" +
    "        width: 100%;\n" +
    "        /*box-shadow: 3px 2px 5px #888888;*/\n" +
    "        z-index: 9;\n" +
    "    }\n" +
    "\n" +
    "    .navbar {\n" +
    "        position: relative;\n" +
    "        min-height: 50px;\n" +
    "        margin-bottom: 0px;\n" +
    "        border: none;\n" +
    "        /* border: 1px solid transparent; */\n" +
    "    }\n" +
    "\n" +
    "    .navbar {\n" +
    "        border-radius: 0px;\n" +
    "        background-color: #CAEEF1;\n" +
    "        color: #fff;\n" +
    "    }\n" +
    "\n" +
    "    .navbar-default .navbar-brand {\n" +
    "        color: #333;\n" +
    "    }</style>"
  );


  $templateCache.put('views/layout/sideNav.html',
    "<div class=\"naviSide\"> <ul class=\"nav bs-sidenav\"> <div class=\"panel-group\" role=\"tablist \" aria-multiselectable=\"true \" bs-collapse style=\"margin-bottom:0px\"> <div class=\"panel panel-default\"> <div class=\"panel-heading\" role=\"tab \"> <h4 class=\"panel-title\"> <a bs-collapse-toggle style=\"text-decoration: none\" ng-click=\"gotoProject();\"> Project </a> </h4> </div> </div> </div> <div class=\"panel-group\" role=\"tablist\" aria-multiselectable=\"true\" bs-collapse style=\"margin-bottom:0px\" ng-model=\"activeStatus\" ng-if=\"ifshowEnvChild\"> <div class=\"panel panel-default\"> <div class=\"panel-heading\" role=\"tab\"> <h4 class=\"panel-title\"> <a bs-collapse-toggle style=\"text-decoration: none\"> <div style=\"display:inline\" ng-click=\"gotoEnviron()\">Environment </div> <i class=\"fa fa-sort-asc\" aria-hidden=\"true\" style=\"margin-left: 71px;display:inline\" ng-show=\"activeStatus==0\"></i> <i class=\"fa fa-sort-desc\" aria-hidden=\"true\" style=\"margin-left: 71px;display:inline\" ng-show=\"activeStatus==-1\"></i> </a> </h4> </div> <div class=\"panel-collapse\" role=\"tabpanel\" bs-collapse-target> <div class=\"panel-body\" style=\"border-top: 2px solid grey;text-align: right;cursor:pointer\" ng-click=\"gotoOpenrcPage()\" ng-class=\"{active:$state.includes('app.environmentDetail')}\"> Openrc </div> <div class=\"panel-body\" style=\"border:none;text-align: right;cursor:pointer\" ng-click=\"gotoUploadPage()\" ng-class=\"{active:$state.includes('app.uploadImage')}\"> Image </div> <div class=\"panel-body\" style=\"border:none;text-align: right;cursor:pointer\" ng-click=\"gotoPodPage()\" ng-class=\"{active:$state.includes('app.podUpload')}\"> Pod File </div> <div class=\"panel-body\" style=\"border:none;text-align: right;cursor:pointer\" ng-click=\"gotoContainerPage()\" ng-class=\"{active:$state.includes('app.container')}\"> Container </div> <div class=\"panel-body\" style=\"border:none;text-align: right\"> Others </div> </div> </div> </div> <div class=\"panel-group\" role=\"tablist\" aria-multiselectable=\"false\" bs-collapse style=\"margin-bottom:0px\" ng-if=\"!ifshowEnvChild\"> <div class=\"panel panel-default\"> <div class=\"panel-heading\" role=\"tab\"> <h4 class=\"panel-title\"> <a bs-collapse-toggle style=\"text-decoration: none\"> <div style=\"display:inline\" ng-click=\"gotoEnviron()\">Environment </div> <!--<i class=\"fa fa-sort-asc\" aria-hidden=\"true\" style=\"margin-left: 71px;display:inline\"></i>--> </a> </h4> </div> </div> </div> <div class=\"panel-group\" role=\"tablist \" aria-multiselectable=\"true \" bs-collapse style=\"margin-bottom:0px\"> <div class=\"panel panel-default\"> <div class=\"panel-heading\" role=\"tab \"> <h4 class=\"panel-title\"> <a bs-collapse-toggle style=\"text-decoration: none\" ng-click=\"gotoTestcase()\"> Test Case </a> </h4> </div> </div> </div> <div class=\"panel-group\" role=\"tablist \" aria-multiselectable=\"true \" bs-collapse style=\"margin-bottom:0px\"> <div class=\"panel panel-default\"> <div class=\"panel-heading\" role=\"tab \"> <h4 class=\"panel-title\"> <a bs-collapse-toggle style=\"text-decoration: none\" ng-click=\"gotoSuite()\"> Test Suite </a> </h4> </div> </div> </div> </ul> </div> <style>.bs-sidenav {\n" +
    "        margin-top: 21px;\n" +
    "        margin-bottom: 20px;\n" +
    "        width: 124px;\n" +
    "    }\n" +
    "\n" +
    "    .naviSide {\n" +
    "        height: 150%;\n" +
    "    }\n" +
    "\n" +
    "    .nav {\n" +
    "        margin-bottom: 0;\n" +
    "        padding-left: 0;\n" +
    "        list-style: none;\n" +
    "    }\n" +
    "\n" +
    "    .nav>li {\n" +
    "        position: relative;\n" +
    "        display: block;\n" +
    "    }\n" +
    "\n" +
    "    li {\n" +
    "        display: list-item;\n" +
    "        text-align: -webkit-match-parent;\n" +
    "    }\n" +
    "\n" +
    "    a {\n" +
    "        cursor: pointer;\n" +
    "    }\n" +
    "\n" +
    "    a.active {\n" +
    "        background-color: #EEEEEE;\n" +
    "        border-radius: 5px;\n" +
    "        width: 165px;\n" +
    "    }\n" +
    "    /*\n" +
    "    a:hover {\n" +
    "        width: 165px;\n" +
    "    }*/\n" +
    "\n" +
    "    .nav>li>a:hover,\n" +
    "    .nav>li>a:focus {\n" +
    "        text-decoration: underline;\n" +
    "        background-color: transparent;\n" +
    "    }\n" +
    "\n" +
    "    .active.panel-body {\n" +
    "        background-color: #dfe3e4;\n" +
    "    }</style>"
  );


  $templateCache.put('views/main.html',
    "<div> <div ng-include=\"'views/layout/header.html'\"></div> </div> <div ng-include=\"'views/layout/sideNav.html'\"></div> <div style=\"margin-top:80px;margin-left:100px;display:flex;flex-direction:row\"> <!--<div ncy-breadcrumb></div>--> <div> <ol class=\"progressDefine\"> <li data-step=\"1\" ng-click=\"gotoProject();\" style=\"cursor:pointer\" ng-class=\"{'is-complete':projectShow}\"> Project </li> <li data-step=\"2\" ng-class=\"{'is-complete':taskShow}\"> Task </li> <li data-step=\"3\" ng-class=\"{'progressDefine__last':reportShow}\"> Reporting </li> </ol> </div> </div> <div ui-view></div> <style>.stepsContent {\n" +
    "        display: flex;\n" +
    "        flex-direction: row;\n" +
    "        justify-content: space-around;\n" +
    "        margin-left: 120px;\n" +
    "        margin-top: 100px;\n" +
    "    }\n" +
    "\n" +
    "    .stepItem {\n" +
    "        display: flex;\n" +
    "        flex-direction: column;\n" +
    "    }\n" +
    "\n" +
    "    .nextButton {\n" +
    "        margin-left: 500px;\n" +
    "    }\n" +
    "\n" +
    "    .progressDefine {\n" +
    "        list-style: none;\n" +
    "        margin: 0;\n" +
    "        padding: 0;\n" +
    "        display: table;\n" +
    "        table-layout: fixed;\n" +
    "        width: 100%;\n" +
    "        color: #849397;\n" +
    "    }\n" +
    "\n" +
    "    .progressDefine>li {\n" +
    "        position: relative;\n" +
    "        display: table-cell;\n" +
    "        text-align: center;\n" +
    "        font-size: 0.8em;\n" +
    "    }\n" +
    "\n" +
    "    .progressDefine>li:before {\n" +
    "        content: attr(data-step);\n" +
    "        display: block;\n" +
    "        margin: 0 auto;\n" +
    "        background: #DFE3E4;\n" +
    "        width: 3em;\n" +
    "        height: 3em;\n" +
    "        text-align: center;\n" +
    "        margin-bottom: 0.25em;\n" +
    "        line-height: 3em;\n" +
    "        border-radius: 100%;\n" +
    "        position: relative;\n" +
    "        z-index: 5;\n" +
    "    }\n" +
    "\n" +
    "    .progressDefine>li:after {\n" +
    "        content: '';\n" +
    "        position: absolute;\n" +
    "        display: block;\n" +
    "        background: #DFE3E4;\n" +
    "        width: 100%;\n" +
    "        height: 0.5em;\n" +
    "        top: 1.25em;\n" +
    "        left: 50%;\n" +
    "        margin-left: 1.5em\\9;\n" +
    "        z-index: -1;\n" +
    "    }\n" +
    "\n" +
    "    .progressDefine>li:last-child:after {\n" +
    "        display: none;\n" +
    "    }\n" +
    "\n" +
    "    .progressDefine>li.is-complete {\n" +
    "        color: #4dc5cf;\n" +
    "    }\n" +
    "\n" +
    "    .progressDefine>li.is-complete:before,\n" +
    "    .progressDefine>li.is-complete:after {\n" +
    "        color: #FFF;\n" +
    "        background: #4dc5cf;\n" +
    "    }\n" +
    "\n" +
    "    .progressDefine>li.is-active {\n" +
    "        color: #3498DB;\n" +
    "    }\n" +
    "\n" +
    "    .progressDefine>li.is-active:before {\n" +
    "        color: #FFF;\n" +
    "        background: #3498DB;\n" +
    "    }\n" +
    "    /**\n" +
    " * Needed for IE8\n" +
    " */\n" +
    "\n" +
    "    .progressDefine__last:after {\n" +
    "        display: none !important;\n" +
    "    }\n" +
    "    /**\n" +
    " * Size Extensions\n" +
    " */\n" +
    "\n" +
    "    .progressDefine--medium {\n" +
    "        font-size: 1.5em;\n" +
    "    }\n" +
    "\n" +
    "    .progressDefine--large {\n" +
    "        font-size: 2em;\n" +
    "    }\n" +
    "    /**\n" +
    " * Some Generic Stylings\n" +
    " */\n" +
    "\n" +
    "    *,\n" +
    "    *:after,\n" +
    "    *:before {\n" +
    "        box-sizing: border-box;\n" +
    "    }\n" +
    "\n" +
    "    h1 {\n" +
    "        margin-bottom: 1.5em;\n" +
    "    }\n" +
    "\n" +
    "    .progressDefine {\n" +
    "        margin-bottom: 3em;\n" +
    "    }\n" +
    "\n" +
    "    a {\n" +
    "        color: #3498DB;\n" +
    "        text-decoration: none;\n" +
    "    }\n" +
    "\n" +
    "    a:hover {\n" +
    "        text-decoration: underline;\n" +
    "    }\n" +
    "    /*\n" +
    "    body {\n" +
    "        text-align: center;\n" +
    "        color: #444;\n" +
    "    }*/</style>"
  );


  $templateCache.put('views/modal/chooseContainer.html',
    "<h3>Choose Containers</h3> <hr> <style>select {\n" +
    "        height: 30px;\n" +
    "        border-radius: 5px;\n" +
    "        border: 1px solid #e8e8e8;\n" +
    "        width: 135px;\n" +
    "        margin-top: 20px;\n" +
    "        margin-left: 20px;\n" +
    "    }</style>"
  );


  $templateCache.put('views/modal/deleteConfirm.html',
    "<div>Confirm delete {{deleteName}} ?</div> <div style=\"display:flex;flex-direction:row; margin-left: 150px;margin-top: 30px\"> <button class=\"btn btn-default\" ng-click=\"deleteEnv()\" ng-show=\"deleteName=='environment'\">Confirm</button> <button class=\"btn btn-default\" ng-click=\"deleteProject()\" ng-show=\"deleteName=='project'\">Confirm</button> <button class=\"btn btn-default\" ng-click=\"deleteTask()\" ng-show=\"deleteName=='task'\">Confirm</button> <button class=\"btn btn-default\" ng-click=\"deleteTestCase()\" ng-show=\"deleteName=='test case'\">Confirm</button> <button class=\"btn btn-default\" ng-click=\"deleteSuite()\" ng-show=\"deleteName=='test suite'\">Confirm</button> <button class=\"btn btn-default\" ng-click=\"deleteContainer()\" ng-show=\"deleteName=='container'\">Confirm</button> <button class=\"btn btn-default\" ng-click=\"deletePod()\" ng-show=\"deleteName=='pod'\">Confirm</button> <button class=\"btn btn-default\" ng-click=\"deleteOpenRc()\" ng-show=\"deleteName=='openrc'\">Confirm</button> <button class=\"btn btn-default\" style=\"margin-left:10px\" ng-click=\"closeThisDialog()\">Cancel</button> </div>"
  );


  $templateCache.put('views/modal/environmentDialog.html',
    "<!--environment input dialog--> <div> <div ng-if=\"uuidEnv==null\"> <h4>Environment Name</h4> <input type=\"text\" ng-model=\"name\" style=\"width:300px\"> <div style=\"text-align:center;margin-top:20px\"> <button class=\"btn btn-default\" ng-disabled=\" name==null || name==''\" ng-click=\"addEnvironment(name)\">Create</button> </div> </div> <div style=\"display:flex;flex-direction:row\" ng-if=\"uuidEnv!=null&&showImage==null\"> <div> <h3> {{name}} -- Openrc <!--<button class=\"btn btn-default\" style=\"float:right\" ng-click=\"goNext()\">Next</button>--> <button class=\"btn btn-default\" ng-click=\"goToImage()\" style=\"margin-bottom:20px;float:right\" ng-disabled=\"showNextOpenRc==null && showNextOpenRc==null \"> Next </button> </h3> <!--<p>In this process, you can input your define openrc config or upload a openrc file</p>--> <div> <!--<button style=\"display:inline;\" class=\"btn btn-default\" ng-click=\"addEnvironment()\" ng-show=\"uuid==null\">Add Name</button>--> </div> <hr> <div bs-tabs style=\"width:750px\"> <div data-title=\"Detail\" bs-pane ng-if=\"openrcInfo.openrc!=null\"> <h4> You have already set up the openrc parameters </h4> <hr> <div ng-repeat=\"(key,value) in openrcInfo.openrc\"> <nobr> <font style=\"font-weight:600;font-size:14px\">{{key}} : </font> <font style=\"font-size:14px\">{{value}}</font> </nobr> </div> </div> <div data-title=\"Update\" bs-pane> <div style=\"margin-top:20px\"> <button class=\"btn btn-default\" ng-click=\"addInfo()\" style=\"margin-bottom:20px\">Add</button> <div style=\"height:300px;width:800px;display:flex;flex-direction:column;flex-wrap:wrap;margin-left:5px;overflow-x:scroll\"> <div ng-repeat=\"info in envInfo\"> <!--<div> {{info.name}}</div>--> <input class=\"edit-title\" ng-model=\"info.name\" ng-class=\"{'null-edit-title':info.name==null}\" ng-attr-type=\"{{info.name.indexOf('PASSWORD')>-1 ? password : text}}\"> <div class=\"item-info\"> <input class=\"form-control\" type=\"text\" ng-model=\"info.value\"> <!--<button class=\"delete-button\" ng-click=\"deleteEnvItem($index)\">delete</button>--> <img src=\"images/close.png\" ng-click=\"deleteEnvItem($index)\" class=\"delete-img\"> </div> </div> </div> <button class=\"btn btn-default\" ng-click=\"submitOpenRcFile();\" style=\"margin-bottom:20px\"> <div ng-if=\"!showloading\">Submit</div> <img src=\"images/loading2.gif\" width=\"25\" height=\"25\" ng-if=\"showloading\"> </button> </div> </div> <div data-title=\"Upload File\" bs-pane> <div style=\"margin-top:20px;height:405px\"> <button class=\"btn btn-default\" style=\"margin-bottom:20px\" ngf-select=\"uploadFiles($file, $invalidFiles);\" ngf-max-size=\"5MB\"> <div ng-show=\"!loadingOPENrc\">Upload</div> <img src=\"images/loading2.gif\" width=\"25\" height=\"25\" ng-if=\"loadingOPENrc\"> </button> <!--<button class=\"btn btn-default\" style=\"margin-bottom:20px;\" ng-disabled=\"showNextOpenRc==null\" ng-click=\"goToImage()\">\n" +
    "                                       Next\n" +
    "                        </button>--> <!--<div ng-if=\"displayOpenrcFile!=null || displayOpenrcFile!=undefined\">\n" +
    "                            {{displayOpenrcFile.name}} last modified: {{filelastModified}}\n" +
    "                        </div>--> </div> </div> </div> </div> </div> <div ng-if=\"showImage==1&&showPod==null\"> <div style=\"display:flex;flex-direction:row\"> <div style=\"width:750px\"> <h3>{{name}} -- Image <button class=\"btn btn-default\" ng-click=\"goToPod()\" ng-disabled=\"showNextPod==null\" style=\"float:right\"> Next </button> <button class=\"btn btn-default\" ng-click=\"goToPodPrev()\" style=\"margin-right:5px;float:right\"> Back </button> </h3> <!--<p>In this process, you can input your define openrc config or upload a openrc file</p>--> <hr> <button class=\"btn btn-default\" ng-click=\"uploadImage()\"> <div ng-if=\"!showloading\">Load Image</div> <img src=\"images/loading2.gif\" width=\"25\" height=\"25\" ng-if=\"showloading\"> </button> <i class=\"fa fa-check\" aria-hidden=\"true\" style=\"margin-top:34px;margin-left:5px;color: #2ecc71\" ng-show=\"imageStatus==1&&showImageStatus==1\">done</i> <i class=\"fa fa-spinner\" aria-hidden=\"true\" style=\"margin-top:34px;margin-left:5px;color: #2ecc71\" ng-show=\"imageStatus==0&&showImageStatus==1\">loading</i> <i class=\"fa fa-exclamation-triangle\" aria-hidden=\"true\" style=\"margin-top:34px;margin-left:5px;color: red\" ng-show=\"imageStatus==2&&showImageStatus==1\">error</i> <!--<button class=\"btn btn-default\" ng-click=\"goToPod()\" ng-disabled=\"showNextPod==null\">\n" +
    "                 Next\n" +
    "            </button>--> <hr> <h4>Current Images</h4> <div> <table class=\"table table-striped\"> <tr> <th>choose</th> <th>name</th> <th>description</th> <th>status</th> </tr> <tr ng-repeat=\"(name, value) in yardstickImage\"> <td ng-if=\"selectImageList.indexOf(name) > -1\"><span class=\"glyphicon glyphicon-check\" aria-hidden=\"true\" ng-click=\"unselectImage(name)\"></span></td> <td ng-if=\"selectImageList.indexOf(name) == -1\"><span class=\"glyphicon glyphicon-unchecked\" aria-hidden=\"true\" ng-click=\"selectImage(name)\"></span></td> <td>{{name}}</td> <td>{{value.description}}</td> <td>{{value.status}}</td> </tr> </table> </div> </div> </div> </div> <div ng-if=\"showPod==1&&showContainer==null\"> <div style=\"display:flex;flex-direction:row\"> <div style=\"width:750px\"> <h3>{{name}} -- Pod File <div style=\"float:right\"> <button class=\"btn btn-default\" ng-click=\"skipPodPrev()\">Back</button> <button class=\"btn btn-default\" ng-click=\"skipPod()\" ng-show=\"podData==null\">Skip</button> <button class=\"btn btn-default\" ng-click=\"skipPod()\" ng-show=\"podData!=null\">Next</button> </div> </h3> <hr> <button class=\"btn btn-default\" ngf-select=\"uploadFilesPod($file, $invalidFiles)\" ngf-max-size=\"5MB\"> <div ng-show=\"!loadingOPENrc\">Upload</div> <img src=\"images/loading2.gif\" width=\"25\" height=\"25\" ng-if=\"loadingOPENrc\"> </button> <hr> <div> <h4>Current Pod Configuration</h4> <table class=\"table table-striped\"> <tr> <th>ip</th> <th>name</th> <th>password</th> <th>role</th> <th>user</th> </tr> <tr ng-repeat=\"pod in podData.pod.nodes\"> <td>{{pod.ip}}</td> <td>{{pod.name}}</td> <td>{{pod.password}}</td> <td>{{pod.role}}</td> <td>{{pod.user}}</td> </tr> <tr ng-show=\"podData.length==0\"> <td>no data</td> </tr> </table> </div> </div> </div> </div> <div ng-if=\"showContainer!=null\"> <div style=\"display:flex;flex-direction:row\"> <div style=\"width:750px\"> <h3>{{name}} -- Container <div style=\"float:right\"> <button class=\"btn btn-default\" ng-click=\"skipContainerPrev()\">Back</button> <button class=\"btn btn-default\" ng-click=\"skipContainer()\" ng-show=\"ifskipOrClose!=1\"> Skip </button> <button class=\"btn btn-default\" ng-click=\"closeThisDialog(); getEnvironmentList();\" ng-show=\"ifskipOrClose==1\"> Close </button> </div> <!--<button class=\"btn btn-default\" style=\"float:right\">Go Next</button>--> </h3> <!--<p>In this process, you can input your define openrc config or upload a openrc file</p>--> <hr> <select ng-model=\"selectContainer\" data-ng-options=\"container as container.name for container in containerList\"> <option value=\"\">Choose...</option> </select> <button class=\"btn btn-default\" ng-click=\"createContainer(selectContainer)\" ng-disabled=\"selectContainer==null\"> <div ng-show=\"!showloading\">Create</div> <img src=\"images/loading2.gif\" width=\"25\" height=\"25\" ng-if=\"showloading\"> </button> <!--<button class=\"btn btn-default\" ng-click=\"skipContainer()\" ng-show=\"ifskipOrClose!=1\">\n" +
    "                            Skip\n" +
    "            </button>\n" +
    "                <button class=\"btn btn-default\" ng-click=\"closeThisDialog(); getEnvironmentList();\" ng-show=\"ifskipOrClose==1\">\n" +
    "                           Close\n" +
    "            </button>--> <hr> <div> <h4>Current Contain</h4> <table class=\"table table-striped\"> <tr> <th>name</th> <th>status</th> <th>time</th> </tr> <tr ng-repeat=\"con in displayContainerInfo\"> <td>{{con.name}}</td> <td>{{con.status}}</td> <td>{{con.time}}</td> </tr> </table> </div> </div> </div> </div> </div> <style>input {\n" +
    "        border-radius: 10px;\n" +
    "        border: 1px solid #eeeeee;\n" +
    "        width: 100%;\n" +
    "    }\n" +
    "\n" +
    "    select {\n" +
    "        height: 30px;\n" +
    "        border-radius: 5px;\n" +
    "        border: 1px solid #e8e8e8;\n" +
    "        width: 135px;\n" +
    "        margin-top: 20px;\n" +
    "        margin-left: 20px;\n" +
    "    }</style>"
  );


  $templateCache.put('views/modal/imageDialog.html',
    "<div> <h4>Enter Remote Image Url</h4> <input type=\"text\" ng-model=\"url\"> <div style=\"text-align:center;margin-top:20px\"> <button class=\"btn btn-default\" ng-disabled=\" url==null || url==''\" ng-click=\"uploadCustomImageByUrl(url)\">Upload</button> </div> </div> <style>input {\n" +
    "        border-radius: 10px;\n" +
    "        border: 1px solid #eeeeee;\n" +
    "        width: 100%;\n" +
    "    }</style>"
  );


  $templateCache.put('views/modal/projectCreate.html',
    "<div> <h4>Enter Project Name</h4> <input type=\"text\" ng-model=\"name\"> <div style=\"text-align:center;margin-top:20px\"> <button class=\"btn btn-default\" ng-disabled=\" name==null || name==''\" ng-click=\"createName(name)\">Create</button> </div> </div> <style>input {\n" +
    "        border-radius: 10px;\n" +
    "        border: 1px solid #eeeeee;\n" +
    "        width: 100%;\n" +
    "    }</style>"
  );


  $templateCache.put('views/modal/suiteName.html',
    "<h4>Enter Suite Name</h4> <hr> You have choose: <div ng-repeat=\"selected in suitReconstructList\">{{selected}}</div> <hr> <input type=\"text\" ng-model=\"name\"> <div style=\"text-align:center;margin-top:20px\"> <button class=\"btn btn-default\" ng-disabled=\"testsuiteList.length==0 || name==null || name==''\" ng-click=\"createSuite(name)\">Create</button> </div> <style>input {\n" +
    "        border-radius: 10px;\n" +
    "        border: 1px solid #eeeeee;\n" +
    "        width: 100%;\n" +
    "    }</style>"
  );


  $templateCache.put('views/modal/taskCreate.html',
    "<h4>Create Task</h4> <hr> <div> <div style=\"display:inline\">Name <input type=\"text\" ng-model=\"name\" style=\"width:200px\"></div> <button style=\"display:inline\" class=\"btn btn-default\" ng-disabled=\"name==null || name==''\" ng-click=\"createTask(name)\" ng-show=\"newUUID==null\">Create</button> </div> <hr> <div bs-tabs ng-show=\"newUUID!=null\"> <div data-title=\"Environment\" bs-pane> <div style=\"margin-top:10px\" ng-show=\"displayEnvName!=null\"> <div style=\"display:inline\">Choose Environment : {{displayEnvName}}</div> <button class=\"btn btn-default\" style=\"display:inline;float:right;margin-right:10px;margin-top: -4px\" ng-click=\"addEnvToTask()\">confirm</button> </div> <hr> <div dir-paginate=\"env in environmentList | orderBy:'-id' | itemsPerPage: 10 \"> <div style=\"display:flex;flex-direction:row;justify-content:space-between;padding:8px;border-top: 1px solid #e9ecec\" ng-class=\"{deepColor: $index%2==0}\"> <div> {{env.name}}</div> <!--<button class=\"btn btn-default btn-sm\" ng-click=\"gotoDetail('false',env.uuid)\">detail</button>--> <span class=\"glyphicon glyphicon-check\" aria-hidden=\"true\" ng-click=\"constructTestSuit(env.uuid,env.name)\" ng-show=\"selectEnv==env.uuid\"></span> <span class=\"glyphicon glyphicon-unchecked\" aria-hidden=\"true\" ng-click=\"constructTestSuit(env.uuid,env.name)\" ng-show=\"selectEnv!=env.uuid\"></span> </div> <!--<hr style=\"margin-top:5px;margin-bottom:5px;\" />--> </div> <center> <dir-pagination-controls></dir-pagination-controls> </center> </div> <div data-title=\"Content\" bs-pane> <div style=\"display:flex;flex-direction:row\"> <div style=\"margin-top:20px\">Source of Content</div> <select ng-model=\"selectType\" ng-change=\"triggerContent(selectType)\" data-ng-options=\"blisterPackTemplate as blisterPackTemplate.name for blisterPackTemplate in blisterPackTemplates\"> <option value=\"\">Choose...</option> </select> </div> <div style=\"margin-top:10px\" ng-show=\"selectCase!=null\"> <div style=\"display:inline\">Choose Source: {{selectCase}}</div> <button class=\"btn btn-default\" style=\"display:inline;float:right;margin-right:10px;margin-top: -4px\" ng-click=\"confirmAddCaseOrSuite(contentInfo)\">Confirm</button> <button class=\"btn btn-default\" style=\"display:inline;float:right;margin-right:10px;margin-top: -4px\" ng-click=\"getTestDeatil()\">Edit</button> </div> <hr> <div ng-show=\"displayTable==true\"> <div ng-show=\"testcaselist.testcases.length!=0 && selectType.name=='Test Case'\"> <div dir-paginate=\"test in testcaselist.testcases | itemsPerPage: 10\" pagination-id=\"testcase\"> <div style=\"display:flex;flex-direction:row;justify-content:space-between;padding:8px;border-top: 1px solid #e9ecec\" ng-class=\"{deepColor: $index%2==0}\"> <div> {{test.Name}}</div> <div style=\"font-size:10px\">{{test.Description}}</div> <span class=\"glyphicon glyphicon-check\" aria-hidden=\"true\" ng-click=\"constructTestCase(test.Name)\" ng-show=\"selectCase==test.Name\"></span> <span class=\"glyphicon glyphicon-unchecked\" aria-hidden=\"true\" ng-click=\"constructTestCase(test.Name)\" ng-show=\"selectCase!=test.Name\"></span> </div> <!--<hr style=\"margin-top:5px;margin-bottom:5px;\" />--> </div> <center> <dir-pagination-controls pagination-id=\"testcase\"></dir-pagination-controls> </center> </div> <div ng-show=\"testsuitlist.length!=0 && selectType.name=='Test Suite'\"> <div dir-paginate=\"suite in testsuitlist | itemsPerPage: 10\" pagination-id=\"testsuite\"> <div style=\"display:flex;flex-direction:row;justify-content:space-between;padding:8px;border-top: 1px solid #e9ecec\" ng-class=\"{deepColor: $index%2==0}\"> <div> {{suite}}</div> <span class=\"glyphicon glyphicon-check\" aria-hidden=\"true\" ng-click=\"constructTestCase(suite)\" ng-show=\"selectCase==suite\"></span> <span class=\"glyphicon glyphicon-unchecked\" aria-hidden=\"true\" ng-click=\"constructTestCase(suite)\" ng-show=\"selectCase!=suite\"></span> </div> <!--<hr style=\"margin-top:5px;margin-bottom:5px;\" />--> </div> <center> <dir-pagination-controls pagination-id=\"testsuite\"></dir-pagination-controls> </center> </div> </div> <div ng-show=\"displayTable==false\"> <textarea ng-model=\"contentInfo\" spellcheck>\n" +
    "\n" +
    "\n" +
    "            </textarea> </div> </div> </div> <div style=\"text-align:center;margin-top:20px\"> <button class=\"btn btn-default\" ng-click=\"closeThisDialog()\" ng-disabled=\"newUUID===null || ifHasEnv!=true || (ifHasCase!=true && ifHasSuite!=true)\">Close</button> <button class=\"btn btn-default\" ng-disabled=\"newUUID===null || ifHasEnv!=true || (ifHasCase!=true && ifHasSuite!=true)\" ng-click=\"runAtask(newUUID)\">Run</button> </div> <style>input {\n" +
    "        border-radius: 10px;\n" +
    "        border: 1px solid #eeeeee;\n" +
    "        width: 100%;\n" +
    "    }\n" +
    "\n" +
    "    .deepColor {\n" +
    "        background-color: #f9f9f9;\n" +
    "    }\n" +
    "\n" +
    "    select {\n" +
    "        height: 30px;\n" +
    "        border-radius: 5px;\n" +
    "        border: 1px solid #e8e8e8;\n" +
    "        width: 135px;\n" +
    "        margin-top: 20px;\n" +
    "        margin-left: 20px;\n" +
    "    }\n" +
    "\n" +
    "    textarea {\n" +
    "        width: 100%;\n" +
    "        height: 400px;\n" +
    "        border-radius: 5px;\n" +
    "        border: 1px solid #e8e8e8;\n" +
    "    }\n" +
    "\n" +
    "    .deepColor {\n" +
    "        background-color: #f9f9f9;\n" +
    "    }</style>"
  );


  $templateCache.put('views/podupload.html',
    "<!--pod file upload--> <div class=\"content\"> <div style=\"display:flex;flex-direction:row\"> <div style=\"width:750px\"> <!--<i class=\"fa fa-arrow-left fa-1x\" aria-hidden=\"true\" style=\"color: #999;cursor:pointer\" ng-click=\"goBack()\">Back</i>--> <h3>{{name}} -- Pod File <button class=\"btn btn-default\" style=\"float:right\" ng-click=\"goNext()\">Next</button> </h3> <!--<p>In this process, you can input your define openrc config or upload a openrc file</p>--> <hr> <button class=\"btn btn-default\" ngf-select=\"uploadFiles($file, $invalidFiles)\" ngf-max-size=\"1024MB\"> <div ng-show=\"!loadingOPENrc\">Upload</div> <img src=\"images/loading2.gif\" width=\"25\" height=\"25\" ng-if=\"loadingOPENrc\"> </button> <button class=\"btn btn-default\" ng-click=\"openDeleteEnv(1,'pod')\">Delete</button> <!--<div ng-show=\"displayOpenrcFile!=null || displayOpenrcFile!=undefined ||podData.pod.nodes!=null \">\n" +
    "                {{displayOpenrcFile.name}} last modified: {{filelastModified}}\n" +
    "            </div>--> <hr> <div> <h4 ng-show=\"podData.pod.nodes==null\">No Pod Configuration</h4> <div ng-show=\"podData.pod.nodes!=null\"> <h4>Current Pod Configuration</h4> <table class=\"table table-striped\"> <tr> <th>ip</th> <th>name</th> <th>password</th> <th>role</th> <th>user</th> </tr> <tr ng-repeat=\"pod in podData.pod.nodes\"> <td>{{pod.ip}}</td> <td>{{pod.name}}</td> <td>{{pod.password}}</td> <td>{{pod.role}}</td> <td>{{pod.user}}</td> </tr> </table> </div> </div> </div> <!--<div style=\"margin-top:60px;margin-left:67px;\">\n" +
    "            <h3>Openrc parameters</h3>\n" +
    "            <div>\n" +
    "                You have already set up the openrc parameters\n" +
    "            </div>\n" +
    "            <div ng-repeat=\"(key,value) in openrcInfo.openrc\">\n" +
    "                <nobr>\n" +
    "                    <font style=\"font-weight:600;font-size:15px;\">{{key}} : </font>\n" +
    "                    <font style=\"font-size:15px;\">{{value}}</font>\n" +
    "                </nobr>\n" +
    "            </div>\n" +
    "        </div>--> </div> </div> <toaster-container></toaster-container> <style>.form-control {\n" +
    "        border-radius: 5px;\n" +
    "        width: 200px;\n" +
    "        margin-bottom: 10px;\n" +
    "    }\n" +
    "\n" +
    "    .uploadbutton {\n" +
    "        background-color: #007ACC;\n" +
    "        color: #fff;\n" +
    "        border: 0px;\n" +
    "        border-radius: 5px;\n" +
    "        height: 27px;\n" +
    "    }\n" +
    "\n" +
    "    .edit-title {\n" +
    "        border: 0px;\n" +
    "        background-color: #ffffff;\n" +
    "        margin-bottom: 5px;\n" +
    "        font-size: 12px;\n" +
    "    }\n" +
    "\n" +
    "    .null-edit-title {\n" +
    "        border: 1px solid #e5e6e7;\n" +
    "        border-radius: 5px;\n" +
    "        margin-bottom: 3px;\n" +
    "    }\n" +
    "\n" +
    "    .item-info {\n" +
    "        display: flex;\n" +
    "        flex-direction: row;\n" +
    "    }\n" +
    "\n" +
    "    .delete-img {\n" +
    "        width: 15px;\n" +
    "        height: 15px;\n" +
    "        opacity: 0.8;\n" +
    "        margin-left: -10px;\n" +
    "        margin-top: -3px;\n" +
    "        cursor: pointer;\n" +
    "    }\n" +
    "\n" +
    "    .nextButton {\n" +
    "        margin-top: 30px;\n" +
    "        border: none;\n" +
    "        border-radius: 5px;\n" +
    "        padding: 6px;\n" +
    "        background-color: #339933;\n" +
    "        color: #ffffff;\n" +
    "        text-align: center;\n" +
    "        /* margin-left: 300px; */\n" +
    "    }</style>"
  );


  $templateCache.put('views/projectList.html',
    "<div class=\"content\"> <h3>Projects <button class=\"btn btn-default btn-sm\" style=\"margin-left:30px\" ng-click=\"openCreateProject()\">Create</button> </h3> <hr> <div dw-loading=\"key\" dw-loading-options=\"{text:'loading'}\"> <div style=\"display:flex;flex-direction:row;justify-content:space-between;padding:8px;border-top: 1px solid #e9ecec;background-color:#f9f9f9\"> <div style=\"font-weight:600\">Name</div> <div style=\"font-weight:600;margin-right:20px\">Action</div> </div> <div dir-paginate=\"project in projectListData | orderBy:'-id' | itemsPerPage: 10 \"> <div style=\"display:flex;flex-direction:row;justify-content:space-between;padding:8px;border-top: 1px solid #e9ecec\"> <div> <a ng-click=\"gotoDetail(project.uuid)\" style=\"color:#4dc5cf\"> {{project.name}}</a> </div> <div> <!-- <button class=\"btn btn-default btn-sm\" ng-click=\"gotoDetail(project.uuid)\">Detail</button> --> <!--<button class=\"btn btn-default btn-sm\" ng-click=\"openDeleteEnv(project.uuid,'project')\">Delete</button>--> <div class=\"btn-group\" uib-dropdown is-open=\"status.isopen\"> <button id=\"single-button\" type=\"button\" class=\"btn btn-default btn-sm\" uib-dropdown-toggle> delete <span class=\"caret\"></span> </button> <ul class=\"dropdown-menu\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"single-button\"> <li role=\"menuitem\" ng-show=\"task.status!=0\"><a ng-click=\"openDeleteEnv(project.uuid,'project')\">delete</a></li> </ul> </div> </div> </div> <!--<hr style=\"margin-top:5px;margin-bottom:5px;\" />--> </div> <center> <dir-pagination-controls></dir-pagination-controls> </center> </div> </div> <toaster-container></toaster-container> <style>.deepColor {\n" +
    "        background-color: #f9f9f9;\n" +
    "    }</style>"
  );


  $templateCache.put('views/projectdetail.html',
    "<div class=\"content\"> <i class=\"fa fa-arrow-left fa-1x\" aria-hidden=\"true\" style=\"color: #999;cursor:pointer\" ng-click=\"goBack()\">Back</i> <h3>Project -- Task </h3> <hr> <div> <h4>{{projectData.name}}</h4> <h5>{{projectData.time}}</h5> <hr> <h4>Tasks <button class=\"btn btn-default btn-sm\" style=\"margin-left:30px\" ng-click=\"openCreate()\">Create</button> </h4> <div ng-show=\"projectData.tasks.length==0\">No task in this project</div> <table class=\"table\" width=\"100%\" dw-loading=\"key\" dw-loading-options=\"{text:'loading'}\"> <tr style=\"background-color:#f9f9f9\"> <td style=\"font-weight:700\">Name</td> <td style=\"font-weight:700\"> Status</td> <td style=\"font-weight:700\">Action</td> </tr> <tr dir-paginate=\"task in finalTaskListDisplay | orderBy:'-id' | itemsPerPage: 6 \" pagination-id=\"table\"> <td width=\"20%\"> <a ng-click=\"gotoDetail(task.uuid)\" style=\"color:#4dc5cf\"> {{task.name}} </a></td> <td width=\"70%\"> <div class=\"progree-parent\" ng-show=\"task.status!=2\"> <div class=\"progree-child\" ng-style=\"{'width':task.stausWidth}\"> </div> </div> <div class=\"progree-parent\" ng-show=\"task.status==2\" style=\"background-color:red\"> <div class=\"progree-child\" style=\"width:0\"> </div> </div> </td> <td width=\"10%\"> <div class=\"btn-group\" uib-dropdown is-open=\"status.isopen\"> <button id=\"single-button\" type=\"button\" class=\"btn btn-default btn-sm\" uib-dropdown-toggle> modify <span class=\"caret\"></span> </button> <ul class=\"dropdown-menu\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"single-button\"> <li role=\"menuitem\" ng-show=\"task.status!=0\"><a ng-click=\"runAtaskForTable(task.uuid)\">run</a></li> <li role=\"menuitem\" ng-show=\"task.status!=0\"><a ng-click=\"gotoModify(task.uuid)\">modify</a></li> <li role=\"menuitem\" ng-show=\"task.status!=-1\"><a ng-click=\"gotoLog(task.uuid)\">log</a></li> <li role=\"menuitem\" ng-show=\"task.status!=-1 && task.status!=0\"><a ng-click=\"gotoReport(task.uuid)\" style=\"color:#2ecc71\">reporting</a></li> <li role=\"menuitem\"><a ng-click=\"openDeleteEnv(task.uuid,'task')\">delete</a></li> </ul> </div> <!-- <button class=\"btn btn-default btn-sm\" ng-click=\"runAtask(task.uuid)\" ng-disabled=\"task.status!=-1\">run</button>\n" +
    "                    <button class=\"btn btn-default btn-sm\" ng-click=\"gotoDetail(task.uuid)\">detail</button>\n" +
    "                    <button class=\"btn btn-default btn-sm\" ng-click=\"gotoModify(task.uuid)\" ng-disabled=\"task.status==0\">modify</button>\n" +
    "                    <button class=\"btn btn-default btn-sm\" ng-click=\"gotoReport(task.uuid)\" style=\"color:#2ecc71\" ng-disabled=\"task.status==-1 || task.status==0\">reporting</button>\n" +
    "                    <button class=\"btn btn-default btn-sm\" ng-click=\"openDeleteEnv(task.uuid,'task')\">delete</button>   --> </td> </tr> </table> </div> <center> <dir-pagination-controls pagination-id=\"table\"></dir-pagination-controls> </center> </div>  <toaster-container></toaster-container> <style>.progree-parent {\n" +
    "        width: 50%;\n" +
    "        background-color: #dfe3e4;\n" +
    "        height: 10px;\n" +
    "        border-radius: 10px;\n" +
    "    }\n" +
    "\n" +
    "    .progree-child {\n" +
    "        width: 50%;\n" +
    "        background-color: #2ecc71;\n" +
    "        /* background-color: white; */\n" +
    "        height: 10px;\n" +
    "        border-radius: 5px;\n" +
    "    }</style>"
  );


  $templateCache.put('views/report.html',
    "<div class=\"content\"> <i class=\"fa fa-arrow-left fa-1x\" aria-hidden=\"true\" style=\"color: #999;cursor:pointer\" ng-click=\"goBack()\">Back</i> <h3>Yardstick Report </h3> <hr> <div> <div>Task ID : {{result.result.task_id}} </div> <div style=\"margin-top:5px\">Criteria : <font style=\"color:#2ECC71\" ng-show=\"result.result.criteria=='PASS'\"> {{result.result.criteria}}</font> <font style=\"color:red\" ng-show=\"result.result.criteria=='FAIL'\"> {{result.result.criteria}}</font> </div> <hr> <caption>Information</caption> <table class=\"table table-striped\"> <tr> <th>#</th> <th>key</th> <th>value</th> </tr> <tbody> <tr ng-repeat=\"(key,value) in  result.result.info\"> <td>{{$index}}</td> <td>{{key}}</td> <td>{{value}}</td> </tr> </tbody> </table> <hr> <caption>Test Cases</caption> <table class=\"table table-striped\"> <tr> <th>#</th> <th>key</th> <th>value</th> <th>grafana</th> </tr> <tbody> <tr ng-repeat=\"(key,value) in result.result.testcases\"> <td>{{$index}}</td> <td>{{key}}</td> <td>{{value.criteria}}</td> <td> <button class=\"btn btn-default btn-sm\" ng-click=\"goToExternal(key)\"> grafana</button></td> </tr> </tbody> </table> </div> </div> "
  );


  $templateCache.put('views/suite.html',
    "<div class=\"content\"> <!--suitelist--> <i class=\"fa fa-arrow-left fa-1x\" aria-hidden=\"true\" style=\"color: #999;cursor:pointer\" ng-click=\"goBack()\">Back</i> <div> Test Suites <button class=\"btn btn-default\" style=\"margin-left:20px\" ng-click=\"gotoCreateSuite()\"> Create </button> <hr> <div dw-loading=\"key\" dw-loading-options=\"{text:'loading'}\"> <div style=\"display:flex;flex-direction:row;justify-content:space-between;padding:8px;border-top: 1px solid #e9ecec;background-color: #f9f9f9\"> <div style=\"font-weight:600\">Name</div> <div style=\"font-weight:600;margin-right:20px\">Action</div> </div> <div dir-paginate=\"suite in testsuitlist | itemsPerPage: 10\"> <div style=\"display:flex;flex-direction:row;justify-content:space-between;padding:8px;border-top: 1px solid #e9ecec\"> <div> <a style=\"color:#4dc5cf\" ng-click=\"gotoDetail(suite)\"> {{suite}} </a> </div> <div> <!-- <button class=\"btn btn-default btn-sm\" ng-click=\"openDeleteEnv(suite,'test suite')\">Delete</button> --> <div class=\"btn-group\" uib-dropdown is-open=\"status.isopen\"> <button id=\"single-button\" type=\"button\" class=\"btn btn-default btn-sm\" uib-dropdown-toggle> delete <span class=\"caret\"></span> </button> <ul class=\"dropdown-menu\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"single-button\"> <li role=\"menuitem\"><a ng-click=\"openDeleteEnv(suite,'test suite')\">delete</a></li> </ul> </div> </div> </div> </div> <center> <dir-pagination-controls></dir-pagination-controls> </center> </div> </div> </div> <toaster-container></toaster-container> <style>.deepColor {\n" +
    "        background-color: #f9f9f9;\n" +
    "    }\n" +
    "\n" +
    "    .form-control {\n" +
    "        border-radius: 5px;\n" +
    "        width: 300px;\n" +
    "        margin-bottom: 10px;\n" +
    "    }\n" +
    "\n" +
    "    .uploadbutton {\n" +
    "        background-color: #007ACC;\n" +
    "        color: #fff;\n" +
    "        border: 0px;\n" +
    "        border-radius: 5px;\n" +
    "        height: 27px;\n" +
    "    }\n" +
    "\n" +
    "    .edit-title {\n" +
    "        border: 0px;\n" +
    "        background-color: #ffffff;\n" +
    "        margin-bottom: 5px;\n" +
    "    }\n" +
    "\n" +
    "    .null-edit-title {\n" +
    "        border: 1px solid #e5e6e7;\n" +
    "        border-radius: 5px;\n" +
    "        margin-bottom: 3px;\n" +
    "    }\n" +
    "\n" +
    "    .item-info {\n" +
    "        display: flex;\n" +
    "        flex-direction: row;\n" +
    "    }\n" +
    "\n" +
    "    .delete-img {\n" +
    "        width: 19px;\n" +
    "        height: 19px;\n" +
    "        opacity: 0.8;\n" +
    "        margin-left: 5px;\n" +
    "        margin-top: 4px;\n" +
    "        cursor: pointer;\n" +
    "    }\n" +
    "\n" +
    "    .nextButton {\n" +
    "        margin-top: 30px;\n" +
    "        border: none;\n" +
    "        border-radius: 5px;\n" +
    "        padding: 6px;\n" +
    "        background-color: #339933;\n" +
    "        color: #ffffff;\n" +
    "        text-align: center;\n" +
    "        /* margin-left: 300px; */\n" +
    "    }\n" +
    "\n" +
    "    .bs-sidenav {\n" +
    "        margin-top: 40px;\n" +
    "        margin-bottom: 20px;\n" +
    "        width: 124px;\n" +
    "    }\n" +
    "\n" +
    "    .nav {\n" +
    "        margin-bottom: 0;\n" +
    "        padding-left: 0;\n" +
    "        list-style: none;\n" +
    "    }\n" +
    "\n" +
    "    .nav>li {\n" +
    "        position: relative;\n" +
    "        display: block;\n" +
    "    }\n" +
    "\n" +
    "    li {\n" +
    "        display: list-item;\n" +
    "        text-align: -webkit-match-parent;\n" +
    "    }\n" +
    "\n" +
    "    a {\n" +
    "        cursor: pointer;\n" +
    "    }\n" +
    "\n" +
    "    a.active {\n" +
    "        background-color: #EEEEEE;\n" +
    "        border-radius: 5px;\n" +
    "    }</style>"
  );


  $templateCache.put('views/suitedetail.html',
    "<div class=\"content\"> <!--testcaselist--> <div> <i class=\"fa fa-arrow-left fa-1x\" aria-hidden=\"true\" style=\"color: #999;cursor:pointer\" ng-click=\"goBack()\">Back</i> <h3>Detail</h3> <hr> <textarea ng-model=\"suiteinfo\" spellcheck>\n" +
    "\n" +
    "        </textarea> </div> </div> <toaster-container></toaster-container> <style>.form-control {\n" +
    "        border-radius: 5px;\n" +
    "        width: 300px;\n" +
    "        margin-bottom: 10px;\n" +
    "    }\n" +
    "\n" +
    "    .uploadbutton {\n" +
    "        background-color: #007ACC;\n" +
    "        color: #fff;\n" +
    "        border: 0px;\n" +
    "        border-radius: 5px;\n" +
    "        height: 27px;\n" +
    "    }\n" +
    "\n" +
    "    .edit-title {\n" +
    "        border: 0px;\n" +
    "        background-color: #ffffff;\n" +
    "        margin-bottom: 5px;\n" +
    "    }\n" +
    "\n" +
    "    .null-edit-title {\n" +
    "        border: 1px solid #e5e6e7;\n" +
    "        border-radius: 5px;\n" +
    "        margin-bottom: 3px;\n" +
    "    }\n" +
    "\n" +
    "    .item-info {\n" +
    "        display: flex;\n" +
    "        flex-direction: row;\n" +
    "    }\n" +
    "\n" +
    "    .delete-img {\n" +
    "        width: 19px;\n" +
    "        height: 19px;\n" +
    "        opacity: 0.8;\n" +
    "        margin-left: 5px;\n" +
    "        margin-top: 4px;\n" +
    "        cursor: pointer;\n" +
    "    }\n" +
    "\n" +
    "    .nextButton {\n" +
    "        margin-top: 30px;\n" +
    "        border: none;\n" +
    "        border-radius: 5px;\n" +
    "        padding: 6px;\n" +
    "        background-color: #339933;\n" +
    "        color: #ffffff;\n" +
    "        text-align: center;\n" +
    "        /* margin-left: 300px; */\n" +
    "    }\n" +
    "\n" +
    "    .bs-sidenav {\n" +
    "        margin-top: 40px;\n" +
    "        margin-bottom: 20px;\n" +
    "        width: 124px;\n" +
    "    }\n" +
    "\n" +
    "    .nav {\n" +
    "        margin-bottom: 0;\n" +
    "        padding-left: 0;\n" +
    "        list-style: none;\n" +
    "    }\n" +
    "\n" +
    "    .nav>li {\n" +
    "        position: relative;\n" +
    "        display: block;\n" +
    "    }\n" +
    "\n" +
    "    li {\n" +
    "        display: list-item;\n" +
    "        text-align: -webkit-match-parent;\n" +
    "    }\n" +
    "\n" +
    "    a {\n" +
    "        cursor: pointer;\n" +
    "    }\n" +
    "\n" +
    "    a.active {\n" +
    "        background-color: #EEEEEE;\n" +
    "        border-radius: 5px;\n" +
    "    }</style>"
  );


  $templateCache.put('views/taskList.html',
    "<div class=\"content\"> <i class=\"fa fa-arrow-left fa-1x\" aria-hidden=\"true\" style=\"color: #999;cursor:pointer\" ng-click=\"goBack()\">Back</i> <h3>Detail</h3> <hr> <div style=\"display:flex;flex-direction:row\"> <div> <h4>{{taskDetailData.name}}</h4> <div style=\"margin-top:5px\">{{taskDetailData.time}}</div> </div> <div class=\"progree-parent\" ng-show=\"taskDetailData.status!=2\" style=\"margin-top:34px;margin-left:30px\"> <div class=\"progree-child\" ng-style=\"{'width':taskDetailData.stausWidth}\"> </div> </div> <div class=\"progree-parent\" ng-show=\"taskDetailData.status==2\" style=\"background-color:red;margin-top:34px;margin-left:30px\"> <div class=\"progree-child\" style=\"width:0\"> </div> </div> <i class=\"fa fa-check\" aria-hidden=\"true\" style=\"margin-top:34px;margin-left:5px;color: #2ecc71\" ng-show=\"taskDetailData.status==1\">finish</i> <i class=\"fa fa-spinner\" aria-hidden=\"true\" style=\"margin-top:34px;margin-left:5px;color: #2ecc71\" ng-show=\"taskDetailData.status==0\">runing</i> <i class=\"fa fa-exclamation-triangle\" aria-hidden=\"true\" style=\"margin-top:34px;margin-left:5px;color: red\" ng-show=\"taskDetailData.status==2\">failed</i> </div> <div style=\"margin-top:5px\">Environment : {{displayEnv.name}} </div> <div ng-show=\"taskDetailData.case_name!=false\" style=\"margin-top:5px;margin-bottom:5px\"> Name : {{taskDetailData.case_name}}</div> <textarea ng-model=\"taskDetailData.content\" spellcheck>\n" +
    "\n" +
    "    </textarea> <div style=\"text-align:center;margin-top:20px\"> <button class=\"btn btn-default\" ng-click=\"createTask(name)\" ng-show=\"\">Run</button> </div> </div> <style>input {\n" +
    "        border-radius: 10px;\n" +
    "        border: 1px solid #eeeeee;\n" +
    "        width: 100%;\n" +
    "    }\n" +
    "\n" +
    "    select {\n" +
    "        height: 30px;\n" +
    "        border-radius: 5px;\n" +
    "        border: 1px solid #e8e8e8;\n" +
    "        width: 135px;\n" +
    "        margin-top: 20px;\n" +
    "        margin-left: 20px;\n" +
    "    }\n" +
    "\n" +
    "    textarea {\n" +
    "        width: 100%;\n" +
    "        height: 350px;\n" +
    "        border-radius: 5px;\n" +
    "        border: 1px solid #e8e8e8;\n" +
    "    }\n" +
    "\n" +
    "    .content {\n" +
    "        height: 90%;\n" +
    "    }</style>"
  );


  $templateCache.put('views/taskLog.html',
    "<div class=\"content\"> <i class=\"fa fa-arrow-left fa-1x\" aria-hidden=\"true\" style=\"color: #999;cursor:pointer\" ng-click=\"goBack()\">Back</i> <h3>Log</h3> <hr> <div style=\"display:flex;flex-direction:row\"> <div> <div style=\"margin-top:5px\">Task: {{ taskId }}</div> </div> <div class=\"progree-parent\" style=\"margin-top:10px;margin-left:20px\"> <div class=\"progree-child\" ng-show=\"taskStatus==0\" style=\"width:50%\"></div> <div class=\"progree-child\" ng-show=\"taskStatus==1\" style=\"width:100%\"></div> </div> <i class=\"fa fa-check\" aria-hidden=\"true\" style=\"margin-top:10px;margin-left:5px;color: #2ecc71\" ng-show=\"taskStatus==1\">finish</i> <i class=\"fa fa-spinner\" aria-hidden=\"true\" style=\"margin-top:10px;margin-left:5px;color: #2ecc71\" ng-show=\"taskStatus==0\">runing</i> </div> <div class=\"box\"> <div class=\"line-block\" ng-repeat=\"line in logLines track by $index\"> <span>{{ line }}</span> </div> </div> </div> <style>.box {\n" +
    "        width: 90%%;\n" +
    "        border-radius: 5px;\n" +
    "        border: 1px solid #e8e8e8;\n" +
    "        line-height: 180%;\n" +
    "        margin-top: 20px;\n" +
    "    }\n" +
    "\n" +
    "    .line-block {\n" +
    "        margin-left: 10px;\n" +
    "    }\n" +
    "\n" +
    "    .content {\n" +
    "        height: 90%;\n" +
    "    }</style>"
  );


  $templateCache.put('views/taskmodify.html',
    "<div class=\"content\"> <i class=\"fa fa-arrow-left fa-1x\" aria-hidden=\"true\" style=\"color: #999;cursor:pointer\" ng-click=\"goBack()\">Back</i> <h4>Modify </h4> <hr> <div> <div style=\"display:inline\">Name <input type=\"text\" ng-model=\"taskDetailData.name\" style=\"width:200px\"></div> <button class=\"btn btn-default\" ng-click=\"runAtask()\" style=\"float:right;margin-right:10px\">Run</button> </div> <hr> <div bs-tabs> <div data-title=\"Environment\" bs-pane> <div style=\"margin-top:10px\"> <div style=\"display:inline\">Choose Environment : {{envName}}</div> <button class=\"btn btn-default\" style=\"display:inline;float:right;margin-right:10px;margin-top: -4px\" ng-click=\"addEnvToTask()\">Confirm</button> </div> <hr> <div dir-paginate=\"env in environmentList | orderBy:'-id' | itemsPerPage: 10 \"> <div style=\"display:flex;flex-direction:row;justify-content:space-between;padding:8px;border-top: 1px solid #e9ecec\" ng-class=\"{deepColor: $index%2==0}\"> <div> {{env.name}}</div> <!--<button class=\"btn btn-default btn-sm\" ng-click=\"gotoDetail('false',env.uuid)\">detail</button>--> <span class=\"glyphicon glyphicon-check\" aria-hidden=\"true\" ng-click=\"constructTestSuit(env.uuid,env.name)\" ng-show=\"selectEnv==env.uuid\"></span> <span class=\"glyphicon glyphicon-unchecked\" aria-hidden=\"true\" ng-click=\"constructTestSuit(env.uuid,env.name)\" ng-show=\"selectEnv!=env.uuid\"></span> </div> <!--<hr style=\"margin-top:5px;margin-bottom:5px;\" />--> </div> <center> <dir-pagination-controls></dir-pagination-controls> </center> </div> <div data-title=\"Content\" bs-pane> <div style=\"margin-top:10px\"> <button class=\"btn btn-default\" ng-click=\"changeStatussourceFalse()\">Modify Content</button> <button class=\"btn btn-default\" ng-click=\"changeStatussourceTrue()\">Modify Source</button> <div class=\"label-type\" ng-show=\"taskDetailData.suite==false\"> Test Case</div> <div class=\"label-type\" ng-show=\"taskDetailData.suite==true\"> Test Suite</div> <button class=\"btn btn-default\" style=\"float:right\" ng-disabled=\"sourceShow==null\" ng-click=\"confirmToServer(contentInfo,taskDetailData.content)\">Confirm</button> </div> <textarea ng-model=\"taskDetailData.content\" ng-show=\"sourceShow==false\" style=\"margin-top:5px\" spellcheck>\n" +
    "\n" +
    "\n" +
    "            </textarea> <div ng-show=\"sourceShow==true\"> <div style=\"display:flex;flex-direction:row\"> <div style=\"margin-top:20px\">Source of Content</div> <select ng-model=\"selectType\" ng-change=\"triggerContent(selectType)\" data-ng-options=\"blisterPackTemplate as blisterPackTemplate.name for blisterPackTemplate in blisterPackTemplates\"> <option value=\"\">Choose...</option> </select> </div> <div style=\"margin-top:10px\" ng-show=\"selectCase!=null \"> <div style=\"display:inline\">Choose Source : {{selectCase}}</div> <!--<button class=\"btn btn-default\" style=\"display:inline;float:right;margin-right:10px;margin-top: -4px;\" ng-click=\"confirmAddCaseOrSuite(contentInfo)\">Confirm</button>--> <button class=\"btn btn-default\" style=\"display:inline;float:right;margin-right:10px;margin-top: -4px\" ng-click=\"getTestDeatil()\">Edit</button> </div> <hr> <div ng-show=\"displayTable==true\"> <div ng-show=\"testcaselist.testcases.length!=0 && selectType.name=='Test Case'\"> <div dir-paginate=\"test in testcaselist.testcases | itemsPerPage: 10\" pagination-id=\"testcase\"> <div style=\"display:flex;flex-direction:row;justify-content:space-between;padding:8px;border-top: 1px solid #e9ecec\" ng-class=\"{deepColor: $index%2==0}\"> <div> {{test.Name}}</div> <div style=\"font-size:10px\">{{test.Description}}</div> <span class=\"glyphicon glyphicon-check\" aria-hidden=\"true\" ng-click=\"constructTestCase(test.Name)\" ng-show=\"selectCase==test.Name\"></span> <span class=\"glyphicon glyphicon-unchecked\" aria-hidden=\"true\" ng-click=\"constructTestCase(test.Name)\" ng-show=\"selectCase!=test.Name\"></span> </div> <!--<hr style=\"margin-top:5px;margin-bottom:5px;\" />--> </div> <center> <dir-pagination-controls pagination-id=\"testcase\"></dir-pagination-controls> </center> </div> <div ng-show=\"testsuitlist.length!=0 && selectType.name=='Test Suite'\"> <div dir-paginate=\"suite in testsuitlist | itemsPerPage: 10\" pagination-id=\"testsuite\"> <div style=\"display:flex;flex-direction:row;justify-content:space-between;padding:8px;border-top: 1px solid #e9ecec\" ng-class=\"{deepColor: $index%2==0}\"> <div> {{suite}}</div> <span class=\"glyphicon glyphicon-check\" aria-hidden=\"true\" ng-click=\"constructTestCase(suite)\" ng-show=\"selectCase==suite\"></span> <span class=\"glyphicon glyphicon-unchecked\" aria-hidden=\"true\" ng-click=\"constructTestCase(suite)\" ng-show=\"selectCase!=suite\"></span> </div> <!--<hr style=\"margin-top:5px;margin-bottom:5px;\" />--> </div> <center> <dir-pagination-controls pagination-id=\"testsuite\"></dir-pagination-controls> </center> </div> </div> <div ng-show=\"displayTable==false\"> <textarea ng-model=\"contentInfo\" spellcheck>\n" +
    "            </textarea> </div> </div> </div> </div> </div> <toaster-container></toaster-container> <style>input {\n" +
    "        border-radius: 10px;\n" +
    "        border: 1px solid #eeeeee;\n" +
    "        width: 100%;\n" +
    "        padding: 5px;\n" +
    "    }\n" +
    "\n" +
    "    .deepColor {\n" +
    "        background-color: #f9f9f9;\n" +
    "    }\n" +
    "\n" +
    "    select {\n" +
    "        height: 30px;\n" +
    "        border-radius: 5px;\n" +
    "        border: 1px solid #e8e8e8;\n" +
    "        width: 135px;\n" +
    "        margin-top: 20px;\n" +
    "        margin-left: 20px;\n" +
    "    }\n" +
    "\n" +
    "    textarea {\n" +
    "        width: 100%;\n" +
    "        height: 350px;\n" +
    "        border-radius: 5px;\n" +
    "        border: 1px solid #e8e8e8;\n" +
    "    }\n" +
    "\n" +
    "    .label-type {\n" +
    "        display: inline;\n" +
    "        background-color: #2ecc71;\n" +
    "        color: #fff;\n" +
    "        border-radius: 5px;\n" +
    "        padding: 3px;\n" +
    "        font-size: 10px;\n" +
    "    }\n" +
    "\n" +
    "    .content {\n" +
    "        height: auto;\n" +
    "    }</style>"
  );


  $templateCache.put('views/testcasechoose.html',
    "<div class=\"content\"> <div> Test case list <button class=\"btn btn-default\" style=\"margin-left:20px\" ng-click=\"openDialog()\"> <div ng-show=\"!loadingOPENrc\">Create </div> <img src=\"images/loading2.gif\" width=\"25\" height=\"25\" ng-if=\"loadingOPENrc\"> </button> <hr> You have choose : <div ng-repeat=\"selected in suitReconstructList\" style=\"display:inline\" class=\"item\">{{selected}}</div> <hr> <!--<div ng-repeat=\"env in environmentList\">\n" +
    "            {{env.name}}\n" +
    "        </div>--> <div dir-paginate=\"test in testcaselist.testcases | itemsPerPage: 10\"> <div style=\"display:flex;flex-direction:row\"> <span class=\"glyphicon glyphicon-check\" aria-hidden=\"true\" ng-click=\"constructTestSuit(test.Name)\" ng-show=\"testsuiteList.indexOf(test.Name)>-1\"></span> <span class=\"glyphicon glyphicon-unchecked\" aria-hidden=\"true\" ng-click=\"constructTestSuit(test.Name)\" ng-show=\"testsuiteList.indexOf(test.Name)==-1\"></span> <div style=\"margin-left:50px\"> {{test.Name}}</div> <div style=\"font-size:10px;margin-left:100px\">{{test.Description}}</div> </div> <hr style=\"margin-top:5px;margin-bottom:5px\"> </div> <center> <dir-pagination-controls></dir-pagination-controls> </center> </div> <toaster-container></toaster-container> <style>.item {\n" +
    "            background-color: #3498db;\n" +
    "            color: #fff;\n" +
    "            width: 150px;\n" +
    "            border-radius: 5px;\n" +
    "            padding-left: 10px;\n" +
    "            margin-left: 2px;\n" +
    "            margin-top: 3px;\n" +
    "            padding: 4px;\n" +
    "        }</style></div>"
  );


  $templateCache.put('views/testcasedetail.html',
    "<div class=\"content\"> <!--testcaselist--> <div> <i class=\"fa fa-arrow-left fa-1x\" aria-hidden=\"true\" style=\"color: #999;cursor:pointer\" ng-click=\"goBack()\">Back</i> <h4>Detail</h4> <hr> <textarea ng-model=\"testcaseInfo\" spellcheck>\n" +
    "\n" +
    "        </textarea> </div> </div> <toaster-container></toaster-container> <style>.form-control {\n" +
    "        border-radius: 5px;\n" +
    "        width: 300px;\n" +
    "        margin-bottom: 10px;\n" +
    "    }\n" +
    "\n" +
    "    .uploadbutton {\n" +
    "        background-color: #007ACC;\n" +
    "        color: #fff;\n" +
    "        border: 0px;\n" +
    "        border-radius: 5px;\n" +
    "        height: 27px;\n" +
    "    }\n" +
    "\n" +
    "    .edit-title {\n" +
    "        border: 0px;\n" +
    "        background-color: #ffffff;\n" +
    "        margin-bottom: 5px;\n" +
    "    }\n" +
    "\n" +
    "    .null-edit-title {\n" +
    "        border: 1px solid #e5e6e7;\n" +
    "        border-radius: 5px;\n" +
    "        margin-bottom: 3px;\n" +
    "    }\n" +
    "\n" +
    "    .item-info {\n" +
    "        display: flex;\n" +
    "        flex-direction: row;\n" +
    "    }\n" +
    "\n" +
    "    .delete-img {\n" +
    "        width: 19px;\n" +
    "        height: 19px;\n" +
    "        opacity: 0.8;\n" +
    "        margin-left: 5px;\n" +
    "        margin-top: 4px;\n" +
    "        cursor: pointer;\n" +
    "    }\n" +
    "\n" +
    "    .nextButton {\n" +
    "        margin-top: 30px;\n" +
    "        border: none;\n" +
    "        border-radius: 5px;\n" +
    "        padding: 6px;\n" +
    "        background-color: #339933;\n" +
    "        color: #ffffff;\n" +
    "        text-align: center;\n" +
    "        /* margin-left: 300px; */\n" +
    "    }\n" +
    "\n" +
    "    .bs-sidenav {\n" +
    "        margin-top: 40px;\n" +
    "        margin-bottom: 20px;\n" +
    "        width: 124px;\n" +
    "    }\n" +
    "\n" +
    "    .nav {\n" +
    "        margin-bottom: 0;\n" +
    "        padding-left: 0;\n" +
    "        list-style: none;\n" +
    "    }\n" +
    "\n" +
    "    .nav>li {\n" +
    "        position: relative;\n" +
    "        display: block;\n" +
    "    }\n" +
    "\n" +
    "    li {\n" +
    "        display: list-item;\n" +
    "        text-align: -webkit-match-parent;\n" +
    "    }\n" +
    "\n" +
    "    a {\n" +
    "        cursor: pointer;\n" +
    "    }\n" +
    "\n" +
    "    a.active {\n" +
    "        background-color: #EEEEEE;\n" +
    "        border-radius: 5px;\n" +
    "    }</style>"
  );


  $templateCache.put('views/testcaselist.html',
    "<div class=\"content\"> <!--testcaselist--> <i class=\"fa fa-arrow-left fa-1x\" aria-hidden=\"true\" style=\"color: #999;cursor:pointer\" ng-click=\"goBack()\">Back</i> <div> Test Cases <button class=\"btn btn-default\" style=\"margin-left:20px\" ngf-select=\"uploadFiles($file, $invalidFiles)\" ngf-max-size=\"5MB\"> <div ng-show=\"!loadingOPENrc\">Upload</div> <img src=\"images/loading2.gif\" width=\"25\" height=\"25\" ng-if=\"loadingOPENrc\"> </button> <!--<div ng-show=\"displayOpenrcFile!=null || displayOpenrcFile!=undefined\">\n" +
    "            {{displayOpenrcFile.name}} last modified: {{filelastModified}}\n" +
    "        </div>--> <hr> <!--<div ng-repeat=\"env in environmentList\">\n" +
    "            {{env.name}}\n" +
    "        </div>--> <div dw-loading=\"key\" dw-loading-options=\"{text:'loading'}\"> <div style=\"display:flex;flex-direction:row;justify-content:space-between;padding:8px;border-top: 1px solid #e9ecec;background-color: #f9f9f9\"> <div style=\"font-weight:600\">Name</div> <div style=\"font-weight:600;margin-right:20px\">Action</div> </div> <div dir-paginate=\"test in testcaselist.testcases | itemsPerPage: 10\"> <div style=\"display:flex;flex-direction:row;justify-content:space-between;padding:8px;border-top: 1px solid #e9ecec\"> <div> <a style=\"color:#4dc5cf\" ng-click=\"gotoDetail(test.Name)\"> {{test.Name}} </a> </div> <div style=\"font-size:10px\">{{test.Description}}</div> <div> <!-- <button class=\"btn btn-default btn-sm\" ng-click=\"openDeleteEnv(test.Name,'test case')\">Delete</button> --> <div class=\"btn-group\" uib-dropdown is-open=\"status.isopen\"> <button id=\"single-button\" type=\"button\" class=\"btn btn-default btn-sm\" uib-dropdown-toggle> delete <span class=\"caret\"></span> </button> <ul class=\"dropdown-menu\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"single-button\"> <li role=\"menuitem\"><a ng-click=\"openDeleteEnv(test.Name,'test case')\">delete</a></li> </ul> </div> </div> </div> </div> <center> <dir-pagination-controls></dir-pagination-controls> </center> </div> </div> </div> <toaster-container></toaster-container> <style>.deepColor {\n" +
    "        background-color: #f9f9f9;\n" +
    "    }\n" +
    "\n" +
    "    .form-control {\n" +
    "        border-radius: 5px;\n" +
    "        width: 300px;\n" +
    "        margin-bottom: 10px;\n" +
    "    }\n" +
    "\n" +
    "    .uploadbutton {\n" +
    "        background-color: #007ACC;\n" +
    "        color: #fff;\n" +
    "        border: 0px;\n" +
    "        border-radius: 5px;\n" +
    "        height: 27px;\n" +
    "    }\n" +
    "\n" +
    "    .edit-title {\n" +
    "        border: 0px;\n" +
    "        background-color: #ffffff;\n" +
    "        margin-bottom: 5px;\n" +
    "    }\n" +
    "\n" +
    "    .null-edit-title {\n" +
    "        border: 1px solid #e5e6e7;\n" +
    "        border-radius: 5px;\n" +
    "        margin-bottom: 3px;\n" +
    "    }\n" +
    "\n" +
    "    .item-info {\n" +
    "        display: flex;\n" +
    "        flex-direction: row;\n" +
    "    }\n" +
    "\n" +
    "    .delete-img {\n" +
    "        width: 19px;\n" +
    "        height: 19px;\n" +
    "        opacity: 0.8;\n" +
    "        margin-left: 5px;\n" +
    "        margin-top: 4px;\n" +
    "        cursor: pointer;\n" +
    "    }\n" +
    "\n" +
    "    .nextButton {\n" +
    "        margin-top: 30px;\n" +
    "        border: none;\n" +
    "        border-radius: 5px;\n" +
    "        padding: 6px;\n" +
    "        background-color: #339933;\n" +
    "        color: #ffffff;\n" +
    "        text-align: center;\n" +
    "        /* margin-left: 300px; */\n" +
    "    }\n" +
    "\n" +
    "    .bs-sidenav {\n" +
    "        margin-top: 40px;\n" +
    "        margin-bottom: 20px;\n" +
    "        width: 124px;\n" +
    "    }\n" +
    "\n" +
    "    .nav {\n" +
    "        margin-bottom: 0;\n" +
    "        padding-left: 0;\n" +
    "        list-style: none;\n" +
    "    }\n" +
    "\n" +
    "    .nav>li {\n" +
    "        position: relative;\n" +
    "        display: block;\n" +
    "    }\n" +
    "\n" +
    "    li {\n" +
    "        display: list-item;\n" +
    "        text-align: -webkit-match-parent;\n" +
    "    }\n" +
    "\n" +
    "    a {\n" +
    "        cursor: pointer;\n" +
    "    }\n" +
    "\n" +
    "    a.active {\n" +
    "        background-color: #EEEEEE;\n" +
    "        border-radius: 5px;\n" +
    "    }</style>"
  );


  $templateCache.put('views/uploadImage.html',
    "<!--upload image  page--> <div class=\"content\"> <div style=\"display:flex;flex-direction:row\"> <div style=\"width:750px\"> <h3>{{environmentInfo.name}} -- Image <button class=\"btn btn-default\" style=\"float:right\" ng-click=\"goNext()\">Next</button> </h3> <!--<p>In this process, you can input your define openrc config or upload a openrc file</p>--> <hr> <h4>Alternative Images</h4> <div> <table class=\"table table-striped\"> <tr> <th>name</th> <th>description</th> <th>size</th> <th>status</th> <th>time</th> <th>action</th> </tr> <tr ng-repeat=\"image in yardstickImage\"> <td>{{image.name}}</td> <td>{{image.description}}</td> <td>{{image.size | number:2}} MB</td> <td>{{image.status}}</td> <td>{{image.time}}</td> <td> <div class=\"btn-group\" uib-dropdown> <button id=\"single-button\" type=\"button\" class=\"btn btn-default btn-sm\" uib-dropdown-toggle> action<span class=\"caret\"></span> </button> <ul class=\"dropdown-menu\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"single-button\"> <li role=\"menuitem\" ng-show=\"image.status == 'N/A'\"><a ng-click=\"loadYardstickImage(image.name)\">load</a></li> <li role=\"menuitem\" ng-show=\"image.status != 'N/A'\"><a ng-click=\"deleteYardstickImage(image.name)\">delete</a></li> </ul> </div> </td> </tr> </table> </div> <hr> <h4 style=\"display:inline\">Custom Images</h4> <div class=\"btn-group button-margin\" style=\"float:right;margin-top:-10px;margin-bottom:5px\"> <button class=\"btn btn-default\" style=\"width:60px\" ngf-select=\"uploadCustomImage($file, $invalidFiles)\" ngf-max-size=\"2048MB\"> <div ng-show=\"!showloading\">Local</div> <img src=\"images/loading2.gif\" width=\"25\" height=\"25\" ng-if=\"showloading\"> </button> <button class=\"btn btn-default\" style=\"width:60px\" ng-click=\"openImageDialog()\">Url</button> </div> <div> <table class=\"table table-striped\"> <tr> <th>name</th> <th>description</th> <th>size</th> <th>status</th> <th>time</th> <th>action</th> </tr> <tr ng-repeat=\"image in customImage\"> <td>{{image.name}}</td> <td>{{image.description}}</td> <td>{{image.size | number:2}} MB</td> <td>{{image.status}}</td> <td>{{image.time}}</td> <td> <div class=\"btn-group\" uib-dropdown> <button id=\"single-button\" type=\"button\" class=\"btn btn-default btn-sm\" uib-dropdown-toggle> action<span class=\"caret\"></span> </button> <ul class=\"dropdown-menu\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"single-button\"> <li role=\"menuitem\"><a ng-click=\"deleteCustomImage(image.id)\">delete</a></li> </ul> </div> </td> </tr> </table> </div> </div> </div> </div> <toaster-container></toaster-container> <style>.form-control {\n" +
    "        border-radius: 5px;\n" +
    "        width: 200px;\n" +
    "        margin-bottom: 10px;\n" +
    "    }\n" +
    "\n" +
    "    .uploadbutton {\n" +
    "        background-color: #007ACC;\n" +
    "        color: #fff;\n" +
    "        border: 0px;\n" +
    "        border-radius: 5px;\n" +
    "        height: 27px;\n" +
    "    }\n" +
    "\n" +
    "    .edit-title {\n" +
    "        border: 0px;\n" +
    "        background-color: #ffffff;\n" +
    "        margin-bottom: 5px;\n" +
    "        font-size: 12px;\n" +
    "    }\n" +
    "\n" +
    "    .null-edit-title {\n" +
    "        border: 1px solid #e5e6e7;\n" +
    "        border-radius: 5px;\n" +
    "        margin-bottom: 3px;\n" +
    "    }\n" +
    "\n" +
    "    .item-info {\n" +
    "        display: flex;\n" +
    "        flex-direction: row;\n" +
    "    }\n" +
    "\n" +
    "    .delete-img {\n" +
    "        width: 15px;\n" +
    "        height: 15px;\n" +
    "        opacity: 0.8;\n" +
    "        margin-left: -10px;\n" +
    "        margin-top: -3px;\n" +
    "        cursor: pointer;\n" +
    "    }\n" +
    "\n" +
    "    .nextButton {\n" +
    "        margin-top: 30px;\n" +
    "        border: none;\n" +
    "        border-radius: 5px;\n" +
    "        padding: 6px;\n" +
    "        background-color: #339933;\n" +
    "        color: #ffffff;\n" +
    "        text-align: center;\n" +
    "        /* margin-left: 300px; */\n" +
    "    }\n" +
    "\n" +
    "    .bs-sidenav {\n" +
    "        margin-top: 40px;\n" +
    "        margin-bottom: 20px;\n" +
    "        width: 124px;\n" +
    "    }\n" +
    "\n" +
    "    .nav {\n" +
    "        margin-bottom: 0;\n" +
    "        padding-left: 0;\n" +
    "        list-style: none;\n" +
    "    }\n" +
    "\n" +
    "    .nav>li {\n" +
    "        position: relative;\n" +
    "        display: block;\n" +
    "    }\n" +
    "\n" +
    "    li {\n" +
    "        display: list-item;\n" +
    "        text-align: -webkit-match-parent;\n" +
    "    }\n" +
    "\n" +
    "    a {\n" +
    "        cursor: pointer;\n" +
    "    }\n" +
    "\n" +
    "    a.active {\n" +
    "        background-color: #EEEEEE;\n" +
    "        border-radius: 5px;\n" +
    "    }</style>"
  );

}]);
