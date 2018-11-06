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
 {"username":"username", "password":"password"}
```
```bash
return example
{
    "username": "test",
    "email": "test@test.com",
    "name": null,
    "surname": null,
    "birthDate": null,
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NDE1MDk2MDMsImV4cCI6MTU0MTUxMzIwMywicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoidGVzdCJ9.tJVO6AEaQydpVD5gdGb4oMcGoec_R0CVveVd6R2kbNjzL4UQp542V7zmNzkcGokVoHMZZU_AUYzPckWNYrdL-YDm3MkZJmhQmOCUCcjXM06HprhOzspdGCcehlZJhfn3PJCWellvfXgA3m2KftLfalpfH4pgY1zpnzKIo1ZFvHLttI8jfD_8TwnXTJPzcqTHGbTsK5saVARVh_lGPXZUI2VAG3RDAnzwWE6agRYa1PDyIXjmk4cl1qF10PLGM3sr2C02I1wEoWeRTlpEuXQCHyl3UiRnKrklxcIbjFi28Umn-G_dibol51XfLs7RxmfCVZDsuYScccDLr_jnwX2mKJ74NiWnTi3E9cLGrUlNpKOhe6y45YLaBHHYP2jgjug_EbPKG2zWktOacaYIYUJsdD1Go0VHE3CCMvJ85NYetPX64ANUE9ysfE2JHnOjcB-0oIa44zRRLPMkSBJabOUrqz1Hso_tmWRLwYw55fgBKI6fMXS4c4ajTxAcTPtj4FEhfF_h-5uCuo2cEJlBORSrZA0PmVDnydGmq2xxs1mYR9VSqh__00CxKmk2enRvhsjMmNWneH3kE0DO5ZDN_Sevqa8gwPJSSCsVsWBmrbvJR2PDJdygvkfuE9CRwMxuFg4r8Z2Rv4GlAUjVJKvCzk12CXyoywnWCUcMnJT-KecCTK4"
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
```bash
return example
{
    "username": "test",
    "email": "test@test.com",
    "name": "test",
    "surname": "test",
    "birthDate": "1990-01-01",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NDE1MDk2MDMsImV4cCI6MTU0MTUxMzIwMywicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoidGVzdCJ9.tJVO6AEaQydpVD5gdGb4oMcGoec_R0CVveVd6R2kbNjzL4UQp542V7zmNzkcGokVoHMZZU_AUYzPckWNYrdL-YDm3MkZJmhQmOCUCcjXM06HprhOzspdGCcehlZJhfn3PJCWellvfXgA3m2KftLfalpfH4pgY1zpnzKIo1ZFvHLttI8jfD_8TwnXTJPzcqTHGbTsK5saVARVh_lGPXZUI2VAG3RDAnzwWE6agRYa1PDyIXjmk4cl1qF10PLGM3sr2C02I1wEoWeRTlpEuXQCHyl3UiRnKrklxcIbjFi28Umn-G_dibol51XfLs7RxmfCVZDsuYScccDLr_jnwX2mKJ74NiWnTi3E9cLGrUlNpKOhe6y45YLaBHHYP2jgjug_EbPKG2zWktOacaYIYUJsdD1Go0VHE3CCMvJ85NYetPX64ANUE9ysfE2JHnOjcB-0oIa44zRRLPMkSBJabOUrqz1Hso_tmWRLwYw55fgBKI6fMXS4c4ajTxAcTPtj4FEhfF_h-5uCuo2cEJlBORSrZA0PmVDnydGmq2xxs1mYR9VSqh__00CxKmk2enRvhsjMmNWneH3kE0DO5ZDN_Sevqa8gwPJSSCsVsWBmrbvJR2PDJdygvkfuE9CRwMxuFg4r8Z2Rv4GlAUjVJKvCzk12CXyoywnWCUcMnJT-KecCTK4"
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
    "token":"token"
 }
```
```bash
return example
{
    "username": "test",
    "email": "test@test.com",
    "name": "test",
    "surname": "test",
    "birthDate": "1990-01-01",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NDE1MDk2MDMsImV4cCI6MTU0MTUxMzIwMywicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoidGVzdCJ9.tJVO6AEaQydpVD5gdGb4oMcGoec_R0CVveVd6R2kbNjzL4UQp542V7zmNzkcGokVoHMZZU_AUYzPckWNYrdL-YDm3MkZJmhQmOCUCcjXM06HprhOzspdGCcehlZJhfn3PJCWellvfXgA3m2KftLfalpfH4pgY1zpnzKIo1ZFvHLttI8jfD_8TwnXTJPzcqTHGbTsK5saVARVh_lGPXZUI2VAG3RDAnzwWE6agRYa1PDyIXjmk4cl1qF10PLGM3sr2C02I1wEoWeRTlpEuXQCHyl3UiRnKrklxcIbjFi28Umn-G_dibol51XfLs7RxmfCVZDsuYScccDLr_jnwX2mKJ74NiWnTi3E9cLGrUlNpKOhe6y45YLaBHHYP2jgjug_EbPKG2zWktOacaYIYUJsdD1Go0VHE3CCMvJ85NYetPX64ANUE9ysfE2JHnOjcB-0oIa44zRRLPMkSBJabOUrqz1Hso_tmWRLwYw55fgBKI6fMXS4c4ajTxAcTPtj4FEhfF_h-5uCuo2cEJlBORSrZA0PmVDnydGmq2xxs1mYR9VSqh__00CxKmk2enRvhsjMmNWneH3kE0DO5ZDN_Sevqa8gwPJSSCsVsWBmrbvJR2PDJdygvkfuE9CRwMxuFg4r8Z2Rv4GlAUjVJKvCzk12CXyoywnWCUcMnJT-KecCTK4"
}

