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
            // console.log('project', project.gsx$title.$t)
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

function app(projects) {
    console.log('app - projects', projects)
    // the rest of your app goes here
}