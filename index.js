const fs = require("fs");

class Container {
  constructor(file) {
    this.file = file;
  }

  async save(object) {

    const dataToParse = await fs.readFileSync(this.file, "utf-8");
    const dataParsed = JSON.parse(dataToParse);
    const productFound = dataParsed.find(({ title }) => title == object.title);

    try {
      if (productFound) {
        console.log("El producto ya esta cargado");
      } else {
        object.id = dataParsed.length + 1;
        dataParsed.push(object);
        const updatedFile = JSON.stringify(dataParsed, null, " ");
        fs.writeFileSync(this.file, updatedFile);
        console.log(
          `Se ha añadido: ${object.title} y su id es ${object.id}`
        );
        return object.id;
      }
    } catch (error) {
      console.log(`Error en save:${error}`);
    }
  }

  async getById(idEntered) {
    const dataToParse = await fs.readFileSync(this.file, "utf-8");
    const dataParsed = JSON.parse(dataToParse);
    const idFound = dataParsed.find(({ id }) => id === idEntered);

    try {
      if (idFound) {
        console.table(idFound);
        return idFound;
      } else {
        console.log("No se encontró el producto");
        return null;
      }
    } catch (error) {
      console.error(`Error en getByID: ${error}`);
    }
  }

  async getAll() {
    const dataToParse = await fs.readFileSync(this.file, "utf-8");
    const dataParsed = JSON.parse(dataToParse);
    try {
      if (dataParsed.length > 0) {
        console.log(dataParsed);
        return dataParsed;
      } else {
        console.log("No tienes elementos en lista");
      }
    } catch (error) {
      console.error(`Error sobre la función getAll: ${error}`);
    }
  }

  async deleteById(idEntered) {
    const dataToParse = await fs.readFileSync(this.file, "utf-8");
    const dataParsed = JSON.parse(dataToParse);
    const leakedID = dataParsed.filter(({id}) =>  id !== idEntered);
    const idFound = dataParsed.find(({ id }) => id === idEntered);
    try {
      if (idFound) {
        console.log(`Se eliminó el objeto que tenía el id:${idEntered} >> [[${idFound.title}]]`)
        const updatedFile = JSON.stringify(leakedID, null, " ");
        fs.writeFileSync(this.file, updatedFile);
        
      } else {
        console.log(`No se encontró el objeto con id: ${idEntered}`);
      }
    } catch (error) {
      console.log(`Error en deleteById: ${error}`)
    }
  }

  async deleteAll() {
    console.log("Se han eliminado todos los objetos")
    await fs.writeFileSync(this.file, "[]")
  }
}

const file = "./productos.json";
const contenedor = new Container(file);

let newProduct = {
  title: "remera verde",
  price: 3000,
  thumbnail:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6w4QHhbWYrqQGc97k6epTuRtN9Bla95EW5w&usqp=CAU",
};
contenedor.save(newProduct); 