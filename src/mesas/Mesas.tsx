import React from 'react';
import { Mesa } from './Mesa';

export class Mesas extends React.Component {
  mesas = [
    {
      id: 'a1',
      nome: 'Nemesis 19h',
      participantes: ['Capitão', 'Pilota', 'Soldado', 'Mecânico', 'Batedora'],
    },
  ];

  render() {
    return (
      <div>
        Oi das {this.mesas.length} mesas
        {this.mesas.map((mesa) => (
          <Mesa
            id={mesa.id}
            nome={mesa.nome}
            participantes={mesa.participantes}
          />
        ))}
      </div>
    );
  }
}
