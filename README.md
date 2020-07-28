# Airbnb Optimal Pricing Web API

## Base URL:

https://airbnboptimalpricing.herokuapp.com/

## User Requirements:

- a unique `email`
- a `password`

Here is a table with the `endpoint` descriptions:

| Action                     | URL                  | Method | Response      |
| :------------------------- | :------------------- | :----- | :------------ |
| Register a user            | /api/auth/register   | POST   | the new user  |
| Login a user               | /api/auth/login      | POST   | user token    |
| Update user email/password | /api/auth/login/{id} | PUT    | updated user  |
| Remove a user              | /api/user/{id}       | DELETE | deleted count |
