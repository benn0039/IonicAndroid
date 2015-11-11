angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, accessStorage, SETTINGS) {

    $scope.key = 'settings';

    $scope.setGlobalSettings = function () {

      SETTINGS.setVibrate($scope.settings.vibrate);
      SETTINGS.setNotify($scope.settings.notify);
    };


    if( accessStorage.get( $scope.key ) == null ) {

      // check for settings saved locally, if none prime the array and set localstorage
      $scope.settings = {notify: true, vibrate: true};
      accessStorage.set($scope.key, $scope.settings);
      $scope.setGlobalSettings();

    } else {
      // If settings found locally populate array
      $scope.settings = accessStorage.get($scope.key);
      $scope.setGlobalSettings();
    }
})


  .controller('SettingsCtrl', function($scope, $stateParams, accessStorage, SETTINGS) {
    $scope.key = 'settings';

    $scope.setSettings = function () {

      // called when settings are toggled
      accessStorage.set($scope.key, $scope.settings);
      SETTINGS.setVibrate($scope.settings.vibrate);
      SETTINGS.setNotify($scope.settings.notify);
    };

  })


.controller('PersonalCtrl', function ($scope, $stateParams, accessStorage, notify) {

  $scope.key = 'personalList';
  $scope.task = [];

  if (accessStorage.get($scope.key) == null) {

    $scope.personalList = [];

  } else {
    $scope.personalList = accessStorage.get($scope.key);
  }

  $scope.add = function (task) {
    $scope.personalList.push({'item': task.descrip, done: 'false'});
    accessStorage.set($scope.key, $scope.personalList);
    task.descrip = '';

  };

  // delete to do item from array
  $scope.del = function (idx) {

    // vibrate on deletion if set
    notify.buzz();
    $scope.personalList.splice(idx, 1);

    // if there are no elements in the array toast user if set
    if ($scope.personalList.length == 0) {
      notify.toast();
    }
    accessStorage.set($scope.key, $scope.personalList)
  };

  $scope.updateLocalStorage = function() {
    accessStorage.set($scope.key, $scope.personalList)
  }
})


.controller('SchoolCtrl', function($scope, $stateParams, accessStorage, notify) {

    $scope.key = 'schoolList';
    $scope.task = [];


    if( accessStorage.get( $scope.key ) == null ) {

      $scope.schoolList = [];

    } else {
      $scope.schoolList = accessStorage.get($scope.key);
    }

    $scope.add = function(task){
      $scope.schoolList.push({'item': task.descrip, done: 'false'});
      accessStorage.set($scope.key, $scope.schoolList);
      task.descrip = '';
    };

    // delete to do item from array
    $scope.del = function (idx) {

      // vibrate on deletion if set
      notify.buzz();
      $scope.schoolList.splice(idx, 1);

      // if there are no elements in the array toast user if set
      if ($scope.schoolList.length == 0) {
        notify.toast();
      }
      accessStorage.set($scope.key, $scope.schoolList)
    };

    $scope.updateLocalStorage = function() {
      accessStorage.set($scope.key, $scope.schoolList)
    }

})

.controller('WorkCtrl', function($scope, $stateParams, accessStorage, notify) {
    $scope.key = 'workList';
    $scope.task = [];

    // if there are no items in local storage prime with empty array
    // otherwise load local items
    if( accessStorage.get( $scope.key ) == null ) {

      $scope.workList = [];

    } else {

      $scope.workList = accessStorage.get($scope.key);
    }

    // Add a new item
    $scope.add = function(task){
      $scope.workList.push({'item': task.descrip, done: 'false'});
      accessStorage.set($scope.key, $scope.workList);
      task.descrip = '';
    };

    // delete to do item from array
    $scope.del = function (idx) {

    // vibrate on deletion if set
    notify.buzz();
    $scope.workList.splice(idx, 1);

    // if the list is empty toast user if set
    if ($scope.workList.length == 0) {
      notify.toast();
    }
    accessStorage.set($scope.key, $scope.workList)
  };

    $scope.updateLocalStorage = function() {
      accessStorage.set($scope.key, $scope.workList)
    }

});
