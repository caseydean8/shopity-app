"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert(
      "users",
      [
        {
          firstName: "Casey",
          lastName: "Carroll",
          username: "caseydean8@gmail.com",
          password: "$2a$10$fOHQj1JC92ZZzgjN9PR.ru2ddAWmedhHb.JqWxuEf2W7Sp9prAYya",
          createdAt: "2022-05-01 20:40:35",
          updatedAt: "2022-05-01 20:40:35",
        },
        {
          firstName: "Maggie",
          lastName: "Carroll",
          username: "maggie@carroll.com",
          password: "$2a$10$wd.be/JThqtnaD4MFziLKO4MrTnLe7lErceAGprcSF4CcezVw3O26",
          createdAt: "2022-04-29 18:43:52",
          updatedAt: "2022-04-29 18:43:52",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("users", null, {});
  },
};
