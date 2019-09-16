process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

after(function (done) {
  process.exit();
});

const board = {
  puzzle: '5,1,0,0,7,0,0,0,2,' +
          '0,9,0,0,0,8,5,0,6,' +
          '0,0,8,2,0,0,0,1,4,' +
          '0,0,0,0,0,0,0,0,0,' +
          '0,4,0,0,6,0,0,0,0,' +
          '0,0,5,0,0,0,0,4,7,' +
          '8,3,6,0,0,0,0,0,0,' +
          '0,0,0,0,0,0,0,0,0,' +
          '1,5,9,0,4,2,7,3,8'
};

const invalidBoard = {
  puzzle: '5,1,5,7,7,0,0,0,2,' +
          '5,9,0,0,0,8,5,0,6,' +
          '0,0,8,2,0,0,0,1,4,' +
          '0,0,0,0,0,0,0,0,0,' +
          '0,4,0,0,6,0,0,0,2,' +
          '0,0,5,0,0,0,0,4,7,' +
          '8,3,6,0,0,0,0,0,0,' +
          '0,0,0,0,0,0,0,0,0,' +
          '1,5,9,0,4,2,7,3,8'
};

const unsolvableBoard = {
  puzzle: '6,0,0,0,0,8,9,4,0,' +
          '9,0,0,0,0,6,1,0,0,' +
          '0,7,0,0,4,0,0,0,0,' +
          '2,0,0,6,1,0,0,0,0,' +
          '0,0,0,0,0,0,2,0,0,' +
          '0,8,9,0,0,2,0,0,0,' +
          '0,0,0,0,6,0,0,0,5,' +
          '0,0,0,0,0,0,0,3,0,' +
          '8,0,0,0,0,1,6,0,0'
};

describe('Sudoku API', () => {

  it('should return a new game with default level 27', (done) => {
    chai.request(server)
      .get('/api/game/')
      .end((err, res) => {
        expect(err).be.null;
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.a('object');
        const result = JSON.parse(JSON.stringify(res.body));
        expect(result.board).to.be.a('array');
        expect(result.board.length).to.equal(81);
        return done(err);
      });
  });

  it('should validate an valid game board and return an errors array with no errors', (done) => {
    chai.request(server)
      .post('/api/game/validate/')
      .send(board)
      .end((err, res) => {
        expect(err).be.null;
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.a('object');
        const result = JSON.parse(JSON.stringify(res.body));
        expect(result.errors).to.be.a('array');
        const errors = result.errors.filter(x => x === true);
        expect(errors).to.be.empty;
        return done(err);
      });
  });

  it('should validate an in-valid game board and return an errors array containing errors', (done) => {
    chai.request(server)
      .post('/api/game/validate/')
      .send(invalidBoard)
      .end((err, res) => {
        expect(err).be.null;
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.a('object');
        const result = JSON.parse(JSON.stringify(res.body));
        expect(result.errors).to.be.a('array');
        const errors = result.errors.filter(x => x === true);
        expect(errors).to.not.be.empty;
        expect(errors.length).to.equal(5);
        return done(err);
      });
  });

  it('should return a valid solution given a solvable puzzle', (done) => {
    chai.request(server)
      .post('/api/game/solve/')
      .send(board)
      .end((err, res) => {
        expect(err).be.null;
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.a('object');
        const result = JSON.parse(JSON.stringify(res.body));
        expect(result.board).to.be.a('array');
        expect(result.solved).to.equal(true);
        const zeros = result.board.filter(x => x === 0);
        expect(zeros).to.be.empty;
        return done(err);
      });
  });

  it('should return solved false given an unsolvable puzzle', (done) => {
    chai.request(server)
      .post('/api/game/solve/')
      .send(unsolvableBoard)
      .end((err, res) => {
        expect(err).be.null;
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.a('object');
        const result = JSON.parse(JSON.stringify(res.body));
        expect(result.board).to.be.a('array');
        expect(result.solved).to.equal(false);
        const zeros = result.board.filter(x => x === 0);
        expect(zeros).to.not.be.empty;
        return done(err);
      });
  });

});
