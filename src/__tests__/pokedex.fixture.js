export default `
<div class="wrapper">
    <div class="fixed-header">
        <img src="./src/img/logo.png"/>
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
            <a href="#" style="text-decoration:none" class="button">Home</a>
            <a href="#" style="text-decoration:none" class="button">About</a>
            <a href="#" style="text-decoration:none" class="button">Pokedex</a>
            <a href="#" style="text-decoration:none" class="button">Berrydex</a>
            <a href="https://pokeapi.co/" style="text-decoration:none" class="button">Credits</a>
          </div>
    </div>

    <div class="loading-modal not-display" id="loading-modal">
        <div class="modal-content"> 
            <h5>Loading...</h5>
        </div>
    </div>

    <div class="row justify-content-md-center" id="top-navbuttons-row">
        <div class="col-md-2 not-display nav-container">
            <button class="nes-btn is-warning nav-buttons" id="nav-search-button">Go back to search bar</button>
        </div>
        <div class="col-md-2 not-display nav-container">
            <button class="nes-btn is-warning nav-buttons" id="nav-list-button">Go back to list</button>
        </div>
    </div>

    <section class="container nes-container not-display" id="pokedex-entry">
        <div class="row">
            <div class="col-md-4">  
                <h4 class="pokedex-container" id="pokemon-name">Pokemon name</h4>
            </div>
        </div>
        <div class="row">
                <div class="col-md-4">  
                    <div class="nes-container is-rounded pokedex-container" id="sprite-container">

                    </div>
                </div>
                <div class="col-md-8">
                    <div class="nes-container" id="flavor">
                            <div class="pokedex-container" id="flavor-text"></div>
                    </div>
                </div>
        </div>
        <br><br>
        <div class="row">
            <div class="col-md-4">
                <div class="nes-container with-title is-centered" id="mon-basics">
                    <p class="title">Characteristics</p>
                    <div class="pokedex-container" id="characteristics"></div>
                        
                </div>
            </div>
            <div class="col-md-8">
                <div class="nes-container with-title" id="ability-container">
                    <p class="title">Abilities</p>
                    <div class="pokedex-container" id="abilities"></div>                        
                </div>
            </div>
        </div>
        <br><br>
        <div class="row">
            <div class="col-md">
                <div class="nes-container with-title" id="stats-container">
                    <p class="title">Stats</p>
                        <div class="pokedex-container" id="stats"></div>
                </div>
            </div>
        </div>

    </section>

    <div id="search-box">
        <strong id="search-title">Search for a particular pokemon</strong>
        <p class="subtitle">Please bear in mind that only pokemons
            <br/>
            from gen I to VII are available</p>
        <div class="row justify-content-md-center">
            <div class="col-md-8">
                <input type="text" id="pokemon-field" class="nes-input">
                <div class="invalid not-display" id="invalid-search">
                    
                </div>
                
            </div>
            <div class="col-md-3">
            <button type="button" class="nes-btn is-warning" id="search-button">Search</button>
            </div>
        </div>
        <div class="row justify-content-md-center" id="divider-box">
            <div class="col-md-3" id="divider">
                <hr class="style1">
            </div>
            <div class="col-md-1" id="divider">
                OR
            </div>
            <div class="col-md-3">
                <hr class="style1">
            </div>
        </div>

        <strong>Browse our list</strong>
        <br><br>


            <nav aria-label="Page navigation example">
                <ul class="pagination flex-wrap justify-content-md-center" id="pagination">

                </ul>
                <ul class="list-group" id="pokemon-list">

                </ul>
            </nav>  
    

    </div>

    <div class="row justify-content-md-center" id="bottom-navbuttons-row">
        <div class="col-md-2 not-display nav-container">
        <button type="button" class="nes-btn is-warning nav-buttons" id="nav-top-button">Go to top</button>
        </div>
    </div>
</div>

<div class="fixed-footer fixed" id="footer">
    <div class="row">
        <div class="col-md-5">
            <div class="container">2020 &copy; Paula Melli</div>  
        </div>
        <div class="col-md-3">
            <strong>CATEGORIES</strong>
        </div>
        <div class="col-md-3">
            <strong>SITE INFO</strong>
        </div>
    </div>
    <div class="separator">

    </div>

    <div class="row">
        <div class="col-md-5"> 
        </div>
        <div class="col-md-3">
            <a href="#" style="text-decoration:none">Pokedex</a>
        </div>
        <div class="col-md-3">
            <a href="https://pokeapi.co/" style="text-decoration:none">PokeApi</a>
        </div>
    </div>
    <div class="separator">

    </div>

    <div class="row">
        <div class="col-md-5"> 
        </div>
        <div class="col-md-3">
            <a href="#" style="text-decoration:none">Berrydex</a>
        </div>
        <div class="col-md-3">
            <a href="https://github.com/pvmelli" style="text-decoration:none">pvmelli</a>
        </div>
    </div>
    <div class="separator">

    </div>
    <div class="row">
        <div class="col-md-5"> 
        </div>
        <div class="col-md-3">
        </div>
        <div class="col-md-3">
            <i class="nes-icon facebook is-small"></i>
            <i class="nes-icon twitter is-small"></i>
            <i class="nes-icon youtube is-small"></i>
        </div>
    </div>
  

</div>
</div>
`

