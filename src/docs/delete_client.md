# Remove um cliente, dado o parâmetro

Retorna uma mesangem caso o usuário seja deletado

- URL  
   /clients/update/1

- Método:  
   `Delete`

- Variavéis do Param  
  `id`

- Resposta de Sucesso:

  - Code: 200  
    Content: `"message": "Deletado com sucessos"`

- Resposta de Falha:

  - Code: 400  
    Content: `{"error": "Cliente com esse id não existe"}`

  - Code: 500  
    Content: `{"error": "Internal Server Error"}`
