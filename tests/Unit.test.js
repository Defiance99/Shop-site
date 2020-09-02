process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server').app;
const expect = chai.expect;
let User = require('../models/User');
let Product = require('../models/Product');

let authToken = {token: ''};
let productId = "";
const user  = {
    name: 'Admin',
    login: 'Admin',
    password: 'Admin'
}

chai.use(chaiHttp);

before((done) => {
    User.remove({}, (err) => {
        if (err) console.log(err);
    });
    it('Should POST form sign up', done => {
        chai.request(server)
        .post('/api/user/register')
        .send(user)
        .end((err,res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.haveOwnProperty('message');
            done();
        });
    });
    it('Should log in system and return auth token', done => {
        chai.request(server)
            .post('/api/user/login')
            .send(user)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.haveOwnProperty('token');
                authToken = res.body;
                done();
            })
    });
    it('Should return login exist', done => {
        chai.request(server)
            .post('/api/user/register')
            .send(user)
            .end((err,res) => {
                expect(err).to.null;
                expect(res).to.have.status(409);
                expect(res.body).to.haveOwnProperty('message');

                done();
            });
    });
    done();
});

describe('User Controller', () => { 
    it('shouldn\'t log in system with wrong login', done => {
        chai.request(server)
            .post('/api/user/login')
            .send({
                login: 'wrogn',
                password: 'Admin'
            })
            .end((err,res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(404);
                expect(res.body).to.haveOwnProperty('message');
                done();
            })
    });
    it('should\'t log in system with wrong password', done => {
        chai.request(server)
        .post('/api/user/login')
        .send({
            login: 'Admin',
            password: 'wrong'
        })
        .end((err,res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(401);
            expect(res.body).to.haveOwnProperty('message');
            
            done();
        })
    });
    it('should return user info', done => {
        chai.request(server)
            .get('/api/user/userInfo')
            .set('authorization', authToken.token)
            .end((err,res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body[0]).to.have.property('_id');

                done();
            });
    });
});

describe('Product Controller', () => { 
    let product = {
        nameProduct: 'Test',
        category: 'Test',
        cost: 1,
    }
    before( done => {
        Product.remove({}, err => {
            if (err) console.log(err);
            done();
        });
    });
    describe('/POST createProducts', done => {
        it('Should create product', done => {
            chai.request(server)
            .post('/api/product/createProducts')
            .set('authorization', authToken.token)
            .send(product)
            .end((err,res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                productId = res.body._id;

                done();
            });
        });
        it('Shouldn\'t create product without fields', done => {
            chai.request(server)
                .post('/api/product/createProducts')
                .set('authorization', authToken.token)
                .send()
                .end((err,res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(500);
                    expect(res.body).to.haveOwnProperty('message');

                    done();
                });
        });
        it('Shouldn\'t create product without auth token', done => {
            chai.request(server)
                .post('/api/product/createProducts')
                .set('authorization', '')
                .send()
                .end((err,res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401);

                    done();
                });
        });
    });
    describe('/GET products', () => {
        it('Should return all products', done => {
            chai.request(server)
            .get('/api/product/products')
            .end((err,res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.lengthOf.above(0);
                
                done();
            });
        });
    });
    describe('/GET product by id', () => {
        it('Should return product', done => {
            chai.request(server)
                .get(`/api/product/${productId}`)
                .set('authorization', authToken.token)
                .end((err,res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.haveOwnProperty('data');

                    done();
                });
        });
        it('Should\'nt return product without auth token', done => {
            chai.request(server)
                .get(`/api/product/${productId}`)
                .set('authorization', '')
                .end((err,res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401);

                    done();
                });
        });
    });
    describe('/GET myProducts', () => {
        it('Should return my products', done => {
            chai.request(server)
            .get('/api/product/myProducts')
            .set('authorization', authToken.token)
            .end((err,res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.lengthOf.above(0);
                
                done();
            });
        });
        it('Should\'nt return product without auth token', done => {
            chai.request(server)
                .get(`/api/product/myProducts`)
                .set('authorization', '')
                .end((err,res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401);

                    done();
                });
        });
    });
    describe('/GET productByCategory/:category', () => {
        it('Should return products', done => {
            chai.request(server)
                .get(`/api/product/productByCategory/${product.category}`)
                .set('authorization', authToken.token)
                .end((err,res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.lengthOf.above(0);
                    
                    done();
                });
        });
    });
    describe('/DELETE product by id', () => {
        it('Should delete product', done => {
            chai.request(server)
                .delete(`/api/product/${productId}`)
                .set('authorization', authToken.token)
                .end((err,res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.haveOwnProperty('message');
                    
                    done();
                });
        });
        it('Should\'nt delete product without auth token', done => {
            chai.request(server)
                .delete(`/api/product/${productId}`)
                .set('authorization', '')
                .end((err,res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401);
                    
                    done();
                });
        });
    });
}); 

