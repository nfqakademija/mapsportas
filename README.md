![](https://avatars0.githubusercontent.com/u/4995607?v=3&s=100)

### Projekto paleidimas

Pasileidžiant pirmą kartą būdavo įveliama daug klaidų, todėl padaryti _script'ai_ dažniausiems atvejams.

* Pasileidžiama infrastruktūrą per `docker`į:
```bash
scripts/start.sh
```

* Įsidiegiame PHP ir JavaScript bibliotekas:
```bash
scripts/install-prod.sh
```

* Pasižiūrime, ar veikia.
  Naršyklėje atidarius [`http://127.0.0.1:8000/`](http://127.0.0.1:8000/) turėtų rašyti `NFQ Akademija

* Pabaigus, gražiai išjungiame:
```bash
scripts/stop.sh
```


### Endpoints

* Login 
```bash
 POST /api/login
 {
    "username":"username", 
    "password":"password"
}
```

* Register
```bash
 POST /api/register
 {
    "username":"username",
    "password":"password",
    "name":"name",
    "surname":"surname",
    "birthDate":"birthDate",
 }
```

* User Edit
```bash
 POST /api/user/edit
 {
    "username":"username",
    "password":"password",
    "name":"name",
    "surname":"surname",
    "birthDate":"birthDate",
 }
```

*  User Data
```bash
GET /api/user
```

* Refresh Token
```bash
GET /api/refresh/token
```

* Promote Yourself to Admin
```bash
GET /api/admin/promote
```

* Create new Sport Type
```bash
POST /api/admin/sport/type
{
    "name":"name",
}
```

* Create new Sport Venue
```bash
POST /api/admin/sport/venue
{
    "sportType":"1",
    "name":"name",
    "description":"description",
    "adress":"adress",
    "city":"city",
}
```

* Create Sport Event
```bash
POST /api/sport/event
{
    "creator":"1",
    "sportType":"1",
    "sportVenue":"1",
    "maxMembers":"5",
    "date":"2019-09-09 19:45"
}
```
* Apply for Sport Event
```bash
POST /api/sport/event/apply
{
    "sportEvent":"id"
}
```

* Delete sport type
```bash
DELETE /api/admin/sport/type/{id}
```

* Delete Sport venue 
```bash
DELETE /api/admin/sport/venue/{id}
```


### Public Endpoints

* Get List of Sport Type
```bash
GET /api/public/sport/types
```

* Get List of Sport Venues
```bash
GET /api/public/sport/venues
```

* Get List of Sport Events
```bash
GET /api/public/sport/events
```


