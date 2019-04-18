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
    GraphQLNonNull
} = graphql;

// dummy data
var users = [
    { name: 'Sonam', email: 'sonam@intuit.com', corpId: 'sagarwal3', role: '1', id: '1', teamId: 'SBSEGBILLING' },
    { name: 'Anusha', email: 'anusha@intuit.com', corpId: 'anusha1', role: '2',  id: '2', teamId: 'SBSEGBILLING' },
    { name: 'Suresh', email: 'suresh@intuit.com', corpId: 'sd', role: '1', id: '3',teamId: 'SBSEGBILLING' },
    { name: 'Anmol', email: 'anmolintuit.com', corpId: 'agautam1', role: '2',  id: '4', teamId: 'CGDATA' }
];

var teams = [
    { teamId: 'SBSEGBILLING', email: 'sbsegbilling@intuit.com', description: 'SBSEG Billing team in IDC',  id: '1' },
    { teamId: 'CGDATA', email: 'cgdata@intuit.com', description: 'CG Data team',  id: '2' },
];

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
              return _.find(teams, { teamId: parent.teamId });
                //return Team.findById(team.teamId);
            }
        }
    })
});

const TeamType = new GraphQLObjectType({
    name: 'Team',
    fields: ( ) => ({
        id: { type: GraphQLID },
        teamId: { type: GraphQLString },
        email: { type: GraphQLString },
        description: { type: GraphQLString },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
              return _.filter(users, { teamId: parent.teamId});
                //return Team.findById(team.teamId);
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
              return _.find(users, { corpId: args.corpId });
              //  return User.findById(args.corpId);
            }
        },
        team: {
            type: TeamType,
            args: { nameId: { type: GraphQLString } },
            resolve(parent, args){
               return _.find(teams, { teamId: args.teamId });
              //  return Team.findById(args.teamId);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
              return users;
              //  return User.find({});
            }
        },
        teams: {
            type: new GraphQLList(TeamType),
            resolve(parent, args){
              return teams;
              //  return Team.find({});
            }
        }
    }
});



module.exports = new GraphQLSchema({
    query: RootQuery,
  //  mutation: Mutation
});