describe('Order Controller', () => {

    describe('/GET myOrder', () => {
        it('Should return list of orders', done => {
            chai.request(server)
                .get(`/api/order/myOrder`)
                .set('authorization', authToken.token)
                .end((err,res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    
                    done();
                });
        });
        it('Should\'nt return orders without auth token', done => {
            chai.request(server)
                .get(`/api/order/myOrder`)
                .set('authorization', '')
                .end((err,res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401);
                    
                    done();
                });
        });
    });

    describe('/POST toOrder', () => {
        it('Should add product to an order', done => {
            chai.request(server)
                .post(`/api/order/addToOrder`)
                .set('authorization', authToken.token)
                .end((err,res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    expect(res.body).to.haveOwnProperty('message');

                    done();
                });
        });
        it('Should\'nt add product to an order without auth token', done => {
            chai.request(server)
                .post(`/api/order/addToOrder`)
                .set('authorization', '')
                .end((err,res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401);

                    done();
                });
        });
    });

    describe('/GET checkout', () => {
        it('Should checkout an order', done => {
            chai.request(server)
                .get(`/api/order/checkout`)
                .set('authorization', authToken.token)
                .end((err,res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.haveOwnProperty('message');

                    done();
                });
        });
        it('Should\'nt checkout an order without auth token', done => {
            chai.request(server)
                .get(`/api/order/checkout`)
                .set('authorization', '')
                .end((err,res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401);

                    done();
                });
        });
    });

    describe('/GET history', () => {
        it('Should return history an order', done => {
            chai.request(server)
                .get(`/api/order/history`)
                .set('authorization', authToken.token)
                .end((err,res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.equal([]);

                    done();
                });
        });
        it('Should\'nt return history an order without auth token', done => {
            chai.request(server)
                .get(`/api/order/history`)
                .set('authorization', '')
                .end((err,res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401);

                    done();
                });
        });
    });
    describe('/DELETE myOrder', () => {
        it('Should remove order', done => {
            chai.request(server)
                .delete(`/api/order/myOrder/${productId}`)
                .set('authorization', authToken.token)
                .end((err,res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.haveOwnProperty('message');

                    done();
                });
        });
        it('Should\'nt return remove order without auth token', done => {
            chai.request(server)
                .delete(`/api/order/myOrder/${productId}`)
                .set('authorization', '')
                .end((err,res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401);

                    done();
                });
        });
    });
});

describe('Comment Controller', () => {
    let form = {
        name: 'Test',
        comment: 'Test'
    }

    describe('/POST createComment', () => {
        it('Should create comment', done => {
            chai.request(server)
                .post(`/api/comment/createComment`)
                .set('authorization', authToken.token)
                .send(form)
                .end((err,res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.haveOwnProperty('message');

                    done();
                });
        });
        it('Should\'nt create comment without auth token', done => {
            chai.request(server)
                .post(`/api/comment/createComment`)
                .set('authorization', '')
                .end((err,res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401);

                    done();
                });
        });
    });

    describe('/GET commentByProductId:/id', () => {
        it('Should return comments', done => {
            chai.request(server)
                .get(`/api/comment/commentsByProductId/${productId}`)
                .set('authorization', authToken.token)
                .end((err,res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.haveOwnProperty(data);

                    done();
                });
        });
        it('Should\'nt return comments without auth token', done => {
            chai.request(server)
                .get(`/api/comment/commentsByProductId/${productId}`)
                .set('authorization', '')
                .end((err,res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401);

                    done();
                });
        });
    });
});