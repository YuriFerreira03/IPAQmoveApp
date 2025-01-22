import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.ipaqmove.linceonline.com.br:8080",
  // baseURL: "http://192.168.1.72:8080",
  timeout: 10000, // tempo limite opcional (10 segundos, por exemplo)
  headers: {
    "Content-Type": "application/json",
    // Adicione outros cabeçalhos se necessário, como autorização
    // 'Authorization': `Bearer ${token}`
  },
});
