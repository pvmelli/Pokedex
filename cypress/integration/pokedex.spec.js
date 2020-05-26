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

describe ('Verifies the search bar is working', () => {

    it ('Verifies the search bar validation is working', () => {
        cy.get('#pokemon-field').should('not.have.class', 'is-error');
        cy.get('#invalid-search').should('not.be.visible')

        cy.get('#pokemon-field').type('523523');
        cy.get('#search-button').click();
        cy.get('#pokemon-field').should('have.class', 'is-error');
        cy.get('#invalid-search').should('be.visible').and('have.text', 'This field cannot contain numbers');

        cy.get('#pokemon-field').clear();
        cy.get('#pokemon-field').type('     ');
        cy.get('#search-button').click();
        cy.get('#pokemon-field').should('have.class', 'is-error');
        cy.get('#invalid-search').should('be.visible').and('have.text', 'This field cannot be empty');

        cy.get('#pokemon-field').clear();
        cy.get('#pokemon-field').type('afasfasf');
        cy.get('#search-button').click();
        cy.get('#pokemon-field').should('have.class', 'is-error');
        cy.get('#invalid-search').should('be.visible').and('have.text', 'The name entered is invalid');
    });

    it ('Verifies the pokedex entry is generated with a valid input', () => {
        cy.server();
        cy.route('https://pokeapi.co/api/v2/pokemon/flygon', 'fixture:flygon_single')
        .as('obtainFlygonSingleInfo');

        cy.server();
        cy.route('https://pokeapi.co/api/v2/pokemon-species/flygon', 'fixture:flygon_species')
        .as('obtainFlygonSpeciesInfo');


        cy.get('#loading-modal').should('not.be.visible')

        cy.get('#pokemon-field').clear();
        cy.get('#pokemon-field').type('FlYgOn');
        cy.get('#search-button').click();
        cy.get('#loading-modal').should('be.visible');
        cy.get('#pokemon-field').should('not.have.class', 'is-error');
        cy.get('#invalid-search').should('not.be.visible');

        cy.get('#loading-modal').should('not.be.visible');

        const NAME = 'FLYGON'
        const IMAGE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/330.png'
        const FLAVOR_TEXT = 'By flapping their wings, Flygon cause sandstorms that conceal Krookodile. The team then splits the prey they catch.'
        const ABILITIES = {'LEVITATE': 'Not hidden'};
        const CHARACTERISTICS = {'GENERATION': 'III', 'HEIGHT': '2.0m', 'WEIGHT': '82.0kg', 'HABITAT': 'rough-terrain', 'TYPE' : 'dragon, ground'}
        const STATS = {'SPEED': {'Base': '100', 'Effort': '2'},
        'SPECIAL-DEFENSE': {'Base': '80', 'Effort': '0'},
        'SPECIAL-ATTACK': {'Base': '80', 'Effort': '0'},
        'DEFENSE': {'Base': '80', 'Effort': '0'},
        'ATTACK': {'Base': '100', 'Effort': '1'},
        'HP': {'Base': '80', 'Effort': '0'},}


        cy.get('#pokedex-entry').should('be.visible');
        cy.get('#pokedex-entry').find('img').should('have.attr', 'src', IMAGE_URL);
        cy.get('#pokedex-entry').find('#pokemon-name').should('have.text', NAME);
        cy.get('#pokedex-entry').find('#flavor-text').should('have.text', FLAVOR_TEXT);
        Object.entries(ABILITIES).forEach((abilityEntry) => {
            cy.get('#pokedex-entry').find('#abilities').find('button').contains(abilityEntry[0])
            .siblings().should('have.text', abilityEntry[1]);
        });
        Object.entries(CHARACTERISTICS).forEach((characteristicEntry) => {
            cy.get('#pokedex-entry').find('#characteristics').find('button').contains(characteristicEntry[0])
            .siblings().should('have.text', characteristicEntry[1]);
        });

        Object.entries(STATS).forEach((statsObj) => {
            Object.entries(statsObj[1]).forEach((statValues) => {
                cy.get(`#${statsObj[0]}`).find('th').contains(statValues[0])
                .siblings().should('have.text', statValues[1]);
            });
        });

    });
});

describe ('Verifies the pokemon list is working', () => {
    

    it ('Verifies the pokedex entry is generated upon clicking a list element', () => {
            cy.server();
            cy.route('https://pokeapi.co/api/v2/pokemon-species/?offset=0&limit=10', 'fixture:page_01')
            .as('obtainFirstPage');

            cy.server();
            cy.route('https://pokeapi.co/api/v2/pokemon/blastoise', 'fixture:blastoise_single')
            .as('obtainBlastoiseSingleInfo');
    
            cy.server();
            cy.route('https://pokeapi.co/api/v2/pokemon-species/blastoise', 'fixture:blastoise_species')
            .as('obtainBlastoiseSpeciesInfo');
    
            cy.get('#loading-modal').should('not.be.visible')    
            cy.get('#blastoise').click();
            cy.get('#loading-modal').should('be.visible');    
            cy.get('#loading-modal').should('not.be.visible');
    
            const NAME = 'BLASTOISE'
            const IMAGE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png'
            const FLAVOR_TEXT = 'Blastoise has water spouts that protrude from its shell. The water spouts are very accurate. They can shoot bullets of water with enough accuracy to strike empty cans from a distance of over 160 feet.'
            const ABILITIES = {'RAIN-DISH': 'Hidden', 'TORRENT': 'Not hidden'};
            const CHARACTERISTICS = {'GENERATION': 'I', 'HEIGHT': '1.6m', 'WEIGHT': '85.5kg', 'HABITAT': 'waters-edge', 'TYPE' : 'water'}
            const STATS = {'SPEED': {'Base': '78', 'Effort': '0'},
            'SPECIAL-DEFENSE': {'Base': '105', 'Effort': '3'},
            'SPECIAL-ATTACK': {'Base': '85', 'Effort': '0'},
            'DEFENSE': {'Base': '100', 'Effort': '0'},
            'ATTACK': {'Base': '83', 'Effort': '0'},
            'HP': {'Base': '79', 'Effort': '0'},}
    
    
            cy.get('#pokedex-entry').should('be.visible');
            cy.get('#pokedex-entry').find('img').should('have.attr', 'src', IMAGE_URL);
            cy.get('#pokedex-entry').find('#pokemon-name').should('have.text', NAME);
            cy.get('#pokedex-entry').find('#flavor-text').should('have.text', FLAVOR_TEXT);
            Object.entries(ABILITIES).forEach((abilityEntry) => {
                cy.get('#pokedex-entry').find('#abilities').find('button').contains(abilityEntry[0])
                .siblings().should('have.text', abilityEntry[1]);
            });
            Object.entries(CHARACTERISTICS).forEach((characteristicEntry) => {
                cy.get('#pokedex-entry').find('#characteristics').find('button').contains(characteristicEntry[0])
                .siblings().should('have.text', characteristicEntry[1]);
            });    
            Object.entries(STATS).forEach((statsObj) => {
                Object.entries(statsObj[1]).forEach((statValues) => {
                    cy.get(`#${statsObj[0]}`).find('th').contains(statValues[0])
                    .siblings().should('have.text', statValues[1]);
                });
            });
    
    });
});



