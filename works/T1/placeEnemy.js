function enemyTest(scene) {

    const adversario = [];

    [...Array(5).keys()].map(y => {

        getRandomPositions().map(x => {
            const e = new Enemy(scene, 0, 0);
            adversario.push(e);
        });
    });

    return adversarios;
}

