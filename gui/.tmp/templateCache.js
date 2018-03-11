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
