
interface Usuario {
    nombre: string
    apellido: string
    correo: string
    cedula: string
    username?: string
    password: string
}

interface Proyecto{
    encabezado: Encabezado
    multimedia: Imagen[]
}

//datos generales y portada del proyecto
interface Encabezado{
    nombre: string
    localidad: string
    categoria: string
    portada: Imagen
    descripcion: string
    precio: string
    precio_por_metro: string
    area: string
    dormitorios: number
    banos: number
    


}

interface Miniatura{
    nombre: string
    localidad: string
    categoria: string
    portada: Imagen
    precio: string
    area: string
    dormitorios: number
    banos: number
    precio_por_metro?: string
    descripcion?: string
    multimedia?: Imagen[]
}

//Utilities of MOSAICO-DOCUMENTS
type ResultsPrismic = PrismicDocument[]


interface Texto {
    text: string
}
interface Imagen {
    dimensions: {
        width: number
        height: number
    }
    url: string
    idProyecto?: string
}

//Types of MOSAICO-DOCUMENTS
interface PrismicDocument {
    id: string
    data: {
        area: Texto[]
        banos: number
        categoria: string
        descripcion: Texto[]
        dormitorios: number
        imagenes: {
            imagen: Imagen
        }[]
        localidad: string
        nombre: Texto[]
        precio: Texto[]
        precio_por_metro: Texto[]
    }
}

