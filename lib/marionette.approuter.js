/**
* @license
* MarionetteJS (Marionette.AppRouter)
* ----------------------------------
* v1.0.0
*
* Copyright (c)2018 Derick Bailey, Muted Solutions, LLC.
* Distributed under MIT license
*
* http://marionettejs.com
*/


(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('backbone'), require('underscore'), require('backbone.marionette')) :
	typeof define === 'function' && define.amd ? define(['backbone', 'underscore', 'backbone.marionette'], factory) :
	(global.Marionette = global.Marionette || {}, global.Marionette.AppRouter = factory(global.Backbone,global._,global.Backbone.Marionette));
}(this, (function (Backbone,_,Marionette) { 'use strict';

Backbone = Backbone && Backbone.hasOwnProperty('default') ? Backbone['default'] : Backbone;
_ = _ && _.hasOwnProperty('default') ? _['default'] : _;
var Marionette__default = 'default' in Marionette ? Marionette['default'] : Marionette;

// App Router
// ----------

// Reduce the boilerplate code of handling route events
// and then calling a single method on another object,
// called a controller.
// Have your routers configured to call the method on
// your controller, directly.
//
// Configure an AppRouter with `appRoutes`.
//
// App routers can only take one `controller` object.
// It is recommended that you divide your controller
// objects in to smaller pieces of related functionality
// and have multiple routers / controllers, instead of
// just one giant router and controller.
//
// You can also add standard routes to an AppRouter.

// API borrowed from Marionette.Object
var ObjectAPI = ['triggerMethod', 'normalizeMethods', '_setOptions', 'mergeOptions', 'getOption', 'bindEvents', 'unbindEvents'];

var ClassOptions = ['appRoutes', 'controller'];

var AppRouter = Backbone.Router.extend({
  constructor: function constructor(options) {
    this._setOptions(options);

    this.mergeOptions(options, ClassOptions);

    Backbone.Router.apply(this, arguments);

    var appRoutes = this.appRoutes;
    var controller = this._getController();
    this.processAppRoutes(controller, appRoutes);
    this.on('route', this._processOnRoute, this);
  },


  // Similar to route method on a Backbone Router but
  // method is called on the controller
  appRoute: function appRoute(route, methodName) {
    var controller = this._getController();
    this._addAppRoute(controller, route, methodName);
    return this;
  },


  // process the route event and trigger the onRoute
  // method call, if it exists
  _processOnRoute: function _processOnRoute(routeName, routeArgs) {
    // make sure an onRoute before trying to call it
    if (_.isFunction(this.onRoute)) {
      // find the path that matches the current route
      var routePath = _.invert(this.appRoutes)[routeName];
      this.onRoute(routeName, routePath, routeArgs);
    }
  },


  // Internal method to process the `appRoutes` for the
  // router, and turn them in to routes that trigger the
  // specified method on the specified `controller`.
  processAppRoutes: function processAppRoutes(controller, appRoutes) {
    var _this = this;

    if (!appRoutes) {
      return this;
    }

    var routeNames = _.keys(appRoutes).reverse(); // Backbone requires reverted order of routes

    _.each(routeNames, function (route) {
      _this._addAppRoute(controller, route, appRoutes[route]);
    });

    return this;
  },
  _getController: function _getController() {
    return this.controller;
  },
  _addAppRoute: function _addAppRoute(controller, route, methodName) {
    var method = controller[methodName];

    if (!method) {
      throw new Error('Method "' + methodName + '" was not found on the controller');
    }

    this.route(route, methodName, _.bind(method, controller));
  }
});

_.extend(AppRouter.prototype, _.pick(Marionette.MnObject.prototype, ObjectAPI));

// For Backwards compatibility
Marionette__default.AppRouter = AppRouter;

return AppRouter;

})));
//# sourceMappingURL=marionette.approuter.js.map
