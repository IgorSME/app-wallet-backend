# app-wallet-backend
`BASE_URL:"http://localhost:3333/"`
## ENDPOINTS
### AUTH
----------------------------------------------------------------------
`Authorization header: Bearer token(accessToken)`
----------------------------------------------------------------------
"Якщо при запиті на захищенний роут  (наприклад `/api/user/current`) 
отримуєте помилку зі статусом 412 і повідомленням "OOOPS" 
- це означає що accessToken вже не валідний 
Саме час скористатися роутом `/api/auth/refresh`"
---------------------------------------------------------------------


#### register
`/api/auth/register`
* method:POST
* body:{name:"userName",
        email:"user@gmail.com",
        password:******}
* response :   
      user: {
      name:"userName",
      email:"user@gmail.com",
    },
#### login
`/api/auth/login`
* method:POST
* body:{email:"user@gmail.com",
        password:******}
* response : data: {
      email:"user@gmail.com",
      accessToken:"accessToken**********************************************",
      refreshToken,:"refreshToken*******************************************"
    },
#### logout
`/api/auth/logout`
* method:POST
* response : status(204)

#### refresh
`/api/auth/refresh`
* method:POST
* body:{refreshToken:"refreshToken*******************************************"}
* response : 
      { accessToken:"accessToken**********************************************",
      refreshToken:"refreshToken*******************************************"}
### USER

`/api/user/current`
* method:GET
* response :  user: {     
             name:"userName",
            email:user@gmail.com",
            userBalance:userBalance
            transactions:[array of transactions]},

### TRANSACTIONS
#### Categories
      [ "food",
        "car",
        "other",
        "cats",
        "educations",
        "ЗСУ",
        "fun",
        "travel",]
#### ADD
`/api/transactions`
* method:POST
* body:{
 "date":"date"
"type":"expense",
"category":"food",
"sum":1000
    }
* response :   "data": {
        "transaction": {
            "date": "2022-12-01T11:40:57.894Z",
            "type": "expense",
            "category": "food",
            "owner": "6387c675942ce7fe9c94c962",
            "comment": "",
            "sum": 1000,
            "balanceAfterTransaction": 4200,
            "_id": "638892e838e3a5b290db2ed4",
            "createdAt": "2022-12-01T11:41:28.624Z",
            "updatedAt": "2022-12-01T11:41:28.624Z"
        }
    }
#### GETAll
`/api/transactions`
* method:GET
* response :"transactions": []
---------------------------------------------------------------
 ##### Example transaction in response
 {
            "_id": "63887bb97266b9ea7458a41b",
            "date": "2022-12-01T10:01:59.741Z",
            "type": "income",
            "category": "other",
            "owner": {
                "_id": "6387c675942ce7fe9c94c962",
                "name": "Test",
                "email": "test@mail.com"
            },
            "comment": "",
            "sum": 25000,
            "balanceAfterTransaction": 39800,
            "createdAt": "2022-12-01T10:02:33.205Z",
            "updatedAt": "2022-12-01T10:02:33.205Z"
        },
---------------------------------------------------------------
#### GETCATEGORIES
#### STATISTIC


