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

function app(projects) {
    console.log('app - projects', projects)
    
    const $projDiv = $('#projDiv')

    for(let i = 0; i < projects.length; i++) {
        let $a = $('<a>')
        $a.attr('href', projects[i].url).attr('target','_blank')
        let $imageDiv = $('<div>')
        $imageDiv.addClass('projImage')
        let $img = $('<img>')
        $img.attr('src', projects[i].image)        
        let $projInfo = $('<div>')
        $projInfo.addClass('showInfo')
        let $h3 = $('<h3>')
        $h3.text(projects[i].title)
        let $p = $('<p>')
        $p.text(projects[i].description)
        $a.append($imageDiv)
        $imageDiv.append($img)
        $imageDiv.append($projInfo)
        $projDiv.append($a)
        $projInfo.append($h3).append($p)
    }
}

$('body').on('click', function () {
    $('.navbar-collapse').collapse('hide')
})
