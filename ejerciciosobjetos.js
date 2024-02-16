//ejercicio cajero
const clientes = [
    { nombre: "Daniel", documento: 12345678, pin: 1234, saldo: 1000000 },
    { nombre: "Sofia", documento: 987654321, pin: 4321, saldo: 500000 },
    { nombre: "Alejandro", documento: 198765432, pin: 1111, saldo: 2000000 },
    { nombre: "Estefania", documento: 100467880, pin: 9876, saldo: 300000 },
    { nombre: "Zeus", documento: 34567890, pin: 1987, saldo: 1500000 }
];

let intentosFallidos = 0;

function iniciarSesion() {
    while (intentosFallidos <3) {
        const { documento, pin } = solicitardatos();
        const cliente = validarAcceso(documento, pin);
        if (cliente) {
            console.log("Bienvenido", "${cliente.nombre}!")
            return cliente;
        } else {
            console.log("Documento o PIN incorrecto. Por favor, vuelva a intentarlo.");
            intentosFallidos++;
        }
    }
    console.log("Demasiados intentos fallidos. Saliendo de la aplicación.");
    return null;
}

function solicitardatos() {
    const documento = parseInt(prompt("Ingrese su número de documento"));
    const pin = parseInt(prompt("Ingrese su PIN de 4 dígitos:"));
    return { documento, pin };
}

function validarAcceso(documento, pin) {
    const clienteEncontrado = clientes.find(cliente => cliente.documento === documento && cliente.pin === pin);
    console.log (clienteEncontrado);
    if (clienteEncontrado.documento !== undefined) {
        alert("Acceso autorizado. ¡Bienvenido!");
        return true;
    } else {
        console.log("Acceso denegado. Verifica tus credenciales e intenta nuevamente.");
        return false;
    }
}

function realizarRetiro(cliente) {
    const cantidad = parseInt(prompt("Ingrese la cantidad a retirar"));
    if (cantidad % 50000 !== 0) {
        console.log("La cantidad debe ser un múltiplo de $50000.");
        return;
    }
    if (cantidad <= cliente.saldo) {
        cliente.saldo -= cantidad;
        console.log("Retiro exitoso. Puede tomar $${cantidad} de la bandeja principal");
    } else {
        console.log("Fondos insuficientes.");
    }
}

function realizarDeposito(cliente) {
    const cantidad = parseInt(prompt("Ingrese la cantidad a depositar:"));
    cliente.saldo += cantidad;
    console.log("Depósito exitoso. Su nuevo saldo es de $${cliente.saldo}" + ".");
}

function realizarTransferencia(cliente) {
    const receptorDocumento = parseInt(prompt("Ingrese el documento del receptor:"));
    const receptor = clientes.find(cliente => cliente.documento === receptorDocumento);
    if (!receptor) {
        console.log("El receptor no fue encontrado.");
        return;
    }
    const cantidad = parseInt(prompt("Ingrese la cantidad a transferir:"));
    if (cantidad <= cliente.saldo) {
        cliente.saldo -= cantidad;
        receptor.saldo += cantidad;
        console.log("Transferencia exitosa. Se han transferido $${cantidad} a la cuenta de ${receptor.nombre}");
    } else {
        console.log("Fondos insuficientes.");
    }
}

function consultarSaldo(cliente) {
    console.log("Su saldo actual es de $${cliente.saldo}");
}





function menu() {
    console.log("Seleccione la opción que desee:");
    console.log("1. Realizar retiro");
    console.log("2. Realizar depósito");
    console.log("3. Realizar transferencia");
    console.log("4. Consultar saldo");
    console.log("5. Salir");
    return prompt ("Ingrese el número de la opción deseada:\n 1. Realizar retiro \n 2. Realizar deposito \n 3. Realizar Transferencia \n 4. Consultar Saldo \n 5. Salir");

}

