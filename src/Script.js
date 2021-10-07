var taskList = [];
var taskListStatus = [];

window.addEventListener('load',function(e)
{
    LoadTasks();
}, false);

window.addEventListener("beforeunload", function(e)
{
    SaveTasks();
}, false);

export function ClickOnEnter(event)
{
    if (event.keyCode === 13)
    {
        CreateTaskButtonClick();
    }
}

export function CreateTaskButtonClick()
{
    if (document.getElementById('add-task-input') != null)
    {
        if (!document.getElementById('add-task-input').value == '')
        {
            CreateNewTask(document.getElementById('add-task-input').value);
        }
        else
        {
            alert('Невозможно создать пустую задачу!');
        }
    }
}

function SaveTasks()
{
    if (localStorage.getItem('tasks') != null && localStorage.getItem('task-status'))
    {
        localStorage['tasks'] = JSON.stringify(taskList);
        localStorage['task-status'] = JSON.stringify(taskListStatus);
    }
    else
    {
        localStorage.setItem('tasks', JSON.stringify(taskList));
        localStorage.setItem('task-status', JSON.stringify(taskListStatus));
    }
}

function LoadTasks()
{
    taskList = [];
    if (localStorage['tasks'] && localStorage['task-status'])
    {
        taskList = JSON.parse(localStorage['tasks']);
        taskListStatus = JSON.parse(localStorage['task-status']);

        for (let i = 0; i < taskList.length; i++)
        {
            CreateLoadedTask(taskList[i]);

            for (let j = 0; j < document.querySelectorAll('#todo-task').length; j++)
            {
                if (document.querySelectorAll('#todo-task')[j].innerText == taskList[i])
                {
                    if (taskListStatus[i])
                    {
                        document.querySelectorAll('#todo-task p')[i].style.textDecoration = 'line-through';
                    }
                    else
                    {
                        document.querySelectorAll('#todo-task p')[i].style.textDecoration = 'none';
                    }
                }
            }
        }
    }
}

export function CreateNewTask(text)
{
    if (document.getElementById('add-task-input') != null)
    {
        if (text != '')
        {
            let taskDiv = document.createElement('div');
            let taskTextTag = document.createElement('p');
            let buttonTaskRemove = document.createElement('img');
            let buttonTaskEdit = document.createElement('img');
            let buttonTaskToUp = document.createElement('img');
            let buttonTaskToDown = document.createElement('img');

            buttonTaskEdit.setAttribute('id', 'button-task-edit');
            buttonTaskEdit.setAttribute('src', './edit.png');
            buttonTaskEdit.addEventListener('click', EditTaskButtonClick);

            buttonTaskRemove.setAttribute('id', 'button-task-remove');
            buttonTaskRemove.setAttribute('src', './remove.png');
            buttonTaskRemove.addEventListener('click', RemoveTaskButtonClick);

            buttonTaskToDown.setAttribute('id', 'button-task-to-down');
            buttonTaskToDown.setAttribute('src', './TaskToDown.png');
            buttonTaskToDown.addEventListener('click', TaskToDownButtonClick);

            buttonTaskToUp.setAttribute('id', 'button-task-to-up');
            buttonTaskToUp.setAttribute('src', './TaskToUp.png');
            buttonTaskToUp.addEventListener('click', TaskToUpButtonClick);

            taskTextTag.addEventListener('click', ChangeTaskStatus);
            taskTextTag.setAttribute('id', 'label-task');
            taskTextTag.innerHTML = text;
            document.getElementById('add-task-input').value = '';

            taskDiv.setAttribute('id', 'todo-task');
            taskDiv.appendChild(taskTextTag);
            taskDiv.appendChild(buttonTaskRemove);
            taskDiv.appendChild(buttonTaskEdit);
            taskDiv.appendChild(buttonTaskToDown);
            taskDiv.appendChild(buttonTaskToUp);
            document.getElementById('root').appendChild(taskDiv);

            taskList.push(text);
            taskListStatus.push(false);
        }
    }
}

