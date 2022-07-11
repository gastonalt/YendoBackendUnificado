const Joi = require("@hapi/joi");

const registerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        nombres: Joi.string().min(3).required(),
        tipoDni: Joi.string().required(),
        nroDni: Joi.number().min(3).required(),
        apellidos: Joi.string().min(3).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
}

const registerBolicheValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        nombre: Joi.string().required(),
        direccion: Joi.string().required(),
        descripcion: Joi.string(),
    });
    return schema.validate(data);
}



const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data);
}

const loginBolicheValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.registerBolicheValidation = registerBolicheValidation;
module.exports.loginBolicheValidation = loginBolicheValidation;