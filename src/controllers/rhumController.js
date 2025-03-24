const Rhum = require("../models/Rhum");

// Liste paginée des rhums
exports.getAllRhums = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const rhums = await Rhum.find()
            .skip((page - 1) * limit) 
            .limit(Number(limit)); 

        const total = await Rhum.countDocuments(); 

        res.json({
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / limit),
            data: rhums
        });

    } catch (error) {
        console.error("Erreur dans getAllRhums :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

exports.searchRhums = async (req, res) => {
    try {
        const { name, type, pays } = req.query;
        let query = {};

        if (name) query.name = new RegExp(name, "i");
        if (type) query.type = new RegExp(type, "i");
        if (pays) query.pays = new RegExp(pays, "i");

        const rhums = await Rhum.find(query);

        res.json({ total: rhums.length, data: rhums });

    } catch (error) {
        console.error("❌ Erreur dans searchRhums :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};
