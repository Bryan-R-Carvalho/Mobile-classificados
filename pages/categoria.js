import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, Table, TextInput } from 'react-native';
import { DataTable, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const server = 'https://classificados-back.herokuapp.com';//https://classificados-back.herokuapp.com http://localhost:8080

const style = StyleSheet.create({
    button: {
        padding: 0,
        margin: 0,
        alignItems: "center",
        width: '100%',
        height: '100%',
    }
})

export default class Categoria extends Component {
    state = {
        id: "",
        nome: "",
        categorias: [],
        incluindo: true,
        alterando: false
    }

    txtId_change = (event) => {
        this.setState({ id: event.target.value })
    }
    txtNome_change = (event) => {
        this.setState({ nome: event.target.value })
    }

    preencherLista = () => {
        const url = server + '/categorias/'
        fetch(url)
            .then(response =>
                response.json().then(data => {
                    this.setState({ categorias: data })
                })
            )
    }

    componentDidMount() {
        this.preencherLista()
    }

    iniciarNovo = () => {
        this.setState({ incluindo: true, nome: '' })
    }
    iniciarAlterar = (categoria) => {
        this.setState({
            incluindo: false,
            alterando: true,
            id: categoria.id,
            nome: categoria.nome,
        })
    }

    gravarNovo = () => {
        const dados = {
            "nome": this.state.nome
        }
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(dados)
        };
        const url = server + '/categorias/'

        fetch(url, requestOptions)
            .then(resp => {
                this.setState({ incluindo: true });
                this.preencherLista();
            })
            .catch(erro => console.log(erro))
    }

    gravarAlterar = (categoria) => {
        const dados = {
            "id": this.state.id,
            "nome": this.state.nome
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        };
        const url = server + '/categorias/'

        fetch(url, requestOptions)
            .then(resp => {
                this.setState({ alterando: false, incluindo: true })
                this.preencherLista()
            })
            .catch(erro => console.log(erro))
    }

    excluir = (categoria) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const url = server + "/categorias/" + categoria.id
        fetch(url, requestOptions)
            .then(this.preencherLista())
            .catch(erro => console.log(erro))
    }

    renderIncluir = () => {
        return (
            <View className="container-fluid">
                <View className="container-xl w-75 h-75 p-4">
                    <Text className="d-inline m-auto">Lista de categorias</Text>
                    <DataTable className="table-auto border-separate border border-slate-500 p-1 bg-[#f5f5f5] ">
                        <DataTable.Header className=" border-collapse border border-slate-500 bg-slate-300 ">
                            <DataTable.Title className=" border-collapse border border-slate-500"  >ID</DataTable.Title>
                            <DataTable.Title className=" border-collapse border border-slate-500">Nome</DataTable.Title>
                            <DataTable.Title className=" border-collapse border border-slate-500" >A????es</DataTable.Title>
                        </DataTable.Header>

                        {this.state.categorias &&
                            this.state.categorias.map(categoria => {
                                return (
                                    <DataTable.Row className="" key={categoria.id}>
                                        <DataTable.Cell className="px-8" >{categoria.id}</DataTable.Cell>
                                        <DataTable.Cell className="px-8">{categoria.nome}</DataTable.Cell>
                                        <DataTable.Cell style={style.button} >
                                            <Icon.Button

                                                name="edit"
                                                backgroundColor="#4285F4"
                                                color="#000"
                                        
                                                onPress={() => this.iniciarAlterar(categoria)}
                                            />
                                            <Icon.Button

                                                name="delete"
                                                backgroundColor="#DB4437"
                                                color="#000"
                                                type="button"
                                                className=""
                                                onPress={() => this.excluir(categoria)}
                                            />
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                )
                            })}
                    </DataTable>
                </View>
                <View className="container-sm ">
                    <Text className="d-inline  ">Cadastrar categorias</Text>
                    <View className="row flex px-5">
                        <TextInput
                            value={this.state.nome}
                            onChange={this.txtNome_change}
                            type="text" className="col-lg form-control-lg"
                            placeholder="Nome"
                        />
                        <Button
                            type="button"
                            className="btn col-sm mx-5 btn-outline-primary btn-sm"
                            onPress={() => this.gravarNovo()}
                            title="SALVAR"
                        />
                    </View>
                </View>
            </View>
        )
    }

    renderAlterar = () => {
        return (
            <View className="container-fluid ">
                <View className="container-xl containerCategoria pb-4 ">
                    <Text className="d-inline m-auto ">Lista de categorias</Text>

                    <DataTable className="table-auto border-separate border border-slate-500 p-1">
                        <DataTable.Header className=" border-collapse border border-slate-500 bg-slate-300">
                            <DataTable.Title className=" border-collapse border border-slate-500" >ID</DataTable.Title>
                            <DataTable.Title className=" border-collapse border border-slate-500">Nome</DataTable.Title>
                            <DataTable.Title className=" border-collapse border border-slate-500" >A????es</DataTable.Title>
                        </DataTable.Header>
                        <DataTable.Row>
                            {this.state.categorias &&
                                this.state.categorias.map(categoria => {
                                    return (
                                        <View className="" key={categoria.id}>
                                            <DataTable.Cell className="px-8" >{categoria.id}</DataTable.Cell>
                                            <DataTable.Cell className="px-8">{categoria.nome}</DataTable.Cell>
                                            <DataTable.Cell>
                                                <Button
                                                    type="button"
                                                    className=" mr-1 px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-black"
                                                    onPress={() => this.iniciarAlterar(categoria)}
                                                    title="Alterar"
                                                >Alterar</Button>
                                                <Button
                                                    type="button"
                                                    className="px-3 py-1 bg-red-500 text-white rounded-lg"
                                                    onPress={() => this.excluir(categoria)}
                                                    title="Excluir"
                                                />
                                            </DataTable.Cell>
                                        </View>
                                    )
                                })}
                        </DataTable.Row>
                    </DataTable>
                </View>
                <View className="container-sm ">
                    <Text className="d-inline m-auto ">Cadastrar categorias</Text>
                   
                        <TextInput
                            value={this.state.nome}
                            onChange={this.txtNome_change}
                            type="text"
                            className="col-lg form-control-lg"
                            placeholder="Nome"
                        />
                        <Icon.Button
                            type="button"
                            className="btn col-sm mx-5 btn-outline-primary btn-sm"
                            onPress={() => this.gravarAlterar()}
                            title="SALVAR"
                        />
                        <Icon.Button
                            type="button"
                            className="btn col-sm btn-outline-secondary btn-sm"
                            onPress={() => this.iniciarNovo()}
                            title="DESFAZER"
                        />
                </View>
            </View>
        )
    }
    render() {
        let pagina = ''

        if (this.state.incluindo) {
            pagina = this.renderIncluir()
        } else {
            if (this.state.alterando) {
                pagina = this.renderAlterar()
            }
        }
        return pagina
    }
}

