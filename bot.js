require("dotenv").config()
const TelegramBot = require("node-telegram-bot-api")
const token = process.env.BOT_TOKEN
console.log("TOKEN EXISTS:", !!process.env.BOT_TOKEN)
const bot = new TelegramBot(token, { polling: true })
console.log("Bot is running...")
const cars = [

// AUDI
{ id: "audi_a6", name: "Audi A6 C7 3.0 TDI", fuel: "дизель", power: 272, consumption: 6.5, maxSpeed: 250, zeroToHundred: 5.2 },
{ id: "audi_a4", name: "Audi A4 B9 2.0 TFSI", fuel: "бензин", power: 190, consumption: 7.0, maxSpeed: 240, zeroToHundred: 7.1 },
{ id: "audi_q7", name: "Audi Q7 3.0 TDI", fuel: "дизель", power: 286, consumption: 7.5, maxSpeed: 245, zeroToHundred: 6.3 },
{ id: "audi_a8", name: "Audi A8 D4 4.2 TDI", fuel: "дизель", power: 385, consumption: 8.0, maxSpeed: 250, zeroToHundred: 4.7 },

// BMW
{ id: "bmw_530d", name: "BMW 530d G30", fuel: "дизель", power: 265, consumption: 6.0, maxSpeed: 250, zeroToHundred: 5.4 },
{ id: "bmw_330i", name: "BMW 330i G20", fuel: "бензин", power: 258, consumption: 7.2, maxSpeed: 250, zeroToHundred: 5.8 },
{ id: "bmw_x5", name: "BMW X5 30d G05", fuel: "дизель", power: 286, consumption: 7.0, maxSpeed: 230, zeroToHundred: 6.1 },
{ id: "bmw_m5", name: "BMW M5 F90 Competition", fuel: "бензин", power: 625, consumption: 11.5, maxSpeed: 305, zeroToHundred: 3.3 },

// MERCEDES
{ id: "mercedes_e220", name: "Mercedes E220d W213", fuel: "дизель", power: 194, consumption: 5.3, maxSpeed: 240, zeroToHundred: 7.3 },
{ id: "mercedes_c300", name: "Mercedes C300 W205", fuel: "бензин", power: 258, consumption: 7.4, maxSpeed: 250, zeroToHundred: 5.9 },
{ id: "mercedes_s350", name: "Mercedes S350d W222", fuel: "дизель", power: 286, consumption: 6.4, maxSpeed: 250, zeroToHundred: 6.0 },
{ id: "mercedes_amg", name: "Mercedes C63 AMG", fuel: "бензин", power: 510, consumption: 12.0, maxSpeed: 290, zeroToHundred: 4.0 },

// VOLKSWAGEN
{ id: "vw_tiguan", name: "Volkswagen Tiguan 2.0 TDI", fuel: "дизель", power: 150, consumption: 5.8, maxSpeed: 205, zeroToHundred: 9.3 },
{ id: "vw_golf", name: "Volkswagen Golf GTI 2.0 TSI", fuel: "бензин", power: 245, consumption: 7.5, maxSpeed: 250, zeroToHundred: 6.2 },
{ id: "vw_passat", name: "Volkswagen Passat B8 2.0 TDI", fuel: "дизель", power: 190, consumption: 5.0, maxSpeed: 238, zeroToHundred: 7.7 },
{ id: "vw_jetta_14", name: "Volkswagen Jetta 1.4 TSI", fuel: "бензин", power: 150, consumption: 6.2, maxSpeed: 210, zeroToHundred: 8.5 },
{ id: "vw_jetta_20", name: "Volkswagen Jetta GLI 2.0 TSI", fuel: "бензин", power: 230, consumption: 7.1, maxSpeed: 249, zeroToHundred: 6.1 },
{ id: "vw_jetta_diesel", name: "Volkswagen Jetta 2.0 TDI", fuel: "дизель", power: 150, consumption: 5.1, maxSpeed: 220, zeroToHundred: 8.8 },

// TOYOTA
{ id: "toyota_camry", name: "Toyota Camry 3.5", fuel: "бензин", power: 301, consumption: 9.5, maxSpeed: 240, zeroToHundred: 5.8 },
{ id: "toyota_corolla", name: "Toyota Corolla 2.0 Hybrid", fuel: "гібрид", power: 184, consumption: 4.5, maxSpeed: 180, zeroToHundred: 7.9 },
{ id: "toyota_land", name: "Toyota Land Cruiser 300", fuel: "дизель", power: 299, consumption: 8.9, maxSpeed: 210, zeroToHundred: 6.8 },

// LEXUS
{ id: "lexus_rx350", name: "Lexus RX350", fuel: "бензин", power: 300, consumption: 9.0, maxSpeed: 210, zeroToHundred: 7.1 },
{ id: "lexus_ls500", name: "Lexus LS500", fuel: "бензин", power: 421, consumption: 10.5, maxSpeed: 250, zeroToHundred: 4.9 },
{ id: "lexus_gx", name: "Lexus GX460", fuel: "бензин", power: 301, consumption: 12.0, maxSpeed: 175, zeroToHundred: 8.3 },

// RENAULT
{ id: "renault_megane", name: "Renault Megane RS", fuel: "бензин", power: 300, consumption: 7.8, maxSpeed: 255, zeroToHundred: 5.7 },
{ id: "renault_duster", name: "Renault Duster 1.5 dCi", fuel: "дизель", power: 115, consumption: 5.0, maxSpeed: 175, zeroToHundred: 11.8 },
{ id: "renault_talisman", name: "Renault Talisman 2.0 Blue dCi", fuel: "дизель", power: 200, consumption: 5.7, maxSpeed: 237, zeroToHundred: 7.9 },

// SKODA
{ id: "skoda_octavia", name: "Skoda Octavia RS 2.0 TSI", fuel: "бензин", power: 245, consumption: 6.8, maxSpeed: 250, zeroToHundred: 6.7 },
{ id: "skoda_superb", name: "Skoda Superb 2.0 TDI", fuel: "дизель", power: 200, consumption: 5.5, maxSpeed: 240, zeroToHundred: 7.5 },

// PORSCHE
{ id: "porsche_cayenne", name: "Porsche Cayenne Turbo", fuel: "бензин", power: 550, consumption: 11.0, maxSpeed: 286, zeroToHundred: 3.9 },
{ id: "porsche_panamera", name: "Porsche Panamera 4S", fuel: "бензин", power: 440, consumption: 9.0, maxSpeed: 289, zeroToHundred: 4.2 },

// DODGE
{ id: "dodge_challenger_36", name: "Dodge Challenger 3.6 Pentastar", fuel: "бензин", power: 305, consumption: 10.5, maxSpeed: 240, zeroToHundred: 6.3 },
{ id: "dodge_charger_36", name: "Dodge Charger 3.6 Pentastar", fuel: "бензин", power: 300, consumption: 10.2, maxSpeed: 240, zeroToHundred: 6.2 },
{ id: "dodge_challenger_57", name: "Dodge Challenger 5.7 HEMI", fuel: "бензин", power: 375, consumption: 13.0, maxSpeed: 275, zeroToHundred: 5.0 },
{ id: "dodge_charger_57", name: "Dodge Charger 5.7 HEMI", fuel: "бензин", power: 370, consumption: 12.5, maxSpeed: 270, zeroToHundred: 5.1 },
{ id: "dodge_challenger_62", name: "Dodge Challenger 6.2 Hellcat", fuel: "бензин", power: 717, consumption: 15.0, maxSpeed: 327, zeroToHundred: 3.7 },
{ id: "dodge_charger_62", name: "Dodge Charger 6.2 Hellcat", fuel: "бензин", power: 717, consumption: 15.5, maxSpeed: 325, zeroToHundred: 3.6 },
{ id: "dodge_charger_64", name: "Dodge Charger 6.4 Scat Pack", fuel: "бензин", power: 492, consumption: 13.8, maxSpeed: 300, zeroToHundred: 4.3 },
{ id: "dodge_challenger_64", name: "Dodge Challenger 6.4 Scat Pack", fuel: "бензин", power: 492, consumption: 13.9, maxSpeed: 300, zeroToHundred: 4.4 },
]



