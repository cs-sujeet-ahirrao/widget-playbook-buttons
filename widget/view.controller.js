/* Copyright start
  MIT License
  Copyright (c) 2024 Fortinet Inc
  Copyright end */
'use strict';
(function () {
  angular
    .module('cybersponse')
    .controller('playbookButtons100Ctrl', playbookButtons100Ctrl);

  playbookButtons100Ctrl.$inject = ['$scope', '_', 'currentPermissionsService', 'FormEntityService', 'playbookService', '$filter', 'widgetService'];

  function playbookButtons100Ctrl($scope, _, currentPermissionsService, FormEntityService, playbookService, $filter, widgetService) {
    $scope.actionButtonPlaybooks = [];
    $scope.recordPlaybooks = undefined;

    function createPlaybookButtons(playbooks) {
      angular.forEach(playbooks, function (playbook) {
        var triggerStep = _.find(playbook.steps, function (item) { return item.uuid === $filter('getEndPathName')(playbook.triggerStep); });
        $scope.actionButtonPlaybooks.push({
          id: 'btn-action-' + playbook.id,
          icon: playbook.icon || 'icon icon-execute',
          text: triggerStep.arguments.title || playbook.name,
          desc: (playbook.description || playbook.name) + ' (' + playbook.collectionName + ')',
          hide: playbook._hide,
          _subtitleDisplay: playbook.collectionName,
          onClick: function () {
            if ($scope.config.showExecutionProgress) {
              var payload = {
                "playbookDetails": playbook,
                "selectedRecord": $scope.getExecuteRecord
              };
              widgetService.launchStandaloneWidget($scope.config.widgetName, $scope.config.widgetVersion, null, null, payload).then(function () {
                angular.noop;
              });
            }
            else {
              playbookService.triggerPlaybookAction(playbook, $scope.getExecuteRecord, $scope, false, $scope.entity);
            }
          }
        });
      });
    }

    function _init() {
      if (!currentPermissionsService.availablePermission('workflows', 'execute')) {
        return;
      }
      $scope.entity = FormEntityService.get();
      $scope.getExecuteRecord = $scope.entity.originalData;
      var playbookRecords = [];
      playbookService.getActionPlaybooks($scope.entity, true).then(function (playbooks) {
        $scope.recordPlaybooks = _.filter(playbooks, item => item._hide === false);
        $scope.recordPlaybooks = _.map($scope.recordPlaybooks, selectedPlaybook => {
          let matchingPlaybook = _.find($scope.config.selectedPlaybooksWithRecord, item => item['@id'] === selectedPlaybook['@id']);
          if (matchingPlaybook) {
            playbookRecords.push(_.assign({}, selectedPlaybook, { icon: matchingPlaybook.icon }));
          }
        });
        if (playbookRecords) {
          createPlaybookButtons(playbookRecords);
        }
      });
    }
    _init();
  }
})();