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
    $scope.recordPlaybooks = [];

    $scope.$on('formGroup:fieldChange', function (event, entity) {
      entity = entity.module === $scope.entity.name ? entity : undefined;
      renderActionButtons(entity);
    });

    $scope.$on('playbookAction:triggerCompleted', function (event, entity) {
      renderActionButtons(entity);
    });

    function renderActionButtons(entity) {
      $scope.playbookRecords = [];
      $scope.recordPlaybooks = [];
      playbookService.getActionPlaybooks($scope.entity, true).then(function (playbooks) {
        $scope.recordPlaybooks = _.filter(playbooks, item => item._hide === false);
        $scope.recordPlaybooks = _.map($scope.recordPlaybooks, selectedPlaybook => {
          var matchingPlaybook = _.find($scope.config.selectedPlaybooksWithRecord, item => item['@id'] === selectedPlaybook['@id']);
          if (matchingPlaybook) {
            $scope.playbookRecords.push(_.assign({}, selectedPlaybook, { icon: matchingPlaybook.icon }));
          }
        });
        if ($scope.playbookRecords) {
          createPlaybookButtons($scope.playbookRecords);
        }
      });
    }

    function createPlaybookButtons(playbooks) {
      $scope.actionButtonPlaybooks = [];
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
      renderActionButtons($scope.entity);
    }
    _init();
  }
})();