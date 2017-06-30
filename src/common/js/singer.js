export default class Singer {
  constructor ({name, id, img}) {
    this.name = name;
    this.id = id;
    this.img = `http://y.gtimg.cn/music/photo_new/T001R150x150M000${img}.jpg?max_age=2592000`;
  }
}