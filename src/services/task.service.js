// taskService.js
import axios from 'axios';

export class TaskService {
    static instance;

    constructor() {
        if (TaskService.instance) {
            return TaskService.instance;
        }

        this.apiBaseUrl = 'http://localhost:8000';
        TaskService.instance = this;
    }

    getAuthToken() {
        return localStorage.getItem('access_token');
    }

    async getAllTasks() {
        const token = this.getAuthToken();
        const url = `${this.apiBaseUrl}/alltasks/`;
        const result = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return result?.data;
    }

    async createTask(task) {
        const token = this.getAuthToken();
        const url = `${this.apiBaseUrl}/tasks/create/`;
        const result = await axios.post(url, task, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return result?.data;
    }

    async updateTask(task) {
        const token = this.getAuthToken();
        const url = `${this.apiBaseUrl}/tasks/update/${task.id}`;
        const result = await axios.patch(url, task, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return result?.data;
    }

    async deleteTask(taskId) {
        const token = this.getAuthToken();
        const url = `${this.apiBaseUrl}/tasks/delete/${taskId}`;
        const result = await axios.delete(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return result?.data;
    }

}

export default new TaskService();
