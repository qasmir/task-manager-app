const request = require('supertest');
const app = require('../app');
const Task = require('../models/task');

describe('Task API', () => {
  beforeEach(async () => {
    await Task.deleteMany({});
  });

  it('should create a new task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({
        title: 'Test Task',
        description: 'Test Description'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('title', 'Test Task');
    expect(res.body).toHaveProperty('description', 'Test Description');
  });

  it('should get all tasks', async () => {
    const tasks = [
      { title: 'Task 1', description: 'Description 1' },
      { title: 'Task 2', description: 'Description 2' }
    ];
    await Task.insertMany(tasks);

    const res = await request(app).get('/tasks');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(2);
  });

  it('should get a task by ID', async () => {
    const task = new Task({ title: 'Task 1', description: 'Description 1' });
    await task.save();

    const res = await request(app).get(`/tasks/${task._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Task 1');
  });

  it('should update a task', async () => {
    const task = new Task({ title: 'Task 1', description: 'Description 1' });
    await task.save();

    const res = await request(app)
      .put(`/tasks/${task._id}`)
      .send({ title: 'Updated Task', description: 'Updated Description' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Updated Task');
  });

  it('should delete a task', async () => {
    const task = new Task({ title: 'Task 1', description: 'Description 1' });
    await task.save();

    const res = await request(app).delete(`/tasks/${task._id}`);
    expect(res.statusCode).toEqual(200);

    const taskInDb = await Task.findById(task._id);
    expect(taskInDb).toBeNull();
  });
});