import React, { useState } from 'react';
import { flights } from '../data/flightsArray';
import { airports } from '../data/airportsArray';
import '../styles/browser.scss';

const Browser = () => {
  //Use state - przechwycenie wartości z inputów
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");

  //Stworzenie listy lotnisk z tablicy w pliku airportsArray.js
  let options = airports.map((val) => {
    return (
      <option key={val.id} value={val.value}>{val.name}</option>
    )
  });

  //Klasa Graph z funkcja addEdge odpowiadającą za dodawanie 'wirtualnych' gałęzi grafu. 
  class Graph {
    constructor() {
      var neighbors = this.neighbors = {};

      this.addEdge = function (u, v) {
        
        if (neighbors[u] === undefined) {
          neighbors[u] = [];
        }
        neighbors[u].push(v);
        if (neighbors[v] === undefined) {
          neighbors[v] = [];
        }
        neighbors[v].push(u);
      };

      return this;
    }
  }

  // Funkcja ma jako argumenty klase Graph wraz z wszystkimi dodanymi krawędziami,
  // miejsce wylotu i miejsce przylotu. Następnie dzięki algorytmowi BFS(breadth-first search)
  // analizuje wszystkie krawędzie grafu i zwraca tablice zawierającą kolejne lotniska trasy.
  function shortestPath(graph, source, target) {
    //Walidacja inputów
    if(source === '' || target === '') {
      return print('Uzupełnij pola, abyśmy mogli pokazać Ci możliwe trasy!')
    } else if (source === target) {
      return print('Miejsca wylotu i przylotu są takie same!');
    }

    document.getElementById('info').innerHTML = "Tak przedstawia się Twoja trasa";
    document.getElementById('infoSecond').innerHTML = "Kup bilet na poszczególne loty:";

    //Sortowanie
    var queue = [ source ],
        visited = { source: true },
        predecessor = {},
        tail = 0;
    while (tail < queue.length) {
      var u = queue[tail++],
          neighbors = graph.neighbors[u];
      for (var i = 0; i < neighbors.length; ++i) {
        var v = neighbors[i];
        if (visited[v]) {
          continue;
        }
        visited[v] = true;
        if (v === target) {
          var path = [ v ];
          while (u !== source) {
            path.push(u);
            u = predecessor[u];
          }
          path.push(u);
          path.reverse();

          //Pokazanie trasy
          print(path.join(' &rarr; '));

          //Pokazanie poszczególnych lotów
          addFlight(path);
          return;
        }
        predecessor[v] = u;
        queue.push(v);
      }
    }
    print('there is no path from ' + source + ' to ' + target);
  }

  //Funkcja pokazująca na ekranie trase oraz wywołująca animacje
  function print(s) {
    show();
    document.getElementById('display').innerHTML = "";
    s = s || '';
    document.getElementById('display').innerHTML += s + '<br>';
  }

  //Animacja wyjazdu
  function show() {
    document.getElementById('nearestPath').classList.add('display');
  }

  //Pokazanie poszczególnych lotów na trasie
  function addFlight(path){
    let div = document.getElementById('flightsContainer');
    let flightsNames = []

    //Zmiana, żeby w tablicy nie było skrótów tylko pełne nazwy lotnisk
    for(let i = 0; i < path.length; i++) {
      for(let x = 0; x < airports.length; x++){
        if(path[i] === airports[x].value) {
          flightsNames.push(airports[x].name);
        }
      }
    }

    div.innerHTML = '';

    //Wpisanie wszystkich poszczególnych lotów na ekranie.
    for(let i = 0; i < flightsNames.length - 1; i++) {
          div.innerHTML += `
          <div class="flight">
            <p class="flight__infos">Miejsce wylotu</p>
            <p class="flight__infos">Miejsce przylotu</p>
            <p class="flight__way">`+ flightsNames[i] +`</p>
            <p class="flight__way">`+ flightsNames[i + 1] +`</p>
            <p class="flight__button">Sprawdź hotele</p>
            <p class="flight__button">Kup bilet</p>
          </div>
        `
    }
  }
  
  //Funkcja odpowiadające za stworzenie krawędzi grafu i wywołanie funkcji szukającej ścieżki
  function checkFlights() {
    var graph = new Graph();

    //Pobrane loty z pliku flightsArray.js dodaje do funkcji tworzącej gałęzie grafu.
    for(let i in flights) {
      graph.addEdge(flights[i].pointA, flights[i].pointB);
    }

    shortestPath(graph, fromValue, toValue);
  };

  return (
    <>
      <div className="browserContainer">
        <div className="browser">
          <div className="browser__select">
            <label className="label">Miejsce wylotu</label>
            <select className="input" onChange={function(e) {setFromValue(e.target.value);}}>
                {options}
            </select>
          </div>
          <div className="browser__select">
            <label className="label">Miejsce przylotu</label>
            <select className="input" onChange={function(e) {setToValue(e.target.value);}}>
                {options}
            </select>
          </div>
          <button className="browser__button" onClick={checkFlights}>Sprawdz</button>
        </div>
      </div>
      <div id="nearestPath" className="hide">
        <div className="path">
          <p id="info" className="path__info"></p>
          <div className="path__flights" id="display"></div>
          <p id="infoSecond" className="path__info"></p>
        </div>
        <div id="flightsContainer" className="flights"></div>
      </div>
    </>
  );
}

export default Browser;
