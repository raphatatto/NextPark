# 📄 Projeto Mottu: Gestão de Motos no Pátio

## 🚀 Descrição do Projeto

Nosso projeto tem como objetivo otimizar a organização do pátio da Mottu. Para isso, desenvolvemos um aplicativo mobile voltado para os operadores de pátio e demais funcionários, permitindo localizar rapidamente qualquer moto dentro do espaço.

A solução utiliza câmeras instaladas em pontos estratégicos do pátio, combinadas com um sistema de mapeamento de vagas padronizadas (ex: "A1", "A2", etc). O usuário poderá inserir a placa da moto no aplicativo, e o sistema informará em qual vaga ela está estacionada.

Além disso, ao receber uma nova moto, o operador poderá cadastrá-la no sistema e, automaticamente, o aplicativo irá sugerir uma vaga livre, otimizando o processo de alocação e evitando desorganização.

## 🌟 Objetivo
Desenvolver um sistema multiplataforma para gestão inteligente de motos nos pátios da Mottu, com foco em:
- Organização e localização em tempo real
- Registro de movimentações
- Integração com banco Oracle e APIs RESTful
- Escalabilidade para +100 filiais

---

## 📊 Solução Proposta
A solução é composta por:

- 📱 **Aplicativo mobile** em React Native com Expo
- 🚀 **API RESTful** com ASP.NET Core (EF Core + Oracle)
- 🏢 **Banco de dados relacional Oracle** com modelo normalizado
- ⚖️ **Deploy com Docker e Azure CLI** (Sprint 2)

---

## 🔧 Funcionalidades do App Mobile

### 🏠 Dashboard
- Visualização geral das motos alocadas
- Indicadores operacionais (ex: vagas livres, em manutenção)

### 🚗 Cadastro de Motos
- Placa, modelo, status e vaga
- Sugestão automática de vaga disponível

### 🔄 Registro de Movimentações
- Entrada / saída da moto
- Data, hora, operador e vaga

### 🖊️ Mapa do Pátio
- Vagas visuais (A1, A2, B1...)
- Grid com cores por status (ocupado/livre)

### 📃 Armazenamento Local (Sprint 1)
- Uso de `AsyncStorage` para persistir dados offline

---

## 🔧 Funcionalidades da API (.NET)

### Entidade Moto
- `GET /api/motos`
- `GET /api/motos/{id}`
- `POST /api/motos`
- `PUT /api/motos/{id}`
- `DELETE /api/motos/{id}`

### Entidade Movimentação
- `GET /api/movimentacoes`
- `POST /api/movimentacoes`
- `GET /api/movimentacoes/moto/{placa}`

### Outros:
- Swagger/OpenAPI
- Validações com DataAnnotations
- Banco Oracle via EF Core + Migrations

---

## 📃 Banco de Dados (Oracle)
- Tabelas: `tb_moto`, `tb_movimentacao`, `tb_operador`, `tb_manutencao`, `tb_vaga`
- Modelo em 3FN com relacionamento e PK/FK
- Scripts PL/SQL para consultas e joins

---

## 🤝 Tecnologias Utilizadas
| Camada          | Tecnologias                     |
|----------------|----------------------------------|
| App Mobile     | React Native + Expo             |
| Armazenamento  | AsyncStorage                    |
| Backend        | ASP.NET Core + EF Core          |
| Banco de Dados | Oracle SQL                      |
| Documentação   | Swagger (OpenAPI)                |
| DevOps         | Docker + Azure CLI              |

---

## 🔹 Estrutura do Projeto
```
/app-mobile
  /screens
  /services
  App.tsx
  storage.ts

/api-dotnet
  /Controllers
  /Models
  /Data
  Program.cs
  Startup.cs
```

---

## 🚀 Inovações e Diferenciais
- Sugestão automática de vagas livres
- Mapa visual com status em cores
- Simulação de status da moto (ativa/desligada)
- Painel com indicadores em tempo real

---

## 📋 Roadmap por Sprint
| Sprint | Entregas |
|--------|----------|
| Sprint 1 | App funcional com dados locais e API .NET com CRUD |
| Sprint 2 | Integração API/app + deploy via Docker na Azure |
| Sprint 3 | Relatórios e indicadores + otimização completa |

---

## 🎉 Conclusão
A proposta oferece uma solução robusta e escalável para os desafios da Mottu, com foco em rastreabilidade, agilidade e expansão para múltiplas filiais, utilizando tecnologias modernas e multiplataforma.
