import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

import ProdutosHome from './ProdutosHome'
import Categoria from './Categoria'


class Produtos extends Component {
    constructor (props){
        super(props)
        
        this.renderCategoria = this.renderCategoria.bind(this)
        this.handleNewCategoria = this.handleNewCategoria.bind(this)
    }
    
    
    componentDidMount (){
        this.props.loadCategorias()
    }


    renderCategoria(cat){
        return (
            <li key={cat.id}>
                <button className='btn btn-xs' onClick={()=>this.props.removeCategoria(cat)}>
                    <span className='glyphicon glyphicon-remove'></span>
                </button>
                <Link to={`/produtos/categoria/${cat.id}`}>{cat.categoria}</Link>
            </li>
        )
    }

    handleNewCategoria(key) {
        if(key.keyCode === 13) {
            this.props.createCategoria({
                categoria: this.refs.categoria.value
            })
            this.refs.categoria.value = ''
        }    
    }
    render() {
        const { match, categorias } = this.props
        return (
            <div className='row'>
                <div className='col-md-2'>
                    <h3>Categorias</h3>
                    <ul>
                    {categorias.map(this.renderCategoria)}
                    </ul>
                    <div className='well well-sm'>
                        <input 
                            onKeyUp={this.handleNewCategoria}
                            type='text'
                            className='form-control' 
                            ref='categoria' 
                            placeholder='Nova Categoria' />
                    </div>
                </div>
                <div className='col-md-10'>
                    <h1>Produtos</h1>
                    <Route exact path={match.url} component={ProdutosHome} />
                    <Route exact path={match.url+'/categoria/:catId'} component={Categoria} />
                </div>
            </div>
        )
    }
}
export default Produtos