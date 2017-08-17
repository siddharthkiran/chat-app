
class Users{
  constructor(){
    this.users=[];
  }

  addUser(id,name,room){
    var user = {
      id:id,
      name:name,
      room:room
    }
    this.users.push(user);
    return user;
  }

  removeUser(id){
      var user = this.getUser(id);
      if(user){
        this.users = this.users.filter((user) =>  user.id!==id);
      }
      return user;
  }

  getUser(id){
    var user= this.users.filter((user)=> user.id==id)[0];
    return user;
  }

  getUserList(room){
    var users = this.users.filter((user) => user.room==room);
    var userArray =  users.map((user) => user.name);
    return userArray;
  }
}

module.exports ={Users};
