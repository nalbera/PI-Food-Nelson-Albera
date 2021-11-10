/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
//const { INET } = require('sequelize/types');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  name: 'Milanesa Napolitana',
  //id: 'ea0866ca-a212-4268-9f33-37679d2ef186',
};

xdescribe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: false })
    .then(() => Recipe.create(recipe)));
  describe('GET /recipes', () => {
    it('should get 200', () =>
      agent.get('/recipes').expect(200)
    );
  });
});

// describe('Obtiene una receta por nombre y por id', () => {
//   describe ("GET /recipes/:id", () => {
//     it ("Se espera un 200 cuando se pasa un id", () =>{
//       recipe.get(`/recipes/${recipe.id}`).expect(200);
//     });
//   })
//   describe ("GET /recipe?name='name'", () => {
//     it("Se espara 200 cuando recibe un name como parametro", () =>{
//       recipe.get(`/recipes?${recipe.name}`).expect(200);
//     })
//   })
// })

