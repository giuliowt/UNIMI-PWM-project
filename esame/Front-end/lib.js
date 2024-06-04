/* controlla se utente è loggato */
function checkIfLogged() {
    logBtns = document.getElementsByClassName("logbtn")
    if(localStorage.getItem("user")) {
        logBtns[0].classList.remove("d-none")
        logBtns[0].href+=JSON.parse(localStorage.getItem("user")).sessionid
    } else {
        logBtns[1].classList.remove("d-none")
    }
}

/* funzione per effettuare api call */
function getFromMarvel(url, query=""){
    var MD5 = function(d){var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}
    var timestamp = Date.now();
    var publicApiKey = "5e46f300633718f3450b93f5590d9f76"
    var privateApiKey = "c560c9c111c161dea413369e13584712bfa35a8e"
    var parameters = `ts=${timestamp}&apikey=${publicApiKey}&hash=${MD5(timestamp+privateApiKey+publicApiKey)}&`

    return fetch(`http://gateway.marvel.com/v1/${url}?${parameters}${query}`)
        .then(response => response.json())
        .then(response => response.data)
        .catch(error => console.log('error', error));
}

/* funzione per ottenere int randomico */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* funzione per inserire alcune informazioni sugli eroi in N figurine */
function mostraFigurine(eroi, n=-1) {
    clonecontainer = document.getElementById("clonecontainer");
    card = document.getElementById("eroe");

    clonecontainer.innerHTML=""
    clonecontainer.appendChild(card)

    if(n==-1) 
        n=eroi.count /* se non definisco n allora utilizza tutti i risultati trovati */

    for (let i = 0; i < n; i++) {
        clone = card.cloneNode(true);  
        presentCard = clone.getElementsByClassName("card")[0];
        cardImg = clone.getElementsByClassName("card-img")[0];
        cardTitle = clone.getElementsByClassName("card-title")[0];



        /* metto l'href a ogni tag a in quanto vengono modificati rispetto al codice originale nella pagina finale */
        links = clone.getElementsByTagName("a")
        for (let j = 0; j < links.length; j++)
            if(links[j].href.endsWith("heroprofile.html?id="))
                links[j].href+=eroi.results[i].id

        
        presentCard.id=eroi.results[i].id /* collego a ogni figurina il relativo id così da averlo sempre a disposizione */
        cardImg.src=eroi.results[i].thumbnail.path+"."+eroi.results[i].thumbnail.extension;
        cardTitle.innerHTML=eroi.results[i].name;

        
        /* calcola la rarità dell'eroe basandosi sulla quantità di fumetti in cui compare (più volte compare più è raro) */
        if(eroi.results[i].comics.available<=10) {
            presentCard.classList.add("border-success") /* comune */
        } else if(eroi.results[i].comics.available<=50) {
            presentCard.classList.add("border-warning") /* rara */
        } else {
            presentCard.classList.add("border-danger") /* extra rara */
        }

        clone.href+=eroi.results[i].id
        clone.classList.remove("d-none");
        card.after(clone);
    }
}

/* funzione per mostrare le figurine dell' utente nella sezione album */
async function mostraFigurineUtente(id) {
    cardsID = []
    heroes = { /* creo un json utilizzabile dalla funzione mostraFigurine (con proprietà count e results) per sfruttare ancora la funzione */
        count: 0,
        results: []
    }

    await fetch("http://localhost:5500/user/"+id)
        .then(response => response.json())
        .then(response => cardsID=response.cards)

    for (let i = 0; i < cardsID.length; i++) {
        await getFromMarvel("public/characters/"+cardsID[i])
            .then(response => heroes.results.push(response.results[0]))  
    }
    heroes.count = cardsID.length

    mostraFigurine(heroes)
}

/* funzione per vendere figurine */
async function vendiFigurina(figurina){
    card = figurina.parentNode.parentNode
    cardID = card.id
    user = JSON.parse(localStorage.getItem("user"))
    rarity=1

    if(card.classList.contains("border-warning"))
        rarity=2
    if(card.classList.contains("border-danger"))
        rarity=3

    if(confirm("Do you want to sell this card for credit: " + rarity + "?")) {

        user.credit+=rarity
        user.cards.shift(cardID)
        localStorage.setItem("user", JSON.stringify(user))        

        await fetch("http://localhost:5500/change", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": user.sessionid,
                "credit": user.credit,
                "cards": user.cards
            })
        }).then(response => response.text())
          .then(response => alert(response))
        
        location.reload()
    }
}

