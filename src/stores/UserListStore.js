import { observable, action, autorun } from "mobx";

const axios = require('axios');

const ob = observable({
    data: [],
    totalItems: 0,
    currentPage: 1, 
    pageSize: 0
});

const getUserListByPage = () => {
    axios.get('https://reqres.in/api/users', {
        params: {
          page: ob.currentPage
        }
    })
    .then(function (response) {
        //shallow copy of the user data
        let data = response.data.data.slice();
        ob.data = data;
        ob.totalItems = response.data.total;
        ob.pageSize = response.data.per_page;
    })
}
autorun(() => {    
    getUserListByPage();
});

const UserListStore = {
    ob,
    getUserListByPage
};

export default UserListStore;