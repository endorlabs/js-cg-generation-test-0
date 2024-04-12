const axios = require('axios');
const fs = require('fs');
const lodash = require('lodash');
const moment = require('moment');

async function fetchAndDisplayUserData() {
    try {
        // Fetch data from the API
        const response = await axios.get('https://randomuser.me/api/?results=5');
        const users = response.data.results;
        const userData = [];

        console.log("List of Users:");
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const userInfo = {
                firstName: lodash.get(user, 'name.first', 'No first name'),
                lastName: lodash.get(user, 'name.last', 'No last name'),
                registrationDate: moment(lodash.get(user, 'registered.date')).format('MMMM Do YYYY, h:mm:ss a')
            };

            console.log(`${i + 1}: ${userInfo.firstName} ${userInfo.lastName} - Registered on: ${userInfo.registrationDate}`);
            userData.push(userInfo);
        }

        // Save to JSON file
        const jsonContent = JSON.stringify(userData, null, 2);
        fs.writeFileSync('userData.json', jsonContent, 'utf8');
        console.log("JSON file has been saved.");
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}

// Run the function
fetchAndDisplayUserData();
