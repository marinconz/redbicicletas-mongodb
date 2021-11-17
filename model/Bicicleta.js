let Bicicleta = function (id, color, modelo, ubicacion) {
  this.id = id;
  this.color = color;
  this.modelo = modelo;
  this.ubicacion = ubicacion;
};

const mongo = require('./actions')

Bicicleta.prototype.toString = function () {
  return `id: ${this.id} | color: ${this.color}`;
};

Bicicleta.allBicis = function () {
  return mongo.allBicis();
};

Bicicleta.add = function (aBici) {
  mongo.insertData(aBici)
};

Bicicleta.allPoints = function () {
  return new Promise(function(resolve, reject){ 
    mongo.allBicisLocation().then(
      res=>{
        var locations = []
        for (let key in res) {
          locations.push(res[key].ubicacion)
        }
        resolve(locations)
      })
  });
};

Bicicleta.findById = function (aBiciId) {
  return new Promise(function(resolve, reject){ 
    mongo.findId(aBiciId).then(res=>{
      if (res[0]) resolve(res[0]);
      else reject(`No existe una Bicicleta con el id: ${aBiciId}`);
    })
  });
};

Bicicleta.update = function (bici) {
  newvals={
    color:bici.color,
    modelo:bici.modelo,
    ubicacion:bici.ubicacion,
  }
  return mongo.updateBici(bici.id,newvals);
};

Bicicleta.removeById = function (aBiciId) {
  return mongo.deleteBici(aBiciId);
};

module.exports = Bicicleta;