/* funzione per comprare figurina */
async function compraFigurina(ID) {
    credit = 0
    user = JSON.parse(localStorage.getItem("user"))
    rarity = document.getElementById("rarity")

    if(rarity.innerHTML=="Common")
        rarity=1
    else if(rarity.innerHTML=="Rare")
        rarity=2
    else
        rarity=3

    if(user.credit>=rarity) {
        user.credit-=rarity
        user.cards.push(ID)
        localStorage.setItem("user", JSON.stringify(user))
    } else {
        alert("insufficient credit")
        return
    }

    await fetch("http://localhost:5500/change", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": user.sessionid, 
            "credit": user.credit,
            "cards": user.cards
        })
    }).then(response => response.text())
      .then(response => alert(response))
        
    location.reload()
    
}

/* mostra tutte le informazioni su un eroe */
function mostraEroeCompleto(eroe) {
    heroName = document.getElementsByClassName("card-title")[0]
    heroDesc = document.getElementsByClassName("card-text")[0]
    heroImg = document.getElementsByClassName("card-img-top")[0];
    heroRarity = document.getElementById("rarity")
    heroPrice = document.getElementById("price")
    heroComics = document.getElementById("comics")
    comicsList = document.getElementById("comicslist")
    heroSeries = document.getElementById("series")
    seriesList = document.getElementById("serieslist")
    heroEvents = document.getElementById("events")
    eventsList = document.getElementById("eventslist")

    heroImg.src = eroe.thumbnail.path+"."+eroe.thumbnail.extension
    heroName.innerHTML = eroe.name
    if(eroe.description!="")
        heroDesc.innerHTML = eroe.description
    else
        heroDesc.innerHTML = "no description available"

    /* calcola la rarità dell'eroe basandosi sulla quantità di fumetti in cui compare (più volte compare più è raro) */
    if(eroe.comics.available<=10) {
        heroRarity.innerHTML = "Common" /* comune */
        heroRarity.classList.add("border-success")
        heroRarity.classList.add("text-success")
        heroPrice.innerHTML += "1"
    } else if(eroe.comics.available<=50) {
        heroRarity.innerHTML = "Rare" /* rara */
        heroRarity.classList.add("border-warning")
        heroRarity.classList.add("text-warning")
        heroPrice.innerHTML += "2"
    } else {
        heroRarity.innerHTML = "Epic" /* extra rara */
        heroRarity.classList.add("border-danger")
        heroRarity.classList.add("text-danger")
        heroPrice.innerHTML += "3"
    }

    /* lista i fumetti */
    heroComics.innerHTML += eroe.comics.available
    comic = comicsList.getElementsByClassName("comic")[0]
    for (let i = 0; i < eroe.comics.returned; i++) {
        let clone = comic.cloneNode(true)
        clone.innerHTML=eroe.comics.items[i].name
        comic.after(clone)
        clone.classList.remove("d-none")
    }

    /* lista le serie */
    heroSeries.innerHTML += eroe.series.available
    serie = seriesList.getElementsByClassName("serie")[0]
    for (let i = 0; i < eroe.series.returned; i++) {
        let clone = serie.cloneNode(true)
        clone.innerHTML=eroe.series.items[i].name
        serie.after(clone)
        clone.classList.remove("d-none")
    }

    /* lista gli eventi */
    heroEvents.innerHTML += eroe.events.available
    event = eventsList.getElementsByClassName("event")[0]
    for (let i = 0; i < eroe.events.returned; i++) {
        let clone = event.cloneNode(true)
        clone.innerHTML=eroe.events.items[i].name
        event.after(clone)
        clone.classList.remove("d-none")
    }
}

/* funzione per cercare figurine da cedere nella pagina exchange */
function cercaFigurineDaCedere() {
    heroname = document.getElementById("searchero").value
    if(heroname.length>0)
        getFromMarvel("public/characters", "nameStartsWith="+heroname)
            .then(response => mostraFigurine(response))
    else
        getFromMarvel("public/characters")
            .then(response => mostraFigurine(response))
}  