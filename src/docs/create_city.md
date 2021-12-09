# Criar cidade

Retorna mensagem informando se a cidade foi salvo

- URL  
   /cities/new

- Método:  
   `Post`

- Variavéis do Body  
  `city`  
  `state`

- Resposta de Sucesso:

  - Code: 201  
    Content: `{ "message": "Criado com sucesso" }`

- Resposta de Falha:

  - Code: 400  
    Content: `{ "error": "Cidade já existe" }`
  - Code: 500
    Content: `{"error": "Internal Server Error"}`
