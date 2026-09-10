// Arreglo con los productos iniciales de la Veterinaria San Marcos.
// Los datos corresponden al catálogo entregado para el proyecto.

const productosIniciales = [

    {
        id: "ME001",
        categoria: "Antibióticos",
        nombre: "Amoxibay 250mg",
        principioActivo: "Amoxicilina",
        presentacion: "Blíster 10 comp.",
        especie: "Perro / Gato",
        stock: 45,
        precio: 4200
    },

    {
        id: "ME002",
        categoria: "Antibióticos",
        nombre: "Enrox 50mg",
        principioActivo: "Enrofloxacino",
        presentacion: "Blíster 10 comp.",
        especie: "Perro / Gato",
        stock: 30,
        precio: 6800
    },

    {
        id: "ME003",
        categoria: "Antibióticos",
        nombre: "Metrobay 250mg",
        principioActivo: "Metronidazol",
        presentacion: "Blíster 10 comp.",
        especie: "Perro / Gato",
        stock: 28,
        precio: 3900
    },

    {
        id: "ME004",
        categoria: "Antiparasitarios",
        nombre: "Nexgard",
        principioActivo: "Afoxolaner",
        presentacion: "Masticable 1 unid.",
        especie: "Perro",
        stock: 60,
        precio: 9500
    },

    {
        id: "ME005",
        categoria: "Antiparasitarios",
        nombre: "Bravecto",
        principioActivo: "Fluralaner",
        presentacion: "Masticable 1 unid.",
        especie: "Perro",
        stock: 40,
        precio: 18900
    },

    {
        id: "ME006",
        categoria: "Antiparasitarios",
        nombre: "Revolution Plus",
        principioActivo: "Selamectina+Sarolaner",
        presentacion: "Pipeta 1 unid.",
        especie: "Gato",
        stock: 35,
        precio: 14500
    },

    {
        id: "ME007",
        categoria: "Antiparasitarios",
        nombre: "Drontal Plus",
        principioActivo: "Praziquantel+Pamoato",
        presentacion: "Comprimido 1 unid.",
        especie: "Perro",
        stock: 80,
        precio: 3200
    },

    {
        id: "ME008",
        categoria: "Antiparasitarios",
        nombre: "Milbemax Gato",
        principioActivo: "Milbemicina+Praziq.",
        presentacion: "Comprimido 2 unid.",
        especie: "Gato",
        stock: 50,
        precio: 6800
    },

    {
        id: "ME009",
        categoria: "Antiinflamatorios",
        nombre: "Meloxicam 1mg",
        principioActivo: "Meloxicam",
        presentacion: "Blíster 10 comp.",
        especie: "Perro / Gato",
        stock: 55,
        precio: 4500
    },

    {
        id: "ME010",
        categoria: "Antiinflamatorios",
        nombre: "Carprofen 50mg",
        principioActivo: "Carprofeno",
        presentacion: "Blíster 10 comp.",
        especie: "Perro",
        stock: 30,
        precio: 9800
    },

    {
        id: "ME011",
        categoria: "Dermatología",
        nombre: "Clorhexidina shampoo",
        principioActivo: "Clorhexidina 2%",
        presentacion: "Frasco 250ml",
        especie: "Perro / Gato",
        stock: 25,
        precio: 8900
    },

    {
        id: "ME012",
        categoria: "Dermatología",
        nombre: "Malaseb shampoo",
        principioActivo: "Miconazol+Clorhex.",
        presentacion: "Frasco 250ml",
        especie: "Perro / Gato",
        stock: 20,
        precio: 12500
    },

    {
        id: "ME013",
        categoria: "Dermatología",
        nombre: "Apoquel 16mg",
        principioActivo: "Oclacitinib",
        presentacion: "Blíster 10 comp.",
        especie: "Perro",
        stock: 18,
        precio: 22000
    },

    {
        id: "ME014",
        categoria: "Digestivo",
        nombre: "Probifor",
        principioActivo: "Bacillus clausii",
        presentacion: "Sobre 5ml x10",
        especie: "Perro / Gato",
        stock: 40,
        precio: 5600
    },

    {
        id: "ME015",
        categoria: "Digestivo",
        nombre: "Omeprazol 10mg vet",
        principioActivo: "Omeprazol",
        presentacion: "Blíster 10 comp.",
        especie: "Perro / Gato",
        stock: 35,
        precio: 3800
    },

    {
        id: "ME016",
        categoria: "Cardíaco",
        nombre: "Vetmedin 2.5mg",
        principioActivo: "Pimobendan",
        presentacion: "Blíster 10 comp.",
        especie: "Perro",
        stock: 15,
        precio: 28000
    },

    {
        id: "ME017",
        categoria: "Analgésicos",
        nombre: "Tramadol 50mg vet",
        principioActivo: "Tramadol",
        presentacion: "Blíster 10 comp.",
        especie: "Perro",
        stock: 22,
        precio: 5200
    },

    {
        id: "ME018",
        categoria: "Vacunas",
        nombre: "Nobivac DHPPi",
        principioActivo: "Vacuna polivalente",
        presentacion: "Vial 1 dosis",
        especie: "Perro",
        stock: 48,
        precio: 8500
    },

    {
        id: "ME019",
        categoria: "Vacunas",
        nombre: "Nobivac Rabies",
        principioActivo: "Vacuna antirrábica",
        presentacion: "Vial 1 dosis",
        especie: "Perro / Gato",
        stock: 60,
        precio: 5800
    },

    {
        id: "ME020",
        categoria: "Vacunas",
        nombre: "Felocell CVR",
        principioActivo: "Vacuna triple felina",
        presentacion: "Vial 1 dosis",
        especie: "Gato",
        stock: 36,
        precio: 7200
    },

    {
        id: "ME021",
        categoria: "Suplementos",
        nombre: "Omega vet 3-6-9",
        principioActivo: "Ácidos grasos omega",
        presentacion: "Frasco 100ml",
        especie: "Perro / Gato",
        stock: 30,
        precio: 9900
    },

    {
        id: "ME022",
        categoria: "Suplementos",
        nombre: "Condrovet forte",
        principioActivo: "Condroitín+Glucos.",
        presentacion: "Blíster 30 comp.",
        especie: "Perro",
        stock: 25,
        precio: 14500
    }

];

