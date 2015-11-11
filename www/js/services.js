angular.module('starter.services', [])

  // access to local storage
.factory('accessStorage', function ( localStorageService ) {

    // provider for getting and setting local storage items
  if( localStorageService.isSupported ) {

    return {
      get: function( key ) {
        return localStorageService.get( key );
      },

      set: function( key, list ) {
        return localStorageService.set( key, list );
      }
    };
  }
})

  // global settings
  .factory('SETTINGS', function() {

    var VIBRATE;
    var NOTIFY;

    // Setters and Getters
    return {

      getVibrate: function() {
        return VIBRATE;
      },

      getNotify: function() {
        return NOTIFY;

      },

      setVibrate: function( bool ) {
        return VIBRATE = bool;
      },

      setNotify: function(bool) {
        return NOTIFY = bool;
      }
    };
  })


  // provide notification services to controllers
.factory('notify', function( $cordovaVibration, $cordovaToast, SETTINGS, $ionicPlatform ){

  return {
    buzz: function() {

        $ionicPlatform.ready(function () {
          if( SETTINGS.getVibrate() == true ) {
            $cordovaVibration.vibrate(100);
          }
        });
      },

    toast: function() {
      $ionicPlatform.ready(function () {
        if( SETTINGS.getNotify() == true ) {
          $cordovaToast.showShortBottom('No items on your list!');
        }
      });
    }
  }
});

