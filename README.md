# 🏥 Sistema de Clínica Médica — Backend

API REST completa para gerenciamento de uma clínica médica, desenvolvida com Spring Boot, JPA e autenticação JWT.

---

## 🚀 Tecnologias utilizadas

- **Java 21**
- **Spring Boot 4.0.4**
- **Spring Data JPA** — persistência de dados
- **Spring Security** — autenticação e autorização
- **H2 Database** — banco de dados embutido
- **JWT (jjwt 0.12.6)** — tokens de autenticação
- **Springdoc OpenAPI 2.8.6** — documentação automática (Swagger)
- **Maven** — gerenciamento de dependências

---

## 📁 Estrutura do projeto

```
src/main/java/com/example/demo/
├── controller/
│   ├── AuthController.java
│   ├── PacienteController.java
│   ├── MedicoController.java
│   └── ConsultaController.java
├── service/
│   ├── PacienteService.java
│   ├── MedicoService.java
│   └── ConsultaService.java
├── repositories/
│   ├── UsuarioRepository.java
│   ├── PacienteRepository.java
│   ├── MedicoRepository.java
│   └── ConsultaRepository.java
├── model/
│   ├── Usuario.java
│   ├── Paciente.java
│   ├── Medico.java
│   └── Consulta.java
├── security/
│   ├── JwtUtil.java
│   ├── JwtFiltro.java
│   └── SecurityConfig.java
└── exception/
    ├── ErroResposta.java
    └── GlobalExceptionHandler.java
```

---

## ⚙️ Como rodar o projeto

### Pré-requisitos

- Java 21 instalado
- Maven instalado

### Passos

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/clinica-backend.git

# Acesse a pasta
cd clinica-backend

# Suba o servidor
mvn spring-boot:run
```

O servidor vai iniciar em `http://localhost:8080`

---

## 📖 Documentação da API

Com o servidor rodando, acesse o Swagger:

```
http://localhost:8080/swagger-ui.html
```

---

## 🔐 Autenticação

A API usa **JWT**. Para acessar as rotas protegidas:

### 1. Criar usuário

```bash
curl -X POST http://localhost:8080/auth/registrar \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@clinica.com","senha":"123456"}'
```

### 2. Fazer login e obter token

```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@clinica.com","senha":"123456"}'
```

Resposta:
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9..."
}
```

### 3. Usar o token nas requisições

```bash
curl -X GET http://localhost:8080/pacientes \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

---

## 📋 Endpoints

### 🔓 Rotas públicas

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/auth/registrar` | Criar novo usuário |
| POST | `/auth/login` | Autenticar e obter token |

### 🔒 Rotas protegidas (precisam de token)

#### Pacientes

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/pacientes` | Cadastrar paciente |
| GET | `/pacientes` | Listar todos |
| GET | `/pacientes/{id}` | Buscar por ID |
| DELETE | `/pacientes/{id}` | Deletar paciente |

#### Médicos

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/medicos` | Cadastrar médico |
| GET | `/medicos` | Listar todos |
| GET | `/medicos/{id}` | Buscar por ID |
| DELETE | `/medicos/{id}` | Deletar médico |

#### Consultas

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/consultas` | Agendar consulta |
| GET | `/consultas` | Listar todas |
| GET | `/consultas/{id}` | Buscar por ID |
| DELETE | `/consultas/{id}` | Cancelar consulta |

---

## 📦 Exemplos de requisição

### Cadastrar paciente

```bash
curl -X POST http://localhost:8080/pacientes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{
    "nome": "João da Silva",
    "cpf": "123.456.789-00",
    "telefone": "(86) 99999-0000",
    "email": "joao@email.com"
  }'
```

### Cadastrar médico

```bash
curl -X POST http://localhost:8080/medicos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{
    "nome": "Dr. Carlos Lima",
    "crm": "CRM-PI 12345",
    "especialidade": "Cardiologia",
    "email": "carlos@clinica.com"
  }'
```

### Agendar consulta

```bash
curl -X POST http://localhost:8080/consultas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{
    "pacienteId": 1,
    "medicoId": 1,
    "dataHora": "2025-06-10T14:00:00",
    "motivo": "Dor no peito"
  }'
```

---

## 🗄️ Banco de dados

O projeto usa **H2** — banco embutido que não precisa de instalação.

Com o servidor rodando, acesse o console visual:

```
http://localhost:8080/h2-console
```

| Campo | Valor |
|-------|-------|
| JDBC URL | `jdbc:h2:file:./clinicadb` |
| User | `sa` |
| Password | *(vazio)* |

---

## ✅ Regras de negócio

- Paciente não pode ser cadastrado com CPF duplicado
- Médico não pode ser cadastrado com CRM duplicado
- Consulta só pode ser agendada se paciente e médico existirem
- Nome e CPF do paciente são obrigatórios
- Nome e CRM do médico são obrigatórios
- Motivo e data da consulta são obrigatórios
- Senhas são armazenadas criptografadas com BCrypt

---

## 🧱 Arquitetura

O projeto segue a arquitetura em camadas:

```
Controller → Service → Repository → Model
```

- **Controller** — recebe as requisições HTTP
- **Service** — aplica as regras de negócio
- **Repository** — acessa o banco de dados
- **Model** — define as entidades
