# Obter cidades, dados os parâmetros

Retorna os dados das cidades

- URL  
   /cities?city=teste&state=TE

- Método:  
   `Get`

- Variavéis do Query  
  `city`: opcional  
  `state`: opcional

- Resposta de Sucesso:

  - Code: 200  
    Content: `[ { "id": 1, "city": "joão pessoa", "state": "PB"}]`

- Resposta de Falha:

  - Code: 500
    Content: `{"error": "Internal Server Error"}`
