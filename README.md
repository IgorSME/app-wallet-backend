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
            transactions:[array 5 last transactions]},

### TRANSACTIONS

#### ADD
#### GETAll
#### GETCATEGORIES
#### GETCATEGORIESDetailed


