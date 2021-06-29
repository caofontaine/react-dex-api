const handleSearchDex = (req, res, db) => {
  const { searchName } = req.body;

  db.select('pokemon.dexnum', 'pokemon.name', 'pokemon.type1', 'pokemon.type2', 'regions.name as region')
		.from('pokemon')
		.innerJoin('regions', 'pokemon.regionid', '=', 'regions.id')
    .where('pokemon.name', 'ilike', `%${searchName}%`) // ilike - case insensitive LIKE condition
		.then(pokemon => {
			if (pokemon.length) {
        console.log(pokemon);
				res.json(pokemon);
			}
			else {
				res.status(400).json('No Pokemon available!');
			}
		})
		.catch(err => res.status(400).json('Error getting Pokemon from DB!'));
};

module.exports = {
	handleSearchDex: handleSearchDex
}
