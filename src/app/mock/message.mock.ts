const USERS_MESSAGES: string[] = [
    "¡Hola che! ¿Cómo venís?",
    "¿Qué hacés? ¿Todo bien?",
    "¡Ey, amigo! ¿Qué onda?",
    "¡Hola, pibe! ¿Cómo va?",
    "¿Qué contás? ¿Todo piola?",
    "¡Hola, loco! ¿Cómo estás?",
    "¡Epa, amigazo! ¿Qué tal?",
    "¿Qué pasa, chabón? ¿Cómo andás?",
    "¡Hola, colega! ¿Cómo te va?",
    "¿Qué contás de nuevo?",
    "¡Hola, guacho! ¿Cómo te trata la vida?",
    "¿Qué se dice, hermano?",
    "¡Eh, amigo! ¿Cómo te está yendo?",
    "¡Qué bueno verte! ¿Cómo venís?",
    "¿Qué hay de nuevo, compañero?",
    "¡Hola, pibe! ¿Qué hay de emocionante?",
    "¿Qué onda, chaval? ¿Cómo te va?",
    "¡Hola, che! ¿Qué contás de bueno?",
    "¿Cómo andás, amig@?",
    "¡Hola, colega! ¿Qué se cuece?",
    "¿Qué se oye, loco?",
    "¡Epa, amig@! ¿Qué hay de nuevo?",
    "¿Qué hay de nuevo, compa?",
    "¡Hola, pibe! ¿Qué cuentas?",
    "¿Qué se dice, chabón?",
    "¡Hola, guacho! ¿Cómo venís?",
    "¿Qué se cuenta, hermano?",
    "¡Hola, amigo! ¿Cómo te está yendo?",
    "¿Cómo venís, chaval? ¿Todo bien?",
    "¡Hola, loco! ¿Qué contás?",
    "¿Qué onda, amigazo? ¿Cómo te va?",
    "¡Eh, amigo! ¿Qué se oye?",
    "¿Qué contás de nuevo, pibe?",
    "¡Hola, guacho! ¿Cómo estás?",
    "¿Qué se dice, colega?",
    "¡Hola, che! ¿Cómo va todo?",
    "¿Cómo andás, herman@?",
    "¡Hola, colega! ¿Qué contás de bueno?",
    "¿Qué se cuece, compa?",
    "¡Epa, pibe! ¿Qué hay de emocionante?",
    "¿Qué contás de nuevo, loco?",
    "¡Hola, amigo! ¿Cómo te va la vida?",
    "¿Qué onda, chabón? ¿Cómo estás?",
    "¡Hola, guacho! ¿Qué hay de nuevo?",
    "¿Qué se cuenta, colega?",
    "¡Epa, amigazo! ¿Cómo te trata la vida?",
    "¿Qué se dice, pibe?",
    "¡Hola, che! ¿Cómo andás?",
    "¿Qué contás de bueno, amigo?",
    "¡Hola, pibe! ¿Cómo te está yendo últimamente?",
    "¿Qué se oye, compa?",
    "¡Hola, loco! ¿Cómo venís?",
    "¿Qué onda, amig@? ¿Todo piola?",
    "¡Eh, amigo! ¿Qué cuentas de nuevo?",
    "¿Qué hay de nuevo, chaval?",
    "¡Hola, guacho! ¿Cómo te va?",
    "¿Qué se dice, hermano? ¿Cómo te trata la vida?",
    "¡Hola, colega! ¿Qué tal todo?",
    "¿Cómo andás, chabón? ¿Todo bien?",
    "¡Hola, che! ¿Qué se cuece?",
    "¿Qué contás de nuevo, amigazo?",
    "¡Epa, pibe! ¿Qué hay de emocionante?",
    "¿Qué onda, compa? ¿Cómo te va?",
    "¡Hola, amigo! ¿Qué cuentas?",
    "¿Qué se cuenta, pibe?",
    "¡Hola, guacho! ¿Cómo estás pasando el tiempo?",
    "¿Qué se dice, colega?",
    "¡Eh, amigo! ¿Qué novedades tenés?",
    "¿Qué contás de nuevo, chaval?",
    "¡Hola, loco! ¿Cómo venís de ánimo?",
    "¿Qué onda, amigazo? ¿Cómo te encuentras?",
    "¡Bienvenido! Me gustaría ser tu amigo.",
    "Hola, ¿puedo agregarte a mi lista de amigos?",
    "¡Hola! Quiero ser tu amigo.",
    "¡Bienvenido a mi mundo! Me encantaría ser tu amigo.",
    "¡Hola! Estoy emocionado de conocerte. ¿Quieres ser amigos?",
    "¡Hola! Me gustaría agregarte como amigo.",
    "¡Bienvenido! Estoy aquí para hacer nuevos amigos, ¿te gustaría ser uno de ellos?",
    "Hola, ¿te gustaría ser parte de mi círculo de amigos?",
    "¡Hola! Estoy buscando amigos geniales, ¿te unes?",
    "¡Bienvenido a mi mundo! Estoy interesado en ser tu amigo.",
    "Hola, ¿puedo ser tu amigo?",
    "¡Hola! Estoy emocionado de tenerte aquí. ¿Podemos ser amigos?",
    "¡Bienvenido! Quiero formar parte de tu vida como amigo.",
    "¡Hola! Mi objetivo es hacerte sonreír y ser tu amigo.",
    "¡Bienvenido! Estoy aquí para hacerte sentir bienvenido y ser tu amigo.",
    "Hola, ¿estás dispuesto a ser mi amigo?",
    "¡Hola! Espero que estés listo para hacer un nuevo amigo.",
    "¡Bienvenido! Me gustaría ser tu amigo virtual.",
    "¡Hola! Me encantaría ser tu compañero y amigo.",
    "¡Bienvenido! Estoy listo para ser tu amigo.",
    "¡Hola! Estoy aquí para hacerte sonreír y ser tu amigo.",
    "¡Bienvenido! ¿Puedo ser tu amigo en esta comunidad?",
    "Hola, ¿quieres ser parte de mi grupo de amigos?",
    "¡Hola! Me encantaría ser tu amigo en línea.",
    "¡Bienvenido! Estoy emocionado de conocerte. ¿Quieres ser amigos?",
    "¡Hola! Quiero ser parte de tu vida como amigo.",
    "¡Bienvenido a mi mundo virtual! Me gustaría ser tu amigo.",
    "¡Hola! Espero que aceptes mi solicitud de amistad.",
    "¡Bienvenido! Quiero ser tu amigo en línea.",
    "Hola, ¿puedo ser parte de tu círculo de amigos?",
    "¡Hola! Me gustaría formar parte de tu círculo de amigos.",
    "¡Bienvenido a esta comunidad! ¿Quieres ser mi amigo?",
    "¡Hola! Estoy emocionado de comenzar esta amistad contigo.",
    "¡Bienvenido! Quiero ser tu amigo en este viaje.",
    "Hola, ¿te gustaría ser mi compañero y amigo?",
    "¡Hola! Espero que aceptes mi invitación de amistad.",
    "¡Bienvenido a nuestro mundo! ¿Podemos ser amigos?",
    "¡Hola! Quiero ser una parte especial de tu vida como amigo.",
    "¡Bienvenido! Me gustaría ser tu amigo virtual.",
    "Hola, ¿puedo formar parte de tu círculo de amigos en línea?",
    "¡Hola! Estoy emocionado de hacerte sonreír como tu amigo.",
    "¡Bienvenido! Quiero ser tu compañero en esta aventura.",
    "¡Hola! Espero que aceptes mi solicitud de amistad virtual.",
    "¡Bienvenido a mi círculo de amigos virtuales! ¿Te unes?"
];

export default USERS_MESSAGES;