import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = "http://localhost:8080/api/v1/administrativo"
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcwNTY5MjI5MX0.e72AAuShMttspYHdyoodsdRgu3iKeEcxGeqUbrqmb_3qWnL7MbL5tS-DxBie9xZ5r9DbjoroY0DHioiXL96A8HzKkMtakO1Gqz47j3s1qMlOjTem3QY9bIyd5erZqbee8S2_-bdNs5x8d5wJLU4KU6i0-kppQtSdagn05Krl7EB1_CP6V7ZzwTGVQzexDhzOkjPGw8M_qiTp7kppMzqMMeX502ylrKXYL-FSl7_5YaKpMFPCM1_akovbAMz7gtWMb0jaqHAdL8agzLtk5XLaoMgH9uBIPqyzxS8mXXcoAZEilStgx5nW5_Gmw9mcOg8qEzMhZz66mmU1fAPwq6C0nw";
@Injectable({
  providedIn: 'root'
})
export class RepService {

  constructor(private http: HttpClient) { }

  getRep(body: any) {
    const headers = {
      Authorization: 'Bearer ' + token,
      //Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    const endpoint = `${base_url}/buscar-administrativo-usuario`;
    return this.http.post(endpoint, body, { headers });
  }

  saveRep(body: any) {
    if (body.idHost !== null) {
      const headers = {
        Authorization: 'Bearer ' + token,
        //Authorization: 'Bearer ' + localStorage.getItem('token'),
      };
      const endpoint = `${base_url}/crear-administrativo`;
      return this.http.post(endpoint, body, { headers });
    } else {
      const headers = {
        Authorization: 'Bearer ' + token,
        //Authorization: 'Bearer ' + localStorage.getItem('token'),
      };
      const endpoint = `${base_url}/editar-administrativo`;
      return this.http.put(endpoint, body, { headers });
    }
  }

}
