# Obter cidade, dados o parâmetro

Retorna uma cidade dado o id

- URL  
   /cities

- Método:  
   `Get`

- Variavéis do Param  
  `id`

- Resposta de Sucesso:

  - Code: 200  
    Content: `{ "id": 1, "city": "joão pessoa", "state": "PB"}`

- Resposta de Falha:

  - Code: 400  
    Content: `{"error": "Cidade não existe"}`

  - Code: 500  
    Content: `{"error": "Internal Server Error"}`
