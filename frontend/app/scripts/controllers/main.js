'use strict';

angular.module('phonebookApp')
  .controller('MainCtrl', function ($scope, $modal, ContactAPI) {
    $scope.contactSelectd = undefined;
    ContactAPI.get().success(function (contacts) {
      $scope.contactsData = contacts;
    });
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

    $scope.create = function() {
      var newContact = {};
      angular.copy($scope.contact, newContact);
      ContactAPI.create(newContact).success(function (createdContact) {
        $scope.contactsData.push(createdContact);
        $scope.cleanForm();
      });
    };

    $scope.update = function() {
      ContactAPI.update($scope.contactSelectd.id, $scope.contact).success(function (updatedContact) {
        angular.copy(updatedContact, $scope.contactSelectd);
        $scope.cleanForm();
      });
    };

    $scope.cleanForm = function() {
      $scope.contact = {};
      $scope.contactSelectd = undefined;
      $scope.form.$setPristine();
    };

    $scope.gridEdit = function(row) {
      $scope.cleanForm();
      angular.copy(row.entity, $scope.contact);
      $scope.contactSelectd = row.entity;
    };

    $scope.gridRemove = function(row) {
      $scope.cleanForm();
      $modal.open({
        templateUrl: 'views/partials/removeModal.html',
        controller: function($scope, $modalInstance, contact, contactsData) {
          $scope.contact = contact;
          $scope.contactsData = contactsData;
          $scope.removeOk = function() {
            ContactAPI.delete($scope.contact.id).success(function () {
              $scope.contactsData.splice($scope.contactsData.indexOf($scope.contact), 1);
            });
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
