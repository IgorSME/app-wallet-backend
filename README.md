# app-wallet-backend

`BASE_URL:"https://app-wallet.onrender.com"`
-----------------------------------------------------------------------
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
--------------------------------------------------------------------
`/api/auth/register`
-----------------------------------------------------------
* method:POST
* body: 
    ``` js
        {
        name:"userName",*
        email:"user@gmail.com",*
        password:password*
        } 
* response :   
  ``` js
      user: {
      name:"userName",*
      email:"user@gmail.com",*
    },
-------------------------------------  
#### login
--------------------------------------------------------
`/api/auth/login`
-------------------------------------------------------
* method:POST
* body:
``` js 
      {
         email:"user@gmail.com",
         password:******
       }
```

* response :
``` js 
        data: {
            email:"user@gmail.com",
            accessToken:"accessToken**********************************************",
            refreshToken,:"refreshToken*******************************************"
            },
   
```
----------------------------------------------
#### logout
---------------------------------------------------
`/api/auth/logout`
--------------------------------------------------
* method:POST
* response : status(204)
---------------------------------------------------
#### refresh
----------------------------------------------------
`/api/auth/refresh`
---------------------------------------------------------
* method:POST
* body:
``` js 

{
    refreshToken:"refreshToken*******************************************"*
    }

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
-------------------------------------------------------
#### current User
----------------------------------------------------------
`/api/user/current`
-------------------------------------------------
* method:GET
* response : 
``` js 
          user: {     
             name:"userName",
            email:"user@gmail.com",
            userBalance:userBalance,
            userCategory:[array of custom Users category]
            transactions:[array of transactions]
            },
```
----------------------------
### TRANSACTIONS
-----------------------------------------------------
#### ADD
---------------------------------------------------
`/api/transactions`
------------------------------------------------
* method:POST
* body:
``` js 
{
 "date":"date"`(UNIX Format)`*
"type":"expense",`("expense"||"income")`*
"category":"string"*
"comment":"text comment" `(String)`
"sum":1000 `(Number)`*
    }
    
```

* response :
``` js 
 "data": {
        "transaction": {
            "date": "2022-03-01T12:25:00.000Z",
            "month": 3,
            "year": 2022,
            "type": "expense",
            "category": "food",
            "owner": "638b11225c6e2eeb2d95e90e",
            "comment": "",
            "sum": 1000,
            "balanceAfterTransaction": 16000,
            "_id": "638b131dca4c031f61b77038",
            "createdAt": "2022-12-03T09:13:01.851Z",
            "updatedAt": "2022-12-03T09:13:01.851Z"
        }
    }
  
 ```
    
---------------------------------------
#### DELETE
----------------------------------------
`/api/transactions/:transactionId`
-------------------------------------------
* method:DELETE
* response:
``` js
{
    "message": "transaction deleted",
    userBalance:newUserBalance
}
```
------------------------------------------

#### GETAll
------------------------------------------------
`/api/transactions`
--------------------------
`/api/transactions?page=<номер сторінки>&limit=<кількість на сторінці >`
----------------------------------------------------
* method:GET
* response :"transactions": []

 #### Example transaction in response
 ---------------------------------------------------------------
 ``` js
 {                 
            "_id": "638b11be5c6e2eeb2d95e915",
            "date": "2022-12-02T19:07:08.114Z",
            "month": 12,
            "year": 2022,
            "type": "income",
            "category": "regular",
            "owner": "638b11225c6e2eeb2d95e90e",
            "comment": "",
            "sum": 10000,
            "balanceAfterTransaction": 10000,
            "createdAt": "2022-12-03T09:07:10.333Z",
            "updatedAt": "2022-12-03T09:07:10.333Z"
        
        },
        
```
---------------------------------------------------------------
#### STATISTIC
----------------------------------------------
`/api/transactions/statistic`
---------------------------------------------------
`/api/transactions/statistic?year=<year>&month=<month>`
-------------------------------------------------
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
----------------------------------------
### CATEGORIES
Base category

    [
    {
        "_id": "1",
        "type": "expense",
        "categoryName":"Main expenses"
    },
    {
        "_id": "2",
        "type": "expense",
        "categoryName": "Products"
    },
    {
        "_id": "3",
        "type": "expense",
        "categoryName": "Car"
    },
    {
        "_id": "4",
        "type": "expense",
        "categoryName": "Self care"
    },
    {
        "_id": "5",
        "type": "expense",
        "categoryName": "ЗСУ"
    },
        {
            "_id": "6",
            "type": "expense",
            "categoryName": "Education"
        },
        {
            "_id": "7",
            "type": "expense",
            "categoryName": "Entertainment"
        },
        {
            "_id": "8",
            "type": "expense",
            "categoryName": "Other expenses"
        },
        {
            "_id": "9",
            "type": "expense",
            "categoryName": "Leisure"
        },
        {
            "_id": "10",
            "type": "expense",
            "categoryName": "Household products"
        },
        {
            "_id": "11",
            "type": "expense",
            "categoryName": "Child care"
        },
    {
        "_id": "12",
        "type": "income",
        "categoryName": "regular"
    },
    {
        "_id": "13",
        "type": "income",
        "categoryName": "irregular"
    }
   
]

------------------------
#### ADD
-------------------------------------
`/api/categories`
--------------------------------------
* method:POST
* body:
``` js
{
    	"type": "income",`("expense"||"income")`*
    	"categoryName": "newCategoryName"*
}
```
* response:
``` js  
   "category": {
        "type": "income",
        "categoryName": "newCategoryName",
        "owner": "638b11225c6e2eeb2d95e90e",
        "_id": "638b14be1a24bc4dfbf82b2e"
    }
```

---------------------------------------
#### DELETE
-----------------------------------------
`/api/categories/:categoryId`
------------------------------------------
* method:DELETE
* response:
``` js
{
    "message": "category deleted"
}
```
------------------------------------------

#### GET ALL
----------------------------------------------------
`/api/categories`
-----------------------------------------------------
* method:GET
* response:
``` js
{
        "baseCategories": [
            {
                "_id": "1",
                "type": "expense",
                "categoryName": "other"
            },
        ],
        "userCategory": [
            {
                "_id": "638b14611a24bc4dfbf82b1a",
                "type": "expense",
                "categoryName": "cat",
                "owner": "638b11225c6e2eeb2d95e90e"
            }
        ]

}

```