const chai = require("chai");
const chaiHttp = require("chai-http");

const {app, runServer, closeServer} = require("../server");

const expect = chai.expect;

chai.use(chaiHttp);

describe("Shopping List", function(){
  before(function(){
    return runServer();
  });
  after(function(){
    return closeServer();
  });

  it('Testing ground for GET', function(){
    return chai
      .request(app)
      .get('/shopping-list')
      .then(function(res) {
        expect(res).to.have.status(200);
      });
  });
  it('Testing ground for POST', function() {
    const newPost = { name: 'coffee', checked: false };
    return chai
    .request(app)
    .post('/shopping-list')
    .send(newPost)
    .then(function(res) {
      expect(res).to.have.status(201);
    });
  });
  it('Testing ground for PUT', function() {
    const updatedId = {
      name: "Foo",
      checked: true
    };
    return (chai
    .request(app)
    .get('/shopping-list')
    .then(function(res) {
      updatedId.id = res.body[0].id;

    return chai
    .request(app)
    .put(`/shopping-list/${updatedId.id}`)
    .send(updatedId);
    })
    .then(function(res){
      expect(res).to.have.status(200);
      expect(res.body).to.deep.equal(updatedId);
    })
  );
});
  it('Testing ground for Delete', function(){
    return (
      chai
      .request(app)
      .get('/shopping-list')
      .then(function(res) {
        return chai.request(app).delete(`/shopping-list/${res.body[0].id}`);
      })
      .then(function(res) {
        expect(res).to.have.status(204);
      })
    );
  });

});

describe("Recipes", function(){
  before(function(){
    return runServer();
  });
  after(function(){
    return closeServer();
  });
  it('Testing ground for GET', function(){
    return chai
      .request(app)
      .get('/recipes')
      .then(function(res) {
        expect(res).to.have.status(200);
      });
  });
  it('Testing ground for POST', function(){
    const newRecipe = { name: "pizza", ingredients: 'dough', checked: false };
    return chai
    .request(app)
    .post('/recipes')
    .send(newRecipe)
    .then(function(res){
      expect(res).to.have.status(201);
    });
  });
  it('Testing ground for PUT', function(){
    const updatedList = {
      name: 'Chesssy Pizza', ingredients: 'cheesy', checked: true
    };
    return (
      chai
      .request(app)
      .get('/recipes')
      .then(function(res) {
        updatedList.id = res.body[0].id;

        return chai
        .request(app)
        .put(`/recipes/${updatedList.id}`)
        .send(updatedList);
      })
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal(updatedList);
        })
    );
  });
  it('Testing ground for DELETE', function() {
    return (
      chai
      .request(app)
      .get('/recipes')
      .then(function(res) {
        return chai.request(app).delete(`/recipes/${res.body[0].id}`);
      })
      .then(function(res){
        expect(res).to.have.status(204);
      })
    );
  });

});
