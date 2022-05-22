function posicionaAdversario(scene) {

    const adversario = [];

    [...Array(5).keys()].map(y => {

        getRandomPositions().map(x => {
            const e = new Enemy(scene, 0, 0);
            adversario.push(e);
        });
    });

    return adversarios;
    /*
        function getRandomPositions() {
    
            var noEnemies = Math.floor((Math.random() * 4));
    
            var arr = [...Array(9).keys()];
    
            for (let i = arr.length - 1; i > 0; i--) {
    
                const j = Math.floor(Math.random() * i);
                const temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
    
            return arr.slice(0, noEnemies);
        }*/


}

