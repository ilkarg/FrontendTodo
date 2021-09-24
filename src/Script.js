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

export function ClickOnEnter(e)
{
    if (e.keyCode === 13)
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

            buttonTaskEdit.setAttribute('id', 'button-task-edit');
            buttonTaskEdit.setAttribute('src', './edit.png');
            buttonTaskEdit.addEventListener('click', EditTaskButtonClick);

            buttonTaskRemove.setAttribute('id', 'button-task-remove');
            buttonTaskRemove.setAttribute('src', './remove.png');
            buttonTaskRemove.addEventListener('click', RemoveTaskButtonClick);

            taskTextTag.addEventListener('click', ChangeTaskStatus);
            taskTextTag.setAttribute('id', 'label-task');
            taskTextTag.innerHTML = text;
            document.getElementById('add-task-input').value = '';

            taskDiv.setAttribute('id', 'todo-task');
            taskDiv.appendChild(taskTextTag);
            taskDiv.appendChild(buttonTaskRemove);
            taskDiv.appendChild(buttonTaskEdit);
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
            let buttonTaskRemove = document.createElement('img');
            let buttonTaskEdit = document.createElement('img');

            buttonTaskEdit.setAttribute('id', 'button-task-edit');
            buttonTaskEdit.setAttribute('src', './edit.png');
            buttonTaskEdit.addEventListener('click', EditTaskButtonClick);

            buttonTaskRemove.setAttribute('id', 'button-task-remove');
            buttonTaskRemove.setAttribute('src', './remove.png');
            buttonTaskRemove.addEventListener('click', RemoveTaskButtonClick);

            taskTextTag.addEventListener('click', ChangeTaskStatus);
            taskTextTag.setAttribute('id', 'label-task');
            taskTextTag.innerHTML = text;
            document.getElementById('add-task-input').value = '';

            taskDiv.setAttribute('id', 'todo-task');
            taskDiv.appendChild(taskTextTag);
            taskDiv.appendChild(buttonTaskRemove);
            taskDiv.appendChild(buttonTaskEdit);
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
            //alert(this.parentElement.innerText);
            if (this.parentElement.querySelector('p').innerText == taskList[i])
            {
                /*for (let j = 0; j < document.querySelectorAll('#todo-task p'); j++)
                {
                    if (taskList[i] == document.querySelectorAll('#todo-task p')[j])
                    {
                        document.querySelectorAll('#todo-task p')[j].innerText = text;
                        alert(document.querySelectorAll('#todo-task p')[j].innerText);
                    }
                }*/
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