function manejarTransaccion(cliente, opcion) {
    switch (opcion) {
        case "1":
            realizarRetiro(cliente);
            break;
        case "2":
            realizarDeposito(cliente);
            break;
        case "3":
            realizarTransferencia(cliente);
            break;
        case "4":
            consultarSaldo(cliente);
            break;
        case "5":
            console.log("Saliendo de la aplicación.");
            break;
        default:
            console.log("Opción no válida.");
            break;
    }
}

function main() {
    const cliente = iniciarSesion();
    if (cliente) {
        let opcion;
        do {
            opcion = menu();
            manejarTransaccion(cliente, opcion);
        } while (opcion !== '5');
    }
}

main()

//ejercicio hotel

const habitaciones = {
    individual: { disponibles: 3, capacidad: 2, fumadores: false, mascotas: false },
    doble: { disponibles: 3, capacidad: 4, fumadores: false, mascotas: false },
    familiar: { disponibles: 3, capacidad: 6, fumadores: false, mascotas: true }
};

const reservas = [];

function realizarReserva() {
    const tipoHabitacion = prompt("Seleccione el tipo de habitación: \n individual \n doble\n familiar").toLowerCase();
    const esFumador = prompt("¿Es fumador? (Sí/No)").toLowerCase() === 'sí';
    const cantidadPersonas = parseInt(prompt("Ingrese el número de personas:"));
    const trajoMascota = tipoHabitacion === 'familiar' && prompt("¿Trae mascota? (Sí/No)").toLowerCase() === 'sí';

    if (validarReserva(tipoHabitacion, esFumador, cantidadPersonas, trajoMascota)) {
        const nombreCliente = prompt("Ingrese su nombre:");
        const paisOrigen = prompt("Ingrese su país de origen:");
        const reserva = {
            tipoHabitacion,
            esFumador,
            cantidadPersonas,
            trajoMascota,
            nombreCliente,
            paisOrigen,
            periodoEstadia
        };
        reservas.push(reserva);
        actualizarDisponibilidad(tipoHabitacion);
        console.log("Reserva realizada con éxito. ¡Disfrute de su estancia!");
    } else {
        console.log("No hay disponibilidad para la reserva solicitada o no cumple con los requisitos.");
    }
}

function validarReserva(tipoHabitacion, esFumador, cantidadPersonas, trajoMascota) {
    const habitacion = habitaciones[tipoHabitacion];
    return (
        habitacion &&
        habitacion.disponibles > 0 &&
        cantidadPersonas <= habitacion.capacidad &&
        (!esFumador || habitacion.fumadores) &&
        (!trajoMascota || habitacion.mascotas)
    );
}

function actualizarDisponibilidad(tipoHabitacion) {
    if (habitaciones[tipoHabitacion]) {
        habitaciones[tipoHabitacion].disponibles--;
    }
}

function mostrarEstadisticas() {
    console.log("Estadísticas de reservas:");
    console.log("Total de habitaciones disponibles:");
    Object.keys(habitaciones).forEach(tipo => {
        console.log(${tipo}: ${habitaciones[tipo].disponibles});
    });
    console.log("Reservas realizadas:");
    reservas.forEach(reserva => {
        console.log(reserva);
    });
}

function menuHotel() {
    console.log("Seleccione la opción que desee:");
    console.log("1. Realizar reserva");
    console.log("2. Mostrar estadísticas");
    console.log("3. Salir");
    return prompt("Ingrese el número de la opción deseada  \n 1. Realizar reserva \n 2. Mostrar estadísticas \n 3. Salir ");
}

function manejarOperacionHotel(opcion) {
    switch (opcion) {
        case "1":
            realizarReserva();
            break;
        case "2":
            mostrarEstadisticas();
            break;
        case "3":
            console.log("Saliendo del sistema de reservas del hotel.");
            break;
        default:
            console.log("Opción no válida.");
            break;
    }
}

function mainHotel() {
    let opcion;
    do {
        opcion = menuHotel();
        manejarOperacionHotel(opcion);
    } while (opcion !== '3');
}

mainHotel();