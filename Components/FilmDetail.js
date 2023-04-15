//Components/FilmDetail.js

import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { getFilmDetailFromApi } from '../API/TMDBApi'

class FilmDetail extends React.Component {
  constructor(props){
    super(props)
    this.state={
      film: undefined,//informations du film
      isLoading: true//A l'ouverture de la vue on affiche le chargement
    }
  }

_displayLoading() {
  if (this.state.isLoading){
    return (
      <View style={styles.loading_container}>
        <ActivityIndicator size='large'/>
      </View>
    )
  }
}

componentDidMount() {
  console.log("Component FilmDetail monté")
  getFilmDetailFromApi(this.props.navigation.stats.params.idFilm).then(data =>
  {
        this.setState({
          film: data,
          isLoading: false
        })
  })
}



  render() {
    console.log("Component FilmDetail rendu")
    return (
      <View style={styles.main_container}>
       {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  loading_container: {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  alignItems: 'center',
  justifyContent: 'center'
  }
})

export default FilmDetail
