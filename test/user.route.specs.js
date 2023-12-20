const request = require('supertest');
const app = require('../app')

describe('Pruebas API users', () => {
    describe('GET /api/users', () => {

        it('Comprobar que funcion la ruta', async () => {
            const response = await request(app).get('/users').send();
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json')
        })

        it('Comprobar que nos devuelve un array de usuarios', async ()=> {
            const response = await request(app).get('/users').send();
            
        })

    })

})