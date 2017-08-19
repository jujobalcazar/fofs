(function(data){
    var seedData = require("./seedData");
    var database = require("./database");
    var ObjectId = require('mongodb').ObjectID;

    data.getUsers = function(next){
        // next(null, seedData.initialUsers);
        database.getDb(function(err, db) {
            if(err){
                next(err, null);
            }
            else{
                // Get only active users. Sort them asc
                db.users.find().sort({name : 1}).toArray(function(err, results){ // {status: 1}
                    if(err){
                        next(err, null);
                    }
                    else {
                        next(null, results);
                    }
                });

            }
        });
    };

    data.getUser = function(id, next){
        database.getDb(function(err, db) {
            if(err){
                next(err, null);
            }
            else{
                // Get only 1 user  "598905e51bd2ae3ad869c812"
                db.users.findOne({_id: ObjectId(id)}, function(err, result){
                    if(err){
                        next(err, null);
                    }
                    else {
                        next(null, result);
                    }
                });

            }
        });

    };

    data.createNewUser = function(user, next){
        database.getDb(function(err, db){
            if(err){
                next(err);
            }
            else {
                // Check if user with this emal already exists.
                db.users.find({email : user.email}).count(function(err,count){
                    if(err){
                        next(err);
                    }
                    else{
                        if(count > 0){
                            console.log("User with this email already exists");
                            next("User with this email already exists");
                        }
                        else{
                            console.log("Insert user after check.");
                            db.users.insert(user, function(err, docsInserted){
                                if(err){
                                    next(err);
                                }else{
                                    console.log(docsInserted);
                                    next(null);
                                }
                            });
                        }
                    }
                });
            }
        });
    };

    data.updateUser = function(user, next){
        database.getDb(function(err, db){
            if(err){
                next(err);
            }
            else {
                console.log("update one: " + user._id);
                db.users.update(
                    {"_id" : ObjectId(user._id)},
                    {$set:{'name':user.name, 'email':user.email, 'status':user.status, 'age':user.age}});

                next(null);
            }
        });
    };

    data.desactivateUser = function(user, next){
        database.getDb(function(err, db){
            if(err){
                next(err);
            }
            else {
                console.log("update one: " + user._id);
                db.users.update(
                    {"_id" : ObjectId(user._id)},
                    {$set:{'status':0}});
                next(null);
            }
        });
    };

    data.addPost = function(userId, thePost, next){
        database.getDb(function(err, db) {
            if (err) {
                next(err);
            }
            else {
                db.users.update( {_id: ObjectId(userId)}, { $push: {posts: thePost } }, next );
            }
        });
    };

    function seedDatabase(){
        database.getDb(function(err, db){
            if(err){
                console.log("Failed to seed database: " + err);
            }
            else{
                // test if data already exists
                db.users.count(function(err, count){
                    if(err){
                        console.log("Failed to seed database: " + err);
                    }
                    else{
                        if(count == 0){
                            console.log("Seeding the db");
                            seedData.initialUsers.forEach(function(item){
                                db.users.insert(item, function(err){
                                    if(err){
                                        console.log("Failed insert user into db: " + err);
                                    }
                                });
                            });
                        }
                        else{
                            console.log("db already seeded");
                        }
                    }
                });
            }

        });

    }

    seedDatabase();

})(module.exports);