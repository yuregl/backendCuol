# Obter cliente, dado o parâmetro

Retorna os dados das cidades

- URL  
   /clients?full_name=name_teste_testando

- Método:  
   `Get`

- Variavéis do Query  
  `full_name`

- Resposta de Sucesso:

  - Code: 200  
    Content: `[ {"id": 1, "full_name": "Yure Galdino", "gender": "male","birth_date": "1994-08-24T00:00:00.000Z", "cities_id": 1, "age": 27, "cities": { "id": 1, "city": "joão pessoa", "state": "PB" } "age": 27}}]`

- Resposta de Falha:

  - Code: 400  
    Content: `{"error": "Cliente não existe"}`

  - Code: 500  
    Content: `{"error": "Internal Server Error"}`
