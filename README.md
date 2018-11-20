## Fetch Data 

### Overview

This is a very short code to simply create a section for fetching data using React. 

### Library / Framework used

For quick installation, I used create-react-app to set up the project for me. Additional resources used are as below: 

- React
- Mobx (state management)
- Node 
- Antd Design (UI)
- Axios
- Styled Component

### Data fetched from 3rd party source

UserListStore.js is created so as to store the data from the source. Manipulation to the data are to be done here in this file. 

An observable object should be created first to hold the relevant data. The states are stored in here as well. 

    const  ob  =  observable({
		data: [],
		totalItems:  0,	
		currentPage:  1,
		pageSize:  0
	});

The following is used to query for the data from the source. When the server responds, the data is assigned to the ob object. Shallow copy is used as I don't want to accidentally edit the original data. 

Total Items / Page Size = Number of pages, so the values returned from the server are saved as well. On initialisation, ob.currentPage is set to 1, so the server will return the number of items (ob.pageSize) that is supposed to appear in page 1. 

    const  getUserListByPage  = () => {
		axios.get('https://reqres.in/api/users', {
			params: {
				page:  ob.currentPage
			}
		}).then(function (response) {
			//shallow copy of the user data
			let  data  =  response.data.data.slice();
			ob.data  =  data;
			ob.totalItems  =  response.data.total;
			ob.pageSize  =  response.data.per_page;
		})
	}

### Displaying the data in the view file

    const  userItem  = () => {   
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
											    <div  className="header-{data} header">{data}: </div>
											    <div  className="content-{data} content">{obj[data]}</div>
										    </Coll>
										    <div  className="clear"></div>
									    </div>
								    )
							    })
						    }
						    </Row>
						    <div  className="clear"></div>
					    </div>
				    )
			    })
		    )
	    }
    };

### Pagination

    const  pagination  = () => {
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

As the page value is changed everytime, the value is passed to handlePageChange(value), value as the new page number. and it will pass the value back to store to update the ob.currentPage. And the axios will be launched everytime the parameter changed. So from this point on, it's done! 