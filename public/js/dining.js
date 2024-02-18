document.getElementById('button-menu').addEventListener('click', function () {
    gsap.to('.cocktail-builder', {
        x: '-100%',
    })
    gsap.to('.restaurant-menu', {
        x: 0,
        duration: 0.5,
        onComplete: function () {
            gsap.to('.menu__list li', {
                y: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.1,
            })
        }
    })
});

document.getElementById('menu-close').addEventListener('click', function () {
    gsap.to('.restaurant-menu', {
        x: '100%',
        duration: 0.5,
        onComplete: function () {
            document.querySelectorAll('.menu__list li').forEach(function (li) {
                li.style.opacity = 0;
                li.style.transform = 'translateY(20px)';
            })
        }
    })
})

document.getElementById('button-cocktails').addEventListener('click', function () {
    gsap.to('.cocktail-builder', {
        x: 0,
        duration: 0.5,
    })
})

document.getElementById('cocktail-close').addEventListener('click', function () {
    gsap.to('.cocktail-builder', {
        x: '-100%',
        duration: 0.5,
    })
})

var cocktailIngredients = []
var labsSearch = document.getElementById('labs-search');
var labsResults = document.getElementById('labs-results');
var labsList = document.getElementById('labs-list');
var nextStep = document.getElementById('next-step');

for (var i = 1; i < 5; i++) {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=' + i)
        .then(response => response.json())
        .then(data => {
            var ingr = data.ingredients[0].strIngredient
            labsResults.innerHTML += `<li onclick="addIngredient('${ingr}')" data-ingr="${ingr}">${ingr}</li>`
        })
}

function addIngredient(ingredient) {
    if (cocktailIngredients.includes(ingredient)) {
        document.querySelector(`[data-ingr="${ingredient}"]`).style.display = 'none'
    } else {
        cocktailIngredients.push(ingredient)
        document.querySelector(`[data-ingr="${ingredient}"]`).style.display = 'none'
        labsList.innerHTML += `<li onclick="removeIngredient('${ingredient}')" data-ingr="${ingredient}">${ingredient}</li>`
    }
    nextStep.removeAttribute('disabled')
}

function removeIngredient(ingredient) {
    cocktailIngredients = cocktailIngredients.filter(ingr => ingr !== ingredient)
    document.querySelector(`[data-ingr="${ingredient}"]`).style.display = 'block'
    document.querySelector(`[data-ingr="${ingredient}"]`).remove()

    if (cocktailIngredients.length === 0) {
        nextStep.setAttribute('disabled', 'disabled')
    }
}

function fetchData(ingredient) {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?i=' + ingredient)
        .then(response => response.json())
        .then(data => {
            if (data.ingredients) {
                data.ingredients.forEach(ingredient => {
                    if (cocktailIngredients.includes(ingredient.strIngredient) === false) {
                        labsResults.innerHTML += `<li onclick="addIngredient('${ingredient.strIngredient}')" data-ingr="${ingredient.strIngredient}">${ingredient.strIngredient}</li>`
                    }
                })
                document.querySelector('.cocktail__labs').scrollTo(0, document.querySelector('.cocktail__labs').scrollHeight)
            }
        })
}

var timeout = null;
labsSearch.addEventListener('input', function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
        labsResults.innerHTML = '';

        fetchData(labsSearch.value)

    }, 500)
})

nextStep.addEventListener('click', function () {
    fetch('/api/cocktail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients: cocktailIngredients }),
    }).then(response => response.json())
    .then(json => {
        document.getElementById('cocktail-qr').src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${window.location.origin}/cocktail/${json.id}`
        gsap.to('.cocktail__labs', {
            opacity: 0,
            display: 'none',
            onComplete: function () {
                gsap.to('.cocktail__qr', {
                    opacity: 1,
                    display: 'block',
                })
            }
        })
    })
    .catch(err => {
        alert('Une erreur est survenue. Veuillez réessayer plus tard.')
        window.location.reload()
    })
})