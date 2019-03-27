let data = {
    "movies": [{
            "title": "Diner",
            "cast": [
                "Steve Guttenberg",
                "Daniel Stern",
                "Mickey Rourke",
                "Kevin Bacon",
                "Tim Daly",
                "Ellen Barkin",
                "Paul Reiser",
                "Kathryn Dowling",
                "Michael Tucker",
                "Jessica James",
                "Colette Blonigan",
                "Kelle Kipp",
                "Clement Fowler",
                "Claudia Cron"
            ]
        },
        {
            "title": "Footloose",
            "cast": [
                "Kevin Bacon",
                "Lori Singer",
                "Dianne Wiest",
                "John Lithgow",
                "Sarah Jessica Parker",
                "Chris Penn",
                "Frances Lee McCain",
                "Jim Youngs",
                "John Laughlin",
                "Lynne Marta",
                "Douglas Dirkson"
            ]
        },
        {
            "title": "Flatliners",
            "cast": [
                "Kiefer Sutherland",
                "Julia Roberts",
                "Kevin Bacon",
                "William Baldwin",
                "Oliver Platt",
                "Kimberly Scott",
                "Joshua Rudoy",
                "Benjamin Mouton",
                "Hope Davis",
                "Patricia Belcher",
                "Beth Grant"
            ]
        },
        {
            "title": "Eat Pray Love",
            "cast": [
                "Julia Roberts",
                "Javier Bardem",
                "Billy Crudup",
                "Richard Jenkins",
                "Viola Davis",
                "James Franco",
                "Sophie Thompson",
                "Mike O 'Malley",
                "Christine Hakim",
                "Arlene Tur",
                "Hadi Subiyanto",
                "Gita Reddy",
                "Tuva Novotny",
                "Luca Argentero",
                "Rushita Singh"
            ]
        },
        {
            "title": "Spotlight",
            "cast": [
                "Mark Ruffalo",
                "Michael Keaton",
                "Rachel McAdams",
                "Liev Schreiber",
                "John Slattery",
                "Brian d'Arcy James",
                "Stanley Tucci",
                "Gene Amoroso",
                "Jamey Sheridan",
                "Billy Crudup",
                "Maureen Keiller",
                "Richard Jenkins",
                "Paul Guilfoyle",
                "Len Cariou",
                "Neal Huff",
                "Michael Cyril Creighton",
                "Laurie Heineman",
                "Tim Progosh"
            ]
        }
    ]
};

let graph;

window.onload = function() {
    createGraph();
}

function createGraph(){
    graph = new Graph();

    // build graph
    data.movies.map(movie => {
        const movie_node = new Node(movie.title);
        graph.addNode(movie_node);

        movie.cast.map(actor => {
            let actor_node = graph.getNode(actor);
        
            if (!actor_node) {
                actor_node = new Node(actor);
                let option = document.createElement("option");
                option.text = actor;
                $("#selector").append(option);
            }

            graph.addNode(actor_node);
            movie_node.addEdge(actor_node);
        })
    });
}

function bfs() {
    graph.reset();
    $("#path").text("");

    let start = graph.setStart($("#selector").val());
    let end = graph.setEnd("Kevin Bacon");
    let queue = [];

    start.visited = true;
    queue.push(start);

    while (queue.length) {
        let current = queue.shift();
        if (current == end) break;

        current.edges.map(neighbor => {
            if (!neighbor.visited) {
                neighbor.visited = true;
                neighbor.parent = current;
                queue.push(neighbor);
            }
        })
    }

    let path = [];
    let next = end.parent;

    path.push(end);
    while (next != null) {
        path.push(next);
        next = next.parent;
    }
    
    let txt = "";
    for(let i = path.length - 1; i >= 0; i--) {
        let n = path[i];
        txt += n.value.toUpperCase();

        if (i != 0) {
            if      (i < 3 && i % 2 == 0)   txt += " was in "
            else if (i % 2 == 0)            txt += " who was in "
            else                            txt += " with "
        }
    }

    $("#path").text(txt);
    $("#degrees").text(Math.floor(path.length / 2));
}