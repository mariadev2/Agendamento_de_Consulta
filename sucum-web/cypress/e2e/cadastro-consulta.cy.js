describe("Pre Cadastro Validator", () => {
    beforeEach(() => {
      // Acesse a página de login antes de cada teste
    
      cy.visit("/logout");
      cy.viewport(1800, 900);
    });

    it('Deverá mostrar os campos de formulario do login', () => {
        // Verifique se os campos de email e senha estão presentes
        cy.get('input[name="username"]').should('be.visible');
        cy.get('input[name="senha"]').should('be.visible');
        cy.get('button[name="buttonSend"]').should('be.visible');
      });
      it('Deverá mostrar mensagem de campo do nome vazio', () => {
        // Clique no botão de login sem preencher os campos
        cy.get('button[name="buttonSend"]').click();
        // Verifique se as mensagens de validação são exibidas
        cy.get('input[name="username"]:invalid').should('have.length', 1);
      });
    
      it('Deverá mostrar mensagem de campo de senha vazio', () => {
        // Clique no botão de login sem preencher os campos
        cy.get('button[name="buttonSend"]').click();
        // Verifique se as mensagens de validação são exibidas
        cy.get('input[name="senha"]:invalid').should('have.length', 1);
      });
})

describe('Login Request Success', () => {
    beforeEach(() => {
      // Acesse a página de login antes de cada teste
      window.localStorage.clear();
      cy.visit("/");
      cy.viewport(1800, 900);
    });
    it('should login successfully with valid credentials', () => {
      // Digite um email e senha válidos
      cy.get('input[name="username"]').type('Thais Souza');
      cy.get('input[name="senha"]').type('test12345');
      
      // Interceptar a requisição de login e simular uma resposta de sucesso
      cy.intercept('POST', 'http://localhost:8080/api/v1/login', {
        statusCode: 200,
        body: { 
          tokenJWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxNzc4NTM2MywiZXhwIjoxNzE3Nzg4OTYzfQ.72CCC19BQi0YxRzxTQLLjA6ofj1zP4QQNNVAQpKJDrk',
          username: 'Thais Souza',
          profile: 'Paciente',
          sexo: 'Feminino',
          id: 1
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
      cy.visit("/agendar");
      cy.viewport(1800, 900);
    });
    it('Deverá mostrar os campos de formulario do cadastro da consulta', () => {
        // Verifique se os campos de email e senha estão presentes
        cy.get('input[name="dataAgendamento"]').should('be.visible');
        cy.get('input[name="local"]').should('be.visible');
        cy.get('select[name="tipoConsulta"]').should('be.visible');
        cy.get('select[name="idMedico"]').should('be.visible');
        cy.get('textarea[name="descricaoMotivo"]').should('be.visible');
      
        cy.get('button[name="buttonSend"]').should('be.visible');
      });
  })

  describe('SignUpConsulta Success Request', () => {
    beforeEach(() => {
      // Acesse a página de login antes de cada teste
      cy.viewport(1800, 900);
    });
    it("Deverá apresentar a label de cadastrado com sucesso e ir para a home", () => {
        // Digite um email e senha válidos
        cy.get('input[name="dataAgendamento"]').type("2017-06-06T08:44");
        cy.get('select[name="tipoConsulta"]').select(4)
     
        cy.get('select[name="idMedico"]').select(1);
        cy.get('textarea[name="descricaoMotivo"]').type("kkkkkkkkkkk");
  
        
        cy.intercept("POST", "http://localhost:8080/api/v1/signUpConsulta", {
          statusCode: 200,
          data: {message: 'Salvo com sucesso'}
        }).as("signUpRequest");
  
        // Clique no botão de login
        cy.get('button[name="buttonSend"]').click();
        cy.get("#labelSuccess")
        .invoke("text")
        .then((paragraphText) => {
          // Verifica se o texto do parágrafo é o esperado
          expect(paragraphText.trim()).to.equal("Cadastrado com sucesso");
        })
       
        cy.visit("/home");
      
      });
  })
  
  
  