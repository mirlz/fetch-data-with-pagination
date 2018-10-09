import React from 'react';   
import {observer} from 'mobx-react';
import UserListStore from  './stores/UserListStore';
import styled from "styled-components";
import { Pagination, Icon } from 'antd';
import './css/index.css';

const Row = styled.div`
    border: 1px solid #ddd; 
    padding: 5px;
    margin: 10px;
`;
const Coll = styled.div`
    .header, .content {
        float: left;
    }
`;

const UserList = observer((props) => {
    let userList = UserListStore.ob.data;
    
    const handlePageChange = (page) => {
        UserListStore.ob.currentPage = page;
    }
    const userItem = () => {
        if(userList) {
            return (
                userList.map((obj, index) => {
                    return(
                        <div>
                            <Row>
                            {
                                Object.keys(obj).map((data, key) => {
                                    return (
                                        <div>
                                            <Coll>
                                                <div className="header-{data} header">{data}: </div>
                                                <div className="content-{data} content">{obj[data]}</div>
                                            </Coll>
                                            <div className="clear"></div>
                                        </div>
                                    )
                                })
                            }
                            </Row>
                            <div className="clear"></div>
                        </div>
                    )
                })
            )
        }
    };

    const pagination = () => {
        return (
            <Pagination 
            current={UserListStore.ob.currentPage} 
            onChange={(value, key) => {
                handlePageChange(value);
            }}
            pageSize={UserListStore.ob.pageSize}
            total={UserListStore.ob.totalItems}
            />
        );
    }

    return(
        <div>
            {userItem()}
            {pagination()}
        </div>
    )
})

export default UserList;