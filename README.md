# JKT48 SHOWROOM API

JKT48 SHOWROOM API

### Usage
1. Clone this repository
    ```bash
    git clone https://github.com/ikhbaldwiyan/jkt48-showroom-api
    ```
2. Install dependecies (`npm install`)
3. Start the development environment
    ```bash
    npm run start
    ```
4. visit http://localhost:8000/


### Documentation

| API Type | Description |
| ------ | ----------- |
| ROOM API   | is for get data when room is offline |
| ROOM LIVE  | this response only show when room is on live |

### Endpoint Usage

**Base Url** : `https://jkt48-showroom-api.vercel.app/`

----

###  Member Room List Endpoint

----
* `Room List`

```
/api/rooms
```

* `Room Live`

```
/api/rooms/onlives
```

* `Room Academy`

```
/api/rooms/academy
```

* `Room Trainee`

```
/api/rooms/trainee
```

----

### Room Endpoint

* `Profile`

```
/api/rooms/profile/:roomId
```

* `Total Rank`

```
/api/rooms/total-rank/:roomId
```

* `Fan Letters`

```
/api/rooms/fan-letters/:roomId
```

* `Live Theater Schedule `

```
/api/rooms/theater-schedule
```
----

### Showcase

App Showcase that use this API (you can add your app by edit this readme)

https://jkt48-showroom.vercel.app/
