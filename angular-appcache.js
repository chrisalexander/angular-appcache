angular.module("appcache", []);

angular.module("appcache").factory("appcache", function($rootScope, $q, caHelpersOnce) {

  var appCache = window.applicationCache;

  var iface = {
    "checkForUpdate": function() {
      var def = $q.defer();
      def.reject();
      return def.promise;
    }
  }

  // If there is no appcache available, return null functions
  if (!appCache) {
    return iface;
  }

  var handleCacheEvent = function(e) {
    $rootScope.$broadcast("appcache." + e.type, e);
  }

  var bootstrapEvents = function() {
    ["cached", "checking", "downloading", "error", "noupdate",
    "obsolete", "progress", "updateready"].map(function(eventName) {
      appCache.addEventListener(eventName, handleCacheEvent, false);
    });
  }
  bootstrapEvents();

  iface.checkForUpdate = function() {
    var def = $q.defer();
    appCache.update();
    caHelpersOnce($rootScope, "appcache.updateready", function() {
      def.resolve(function(now) {
        appCache.swapCache();
        var applyUpdateNow = function() {
          window.location.reload();
        }
        if (now) {
          applyUpdateNow();
          return function() {};
        }
        return applyUpdateNow;
      });
    });
    caHelpersOnce($rootScope, "appcache.noupdate", function() {
      def.reject();
    });
    return def.promise;
  }

  return iface;

});
