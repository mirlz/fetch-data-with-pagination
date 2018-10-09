import React from 'react';   
import {observer} from 'mobx-react';
import UserListStore from  './stores/UserListStore';

const UserList = observer((props) => {
    let userList = UserListStore.ob.data;
    
    if(userList) {
        userList.forEach((data, key) => {
            return(
                <div>
                    {
                        console.log(data)
                    }
                </div>
            )
        });
    }
})

export default UserList;