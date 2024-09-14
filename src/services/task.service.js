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

    async createTask() {

    }
}

export default new TaskService();