// Arreglo con los servicios iniciales de la Veterinaria San Marcos.

const serviciosIniciales = [

    {
        id: "SV001",
        categoria: "Consultas",
        nombre: "Consulta general",
        especie: "Perro / Gato",
        duracion: 30,
        precio: 15000,
        observaciones: ""
    },

    {
        id: "SV002",
        categoria: "Consultas",
        nombre: "Consulta urgencia",
        especie: "Perro / Gato",
        duracion: 30,
        precio: 25000,
        observaciones: "Fuera de horario +$10.000"
    },

    {
        id: "SV003",
        categoria: "Consultas",
        nombre: "Control postoperatorio",
        especie: "Perro / Gato",
        duracion: 20,
        precio: 10000,
        observaciones: ""
    },

    {
        id: "SV004",
        categoria: "Consultas",
        nombre: "Consulta ave / conejo",
        especie: "Ave / Conejo",
        duracion: 30,
        precio: 18000,
        observaciones: ""
    },

    {
        id: "SV005",
        categoria: "Consultas",
        nombre: "Segunda opinión médica",
        especie: "Todas",
        duracion: 40,
        precio: 20000,
        observaciones: "Requiere ficha previa"
    },

    {
        id: "VA001",
        categoria: "Vacunación",
        nombre: "Vacuna antirrábica canina",
        especie: "Perro",
        duracion: 10,
        precio: 12000,
        observaciones: "Obligatoria por ley"
    },

    {
        id: "VA002",
        categoria: "Vacunación",
        nombre: "Vacuna sextuple canina",
        especie: "Perro",
        duracion: 10,
        precio: 18000,
        observaciones: "Refuerzo anual"
    },

    {
        id: "VA003",
        categoria: "Vacunación",
        nombre: "Vacuna bivalente felina",
        especie: "Gato",
        duracion: 10,
        precio: 15000,
        observaciones: "Refuerzo anual"
    },

    {
        id: "VA004",
        categoria: "Vacunación",
        nombre: "Vacuna triple felina",
        especie: "Gato",
        duracion: 10,
        precio: 17000,
        observaciones: "Refuerzo anual"
    },

    {
        id: "VA005",
        categoria: "Vacunación",
        nombre: "Vacuna Bordetella canina",
        especie: "Perro",
        duracion: 10,
        precio: 14000,
        observaciones: "Tos de las perreras"
    },

    {
        id: "VA006",
        categoria: "Vacunación",
        nombre: "Vacuna antirrábica felina",
        especie: "Gato",
        duracion: 10,
        precio: 12000,
        observaciones: ""
    },

    {
        id: "CI001",
        categoria: "Cirugía",
        nombre: "Esterilización hembra canina",
        especie: "Perra",
        duracion: 90,
        precio: 80000,
        observaciones: "Incluye anestesia y hospitalización 24h"
    },

    {
        id: "CI002",
        categoria: "Cirugía",
        nombre: "Esterilización macho canino",
        especie: "Perro",
        duracion: 60,
        precio: 60000,
        observaciones: "Incluye anestesia"
    },

    {
        id: "CI003",
        categoria: "Cirugía",
        nombre: "Esterilización hembra felina",
        especie: "Gata",
        duracion: 60,
        precio: 65000,
        observaciones: "Incluye anestesia y hospitalización 12h"
    },

    {
        id: "CI004",
        categoria: "Cirugía",
        nombre: "Esterilización macho felino",
        especie: "Gato",
        duracion: 45,
        precio: 50000,
        observaciones: "Incluye anestesia"
    },

    {
        id: "CI005",
        categoria: "Cirugía",
        nombre: "Extirpación de tumor cutáneo",
        especie: "Perro / Gato",
        duracion: 60,
        precio: 120000,
        observaciones: "Precio referencial; varía según tamaño"
    },

    {
        id: "CI006",
        categoria: "Cirugía",
        nombre: "Cesárea de urgencia",
        especie: "Perra / Gata",
        duracion: 120,
        precio: 180000,
        observaciones: ""
    },

    {
        id: "DE001",
        categoria: "Desparasitación",
        nombre: "Desparasitación interna pequeños (<10 kg)",
        especie: "Perro",
        duracion: 5,
        precio: 8000,
        observaciones: ""
    },

    {
        id: "DE002",
        categoria: "Desparasitación",
        nombre: "Desparasitación interna medianos (10-25 kg)",
        especie: "Perro",
        duracion: 5,
        precio: 9500,
        observaciones: ""
    },

    {
        id: "DE003",
        categoria: "Desparasitación",
        nombre: "Desparasitación interna grandes (>25 kg)",
        especie: "Perro",
        duracion: 5,
        precio: 11000,
        observaciones: ""
    },

    {
        id: "DE004",
        categoria: "Desparasitación",
        nombre: "Desparasitación interna felina",
        especie: "Gato",
        duracion: 5,
        precio: 8000,
        observaciones: ""
    },

    {
        id: "DE005",
        categoria: "Desparasitación",
        nombre: "Antiparasitario externo (pipeta)",
        especie: "Perro / Gato",
        duracion: 5,
        precio: 7500,
        observaciones: "Incluye aplicación"
    },

    {
        id: "EX001",
        categoria: "Exámenes",
        nombre: "Hemograma completo",
        especie: "Perro / Gato",
        duracion: 30,
        precio: 22000,
        observaciones: "Resultado en 24-48 h"
    },

    {
        id: "EX002",
        categoria: "Exámenes",
        nombre: "Perfil bioquímico completo",
        especie: "Perro / Gato",
        duracion: 30,
        precio: 35000,
        observaciones: "Resultado en 24-48 h"
    },

    {
        id: "EX003",
        categoria: "Exámenes",
        nombre: "Radiografía (1 proyección)",
        especie: "Perro / Gato",
        duracion: 20,
        precio: 28000,
        observaciones: ""
    },

    {
        id: "EX004",
        categoria: "Exámenes",
        nombre: "Ecografía abdominal",
        especie: "Perro / Gato",
        duracion: 30,
        precio: 45000,
        observaciones: ""
    },

    {
        id: "EX005",
        categoria: "Exámenes",
        nombre: "Test de leishmaniasis",
        especie: "Perro",
        duracion: 20,
        precio: 18000,
        observaciones: ""
    },

    {
        id: "OT001",
        categoria: "Otros",
        nombre: "Corte de uñas",
        especie: "Perro / Gato",
        duracion: 15,
        precio: 5000,
        observaciones: ""
    },

    {
        id: "OT002",
        categoria: "Otros",
        nombre: "Limpieza dental",
        especie: "Perro / Gato",
        duracion: 45,
        precio: 55000,
        observaciones: "Requiere anestesia"
    },

    {
        id: "OT003",
        categoria: "Otros",
        nombre: "Microchip identificación",
        especie: "Perro / Gato",
        duracion: 10,
        precio: 15000,
        observaciones: "Incluye registro"
    },

    {
        id: "OT004",
        categoria: "Otros",
        nombre: "Hospitalización (por día)",
        especie: "Perro / Gato",
        duracion: "24 h",
        precio: 30000,
        observaciones: "Incluye monitoreo y alimentación básica"
    }

];

const regionesChile = [
    "Arica y Parinacota",
    "Tarapacá",
    "Antofagasta",
    "Atacama",
    "Coquimbo",
    "Valparaíso",
    "Metropolitana de Santiago",
    "O'Higgins",
    "Maule",
    "Ñuble",
    "Biobío",
    "La Araucanía",
    "Los Ríos",
    "Los Lagos",
    "Aysén",
    "Magallanes"
];

const configuracionAgenda = {
    horaApertura: "09:00",
    horaCierre: "18:00",
    duracionBloqueMinutos: 30
};