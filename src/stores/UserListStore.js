import { observable, action, autorun } from "mobx";

const axios = require('axios');

const ob = observable({
    data: [],
});

autorun(() => {    
    axios.get('https://reqres.in/api/users', {
        params: {
          page: 1
        }
    })
    .then(function (response) {
        //shallow copy of the user data
        let data = response.data.data.slice();
        console.log(data)
        ob.data = data;
    })
});

const UserListStore = {
    ob,
};

export default UserListStore;