function CreateLoadedTask(text)
{
    if (document.getElementById('add-task-input') != null)
    {
        if (text != '')
        {
            let taskDiv = document.createElement('div');
            let taskTextTag = document.createElement('p');
            let buttonTaskToUp = document.createElement('img');
            let buttonTaskToDown = document.createElement('img');
            let buttonTaskRemove = document.createElement('img');
            let buttonTaskEdit = document.createElement('img');

            buttonTaskEdit.setAttribute('id', 'button-task-edit');
            buttonTaskEdit.setAttribute('src', './edit.png');
            buttonTaskEdit.addEventListener('click', EditTaskButtonClick);

            buttonTaskRemove.setAttribute('id', 'button-task-remove');
            buttonTaskRemove.setAttribute('src', './remove.png');
            buttonTaskRemove.addEventListener('click', RemoveTaskButtonClick);

            buttonTaskToDown.setAttribute('id', 'button-task-to-down');
            buttonTaskToDown.setAttribute('src', './TaskToDown.png');
            buttonTaskToDown.addEventListener('click', TaskToDownButtonClick);

            buttonTaskToUp.setAttribute('id', 'button-task-to-up');
            buttonTaskToUp.setAttribute('src', './TaskToUp.png');
            buttonTaskToUp.addEventListener('click', TaskToUpButtonClick);

            taskTextTag.addEventListener('click', ChangeTaskStatus);
            taskTextTag.setAttribute('id', 'label-task');
            taskTextTag.innerHTML = text;
            document.getElementById('add-task-input').value = '';

            taskDiv.setAttribute('id', 'todo-task');
            taskDiv.appendChild(taskTextTag);
            taskDiv.appendChild(buttonTaskRemove);
            taskDiv.appendChild(buttonTaskEdit);
            taskDiv.appendChild(buttonTaskToDown);
            taskDiv.appendChild(buttonTaskToUp);
            document.getElementById('root').appendChild(taskDiv);
        }
    }
}

function ChangeTaskStatus()
{
    if (this.style.textDecoration == 'line-through')
    {
        this.style.textDecoration = 'none';
        for (let i = 0; i < taskList.length; i++)
        {
            if (taskList[i] == this.innerText)
            {
                taskListStatus[i] = false;
            }
        }
    }
    else
    {
        this.style.textDecoration = 'line-through';
        for (let i = 0; i < taskList.length; i++)
        {
            if (taskList[i] == this.innerText)
            {
                taskListStatus[i] = true;
            }
        }
    }
}

function EditTaskButtonClick()
{
    let text = prompt('Введите текст на который хотите заменить текст вашей задачи:');

    if (text.trim() != '')
    {
        for (let i = 0; i < taskList.length; i++)
        {
            if (this.parentElement.querySelector('p').innerText == taskList[i])
            {
                taskList[i] = text;
                this.parentElement.querySelector('p').innerText = text;
            }
        }
    }
    else
    {
        alert('Текст на который нужно заменить должен содержать минимум 1 символ');
    }
}

function RemoveTaskButtonClick()
{
    for (let i = 0; i < taskList.length; i++)
    {
        if (taskList[i] == this.parentElement.innerText)
        {
            taskList.splice(i, 1);
            taskListStatus.splice(i, 1);
        }
    }
    this.parentElement.remove();
}

function TaskToUpButtonClick()
{
    let parent = document.querySelectorAll('#todo-task')[0].parentNode;
    let currentTask = this.parentElement;

    for (let i = 0; i < document.querySelectorAll('#todo-task').length; i++)
    {
        if (document.querySelectorAll('#todo-task').length > 1)
        {
            if (currentTask.innerText == document.querySelectorAll('#todo-task p')[i].textContent)
            {
                if (i > 0)
                {
                    parent.insertBefore(document.querySelectorAll('#todo-task')[i - 1], currentTask);

                    let currentTaskInList = taskList[i];
                    let currentTaskStatusInList = taskListStatus[i];

                    taskList[i] = taskList[i - 1];
                    taskList[i - 1] = currentTaskInList;

                    taskListStatus[i] = taskListStatus[i - 1];
                    taskListStatus[i - 1] = currentTaskStatusInList;
                }
            }
        }
    }
}

function TaskToDownButtonClick()
{
    let parent = document.querySelectorAll('#todo-task')[0].parentNode;
    let currentTask = this.parentElement;

    for (let i = 0; i < document.querySelectorAll('#todo-task').length; i++)
    {
        if (document.querySelectorAll('#todo-task').length > 1)
        {
            if (currentTask.innerText == document.querySelectorAll('#todo-task p')[i].textContent)
            {
                if (i < document.querySelectorAll('#todo-task').length - 1)
                {
                    parent.insertBefore(document.querySelectorAll('#todo-task')[i + 1], currentTask);

                    let currentTaskInList = taskList[i];
                    let currentTaskStatusInList = taskListStatus[i];

                    taskList[i] = taskList[i + 1];
                    taskList[i + 1] = currentTaskInList;

                    taskListStatus[i] = taskListStatus[i + 1];
                    taskListStatus[i + 1] = currentTaskStatusInList;
                }
            }
        }
    }
}