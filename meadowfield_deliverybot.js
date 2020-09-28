/*
this script mimicks the travelling of a bot delivering presents in a town represented as graph
*/

function buildGraph(edges){
    graph = Object.create(null);
    function addEdge(s,d){
        if(graph[s] == null){
            graph[s] = [d];
        }
        else{
            graph[s].push(d);
        }
    }
    for(var [s,d] in edges.map(r => r.split("-"))){
        addEdge(s,d);
        addEdge(d,s);
    }
    return graph;
}

const roads = [
    "Alice's House-Bob's House",
    "Alice's House-Post Office",
    "Daria's House-Ernie's House",
    "Ernie's House-Grete's House",
    "Grete's House-Shop",
    "Marketplace-Post Office",
    "Marketplace-Town Hall",
    "Alice's House-Cabin",
    "Bob's House-Town Hall",
    "Daria's House-Town Hall",
    "Grete's House-Farm",
    "Marketplace-Farm",
    "Marketplace-Shop",
    "Shop-Town Hall"
];

var roadGraph = buildGraph(roads);
var allplaces = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
    ];
var visited = {}
for(var p in allplaces){
    visited[p] = false;
}
var parcels = [
    {place : "", destination:"Ernie's House" },
    {place : "", destination:"Post Office" },
    {place : "", destination:"Grete's House" },
    {place : "", destination:"Alice's House" },
    {place : "", destination:"Post Office" },
    {place : "", destination:"Farm" },
    {place : "", destination:"Cabin" }
]
// The state of the village is continously created. Not very efficient on memory :(

class VillageState{
    constructor(place, parcels){
        this.place = place;
        this.parcels = parcels;
    }

    move(destination){
        if(!roadGraph[s].includes(destination)) return this // if there is no path between this place and destination, leave the state as it is.
        else{
            /*
                the new place for the village state would be the destination
                we must make a new list of parcels that must be delivered.
                map function - if a parcel is not on this place, then leave it unchanged.
                               else make the place of the parcels as the destination
                filter function - drop those parcels whose address is the same as destination place.
            */
            let parcels = this.parcels.map(p => {
                if(p.place != this.place) return p;
                return {place: destination, address: p.address};
            }).filter(p => p.place != p.address);
            return new VillageState(destination, parcels);
        }
    }
}

var startfrom = "Post Office";
for(var p in parcels){
    p.place = startfrom;
}
var initial = new VillageState(startfrom, parcels);

function depthfirstsearch(vs){
    if(visited[vs.place]) return ;
    visited[vs.place] = true;
    for(var d in roadGraph[vs.place]){
        vs = vs.move(d);
        depthfirstsearch(vs);
    }
    return ;
}
