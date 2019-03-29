const graphql = require('graphql');
const Team = require('../models/team');
const User = require('../models/user');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        corpId: { type: GraphQLString },
        role: { type: GraphQLInt },
        team: {
            type: TeamType,
            resolve(parent, args){
                return Team.findOne({nameId: parent.teamId});
            }
        }
    })
});

const TeamType = new GraphQLObjectType({
    name: 'Team',
    fields: ( ) => ({
        id: { type: GraphQLID },
        nameId: { type: GraphQLString },
        email: { type: GraphQLString },
        description: { type: GraphQLString },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
              return User.find({ teamId: parent.nameId });
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { corpId: { type: GraphQLString } },
            resolve(parent, args){
                console.log('corpId: '+args.corpId);
              return User.findOne({corpId: args.corpId});
            }
        },
        team: {
            type: TeamType,
            args: { nameId: { type: GraphQLString } },
            resolve(parent, args){
              console.log("NAME_ID ->> ", args.nameId);
              return Team.findOne({nameId: args.nameId});
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
              //return users;
                return User.find({});
            }
        },
        teams: {
            type: new GraphQLList(TeamType),
            resolve(parent, args){
              //return teams;
                return Team.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                name: { type: GraphQLString },
                email: { type: new GraphQLNonNull(GraphQLString) },
                corpId: { type: new GraphQLNonNull(GraphQLString) },
                role: { type: GraphQLInt },
                teamId: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args){
                let user = new User({
                    name: args.name,
                    email: args.email,
                    corpId: args.corpId,
                    role: args.role,
                    teamId: args.teamId
                });
                return user.save();
            }
        },
        addTeam: {
            type: TeamType,
            args: {
                nameId: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLString },
                description: { type: GraphQLString }
            },
            resolve(parent, args){
                let team = new Team({
                    nameId: args.nameId,
                    email: args.email,
                    description: args.description
                });
                return team.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
