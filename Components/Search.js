import React from 'react'// importation librairie react
import { StyleSheet, View, Button, TextInput, Image, FlatList, Text, ActivityIndicator } from 'react-native'//permet d'utiliser les components react native
import FilmItem from './FilmItem.js'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi' //import {} from.. car c'est un export nommé dans TMDBApi


class Search extends React.Component {//Création d'une classe qui herite de React.Component

  constructor(props) {
    super(props)
    this.searchedText = "" //Initialisation de notre donnée searchedText dans le state
    this.page = 0 //Numéro de la page courante
    this.totalPages = 0 // Nombre pages totales
    this.state = {
      films: [],
      isLoading: false
    }
  }

  _loadFilms() {
    console.log(this.searchedText) //Un log pour vérifier qu'on a bien le texte du TextInput
    if (this.searchedText.length > 0){ //Text recherché non vide
      this.setState({ isLoading: true})
      getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
        this.page = data.page
        this.totalPages = data.total_pages
        this.setState({
          films:[ ...this.state.films, ...data.results],
          isLoading: false
        })
      })
    }
  }
  _searchFilms(){
    this.page=0
    this.totalPages=0
    this.setState({
      films:[],
    }, ()=>{
        console.log("Page : " + this.page + " / TotalPages : " +
        this.totalPages + " / Nombre de films : " + this.state.films.length)
    this._loadFilms()
    })
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large'/>
        </View>
      )
    }
  }
  _searchTextInputChanged(text) {
    this.searchedText = text
  }

  _displayDetailForFilm = (idFilm) => {
    console.log("Display film with id " + idFilm)
    this.props.navigation.navigate("FilmDetail", { idFilm: idFilm})
  }

  render() {//permet de rendre un élément graphique. Obligé d'écrire render() et définir son rendu
    console.log(this.props)
    return (
      <View style={styles.main_container}>
        <TextInput
        style={styles.textinput}
        placeholder=" Titre du film"
        onSubmitEditing={() => this._searchFilms()}
        onChangeText={(text) => this._searchTextInputChanged(text)}
        />
        <Button style={{ height: 50}} title="Rechercher" onPress={() => this._searchFilms()}/>
        <FlatList
        data={this.state.films}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => <FilmItem film={item} displayDetailForFilm={this._displayDetailForFilm}/>}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if(this.page < this.totalPages) {
            this._loadFilms()
          }
        }}
        />
        {this._displayLoading()}
      </View>
      //placeholder permet d'écrire un texte par défaut
      //Création d'un boutton appelé "Rechercher" qui produit une action quand on clique dessus
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex:1
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft:1
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 100,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Search
