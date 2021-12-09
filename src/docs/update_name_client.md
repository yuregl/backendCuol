# Atualiza um cliente, dado o parâmetro

Retorna os dados das cidades

- URL  
   /clients/update/1

- Método:  
   `Patch`

- Variavéis do Param  
  `id`

- Variavéis do Post  
  `full_name`

- Resposta de Sucesso:

  - Code: 200  
    Content: `[ {"id": 1, "full_name": "Yure Galdino", "gender": "male","birth_date": "1994-08-24T00:00:00.000Z", "cities_id": 1, "cities": { "id": 1, "city": "joão pessoa", "state": "PB" } "age": 27}}]`

- Resposta de Falha:

  - Code: 400  
    Content: `{"error": "Cliente não existe"}`

  - Code: 500  
    Content: `{"error": "Internal Server Error"}`
