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

**Base Url** : `https://jkt48showroom-api.vercel.app/`

----

###  Member Room List Endpoint

----
* `Room List`

```
https://jkt48showroom-api.vercel.app/api/rooms
```

* `Room Live`

```
https://jkt48showroom-api.vercel.app/api/rooms/onlives
```

* `Room Academy`

```
https://jkt48showroom-api.vercel.app/api/rooms/academy
```

----

### Room Endpoint

* `Profile`

```
https://jkt48showroom-api.vercel.app/api/rooms/profile/:roomId
```

* `Total Rank`

```
https://jkt48showroom-api.vercel.app/api/rooms/total-rank/:roomId
```

* `Fan Letters`

```
https://jkt48showroom-api.vercel.app/api/rooms/fan-letters/:roomId
```
----

### Development

Want to contribute? Great!

To fix a bug or enhance an existing module, follow these steps:

- Fork the repo
- Create a new branch (`git checkout -b improve-feature`)
- Make the appropriate changes in the files
- Add changes to reflect the changes made
- Commit your changes (`git commit -am 'Improve feature'`)
- Push to the branch (`git push origin improve-feature`)
- Create a Pull Request

### Bug / Feature Request

If you find a bug (the website couldn't handle the query and / or gave undesired results), kindly open an issue [here](https://github.com/NicolaDonoastro/The-Lazy-Media-api/issues) by including your search query and the expected result.

If you'd like to request a new function, feel free to do so by opening an issue [here](https://github.com/NicolaDonoastro/The-Lazy-Media-api/issues). Please include sample queries and their corresponding results.

### Showcase

App Showcase that use this API (you can add your app by edit this readme)

https://www.jkt48-showroom.com/