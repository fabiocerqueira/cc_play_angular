'use strict';

angular.module('phonebookApp')
  .controller('MainCtrl', function ($scope, $modal) {
    $scope.contactsData = [
      {name: 'Fulano', phone: '8588812123', email: 'fulano@gmail.com'},
      {name: 'Beltrano', phone: '8588889999', email: 'beltrano@gmail.com'},
      {name: 'Ciclano', phone: '8599887722', email: 'ciclano@gmail.com'},
      {name: 'Zezim', phone: '8591213212', email: 'zezim@gmail.com'},
    ];
    $scope.columnDefs = [
      {field: 'name', displayName: 'Name', width: 'auto', minWidth: 300},
      {field: 'phone', displayName: 'Phone', width: 'auto', minWidth: 100},
      {field: 'email', displayName: 'E-mail', width: 'auto', minWidth: 150},
      {displayName:'Actions', cellTemplate: 'views/partials/gridActions.html', width: '*'}
    ];
    $scope.$watch('search', function(value) {
      $scope.gridOptions.filterOptions.filterText = value;
    });
    $scope.gridOptions = {
      data: 'contactsData',
      columnDefs: 'columnDefs',
      multiSelect: false,
      showColumnMenu : true,
      enableRowSelection: true,
      filterOptions: {
        filterText: '',
        useExternalFilter: false
      }
    };

    $scope.gridEdit = function(row) {
      $scope.contact = {};
      angular.copy(row.entity, $scope.contact);
      $scope.contactSelectd = row.entity;
    };

    $scope.gridRemove = function(row) {
      $modal.open({
        templateUrl: 'views/partials/removeModal.html',
        controller: function($scope, $modalInstance, contact, contactsData) {
          $scope.contact = contact;
          $scope.contactsData = contactsData;
          $scope.removeOk = function() {
            $scope.contactsData.splice($scope.contactsData.indexOf($scope.contact), 1);
            $modalInstance.close();
          };
          $scope.removeCancel = function() {
            $modalInstance.dismiss('cancel');
          };
        },
        resolve: {
          contactsData: function () {
            return $scope.contactsData;
          },
          contact: function () {
            return row.entity;
          }
        }
      });
    };

  });
