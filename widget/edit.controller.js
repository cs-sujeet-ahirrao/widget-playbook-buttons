/* Copyright start
  MIT License
  Copyright (c) 2024 Fortinet
  Copyright end */
'use strict';
(function () {
  angular
    .module('cybersponse')
    .controller('editPlaybookButtons100Ctrl', editPlaybookButtons100Ctrl);

  editPlaybookButtons100Ctrl.$inject = ['$scope', '$uibModalInstance', 'config', 'FormEntityService', 'currentPermissionsService', 'playbookService', '_'];

  function editPlaybookButtons100Ctrl($scope, $uibModalInstance, config, FormEntityService, currentPermissionsService, playbookService, _) {
    $scope.cancel = cancel;
    $scope.save = save;
    $scope.config = config;

    $scope.addButtonWithRecord = addButtonWithRecord;
    $scope.removeButtonWithRecord = removeButtonWithRecord;
    if (!$scope.config.selectedPlaybooksWithRecord) {
      $scope.config.selectedPlaybooksWithRecord = [];
    }

    function addButtonWithRecord(playbook) {
      $scope.config.selectedPlaybooksWithRecord.push(playbook);
    }
    function removeButtonWithRecord(index) {
      $scope.config.selectedPlaybooksWithRecord.splice(index, 1);
    }
    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    function save() {
      $uibModalInstance.close($scope.config);
    }
    function _init() {
      if (!currentPermissionsService.availablePermission('workflows', 'execute')) {
        return;
      }
      $scope.entity = FormEntityService.get();
      playbookService.getActionPlaybooks($scope.entity, true).then(function (playbooks) {
        $scope.modulePlaybooks = playbooks;
      });

    }
    _init();
  }
})();
