/* Copyright start
  Copyright (C) 2008 - 2023 Fortinet Inc.
  All rights reserved.
  FORTINET CONFIDENTIAL & FORTINET PROPRIETARY SOURCE CODE
  Copyright end */
'use strict';
(function () {
  angular
    .module('cybersponse')
    .controller('playbookButtons100Ctrl', playbookButtons100Ctrl);

  playbookButtons100Ctrl.$inject = ['$scope', '_', 'currentPermissionsService', 'FormEntityService', 'playbookService', 'Modules', '$filter', 'jsonToGridService', 'config'];

  function playbookButtons100Ctrl($scope, _, currentPermissionsService, FormEntityService, playbookService, Modules, $filter, jsonToGridService, config) {
    var selectButtons = [];
    var buttons = [];
    $scope.recordPlaybooks = undefined;

    function loadGriOptions(playbooks) {
      setGridOptions();
      createGridButtons(playbooks);
    }

    function setGridOptions() {
      $scope.gridOptions = {
        csOptions: {
          allowDelete: false,
          allowAdd: false,
          allowClone: false,
          showPagination: false,
          allowGlobalFilter: false,
          allowCardView: true,
          viewType: 'staticGrid',
          onRegisterApi: setGridApi,
          buttons: buttons,
          selectButtons: selectButtons,
          noResultsMessage: 'No change requests available.',
        },
        expandableRowTemplate: 'widgets/installed/playbookButtons-1.0.0/widgetAssets/html/rowExpandable.html',
        enableExpandable: true,
        enableFiltering: false,
        enableSelectAll: true,
        enableRowSelection: false,
        enableRowHeaderSelection: true,
        selectWithCheckboxOnly: true,
        showSelectionCheckbox: true,
        enableColumnResizing: true,
        enableColumnMoving: true,
        useExternalFiltering: true,
        enableGridMenu: false,
        refresh: $scope.refreshGridData
      };
    }

    function setGridApi(gridApi) {
      $scope.gridApi = gridApi;
    }
    $scope.getSelectedRows = function () {
      return $scope.gridApi.selection.getSelectedRows();
    };

    function createGridButtons(playbooks) {
      angular.forEach(playbooks, function (playbook, index) {
        var triggerStep = _.find(playbook.steps, function (item) { return item.uuid === $filter('getEndPathName')(playbook.triggerStep); });
        var buttonText = triggerStep.arguments.title;
        var button = {
          id: 'btn-pb-with-record_' + index,
          text: buttonText || playbook.name,
          class: 'btn-primary margin-right-sm',
          disabled: false,
          hide: false
        };

        button.onClick = function () {
          jsonToGridService.launchStandaloneWidget('importWizard', '1.0.0', playbook, true, $scope.getExecuteRecord).then(function () {
            angular.noop;
          });
        },
          button.iconClass = playbook.icon || 'icon icon-execute';
        selectButtons.push(button);
        $scope.gridOptions.csOptions.selectButtons = selectButtons;
      });
    }

    function _init() {
      if (!currentPermissionsService.availablePermission('workflows', 'execute')) {
        return;
      }
      $scope.entity = FormEntityService.get();
      $scope.getExecuteRecord = $scope.entity.originalData;
      playbookService.getActionPlaybooks($scope.entity, true).then(function (playbooks) {
        $scope.recordPlaybooks = _.filter(playbooks, item => item._hide === false);
        $scope.recordPlaybooks = _.map($scope.recordPlaybooks, selectedPlaybook => {
          let matchingPlaybook = _.find($scope.config.selectedPlaybooksWithRecord, item => item['@id'] === selectedPlaybook['@id']);
          if (matchingPlaybook) {
            // Add a new field to selectedPlaybook from matchingObj1
            return _.assign({}, selectedPlaybook, { icon: matchingPlaybook.icon });
          }
          return selectedPlaybook;
        });
        loadGriOptions($scope.recordPlaybooks);
      });

    }
    _init();
  }
})();
