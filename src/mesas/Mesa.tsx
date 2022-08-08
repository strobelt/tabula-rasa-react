import React, { Component } from 'react';

export type MesaProps = { id: string; nome: string; participantes: string[] };

export class Mesa extends Component<MesaProps> {
  render() {
    const mesa = this.props;
    return (
      <div>
        <h2>
          {mesa.id} - {mesa.nome}
        </h2>
        <ul>
          {mesa.participantes.map((nome) => (
            <li>{nome}</li>
          ))}
        </ul>
      </div>
    );
  }
}
