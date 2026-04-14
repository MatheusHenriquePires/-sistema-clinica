# 🏥 Clínica API

Sistema fullstack de gestão de clínica médica com autenticação JWT, desenvolvido com **Java + Spring Boot** no backend e **Angular** no frontend.

---

## 🚀 Tecnologias

### Backend
![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![Spring Security](https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=spring-security&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![H2](https://img.shields.io/badge/H2-004088?style=for-the-badge&logo=h2&logoColor=white)

### Frontend
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

---

## 📋 Funcionalidades

- ✅ Autenticação com JWT (login, geração e validação de token)
- ✅ Cadastro e gerenciamento de **Médicos**
- ✅ Cadastro e gerenciamento de **Pacientes**
- ✅ Agendamento e controle de **Consultas**
- ✅ Tratamento global de exceções
- ✅ Arquitetura em camadas (Controller → Service → Repository)
- ✅ Frontend Angular com guards de rota e interceptors HTTP

---

## 🏗️ Arquitetura do Projeto

```
src/
├── controller/        # Endpoints REST (Auth, Médico, Paciente, Consulta)
├── model/             # Entidades do domínio
├── repositories/      # Acesso a dados (Spring Data JPA)
├── service/           # Regras de negócio
├── security/          # Configuração JWT (JwtFiltro, JwtUtil, SecurityConfig)
├── exception/         # Handler global de exceções
└── database/          # Base de usuários em memória

frontend/
├── src/app/
│   ├── auth/          # Login + Guard + Interceptor
│   ├── medicos/       # Módulo de médicos
│   ├── pacientes/     # Módulo de pacientes
│   ├── consultas/     # Módulo de consultas
│   ├── dashboard/     # Painel principal
│   └── services/      # Serviços HTTP
```

---

## ▶️ Como executar

### Pré-requisitos
- Java 17+
- Maven
- Node.js 18+ e npm

### Backend

```bash
# Clone o repositório
git clone https://github.com/MatheusHenriquePires/-sistema-clinica
cd Clinica-API

# Execute com Maven
./mvnw spring-boot:run
```

A API estará disponível em `http://localhost:8080`

### Frontend

```bash
cd frontend
npm install
ng serve
```

O frontend estará disponível em `http://localhost:4200`

---

## 🔐 Autenticação

A API utiliza **JWT (JSON Web Token)**. Para acessar os endpoints protegidos:

1. Faça login via `POST /auth/login`
2. Copie o token retornado
3. Envie o token no header das requisições: `Authorization: Bearer {token}`

---

## 📡 Endpoints principais

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/auth/login` | Autenticação e geração de token |
| GET | `/medicos` | Listar médicos |
| POST | `/medicos` | Cadastrar médico |
| PUT | `/medicos/{id}` | Atualizar médico |
| DELETE | `/medicos/{id}` | Remover médico |
| GET | `/pacientes` | Listar pacientes |
| POST | `/pacientes` | Cadastrar paciente |
| GET | `/consultas` | Listar consultas |
| POST | `/consultas` | Agendar consulta |

---

## 👨‍💻 Autor

**Matheus Henrique**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/matheushenriquepirrs)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/MatheusHenriquePires)
