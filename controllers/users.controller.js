const express = require("express");
const db = require("../Db/models/User");

module.exports = {
    list: async (req, res, next) => {
        const allUsers = await db.User.findAll();

        try {
            res.status(200).json({
                meta: {
                    status: 200
                },
                data: allUsers
            })
        } catch (error) {
            res.status(400).json({
                meta: {
                    status: 400
                },
                data: error
            })
        }
    }
}