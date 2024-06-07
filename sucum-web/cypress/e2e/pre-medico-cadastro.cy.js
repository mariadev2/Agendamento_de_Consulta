describe("Pre Cadastro Validator", () => {
  beforeEach(() => {
    // Acesse a página de login antes de cada teste
    window.localStorage.clear();
    cy.visit("/logout");
    cy.viewport(1800, 900);

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
      cy.get('input[name="username"]').type('Fernando Souza');
      cy.get('input[name="senha"]').type('Sucum123');
      
      // Interceptar a requisição de login e simular uma resposta de sucesso
      cy.intercept('POST', 'http://localhost:8080/api/v1/login', {
        statusCode: 200,
        body: { 
          tokenJWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxNzc4MzE0OSwiZXhwIjoxNzE3Nzg2NzQ5fQ.PxOhGyY119R5vUu8aI6jMeDe67xuRHRsgJlYTQhUBlw',
          username: 'Fernando Souza',
          profile: 'Supervisor',
          sexo: 'Masculino',
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
  

  
describe('Login Request Supervisor Success', () => {
    beforeEach(() => {
      // Acesse a página de login antes de cada teste
      cy.visit("/home");
      
      cy.viewport(1800, 900);
    });
   
    it("Deverá mostrar botao para ir para a tela do pré registro", () => {
      cy.get("#getBtnPreCad").should("be.visible");

      cy.get("#getBtnPreCad").click();
    });

    

})

describe('PreSignUpMedico fields', () => {
    beforeEach(() => {
      // Acesse a página de login antes de cada teste
      cy.visit("/preSignUpMed");
      cy.viewport(1800, 900);
    });
   
    it("Deverá mostrar os campos de formulario do cadastro", () => {
        cy.get('input[name="username"]').should('be.visible');
        cy.get('input[name="senha"]').should('be.visible');
        cy.get('input[name="confirmSenha"]').should('be.visible');
        cy.get('input[name="cpf"]').should('be.visible');
        cy.get('input[name="crm"]').should('be.visible');
        cy.get('button[name="buttonSend"]').should('be.visible');
      });
})

describe('PreSignUpMedico Success Request', () => {
    beforeEach(() => {
      // Acesse a página de login antes de cada teste
      cy.viewport(1800, 900);
    });
   
    it("Deverá mostrar os campos de formulario do cadastro", () => {
        cy.get('input[name="username"]').type("Marcio Silva")
        cy.get('input[name="senha"]').type('test12345')
        cy.get('input[name="confirmSenha"]').type('test12345')
        cy.get('input[name="cpf"]').type('11111111111')
        cy.get('input[name="crm"]').type('CRM232332')

        cy.intercept("POST", "http://localhost:8080/api/v1/preSignUpMedico", {
            statusCode: 200,
          }).as("signUpMedicoRequest");

          cy.get('button[name="buttonSend"]').click();

          cy.wait("@signUpMedicoRequest");

          cy.get("#labelSuccess")
        .invoke("text")
        .then((paragraphText) => {
          // Verifica se o texto do parágrafo é o esperado
          expect(paragraphText.trim()).to.equal("Cadastrado com sucesso");
        });
      cy.wait(2000);

      cy.url().should("eq", "http://localhost:3000/home");
      });
})
  

