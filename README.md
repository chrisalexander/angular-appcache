angular-appcache
================

Angular helpers for working with AppCache

# Installation

Simply specify a dependency upon "appcache" and include the script:

    angular.module("mymodule", ["appcache"]);

## Dependencies

Appcache has a dependency on the "ca-helpers" module which can be found [here](https://github.com/chrisalexander/ca-helpers/blob/master/ca-helpers.js).

# Services

## appcache

This service provides the main functionality you may wish to use.

### checkForUpdate

Usage, by default, will not immediately reload the page, but the user will get the next version the next time they load the page:

    appcache.checkForUpdate().then(function(applyUpdate) {
      // A new version is available
      applyUpdate();
    }, function() {
      // No update is available
    });

Alternatively, apply the update, then immediately reload the page (note the `true`) so the user updates to the new version:

    appcache.checkForUpdate().then(function(applyUpdate) {
      // A new version is available
      applyUpdate(true);
    }, function() {
      // No update is available
    });

As a final method, you can apply the update (so the user gets it the next time they reload the page), and then come back later to decide you want to apply the update (e.g. after saving user's work, asking their permission etc):

    appcache.checkForUpdate().then(function(applyUpdate) {
      // A new version is available
      var finaliseApply = applyUpdate();
      // Ask the user, save their work etc, then:
      finaliseApply();
    }, function() {
      // No update is available
    });
