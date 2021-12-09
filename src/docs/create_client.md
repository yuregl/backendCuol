# Criar cliente

Retorna mensagem informando se o cliente foi salvo

- URL  
   /clients/new

- Método:  
   `Post`

- Variavéis do Body  
  `full_name`:  
  `gender`: ["male", "female"]  
  `birth_date`: "1995/12/20"  
  `cities_id`

- Resposta de Sucesso:

  - Code: 201  
    Content: `{ "message": "Criado com sucesso" }`

- Resposta de Falha:

  - Code: 400  
    Content: `{ "error": "Cidade já existe" }`
  - Code: 500
    Content: `{"error": "Internal Server Error"}`
