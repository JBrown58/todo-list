import { v4 as uuidv4 } from 'uuid';
import getUserInput from './getUserInput';
import localStorage from './localStorage';

class Project {
  constructor(projName) {
    this.projName = projName;
    this.id = uuidv4();
  }

  static getExistingValues = {};

  static editTodoId = null;

  static isEditMode = false;

  static projects = [];

  static attribute = '';

  static locatedProject = {};

  static addedProject(event) {
    event.preventDefault();
    const getValues = getUserInput();
    Project.projects.push(new Project(getValues.proj));
    localStorage.setLocalStorage()
    console.log(Project.projects);
  }

  static getSelectedProject(event) {
    Project.attribute = event.target.getAttribute('data-id');
    for (let i = 0; Project.projects.length; i += 1) {
      if (Project.projects[i].id === Project.attribute) {
        Project.locatedProject = Project.projects[i];
        console.log(Project.locatedProject);
        console.log(i);
        console.log(Project.projects);
        break;
      }
    }
  }

  static addTodo(event) {
    event.preventDefault();
    const userInput = getUserInput();
    if (
      Project.projects.find(
        (project) => project.id === Project.locatedProject.id
      ) !== undefined // check if the project exists
    ) {
      if (Project.isEditMode === false) {
        if (
          Project.locatedProject.hasOwnProperty.call(
            Project.locatedProject,
            'todoItems'
          ) === // if we are not in edit mode,
          // check if the project has todoItems
          false
        ) {
          Project.locatedProject.todoItems = [
            {
              name: userInput.todoName,
              desc: userInput.desc,
              date: userInput.date,
              priority: userInput.priority,
              id: uuidv4(),
            },
          ];
        } else {
          Project.locatedProject.todoItems.push({
            name: userInput.todoName,
            desc: userInput.desc,
            date: userInput.date,
            priority: userInput.priority,
            id: uuidv4(),
          });
        }
      } else {
        // if we are in edit mode,
        // Update the existing todoItem instead of overwriting it
        const todoItem = Project.locatedProject.todoItems.find(
          (item) => item.id === Project.editTodoId
        );

        if (todoItem !== undefined) {
          todoItem.name = userInput.todoName;
          todoItem.desc = userInput.desc;
          todoItem.date = userInput.date;
          todoItem.priority = userInput.priority;
        }

        // Reset the edit mode and editTodoId after updating the todoItem
        Project.isEditMode = false;
        Project.editTodoId = null;
      }
    } else {
      console.log('Project not found');
    }
  }

  static removeProject(event) {
    for (let i = 0; i < Project.projects.length; i += 1) {
      if (Project.attribute === Project.projects[i].id) {
        for (let x = 0; x <= Project.projects[i].todoItems.length; x += 1) {
          if (event.target.dataset.id === Project.projects[i].todoItems[x].id) {
            const arr = Project.projects[i].todoItems;
            arr.splice(x, 1);
            break;
          }
        }
      }
    }
  }

  static editProject(event) {
    for (let i = 0; i < Project.projects.length; i += 1) {
      if (Project.attribute === Project.projects[i].id) {
        for (let x = 0; x <= Project.projects[i].todoItems.length; x += 1) {
          if (event.target.dataset.id === Project.projects[i].todoItems[x].id) {
            Project.isEditMode = true;
            Project.editTodoId = Project.projects[i].todoItems[x].id;

            Project.getExistingValues = getUserInput();
            Project.getExistingValues.todoName =
              Project.projects[i].todoItems[x].name;
            Project.getExistingValues.desc =
              Project.projects[i].todoItems[x].desc;
            Project.getExistingValues.date =
              Project.projects[i].todoItems[x].date;
            Project.getExistingValues.priority =
              Project.projects[i].todoItems[x].priority;
            Project.getExistingValues.proj = Project.projects[i].projName;
            break;
          }
        }
      }
    }
  }

  static clearGetExistingValues() {
    Project.getExistingValues = {};
  }
}

export default Project;
