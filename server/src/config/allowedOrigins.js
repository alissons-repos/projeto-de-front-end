const allowedOrigins = ['http://localhost:3500', 'http://127.0.0.1:5500'];
// Lista de domínios permitidos para acessar o backend
// Utilizando um servidor local não possuímos um domínio, então "origin" vem como "undefined", portanto precisamos permitir que nosso localhost tenha acesso a aplicação, apesar de nossa "rota" já estar especificada

module.exports = allowedOrigins;
