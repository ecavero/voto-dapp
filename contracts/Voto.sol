pragma solidity ^0.5.1;

contract Voto {
    struct Partido {
        uint id;
        string nombre;
        uint numeroDeVotos;
    }
    mapping (uint => Partido) public partidos;
    uint public nroPartidos;
    mapping (address => bool) public electores;

    constructor() public {
        partidos[0] = Partido(0, 'Peruanos por el Kambio',0);
        partidos[1] = Partido(1, 'Fuerza Popular',0);
        nroPartidos = 2;
    }

    function votar(uint _numero) public {
        Partido memory _partido = partidos[_numero];
        _partido.numeroDeVotos++;
        partidos[_numero] = _partido;
        electores[msg.sender] = true;
    }

}
