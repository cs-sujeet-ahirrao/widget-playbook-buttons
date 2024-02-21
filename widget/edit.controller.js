/* Copyright start
  MIT License
  Copyright (c) 2024 Fortinet Inc
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
    $scope.config.widgetName = 'Playbook Execution Wizard';
    $scope.playbookList = [];
    $scope.playbookButton = playbookButton;
    $scope.addButtonWithRecord = addButtonWithRecord;
    $scope.removeButtonWithRecord = removeButtonWithRecord;
    $scope.resetExecutionProgress = resetExecutionProgress;
    if (!$scope.config.selectedPlaybooksWithRecord) {
      $scope.config.selectedPlaybooksWithRecord = [];
    }

    function playbookButton() {
      $scope.playbookList = angular.copy($scope.config.selectedPlaybooksWithRecord);
    }

    function resetExecutionProgress() {
      if ($scope.config.showExecutionProgress === false) {
        $scope.playbookList = [];
        $scope.config.selectedExecutionWizardPlaybooks = [];
      }
    }

    function addButtonWithRecord(playbook) {
      $scope.config.selectedPlaybooksWithRecord.push(playbook);
      $scope.playbookList.push(playbook);
    }

    function removeButtonWithRecord(index, action) {
      $scope.config.selectedPlaybooksWithRecord.splice(index, 1);
      $scope.config.selectedExecutionWizardPlaybooks = _.reject($scope.config.selectedExecutionWizardPlaybooks, obj => obj.id === action.id);
    }
    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    function save() {
      if ($scope.editPlaybookButtonsForm.$invalid) {
        $scope.editPlaybookButtonsForm.$setTouched();
        $scope.editPlaybookButtonsForm.$focusOnFirstError();
        return;
      }
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
