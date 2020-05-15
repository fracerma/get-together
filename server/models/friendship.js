module.exports = (sequelize, DataTypes) => {
    const Friendship = sequelize.define('Friendship', {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      friendId: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      pending: DataTypes.BOOLEAN
    }, {});
    Friendship.associate = function(models) {
      Friendship.belongsTo(models.User,{foreignKey:"userId"});
      Friendship.belongsTo(models.User,{foreignKey:"friendId"});
    };
    //funzione per aggiungere un amico
    Friendship.friendRequest = async function(fromId,toId){
      try{
        //creo la relazione, pending indica se la richiesta è accettata o meno
        await Friendship.create({userId: toId,friendId: fromId , pending:true});
        //TODO emetti notifica
      }
      catch(e){
        throw e;
      }
    }
    Friendship.acceptRequest=async function(fromId,toId){
      try{
        const relation=await Friendship.findOne({
          where:{
            userId: fromId,
            friendId: toId
          }
        });
        relation.pending=false;
        await relation.save();
        await Friendship.create({userId: toId,friendId: fromId , pending:false});
      }
      catch(e){
        throw e;
      }
    }

    return Friendship;
  };
  