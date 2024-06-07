
describe('Login Validator', () => {
  beforeEach(() => {
    // Acesse a página de login antes de cada teste
    cy.visit("/logout");
    cy.viewport(1800, 900);
    window.localStorage.clear();
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

describe('Login Request Error Password', () => {
  beforeEach(() => {
    // Acesse a página de login antes de cada teste
    cy.viewport(1800, 900);
  });
  it('should login successfully with valid credentials', () => {
    // Digite um email e senha válidos
    cy.get('input[name="username"]').type('Thais Souza');
    cy.get('input[name="senha"]').type('test1235');
    
    // Interceptar a requisição de login e simular uma resposta de sucesso
    cy.intercept('POST', 'http://localhost:8080/api/v1/login', {
      statusCode: 401,
      body: 'Request failed with status code 401'
    }).as('loginRequest');
    
    // Clique no botão de login
    cy.get('button[name="buttonSend"]').click();
    
    // Aguarde a requisição de login ser concluída
    cy.wait('@loginRequest')
    
    // Verifique se a URL mudou para a página inicial (ou outra página esperada após o login)
    cy.get('#labelError').invoke('text').then((paragraphText) => {
      // Verifica se o texto do parágrafo é o esperado
      expect(paragraphText.trim()).to.equal('Usuário inválido');
    });
  });
})

describe('Login Request Success', () => {
  beforeEach(() => {
    // Acesse a página de login antes de cada teste
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
        tokenJWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxNzc5MDUxMCwiZXhwIjoxNzE3Nzk0MTEwfQ.eH48VWLMy_zky26idqPFRIkfzHMDhyDY-Yrwllnkccw',
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

