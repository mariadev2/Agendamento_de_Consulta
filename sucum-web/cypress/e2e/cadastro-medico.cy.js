describe("Pre Cadastro Validator", () => {
    beforeEach(() => {
      // Acesse a página de login antes de cada teste
      window.localStorage.clear();
      cy.visit("/logout");
      cy.viewport(1800, 900);
  
    });

    it('Deverá mostrar os campos de formulario do login', () => {
        // Verifique se os campos de email e senha estão presentes
        cy.get('input[name="username"]').should('be.visible');
        cy.get('input[name="senha"]').should('be.visible');
        cy.get('button[name="buttonSend"]').should('be.visible');
      });
  });

describe('Login Request Success', () => {
    beforeEach(() => {
      // Acesse a página de login antes de cada teste
      cy.visit("/");
      
      window.localStorage.clear();
      cy.viewport(1800, 900);
    });
    it('Deverá fazer o login com o supervisor e redirecionar para home', () => {
      // Digite um email e senha válidos
      cy.get('input[name="username"]').type('Nilton Santos');
      cy.get('input[name="senha"]').type('asdasdasd');
      
      // Interceptar a requisição de login e simular uma resposta de sucesso
      cy.intercept('POST', 'http://localhost:8080/api/v1/login', {
        statusCode: 200,
        body: { 
          tokenJWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxNzc4MzE0OSwiZXhwIjoxNzE3Nzg2NzQ5fQ.PxOhGyY119R5vUu8aI6jMeDe67xuRHRsgJlYTQhUBlw',
          username: 'Nilton Santos',
          profile: 'Medico',
          sexo: 'Masculino',
          id: 5
        }
      }).as('loginRequest');
      
      // Clique no botão de login
      cy.get('button[name="buttonSend"]').click();
      
      // Aguarde a requisição de login ser concluída
      cy.wait('@loginRequest').then((interception) => {
        const token = interception.response.body.tokenJWT;
        const profile = interception.response.body.profile;
        const username = interception.response.body.username;
        const id = interception.response.body.id;
        const sexo = interception.response.body.sexo;
        window.localStorage.setItem('authToken', token);
        window.localStorage.setItem('profile', profile);
        window.localStorage.setItem('sexo', sexo);
        window.localStorage.setItem('id', id);
        window.localStorage.setItem('username', username);
      });;
      
      // Verifique se a URL mudou para a página inicial (ou outra página esperada após o login)
      cy.url().should('eq', 'http://localhost:3000/home');
    });
  })

  describe('Go to SignUpMedico and valid fields', () => {
    beforeEach(() => {
      // Acesse a página de login antes de cada teste
      cy.visit("/signUpMed");
      cy.viewport(1800, 900);
    });
    it('Deverá mostrar os campos de formulario do cadastro', () => {
        // Verifique se os campos de email e senha estão presentes
        cy.get('input[name="dataNascimento"]').should('be.visible');
        cy.get('input[name="sexo"]').should('be.visible');
        cy.get('input[name="cep"]').should('be.visible');
        cy.get('input[name="endereco"]').should('be.visible');
        cy.get('input[name="numeroCasa"]').should('be.visible');
        cy.get('input[name="bairro"]').should('be.visible');
        cy.get('input[name="cidade"]').should('be.visible');
        cy.get('input[name="email"]').should('be.visible');
        cy.get('input[name="telefone"]').should('be.visible');
        cy.get('input[name="celular"]').should('be.visible');
        cy.get('select[name="especializacao"]').should('be.visible');
     
        cy.get('button[name="buttonSend"]').should('be.visible');
      });
  })

  describe('SignUpMedico Success Request', () => {
    beforeEach(() => {
      // Acesse a página de login antes de cada teste
      cy.viewport(1800, 900);
    });
    it("Deverá apresentar a label de cadastrado com sucesso e ir para a home", () => {
        // Digite um email e senha válidos
      
        cy.get('input[name="dataNascimento"]').type("2024-06-07");
        cy.get('input[name="cep"]').type("40323310");
        cy.get('input[name="endereco"]').type("rua teste");
        cy.get('input[name="numeroCasa"]').type("22");
        cy.get('input[name="bairro"]').type("test");
        cy.get('input[name="cidade"]').type("test");
        cy.get('input[name="email"]').type("teste@test.com");
        cy.get('input[name="telefone"]').type("2323232332");
        cy.get('input[name="celular"]').type("323232233232");
        cy.get('select[name="especializacao"]').select(2);
        cy.get('input[id="masculino"]').check();
  
        // Interceptar a requisição de login e simular uma resposta de sucesso
        cy.intercept("POST", "http://localhost:8080/api/v1/signUpMedico", {
          statusCode: 200,
        }).as("signUpRequest");
  
        // Clique no botão de login
        cy.get('button[name="buttonSend"]').click();
  
        cy.url().should("eq", "http://localhost:3000/home");
      });
  })
  