// const people = ['Harshal', 'Kathan', 'Anurag', 'Rajat'];


// console.log(people);

// // module.exports = 'hello';//here module is not the name

// module.exports = people;


//now to share many things
const people = ['Harshal', 'Kathan', 'Anurag', 'Rajat'];
const ages = [20, 25, 30, 35];

module.exports = {
    public: people/*here people is being sent with the name public, so its accessed as xyz.public on the other side*/, ages/*here ages is interpreted as ages:ages*/
};