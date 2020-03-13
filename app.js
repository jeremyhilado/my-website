console.log('$', $)

let url = 'https://docs.google.com/spreadsheets/d/1TlKP5RsL9Di78UFVrO_7kNCEBDvQXZa1_1LdwngtBrk/edit#gid=0'

let id = '1TlKP5RsL9Di78UFVrO_7kNCEBDvQXZa1_1LdwngtBrk'

let source = `https://spreadsheets.google.com/feeds/list/1TlKP5RsL9Di78UFVrO_7kNCEBDvQXZa1_1LdwngtBrk/od6/public/values?alt=json`

fetch(source)
    .then( response => response.json() ) // this parses the data from string back into an object
    .then( data =>  {
        console.log('data', data)
        // data.feed.entry is the array that stores our projects
        // the projects are stored as objects
        let projects = data.feed.entry.map( project => {
            return {
            title: project.gsx$title.$t,
            image: project.gsx$image.$t,
            description: project.gsx$description.$t,
            url: project.gsx$url.$t
            }
        })
        app(projects)
    })  // this provides us access to the parse data
    .catch( err => console.log('err', err))

const $main = $('main')

// projects.forEach( (project) => {
//     console.log(project)
//     // const $img = $('<img>')
//     // $img.attr('src', projects.image)
// )}

function app(projects) {
    console.log('app - projects', projects)
    
    const $projDiv = $('#projDiv')

    for(let i = 0; i < projects.length; i++) {
        // let $card = $(`<div class="card">
        //     <img src=${projects[i].image} class="card-img-top" alt="...">
        //     <div class="card-body">
        //         <h5 class="card-title">${projects[i].title}</h5>
        //         <p class="card-text">${projects[i].description}</p>
        //         <a href=${projects[i].url} class="btn btn-primary" target="_blank">View Project</a>
        //     </div>
        //     </div>`)
        // $projDiv.append($card)

        let $a = $('<a>')
        $a.attr('href', projects[i].url).attr('target','_blank')
        $projDiv.append($a)
        let $imageDiv = $('<div>')
        // $div.css('background-image', `url('${projects[i].image}')`) 
        $imageDiv.addClass('projImage')
        let $img = $('<img>')
        $img.attr('src', projects[i].image)
        $a.append($imageDiv)
        $imageDiv.append($img)
        // $div.append($img)
        let $projInfo = $('<div>')
        $projInfo.addClass('showInfo')
        let $h3 = $('<h3>')
        $h3.text(projects[i].title)
        let $p = $('<p>')
        $p.text(projects[i].description)
        $projInfo.append($h3).append($p)
    }
}

$('body').on('click', function () {
    $('.navbar-collapse').collapse('hide')
})
