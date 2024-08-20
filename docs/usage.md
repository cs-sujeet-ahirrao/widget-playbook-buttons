| [Home](../README.md) |
|----------------------|

# Usage

The **Playbook Buttons** widget adds playbooks as separate buttons on a records detailed view that can be executed directly from the records' view panel.

## Editing the Playbooks Button Widget

1. Edit a record's view template and select **Add Widget** button.

2. Select **Playbook Buttons** from the list to bring up the **Playbook Buttons** widget's edit view.

3. Select playbooks from the **Select Action Buttons** field. You can select multiple playbooks.

    ![Select playbooks dialog image](./res/edit-view-00.png)

4. Assign an icon to each selected playbook.

    ![Playbooks with icons added image](./res/edit-view-01.png)

5. Select **Show playbook execution progress on wizard** to get real-time progress updates as playbooks run. Install **Playbook Execution Wizard** to view playbook execution progress.

    ![Playbook execution progress on wizard checkbox](./res/edit-view-02.png)

6. Select the playbooks to execute from the **Playbook Included List**. The drop-down lists only the playbooks associated with the playbook selected in **Select Action Buttons** field.

    ![Playbooks to include dropdown](./res/edit-view-03.png)

    The following screen shows the playbook execution wizard about to show the playbook execution progress.

    ![Playbook Execution Wizard Screen](./res/playbook-execution-wizard-00.png)

7. Specify the widget to launch when displaying the playbook execution progress under **Advanced Settings**. Currently, only **Playbook Execution Wizard** is supported in this field.

    ![Widget to display playbook execution](./res/edit-view-04.png)

8. Select the checkbox **Display as Primary Button** to display the playbooks as primary buttons.

    ![Set playbooks as primary buttons](./res/edit-view-05.png)

The following screen shows an alert record when playbook buttons are primary, and when they are set as secondary.

|![Widget to display playbook execution](./res/playbook-action-btn-primary.png)|![Widget to display playbook execution](./res/playbook-action-btn-secondary.png)|
|:--:|:--:|
|Playbooks as primary buttons|Playbooks as secondary buttons|

## Next Steps

| [Installation](./setup.md#installation) | [Configuration](./setup.md#configuration) |
|-----------------------------------------|-------------------------------------------|