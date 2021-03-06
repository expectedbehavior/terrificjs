(function($) {
    /**
     * Base class for the different connectors.
     *
     * @author Remo Brunschwiler
     * @namespace Tc
     * @class Connector
     */
    Tc.Connector = Class.extend({

        /**
         * Initializes the Connector.
         *
         * @method init
         * @return {void}
         * @constructor
         * @param {String} connectorId the unique connector id
         * @param {Object} connectorId
         */
        init : function(connectorId) {
            this.connectorId = connectorId;
            this.components = [];
        },

        /**
         * Registers a component.
         *
         * @method registerComponent
         * @param {Module} component the module to register
         * @param {String} role the role of the module (ie. master, slave etc.)
         * @return {void}
         */
        registerComponent: function(component, role) {
            role = role || 'standard';

            this.components.push({
                'component': component,
                'role': role
            });
        },

        /**
         * Unregisters a component.
         *
         * @method unregisterComponent
         * @param {Module} component the module to unregister
         * @return {void}
         */
        unregisterComponent: function(component) {
            var components = this.components;

            for (var id in components) {
                if (components[id].component === component) {
                    delete components[id];
                }
            }
        },

        /**
         * Notifies all registered components about the state change (to be overriden in the specific connectors).
         *
         * @method notify
         * @param {Module} component the module that sends the state change
         * @param {String} state the state
         * @param {Object} data contains the state relevant data (if any)
         * @param {Function} callback the callback function (could be executed after an asynchronous action)
         * @return {boolean} indicates whether the default action should be excuted or not
         */
        notify: function(component, state, data, callback) {
            /* 
             * gives the components the ability to prevent the default- and afteraction from the events
             * (by returning false in the on<Event>-Handler)
             */
            var proceed = true,
                components = this.components;

            for (var id in components) {
                if (components[id].component !== component && components[id].component[state]) {
                    if (components[id].component[state](data, callback) === false) {
                        proceed = false;
                    }
                }
            }

            return proceed;
        }
    });
})(Tc.$);

