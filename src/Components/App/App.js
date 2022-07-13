import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import SpotifyIcon from '../../util/icons8-spotify.svg';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      SearchResults:[],
      playlistName:'My Playlist',
      playlistTracks:[]
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  addTrack(track){
    let tracks=this.state.playlistTracks;
    if(tracks.find(savedTrack =>savedTrack.id === track.id)){
      return;
    }
    tracks.push(track);
    this.setState({playlistTracks:tracks});
  }

  removeTrack(track){
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({playlistTracks:tracks});
  }


  updatePlaylistName(name){
    this.setState({playlistName:name});
  }


  savePlaylist(){
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(()=>{
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  search(term){
    Spotify.search(term).then(results =>{
      this.setState({SearchResults: results});
    })
  }

  render(){
    return (
      <div>
        <h1>Hi<span className="highlight">tt</span>s_</h1>
       
        <div className="App">
        <h3 
        style={{textAlign: 'center', 
        padding: '2rem', 
        fontSize: '1.25rem'}}>
          Add songs to playlist and save into
          <span 
          style={{display: 'block', 
          color: 'green', 
          fontSize: '1.5rem', 
          fontWeight: '700',
          }}>
            Spotify <img src={SpotifyIcon} atl="spotify"></img>
          </span>
        </h3>
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
          <SearchResults searchResults={this.state.SearchResults} 
          onAdd={this.addTrack}
          />
          <Playlist playlistName={this.state.playlistName} 
          playlistTracks={this.state.playlistTracks} 
          onRemove={this.removeTrack}
          onNameChange={this.updatePlaylistName}
          onSave={this.savePlaylist}
          />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
