class Songs {
  constructor() {
    this.songs = [];
    this.artist = [];
  }
  insert(name, artist) {
    this.songs.push(name);
    this.artist.push(artist);
  }
  pull() {
    return this.songs;
  }
}
let yourSongs = new Songs();
yourSongs.insert("1245", "Etham");
yourSongs.insert("I'm_coming_home", "Skylar_Grey");
yourSongs.insert("Best_day_of_my_life", "American_Authors");
yourSongs.insert("Someone_to_you", "Banners");
yourSongs.insert("Take_yours,_i'll_take_mine", "Matthew_Mole");

export default yourSongs;
