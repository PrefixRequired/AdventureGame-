import React, { useState, useEffect } from 'react';
import * as util from './utils';
import * as traversal_helpers from './utils/traversal_helpers';
import * as bsf_move from './utils/bfs_move'
import * as miner from './utils/miner'


function App() {
    const [inputText, setInputText] = useState();

    async function traverseMap() {
      let currRm = await util.info.getCurrRm(); // set timeout here
      let cooldown = currRm.cooldown * 1000;
      console.log(`Cooldown: ${currRm.cooldown}`);
      await util.delay(cooldown);
      while (!("room_id" in currRm)) {
        currRm = await util.info.getCurrRm();
        cooldown = currRm.cooldown * 1000;
        console.log(`Cooldown: ${currRm.cooldown}`);
        await util.delay(cooldown);
        }

        traversal_helpers.initialize(currRm)
        
        let rmRes = await util.info.createRm(currRm);
        
        if (rmRes.status === 304) {
          rmRes = await util.info.updateRoom(currRm);
        }
        console.log('bfs path')
        
        let bfsPath = await bsf_move.bfs(currRm.room_id, 337)
        console.log(bfsPath, 'path for bfs')

        traversal_helpers.moveDestination(bfsPath)
    }

    traverseMap();

    return (
        <div className="App">
            <header className="App-header">
                <h1> Welcome </h1>
            </header>
        </div>
    );
}

export default App;