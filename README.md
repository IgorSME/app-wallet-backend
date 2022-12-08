# :open_book:  app-wallet-backend  

`BASE_URL:"https://app-wallet.onrender.com"`
-----------------------------------------------------------------------
## AUTH  :lock:
----------------------------------------------------------------------
`Authorization header: Bearer token(accessToken)`
----------------------------------------------------------------------
Якщо при запиті на захищенний роут  (наприклад `/api/user/current`) 
отримуєте помилку зі статусом 412 і повідомленням "OOOPS" 
- це означає що accessToken вже не валідний 
Саме час скористатися роутом `/api/auth/refresh`
---------------------------------------------------------------------
### register :pencil2::pencil2::pencil2:
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
  { 
    user: {
        name:"userName",*
        email:"user@gmail.com",*
        },
    accessToken:"accessToken**********************************************",
    refreshToken:"refreshToken*******************************************"
    }
-------------------------------------  
### login  :key::key::key:
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
     { 
    user: {
        name:"userName",*
        email:"user@gmail.com",*
        },
    accessToken:"accessToken**********************************************",
    refreshToken:"refreshToken*******************************************"
    }
   
```
----------------------------------------------
### logout :x:
---------------------------------------------------
`/api/auth/logout`
--------------------------------------------------
* method:POST
* response : status(204)
---------------------------------------------------
### refresh  	:recycle:
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
## USER :smiley_cat:
-------------------------------------------------------
### current User :smiley_cat:
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
            userCategories:[    {
                "_id": "638b14611a24bc4dfbf82b1a",
                "type": "expense",
                "categoryName": "cat",
                "owner": "638b11225c6e2eeb2d95e90e"
            }]
            userTransactions:[ "transaction": {
        "_id": "638b11ed5c6e2eeb2d95e91f",
        "date": "2022-12-01T12:25:00.000Z",
        "month": 12,
        "year": 2022,
        "type": "expense",
        "category": "Products",
        "owner": "638b11225c6e2eeb2d95e90e",
        "comment": "new comment product",
        "sum": 500,
        "balanceAfterTransaction": 19500,
        "createdAt": "2022-12-03T09:07:57.566Z",
        "updatedAt": "2022-12-04T15:55:38.023Z"
    }]
            },
```
----------------------------
## TRANSACTIONS
-----------------------------------------------------
### add :pencil2:
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
### update comment :pencil2:
----------------------------------------
`/api/transactions/:transactionId`
-------------------------------------------
* method:PATCH
* body:
``` js
{
    "comment": "newComment",
}
```
* response: 
``` js
  "transaction": {
        "_id": "638b11ed5c6e2eeb2d95e91f",
        "date": "2022-12-01T12:25:00.000Z",
        "month": 12,
        "year": 2022,
        "type": "expense",
        "category": "Products",
        "owner": "638b11225c6e2eeb2d95e90e",
        "comment": "new comment product",
        "sum": 500,
        "balanceAfterTransaction": 19500,
        "createdAt": "2022-12-03T09:07:57.566Z",
        "updatedAt": "2022-12-04T15:55:38.023Z"
    }
```
------------------------------------------
### get all  :clipboard:
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
### statistic  :clipboard:
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
## CATEGORIES
Base categories

        [
        {
            "_id": "1",
            "type": "expense",
            "color": "#FED057",
            "categoryName":"Main expenses"
        },
        {
            "_id": "2",
            "type": "expense",
            "color": "#FFD8D0",
            "categoryName": "Products"
        },
        {
            "_id": "3",
            "type": "expense",
            "color": "#FD9498",
            "categoryName": "Car"
        },
        {
            "_id": "4",
            "type": "expense",
            "color": "#C5BAFF",
            "categoryName": "Self care"
        },
        {
            "_id": "5",
            "type": "expense",
            "color": "#2F8B57",
            "categoryName": "ЗСУ"
        },
            {
                "_id": "6",
                "type": "expense",
                "color": "#81E1FF",
                "categoryName": "Education"
            },
            {
                "_id": "7",
                "type": "expense",
                "color": "#00AD84",
                "categoryName": "Entertainment"
            },
            {
                "_id": "8",
                "type": "expense",
                "color": "#7CFC00",
                "categoryName": "Other expenses"
            },
            {
                "_id": "9",
                "type": "expense",
                "color": "#24CCA7",
                "categoryName": "Leisure"
            },
            {
                "_id": "10",
                "type": "expense",
                "color": "#4A56E2",
                "categoryName": "Household products"
            },
            {
                "_id": "11",
                "type": "expense",
                "color": "#6E78E8",
                "categoryName": "Child care"
            },
        {
            "_id": "12",
            "type": "income",
            "color": "#008000",
            "categoryName": "regular"
        },
        {
            "_id": "13",
            "type": "income",
            "color": "#006400",
            "categoryName": "irregular"
        }

        ]

------------------------
### add :pencil2:
-------------------------------------
`/api/categories`
--------------------------------------
* method:POST
* body:
``` js
{
    	"type": "income",`("expense"||"income")`*
    	"categoryName": "newCategoryName"*
        "color":"#123456"*
}
```
* response:
``` js  
   "category": {
        "type": "income",
        "categoryName": "newCategoryName",
        "color":"#123456",
        "owner": "638b11225c6e2eeb2d95e90e",
        "_id": "638b14be1a24bc4dfbf82b2e"
    }
```

---------------------------------------
### delete :wastebasket:
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

### get all  :clipboard:
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
        "userCategories": [
            {
                "_id": "638b14611a24bc4dfbf82b1a",
                "type": "expense",
                "categoryName": "cat",
                "owner": "638b11225c6e2eeb2d95e90e"
            }
        ]

}

```