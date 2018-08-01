(function() {
   'use strict';

   /**
    * Configurable toaster service
    * Toaster can be configured with params
    *
    * @param {String} reason success, error or info
    * @param {String} title
    * @param {string} body
    */

   angular.module('mainApp')
      .factory('toasterService', ['toaster', '$log', toasterService]);

   function toasterService(toaster, $log) {

      return {
         getConfiguredToaster: GetToaster
      };

      function GetToaster(reason, title, body) {
         if(reason === 'success') {
            $log.debug('Success');
            toaster.pop({
               type: reason,
               title: title,
               body: body,
               timeout: 1500
            })
         } else if(reason === 'error') {
            $log.debug('Error');
            toaster.pop({
               type: reason,
               title: title,
               body: body,
               timeout: 1500
            })
         } else if(reason === 'info') {
            $log.debug('Info');
            toaster.pop({
               type: reason,
               title: title,
               body: body,
               timeout: 1500
            })
         } else {
            $log.debug('This reason is not implemented yet...')
         }
      }
   }
}());
