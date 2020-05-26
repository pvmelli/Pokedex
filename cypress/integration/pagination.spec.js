let fetchPolyfill;

before(() => {
    const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js';

    cy.request(polyfillUrl)
    .then((response) => {
        fetchPolyfill = response.body;
    });

    cy.visit('http://127.0.0.1:5500', {
        onBeforeLoad(contentWindow) {
            delete contentWindow.fetch;
            contentWindow.eval(fetchPolyfill);
            contentWindow.fetch = contentWindow.unfetch;
        },
    });
});

describe ('Verifies the paginator works', () => {
    it ('Verifies the pokemon lists are loading correctly', () => {
        cy.server();
        cy.route('https://pokeapi.co/api/v2/pokemon-species/?offset=0&limit=10', 'fixture:page_01')
        .as('obtainFirstPage');
    
        cy.server();
        cy.route('https://pokeapi.co/api/v2/pokemon-species/?offset=10&limit=10', 'fixture:page_02')
        .as('obtainSecondPage');
    
        cy.server();
        cy.route('https://pokeapi.co/api/v2/pokemon-species/?offset=20&limit=10', 'fixture:page_03')
        .as('obtainThirdPage');
    
        cy.server();
        cy.route('https://pokeapi.co/api/v2/pokemon-species/?offset=40&limit=10', 'fixture:page_05')
        .as('obtainFifthPage');


        const POKEMONS_FIRST_PAGE = ['bulbasaur', 'ivysaur', 'venusaur', 'charmander', 'charmeleon', 'charizard',
        'squirtle', 'wartortle', 'blastoise', 'caterpie']

        const POKEMONS_SECOND_PAGE = ['metapod', 'butterfree', 'weedle',
        'kakuna', 'beedrill', 'pidgey', 'pidgeotto', 'pidgeot', 'rattata', 'raticate']

        const POKEMONS_THIRD_PAGE = ['spearow', 'fearow', 'ekans', 'arbok',
        'pikachu', 'raichu', 'sandshrew', 'sandslash', 'nidoran-f', 'nidorina']

        const POKEMONS_FIFTH_PAGE = ['zubat', 'golbat', 'oddish', 'gloom',
        'vileplume', 'paras', 'parasect', 'venonat', 'venomoth', 'diglett']

        cy.get('#page-1').click();
        POKEMONS_FIRST_PAGE.forEach((pokemon) => {
            cy.get('#pokemon-list').contains(pokemon);
        });

        cy.get('#page-2').click();
        POKEMONS_SECOND_PAGE.forEach((pokemon) => {
            cy.get('#pokemon-list').contains(pokemon);
        });

        cy.get('#page-3').click();
        POKEMONS_THIRD_PAGE.forEach((pokemon) => {
            cy.get('#pokemon-list').contains(pokemon);
        });

        cy.get('#page-5').click();
        POKEMONS_FIFTH_PAGE.forEach((pokemon) => {
            cy.get('#pokemon-list').contains(pokemon);
        });
        
    });

    it ('Verifies the paginator buttons are working correctly', () => {
        cy.get('#page-5').click();
        cy.get('#page-5').should('have.class', 'active');
        cy.get('.dot-items').should('have.length', 2).and('be.visible').and('have.class', 'disabled');
        cy.get('#page-1').should('not.be.visible');
        cy.get('#page-8').should('not.be.visible');

        cy.get('#page-previous').click();
        cy.get('#page-4').should('have.class', 'active');
        cy.get('#page-5').should('not.have.class', 'active');
        cy.get('.dot-items').should('be.visible').and('have.class', 'disabled');
        cy.get('#page-1').should('not.be.visible');
        cy.get('#page-7').should('not.be.visible');

        cy.get('#page-3').click();
        cy.get('#page-3').should('have.class', 'active');
        cy.get('#page-4').should('not.have.class', 'active');
        cy.get('#page-dotsprev').should('not.be.visible')
        cy.get('#page-dotsnext').should('be.visible')
        cy.get('#page-1').should('be.visible');
        cy.get('#page-6').should('not.be.visible');

        cy.get('#page-previous').click();
        cy.get('#page-previous').click();
        cy.get('#page-1').should('have.class', 'active');
        cy.get('#page-previous').should('have.class', 'disabled');
        cy.get('#page-3').should('not.have.class', 'active');
        cy.get('#page-dotsprev').should('not.be.visible')
        cy.get('#page-dotsnext').should('be.visible')
        cy.get('#page-4').should('not.be.visible');

        cy.get('#page-next').click();
        cy.get('#page-2').should('have.class', 'active');

        cy.get('#page-81').click({ force: true });
        cy.get('#page-next').should('have.class', 'disabled');
        cy.get('#page-dotsnext').should('not.be.visible')
    });
});


