const Database = require("../db/config");

module.exports = {
    async create(req, res) {
        
        try {
            const db = await Database();
            const pass = req.body.password;

            let roomId = 0;
            let isRoom = true;
            while(isRoom) {
                roomId = Math.trunc(Math.random()*1000000);
   
                // Verificando se o número já existe no banco
                const roomsExistIds = await db.all(`SELECT id FROM rooms`);
                isRoom = roomsExistIds.some(roomsExistIds => roomsExistIds === roomId);

                if(!isRoom) {

                    // Inseri a sala no banco
                    await db.run(`INSERT INTO rooms (
                        id, 
                        pass
                    ) VALUES (
                        ${roomId}, 
                        ${pass}
                    )`);
                            
                }
            }
                        
            await db.close();

            res.redirect(`/room/${roomId}`)

        } catch (error) {
            console.log(error);
        }

        
    },

    async open(req, res) {
        try {
            const db = await Database();
            const roomId = req.params.room;
            const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`);
            const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`);
            let isNoQuestion

            if(questions.length == 0) {
                if(questionsRead.length == 0) {
                    isNoQuestion = true;
                }
            }

            res.render("room", {roomId: roomId, questions: questions, questionsRead: questionsRead, isNoQuestion: isNoQuestion});
            
        } catch (error) {
            console.log(error)
        }
        
    },
    enter(req, res) {
        const roomId = req.body.roomId;

        res.redirect(`/room/${roomId}`);
    }
}