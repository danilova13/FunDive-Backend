import { Pool } from "pg";
import { NewApp } from "../app"
import type { Server } from "http";
import { UserDB } from "../db/user";
import { faker } from "@faker-js/faker";
import request from 'supertest';
import type { Express } from "express";
import { jwtGenerator } from "../auth/jwtGenerator";
import { DiveDB } from "../db/dive";

describe('Integration tests for resolvers', () => {
    let pool: Pool;
    let db: UserDB; 
    let diveDb: DiveDB;
    let app: Express;

    // initiate db and start app before running all tests
    beforeAll(async () => {
        const port = 9000;
        const testApp = await NewApp();
        pool = testApp.pool;
        app = testApp.app;
        db = new UserDB(pool);
        diveDb = new DiveDB(pool);
        // server = app.listen(port, () => {
        //     console.log(`App listening on port ${port}`);
        // })
    })

    afterEach(async () => {
        // need a client from the pool to connect to db and execute a query (truncate)
        await pool.query(`TRUNCATE TABLE dives CASCADE`);
        await pool.query(`TRUNCATE TABLE users CASCADE`);
    })

    // afterAll(async () => {
    //     server.close()
    // })

    // function that creates test user with fake data
    function createTestUserData() {
        return {
            email: faker.internet.email(),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            phone: faker.phone.number(),
            password: faker.internet.password()
        }
    }

    function createTestDiveData() {
        return {
            name: "Dive1",
            date: "January 1, 2023",
            description: 'fun dive',
            duration: 40,
            location: "Cuba"
        }
    }

    describe('getUserById', () => {
        it('should return a user with a specified id when the user is logged in', async () => {
            // creates and saves test user to db
            const user = await db.saveUser(createTestUserData());

            // define getUser query 
            const getUserQuery = `
                query Query {
                    getUserById(id: ${user.id}){
                        id
                        firstName
                    } 
                }
            `
            // create jwtToken with user id
            const jwtToken = jwtGenerator(user.id);
    
            await request(app)
                .post('/graphql')
                // set jwtToken in authorization header (i.e user is logged in)
                .set('Authorization', `Bearer ${jwtToken}`)
                .send({
                    query: getUserQuery
                })
                .expect(200)
                .then(response => {
                    expect(response.body.errors).toBeUndefined();
                    expect(response.body.data.getUserById.id).toEqual(user.id);
                })
        });

        it('should return login required error if the user is not logged in', async () => {
            const user = await db.saveUser(createTestUserData());
            const getUserQuery = `
                query Query {
                    getUserById(id: ${user.id}){
                        id
                        firstName
                    } 
                }
            `

            await request(app)
                .post('/graphql')
                .send({
                    query: getUserQuery
                })
                .expect(200)
                .then(response => {
                    expect(response.body.errors).toBeDefined();
                    expect(response.body.errors[0].message).toEqual("You have to be logged in to get a user!");
                })
        });

        it("should return you can't access this user if incorrect user is logged in", async () => {
            const user = await db.saveUser(createTestUserData());
            const user1 = await db.saveUser(createTestUserData());

            const getUserQuery = `
                query Query {
                    getUserById(id: ${user.id}){
                        id
                        firstName
                    } 
                }
            `
            // create jwtToken with user id
            const jwtToken = jwtGenerator(user1.id);
    
            await request(app)
                .post('/graphql')
                // set jwtToken in authorization header (i.e user is logged in)
                .set('Authorization', `Bearer ${jwtToken}`)
                .send({
                    query: getUserQuery
                })
                .expect(200)
                .then(response => {
                    expect(response.body.errors).toBeDefined();
                    expect(response.body.errors[0].message).toEqual("You can't access this user!");
                })

        });
    });

    describe('getDiveById', () => {
        it('should return a dive with a specified id when the user is logged in', async () => {
            // save user to db
            const user = await db.saveUser(createTestUserData());
            // save dive to db 
            const dive = await diveDb.saveDive(user.id, createTestDiveData());

            const getDiveQuery = `
                query getDiveById {
                    getDiveById(id: ${dive.id}) {
                        name
                        location
                        description
                        id
                    }
                }
            `

            // create jwtToken with user id
            const jwtToken = jwtGenerator(user.id);
    
            await request(app)
                .post('/graphql')
                // set jwtToken in authorization header (i.e user is logged in)
                .set('Authorization', `Bearer ${jwtToken}`)
                .send({
                    query: getDiveQuery
                })
                .expect(200)
                .then(response => {
                    expect(response.body.errors).toBeUndefined();
                    expect(response.body.data.getDiveById.id).toEqual(dive.id);
                })
        });

        it('should return You have to be logged in to get a dive when user is not logged in', async () => {
            // save user to db
            const user = await db.saveUser(createTestUserData());
            // save dive to db 
            const dive = await diveDb.saveDive(user.id, createTestDiveData());
  
            const getDiveQuery = `
                query getDiveById {
                    getDiveById(id: ${dive.id}) {
                        name
                        location
                        description
                        id
                    }
                }
            `
            await request(app)
                .post('/graphql')
                .send({
                    query: getDiveQuery
                })
                .expect(200)
                .then(response => {
                    expect(response.body.errors).toBeDefined();
                    expect(response.body.errors[0].message).toEqual("You have to be logged in to get a dive!");
                })
        }); 

        it('should return You cant access this dive if incorrect user logged in', async () => {
            // save user to db
            const user = await db.saveUser(createTestUserData());
            const user1 = await db.saveUser(createTestUserData());
            // save dive to db 
            const dive = await diveDb.saveDive(user.id, createTestDiveData());

            const getDiveQuery = `
                query getDiveById {
                    getDiveById(id: ${dive.id}) {
                        name
                        location
                        description
                        id
                    }
                }
            `

            const jwtToken = jwtGenerator(user1.id);

            await request(app)
                .post('/graphql')
                // set jwtToken in authorization header (i.e user is logged in)
                .set('Authorization', `Bearer ${jwtToken}`)
                .send({
                    query: getDiveQuery
                })
                .expect(200)
                .then(response => {
                    expect(response.body.errors).toBeDefined();
                    expect(response.body.errors[0].message).toEqual("You can't access this dive!");
                })

        });
    });

    describe('getDivesByUserId', () => {
        it('should return dives for a user with a specified id, when user is logged in', async () => {
            // save user to db
            const user = await db.saveUser(createTestUserData());
            // create and save dives to db 
            const dive1 = await diveDb.saveDive(user.id, createTestDiveData());
            const dive2 = await diveDb.saveDive(user.id, createTestDiveData());

            // select all the saved dives from the database for this user
            const dbDives = await diveDb.getDivesByUserId(user.id, 10, 0);

            const getDivesForUserQuery = `
                query getDivesByUserId {
                    getDivesByUserId(userId: ${user.id}, limit: 10, offset: 0) {
                        name
                        location
                        description
                        duration
                        id
                        userId
                        date
                    }
                }
            `

            // create jwtToken with user id
            const jwtToken = jwtGenerator(user.id);

            await request(app)
                .post('/graphql')
                // set jwtToken in authorization header (i.e user is logged in)
                .set('Authorization', `Bearer ${jwtToken}`)
                .send({
                    query: getDivesForUserQuery
                })
                .expect(200)
                .then(response => {
                    expect(response.body.errors).toBeUndefined();
                    expect(response.body.data.getDivesByUserId).toEqual(dbDives);
                })
        }); 
    })


})
