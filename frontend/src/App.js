import React from 'react';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      candidates: [],
    };
  }

  render() {
    const { candidates } = this.state;

    // if (candidates.length === 0) {
    //   return <p>Carregando...</p>;
    // }

    return (<div>
    <header className="app-header"></header>
    <Title />
    <div className="app-card-list" id="app-card-list">
      {
        candidates.map(candidate => {
        const { id, name, votes, percentage } = candidate;       
        return <Card key={id} index={id} details={candidate}/>;     
      })}
  </div>
  </div>
  )}

  async componentDidMount() {
    setInterval(async () => {
      const res = await fetch("http://localhost:8080/votes");
      const json = await res.json();

      this.setState({ candidates: json.candidates });
    }, 1000);
  }
}

class Title extends React.Component {
  render() {
    return <section className="app-title">
      <div className="app-title-content">
        <h1>Votação</h1>
        <p>Acompanhe aqui o resultado em tempo real!</p>
      </div>
    </section>
  }
}


class Button extends React.Component {
  render() {
    return (
      <button className="button button-primary">
        <i className="fa fa-chevron-right"></i> + detalhes
      </button>
    )
  }
}


class CardHeader extends React.Component {
  render() {
    const { category, image } = this.props;
    var style = { 
        backgroundImage: 'url(' + image + ')',     
    };
    return (
      <header style={style} className="card-header">
        <h4 className="card-header--title">{category}</h4>
      </header>
    )
  }
}


class CardBody extends React.Component {
  render() {
    var n = new Date(Date.now()).toDateString();
    return (
      <div className="card-body">
        <p className="date">{n}</p>
        
        <h2>{this.props.title}</h2>
        
        <p className="body-content">{this.props.text + "%"}</p>
        
        <Button />
      </div>
    )
  }
}


class Card extends React.Component {
  render() {
    return (
      <article className="card">
        <CardHeader category='Personagem' image={this.props.details.id + '.jpg'}/>
        <CardBody title={this.props.details.name} text={this.props.details.percentage.toFixed(1)}/>
      </article>
    )
  }
}
