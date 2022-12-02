# app-wallet-backend

`BASE_URL:"https://app-wallet.onrender.com"`


## ENDPOINTS
### AUTH
----------------------------------------------------------------------
`Authorization header: Bearer token(accessToken)`
----------------------------------------------------------------------
Якщо при запиті на захищенний роут  (наприклад `/api/user/current`) 
отримуєте помилку зі статусом 412 і повідомленням "OOOPS" 
- це означає що accessToken вже не валідний 
Саме час скористатися роутом `/api/auth/refresh`
---------------------------------------------------------------------


#### register
`/api/auth/register`
* method:POST
* body: 
    ``` js
        {
        name:"userName",
        email:"user@gmail.com",
        password:password
        } 
* response :   
  ``` js
      user: {
      name:"userName",
      email:"user@gmail.com",
    },
-------------------------------------  


#### login
`/api/auth/login`
* method:POST
* body:
``` js 
      {
         email:"user@gmail.com",
         password:******
       }
```

* response :
``` js data: {
      email:"user@gmail.com",
      accessToken:"accessToken**********************************************",
      refreshToken,:"refreshToken*******************************************"
    },
   
```
----------------------------------------------

#### logout
`/api/auth/logout`
* method:POST
* response : status(204)
---------------------------------------------------

#### refresh
`/api/auth/refresh`
* method:POST
* body:
``` js 

{refreshToken:"refreshToken*******************************************"}

```
* response : 

``` js
      {
      accessToken:"accessToken**********************************************",
      refreshToken:"refreshToken*******************************************"
      }
      
```
----------------------------------

### USER

`/api/user/current`
* method:GET
* response : 
``` js 
          user: {     
             name:"userName",
            email:user@gmail.com",
            userBalance:userBalance
            transactions:[array of transactions]
            },
```
----------------------------

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
------------------------

#### ADD
`/api/transactions`
* method:POST
* body:
``` js 
{
 "date":"date"`(UNIX Format)`
"type":"expense",`("expense"||"income")`
"category":"food",`("food"||"car"||"other"||"cats"||"educations"||"ЗСУ"||"fun"||"travel")`
"comment":"text comment" `(String)`
"sum":1000 `(Number)`
    }
    
```

* response :
``` js 
"data": {
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
  
 ```
    
----------------------

#### GETAll

`/api/transactions`
* method:GET
* response :"transactions": []

 #### Example transaction in response
 ---------------------------------------------------------------
 ``` js
 {          "_id": "63887bb97266b9ea7458a41b",
            "date": "2022-12-01T10:01:59.741Z",
            "month": 12,
            "year":2022,
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
        
```
---------------------------------------------------------------
#### STATISTIC
`/api/transactions/statistic`||`/api/transactions/statistic?year=<year>&month=<month>`
* method:GET
* query param : якщо місяць та рік не задані генерується поточна дата
* response :
``` js 
{
    "allCategories": [
        {
            "categoryName": "categoryName",
            "totalSum": totalSum
        },
    ],
    "typesTotalSum": [
        {
            "typeName": "expense",
            "totalSum": totalSum
        },
        {
            "typeName": "income",
            "totalSum": totalSum
        }
    ]
}

```

