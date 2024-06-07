
describe('SignUpCadatro fields', () => {
    beforeEach(() => {
      // Acesse a página de cadastro antes de cada teste
      cy.visit('/signUp')
      cy.viewport(1500, 900);
      window.localStorage.clear();
    });
  
    it('Deverá mostrar os campos de formulario do cadastro', () => {
      // Verifique se os campos de email e senha estão presentes
      cy.get('input[name="username"]').should('be.visible');
      cy.get('input[name="senha"]').should('be.visible');
      cy.get('input[name="dataNascimento"]').should('be.visible');
      cy.get('input[name="confirmSenha"]').should('be.visible');
      cy.get('input[name="cpf"]').should('be.visible');
      cy.get('input[name="sexo"]').should('be.visible');
      cy.get('input[name="cep"]').should('be.visible');
      cy.get('input[name="endereco"]').should('be.visible');
      cy.get('input[name="numeroCasa"]').should('be.visible');
      cy.get('input[name="bairro"]').should('be.visible');
      cy.get('input[name="cidade"]').should('be.visible');
      cy.get('input[name="email"]').should('be.visible');
      cy.get('input[name="telefone"]').should('be.visible');
      cy.get('input[name="celular"]').should('be.visible');
      cy.get('input[name="problemaSaude"]').should('be.visible');
      cy.get('input[name="usoMedicamento"]').should('be.visible');
      cy.get('input[name="alergia"]').should('be.visible');
      cy.get('button[name="buttonSend"]').should('be.visible');
    });
  })

  describe('SignUpCadatro validator', () => {
    beforeEach(() => {
      // Acesse a página de cadastro antes de cada teste
      cy.viewport(1500, 900);
      window.localStorage.clear();
    });
    it('Deverá mostrar mensagem de campo do nome vazio', () => {
        // Clique no botão de login sem preencher os campos
        cy.get('button[name="buttonSend"]').click();
        // Verifique se as mensagens de validação são exibidas
        cy.get('input[name="username"]:invalid').should("have.length", 1);
        cy.get('input[name="senha"]:invalid').should("have.length", 1);
        cy.get('input[name="dataNascimento"]:invalid').should("have.length", 1);
        cy.get('input[name="confirmSenha"]:invalid').should("have.length", 1);
        cy.get('input[name="cpf"]:invalid').should("have.length", 1);
        cy.get('input[name="cep"]:invalid').should("have.length", 1);
        cy.get('input[name="endereco"]:invalid').should("have.length", 1);
        cy.get('input[name="numeroCasa"]:invalid').should("have.length", 1);
        cy.get('input[name="bairro"]:invalid').should("have.length", 1);
        cy.get('input[name="cidade"]:invalid').should("have.length", 1);
        cy.get('input[name="email"]:invalid').should("have.length", 1);
        cy.get('input[name="telefone"]:invalid').should("have.length", 1);
        cy.get('input[name="celular"]:invalid').should("have.length", 1);
      });
  })

  describe('SignUpCadastro Request Error User Exists', () => {
    beforeEach(() => {
      // Acesse a página de login antes de cada teste
      cy.viewport(1500, 900);
      window.localStorage.clear();
    });
    it("Deverá apresentar a label de erro para o usuário", () => {
      // Digite um email e senha válidos
      cy.get('input[name="username"]').type("Thais Souza");
      cy.get('input[name="senha"]').type("test1235");
      cy.get('input[name="dataNascimento"]').type("2024-06-07");
      cy.get('input[name="confirmSenha"]').type("test1235");
      cy.get('input[name="cpf"]').type("22233322211");
      cy.get('input[name="cep"]').type("40323310");
      cy.get('input[name="endereco"]').type("rua teste");
      cy.get('input[name="numeroCasa"]').type("22");
      cy.get('input[name="bairro"]').type("test");
      cy.get('input[name="cidade"]').type("test");
      cy.get('input[name="email"]').type("teste@test.com");
      cy.get('input[name="telefone"]').type("2323232332");
      cy.get('input[name="celular"]').type("323232233232");
      cy.get('input[id="masculino"]').check();
      cy.get('input[id="nao1"]').check();
      cy.get('input[id="nao2"]').check();
      cy.get('input[id="nao3"]').check();

      // Interceptar a requisição de login e simular uma resposta de sucesso
      cy.intercept("POST", "http://localhost:8080/api/v1/signUpPaciente", {
        statusCode: 400,
        body: { message: "Já existe um paciente com esse nome" },
      }).as("signUpRequest");

      // Clique no botão de login
      cy.get('button[name="buttonSend"]').click();

      // Aguarde a requisição de login ser concluída
      cy.wait("@signUpRequest");

      // Verifique se apareceu a label de sucesso
      cy.get("#labelError")
        .invoke("text")
        .then((paragraphText) => {
          // Verifica se o texto do parágrafo é o esperado
          expect(paragraphText.trim()).to.equal("Já existe um paciente com esse nome");
        });
    });
  })

  
  describe("SignUpCadastro Request Success", () => {
    beforeEach(() => {
      // Acesse a página de login antes de cada teste
      cy.viewport(1500, 900);
      cy.get('input[type="text"]').clear();
      cy.get('input[type="date"]').clear();
      cy.get('input[type="password"]').clear();
      cy.get('input[id="confirmSenha"]').clear();
      cy.get('input[type="email"]').clear();
      cy.get('#labelError').invoke('text', '');
      cy.get('input[type="checkbox"]').uncheck();
    });

    it("Deverá apresentar a label de cadastrado com sucesso e ir para a home", () => {
      // Digite um email e senha válidos
      cy.get('input[name="username"]').type("Daniel Souza");
      cy.get('input[name="senha"]').type("test1235");
      cy.get('input[name="dataNascimento"]').type("2024-06-07");
      cy.get('input[name="confirmSenha"]').type("test1235");
      cy.get('input[name="cpf"]').type("22233322211");
      cy.get('input[name="cep"]').type("40323310");
      cy.get('input[name="endereco"]').type("rua teste");
      cy.get('input[name="numeroCasa"]').type("22");
      cy.get('input[name="bairro"]').type("test");
      cy.get('input[name="cidade"]').type("test");
      cy.get('input[name="email"]').type("teste@test.com");
      cy.get('input[name="telefone"]').type("2323232332");
      cy.get('input[name="celular"]').type("323232233232");
      cy.get('input[id="masculino"]').check();
      cy.get('input[id="nao1"]').check();
      cy.get('input[id="nao2"]').check();
      cy.get('input[id="nao3"]').check();

      // Interceptar a requisição de login e simular uma resposta de sucesso
      cy.intercept("POST", "http://localhost:8080/api/v1/signUpPaciente", {
        statusCode: 200,
      }).as("signUpRequest");

      // Clique no botão de login
      cy.get('button[name="buttonSend"]').click();

      // Aguarde a requisição de login ser concluída
      cy.wait("@signUpRequest");

      // Verifique se apareceu a label de sucesso
      cy.get("#labelSuccess")
        .invoke("text")
        .then((paragraphText) => {
          // Verifica se o texto do parágrafo é o esperado
          expect(paragraphText.trim()).to.equal("Cadastrado com sucesso");
        });
      cy.wait(2100);

      cy.url().should("eq", "http://localhost:3000/");
    });
  });