let userSelections = {}
function findCarById(id) {
    return cars.find((car) => {
        return car.id === id
    })
}
function getCarsKeyboard(type, list) {
    return list.map((car) => {
        return [
            {
                text: car.name,
                callback_data: `${type}_${car.id}`
            }
        ]
    })
}
function getBrandKeyboard(step) {
    return [
        [{ text: "BMW", callback_data: `${step}brand_bmw` }],
        [{ text: "Audi", callback_data: `${step}brand_audi` }],
        [{ text: "Mercedes", callback_data: `${step}brand_mercedes` }],
        [{ text: "Volkswagen", callback_data: `${step}brand_vw` }],
        [{ text: "Toyota", callback_data: `${step}brand_toyota` }],
        [{ text: "Lexus", callback_data: `${step}brand_lexus` }],
        [{ text: "Renault", callback_data: `${step}brand_renault` }],
        [{ text: "Skoda", callback_data: `${step}brand_skoda` }],
        [{ text: "Porsche", callback_data: `${step}brand_porsche` }],
        [{ text: "Dodge", callback_data: `${step}brand_dodge` }],
        [{ text: "Всі авто", callback_data: `${step}brand_all` }]
    ]
}
function getFilteredCarsByBrand(brand) {
    if (brand === "all") {
        return cars
    }

    return cars.filter((car) => {
        return car.id.includes(brand)
    })
}
function getCarInfo(car) {
    return `🚗 ${car.name}
⛽ Паливо: ${car.fuel}
💪 Потужність: ${car.power} к.с.
📉 Розхід: ${car.consumption} л/100 км
🚀 Максималка: ${car.maxSpeed} км/год`
}
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(
        msg.chat.id,
        `Привіт ${msg.from.first_name}! 🚗

Команди:
/car bmw
/car audi
/compare`,
        {
            reply_markup: {
                keyboard: [
                    ["/compare"],
                    ["/car bmw", "/car audi"],
                    ["/car mercedes", "/car volkswagen"],
                    ["/car lexus", "/car toyota"],
                    ["/car renault", "/car skoda"],
                    ["/car porsche", "/car dodge"],
                    ["/car all"]
                ],
                resize_keyboard: true
            }
        }
    )
})
bot.onText(/\/car (.+)/, (msg, match) => {
    const searchText = match[1].toLowerCase()
    if (searchText === "all") {
        bot.sendMessage(
            msg.chat.id,
            "🚗 Всі авто:",
            {
                reply_markup: {
                    inline_keyboard: getCarsKeyboard("info", cars)
                }
            }
        )

        return
    }
    const foundCars = cars.filter((car) => {
        return car.name.toLowerCase().includes(searchText)
    })
    if (foundCars.length === 0) {
        bot.sendMessage(msg.chat.id, "❌ Авто не знайдено")
        return
    }
    bot.sendMessage(
        msg.chat.id,
        "Ось авто, які я знайшов:",
        {
            reply_markup: {
                inline_keyboard: getCarsKeyboard("info", foundCars)
            }
        }
    )
})
bot.onText(/\/compare/, (msg) => {
    userSelections[msg.chat.id] = {}

    bot.sendMessage(
        msg.chat.id,
        "Вибери марку першого авто:",
        {
            reply_markup: {
                inline_keyboard: getBrandKeyboard("first_")
            }
        }
    )
})
bot.on("callback_query", (query) => {
    const chatId = query.message.chat.id
    const data = query.data
    if (data.startsWith("info_")) {
        const carId = data.replace("info_", "")
        const car = findCarById(carId)
        bot.sendMessage(chatId, getCarInfo(car))
        return
    }
    if (data.startsWith("first_brand_")) {
        const brand = data.replace("first_brand_", "")
        const filteredCars = getFilteredCarsByBrand(brand)

        bot.sendMessage(
            chatId,
            "Тепер вибери перше авто:",
            {
                reply_markup: {
                    inline_keyboard: getCarsKeyboard("first", filteredCars)
                }
            }
        )
        return
    }
    if (data.startsWith("second_brand_")) {
        const brand = data.replace("second_brand_", "")
        const filteredCars = getFilteredCarsByBrand(brand)
        bot.sendMessage(
            chatId,
            "Тепер вибери друге авто:",
            {
                reply_markup: {
                    inline_keyboard: getCarsKeyboard("second", filteredCars)
                }
            }
        )

        return
    }
    if (data.startsWith("first_")) {
        const carId = data.replace("first_", "")
        const firstCar = findCarById(carId)

        userSelections[chatId] = {
            firstCar: firstCar
        }
        bot.sendMessage(
            chatId,
            `Перше авто: ${firstCar.name}

Тепер вибери марку другого авто:`,
            {
                reply_markup: {
                    inline_keyboard: getBrandKeyboard("second_")
                }
            }
        )

        return
    }
    if (data.startsWith("second_")) {
        const carId = data.replace("second_", "")
        const secondCar = findCarById(carId)
        const firstCar = userSelections[chatId].firstCar
        let powerfulCar
        let fasterCar
        let economicalCar
        if (firstCar.power > secondCar.power) {
            powerfulCar = firstCar
        } else {
            powerfulCar = secondCar
        }

        if (firstCar.maxSpeed > secondCar.maxSpeed) {
            fasterCar = firstCar
        } else {
            fasterCar = secondCar
        }

        if (firstCar.consumption < secondCar.consumption) {
            economicalCar = firstCar
        } else {
            economicalCar = secondCar
        }

        bot.sendMessage(
            chatId,
            `🚗 Порівняння авто:
1️⃣ ${firstCar.name}
💪 ${firstCar.power} к.с.
📉 ${firstCar.consumption} л/100 км
🚀 ${firstCar.maxSpeed} км/год

2️⃣ ${secondCar.name}
💪 ${secondCar.power} к.с.
📉 ${secondCar.consumption} л/100 км
🚀 ${secondCar.maxSpeed} км/год

🏆 Потужніше: ${powerfulCar.name}
🚀 Швидше по максималці: ${fasterCar.name}
⛽ Економніше: ${economicalCar.name}`
        )
        return
    }
})